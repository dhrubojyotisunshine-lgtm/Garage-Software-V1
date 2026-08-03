/**
 * Workshop MVP domain entities.
 *
 * Scope: Customer → Vehicle → Job Card → Technician → Parts → Estimate →
 * Invoice → Payment → Delivery.
 *
 * Every operational document carries companyId/branchId/financialYear from day
 * one, even though there is one company today — 04_ALL_MODULES.md §98 requires
 * that SaaS conversion is never blocked.
 */

import type { ID, ISODateTime, Paise } from './common'

/* ---------------------------------------------------------------- customer */

export type CustomerType = 'Individual' | 'Business'

export interface Customer {
  id: ID
  companyId: ID
  branchId: ID
  code: string
  name: string
  type: CustomerType
  mobile: string
  altMobile?: string
  email?: string
  addressLine?: string
  city: string
  state: string
  pincode?: string
  gstin?: string
  creditLimit: Paise
  status: 'Active' | 'Inactive'
  createdAt: ISODateTime
}

/* ----------------------------------------------------------------- vehicle */

export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid'
export type TransmissionType = 'Manual' | 'Automatic' | 'AMT' | 'CVT'

export interface Vehicle {
  id: ID
  companyId: ID
  branchId: ID
  customerId: ID
  registration: string
  manufacturer: string
  model: string
  variant?: string
  fuelType: FuelType
  transmission?: TransmissionType
  colour?: string
  manufacturingYear?: number
  vin?: string
  engineNumber?: string
  lastOdometer?: number
  createdAt: ISODateTime
}

/* ---------------------------------------------------------------- employee */

export type EmployeeRole = 'Technician' | 'Service Advisor' | 'Supervisor'

/**
 * Technicians and advisors are Employees — 04_ALL_MODULES.md §57 forbids a
 * separate technician database. HRM will own this entity; Workshop references it.
 */
export interface Employee {
  id: ID
  companyId: ID
  branchId: ID
  code: string
  name: string
  role: EmployeeRole
  skills?: string[]
  available: boolean
}

/* ----------------------------------------------------------------- product */

export type ProductType = 'Spare Part' | 'Lubricant' | 'Consumable' | 'Accessory'

export interface Product {
  id: ID
  companyId: ID
  branchId: ID
  sku: string
  name: string
  type: ProductType
  partNumber?: string
  category: string
  brand?: string
  unit: string
  hsn?: string
  taxRate: number
  purchasePrice: Paise
  sellingPrice: Paise
  /** Physical stock. Ref: Inventory §29 — never mix these into one number. */
  onHand: number
  reserved: number
  reorderLevel: number
  status: 'Active' | 'Inactive'
}

/** ON HAND − RESERVED = AVAILABLE. Ref: Inventory §29 */
export function availableStock(product: Pick<Product, 'onHand' | 'reserved'>): number {
  return product.onHand - product.reserved
}

/* --------------------------------------------------------------- job card */

export type JobCardItemType = 'Labour' | 'Spare' | 'Lubricant'

/** Where the line came from — estimate, or added during repair. Workshop §107 */
export type ItemSource = 'Estimate' | 'Additional'

export interface JobCardItem {
  id: ID
  type: JobCardItemType
  /** Set for Spare and Lubricant lines; absent for Labour. */
  productId?: ID
  name: string
  code?: string
  quantity: number
  unit: string
  rate: Paise
  discountPercent: number
  taxRate: number
  source: ItemSource
  /** True once stock has been issued against this line. */
  issued: boolean
}

export type PaymentMode = 'Cash' | 'UPI' | 'Card' | 'Bank Transfer' | 'Cheque'

export interface Payment {
  id: ID
  receiptNo: string
  amount: Paise
  mode: PaymentMode
  reference?: string
  receivedAt: ISODateTime
  receivedBy: string
}

export interface TimelineEvent {
  id: ID
  at: ISODateTime
  by: string
  /** Short machine-ish label: "status", "item", "payment", "assignment". */
  kind: string
  title: string
  detail?: string
}

export interface DeliveryChecklist {
  vehicleCleaned: boolean
  accessoriesReturned: boolean
  documentsHanded: boolean
  customerSatisfied: boolean
}

export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent'

export interface JobCard {
  id: ID
  companyId: ID
  branchId: ID
  financialYear: string

  jobCardNo: string
  customerId: ID
  vehicleId: ID

  complaints: string[]
  serviceType: string
  priority: Priority
  status: JobCardStatus

  odometer: number
  fuelLevel: string

  advisorId: ID
  technicianId?: ID
  bay?: string

  expectedDelivery: ISODateTime

  items: JobCardItem[]

  estimateSentAt?: ISODateTime
  estimateApprovedAt?: ISODateTime
  estimateRejectedAt?: ISODateTime
  estimateRejectionReason?: string

  invoiceNo?: string
  invoicedAt?: ISODateTime

  payments: Payment[]

  gatePassNo?: string
  deliveryChecklist?: DeliveryChecklist
  deliveredAt?: ISODateTime

  cancelledAt?: ISODateTime
  cancellationReason?: string

  timeline: TimelineEvent[]
  createdAt: ISODateTime
}

/* ---------------------------------------------------------------- statuses */

/**
 * MVP subset of the 27 statuses in Workshop §159. The full vocabulary stays in
 * statusMaps.ts so expanding later adds transitions, not a rewrite.
 */
export const JOB_CARD_STATUSES = [
  'Draft',
  'Checked-In',
  'Estimate Preparation',
  'Approval Pending',
  'Approved',
  'Repair In Progress',
  'Repair Completed',
  'Invoiced',
  'Partially Paid',
  'Paid',
  'Delivered',
  'Cancelled',
] as const

export type JobCardStatus = (typeof JOB_CARD_STATUSES)[number]

/** Payment status is a SEPARATE axis from job status. Workshop §160, §161 */
export type JobCardPaymentStatus =
  | 'Not Invoiced'
  | 'Unpaid'
  | 'Partially Paid'
  | 'Paid'
