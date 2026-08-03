import type { ReactNode } from 'react'
import { Card, Descriptions, Flex } from 'antd'
import type { Paise } from '@garage/shared'
import { formatMoney } from '@garage/shared'
import { palette } from '../theme/tokens'
import { Dash } from './Value'

/**
 * Content panels used inside workspace tabs, detail tabs and forms.
 * Ref: 03_PAGE_TEMPLATES.md §8
 */

/** A titled group of related content. The building block of every tab. */
export function SectionCard({
  title,
  description,
  extra,
  children,
  padding = 16,
  id,
}: {
  title?: ReactNode
  description?: ReactNode
  extra?: ReactNode
  children: ReactNode
  padding?: number
  id?: string
}) {
  return (
    <Card
      id={id}
      size="small"
      title={
        title ? (
          <div style={{ paddingBlock: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
            {description ? (
              <div style={{ fontSize: 12, color: palette.neutral[500], fontWeight: 400 }}>
                {description}
              </div>
            ) : null}
          </div>
        ) : undefined
      }
      extra={extra}
      styles={{ body: { padding } }}
      style={{ marginBottom: 16 }}
    >
      {children}
    </Card>
  )
}

export interface FieldRow {
  label: string
  value: ReactNode
  span?: number
}

/** Read-only field display. Uses AntD Descriptions for consistent alignment. */
export function FieldGrid({
  rows,
  columns = 3,
  bordered = false,
}: {
  rows: FieldRow[]
  columns?: number
  bordered?: boolean
}) {
  return (
    <Descriptions
      size="small"
      column={columns}
      bordered={bordered}
      colon={false}
      labelStyle={{ color: palette.neutral[500], fontSize: 12, width: bordered ? 160 : undefined }}
      contentStyle={{ fontSize: 14, color: palette.neutral[900] }}
      items={rows.map((r, i) => ({
        key: String(i),
        label: r.label,
        span: r.span,
        children: r.value ?? <Dash />,
      }))}
    />
  )
}

export interface TotalsLine {
  label: string
  value: Paise
  /** Renders larger and bolder, with a divider above. */
  emphasis?: boolean
  /** Renders in error red (e.g. discounts, balance due). */
  negative?: boolean
  hint?: string
}

/**
 * Totals panel for estimates, invoices, POS and purchase orders.
 * Money is right-aligned and tabular. §14
 */
export function TotalsPanel({
  lines,
  width = 320,
}: {
  lines: TotalsLine[]
  width?: number | string
}) {
  return (
    <div style={{ width, marginLeft: 'auto' }}>
      {lines.map((line, i) => (
        <div key={i}>
          {line.emphasis ? (
            <div style={{ borderTop: `1px solid ${palette.neutral[300]}`, marginTop: 8, paddingTop: 8 }} />
          ) : null}
          <Flex justify="space-between" align="baseline" style={{ padding: '3px 0' }}>
            <span
              style={{
                fontSize: line.emphasis ? 14 : 13,
                fontWeight: line.emphasis ? 600 : 400,
                color: line.emphasis ? palette.neutral[900] : palette.neutral[600],
              }}
            >
              {line.label}
              {line.hint ? (
                <span style={{ fontSize: 11, color: palette.neutral[400], marginLeft: 4 }}>
                  {line.hint}
                </span>
              ) : null}
            </span>
            <span
              className="erp-money"
              style={{
                fontVariantNumeric: 'tabular-nums',
                fontSize: line.emphasis ? 17 : 13,
                fontWeight: line.emphasis ? 700 : 500,
                color: line.negative ? palette.error[600] : palette.neutral[900],
              }}
            >
              {line.negative && line.value > 0 ? '− ' : ''}
              {formatMoney(line.value)}
            </span>
          </Flex>
        </div>
      ))}
    </div>
  )
}

/** Identity line used in T03/T04 headers: "Rajesh Sharma · Swift VXI · MH12AB4582" */
export function IdentityLine({ parts }: { parts: ReactNode[] }) {
  return (
    <Flex gap={8} wrap align="center" style={{ fontSize: 14, color: palette.neutral[700] }}>
      {parts.filter(Boolean).map((p, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {i > 0 ? <span style={{ color: palette.neutral[300] }}>·</span> : null}
          {p}
        </span>
      ))}
    </Flex>
  )
}

/** Labelled responsibility pairs: "Advisor: Amit Patil   Bay: B-04" */
export function MetaPairs({ pairs }: { pairs: Array<{ label: string; value: ReactNode }> }) {
  return (
    <Flex gap={20} wrap style={{ fontSize: 12, marginTop: 6 }}>
      {pairs.map((p, i) => (
        <span key={i}>
          <span style={{ color: palette.neutral[500] }}>{p.label}: </span>
          <span style={{ color: palette.neutral[800], fontWeight: 500 }}>{p.value ?? '—'}</span>
        </span>
      ))}
    </Flex>
  )
}
