/**
 * Job Card business logic.
 *
 * Pure functions only — no React, no store. The API will import this file and
 * enforce the same rules server-side rather than reimplementing them.
 *
 * Ref: 05_MODULE_FLOWS-03_WORKSHOP.md, 06_MERN_IMPLEMENTATION_PLAN.md §4.7
 */

import type { Paise } from '../types/common'
import type {
  ItemSource,
  JobCard,
  JobCardItem,
  JobCardPaymentStatus,
  JobCardStatus,
} from '../types/workshop'
import { defineStateMachine, deriveStages, type StageDefinition } from '../utils/stateMachine'
import { percentOf, sumPaise } from '../utils/money'

/* ------------------------------------------------------------ state machine */

/**
 * Legal transitions. A status is never written directly — it goes through
 * `jobCardMachine`, which the UI also uses to render only legal actions.
 */
export const jobCardMachine = defineStateMachine<JobCardStatus>('JobCard', {
  Draft: [
    { to: 'Checked-In', label: 'Complete Check-In', confirm: false },
    { to: 'Cancelled', label: 'Cancel Job Card', requiresReason: true, confirm: true, danger: true },
  ],
  'Checked-In': [
    { to: 'Estimate Preparation', label: 'Start Estimate' },
    { to: 'Cancelled', label: 'Cancel Job Card', requiresReason: true, confirm: true, danger: true },
  ],
  'Estimate Preparation': [
    { to: 'Approval Pending', label: 'Send Estimate for Approval' },
    { to: 'Cancelled', label: 'Cancel Job Card', requiresReason: true, confirm: true, danger: true },
  ],
  'Approval Pending': [
    { to: 'Approved', label: 'Record Customer Approval', permission: 'workshop:job-card:approve' },
    { to: 'Estimate Preparation', label: 'Revise Estimate', requiresReason: true },
    { to: 'Cancelled', label: 'Cancel Job Card', requiresReason: true, confirm: true, danger: true },
  ],
  Approved: [
    { to: 'Repair In Progress', label: 'Start Repair' },
    { to: 'Cancelled', label: 'Cancel Job Card', requiresReason: true, confirm: true, danger: true },
  ],
  'Repair In Progress': [
    { to: 'Repair Completed', label: 'Complete Repair' },
  ],
  'Repair Completed': [
    { to: 'Invoiced', label: 'Generate Invoice' },
    { to: 'Repair In Progress', label: 'Reopen Repair', requiresReason: true },
  ],
  Invoiced: [
    { to: 'Partially Paid', label: 'Record Part Payment' },
    { to: 'Paid', label: 'Record Full Payment' },
  ],
  'Partially Paid': [{ to: 'Paid', label: 'Record Balance Payment' }],
  Paid: [{ to: 'Delivered', label: 'Complete Delivery' }],
  Delivered: [],
  Cancelled: [],
})

/* ------------------------------------------------------------------ stages */

/** Process progress axis. Distinct from status — Workshop §160. */
export const JOB_CARD_STAGES: StageDefinition[] = [
  { key: 'check-in', label: 'Check-In' },
  { key: 'estimate', label: 'Estimate' },
  { key: 'approval', label: 'Approval' },
  { key: 'repair', label: 'Repair' },
  { key: 'invoice', label: 'Invoice' },
  { key: 'payment', label: 'Payment' },
  { key: 'delivery', label: 'Delivery' },
]

const STATUS_TO_STAGE: Record<JobCardStatus, string> = {
  Draft: 'check-in',
  'Checked-In': 'estimate',
  'Estimate Preparation': 'estimate',
  'Approval Pending': 'approval',
  Approved: 'repair',
  'Repair In Progress': 'repair',
  'Repair Completed': 'invoice',
  Invoiced: 'payment',
  'Partially Paid': 'payment',
  Paid: 'delivery',
  Delivered: 'delivery',
  Cancelled: 'check-in',
}

export function currentStageKey(status: JobCardStatus): string {
  return STATUS_TO_STAGE[status]
}

export function jobCardStages(status: JobCardStatus) {
  const stages = deriveStages(JOB_CARD_STAGES, currentStageKey(status))
  // Delivered is terminal — every stage reads as complete.
  if (status === 'Delivered') return stages.map((s) => ({ ...s, state: 'complete' as const }))
  return stages
}

/* ------------------------------------------------------------------ totals */

export interface LineTotals {
  gross: Paise
  discount: Paise
  taxable: Paise
  tax: Paise
  total: Paise
}

/**
 * Per-line arithmetic. Rounding is centralised in money.ts.
 *
 * `discountPercent` carries a percentage by default, but a line may instead
 * carry a flat amount in paise by setting discountType to 'amount'. Reading the
 * number without checking the type would silently treat ₹500 as 500%.
 * A flat discount is capped at the gross, so a line can never go negative.
 */
export function lineTotals(item: JobCardItem): LineTotals {
  const gross = Math.round(item.quantity * item.rate)
  const discount =
    item.discountType === 'amount'
      ? Math.min(gross, Math.round(item.discountPercent))
      : percentOf(gross, item.discountPercent)
  const taxable = gross - discount
  const tax = percentOf(taxable, item.taxRate)
  return { gross, discount, taxable, tax, total: taxable + tax }
}

export interface JobCardTotals extends LineTotals {
  /** Intra-state split. Inter-state IGST is a later phase. */
  cgst: Paise
  sgst: Paise
  byType: Record<string, Paise>
  itemCount: number
}

export function calculateTotals(items: JobCardItem[]): JobCardTotals {
  const lines = items.map(lineTotals)
  const gross = sumPaise(lines.map((l) => l.gross))
  const discount = sumPaise(lines.map((l) => l.discount))
  const taxable = sumPaise(lines.map((l) => l.taxable))
  const tax = sumPaise(lines.map((l) => l.tax))

  const cgst = Math.round(tax / 2)
  const sgst = tax - cgst // absorbs the odd paisa so cgst + sgst === tax

  const byType: Record<string, Paise> = {}
  items.forEach((item, i) => {
    byType[item.type] = (byType[item.type] ?? 0) + lines[i]!.taxable
  })

  return {
    gross,
    discount,
    taxable,
    tax,
    cgst,
    sgst,
    total: taxable + tax,
    byType,
    itemCount: items.length,
  }
}

/* ------------------------------------------------------------ item source */

/** Statuses before the customer has approved anything. */
const PRE_APPROVAL: JobCardStatus[] = [
  'Draft',
  'Checked-In',
  'Estimate Preparation',
  'Approval Pending',
]

/**
 * "Additional Work" means work added AFTER the customer approved the estimate —
 * it is what may require re-approval (Workshop §82). Before approval there is
 * no such distinction: everything added is simply part of the estimate.
 *
 * Item source is therefore derived from job card status, never from which
 * screen the user happened to be on.
 */
export function isPreApproval(status: JobCardStatus): boolean {
  return PRE_APPROVAL.includes(status)
}

export function defaultItemSource(status: JobCardStatus): ItemSource {
  return isPreApproval(status) ? 'Estimate' : 'Additional'
}

/**
 * The quoted figure. Before approval every line is part of the quote; after
 * approval only the originally-estimated lines count, so additional work is
 * visibly separate from what the customer agreed to.
 */
export function estimateTotals(jobCard: JobCard): JobCardTotals {
  if (isPreApproval(jobCard.status)) return calculateTotals(jobCard.items)
  return calculateTotals(jobCard.items.filter((i) => i.source === 'Estimate'))
}

export function invoiceTotals(jobCard: JobCard): JobCardTotals {
  return calculateTotals(jobCard.items)
}

/* ----------------------------------------------------------------- payment */

export function amountPaid(jobCard: JobCard): Paise {
  return sumPaise(jobCard.payments.map((p) => p.amount))
}

export function balanceDue(jobCard: JobCard): Paise {
  if (!jobCard.invoiceNo) return 0
  return invoiceTotals(jobCard).total - amountPaid(jobCard)
}

export function paymentStatus(jobCard: JobCard): JobCardPaymentStatus {
  if (!jobCard.invoiceNo) return 'Not Invoiced'
  const paid = amountPaid(jobCard)
  if (paid <= 0) return 'Unpaid'
  return balanceDue(jobCard) <= 0 ? 'Paid' : 'Partially Paid'
}

/* ------------------------------------------------------------------ guards */

export interface Guard {
  ok: boolean
  reason?: string
}

const ok: Guard = { ok: true }

/** Cannot send an empty estimate. */
export function canSendEstimate(jobCard: JobCard): Guard {
  if (estimateTotals(jobCard).itemCount === 0) {
    return { ok: false, reason: 'Add at least one estimate line first' }
  }
  return ok
}

/** Repair cannot complete while spare lines are un-issued. */
export function canCompleteRepair(jobCard: JobCard): Guard {
  const pending = jobCard.items.filter(
    (i) => (i.type === 'Spare' || i.type === 'Lubricant') && !i.issued,
  )
  if (pending.length > 0) {
    return { ok: false, reason: `${pending.length} part(s) not yet issued from stock` }
  }
  if (!jobCard.technicianId) return { ok: false, reason: 'Assign a technician first' }
  return ok
}

export function canInvoice(jobCard: JobCard): Guard {
  if (jobCard.items.length === 0) return { ok: false, reason: 'Nothing to invoice' }
  if (jobCard.status !== 'Repair Completed') {
    return { ok: false, reason: 'Repair must be completed before invoicing' }
  }
  return ok
}

/**
 * Delivery is blocked while a balance is due.
 * Configurable later via Settings; hard-coded for the MVP.
 */
export function canDeliver(jobCard: JobCard): Guard {
  if (!jobCard.invoiceNo) return { ok: false, reason: 'Generate the invoice first' }
  if (balanceDue(jobCard) > 0) return { ok: false, reason: 'Outstanding balance must be cleared' }
  return ok
}

export function canEditItems(jobCard: JobCard): Guard {
  if (jobCard.status === 'Delivered') return { ok: false, reason: 'Job card is delivered' }
  if (jobCard.status === 'Cancelled') return { ok: false, reason: 'Job card is cancelled' }
  if (jobCard.invoiceNo) return { ok: false, reason: 'Invoice has been generated' }
  return ok
}

/** Terminal statuses cannot be cancelled. Workshop §163 */
export function canCancel(jobCard: JobCard): Guard {
  if (jobCard.status === 'Delivered') return { ok: false, reason: 'Job card is already delivered' }
  if (jobCard.status === 'Cancelled') return { ok: false, reason: 'Already cancelled' }
  if (jobCard.invoiceNo) return { ok: false, reason: 'Cannot cancel an invoiced job card' }
  return ok
}

/* -------------------------------------------------------------- numbering */

/**
 * Document numbering. Allocation must be atomic and share the transaction of
 * the document it numbers — see 06_MERN_IMPLEMENTATION_PLAN.md §4.4. In the
 * frontend phase the store holds the counter.
 */
export function formatDocumentNumber(prefix: string, financialYear: string, seq: number): string {
  const yearPart = financialYear.split('-')[0]
  return `${prefix}-${yearPart}-${String(seq).padStart(6, '0')}`
}

/* ------------------------------------------------------------ derived text */

export function isOverdue(jobCard: JobCard): boolean {
  if (jobCard.status === 'Delivered' || jobCard.status === 'Cancelled') return false
  return new Date(jobCard.expectedDelivery).getTime() < Date.now()
}
