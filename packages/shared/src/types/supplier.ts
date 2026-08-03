/**
 * Supplier.
 *
 * The party a garage buys parts from. Kept as one record used by Inventory and
 * Purchase alike — 04_ALL_MODULES.md §35 forbids a separate supplier database
 * per module.
 */

import type { ID, ISODateTime } from './common'

export interface Supplier {
  id: ID
  companyId: ID
  branchId: ID

  code: string
  firstName: string
  lastName?: string
  companyName: string

  email?: string
  mobile?: string

  /** Products this supplier provides — shown on the list. */
  productNames: string[]

  addressLine?: string
  city?: string
  state?: string
  pincode?: string
  gstin?: string

  /** Avatar / logo. */
  imageUrl?: string

  status: 'Active' | 'Inactive'
  createdAt: ISODateTime
}

/** Display name: company first, falling back to the person. */
export function supplierDisplayName(s: Pick<Supplier, 'companyName' | 'firstName' | 'lastName'>) {
  return s.companyName?.trim() || `${s.firstName} ${s.lastName ?? ''}`.trim()
}
