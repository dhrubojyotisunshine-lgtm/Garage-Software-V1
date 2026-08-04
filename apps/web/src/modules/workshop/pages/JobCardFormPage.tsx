import { useMemo, useState } from 'react'
import {
  App,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
} from 'antd'
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
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
  availableStock,
  formatDateTime,
  formatMoney,
  percentOf,
  toPaise,
  toRupees,
  type DiscountType,
  type ExtendedJobCard,
  type JobCardItem,
  type JobCardItemType,
  type PaymentMode,
  type TransactionKind,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { SERVICE_TYPES } from '@/store/seed'

/**
 * Job Card Form — the full capture screen.
 *
 * Field set and behaviour follow the Sunshine Garage jobcard form: customer and
 * vehicle detail, driver, check-in condition, customer voice, four item
 * categories, document discount, transactions, reminders and work notes.
 *
 * Built in our design system, and money stays in integer paise rather than
 * floating rupees.
 */

const ITEM_TABS: JobCardItemType[] = ['Labour', 'Spare', 'Lubricant', 'Outsource']

const ACCESSORIES = [
  'Stereo', 'Speakers', 'Spare Wheel', 'Jack', 'Tool Kit', 'Wheel Spanner',
  'Floor Mats', 'Mud Flaps', 'Seat Covers', 'First Aid Kit', 'Fire Extinguisher',
  'Documents', 'Fuel Cap', 'Wheel Caps',
]

const CUSTOMER_VOICE = [
  'Engine noise', 'Brake noise', 'AC not cooling', 'Vibration at speed',
  'Poor mileage', 'Starting trouble', 'Oil leak', 'Suspension noise',
  'Clutch slipping', 'Electrical fault', 'Body damage', 'Periodic service due',
]

const FUEL_LEVELS = ['E', '1/4', '1/2', '3/4', 'F']
const PAYMENT_MODES: PaymentMode[] = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']
const TXN_KINDS: TransactionKind[] = ['Advance', 'Payment', 'Refund']

/** Line total after its own discount. Percent or flat, as Sunshine allows. */
function lineAmount(item: JobCardItem): number {
  const gross = Math.round(item.quantity * item.rate)
  const discount =
    item.discountType === 'amount'
      ? Math.min(gross, item.discountPercent)
      : percentOf(gross, item.discountPercent)
  return gross - discount
}

export default function JobCardFormPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const { user } = useAppStore()
  const [form] = Form.useForm()

  const actor = user?.name ?? 'System'
  const jobCard = store.jobCardById(params.id) as ExtendedJobCard | undefined

  const [activeItemTab, setActiveItemTab] = useState<JobCardItemType>('Labour')
  const [itemDraft, setItemDraft] = useState<{
    productId?: string
    name?: string
    qty: number
    rate?: number
    discount: number
    discountType: DiscountType
    mechanicId?: string
    vendorName?: string
  }>({ qty: 1, discount: 0, discountType: 'amount' })
  const [noteDraft, setNoteDraft] = useState('')
  const [txnDraft, setTxnDraft] = useState<{
    kind: TransactionKind
    amount?: number
    mode: PaymentMode
    details?: string
  }>({ kind: 'Payment', mode: 'Cash' })
  const [docDiscount, setDocDiscount] = useState<number>(
    jobCard?.discount ? toRupees(jobCard.discount) : 0,
  )
  const [docDiscountType, setDocDiscountType] = useState<DiscountType>(
    jobCard?.discountType ?? 'amount',
  )

  const customer = store.customerById(jobCard?.customerId)
  const vehicle = store.vehicleById(jobCard?.vehicleId)
  const mechanics = store.technicians()
  const supervisors = store.employees.filter((e) => e.role === 'Supervisor')

  /* --------------------------------------------------------------- totals */
  const totals = useMemo(() => {
    const items = jobCard?.items ?? []
    const byType: Record<string, number> = {
      Labour: 0,
      Spare: 0,
      Lubricant: 0,
      Outsource: 0,
    }
    for (const item of items) byType[item.type] = (byType[item.type] ?? 0) + lineAmount(item)
    const subtotal = Object.values(byType).reduce((a, b) => a + b, 0)
    const discountPaise =
      docDiscountType === 'percent'
        ? percentOf(subtotal, docDiscount)
        : Math.min(subtotal, toPaise(docDiscount || 0))
    return { byType, subtotal, discount: discountPaise, bill: subtotal - discountPaise }
  }, [jobCard?.items, docDiscount, docDiscountType])

  const paid = useMemo(
    () => (jobCard?.transactions ?? []).reduce((a, t) => a + (t.kind === 'Refund' ? -t.amount : t.amount), 0),
    [jobCard?.transactions],
  )

  if (!jobCard) return <NotFoundState what="job card" />

  /* ---------------------------------------------------------------- items */
  const tabItems = jobCard.items.filter((i) => i.type === activeItemTab)
  const isProductTab = activeItemTab === 'Spare' || activeItemTab === 'Lubricant'

  const productOptions = store.products
    .filter((p) => p.status === 'Active')
    .filter((p) => (activeItemTab === 'Lubricant' ? p.type === 'Lubricant' : p.type !== 'Lubricant'))
    .map((p) => ({
      value: p.id,
      label: `${p.name} · ${p.sku}`,
      available: availableStock(p),
    }))

  const addItem = () => {
    const draft = itemDraft
    if (isProductTab) {
      const product = store.productById(draft.productId)
      if (!product) return message.warning('Select a product')
      if (draft.qty > availableStock(product)) {
        return message.error(`Only ${availableStock(product)} ${product.unit} available`)
      }
      store.addItem(
        jobCard.id,
        {
          type: activeItemTab,
          productId: product.id,
          name: product.name,
          code: product.sku,
          partNumber: product.partNumber,
          quantity: draft.qty,
          unit: product.unit,
          rate: draft.rate !== undefined ? toPaise(draft.rate) : product.sellingPrice,
          discountPercent: draft.discount,
          discountType: draft.discountType,
          taxRate: product.taxRate,
          source: 'Estimate',
          mechanicId: draft.mechanicId,
          mechanicName: store.employeeById(draft.mechanicId)?.name,
        },
        actor,
      )
    } else {
      if (!draft.name?.trim()) return message.warning('Enter a description')
      store.addItem(
        jobCard.id,
        {
          type: activeItemTab,
          name: draft.name.trim(),
          quantity: draft.qty,
          unit: activeItemTab === 'Labour' ? 'Hr' : 'Job',
          rate: toPaise(draft.rate ?? 0),
          discountPercent: draft.discount,
          discountType: draft.discountType,
          taxRate: 18,
          source: 'Estimate',
          mechanicId: draft.mechanicId,
          mechanicName: store.employeeById(draft.mechanicId)?.name,
          vendorName: activeItemTab === 'Outsource' ? draft.vendorName : undefined,
        },
        actor,
      )
    }
    setItemDraft({ qty: 1, discount: 0, discountType: 'amount' })
    message.success(`${activeItemTab} line added`)
  }

  /* ----------------------------------------------------------------- save */
  const save = async () => {
    const v = await form.validateFields().catch(() => null)
    if (!v) return

    store.patchJobCard(
      jobCard.id,
      {
        serviceType: v.serviceType,
        priority: v.priority,
        odometer: v.odometer,
        fuelLevel: v.fuelLevel,
        advisorId: v.advisorId,
        technicianId: v.technicianId,
        supervisorId: v.supervisorId,
        jobCardType: v.jobCardType,
        driverName: v.driverName,
        driverMobile: v.driverMobile,
        pickupAddress: v.pickupAddress,
        deliveryAddress: v.deliveryAddress,
        customerVoice: v.customerVoice,
        complaints: v.customerVoice ?? jobCard.complaints,
        checkIn: {
          accessories: v.accessories ?? [],
          dentMarks: v.dentMarks,
          photos: jobCard.checkIn?.photos ?? [],
        },
        expectedDelivery: v.deliveryDate?.toISOString?.() ?? jobCard.expectedDelivery,
        deliveryTime: v.deliveryTime ? dayjs(v.deliveryTime).format('hh:mm A') : undefined,
        costEstimate: v.costEstimate !== undefined ? toPaise(v.costEstimate) : undefined,
        discount: toPaise(docDiscount || 0),
        discountType: docDiscountType,
        reminder: {
          km: v.reminderKm,
          period: v.reminderPeriod,
          priority: v.reminderPriority,
        },
        exitNote: v.exitNote,
        smsAlert: v.smsAlert,
      },
      actor,
    )
    message.success('Job card saved')
    navigate(`/workshop/job-cards/${jobCard.id}/overview`)
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader
        title={`Job Card ${jobCard.jobCardNo}`}
        description="Full capture form — customer, vehicle, items, payments and delivery"
        context={
          <Space size={8}>
            <Tag color="blue">{jobCard.status}</Tag>
            {customer ? <span>{customer.name}</span> : null}
            {vehicle ? <span className="erp-mono">{vehicle.registration}</span> : null}
          </Space>
        }
        primaryAction={{ key: 'save', label: 'Save', icon: <SaveOutlined />, onClick: save }}
        secondaryAction={{
          key: 'cancel',
          label: 'Back',
          onClick: () => navigate(`/workshop/job-cards/${jobCard.id}/overview`),
        }}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          jobCardType: jobCard.jobCardType ?? 'General Service',
          serviceType: jobCard.serviceType,
          priority: jobCard.priority,
          odometer: jobCard.odometer,
          fuelLevel: jobCard.fuelLevel,
          advisorId: jobCard.advisorId,
          technicianId: jobCard.technicianId,
          supervisorId: jobCard.supervisorId,
          driverName: jobCard.driverName,
          driverMobile: jobCard.driverMobile,
          pickupAddress: jobCard.pickupAddress,
          deliveryAddress: jobCard.deliveryAddress,
          customerVoice: jobCard.customerVoice ?? jobCard.complaints,
          accessories: jobCard.checkIn?.accessories ?? [],
          dentMarks: jobCard.checkIn?.dentMarks,
          deliveryDate: dayjs(jobCard.expectedDelivery),
          deliveryTime: jobCard.deliveryTime ? dayjs(jobCard.deliveryTime, 'hh:mm A') : undefined,
          costEstimate: jobCard.costEstimate ? toRupees(jobCard.costEstimate) : undefined,
          reminderKm: jobCard.reminder?.km,
          reminderPeriod: jobCard.reminder?.period,
          reminderPriority: jobCard.reminder?.priority ?? 'Normal',
          exitNote: jobCard.exitNote,
          smsAlert: jobCard.smsAlert ?? false,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} xl={16}>
            {/* ------------------------------------------- customer & vehicle */}
            <SectionCard title="Customer & Vehicle">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="Customer">
                    <Input value={customer?.name} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Mobile">
                    <Input value={customer?.mobile} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Email">
                    <Input value={customer?.email} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Vehicle Number">
                    <Input value={vehicle?.registration} disabled className="erp-mono" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Make & Model">
                    <Input value={`${vehicle?.manufacturer ?? ''} ${vehicle?.model ?? ''}`} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Colour">
                    <Input value={vehicle?.colour} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Chassis / VIN">
                    <Input value={vehicle?.vin} disabled className="erp-mono" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Engine Number">
                    <Input value={vehicle?.engineNumber} disabled className="erp-mono" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="jobCardType" label="Job Card Type">
                    <Select
                      options={['General Service', 'Running Repair', 'Accident', 'Free Service', 'Warranty'].map(
                        (v) => ({ label: v, value: v }),
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="pickupAddress" label="Pickup Address">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="deliveryAddress" label="Delivery Address">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            </SectionCard>

            {/* --------------------------------------------- driver & check-in */}
            <SectionCard title="Driver & Check-In">
              <Row gutter={16}>
                <Col xs={24} md={6}>
                  <Form.Item name="driverName" label="Driver Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item name="driverMobile" label="Driver Mobile">
                    <Input prefix="+91" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    name="odometer"
                    label="KM Reading"
                    rules={[{ required: true, message: 'Odometer is required' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item name="fuelLevel" label="Fuel Level">
                    <Radio.Group
                      optionType="button"
                      options={FUEL_LEVELS.map((v) => ({ label: v, value: v }))}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="accessories" label="Accessories Checked In">
                <Checkbox.Group options={ACCESSORIES} />
              </Form.Item>

              <Form.Item name="dentMarks" label="Dent Marks & Damage">
                <Input.TextArea rows={2} placeholder="Describe existing dents, scratches and damage" />
              </Form.Item>
            </SectionCard>

            {/* ------------------------------------------------ customer voice */}
            <SectionCard title="Customer Voice" description="What the customer reported">
              <Form.Item name="customerVoice">
                <Select
                  mode="tags"
                  placeholder="Select or type what the customer reported"
                  options={CUSTOMER_VOICE.map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
            </SectionCard>

            {/* --------------------------------------------------------- items */}
            <SectionCard title="Items" description="Labour, spares, lubricants and outsourced work" padding={12}>
              <Tabs
                activeKey={activeItemTab}
                onChange={(k) => {
                  setActiveItemTab(k as JobCardItemType)
                  setItemDraft({ qty: 1, discount: 0, discountType: 'amount' })
                }}
                items={ITEM_TABS.map((t) => ({
                  key: t,
                  label: (
                    <span>
                      {t}{' '}
                      <Tag style={{ marginInlineEnd: 0 }}>
                        {jobCard.items.filter((i) => i.type === t).length}
                      </Tag>
                    </span>
                  ),
                }))}
              />

              {/* Add row */}
              <Flex gap={8} wrap align="flex-end" style={{ marginBottom: 12 }}>
                {isProductTab ? (
                  <div style={{ flex: '2 1 260px' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Product</div>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search product"
                      value={itemDraft.productId}
                      onChange={(v) => {
                        const p = store.productById(v)
                        setItemDraft((d) => ({
                          ...d,
                          productId: v,
                          rate: p ? toRupees(p.sellingPrice) : undefined,
                        }))
                      }}
                      optionFilterProp="label"
                      options={productOptions}
                      optionRender={(o) => (
                        <Flex justify="space-between">
                          <span>{o.label}</span>
                          <Tag color={(o.data as { available: number }).available > 0 ? 'green' : 'red'}>
                            {(o.data as { available: number }).available}
                          </Tag>
                        </Flex>
                      )}
                    />
                  </div>
                ) : (
                  <div style={{ flex: '2 1 260px' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>
                      {activeItemTab === 'Outsource' ? 'Outsource work / description' : 'Labour description'}
                    </div>
                    <Input
                      value={itemDraft.name}
                      onChange={(e) => setItemDraft((d) => ({ ...d, name: e.target.value }))}
                    />
                  </div>
                )}

                {activeItemTab === 'Outsource' ? (
                  <div style={{ flex: '1 1 150px' }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Vendor</div>
                    <Input
                      value={itemDraft.vendorName}
                      onChange={(e) => setItemDraft((d) => ({ ...d, vendorName: e.target.value }))}
                    />
                  </div>
                ) : null}

                <div style={{ width: 90 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Qty</div>
                  <InputNumber
                    min={0.25}
                    step={activeItemTab === 'Labour' ? 0.25 : 1}
                    style={{ width: '100%' }}
                    value={itemDraft.qty}
                    onChange={(v) => setItemDraft((d) => ({ ...d, qty: Number(v ?? 1) }))}
                  />
                </div>

                <div style={{ width: 120 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Rate (₹)</div>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={itemDraft.rate}
                    onChange={(v) => setItemDraft((d) => ({ ...d, rate: Number(v ?? 0) }))}
                  />
                </div>

                <div style={{ width: 140 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Discount</div>
                  <Space.Compact>
                    <InputNumber
                      min={0}
                      style={{ width: 80 }}
                      value={itemDraft.discount}
                      onChange={(v) => setItemDraft((d) => ({ ...d, discount: Number(v ?? 0) }))}
                    />
                    <Select
                      style={{ width: 60 }}
                      value={itemDraft.discountType}
                      onChange={(v) => setItemDraft((d) => ({ ...d, discountType: v }))}
                      options={[
                        { label: '₹', value: 'amount' },
                        { label: '%', value: 'percent' },
                      ]}
                    />
                  </Space.Compact>
                </div>

                <div style={{ width: 160 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>Mechanic</div>
                  <Select
                    allowClear
                    style={{ width: '100%' }}
                    value={itemDraft.mechanicId}
                    onChange={(v) => setItemDraft((d) => ({ ...d, mechanicId: v }))}
                    options={mechanics.map((m) => ({ label: m.name, value: m.id }))}
                  />
                </div>

                <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
                  Add
                </Button>
              </Flex>

              <Table<JobCardItem>
                size="small"
                rowKey="id"
                pagination={false}
                dataSource={tabItems}
                locale={{ emptyText: `No ${activeItemTab.toLowerCase()} lines yet` }}
                columns={[
                  {
                    title: 'Description',
                    dataIndex: 'name',
                    render: (v: string, row) => (
                      <div>
                        <div>{v}</div>
                        {row.partNumber || row.vendorName ? (
                          <span style={{ fontSize: 11, color: palette.neutral[500] }}>
                            {row.partNumber ?? row.vendorName}
                          </span>
                        ) : null}
                      </div>
                    ),
                  },
                  { title: 'Mechanic', dataIndex: 'mechanicName', width: 150, render: (v?: string) => v ?? '—' },
                  { title: 'Qty', dataIndex: 'quantity', width: 80, align: 'right' },
                  {
                    title: 'Rate',
                    dataIndex: 'rate',
                    width: 110,
                    align: 'right',
                    render: (v: number) => formatMoney(v),
                  },
                  {
                    title: 'Discount',
                    width: 100,
                    align: 'right',
                    render: (_v, row) =>
                      row.discountPercent
                        ? row.discountType === 'amount'
                          ? formatMoney(row.discountPercent)
                          : `${row.discountPercent}%`
                        : '—',
                  },
                  {
                    title: 'Amount',
                    width: 120,
                    align: 'right',
                    render: (_v, row) => <MoneyText value={lineAmount(row)} strong />,
                  },
                  {
                    title: '',
                    width: 44,
                    render: (_v, row) => (
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => store.removeItem(jobCard.id, row.id, actor)}
                      />
                    ),
                  },
                ]}
              />
            </SectionCard>

            {/* ---------------------------------------------------- work notes */}
            <SectionCard title="Work Notes">
              <Flex gap={8} style={{ marginBottom: 12 }}>
                <Input
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Record progress or an observation"
                  onPressEnter={() => {
                    if (!noteDraft.trim()) return
                    store.addWorkNote(jobCard.id, noteDraft.trim(), actor)
                    setNoteDraft('')
                  }}
                />
                <Button
                  onClick={() => {
                    if (!noteDraft.trim()) return
                    store.addWorkNote(jobCard.id, noteDraft.trim(), actor)
                    setNoteDraft('')
                  }}
                >
                  Add Note
                </Button>
              </Flex>
              {(jobCard.workNotes ?? []).length ? (
                <Space direction="vertical" size={6} style={{ width: '100%' }}>
                  {(jobCard.workNotes ?? []).map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '8px 10px',
                        background: palette.neutral[50],
                        borderRadius: 6,
                        fontSize: 13,
                      }}
                    >
                      <div>{n.note}</div>
                      <div style={{ fontSize: 11, color: palette.neutral[500] }}>
                        {n.by} · {formatDateTime(n.at)}
                      </div>
                    </div>
                  ))}
                </Space>
              ) : (
                <span style={{ fontSize: 12, color: palette.neutral[400] }}>No notes yet</span>
              )}
            </SectionCard>
          </Col>

          {/* ============================================ right column ======= */}
          <Col xs={24} xl={8}>
            <SectionCard title="Assignment">
              <Form.Item name="serviceType" label="Service Type">
                <Select options={SERVICE_TYPES.map((v) => ({ label: v, value: v }))} />
              </Form.Item>
              <Form.Item name="priority" label="Priority">
                <Radio.Group
                  optionType="button"
                  options={['Low', 'Normal', 'High', 'Urgent'].map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
              <Form.Item name="advisorId" label="Service Advisor">
                <Select options={store.advisors().map((a) => ({ label: a.name, value: a.id }))} />
              </Form.Item>
              <Form.Item name="technicianId" label="Mechanic">
                <Select
                  allowClear
                  options={mechanics.map((m) => ({ label: m.name, value: m.id }))}
                />
              </Form.Item>
              <Form.Item name="supervisorId" label="Supervisor">
                <Select
                  allowClear
                  options={supervisors.map((m) => ({ label: m.name, value: m.id }))}
                />
              </Form.Item>
            </SectionCard>

            <SectionCard title="Totals">
              <TotalsPanel
                width="100%"
                lines={[
                  { label: 'Labour', value: totals.byType.Labour ?? 0 },
                  { label: 'Spares', value: totals.byType.Spare ?? 0 },
                  { label: 'Lubricants', value: totals.byType.Lubricant ?? 0 },
                  { label: 'Outsource', value: totals.byType.Outsource ?? 0 },
                  { label: 'Subtotal', value: totals.subtotal, emphasis: true },
                  ...(totals.discount > 0
                    ? [{ label: 'Discount', value: totals.discount, negative: true }]
                    : []),
                  { label: 'Bill Amount', value: totals.bill, emphasis: true },
                  ...(paid !== 0 ? [{ label: 'Received', value: paid }] : []),
                  ...(paid !== 0
                    ? [{ label: 'Balance Due', value: totals.bill - paid, emphasis: true, negative: totals.bill - paid > 0 }]
                    : []),
                ]}
              />

              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, marginBottom: 4 }}>Apply / edit discount</div>
                <Space.Compact style={{ width: '100%' }}>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={docDiscount}
                    onChange={(v) => setDocDiscount(Number(v ?? 0))}
                  />
                  <Select
                    style={{ width: 70 }}
                    value={docDiscountType}
                    onChange={setDocDiscountType}
                    options={[
                      { label: '₹', value: 'amount' },
                      { label: '%', value: 'percent' },
                    ]}
                  />
                </Space.Compact>
              </div>

              <Form.Item name="costEstimate" label="Cost Estimate (₹)" style={{ marginTop: 12 }}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </SectionCard>

            {/* -------------------------------------------------- transactions */}
            <SectionCard title="Transactions">
              <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 12 }}>
                <Radio.Group
                  value={txnDraft.kind}
                  onChange={(e) => setTxnDraft((d) => ({ ...d, kind: e.target.value }))}
                  optionType="button"
                  options={TXN_KINDS.map((v) => ({ label: v, value: v }))}
                />
                <Flex gap={8}>
                  <InputNumber
                    placeholder="Amount"
                    min={0}
                    style={{ flex: 1 }}
                    value={txnDraft.amount}
                    onChange={(v) => setTxnDraft((d) => ({ ...d, amount: Number(v ?? 0) }))}
                  />
                  <Select
                    style={{ width: 130 }}
                    value={txnDraft.mode}
                    onChange={(v) => setTxnDraft((d) => ({ ...d, mode: v }))}
                    options={PAYMENT_MODES.map((m) => ({ label: m, value: m }))}
                  />
                </Flex>
                <Input
                  placeholder="Details / reference"
                  value={txnDraft.details}
                  onChange={(e) => setTxnDraft((d) => ({ ...d, details: e.target.value }))}
                />
                <Button
                  block
                  onClick={() => {
                    if (!txnDraft.amount) return message.warning('Enter an amount')
                    store.addJobCardTransaction(
                      jobCard.id,
                      {
                        kind: txnDraft.kind,
                        amount: toPaise(txnDraft.amount),
                        mode: txnDraft.mode,
                        details: txnDraft.details,
                      },
                      actor,
                    )
                    setTxnDraft({ kind: 'Payment', mode: 'Cash' })
                    message.success('Transaction recorded')
                  }}
                >
                  Add Transaction
                </Button>
              </Space>

              {(jobCard.transactions ?? []).map((t) => (
                <Flex
                  key={t.id}
                  justify="space-between"
                  style={{ fontSize: 12, padding: '4px 0', borderTop: `1px solid ${palette.neutral[100]}` }}
                >
                  <span>
                    <Tag color={t.kind === 'Refund' ? 'red' : t.kind === 'Advance' ? 'blue' : 'green'}>
                      {t.kind}
                    </Tag>
                    {t.mode}
                  </span>
                  <MoneyText value={t.amount} strong />
                </Flex>
              ))}
            </SectionCard>

            {/* ------------------------------------------ delivery & reminders */}
            <SectionCard title="Delivery & Reminders">
              <Row gutter={12}>
                <Col span={14}>
                  <Form.Item name="deliveryDate" label="Delivery Date">
                    <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="deliveryTime" label="Time">
                    <TimePicker style={{ width: '100%' }} format="hh:mm A" use12Hours />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item name="reminderKm" label="Reminder KM">
                    <Input placeholder="e.g. 52000" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="reminderPeriod" label="Reminder Period">
                    <Select
                      allowClear
                      options={['1 month', '3 months', '6 months', '1 year'].map((v) => ({
                        label: v,
                        value: v,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="reminderPriority" label="Reminder Priority">
                <Radio.Group
                  optionType="button"
                  options={['Low', 'Normal', 'High'].map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
              <Form.Item name="exitNote" label="Exit Note">
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item name="smsAlert" label="Send SMS Alert" valuePropName="checked">
                <Switch />
              </Form.Item>
            </SectionCard>
          </Col>
        </Row>
      </Form>

      {/* Sticky save bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'var(--erp-sider-current-width, 240px)',
          right: 0,
          padding: '12px 24px',
          background: palette.neutral[0],
          borderTop: `1px solid ${palette.neutral[200]}`,
          zIndex: 10,
        }}
      >
        <Flex justify="space-between" align="center">
          <Space size={20} style={{ fontSize: 13 }}>
            <span>
              <span style={{ color: palette.neutral[500] }}>Items: </span>
              <strong>{jobCard.items.length}</strong>
            </span>
            <span>
              <span style={{ color: palette.neutral[500] }}>Bill: </span>
              <MoneyText value={totals.bill} strong />
            </span>
            <Tooltip title="Advances, payments and refunds recorded on this job card">
              <span>
                <span style={{ color: palette.neutral[500] }}>Received: </span>
                <MoneyText value={paid} />
              </span>
            </Tooltip>
          </Space>
          <Space>
            <Button onClick={() => navigate(`/workshop/job-cards/${jobCard.id}/overview`)}>
              Cancel
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={save}>
              Save Job Card
            </Button>
          </Space>
        </Flex>
      </div>
    </div>
  )
}
