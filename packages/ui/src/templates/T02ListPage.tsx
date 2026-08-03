import { useMemo, useState, type ReactNode } from 'react'
import { Button, Card, Checkbox, Dropdown, Flex, Space } from 'antd'
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons'
import type {
  ActionDef,
  ColumnDef,
  EmptyStateDef,
  FilterDef,
  FilterValues,
  PaginationState,
  QuickFilterDef,
  SavedViewDef,
} from '../types'
import { PageHeader } from '../components/PageHeader'
import { ActiveFilterChips, FilterBar, QuickFilterTabs } from '../components/FilterBar'
import { DataTable } from '../components/DataTable'
import { StateFallback, resolvePageState } from '../components/States'
import { palette } from '../theme/tokens'

/**
 * T02 — LIST PAGE
 *
 * Find records and open them.
 *
 * Row click opens the record — never require the Actions menu for the primary
 * path. EMPTY-FILTER and EMPTY-NEW are different states.
 *
 * Ref: 03_PAGE_TEMPLATES.md §13
 */

export interface T02ListPageProps<T extends object> {
  title: ReactNode
  description?: ReactNode
  context?: ReactNode

  primaryAction?: ActionDef
  secondaryAction?: ActionDef
  moreActions?: ActionDef[]

  /** Status-count tabs. Always include an "All" entry. Ref: Workshop §6 */
  quickFilters?: QuickFilterDef[]
  quickFilterValue?: string
  onQuickFilterChange?: (key: string) => void

  searchPlaceholder: string
  searchValue: string
  onSearchChange: (v: string) => void

  filters: FilterDef[]
  filterValues: FilterValues
  onFilterChange: (values: FilterValues) => void

  savedViews?: SavedViewDef[]
  onSavedViewSelect?: (key: string) => void

  columns: ColumnDef<T>[]
  rows: T[]
  rowKey: keyof T | ((row: T) => string)
  onRowClick?: (row: T) => void
  rowActions?: (row: T) => { primary?: ActionDef; more?: ActionDef[] }

  pagination?: PaginationState
  onSortChange?: (sortBy: string | undefined, order: 'asc' | 'desc' | undefined) => void

  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  bulkActions?: ActionDef[]

  loading?: boolean
  error?: Error | string | null
  forbidden?: boolean
  onRefresh?: () => void
  emptyState?: EmptyStateDef

  exportable?: boolean
  onExport?: (format: 'excel' | 'csv' | 'pdf') => void

  /** Rendered between the filter bar and the table (e.g. an inventory summary). */
  beforeTable?: ReactNode
}

export function T02ListPage<T extends object>(props: T02ListPageProps<T>) {
  const {
    title,
    description,
    context,
    primaryAction,
    secondaryAction,
    moreActions,
    quickFilters,
    quickFilterValue = 'all',
    onQuickFilterChange,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    filters,
    filterValues,
    onFilterChange,
    columns,
    rows,
    rowKey,
    onRowClick,
    rowActions,
    pagination,
    onSortChange,
    selectedKeys,
    onSelectionChange,
    bulkActions = [],
    loading,
    error,
    forbidden,
    onRefresh,
    emptyState,
    exportable,
    onExport,
    beforeTable,
  } = props

  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])

  const hasActiveFilters = useMemo(
    () =>
      Object.values(filterValues).some((v) => v !== undefined && v !== '' && v !== null) ||
      searchValue.trim().length > 0 ||
      (quickFilterValue !== 'all' && quickFilters !== undefined),
    [filterValues, searchValue, quickFilterValue, quickFilters],
  )

  const state = resolvePageState({
    loading,
    error,
    forbidden,
    rowCount: rows.length,
    hasActiveFilters,
  })

  const clearAll = () => {
    onFilterChange({})
    onSearchChange('')
    onQuickFilterChange?.('all')
  }

  /** Actions column is appended automatically so every list behaves alike. */
  const columnsWithActions = useMemo<ColumnDef<T>[]>(() => {
    if (!rowActions) return columns
    return [
      ...columns,
      {
        key: '__actions',
        title: '',
        width: 90,
        fixed: 'right',
        align: 'right',
        locked: true,
        type: 'custom',
        render: (_v, row) => {
          const a = rowActions(row)
          return (
            <Space size={4} onClick={(e) => e.stopPropagation()}>
              {a.primary ? (
                <Button type="link" size="small" onClick={a.primary.onClick} href={a.primary.href}>
                  {a.primary.label}
                </Button>
              ) : null}
            </Space>
          )
        },
      },
    ]
  }, [columns, rowActions])

  const columnSettings = (
    <Dropdown
      trigger={['click']}
      menu={{
        items: columns
          .filter((c) => !c.locked)
          .map((c) => ({
            key: c.key,
            label: (
              <Checkbox
                checked={!hiddenColumns.includes(c.key)}
                onChange={(e) =>
                  setHiddenColumns((prev) =>
                    e.target.checked ? prev.filter((k) => k !== c.key) : [...prev, c.key],
                  )
                }
              >
                {c.title}
              </Checkbox>
            ),
          })),
      }}
    >
      <Button icon={<SettingOutlined />} aria-label="Column settings" />
    </Dropdown>
  )

  const exportMenu = exportable ? (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          { key: 'excel', label: 'Excel', onClick: () => onExport?.('excel') },
          { key: 'csv', label: 'CSV', onClick: () => onExport?.('csv') },
          { key: 'pdf', label: 'PDF', onClick: () => onExport?.('pdf') },
        ],
      }}
    >
      <Button icon={<DownloadOutlined />}>Export</Button>
    </Dropdown>
  ) : null

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        context={context}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        moreActions={moreActions}
      />

      {quickFilters?.length ? (
        <QuickFilterTabs
          items={quickFilters}
          value={quickFilterValue}
          onChange={(k) => onQuickFilterChange?.(k)}
        />
      ) : null}

      <FilterBar
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        filters={filters}
        values={filterValues}
        onChange={onFilterChange}
        onRefresh={onRefresh}
        extra={
          <Space size={8}>
            {columnSettings}
            {exportMenu}
          </Space>
        }
      />

      <ActiveFilterChips
        filters={filters}
        values={filterValues}
        onChange={onFilterChange}
        onClearAll={clearAll}
      />

      {/* Bulk action bar appears only when rows are selected. */}
      {selectedKeys?.length ? (
        <Flex
          align="center"
          gap={12}
          style={{
            padding: '8px 12px',
            marginBottom: 12,
            background: palette.primary[50],
            border: `1px solid ${palette.primary[200]}`,
            borderRadius: 6,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: palette.primary[700] }}>
            {selectedKeys.length} selected
          </span>
          <Space size={8}>
            {bulkActions.map((a) => (
              <Button key={a.key} size="small" danger={a.danger} onClick={a.onClick} icon={a.icon}>
                {a.label}
              </Button>
            ))}
          </Space>
          <Button type="link" size="small" onClick={() => onSelectionChange?.([])}>
            Clear
          </Button>
        </Flex>
      ) : null}

      {beforeTable}

      <Card size="small" styles={{ body: { padding: 0 } }}>
        <StateFallback
          state={state}
          emptyState={emptyState}
          error={error}
          onRetry={onRefresh}
          onClearFilters={clearAll}
          loadingVariant="table"
        >
          <DataTable<T>
            columns={columnsWithActions}
            rows={rows}
            rowKey={rowKey}
            hiddenColumns={hiddenColumns}
            onRowClick={onRowClick}
            pagination={pagination ?? false}
            onSortChange={onSortChange}
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
            virtual={rows.length > 200}
          />
        </StateFallback>
      </Card>
    </div>
  )
}
