import { useMemo, useState } from 'react'
import { Card, Col, List } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DashboardWidget,
  NotFoundState,
  StatusChip,
  T01Dashboard,
  T02ListPage,
  palette,
  type AttentionItemDef,
  type KpiDef,
} from '@garage/ui'
import { DemoBanner } from './DemoBanner'
import { demoModules } from './registry'
import type { DemoModuleDef, DemoRow } from './types'

/**
 * Two generic renderers turn every demo definition into screens.
 *
 * They reuse T01 and T02 exactly as the real modules do, so the mockups show
 * the genuine interaction language rather than a separate throwaway design.
 */

/** Resolves the module from the URL — longest matching base path wins. */
function useModule(): DemoModuleDef | undefined {
  const { pathname } = useLocation()
  return demoModules
    .filter((m) => pathname === m.path || pathname.startsWith(`${m.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0]
}

/** The list screen for the current URL, if any. */
function useListDef(module?: DemoModuleDef) {
  const { pathname } = useLocation()
  if (!module) return undefined
  const segment = pathname.slice(module.path.length + 1)
  return module.lists.find((l) => l.path === segment)
}

/* ---------------------------------------------------------------- dashboard */

export function DemoDashboard() {
  const navigate = useNavigate()
  const module = useModule()

  if (!module?.dashboard) return <NotFoundState what="module" />
  const d = module.dashboard

  /**
   * KpiDef requires a drill-down target — a KPI that goes nowhere is not
   * allowed (§12). Demo KPIs point at the module's first list.
   */
  const target = module.lists[0] ? `${module.path}/${module.lists[0].path}` : module.path

  const kpis: KpiDef[] = d.kpis.map((k) => ({
    key: k.key,
    label: k.label,
    value: k.value,
    delta: k.delta,
    higherIsBetter: k.higherIsBetter,
    icon: k.icon,
    href: target,
  }))

  const attention: AttentionItemDef[] = (d.attention ?? []).map((a) => ({
    key: a.key,
    severity: a.severity,
    label: a.label,
    count: a.count,
    href: target,
  }))

  return (
    <div>
      <DemoBanner module={module.label} />
      <T01Dashboard
        title={d.title}
        description={d.description}
        context="Pune Main Branch · Today · demo data"
        kpis={kpis}
        attention={attention}
        onNavigate={navigate}
      >
        {d.widgets.map((w) => (
          <Col key={w.key} xs={24} lg={w.span}>
            <DashboardWidget title={w.title} viewAllHref={target} onNavigate={navigate}>
              <List
                size="small"
                dataSource={w.rows}
                renderItem={(row) => (
                  <List.Item
                    style={{ paddingInline: 4 }}
                    extra={
                      row.tag ? (
                        <StatusChip label={row.tag.label} tone={row.tag.tone} size="small" />
                      ) : row.right ? (
                        <span className="erp-tabular" style={{ fontWeight: 600, fontSize: 13 }}>
                          {row.right}
                        </span>
                      ) : null
                    }
                  >
                    <List.Item.Meta
                      title={<span style={{ fontSize: 13 }}>{row.title}</span>}
                      description={
                        row.subtitle ? (
                          <span style={{ fontSize: 12, color: palette.neutral[500] }}>
                            {row.subtitle}
                          </span>
                        ) : null
                      }
                    />
                  </List.Item>
                )}
              />
            </DashboardWidget>
          </Col>
        ))}
      </T01Dashboard>
    </div>
  )
}

/* -------------------------------------------------------------------- list */

export function DemoList() {
  const module = useModule()
  const def = useListDef(module)

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')

  const rows = useMemo(() => {
    if (!def) return []
    let list = def.rows
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter((r) =>
        Object.values(r).some((v) => String(v ?? '').toLowerCase().includes(q)),
      )
    }
    for (const [key, value] of Object.entries(filterValues)) {
      if (value === undefined || value === '' || value === null) continue
      list = list.filter((r) => r[key] === value)
    }
    return list
  }, [def, search, filterValues])

  if (!module || !def) return <NotFoundState what="screen" />

  return (
    <div>
      <DemoBanner module={module.label} />
      <T02ListPage<DemoRow>
        title={def.title}
        description={def.description}
        primaryAction={
          def.primaryActionLabel
            ? { key: 'new', label: def.primaryActionLabel, type: 'primary', disabled: true,
                disabledReason: 'Demo screen — creation is not wired up' }
            : undefined
        }
        quickFilters={def.quickFilters}
        quickFilterValue={quickFilter}
        onQuickFilterChange={setQuickFilter}
        searchPlaceholder={def.searchPlaceholder}
        searchValue={search}
        onSearchChange={setSearch}
        filters={def.filters}
        filterValues={filterValues}
        onFilterChange={setFilterValues}
        columns={def.columns}
        rows={rows}
        rowKey="id"
        exportable
        emptyState={{ title: 'No demo rows match', description: 'Clear the filters to see all.' }}
      />
      <Card
        size="small"
        style={{ marginTop: 12, background: palette.neutral[50] }}
        styles={{ body: { padding: '8px 12px' } }}
      >
        <span style={{ fontSize: 12, color: palette.neutral[500] }}>
          Rows are illustrative and do not open. The working equivalents of this screen are Job
          Cards, Customers and Parts &amp; Products.
        </span>
      </Card>
    </div>
  )
}

/** A module path resolves to its dashboard, or its first list if it has none. */
export function DemoModuleIndex() {
  const module = useModule()
  if (module && !module.dashboard) return <DemoList />
  return <DemoDashboard />
}
