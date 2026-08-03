import { App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { NotFoundState, T05Form, type FormSectionDef } from '@garage/ui'
import { supplierSchema, type SupplierInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/** Add / Edit Supplier (T05). */

const SECTIONS: FormSectionDef[] = [
  {
    key: 'basic',
    title: 'Supplier',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true, span: 8 },
      { name: 'lastName', label: 'Last Name', type: 'text', span: 8 },
      { name: 'companyName', label: 'Company Name', type: 'text', required: true, span: 8 },
      { name: 'email', label: 'Email', type: 'text', span: 12 },
      { name: 'mobile', label: 'Mobile', type: 'text', span: 12, prefix: '+91' },
      {
        name: 'productNames',
        label: 'Product Name',
        type: 'textarea',
        span: 24,
        rows: 2,
        help: 'Products this supplier provides, separated by commas',
      },
    ],
  },
  {
    key: 'address',
    title: 'Address & Tax',
    advanced: true,
    fields: [
      { name: 'addressLine', label: 'Address', type: 'textarea', span: 24, rows: 2 },
      { name: 'city', label: 'City', type: 'text', span: 8 },
      { name: 'state', label: 'State', type: 'text', span: 8 },
      { name: 'pincode', label: 'PIN Code', type: 'text', span: 8 },
      { name: 'gstin', label: 'GSTIN', type: 'text', span: 12 },
    ],
  },
]

export default function SupplierForm() {
  const navigate = useNavigate()
  const params = useParams()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const branchId = useAppStore((s) => s.branchId)

  const isEdit = Boolean(params.id)
  const existing = isEdit ? store.supplierById(params.id) : undefined

  if (isEdit && !existing) return <NotFoundState what="supplier" />

  return (
    <T05Form<SupplierInput>
      mode={isEdit ? 'edit' : 'create'}
      variant="page"
      title={isEdit ? `Edit ${existing!.companyName}` : 'Add Supplier'}
      description="One supplier record serves Inventory and Purchase alike."
      sections={SECTIONS}
      schema={supplierSchema}
      allowSaveAndNew={!isEdit}
      initialValues={
        existing
          ? {
              firstName: existing.firstName,
              lastName: existing.lastName ?? '',
              companyName: existing.companyName,
              email: existing.email ?? '',
              mobile: existing.mobile ?? '',
              productNames: existing.productNames.join(', '),
              addressLine: existing.addressLine ?? '',
              city: existing.city ?? '',
              state: existing.state ?? '',
              pincode: existing.pincode ?? '',
              gstin: existing.gstin ?? '',
            }
          : { state: 'Maharashtra', city: 'Pune' }
      }
      onSubmit={async (values) => {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          email: values.email || undefined,
          mobile: values.mobile || undefined,
          // Comma-separated in the form, an array in the record.
          productNames: (values.productNames ?? '')
            .split(',')
            .map((p) => p.trim())
            .filter(Boolean),
          addressLine: values.addressLine,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          gstin: values.gstin || undefined,
        }

        if (isEdit) {
          store.updateSupplier(existing!.id, payload)
          message.success('Supplier updated')
        } else {
          const created = store.createSupplier({
            branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
            ...payload,
          })
          message.success(`${created.companyName} added (${created.code})`)
        }
        navigate('/inventory/suppliers')
      }}
      onCancel={() => navigate('/inventory/suppliers')}
    />
  )
}
