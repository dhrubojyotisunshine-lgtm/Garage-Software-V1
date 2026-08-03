import { App } from 'antd'
import { T05Form, type FormSectionDef } from '@garage/ui'
import { customerSchema, type Customer, type CustomerInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Quick Add Customer — T05 drawer, reduced field set.
 *
 * Workshop §17: creating a customer mid-process must not lose the job card
 * being created. Full customer creation lives at /crm/customers/new.
 */

const QUICK_SECTIONS: FormSectionDef[] = [
  {
    key: 'quick',
    title: 'Customer',
    fields: [
      { name: 'name', label: 'Customer Name', type: 'text', required: true, span: 24 },
      { name: 'mobile', label: 'Mobile', type: 'text', required: true, span: 12, prefix: '+91' },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        span: 12,
        options: [
          { label: 'Individual', value: 'Individual' },
          { label: 'Business', value: 'Business' },
        ],
      },
      { name: 'city', label: 'City', type: 'text', required: true, span: 12 },
      { name: 'state', label: 'State', type: 'text', required: true, span: 12 },
    ],
  },
]

export function CustomerQuickAddDrawer({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated?: (customer: Customer) => void
}) {
  const { message } = App.useApp()
  const createCustomer = useWorkshopStore((s) => s.createCustomer)
  const branchId = useAppStore((s) => s.branchId)

  if (!open) return null

  return (
    <T05Form<CustomerInput>
      mode="create"
      variant="drawer"
      open={open}
      title="Quick Add Customer"
      sections={QUICK_SECTIONS}
      schema={customerSchema}
      initialValues={{ type: 'Individual', city: 'Pune', state: 'Maharashtra' }}
      onSubmit={async (values) => {
        const customer = createCustomer({
          branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
          name: values.name,
          type: values.type,
          mobile: values.mobile,
          city: values.city,
          state: values.state,
          creditLimit: 0,
        })
        message.success(`${customer.name} added (${customer.code})`)
        onCreated?.(customer)
        onClose()
      }}
      onCancel={onClose}
    />
  )
}
