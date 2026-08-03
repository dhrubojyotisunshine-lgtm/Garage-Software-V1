import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { T05Form, type FormSectionDef } from '@garage/ui'
import { customerSchema, toPaise, type CustomerInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/** CRM — Add Customer (T05, page variant). */

const SECTIONS: FormSectionDef[] = [
  {
    key: 'basic',
    title: 'Basic Information',
    fields: [
      { name: 'name', label: 'Customer Name', type: 'text', required: true, span: 12 },
      {
        name: 'type',
        label: 'Customer Type',
        type: 'radio',
        required: true,
        span: 12,
        options: [
          { label: 'Individual', value: 'Individual' },
          { label: 'Business', value: 'Business' },
        ],
      },
      { name: 'mobile', label: 'Mobile', type: 'text', required: true, span: 8, prefix: '+91' },
      { name: 'altMobile', label: 'Alternate Mobile', type: 'text', span: 8, prefix: '+91' },
      { name: 'email', label: 'Email', type: 'text', span: 8 },
    ],
  },
  {
    key: 'address',
    title: 'Address',
    fields: [
      { name: 'addressLine', label: 'Address', type: 'textarea', span: 24, rows: 2 },
      { name: 'city', label: 'City', type: 'text', required: true, span: 8 },
      { name: 'state', label: 'State', type: 'text', required: true, span: 8 },
      { name: 'pincode', label: 'PIN Code', type: 'text', span: 8 },
    ],
  },
  {
    key: 'billing',
    title: 'Billing',
    description: 'GSTIN is required for business customers claiming input credit',
    advanced: true,
    fields: [
      { name: 'gstin', label: 'GSTIN', type: 'text', span: 12 },
      {
        name: 'creditLimit',
        label: 'Credit Limit',
        type: 'money',
        span: 12,
        help: 'Leave blank for cash-only customers',
      },
    ],
  },
]

export default function CustomerCreate() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const createCustomer = useWorkshopStore((s) => s.createCustomer)
  const branchId = useAppStore((s) => s.branchId)

  return (
    <T05Form<CustomerInput>
      mode="create"
      variant="page"
      title="Add Customer"
      description="One customer record is shared across every module — never duplicated."
      sections={SECTIONS}
      schema={customerSchema}
      initialValues={{ type: 'Individual', state: 'Maharashtra', city: 'Pune' }}
      allowSaveAndNew
      onSubmit={async (values) => {
        const customer = createCustomer({
          branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
          name: values.name,
          type: values.type,
          mobile: values.mobile,
          altMobile: values.altMobile || undefined,
          email: values.email || undefined,
          addressLine: values.addressLine,
          city: values.city,
          state: values.state,
          pincode: values.pincode || undefined,
          gstin: values.gstin || undefined,
          creditLimit: values.creditLimit ? toPaise(values.creditLimit) : 0,
        })
        message.success(`${customer.name} created (${customer.code})`)
        navigate(`/crm/customers/${customer.id}/overview`)
      }}
      onCancel={() => navigate('/crm/customers')}
    />
  )
}
