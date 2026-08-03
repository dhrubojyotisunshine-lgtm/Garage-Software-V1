/**
 * Finance domain.
 *
 * Receivables are DERIVED from source documents, never stored as independent
 * mutable numbers — that is what keeps them impossible to drift out of step
 * with the job cards that created them.
 *
 * Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.6, 04_ALL_MODULES.md §49, §52
 */

import type { ID, ISODateTime, Paise } from './../types/common'
import type { JobCard, Payment, PaymentMode } from '../types/workshop'
import { amountPaid, balanceDue, invoiceTotals, paymentStatus } from './jobCard'
import { sumPaise } from '../utils/money'

/* ------------------------------------------------------------- receivable */

export const AGEING_BUCKETS = ['0 – 30 days', '31 – 60 days', '61 – 90 days', 'Over 90 days'] as const
export type AgeingBucket = (typeof AGEING_BUCKETS)[number]

/** Days a garage typically allows before an invoice is considered overdue. */
export const DEFAULT_CREDIT_DAYS = 15

export interface Receivable {
  /** The source document — a job card today, other modules later. */
  sourceId: ID
  sourceType: 'Workshop'
  sourceRef: string
  invoiceNo: string
  invoicedAt: ISODateTime
  dueDate: ISODateTime
  customerId: ID
  invoiceTotal: Paise
  received: Paise
  balance: Paise
  status: string
  ageDays: number
  bucket: AgeingBucket
  overdue: boolean
}

export function ageingBucket(days: number): AgeingBucket {
  if (days <= 30) return '0 – 30 days'
  if (days <= 60) return '31 – 60 days'
  if (days <= 90) return '61 – 90 days'
  return 'Over 90 days'
}

function daysBetween(from: string, to: number): number {
  return Math.max(0, Math.floor((to - new Date(from).getTime()) / 86_400_000))
}

/**
 * Every invoiced job card with a balance becomes a receivable.
 * Fully-settled invoices drop out — nothing to collect.
 */
export function receivablesFrom(
  jobCards: JobCard[],
  opts: { creditDays?: number; now?: number } = {},
): Receivable[] {
  const creditDays = opts.creditDays ?? DEFAULT_CREDIT_DAYS
  const now = opts.now ?? Date.now()

  return jobCards
    .filter((j) => Boolean(j.invoiceNo) && j.status !== 'Cancelled' && balanceDue(j) > 0)
    .map((j) => {
      const invoicedAt = j.invoicedAt ?? j.createdAt
      const dueDate = new Date(new Date(invoicedAt).getTime() + creditDays * 86_400_000).toISOString()
      const ageDays = daysBetween(invoicedAt, now)
      return {
        sourceId: j.id,
        sourceType: 'Workshop' as const,
        sourceRef: j.jobCardNo,
        invoiceNo: j.invoiceNo!,
        invoicedAt,
        dueDate,
        customerId: j.customerId,
        invoiceTotal: invoiceTotals(j).total,
        received: amountPaid(j),
        balance: balanceDue(j),
        status: paymentStatus(j),
        ageDays,
        bucket: ageingBucket(ageDays),
        overdue: new Date(dueDate).getTime() < now,
      }
    })
    .sort((a, b) => b.ageDays - a.ageDays)
}

export type AgeingSummary = Record<AgeingBucket, { count: number; amount: Paise }>

export function ageingSummary(receivables: Receivable[]): AgeingSummary {
  const empty = () => ({ count: 0, amount: 0 })
  const summary = {
    '0 – 30 days': empty(),
    '31 – 60 days': empty(),
    '61 – 90 days': empty(),
    'Over 90 days': empty(),
  } as AgeingSummary

  for (const r of receivables) {
    summary[r.bucket].count += 1
    summary[r.bucket].amount += r.balance
  }
  return summary
}

export function totalOutstanding(receivables: Receivable[]): Paise {
  return sumPaise(receivables.map((r) => r.balance))
}

export function overdueOnly(receivables: Receivable[]): Receivable[] {
  return receivables.filter((r) => r.overdue)
}

/* -------------------------------------------------------------- receipts */

export interface Receipt extends Payment {
  sourceId: ID
  sourceRef: string
  invoiceNo: string
  customerId: ID
}

/** Every payment across every job card, newest first. */
export function receiptsFrom(jobCards: JobCard[]): Receipt[] {
  return jobCards
    .flatMap((j) =>
      j.payments.map((p) => ({
        ...p,
        sourceId: j.id,
        sourceRef: j.jobCardNo,
        invoiceNo: j.invoiceNo ?? '—',
        customerId: j.customerId,
      })),
    )
    .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
}

export type CollectionByMode = Record<PaymentMode, Paise>

export function collectionByMode(receipts: Receipt[]): CollectionByMode {
  const totals: CollectionByMode = {
    Cash: 0,
    UPI: 0,
    Card: 0,
    'Bank Transfer': 0,
    Cheque: 0,
  }
  for (const r of receipts) totals[r.mode] += r.amount
  return totals
}

export function collectedBetween(receipts: Receipt[], fromMs: number, toMs: number): Paise {
  return sumPaise(
    receipts
      .filter((r) => {
        const t = new Date(r.receivedAt).getTime()
        return t >= fromMs && t <= toMs
      })
      .map((r) => r.amount),
  )
}

/* -------------------------------------------------------------- billing */

/** Total value invoiced, whether collected or not. */
export function totalBilled(jobCards: JobCard[]): Paise {
  return sumPaise(jobCards.filter((j) => j.invoiceNo).map((j) => invoiceTotals(j).total))
}

export function totalCollected(jobCards: JobCard[]): Paise {
  return sumPaise(jobCards.map((j) => amountPaid(j)))
}

/** Outstanding per customer, largest first — the "who owes me" question. */
export interface CustomerOutstanding {
  customerId: ID
  balance: Paise
  invoiceCount: number
  oldestAgeDays: number
}

export function outstandingByCustomer(receivables: Receivable[]): CustomerOutstanding[] {
  const map = new Map<ID, CustomerOutstanding>()
  for (const r of receivables) {
    const existing = map.get(r.customerId)
    if (existing) {
      existing.balance += r.balance
      existing.invoiceCount += 1
      existing.oldestAgeDays = Math.max(existing.oldestAgeDays, r.ageDays)
    } else {
      map.set(r.customerId, {
        customerId: r.customerId,
        balance: r.balance,
        invoiceCount: 1,
        oldestAgeDays: r.ageDays,
      })
    }
  }
  return [...map.values()].sort((a, b) => b.balance - a.balance)
}
