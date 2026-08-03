/**
 * Template contracts.
 *
 * A screen supplies DATA and DEFINITIONS. It never supplies layout.
 * Ref: 03_PAGE_TEMPLATES.md §24
 */

import type { ReactNode } from 'react'
import type { Option, Paise, Severity, StatusTone } from '@garage/shared'

/* ------------------------------------------------------------------ actions */

export type ActionType = 'primary' | 'default' | 'text' | 'link' | 'dashed'

export interface ActionDef {
  key: string
  label: string
  icon?: ReactNode
  onClick?: () => void
  /** Renders as a router link instead of a button. */
  href?: string
  type?: ActionType
  danger?: boolean
  disabled?: boolean
  /** Shown as a tooltip explaining why the action is unavailable. */
  disabledReason?: string
  /** Hidden when the current user lacks this permission. */
  permission?: string
  loading?: boolean
  /** Renders a divider above this item inside a dropdown. */
  dividerBefore?: boolean
}

/* ------------------------------------------------------------------- status */

export interface StatusChipDef {
  label: string
  tone: StatusTone
  overdue?: boolean
  icon?: ReactNode
}

/* -------------------------------------------------------------------- table */

export type ColumnType =
  | 'text'
  | 'money'
  | 'quantity'
  | 'number'
  | 'date'
  | 'datetime'
  | 'status'
  | 'identifier'
  | 'mobile'
  | 'registration'
  | 'custom'

export interface ColumnDef<T> {
  key: string
  title: string
  /** Property path on the row. Defaults to `key`. */
  dataIndex?: string | string[]
  type?: ColumnType
  width?: number
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  /** Hidden by default; user can enable via column settings. */
  hidden?: boolean
  /** Never hideable — identity columns. */
  locked?: boolean
  /** Status columns resolve their tone through this map. */
  statusMap?: Record<string, StatusTone>
  /** Unit suffix for quantity columns. */
  unit?: string
  render?: (value: unknown, row: T, index: number) => ReactNode
  tooltip?: string
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
}

/* ------------------------------------------------------------------ filters */

export type FilterType =
  | 'select'
  | 'multiselect'
  | 'text'
  | 'number'
  | 'date'
  | 'daterange'
  | 'boolean'

export interface FilterDef {
  key: string
  label: string
  type: FilterType
  options?: Option[]
  placeholder?: string
  /** Placed behind "More filters" rather than shown inline. §13 */
  advanced?: boolean
  width?: number
}

export type FilterValues = Record<string, unknown>

/** Status-count tabs above a list. Ref: Workshop §6 */
export interface QuickFilterDef {
  key: string
  label: string
  count?: number
  tone?: StatusTone
}

export interface SavedViewDef {
  key: string
  label: string
  filters: FilterValues
  isDefault?: boolean
}

/* ------------------------------------------------------------------ summary */

export interface SummaryMetric {
  key: string
  label: string
  value: ReactNode | Paise
  type?: 'text' | 'money' | 'quantity' | 'number'
  unit?: string
  tone?: 'default' | 'success' | 'danger' | 'muted'
  /** Rendered smaller beneath the value. */
  hint?: string
}

/* -------------------------------------------------------------------- stages */

export type StageState = 'complete' | 'current' | 'pending' | 'skipped' | 'error'

export interface StageDef {
  key: string
  label: string
  state: StageState
  /** Navigates to this tab when the stage is clicked. */
  tabKey?: string
}

/* ---------------------------------------------------------------------- tabs */

export interface WorkspaceTabDef {
  key: string
  label: string
  icon?: ReactNode
  /** Pending-count badge. */
  badge?: number
  disabled?: boolean
  /** Tooltip explaining why a tab is not yet reachable. */
  disabledReason?: string
  permission?: string
}

/* -------------------------------------------------------------------- states */

export interface EmptyStateDef {
  title: string
  description?: string
  action?: ActionDef
  icon?: ReactNode
}

/* --------------------------------------------------------------------- forms */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'money'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'datetime'
  | 'time'
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'upload'
  | 'custom'

export interface FormFieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  help?: string
  options?: Option<string | number>[]
  /** Grid span out of 24. Defaults to 12 (two columns). */
  span?: number
  disabled?: boolean
  maxLength?: number
  rows?: number
  prefix?: ReactNode
  suffix?: ReactNode
  /**
   * Custom control. Receives the value and onChange that Ant Design's
   * Form.Item injects, so custom pickers participate in form state normally.
   */
  render?: (props: { value?: unknown; onChange?: (v: unknown) => void }) => ReactNode
}

export interface FormSectionDef {
  key: string
  title: string
  description?: string
  fields: FormFieldDef[]
  /** Shown only in full mode, hidden in quick-create mode. */
  advanced?: boolean
}

/* --------------------------------------------------------------- dashboard */

export interface KpiDef {
  key: string
  label: string
  value: ReactNode | Paise
  type?: 'text' | 'money' | 'number'
  /** Percentage change vs the comparison period. */
  delta?: number
  deltaLabel?: string
  /** Higher is better. Set false for metrics like "overdue jobs". */
  higherIsBetter?: boolean
  icon?: ReactNode
  /** EVERY KPI must drill down. A KPI that goes nowhere is not allowed. §12 */
  href: string
}

export interface AttentionItemDef {
  key: string
  severity: Severity
  label: string
  count?: number
  href: string
  actionLabel?: string
}

/* ------------------------------------------------------------------- boards */

export interface BoardCardDef {
  key: string
  title: string
  subtitle?: string
  status?: StatusChipDef
  meta?: Array<{ label: string; value: string }>
  /** 0–100. Renders a progress bar when present. */
  progress?: number
  footer?: ReactNode
  onClick?: () => void
}

export interface BoardColumnDef {
  key: string
  label: string
  cards: BoardCardDef[]
  tone?: StatusTone
}

/* ------------------------------------------------------------------ reports */

export interface ReportMetaDef {
  reportName: string
  dateRange?: string
  branch?: string
  appliedFilters?: Array<{ label: string; value: string }>
  generatedAt?: string
  resultCount?: number
}

/* ----------------------------------------------------------------- settings */

export interface SettingsCategoryDef {
  key: string
  label: string
  icon?: ReactNode
  children?: SettingsCategoryDef[]
  permission?: string
}

/* ------------------------------------------------------------------ masters */

export interface MasterDef {
  key: string
  label: string
  group: string
  /** Columns beyond the standard Name / Code / Usage / Status. */
  columns?: ColumnDef<Record<string, unknown>>[]
  fields: FormFieldDef[]
  /** Parent master key for hierarchical masters (Manufacturer → Model). */
  parent?: string
  supportsImport?: boolean
}

export interface MasterGroupDef {
  key: string
  label: string
  masters: MasterDef[]
}

/* --------------------------------------------------------------------- POS */

export interface PosLineItem {
  key: string
  name: string
  code?: string
  quantity: number
  unit?: string
  rate: Paise
  discount?: Paise
  amount: Paise
  availableStock?: number
}

export interface PosTotals {
  itemCount: number
  subtotal: Paise
  discount: Paise
  taxable: Paise
  cgst: Paise
  sgst: Paise
  igst: Paise
  total: Paise
}

/* ------------------------------------------------------------------- print */

export interface PrintTemplateOption {
  key: string
  label: string
}

export type PrintCopyType = 'Original' | 'Duplicate' | 'Triplicate'
