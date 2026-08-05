import { useEffect } from 'react'
import { App, Button, Col, DatePicker, Flex, Form, Input, Row, Select, Switch } from 'antd'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { NotFoundState, PageHeader, SectionCard, palette } from '@garage/ui'
import {
  PERSON_ROLE_SLUGS,
  personSchema,
  roleFromSlug,
  type PersonRole,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Staff create / edit.
 *
 * One form for all four roles, like the list. The role comes from the URL and
 * is fixed for the record — moving someone between roles is a deliberate act,
 * not a dropdown you can nudge by accident.
 */

const DESIGNATIONS = [
  'Service Advisor',
  'Supervisor',
  'Technician',
  'Denting & Painting',
  'Spares Incharge',
  'Front Desk',
  'Customer Care',
  'Senior Accountant',
  'Branch Manager',
  'Driver',
  'Helper',
]

export default function PersonForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const store = useWorkshopStore()
  const { branchId } = useAppStore()

  // /admin/users/accountants/new  or  /admin/users/accountants/:id/edit
  const segments = location.pathname.split('/').filter(Boolean)
  const slug = segments[2]
  const role = roleFromSlug(slug) as PersonRole | undefined

  const existing = store.personById(id)
  const isEdit = Boolean(id)

  useEffect(() => {
    if (!existing) return
    form.setFieldsValue({
      ...existing,
      dateOfBirth: existing.dateOfBirth ? dayjs(existing.dateOfBirth) : undefined,
      joinDate: existing.joinDate ? dayjs(existing.joinDate) : undefined,
      active: existing.status === 'Active',
    })
  }, [existing, form])

  if (!role) return <NotFoundState what="staff form" />
  if (isEdit && !existing) return <NotFoundState what="staff record" />

  const basePath = `/admin/users/${PERSON_ROLE_SLUGS[role]}`

  const submit = async () => {
    const values = await form.validateFields().catch(() => null)
    if (!values) return

    const parsed = personSchema.safeParse({
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email ?? '',
      mobile: values.mobile ?? '',
      landline: values.landline,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth?.toISOString?.(),
      designation: values.designation,
      joinDate: values.joinDate?.toISOString?.(),
      addressLine: values.addressLine,
      city: values.city,
      state: values.state,
      country: values.country,
    })
    if (!parsed.success) {
      message.error(parsed.error.issues[0]!.message)
      return
    }

    const d = parsed.data
    const payload = {
      role,
      branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
      firstName: d.firstName,
      lastName: d.lastName || undefined,
      displayName: d.displayName || undefined,
      email: d.email || undefined,
      mobile: d.mobile || undefined,
      landline: d.landline || undefined,
      gender: d.gender,
      dateOfBirth: d.dateOfBirth ? String(d.dateOfBirth) : undefined,
      designation: d.designation || undefined,
      joinDate: d.joinDate ? String(d.joinDate) : undefined,
      addressLine: d.addressLine || undefined,
      city: d.city || undefined,
      state: d.state || undefined,
      country: d.country || undefined,
      status: (values.active === false ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
    }

    if (existing) {
      store.updatePerson(existing.id, payload)
      message.success('Saved')
    } else {
      const created = store.createPerson(payload)
      message.success(`${created.code} created`)
    }
    navigate(basePath)
  }

  return (
    <div style={{ paddingBottom: 72 }}>
      <PageHeader
        title={existing ? `Edit ${role}` : `Add ${role}`}
        description={existing ? existing.code : 'A code is generated on save'}
        secondaryAction={{ key: 'back', label: 'Back to list', onClick: () => navigate(basePath) }}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={{ country: 'India', state: 'Maharashtra', active: true }}
      >
        <SectionCard title="Identity">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'First name is required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="lastName" label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="displayName"
                label="Display Name"
                extra="Shown in lists and pickers when set"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="gender" label="Gender">
                <Select
                  allowClear
                  options={['Male', 'Female', 'Other'].map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="Contact">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="mobile" label="Mobile">
                <Input prefix="+91" maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="email" label="Email">
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="landline" label="Landline">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="Employment">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="designation" label="Designation">
                <Select
                  allowClear
                  showSearch
                  options={DESIGNATIONS.map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="joinDate" label="Joining Date">
                <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="active"
                label="Active"
                valuePropName="checked"
                extra="Inactive staff stay on record but are not offered for assignment"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </SectionCard>

        <SectionCard title="Address">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="addressLine" label="Address">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="state" label="State">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="country" label="Country">
                <Input />
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
            <Button onClick={() => navigate(basePath)}>Cancel</Button>
            <Button type="primary" onClick={submit}>
              {existing ? 'Save Changes' : `Create ${role}`}
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}
