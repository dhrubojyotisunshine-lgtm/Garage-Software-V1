import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Customer,
  DeliveryChecklist,
  Employee,
  ID,
  JobCard,
  JobCardItem,
  JobCardStatus,
  Paise,
  Payment,
  PaymentMode,
  Product,
  TimelineEvent,
  Vehicle,
} from '@garage/shared'
import {
  formatDocumentNumber,
  invoiceTotals,
  jobCardMachine,
  paymentStatus,
  toPaise,
} from '@garage/shared'
import {
  COMPANY_ID,
  seedCustomers,
  seedEmployees,
  seedProducts,
  seedVehicles,
} from './seed'

/**
 * Workshop data store.
 *
 * This is the mock persistence layer for the frontend phase. Every mutation
 * here is the exact shape of an eventual API call — when the backend lands,
 * these action bodies call the API and the screens do not change.
 *
 * The operations marked TRANSACTIONAL must become single MongoDB transactions
 * server-side. Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.6
 */

const now = () => new Date().toISOString()
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`

export interface Counters {
  customer: number
  jobCard: number
  invoice: number
  receipt: number
  gatePass: number
}

interface WorkshopState {
  customers: Customer[]
  vehicles: Vehicle[]
  products: Product[]
  employees: Employee[]
  jobCards: JobCard[]
  counters: Counters

  /* --------------------------------------------------------------- reads */
  customerById: (id?: ID) => Customer | undefined
  vehicleById: (id?: ID) => Vehicle | undefined
  productById: (id?: ID) => Product | undefined
  employeeById: (id?: ID) => Employee | undefined
  jobCardById: (id?: ID) => JobCard | undefined
  vehiclesOfCustomer: (customerId: ID) => Vehicle[]
  jobCardsOfCustomer: (customerId: ID) => JobCard[]
  jobCardsOfVehicle: (vehicleId: ID) => JobCard[]
  technicians: () => Employee[]
  advisors: () => Employee[]

  /* ------------------------------------------------------------- customer */
  createCustomer: (input: Omit<Customer, 'id' | 'code' | 'companyId' | 'createdAt' | 'status'>) => Customer
  updateCustomer: (id: ID, patch: Partial<Customer>) => void

  /* -------------------------------------------------------------- vehicle */
  createVehicle: (input: Omit<Vehicle, 'id' | 'companyId' | 'createdAt'>) => Vehicle

  /* ------------------------------------------------------------- job card */
  createJobCard: (
    input: Pick<
      JobCard,
      | 'branchId'
      | 'financialYear'
      | 'customerId'
      | 'vehicleId'
      | 'complaints'
      | 'serviceType'
      | 'priority'
      | 'odometer'
      | 'fuelLevel'
      | 'advisorId'
      | 'expectedDelivery'
    >,
    actor: string,
  ) => JobCard

  transition: (
    jobCardId: ID,
    to: JobCardStatus,
    actor: string,
    opts?: { reason?: string },
  ) => void

  assignTechnician: (jobCardId: ID, technicianId: ID, bay: string | undefined, actor: string) => void

  addItem: (jobCardId: ID, item: Omit<JobCardItem, 'id' | 'issued'>, actor: string) => void
  updateItem: (jobCardId: ID, itemId: ID, patch: Partial<JobCardItem>, actor: string) => void
  removeItem: (jobCardId: ID, itemId: ID, actor: string) => void

  /** TRANSACTIONAL: stock ledger + balance + job card line, atomically. */
  issuePart: (jobCardId: ID, itemId: ID, actor: string) => { ok: boolean; error?: string }
  returnPart: (jobCardId: ID, itemId: ID, actor: string) => void

  /** TRANSACTIONAL: invoice + number series + status + receivable + journal. */
  generateInvoice: (jobCardId: ID, actor: string) => string | undefined

  /** TRANSACTIONAL: payment + invoice paid amount + receivable + journal. */
  recordPayment: (
    jobCardId: ID,
    input: { amount: Paise; mode: PaymentMode; reference?: string },
    actor: string,
  ) => Payment

  completeDelivery: (
    jobCardId: ID,
    checklist: DeliveryChecklist,
    receivedBy: string,
    actor: string,
  ) => string

  resetDemoData: () => void
}

/** Timeline events are emitted by actions, never by components. §4.3 */
function event(kind: string, title: string, by: string, detail?: string): TimelineEvent {
  return { id: uid('tl'), at: now(), by, kind, title, detail }
}

const initialState = {
  customers: seedCustomers,
  vehicles: seedVehicles,
  products: seedProducts,
  employees: seedEmployees,
  jobCards: [] as JobCard[],
  counters: { customer: 4, jobCard: 0, invoice: 0, receipt: 0, gatePass: 0 },
}

export const useWorkshopStore = create<WorkshopState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /* ------------------------------------------------------------ reads */
      customerById: (id) => get().customers.find((c) => c.id === id),
      vehicleById: (id) => get().vehicles.find((v) => v.id === id),
      productById: (id) => get().products.find((p) => p.id === id),
      employeeById: (id) => get().employees.find((e) => e.id === id),
      jobCardById: (id) => get().jobCards.find((j) => j.id === id),
      vehiclesOfCustomer: (customerId) => get().vehicles.filter((v) => v.customerId === customerId),
      jobCardsOfCustomer: (customerId) => get().jobCards.filter((j) => j.customerId === customerId),
      jobCardsOfVehicle: (vehicleId) => get().jobCards.filter((j) => j.vehicleId === vehicleId),
      technicians: () => get().employees.filter((e) => e.role === 'Technician'),
      advisors: () => get().employees.filter((e) => e.role === 'Service Advisor'),

      /* --------------------------------------------------------- customer */
      createCustomer: (input) => {
        const seq = get().counters.customer + 1
        const customer: Customer = {
          ...input,
          id: uid('cust'),
          companyId: COMPANY_ID,
          code: `CUS-${String(seq).padStart(6, '0')}`,
          status: 'Active',
          createdAt: now(),
        }
        set((s) => ({
          customers: [customer, ...s.customers],
          counters: { ...s.counters, customer: seq },
        }))
        return customer
      },

      updateCustomer: (id, patch) =>
        set((s) => ({
          customers: s.customers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),

      /* ---------------------------------------------------------- vehicle */
      createVehicle: (input) => {
        const vehicle: Vehicle = {
          ...input,
          id: uid('veh'),
          companyId: COMPANY_ID,
          createdAt: now(),
        }
        set((s) => ({ vehicles: [vehicle, ...s.vehicles] }))
        return vehicle
      },

      /* --------------------------------------------------------- job card */
      createJobCard: (input, actor) => {
        const seq = get().counters.jobCard + 1
        const jobCard: JobCard = {
          ...input,
          id: uid('jc'),
          companyId: COMPANY_ID,
          jobCardNo: formatDocumentNumber('JC', input.financialYear, seq),
          status: 'Draft',
          items: [],
          payments: [],
          timeline: [event('status', 'Job card created', actor)],
          createdAt: now(),
        }

        set((s) => ({
          jobCards: [jobCard, ...s.jobCards],
          counters: { ...s.counters, jobCard: seq },
          // Vehicle odometer advances with each visit.
          vehicles: s.vehicles.map((v) =>
            v.id === input.vehicleId ? { ...v, lastOdometer: input.odometer } : v,
          ),
        }))
        return jobCard
      },

      transition: (jobCardId, to, actor, opts) => {
        const jobCard = get().jobCardById(jobCardId)
        if (!jobCard) return

        // Never allow a free-form status write. §4.7
        jobCardMachine.assert(jobCard.status, to)

        set((s) => ({
          jobCards: s.jobCards.map((j) => {
            if (j.id !== jobCardId) return j
            const patch: Partial<JobCard> = { status: to }

            if (to === 'Approval Pending') patch.estimateSentAt = now()
            if (to === 'Approved') patch.estimateApprovedAt = now()
            if (to === 'Cancelled') {
              patch.cancelledAt = now()
              patch.cancellationReason = opts?.reason
            }

            return {
              ...j,
              ...patch,
              timeline: [
                event('status', `Status changed to ${to}`, actor, opts?.reason),
                ...j.timeline,
              ],
            }
          }),
        }))
      },

      assignTechnician: (jobCardId, technicianId, bay, actor) => {
        const tech = get().employeeById(technicianId)
        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  technicianId,
                  bay,
                  timeline: [
                    event(
                      'assignment',
                      `Technician assigned — ${tech?.name ?? technicianId}`,
                      actor,
                      bay ? `Bay ${bay}` : undefined,
                    ),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
      },

      /* ------------------------------------------------------------ items */
      addItem: (jobCardId, item, actor) => {
        const line: JobCardItem = { ...item, id: uid('item'), issued: false }
        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  items: [...j.items, line],
                  timeline: [
                    event('item', `${item.type} added — ${item.name}`, actor, `Qty ${item.quantity}`),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
      },

      updateItem: (jobCardId, itemId, patch, actor) =>
        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  items: j.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
                  timeline: [event('item', 'Line item updated', actor), ...j.timeline],
                }
              : j,
          ),
        })),

      removeItem: (jobCardId, itemId, actor) => {
        const jobCard = get().jobCardById(jobCardId)
        const item = jobCard?.items.find((i) => i.id === itemId)

        // Removing an issued part must return the stock. §4.6
        if (item?.issued && item.productId) get().returnPart(jobCardId, itemId, actor)

        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  items: j.items.filter((i) => i.id !== itemId),
                  timeline: [
                    event('item', `Item removed — ${item?.name ?? itemId}`, actor),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
      },

      /**
       * TRANSACTIONAL — issuing a part must atomically touch:
       * StockTransaction + StockBalance + JobCard.items + Reservation.
       * Here it is one set(); server-side it is one Mongo transaction.
       */
      issuePart: (jobCardId, itemId, actor) => {
        const jobCard = get().jobCardById(jobCardId)
        const item = jobCard?.items.find((i) => i.id === itemId)
        if (!jobCard || !item || !item.productId) return { ok: false, error: 'Line not found' }
        if (item.issued) return { ok: false, error: 'Already issued' }

        const product = get().productById(item.productId)
        if (!product) return { ok: false, error: 'Product not found' }

        const available = product.onHand - product.reserved
        if (available < item.quantity) {
          return {
            ok: false,
            error: `Only ${available} ${product.unit} available — cannot issue ${item.quantity}`,
          }
        }

        set((s) => ({
          products: s.products.map((p) =>
            p.id === product.id ? { ...p, onHand: p.onHand - item.quantity } : p,
          ),
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  items: j.items.map((i) => (i.id === itemId ? { ...i, issued: true } : i)),
                  timeline: [
                    event(
                      'stock',
                      `Part issued — ${item.name}`,
                      actor,
                      `${item.quantity} ${item.unit} out of stock`,
                    ),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
        return { ok: true }
      },

      returnPart: (jobCardId, itemId, actor) => {
        const jobCard = get().jobCardById(jobCardId)
        const item = jobCard?.items.find((i) => i.id === itemId)
        if (!jobCard || !item?.productId || !item.issued) return

        set((s) => ({
          products: s.products.map((p) =>
            p.id === item.productId ? { ...p, onHand: p.onHand + item.quantity } : p,
          ),
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  items: j.items.map((i) => (i.id === itemId ? { ...i, issued: false } : i)),
                  timeline: [
                    event('stock', `Part returned — ${item.name}`, actor, `${item.quantity} ${item.unit}`),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
      },

      /* ---------------------------------------------------------- invoice */
      generateInvoice: (jobCardId, actor) => {
        const jobCard = get().jobCardById(jobCardId)
        if (!jobCard || jobCard.invoiceNo) return jobCard?.invoiceNo

        const seq = get().counters.invoice + 1
        const invoiceNo = formatDocumentNumber('INV', jobCard.financialYear, seq)
        const totals = invoiceTotals(jobCard)

        set((s) => ({
          counters: { ...s.counters, invoice: seq },
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  invoiceNo,
                  invoicedAt: now(),
                  status: 'Invoiced',
                  timeline: [
                    event(
                      'invoice',
                      `Invoice generated — ${invoiceNo}`,
                      actor,
                      `₹ ${(totals.total / 100).toLocaleString('en-IN')}`,
                    ),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
        return invoiceNo
      },

      /* ---------------------------------------------------------- payment */
      recordPayment: (jobCardId, input, actor) => {
        const seq = get().counters.receipt + 1
        const payment: Payment = {
          id: uid('pay'),
          receiptNo: formatDocumentNumber('RCP', get().jobCardById(jobCardId)!.financialYear, seq),
          amount: input.amount,
          mode: input.mode,
          reference: input.reference,
          receivedAt: now(),
          receivedBy: actor,
        }

        set((s) => ({
          counters: { ...s.counters, receipt: seq },
          jobCards: s.jobCards.map((j) => {
            if (j.id !== jobCardId) return j
            const updated = { ...j, payments: [...j.payments, payment] }
            // Payment status is derived, never stored independently.
            const status: JobCardStatus =
              paymentStatus(updated) === 'Paid' ? 'Paid' : 'Partially Paid'
            return {
              ...updated,
              status,
              timeline: [
                event(
                  'payment',
                  `Payment received — ${payment.receiptNo}`,
                  actor,
                  `₹ ${(input.amount / 100).toLocaleString('en-IN')} via ${input.mode}`,
                ),
                ...updated.timeline,
              ],
            }
          }),
        }))
        return payment
      },

      /* --------------------------------------------------------- delivery */
      completeDelivery: (jobCardId, checklist, receivedBy, actor) => {
        const seq = get().counters.gatePass + 1
        const jobCard = get().jobCardById(jobCardId)!
        const gatePassNo = formatDocumentNumber('GP', jobCard.financialYear, seq)

        set((s) => ({
          counters: { ...s.counters, gatePass: seq },
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  gatePassNo,
                  deliveryChecklist: checklist,
                  deliveredAt: now(),
                  status: 'Delivered',
                  timeline: [
                    event('delivery', `Vehicle delivered — ${gatePassNo}`, actor, `Received by ${receivedBy}`),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
        return gatePassNo
      },

      resetDemoData: () => set({ ...initialState }),
    }),
    {
      name: 'garage-erp-workshop',
      version: 1,
      partialize: (s) => ({
        customers: s.customers,
        vehicles: s.vehicles,
        products: s.products,
        employees: s.employees,
        jobCards: s.jobCards,
        counters: s.counters,
      }),
    },
  ),
)

/** Rupee-entry helper for forms; the store always stores paise. */
export const rupeesToPaise = toPaise
