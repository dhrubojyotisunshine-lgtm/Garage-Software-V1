import { useMemo, useState } from 'react'
import { App, Button, Space, Tag, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MoneyText, T02ListPage, palette, type ColumnDef, type FilterDef } from '@garage/ui'
import {
  QUOTATION_STATUSES,
  formatDate,
  isQuotationExpired,
  lineTotals,
  percentOf,
  type Quotation,
  type QuotationStatus,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Quotation list (T02).
 *
 * Expiry is derived from the validity date, never stored — a quote cannot sit
 * in the list claiming to be live after its price has gone stale.
 */

const STATUS_COLOUR: Record<QuotationStatus, string> = {
  Draft: 'default',
  Sent: 'processing',
  Accepted: 'success',
  Rejected: 'error',
  Expired: 'warning',
  Converted: 'purple',
}

interface Row extends Record<string, unknown> {
  id: string
  quotationNo: string
  customer: string
  vehicle: string
  subject: string
  lines: number
  total: number
  status: QuotationStatus
  expired: boolean
  validUntil: string
}

const FILTERS: FilterDef[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    width: 150,
    options: QUOTATION_STATUSES.map((v) => ({ label: v, value: v })),
  },
]

/** Document total: line totals, less the document discount. */
export function quotationTotal(q: Quotation): number {
  const subtotal = q.items.reduce((sum, i) => sum + lineTotals(i).total, 0)
  const discount =
    q.discountType === 'percent' ? percentOf(subtotal, q.discount) : Math.min(subtotal, q.discount)
  return subtotal - discount
}

export default function QuotationList() {
  const navigate = useNavigate()
  const { message, modal } = App.useApp()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const allRows = useMemo<Row[]>(
    () =>
      store.quotations.map((q) => ({
        id: q.id,
        quotationNo: q.quotationNo,
        customer: store.customerById(q.customerId)?.name ?? '—',
        vehicle: store.vehicleById(q.vehicleId)?.registration ?? '—',
        subject: q.subject ?? '—',
        lines: q.items.length,
        total: quotationTotal(q),
        status: q.status,
        expired: isQuotationExpired(q),
        validUntil: q.validUntil,
      })),
    [store],
  )

  const rows = useMemo(() => {
    let list = allRows
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.quotationNo.toLowerCase().includes(q) ||
          r.customer.toLowerCase().includes(q) ||
          r.vehicle.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q),
      )
    }
    if (filterValues.status) list = list.filter((r) => r.status === filterValues.status)
    return list
  }, [allRows, search, filterValues])

  const remove = (ids: string[]) => {
    modal.confirm({
      title: `Delete ${ids.length} quotation(s)?`,
      content: 'A quotation already converted to a job card will be kept — deleting it would orphan that history.',
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        const { deleted, blocked } = store.deleteQuotations(ids)
        setSelected([])
        if (deleted) message.success(`${deleted} quotation(s) deleted`)
        if (blocked) message.warning(`${blocked} kept — already converted to a job card`)
      },
    })
  }

  const COLUMNS: ColumnDef<Row>[] = [
    {
      key: 'quotationNo',
      title: 'Quotation No',
      width: 155,
      locked: true,
      render: (v) => <span className="erp-mono">{String(v)}</span>,
    },
    { key: 'customer', title: 'Customer', width: 175 },
    {
      key: 'vehicle',
      title: 'Vehicle',
      width: 120,
      render: (v) => <span className="erp-mono">{String(v)}</span>,
    },
    { key: 'subject', title: 'Subject' },
    { key: 'lines', title: 'Lines', width: 70, align: 'right' },
    {
      key: 'total',
      title: 'Total',
      width: 130,
      align: 'right',
      render: (v) => <MoneyText value={Number(v)} strong />,
    },
    {
      key: 'validUntil',
      title: 'Valid Until',
      width: 125,
      render: (v, row) => (
        <span style={{ color: row.expired ? palette.error[500] : undefined }}>
          {formatDate(String(v))}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      width: 165,
      render: (_v, row) => (
        <Space size={4}>
          <Tag color={STATUS_COLOUR[row.status]} style={{ marginInlineEnd: 0 }}>
            {row.status}
          </Tag>
          {row.expired && row.status !== 'Expired' && row.status !== 'Converted' ? (
            <Tooltip title="Past its validity date — the quoted price is no longer live">
              <Tag color="warning" style={{ marginInlineEnd: 0 }}>
                stale
              </Tag>
            </Tooltip>
          ) : null}
        </Space>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 80,
      type: 'custom',
      render: (_v, row) => (
        <Space size={0}>
          <Tooltip title="Open">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/quotation/${row.id}`)
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                remove([row.id])
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <T02ListPage<Row>
      title="Quotation"
      description="What was offered, before any work was agreed"
      primaryAction={{
        key: 'new',
        label: 'Add Quotation',
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate('/quotation/new'),
      }}
      searchPlaceholder="Search number, customer, vehicle or subject"
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
      onRowClick={(row) => navigate(`/quotation/${row.id}`)}
      selectedKeys={selected}
      onSelectionChange={setSelected}
      bulkActions={[
        {
          key: 'delete',
          label: 'Delete selected',
          danger: true,
          icon: <DeleteOutlined />,
          onClick: () => remove(selected),
        },
      ]}
      pagination={{
        page,
        pageSize,
        total: rows.length,
        onChange: (p, s) => {
          setPage(p)
          setPageSize(s)
        },
      }}
    />
  )
}
