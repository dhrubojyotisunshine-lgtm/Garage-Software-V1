/**
 * Quotation.
 *
 * What the garage offers before any work is agreed. A quotation is a document,
 * not a commitment — it has no stock effect and no financial effect until it
 * becomes a job card.
 *
 * Deliberately shares JobCardItem: a quoted line and a job card line are the
 * same shape, so conversion copies rather than translates, and the totals maths
 * is the one already tested in domain/jobCard.ts.
 */

import type { ID, ISODateTime, Paise } from './common'
import type { DiscountType, JobCardItem } from './workshop'

export const QUOTATION_STATUSES = [
  'Draft',
  'Sent',
  'Accepted',
  'Rejected',
  'Expired',
  'Converted',
] as const

export type QuotationStatus = (typeof QUOTATION_STATUSES)[number]

export interface Quotation {
  id: ID
  companyId: ID
  branchId: ID
  financialYear: string

  quotationNo: string
  customerId: ID
  /** Optional: a quote may precede the vehicle being known. */
  vehicleId?: ID

  status: QuotationStatus

  /** What the customer asked for. */
  subject?: string
  complaints: string[]

  items: JobCardItem[]

  /** Document-level discount, applied after line discounts. */
  discount: Paise
  discountType: DiscountType

  /** Quotations go stale — an old price is not a live offer. */
  validUntil: ISODateTime

  notes?: string
  terms?: string

  sentAt?: ISODateTime
  respondedAt?: ISODateTime
  rejectionReason?: string

  /** Set once converted, so the quote and the job card stay linked both ways. */
  convertedJobCardId?: ID
  convertedAt?: ISODateTime

  createdBy: string
  createdAt: ISODateTime
}

/**
 * Legal transitions. A quotation cannot un-convert: once a job card exists the
 * quote is a historical document.
 */
export const QUOTATION_TRANSITIONS: Record<QuotationStatus, QuotationStatus[]> = {
  Draft: ['Sent', 'Rejected'],
  Sent: ['Accepted', 'Rejected', 'Expired'],
  Accepted: ['Converted', 'Expired'],
  Rejected: [],
  Expired: ['Draft'],
  Converted: [],
}

export function canTransitionQuotation(from: QuotationStatus, to: QuotationStatus): boolean {
  return QUOTATION_TRANSITIONS[from].includes(to)
}

/** Only an accepted quotation becomes a job card. */
export function canConvertQuotation(q: Pick<Quotation, 'status' | 'items'>): {
  ok: boolean
  reason?: string
} {
  if (q.status === 'Converted') return { ok: false, reason: 'Already converted to a job card' }
  if (q.status === 'Rejected') return { ok: false, reason: 'This quotation was rejected' }
  if (q.status !== 'Accepted') return { ok: false, reason: 'Only an accepted quotation can be converted' }
  if (q.items.length === 0) return { ok: false, reason: 'A quotation with no lines cannot be converted' }
  return { ok: true }
}

/** Past its validity date and not yet acted on. */
export function isQuotationExpired(q: Pick<Quotation, 'status' | 'validUntil'>, now = new Date()): boolean {
  if (q.status === 'Converted' || q.status === 'Rejected') return false
  return new Date(q.validUntil).getTime() < now.getTime()
}
