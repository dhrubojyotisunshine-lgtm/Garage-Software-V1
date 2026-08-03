import type { ReactNode } from 'react'
import { Card, Flex } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import type { Paise, Severity } from '@garage/shared'
import { SEVERITY_ORDER, formatMoneyShort, formatNumber } from '@garage/shared'
import type { AttentionItemDef, KpiDef, SummaryMetric } from '../types'
import { MoneyText, PercentDelta } from './Value'
import { severityColors } from '../theme/statusColors'
import { palette } from '../theme/tokens'

/**
 * KPI cards, attention strip and summary metrics.
 * Ref: 03_PAGE_TEMPLATES.md §12, §14; 01_ADMIN_THEME.md §14
 */

function renderKpiValue(kpi: KpiDef): ReactNode {
  if (kpi.type === 'money') return formatMoneyShort(kpi.value as Paise)
  if (kpi.type === 'number') return formatNumber(kpi.value as number)
  return kpi.value as ReactNode
}

/**
 * EVERY KPI card drills down. A KPI that goes nowhere is not allowed. §12
 * `href` is therefore required by KpiDef, not optional.
 */
export function KpiCard({ kpi, onNavigate }: { kpi: KpiDef; onNavigate?: (href: string) => void }) {
  return (
    <Card
      size="small"
      hoverable
      onClick={() => onNavigate?.(kpi.href)}
      styles={{ body: { padding: 16 } }}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <Flex justify="space-between" align="flex-start">
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, color: palette.neutral[500], fontWeight: 500 }}>
            {kpi.label}
          </div>
          <div
            className="erp-tabular"
            style={{
              fontSize: 28,
              lineHeight: '36px',
              fontWeight: 700,
              color: palette.neutral[900],
              marginTop: 2,
            }}
          >
            {renderKpiValue(kpi)}
          </div>
          {kpi.delta !== undefined ? (
            <div style={{ marginTop: 2 }}>
              <PercentDelta
                value={kpi.delta}
                higherIsBetter={kpi.higherIsBetter ?? true}
                label={kpi.deltaLabel ?? 'vs last period'}
              />
            </div>
          ) : null}
        </div>
        {kpi.icon ? (
          <div style={{ fontSize: 20, color: palette.neutral[300] }}>{kpi.icon}</div>
        ) : null}
      </Flex>
    </Card>
  )
}

/**
 * Attention strip — severity ordered: Critical → Warning → Info. §12
 * Sorting is enforced here so a screen cannot get the order wrong.
 */
export function AttentionStrip({
  items,
  onNavigate,
}: {
  items: AttentionItemDef[]
  onNavigate?: (href: string) => void
}) {
  if (!items.length) return null
  const sorted = [...items].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])

  return (
    <Flex gap={8} wrap style={{ marginBottom: 16 }}>
      {sorted.map((item) => {
        const c = severityColors[item.severity as Severity]
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavigate?.(item.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 6,
              border: `1px solid ${c.border}`,
              background: c.bg,
              color: c.text,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {item.count !== undefined ? (
              <span
                className="erp-tabular"
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  minWidth: 20,
                  textAlign: 'center',
                }}
              >
                {item.count}
              </span>
            ) : null}
            <span>{item.label}</span>
            <ArrowRightOutlined style={{ fontSize: 11, opacity: 0.7 }} />
          </button>
        )
      })}
    </Flex>
  )
}

/**
 * Compact metric strip used by T03 and T04 headers.
 * Always includes money state where money exists. §14
 */
export function SummaryStrip({ metrics }: { metrics: SummaryMetric[] }) {
  if (!metrics.length) return null
  return (
    <Flex
      wrap
      style={{
        gap: 0,
        padding: '10px 0',
        borderTop: `1px solid ${palette.neutral[200]}`,
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.key}
          style={{
            paddingInline: i === 0 ? '0 20px' : 20,
            borderLeft: i === 0 ? 'none' : `1px solid ${palette.neutral[200]}`,
            minWidth: 110,
          }}
        >
          <div style={{ fontSize: 11, color: palette.neutral[500], fontWeight: 500 }}>{m.label}</div>
          <div
            className="erp-tabular"
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginTop: 1,
              color:
                m.tone === 'success'
                  ? palette.success[700]
                  : m.tone === 'danger'
                    ? palette.error[700]
                    : m.tone === 'muted'
                      ? palette.neutral[500]
                      : palette.neutral[900],
            }}
          >
            {m.type === 'money' ? <MoneyText value={m.value as Paise} /> : (m.value as ReactNode)}
          </div>
          {m.hint ? (
            <div style={{ fontSize: 11, color: palette.neutral[400] }}>{m.hint}</div>
          ) : null}
        </div>
      ))}
    </Flex>
  )
}

/** Dashboard widget wrapper — title, optional filter, and a "View all" link. §12 */
export function DashboardWidget({
  title,
  extra,
  viewAllHref,
  onNavigate,
  children,
  bodyPadding = 12,
}: {
  title: ReactNode
  extra?: ReactNode
  viewAllHref?: string
  onNavigate?: (href: string) => void
  children: ReactNode
  bodyPadding?: number
}) {
  return (
    <Card
      size="small"
      title={<span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>}
      extra={
        <Flex gap={8} align="center">
          {extra}
          {viewAllHref ? (
            <a
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.(viewAllHref)
              }}
              href={viewAllHref}
              style={{ fontSize: 12 }}
            >
              View all
            </a>
          ) : null}
        </Flex>
      }
      styles={{ body: { padding: bodyPadding } }}
      style={{ height: '100%' }}
    >
      {children}
    </Card>
  )
}
