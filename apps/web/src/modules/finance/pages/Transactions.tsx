import { useMemo, useState } from 'react'
import { Card, Flex, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { T02ListPage, palette, type ColumnDef, type FilterDef, type QuickFilterDef } from '@garage/ui'
import { collectionByMode, formatMoney, receiptsFrom, sumPaise } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Transactions (T02) — every receipt taken, across every job card.
 *
 * Payments belong to Finance; the job card is the source document. Rows link
 * back to it. Ref: 04_ALL_MODULES.md §52
 */

interface Row extends Record<string, unknown> {
  id: string
  receiptNo: string
  receivedAt: string
  customer: string
  invoiceNo: string
  sourceRef: string
  sourceId: string
  mode: string
  reference: string
  amount: number
  receivedBy: string
}

const MODES = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']

const FILTERS: FilterDef[] = [
  {
    key: 'mode',
    label: 'Payment Mode',
    type: 'select',
    width: 165,
    options: MODES.map((v) => ({ label: v, value: v })),
  },
  { key: 'receivedAt', label: 'Date Range', type: 'daterange', advanced: true },
]

export default function Transactions() {
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const receipts = useMemo(() => receiptsFrom(store.jobCards), [store.jobCards])
  const byMode = useMemo(() => collectionByMode(receipts), [receipts])
  const total = sumPaise(receipts.map((r) => r.amount))

  const allRows = useMemo<Row[]>(
    () =>
      receipts.map((r) => ({
        id: r.id,
        receiptNo: r.receiptNo,
        receivedAt: r.receivedAt,
        customer: store.customerById(r.customerId)?.name ?? '—',
        invoiceNo: r.invoiceNo,
        sourceRef: r.sourceRef,
        sourceId: r.sourceId,
        mode: r.mode,
        reference: r.reference ?? '',
        amount: r.amount,
        receivedBy: r.receivedBy,
      })),
    [receipts, store],
  )

  const quickFilters = useMemo<QuickFilterDef[]>(
    () => [
      { key: 'all', label: 'All', count: allRows.length },
      ...MODES.map((m) => ({
        key: m,
        label: m,
        tone: 'progress' as const,
        count: allRows.filter((r) => r.mode === m).length,
      })).filter((q) => q.count > 0),
    ],
    [allRows],
  )

  const rows = useMemo(() => {
    let list = allRows
    if (quickFilter !== 'all') list = list.filter((r) => r.mode === quickFilter)

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.receiptNo.toLowerCase().includes(q) ||
          r.customer.toLowerCase().includes(q) ||
          r.invoiceNo.toLowerCase().includes(q) ||
          r.reference.toLowerCase().includes(q),
      )
    }
    if (filterValues.mode) list = list.filter((r) => r.mode === filterValues.mode)
    if (Array.isArray(filterValues.receivedAt) && filterValues.receivedAt.length === 2) {
      const [from, to] = filterValues.receivedAt as [string, string]
      const a = new Date(from).getTime()
      const b = new Date(to).getTime()
      list = list.filter((r) => {
        const t = new Date(r.receivedAt).getTime()
        return t >= a && t <= b
      })
    }
    return list
  }, [allRows, search, filterValues, quickFilter])

  const COLUMNS: ColumnDef<Row>[] = [
    { key: 'receiptNo', title: 'Receipt', type: 'identifier', width: 175, fixed: 'left', locked: true },
    { key: 'receivedAt', title: 'Received', type: 'datetime', width: 190, sortable: true },
    { key: 'customer', title: 'Customer', width: 200 },
    { key: 'invoiceNo', title: 'Invoice', type: 'identifier', width: 175 },
    { key: 'sourceRef', title: 'Job Card', type: 'identifier', width: 165 },
    {
      key: 'mode',
      title: 'Mode',
      width: 140,
      type: 'custom',
      render: (_v, row) => <Tag style={{ marginInlineEnd: 0 }}>{row.mode}</Tag>,
    },
    { key: 'reference', title: 'Reference', width: 160 },
    { key: 'amount', title: 'Amount', type: 'money', width: 145, sortable: true },
    { key: 'receivedBy', title: 'Received By', width: 150 },
  ]

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <T02ListPage<Row>
      title="Transactions"
      description="Every payment received, newest first"
      quickFilters={quickFilters}
      quickFilterValue={quickFilter}
      onQuickFilterChange={(k) => {
        setQuickFilter(k)
        setPage(1)
      }}
      searchPlaceholder="Search receipt, customer, invoice or reference"
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
      onRowClick={(row) => navigate(`/workshop/job-cards/${row.sourceId}/invoice`)}
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
      beforeTable={
        <Card size="small" styles={{ body: { padding: '10px 16px' } }} style={{ marginBottom: 12 }}>
          <Flex gap={28} wrap>
            <div>
              <div style={{ fontSize: 11, color: palette.neutral[500] }}>Total Collected</div>
              <div
                className="erp-tabular"
                style={{ fontSize: 18, fontWeight: 700, color: palette.success[700] }}
              >
                {formatMoney(total)}
              </div>
            </div>
            {MODES.filter((m) => byMode[m as keyof typeof byMode] > 0).map((m) => (
              <div key={m}>
                <div style={{ fontSize: 11, color: palette.neutral[500] }}>{m}</div>
                <div className="erp-tabular" style={{ fontSize: 15, fontWeight: 600 }}>
                  {formatMoney(byMode[m as keyof typeof byMode])}
                </div>
              </div>
            ))}
          </Flex>
        </Card>
      }
      emptyState={{
        title: 'No payments recorded yet',
        description: 'Receipts appear here as soon as a payment is taken on a job card.',
      }}
    />
  )
}
