import { useMemo, useState } from 'react'
import { Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { T02ListPage, palette, type ColumnDef, type FilterDef, type QuickFilterDef } from '@garage/ui'
import { STOCK_TRANSACTION_TYPES, type StockTransaction } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { StockEntryDrawer } from '../components/StockEntryDrawer'

/**
 * Stock Ledger (T02) — every movement in the business, newest first.
 *
 * This is the inventory source of truth. A balance that cannot be explained by
 * rows on this screen is a defect. Ref: Inventory §36, plan §4.6
 */

interface Row extends Record<string, unknown> {
  id: string
  txnNo: string
  at: string
  product: string
  sku: string
  type: string
  direction: 'In' | 'Out'
  quantity: number
  balanceAfter: number
  source: string
  sourceId?: string
  reason: string
  by: string
}

const FILTERS: FilterDef[] = [
  {
    key: 'type',
    label: 'Movement Type',
    type: 'select',
    width: 190,
    options: STOCK_TRANSACTION_TYPES.map((v) => ({ label: v, value: v })),
  },
  {
    key: 'source',
    label: 'Source',
    type: 'select',
    width: 150,
    options: ['JobCard', 'Manual', 'Purchase'].map((v) => ({ label: v, value: v })),
  },
]

export default function StockLedger() {
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [entryOpen, setEntryOpen] = useState(false)

  const allRows = useMemo<Row[]>(
    () =>
      store.stockTransactions.map((t: StockTransaction) => {
        const product = store.productById(t.productId)
        return {
          id: t.id,
          txnNo: t.txnNo,
          at: t.at,
          product: product?.name ?? '—',
          sku: product?.sku ?? '',
          type: t.type,
          direction: t.direction,
          quantity: t.quantity,
          balanceAfter: t.balanceAfter,
          source: t.sourceRef ?? t.sourceType,
          sourceId: t.sourceId,
          reason: t.reason ?? '',
          by: t.by,
        }
      }),
    [store],
  )

  const quickFilters = useMemo<QuickFilterDef[]>(
    () => [
      { key: 'all', label: 'All', count: allRows.length },
      {
        key: 'In',
        label: 'Inward',
        tone: 'success',
        count: allRows.filter((r) => r.direction === 'In').length,
      },
      {
        key: 'Out',
        label: 'Outward',
        tone: 'progress',
        count: allRows.filter((r) => r.direction === 'Out').length,
      },
      {
        key: 'jobcard',
        label: 'From Job Cards',
        tone: 'progress',
        count: allRows.filter((r) => r.sourceId).length,
      },
    ],
    [allRows],
  )

  const rows = useMemo(() => {
    let list = allRows
    if (quickFilter === 'In' || quickFilter === 'Out') {
      list = list.filter((r) => r.direction === quickFilter)
    } else if (quickFilter === 'jobcard') {
      list = list.filter((r) => Boolean(r.sourceId))
    }

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.txnNo.toLowerCase().includes(q) ||
          r.product.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q),
      )
    }
    if (filterValues.type) list = list.filter((r) => r.type === filterValues.type)
    if (filterValues.source) {
      list = list.filter((r) =>
        filterValues.source === 'JobCard' ? Boolean(r.sourceId) : !r.sourceId,
      )
    }
    return list
  }, [allRows, search, filterValues, quickFilter])

  const COLUMNS: ColumnDef<Row>[] = [
    { key: 'txnNo', title: 'Entry', type: 'identifier', width: 165, fixed: 'left', locked: true },
    { key: 'at', title: 'Date & Time', type: 'datetime', width: 185, sortable: true },
    { key: 'product', title: 'Product', width: 230 },
    { key: 'sku', title: 'SKU', type: 'identifier', width: 120 },
    { key: 'type', title: 'Movement', width: 165 },
    {
      key: 'quantity',
      title: 'Qty',
      width: 95,
      align: 'right',
      type: 'custom',
      render: (_v, row) => (
        <span
          className="erp-tabular"
          style={{
            fontWeight: 600,
            color: row.direction === 'In' ? palette.success[700] : palette.error[600],
          }}
        >
          {row.direction === 'In' ? '+' : '−'}
          {row.quantity}
        </span>
      ),
    },
    { key: 'balanceAfter', title: 'Balance', type: 'number', width: 105 },
    {
      key: 'source',
      title: 'Source',
      width: 175,
      type: 'custom',
      render: (_v, row) =>
        row.sourceId ? (
          <span className="erp-mono" style={{ color: palette.primary[600] }}>
            {row.source}
          </span>
        ) : (
          <Tag style={{ marginInlineEnd: 0 }}>{row.source}</Tag>
        ),
    },
    { key: 'reason', title: 'Reason', ellipsis: true },
    { key: 'by', title: 'By', width: 140 },
  ]

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <T02ListPage<Row>
        title="Stock Ledger"
        description="Every stock movement, traceable to the document that caused it"
        primaryAction={{
          key: 'entry',
          label: 'Stock Entry',
          icon: <PlusOutlined />,
          type: 'primary',
          onClick: () => setEntryOpen(true),
        }}
        quickFilters={quickFilters}
        quickFilterValue={quickFilter}
        onQuickFilterChange={(k) => {
          setQuickFilter(k)
          setPage(1)
        }}
        searchPlaceholder="Search entry number, product, SKU or source"
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v)
          setPage(1)
        }}
        filters={FILTERS}
        filterValues={filterValues}
        onFilterChange={(v) => {
          setFilterValues(v)
          setPage(1)
        }}
        columns={COLUMNS}
        rows={paged}
        rowKey="id"
        onRowClick={(row) =>
          row.sourceId ? navigate(`/workshop/job-cards/${row.sourceId}/items`) : undefined
        }
        pagination={{
          page,
          pageSize,
          total: rows.length,
          onChange: (p, s) => {
            setPage(p)
            setPageSize(s)
          },
        }}
        exportable
        emptyState={{
          title: 'No stock movements yet',
          description: 'Record a stock entry, or issue a part from a job card.',
          action: { key: 'entry', label: 'Stock Entry', onClick: () => setEntryOpen(true) },
        }}
      />

      <StockEntryDrawer open={entryOpen} onClose={() => setEntryOpen(false)} />
    </>
  )
}
