import { useState } from 'react'
import { Alert, App, Button, Empty, Flex, Space, Table, Tag } from 'antd'
import { FileDoneOutlined, PrinterOutlined, WalletOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { DateTimeText, FieldGrid, MoneyText, SectionCard, StatusChip, palette } from '@garage/ui'
import {
  amountPaid,
  balanceDue,
  canInvoice,
  invoiceTotals,
  paymentStatus,
  paymentStatusMap,
  resolveStatus,
  type JobCard,
  type Payment,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { ItemGrid } from '../components/ItemGrid'
import { PaymentDrawer } from '../components/PaymentDrawer'

/**
 * Invoice & Payment tab.
 *
 * This is the handoff point to Finance: the job card is the SOURCE document,
 * the invoice and receipts are financial records that reference it.
 * Ref: 04_ALL_MODULES.md §52
 */
export function InvoiceTab({ jobCard }: { jobCard: JobCard }) {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)
  const [payOpen, setPayOpen] = useState(false)

  const totals = invoiceTotals(jobCard)
  const paid = amountPaid(jobCard)
  const balance = balanceDue(jobCard)
  const guard = canInvoice(jobCard)
  const payStatus = resolveStatus(paymentStatus(jobCard), paymentStatusMap)

  const generate = () => {
    if (!guard.ok) return message.warning(guard.reason)
    const invoiceNo = store.generateInvoice(jobCard.id, user?.name ?? 'System')
    message.success(`Invoice ${invoiceNo} generated`)
  }

  if (!jobCard.invoiceNo) {
    /** What the user must do before an invoice is possible, and where to do it. */
    const nextStep = ((): { text: string; tab?: string; label?: string } | null => {
      if (guard.ok) return null
      switch (jobCard.status) {
        case 'Draft':
        case 'Checked-In':
        case 'Estimate Preparation':
          return {
            text: 'Build the estimate and send it for customer approval first.',
            tab: 'estimate',
            label: 'Go to Estimate',
          }
        case 'Approval Pending':
          return {
            text: 'Waiting for the customer to approve the estimate.',
            tab: 'estimate',
            label: 'Go to Estimate',
          }
        case 'Approved':
        case 'Repair In Progress':
          return {
            text: 'Complete the repair before invoicing.',
            tab: 'items',
            label: 'Go to Items',
          }
        case 'Cancelled':
          return { text: 'This job card was cancelled.' }
        default:
          return { text: guard.reason ?? '' }
      }
    })()

    return (
      <SectionCard title="Invoice">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No invoice generated yet</div>
              <div style={{ color: palette.neutral[500], fontSize: 13 }}>
                {guard.ok
                  ? `${totals.itemCount} item(s) totalling ${(totals.total / 100).toLocaleString('en-IN')}.`
                  : nextStep?.text}
              </div>
              {!guard.ok && totals.itemCount > 0 ? (
                <div style={{ color: palette.neutral[400], fontSize: 12, marginTop: 4 }}>
                  Current total {(totals.total / 100).toLocaleString('en-IN')} across{' '}
                  {totals.itemCount} item(s)
                </div>
              ) : null}
            </div>
          }
        >
          {guard.ok ? (
            <Button type="primary" icon={<FileDoneOutlined />} onClick={generate}>
              Generate Invoice
            </Button>
          ) : nextStep?.tab ? (
            <Button
              type="primary"
              onClick={() => navigate(`/workshop/job-cards/${jobCard.id}/${nextStep.tab}`)}
            >
              {nextStep.label}
            </Button>
          ) : null}
        </Empty>
      </SectionCard>
    )
  }

  const paymentColumns = [
    { title: 'Receipt', dataIndex: 'receiptNo', width: 170, render: (v: string) => <span className="erp-mono">{v}</span> },
    { title: 'Date', dataIndex: 'receivedAt', width: 190, render: (v: string) => <DateTimeText value={v} /> },
    { title: 'Mode', dataIndex: 'mode', width: 130, render: (v: string) => <Tag style={{ marginInlineEnd: 0 }}>{v}</Tag> },
    { title: 'Reference', dataIndex: 'reference', render: (v?: string) => v ?? '—' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 140,
      align: 'right' as const,
      className: 'erp-cell-numeric',
      render: (v: number) => <MoneyText value={v} strong />,
    },
  ]

  return (
    <>
      {balance > 0 ? (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message={
            <Flex justify="space-between" align="center" wrap gap={12}>
              <span>
                Balance due <MoneyText value={balance} strong /> — delivery is blocked until this is
                cleared.
              </span>
              <Button type="primary" icon={<WalletOutlined />} onClick={() => setPayOpen(true)}>
                Receive Payment
              </Button>
            </Flex>
          }
        />
      ) : (
        <Alert
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
          message="Invoice fully paid — vehicle can be delivered."
        />
      )}

      <SectionCard
        title="Tax Invoice"
        extra={
          <Space>
            <Button
              size="small"
              icon={<PrinterOutlined />}
              onClick={() => navigate(`/print/invoice/${jobCard.id}`)}
            >
              Print Invoice
            </Button>
            {balance > 0 ? (
              <Button size="small" type="primary" onClick={() => setPayOpen(true)}>
                Receive Payment
              </Button>
            ) : null}
          </Space>
        }
      >
        <FieldGrid
          columns={4}
          rows={[
            { label: 'Invoice Number', value: <span className="erp-mono">{jobCard.invoiceNo}</span> },
            { label: 'Invoice Date', value: <DateTimeText value={jobCard.invoicedAt} /> },
            { label: 'Payment Status', value: <StatusChip label={payStatus.label} tone={payStatus.tone} /> },
            { label: 'Balance Due', value: <MoneyText value={balance} strong colored /> },
          ]}
        />
      </SectionCard>

      <SectionCard title="Invoice Lines" padding={0}>
        <div style={{ padding: 12 }}>
          <ItemGrid jobCard={jobCard} />
        </div>
      </SectionCard>

      <SectionCard title="Payments Received" padding={0}>
        <Table<Payment>
          columns={paymentColumns}
          dataSource={jobCard.payments}
          rowKey="id"
          size="middle"
          pagination={false}
          locale={{
            emptyText: (
              <div style={{ padding: 24, color: palette.neutral[400] }}>No payments recorded yet</div>
            ),
          }}
          summary={
            jobCard.payments.length
              ? () => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4}>
                      <strong>Total Received</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align="right">
                      <MoneyText value={paid} strong />
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )
              : undefined
          }
        />
      </SectionCard>

      <PaymentDrawer open={payOpen} jobCard={jobCard} onClose={() => setPayOpen(false)} />
    </>
  )
}
