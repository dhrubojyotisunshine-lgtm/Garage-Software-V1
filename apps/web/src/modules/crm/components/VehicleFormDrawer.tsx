import { App } from 'antd'
import { T05Form, type FormSectionDef } from '@garage/ui'
import { vehicleSchema, type Vehicle, type VehicleInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { MANUFACTURERS } from '@/store/seed'

/**
 * Quick Add Vehicle — T05 drawer variant.
 *
 * Contextual creation that keeps the parent record visible. Used from Customer
 * 360 and from Job Card creation, so a vehicle is never entered twice.
 * Ref: 03_PAGE_TEMPLATES.md §16, Workshop §19
 */

const SECTIONS: FormSectionDef[] = [
  {
    key: 'identity',
    title: 'Vehicle',
    fields: [
      {
        name: 'registration',
        label: 'Registration Number',
        type: 'text',
        required: true,
        span: 12,
        placeholder: 'MH12AB4582',
      },
      {
        name: 'manufacturer',
        label: 'Manufacturer',
        type: 'select',
        required: true,
        span: 12,
        options: MANUFACTURERS.map((m) => ({ label: m, value: m })),
      },
      { name: 'model', label: 'Model', type: 'text', required: true, span: 12 },
      { name: 'variant', label: 'Variant', type: 'text', span: 12 },
      {
        name: 'fuelType',
        label: 'Fuel Type',
        type: 'select',
        required: true,
        span: 12,
        options: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map((v) => ({
          label: v,
          value: v,
        })),
      },
      {
        name: 'transmission',
        label: 'Transmission',
        type: 'select',
        span: 12,
        options: ['Manual', 'Automatic', 'AMT', 'CVT'].map((v) => ({ label: v, value: v })),
      },
      { name: 'colour', label: 'Colour', type: 'text', span: 12 },
      { name: 'manufacturingYear', label: 'Manufacturing Year', type: 'number', span: 12 },
    ],
  },
  {
    key: 'identifiers',
    title: 'Identifiers',
    advanced: true,
    fields: [
      { name: 'vin', label: 'VIN / Chassis Number', type: 'text', span: 12 },
      { name: 'engineNumber', label: 'Engine Number', type: 'text', span: 12 },
    ],
  },
]

export function VehicleFormDrawer({
  open,
  customerId,
  onClose,
  onCreated,
  quickMode,
  vehicle: editing,
}: {
  open: boolean
  customerId: string
  onClose: () => void
  onCreated?: (vehicle: Vehicle) => void
  quickMode?: boolean
  /** Supplied to edit an existing vehicle instead of creating one. */
  vehicle?: Vehicle
}) {
  const { message } = App.useApp()
  const createVehicle = useWorkshopStore((s) => s.createVehicle)
  const updateVehicle = useWorkshopStore((s) => s.updateVehicle)
  const branchId = useAppStore((s) => s.branchId)

  if (!open) return null

  const isEdit = Boolean(editing)

  return (
    <T05Form<VehicleInput>
      mode={isEdit ? 'edit' : 'create'}
      variant="drawer"
      open={open}
      title={isEdit ? `Edit ${editing!.registration}` : 'Add Vehicle'}
      sections={SECTIONS}
      quickMode={quickMode}
      schema={vehicleSchema}
      initialValues={
        editing
          ? {
              registration: editing.registration,
              manufacturer: editing.manufacturer,
              model: editing.model,
              variant: editing.variant ?? '',
              fuelType: editing.fuelType,
              transmission: editing.transmission,
              colour: editing.colour ?? '',
              manufacturingYear: editing.manufacturingYear,
              vin: editing.vin ?? '',
              engineNumber: editing.engineNumber ?? '',
            }
          : { fuelType: 'Petrol' }
      }
      onSubmit={async (values) => {
        const payload = {
          registration: values.registration,
          manufacturer: values.manufacturer,
          model: values.model,
          variant: values.variant,
          fuelType: values.fuelType,
          transmission: values.transmission,
          colour: values.colour,
          manufacturingYear: values.manufacturingYear,
          vin: values.vin || undefined,
          engineNumber: values.engineNumber,
        }

        if (isEdit) {
          updateVehicle(editing!.id, payload)
          message.success(`${payload.registration} updated`)
          onClose()
          return
        }

        const vehicle = createVehicle({
          branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
          customerId,
          ...payload,
        })
        message.success(`${vehicle.registration} added`)
        onCreated?.(vehicle)
        onClose()
      }}
      onCancel={onClose}
    />
  )
}
