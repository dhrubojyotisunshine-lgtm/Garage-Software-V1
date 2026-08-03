import type { ReactNode } from 'react'
import type { Severity, StatusTone } from '@garage/shared'
import type { ColumnDef, FilterDef, QuickFilterDef } from '@garage/ui'

/**
 * Demo module definitions.
 *
 * A mockup module is DATA — dashboard config plus list configs. Two generic
 * renderers turn 12 of these into 24 screens, so adding or changing a demo is
 * an edit to a definition, never new layout code.
 */

export interface DemoKpi {
  key: string
  label: string
  /** Pre-formatted for display — these are illustrations, not calculations. */
  value: string
  delta?: number
  higherIsBetter?: boolean
  icon?: ReactNode
}

export interface DemoAttention {
  key: string
  severity: Severity
  label: string
  count: number
}

export interface DemoWidgetRow {
  title: string
  subtitle?: string
  right?: string
  tag?: { label: string; tone: StatusTone }
}

export interface DemoWidget {
  key: string
  title: string
  /** Grid width out of 24. */
  span: number
  rows: DemoWidgetRow[]
}

export interface DemoDashboardDef {
  title: string
  description: string
  kpis: DemoKpi[]
  attention?: DemoAttention[]
  widgets: DemoWidget[]
}

export interface DemoListDef {
  /** Route segment beneath the module path, e.g. "stock". */
  path: string
  title: string
  description?: string
  quickFilters?: QuickFilterDef[]
  searchPlaceholder: string
  filters: FilterDef[]
  columns: ColumnDef<DemoRow>[]
  rows: DemoRow[]
  primaryActionLabel?: string
}

export type DemoRow = Record<string, unknown> & { id: string }

export interface DemoModuleDef {
  key: string
  label: string
  /** Base route, e.g. "/vehicle-sales". */
  path: string
  dashboard?: DemoDashboardDef
  lists: DemoListDef[]
}
