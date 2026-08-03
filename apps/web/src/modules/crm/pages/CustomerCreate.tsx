import { App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { NotFoundState, T05Form, type FormSectionDef } from '@garage/ui'
import { customerSchema, toPaise, toRupees, type CustomerInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Add / Edit Customer (T05, page variant).
 *
 * One screen serves both modes — the only difference is the initial values and
 * which store action runs on submit.
 */

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
  const params = useParams()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const branchId = useAppStore((s) => s.branchId)

  const isEdit = Boolean(params.id)
  const existing = isEdit ? store.customerById(params.id) : undefined

  if (isEdit && !existing) return <NotFoundState what="customer" />

  const resolvedBranch = branchId === '__all__' ? 'br-pune-main' : branchId

  return (
    <T05Form<CustomerInput>
      mode={isEdit ? 'edit' : 'create'}
      variant="page"
      title={isEdit ? `Edit ${existing!.name}` : 'Add Customer'}
      description="One customer record is shared across every module — never duplicated."
      sections={SECTIONS}
      schema={customerSchema}
      allowSaveAndNew={!isEdit}
      initialValues={
        existing
          ? {
              name: existing.name,
              type: existing.type,
              mobile: existing.mobile,
              altMobile: existing.altMobile ?? '',
              email: existing.email ?? '',
              addressLine: existing.addressLine ?? '',
              city: existing.city,
              state: existing.state,
              pincode: existing.pincode ?? '',
              gstin: existing.gstin ?? '',
              // Stored as paise; the form works in rupees.
              creditLimit: existing.creditLimit ? toRupees(existing.creditLimit) : undefined,
            }
          : { type: 'Individual', state: 'Maharashtra', city: 'Pune' }
      }
      onSubmit={async (values) => {
        const payload = {
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
        }

        if (isEdit) {
          store.updateCustomer(existing!.id, payload)
          message.success('Customer updated')
          navigate(`/crm/customers/${existing!.id}/overview`)
          return
        }

        const customer = store.createCustomer({ branchId: resolvedBranch, ...payload })
        message.success(`${customer.name} created (${customer.code})`)
        navigate(`/crm/customers/${customer.id}/overview`)
      }}
      onCancel={() =>
        navigate(isEdit ? `/crm/customers/${existing!.id}/overview` : '/crm/customers')
      }
    />
  )
}
