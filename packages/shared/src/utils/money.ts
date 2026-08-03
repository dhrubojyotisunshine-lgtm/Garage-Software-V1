/**
 * Money utilities.
 *
 * INVARIANT: money is an integer number of paise, everywhere, always.
 * Floating point rupees do not exist in this codebase.
 *
 * Ref: 01_ADMIN_THEME.md §14, 06_MERN_IMPLEMENTATION_PLAN.md §3.5
 */

import type { Paise } from '../types/common'

/** Rupees (as typed by a human) → paise. */
export function toPaise(rupees: number): Paise {
  return Math.round(rupees * 100)
}

/** Paise → rupees as a float. Use ONLY for display or chart values. */
export function toRupees(paise: Paise): number {
  return paise / 100
}

const inr = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const inrWhole = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export interface FormatMoneyOptions {
  /** Show the ₹ symbol. Default true. */
  symbol?: boolean
  /** Hide paise when the amount is whole. Default false. */
  compactDecimals?: boolean
  /** Render negatives as (₹ 1,250.00). Default true. */
  parenthesizeNegative?: boolean
}

/**
 * Format paise using Indian digit grouping.
 *   1875000 → "₹ 18,750.00"
 *   -125000 → "(₹ 1,250.00)"
 */
export function formatMoney(paise: Paise | null | undefined, opts: FormatMoneyOptions = {}): string {
  const { symbol = true, compactDecimals = false, parenthesizeNegative = true } = opts
  if (paise === null || paise === undefined || Number.isNaN(paise)) return '—'

  const negative = paise < 0
  const abs = Math.abs(paise)
  const rupees = abs / 100
  const whole = abs % 100 === 0

  const body = compactDecimals && whole ? inrWhole.format(rupees) : inr.format(rupees)
  const withSymbol = symbol ? `₹ ${body}` : body

  if (!negative) return withSymbol
  return parenthesizeNegative ? `(${withSymbol})` : `-${withSymbol}`
}

/**
 * Abbreviated form for dashboards and summaries ONLY.
 * Never use inside a transaction, invoice or printed document. §14
 *   124500000 → "₹ 12.45 L"
 */
export function formatMoneyShort(paise: Paise | null | undefined): string {
  if (paise === null || paise === undefined || Number.isNaN(paise)) return '—'
  const negative = paise < 0
  const rupees = Math.abs(paise) / 100

  let body: string
  if (rupees >= 1_00_00_000) body = `${(rupees / 1_00_00_000).toFixed(2)} Cr`
  else if (rupees >= 1_00_000) body = `${(rupees / 1_00_000).toFixed(2)} L`
  else if (rupees >= 1_000) body = `${(rupees / 1_000).toFixed(1)} K`
  else body = inrWhole.format(rupees)

  return `${negative ? '-' : ''}₹ ${body}`
}

/** Sum paise safely. */
export function sumPaise(values: Array<Paise | null | undefined>): Paise {
  return values.reduce<number>((acc, v) => acc + (v ?? 0), 0)
}

/**
 * Percentage of an amount, rounded half-away-from-zero to whole paise.
 * Used for discounts and tax. Rounding is centralised so every calculation
 * in the ERP rounds identically.
 */
export function percentOf(paise: Paise, percent: number): Paise {
  const raw = (paise * percent) / 100
  return raw >= 0 ? Math.round(raw) : -Math.round(-raw)
}

export interface TaxBreakdown {
  taxable: Paise
  cgst: Paise
  sgst: Paise
  igst: Paise
  total: Paise
}

/**
 * Split a taxable amount into GST components.
 * Intra-state splits into CGST + SGST; inter-state produces IGST.
 * Accounting rules are not final (04_ALL_MODULES.md §53) — this is the
 * arithmetic only.
 */
export function computeGst(taxable: Paise, ratePercent: number, interState: boolean): TaxBreakdown {
  const totalTax = percentOf(taxable, ratePercent)
  if (interState) {
    return { taxable, cgst: 0, sgst: 0, igst: totalTax, total: taxable + totalTax }
  }
  const half = Math.round(totalTax / 2)
  const cgst = half
  const sgst = totalTax - half // absorbs the odd paisa, so cgst+sgst === totalTax
  return { taxable, cgst, sgst, igst: 0, total: taxable + totalTax }
}
