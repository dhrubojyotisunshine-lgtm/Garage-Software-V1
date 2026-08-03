import { useMemo, useState } from 'react'
import { Card, Flex, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  T02ListPage,
  palette,
  type ColumnDef,
  type FilterDef,
  type QuickFilterDef,
} from '@garage/ui'
import {
  AGEING_BUCKETS,
  ageingSummary,
  formatMoney,
  paymentStatusMap,
  receivablesFrom,
  totalOutstanding,
  type JobCard,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { PaymentDrawer } from '@/modules/workshop/components/PaymentDrawer'

/**
 * Receivables (T02).
 *
 * Rows are DERIVED from job cards, not stored — an invoice and its balance can
 * never disagree with the document that produced it.
 * Ref: 04_ALL_MODULES.md §49, plan §4.6
 */

interface Row extends Record<string, unknown> {
  id: string
  invoiceNo: string
  sourceRef: string
  customer: string
  invoicedAt: string
  dueDate: string
  invoiceTotal: number
  received: number
  balance: number
  ageDays: number
  bucket: string
  status: string
  overdue: boolean
}

const FILTERS: FilterDef[] = [
  {
    key: 'bucket',
    label: 'Ageing',
    type: 'select',
    width: 165,
    options: AGEING_BUCKETS.map((v) => ({ label: v, value: v })),
  },
  {
    key: 'status',
    label: 'Payment Status',
    type: 'select',
    width: 165,
    advanced: true,
    options: ['Unpaid', 'Partially Paid'].map((v) => ({ label: v, value: v })),
  },
]

export default function Receivables() {
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [payingJobCard, setPayingJobCard] = useState<JobCard | undefined>()

  const receivables = useMemo(() => receivablesFrom(store.jobCards), [store.jobCards])
  const summary = useMemo(() => ageingSummary(receivables), [receivables])
  const outstanding = totalOutstanding(receivables)

  const allRows = useMemo<Row[]>(
    () =>
      receivables.map((r) => ({
        id: r.sourceId,
        invoiceNo: r.invoiceNo,
        sourceRef: r.sourceRef,
        customer: store.customerById(r.customerId)?.name ?? '—',
        invoicedAt: r.invoicedAt,
        dueDate: r.dueDate,
        invoiceTotal: r.invoiceTotal,
        received: r.received,
        balance: r.balance,
        ageDays: r.ageDays,
        bucket: r.bucket,
        status: r.status,
        overdue: r.overdue,
      })),
    [receivables, store],
  )

  const quickFilters = useMemo<QuickFilterDef[]>(
    () => [
      { key: 'all', label: 'All', count: allRows.length },
      {
        key: 'overdue',
        label: 'Overdue',
        tone: 'failure',
        count: allRows.filter((r) => r.overdue).length,
      },
      {
        key: 'current',
        label: 'Within Terms',
        tone: 'progress',
        count: allRows.filter((r) => !r.overdue).length,
      },
    ],
    [allRows],
  )

  const rows = useMemo(() => {
    let list = allRows
    if (quickFilter === 'overdue') list = list.filter((r) => r.overdue)
    else if (quickFilter === 'current') list = list.filter((r) => !r.overdue)

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.invoiceNo.toLowerCase().includes(q) ||
          r.sourceRef.toLowerCase().includes(q) ||
          r.customer.toLowerCase().includes(q),
      )
    }
    if (filterValues.bucket) list = list.filter((r) => r.bucket === filterValues.bucket)
    if (filterValues.status) list = list.filter((r) => r.status === filterValues.status)
    return list
  }, [allRows, search, filterValues, quickFilter])

  const COLUMNS: ColumnDef<Row>[] = [
    { key: 'invoiceNo', title: 'Invoice', type: 'identifier', width: 175, fixed: 'left', locked: true },
    { key: 'customer', title: 'Customer', width: 210, sortable: true },
    { key: 'sourceRef', title: 'Job Card', type: 'identifier', width: 165 },
    { key: 'invoicedAt', title: 'Invoiced', type: 'date', width: 130, sortable: true },
    {
      key: 'dueDate',
      title: 'Due',
      width: 145,
      type: 'custom',
      render: (_v, row) => (
        <span style={{ color: row.overdue ? palette.error[600] : undefined, fontWeight: row.overdue ? 600 : 400 }}>
          {new Date(row.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    { key: 'invoiceTotal', title: 'Invoice', type: 'money', width: 140 },
    { key: 'received', title: 'Received', type: 'money', width: 140 },
    { key: 'balance', title: 'Balance', type: 'money', width: 145, sortable: true },
    {
      key: 'ageDays',
      title: 'Age',
      width: 115,
      align: 'right',
      type: 'custom',
      render: (_v, row) => (
        <Tag
          color={row.ageDays > 90 ? 'red' : row.ageDays > 60 ? 'orange' : row.ageDays > 30 ? 'gold' : 'default'}
          style={{ marginInlineEnd: 0 }}
        >
          {row.ageDays}d
        </Tag>
      ),
    },
    { key: 'status', title: 'Status', type: 'status', statusMap: paymentStatusMap, width: 145 },
  ]

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <T02ListPage<Row>
        title="Receivables"
        description="Outstanding customer invoices, oldest first"
        quickFilters={quickFilters}
        quickFilterValue={quickFilter}
        onQuickFilterChange={(k) => {
          setQuickFilter(k)
          setPage(1)
        }}
        searchPlaceholder="Search invoice, job card or customer"
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
        onRowClick={(row) => navigate(`/workshop/job-cards/${row.id}/invoice`)}
        rowActions={(row) => ({
          primary: {
            key: 'receive',
            label: 'Receive',
            onClick: () => setPayingJobCard(store.jobCardById(row.id)),
          },
        })}
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
                <div style={{ fontSize: 11, color: palette.neutral[500] }}>Total Outstanding</div>
                <div
                  className="erp-tabular"
                  style={{ fontSize: 18, fontWeight: 700, color: palette.error[700] }}
                >
                  {formatMoney(outstanding)}
                </div>
              </div>
              {AGEING_BUCKETS.map((bucket) => (
                <div key={bucket}>
                  <div style={{ fontSize: 11, color: palette.neutral[500] }}>{bucket}</div>
                  <div className="erp-tabular" style={{ fontSize: 15, fontWeight: 600 }}>
                    {formatMoney(summary[bucket].amount)}
                    <span style={{ fontSize: 11, color: palette.neutral[400], fontWeight: 400 }}>
                      {' '}
                      · {summary[bucket].count}
                    </span>
                  </div>
                </div>
              ))}
            </Flex>
          </Card>
        }
        emptyState={{
          title: 'Nothing outstanding',
          description: 'Every invoice raised so far has been settled in full.',
        }}
      />

      {/* Collection happens against the source job card, so the same drawer serves both. */}
      {payingJobCard ? (
        <PaymentDrawer
          open
          jobCard={payingJobCard}
          onClose={() => setPayingJobCard(undefined)}
        />
      ) : null}
    </>
  )
}
