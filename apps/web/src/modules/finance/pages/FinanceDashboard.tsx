import { useMemo } from 'react'
import { Col, Empty, List, Progress, Tag } from 'antd'
import { DollarOutlined, FileDoneOutlined, WalletOutlined, WarningOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  DashboardWidget,
  MoneyText,
  T01Dashboard,
  palette,
  type AttentionItemDef,
  type KpiDef,
} from '@garage/ui'
import {
  AGEING_BUCKETS,
  ageingSummary,
  collectedBetween,
  collectionByMode,
  formatRelative,
  outstandingByCustomer,
  overdueOnly,
  receiptsFrom,
  receivablesFrom,
  totalBilled,
  totalCollected,
  totalOutstanding,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Finance Dashboard (T01).
 *
 * Everything is derived from job cards — billed, collected and outstanding can
 * never disagree with the documents behind them.
 */
export default function FinanceDashboard() {
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const { branchId, branches } = useAppStore()
  const branchName = branches.find((b) => b.id === branchId)?.name ?? 'All Branches'

  const stats = useMemo(() => {
    const receivables = receivablesFrom(store.jobCards)
    const receipts = receiptsFrom(store.jobCards)
    const now = Date.now()
    const startOfToday = new Date().setHours(0, 0, 0, 0)
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()

    return {
      receivables,
      receipts,
      billed: totalBilled(store.jobCards),
      collected: totalCollected(store.jobCards),
      outstanding: totalOutstanding(receivables),
      overdue: overdueOnly(receivables),
      ageing: ageingSummary(receivables),
      byMode: collectionByMode(receipts),
      today: collectedBetween(receipts, startOfToday, now),
      month: collectedBetween(receipts, startOfMonth, now),
      topDebtors: outstandingByCustomer(receivables).slice(0, 6),
      uninvoiced: store.jobCards.filter(
        (j) => !j.invoiceNo && j.status === 'Repair Completed',
      ),
    }
  }, [store])

  const collectionRate =
    stats.billed > 0 ? Math.round((stats.collected / stats.billed) * 100) : 0

  const kpis: KpiDef[] = [
    {
      key: 'outstanding',
      label: 'Outstanding',
      value: stats.outstanding,
      type: 'money',
      higherIsBetter: false,
      icon: <WarningOutlined />,
      href: '/finance/receivables',
    },
    {
      key: 'billed',
      label: 'Total Billed',
      value: stats.billed,
      type: 'money',
      icon: <FileDoneOutlined />,
      href: '/finance/receivables',
    },
    {
      key: 'collected',
      label: 'Total Collected',
      value: stats.collected,
      type: 'money',
      icon: <DollarOutlined />,
      href: '/finance/transactions',
    },
    {
      key: 'today',
      label: 'Collected Today',
      value: stats.today,
      type: 'money',
      icon: <WalletOutlined />,
      href: '/finance/transactions',
    },
    {
      key: 'rate',
      label: 'Collection Rate',
      value: `${collectionRate}%`,
      href: '/finance/receivables',
    },
  ]

  const attention: AttentionItemDef[] = [
    ...(stats.overdue.length
      ? [
          {
            key: 'overdue',
            severity: 'critical' as const,
            label: 'Invoices past due date',
            count: stats.overdue.length,
            href: '/finance/receivables',
          },
        ]
      : []),
    ...(stats.ageing['Over 90 days'].count
      ? [
          {
            key: 'aged',
            severity: 'critical' as const,
            label: 'Invoices outstanding over 90 days',
            count: stats.ageing['Over 90 days'].count,
            href: '/finance/receivables',
          },
        ]
      : []),
    ...(stats.uninvoiced.length
      ? [
          {
            key: 'uninvoiced',
            severity: 'warning' as const,
            label: 'Completed jobs not yet invoiced',
            count: stats.uninvoiced.length,
            href: '/workshop/job-cards',
          },
        ]
      : []),
  ]

  return (
    <T01Dashboard
      title="Finance & Accounts"
      description="Receivables, collection and cash position"
      context={`${branchName} · Today`}
      kpis={kpis}
      attention={attention}
      onNavigate={navigate}
      quickActions={[
        {
          key: 'receivables',
          label: 'Receivables',
          type: 'primary',
          onClick: () => navigate('/finance/receivables'),
        },
        { key: 'txns', label: 'Transactions', onClick: () => navigate('/finance/transactions') },
      ]}
    >
      <Col xs={24} lg={12}>
        <DashboardWidget
          title="Receivables Ageing"
          viewAllHref="/finance/receivables"
          onNavigate={navigate}
        >
          {stats.receivables.length ? (
            <List
              size="small"
              dataSource={AGEING_BUCKETS.map((b) => ({ bucket: b, ...stats.ageing[b] }))}
              renderItem={(row) => (
                <List.Item
                  style={{ paddingInline: 4, cursor: 'pointer' }}
                  onClick={() => navigate('/finance/receivables')}
                  extra={<MoneyText value={row.amount} strong />}
                >
                  <List.Item.Meta
                    title={<span style={{ fontSize: 13 }}>{row.bucket}</span>}
                    description={
                      <span style={{ fontSize: 12, color: palette.neutral[500] }}>
                        {row.count} invoice{row.count === 1 ? '' : 's'}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing outstanding" />
          )}
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={12}>
        <DashboardWidget title="Collection" onNavigate={navigate}>
          <div style={{ padding: '4px 4px 12px' }}>
            <div style={{ fontSize: 12, color: palette.neutral[500], marginBottom: 4 }}>
              Collected against billed
            </div>
            <Progress
              percent={collectionRate}
              strokeColor={collectionRate >= 80 ? palette.success[500] : palette.warning[500]}
            />
          </div>
          <List
            size="small"
            dataSource={(Object.keys(stats.byMode) as Array<keyof typeof stats.byMode>)
              .filter((m) => stats.byMode[m] > 0)
              .map((m) => ({ mode: m, amount: stats.byMode[m] }))}
            locale={{ emptyText: 'No payments recorded yet' }}
            renderItem={(row) => (
              <List.Item style={{ paddingInline: 4 }}>
                <span style={{ fontSize: 13 }}>{row.mode}</span>
                <MoneyText value={row.amount} strong />
              </List.Item>
            )}
          />
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={12}>
        <DashboardWidget
          title="Who Owes the Most"
          viewAllHref="/finance/receivables"
          onNavigate={navigate}
        >
          {stats.topDebtors.length ? (
            <List
              size="small"
              dataSource={stats.topDebtors}
              renderItem={(d) => {
                const customer = store.customerById(d.customerId)
                return (
                  <List.Item
                    style={{ paddingInline: 4, cursor: 'pointer' }}
                    onClick={() => navigate(`/crm/customers/${d.customerId}/overview`)}
                    extra={<MoneyText value={d.balance} strong />}
                  >
                    <List.Item.Meta
                      title={<span style={{ fontSize: 13 }}>{customer?.name ?? '—'}</span>}
                      description={
                        <span style={{ fontSize: 12 }}>
                          {d.invoiceCount} invoice{d.invoiceCount === 1 ? '' : 's'} · oldest{' '}
                          {d.oldestAgeDays} days
                          {d.oldestAgeDays > 90 ? (
                            <Tag color="red" style={{ marginLeft: 6 }}>
                              Aged
                            </Tag>
                          ) : null}
                        </span>
                      }
                    />
                  </List.Item>
                )
              }}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No outstanding balances" />
          )}
        </DashboardWidget>
      </Col>

      <Col xs={24} lg={12}>
        <DashboardWidget
          title="Recent Receipts"
          viewAllHref="/finance/transactions"
          onNavigate={navigate}
        >
          {stats.receipts.length ? (
            <List
              size="small"
              dataSource={stats.receipts.slice(0, 7)}
              renderItem={(r) => (
                <List.Item
                  style={{ paddingInline: 4, cursor: 'pointer' }}
                  onClick={() => navigate(`/workshop/job-cards/${r.sourceId}/invoice`)}
                  extra={<MoneyText value={r.amount} strong />}
                >
                  <List.Item.Meta
                    title={
                      <span className="erp-mono" style={{ fontSize: 13 }}>
                        {r.receiptNo}
                      </span>
                    }
                    description={
                      <span style={{ fontSize: 12 }}>
                        {store.customerById(r.customerId)?.name} · {r.mode} ·{' '}
                        {formatRelative(r.receivedAt)}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No receipts yet" />
          )}
        </DashboardWidget>
      </Col>
    </T01Dashboard>
  )
}
