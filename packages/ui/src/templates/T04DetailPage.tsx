import type { ReactNode } from 'react'
import { Badge, Flex, Tabs, Typography } from 'antd'
import type { ActionDef, StatusChipDef, SummaryMetric, WorkspaceTabDef } from '../types'
import { StatusChip } from '../components/StatusChip'
import { ActionGroup, MoreActions } from '../components/Actions'
import { SummaryStrip } from '../components/Kpi'
import { IdentityLine } from '../components/Panels'
import { StateFallback, resolvePageState } from '../components/States'
import { palette } from '../theme/tokens'

const { Text } = Typography

/**
 * T04 — DETAIL PAGE
 *
 * View and manage a REFERENCE entity and everything related to it.
 *
 * T03 vs T04 — the test:
 *   If it has a process progress bar, it is T03.
 *   If it does not, it is T04.
 *
 * T04 is a HUB. Related tabs LINK OUT; they never re-implement the related
 * module's functionality.
 *
 * Ref: 03_PAGE_TEMPLATES.md §15
 */

export interface T04DetailPageProps {
  /** Entity name / identity, e.g. "Rajesh Sharma" */
  name: ReactNode
  /** Classification chips: [ACTIVE] [GOLD MEMBER] */
  chips?: StatusChipDef[]
  /** Key contact / identity line beneath the name. */
  identity?: ReactNode[]

  /** Relationship metrics — the "360" answer at a glance. §15 */
  summary?: SummaryMetric[]

  tabs: WorkspaceTabDef[]
  activeTab: string
  onTabChange: (key: string) => void

  /** Groups common contextual actions. §15 */
  quickActions?: ActionDef[]
  primaryAction?: ActionDef
  moreActions?: ActionDef[]

  children: ReactNode

  loading?: boolean
  error?: Error | string | null
  forbidden?: boolean
}

export function T04DetailPage({
  name,
  chips = [],
  identity = [],
  summary,
  tabs,
  activeTab,
  onTabChange,
  quickActions = [],
  primaryAction,
  moreActions = [],
  children,
  loading,
  error,
  forbidden,
}: T04DetailPageProps) {
  const state = resolvePageState({ loading, error, forbidden, rowCount: 1 })

  if (state !== 'normal') {
    return (
      <StateFallback state={state} error={error} loadingVariant="page">
        {null}
      </StateFallback>
    )
  }

  return (
    <div>
      {/* ---------------------------------------------------- ENTITY HEADER */}
      <Flex justify="space-between" align="flex-start" gap={16} wrap>
        <div style={{ minWidth: 0 }}>
          <Flex align="center" gap={8} wrap>
            <Text style={{ fontSize: 20, fontWeight: 600, color: palette.neutral[900] }}>{name}</Text>
            {chips.map((c, i) => (
              <StatusChip key={i} {...c} size="small" />
            ))}
          </Flex>
          {identity.length ? (
            <div style={{ marginTop: 4 }}>
              <IdentityLine parts={identity} />
            </div>
          ) : null}
        </div>

        <Flex gap={8} align="center">
          {quickActions.length ? (
            <MoreActions actions={quickActions} label="Quick Actions" />
          ) : null}
          <ActionGroup primary={primaryAction} more={moreActions} />
        </Flex>
      </Flex>

      {/* --------------------------------------------------- SUMMARY STRIP */}
      {summary?.length ? (
        <div style={{ marginTop: 12 }}>
          <SummaryStrip metrics={summary} />
        </div>
      ) : null}

      {/* ---------------------------------------------------------- TABS */}
      <Tabs
        activeKey={activeTab}
        onChange={onTabChange}
        style={{ marginTop: 8 }}
        items={tabs.map((tab) => ({
          key: tab.key,
          disabled: tab.disabled,
          label: (
            <Badge count={tab.badge ?? 0} size="small" offset={[6, -2]}>
              <span>
                {tab.icon} {tab.label}
              </span>
            </Badge>
          ),
        }))}
      />

      <div>{children}</div>
    </div>
  )
}
