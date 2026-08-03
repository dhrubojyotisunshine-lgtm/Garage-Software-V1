import { useState } from 'react'
import { App, Col, Row, Tag } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  DataTable,
  FieldGrid,
  MoneyText,
  NotFoundState,
  SectionCard,
  StatusChip,
  T04DetailPage,
  palette,
  type ColumnDef,
  type SummaryMetric,
  type WorkspaceTabDef,
} from '@garage/ui'
import {
  movementSummary,
  stockLevel,
  stockPosition,
  stockStatusMap,
  resolveStatus,
  type StockTransaction,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { StockEntryDrawer } from '../components/StockEntryDrawer'

/**
 * Product Detail (T04).
 *
 * The Transactions tab is the product's stock ledger — every unit in or out,
 * traceable to the document that caused it.
 */

const TABS: WorkspaceTabDef[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'transactions', label: 'Stock Ledger' },
]

const TXN_COLUMNS: ColumnDef<StockTransaction & Record<string, unknown>>[] = [
  { key: 'txnNo', title: 'Entry', type: 'identifier', width: 165, locked: true },
  { key: 'at', title: 'Date', type: 'datetime', width: 185 },
  { key: 'type', title: 'Type', width: 165 },
  {
    key: 'quantity',
    title: 'Qty',
    width: 100,
    align: 'right',
    type: 'custom',
    render: (_v, row) => (
      <span
        className="erp-tabular"
        style={{
          fontWeight: 600,
          color: row.direction === 'In' ? palette.success[700] : palette.error[600],
        }}
      >
        {row.direction === 'In' ? '+' : '−'}
        {row.quantity}
      </span>
    ),
  },
  { key: 'balanceAfter', title: 'Balance', type: 'number', width: 110 },
  {
    key: 'sourceRef',
    title: 'Source',
    width: 175,
    type: 'custom',
    render: (_v, row) =>
      row.sourceRef ? (
        <span className="erp-mono">{row.sourceRef}</span>
      ) : (
        <Tag style={{ marginInlineEnd: 0 }}>{row.sourceType}</Tag>
      ),
  },
  { key: 'reason', title: 'Reason', ellipsis: true },
  { key: 'by', title: 'By', width: 140 },
]

export default function ProductDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const { message, modal } = App.useApp()
  const store = useWorkshopStore()
  const [entryOpen, setEntryOpen] = useState(false)

  const product = store.productById(params.id)
  const activeTab = params.tab ?? 'overview'

  if (!product) return <NotFoundState what="product" />

  const position = stockPosition(product)
  const level = stockLevel(product)
  const status = resolveStatus(level, stockStatusMap)
  const txns = store.transactionsOfProduct(product.id)
  const movement = movementSummary(txns)

  const summary: SummaryMetric[] = [
    { key: 'onHand', label: 'On Hand', value: `${position.onHand} ${product.unit}` },
    { key: 'reserved', label: 'Reserved', value: `${position.reserved} ${product.unit}` },
    {
      key: 'available',
      label: 'Available',
      value: `${position.available} ${product.unit}`,
      tone: position.available <= product.reorderLevel ? 'danger' : 'success',
    },
    { key: 'reorder', label: 'Reorder Level', value: product.reorderLevel },
    {
      key: 'value',
      label: 'Stock Value',
      value: product.onHand * product.purchasePrice,
      type: 'money',
    },
  ]

  return (
    <>
      <T04DetailPage
        name={product.name}
        chips={[
          { label: status.label, tone: status.tone },
          { label: product.type, tone: 'progress' },
          ...(product.status === 'Inactive'
            ? [{ label: 'Inactive', tone: 'neutral' as const }]
            : []),
        ]}
        identity={[
          <span key="sku" className="erp-mono">
            {product.sku}
          </span>,
          product.brand ?? '—',
          product.category,
        ]}
        summary={summary}
        tabs={TABS.map((t) => (t.key === 'transactions' ? { ...t, badge: txns.length } : t))}
        activeTab={activeTab}
        onTabChange={(key) => navigate(`/inventory/products/${product.id}/${key}`)}
        primaryAction={{
          key: 'entry',
          label: 'Stock Entry',
          type: 'primary',
          onClick: () => setEntryOpen(true),
        }}
        moreActions={[
          {
            key: 'edit',
            label: 'Edit product',
            onClick: () => navigate(`/inventory/products/${product.id}/edit`),
          },
          {
            key: 'status',
            label: product.status === 'Active' ? 'Deactivate product' : 'Reactivate product',
            danger: product.status === 'Active',
            onClick: () => {
              const next = product.status === 'Active' ? 'Inactive' : 'Active'
              modal.confirm({
                title: `${next === 'Inactive' ? 'Deactivate' : 'Reactivate'} ${product.name}?`,
                // Products with movement history are deactivated, never deleted. §20
                content:
                  next === 'Inactive'
                    ? `This product has ${txns.length} stock movement(s). Deactivating hides it from new job cards while keeping its history.`
                    : 'The product will become selectable on job cards again.',
                okText: next === 'Inactive' ? 'Deactivate' : 'Reactivate',
                okButtonProps: { danger: next === 'Inactive' },
                onOk: () => {
                  store.setProductStatus(product.id, next)
                  message.success(`Product ${next === 'Inactive' ? 'deactivated' : 'reactivated'}`)
                },
              })
            },
          },
        ]}
      >
        {activeTab === 'overview' ? (
          <Row gutter={16}>
            <Col xs={24} lg={14}>
              <SectionCard title="Product Information">
                <FieldGrid
                  columns={2}
                  rows={[
                    { label: 'SKU', value: <span className="erp-mono">{product.sku}</span> },
                    {
                      label: 'Part Number',
                      value: product.partNumber ? (
                        <span className="erp-mono">{product.partNumber}</span>
                      ) : null,
                    },
                    { label: 'Type', value: product.type },
                    { label: 'Category', value: product.category },
                    { label: 'Brand', value: product.brand },
                    { label: 'Unit', value: product.unit },
                    { label: 'HSN / SAC', value: product.hsn },
                    { label: 'GST Rate', value: `${product.taxRate}%` },
                  ]}
                />
              </SectionCard>

              <SectionCard title="Pricing">
                <FieldGrid
                  columns={3}
                  rows={[
                    { label: 'Purchase Price', value: <MoneyText value={product.purchasePrice} /> },
                    {
                      label: 'Selling Price',
                      value: <MoneyText value={product.sellingPrice} strong />,
                    },
                    {
                      label: 'Margin',
                      value: (
                        <MoneyText value={product.sellingPrice - product.purchasePrice} colored />
                      ),
                    },
                  ]}
                />
              </SectionCard>
            </Col>

            <Col xs={24} lg={10}>
              <SectionCard title="Stock Position">
                <FieldGrid
                  columns={1}
                  bordered
                  rows={[
                    { label: 'On Hand', value: `${position.onHand} ${product.unit}` },
                    { label: 'Reserved', value: `${position.reserved} ${product.unit}` },
                    {
                      label: 'Available',
                      value: (
                        <strong style={{ color: palette.neutral[900] }}>
                          {position.available} {product.unit}
                        </strong>
                      ),
                    },
                    { label: 'Reorder Level', value: `${product.reorderLevel} ${product.unit}` },
                    {
                      label: 'Status',
                      value: <StatusChip label={status.label} tone={status.tone} />,
                    },
                  ]}
                />
                <div style={{ marginTop: 12, fontSize: 12, color: palette.neutral[500] }}>
                  On hand − reserved = available. These are never collapsed into one number.
                </div>
              </SectionCard>

              <SectionCard title="Movement">
                <FieldGrid
                  columns={3}
                  rows={[
                    { label: 'Total In', value: `+${movement.inward}` },
                    { label: 'Total Out', value: `−${movement.outward}` },
                    { label: 'Entries', value: movement.count },
                  ]}
                />
              </SectionCard>
            </Col>
          </Row>
        ) : (
          <SectionCard
            title="Stock Ledger"
            description="Every movement, traceable to the document that caused it"
            padding={0}
          >
            <DataTable
              columns={TXN_COLUMNS}
              rows={txns as (StockTransaction & Record<string, unknown>)[]}
              rowKey="id"
              pagination={false}
              onRowClick={(row) =>
                row.sourceType === 'JobCard' && row.sourceId
                  ? navigate(`/workshop/job-cards/${row.sourceId}/items`)
                  : undefined
              }
              emptyText="No stock movement recorded yet"
            />
          </SectionCard>
        )}
      </T04DetailPage>

      <StockEntryDrawer
        open={entryOpen}
        productId={product.id}
        onClose={() => setEntryOpen(false)}
      />
    </>
  )
}
