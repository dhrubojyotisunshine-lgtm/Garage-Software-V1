import { useMemo } from 'react'
import { Col, Empty, List, Tag } from 'antd'
import {
  CarOutlined,
  DollarOutlined,
  FileTextOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  DashboardWidget,
  MoneyText,
  StatusChip,
  T01Dashboard,
  palette,
  type AttentionItemDef,
  type KpiDef,
} from '@garage/ui'
import {
  amountPaid,
  availableStock,
  balanceDue,
  formatDateTime,
  invoiceTotals,
  isOverdue,
  jobCardStatusMap,
  resolveStatus,
  sumPaise,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Workshop Dashboard (T01).
 *
 * Read + navigate only — never a transaction entry screen (04_ALL_MODULES §5).
 * Every KPI and widget row drills into a list or workspace.
 */
export default function WorkshopDashboard() {
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const { branchId, branches } = useAppStore()
  const branchName = branches.find((b) => b.id === branchId)?.name ?? 'All Branches'

  const stats = useMemo(() => {
    const jobs = store.jobCards
    const open = jobs.filter((j) => !['Delivered', 'Cancelled'].includes(j.status))
    const inRepair = jobs.filter((j) => j.status === 'Repair In Progress')
    const awaitingApproval = jobs.filter((j) => j.status === 'Approval Pending')
    const readyToInvoice = jobs.filter((j) => j.status === 'Repair Completed')
    const overdue = open.filter(isOverdue)
    const unassigned = open.filter((j) => !j.technicianId && j.status !== 'Draft')

    const invoiced = jobs.filter((j) => j.invoiceNo)
    const billed = sumPaise(invoiced.map((j) => invoiceTotals(j).total))
    const collected = sumPaise(jobs.map((j) => amountPaid(j)))
    const outstanding = sumPaise(jobs.map((j) => balanceDue(j)))

    const lowStock = store.products.filter(
      (p) => availableStock(p) <= p.reorderLevel && p.status === 'Active',
    )

    return {
      jobs,
      open,
      inRepair,
      awaitingApproval,
      readyToInvoice,
      overdue,
      unassigned,
      billed,
      collected,
      outstanding,
      lowStock,
      delivered: jobs.filter((j) => j.status === 'Delivered'),
    }
  }, [store])

  const kpis: KpiDef[] = [
    {
      key: 'open',
      label: 'Open Job Cards',
      value: stats.open.length,
      type: 'number',
      icon: <FileTextOutlined />,
      href: '/workshop/job-cards',
    },
    {
      key: 'repair',
      label: 'In Repair',
      value: stats.inRepair.length,
      type: 'number',
      icon: <ToolOutlined />,
      href: '/workshop/job-cards?status=Repair%20In%20Progress',
    },
    {
      key: 'delivered',
      label: 'Delivered',
      value: stats.delivered.length,
      type: 'number',
      icon: <CarOutlined />,
      href: '/workshop/job-cards',
    },
    {
      key: 'billed',
      label: 'Billed',
      value: stats.billed,
      type: 'money',
      icon: <DollarOutlined />,
      href: '/workshop/job-cards',
    },
    {
      key: 'outstanding',
      label: 'Outstanding',
      value: stats.outstanding,
      type: 'money',
      higherIsBetter: false,
      href: '/workshop/job-cards',
    },
  ]

  const attention: AttentionItemDef[] = [
    ...(stats.overdue.length
      ? [
          {
            key: 'overdue',
            severity: 'critical' as const,
            label: 'Overdue job cards',
            count: stats.overdue.length,
            href: '/workshop/job-cards',
          },
        ]
      : []),
    ...(stats.awaitingApproval.length
      ? [
          {
            key: 'approval',
            severity: 'critical' as const,
            label: 'Estimates awaiting approval',
            count: stats.awaitingApproval.length,
            href: '/workshop/job-cards',
          },
        ]
      : []),
    ...(stats.readyToInvoice.length
      ? [
          {
            key: 'invoice',
            severity: 'warning' as const,
            label: 'Ready to invoice',
            count: stats.readyToInvoice.length,
            href: '/workshop/job-cards',
          },
        ]
      : []),
    ...(stats.unassigned.length
      ? [
          {
            key: 'unassigned',
            severity: 'warning' as const,
            label: 'Job cards without a technician',
            count: stats.unassigned.length,
            href: '/workshop/job-cards',
          },
        ]
      : []),
    ...(stats.lowStock.length
      ? [
          {
            key: 'stock',
            severity: 'info' as const,
            label: 'Parts below reorder level',
            count: stats.lowStock.length,
            href: '/inventory/products',
          },
        ]
      : []),
  ]

  const active = stats.open.slice(0, 7)

  return (
    <T01Dashboard
      title="Workshop"
      description="Service operations overview"
      context={`${branchName} · Today`}
      kpis={kpis}
      attention={attention}
      onNavigate={navigate}
      quickActions={[
        {
          key: 'jc',
          label: 'New Job Card',
          type: 'primary',
          onClick: () => navigate('/workshop/job-cards/new'),
        },
        { key: 'cust', label: 'New Customer', onClick: () => navigate('/crm/customers/new') },
        { key: 'queue', label: 'Vehicle Queue', onClick: () => navigate('/workshop/queue') },
        { key: 'parts', label: 'Parts Lookup', onClick: () => navigate('/inventory/products') },
      ]}
    >
      <Col xs={24} lg={16}>
        <DashboardWidget
          title="Vehicles in Workshop"
          viewAllHref="/workshop/job-cards"
          onNavigate={navigate}
        >
          {active.length ? (
            <List
              size="small"
              dataSource={active}
              renderItem={(job) => {
                const vehicle = store.vehicleById(job.vehicleId)
                const customer = store.customerById(job.customerId)
                const tech = store.employeeById(job.technicianId)
                const s = resolveStatus(job.status, jobCardStatusMap, { overdue: isOverdue(job) })
                return (
                  <List.Item
                    style={{ cursor: 'pointer', paddingInline: 4 }}
                    onClick={() => navigate(`/workshop/job-cards/${job.id}/overview`)}
                    extra={<StatusChip label={s.label} tone={s.tone} overdue={isOverdue(job)} size="small" />}
                  >
                    <List.Item.Meta
                      title={
                        <span style={{ fontSize: 13 }}>
                          <span className="erp-mono">{vehicle?.registration}</span>{' '}
                          <span style={{ color: palette.neutral[500], fontWeight: 400 }}>
                            {vehicle?.manufacturer} {vehicle?.model}
                          </span>
                        </span>
                      }
                      description={
                        <span style={{ fontSize: 12 }}>
                          {job.jobCardNo} · {customer?.name} ·{' '}
                          {tech?.name ?? <Tag color="orange">Unassigned</Tag>}
                          {job.bay ? ` · Bay ${job.bay}` : ''}
                        </span>
                      }
                    />
                  </List.Item>
                )
              }}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No vehicles in the workshop"
              style={{ margin: '24px 0' }}
            />
          )}
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={8}>
        <DashboardWidget
          title="Low Stock Parts"
          viewAllHref="/inventory/products"
          onNavigate={navigate}
        >
          {stats.lowStock.length ? (
            <List
              size="small"
              dataSource={stats.lowStock.slice(0, 7)}
              renderItem={(p) => (
                <List.Item style={{ paddingInline: 4 }}>
                  <List.Item.Meta
                    title={<span style={{ fontSize: 13 }}>{p.name}</span>}
                    description={<span className="erp-mono" style={{ fontSize: 11 }}>{p.sku}</span>}
                  />
                  <Tag
                    color={availableStock(p) <= 0 ? 'red' : 'orange'}
                    style={{ marginInlineEnd: 0 }}
                  >
                    {availableStock(p)} {p.unit}
                  </Tag>
                </List.Item>
              )}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Stock levels healthy" />
          )}
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={8}>
        <DashboardWidget title="Payment Collection" onNavigate={navigate}>
          <List
            size="small"
            dataSource={[
              { label: 'Billed', value: stats.billed },
              { label: 'Collected', value: stats.collected },
              { label: 'Outstanding', value: stats.outstanding },
            ]}
            renderItem={(row) => (
              <List.Item style={{ paddingInline: 4 }}>
                <span style={{ fontSize: 13 }}>{row.label}</span>
                <MoneyText value={row.value} strong />
              </List.Item>
            )}
          />
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={16}>
        <DashboardWidget
          title="Expected Deliveries"
          viewAllHref="/workshop/job-cards"
          onNavigate={navigate}
        >
          {stats.open.length ? (
            <List
              size="small"
              dataSource={[...stats.open]
                .sort(
                  (a, b) =>
                    new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime(),
                )
                .slice(0, 5)}
              renderItem={(job) => {
                const vehicle = store.vehicleById(job.vehicleId)
                return (
                  <List.Item
                    style={{ cursor: 'pointer', paddingInline: 4 }}
                    onClick={() => navigate(`/workshop/job-cards/${job.id}/overview`)}
                    extra={<MoneyText value={invoiceTotals(job).total} />}
                  >
                    <List.Item.Meta
                      title={
                        <span className="erp-mono" style={{ fontSize: 13 }}>
                          {job.jobCardNo}
                        </span>
                      }
                      description={
                        <span
                          style={{
                            fontSize: 12,
                            color: isOverdue(job) ? palette.error[600] : undefined,
                          }}
                        >
                          {vehicle?.registration} · {formatDateTime(job.expectedDelivery)}
                          {isOverdue(job) ? ' · Overdue' : ''}
                        </span>
                      }
                    />
                  </List.Item>
                )
              }}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing scheduled" />
          )}
        </DashboardWidget>
      </Col>
    </T01Dashboard>
  )
}
