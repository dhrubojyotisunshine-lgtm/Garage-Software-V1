import type { ReactNode } from 'react'
import { Col, Flex, Row, Segmented, Space } from 'antd'
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons'
import type { ActionDef, AttentionItemDef, KpiDef } from '../types'
import { PageHeader } from '../components/PageHeader'
import { AttentionStrip, KpiCard } from '../components/Kpi'
import { ActionButton } from '../components/Actions'
import { LoadingState } from '../components/States'
import { palette } from '../theme/tokens'

/**
 * T01 — DASHBOARD
 *
 * Monitoring and drill-down entry point.
 * Dashboard is READ + NAVIGATE. It is never a transaction entry screen.
 *
 * Ref: 03_PAGE_TEMPLATES.md §12, 04_ALL_MODULES.md §5
 */

/** Date filter presets. Ref: Dashboard flow §7 */
export const DATE_PRESETS = [
  'Today',
  'Yesterday',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'This Year',
  'Last Year',
] as const

export type DatePreset = (typeof DATE_PRESETS)[number] | 'Custom'

export interface T01DashboardProps {
  title: ReactNode
  description?: ReactNode
  context?: ReactNode

  /** 4–6 cards maximum. Enforced at runtime in development. §12 */
  kpis: KpiDef[]
  attention?: AttentionItemDef[]

  datePreset?: DatePreset
  onDateChange?: (preset: DatePreset) => void
  onRefresh?: () => void
  onCustomize?: () => void

  /** Widget grid. Compose with <DashboardWidget> inside <Col>. */
  children?: ReactNode

  /** Max 8. Mirror of + Create, scoped to this dashboard. §12 */
  quickActions?: ActionDef[]

  loading?: boolean
  onNavigate?: (href: string) => void
}

export function T01Dashboard({
  title,
  description,
  context,
  kpis,
  attention = [],
  datePreset = 'Today',
  onDateChange,
  onRefresh,
  onCustomize,
  children,
  quickActions = [],
  loading,
  onNavigate,
}: T01DashboardProps) {
  if (import.meta.env?.DEV && kpis.length > 6) {
    console.warn(
      `[T01] ${kpis.length} primary KPIs supplied. 03_PAGE_TEMPLATES.md §12 caps this at 6.`,
    )
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        context={context}
        extra={
          <Space size={8}>
            <Segmented
              size="middle"
              value={datePreset}
              onChange={(v) => onDateChange?.(v as DatePreset)}
              options={['Today', 'This Week', 'This Month', 'This Year']}
            />
            {onRefresh ? (
              <ActionButton action={{ key: 'refresh', label: '', icon: <ReloadOutlined />, onClick: onRefresh }} />
            ) : null}
            {onCustomize ? (
              <ActionButton
                action={{ key: 'customize', label: 'Customize', icon: <SettingOutlined />, onClick: onCustomize }}
              />
            ) : null}
          </Space>
        }
      />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {/* PRIMARY KPI ROW */}
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            {kpis.map((kpi) => (
              <Col key={kpi.key} xs={24} sm={12} md={8} xl={Math.max(4, Math.floor(24 / kpis.length))}>
                <KpiCard kpi={kpi} onNavigate={onNavigate} />
              </Col>
            ))}
          </Row>

          {/* ATTENTION / ALERT STRIP */}
          <AttentionStrip items={attention} onNavigate={onNavigate} />

          {/* WIDGET GRID */}
          <Row gutter={[16, 16]}>{children}</Row>

          {/* QUICK ACTIONS */}
          {quickActions.length ? (
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: `1px solid ${palette.neutral[200]}`,
              }}
            >
              <div
                style={{ fontSize: 12, color: palette.neutral[500], marginBottom: 8, fontWeight: 500 }}
              >
                QUICK ACTIONS
              </div>
              <Flex gap={8} wrap>
                {quickActions.slice(0, 8).map((a) => (
                  <ActionButton key={a.key} action={a} />
                ))}
              </Flex>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
