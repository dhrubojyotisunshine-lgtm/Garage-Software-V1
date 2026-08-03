import { useMemo, useState } from 'react'
import { App, Avatar, Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { T02ListPage, palette, type ColumnDef, type FilterDef } from '@garage/ui'
import { activeStatusMap, type Supplier } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Suppliers (T02).
 *
 * Columns transcribed from the reference product's supplier list: Image,
 * First Name, Last Name, Company Name, Email, Product Name, Action — plus row
 * selection and bulk delete, which that screen also provides.
 */

interface Row extends Record<string, unknown> {
  id: string
  code: string
  imageUrl?: string
  firstName: string
  lastName: string
  companyName: string
  email: string
  productName: string
  mobile: string
  city: string
  status: string
}

const FILTERS: FilterDef[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    width: 140,
    options: ['Active', 'Inactive'].map((v) => ({ label: v, value: v })),
  },
  {
    key: 'city',
    label: 'City',
    type: 'select',
    width: 150,
    advanced: true,
    options: ['Pune', 'Mumbai', 'Bengaluru', 'Ahmedabad'].map((v) => ({ label: v, value: v })),
  },
]

export default function SupplierList() {
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
      store.suppliers.map((s: Supplier) => ({
        id: s.id,
        code: s.code,
        imageUrl: s.imageUrl,
        firstName: s.firstName,
        lastName: s.lastName ?? '',
        companyName: s.companyName,
        email: s.email ?? '',
        productName: s.productNames.join(', '),
        mobile: s.mobile ?? '',
        city: s.city ?? '',
        status: s.status,
      })),
    [store.suppliers],
  )

  const rows = useMemo(() => {
    let list = allRows
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.firstName.toLowerCase().includes(q) ||
          r.lastName.toLowerCase().includes(q) ||
          r.companyName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.productName.toLowerCase().includes(q),
      )
    }
    if (filterValues.status) list = list.filter((r) => r.status === filterValues.status)
    if (filterValues.city) list = list.filter((r) => r.city === filterValues.city)
    return list
  }, [allRows, search, filterValues])

  const remove = (ids: string[]) => {
    modal.confirm({
      title: 'Are you sure?',
      content: 'You will not be able to recover this data afterwards!',
      okText: 'Yes, delete!',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk: () => {
        const result = store.deleteSuppliers(ids)
        setSelected([])
        message.success(`${result.deleted} supplier(s) deleted`)
      },
    })
  }

  const COLUMNS: ColumnDef<Row>[] = [
    {
      key: 'imageUrl',
      title: 'Image',
      width: 80,
      align: 'center',
      type: 'custom',
      locked: true,
      render: (_v, row) => (
        <Avatar
          src={row.imageUrl}
          size={34}
          style={{ background: palette.primary[50], color: palette.primary[600] }}
          icon={<ShopOutlined />}
        />
      ),
    },
    { key: 'firstName', title: 'First Name', width: 150, sortable: true },
    { key: 'lastName', title: 'Last Name', width: 150 },
    { key: 'companyName', title: 'Company Name', width: 220, sortable: true },
    {
      key: 'email',
      title: 'Email',
      width: 250,
      type: 'custom',
      render: (_v, row) =>
        row.email ? (
          <a href={`mailto:${row.email}`} style={{ color: palette.primary[600] }}>
            {row.email}
          </a>
        ) : (
          '—'
        ),
    },
    {
      key: 'productName',
      title: 'Product Name',
      ellipsis: true,
      type: 'custom',
      render: (_v, row) =>
        row.productName ? (
          <Tooltip title={row.productName}>
            <span>{row.productName}</span>
          </Tooltip>
        ) : (
          '—'
        ),
    },
    { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 115 },
    {
      key: 'action',
      title: 'Action',
      width: 110,
      fixed: 'right',
      align: 'center',
      locked: true,
      type: 'custom',
      render: (_v, row) => (
        <Space size={0} onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/inventory/suppliers/${row.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => remove([row.id])}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <T02ListPage<Row>
      title="Suppliers"
      description="Parties the garage buys parts from"
      primaryAction={{
        key: 'new',
        label: 'Add Supplier',
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate('/inventory/suppliers/new'),
      }}
      searchPlaceholder="Search name, company, email or product"
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
      onRowClick={(row) => navigate(`/inventory/suppliers/${row.id}/edit`)}
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
      exportable
      emptyState={{
        title: 'No suppliers yet',
        description: 'Add a supplier so purchases and stock can be traced back to them.',
        action: {
          key: 'new',
          label: 'Add Supplier',
          onClick: () => navigate('/inventory/suppliers/new'),
        },
      }}
    />
  )
}
