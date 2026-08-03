import { useState, type ReactNode } from 'react'
import { Button, Card, Collapse, Dropdown, Flex, Space, Table, Tag } from 'antd'
import {
  DownloadOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { ColumnDef, FilterDef, FilterValues, ReportMetaDef, SummaryMetric } from '../types'
import { FilterBar } from '../components/FilterBar'
import { DataTable } from '../components/DataTable'
import { SummaryStrip } from '../components/Kpi'
import { StateFallback, resolvePageState } from '../components/States'
import { palette } from '../theme/tokens'

/**
 * T07 — REPORT
 *
 * Filter → result → export / drill-down.
 *
 * CRITICAL: every report is a DEFINITION rendered by this ONE component.
 * Do not hand-build ~100 report screens.
 *
 * Ref: 03_PAGE_TEMPLATES.md §18, Reports flow §27–32
 */

export interface T07ReportProps<T extends object> {
  meta: ReportMetaDef

  filters: FilterDef[]
  filterValues: FilterValues
  onFilterChange: (v: FilterValues) => void
  /** Filters do NOT auto-apply. Explicit Apply. §18 */
  onApply: () => void
  onReset: () => void

  summary?: SummaryMetric[]
  /** Optional chart. Never rendered without the table below it. §18 */
  chart?: ReactNode

  columns: ColumnDef<T>[]
  rows: T[]
  rowKey: keyof T | ((row: T) => string)
  /** Sticky totals row. */
  totals?: Record<string, ReactNode>

  loading?: boolean
  error?: Error | string | null
  onRefresh?: () => void
  onExport?: (format: 'excel' | 'csv' | 'pdf') => void
  onPrint?: () => void
  onSaveView?: () => void
  onRowClick?: (row: T) => void
}

export function T07Report<T extends object>({
  meta,
  filters,
  filterValues,
  onFilterChange,
  onApply,
  onReset,
  summary,
  chart,
  columns,
  rows,
  rowKey,
  totals,
  loading,
  error,
  onRefresh,
  onExport,
  onPrint,
  onSaveView,
  onRowClick,
}: T07ReportProps<T>) {
  const [filtersOpen, setFiltersOpen] = useState<string[]>(rows.length ? [] : ['filters'])

  const state = resolvePageState({
    loading,
    error,
    rowCount: rows.length,
    hasActiveFilters: Object.values(filterValues).some((v) => v !== undefined && v !== ''),
  })

  return (
    <div>
      {/* ------------------------------------------------- REPORT HEADER */}
      <Flex justify="space-between" align="center" gap={16} wrap style={{ marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{meta.reportName}</div>
        </div>
        <Space size={8}>
          {onSaveView ? (
            <Button icon={<SaveOutlined />} onClick={onSaveView}>
              Save View
            </Button>
          ) : null}
          {onRefresh ? <Button icon={<ReloadOutlined />} onClick={onRefresh} /> : null}
          {onPrint ? <Button icon={<PrinterOutlined />} onClick={onPrint} /> : null}
          {onExport ? (
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'excel', label: 'Excel', onClick: () => onExport('excel') },
                  { key: 'csv', label: 'CSV', onClick: () => onExport('csv') },
                  { key: 'pdf', label: 'PDF', onClick: () => onExport('pdf') },
                ],
              }}
            >
              <Button type="primary" icon={<DownloadOutlined />}>
                Export
              </Button>
            </Dropdown>
          ) : null}
        </Space>
      </Flex>

      {/* -------------------------------------------------- FILTER PANEL */}
      <Collapse
        activeKey={filtersOpen}
        onChange={(k) => setFiltersOpen(k as string[])}
        style={{ marginBottom: 16 }}
        items={[
          {
            key: 'filters',
            label: <span style={{ fontWeight: 500 }}>Filters</span>,
            extra: <SettingOutlined />,
            children: (
              <>
                <FilterBar
                  searchPlaceholder="Search within results"
                  searchValue={(filterValues.search as string) ?? ''}
                  onSearchChange={(v) => onFilterChange({ ...filterValues, search: v })}
                  filters={filters}
                  values={filterValues}
                  onChange={onFilterChange}
                />
                <Flex justify="flex-end" gap={8}>
                  <Button onClick={onReset}>Reset</Button>
                  <Button type="primary" onClick={onApply}>
                    Apply
                  </Button>
                </Flex>
              </>
            ),
          },
        ]}
      />

      {/* ---------------------------------------------------- RESULT META */}
      {/* This block is what makes an exported report defensible. §18 */}
      <Flex
        gap={12}
        wrap
        align="center"
        style={{
          padding: '8px 12px',
          marginBottom: 16,
          background: palette.neutral[50],
          border: `1px solid ${palette.neutral[200]}`,
          borderRadius: 6,
          fontSize: 12,
          color: palette.neutral[600],
        }}
      >
        {meta.dateRange ? (
          <span>
            <strong>Period:</strong> {meta.dateRange}
          </span>
        ) : null}
        {meta.branch ? (
          <span>
            <strong>Branch:</strong> {meta.branch}
          </span>
        ) : null}
        {meta.resultCount !== undefined ? (
          <span>
            <strong>{meta.resultCount}</strong> rows
          </span>
        ) : null}
        {meta.generatedAt ? <span>Generated {meta.generatedAt}</span> : null}
        {meta.appliedFilters?.length ? (
          <Flex gap={4} wrap>
            {meta.appliedFilters.map((f, i) => (
              <Tag key={i} style={{ marginInlineEnd: 0, fontSize: 11 }}>
                {f.label}: {f.value}
              </Tag>
            ))}
          </Flex>
        ) : null}
      </Flex>

      {/* ------------------------------------------------- SUMMARY CARDS */}
      {summary?.length ? (
        <Card size="small" style={{ marginBottom: 16 }} styles={{ body: { padding: '4px 16px' } }}>
          <SummaryStrip metrics={summary} />
        </Card>
      ) : null}

      {/* ------------------------------------------------------- CHART */}
      {chart ? (
        <Card size="small" style={{ marginBottom: 16 }}>
          {chart}
        </Card>
      ) : null}

      {/* ------------------------------------------------- RESULT TABLE */}
      <Card size="small" styles={{ body: { padding: 0 } }}>
        <StateFallback
          state={state}
          error={error}
          onRetry={onRefresh}
          onClearFilters={onReset}
          loadingVariant="table"
          emptyState={{
            title: 'No data for this report',
            description: 'Adjust the filters above and apply again.',
          }}
        >
          <DataTable<T>
            columns={columns}
            rows={rows}
            rowKey={rowKey}
            pagination={false}
            onRowClick={onRowClick}
            virtual={rows.length > 200}
            summaryRow={
              totals
                ? () => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        {columns.map((c, i) => (
                          <Table.Summary.Cell key={c.key} index={i} align={c.align ?? 'left'}>
                            {i === 0 ? <strong>Total</strong> : (totals[c.key] ?? null)}
                          </Table.Summary.Cell>
                        ))}
                      </Table.Summary.Row>
                    </Table.Summary>
                  )
                : undefined
            }
          />
        </StateFallback>
      </Card>
    </div>
  )
}
