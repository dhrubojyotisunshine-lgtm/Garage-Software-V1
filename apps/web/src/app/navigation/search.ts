/**
 * Global Search — searches live store data.
 *
 * Searchable entities per 02_NAVIGATION.md §5, scoped to the MVP: job cards,
 * customers, vehicles and products. Results carry enough context to
 * disambiguate, max 5 per group.
 */

import { formatMobile, formatRegistration, availableStock } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

export interface SearchResult {
  id: string
  title: string
  subtitle: string
  path: string
}

export interface SearchGroup {
  entity: string
  results: SearchResult[]
}

const MAX_PER_GROUP = 5

export function searchEverything(query: string): SearchGroup[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const store = useWorkshopStore.getState()
  const groups: SearchGroup[] = []

  /* Job cards — number, service type, registration. */
  const jobCards = store.jobCards
    .filter((j) => {
      const vehicle = store.vehicleById(j.vehicleId)
      const customer = store.customerById(j.customerId)
      return (
        j.jobCardNo.toLowerCase().includes(q) ||
        j.serviceType.toLowerCase().includes(q) ||
        (j.invoiceNo ?? '').toLowerCase().includes(q) ||
        (vehicle?.registration ?? '').toLowerCase().includes(q.replace(/\s/g, '')) ||
        (customer?.name ?? '').toLowerCase().includes(q)
      )
    })
    .slice(0, MAX_PER_GROUP)
    .map((j) => {
      const vehicle = store.vehicleById(j.vehicleId)
      const customer = store.customerById(j.customerId)
      return {
        id: `jc-${j.id}`,
        title: j.jobCardNo,
        subtitle: `${formatRegistration(vehicle?.registration ?? '')} · ${customer?.name ?? ''} · ${j.status}`,
        path: `/workshop/job-cards/${j.id}/overview`,
      }
    })
  if (jobCards.length) groups.push({ entity: 'Job Cards', results: jobCards })

  /* Vehicles — registration, model, VIN. */
  const vehicles = store.vehicles
    .filter(
      (v) =>
        v.registration.toLowerCase().includes(q.replace(/\s/g, '')) ||
        `${v.manufacturer} ${v.model}`.toLowerCase().includes(q) ||
        (v.vin ?? '').toLowerCase().includes(q),
    )
    .slice(0, MAX_PER_GROUP)
    .map((v) => {
      const owner = store.customerById(v.customerId)
      return {
        id: `veh-${v.id}`,
        title: formatRegistration(v.registration),
        subtitle: `${v.manufacturer} ${v.model} ${v.variant ?? ''} · ${owner?.name ?? ''}`.trim(),
        path: `/crm/customers/${v.customerId}/vehicles`,
      }
    })
  if (vehicles.length) groups.push({ entity: 'Vehicles', results: vehicles })

  /* Customers — name, mobile, code. */
  const customers = store.customers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        c.code.toLowerCase().includes(q),
    )
    .slice(0, MAX_PER_GROUP)
    .map((c) => ({
      id: `cu-${c.id}`,
      title: c.name,
      subtitle: `${formatMobile(c.mobile)} · ${c.city} · ${c.code}`,
      path: `/crm/customers/${c.id}/overview`,
    }))
  if (customers.length) groups.push({ entity: 'Customers', results: customers })

  /* Products — name, SKU, part number. */
  const products = store.products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.partNumber ?? '').toLowerCase().includes(q),
    )
    .slice(0, MAX_PER_GROUP)
    .map((p) => ({
      id: `pr-${p.id}`,
      title: p.name,
      subtitle: `${p.sku} · ${p.brand ?? ''} · ${availableStock(p)} ${p.unit} available`,
      path: `/inventory/products`,
    }))
  if (products.length) groups.push({ entity: 'Parts', results: products })

  return groups
}
