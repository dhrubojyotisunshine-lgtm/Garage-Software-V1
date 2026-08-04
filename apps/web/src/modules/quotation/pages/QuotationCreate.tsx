import { useState } from 'react'
import { App, Button, Col, DatePicker, Flex, Form, Input, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader, SectionCard, palette } from '@garage/ui'
import { financialYearOf, quotationSchema } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { CustomerQuickAddDrawer } from '@/modules/workshop/components/CustomerQuickAddDrawer'
import { VehicleFormDrawer } from '@/modules/crm/components/VehicleFormDrawer'

/**
 * New quotation.
 *
 * Deliberately short: a quotation starts as a header, and the lines are added
 * on the detail page where the totals are visible while you build them.
 */
export default function QuotationCreate() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const store = useWorkshopStore()
  const { branchId, financialYear, user } = useAppStore()

  const [customerId, setCustomerId] = useState<string | undefined>(
    searchParams.get('customerId') ?? undefined,
  )
  const [customerDrawer, setCustomerDrawer] = useState(false)
  const [vehicleDrawer, setVehicleDrawer] = useState(false)

  const vehicles = customerId ? store.vehiclesOfCustomer(customerId) : []

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values) return

    const parsed = quotationSchema.safeParse({
      customerId: customerId ?? '',
      vehicleId: values.vehicleId,
      subject: values.subject,
      complaintsText: values.complaintsText,
      discountType: 'amount',
      validUntil: values.validUntil?.toISOString?.() ?? values.validUntil,
      notes: values.notes,
      terms: values.terms,
    })
    if (!parsed.success) {
      message.error(parsed.error.issues[0]!.message)
      return
    }

    const quotation = store.createQuotation(
      {
        branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
        financialYear: financialYear || financialYearOf(),
        customerId: parsed.data.customerId,
        vehicleId: parsed.data.vehicleId || undefined,
        subject: parsed.data.subject,
        complaints: (parsed.data.complaintsText ?? '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        notes: parsed.data.notes,
        terms: parsed.data.terms,
        validUntil: String(parsed.data.validUntil),
      },
      user?.name ?? 'System',
    )

    message.success(`${quotation.quotationNo} created — add the lines next`)
    navigate(`/quotation/${quotation.id}`)
  }

  return (
    <div>
      <PageHeader
        title="New Quotation"
        description="Offer work before the vehicle is booked in. Lines are added on the next screen."
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          validUntil: dayjs().add(14, 'day'),
          terms:
            'Prices valid until the date shown. Parts subject to availability. ' +
            'Any additional work found during repair will be quoted separately.',
        }}
      >
        <SectionCard title="Customer & Vehicle">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Customer" required>
                <Flex gap={8}>
                  <Select
                    showSearch
                    style={{ flex: 1 }}
                    placeholder="Search customer"
                    optionFilterProp="label"
                    value={customerId}
                    onChange={(v) => {
                      setCustomerId(v)
                      form.setFieldValue('vehicleId', undefined)
                    }}
                    options={store.customers.map((c) => ({
                      value: c.id,
                      label: `${c.name} · ${c.mobile}`,
                    }))}
                  />
                  <Button onClick={() => setCustomerDrawer(true)}>New</Button>
                </Flex>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="vehicleId"
                label="Vehicle"
                extra="Optional — a quote may precede knowing the vehicle, but one is required to convert it"
              >
                <Select
                  allowClear
                  placeholder={customerId ? 'Select a vehicle' : 'Select a customer first'}
                  disabled={!customerId}
                  options={vehicles.map((v) => ({
                    value: v.id,
                    label: `${v.registration} · ${v.manufacturer} ${v.model}`,
                  }))}
                  popupRender={(menu) => (
                    <>
                      {menu}
                      <Button
                        type="link"
                        block
                        onClick={() => setVehicleDrawer(true)}
                        style={{ textAlign: 'left' }}
                      >
                        + Add a vehicle
                      </Button>
                    </>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="What is being quoted">
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Give the quotation a subject' }]}
          >
            <Input placeholder="e.g. Front brake overhaul and periodic service" />
          </Form.Item>
          <Form.Item name="complaintsText" label="Customer request" extra="One per line">
            <Input.TextArea rows={3} placeholder={'Brake noise while braking\nAC cooling low'} />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="validUntil"
                label="Valid until"
                rules={[{ required: true, message: 'A quote without a validity date never expires' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="terms" label="Terms">
            <Input.TextArea rows={3} />
          </Form.Item>
        </SectionCard>
      </Form>

      <Flex justify="space-between" align="center" style={{ marginTop: 16 }}>
        <span style={{ fontSize: 12, color: palette.neutral[500] }}>
          The quotation opens in Draft. Nothing is sent to the customer until you choose to.
        </span>
        <Flex gap={8}>
          <Button onClick={() => navigate('/quotation')}>Cancel</Button>
          <Button type="primary" onClick={submit} disabled={!customerId}>
            Create Quotation
          </Button>
        </Flex>
      </Flex>

      <CustomerQuickAddDrawer
        open={customerDrawer}
        onClose={() => setCustomerDrawer(false)}
        onCreated={(c) => setCustomerId(c.id)}
      />

      {customerId ? (
        <VehicleFormDrawer
          open={vehicleDrawer}
          customerId={customerId}
          quickMode
          onClose={() => setVehicleDrawer(false)}
          onCreated={(v) => form.setFieldValue('vehicleId', v.id)}
        />
      ) : null}
    </div>
  )
}
