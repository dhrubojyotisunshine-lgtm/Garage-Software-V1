import { useMemo } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import type { ColumnType } from 'antd/es/table'
import type { Paise } from '@garage/shared'
import { resolveStatus } from '@garage/shared'
import type { ColumnDef, PaginationState } from '../types'
import {
  Dash,
  DateText,
  DateTimeText,
  IdentifierText,
  MobileText,
  MoneyText,
  NumberText,
  QuantityText,
  RegistrationText,
} from './Value'
import { StatusChip } from './StatusChip'
import { layout } from '../theme/tokens'

/**
 * The DataTable.
 *
 * The most-used component in the product, so its behaviour is centralised
 * rather than repeated: sticky header, right-aligned numerics, "—" for empty
 * cells, server-side sort and pagination, clickable rows.
 *
 * Ref: 01_ADMIN_THEME.md §13, 03_PAGE_TEMPLATES.md §13
 */

function renderByType<T>(col: ColumnDef<T>) {
  return (value: unknown, row: T, index: number) => {
    if (col.render) return col.render(value, row, index)

    if (value === null || value === undefined || value === '') {
      // Status columns still render, so an unknown status is visible.
      if (col.type !== 'status') return <Dash />
    }

    switch (col.type) {
      case 'money':
        return <MoneyText value={value as Paise} />
      case 'quantity':
        return <QuantityText value={value as number} unit={col.unit} />
      case 'number':
        return <NumberText value={value as number} />
      case 'date':
        return <DateText value={value as string} />
      case 'datetime':
        return <DateTimeText value={value as string} />
      case 'identifier':
        return <IdentifierText value={value as string} />
      case 'registration':
        return <RegistrationText value={value as string} />
      case 'mobile':
        return <MobileText value={value as string} />
      case 'status': {
        const status = resolveStatus(value as string, col.statusMap ?? {})
        return <StatusChip label={status.label} tone={status.tone} />
      }
      default:
        return String(value)
    }
  }
}

const NUMERIC_TYPES = new Set(['money', 'quantity', 'number'])

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  rows: T[]
  rowKey: keyof T | ((row: T) => string)
  loading?: boolean
  pagination?: PaginationState | false
  onRowClick?: (row: T) => void
  /** Column keys the user has hidden via column settings. */
  hiddenColumns?: string[]
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  onSortChange?: (sortBy: string | undefined, order: 'asc' | 'desc' | undefined) => void
  size?: TableProps<T>['size']
  /** Enables AntD virtual scrolling. Use above ~200 rows. §13 */
  virtual?: boolean
  scrollY?: number
  summaryRow?: TableProps<T>['summary']
  emptyText?: React.ReactNode
}

export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  loading,
  pagination,
  onRowClick,
  hiddenColumns = [],
  selectedKeys,
  onSelectionChange,
  onSortChange,
  size = 'middle',
  virtual,
  scrollY,
  summaryRow,
  emptyText,
}: DataTableProps<T>) {
  const antColumns = useMemo<ColumnType<T>[]>(() => {
    return columns
      .filter((c) => !c.hidden && !hiddenColumns.includes(c.key))
      .map((col) => {
        const numeric = NUMERIC_TYPES.has(col.type ?? '')
        return {
          key: col.key,
          title: col.title,
          dataIndex: col.dataIndex ?? col.key,
          width: col.width,
          align: col.align ?? (numeric ? 'right' : 'left'),
          fixed: col.fixed,
          ellipsis: col.ellipsis ?? false,
          sorter: col.sortable ? true : undefined,
          render: renderByType(col),
          className: numeric ? 'erp-cell-numeric' : undefined,
          onHeaderCell: col.tooltip ? () => ({ title: col.tooltip }) : undefined,
        } satisfies ColumnType<T>
      })
  }, [columns, hiddenColumns])

  return (
    <Table<T>
      className={onRowClick ? 'erp-table-clickable' : undefined}
      columns={antColumns}
      dataSource={rows}
      rowKey={rowKey as TableProps<T>['rowKey']}
      loading={loading}
      size={size}
      virtual={virtual}
      sticky
      // Never wrap cells — horizontal scroll instead. §13
      scroll={{ x: 'max-content', y: scrollY }}
      locale={emptyText ? { emptyText } : undefined}
      summary={summaryRow}
      onRow={
        onRowClick
          ? (row) => ({
              onClick: () => onRowClick(row),
              style: { cursor: 'pointer', height: layout.tableRowHeight },
            })
          : undefined
      }
      rowSelection={
        onSelectionChange
          ? {
              selectedRowKeys: selectedKeys,
              onChange: (keys) => onSelectionChange(keys.map(String)),
            }
          : undefined
      }
      onChange={(_pagination, _filters, sorter) => {
        if (!onSortChange) return
        const s = Array.isArray(sorter) ? sorter[0] : sorter
        if (!s || !s.order) return onSortChange(undefined, undefined)
        onSortChange(String(s.columnKey ?? s.field), s.order === 'ascend' ? 'asc' : 'desc')
      }}
      pagination={
        pagination === false || !pagination
          ? false
          : {
              current: pagination.page,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: pagination.onChange,
              showSizeChanger: true,
              pageSizeOptions: [25, 50, 100],
              showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
              size: 'default',
            }
      }
    />
  )
}
