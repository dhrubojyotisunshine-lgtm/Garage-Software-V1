import { useMemo, useState } from 'react'
import { App, Avatar, Button, Space, Tag, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { NotFoundState, T02ListPage, palette, type ColumnDef, type FilterDef } from '@garage/ui'
import {
  PERSON_ROLE_PLURAL,
  PERSON_ROLE_SLUGS,
  formatDate,
  personDisplayName,
  roleFromSlug,
  type PersonRole,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Staff list (T02).
 *
 * One screen serves all four roles. Employees, Support Staff, Accountants and
 * Branch Admins have an identical field set in the reference product, so four
 * near-identical tables would be four places for the same bug to live.
 * The role comes from the URL.
 */

const DESCRIPTION: Record<PersonRole, string> = {
  Employee: 'Workshop and office staff',
  'Support Staff': 'Staff handling customer support',
  Accountant: 'Staff with accounts access',
  'Branch Admin': 'Administrators scoped to a branch',
}

const FILTERS: FilterDef[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    width: 140,
    options: ['Active', 'Inactive'].map((v) => ({ label: v, value: v })),
  },
]

interface Row extends Record<string, unknown> {
  id: string
  code: string
  imageUrl?: string
  name: string
  email: string
  mobile: string
  designation: string
  joinDate: string
  city: string
  status: string
}

export default function PersonList() {
  const navigate = useNavigate()
  const location = useLocation()
  const { message, modal } = App.useApp()
  const store = useWorkshopStore()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  // /admin/users/support-staff → "Support Staff"
  const slug = location.pathname.split('/').filter(Boolean).pop()
  const role = roleFromSlug(slug)

  const allRows = useMemo<Row[]>(() => {
    if (!role) return []
    return store.personsOfRole(role).map((p) => ({
      id: p.id,
      code: p.code,
      imageUrl: p.imageUrl,
      name: personDisplayName(p),
      email: p.email ?? '',
      mobile: p.mobile ?? '',
      designation: p.designation ?? '',
      joinDate: p.joinDate ?? '',
      city: p.city ?? '',
      status: p.status,
    }))
  }, [store, role])

  const rows = useMemo(() => {
    let list = allRows
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.code.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.mobile.includes(q) ||
          r.designation.toLowerCase().includes(q),
      )
    }
    if (filterValues.status) list = list.filter((r) => r.status === filterValues.status)
    return list
  }, [allRows, search, filterValues])

  if (!role) return <NotFoundState what="staff list" />

  const basePath = `/admin/users/${PERSON_ROLE_SLUGS[role]}`

  const remove = (ids: string[]) => {
    modal.confirm({
      title: `Delete ${ids.length} record(s)?`,
      content:
        'Anyone named on a job card is kept — removing them would leave that history without the person who did the work.',
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        const { deleted, blocked } = store.deletePersons(ids)
        setSelected([])
        if (deleted) message.success(`${deleted} record(s) deleted`)
        if (blocked) message.warning(`${blocked} kept — named on a job card`)
      },
    })
  }

  const COLUMNS: ColumnDef<Row>[] = [
    {
      key: 'imageUrl',
      title: 'Image',
      width: 74,
      align: 'center',
      type: 'custom',
      locked: true,
      render: (_v, row) => (
        <Avatar
          src={row.imageUrl}
          size={34}
          style={{ background: palette.primary[50], color: palette.primary[600] }}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      key: 'code',
      title: 'Code',
      width: 105,
      render: (v) => <span className="erp-mono">{String(v)}</span>,
    },
    { key: 'name', title: 'Name', width: 180 },
    { key: 'designation', title: 'Designation', width: 165 },
    { key: 'email', title: 'Email' },
    {
      key: 'mobile',
      title: 'Mobile',
      width: 130,
      render: (v) => <span className="erp-mono">{String(v) || '—'}</span>,
    },
    {
      key: 'joinDate',
      title: 'Joined',
      width: 125,
      render: (v) => (v ? formatDate(String(v)) : '—'),
    },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      render: (v) => (
        <Tag color={v === 'Active' ? 'success' : 'default'}>{String(v)}</Tag>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 80,
      type: 'custom',
      render: (_v, row) => (
        <Space size={0}>
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                navigate(`${basePath}/${row.id}/edit`)
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
      title={PERSON_ROLE_PLURAL[role]}
      description={DESCRIPTION[role]}
      primaryAction={{
        key: 'new',
        label: `Add ${role}`,
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate(`${basePath}/new`),
      }}
      searchPlaceholder="Search name, code, email, mobile or designation"
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
      onRowClick={(row) => navigate(`${basePath}/${row.id}/edit`)}
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
