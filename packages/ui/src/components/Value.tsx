import type { CSSProperties, ReactNode } from 'react'
import type { Paise } from '@garage/shared'
import {
  EMPTY_VALUE,
  formatDate,
  formatDateTime,
  formatMobile,
  formatMoney,
  formatMoneyShort,
  formatNumber,
  formatPercent,
  formatQuantity,
  formatRegistration,
} from '@garage/shared'
import { palette } from '../theme/tokens'

/**
 * Value renderers.
 *
 * Every money, date, quantity and identifier in the ERP renders through one of
 * these. This is what guarantees a single date format and consistent numeric
 * alignment across 16 modules.
 *
 * Ref: 01_ADMIN_THEME.md §14
 */

const tabular: CSSProperties = { fontVariantNumeric: 'tabular-nums' }

export function MoneyText({
  value,
  short = false,
  strong = false,
  colored = false,
}: {
  value?: Paise | null
  /** Abbreviated form (₹ 12.4 L). Dashboards only — never on a document. §14 */
  short?: boolean
  strong?: boolean
  /** Colour negatives red. */
  colored?: boolean
}) {
  const text = short ? formatMoneyShort(value) : formatMoney(value)
  const negative = (value ?? 0) < 0
  return (
    <span
      className="erp-money"
      style={{
        ...tabular,
        fontWeight: strong ? 600 : undefined,
        color: colored && negative ? palette.error[500] : undefined,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  )
}

export function QuantityText({
  value,
  unit,
}: {
  value?: number | null
  unit?: string
}) {
  return (
    <span className="erp-qty" style={{ ...tabular, whiteSpace: 'nowrap' }}>
      {formatQuantity(value, unit)}
    </span>
  )
}

export function NumberText({ value, decimals = 0 }: { value?: number | null; decimals?: number }) {
  return (
    <span className="erp-tabular" style={tabular}>
      {formatNumber(value, decimals)}
    </span>
  )
}

export function DateText({ value }: { value?: string | Date | null }) {
  return <span style={{ whiteSpace: 'nowrap' }}>{formatDate(value)}</span>
}

export function DateTimeText({ value }: { value?: string | Date | null }) {
  return <span style={{ whiteSpace: 'nowrap' }}>{formatDateTime(value)}</span>
}

/** Document numbers, VIN, SKU, barcodes. Never truncated. §13 */
export function IdentifierText({ value }: { value?: string | null }) {
  if (!value) return <Dash />
  return <span className="erp-mono">{value}</span>
}

export function RegistrationText({ value }: { value?: string | null }) {
  if (!value) return <Dash />
  return <span className="erp-mono">{formatRegistration(value)}</span>
}

export function MobileText({ value }: { value?: string | null }) {
  if (!value) return <Dash />
  return <span style={{ ...tabular, whiteSpace: 'nowrap' }}>{formatMobile(value)}</span>
}

export function PercentDelta({
  value,
  higherIsBetter = true,
  label,
}: {
  value?: number | null
  higherIsBetter?: boolean
  label?: string
}) {
  if (value === null || value === undefined) return <Dash />
  const positive = value > 0
  const good = positive === higherIsBetter
  const color = value === 0 ? palette.neutral[500] : good ? palette.success[500] : palette.error[500]
  return (
    <span style={{ ...tabular, color, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>
      {positive ? '▲' : value < 0 ? '▼' : ''} {formatPercent(value)}
      {label ? <span style={{ color: palette.neutral[500], fontWeight: 400 }}> {label}</span> : null}
    </span>
  )
}

/** Never render an empty cell as blank. §14 */
export function Dash() {
  return <span style={{ color: palette.neutral[400] }}>{EMPTY_VALUE}</span>
}

/** For detail fields rather than table cells. */
export function NotProvided() {
  return <span style={{ color: palette.neutral[500] }}>Not provided</span>
}

export function orDashNode(node: ReactNode): ReactNode {
  if (node === null || node === undefined || node === '') return <Dash />
  return node
}
