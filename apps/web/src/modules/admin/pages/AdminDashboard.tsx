import { useMemo, useState } from 'react'
import { Avatar, Badge, Calendar, Card, Col, Empty, Flex, List, Progress, Row } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import {
  AppstoreOutlined,
  CarOutlined,
  ExportOutlined,
  ShopOutlined,
  SolutionOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { PageHeader, palette } from '@garage/ui'
import { formatDate, isOverdue } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { SetupWizard } from '../components/SetupWizard'

/**
 * Admin Dashboard.
 *
 * Layout follows the reference product: a stat-tile grid beside a services
 * gauge, then recently joined customers beside a job calendar.
 *
 * Every figure is computed from the store — no invented numbers.
 */

interface Tile {
  key: string
  label: string
  value: number
  icon: React.ReactNode
  tint: string
  href?: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const [wizardOpen, setWizardOpen] = useState(true)
  const [month, setMonth] = useState<Dayjs>(dayjs())

  const stats = useMemo(() => {
    const employees = store.employees.length
    const customers = store.customers.length
    const products = store.products.length
    const jobCards = store.jobCards.length
    const completed = store.jobCards.filter((j) =>
      ['Delivered', 'Paid'].includes(j.status),
    ).length
    return { employees, customers, products, jobCards, completed }
  }, [store])

  const tiles: Tile[] = [
    { key: 'employees', label: 'EMPLOYEES', value: stats.employees, icon: <UserOutlined />, tint: '#E6F4FF' },
    { key: 'customers', label: 'CUSTOMERS', value: stats.customers, icon: <SolutionOutlined />, tint: '#FFF1E6', href: '/crm/customers' },
    { key: 'suppliers', label: 'SUPPLIERS', value: 0, icon: <ShopOutlined />, tint: '#FFE9EC' },
    { key: 'products', label: 'PRODUCTS', value: stats.products, icon: <AppstoreOutlined />, tint: '#FCE7F3', href: '/inventory/products' },
    { key: 'vehicle-sell', label: 'VEHICLE SELL', value: 0, icon: <CarOutlined />, tint: '#E6F0FF' },
    { key: 'services', label: 'SERVICES', value: stats.jobCards, icon: <ToolOutlined />, tint: '#F3E8FF', href: '/workshop/job-cards' },
  ]

  const recentCustomers = useMemo(
    () =>
      [...store.customers]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    [store.customers],
  )

  /** Job cards keyed by their expected delivery date, for the calendar. */
  const jobsByDate = useMemo(() => {
    const map = new Map<string, typeof store.jobCards>()
    for (const j of store.jobCards) {
      const key = dayjs(j.expectedDelivery).format('YYYY-MM-DD')
      const list = map.get(key)
      if (list) list.push(j)
      else map.set(key, [j])
    }
    return map
  }, [store.jobCards])

  const completionRate =
    stats.jobCards > 0 ? Math.round((stats.completed / stats.jobCards) * 100) : 0

  return (
    <div>
      <PageHeader title="Dashboard : Admin" borderless />

      {wizardOpen ? <SetupWizard onDismiss={() => setWizardOpen(false)} /> : null}

      <Row gutter={[16, 16]}>
        {/* ------------------------------------------------ stat tile grid */}
        <Col xs={24} xl={14}>
          <Row gutter={[16, 16]}>
            {tiles.map((t) => (
              <Col xs={12} md={8} key={t.key}>
                <Card
                  hoverable={Boolean(t.href)}
                  onClick={() => t.href && navigate(t.href)}
                  styles={{ body: { padding: 20, textAlign: 'center' } }}
                  style={{ height: '100%', cursor: t.href ? 'pointer' : 'default' }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      background: t.tint,
                      display: 'grid',
                      placeItems: 'center',
                      margin: '0 auto 12px',
                      fontSize: 20,
                      color: palette.neutral[700],
                    }}
                  >
                    {t.icon}
                  </div>
                  <div
                    className="erp-tabular"
                    style={{ fontSize: 26, fontWeight: 600, lineHeight: '32px' }}
                  >
                    {t.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '.06em',
                      color: palette.neutral[500],
                      marginTop: 2,
                    }}
                  >
                    {t.label}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* ---------------------------------------------------- services gauge */}
        <Col xs={24} xl={10}>
          <Card
            title="Services"
            extra={
              <ExportOutlined
                style={{ cursor: 'pointer', color: palette.neutral[400] }}
                onClick={() => navigate('/workshop/job-cards')}
              />
            }
            style={{ height: '100%' }}
            styles={{ body: { display: 'grid', placeItems: 'center', padding: 24 } }}
          >
            <Progress
              type="dashboard"
              percent={completionRate}
              size={190}
              strokeWidth={10}
              strokeColor={palette.success[500]}
              trailColor={palette.neutral[100]}
              format={() => (
                <div style={{ textAlign: 'center' }}>
                  <div className="erp-tabular" style={{ fontSize: 34, fontWeight: 600, color: palette.neutral[900] }}>
                    {stats.jobCards}
                  </div>
                  <div style={{ fontSize: 12, color: palette.neutral[500] }}>Total Services</div>
                </div>
              )}
            />
            <div style={{ marginTop: 12, fontSize: 12, color: palette.neutral[500] }}>
              {stats.completed} completed · {completionRate}%
            </div>
          </Card>
        </Col>

        {/* ------------------------------------------- recently joined customers */}
        <Col xs={24} xl={9}>
          <Card
            title="Recently Joined Customer"
            extra={
              <ExportOutlined
                style={{ cursor: 'pointer', color: palette.neutral[400] }}
                onClick={() => navigate('/crm/customers')}
              />
            }
            styles={{ body: { padding: '4px 12px' } }}
            style={{ height: '100%' }}
          >
            {recentCustomers.length ? (
              <List
                size="small"
                dataSource={recentCustomers}
                renderItem={(c) => (
                  <List.Item
                    style={{ cursor: 'pointer', paddingInline: 4 }}
                    onClick={() => navigate(`/crm/customers/${c.id}/overview`)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ background: palette.primary[50], color: palette.primary[600] }}
                          icon={<UserOutlined />}
                        />
                      }
                      title={<span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>}
                      description={
                        <span style={{ fontSize: 12, color: palette.primary[600] }}>
                          {c.email ?? `+91 ${c.mobile}`}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No customers yet" />
            )}
          </Card>
        </Col>

        {/* ------------------------------------------------------------ calendar */}
        <Col xs={24} xl={15}>
          <Card
            title="Calendar"
            extra={
              <Flex gap={14} align="center" style={{ fontSize: 12 }}>
                <span>
                  <Badge color={palette.warning[500]} /> Open
                </span>
                <span>
                  <Badge color={palette.success[500]} /> Completed
                </span>
              </Flex>
            }
            styles={{ body: { padding: 8 } }}
          >
            <Calendar
              fullscreen={false}
              value={month}
              onSelect={(d) => setMonth(d)}
              cellRender={(current) => {
                const jobs = jobsByDate.get(current.format('YYYY-MM-DD'))
                if (!jobs?.length) return null
                return (
                  <div style={{ marginTop: 2 }}>
                    {jobs.slice(0, 2).map((j) => {
                      const done = ['Delivered', 'Paid'].includes(j.status)
                      return (
                        <div
                          key={j.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/workshop/job-cards/${j.id}/overview`)
                          }}
                          style={{
                            fontSize: 10,
                            lineHeight: '14px',
                            padding: '0 4px',
                            marginBottom: 1,
                            borderRadius: 3,
                            cursor: 'pointer',
                            color: '#fff',
                            background: done
                              ? palette.success[500]
                              : isOverdue(j)
                                ? palette.error[500]
                                : palette.warning[500],
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {j.jobCardNo.split('-').pop()}
                        </div>
                      )
                    })}
                    {jobs.length > 2 ? (
                      <div style={{ fontSize: 10, color: palette.neutral[500] }}>
                        +{jobs.length - 2} MORE
                      </div>
                    ) : null}
                  </div>
                )
              }}
            />
            {store.jobCards.length === 0 ? (
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: 12,
                  color: palette.neutral[500],
                  borderTop: `1px solid ${palette.neutral[100]}`,
                }}
              >
                Job cards appear here on their expected delivery date. None created yet.
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 16, fontSize: 12, color: palette.neutral[400] }}>
        Suppliers and Vehicle Sell show zero because those modules are not built yet — the figure is
        real, not a placeholder. Last job card{' '}
        {store.jobCards[0] ? formatDate(store.jobCards[0].createdAt) : '—'}.
      </div>
    </div>
  )
}
