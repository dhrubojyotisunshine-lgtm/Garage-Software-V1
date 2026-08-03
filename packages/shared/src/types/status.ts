/**
 * Status tone system.
 *
 * A "tone" is the SEMANTIC bucket a status belongs to. Colour is derived from
 * the tone by the theme — a module never picks a colour.
 *
 * Ref: 01_ADMIN_THEME.md §6, 03_PAGE_TEMPLATES.md §9
 */

export const STATUS_TONES = [
  'neutral', // Draft, New, Not Started
  'progress', // Repair In Progress, Open, Invoiced
  'waiting', // Waiting for Parts / Bay / Outsource, On Hold
  'action', // Approval Pending, Overdue, QC Pending — someone must act
  'success', // Approved, Paid, Delivered, Ready
  'failure', // Rejected, Cancelled, Bounced
  'closed', // Closed, Archived, Completed
] as const

export type StatusTone = (typeof STATUS_TONES)[number]

/** A resolved status ready for rendering. */
export interface StatusDef {
  label: string
  tone: StatusTone
  /** Overdue always renders as `failure` regardless of base tone. §6 */
  overdue?: boolean
}

/** Maps a module's status strings to tones. One per entity. */
export type StatusMap = Record<string, StatusTone>

/**
 * Resolve a raw status string to a StatusDef.
 * Unknown statuses fall back to `neutral` rather than throwing — an unmapped
 * status is a spec gap, not a runtime crash.
 */
export function resolveStatus(
  status: string | null | undefined,
  map: StatusMap,
  opts?: { overdue?: boolean },
): StatusDef {
  if (!status) return { label: '—', tone: 'neutral' }
  const tone = map[status] ?? 'neutral'
  return { label: status, tone, overdue: opts?.overdue ?? false }
}

/** Attention/alert severity, used by dashboards and the attention strip. */
export type Severity = 'critical' | 'warning' | 'info'

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
}
