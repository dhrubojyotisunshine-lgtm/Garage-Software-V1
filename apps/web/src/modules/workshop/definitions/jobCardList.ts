import type { ColumnDef, FilterDef } from '@garage/ui'
import { jobCardStatusMap, paymentStatusMap } from '@garage/shared'
import { SERVICE_TYPES } from '@/store/seed'

/**
 * Job Card list definitions.
 *
 * Columns and filters transcribed from 05_MODULE_FLOWS-03_WORKSHOP.md §7–8.
 * These are DATA — the same shapes will drive API query parameters later.
 */

export interface JobCardListRow extends Record<string, unknown> {
  id: string
  jobCardNo: string
  registration: string
  vehicle: string
  customer: string
  mobile: string
  serviceType: string
  advisor: string
  technician: string
  bay: string
  expectedDelivery: string
  amount: number
  paymentStatus: string
  priority: string
  status: string
  overdue: boolean
}

/** Workshop §7 */
export const JOB_CARD_FILTERS: FilterDef[] = [
  {
    key: 'serviceType',
    label: 'Service Type',
    type: 'select',
    width: 170,
    options: SERVICE_TYPES.map((v) => ({ label: v, value: v })),
  },
  {
    key: 'priority',
    label: 'Priority',
    type: 'select',
    width: 130,
    options: ['Low', 'Normal', 'High', 'Urgent'].map((v) => ({ label: v, value: v })),
  },
  {
    key: 'paymentStatus',
    label: 'Payment Status',
    type: 'select',
    width: 160,
    advanced: true,
    options: ['Not Invoiced', 'Unpaid', 'Partially Paid', 'Paid'].map((v) => ({
      label: v,
      value: v,
    })),
  },
  { key: 'expectedDelivery', label: 'Expected Delivery', type: 'daterange', advanced: true },
]

/** Workshop §8 */
export const JOB_CARD_COLUMNS: ColumnDef<JobCardListRow>[] = [
  {
    key: 'jobCardNo',
    title: 'Job Card',
    type: 'identifier',
    width: 160,
    fixed: 'left',
    locked: true,
    sortable: true,
  },
  { key: 'registration', title: 'Vehicle', type: 'registration', width: 130 },
  { key: 'vehicle', title: 'Model', width: 190, ellipsis: true },
  { key: 'customer', title: 'Customer', width: 170 },
  { key: 'serviceType', title: 'Service Type', width: 150 },
  { key: 'advisor', title: 'Advisor', width: 130, hidden: true },
  { key: 'technician', title: 'Technician', width: 150 },
  { key: 'bay', title: 'Bay', width: 75 },
  {
    key: 'expectedDelivery',
    title: 'Expected Delivery',
    type: 'datetime',
    width: 175,
    sortable: true,
  },
  { key: 'amount', title: 'Amount', type: 'money', width: 130, sortable: true },
  {
    key: 'paymentStatus',
    title: 'Payment',
    type: 'status',
    statusMap: paymentStatusMap,
    width: 140,
  },
  { key: 'status', title: 'Status', type: 'status', statusMap: jobCardStatusMap, width: 175 },
]

/** Status-count tabs. Always includes "All". Workshop §6 */
export const JOB_CARD_QUICK_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Draft', label: 'Draft', tone: 'neutral' as const },
  { key: 'Checked-In', label: 'Check-In', tone: 'progress' as const },
  { key: 'Estimate Preparation', label: 'Estimate', tone: 'progress' as const },
  { key: 'Approval Pending', label: 'Approval Pending', tone: 'action' as const },
  { key: 'Repair In Progress', label: 'Repair', tone: 'progress' as const },
  { key: 'Repair Completed', label: 'Ready to Invoice', tone: 'success' as const },
  { key: 'Invoiced', label: 'Invoiced', tone: 'progress' as const },
  { key: 'Paid', label: 'Paid', tone: 'success' as const },
  { key: 'Delivered', label: 'Delivered', tone: 'closed' as const },
  { key: 'overdue', label: 'Overdue', tone: 'failure' as const },
]
