import { App, Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import { DeleteOutlined, ExportOutlined, UndoOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { MoneyText, TotalsPanel, palette } from '@garage/ui'
import {
  calculateTotals,
  canEditItems,
  formatQuantity,
  lineTotals,
  type ItemSource,
  type JobCard,
  type JobCardItem,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Unified item grid — Labour, Spares and Lubricants in one table.
 *
 * Workshop §89: one grid, not separate screens per item type.
 * Issuing a part is where stock actually moves (§4.6 transactional boundary).
 */
export function ItemGrid({
  jobCard,
  source,
  showIssue,
}: {
  jobCard: JobCard
  /** Filter to estimate lines or additional work; omit for everything. */
  source?: ItemSource
  /** Show the Issue/Return stock controls (Items tab only). */
  showIssue?: boolean
}) {
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)

  const items = source ? jobCard.items.filter((i) => i.source === source) : jobCard.items
  const totals = calculateTotals(items)
  const editable = canEditItems(jobCard)

  const columns: ColumnsType<JobCardItem> = [
    {
      title: 'Type',
      dataIndex: 'type',
      width: 105,
      render: (v: string) => (
        <Tag
          color={v === 'Labour' ? 'blue' : v === 'Spare' ? 'purple' : 'cyan'}
          style={{ marginInlineEnd: 0 }}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'name',
      render: (v: string, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{v}</div>
          {row.code ? (
            <span className="erp-mono" style={{ fontSize: 11, color: palette.neutral[500] }}>
              {row.code}
            </span>
          ) : null}
          {row.source === 'Additional' ? (
            <Tag color="orange" style={{ marginLeft: 6, fontSize: 10 }}>
              Additional
            </Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      width: 90,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (v: number, row) => formatQuantity(v, row.unit),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: 110,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (v: number) => <MoneyText value={v} />,
    },
    {
      title: 'Disc %',
      dataIndex: 'discountPercent',
      width: 80,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (v: number) => (v ? `${v}%` : '—'),
    },
    {
      title: 'Taxable',
      key: 'taxable',
      width: 120,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (_v, row) => <MoneyText value={lineTotals(row).taxable} />,
    },
    {
      title: 'GST',
      key: 'tax',
      width: 110,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (_v, row) => (
        <Tooltip title={`${row.taxRate}%`}>
          <span>
            <MoneyText value={lineTotals(row).tax} />
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      width: 130,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (_v, row) => <MoneyText value={lineTotals(row).total} strong />,
    },
  ]

  if (showIssue) {
    columns.push({
      title: 'Stock',
      key: 'issued',
      width: 130,
      align: 'center',
      render: (_v, row) => {
        if (row.type === 'Labour') return <span style={{ color: palette.neutral[400] }}>—</span>
        if (row.issued) {
          return (
            <Space size={4}>
              <Tag color="green" style={{ marginInlineEnd: 0 }}>
                Issued
              </Tag>
              {editable.ok ? (
                <Tooltip title="Return to stock">
                  <Button
                    type="text"
                    size="small"
                    icon={<UndoOutlined />}
                    onClick={() => {
                      store.returnPart(jobCard.id, row.id, user?.name ?? 'System')
                      message.success('Returned to stock')
                    }}
                  />
                </Tooltip>
              ) : null}
            </Space>
          )
        }
        return (
          <Button
            size="small"
            icon={<ExportOutlined />}
            disabled={!editable.ok}
            onClick={() => {
              const result = store.issuePart(jobCard.id, row.id, user?.name ?? 'System')
              if (result.ok) message.success(`${row.name} issued from stock`)
              else message.error(result.error)
            }}
          >
            Issue
          </Button>
        )
      },
    })
  }

  if (editable.ok) {
    columns.push({
      title: '',
      key: 'actions',
      width: 50,
      align: 'right',
      render: (_v, row) => (
        <Popconfirm
          title="Remove this line?"
          description={row.issued ? 'The issued stock will be returned.' : undefined}
          okText="Remove"
          okButtonProps={{ danger: true }}
          onConfirm={() => {
            store.removeItem(jobCard.id, row.id, user?.name ?? 'System')
            message.success('Line removed')
          }}
        >
          <Button type="text" size="small" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    })
  }

  return (
    <>
      <Table<JobCardItem>
        columns={columns}
        dataSource={items}
        rowKey="id"
        size="middle"
        pagination={false}
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: (
            <div style={{ padding: 32, color: palette.neutral[400] }}>
              No {source === 'Estimate' ? 'estimate lines' : 'items'} yet
            </div>
          ),
        }}
      />

      {items.length ? (
        <div style={{ marginTop: 16 }}>
          <TotalsPanel
            lines={[
              { label: 'Gross', value: totals.gross },
              ...(totals.discount > 0
                ? [{ label: 'Discount', value: totals.discount, negative: true }]
                : []),
              { label: 'Taxable Value', value: totals.taxable },
              { label: 'CGST', value: totals.cgst },
              { label: 'SGST', value: totals.sgst },
              { label: 'Total', value: totals.total, emphasis: true },
            ]}
          />
        </div>
      ) : null}
    </>
  )
}
