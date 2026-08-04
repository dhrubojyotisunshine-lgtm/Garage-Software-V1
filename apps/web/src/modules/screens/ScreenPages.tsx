import { useMemo, useState } from 'react'
import { Alert, Avatar, Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  NotFoundState,
  T02ListPage,
  T05Form,
  palette,
  type ColumnDef,
} from '@garage/ui'
import { screenDefs as generatedDefs, type ScreenDef } from './definitions.generated'
import { manualScreenDefs } from './definitions.manual'
import { screenRoutes, type ScreenRoute } from './registry'
import { sampleRows } from './sampleRows'

/** Generated screens plus the hand-authored ones the reference set lacked. */
const screenDefs: Record<string, ScreenDef> = { ...generatedDefs, ...manualScreenDefs }

/**
 * Static screens.
 *
 * Structure comes from the reference product; presentation is entirely ours —
 * these render through T02 and T05 like every other screen in the app.
 *
 * Data is NOT wired yet. Lists show no rows and forms do not save. Each screen
 * says so, so a static page is never mistaken for a working one.
 */

const columnKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

type Row = Record<string, unknown> & { id: string }

function toColumns(def: ScreenDef): ColumnDef<Row>[] {
  const cols: ColumnDef<Row>[] = def.columns.map((label): ColumnDef<Row> => {
    const key = columnKey(label)
    const lower = label.toLowerCase()
    return {
      key,
      title: label,
      width: lower === 'image' ? 80 : undefined,
      align: lower === 'image' ? ('center' as const) : undefined,
      ellipsis: lower !== 'image',
      render:
        lower === 'image'
          ? () => (
              <Avatar
                size={32}
                icon={<UserOutlined />}
                style={{ background: palette.primary[50], color: palette.primary[600] }}
              />
            )
          : undefined,
      type: lower.includes('date')
        ? ('date' as const)
        : lower.includes('amount') || lower.includes('price') || lower.includes('total')
          ? ('money' as const)
          : ('text' as const),
    }
  })

  cols.push({
    key: '__action',
    title: 'Action',
    width: 110,
    fixed: 'right',
    align: 'center',
    type: 'custom',
    render: () => (
      <Space size={0}>
        <Tooltip title="Not wired yet">
          <Button type="text" size="small" icon={<EditOutlined />} disabled />
        </Tooltip>
        <Tooltip title="Not wired yet">
          <Button type="text" size="small" danger icon={<DeleteOutlined />} disabled />
        </Tooltip>
      </Space>
    ),
  })

  return cols
}

function StaticNotice({ what }: { what: string }) {
  return (
    <Alert
      type="info"
      showIcon
      style={{ marginBottom: 16 }}
      message={`${what} — sample data`}
      description="Columns and fields match the specification. The rows below are illustrative; this module is not wired to real data yet."
    />
  )
}

/** Resolves the screen definition for the current route. */
function useScreen(): { route: ScreenRoute; def: ScreenDef } | undefined {
  const { pathname } = useLocation()
  return useMemo(() => {
    const route = screenRoutes.find((r) => r.path === pathname)
    if (!route) return undefined
    const def = screenDefs[route.defKey]
    return def ? { route, def } : undefined
  }, [pathname])
}

export function StaticListPage() {
  const navigate = useNavigate()
  const found = useScreen()

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})

  const columns = useMemo(() => (found ? toColumns(found.def) : []), [found])
  const allRows = useMemo(() => (found ? sampleRows(found.def.columns) : []), [found])

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allRows
    return allRows.filter((r) =>
      Object.values(r).some((v) => String(v ?? '').toLowerCase().includes(q)),
    )
  }, [allRows, search])

  if (!found) return <NotFoundState what="screen" />
  const { route, def } = found

  return (
    <div>
      <StaticNotice what={def.title} />
      <T02ListPage<Row>
        title={def.title}
        description={route.description}
        primaryAction={
          route.addPath
            ? {
                key: 'new',
                label: `Add ${route.singular ?? def.title}`,
                icon: <PlusOutlined />,
                type: 'primary',
                onClick: () => navigate(route.addPath!),
              }
            : undefined
        }
        searchPlaceholder={`Search ${def.title.toLowerCase()}`}
        searchValue={search}
        onSearchChange={setSearch}
        filters={[]}
        filterValues={filterValues}
        onFilterChange={setFilterValues}
        columns={columns}
        rows={rows}
        rowKey="id"
        emptyState={{
          title: 'No rows match',
          description: 'Clear the search to see the sample rows again.',
        }}
      />
      <div style={{ marginTop: 12, fontSize: 12, color: palette.neutral[400] }}>
        {def.columns.length} columns · {rows.length} sample rows
        {route.addPath ? ` · add form has ${screenDefs[route.defKey]?.fields.length ?? 0} fields` : ''}
      </div>
    </div>
  )
}

export function StaticFormPage() {
  const navigate = useNavigate()
  const found = useScreen()

  if (!found) return <NotFoundState what="screen" />
  const { route, def } = found

  return (
    <div>
      <StaticNotice what={def.title} />
      <T05Form<Record<string, unknown>>
        mode="create"
        variant="page"
        title={def.title}
        description={`${def.fields.length} fields, matching the specification. Saving is not wired up yet.`}
        sections={[{ key: 'main', title: 'Details', fields: def.fields }]}
        onSubmit={async () => {
          navigate(route.backPath ?? '/admin')
        }}
        onCancel={() => navigate(route.backPath ?? '/admin')}
      />
    </div>
  )
}
