import { Button, Col, Empty, Row, Space, Tag } from 'antd'
import { UserSwitchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  DateTimeText,
  FieldGrid,
  MobileText,
  MoneyText,
  RegistrationText,
  SectionCard,
  StatusChip,
  TotalsPanel,
  palette,
} from '@garage/ui'
import {
  amountPaid,
  balanceDue,
  estimateTotals,
  invoiceTotals,
  isOverdue,
  paymentStatus,
  paymentStatusMap,
  resolveStatus,
  type JobCard,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { nextStepText } from '../components/NextStepBar'

/**
 * Overview answers Workshop §14: who, which vehicle, why, current status, who
 * is responsible, what is approved, what is pending, financial state, next step.
 */
export function OverviewTab({
  jobCard,
  onAssign,
}: {
  jobCard: JobCard
  onAssign: () => void
}) {
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const customer = store.customerById(jobCard.customerId)
  const vehicle = store.vehicleById(jobCard.vehicleId)
  const advisor = store.employeeById(jobCard.advisorId)
  const technician = store.employeeById(jobCard.technicianId)

  const est = estimateTotals(jobCard)
  const inv = invoiceTotals(jobCard)
  const paid = amountPaid(jobCard)
  const balance = balanceDue(jobCard)
  const payStatus = resolveStatus(paymentStatus(jobCard), paymentStatusMap)

  return (
    <Row gutter={16}>
      <Col xs={24} lg={16}>
        <SectionCard
          title="Customer & Vehicle"
          extra={
            customer ? (
              <Button size="small" type="link" onClick={() => navigate(`/crm/customers/${customer.id}/overview`)}>
                Open Customer 360
              </Button>
            ) : null
          }
        >
          <FieldGrid
            columns={3}
            rows={[
              { label: 'Customer', value: customer?.name },
              { label: 'Mobile', value: customer ? <MobileText value={customer.mobile} /> : null },
              { label: 'Customer Code', value: <span className="erp-mono">{customer?.code}</span> },
              {
                label: 'Registration',
                value: vehicle ? <RegistrationText value={vehicle.registration} /> : null,
              },
              {
                label: 'Vehicle',
                value: vehicle ? `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant ?? ''}`.trim() : null,
              },
              { label: 'Fuel / Transmission', value: `${vehicle?.fuelType ?? '—'} · ${vehicle?.transmission ?? '—'}` },
              { label: 'Odometer', value: `${jobCard.odometer.toLocaleString('en-IN')} km` },
              { label: 'Fuel Level', value: jobCard.fuelLevel },
              { label: 'VIN', value: vehicle?.vin ? <span className="erp-mono">{vehicle.vin}</span> : null },
            ]}
          />
        </SectionCard>

        <SectionCard title="Customer Complaint">
          {jobCard.complaints.length ? (
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
              {jobCard.complaints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No complaints recorded" />
          )}
        </SectionCard>

        <SectionCard
          title="Assignment"
          extra={
            <Button size="small" icon={<UserSwitchOutlined />} onClick={onAssign}>
              {jobCard.technicianId ? 'Reassign' : 'Assign Technician'}
            </Button>
          }
        >
          <FieldGrid
            columns={3}
            rows={[
              { label: 'Service Advisor', value: advisor?.name },
              {
                label: 'Technician',
                value: technician ? (
                  technician.name
                ) : (
                  <Tag color="orange" style={{ marginInlineEnd: 0 }}>
                    Not assigned
                  </Tag>
                ),
              },
              { label: 'Bay', value: jobCard.bay },
              { label: 'Service Type', value: jobCard.serviceType },
              { label: 'Priority', value: jobCard.priority },
              {
                label: 'Expected Delivery',
                value: (
                  <Space size={6}>
                    <DateTimeText value={jobCard.expectedDelivery} />
                    {isOverdue(jobCard) ? <StatusChip label="Overdue" tone="failure" size="small" /> : null}
                  </Space>
                ),
              },
            ]}
          />
        </SectionCard>
      </Col>

      <Col xs={24} lg={8}>
        <SectionCard title="Financial Summary">
          <TotalsPanel
            width="100%"
            lines={[
              ...Object.entries(inv.byType).map(([type, value]) => ({
                label: type,
                value: value as number,
              })),
              { label: 'Taxable Value', value: inv.taxable },
              { label: 'CGST', value: inv.cgst },
              { label: 'SGST', value: inv.sgst },
              { label: jobCard.invoiceNo ? 'Invoice Total' : 'Current Total', value: inv.total, emphasis: true },
              ...(jobCard.invoiceNo
                ? [
                    { label: 'Received', value: paid },
                    { label: 'Balance Due', value: balance, emphasis: true, negative: balance > 0 },
                  ]
                : []),
            ]}
          />
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <StatusChip label={payStatus.label} tone={payStatus.tone} />
          </div>
        </SectionCard>

        {est.itemCount > 0 && !jobCard.invoiceNo ? (
          <SectionCard title="Estimate">
            <div style={{ fontSize: 13, lineHeight: 1.9 }}>
              <div>
                Quoted: <MoneyText value={est.total} strong />
              </div>
              {jobCard.estimateApprovedAt ? (
                <div style={{ color: palette.success[700] }}>
                  Approved <DateTimeText value={jobCard.estimateApprovedAt} />
                </div>
              ) : jobCard.estimateSentAt ? (
                <div style={{ color: palette.action[700] }}>
                  Awaiting customer approval since <DateTimeText value={jobCard.estimateSentAt} />
                </div>
              ) : null}
            </div>
          </SectionCard>
        ) : null}

        <SectionCard title="What happens next">
          <div style={{ fontSize: 13, lineHeight: 1.9, color: palette.neutral[700] }}>
            {nextStepText(jobCard)}
          </div>
        </SectionCard>
      </Col>
    </Row>
  )
}
