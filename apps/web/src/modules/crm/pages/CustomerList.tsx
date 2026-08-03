import { useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { T02ListPage, type ColumnDef, type FilterDef } from '@garage/ui'
import { activeStatusMap, sumPaise, type Customer } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/** CRM — Customer list (T02). Scoped to what the Workshop flow needs. */

interface Row extends Record<string, unknown> {
  id: string
  code: string
  name: string
  type: string
  mobile: string
  city: string
  vehicles: number
  jobs: number
  spend: number
  status: string
}

const FILTERS: FilterDef[] = [
  {
    key: 'type',
    label: 'Customer Type',
    type: 'select',
    width: 160,
    options: [
      { label: 'Individual', value: 'Individual' },
      { label: 'Business', value: 'Business' },
    ],
  },
  {
    key: 'city',
    label: 'City',
    type: 'select',
    width: 150,
    options: [
      { label: 'Pune', value: 'Pune' },
      { label: 'Mumbai', value: 'Mumbai' },
    ],
  },
]

const COLUMNS: ColumnDef<Row>[] = [
  { key: 'code', title: 'Code', type: 'identifier', width: 130, locked: true, fixed: 'left' },
  { key: 'name', title: 'Customer', width: 220, sortable: true },
  { key: 'type', title: 'Type', width: 110 },
  { key: 'mobile', title: 'Mobile', type: 'mobile', width: 150 },
  { key: 'city', title: 'City', width: 120 },
  { key: 'vehicles', title: 'Vehicles', type: 'number', width: 100 },
  { key: 'jobs', title: 'Job Cards', type: 'number', width: 110 },
  { key: 'spend', title: 'Total Spend', type: 'money', width: 140, sortable: true },
  { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 110 },
]

export default function CustomerList() {
  const navigate = useNavigate()
  const { customers, vehicles, jobCards } = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const rows = useMemo<Row[]>(() => {
    const toRow = (c: Customer): Row => {
      const custJobs = jobCards.filter((j) => j.customerId === c.id)
      return {
        id: c.id,
        code: c.code,
        name: c.name,
        type: c.type,
        mobile: c.mobile,
        city: c.city,
        vehicles: vehicles.filter((v) => v.customerId === c.id).length,
        jobs: custJobs.length,
        spend: sumPaise(custJobs.flatMap((j) => j.payments.map((p) => p.amount))),
        status: c.status,
      }
    }

    let list = customers.map(toRow)

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.mobile.includes(q) ||
          r.code.toLowerCase().includes(q),
      )
    }
    if (filterValues.type) list = list.filter((r) => r.type === filterValues.type)
    if (filterValues.city) list = list.filter((r) => r.city === filterValues.city)

    return list
  }, [customers, vehicles, jobCards, search, filterValues])

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <T02ListPage<Row>
      title="Customers"
      description="Shared across Workshop, billing and vehicle records"
      primaryAction={{
        key: 'new',
        label: 'New Customer',
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate('/crm/customers/new'),
      }}
      searchPlaceholder="Search name, mobile or customer code"
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
      onRowClick={(row) => navigate(`/crm/customers/${row.id}/overview`)}
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
        title: 'No customers yet',
        description: 'Add the first customer to start creating job cards.',
        action: {
          key: 'new',
          label: 'New Customer',
          onClick: () => navigate('/crm/customers/new'),
        },
      }}
    />
  )
}
