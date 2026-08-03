import { App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { NotFoundState, T05Form, type FormSectionDef } from '@garage/ui'
import { productSchema, toPaise, toRupees, type ProductInput } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Add / Edit Product (T05, page variant).
 *
 * Opening stock is captured on create only — it becomes the product's first
 * stock movement rather than a silently-set number, so the ledger explains
 * every unit from the start.
 */

const CATEGORIES = ['Filters', 'Brakes', 'Lubricants', 'Electricals', 'Suspension', 'Body Parts']
const BRANDS = [
  'Bosch', 'Brembo', 'Castrol', 'Exide', 'NGK', 'Mobil',
  'Denso', 'Valeo', 'Monroe', 'Mahle', 'MRF', 'Generic',
]
const UNITS = ['Nos', 'Ltr', 'Set', 'Box', 'Kg', 'Mtr']

function sections(isEdit: boolean): FormSectionDef[] {
  return [
    {
      key: 'basic',
      title: 'Basic Information',
      fields: [
        { name: 'name', label: 'Product Name', type: 'text', required: true, span: 12 },
        { name: 'sku', label: 'SKU', type: 'text', required: true, span: 6 },
        {
          name: 'type',
          label: 'Product Type',
          type: 'select',
          required: true,
          span: 6,
          options: ['Spare Part', 'Lubricant', 'Consumable', 'Accessory'].map((v) => ({
            label: v,
            value: v,
          })),
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          span: 8,
          options: CATEGORIES.map((v) => ({ label: v, value: v })),
        },
        {
          name: 'brand',
          label: 'Brand',
          type: 'select',
          span: 8,
          options: BRANDS.map((v) => ({ label: v, value: v })),
        },
        {
          name: 'unit',
          label: 'Unit',
          type: 'select',
          required: true,
          span: 8,
          options: UNITS.map((v) => ({ label: v, value: v })),
        },
      ],
    },
    {
      key: 'identification',
      title: 'Identification',
      fields: [
        { name: 'partNumber', label: 'Part Number', type: 'text', span: 12 },
        { name: 'hsn', label: 'HSN / SAC', type: 'text', span: 12 },
      ],
    },
    {
      key: 'pricing',
      title: 'Pricing & Tax',
      fields: [
        { name: 'purchasePrice', label: 'Purchase Price', type: 'money', required: true, span: 8 },
        { name: 'sellingPrice', label: 'Selling Price', type: 'money', required: true, span: 8 },
        {
          name: 'taxRate',
          label: 'GST Rate (%)',
          type: 'select',
          required: true,
          span: 8,
          options: [0, 5, 12, 18, 28].map((v) => ({ label: `${v}%`, value: v })),
        },
      ],
    },
    {
      key: 'stock',
      title: 'Stock Control',
      description: isEdit
        ? 'Stock quantity is changed through stock entries, not by editing this form'
        : 'Opening stock is recorded as the first entry in this product’s stock ledger',
      fields: [
        {
          name: 'reorderLevel',
          label: 'Reorder Level',
          type: 'number',
          required: true,
          span: 12,
          help: 'Low-stock alerts trigger at or below this quantity',
        },
        ...(isEdit
          ? []
          : [
              {
                name: 'openingStock',
                label: 'Opening Stock',
                type: 'number' as const,
                span: 12,
                help: 'Quantity currently on the shelf',
              },
            ]),
      ],
    },
  ]
}

export default function ProductForm() {
  const navigate = useNavigate()
  const params = useParams()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const { branchId, user, financialYear } = useAppStore()

  const isEdit = Boolean(params.id)
  const existing = isEdit ? store.productById(params.id) : undefined

  if (isEdit && !existing) return <NotFoundState what="product" />

  return (
    <T05Form<ProductInput>
      mode={isEdit ? 'edit' : 'create'}
      variant="page"
      title={isEdit ? `Edit ${existing!.name}` : 'Add Product'}
      description="Products are shared by Workshop, billing and stock."
      sections={sections(isEdit)}
      schema={productSchema}
      allowSaveAndNew={!isEdit}
      initialValues={
        existing
          ? {
              name: existing.name,
              sku: existing.sku,
              type: existing.type,
              partNumber: existing.partNumber ?? '',
              category: existing.category,
              brand: existing.brand ?? '',
              unit: existing.unit,
              hsn: existing.hsn ?? '',
              taxRate: existing.taxRate,
              purchasePrice: toRupees(existing.purchasePrice),
              sellingPrice: toRupees(existing.sellingPrice),
              reorderLevel: existing.reorderLevel,
            }
          : { type: 'Spare Part', unit: 'Nos', taxRate: 18, reorderLevel: 10, openingStock: 0 }
      }
      onSubmit={async (values) => {
        const payload = {
          name: values.name,
          sku: values.sku,
          type: values.type,
          partNumber: values.partNumber || undefined,
          category: values.category,
          brand: values.brand || undefined,
          unit: values.unit,
          hsn: values.hsn || undefined,
          taxRate: values.taxRate,
          purchasePrice: toPaise(values.purchasePrice),
          sellingPrice: toPaise(values.sellingPrice),
          reorderLevel: values.reorderLevel,
        }

        if (isEdit) {
          store.updateProduct(existing!.id, payload)
          message.success('Product updated')
          navigate(`/inventory/products/${existing!.id}/overview`)
          return
        }

        // SKU must be unique — a duplicate would break barcode/SKU lookup.
        if (store.products.some((p) => p.sku.toLowerCase() === payload.sku.toLowerCase())) {
          message.error(`SKU "${payload.sku}" is already used by another product`)
          return
        }

        const product = store.createProduct({
          branchId: branchId === '__all__' ? 'br-pune-main' : branchId,
          ...payload,
          onHand: 0,
        })

        // Opening stock enters through the ledger, never as a bare number.
        if (values.openingStock && values.openingStock > 0) {
          store.recordStockEntry(
            {
              productId: product.id,
              type: 'Opening Stock',
              quantity: values.openingStock,
              rate: payload.purchasePrice,
              reason: 'Opening stock on product creation',
              financialYear,
            },
            user?.name ?? 'System',
          )
        }

        message.success(`${product.name} created`)
        navigate(`/inventory/products/${product.id}/overview`)
      }}
      onCancel={() =>
        navigate(isEdit ? `/inventory/products/${existing!.id}/overview` : '/inventory/products')
      }
    />
  )
}
