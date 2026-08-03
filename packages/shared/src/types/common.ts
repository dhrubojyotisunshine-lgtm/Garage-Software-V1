/**
 * Core primitive types shared by frontend and (later) backend.
 *
 * Ref: 06_MERN_IMPLEMENTATION_PLAN.md §3.5 (money), §3.4 (branch scoping)
 */

/** Every persisted record is identified by a string id (Mongo ObjectId later). */
export type ID = string

/**
 * Money is ALWAYS stored and transported as integer paise.
 * Never a float. Never a formatted string.
 *
 * ₹ 18,750.00  →  1875000
 *
 * Ref: 01_ADMIN_THEME.md §14, 06_MERN_IMPLEMENTATION_PLAN.md §3.5
 */
export type Paise = number

/** ISO-8601 timestamp string. */
export type ISODateTime = string

/** ISO-8601 date string (no time component). */
export type ISODate = string

/** Financial year in the Indian convention, e.g. "2026-27". */
export type FinancialYear = string

/** Lightweight reference to another record, for display without a join. */
export interface Ref {
  id: ID
  name: string
  code?: string
}

/** Present on every operational document. Ref: 04_ALL_MODULES.md §96-98 */
export interface BranchScoped {
  companyId: ID
  branchId: ID
  financialYear: FinancialYear
}

/** Applied to every persisted record. */
export interface Auditable {
  createdAt: ISODateTime
  createdBy: Ref
  updatedAt?: ISODateTime
  updatedBy?: Ref
  deletedAt?: ISODateTime | null
  deletedBy?: Ref | null
}

/** Standard list envelope returned by every list endpoint. */
export interface Paginated<T> {
  rows: T[]
  total: number
  page: number
  pageSize: number
}

/** Standard list request. Mirrors T02's query-string contract. */
export interface ListQuery {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  branchId?: string
  financialYear?: string
  [filterKey: string]: unknown
}

/** Selectable option used by filters, selects and radio groups. */
export interface Option<V = string> {
  label: string
  value: V
  disabled?: boolean
}

export interface Branch {
  id: ID
  name: string
  code: string
  city?: string
}

export interface CurrentUser {
  id: ID
  name: string
  email: string
  roleName: string
  employeeId?: ID
  branchIds: ID[]
  permissions: string[]
  avatarUrl?: string
}
