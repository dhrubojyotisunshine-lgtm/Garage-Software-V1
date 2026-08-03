/**
 * Display formatting.
 *
 * ONE date format across the entire ERP. No exceptions.
 * Ref: 01_ADMIN_THEME.md §14
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { ISODate, ISODateTime } from '../types/common'

dayjs.extend(relativeTime)

export const DATE_FORMAT = 'DD MMM YYYY' // 03 Aug 2026
export const TIME_FORMAT = 'hh:mm A' // 02:45 PM
export const DATETIME_FORMAT = 'DD MMM YYYY, hh:mm A' // 03 Aug 2026, 02:45 PM

const EMPTY = '—'

export function formatDate(value?: ISODate | ISODateTime | Date | null): string {
  if (!value) return EMPTY
  const d = dayjs(value)
  return d.isValid() ? d.format(DATE_FORMAT) : EMPTY
}

export function formatDateTime(value?: ISODateTime | Date | null): string {
  if (!value) return EMPTY
  const d = dayjs(value)
  return d.isValid() ? d.format(DATETIME_FORMAT) : EMPTY
}

export function formatTime(value?: ISODateTime | Date | null): string {
  if (!value) return EMPTY
  const d = dayjs(value)
  return d.isValid() ? d.format(TIME_FORMAT) : EMPTY
}

/** "01 Jul – 31 Jul 2026" */
export function formatDateRange(from?: ISODate | null, to?: ISODate | null): string {
  if (!from && !to) return EMPTY
  const a = from ? dayjs(from) : null
  const b = to ? dayjs(to) : null
  if (a && b) {
    const sameYear = a.year() === b.year()
    return `${a.format(sameYear ? 'DD MMM' : DATE_FORMAT)} – ${b.format(DATE_FORMAT)}`
  }
  return a ? `From ${a.format(DATE_FORMAT)}` : `Until ${b!.format(DATE_FORMAT)}`
}

/**
 * Relative time. Allowed ONLY in activity feeds and notifications.
 * Never on a document or a printed output. §14
 */
export function formatRelative(value?: ISODateTime | Date | null): string {
  if (!value) return EMPTY
  const d = dayjs(value)
  return d.isValid() ? d.fromNow() : EMPTY
}

/** Quantity with an optional unit: "25 Nos", "4.5 Ltr" */
export function formatQuantity(
  value?: number | null,
  unit?: string,
  maxDecimals = 2,
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return EMPTY
  const body = new Intl.NumberFormat('en-IN', { maximumFractionDigits: maxDecimals }).format(value)
  return unit ? `${body} ${unit}` : body
}

export function formatNumber(value?: number | null, maxDecimals = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return EMPTY
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: maxDecimals }).format(value)
}

/** "+12.4%" / "−8.1%" — sign always explicit. */
export function formatPercent(value?: number | null, decimals = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return EMPTY
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${Math.abs(value).toFixed(decimals)}%`
}

/** Vehicle registration: uppercase, single-spaced. "mh12ab4582" → "MH12AB4582" */
export function formatRegistration(value?: string | null): string {
  if (!value) return EMPTY
  return value.toUpperCase().replace(/\s+/g, ' ').trim()
}

/** Indian mobile display: "+91 98765 43210" */
export function formatMobile(value?: string | null): string {
  if (!value) return EMPTY
  const digits = value.replace(/\D/g, '')
  const local = digits.length > 10 ? digits.slice(-10) : digits
  if (local.length !== 10) return value
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`
}

/** Any value that should never render blank. §14 */
export function orDash(value: unknown): string {
  if (value === null || value === undefined || value === '') return EMPTY
  return String(value)
}

/** Financial year label from a date: 03 Aug 2026 → "2026-27" (April start). */
export function financialYearOf(value: ISODate | Date = new Date()): string {
  const d = dayjs(value)
  const startYear = d.month() >= 3 ? d.year() : d.year() - 1
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`
}

export { EMPTY as EMPTY_VALUE }
