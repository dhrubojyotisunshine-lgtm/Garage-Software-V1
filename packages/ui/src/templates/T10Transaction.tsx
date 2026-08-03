import { useEffect, useRef, type ReactNode } from 'react'
import { Button, Card, Flex, Input, InputNumber, Table, Tag } from 'antd'
import { CloseOutlined, PauseOutlined, UserOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { formatMoney, formatQuantity } from '@garage/shared'
import type { PosLineItem, PosTotals } from '../types'
import { palette } from '../theme/tokens'

/**
 * T10 — TRANSACTION / POS SCREEN   [PROPOSED — see 03_PAGE_TEMPLATES.md §4]
 *
 * Speed-optimized transaction entry. Optimized for seconds per transaction,
 * not process depth.
 *
 * Non-negotiables:
 *  - Keyboard-first. Full transaction completable without a mouse. §21
 *  - Focus returns to the scan field after every action.
 *  - Shortcut bar always visible.
 *  - Payment opens as a drawer, never a page navigation.
 *
 * Ref: 03_PAGE_TEMPLATES.md §21
 */

export interface T10TransactionProps {
  title: ReactNode
  /** Branch · operator */
  context?: ReactNode

  customerName: string
  onChangeCustomer: () => void

  scanValue: string
  onScanChange: (v: string) => void
  onScanSubmit: (value: string) => void
  scanPlaceholder?: string

  items: PosLineItem[]
  onQuantityChange: (key: string, quantity: number) => void
  onRemoveItem: (key: string) => void

  totals: PosTotals

  onPayment: () => void
  onHold?: () => void
  onCancel?: () => void

  /** Rendered above the shortcut bar (e.g. held-sale count). */
  extra?: ReactNode
}

const SHORTCUTS = [
  { key: 'F2', label: 'Item search' },
  { key: 'F4', label: 'Customer' },
  { key: 'F9', label: 'Hold' },
  { key: 'F12', label: 'Pay' },
  { key: 'Esc', label: 'Cancel' },
]

export function T10Transaction({
  title,
  context,
  customerName,
  onChangeCustomer,
  scanValue,
  onScanChange,
  onScanSubmit,
  scanPlaceholder = 'Scan barcode or search item…',
  items,
  onQuantityChange,
  onRemoveItem,
  totals,
  onPayment,
  onHold,
  onCancel,
  extra,
}: T10TransactionProps) {
  const scanRef = useRef<HTMLInputElement>(null)

  /** Focus the scan field on mount and refocus after every item change. §21 */
  useEffect(() => {
    scanRef.current?.focus()
  }, [items.length])

  /** POS shortcuts. Discoverability matters more than elegance here. §15 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'F2':
          e.preventDefault()
          scanRef.current?.focus()
          break
        case 'F4':
          e.preventDefault()
          onChangeCustomer()
          break
        case 'F9':
          e.preventDefault()
          onHold?.()
          break
        case 'F12':
          e.preventDefault()
          onPayment()
          break
        case 'Escape':
          e.preventDefault()
          onCancel?.()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onChangeCustomer, onHold, onPayment, onCancel])

  const columns: ColumnsType<PosLineItem> = [
    {
      title: 'Item',
      dataIndex: 'name',
      render: (_v, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{row.name}</div>
          {row.code ? (
            <div className="erp-mono" style={{ fontSize: 11, color: palette.neutral[500] }}>
              {row.code}
            </div>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'availableStock',
      width: 90,
      align: 'right',
      render: (v: number | undefined, row) => {
        if (v === undefined) return '—'
        const insufficient = v < row.quantity
        return (
          <Tag
            color={insufficient ? 'red' : v <= 5 ? 'orange' : 'default'}
            style={{ marginInlineEnd: 0 }}
          >
            {formatQuantity(v, row.unit)}
          </Tag>
        )
      },
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      width: 100,
      align: 'right',
      render: (v: number, row) => (
        <InputNumber
          size="small"
          min={1}
          value={v}
          onChange={(next) => onQuantityChange(row.key, Number(next ?? 1))}
          style={{ width: 72 }}
        />
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: 110,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (v: number) => formatMoney(v),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 120,
      align: 'right',
      className: 'erp-cell-numeric',
      render: (v: number) => <strong>{formatMoney(v)}</strong>,
    },
    {
      title: '',
      key: 'remove',
      width: 40,
      render: (_v, row) => (
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={() => onRemoveItem(row.key)}
          aria-label={`Remove ${row.name}`}
        />
      ),
    },
  ]

  const line = (label: string, value: number, opts?: { strong?: boolean; negative?: boolean }) => (
    <Flex justify="space-between" style={{ padding: '3px 0' }}>
      <span style={{ fontSize: opts?.strong ? 14 : 13, color: palette.neutral[600] }}>{label}</span>
      <span
        className="erp-money"
        style={{
          fontVariantNumeric: 'tabular-nums',
          fontSize: opts?.strong ? 15 : 13,
          fontWeight: opts?.strong ? 600 : 500,
          color: opts?.negative ? palette.error[600] : palette.neutral[900],
        }}
      >
        {opts?.negative && value > 0 ? '− ' : ''}
        {formatMoney(value)}
      </span>
    </Flex>
  )

  return (
    <Flex vertical style={{ height: 'calc(100vh - 96px)' }}>
      {/* ---------------------------------------------------- TXN HEADER */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 12, color: palette.neutral[500] }}>{context}</div>
        </div>
        <Flex gap={8}>
          {extra}
          {onHold ? (
            <Button icon={<PauseOutlined />} onClick={onHold}>
              Hold (F9)
            </Button>
          ) : null}
          {onCancel ? (
            <Button danger icon={<CloseOutlined />} onClick={onCancel}>
              Cancel (Esc)
            </Button>
          ) : null}
        </Flex>
      </Flex>

      <Flex gap={12} style={{ flex: 1, minHeight: 0 }}>
        {/* ------------------------------------------------- ENTRY PANEL */}
        <Flex vertical gap={12} style={{ flex: 1, minWidth: 0 }}>
          <Input
            ref={scanRef as never}
            size="large"
            placeholder={scanPlaceholder}
            value={scanValue}
            onChange={(e) => onScanChange(e.target.value)}
            onPressEnter={() => {
              if (scanValue.trim()) onScanSubmit(scanValue.trim())
            }}
            style={{ fontSize: 16 }}
          />

          <Card size="small" styles={{ body: { padding: 0 } }} style={{ flex: 1, overflow: 'auto' }}>
            <Table<PosLineItem>
              columns={columns}
              dataSource={items}
              rowKey="key"
              size="small"
              pagination={false}
              sticky
              locale={{
                emptyText: (
                  <div style={{ padding: 40, color: palette.neutral[400] }}>
                    Scan an item or press <strong>F2</strong> to search
                  </div>
                ),
              }}
            />
          </Card>
        </Flex>

        {/* ----------------------------------------------- SUMMARY PANEL */}
        <Card
          size="small"
          style={{ width: 300, flex: '0 0 300px', display: 'flex', flexDirection: 'column' }}
          styles={{ body: { padding: 12, display: 'flex', flexDirection: 'column', height: '100%' } }}
        >
          <div style={{ fontSize: 11, color: palette.neutral[500], fontWeight: 500 }}>CUSTOMER</div>
          <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
            <span style={{ fontWeight: 600 }}>
              <UserOutlined style={{ marginRight: 6, color: palette.neutral[400] }} />
              {customerName}
            </span>
            <Button type="link" size="small" onClick={onChangeCustomer}>
              Change
            </Button>
          </Flex>

          <div style={{ borderTop: `1px solid ${palette.neutral[200]}`, paddingTop: 8 }}>
            <Flex justify="space-between" style={{ padding: '3px 0' }}>
              <span style={{ fontSize: 13, color: palette.neutral[600] }}>Items</span>
              <span className="erp-tabular" style={{ fontWeight: 600 }}>
                {totals.itemCount}
              </span>
            </Flex>
            {line('Subtotal', totals.subtotal)}
            {totals.discount > 0 ? line('Discount', totals.discount, { negative: true }) : null}
            {line('Taxable', totals.taxable)}
            {totals.igst > 0
              ? line('IGST', totals.igst)
              : (
                <>
                  {line('CGST', totals.cgst)}
                  {line('SGST', totals.sgst)}
                </>
              )}
          </div>

          <div
            style={{
              borderTop: `2px solid ${palette.neutral[300]}`,
              marginTop: 8,
              paddingTop: 8,
            }}
          >
            <Flex justify="space-between" align="baseline">
              <span style={{ fontSize: 14, fontWeight: 600 }}>TOTAL</span>
              <span
                className="erp-money"
                style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
              >
                {formatMoney(totals.total)}
              </span>
            </Flex>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 12 }}>
            <Button
              type="primary"
              size="large"
              block
              onClick={onPayment}
              disabled={items.length === 0}
              style={{ height: 52, fontSize: 16, fontWeight: 600 }}
            >
              PAYMENT · F12
            </Button>
          </div>
        </Card>
      </Flex>

      {/* --------------------------------------------------- SHORTCUT BAR */}
      <Flex
        gap={16}
        wrap
        style={{
          marginTop: 8,
          padding: '6px 12px',
          background: palette.neutral[900],
          borderRadius: 6,
          fontSize: 12,
        }}
      >
        {SHORTCUTS.map((s) => (
          <span key={s.key} style={{ color: palette.neutral[300] }}>
            <kbd
              style={{
                background: palette.neutral[700],
                color: palette.neutral[0],
                padding: '1px 6px',
                borderRadius: 3,
                fontFamily: 'inherit',
                fontWeight: 600,
                marginRight: 5,
              }}
            >
              {s.key}
            </kbd>
            {s.label}
          </span>
        ))}
      </Flex>
    </Flex>
  )
}
