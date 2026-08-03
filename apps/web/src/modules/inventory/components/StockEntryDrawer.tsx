import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
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
  canRemoveStock,
  directionOf,
  stockPosition,
  toPaise,
  type StockTransactionType,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Stock Entry — the only way stock enters or leaves outside a job card.
 *
 * Every mode writes a ledger entry; none of them edits a balance directly.
 * Ref: 05_MODULE_FLOWS-04_INVENTORY.md §35, plan §4.6
 */

type Mode = 'Stock In' | 'Adjustment' | 'Damage' | 'Loss' | 'Physical Verification'

const MODES: Mode[] = ['Stock In', 'Adjustment', 'Damage', 'Loss', 'Physical Verification']

const MODE_HELP: Record<Mode, string> = {
  'Stock In': 'Goods received into the store. Increases stock.',
  Adjustment: 'Correct a known discrepancy. Choose the direction.',
  Damage: 'Stock damaged beyond use. Decreases stock.',
  Loss: 'Stock missing or written off. Decreases stock.',
  'Physical Verification': 'Enter the counted quantity — the difference is recorded automatically.',
}

export function StockEntryDrawer({
  open,
  productId,
  onClose,
}: {
  open: boolean
  /** Pre-selects a product; omit to let the user pick. */
  productId?: string
  onClose: () => void
}) {
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const { user, financialYear } = useAppStore()
  const [form] = Form.useForm()

  const [mode, setMode] = useState<Mode>('Stock In')
  const [selectedId, setSelectedId] = useState<string | undefined>(productId)

  useEffect(() => {
    if (open) setSelectedId(productId)
  }, [open, productId])

  const product = store.productById(selectedId)
  const position = product ? stockPosition(product) : undefined

  const productOptions = useMemo(
    () =>
      store.products
        .filter((p) => p.status === 'Active')
        .map((p) => ({ value: p.id, label: `${p.name} · ${p.sku}` })),
    [store.products],
  )

  const isOutward = mode === 'Damage' || mode === 'Loss'
  const isCount = mode === 'Physical Verification'

  const reset = () => {
    form.resetFields()
    setMode('Stock In')
  }

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values || !product) return

    const actor = user?.name ?? 'System'

    if (isCount) {
      const result = store.recordPhysicalVerification(
        {
          productId: product.id,
          countedQuantity: values.countedQuantity,
          reason: values.reason,
          financialYear,
        },
        actor,
      )
      if (!result.ok) return message.warning(result.error)
      message.success('Physical verification recorded')
      reset()
      onClose()
      return
    }

    // Adjustment can go either way; the others have a fixed direction.
    const type: StockTransactionType =
      mode === 'Adjustment'
        ? values.direction === 'Out'
          ? 'Loss'
          : 'Stock In'
        : (mode as StockTransactionType)

    if (directionOf(type) === 'Out') {
      const guard = canRemoveStock(product, values.quantity)
      if (!guard.ok) return message.error(guard.reason)
    }

    const result = store.recordStockEntry(
      {
        productId: product.id,
        type,
        quantity: values.quantity,
        rate: values.rate ? toPaise(values.rate) : undefined,
        reason: values.reason ?? (mode === 'Adjustment' ? 'Stock adjustment' : mode),
        reference: values.reference,
        financialYear,
      },
      actor,
    )

    if (!result.ok) return message.error(result.error)
    message.success(`${type} recorded — ${result.transaction?.txnNo}`)
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
      title="Stock Entry"
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
            <Button type="primary" onClick={submit} disabled={!product}>
              Record Entry
            </Button>
          </Space>
        </Flex>
      }
    >
      <Segmented
        block
        value={mode}
        onChange={(v) => {
          setMode(v as Mode)
          form.resetFields(['quantity', 'countedQuantity', 'direction', 'reason'])
        }}
        options={MODES}
        style={{ marginBottom: 12 }}
      />

      <Alert
        type={isOutward ? 'warning' : 'info'}
        showIcon
        message={MODE_HELP[mode]}
        style={{ marginBottom: 16 }}
      />

      <Form form={form} layout="vertical" initialValues={{ quantity: 1, direction: 'In' }}>
        <Form.Item label="Product" required>
          <Select
            showSearch
            placeholder="Search product by name or SKU"
            value={selectedId}
            onChange={setSelectedId}
            optionFilterProp="label"
            options={productOptions}
            disabled={Boolean(productId)}
          />
        </Form.Item>

        {product && position ? (
          <Flex
            gap={16}
            wrap
            style={{
              padding: '10px 12px',
              background: palette.neutral[50],
              borderRadius: 6,
              marginBottom: 16,
              fontSize: 12,
            }}
          >
            <span>
              <span style={{ color: palette.neutral[500] }}>On hand: </span>
              <strong>
                {position.onHand} {product.unit}
              </strong>
            </span>
            <span>
              <span style={{ color: palette.neutral[500] }}>Reserved: </span>
              <strong>{position.reserved}</strong>
            </span>
            <span>
              <span style={{ color: palette.neutral[500] }}>Available: </span>
              <strong>{position.available}</strong>
            </span>
            <span>
              <span style={{ color: palette.neutral[500] }}>Reorder at: </span>
              <strong>{product.reorderLevel}</strong>
            </span>
            {availableStock(product) <= product.reorderLevel ? (
              <Tag color="orange" style={{ marginInlineEnd: 0 }}>
                Needs reorder
              </Tag>
            ) : null}
          </Flex>
        ) : null}

        {isCount ? (
          <Form.Item
            name="countedQuantity"
            label="Counted Quantity"
            rules={[{ required: true, message: 'Enter the counted quantity' }]}
            extra={
              product
                ? `Book stock is ${product.onHand} ${product.unit}. The difference will be recorded as a correction.`
                : undefined
            }
          >
            <InputNumber min={0} style={{ width: '100%' }} size="large" />
          </Form.Item>
        ) : (
          <>
            {mode === 'Adjustment' ? (
              <Form.Item name="direction" label="Direction">
                <Segmented
                  options={[
                    { label: 'Increase (+)', value: 'In' },
                    { label: 'Decrease (−)', value: 'Out' },
                  ]}
                />
              </Form.Item>
            ) : null}

            <Flex gap={16}>
              <Form.Item
                name="quantity"
                label="Quantity"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Quantity is required' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              {mode === 'Stock In' ? (
                <Form.Item
                  name="rate"
                  label="Purchase Rate (₹)"
                  style={{ flex: 1 }}
                  extra="Leave blank to use the product's purchase price"
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              ) : null}
            </Flex>

            {mode === 'Stock In' ? (
              <Form.Item name="reference" label="Reference" extra="Supplier invoice or challan number">
                <Input placeholder="e.g. BIL-BOS-11284" />
              </Form.Item>
            ) : null}
          </>
        )}

        <Form.Item
          name="reason"
          label="Reason"
          rules={
            isOutward || mode === 'Adjustment'
              ? [{ required: true, message: 'A reason is required for this entry' }]
              : []
          }
        >
          <Input.TextArea rows={2} placeholder="Why is this entry being made?" />
        </Form.Item>

        {product && mode === 'Stock In' ? (
          <div style={{ fontSize: 12, color: palette.neutral[500] }}>
            Stock value will increase by approximately{' '}
            <MoneyText
              value={(form.getFieldValue('quantity') ?? 0) * product.purchasePrice}
            />
            .
          </div>
        ) : null}
      </Form>
    </Drawer>
  )
}
