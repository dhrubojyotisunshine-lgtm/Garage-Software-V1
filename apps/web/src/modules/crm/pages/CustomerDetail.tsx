import { useState } from 'react'
import { Button, Col, Empty, Row, Space } from 'antd'
import { CarOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import {
  DataTable,
  DateText,
  FieldGrid,
  MobileText,
  MoneyText,
  NotFoundState,
  RegistrationText,
  SectionCard,
  T04DetailPage,
  type ColumnDef,
  type SummaryMetric,
  type WorkspaceTabDef,
} from '@garage/ui'
import {
  balanceDue,
  invoiceTotals,
  jobCardStatusMap,
  sumPaise,
  type JobCard,
  type Vehicle,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { VehicleFormDrawer } from '../components/VehicleFormDrawer'

/**
 * Customer 360 (T04).
 *
 * A HUB — the job card tab links out to Workshop rather than reimplementing it.
 * No process progress bar, which is what makes this T04 and not T03.
 */

const TABS: WorkspaceTabDef[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'job-cards', label: 'Job Cards' },
]

const JOB_COLUMNS: ColumnDef<JobCard & Record<string, unknown>>[] = [
  { key: 'jobCardNo', title: 'Job Card', type: 'identifier', width: 160 },
  { key: 'serviceType', title: 'Service Type', width: 160 },
  { key: 'createdAt', title: 'Opened', type: 'date', width: 130 },
  { key: 'status', title: 'Status', type: 'status', statusMap: jobCardStatusMap, width: 170 },
]

const VEHICLE_COLUMNS: ColumnDef<Vehicle & Record<string, unknown>>[] = [
  { key: 'registration', title: 'Registration', type: 'registration', width: 150 },
  { key: 'manufacturer', title: 'Make', width: 140 },
  { key: 'model', title: 'Model', width: 130 },
  { key: 'variant', title: 'Variant', width: 110 },
  { key: 'fuelType', title: 'Fuel', width: 100 },
  { key: 'manufacturingYear', title: 'Year', type: 'number', width: 90 },
  { key: 'lastOdometer', title: 'Last Odometer', type: 'number', width: 140 },
]

export default function CustomerDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const activeTab = params.tab ?? 'overview'
  const [vehicleDrawer, setVehicleDrawer] = useState(false)

  const store = useWorkshopStore()
  const customer = store.customerById(params.id)

  if (!customer) return <NotFoundState what="customer" />

  const vehicles = store.vehiclesOfCustomer(customer.id)
  const jobs = store.jobCardsOfCustomer(customer.id)

  const totalPaid = sumPaise(jobs.flatMap((j) => j.payments.map((p) => p.amount)))
  const outstanding = sumPaise(jobs.map((j) => balanceDue(j)))
  const lifetimeBilled = sumPaise(jobs.filter((j) => j.invoiceNo).map((j) => invoiceTotals(j).total))

  const summary: SummaryMetric[] = [
    { key: 'vehicles', label: 'Vehicles', value: vehicles.length },
    { key: 'jobs', label: 'Job Cards', value: jobs.length },
    { key: 'billed', label: 'Lifetime Billed', value: lifetimeBilled, type: 'money' },
    { key: 'paid', label: 'Received', value: totalPaid, type: 'money', tone: 'success' },
    {
      key: 'outstanding',
      label: 'Outstanding',
      value: outstanding,
      type: 'money',
      tone: outstanding > 0 ? 'danger' : 'muted',
    },
  ]

  return (
    <>
      <T04DetailPage
        name={customer.name}
        chips={[
          { label: customer.status, tone: customer.status === 'Active' ? 'success' : 'neutral' },
          { label: customer.type, tone: 'progress' },
        ]}
        identity={[
          <MobileText key="m" value={customer.mobile} />,
          customer.city,
          <span key="code" className="erp-mono">
            {customer.code}
          </span>,
        ]}
        summary={summary}
        tabs={TABS.map((t) =>
          t.key === 'vehicles'
            ? { ...t, badge: vehicles.length }
            : t.key === 'job-cards'
              ? { ...t, badge: jobs.length }
              : t,
        )}
        activeTab={activeTab}
        onTabChange={(key) => navigate(`/crm/customers/${customer.id}/${key}`)}
        quickActions={[
          {
            key: 'jc',
            label: 'New Job Card',
            onClick: () => navigate(`/workshop/job-cards/new?customerId=${customer.id}`),
          },
          { key: 'veh', label: 'Add Vehicle', onClick: () => setVehicleDrawer(true) },
        ]}
      >
        {activeTab === 'overview' ? (
          <Row gutter={16}>
            <Col xs={24} lg={14}>
              <SectionCard title="Customer Information">
                <FieldGrid
                  columns={2}
                  rows={[
                    { label: 'Customer Code', value: <span className="erp-mono">{customer.code}</span> },
                    { label: 'Type', value: customer.type },
                    { label: 'Mobile', value: <MobileText value={customer.mobile} /> },
                    { label: 'Alternate', value: customer.altMobile ? <MobileText value={customer.altMobile} /> : null },
                    { label: 'Email', value: customer.email },
                    { label: 'GSTIN', value: customer.gstin ? <span className="erp-mono">{customer.gstin}</span> : null },
                    { label: 'Address', value: customer.addressLine, span: 2 },
                    { label: 'City', value: customer.city },
                    { label: 'State', value: customer.state },
                    { label: 'PIN Code', value: customer.pincode },
                    { label: 'Credit Limit', value: <MoneyText value={customer.creditLimit} /> },
                    { label: 'Customer Since', value: <DateText value={customer.createdAt} /> },
                  ]}
                />
              </SectionCard>
            </Col>

            <Col xs={24} lg={10}>
              <SectionCard
                title="Vehicles"
                extra={
                  <Button size="small" icon={<PlusOutlined />} onClick={() => setVehicleDrawer(true)}>
                    Add
                  </Button>
                }
              >
                {vehicles.length ? (
                  <Space direction="vertical" size={8} style={{ width: '100%' }}>
                    {vehicles.map((v) => (
                      <div
                        key={v.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 10px',
                          border: '1px solid #E2E8F0',
                          borderRadius: 6,
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>
                            <CarOutlined style={{ marginRight: 6, color: '#94A3B8' }} />
                            <RegistrationText value={v.registration} />
                          </div>
                          <div style={{ fontSize: 12, color: '#64748B' }}>
                            {v.manufacturer} {v.model} {v.variant} · {v.fuelType}
                          </div>
                        </div>
                        <Button
                          size="small"
                          type="link"
                          onClick={() =>
                            navigate(
                              `/workshop/job-cards/new?customerId=${customer.id}&vehicleId=${v.id}`,
                            )
                          }
                        >
                          New Job Card
                        </Button>
                      </div>
                    ))}
                  </Space>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No vehicles yet"
                    style={{ margin: '16px 0' }}
                  >
                    <Button type="primary" size="small" onClick={() => setVehicleDrawer(true)}>
                      Add Vehicle
                    </Button>
                  </Empty>
                )}
              </SectionCard>
            </Col>
          </Row>
        ) : activeTab === 'vehicles' ? (
          <SectionCard
            title="Vehicles"
            extra={
              <Button size="small" icon={<PlusOutlined />} onClick={() => setVehicleDrawer(true)}>
                Add Vehicle
              </Button>
            }
            padding={0}
          >
            <DataTable
              columns={VEHICLE_COLUMNS}
              rows={vehicles as (Vehicle & Record<string, unknown>)[]}
              rowKey="id"
              pagination={false}
              emptyText="No vehicles for this customer"
            />
          </SectionCard>
        ) : (
          <SectionCard title="Job Cards" padding={0}>
            <DataTable
              columns={JOB_COLUMNS}
              rows={jobs as (JobCard & Record<string, unknown>)[]}
              rowKey="id"
              pagination={false}
              onRowClick={(row) => navigate(`/workshop/job-cards/${row.id}/overview`)}
              emptyText="No job cards for this customer yet"
            />
          </SectionCard>
        )}
      </T04DetailPage>

      <VehicleFormDrawer
        open={vehicleDrawer}
        customerId={customer.id}
        onClose={() => setVehicleDrawer(false)}
      />
    </>
  )
}
