import { useMemo, useState } from 'react'
import { Badge, Button, Checkbox, DatePicker, Flex, Input, InputNumber, Popover, Select, Space, Tag } from 'antd'
import { FilterOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { FilterDef, FilterValues, QuickFilterDef } from '../types'
import { colorsFor } from '../theme/statusColors'
import { palette } from '../theme/tokens'

/**
 * Search, filters, active-filter chips and quick-filter tabs.
 *
 * Ref: 03_PAGE_TEMPLATES.md §13
 */

const { RangePicker } = DatePicker

/** Status-count tabs above a list. Always includes "All". Ref: Workshop §6 */
export function QuickFilterTabs({
  items,
  value,
  onChange,
}: {
  items: QuickFilterDef[]
  value: string
  onChange: (key: string) => void
}) {
  return (
    <Flex
      gap={4}
      wrap
      style={{
        borderBottom: `1px solid ${palette.neutral[200]}`,
        marginBottom: 12,
        paddingBottom: 0,
      }}
    >
      {items.map((item) => {
        const active = item.key === value
        const tone = item.tone ? colorsFor(item.tone) : null
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px 12px',
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              color: active ? palette.primary[700] : palette.neutral[600],
              borderBottom: `2px solid ${active ? palette.primary[500] : 'transparent'}`,
              marginBottom: -1,
            }}
          >
            {item.label}
            {item.count !== undefined ? (
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 10,
                  background: active ? palette.primary[50] : (tone?.bg ?? palette.neutral[100]),
                  color: active ? palette.primary[700] : (tone?.text ?? palette.neutral[600]),
                }}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </Flex>
  )
}

function FilterControl({
  def,
  value,
  onChange,
}: {
  def: FilterDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  const common = { style: { width: def.width ?? 180 }, placeholder: def.placeholder ?? def.label }

  switch (def.type) {
    case 'select':
      return (
        <Select
          {...common}
          allowClear
          options={def.options}
          value={(value as string) ?? undefined}
          onChange={onChange}
        />
      )
    case 'multiselect':
      return (
        <Select
          {...common}
          mode="multiple"
          allowClear
          maxTagCount="responsive"
          options={def.options}
          value={(value as string[]) ?? undefined}
          onChange={onChange}
        />
      )
    case 'date':
      return (
        <DatePicker
          {...common}
          format="DD MMM YYYY"
          value={value ? dayjs(value as string) : null}
          onChange={(d) => onChange(d ? d.toISOString() : undefined)}
        />
      )
    case 'daterange':
      return (
        <RangePicker
          style={{ width: def.width ?? 260 }}
          format="DD MMM YYYY"
          value={
            Array.isArray(value) && value.length === 2
              ? [dayjs(value[0] as string), dayjs(value[1] as string)]
              : null
          }
          onChange={(range) =>
            onChange(range?.[0] && range?.[1] ? [range[0].toISOString(), range[1].toISOString()] : undefined)
          }
        />
      )
    case 'number':
      return (
        <InputNumber
          {...common}
          value={value as number}
          onChange={(v) => onChange(v ?? undefined)}
        />
      )
    case 'boolean':
      return (
        <Checkbox checked={Boolean(value)} onChange={(e) => onChange(e.target.checked || undefined)}>
          {def.label}
        </Checkbox>
      )
    default:
      return (
        <Input
          {...common}
          value={value as string}
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      )
  }
}

export interface FilterBarProps {
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (v: string) => void
  filters: FilterDef[]
  values: FilterValues
  onChange: (values: FilterValues) => void
  onRefresh?: () => void
  extra?: React.ReactNode
}

export function FilterBar({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
  values,
  onChange,
  onRefresh,
  extra,
}: FilterBarProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const inline = filters.filter((f) => !f.advanced)
  const advanced = filters.filter((f) => f.advanced)

  const advancedCount = useMemo(
    () => advanced.filter((f) => values[f.key] !== undefined && values[f.key] !== '').length,
    [advanced, values],
  )

  const set = (key: string, v: unknown) => onChange({ ...values, [key]: v })

  return (
    <Flex gap={8} wrap align="center" style={{ marginBottom: 12 }}>
      <Input
        allowClear
        prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 320 }}
      />

      {inline.map((f) => (
        <FilterControl key={f.key} def={f} value={values[f.key]} onChange={(v) => set(f.key, v)} />
      ))}

      {advanced.length ? (
        <Popover
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          trigger="click"
          placement="bottomRight"
          content={
            <Space direction="vertical" size={12} style={{ width: 280 }}>
              {advanced.map((f) => (
                <div key={f.key}>
                  <div style={{ fontSize: 12, color: palette.neutral[600], marginBottom: 4 }}>
                    {f.label}
                  </div>
                  <FilterControl
                    def={{ ...f, width: 280 }}
                    value={values[f.key]}
                    onChange={(v) => set(f.key, v)}
                  />
                </div>
              ))}
            </Space>
          }
        >
          <Badge count={advancedCount} size="small">
            <Button icon={<FilterOutlined />}>More filters</Button>
          </Badge>
        </Popover>
      ) : null}

      {onRefresh ? <Button icon={<ReloadOutlined />} onClick={onRefresh} aria-label="Refresh" /> : null}
      {extra}
    </Flex>
  )
}

/**
 * Every applied filter is visible and individually removable, plus "Clear all".
 * Ref: 03_PAGE_TEMPLATES.md §13
 */
export function ActiveFilterChips({
  filters,
  values,
  onChange,
  onClearAll,
}: {
  filters: FilterDef[]
  values: FilterValues
  onChange: (values: FilterValues) => void
  onClearAll: () => void
}) {
  const active = filters
    .map((f) => ({ def: f, value: values[f.key] }))
    .filter((x) => x.value !== undefined && x.value !== '' && x.value !== null)

  if (!active.length) return null

  const labelFor = (def: FilterDef, value: unknown): string => {
    if (Array.isArray(value)) {
      if (def.type === 'daterange') return 'Custom range'
      return `${value.length} selected`
    }
    const opt = def.options?.find((o) => o.value === value)
    return opt?.label ?? String(value)
  }

  return (
    <Flex gap={6} wrap align="center" style={{ marginBottom: 12 }}>
      {active.map(({ def, value }) => (
        <Tag
          key={def.key}
          closable
          onClose={() => onChange({ ...values, [def.key]: undefined })}
          style={{ marginInlineEnd: 0, background: palette.neutral[50] }}
        >
          <span style={{ color: palette.neutral[500] }}>{def.label}:</span>{' '}
          <strong>{labelFor(def, value)}</strong>
        </Tag>
      ))}
      <Button type="link" size="small" onClick={onClearAll} style={{ paddingInline: 4 }}>
        Clear all
      </Button>
    </Flex>
  )
}
