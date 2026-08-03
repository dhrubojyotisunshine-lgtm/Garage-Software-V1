import type { ReactNode } from 'react'
import { Badge, Flex, Tabs, Tooltip, Typography } from 'antd'
import type { ActionDef, StageDef, StatusChipDef, SummaryMetric, WorkspaceTabDef } from '../types'
import { StatusChip } from '../components/StatusChip'
import { ActionGroup } from '../components/Actions'
import { SummaryStrip } from '../components/Kpi'
import { ProcessProgress } from '../components/ProcessProgress'
import { IdentityLine, MetaPairs } from '../components/Panels'
import { StateFallback, resolvePageState } from '../components/States'
import { palette } from '../theme/tokens'

const { Text } = Typography

/**
 * T03 — PRIMARY BUSINESS WORKSPACE
 *
 * Run a complete, multi-stage business process on ONE record without leaving
 * the page. The most important template in the ERP.
 *
 * Key rules enforced here:
 *  - One record, one workspace, all roles (Workshop §9)
 *  - Progress bar is NOT a wizard — free navigation between allowed stages (§12)
 *  - Tabs are internal navigation, never promoted to the sidebar (§13)
 *  - Documents and Timeline are always the last two tabs
 *
 * Ref: 03_PAGE_TEMPLATES.md §14
 */

export interface T03WorkspaceProps {
  /** e.g. "JOB CARD #JC-2026-001248" */
  recordNumber: ReactNode
  status: StatusChipDef
  priority?: StatusChipDef

  /** Customer · vehicle · registration */
  identity: ReactNode[]
  /** Advisor · technician · bay · branch */
  responsibility?: Array<{ label: string; value: ReactNode }>

  /** 5–8 compact metrics. Always include money state where money exists. §14 */
  summary?: SummaryMetric[]

  /** Visual lifecycle: ✓ complete · ● current · ○ pending */
  stages?: StageDef[]

  tabs: WorkspaceTabDef[]
  activeTab: string
  onTabChange: (key: string) => void

  primaryAction?: ActionDef
  secondaryAction?: ActionDef
  moreActions?: ActionDef[]

  /** Sticky bar for a stage's completion action ("Complete Check-In"). §14 */
  stickyAction?: ActionDef

  children: ReactNode

  loading?: boolean
  error?: Error | string | null
  forbidden?: boolean
  onBack?: () => void
}

export function T03Workspace({
  recordNumber,
  status,
  priority,
  identity,
  responsibility,
  summary,
  stages,
  tabs,
  activeTab,
  onTabChange,
  primaryAction,
  secondaryAction,
  moreActions,
  stickyAction,
  children,
  loading,
  error,
  forbidden,
}: T03WorkspaceProps) {
  const state = resolvePageState({ loading, error, forbidden, rowCount: 1 })

  if (state !== 'normal') {
    return (
      <StateFallback state={state} error={error} loadingVariant="page">
        {null}
      </StateFallback>
    )
  }

  return (
    <div style={{ paddingBottom: stickyAction ? 64 : 0 }}>
      {/* ---------------------------------------------------- RECORD HEADER */}
      <Flex justify="space-between" align="flex-start" gap={16} wrap>
        <div style={{ minWidth: 0 }}>
          <Flex align="center" gap={8} wrap>
            <Text
              className="erp-mono"
              style={{ fontSize: 18, fontWeight: 700, color: palette.neutral[900] }}
            >
              {recordNumber}
            </Text>
            <StatusChip {...status} />
            {priority ? <StatusChip {...priority} size="small" /> : null}
          </Flex>

          <div style={{ marginTop: 6 }}>
            <IdentityLine parts={identity} />
          </div>

          {responsibility?.length ? <MetaPairs pairs={responsibility} /> : null}
        </div>

        <ActionGroup primary={primaryAction} secondary={secondaryAction} more={moreActions ?? []} />
      </Flex>

      {/* --------------------------------------------------- HEADER SUMMARY */}
      {summary?.length ? (
        <div style={{ marginTop: 12 }}>
          <SummaryStrip metrics={summary} />
        </div>
      ) : null}

      {/* -------------------------------------------------- PROCESS PROGRESS */}
      {stages?.length ? (
        <ProcessProgress
          stages={stages}
          onStageClick={(stage) => {
            if (stage.tabKey) onTabChange(stage.tabKey)
          }}
        />
      ) : null}

      {/* ---------------------------------------------------- WORKSPACE TABS */}
      <Tabs
        activeKey={activeTab}
        onChange={onTabChange}
        items={tabs.map((tab) => ({
          key: tab.key,
          disabled: tab.disabled,
          label: tab.disabled && tab.disabledReason ? (
            <Tooltip title={tab.disabledReason}>
              <span>
                {tab.icon} {tab.label}
              </span>
            </Tooltip>
          ) : (
            <Badge count={tab.badge ?? 0} size="small" offset={[6, -2]}>
              <span>
                {tab.icon} {tab.label}
              </span>
            </Badge>
          ),
        }))}
      />

      {/* --------------------------------------------------------- TAB BODY */}
      <div>{children}</div>

      {/* -------------------------------------------------- STICKY ACTION BAR */}
      {stickyAction ? (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 'var(--erp-sider-current-width, 240px)',
            right: 0,
            padding: '12px 24px',
            background: palette.neutral[0],
            borderTop: `1px solid ${palette.neutral[200]}`,
            boxShadow: '0 -2px 6px rgba(15,23,42,.05)',
            zIndex: 10,
          }}
        >
          <Flex justify="flex-end">
            <ActionGroup primary={{ ...stickyAction, type: 'primary' }} />
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

/**
 * The last two tabs of every T03 and T04 are Documents and Timeline. §14/§15
 * Helper so no module forgets them.
 */
export function withStandardTabs(tabs: WorkspaceTabDef[]): WorkspaceTabDef[] {
  const hasDocuments = tabs.some((t) => t.key === 'documents')
  const hasTimeline = tabs.some((t) => t.key === 'timeline')
  return [
    ...tabs,
    ...(hasDocuments ? [] : [{ key: 'documents', label: 'Documents' }]),
    ...(hasTimeline ? [] : [{ key: 'timeline', label: 'Timeline' }]),
  ]
}
