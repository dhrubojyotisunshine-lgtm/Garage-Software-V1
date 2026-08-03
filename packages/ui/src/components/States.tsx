import type { ReactNode } from 'react'
import { Button, Empty, Result, Skeleton, Space, Table } from 'antd'
import { FilterOutlined, InboxOutlined, LockOutlined, WarningOutlined } from '@ant-design/icons'
import type { EmptyStateDef } from '../types'
import { palette } from '../theme/tokens'

/**
 * The six universal page states.
 *
 * A screen is not done until all six are handled.
 * Ref: 03_PAGE_TEMPLATES.md §11
 */

export type PageState = 'loading' | 'empty-new' | 'empty-filter' | 'error' | 'forbidden' | 'normal'

/** Skeletons match the final layout. Never a centered spinner on a full page. §11 */
export function LoadingState({ variant = 'page' }: { variant?: 'page' | 'table' | 'card' | 'form' }) {
  if (variant === 'table') return <TableSkeleton />
  if (variant === 'card')
    return (
      <div style={{ padding: 16 }}>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    )
  if (variant === 'form')
    return (
      <Space direction="vertical" size={24} style={{ width: '100%', padding: 16 }}>
        <Skeleton active title paragraph={{ rows: 4 }} />
        <Skeleton active title paragraph={{ rows: 4 }} />
      </Space>
    )
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Skeleton active title={{ width: 240 }} paragraph={{ rows: 1, width: ['40%'] }} />
      <Skeleton active paragraph={{ rows: 6 }} />
    </Space>
  )
}

/** A table-shaped skeleton, so the layout does not jump when data arrives. §13 */
export function TableSkeleton({ rows = 8, columns = 6 }: { rows?: number; columns?: number }) {
  const cols = Array.from({ length: columns }, (_, i) => ({
    key: String(i),
    title: <Skeleton.Input active size="small" style={{ width: 80, height: 14 }} />,
    dataIndex: String(i),
    render: () => <Skeleton.Input active size="small" style={{ width: '80%', height: 14 }} />,
  }))
  const data = Array.from({ length: rows }, (_, i) => ({ key: String(i) }))
  return <Table columns={cols} dataSource={data} pagination={false} size="middle" />
}

/**
 * No records exist yet.
 * This is NOT the same as a filter returning nothing. §11
 */
export function EmptyNewState({ title, description, action, icon }: EmptyStateDef) {
  return (
    <div style={{ padding: '48px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 40, color: palette.neutral[300], marginBottom: 8 }}>
        {icon ?? <InboxOutlined />}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: palette.neutral[800] }}>{title}</div>
      {description ? (
        <div style={{ marginTop: 4, color: palette.neutral[500], maxWidth: 420, marginInline: 'auto' }}>
          {description}
        </div>
      ) : null}
      {action ? (
        <div style={{ marginTop: 16 }}>
          <Button type="primary" icon={action.icon} onClick={action.onClick} href={action.href}>
            {action.label}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

/** Filters returned nothing. Must always offer "Clear filters". §11 */
export function EmptyFilterState({ onClear }: { onClear?: () => void }) {
  return (
    <div style={{ padding: '48px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 40, color: palette.neutral[300], marginBottom: 8 }}>
        <FilterOutlined />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: palette.neutral[800] }}>
        No results match these filters
      </div>
      <div style={{ marginTop: 4, color: palette.neutral[500] }}>
        Try widening the date range, or clear the filters to see everything.
      </div>
      {onClear ? (
        <div style={{ marginTop: 16 }}>
          <Button onClick={onClear}>Clear filters</Button>
        </div>
      ) : null}
    </div>
  )
}

export function ErrorState({
  error,
  onRetry,
}: {
  error?: Error | string | null
  onRetry?: () => void
}) {
  const message = typeof error === 'string' ? error : (error?.message ?? 'Something went wrong.')
  return (
    <Result
      status="error"
      icon={<WarningOutlined style={{ color: palette.error[500] }} />}
      title="Could not load this page"
      subTitle={message}
      extra={
        onRetry ? (
          <Button type="primary" onClick={onRetry}>
            Retry
          </Button>
        ) : null
      }
    />
  )
}

/**
 * Permission denied.
 * Explain — never silently redirect. Silent redirects make users think the
 * feature does not exist. Ref: 02_NAVIGATION.md §16
 */
export function NoPermissionState({ what = 'this page' }: { what?: string }) {
  return (
    <Result
      status="403"
      icon={<LockOutlined style={{ color: palette.neutral[400] }} />}
      title="You do not have access to this"
      subTitle={`Your role does not permit viewing ${what}. Contact your administrator if you need access.`}
    />
  )
}

export function NotFoundState({ what = 'record' }: { what?: string }) {
  return (
    <Result
      status="404"
      title={`This ${what} could not be found`}
      subTitle="It may have been deleted, or moved to another branch."
    />
  )
}

/** Compact inline empty for widgets and tabs. */
export function InlineEmpty({ text = 'Nothing to show' }: { text?: string }) {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span style={{ color: palette.neutral[500] }}>{text}</span>}
      style={{ margin: '24px 0' }}
    />
  )
}

/**
 * Resolves which state to render.
 * Centralising this is what stops screens from silently skipping states.
 */
export function resolvePageState(opts: {
  loading?: boolean
  error?: unknown
  forbidden?: boolean
  rowCount: number
  hasActiveFilters?: boolean
}): PageState {
  if (opts.forbidden) return 'forbidden'
  if (opts.loading) return 'loading'
  if (opts.error) return 'error'
  if (opts.rowCount === 0) return opts.hasActiveFilters ? 'empty-filter' : 'empty-new'
  return 'normal'
}

export type { EmptyStateDef }
export function StateFallback(props: {
  state: PageState
  emptyState?: EmptyStateDef
  error?: Error | string | null
  onRetry?: () => void
  onClearFilters?: () => void
  loadingVariant?: 'page' | 'table' | 'card' | 'form'
  children: ReactNode
}) {
  const { state, emptyState, error, onRetry, onClearFilters, loadingVariant, children } = props
  switch (state) {
    case 'loading':
      return <LoadingState variant={loadingVariant} />
    case 'error':
      return <ErrorState error={error} onRetry={onRetry} />
    case 'forbidden':
      return <NoPermissionState />
    case 'empty-filter':
      return <EmptyFilterState onClear={onClearFilters} />
    case 'empty-new':
      return (
        <EmptyNewState
          title={emptyState?.title ?? 'Nothing here yet'}
          description={emptyState?.description}
          action={emptyState?.action}
          icon={emptyState?.icon}
        />
      )
    default:
      return <>{children}</>
  }
}
