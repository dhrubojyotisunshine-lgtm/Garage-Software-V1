/**
 * Stock ledger.
 *
 * StockTransaction is the SOURCE OF TRUTH for inventory. Product.onHand is a
 * derived cache kept in step by the same operation that writes the ledger, and
 * reconcilable against it at any time.
 *
 * Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.6, 05_MODULE_FLOWS-04_INVENTORY.md §34
 */

import type { ID, ISODateTime, Paise } from './common'

/** Movement types. Ref: Inventory §35 */
export const STOCK_TRANSACTION_TYPES = [
  'Opening Stock',
  'Stock In',
  'Purchase Receipt',
  'Job Card Issue',
  'Job Card Return',
  'Adjustment',
  'Damage',
  'Loss',
  'Physical Verification',
] as const

export type StockTransactionType = (typeof STOCK_TRANSACTION_TYPES)[number]

export type StockDirection = 'In' | 'Out'

/** Which record caused the movement, so every unit traces to a document. §37 */
export type StockSourceType = 'JobCard' | 'Manual' | 'Purchase'

export interface StockTransaction {
  id: ID
  companyId: ID
  branchId: ID
  financialYear: string

  txnNo: string
  productId: ID

  type: StockTransactionType
  direction: StockDirection
  /** Always positive — direction carries the sign. */
  quantity: number
  /** Running balance immediately after this movement. */
  balanceAfter: number

  /** Valuation rate at the time of movement. */
  rate?: Paise

  reason?: string
  reference?: string

  sourceType: StockSourceType
  sourceId?: ID
  /** Human-readable source, e.g. "JC-2026-000001". */
  sourceRef?: string

  at: ISODateTime
  by: string
}

/** Movement types that increase stock. */
export const INWARD_TYPES: StockTransactionType[] = [
  'Opening Stock',
  'Stock In',
  'Purchase Receipt',
  'Job Card Return',
]

export function directionOf(type: StockTransactionType): StockDirection {
  return INWARD_TYPES.includes(type) ? 'In' : 'Out'
}
