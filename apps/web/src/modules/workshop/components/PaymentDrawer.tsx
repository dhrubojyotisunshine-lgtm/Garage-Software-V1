import { useState } from 'react'
import { App, Button, Drawer, Flex, Form, Input, InputNumber, Radio, Space } from 'antd'
import { MoneyText, TotalsPanel, layout, palette } from '@garage/ui'
import { balanceDue, invoiceTotals, amountPaid, toPaise, type JobCard, type PaymentMode } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Receive Payment — a contextual action on the job card, so it is a drawer.
 *
 * The payment itself belongs to Finance; the job card is the source document.
 * Ref: 04_ALL_MODULES.md §52, 03_PAGE_TEMPLATES.md §10
 */

const MODES: PaymentMode[] = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']

export function PaymentDrawer({
  open,
  jobCard,
  onClose,
}: {
  open: boolean
  jobCard: JobCard
  onClose: () => void
}) {
  const { message } = App.useApp()
  const recordPayment = useWorkshopStore((s) => s.recordPayment)
  const user = useAppStore((s) => s.user)
  const [form] = Form.useForm()

  const totals = invoiceTotals(jobCard)
  const paid = amountPaid(jobCard)
  const balance = balanceDue(jobCard)

  const [mode, setMode] = useState<PaymentMode>('Cash')

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values) return

    const amountPaise = toPaise(values.amount)
    if (amountPaise <= 0) return message.error('Enter an amount greater than zero')
    if (amountPaise > balance) {
      return message.error(`Amount exceeds the balance due of ₹ ${(balance / 100).toLocaleString('en-IN')}`)
    }

    const payment = recordPayment(
      jobCard.id,
      { amount: amountPaise, mode, reference: values.reference },
      user?.name ?? 'System',
    )
    message.success(`Receipt ${payment.receiptNo} recorded`)
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Receive Payment"
      width={layout.drawerSm}
      destroyOnClose
      footer={
        <Flex justify="flex-end">
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={submit} disabled={balance <= 0}>
              Record Payment
            </Button>
          </Space>
        </Flex>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <TotalsPanel
          width="100%"
          lines={[
            { label: 'Invoice Total', value: totals.total },
            { label: 'Already Received', value: paid },
            { label: 'Balance Due', value: balance, emphasis: true, negative: balance > 0 },
          ]}
        />
      </div>

      {balance <= 0 ? (
        <div
          style={{
            padding: 12,
            background: palette.success[50],
            border: `1px solid ${palette.success[100]}`,
            borderRadius: 6,
            color: palette.success[700],
            fontSize: 13,
          }}
        >
          This invoice is fully paid.
        </div>
      ) : (
        <Form form={form} layout="vertical" initialValues={{ amount: balance / 100 }}>
          <Form.Item
            name="amount"
            label="Amount Received (₹)"
            rules={[{ required: true, message: 'Amount is required' }]}
          >
            <InputNumber
              min={0}
              max={balance / 100}
              style={{ width: '100%', fontSize: 18 }}
              size="large"
              formatter={(v) => (v === undefined || v === null ? '' : Number(v).toLocaleString('en-IN'))}
              parser={((v?: string) => Number((v ?? '').replace(/[^\d.]/g, ''))) as never}
            />
          </Form.Item>

          <Flex gap={8} style={{ marginBottom: 16 }}>
            <Button size="small" onClick={() => form.setFieldsValue({ amount: balance / 100 })}>
              Full — <MoneyText value={balance} />
            </Button>
            <Button size="small" onClick={() => form.setFieldsValue({ amount: Math.round(balance / 2) / 100 })}>
              Half
            </Button>
          </Flex>

          <Form.Item label="Payment Mode" required>
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              optionType="button"
              options={MODES.map((m) => ({ label: m, value: m }))}
            />
          </Form.Item>

          {mode !== 'Cash' ? (
            <Form.Item
              name="reference"
              label={
                mode === 'Cheque' ? 'Cheque Number' : mode === 'UPI' ? 'UPI Reference' : 'Transaction Reference'
              }
              rules={[{ required: true, message: 'Reference is required for this mode' }]}
            >
              <Input placeholder="Reference number" />
            </Form.Item>
          ) : null}
        </Form>
      )}
    </Drawer>
  )
}
