/**
 * Notification, approval and reminder feed — derived from live data.
 *
 * Nothing here is invented: every entry is a real condition on a real job card
 * or product, so the badge always means "someone must act".
 * Ref: 02_NAVIGATION.md §9, §11
 */

import { availableStock, formatRelative, isOverdue, balanceDue } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

export interface AlertItem {
  id: string
  kind: 'alert' | 'approval' | 'reminder'
  title: string
  context: string
  time: string
  href: string
}

export interface AlertFeed {
  items: AlertItem[]
  counts: {
    alerts: number
    approvals: number
    reminders: number
    /** Drives the sidebar badges. */
    estimatesAwaiting: number
    lowStock: number
    overdue: number
  }
}

export function buildAlertFeed(): AlertFeed {
  const store = useWorkshopStore.getState()
  const items: AlertItem[] = []

  const awaitingApproval = store.jobCards.filter((j) => j.status === 'Approval Pending')
  const overdue = store.jobCards.filter(isOverdue)
  const unpaid = store.jobCards.filter((j) => j.invoiceNo && balanceDue(j) > 0)
  const readyToInvoice = store.jobCards.filter((j) => j.status === 'Repair Completed')
  const lowStock = store.products.filter(
    (p) => p.status === 'Active' && availableStock(p) <= p.reorderLevel,
  )

  for (const j of awaitingApproval) {
    const customer = store.customerById(j.customerId)
    items.push({
      id: `ap-${j.id}`,
      kind: 'approval',
      title: `Estimate awaiting approval — ${j.jobCardNo}`,
      context: customer?.name ?? '',
      time: formatRelative(j.estimateSentAt),
      href: `/workshop/job-cards/${j.id}/estimate`,
    })
  }

  for (const j of overdue) {
    const vehicle = store.vehicleById(j.vehicleId)
    items.push({
      id: `od-${j.id}`,
      kind: 'alert',
      title: `Overdue — ${j.jobCardNo}`,
      context: `${vehicle?.registration ?? ''} · past expected delivery`,
      time: formatRelative(j.expectedDelivery),
      href: `/workshop/job-cards/${j.id}/overview`,
    })
  }

  for (const j of readyToInvoice) {
    items.push({
      id: `inv-${j.id}`,
      kind: 'alert',
      title: `Ready to invoice — ${j.jobCardNo}`,
      context: 'Repair completed',
      time: formatRelative(j.createdAt),
      href: `/workshop/job-cards/${j.id}/invoice`,
    })
  }

  for (const j of unpaid) {
    items.push({
      id: `pay-${j.id}`,
      kind: 'reminder',
      title: `Payment pending — ${j.invoiceNo}`,
      context: `₹ ${(balanceDue(j) / 100).toLocaleString('en-IN')} outstanding`,
      time: formatRelative(j.invoicedAt),
      href: `/workshop/job-cards/${j.id}/invoice`,
    })
  }

  for (const p of lowStock.slice(0, 8)) {
    items.push({
      id: `stk-${p.id}`,
      kind: 'reminder',
      title: `Low stock — ${p.name}`,
      context: `${availableStock(p)} ${p.unit} left (reorder at ${p.reorderLevel})`,
      time: '',
      href: '/inventory/products',
    })
  }

  return {
    items,
    counts: {
      alerts: items.filter((i) => i.kind === 'alert').length,
      approvals: items.filter((i) => i.kind === 'approval').length,
      reminders: items.filter((i) => i.kind === 'reminder').length,
      estimatesAwaiting: awaitingApproval.length,
      lowStock: lowStock.length,
      overdue: overdue.length,
    },
  }
}
