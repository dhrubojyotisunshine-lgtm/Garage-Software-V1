import { useMemo, useState } from 'react'
import {
  App,
  Alert,
  Button,
  Col,
  DatePicker,
  Descriptions,
  Flex,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd'
import { DeleteOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import {
  MoneyText,
  NotFoundState,
  PageHeader,
  SectionCard,
  TotalsPanel,
  palette,
} from '@garage/ui'
import {
  canConvertQuotation,
  formatDate,
  formatMoney,
  isQuotationExpired,
  lineTotals,
  percentOf,
  toPaise,
  toRupees,
  type DiscountType,
  type JobCardItem,
  type JobCardItemType,
  type QuotationStatus,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { SERVICE_TYPES } from '@/store/seed'

/**
 * Quotation detail.
 *
 * Build the lines, send it, record the answer, convert it. Every status change
 * goes through the store's machine, so an illegal move is refused with a reason
 * rather than silently applied.
 */

const STATUS_COLOUR: Record<QuotationStatus, string> = {
  Draft: 'default',
  Sent: 'processing',
  Accepted: 'success',
  Rejected: 'error',
  Expired: 'warning',
  Converted: 'purple',
}

const ITEM_TYPES: JobCardItemType[] = ['Labour', 'Spare', 'Lubricant', 'Outsource']

export default function QuotationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message, modal } = App.useApp()
  const store = useWorkshopStore()
  const { user } = useAppStore()
  const actor = user?.name ?? 'System'

  const quotation = store.quotationById(id)

  const [draft, setDraft] = useState<{
    type: JobCardItemType
    productId?: string
    name?: string
    qty: number
    rate?: number
    discount: number
    discountType: DiscountType
  }>({ type: 'Labour', qty: 1, discount: 0, discountType: 'amount' })

  const [convertOpen, setConvertOpen] = useState(false)
  const [convert, setConvert] = useState<{
    odometer?: number
    serviceType: string
    advisorId?: string
    expectedDelivery: dayjs.Dayjs
  }>({
    serviceType: 'Periodic Service',
    expectedDelivery: dayjs().add(1, 'day').hour(17).minute(30),
  })

  const totals = useMemo(() => {
    if (!quotation) return { subtotal: 0, discount: 0, net: 0, tax: 0 }
    const subtotal = quotation.items.reduce((s, i) => s + lineTotals(i).total, 0)
    const discount =
      quotation.discountType === 'percent'
        ? percentOf(subtotal, quotation.discount)
        : Math.min(subtotal, quotation.discount)
    const tax = quotation.items.reduce((s, i) => s + lineTotals(i).tax, 0)
    return { subtotal, discount, net: subtotal - discount, tax }
  }, [quotation])

  if (!quotation) return <NotFoundState what="quotation" />

  const customer = store.customerById(quotation.customerId)
  const vehicle = store.vehicleById(quotation.vehicleId)
  const expired = isQuotationExpired(quotation)
  const editable = quotation.status === 'Draft'
  const guard = canConvertQuotation(quotation)

  const move = (to: QuotationStatus, reason?: string) => {
    const result = store.transitionQuotation(quotation.id, to, actor, { reason })
    if (!result.ok) return message.error(result.error)
    message.success(`Quotation ${to.toLowerCase()}`)
  }

  const addItem = () => {
    const isProduct = draft.type === 'Spare' || draft.type === 'Lubricant'
    if (isProduct) {
      const p = store.productById(draft.productId)
      if (!p) return message.warning('Select a product')
      store.addQuotationItem(quotation.id, {
        type: draft.type,
        productId: p.id,
        name: p.name,
        code: p.sku,
        partNumber: p.partNumber,
        quantity: draft.qty,
        unit: p.unit,
        rate: draft.rate !== undefined ? toPaise(draft.rate) : p.sellingPrice,
        discountPercent: draft.discount,
        discountType: draft.discountType,
        taxRate: p.taxRate,
        source: 'Estimate',
      })
    } else {
      if (!draft.name?.trim()) return message.warning('Enter a description')
      store.addQuotationItem(quotation.id, {
        type: draft.type,
        name: draft.name.trim(),
        quantity: draft.qty,
        unit: draft.type === 'Labour' ? 'Hr' : 'Job',
        rate: toPaise(draft.rate ?? 0),
        discountPercent: draft.discount,
        discountType: draft.discountType,
        taxRate: 18,
        source: 'Estimate',
      })
    }
    setDraft({ type: draft.type, qty: 1, discount: 0, discountType: 'amount' })
  }

  const doConvert = () => {
    if (convert.odometer === undefined) return message.error('Odometer reading is required')
    if (!convert.advisorId) return message.error('Select a service advisor')

    const result = store.convertQuotation(
      quotation.id,
      {
        odometer: convert.odometer,
        fuelLevel: '1/2',
        advisorId: convert.advisorId,
        expectedDelivery: convert.expectedDelivery.toISOString(),
        serviceType: convert.serviceType,
      },
      actor,
    )
    if (!result.ok) return message.error(result.error)
    setConvertOpen(false)
    message.success('Job card created from this quotation')
    navigate(`/workshop/job-cards/${result.jobCardId}/overview`)
  }

  const isProductLine = draft.type === 'Spare' || draft.type === 'Lubricant'

  return (
    <div>
      <PageHeader
        title={quotation.quotationNo}
        description={quotation.subject}
        context={
          <Space size={8}>
            <Tag color={STATUS_COLOUR[quotation.status]}>{quotation.status}</Tag>
            {customer ? <span>{customer.name}</span> : null}
            {vehicle ? <span className="erp-mono">{vehicle.registration}</span> : null}
          </Space>
        }
        primaryAction={
          quotation.status === 'Draft'
            ? { key: 'send', label: 'Send to Customer', onClick: () => move('Sent') }
            : quotation.status === 'Sent'
              ? { key: 'accept', label: 'Mark Accepted', onClick: () => move('Accepted') }
              : quotation.status === 'Accepted'
                ? {
                    key: 'convert',
                    label: 'Convert to Job Card',
                    icon: <SwapOutlined />,
                    onClick: () => setConvertOpen(true),
                  }
                : undefined
        }
        secondaryAction={{
          key: 'back',
          label: 'Back to list',
          onClick: () => navigate('/quotation'),
        }}
        moreActions={[
          ...(quotation.status === 'Sent'
            ? [
                {
                  key: 'reject',
                  label: 'Mark Rejected',
                  danger: true,
                  onClick: () =>
                    modal.confirm({
                      title: 'Reject this quotation?',
                      content: 'A rejected quotation cannot be reopened.',
                      okText: 'Reject',
                      okButtonProps: { danger: true },
                      onOk: () => move('Rejected'),
                    }),
                },
              ]
            : []),
          ...(quotation.convertedJobCardId
            ? [
                {
                  key: 'openJc',
                  label: 'Open the job card',
                  onClick: () =>
                    navigate(`/workshop/job-cards/${quotation.convertedJobCardId}/overview`),
                },
              ]
            : []),
        ]}
      />

      {expired && quotation.status !== 'Converted' ? (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message={`This quotation passed its validity date on ${formatDate(quotation.validUntil)}.`}
          description="The quoted price is no longer live. Re-date it before sending, or raise a new quotation."
        />
      ) : null}

      {quotation.status === 'Converted' ? (
        <Alert
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
          message="Converted to a job card"
          description="This quotation is now a historical document and can no longer be edited."
          action={
            <Button
              size="small"
              onClick={() =>
                navigate(`/workshop/job-cards/${quotation.convertedJobCardId}/overview`)
              }
            >
              Open job card
            </Button>
          }
        />
      ) : null}

      <Row gutter={16}>
        <Col xs={24} xl={16}>
          <SectionCard title="Lines" padding={12}>
            {editable ? (
              <Flex gap={8} wrap align="flex-end" style={{ marginBottom: 12 }}>
                <div style={{ width: 130 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Type</div>
                  <Select
                    style={{ width: '100%' }}
                    value={draft.type}
                    onChange={(v) => setDraft({ type: v, qty: 1, discount: 0, discountType: 'amount' })}
                    options={ITEM_TYPES.map((t) => ({ label: t, value: t }))}
                  />
                </div>

                {isProductLine ? (
                  <div style={{ flex: '2 1 240px' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Product</div>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search product"
                      value={draft.productId}
                      optionFilterProp="label"
                      onChange={(v) => {
                        const p = store.productById(v)
                        setDraft((d) => ({
                          ...d,
                          productId: v,
                          rate: p ? toRupees(p.sellingPrice) : undefined,
                        }))
                      }}
                      options={store.products
                        .filter((p) => p.status === 'Active')
                        .filter((p) =>
                          draft.type === 'Lubricant'
                            ? p.type === 'Lubricant'
                            : p.type !== 'Lubricant',
                        )
                        .map((p) => ({ value: p.id, label: `${p.name} · ${p.sku}` }))}
                    />
                  </div>
                ) : (
                  <div style={{ flex: '2 1 240px' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Description</div>
                    <Input
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    />
                  </div>
                )}

                <div style={{ width: 80 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Qty</div>
                  <InputNumber
                    min={0.25}
                    style={{ width: '100%' }}
                    value={draft.qty}
                    onChange={(v) => setDraft((d) => ({ ...d, qty: Number(v ?? 1) }))}
                  />
                </div>
                <div style={{ width: 120 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Rate (₹)</div>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={draft.rate}
                    onChange={(v) => setDraft((d) => ({ ...d, rate: Number(v ?? 0) }))}
                  />
                </div>
                <div style={{ width: 130 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Discount</div>
                  <Space.Compact>
                    <InputNumber
                      min={0}
                      style={{ width: 74 }}
                      value={draft.discount}
                      onChange={(v) => setDraft((d) => ({ ...d, discount: Number(v ?? 0) }))}
                    />
                    <Select
                      style={{ width: 56 }}
                      value={draft.discountType}
                      onChange={(v) => setDraft((d) => ({ ...d, discountType: v }))}
                      options={[
                        { label: '₹', value: 'amount' },
                        { label: '%', value: 'percent' },
                      ]}
                    />
                  </Space.Compact>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
                  Add
                </Button>
              </Flex>
            ) : (
              <Alert
                type="info"
                showIcon
                style={{ marginBottom: 12 }}
                message={`Lines are locked once a quotation is ${quotation.status.toLowerCase()}. A sent price must not change under the customer.`}
              />
            )}

            <Table<JobCardItem>
              size="small"
              rowKey="id"
              pagination={false}
              dataSource={quotation.items}
              locale={{ emptyText: 'No lines yet — add labour or parts above' }}
              columns={[
                { title: 'Type', dataIndex: 'type', width: 100 },
                {
                  title: 'Description',
                  dataIndex: 'name',
                  render: (v: string, row) => (
                    <div>
                      <div>{v}</div>
                      {row.code ? (
                        <span
                          className="erp-mono"
                          style={{ fontSize: 11, color: palette.neutral[500] }}
                        >
                          {row.code}
                        </span>
                      ) : null}
                    </div>
                  ),
                },
                { title: 'Qty', dataIndex: 'quantity', width: 70, align: 'right' },
                {
                  title: 'Rate',
                  dataIndex: 'rate',
                  width: 110,
                  align: 'right',
                  render: (v: number) => formatMoney(v),
                },
                {
                  title: 'Amount',
                  width: 120,
                  align: 'right',
                  render: (_v, row) => <MoneyText value={lineTotals(row).total} strong />,
                },
                ...(editable
                  ? [
                      {
                        title: '',
                        width: 44,
                        render: (_v: unknown, row: JobCardItem) => (
                          <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => store.removeQuotationItem(quotation.id, row.id)}
                          />
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          </SectionCard>

          <SectionCard title="Notes & Terms">
            <div style={{ fontSize: 12, marginBottom: 4 }}>Notes</div>
            <Input.TextArea
              rows={2}
              value={quotation.notes}
              disabled={!editable}
              onChange={(e) => store.updateQuotation(quotation.id, { notes: e.target.value })}
            />
            <div style={{ fontSize: 12, margin: '12px 0 4px' }}>Terms</div>
            <Input.TextArea
              rows={3}
              value={quotation.terms}
              disabled={!editable}
              onChange={(e) => store.updateQuotation(quotation.id, { terms: e.target.value })}
            />
          </SectionCard>
        </Col>

        <Col xs={24} xl={8}>
          <SectionCard title="Details">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Customer">{customer?.name ?? '—'}</Descriptions.Item>
              <Descriptions.Item label="Mobile">{customer?.mobile ?? '—'}</Descriptions.Item>
              <Descriptions.Item label="Vehicle">
                {vehicle ? `${vehicle.registration} · ${vehicle.manufacturer} ${vehicle.model}` : '—'}
              </Descriptions.Item>
              <Descriptions.Item label="Valid until">
                {formatDate(quotation.validUntil)}
              </Descriptions.Item>
              <Descriptions.Item label="Created">
                {formatDate(quotation.createdAt)} by {quotation.createdBy}
              </Descriptions.Item>
              {quotation.rejectionReason ? (
                <Descriptions.Item label="Rejected because">
                  {quotation.rejectionReason}
                </Descriptions.Item>
              ) : null}
            </Descriptions>

            {editable ? (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Valid until</div>
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD MMM YYYY"
                  value={dayjs(quotation.validUntil)}
                  onChange={(d) =>
                    d && store.updateQuotation(quotation.id, { validUntil: d.toISOString() })
                  }
                />
              </div>
            ) : null}
          </SectionCard>

          <SectionCard title="Totals">
            <TotalsPanel
              width="100%"
              lines={[
                { label: 'Subtotal', value: totals.subtotal },
                ...(totals.discount > 0
                  ? [{ label: 'Discount', value: totals.discount, negative: true }]
                  : []),
                { label: 'Tax included', value: totals.tax, hint: 'GST, already within the line amounts' },
                { label: 'Quoted Total', value: totals.net, emphasis: true },
              ]}
            />

            {editable ? (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Document discount</div>
                <Space.Compact style={{ width: '100%' }}>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={
                      quotation.discountType === 'percent'
                        ? quotation.discount
                        : toRupees(quotation.discount)
                    }
                    onChange={(v) =>
                      store.updateQuotation(quotation.id, {
                        discount:
                          quotation.discountType === 'percent'
                            ? Number(v ?? 0)
                            : toPaise(Number(v ?? 0)),
                      })
                    }
                  />
                  <Select
                    style={{ width: 70 }}
                    value={quotation.discountType}
                    onChange={(v) =>
                      store.updateQuotation(quotation.id, { discountType: v, discount: 0 })
                    }
                    options={[
                      { label: '₹', value: 'amount' },
                      { label: '%', value: 'percent' },
                    ]}
                  />
                </Space.Compact>
              </div>
            ) : null}

            {!guard.ok && quotation.status !== 'Converted' ? (
              <div style={{ marginTop: 12, fontSize: 12, color: palette.neutral[500] }}>
                <Tooltip title={guard.reason}>Cannot convert yet — {guard.reason}</Tooltip>
              </div>
            ) : null}
          </SectionCard>
        </Col>
      </Row>

      <Modal
        title="Convert to Job Card"
        open={convertOpen}
        onCancel={() => setConvertOpen(false)}
        onOk={doConvert}
        okText="Create Job Card"
      >
        <p style={{ fontSize: 13, color: palette.neutral[500] }}>
          Every quoted line is copied to the new job card. This quotation becomes a historical
          document and can no longer be edited.
        </p>

        {!quotation.vehicleId ? (
          <Alert
            type="error"
            showIcon
            message="This quotation has no vehicle"
            description="A job card must have a vehicle. Add one to the quotation first."
          />
        ) : (
          <>
            <div style={{ fontSize: 12, margin: '10px 0 4px' }}>Odometer (km)</div>
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              value={convert.odometer}
              onChange={(v) =>
                setConvert((c) => ({ ...c, odometer: v === null ? undefined : Number(v) }))
              }
            />

            <div style={{ fontSize: 12, margin: '10px 0 4px' }}>Service type</div>
            <Select
              style={{ width: '100%' }}
              value={convert.serviceType}
              onChange={(v) => setConvert((c) => ({ ...c, serviceType: v }))}
              options={SERVICE_TYPES.map((v) => ({ label: v, value: v }))}
            />

            <div style={{ fontSize: 12, margin: '10px 0 4px' }}>Service advisor</div>
            <Select
              style={{ width: '100%' }}
              value={convert.advisorId}
              onChange={(v) => setConvert((c) => ({ ...c, advisorId: v }))}
              options={store.advisors().map((a) => ({ label: a.name, value: a.id }))}
            />

            <div style={{ fontSize: 12, margin: '10px 0 4px' }}>Expected delivery</div>
            <DatePicker
              showTime
              style={{ width: '100%' }}
              format="DD MMM YYYY, hh:mm A"
              value={convert.expectedDelivery}
              onChange={(d) => d && setConvert((c) => ({ ...c, expectedDelivery: d }))}
            />
          </>
        )}
      </Modal>
    </div>
  )
}
