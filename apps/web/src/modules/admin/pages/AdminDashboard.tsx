import { Col, List, Progress, Tag } from 'antd'
import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  TeamOutlined,
  WarningOutlined,
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
import { DemoBanner } from '@/modules/demo/DemoBanner'

/**
 * Super Admin dashboard (T01).
 *
 * The platform view: which garages are subscribed, what they pay, what needs
 * attention. Distinct from a garage's own Workshop dashboard.
 *
 * FIGURES ARE ILLUSTRATIVE. There is no tenant, subscription or ticket data
 * model yet — this establishes the shell and the shape of the screen so the
 * direction can be checked before any of that is built.
 */

const KPIS: KpiDef[] = [
  {
    key: 'garages',
    label: 'Active Garages',
    value: '48',
    type: 'text',
    delta: 6.4,
    icon: <ShopOutlined />,
    href: '/admin/garages',
  },
  {
    key: 'users',
    label: 'Platform Users',
    value: '512',
    delta: 8.1,
    icon: <TeamOutlined />,
    href: '/admin/users',
  },
  {
    key: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: 84200000,
    type: 'money',
    delta: 11.2,
    icon: <CreditCardOutlined />,
    href: '/admin/subscriptions',
  },
  {
    key: 'expiring',
    label: 'Expiring in 30 Days',
    value: '7',
    higherIsBetter: false,
    icon: <WarningOutlined />,
    href: '/admin/renewals',
  },
  {
    key: 'tickets',
    label: 'Open Tickets',
    value: '13',
    higherIsBetter: false,
    icon: <CustomerServiceOutlined />,
    href: '/admin/support',
  },
]

const ATTENTION: AttentionItemDef[] = [
  {
    key: 'overdue',
    severity: 'critical',
    label: 'Subscriptions past due',
    count: 3,
    href: '/admin/billing',
  },
  {
    key: 'expiring',
    severity: 'critical',
    label: 'Plans expiring this week',
    count: 4,
    href: '/admin/renewals',
  },
  {
    key: 'tickets',
    severity: 'warning',
    label: 'Tickets unanswered over 24 hours',
    count: 5,
    href: '/admin/support',
  },
  {
    key: 'onboarding',
    severity: 'info',
    label: 'Garages still in onboarding',
    count: 2,
    href: '/admin/onboarding',
  },
]

const RECENT_GARAGES = [
  { name: 'Shree Auto Care', city: 'Pune', plan: 'Professional', users: 21, status: 'Active', tone: 'success' as const },
  { name: 'Speedline Motors', city: 'Mumbai', plan: 'Enterprise', users: 46, status: 'Active', tone: 'success' as const },
  { name: 'Krishna Garage', city: 'Nashik', plan: 'Starter', users: 6, status: 'Trial', tone: 'progress' as const },
  { name: 'AutoFix Hub', city: 'Bengaluru', plan: 'Professional', users: 18, status: 'Past Due', tone: 'failure' as const },
  { name: 'Sai Service Point', city: 'Nagpur', plan: 'Starter', users: 4, status: 'Onboarding', tone: 'waiting' as const },
]

const PLANS = [
  { name: 'Starter', garages: 19, revenue: 9500000, share: 40 },
  { name: 'Professional', garages: 21, revenue: 42000000, share: 44 },
  { name: 'Enterprise', garages: 8, revenue: 32700000, share: 16 },
]

const TICKETS = [
  { ref: 'TKT-004182', subject: 'GST rate not applying on invoice', garage: 'Speedline Motors', tone: 'action' as const, status: 'Open' },
  { ref: 'TKT-004181', subject: 'Cannot issue part — stock mismatch', garage: 'Shree Auto Care', tone: 'action' as const, status: 'Open' },
  { ref: 'TKT-004179', subject: 'Add second branch to plan', garage: 'AutoFix Hub', tone: 'progress' as const, status: 'In Progress' },
  { ref: 'TKT-004176', subject: 'Payment gateway timeout', garage: 'Krishna Garage', tone: 'waiting' as const, status: 'Awaiting Reply' },
  { ref: 'TKT-004170', subject: 'Export payroll to Excel', garage: 'Sai Service Point', tone: 'closed' as const, status: 'Resolved' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <DemoBanner module="Super Admin" />

      <T01Dashboard
        title="Platform Overview"
        description="Garages, subscriptions and support across the platform"
        context="All tenants · Today"
        kpis={KPIS}
        attention={ATTENTION}
        onNavigate={navigate}
        quickActions={[
          { key: 'garage', label: 'Add Garage', type: 'primary', disabled: true, disabledReason: 'Not built yet' },
          { key: 'plan', label: 'Create Plan', disabled: true, disabledReason: 'Not built yet' },
          { key: 'ticket', label: 'Open Ticket', disabled: true, disabledReason: 'Not built yet' },
        ]}
      >
        <Col xs={24} lg={14}>
          <DashboardWidget title="Recently Active Garages" onNavigate={navigate}>
            <List
              size="small"
              dataSource={RECENT_GARAGES}
              renderItem={(g) => (
                <List.Item
                  style={{ paddingInline: 4 }}
                  extra={<StatusChip label={g.status} tone={g.tone} size="small" />}
                >
                  <List.Item.Meta
                    title={<span style={{ fontSize: 13, fontWeight: 500 }}>{g.name}</span>}
                    description={
                      <span style={{ fontSize: 12, color: palette.neutral[500] }}>
                        {g.city} · {g.plan} · {g.users} users
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </DashboardWidget>
        </Col>

        <Col xs={24} lg={10}>
          <DashboardWidget title="Revenue by Plan" onNavigate={navigate}>
            <div style={{ padding: '4px 4px 8px' }}>
              {PLANS.map((p) => (
                <div key={p.name} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      marginBottom: 2,
                    }}
                  >
                    <span>
                      {p.name}{' '}
                      <span style={{ color: palette.neutral[400], fontSize: 11 }}>
                        · {p.garages} garages
                      </span>
                    </span>
                    <MoneyText value={p.revenue} strong />
                  </div>
                  <Progress
                    percent={p.share}
                    showInfo={false}
                    size="small"
                    strokeColor={palette.primary[500]}
                  />
                </div>
              ))}
            </div>
          </DashboardWidget>
        </Col>

        <Col xs={24}>
          <DashboardWidget title="Support Queue" viewAllHref="/admin/support" onNavigate={navigate}>
            <List
              size="small"
              dataSource={TICKETS}
              renderItem={(t) => (
                <List.Item
                  style={{ paddingInline: 4 }}
                  extra={<StatusChip label={t.status} tone={t.tone} size="small" />}
                >
                  <List.Item.Meta
                    title={
                      <span style={{ fontSize: 13 }}>
                        <span className="erp-mono">{t.ref}</span>{' '}
                        <span style={{ fontWeight: 500 }}>{t.subject}</span>
                      </span>
                    }
                    description={
                      <span style={{ fontSize: 12, color: palette.neutral[500] }}>
                        <Tag style={{ marginInlineEnd: 6, fontSize: 10 }}>{t.garage}</Tag>
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </DashboardWidget>
        </Col>
      </T01Dashboard>
    </div>
  )
}
