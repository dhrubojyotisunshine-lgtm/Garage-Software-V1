import { useMemo, useState } from 'react'
import { App, Button, Card, Flex, Progress, Tooltip } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  ExperimentOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { brand, palette } from '@garage/ui'
import { financialYearOf, toPaise } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Setup Wizard.
 *
 * Nine steps matching the reference product, but each step's completion is
 * derived from real data rather than being decorative — a step is green
 * because the records exist, and clicking an incomplete step goes to the
 * screen that completes it.
 */

interface Step {
  key: string
  label: string
  done: boolean
  path?: string
  /** Why the step cannot be completed yet, when it has no screen. */
  blocked?: string
}

export function SetupWizard({ onDismiss }: { onDismiss: () => void }) {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const { user, financialYear, branchId } = useAppStore()

  const [open, setOpen] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const steps: Step[] = useMemo(
    () => [
      { key: 'settings', label: 'Settings', done: true, path: '/admin/settings' },
      {
        key: 'customers',
        label: 'Customers',
        done: store.customers.length > 0,
        path: '/crm/customers',
      },
      {
        key: 'employees',
        label: 'Employees',
        done: store.employees.length > 0,
        path: '/admin/users/employees',
      },
      {
        key: 'suppliers',
        label: 'Suppliers',
        done: store.suppliers.length > 0,
        path: '/inventory/suppliers',
      },
      {
        key: 'vehicles',
        label: 'Vehicles',
        done: store.vehicles.length > 0,
        path: '/admin/vehicles',
      },
      {
        key: 'products',
        label: 'Products',
        done: store.products.length > 0,
        path: '/inventory/products',
      },
      {
        key: 'purchase',
        label: 'Purchase',
        done: false,
        blocked: 'Purchase is not built yet',
      },
      {
        key: 'observation',
        label: 'Observation Library',
        done: false,
        blocked: 'Observation Library is not built yet',
      },
      {
        key: 'jobcard',
        label: 'Job Card',
        done: store.jobCards.length > 0,
        path: '/workshop/job-cards',
      },
    ],
    [store],
  )

  const completed = steps.filter((s) => s.done).length
  const percent = Math.round((completed / steps.length) * 100)

  /** Creates a job card from existing seed records so the app looks alive. */
  const addSampleData = () => {
    const customer = store.customers[0]
    const vehicle = customer ? store.vehiclesOfCustomer(customer.id)[0] : undefined
    if (!customer || !vehicle) {
      message.warning('Add a customer with a vehicle first')
      return
    }

    setSeeding(true)
    const actor = user?.name ?? 'System'
    const jobCard = store.createJobCard(
      {
        branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
        financialYear: financialYear || financialYearOf(),
        customerId: customer.id,
        vehicleId: vehicle.id,
        complaints: ['Periodic service due', 'Brake noise at low speed'],
        serviceType: 'Periodic Service',
        priority: 'Normal',
        odometer: (vehicle.lastOdometer ?? 20000) + 1200,
        fuelLevel: '1/2',
        advisorId: store.advisors()[0]?.id ?? 'emp-1',
        expectedDelivery: new Date(Date.now() + 2 * 86_400_000).toISOString(),
      },
      actor,
    )

    store.addItem(
      jobCard.id,
      {
        type: 'Labour',
        name: 'Periodic Service — Paid Service',
        quantity: 2,
        unit: 'Hr',
        rate: toPaise(1250),
        discountPercent: 0,
        taxRate: 18,
        source: 'Estimate',
      },
      actor,
    )

    setSeeding(false)
    message.success(`Sample job card ${jobCard.jobCardNo} created`)
    navigate(`/workshop/job-cards/${jobCard.id}/overview`)
  }

  return (
    <Card size="small" style={{ marginBottom: 16 }} styles={{ body: { padding: '10px 14px' } }}>
      <Flex justify="space-between" align="center" gap={16} wrap>
        <Flex align="center" gap={14} wrap>
          <span style={{ fontWeight: 600 }}>Setup Wizard</span>
          <Button
            size="small"
            type="primary"
            icon={<ExperimentOutlined />}
            loading={seeding}
            onClick={addSampleData}
            style={{ background: palette.success[500] }}
          >
            Add Sample Data
          </Button>
          <span style={{ fontSize: 12, color: palette.neutral[500] }}>
            {completed} of {steps.length} complete
          </span>
          <Progress
            percent={percent}
            size="small"
            style={{ width: 120, marginBottom: 0 }}
            strokeColor={percent === 100 ? palette.success[500] : brand[500]}
          />
        </Flex>

        <Flex gap={14} style={{ color: palette.neutral[400] }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setOpen((v) => !v)}>
            {open ? <UpOutlined /> : <DownOutlined />}
          </span>
          <CloseOutlined style={{ cursor: 'pointer' }} onClick={onDismiss} />
        </Flex>
      </Flex>

      {open ? (
        <>
          <div style={{ height: 1, background: palette.neutral[200], margin: '12px 0' }} />
          <Flex gap={8} wrap justify="space-between">
            {steps.map((step) => {
              const clickable = Boolean(step.path)
              const body = (
                <Flex
                  vertical
                  align="center"
                  gap={6}
                  onClick={() => step.path && navigate(step.path)}
                  style={{
                    minWidth: 92,
                    flex: 1,
                    padding: '10px 4px',
                    borderRadius: 8,
                    cursor: clickable ? 'pointer' : 'not-allowed',
                    opacity: step.blocked ? 0.5 : 1,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 16,
                      color: '#fff',
                      background: step.done ? palette.success[500] : palette.neutral[300],
                    }}
                  >
                    {step.done ? <CheckOutlined /> : steps.indexOf(step) + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: step.done ? 600 : 400,
                      color: step.done ? palette.success[700] : palette.neutral[600],
                    }}
                  >
                    {step.label}
                  </span>
                </Flex>
              )

              return step.blocked ? (
                <Tooltip key={step.key} title={step.blocked}>
                  {body}
                </Tooltip>
              ) : (
                <div key={step.key} style={{ flex: 1, display: 'flex' }}>
                  {body}
                </div>
              )
            })}
          </Flex>
          <div style={{ fontSize: 12, color: palette.neutral[400], marginTop: 4 }}>
            A step turns green once the records exist. Click one to go to its screen.
          </div>
        </>
      ) : null}
    </Card>
  )
}
