import { useMemo, useState } from 'react'
import {
  App,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Empty,
  Flex,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Slider,
  Space,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload,
} from 'antd'
import {
  BulbOutlined,
  CameraOutlined,
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  DropboxOutlined,
  PlusOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import dayjs, { type Dayjs } from 'dayjs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { palette } from '@garage/ui'
import {
  financialYearOf,
  formatDate,
  formatMoney,
  percentOf,
  toPaise,
  type DiscountType,
  type JobCardItemType,
  type PaymentMode,
  type TransactionKind,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { CustomerQuickAddDrawer } from '../components/CustomerQuickAddDrawer'
import { VehicleFormDrawer } from '@/modules/crm/components/VehicleFormDrawer'

/**
 * Create Job Card.
 *
 * Layout follows the Sunshine Garage "Create Jobcard" screen: a header strip
 * carrying type / status / auto number, Customer Details beside Job Card Info,
 * the five item-bucket tiles, a single item search bar, then Job Card Details
 * beside the billing panel.
 *
 * The whole card is assembled in local state and committed on Create, so a
 * half-filled form never reaches the store. Money is integer paise throughout.
 */

const JOB_CARD_TYPES = [
  'General Service',
  'Running Repair',
  'Periodic Service',
  'Accident Repair',
  'Free Service',
  'Warranty',
]

const CUSTOMER_VOICE = [
  'Engine noise', 'Brake noise', 'AC not cooling', 'Vibration at speed',
  'Poor mileage', 'Starting trouble', 'Oil leak', 'Suspension noise',
  'Clutch slipping', 'Electrical fault', 'Body damage', 'Periodic service due',
]

const ACCESSORIES = [
  'Stereo', 'Speakers', 'Spare Wheel', 'Jack', 'Tool Kit', 'Wheel Spanner',
  'Floor Mats', 'Mud Flaps', 'Seat Covers', 'First Aid Kit', 'Fire Extinguisher',
  'Documents', 'Fuel Cap', 'Wheel Caps',
]

const REMINDER_KM = ['1000 km', '4000 km', '5000 km', '10000 km', '15000 km', '20000 km']
const REMINDER_PERIODS = ['1 Month', '3 Months', '4 Months', '6 Months', '1 Year']
const PAYMENT_MODES: PaymentMode[] = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']
const TXN_KINDS: TransactionKind[] = ['Advance', 'Payment', 'Refund']

/** Fuel level is a five-step enum on the record; the slider exposes it as a %. */
const FUEL_STEPS = ['E', '1/4', '1/2', '3/4', 'F'] as const
function fuelFromPercent(pct: number): (typeof FUEL_STEPS)[number] {
  return FUEL_STEPS[Math.round(pct / 25)] ?? '1/2'
}

/** A line held in local state before the job card exists. */
interface DraftItem {
  key: string
  type: JobCardItemType
  productId?: string
  name: string
  code?: string
  partNumber?: string
  unit: string
  quantity: number
  /** Paise. */
  rate: number
  discount: number
  discountType: DiscountType
  taxRate: number
  vendorName?: string
}

interface DraftTxn {
  key: string
  kind: TransactionKind
  /** Paise. */
  amount: number
  mode: PaymentMode
  details?: string
}

function lineAmount(i: DraftItem): number {
  const gross = Math.round(i.quantity * i.rate)
  const disc =
    i.discountType === 'amount' ? Math.min(gross, toPaise(i.discount)) : percentOf(gross, i.discount)
  return gross - disc
}

/**
 * The four buckets, in the reference product's order. The reference uses four
 * unrelated hues; we separate them along the blue family instead, so the tiles
 * stay distinguishable without introducing colours outside the system.
 */
const BUCKETS: { type: JobCardItemType; label: string; accent: string }[] = [
  { type: 'Labour', label: 'Jobs Items', accent: palette.primary[500] },
  { type: 'Spare', label: 'Spare Items', accent: palette.primary[700] },
  { type: 'Lubricant', label: 'Lube Items', accent: palette.primary[300] },
  { type: 'Outsource', label: 'Outsource Items', accent: palette.primary[900] },
]

export default function JobCardCreate() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [searchParams] = useSearchParams()
  const store = useWorkshopStore()
  const { branchId, financialYear, user } = useAppStore()
  const actor = user?.name ?? 'System'

  /* ------------------------------------------------------------- header */
  const [jobCardType, setJobCardType] = useState<string>()
  const [saving, setSaving] = useState(false)

  /* --------------------------------------------------- customer/vehicle */
  const [customerId, setCustomerId] = useState<string | undefined>(
    searchParams.get('customerId') ?? undefined,
  )
  const [vehicleId, setVehicleId] = useState<string | undefined>(
    searchParams.get('vehicleId') ?? undefined,
  )
  const [customerDrawer, setCustomerDrawer] = useState(false)
  const [vehicleDrawer, setVehicleDrawer] = useState(false)

  /* ------------------------------------------------------- job card info */
  const [odometer, setOdometer] = useState<number>()
  const [fuelPercent, setFuelPercent] = useState(50)
  const [mechanicId, setMechanicId] = useState<string>()
  const [supervisorId, setSupervisorId] = useState<string>()

  /* -------------------------------------------------------- modal payloads */
  const [openModal, setOpenModal] = useState<
    'voice' | 'parts' | 'advice' | 'dents' | 'photos' | null
  >(null)
  const [voice, setVoice] = useState<string[]>([])
  const [accessories, setAccessories] = useState<string[]>([])
  const [advice, setAdvice] = useState('')
  const [dentMarks, setDentMarks] = useState('')
  const [photos, setPhotos] = useState<string[]>([])

  /* ---------------------------------------------------------------- items */
  const [activeBucket, setActiveBucket] = useState<JobCardItemType>('Labour')
  const [items, setItems] = useState<DraftItem[]>([])
  const [itemSearch, setItemSearch] = useState('')

  /* -------------------------------------------------------------- details */
  const [costEstimate, setCostEstimate] = useState<number>()
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [deliveryTime, setDeliveryTime] = useState<Dayjs | null>(dayjs().hour(17).minute(30))
  const [reminderKm, setReminderKm] = useState<string | undefined>('4000 km')
  const [reminderPeriod, setReminderPeriod] = useState<string | undefined>('4 Months')
  const [exitNote, setExitNote] = useState('')
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState<DiscountType>('amount')

  /* --------------------------------------------------------- transactions */
  const [txns, setTxns] = useState<DraftTxn[]>([])
  const [txnDraft, setTxnDraft] = useState<{
    kind: TransactionKind
    amount?: number
    mode: PaymentMode
    details?: string
  }>({ kind: 'Advance', mode: 'Cash' })

  const customer = store.customerById(customerId)
  const vehicle = store.vehicleById(vehicleId)
  const mechanics = store.technicians()
  const supervisors = store.employees.filter((e) => e.role === 'Supervisor')

  /* ------------------------------------------------------ customer search */
  /** One search box across vehicle number, owner name and mobile. */
  const recordOptions = useMemo(
    () =>
      store.vehicles.map((v) => {
        const owner = store.customers.find((c) => c.id === v.customerId)
        return {
          value: `${v.customerId}::${v.id}`,
          label: `${v.registration} · ${owner?.name ?? '—'} · ${owner?.mobile ?? ''}`,
        }
      }),
    [store.vehicles, store.customers],
  )

  /* --------------------------------------------------------- item search */
  const searchResults = useMemo(() => {
    const q = itemSearch.trim().toLowerCase()
    if (!q) return []
    return store.products
      .filter((p) => p.status === 'Active')
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.partNumber ?? '').toLowerCase().includes(q),
      )
      .slice(0, 8)
  }, [itemSearch, store.products])

  const addProduct = (productId: string) => {
    const p = store.productById(productId)
    if (!p) return
    setItems((prev) => [
      ...prev,
      {
        key: `${p.id}-${prev.length}`,
        type: p.type === 'Lubricant' ? 'Lubricant' : 'Spare',
        productId: p.id,
        name: p.name,
        code: p.sku,
        partNumber: p.partNumber,
        unit: p.unit,
        quantity: 1,
        rate: p.sellingPrice,
        discount: 0,
        discountType: 'amount',
        taxRate: p.taxRate,
      },
    ])
    setItemSearch('')
    message.success(`${p.name} added`)
  }

  const addCustom = () => {
    const name = itemSearch.trim()
    if (!name) return message.warning('Type a description first')
    setItems((prev) => [
      ...prev,
      {
        key: `custom-${prev.length}-${name}`,
        type: activeBucket,
        name,
        unit: activeBucket === 'Labour' ? 'Hr' : 'Job',
        quantity: 1,
        rate: 0,
        discount: 0,
        discountType: 'amount',
        taxRate: 18,
      },
    ])
    setItemSearch('')
    message.success(`Added to ${activeBucket}`)
  }

  const patchItem = (key: string, patch: Partial<DraftItem>) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, ...patch } : i)))

  const loadPackage = () => {
    const pack: { name: string; type: JobCardItemType; rate: number }[] = [
      { name: 'Engine Oil Change — Labour', type: 'Labour', rate: toPaise(450) },
      { name: 'Oil Filter Replacement — Labour', type: 'Labour', rate: toPaise(150) },
      { name: 'General Checkup — Labour', type: 'Labour', rate: toPaise(300) },
      { name: 'Wheel Balancing — Labour', type: 'Labour', rate: toPaise(400) },
    ]
    setItems((prev) => [
      ...prev,
      ...pack.map((p, n) => ({
        key: `pkg-${prev.length + n}`,
        type: p.type,
        name: p.name,
        unit: 'Job',
        quantity: 1,
        rate: p.rate,
        discount: 0,
        discountType: 'amount' as DiscountType,
        taxRate: 18,
      })),
    ])
    message.success('Periodic Service package loaded')
  }

  const showInsights = () => {
    if (!vehicleId) return message.warning('Select a vehicle first')
    const past = store.jobCards.filter((j) => j.vehicleId === vehicleId)
    if (!past.length) return message.info('No previous job cards for this vehicle')
    const names = [...new Set(past.flatMap((j) => j.items.map((i) => i.name)))]
    message.info(
      names.length
        ? `Previously done: ${names.slice(0, 4).join(', ')}`
        : `${past.length} previous visit(s), no item lines recorded`,
    )
  }

  /* ---------------------------------------------------------------- totals */
  const totals = useMemo(() => {
    const byType: Record<JobCardItemType, number> = { Labour: 0, Spare: 0, Lubricant: 0, Outsource: 0 }
    const countByType: Record<JobCardItemType, number> = { Labour: 0, Spare: 0, Lubricant: 0, Outsource: 0 }
    for (const i of items) {
      byType[i.type] += lineAmount(i)
      countByType[i.type] += 1
    }
    const total = Object.values(byType).reduce((a, b) => a + b, 0)
    const discountPaise =
      discountType === 'percent' ? percentOf(total, discount) : Math.min(total, toPaise(discount || 0))
    const bill = total - discountPaise
    const paid = txns.reduce((a, t) => a + (t.kind === 'Refund' ? -t.amount : t.amount), 0)
    return { byType, countByType, total, discountPaise, bill, paid, balance: bill - paid }
  }, [items, discount, discountType, txns])

  /* ---------------------------------------------------------------- submit */
  const submit = () => {
    if (!customerId || !vehicleId) return message.error('Select a customer and vehicle')
    if (!jobCardType) return message.error('Select a job card type')
    if (odometer === undefined) return message.error('KM reading is required')

    setSaving(true)
    const jobCard = store.createJobCard(
      {
        branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
        financialYear: financialYear || financialYearOf(),
        customerId,
        vehicleId,
        complaints: voice,
        serviceType: jobCardType,
        priority: 'Normal',
        odometer,
        fuelLevel: fuelFromPercent(fuelPercent),
        advisorId: supervisorId ?? store.advisors()[0]?.id ?? '',
        expectedDelivery: (deliveryDate ?? dayjs().add(1, 'day')).toISOString(),
      },
      actor,
    )

    store.patchJobCard(
      jobCard.id,
      {
        jobCardType,
        technicianId: mechanicId,
        supervisorId,
        customerVoice: voice,
        checkIn: { accessories, dentMarks, photos },
        costEstimate: costEstimate !== undefined ? toPaise(costEstimate) : undefined,
        deliveryTime: deliveryTime ? deliveryTime.format('hh:mm A') : undefined,
        reminder: { km: reminderKm, period: reminderPeriod, priority: 'Normal' },
        exitNote,
        discount: toPaise(discount || 0),
        discountType,
      },
      actor,
    )

    for (const i of items) {
      store.addItem(
        jobCard.id,
        {
          type: i.type,
          productId: i.productId,
          name: i.name,
          code: i.code,
          partNumber: i.partNumber,
          quantity: i.quantity,
          unit: i.unit,
          rate: i.rate,
          discountPercent: i.discount,
          discountType: i.discountType,
          taxRate: i.taxRate,
          source: 'Estimate',
          mechanicId,
          mechanicName: store.employeeById(mechanicId)?.name,
          vendorName: i.vendorName,
        },
        actor,
      )
    }

    if (advice.trim()) store.addWorkNote(jobCard.id, `Advice: ${advice.trim()}`, actor)

    for (const t of txns) {
      store.addJobCardTransaction(
        jobCard.id,
        { kind: t.kind, amount: t.amount, mode: t.mode, details: t.details },
        actor,
      )
    }

    setSaving(false)
    message.success(`${jobCard.jobCardNo} created`)
    navigate(`/workshop/job-cards/${jobCard.id}/overview`)
  }

  /* ------------------------------------------------------------------- UI */
  const iconButtons = [
    { key: 'voice' as const, label: 'Voice', icon: <CommentOutlined />, count: voice.length },
    { key: 'parts' as const, label: 'Parts', icon: <DropboxOutlined />, count: accessories.length },
    { key: 'advice' as const, label: 'Advice', icon: <BulbOutlined />, count: advice.trim() ? 1 : 0 },
    { key: 'dents' as const, label: 'Dents', icon: <WarningOutlined />, count: dentMarks.trim() ? 1 : 0 },
    { key: 'photos' as const, label: 'Photos', icon: <CameraOutlined />, count: photos.length },
  ]

  const bucketItems = items.filter((i) => i.type === activeBucket)
  const labelCol = { fontSize: 12, color: palette.neutral[500], marginBottom: 4 } as const

  const billingLine = (label: string, value: number, opts?: { strong?: boolean; tone?: string }) => (
    <Flex justify="space-between" style={{ padding: '5px 0', fontSize: 13 }}>
      <span style={{ color: opts?.tone ?? palette.neutral[600], fontWeight: opts?.strong ? 600 : 400 }}>
        {label}
      </span>
      <span className="erp-tabular" style={{ fontWeight: opts?.strong ? 600 : 400 }}>
        {formatMoney(value)}
      </span>
    </Flex>
  )

  return (
    <div style={{ paddingBottom: 76 }}>
      {/* ----------------------------------------------------- header strip */}
      <Flex align="center" gap={12} wrap style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Create Job Card</h1>
        <Select
          placeholder="Please select a job card type"
          style={{ width: 230 }}
          value={jobCardType}
          onChange={setJobCardType}
          options={JOB_CARD_TYPES.map((v) => ({ label: v, value: v }))}
        />
        <Select
          style={{ width: 240 }}
          value="Draft"
          disabled
          options={[{ label: 'Work Not Yet Started (Open)', value: 'Draft' }]}
        />
        <Tooltip title="The job card number is generated on save">
          <Tag>Auto</Tag>
        </Tooltip>
        <div style={{ marginLeft: 'auto', color: palette.neutral[500], fontSize: 13 }}>
          {formatDate(new Date())}
        </div>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => navigate('/workshop/job-cards')}
        />
      </Flex>

      <Row gutter={[16, 16]}>
        {/* ---------------------------------------------- customer details */}
        <Col xs={24} xl={12}>
          <Card
            size="small"
            title={
              <span>
                <ToolOutlined style={{ color: palette.neutral[500], marginInlineEnd: 6 }} />
                Customer Details
              </span>
            }
            style={{ height: '100%' }}
          >
            <Flex gap={8}>
              <Select
                showSearch
                allowClear
                style={{ flex: 1 }}
                placeholder="Search by vehicle no, mobile, name…"
                suffixIcon={<SearchOutlined />}
                value={customerId && vehicleId ? `${customerId}::${vehicleId}` : undefined}
                optionFilterProp="label"
                options={recordOptions}
                onChange={(v?: string) => {
                  if (!v) {
                    setCustomerId(undefined)
                    setVehicleId(undefined)
                    return
                  }
                  const [c, veh] = v.split('::')
                  setCustomerId(c)
                  setVehicleId(veh)
                }}
                notFoundContent={
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No match" />
                }
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setCustomerDrawer(true)}>
                New
              </Button>
            </Flex>

            {customer && vehicle ? (
              <Row gutter={[8, 8]} style={{ marginTop: 14, fontSize: 13 }}>
                <Col span={12}>
                  <div style={labelCol}>Customer</div>
                  <div style={{ fontWeight: 500 }}>{customer.name}</div>
                </Col>
                <Col span={12}>
                  <div style={labelCol}>Mobile</div>
                  <div className="erp-mono">{customer.mobile}</div>
                </Col>
                <Col span={12}>
                  <div style={labelCol}>Vehicle</div>
                  <div className="erp-mono" style={{ fontWeight: 500 }}>
                    {vehicle.registration}
                  </div>
                </Col>
                <Col span={12}>
                  <div style={labelCol}>Make & Model</div>
                  <div>
                    {vehicle.manufacturer} {vehicle.model}
                    {vehicle.colour ? ` · ${vehicle.colour}` : ''}
                  </div>
                </Col>
                <Col span={24}>
                  <Button size="small" onClick={() => setVehicleDrawer(true)}>
                    Add another vehicle
                  </Button>
                </Col>
              </Row>
            ) : (
              <div style={{ marginTop: 14, fontSize: 12, color: palette.neutral[400] }}>
                Search an existing vehicle, or use New to register a walk-in customer.
              </div>
            )}
          </Card>
        </Col>

        {/* ------------------------------------------------- job card info */}
        <Col xs={24} xl={12}>
          <Card
            size="small"
            title={
              <span>
                <ThunderboltOutlined style={{ color: palette.neutral[500], marginInlineEnd: 6 }} />
                Job Card Info
              </span>
            }
            style={{ height: '100%' }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <div style={labelCol}>KM Reading</div>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="e.g. 12500"
                  value={odometer}
                  onChange={(v) => setOdometer(v === null ? undefined : Number(v))}
                />
              </Col>
              <Col xs={24} md={12}>
                <div style={labelCol}>
                  Fuel Level:{' '}
                  <strong style={{ color: palette.primary[600] }}>
                    {fuelPercent}% ({fuelFromPercent(fuelPercent)})
                  </strong>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={25}
                  value={fuelPercent}
                  onChange={setFuelPercent}
                  marks={{ 0: 'E', 50: '½', 100: 'F' }}
                  tooltip={{ formatter: (v) => `${v}%` }}
                />
              </Col>
              <Col xs={24} md={12} style={{ marginTop: 8 }}>
                <div style={labelCol}>Mechanic</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Select mechanic"
                  value={mechanicId}
                  onChange={setMechanicId}
                  options={mechanics.map((m) => ({ label: m.name, value: m.id }))}
                />
              </Col>
              <Col xs={24} md={12} style={{ marginTop: 8 }}>
                <div style={labelCol}>Supervisor</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Select supervisor"
                  value={supervisorId}
                  onChange={setSupervisorId}
                  options={supervisors.map((m) => ({ label: m.name, value: m.id }))}
                />
              </Col>
            </Row>

            <Flex gap={8} wrap style={{ marginTop: 16 }}>
              {iconButtons.map((b) => (
                <Badge key={b.key} count={b.count} size="small" offset={[-6, 4]}>
                  <Button
                    style={{ height: 54, width: 104 }}
                    onClick={() => setOpenModal(b.key)}
                    type={b.count ? 'primary' : 'default'}
                    ghost={Boolean(b.count)}
                  >
                    <Flex vertical align="center" gap={2}>
                      <span style={{ fontSize: 16 }}>{b.icon}</span>
                      <span style={{ fontSize: 12 }}>{b.label}</span>
                    </Flex>
                  </Button>
                </Badge>
              ))}
            </Flex>
          </Card>
        </Col>

        {/* -------------------------------------------------- bucket tiles */}
        <Col span={24}>
          <Row gutter={[12, 12]}>
            {BUCKETS.map((b) => {
              const active = activeBucket === b.type
              return (
                <Col xs={12} md={8} xl={5} key={b.type}>
                  <Card
                    size="small"
                    hoverable
                    onClick={() => setActiveBucket(b.type)}
                    style={{
                      background: palette.neutral[0],
                      borderColor: active ? b.accent : palette.neutral[200],
                      // Selection reads as a thicker coloured edge, not a fill.
                      borderLeft: `3px solid ${b.accent}`,
                      boxShadow: active ? `0 0 0 1px ${b.accent}` : undefined,
                    }}
                    styles={{ body: { padding: 14 } }}
                  >
                    <div
                      className="erp-tabular"
                      style={{ fontSize: 22, fontWeight: 600, lineHeight: '28px' }}
                    >
                      {totals.countByType[b.type]}
                    </div>
                    <div style={{ fontSize: 12, color: palette.neutral[500] }}>{b.label}</div>
                    <div
                      className="erp-tabular"
                      style={{ fontSize: 13, fontWeight: 500, color: palette.neutral[700] }}
                    >
                      {formatMoney(totals.byType[b.type])}
                    </div>
                  </Card>
                </Col>
              )
            })}
            <Col xs={24} md={8} xl={4}>
              <Card size="small" style={{ height: '100%' }} styles={{ body: { padding: 14 } }}>
                <div
                  className="erp-tabular"
                  style={{ fontSize: 22, fontWeight: 600, lineHeight: '28px' }}
                >
                  {items.length}
                </div>
                <div style={{ fontSize: 12, color: palette.neutral[600] }}>Total Items</div>
                <div className="erp-tabular" style={{ fontSize: 13, fontWeight: 500 }}>
                  {formatMoney(totals.total)}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* --------------------------------------------- item search + grid */}
        <Col span={24}>
          <Card size="small" styles={{ body: { padding: 12 } }}>
            <Flex gap={8} wrap style={{ marginBottom: 10 }}>
              <Button size="small" icon={<PlusOutlined />} onClick={loadPackage}>
                Load Package
              </Button>
              <Tooltip title="Shows what was done on this vehicle before">
                <Button size="small" icon={<BulbOutlined />} onClick={showInsights}>
                  Insights
                </Button>
              </Tooltip>
              <Tag style={{ marginInlineStart: "auto" }}>
                Adding to: {BUCKETS.find((b) => b.type === activeBucket)?.label}
              </Tag>
            </Flex>

            <Input
              allowClear
              size="large"
              prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
              placeholder="Search job items by name or code…"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              onPressEnter={() => {
                const first = searchResults[0]
                if (first) addProduct(first.id)
                else addCustom()
              }}
            />

            {itemSearch.trim() ? (
              <div
                style={{
                  border: `1px solid ${palette.neutral[200]}`,
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                }}
              >
                {searchResults.map((p) => (
                  <Flex
                    key={p.id}
                    justify="space-between"
                    align="center"
                    onClick={() => addProduct(p.id)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${palette.neutral[100]}`,
                    }}
                  >
                    <span>
                      {p.name}{' '}
                      <span className="erp-mono" style={{ fontSize: 11, color: palette.neutral[500] }}>
                        {p.sku}
                      </span>
                    </span>
                    <Space size={10}>
                      <Tag color={p.type === 'Lubricant' ? 'cyan' : 'blue'}>
                        {p.type === 'Lubricant' ? 'Lube' : 'Spare'}
                      </Tag>
                      <span className="erp-tabular">{formatMoney(p.sellingPrice)}</span>
                    </Space>
                  </Flex>
                ))}
                <div
                  onClick={addCustom}
                  style={{ padding: '8px 12px', cursor: 'pointer', color: palette.primary[600] }}
                >
                  <PlusOutlined /> Add “{itemSearch.trim()}” as a custom {activeBucket} line
                </div>
              </div>
            ) : null}

            <Table<DraftItem>
              size="small"
              rowKey="key"
              style={{ marginTop: 12 }}
              pagination={false}
              dataSource={bucketItems}
              locale={{
                emptyText: `No ${BUCKETS.find((b) => b.type === activeBucket)?.label.toLowerCase()} yet — search above to add`,
              }}
              columns={[
                {
                  title: 'Item',
                  dataIndex: 'name',
                  render: (v: string, row) => (
                    <div>
                      <div>{v}</div>
                      {row.code || row.partNumber ? (
                        <span
                          className="erp-mono"
                          style={{ fontSize: 11, color: palette.neutral[500] }}
                        >
                          {row.partNumber ?? row.code}
                        </span>
                      ) : null}
                    </div>
                  ),
                },
                ...(activeBucket === 'Outsource'
                  ? [
                      {
                        title: 'Vendor',
                        width: 150,
                        render: (_v: unknown, row: DraftItem) => (
                          <Input
                            size="small"
                            value={row.vendorName}
                            onChange={(e) => patchItem(row.key, { vendorName: e.target.value })}
                          />
                        ),
                      },
                    ]
                  : []),
                {
                  title: 'Qty',
                  width: 90,
                  render: (_v, row) => (
                    <InputNumber
                      size="small"
                      min={0.25}
                      step={row.type === 'Labour' ? 0.25 : 1}
                      style={{ width: '100%' }}
                      value={row.quantity}
                      onChange={(v) => patchItem(row.key, { quantity: Number(v ?? 1) })}
                    />
                  ),
                },
                {
                  title: 'Rate (₹)',
                  width: 120,
                  render: (_v, row) => (
                    <InputNumber
                      size="small"
                      min={0}
                      style={{ width: '100%' }}
                      value={row.rate / 100}
                      onChange={(v) => patchItem(row.key, { rate: toPaise(Number(v ?? 0)) })}
                    />
                  ),
                },
                {
                  title: 'Discount',
                  width: 130,
                  render: (_v, row) => (
                    <Space.Compact>
                      <InputNumber
                        size="small"
                        min={0}
                        style={{ width: 70 }}
                        value={row.discount}
                        onChange={(v) => patchItem(row.key, { discount: Number(v ?? 0) })}
                      />
                      <Select
                        size="small"
                        style={{ width: 56 }}
                        value={row.discountType}
                        onChange={(v) => patchItem(row.key, { discountType: v })}
                        options={[
                          { label: '₹', value: 'amount' },
                          { label: '%', value: 'percent' },
                        ]}
                      />
                    </Space.Compact>
                  ),
                },
                {
                  title: 'Amount',
                  width: 120,
                  align: 'right',
                  render: (_v, row) => (
                    <span className="erp-tabular" style={{ fontWeight: 500 }}>
                      {formatMoney(lineAmount(row))}
                    </span>
                  ),
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
                      onClick={() => setItems((prev) => prev.filter((i) => i.key !== row.key))}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        {/* --------------------------------------------- job card details */}
        <Col xs={24} xl={12}>
          <Card size="small" title="Job Card Details" style={{ height: '100%' }}>
            <div style={labelCol}>Cost Estimate (₹)</div>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              value={costEstimate}
              onChange={(v) => setCostEstimate(v === null ? undefined : Number(v))}
            />

            <Row gutter={12} style={{ marginTop: 12 }}>
              <Col span={12}>
                <div style={labelCol}>Delivery Date</div>
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD MMM YYYY"
                  value={deliveryDate}
                  onChange={setDeliveryDate}
                  placeholder="Select date"
                />
              </Col>
              <Col span={12}>
                <div style={labelCol}>Delivery Time</div>
                <TimePicker
                  style={{ width: '100%' }}
                  format="hh:mm A"
                  use12Hours
                  value={deliveryTime}
                  onChange={setDeliveryTime}
                />
              </Col>
            </Row>

            <Row gutter={12} style={{ marginTop: 12 }}>
              <Col span={12}>
                <div style={labelCol}>Reminder KM</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  value={reminderKm}
                  onChange={setReminderKm}
                  options={REMINDER_KM.map((v) => ({ label: v, value: v }))}
                />
              </Col>
              <Col span={12}>
                <div style={labelCol}>Reminder Period</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  value={reminderPeriod}
                  onChange={setReminderPeriod}
                  options={REMINDER_PERIODS.map((v) => ({ label: v, value: v }))}
                />
              </Col>
            </Row>

            <div style={{ ...labelCol, marginTop: 12 }}>Exit Note</div>
            <Input.TextArea
              rows={3}
              placeholder="Notes for customer on exit…"
              value={exitNote}
              onChange={(e) => setExitNote(e.target.value)}
            />
          </Card>
        </Col>

        {/* -------------------------------------------------------- billing */}
        <Col xs={24} xl={12}>
          <Card size="small" style={{ height: '100%' }} styles={{ body: { paddingTop: 0 } }}>
            <Tabs
              items={[
                {
                  key: 'billing',
                  label: 'Billing Details',
                  children: (
                    <div>
                      {billingLine('Jobs Total', totals.byType.Labour)}
                      {billingLine('Spare Total', totals.byType.Spare)}
                      {billingLine('Lube Total', totals.byType.Lubricant)}
                      {billingLine('Outsource Total', totals.byType.Outsource)}
                      <div
                        style={{
                          borderTop: `1px solid ${palette.neutral[200]}`,
                          margin: '4px 0',
                        }}
                      />
                      {billingLine('Total', totals.total, {
                        strong: true,
                        tone: palette.neutral[900],
                      })}

                      <Flex align="center" gap={8} style={{ margin: '10px 0' }}>
                        <span style={{ fontSize: 13, color: palette.neutral[600], flex: 1 }}>
                          Discount
                        </span>
                        <Space.Compact>
                          <InputNumber
                            size="small"
                            min={0}
                            style={{ width: 90 }}
                            value={discount}
                            onChange={(v) => setDiscount(Number(v ?? 0))}
                          />
                          <Select
                            size="small"
                            style={{ width: 60 }}
                            value={discountType}
                            onChange={setDiscountType}
                            options={[
                              { label: '₹', value: 'amount' },
                              { label: '%', value: 'percent' },
                            ]}
                          />
                        </Space.Compact>
                        <span className="erp-tabular" style={{ fontSize: 13, width: 90, textAlign: 'right' }}>
                          −{formatMoney(totals.discountPaise)}
                        </span>
                      </Flex>

                      <div style={{ borderTop: `1px solid ${palette.neutral[200]}`, margin: '4px 0' }} />
                      {billingLine('Bill Amount', totals.bill, {
                        strong: true,
                        tone: palette.neutral[900],
                      })}
                      {billingLine('Paid', totals.paid)}
                      {billingLine('Balance Due', totals.balance, {
                        strong: true,
                        tone: totals.balance > 0 ? palette.error[500] : palette.success[600],
                      })}
                    </div>
                  ),
                },
                {
                  key: 'txn',
                  label: 'Transaction History',
                  children: (
                    <div>
                      <Flex gap={8} wrap style={{ marginBottom: 10 }}>
                        <Select
                          style={{ width: 110 }}
                          value={txnDraft.kind}
                          onChange={(v) => setTxnDraft((d) => ({ ...d, kind: v }))}
                          options={TXN_KINDS.map((v) => ({ label: v, value: v }))}
                        />
                        <InputNumber
                          placeholder="Amount"
                          min={0}
                          style={{ flex: 1, minWidth: 110 }}
                          value={txnDraft.amount}
                          onChange={(v) =>
                            setTxnDraft((d) => ({ ...d, amount: v === null ? undefined : Number(v) }))
                          }
                        />
                        <Select
                          style={{ width: 130 }}
                          value={txnDraft.mode}
                          onChange={(v) => setTxnDraft((d) => ({ ...d, mode: v }))}
                          options={PAYMENT_MODES.map((v) => ({ label: v, value: v }))}
                        />
                        <Button
                          type="primary"
                          onClick={() => {
                            if (!txnDraft.amount) return message.warning('Enter an amount')
                            setTxns((prev) => [
                              ...prev,
                              {
                                key: `t-${prev.length}`,
                                kind: txnDraft.kind,
                                amount: toPaise(txnDraft.amount ?? 0),
                                mode: txnDraft.mode,
                                details: txnDraft.details,
                              },
                            ])
                            setTxnDraft({ kind: 'Payment', mode: 'Cash' })
                          }}
                        >
                          Add
                        </Button>
                      </Flex>

                      {txns.length ? (
                        txns.map((t) => (
                          <Flex
                            key={t.key}
                            justify="space-between"
                            align="center"
                            style={{
                              fontSize: 13,
                              padding: '6px 0',
                              borderTop: `1px solid ${palette.neutral[100]}`,
                            }}
                          >
                            <Space size={8}>
                              <Tag
                                color={
                                  t.kind === 'Refund' ? 'red' : t.kind === 'Advance' ? 'blue' : 'green'
                                }
                              >
                                {t.kind}
                              </Tag>
                              <span style={{ color: palette.neutral[500] }}>{t.mode}</span>
                            </Space>
                            <Space size={8}>
                              <span className="erp-tabular">{formatMoney(t.amount)}</span>
                              <Button
                                type="text"
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => setTxns((prev) => prev.filter((x) => x.key !== t.key))}
                              />
                            </Space>
                          </Flex>
                        ))
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No advance or payment recorded"
                        />
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* ------------------------------------------------------- footer bar */}
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
              <strong>{items.length}</strong>
            </span>
            <span>
              <span style={{ color: palette.neutral[500] }}>Bill: </span>
              <strong className="erp-tabular">{formatMoney(totals.bill)}</strong>
            </span>
          </Space>
          <Space>
            <Button onClick={() => navigate('/workshop/job-cards')}>Cancel</Button>
            <Button type="primary" loading={saving} onClick={submit}>
              Create Job Card
            </Button>
          </Space>
        </Flex>
      </div>

      {/* ----------------------------------------------------------- modals */}
      <Modal
        title="Customer Voice"
        open={openModal === 'voice'}
        onCancel={() => setOpenModal(null)}
        onOk={() => setOpenModal(null)}
        okText="Done"
      >
        <p style={{ fontSize: 12, color: palette.neutral[500] }}>
          What the customer reported. Pick from the library or type your own.
        </p>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select or type a complaint"
          value={voice}
          onChange={setVoice}
          options={CUSTOMER_VOICE.map((v) => ({ label: v, value: v }))}
        />
      </Modal>

      <Modal
        title="Parts & Accessories Checked In"
        open={openModal === 'parts'}
        onCancel={() => setOpenModal(null)}
        onOk={() => setOpenModal(null)}
        okText="Done"
        width={560}
      >
        <p style={{ fontSize: 12, color: palette.neutral[500] }}>
          Tick what came in with the vehicle. This list is checked again at delivery.
        </p>
        <Checkbox.Group
          options={ACCESSORIES}
          value={accessories}
          onChange={(v) => setAccessories(v as string[])}
        />
      </Modal>

      <Modal
        title="Advice to Customer"
        open={openModal === 'advice'}
        onCancel={() => setOpenModal(null)}
        onOk={() => setOpenModal(null)}
        okText="Done"
      >
        <Input.TextArea
          rows={5}
          placeholder="Recommendations, wear observed, work to plan for next visit…"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        />
      </Modal>

      <Modal
        title="Dent Marks & Damage"
        open={openModal === 'dents'}
        onCancel={() => setOpenModal(null)}
        onOk={() => setOpenModal(null)}
        okText="Done"
      >
        <Input.TextArea
          rows={5}
          placeholder="Existing dents, scratches and damage, panel by panel…"
          value={dentMarks}
          onChange={(e) => setDentMarks(e.target.value)}
        />
      </Modal>

      <Modal
        title="Vehicle Photos"
        open={openModal === 'photos'}
        onCancel={() => setOpenModal(null)}
        onOk={() => setOpenModal(null)}
        okText="Done"
        width={620}
      >
        <Upload.Dragger
          multiple
          accept="image/*"
          showUploadList={false}
          /* No upload endpoint yet — the image is held in the browser as a data URL. */
          beforeUpload={(file) => {
            const reader = new FileReader()
            reader.onload = () => setPhotos((prev) => [...prev, String(reader.result)])
            reader.readAsDataURL(file)
            return false
          }}
        >
          <p style={{ fontSize: 24, margin: 0 }}>
            <CameraOutlined />
          </p>
          <p>Drop photos here, or click to choose</p>
          <p style={{ fontSize: 12, color: palette.neutral[500] }}>
            Held in this browser until the file service is connected.
          </p>
        </Upload.Dragger>

        {photos.length ? (
          <Flex gap={8} wrap style={{ marginTop: 12 }}>
            {photos.map((src, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <Image src={src} width={92} height={70} style={{ objectFit: 'cover', borderRadius: 4 }} />
                <Button
                  size="small"
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => setPhotos((prev) => prev.filter((_, n) => n !== i))}
                />
              </div>
            ))}
          </Flex>
        ) : null}
      </Modal>

      <CustomerQuickAddDrawer
        open={customerDrawer}
        onClose={() => setCustomerDrawer(false)}
        onCreated={(c) => {
          setCustomerId(c.id)
          setVehicleId(undefined)
          setVehicleDrawer(true)
        }}
      />

      {customerId ? (
        <VehicleFormDrawer
          open={vehicleDrawer}
          customerId={customerId}
          quickMode
          onClose={() => setVehicleDrawer(false)}
          onCreated={(v) => setVehicleId(v.id)}
        />
      ) : null}
    </div>
  )
}
