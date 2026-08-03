import { useMemo } from 'react'
import { Button, Flex, Select, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { formatMobile, formatRegistration } from '@garage/shared'
import { palette } from '@garage/ui'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Customer and Vehicle pickers with inline creation.
 *
 * Workshop §4: "Do NOT repeatedly ask for the same Customer or Vehicle data."
 * Selecting an existing record is the primary path; quick-add is the escape
 * hatch, and it never leaves the job card being created.
 */

export function CustomerPicker({
  value,
  onChange,
  onQuickAdd,
}: {
  value?: unknown
  onChange?: (v: unknown) => void
  onQuickAdd: () => void
}) {
  const customers = useWorkshopStore((s) => s.customers)

  const options = useMemo(
    () =>
      customers.map((c) => ({
        value: c.id,
        label: `${c.name} · ${formatMobile(c.mobile)}`,
        search: `${c.name} ${c.mobile} ${c.code}`.toLowerCase(),
      })),
    [customers],
  )

  return (
    <Flex gap={8}>
      <Select
        showSearch
        allowClear
        style={{ flex: 1 }}
        placeholder="Search customer by name or mobile"
        value={value as string}
        onChange={(v) => onChange?.(v)}
        options={options}
        filterOption={(input, option) =>
          (option as { search?: string })?.search?.includes(input.toLowerCase()) ?? false
        }
      />
      <Button icon={<PlusOutlined />} onClick={onQuickAdd}>
        New
      </Button>
    </Flex>
  )
}

export function VehiclePicker({
  value,
  onChange,
  customerId,
  onQuickAdd,
}: {
  value?: unknown
  onChange?: (v: unknown) => void
  customerId?: string
  onQuickAdd: () => void
}) {
  const vehicles = useWorkshopStore((s) => s.vehicles)

  const options = useMemo(() => {
    if (!customerId) return []
    return vehicles
      .filter((v) => v.customerId === customerId)
      .map((v) => ({
        value: v.id,
        label: `${formatRegistration(v.registration)} — ${v.manufacturer} ${v.model} ${v.variant ?? ''}`.trim(),
      }))
  }, [vehicles, customerId])

  if (!customerId) {
    return (
      <div
        style={{
          padding: '7px 12px',
          border: `1px dashed ${palette.neutral[300]}`,
          borderRadius: 6,
          color: palette.neutral[500],
          fontSize: 13,
        }}
      >
        Select a customer first
      </div>
    )
  }

  return (
    <Flex gap={8}>
      <Select
        showSearch
        allowClear
        style={{ flex: 1 }}
        placeholder={options.length ? 'Select vehicle' : 'No vehicles — add one'}
        value={value as string}
        onChange={(v) => onChange?.(v)}
        options={options}
        optionFilterProp="label"
      />
      <Button icon={<PlusOutlined />} onClick={onQuickAdd}>
        New
      </Button>
    </Flex>
  )
}

/** Compact read-only summary shown once both are chosen. */
export function SelectionSummary({
  customerId,
  vehicleId,
}: {
  customerId?: string
  vehicleId?: string
}) {
  const store = useWorkshopStore()
  const customer = store.customerById(customerId)
  const vehicle = store.vehicleById(vehicleId)

  if (!customer && !vehicle) return null

  return (
    <Space
      size={16}
      wrap
      style={{
        padding: '10px 12px',
        background: palette.primary[50],
        border: `1px solid ${palette.primary[200]}`,
        borderRadius: 6,
        marginBottom: 16,
        width: '100%',
      }}
    >
      {customer ? (
        <span style={{ fontSize: 13 }}>
          <span style={{ color: palette.neutral[500] }}>Customer: </span>
          <strong>{customer.name}</strong>{' '}
          <span className="erp-tabular">{formatMobile(customer.mobile)}</span>
          {customer.creditLimit > 0 ? (
            <Tag color="blue" style={{ marginLeft: 8 }}>
              Credit customer
            </Tag>
          ) : null}
        </span>
      ) : null}
      {vehicle ? (
        <span style={{ fontSize: 13 }}>
          <span style={{ color: palette.neutral[500] }}>Vehicle: </span>
          <strong className="erp-mono">{formatRegistration(vehicle.registration)}</strong>{' '}
          {vehicle.manufacturer} {vehicle.model} {vehicle.variant ?? ''} · {vehicle.fuelType}
          {vehicle.lastOdometer ? (
            <span style={{ color: palette.neutral[500] }}>
              {' '}
              · last {vehicle.lastOdometer.toLocaleString('en-IN')} km
            </span>
          ) : null}
        </span>
      ) : null}
    </Space>
  )
}
