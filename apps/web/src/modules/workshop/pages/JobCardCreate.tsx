import { useState } from 'react'
import { App, Button, Col, DatePicker, Flex, Form, Input, InputNumber, Radio, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader, SectionCard, palette } from '@garage/ui'
import { jobCardSchema, financialYearOf } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { SERVICE_TYPES } from '@/store/seed'
import { CustomerPicker, SelectionSummary, VehiclePicker } from '../components/RecordPickers'
import { CustomerQuickAddDrawer } from '../components/CustomerQuickAddDrawer'
import { VehicleFormDrawer } from '@/modules/crm/components/VehicleFormDrawer'

const { TextArea } = Input

/**
 * New Job Card (T05, page variant with dependent pickers).
 *
 * Creates the job card in Draft. Check-in is completed from the workspace, so
 * a vehicle can be booked in before its details are fully captured.
 */
export default function JobCardCreate() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()

  const store = useWorkshopStore()
  const { branchId, financialYear, user } = useAppStore()

  const [customerId, setCustomerId] = useState<string | undefined>(
    searchParams.get('customerId') ?? undefined,
  )
  const [vehicleId, setVehicleId] = useState<string | undefined>(
    searchParams.get('vehicleId') ?? undefined,
  )
  const [customerDrawer, setCustomerDrawer] = useState(false)
  const [vehicleDrawer, setVehicleDrawer] = useState(false)
  const [saving, setSaving] = useState(false)

  const advisors = store.advisors()

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values) return

    const payload = {
      customerId: customerId ?? '',
      vehicleId: vehicleId ?? '',
      serviceType: values.serviceType,
      priority: values.priority,
      complaintsText: values.complaintsText,
      odometer: values.odometer,
      fuelLevel: values.fuelLevel,
      advisorId: values.advisorId,
      expectedDelivery: values.expectedDelivery?.toISOString?.() ?? values.expectedDelivery,
    }

    const parsed = jobCardSchema.safeParse(payload)
    if (!parsed.success) {
      const first = parsed.error.issues[0]!
      message.error(first.message)
      return
    }

    const data = parsed.data

    setSaving(true)
    const jobCard = store.createJobCard(
      {
        branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
        financialYear: financialYear || financialYearOf(),
        customerId: data.customerId,
        vehicleId: data.vehicleId,
        complaints: data.complaintsText
          .split('\n')
          .map((s: string) => s.trim())
          .filter(Boolean),
        serviceType: data.serviceType,
        priority: data.priority,
        odometer: data.odometer,
        fuelLevel: data.fuelLevel,
        advisorId: data.advisorId,
        expectedDelivery: String(data.expectedDelivery),
      },
      user?.name ?? 'System',
    )
    setSaving(false)

    message.success(`${jobCard.jobCardNo} created`)
    navigate(`/workshop/job-cards/${jobCard.id}/overview`)
  }

  return (
    <div style={{ paddingBottom: 72 }}>
      <PageHeader
        title="New Job Card"
        description="Book a vehicle in. Check-in details can be completed from the workspace."
      />

      <SelectionSummary customerId={customerId} vehicleId={vehicleId} />

      <Form
        form={form}
        layout="vertical"
        requiredMark
        initialValues={{
          priority: 'Normal',
          fuelLevel: '1/2',
          serviceType: 'Periodic Service',
          advisorId: advisors[0]?.id,
          expectedDelivery: dayjs().add(1, 'day').hour(17).minute(30),
        }}
      >
        <SectionCard title="Customer & Vehicle">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Customer" required>
                <CustomerPicker
                  value={customerId}
                  onChange={(v) => {
                    setCustomerId(v as string)
                    setVehicleId(undefined) // vehicle list depends on customer
                  }}
                  onQuickAdd={() => setCustomerDrawer(true)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Vehicle" required>
                <VehiclePicker
                  value={vehicleId}
                  onChange={(v) => setVehicleId(v as string)}
                  customerId={customerId}
                  onQuickAdd={() => {
                    if (!customerId) return message.warning('Select a customer first')
                    setVehicleDrawer(true)
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="Service Request">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="serviceType"
                label="Service Type"
                rules={[{ required: true, message: 'Service type is required' }]}
              >
                <Select options={SERVICE_TYPES.map((v) => ({ label: v, value: v }))} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="priority" label="Priority">
                <Radio.Group
                  optionType="button"
                  options={['Low', 'Normal', 'High', 'Urgent'].map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="advisorId"
                label="Service Advisor"
                rules={[{ required: true, message: 'Advisor is required' }]}
              >
                <Select options={advisors.map((a) => ({ label: a.name, value: a.id }))} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="complaintsText"
                label="Customer Complaint"
                extra="One complaint per line"
                rules={[{ required: true, message: 'At least one complaint is required' }]}
              >
                <TextArea rows={3} placeholder={'Brake noise while braking\nAC cooling low'} />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="Check-In">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="odometer"
                label="Odometer (km)"
                rules={[{ required: true, message: 'Odometer reading is required' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="fuelLevel" label="Fuel Level">
                <Radio.Group
                  optionType="button"
                  options={['E', '1/4', '1/2', '3/4', 'F'].map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="expectedDelivery"
                label="Expected Delivery"
                rules={[{ required: true, message: 'Expected delivery is required' }]}
              >
                <DatePicker showTime format="DD MMM YYYY, hh:mm A" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>
      </Form>

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
          <span style={{ fontSize: 12, color: palette.neutral[500] }}>
            <span style={{ color: palette.error[500] }}>*</span> Required fields
          </span>
          <Flex gap={8}>
            <Button onClick={() => navigate('/workshop/job-cards')}>Cancel</Button>
            <Button
              type="primary"
              loading={saving}
              onClick={submit}
              disabled={!customerId || !vehicleId}
            >
              Create Job Card
            </Button>
          </Flex>
        </Flex>
      </div>

      <CustomerQuickAddDrawer
        open={customerDrawer}
        onClose={() => setCustomerDrawer(false)}
        onCreated={(c) => {
          setCustomerId(c.id)
          setVehicleId(undefined)
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
