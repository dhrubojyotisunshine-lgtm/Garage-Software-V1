import { useMemo, useState } from 'react'
import { Alert, Col, Empty, List, Tag } from 'antd'
import {
  AlertOutlined,
  DollarOutlined,
  InboxOutlined,
  SwapOutlined,
  WarningOutlined,
} from '@ant-design/icons'
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
  formatRelative,
  movementSummary,
  needsReorder,
  stockLevel,
  stockPosition,
  stockValue,
  suggestedOrderQuantity,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { StockEntryDrawer } from '../components/StockEntryDrawer'

/**
 * Inventory Dashboard (T01).
 *
 * Every figure is computed from the store — no hardcoded numbers. The
 * reconciliation banner is the visible proof that the cached balances agree
 * with the ledger.
 */
export default function InventoryDashboard() {
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const { branchId, branches } = useAppStore()
  const [entryOpen, setEntryOpen] = useState(false)

  const branchName = branches.find((b) => b.id === branchId)?.name ?? 'All Branches'

  const stats = useMemo(() => {
    const active = store.products.filter((p) => p.status === 'Active')
    const reorder = active.filter(needsReorder)
    const outOfStock = active.filter((p) => stockLevel(p) === 'Out of Stock')
    const reserved = active.reduce((a, p) => a + p.reserved, 0)

    const today = new Date().toDateString()
    const todays = store.stockTransactions.filter(
      (t) => new Date(t.at).toDateString() === today,
    )

    return {
      active,
      reorder,
      outOfStock,
      reserved,
      value: stockValue(active),
      movement: movementSummary(store.stockTransactions),
      todaysMovement: movementSummary(todays),
      divergence: store.stockDivergence(),
      recent: store.stockTransactions.slice(0, 8),
    }
  }, [store])

  const kpis: KpiDef[] = [
    {
      key: 'value',
      label: 'Stock Value',
      value: stats.value,
      type: 'money',
      icon: <DollarOutlined />,
      href: '/inventory/products',
    },
    {
      key: 'skus',
      label: 'Active Products',
      value: stats.active.length,
      type: 'number',
      icon: <InboxOutlined />,
      href: '/inventory/products',
    },
    {
      key: 'reorder',
      label: 'Needs Reorder',
      value: stats.reorder.length,
      type: 'number',
      higherIsBetter: false,
      icon: <AlertOutlined />,
      href: '/inventory/products',
    },
    {
      key: 'out',
      label: 'Out of Stock',
      value: stats.outOfStock.length,
      type: 'number',
      higherIsBetter: false,
      icon: <WarningOutlined />,
      href: '/inventory/products',
    },
    {
      key: 'movements',
      label: 'Movements Today',
      value: stats.todaysMovement.count,
      type: 'number',
      icon: <SwapOutlined />,
      href: '/inventory/ledger',
    },
  ]

  const attention: AttentionItemDef[] = [
    ...(stats.outOfStock.length
      ? [
          {
            key: 'out',
            severity: 'critical' as const,
            label: 'Products out of stock',
            count: stats.outOfStock.length,
            href: '/inventory/products',
          },
        ]
      : []),
    ...(stats.reorder.length
      ? [
          {
            key: 'reorder',
            severity: 'warning' as const,
            label: 'Products at or below reorder level',
            count: stats.reorder.length,
            href: '/inventory/products',
          },
        ]
      : []),
    ...(stats.reserved > 0
      ? [
          {
            key: 'reserved',
            severity: 'info' as const,
            label: 'Units reserved against job cards',
            count: stats.reserved,
            href: '/inventory/products',
          },
        ]
      : []),
  ]

  return (
    <>
      {/* Ledger integrity is shown, not assumed. */}
      {stats.divergence.length > 0 ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message={`${stats.divergence.length} product(s) disagree with the stock ledger`}
          description={
            <div style={{ fontSize: 13 }}>
              {stats.divergence.slice(0, 5).map((d) => (
                <div key={d.productId}>
                  <strong>{d.name}</strong> ({d.sku}) — cached {d.cachedOnHand}, ledger{' '}
                  {d.ledgerBalance}, difference {d.difference > 0 ? '+' : ''}
                  {d.difference}
                </div>
              ))}
              <div style={{ marginTop: 6, color: palette.neutral[600] }}>
                A balance that the ledger cannot explain means a write bypassed it. This is a
                defect, not a data-entry issue.
              </div>
            </div>
          }
        />
      ) : store.stockTransactions.length > 0 ? (
        <Alert
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
          message={`Stock reconciled — all ${stats.active.length} products match their ledger across ${store.stockTransactions.length} movements.`}
        />
      ) : null}

      <T01Dashboard
        title="Inventory"
        description="Stock position, movement and reorder alerts"
        context={`${branchName} · Today`}
        kpis={kpis}
        attention={attention}
        onNavigate={navigate}
        quickActions={[
          { key: 'entry', label: 'Stock Entry', type: 'primary', onClick: () => setEntryOpen(true) },
          { key: 'product', label: 'New Product', onClick: () => navigate('/inventory/products/new') },
          { key: 'ledger', label: 'Stock Ledger', onClick: () => navigate('/inventory/ledger') },
        ]}
      >
        <Col xs={24} lg={14}>
          <DashboardWidget
            title="Reorder Required"
            viewAllHref="/inventory/products"
            onNavigate={navigate}
          >
            {stats.reorder.length ? (
              <List
                size="small"
                dataSource={stats.reorder.slice(0, 8)}
                renderItem={(p) => {
                  const pos = stockPosition(p)
                  const suggested = suggestedOrderQuantity(p)
                  return (
                    <List.Item
                      style={{ cursor: 'pointer', paddingInline: 4 }}
                      onClick={() => navigate(`/inventory/products/${p.id}/overview`)}
                      extra={
                        <Tag
                          color={pos.available <= 0 ? 'red' : 'orange'}
                          style={{ marginInlineEnd: 0 }}
                        >
                          {pos.available} {p.unit}
                        </Tag>
                      }
                    >
                      <List.Item.Meta
                        title={<span style={{ fontSize: 13 }}>{p.name}</span>}
                        description={
                          <span style={{ fontSize: 12 }}>
                            <span className="erp-mono">{p.sku}</span> · reorder at {p.reorderLevel}
                            {suggested > 0 ? ` · suggest ordering ${suggested}` : ''}
                          </span>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Stock levels healthy" />
            )}
          </DashboardWidget>
        </Col>

        <Col xs={24} lg={10}>
          <DashboardWidget title="Stock Summary" onNavigate={navigate}>
            <List
              size="small"
              dataSource={[
                { label: 'Stock value (at cost)', value: <MoneyText value={stats.value} strong /> },
                { label: 'Active products', value: stats.active.length },
                { label: 'Units reserved', value: stats.reserved },
                { label: 'Total inward', value: `+${stats.movement.inward}` },
                { label: 'Total outward', value: `−${stats.movement.outward}` },
                { label: 'Ledger entries', value: stats.movement.count },
              ]}
              renderItem={(row) => (
                <List.Item style={{ paddingInline: 4 }}>
                  <span style={{ fontSize: 13 }}>{row.label}</span>
                  <span className="erp-tabular" style={{ fontWeight: 600 }}>
                    {row.value}
                  </span>
                </List.Item>
              )}
            />
          </DashboardWidget>
        </Col>

        <Col xs={24}>
          <DashboardWidget
            title="Recent Stock Movement"
            viewAllHref="/inventory/ledger"
            onNavigate={navigate}
          >
            {stats.recent.length ? (
              <List
                size="small"
                dataSource={stats.recent}
                renderItem={(t) => {
                  const product = store.productById(t.productId)
                  return (
                    <List.Item
                      style={{ paddingInline: 4, cursor: t.sourceId ? 'pointer' : 'default' }}
                      onClick={() =>
                        t.sourceId ? navigate(`/workshop/job-cards/${t.sourceId}/items`) : undefined
                      }
                      extra={
                        <span
                          className="erp-tabular"
                          style={{
                            fontWeight: 600,
                            color:
                              t.direction === 'In' ? palette.success[700] : palette.error[600],
                          }}
                        >
                          {t.direction === 'In' ? '+' : '−'}
                          {t.quantity}
                        </span>
                      }
                    >
                      <List.Item.Meta
                        title={
                          <span style={{ fontSize: 13 }}>
                            <span className="erp-mono">{t.txnNo}</span> · {product?.name}
                          </span>
                        }
                        description={
                          <span style={{ fontSize: 12 }}>
                            {t.type}
                            {t.sourceRef ? ` · ${t.sourceRef}` : ''} · {t.by} ·{' '}
                            {formatRelative(t.at)}
                          </span>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No movements recorded" />
            )}
          </DashboardWidget>
        </Col>
      </T01Dashboard>

      <StockEntryDrawer open={entryOpen} onClose={() => setEntryOpen(false)} />
    </>
  )
}
