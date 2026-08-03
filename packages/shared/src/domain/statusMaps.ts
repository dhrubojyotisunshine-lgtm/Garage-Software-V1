/**
 * Status → tone maps.
 *
 * This file is the single place a status colour is decided for the whole ERP.
 * Modules import a map; they never choose a tone inline.
 *
 * Ref: 01_ADMIN_THEME.md §6 and §22, 03_PAGE_TEMPLATES.md §9
 */

import type { StatusMap } from '../types/status'

/**
 * Job Card — all 27 statuses from 05_MODULE_FLOWS-03_WORKSHOP.md §159.
 *
 * Note the WAITING vs NEEDS-ACTION distinction (01_ADMIN_THEME.md §6):
 *   waiting = something else must happen first
 *   action  = a person must act now
 */
export const jobCardStatusMap: StatusMap = {
  Draft: 'neutral',
  Waiting: 'neutral',

  'Checked-In': 'progress',
  Inspection: 'progress',
  'Estimate Preparation': 'progress',
  'Repair In Progress': 'progress',
  Invoiced: 'progress',
  'Partially Paid': 'progress',

  'Waiting for Bay': 'waiting',
  'Waiting for Parts': 'waiting',
  'Waiting for Outsource': 'waiting',
  Paused: 'waiting',
  'On Hold': 'waiting',

  'Approval Pending': 'action',
  'Waiting for Approval': 'action',
  QC: 'action',
  Rework: 'action',

  Approved: 'success',
  'Repair Completed': 'success',
  Ready: 'success',
  Paid: 'success',
  'Gate Pass Generated': 'success',
  Delivered: 'success',

  Cancelled: 'failure',

  Closed: 'closed',
}

/** Payment status — Workshop §161. Reused by every billable document. */
export const paymentStatusMap: StatusMap = {
  'Not Invoiced': 'neutral',
  Unpaid: 'action',
  'Partially Paid': 'progress',
  Paid: 'success',
  Credit: 'waiting',
  Overdue: 'failure',
  Refunded: 'closed',
  'Partially Refunded': 'closed',
}

/** Approval status — shared by every approval workflow. 04_ALL_MODULES.md §92 */
export const approvalStatusMap: StatusMap = {
  'Not Required': 'neutral',
  Draft: 'neutral',
  Pending: 'action',
  'Partially Approved': 'progress',
  Approved: 'success',
  Rejected: 'failure',
  Expired: 'closed',
}

/** Generic active/inactive used by masters, products, employees, users. */
export const activeStatusMap: StatusMap = {
  Active: 'success',
  Inactive: 'neutral',
  Blocked: 'failure',
  Suspended: 'waiting',
  Archived: 'closed',
}

/** Stock availability — Inventory §29. */
export const stockStatusMap: StatusMap = {
  'In Stock': 'success',
  'Low Stock': 'action',
  'Out of Stock': 'failure',
  Reserved: 'waiting',
  'In Transit': 'progress',
  Damaged: 'failure',
  'Dead Stock': 'closed',
}

/** Lead status — CRM. */
export const leadStatusMap: StatusMap = {
  New: 'neutral',
  Contacted: 'progress',
  'Follow-Up': 'progress',
  Interested: 'progress',
  'Quotation Sent': 'action',
  Negotiation: 'action',
  'On Hold': 'waiting',
  Won: 'success',
  Lost: 'failure',
  Closed: 'closed',
}

/** Registry so a screen can look a map up by entity name. */
export const statusMaps = {
  jobCard: jobCardStatusMap,
  payment: paymentStatusMap,
  approval: approvalStatusMap,
  active: activeStatusMap,
  stock: stockStatusMap,
  lead: leadStatusMap,
} as const

export type StatusMapKey = keyof typeof statusMaps
