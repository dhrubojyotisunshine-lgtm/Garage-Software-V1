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
import type {
  ExtendedJobCard,
  JobCardTransaction,
  ReconciliationRow,
  StockTransaction,
  StockTransactionType,
  Person,
  PersonRole,
  Quotation,
  QuotationStatus,
  Supplier,
  TransactionKind,
  WorkNote,
} from '@garage/shared'
import {
  canConvertQuotation,
  canIssue,
  canRemoveStock,
  canTransitionQuotation,
  directionOf,
  formatDocumentNumber,
  invoiceTotals,
  jobCardMachine,
  paymentStatus,
  reconcileStock,
  toPaise,
} from '@garage/shared'
import {
  COMPANY_ID,
  seedCustomers,
  seedEmployees,
  seedPersons,
  seedProducts,
  seedSuppliers,
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
  stockTxn: number
  quotation: number
  person: number
}

interface WorkshopState {
  customers: Customer[]
  vehicles: Vehicle[]
  products: Product[]
  employees: Employee[]
  jobCards: JobCard[]
  /** Source of truth for stock. Product.onHand is a cache of this. §4.6 */
  stockTransactions: StockTransaction[]
  suppliers: Supplier[]
  quotations: Quotation[]
  /** Staff-side user records: employees, support staff, accountants, admins. */
  persons: Person[]
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

  /* --------------------------------------------------------------- person */
  personById: (id?: ID) => Person | undefined
  personsOfRole: (role: PersonRole) => Person[]
  createPerson: (
    input: Omit<Person, 'id' | 'code' | 'companyId' | 'createdAt' | 'status'> & {
      status?: 'Active' | 'Inactive'
    },
  ) => Person
  updatePerson: (id: ID, patch: Partial<Person>) => void
  setPersonStatus: (id: ID, status: 'Active' | 'Inactive') => void
  /** Hard delete. Blocked for anyone referenced by a job card. */
  deletePersons: (ids: ID[]) => { deleted: number; blocked: number }

  /* ------------------------------------------------------------ quotation */
  quotationById: (id?: ID) => Quotation | undefined
  quotationsOfCustomer: (customerId: ID) => Quotation[]
  createQuotation: (
    input: Pick<Quotation, 'branchId' | 'financialYear' | 'customerId'> &
      Partial<Pick<Quotation, 'vehicleId' | 'subject' | 'complaints' | 'notes' | 'terms' | 'discount' | 'discountType' | 'validUntil'>>,
    actor: string,
  ) => Quotation
  updateQuotation: (id: ID, patch: Partial<Quotation>) => void
  addQuotationItem: (id: ID, item: Omit<JobCardItem, 'id' | 'issued'>) => void
  removeQuotationItem: (id: ID, itemId: ID) => void
  /** Status changes go through the quotation machine, never written directly. */
  transitionQuotation: (
    id: ID,
    to: QuotationStatus,
    actor: string,
    opts?: { reason?: string },
  ) => { ok: boolean; error?: string }
  /** Creates a job card from the quote and links the two. */
  convertQuotation: (
    id: ID,
    input: { odometer: number; fuelLevel: string; advisorId: ID; expectedDelivery: string; serviceType: string },
    actor: string,
  ) => { ok: boolean; error?: string; jobCardId?: ID }
  deleteQuotations: (ids: ID[]) => { deleted: number; blocked: number }

  /* ------------------------------------------------------------- customer */
  createCustomer: (
    input: Omit<Customer, 'id' | 'code' | 'companyId' | 'createdAt' | 'status'>,
  ) => Customer
  updateCustomer: (id: ID, patch: Partial<Customer>) => void

  /** Deactivate rather than delete — history must keep its references. */
  setCustomerStatus: (id: ID, status: 'Active' | 'Inactive') => void

  /* -------------------------------------------------------------- vehicle */
  createVehicle: (input: Omit<Vehicle, 'id' | 'companyId' | 'createdAt'>) => Vehicle
  updateVehicle: (id: ID, patch: Partial<Vehicle>) => void

  /* ------------------------------------------------------------- supplier */
  supplierById: (id?: ID) => Supplier | undefined
  createSupplier: (
    input: Omit<Supplier, 'id' | 'code' | 'companyId' | 'createdAt' | 'status'>,
  ) => Supplier
  updateSupplier: (id: ID, patch: Partial<Supplier>) => void
  /** Hard delete, matching the reference product. Blocked if referenced. */
  deleteSuppliers: (ids: ID[]) => { deleted: number; blocked: number }

  /* -------------------------------------------------------------- product */
  createProduct: (
    input: Omit<Product, 'id' | 'companyId' | 'reserved' | 'status'> & {
      status?: 'Active' | 'Inactive'
    },
  ) => Product
  updateProduct: (id: ID, patch: Partial<Product>) => void
  setProductStatus: (id: ID, status: 'Active' | 'Inactive') => void

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

  transition: (jobCardId: ID, to: JobCardStatus, actor: string, opts?: { reason?: string }) => void

  assignTechnician: (
    jobCardId: ID,
    technicianId: ID,
    bay: string | undefined,
    actor: string,
  ) => void

  addItem: (jobCardId: ID, item: Omit<JobCardItem, 'id' | 'issued'>, actor: string) => void
  updateItem: (jobCardId: ID, itemId: ID, patch: Partial<JobCardItem>, actor: string) => void
  removeItem: (jobCardId: ID, itemId: ID, actor: string) => void

  /* -------------------------------------------------- extended job card */
  /** Applies form edits. Status is NOT patchable — it goes through transition(). */
  patchJobCard: (id: ID, patch: Partial<ExtendedJobCard>, actor: string) => void
  addWorkNote: (jobCardId: ID, note: string, actor: string) => void
  addJobCardTransaction: (
    jobCardId: ID,
    input: { kind: TransactionKind; amount: Paise; mode: PaymentMode; details?: string },
    actor: string,
  ) => void

  /** TRANSACTIONAL: stock ledger + balance + job card line, atomically. */
  issuePart: (jobCardId: ID, itemId: ID, actor: string) => { ok: boolean; error?: string }
  returnPart: (jobCardId: ID, itemId: ID, actor: string) => void

  /* -------------------------------------------------------- stock ledger */
  /** Manual movement from the Inventory module. TRANSACTIONAL. */
  recordStockEntry: (
    input: {
      productId: ID
      type: StockTransactionType
      quantity: number
      rate?: Paise
      reason?: string
      reference?: string
      financialYear: string
    },
    actor: string,
  ) => { ok: boolean; error?: string; transaction?: StockTransaction }

  /** Counted quantity replaces the book balance; the delta is recorded. */
  recordPhysicalVerification: (
    input: { productId: ID; countedQuantity: number; reason?: string; financialYear: string },
    actor: string,
  ) => { ok: boolean; error?: string }

  transactionsOfProduct: (productId: ID) => StockTransaction[]
  /** Products whose cached balance disagrees with their ledger. */
  stockDivergence: () => ReconciliationRow[]

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

/** Builds one ledger entry. Every stock movement in the app goes through this. */
function buildTxn(args: {
  seq: number
  product: Product
  type: StockTransactionType
  quantity: number
  balanceAfter: number
  rate?: Paise
  financialYear: string
  sourceType: StockTransaction['sourceType']
  sourceId?: ID
  sourceRef?: string
  reason?: string
  reference?: string
  actor: string
}): StockTransaction {
  return {
    id: uid('stk'),
    companyId: COMPANY_ID,
    branchId: args.product.branchId,
    financialYear: args.financialYear,
    txnNo: formatDocumentNumber('STK', args.financialYear, args.seq),
    productId: args.product.id,
    type: args.type,
    direction: directionOf(args.type),
    quantity: args.quantity,
    balanceAfter: args.balanceAfter,
    rate: args.rate,
    reason: args.reason,
    reference: args.reference,
    sourceType: args.sourceType,
    sourceId: args.sourceId,
    sourceRef: args.sourceRef,
    at: now(),
    by: args.actor,
  }
}

/**
 * Every seeded product gets an Opening Stock ledger entry, so the ledger
 * explains the balance from the very first unit and reconciliation passes
 * from a cold start.
 */
function seedOpeningStock(): StockTransaction[] {
  // A product with no stock gets no opening entry — a zero-quantity movement
  // says nothing and would be noise in the ledger.
  return seedProducts
    .filter((p) => p.onHand > 0)
    .map((p, i) => ({
      id: `stk-seed-${i + 1}`,
      companyId: COMPANY_ID,
      branchId: p.branchId,
      financialYear: '2026-27',
      txnNo: formatDocumentNumber('STK', '2026-27', i + 1),
      productId: p.id,
      type: 'Opening Stock' as const,
      direction: 'In' as const,
      quantity: p.onHand,
      balanceAfter: p.onHand,
      rate: p.purchasePrice,
      reason: 'Opening stock',
      sourceType: 'Manual' as const,
      at: '2026-04-01T09:00:00.000Z',
      by: 'System',
    }))
}

/** Opening entries actually created, so the counter starts in step. */
const openingStockCount = seedProducts.filter((p) => p.onHand > 0).length

const initialState = {
  customers: seedCustomers,
  vehicles: seedVehicles,
  products: seedProducts,
  employees: seedEmployees,
  jobCards: [] as JobCard[],
  stockTransactions: seedOpeningStock(),
  suppliers: seedSuppliers,
  quotations: [],
  persons: seedPersons,
  counters: {
    customer: 4,
    jobCard: 0,
    invoice: 0,
    receipt: 0,
    gatePass: 0,
    stockTxn: openingStockCount,
    quotation: 0,
    person: seedPersons.length,
  },
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

      /* ------------------------------------------------------------ person */
      personById: (id) => get().persons.find((p) => p.id === id),
      personsOfRole: (role) => get().persons.filter((p) => p.role === role),

      createPerson: (input) => {
        const seq = get().counters.person + 1
        const person: Person = {
          ...input,
          id: uid('per'),
          companyId: COMPANY_ID,
          code: `EMP-${String(seq).padStart(4, '0')}`,
          status: input.status ?? 'Active',
          createdAt: now(),
        }
        set((s) => ({
          persons: [person, ...s.persons],
          counters: { ...s.counters, person: seq },
        }))
        return person
      },

      updatePerson: (id, patch) => {
        set((s) => ({ persons: s.persons.map((p) => (p.id === id ? { ...p, ...patch } : p)) }))
      },

      setPersonStatus: (id, status) => {
        set((s) => ({ persons: s.persons.map((p) => (p.id === id ? { ...p, status } : p)) }))
      },

      deletePersons: (ids) => {
        // Someone named on a job card cannot be removed — the history would
        // lose the person who did the work.
        const referenced = new Set<ID>()
        for (const j of get().jobCards) {
          if (j.advisorId) referenced.add(j.advisorId)
          if (j.technicianId) referenced.add(j.technicianId)
          for (const i of j.items) if (i.mechanicId) referenced.add(i.mechanicId)
        }
        let deleted = 0
        let blocked = 0
        const keep: Person[] = []
        for (const p of get().persons) {
          if (!ids.includes(p.id)) {
            keep.push(p)
          } else if (referenced.has(p.id)) {
            blocked += 1
            keep.push(p)
          } else {
            deleted += 1
          }
        }
        if (deleted) set({ persons: keep })
        return { deleted, blocked }
      },

      /* ---------------------------------------------------------- quotation */
      quotationById: (id) => get().quotations.find((q) => q.id === id),
      quotationsOfCustomer: (customerId) =>
        get().quotations.filter((q) => q.customerId === customerId),

      createQuotation: (input, actor) => {
        const seq = get().counters.quotation + 1
        const quotation: Quotation = {
          id: uid('qt'),
          companyId: COMPANY_ID,
          branchId: input.branchId,
          financialYear: input.financialYear,
          quotationNo: formatDocumentNumber('QT', input.financialYear, seq),
          customerId: input.customerId,
          vehicleId: input.vehicleId,
          status: 'Draft',
          subject: input.subject,
          complaints: input.complaints ?? [],
          items: [],
          discount: input.discount ?? 0,
          discountType: input.discountType ?? 'amount',
          // Default validity of a fortnight; a quote without one never expires.
          validUntil:
            input.validUntil ?? new Date(Date.now() + 14 * 86400000).toISOString(),
          notes: input.notes,
          terms: input.terms,
          createdBy: actor,
          createdAt: now(),
        }
        set((s) => ({
          quotations: [quotation, ...s.quotations],
          counters: { ...s.counters, quotation: seq },
        }))
        return quotation
      },

      updateQuotation: (id, patch) => {
        // Status has a machine; a form must not be able to write it.
        const { status: _ignored, ...safe } = patch as Partial<Quotation> & { status?: unknown }
        void _ignored
        set((s) => ({
          quotations: s.quotations.map((q) => (q.id === id ? { ...q, ...safe } : q)),
        }))
      },

      addQuotationItem: (id, item) => {
        set((s) => ({
          quotations: s.quotations.map((q) =>
            q.id === id
              ? { ...q, items: [...q.items, { ...item, id: uid('qi'), issued: false }] }
              : q,
          ),
        }))
      },

      removeQuotationItem: (id, itemId) => {
        set((s) => ({
          quotations: s.quotations.map((q) =>
            q.id === id ? { ...q, items: q.items.filter((i) => i.id !== itemId) } : q,
          ),
        }))
      },

      transitionQuotation: (id, to, actor, opts) => {
        const q = get().quotationById(id)
        if (!q) return { ok: false, error: 'Quotation not found' }
        if (!canTransitionQuotation(q.status, to)) {
          return { ok: false, error: `Cannot move a ${q.status} quotation to ${to}` }
        }
        if (to === 'Sent' && q.items.length === 0) {
          return { ok: false, error: 'Add at least one line before sending' }
        }

        set((s) => ({
          quotations: s.quotations.map((x) => {
            if (x.id !== id) return x
            const patch: Partial<Quotation> = { status: to }
            if (to === 'Sent') patch.sentAt = now()
            if (to === 'Accepted' || to === 'Rejected') patch.respondedAt = now()
            if (to === 'Rejected') patch.rejectionReason = opts?.reason
            return { ...x, ...patch }
          }),
        }))
        void actor
        return { ok: true }
      },

      convertQuotation: (id, input, actor) => {
        const q = get().quotationById(id)
        if (!q) return { ok: false, error: 'Quotation not found' }

        const guard = canConvertQuotation(q)
        if (!guard.ok) return { ok: false, error: guard.reason }
        if (!q.vehicleId) return { ok: false, error: 'Add a vehicle before converting' }

        // Create the card, copy the lines, then mark the quote converted. The
        // quotation keeps the job card id so the two are linked both ways.
        const jobCard = get().createJobCard(
          {
            branchId: q.branchId,
            financialYear: q.financialYear,
            customerId: q.customerId,
            vehicleId: q.vehicleId,
            complaints: q.complaints,
            serviceType: input.serviceType,
            priority: 'Normal',
            odometer: input.odometer,
            fuelLevel: input.fuelLevel,
            advisorId: input.advisorId,
            expectedDelivery: input.expectedDelivery,
          },
          actor,
        )

        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCard.id
              ? {
                  ...j,
                  items: q.items.map((i) => ({ ...i, id: uid('ji'), issued: false })),
                  timeline: [
                    event('quotation', `Converted from ${q.quotationNo}`, actor),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
          quotations: s.quotations.map((x) =>
            x.id === id
              ? { ...x, status: 'Converted' as const, convertedJobCardId: jobCard.id, convertedAt: now() }
              : x,
          ),
        }))

        return { ok: true, jobCardId: jobCard.id }
      },

      deleteQuotations: (ids) => {
        let deleted = 0
        let blocked = 0
        const keep: Quotation[] = []
        for (const q of get().quotations) {
          if (!ids.includes(q.id)) {
            keep.push(q)
            continue
          }
          // A converted quote is the origin of a job card — deleting it would
          // orphan that history.
          if (q.status === 'Converted') {
            blocked += 1
            keep.push(q)
          } else {
            deleted += 1
          }
        }
        if (deleted) set({ quotations: keep })
        return { deleted, blocked }
      },

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

      /**
       * Records referenced by history are never hard-deleted — they are
       * deactivated, so existing job cards keep a valid reference.
       * Ref: 03_PAGE_TEMPLATES.md §20, 04_ALL_MODULES.md §74
       */
      setCustomerStatus: (id, status) =>
        set((s) => ({
          customers: s.customers.map((c) => (c.id === id ? { ...c, status } : c)),
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

      updateVehicle: (id, patch) =>
        set((s) => ({
          vehicles: s.vehicles.map((v) => (v.id === id ? { ...v, ...patch } : v)),
        })),

      /* --------------------------------------------------------- supplier */
      supplierById: (id) => get().suppliers.find((x) => x.id === id),

      createSupplier: (input) => {
        const seq = get().suppliers.length + 1
        const supplier: Supplier = {
          ...input,
          id: uid('sup'),
          companyId: COMPANY_ID,
          code: `SUP-${String(seq).padStart(6, '0')}`,
          status: 'Active',
          createdAt: now(),
        }
        set((s) => ({ suppliers: [supplier, ...s.suppliers] }))
        return supplier
      },

      updateSupplier: (id, patch) =>
        set((s) => ({
          suppliers: s.suppliers.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),

      deleteSuppliers: (ids) => {
        // Nothing references suppliers yet; once Purchase exists this must
        // refuse to delete a supplier with purchase history.
        set((s) => ({ suppliers: s.suppliers.filter((x) => !ids.includes(x.id)) }))
        return { deleted: ids.length, blocked: 0 }
      },

      /* ---------------------------------------------------------- product */
      createProduct: (input) => {
        const product: Product = {
          ...input,
          id: uid('prd'),
          companyId: COMPANY_ID,
          reserved: 0,
          status: input.status ?? 'Active',
        }
        set((s) => ({ products: [product, ...s.products] }))
        return product
      },

      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      setProductStatus: (id, status) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, status } : p)),
        })),

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
                    event(
                      'item',
                      `${item.type} added — ${item.name}`,
                      actor,
                      `Qty ${item.quantity}`,
                    ),
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

        const guard = canIssue(product, item.quantity)
        if (!guard.ok) return { ok: false, error: guard.reason }

        // Ledger entry + balance + job card line, in one atomic set().
        set((s) => {
          const seq = s.counters.stockTxn + 1
          const txn = buildTxn({
            seq,
            product,
            type: 'Job Card Issue',
            quantity: item.quantity,
            balanceAfter: product.onHand - item.quantity,
            rate: product.purchasePrice,
            financialYear: jobCard.financialYear,
            sourceType: 'JobCard',
            sourceId: jobCard.id,
            sourceRef: jobCard.jobCardNo,
            actor,
          })

          return {
            counters: { ...s.counters, stockTxn: seq },
            stockTransactions: [txn, ...s.stockTransactions],
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
                        `${item.quantity} ${item.unit} out of stock · ${txn.txnNo}`,
                      ),
                      ...j.timeline,
                    ],
                  }
                : j,
            ),
          }
        })
        return { ok: true }
      },

      returnPart: (jobCardId, itemId, actor) => {
        const jobCard = get().jobCardById(jobCardId)
        const item = jobCard?.items.find((i) => i.id === itemId)
        if (!jobCard || !item?.productId || !item.issued) return

        const product = get().productById(item.productId)
        if (!product) return

        set((s) => {
          const seq = s.counters.stockTxn + 1
          const txn = buildTxn({
            seq,
            product,
            type: 'Job Card Return',
            quantity: item.quantity,
            balanceAfter: product.onHand + item.quantity,
            rate: product.purchasePrice,
            financialYear: jobCard.financialYear,
            sourceType: 'JobCard',
            sourceId: jobCard.id,
            sourceRef: jobCard.jobCardNo,
            actor,
          })

          return {
            counters: { ...s.counters, stockTxn: seq },
            stockTransactions: [txn, ...s.stockTransactions],
            products: s.products.map((p) =>
              p.id === item.productId ? { ...p, onHand: p.onHand + item.quantity } : p,
            ),
            jobCards: s.jobCards.map((j) =>
              j.id === jobCardId
                ? {
                    ...j,
                    items: j.items.map((i) => (i.id === itemId ? { ...i, issued: false } : i)),
                    timeline: [
                      event(
                        'stock',
                        `Part returned — ${item.name}`,
                        actor,
                        `${item.quantity} ${item.unit} · ${txn.txnNo}`,
                      ),
                      ...j.timeline,
                    ],
                  }
                : j,
            ),
          }
        })
      },

      /* ------------------------------------------- extended job card */
      patchJobCard: (id, patch, actor) => {
        // Status has a state machine; letting a form write it directly would
        // bypass every guard. Strip it defensively.
        const { status: _ignored, ...safe } = patch as Partial<ExtendedJobCard> & {
          status?: unknown
        }
        void _ignored

        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === id
              ? {
                  ...j,
                  ...safe,
                  timeline: [event('edit', 'Job card updated', actor), ...j.timeline],
                }
              : j,
          ),
        }))
      },

      addWorkNote: (jobCardId, note, actor) => {
        const entry: WorkNote = { id: uid('wn'), note, by: actor, at: now() }
        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  workNotes: [entry, ...((j as ExtendedJobCard).workNotes ?? [])],
                  timeline: [event('note', 'Work note added', actor, note.slice(0, 60)), ...j.timeline],
                }
              : j,
          ),
        }))
      },

      addJobCardTransaction: (jobCardId, input, actor) => {
        const txn: JobCardTransaction = {
          id: uid('txn'),
          kind: input.kind,
          amount: input.amount,
          mode: input.mode,
          details: input.details,
          at: now(),
          by: actor,
        }
        set((s) => ({
          jobCards: s.jobCards.map((j) =>
            j.id === jobCardId
              ? {
                  ...j,
                  transactions: [txn, ...((j as ExtendedJobCard).transactions ?? [])],
                  timeline: [
                    event(
                      'payment',
                      `${input.kind} recorded`,
                      actor,
                      `₹ ${(input.amount / 100).toLocaleString('en-IN')} via ${input.mode}`,
                    ),
                    ...j.timeline,
                  ],
                }
              : j,
          ),
        }))
      },

      /* ---------------------------------------------------- stock ledger */
      recordStockEntry: (input, actor) => {
        const product = get().productById(input.productId)
        if (!product) return { ok: false, error: 'Product not found' }

        const direction = directionOf(input.type)
        if (direction === 'Out') {
          const guard = canRemoveStock(product, input.quantity)
          if (!guard.ok) return { ok: false, error: guard.reason }
        } else if (input.quantity <= 0) {
          return { ok: false, error: 'Quantity must be greater than zero' }
        }

        const delta = direction === 'In' ? input.quantity : -input.quantity
        const balanceAfter = product.onHand + delta

        let created: StockTransaction | undefined
        set((s) => {
          const seq = s.counters.stockTxn + 1
          created = buildTxn({
            seq,
            product,
            type: input.type,
            quantity: input.quantity,
            balanceAfter,
            rate: input.rate ?? product.purchasePrice,
            financialYear: input.financialYear,
            sourceType: 'Manual',
            reason: input.reason,
            reference: input.reference,
            actor,
          })

          return {
            counters: { ...s.counters, stockTxn: seq },
            stockTransactions: [created!, ...s.stockTransactions],
            products: s.products.map((p) =>
              p.id === product.id ? { ...p, onHand: balanceAfter } : p,
            ),
          }
        })

        return { ok: true, transaction: created }
      },

      /**
       * Physical verification: the counted quantity becomes the book balance,
       * and the difference is recorded so the correction is auditable.
       */
      recordPhysicalVerification: (input, actor) => {
        const product = get().productById(input.productId)
        if (!product) return { ok: false, error: 'Product not found' }
        if (input.countedQuantity < 0) return { ok: false, error: 'Count cannot be negative' }

        const difference = input.countedQuantity - product.onHand
        if (difference === 0) return { ok: false, error: 'Counted quantity matches the book stock' }

        set((s) => {
          const seq = s.counters.stockTxn + 1
          const txn = buildTxn({
            seq,
            product,
            type: 'Physical Verification',
            // Direction is derived from the count, overriding the type default.
            quantity: Math.abs(difference),
            balanceAfter: input.countedQuantity,
            rate: product.purchasePrice,
            financialYear: input.financialYear,
            sourceType: 'Manual',
            reason:
              input.reason ??
              `Counted ${input.countedQuantity}, book ${product.onHand} (${difference > 0 ? '+' : ''}${difference})`,
            actor,
          })
          txn.direction = difference > 0 ? 'In' : 'Out'

          return {
            counters: { ...s.counters, stockTxn: seq },
            stockTransactions: [txn, ...s.stockTransactions],
            products: s.products.map((p) =>
              p.id === product.id ? { ...p, onHand: input.countedQuantity } : p,
            ),
          }
        })

        return { ok: true }
      },

      transactionsOfProduct: (productId) =>
        get().stockTransactions.filter((t) => t.productId === productId),

      stockDivergence: () => reconcileStock(get().products, get().stockTransactions),

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
                    event(
                      'delivery',
                      `Vehicle delivered — ${gatePassNo}`,
                      actor,
                      `Received by ${receivedBy}`,
                    ),
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
        stockTransactions: s.stockTransactions,
        suppliers: s.suppliers,
        counters: s.counters,
      }),
    },
  ),
)

/** Rupee-entry helper for forms; the store always stores paise. */
export const rupeesToPaise = toPaise
