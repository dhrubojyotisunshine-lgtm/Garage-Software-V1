import { useMemo, useState } from 'react'
import {
  App,
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Segmented,
  Select,
  Space,
  Tag,
} from 'antd'
import { MoneyText, layout, palette } from '@garage/ui'
import {
  availableStock,
  toPaise,
  type ItemSource,
  type JobCardItemType,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { seedLabourCatalogue } from '@/store/seed'

/**
 * Add Item drawer — Labour, Spare or Lubricant on one unified surface.
 *
 * Workshop §89 requires a unified item grid rather than separate screens per
 * item type, so this is one drawer with a type toggle.
 */
export function AddItemDrawer({
  open,
  jobCardId,
  source,
  onClose,
}: {
  open: boolean
  jobCardId: string
  /** Estimate lines vs work added during repair. Workshop §107 */
  source: ItemSource
  onClose: () => void
}) {
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)
  const [form] = Form.useForm()

  const [type, setType] = useState<JobCardItemType>('Labour')
  const [productId, setProductId] = useState<string>()

  const product = store.productById(productId)

  const productOptions = useMemo(
    () =>
      store.products
        .filter((p) => p.status === 'Active')
        .filter((p) => (type === 'Lubricant' ? p.type === 'Lubricant' : p.type !== 'Lubricant'))
        .map((p) => {
          const available = availableStock(p)
          return {
            value: p.id,
            label: `${p.name} · ${p.sku}`,
            available,
            disabled: available <= 0,
          }
        }),
    [store.products, type],
  )

  const reset = () => {
    form.resetFields()
    setProductId(undefined)
  }

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values) return

    if (type === 'Labour') {
      store.addItem(
        jobCardId,
        {
          type: 'Labour',
          name: values.name,
          quantity: values.quantity,
          unit: 'Hr',
          rate: toPaise(values.rate),
          discountPercent: values.discountPercent ?? 0,
          taxRate: 18,
          source,
        },
        user?.name ?? 'System',
      )
    } else {
      if (!product) return message.error('Select a product')
      const available = availableStock(product)
      if (values.quantity > available) {
        return message.error(`Only ${available} ${product.unit} available`)
      }
      store.addItem(
        jobCardId,
        {
          type,
          productId: product.id,
          name: product.name,
          code: product.sku,
          quantity: values.quantity,
          unit: product.unit,
          rate: product.sellingPrice,
          discountPercent: values.discountPercent ?? 0,
          taxRate: product.taxRate,
          source,
        },
        user?.name ?? 'System',
      )
    }

    message.success('Item added')
    reset()
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={() => {
        reset()
        onClose()
      }}
      title={source === 'Estimate' ? 'Add Estimate Line' : 'Add Additional Work'}
      width={layout.drawerMd}
      destroyOnClose
      footer={
        <Flex justify="flex-end">
          <Space>
            <Button
              onClick={() => {
                reset()
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={submit}>
              Add Item
            </Button>
          </Space>
        </Flex>
      }
    >
      <Segmented
        block
        value={type}
        onChange={(v) => {
          setType(v as JobCardItemType)
          reset()
        }}
        options={['Labour', 'Spare', 'Lubricant']}
        style={{ marginBottom: 16 }}
      />

      <Form form={form} layout="vertical" initialValues={{ quantity: 1, discountPercent: 0 }}>
        {type === 'Labour' ? (
          <>
            <Form.Item
              name="name"
              label="Labour Description"
              rules={[{ required: true, message: 'Description is required' }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Select or type an operation"
                options={seedLabourCatalogue.map((l) => ({ label: l.name, value: l.name }))}
                onChange={(v) => {
                  const found = seedLabourCatalogue.find((l) => l.name === v)
                  if (found) {
                    form.setFieldsValue({ quantity: found.hours, rate: found.rate / 100 })
                  }
                }}
                // Allows a free-text operation not in the catalogue.
                mode={undefined}
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Flex gap={16}>
              <Form.Item
                name="quantity"
                label="Hours"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Hours required' }]}
              >
                <InputNumber min={0.25} step={0.25} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="rate"
                label="Rate per Hour (₹)"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Rate required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="discountPercent" label="Discount %" style={{ flex: 1 }}>
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Flex>
          </>
        ) : (
          <>
            <Form.Item label="Product" required>
              <Select
                showSearch
                placeholder="Search by name or SKU"
                value={productId}
                onChange={(v) => setProductId(v)}
                optionFilterProp="label"
                options={productOptions}
                optionRender={(opt) => (
                  <Flex justify="space-between" align="center">
                    <span>{opt.label}</span>
                    <Tag
                      color={
                        (opt.data as { available: number }).available <= 0
                          ? 'red'
                          : (opt.data as { available: number }).available <= 5
                            ? 'orange'
                            : 'green'
                      }
                      style={{ marginInlineEnd: 0 }}
                    >
                      {(opt.data as { available: number }).available} avail
                    </Tag>
                  </Flex>
                )}
              />
            </Form.Item>

            {product ? (
              <div
                style={{
                  padding: '10px 12px',
                  background: palette.neutral[50],
                  borderRadius: 6,
                  marginBottom: 16,
                  fontSize: 12,
                }}
              >
                <Flex justify="space-between" wrap gap={12}>
                  <span>
                    <span style={{ color: palette.neutral[500] }}>Part No: </span>
                    <span className="erp-mono">{product.partNumber ?? '—'}</span>
                  </span>
                  <span>
                    <span style={{ color: palette.neutral[500] }}>Rate: </span>
                    <MoneyText value={product.sellingPrice} strong />
                  </span>
                  <span>
                    <span style={{ color: palette.neutral[500] }}>GST: </span>
                    {product.taxRate}%
                  </span>
                  <span>
                    <span style={{ color: palette.neutral[500] }}>Available: </span>
                    <strong>
                      {availableStock(product)} {product.unit}
                    </strong>
                  </span>
                </Flex>
              </div>
            ) : null}

            <Flex gap={16}>
              <Form.Item
                name="quantity"
                label="Quantity"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Quantity required' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="discountPercent" label="Discount %" style={{ flex: 1 }}>
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Flex>
          </>
        )}

        <Form.Item name="remarks" label="Remarks">
          <Input placeholder="Optional note for this line" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
