import { useMemo, useState } from 'react'
import { Card, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { T02ListPage, palette, type ColumnDef, type FilterDef, type QuickFilterDef } from '@garage/ui'
import { availableStock, stockStatusMap, type Product } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Inventory — Parts lookup (T02).
 *
 * Scoped to what Workshop needs: find a part, see availability, see price.
 * Stock movement happens from the Job Card, not here — Workshop users perform
 * item actions on the job card and Inventory sees the resulting transactions
 * (04_ALL_MODULES.md §24).
 */

interface Row extends Record<string, unknown> {
  id: string
  sku: string
  name: string
  partNumber: string
  category: string
  brand: string
  onHand: number
  reserved: number
  available: number
  unit: string
  sellingPrice: number
  taxRate: number
  stockStatus: string
}

function stockStatusOf(p: Product): string {
  const available = availableStock(p)
  if (available <= 0) return 'Out of Stock'
  if (available <= p.reorderLevel) return 'Low Stock'
  return 'In Stock'
}

const FILTERS: FilterDef[] = [
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    width: 160,
    options: ['Filters', 'Brakes', 'Lubricants', 'Electricals', 'Suspension', 'Body Parts'].map(
      (v) => ({ label: v, value: v }),
    ),
  },
  {
    key: 'brand',
    label: 'Brand',
    type: 'select',
    width: 140,
    advanced: true,
    options: ['Bosch', 'Brembo', 'Castrol', 'Exide', 'NGK', 'Mobil', 'Denso', 'Valeo', 'Monroe', 'Mahle', 'Generic'].map(
      (v) => ({ label: v, value: v }),
    ),
  },
]

const COLUMNS: ColumnDef<Row>[] = [
  { key: 'sku', title: 'SKU', type: 'identifier', width: 120, fixed: 'left', locked: true },
  { key: 'name', title: 'Product', width: 260, sortable: true },
  { key: 'partNumber', title: 'Part Number', type: 'identifier', width: 150 },
  { key: 'category', title: 'Category', width: 130 },
  { key: 'brand', title: 'Brand', width: 110 },
  { key: 'onHand', title: 'On Hand', type: 'number', width: 100 },
  { key: 'reserved', title: 'Reserved', type: 'number', width: 100, hidden: true },
  { key: 'available', title: 'Available', type: 'number', width: 110, sortable: true },
  { key: 'sellingPrice', title: 'Selling Price', type: 'money', width: 140 },
  { key: 'taxRate', title: 'GST %', type: 'number', width: 90 },
  { key: 'stockStatus', title: 'Stock', type: 'status', statusMap: stockStatusMap, width: 130 },
]

export default function ProductList() {
  const navigate = useNavigate()
  const products = useWorkshopStore((s) => s.products)

  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({})
  const [quickFilter, setQuickFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const allRows = useMemo<Row[]>(
    () =>
      products.map((p) => ({
        id: p.id,
        sku: p.sku,
        name: p.name,
        partNumber: p.partNumber ?? '',
        category: p.category,
        brand: p.brand ?? '',
        onHand: p.onHand,
        reserved: p.reserved,
        available: availableStock(p),
        unit: p.unit,
        sellingPrice: p.sellingPrice,
        taxRate: p.taxRate,
        stockStatus: stockStatusOf(p),
      })),
    [products],
  )

  const quickFilters = useMemo<QuickFilterDef[]>(
    () => [
      { key: 'all', label: 'All', count: allRows.length },
      {
        key: 'In Stock',
        label: 'In Stock',
        tone: 'success',
        count: allRows.filter((r) => r.stockStatus === 'In Stock').length,
      },
      {
        key: 'Low Stock',
        label: 'Low Stock',
        tone: 'action',
        count: allRows.filter((r) => r.stockStatus === 'Low Stock').length,
      },
      {
        key: 'Out of Stock',
        label: 'Out of Stock',
        tone: 'failure',
        count: allRows.filter((r) => r.stockStatus === 'Out of Stock').length,
      },
    ],
    [allRows],
  )

  const rows = useMemo(() => {
    let list = allRows
    if (quickFilter !== 'all') list = list.filter((r) => r.stockStatus === quickFilter)

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q) ||
          r.partNumber.toLowerCase().includes(q),
      )
    }
    if (filterValues.category) list = list.filter((r) => r.category === filterValues.category)
    if (filterValues.brand) list = list.filter((r) => r.brand === filterValues.brand)
    return list
  }, [allRows, search, filterValues, quickFilter])

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  const totals = useMemo(
    () => ({
      value: allRows.reduce((a, r) => a + r.onHand * r.sellingPrice, 0),
      low: allRows.filter((r) => r.stockStatus !== 'In Stock').length,
    }),
    [allRows],
  )

  return (
    <T02ListPage<Row>
      title="Parts & Products"
      description="Stock availability for workshop job cards"
      primaryAction={{
        key: 'new',
        label: 'New Product',
        icon: <PlusOutlined />,
        type: 'primary',
        onClick: () => navigate('/inventory/products/new'),
      }}
      quickFilters={quickFilters}
      quickFilterValue={quickFilter}
      onQuickFilterChange={(k) => {
        setQuickFilter(k)
        setPage(1)
      }}
      searchPlaceholder="Search product name, SKU or part number"
      searchValue={search}
      onSearchChange={(v) => {
        setSearch(v)
        setPage(1)
      }}
      filters={FILTERS}
      filterValues={filterValues}
      onFilterChange={(v) => {
        setFilterValues(v)
        setPage(1)
      }}
      columns={COLUMNS}
      rows={paged}
      rowKey="id"
      onRowClick={(row) => navigate(`/inventory/products/${row.id}/overview`)}
      pagination={{
        page,
        pageSize,
        total: rows.length,
        onChange: (p, s) => {
          setPage(p)
          setPageSize(s)
        },
      }}
      exportable
      beforeTable={
        <Card size="small" styles={{ body: { padding: '10px 16px' } }} style={{ marginBottom: 12 }}>
          <Flex gap={32} wrap>
            <div>
              <div style={{ fontSize: 11, color: palette.neutral[500] }}>Stock Value (at MRP)</div>
              <div className="erp-tabular" style={{ fontSize: 16, fontWeight: 600 }}>
                ₹ {(totals.value / 100).toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: palette.neutral[500] }}>Needs Reorder</div>
              <div
                className="erp-tabular"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: totals.low > 0 ? palette.action[700] : palette.neutral[900],
                }}
              >
                {totals.low} items
              </div>
            </div>
          </Flex>
        </Card>
      }
      emptyState={{
        title: 'No products yet',
        description: 'Add the first product so it can be issued to job cards.',
        action: { key: 'new', label: 'New Product', onClick: () => navigate('/inventory/products/new') },
      }}
    />
  )
}
