/**
 * Inventory validation schemas.
 *
 * Shared with the API later — the same object validates the request body.
 */

import { z } from 'zod'
import { requiredString } from './common'

export const productSchema = z.object({
  name: requiredString('Product name'),
  sku: requiredString('SKU'),
  type: z.enum(['Spare Part', 'Lubricant', 'Consumable', 'Accessory']),
  partNumber: z.string().trim().optional(),
  category: requiredString('Category'),
  brand: z.string().trim().optional(),
  unit: requiredString('Unit'),
  hsn: z.string().trim().optional(),
  taxRate: z.number().min(0).max(28),
  /** Entered in rupees; converted to paise on save. */
  purchasePrice: z.number().nonnegative('Cannot be negative'),
  sellingPrice: z.number().nonnegative('Cannot be negative'),
  reorderLevel: z.number().int().nonnegative('Cannot be negative'),
  /** Only on create — becomes an Opening Stock ledger entry. */
  openingStock: z.number().int().nonnegative('Cannot be negative').optional(),
})

export type ProductInput = z.infer<typeof productSchema>

/** Manual stock movement recorded from the Inventory module. */
export const stockEntrySchema = z.object({
  productId: requiredString('Product'),
  type: z.enum(['Stock In', 'Purchase Receipt', 'Adjustment', 'Damage', 'Loss']),
  quantity: z.number().positive('Quantity must be greater than zero'),
  /** Purchase rate in rupees, for valuation. Optional on outward moves. */
  rate: z.number().nonnegative().optional(),
  reason: z.string().trim().optional(),
  reference: z.string().trim().optional(),
})

export type StockEntryInput = z.infer<typeof stockEntrySchema>

/** Counted quantity replaces the book balance; the delta is the adjustment. */
export const physicalVerificationSchema = z.object({
  productId: requiredString('Product'),
  countedQuantity: z.number().int().nonnegative('Cannot be negative'),
  reason: z.string().trim().optional(),
})

export type PhysicalVerificationInput = z.infer<typeof physicalVerificationSchema>

/* -------------------------------------------------------------- supplier */

export const supplierSchema = z.object({
  firstName: requiredString('First name'),
  lastName: z.string().trim().optional(),
  companyName: requiredString('Company name'),
  email: z.string().trim().email('Enter a valid email address').optional().or(z.literal('')),
  mobile: z.string().trim().optional(),
  /** Comma-separated in the form; split into an array on save. */
  productNames: z.string().trim().optional(),
  addressLine: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  pincode: z.string().trim().optional(),
  gstin: z.string().trim().optional(),
})

export type SupplierInput = z.infer<typeof supplierSchema>
