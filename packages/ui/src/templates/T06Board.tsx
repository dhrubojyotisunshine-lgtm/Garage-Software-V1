import type { ReactNode } from 'react'
import { Button, Card, Flex, Progress, Space, Tooltip } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined } from '@ant-design/icons'
import type { BoardCardDef, BoardColumnDef, FilterDef, FilterValues } from '../types'
import { StatusChip } from '../components/StatusChip'
import { FilterBar } from '../components/FilterBar'
import { InlineEmpty, LoadingState } from '../components/States'
import { colorsFor } from '../theme/statusColors'
import { palette } from '../theme/tokens'

/**
 * T06 — OPERATIONAL BOARD
 *
 * Full-screen live operational visibility for floor management.
 *
 * Variants: kanban (Vehicle Queue) · grid (Bay Board) · list (Technician
 * Board) · calendar (Service Calendar).
 *
 * Every card click opens the underlying workspace — Workshop §17:
 * "Clicking vehicle/job should open Job Card Workspace."
 *
 * Ref: 03_PAGE_TEMPLATES.md §17
 */

export interface T06BoardProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Shown as "Updated 2 min ago". Auto-refresh must be visible. §17 */
  lastUpdated?: string
  onRefresh?: () => void

  filters?: FilterDef[]
  filterValues?: FilterValues
  onFilterChange?: (v: FilterValues) => void

  fullScreen?: boolean
  onToggleFullScreen?: () => void

  loading?: boolean
  children: ReactNode
  extra?: ReactNode
}

export function T06Board({
  title,
  subtitle,
  lastUpdated,
  onRefresh,
  filters,
  filterValues = {},
  onFilterChange,
  fullScreen,
  onToggleFullScreen,
  loading,
  children,
  extra,
}: T06BoardProps) {
  return (
    <div
      style={
        fullScreen
          ? {
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: palette.neutral[100],
              padding: 16,
              overflow: 'auto',
            }
          : undefined
      }
    >
      <Flex justify="space-between" align="center" gap={16} wrap style={{ marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
          <Flex gap={8} align="center" style={{ fontSize: 12, color: palette.neutral[500] }}>
            {subtitle}
            {lastUpdated ? (
              <>
                <span>·</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: palette.success[500],
                      display: 'inline-block',
                    }}
                  />
                  Updated {lastUpdated}
                </span>
              </>
            ) : null}
          </Flex>
        </div>

        <Space size={8}>
          {extra}
          {onRefresh ? (
            <Button icon={<ReloadOutlined />} onClick={onRefresh} aria-label="Refresh board" />
          ) : null}
          {onToggleFullScreen ? (
            <Button
              icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={onToggleFullScreen}
              aria-label="Toggle full screen"
            />
          ) : null}
        </Space>
      </Flex>

      {filters?.length && onFilterChange ? (
        <FilterBar
          searchPlaceholder="Search this board"
          searchValue={(filterValues.search as string) ?? ''}
          onSearchChange={(v) => onFilterChange({ ...filterValues, search: v })}
          filters={filters}
          values={filterValues}
          onChange={onFilterChange}
        />
      ) : null}

      {loading ? <LoadingState variant="card" /> : children}
    </div>
  )
}

/* -------------------------------------------------------------- board card */

/** Dense and scannable in under two seconds. §17 */
export function BoardCard({ card }: { card: BoardCardDef }) {
  return (
    <Card
      size="small"
      hoverable
      onClick={card.onClick}
      styles={{ body: { padding: 10 } }}
      style={{ marginBottom: 8, cursor: card.onClick ? 'pointer' : 'default' }}
    >
      <Flex justify="space-between" align="flex-start" gap={8}>
        <div style={{ minWidth: 0 }}>
          <div
            className="erp-mono"
            style={{ fontSize: 12, fontWeight: 600, color: palette.neutral[900] }}
          >
            {card.title}
          </div>
          {card.subtitle ? (
            <div style={{ fontSize: 12, color: palette.neutral[600], marginTop: 1 }}>
              {card.subtitle}
            </div>
          ) : null}
        </div>
        {card.status ? <StatusChip {...card.status} size="small" /> : null}
      </Flex>

      {card.meta?.length ? (
        <Flex gap={10} wrap style={{ marginTop: 6, fontSize: 11, color: palette.neutral[500] }}>
          {card.meta.map((m, i) => (
            <span key={i}>
              {m.label}: <strong style={{ color: palette.neutral[700] }}>{m.value}</strong>
            </span>
          ))}
        </Flex>
      ) : null}

      {card.progress !== undefined ? (
        <Progress
          percent={card.progress}
          size="small"
          showInfo={false}
          strokeColor={palette.primary[500]}
          style={{ marginTop: 6, marginBottom: 0 }}
        />
      ) : null}

      {card.footer ? <div style={{ marginTop: 6 }}>{card.footer}</div> : null}
    </Card>
  )
}

/* ------------------------------------------------------------ kanban view */

export function BoardKanban({ columns }: { columns: BoardColumnDef[] }) {
  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
      {columns.map((col) => {
        const tone = col.tone ? colorsFor(col.tone) : null
        return (
          <div
            key={col.key}
            style={{
              minWidth: 260,
              flex: '0 0 260px',
              background: palette.neutral[50],
              borderRadius: 8,
              border: `1px solid ${palette.neutral[200]}`,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '100%',
            }}
          >
            <Flex
              justify="space-between"
              align="center"
              style={{
                padding: '8px 10px',
                borderBottom: `1px solid ${palette.neutral[200]}`,
                position: 'sticky',
                top: 0,
                background: palette.neutral[50],
                borderRadius: '8px 8px 0 0',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: tone?.text ?? palette.neutral[700] }}>
                {col.label}
              </span>
              <span
                className="erp-tabular"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '1px 7px',
                  borderRadius: 10,
                  background: tone?.bg ?? palette.neutral[200],
                  color: tone?.text ?? palette.neutral[700],
                }}
              >
                {col.cards.length}
              </span>
            </Flex>

            <div style={{ padding: 8, overflowY: 'auto', flex: 1 }}>
              {col.cards.length ? (
                col.cards.map((c) => <BoardCard key={c.key} card={c} />)
              ) : (
                <div style={{ padding: 16, textAlign: 'center', fontSize: 12, color: palette.neutral[400] }}>
                  Empty
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------------- grid view */

export interface BoardTile {
  key: string
  title: string
  status: string
  tone: 'neutral' | 'progress' | 'waiting' | 'action' | 'success' | 'failure' | 'closed'
  lines?: Array<{ label: string; value: string }>
  progress?: number
  onClick?: () => void
}

export function BoardGrid({ tiles, minWidth = 180 }: { tiles: BoardTile[]; minWidth?: number }) {
  if (!tiles.length) return <InlineEmpty text="Nothing on this board" />
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gap: 12,
      }}
    >
      {tiles.map((tile) => {
        const c = colorsFor(tile.tone)
        return (
          <Card
            key={tile.key}
            size="small"
            hoverable={!!tile.onClick}
            onClick={tile.onClick}
            styles={{ body: { padding: 12 } }}
            style={{
              borderTop: `3px solid ${c.text}`,
              cursor: tile.onClick ? 'pointer' : 'default',
            }}
          >
            <Flex justify="space-between" align="center">
              <span style={{ fontWeight: 600, fontSize: 13 }}>{tile.title}</span>
              <StatusChip label={tile.status} tone={tile.tone} size="small" />
            </Flex>
            {tile.lines?.map((l, i) => (
              <div key={i} style={{ fontSize: 12, color: palette.neutral[600], marginTop: 4 }}>
                <span style={{ color: palette.neutral[400] }}>{l.label}: </span>
                {l.value}
              </div>
            ))}
            {tile.progress !== undefined ? (
              <Progress
                percent={tile.progress}
                size="small"
                strokeColor={palette.primary[500]}
                style={{ marginTop: 8, marginBottom: 0 }}
              />
            ) : null}
          </Card>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------------- list view */

export interface BoardRow {
  key: string
  title: string
  subtitle?: string
  status?: { label: string; tone: BoardTile['tone'] }
  metrics?: Array<{ label: string; value: ReactNode }>
  progress?: number
  onClick?: () => void
}

export function BoardList({ rows }: { rows: BoardRow[] }) {
  if (!rows.length) return <InlineEmpty text="Nobody on this board" />
  return (
    <Space direction="vertical" size={8} style={{ width: '100%' }}>
      {rows.map((row) => (
        <Card
          key={row.key}
          size="small"
          hoverable={!!row.onClick}
          onClick={row.onClick}
          styles={{ body: { padding: 12 } }}
          style={{ cursor: row.onClick ? 'pointer' : 'default' }}
        >
          <Flex justify="space-between" align="center" gap={16} wrap>
            <div style={{ minWidth: 180 }}>
              <Flex align="center" gap={8}>
                <span style={{ fontWeight: 600 }}>{row.title}</span>
                {row.status ? <StatusChip label={row.status.label} tone={row.status.tone} size="small" /> : null}
              </Flex>
              {row.subtitle ? (
                <div style={{ fontSize: 12, color: palette.neutral[500] }}>{row.subtitle}</div>
              ) : null}
            </div>

            <Flex gap={20} wrap>
              {row.metrics?.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: palette.neutral[500] }}>{m.label}</div>
                  <div className="erp-tabular" style={{ fontSize: 14, fontWeight: 600 }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </Flex>

            {row.progress !== undefined ? (
              <Tooltip title={`${row.progress}% utilised`}>
                <Progress
                  type="circle"
                  percent={row.progress}
                  size={40}
                  strokeColor={palette.primary[500]}
                />
              </Tooltip>
            ) : null}
          </Flex>
        </Card>
      ))}
    </Space>
  )
}
