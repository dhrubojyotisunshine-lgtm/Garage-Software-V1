/**
 * Inventory domain logic.
 *
 * Pure functions. The API will import these and enforce the same rules rather
 * than reimplementing them.
 */

import type { Paise } from '../types/common'
import type { Product } from '../types/workshop'
import type { StockTransaction, StockTransactionType } from '../types/inventory'
import { directionOf } from '../types/inventory'
import { sumPaise } from '../utils/money'

/* ------------------------------------------------------------- quantities */

/** Signed effect of one movement on the balance. */
export function signedQuantity(txn: Pick<StockTransaction, 'direction' | 'quantity'>): number {
  return txn.direction === 'In' ? txn.quantity : -txn.quantity
}

/**
 * Recompute a product's balance from its ledger.
 * This is the definition of correct — `onHand` is only a cache of this.
 */
export function balanceFromLedger(transactions: StockTransaction[]): number {
  return transactions.reduce((acc, t) => acc + signedQuantity(t), 0)
}

export interface StockPosition {
  onHand: number
  reserved: number
  available: number
}

/** ON HAND − RESERVED = AVAILABLE. Never collapse these into one number. §29 */
export function stockPosition(product: Pick<Product, 'onHand' | 'reserved'>): StockPosition {
  return {
    onHand: product.onHand,
    reserved: product.reserved,
    available: product.onHand - product.reserved,
  }
}

/* -------------------------------------------------------- reconciliation */

export interface ReconciliationRow {
  productId: string
  sku: string
  name: string
  cachedOnHand: number
  ledgerBalance: number
  difference: number
}

/**
 * Compare every product's cached balance against its ledger.
 *
 * A non-empty result means a write escaped the ledger — the exact defect this
 * design exists to make impossible. In production this runs nightly and alerts.
 * Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.6
 */
export function reconcileStock(
  products: Product[],
  transactions: StockTransaction[],
): ReconciliationRow[] {
  const byProduct = new Map<string, StockTransaction[]>()
  for (const t of transactions) {
    const list = byProduct.get(t.productId)
    if (list) list.push(t)
    else byProduct.set(t.productId, [t])
  }

  const rows: ReconciliationRow[] = []
  for (const product of products) {
    const ledgerBalance = balanceFromLedger(byProduct.get(product.id) ?? [])
    if (ledgerBalance !== product.onHand) {
      rows.push({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        cachedOnHand: product.onHand,
        ledgerBalance,
        difference: product.onHand - ledgerBalance,
      })
    }
  }
  return rows
}

/* -------------------------------------------------------------- guards */

export interface StockGuard {
  ok: boolean
  reason?: string
}

/** Stock can never be issued below zero available. */
export function canIssue(product: Product, quantity: number): StockGuard {
  if (quantity <= 0) return { ok: false, reason: 'Quantity must be greater than zero' }
  const { available } = stockPosition(product)
  if (available < quantity) {
    return {
      ok: false,
      reason: `Only ${available} ${product.unit} available — cannot issue ${quantity}`,
    }
  }
  return { ok: true }
}

/** An outward manual movement (damage, loss, adjustment down) has the same floor. */
export function canRemoveStock(product: Product, quantity: number): StockGuard {
  if (quantity <= 0) return { ok: false, reason: 'Quantity must be greater than zero' }
  if (product.onHand < quantity) {
    return {
      ok: false,
      reason: `Only ${product.onHand} ${product.unit} on hand — cannot remove ${quantity}`,
    }
  }
  return { ok: true }
}

/* ------------------------------------------------------------ valuation */

/** Stock value at purchase price — the conservative basis for reporting. */
export function stockValue(products: Product[]): Paise {
  return sumPaise(products.map((p) => p.onHand * p.purchasePrice))
}

export function stockValueAtSelling(products: Product[]): Paise {
  return sumPaise(products.map((p) => p.onHand * p.sellingPrice))
}

/* --------------------------------------------------------- stock status */

export type StockLevel = 'In Stock' | 'Low Stock' | 'Out of Stock'

export function stockLevel(product: Product): StockLevel {
  const { available } = stockPosition(product)
  if (available <= 0) return 'Out of Stock'
  if (available <= product.reorderLevel) return 'Low Stock'
  return 'In Stock'
}

export function needsReorder(product: Product): boolean {
  return stockLevel(product) !== 'In Stock' && product.status === 'Active'
}

/** Suggested order quantity to return to roughly twice the reorder level. */
export function suggestedOrderQuantity(product: Product): number {
  const target = product.reorderLevel * 2
  return Math.max(0, target - stockPosition(product).available)
}

/* ------------------------------------------------------------- movement */

/** Human-readable label for a movement's effect. */
export function movementLabel(type: StockTransactionType): string {
  return `${type} (${directionOf(type) === 'In' ? '+' : '−'})`
}

/** Net movement over a set of transactions, split in and out. */
export function movementSummary(transactions: StockTransaction[]) {
  let inward = 0
  let outward = 0
  for (const t of transactions) {
    if (t.direction === 'In') inward += t.quantity
    else outward += t.quantity
  }
  return { inward, outward, net: inward - outward, count: transactions.length }
}
