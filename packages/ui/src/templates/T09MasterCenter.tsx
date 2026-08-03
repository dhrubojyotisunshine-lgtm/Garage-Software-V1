import { useMemo, useState, type ReactNode } from 'react'
import { Button, Card, Flex, Input, Menu, Modal, Space, Tooltip } from 'antd'
import { ImportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnDef, MasterDef, MasterGroupDef } from '../types'
import { DataTable } from '../components/DataTable'
import { StateFallback, resolvePageState } from '../components/States'
import { activeStatusMap } from '@garage/shared'
import { palette } from '../theme/tokens'

/**
 * T09 — MASTER MANAGEMENT
 *
 * CRUD across ~30 reference-data types from ONE screen.
 *
 * CRITICAL PRINCIPLE (04_ALL_MODULES.md §65):
 *   "Do NOT create every master as a global sidebar item."
 *
 * ONE generic engine. Never 30 hand-built screens.
 * A master in use CANNOT be deleted — only deactivated.
 *
 * Ref: 03_PAGE_TEMPLATES.md §20
 */

/** Every master row carries at least these fields. */
export interface MasterRow extends Record<string, unknown> {
  id: string
  name: string
  code?: string
  /** How many records reference this master. Makes safe deletion possible. §20 */
  usageCount: number
  status: string
  parentName?: string
}

export interface T09MasterCenterProps {
  groups: MasterGroupDef[]
  activeMaster: string
  onMasterChange: (key: string) => void

  rows: MasterRow[]
  loading?: boolean
  error?: Error | string | null

  onCreate: () => void
  onEdit: (row: MasterRow) => void
  onToggleActive: (row: MasterRow) => void
  onImport?: () => void

  /** Rendered beside the table for hierarchical masters (Manufacturer → Model). */
  parentPane?: ReactNode
}

export function T09MasterCenter({
  groups,
  activeMaster,
  onMasterChange,
  rows,
  loading,
  error,
  onCreate,
  onEdit,
  onToggleActive,
  onImport,
  parentPane,
}: T09MasterCenterProps) {
  const [navSearch, setNavSearch] = useState('')
  const [rowSearch, setRowSearch] = useState('')

  const master: MasterDef | undefined = useMemo(
    () => groups.flatMap((g) => g.masters).find((m) => m.key === activeMaster),
    [groups, activeMaster],
  )

  const filteredGroups = useMemo(() => {
    if (!navSearch.trim()) return groups
    const q = navSearch.toLowerCase()
    return groups
      .map((g) => ({ ...g, masters: g.masters.filter((m) => m.label.toLowerCase().includes(q)) }))
      .filter((g) => g.masters.length > 0)
  }, [groups, navSearch])

  const filteredRows = useMemo(() => {
    if (!rowSearch.trim()) return rows
    const q = rowSearch.toLowerCase()
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || (r.code ?? '').toLowerCase().includes(q),
    )
  }, [rows, rowSearch])

  /** Standard columns, plus whatever the master definition adds. */
  const columns = useMemo<ColumnDef<MasterRow>[]>(() => {
    const base: ColumnDef<MasterRow>[] = [
      { key: 'name', title: 'Name', locked: true, sortable: true },
      { key: 'code', title: 'Code', width: 120, type: 'identifier' },
      ...(master?.parent ? [{ key: 'parentName', title: 'Parent', width: 160 } as ColumnDef<MasterRow>] : []),
      ...((master?.columns ?? []) as ColumnDef<MasterRow>[]),
      {
        key: 'usageCount',
        title: 'Used by',
        width: 110,
        type: 'number',
        align: 'right',
        tooltip: 'Number of records referencing this master',
      },
      { key: 'status', title: 'Status', width: 110, type: 'status', statusMap: activeStatusMap },
      {
        key: '__actions',
        title: '',
        width: 160,
        fixed: 'right',
        align: 'right',
        locked: true,
        type: 'custom',
        render: (_v, row) => (
          <Space size={4} onClick={(e) => e.stopPropagation()}>
            <Button type="link" size="small" onClick={() => onEdit(row)}>
              Edit
            </Button>
            {/* A master in use cannot be deleted — only deactivated. §20 */}
            <Tooltip
              title={
                row.usageCount > 0
                  ? `Used by ${row.usageCount} record(s). Deactivate instead of deleting — historical records keep their reference.`
                  : undefined
              }
            >
              <Button
                type="link"
                size="small"
                danger={row.status === 'Active'}
                onClick={() =>
                  Modal.confirm({
                    title:
                      row.status === 'Active'
                        ? `Deactivate "${row.name}"?`
                        : `Reactivate "${row.name}"?`,
                    content:
                      row.status === 'Active'
                        ? 'It will be hidden from new selections but preserved on existing records.'
                        : 'It will become selectable again.',
                    okText: row.status === 'Active' ? 'Deactivate' : 'Reactivate',
                    okButtonProps: { danger: row.status === 'Active' },
                    onOk: () => onToggleActive(row),
                  })
                }
              >
                {row.status === 'Active' ? 'Deactivate' : 'Activate'}
              </Button>
            </Tooltip>
          </Space>
        ),
      },
    ]
    return base
  }, [master, onEdit, onToggleActive])

  const state = resolvePageState({
    loading,
    error,
    rowCount: filteredRows.length,
    hasActiveFilters: rowSearch.trim().length > 0,
  })

  return (
    <Flex gap={16} align="flex-start">
      {/* ---------------------------------------------------- MASTER NAV */}
      <Card
        size="small"
        styles={{ body: { padding: 8 } }}
        style={{ width: 260, flex: '0 0 260px', position: 'sticky', top: 80, maxHeight: '80vh', overflow: 'auto' }}
      >
        <Input
          allowClear
          size="small"
          prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
          placeholder="Search masters"
          value={navSearch}
          onChange={(e) => setNavSearch(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Menu
          mode="inline"
          selectedKeys={[activeMaster]}
          defaultOpenKeys={groups.map((g) => g.key)}
          onClick={({ key }) => onMasterChange(key)}
          style={{ border: 'none' }}
          items={filteredGroups.map((g) => ({
            key: g.key,
            label: g.label,
            type: 'group' as const,
            children: g.masters.map((m) => ({ key: m.key, label: m.label })),
          }))}
        />
      </Card>

      {/* -------------------------------------------------- MASTER PANEL */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }} gap={12} wrap>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{master?.label ?? 'Select a master'}</div>
            <div style={{ fontSize: 12, color: palette.neutral[500] }}>
              Defined once, reused everywhere
            </div>
          </div>
          <Space size={8}>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
              placeholder="Search"
              value={rowSearch}
              onChange={(e) => setRowSearch(e.target.value)}
              style={{ width: 220 }}
            />
            {master?.supportsImport && onImport ? (
              <Button icon={<ImportOutlined />} onClick={onImport}>
                Import
              </Button>
            ) : null}
            <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
              New
            </Button>
          </Space>
        </Flex>

        <Flex gap={16} align="flex-start">
          {parentPane ? <div style={{ width: 240, flex: '0 0 240px' }}>{parentPane}</div> : null}

          <Card size="small" styles={{ body: { padding: 0 } }} style={{ flex: 1, minWidth: 0 }}>
            <StateFallback
              state={state}
              error={error}
              onClearFilters={() => setRowSearch('')}
              loadingVariant="table"
              emptyState={{
                title: `No ${master?.label.toLowerCase() ?? 'records'} yet`,
                description: 'Create the first one to start using it across the ERP.',
                action: { key: 'new', label: 'New', onClick: onCreate },
              }}
            >
              <DataTable<MasterRow>
                columns={columns}
                rows={filteredRows}
                rowKey="id"
                onRowClick={onEdit}
                pagination={false}
              />
            </StateFallback>
          </Card>
        </Flex>
      </div>
    </Flex>
  )
}
