import { useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { T02ListPage } from '@garage/ui'
import { invoiceTotals, isOverdue, paymentStatus } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import {
  JOB_CARD_COLUMNS,
  JOB_CARD_FILTERS,
  JOB_CARD_QUICK_FILTERS,
  type JobCardListRow,
} from '../definitions/jobCardList'

/** Workshop — Job Card list (T02). */
export default function JobCardList() {
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const allRows = useMemo<JobCardListRow[]>(
    () =>
      store.jobCards.map((j) => {
        const customer = store.customerById(j.customerId)
        const vehicle = store.vehicleById(j.vehicleId)
        const technician = store.employeeById(j.technicianId)
        const advisor = store.employeeById(j.advisorId)
        return {
          id: j.id,
          jobCardNo: j.jobCardNo,
          registration: vehicle?.registration ?? '',
          vehicle: vehicle ? `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant ?? ''}`.trim() : '',
          customer: customer?.name ?? '',
          mobile: customer?.mobile ?? '',
          serviceType: j.serviceType,
          advisor: advisor?.name ?? '',
          technician: technician?.name ?? '',
          bay: j.bay ?? '',
          expectedDelivery: j.expectedDelivery,
          amount: invoiceTotals(j).total,
          paymentStatus: paymentStatus(j),
          priority: j.priority,
          status: j.status,
          overdue: isOverdue(j),
        }
      }),
    [store],
  )

  const quickFilters = useMemo(
    () =>
      JOB_CARD_QUICK_FILTERS.map((q) => ({
        ...q,
        count:
          q.key === 'all'
            ? allRows.length
            : q.key === 'overdue'
              ? allRows.filter((r) => r.overdue).length
              : allRows.filter((r) => r.status === q.key).length,
      })),
    [allRows],
  )

  const rows = useMemo(() => {
    let list = allRows

    if (quickFilter === 'overdue') list = list.filter((r) => r.overdue)
    else if (quickFilter !== 'all') list = list.filter((r) => r.status === quickFilter)

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.jobCardNo.toLowerCase().includes(q) ||
          r.registration.toLowerCase().includes(q.replace(/\s/g, '')) ||
          r.customer.toLowerCase().includes(q) ||
          r.mobile.includes(q) ||
          r.vehicle.toLowerCase().includes(q),
      )
    }

    if (filterValues.serviceType) list = list.filter((r) => r.serviceType === filterValues.serviceType)
    if (filterValues.priority) list = list.filter((r) => r.priority === filterValues.priority)
    if (filterValues.paymentStatus)
      list = list.filter((r) => r.paymentStatus === filterValues.paymentStatus)

    return list
  }, [allRows, search, filterValues, quickFilter])

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <T02ListPage<JobCardListRow>
      title="Job Cards"
      description="Service and repair records"
      primaryAction={{
        key: 'new',
        label: 'New Job Card',
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate('/workshop/job-cards/new'),
      }}
      quickFilters={quickFilters}
      quickFilterValue={quickFilter}
      onQuickFilterChange={(k) => {
        setQuickFilter(k)
        setPage(1)
      }}
      searchPlaceholder="Search job card, customer, mobile, registration"
      searchValue={search}
      onSearchChange={(v) => {
        setSearch(v)
        setPage(1)
      }}
      filters={JOB_CARD_FILTERS}
      filterValues={filterValues}
      onFilterChange={(v) => {
        setFilterValues(v)
        setPage(1)
      }}
      columns={JOB_CARD_COLUMNS}
      rows={paged}
      rowKey="id"
      onRowClick={(row) => navigate(`/workshop/job-cards/${row.id}/overview`)}
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
        title: 'No job cards yet',
        description: 'Create the first job card to start tracking service work.',
        action: {
          key: 'new',
          label: 'New Job Card',
          onClick: () => navigate('/workshop/job-cards/new'),
        },
      }}
    />
  )
}
