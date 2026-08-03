/**
 * Workshop MVP — integration check.
 *
 * Drives the REAL Zustand store through the complete workflow:
 * Customer → Vehicle → Job Card → Technician → Parts → Estimate →
 * Invoice → Payment → Delivery.
 *
 * This exercises the actual mutation layer (stock movement, numbering,
 * timeline, guards), not just the pure domain functions.
 *
 * Run: npm run verify:flow
 */

// Zustand's persist middleware defaults to `window.localStorage` (v5.0.x), so
// Node needs both globals shimmed before the store module is imported.
const mem = new Map<string, string>()
const storageShim = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => void mem.set(k, v),
  removeItem: (k: string) => void mem.delete(k),
  clear: () => mem.clear(),
  key: (i: number) => [...mem.keys()][i] ?? null,
  get length() {
    return mem.size
  },
}
const define = (target: object, prop: string, value: unknown) =>
  Object.defineProperty(target, prop, { configurable: true, writable: true, value })

define(globalThis, 'localStorage', storageShim)
define(globalThis, 'window', { localStorage: storageShim })

const { useWorkshopStore } = await import('../apps/web/src/store/workshopStore')
const {
  availableStock,
  balanceDue,
  amountPaid,
  invoiceTotals,
  estimateTotals,
  paymentStatus,
  canCompleteRepair,
  canDeliver,
  canInvoice,
  canSendEstimate: canSendEstimateFn,
  toPaise,
  formatMoney,
} = await import('../packages/shared/src/index')

let pass = 0
let fail = 0
const check = (name: string, cond: boolean, extra = '') => {
  if (cond) {
    pass++
    console.log(`  ok   ${name}`)
  } else {
    fail++
    console.log(`  FAIL ${name}${extra ? '  →  ' + extra : ''}`)
  }
}
const section = (t: string) => console.log(`\n--- ${t} ---`)

const s = () => useWorkshopStore.getState()
const ACTOR = 'Test Advisor'

/* ============================================================ 1. CUSTOMER */
section('1. Customer creation')

const customerCountBefore = s().customers.length
const customer = s().createCustomer({
  branchId: 'br-pune-main',
  name: 'Vikram Shinde',
  type: 'Individual',
  mobile: '9812345678',
  city: 'Pune',
  state: 'Maharashtra',
  creditLimit: 0,
})
check('customer added to store', s().customers.length === customerCountBefore + 1)
check('customer code auto-allocated', /^CUS-\d{6}$/.test(customer.code), customer.code)
check('companyId stamped', customer.companyId === 'co-1')
check('branchId stamped', customer.branchId === 'br-pune-main')
check('lookup by id works', s().customerById(customer.id)?.name === 'Vikram Shinde')

const customer2 = s().createCustomer({
  branchId: 'br-pune-main',
  name: 'Second Customer',
  type: 'Business',
  mobile: '9800000001',
  city: 'Pune',
  state: 'Maharashtra',
  creditLimit: toPaise(50000),
})
check('customer codes increment', customer2.code !== customer.code, `${customer.code} vs ${customer2.code}`)

/* ============================================================= 2. VEHICLE */
section('2. Vehicle creation')

const vehicle = s().createVehicle({
  branchId: 'br-pune-main',
  customerId: customer.id,
  registration: 'MH12ZZ9911',
  manufacturer: 'Maruti Suzuki',
  model: 'Baleno',
  variant: 'Zeta',
  fuelType: 'Petrol',
  transmission: 'Manual',
  lastOdometer: 20000,
})
check('vehicle linked to customer', vehicle.customerId === customer.id)
check('vehiclesOfCustomer returns it', s().vehiclesOfCustomer(customer.id).some((v) => v.id === vehicle.id))
check('other customer has no vehicles', s().vehiclesOfCustomer(customer2.id).length === 0)

/* ============================================================ 3. JOB CARD */
section('3. Job card creation')

const jobCard = s().createJobCard(
  {
    branchId: 'br-pune-main',
    financialYear: '2026-27',
    customerId: customer.id,
    vehicleId: vehicle.id,
    complaints: ['Brake noise while braking', 'AC cooling low'],
    serviceType: 'Periodic Service',
    priority: 'Normal',
    odometer: 24500,
    fuelLevel: '1/2',
    advisorId: 'emp-1',
    expectedDelivery: new Date(Date.now() + 86400000).toISOString(),
  },
  ACTOR,
)
const jcId = jobCard.id

check('job card number format', /^JC-2026-\d{6}$/.test(jobCard.jobCardNo), jobCard.jobCardNo)
check('starts in Draft', jobCard.status === 'Draft')
check('two complaints captured', jobCard.complaints.length === 2)
check('timeline seeded with creation', jobCard.timeline.length === 1)
check(
  'vehicle odometer advanced to job card reading',
  s().vehicleById(vehicle.id)?.lastOdometer === 24500,
  String(s().vehicleById(vehicle.id)?.lastOdometer),
)
check('financialYear stamped', jobCard.financialYear === '2026-27')

/* ====================================================== 4. ILLEGAL MOVES */
section('4. Illegal transitions rejected at the store')

let threw = false
try {
  s().transition(jcId, 'Delivered', ACTOR)
} catch {
  threw = true
}
check('Draft → Delivered throws', threw)
check('status unchanged after rejected move', s().jobCardById(jcId)?.status === 'Draft')

threw = false
try {
  s().transition(jcId, 'Invoiced', ACTOR)
} catch {
  threw = true
}
check('Draft → Invoiced throws', threw)

/* ========================================================== 5. CHECK-IN */
section('5. Check-in and estimate')

s().transition(jcId, 'Checked-In', ACTOR)
check('status is Checked-In', s().jobCardById(jcId)?.status === 'Checked-In')
check('timeline recorded status change', s().jobCardById(jcId)!.timeline.length === 2)

s().transition(jcId, 'Estimate Preparation', ACTOR)

// Labour line
s().addItem(
  jcId,
  {
    type: 'Labour',
    name: 'Periodic Service — Paid Service',
    quantity: 2,
    unit: 'Hr',
    rate: toPaise(1250),
    discountPercent: 0,
    taxRate: 18,
    source: 'Estimate',
  },
  ACTOR,
)

// Spare line — brake pads (prd-5), stock 7, reserved 2 → available 5
const brakePads = s().productById('prd-5')!
const padsAvailableBefore = availableStock(brakePads)
s().addItem(
  jcId,
  {
    type: 'Spare',
    productId: 'prd-5',
    name: brakePads.name,
    code: brakePads.sku,
    quantity: 1,
    unit: brakePads.unit,
    rate: brakePads.sellingPrice,
    discountPercent: 10,
    taxRate: brakePads.taxRate,
    source: 'Estimate',
  },
  ACTOR,
)

// Lubricant line — engine oil (prd-1)
const oil = s().productById('prd-1')!
const oilOnHandBefore = oil.onHand
s().addItem(
  jcId,
  {
    type: 'Lubricant',
    productId: 'prd-1',
    name: oil.name,
    code: oil.sku,
    quantity: 4,
    unit: oil.unit,
    rate: oil.sellingPrice,
    discountPercent: 0,
    taxRate: oil.taxRate,
    source: 'Estimate',
  },
  ACTOR,
)

check('three estimate lines added', s().jobCardById(jcId)!.items.length === 3)

/* Regression: an item added pre-approval must appear on the estimate,
   regardless of which tab it was added from. */
const { defaultItemSource, isPreApproval } = await import('../packages/shared/src/index')
check('pre-approval statuses derive Estimate source', defaultItemSource('Draft') === 'Estimate')
check('Checked-In derives Estimate source', defaultItemSource('Checked-In') === 'Estimate')
check('Approval Pending derives Estimate source', defaultItemSource('Approval Pending') === 'Estimate')
check('Approved derives Additional source', defaultItemSource('Approved') === 'Additional')
check('Repair In Progress derives Additional', defaultItemSource('Repair In Progress') === 'Additional')
check('isPreApproval true for Draft', isPreApproval('Draft'))
check('isPreApproval false after approval', !isPreApproval('Approved'))

// A line mis-tagged 'Additional' while still pre-approval must still count.
const draftJc = s().createJobCard(
  {
    branchId: 'br-pune-main',
    financialYear: '2026-27',
    customerId: customer.id,
    vehicleId: vehicle.id,
    complaints: ['Check'],
    serviceType: 'Running Repair',
    priority: 'Normal',
    odometer: 24600,
    fuelLevel: '1/2',
    advisorId: 'emp-1',
    expectedDelivery: new Date(Date.now() + 86400000).toISOString(),
  },
  ACTOR,
)
s().addItem(
  draftJc.id,
  {
    type: 'Labour',
    name: 'Diagnostics',
    quantity: 1,
    unit: 'Hr',
    rate: toPaise(650),
    discountPercent: 0,
    taxRate: 18,
    source: 'Additional',
  },
  ACTOR,
)
check(
  'pre-approval estimate counts every line (no invisible items)',
  estimateTotals(s().jobCardById(draftJc.id)!).itemCount === 1,
  String(estimateTotals(s().jobCardById(draftJc.id)!).itemCount),
)
check(
  'estimate is sendable once any line exists in Draft',
  canSendEstimateFn(s().jobCardById(draftJc.id)!).ok,
)
check(
  'adding an item does NOT move stock',
  s().productById('prd-1')!.onHand === oilOnHandBefore,
  `on hand ${s().productById('prd-1')!.onHand} vs ${oilOnHandBefore}`,
)

const est = estimateTotals(s().jobCardById(jcId)!)
check('estimate total > 0', est.total > 0, formatMoney(est.total))
check('cgst + sgst === tax', est.cgst + est.sgst === est.tax)

/* ========================================================= 6. APPROVAL */
section('6. Estimate approval')

s().transition(jcId, 'Approval Pending', ACTOR)
check('estimateSentAt stamped', Boolean(s().jobCardById(jcId)!.estimateSentAt))

s().transition(jcId, 'Approved', ACTOR)
check('status Approved', s().jobCardById(jcId)!.status === 'Approved')
check('estimateApprovedAt stamped', Boolean(s().jobCardById(jcId)!.estimateApprovedAt))

/* ====================================================== 7. ASSIGNMENT */
section('7. Technician assignment')

check('no technician before assignment', !s().jobCardById(jcId)!.technicianId)
s().assignTechnician(jcId, 'emp-10', 'B-04', ACTOR)
check('technician assigned', s().jobCardById(jcId)!.technicianId === 'emp-10')
check('bay recorded', s().jobCardById(jcId)!.bay === 'B-04')
check(
  'assignment appears on timeline',
  s().jobCardById(jcId)!.timeline.some((t) => t.kind === 'assignment'),
)

/* ============================================== 8. REPAIR + STOCK ISSUE */
section('8. Repair and stock issue (transactional boundary)')

s().transition(jcId, 'Repair In Progress', ACTOR)

const guardBefore = canCompleteRepair(s().jobCardById(jcId)!)
check('repair blocked while parts un-issued', !guardBefore.ok, guardBefore.reason)

const spareLine = s().jobCardById(jcId)!.items.find((i) => i.productId === 'prd-5')!
const lubeLine = s().jobCardById(jcId)!.items.find((i) => i.productId === 'prd-1')!

const issue1 = s().issuePart(jcId, spareLine.id, ACTOR)
check('spare issue succeeds', issue1.ok, issue1.error ?? '')
check(
  'brake pad stock decremented by 1',
  s().productById('prd-5')!.onHand === brakePads.onHand - 1,
  `${s().productById('prd-5')!.onHand} vs ${brakePads.onHand - 1}`,
)
check('available reflects the issue', availableStock(s().productById('prd-5')!) === padsAvailableBefore - 1)
check('line marked issued', s().jobCardById(jcId)!.items.find((i) => i.id === spareLine.id)!.issued)
check(
  'stock movement on timeline',
  s().jobCardById(jcId)!.timeline.some((t) => t.kind === 'stock'),
)

const doubleIssue = s().issuePart(jcId, spareLine.id, ACTOR)
check('double issue rejected', !doubleIssue.ok, doubleIssue.error ?? '')
check('stock unchanged after rejected double issue', s().productById('prd-5')!.onHand === brakePads.onHand - 1)

// Return then re-issue — stock must round-trip exactly.
s().returnPart(jcId, spareLine.id, ACTOR)
check('return restores stock', s().productById('prd-5')!.onHand === brakePads.onHand)
check('line no longer issued', !s().jobCardById(jcId)!.items.find((i) => i.id === spareLine.id)!.issued)
s().issuePart(jcId, spareLine.id, ACTOR)
check('re-issue decrements again', s().productById('prd-5')!.onHand === brakePads.onHand - 1)

s().issuePart(jcId, lubeLine.id, ACTOR)
check(
  'lubricant stock decremented by 4',
  s().productById('prd-1')!.onHand === oilOnHandBefore - 4,
  `${s().productById('prd-1')!.onHand} vs ${oilOnHandBefore - 4}`,
)

/* ------------------------------- over-issue must be refused ------------- */
const scarce = s().productById('prd-13')! // clutch plate, onHand 2
s().addItem(
  jcId,
  {
    type: 'Spare',
    productId: scarce.id,
    name: scarce.name,
    code: scarce.sku,
    quantity: 99,
    unit: scarce.unit,
    rate: scarce.sellingPrice,
    discountPercent: 0,
    taxRate: scarce.taxRate,
    source: 'Additional',
  },
  ACTOR,
)
const overLine = s().jobCardById(jcId)!.items.find((i) => i.quantity === 99)!
const over = s().issuePart(jcId, overLine.id, ACTOR)
check('over-issue refused', !over.ok, over.error ?? '')
check('scarce stock untouched', s().productById('prd-13')!.onHand === scarce.onHand)

// Remove that line; it was never issued so stock must not change.
s().removeItem(jcId, overLine.id, ACTOR)
check('un-issued removal leaves stock alone', s().productById('prd-13')!.onHand === scarce.onHand)

/* ----------------------- removing an ISSUED line returns stock ---------- */
const wiper = s().productById('prd-7')!
s().addItem(
  jcId,
  {
    type: 'Spare',
    productId: wiper.id,
    name: wiper.name,
    code: wiper.sku,
    quantity: 2,
    unit: wiper.unit,
    rate: wiper.sellingPrice,
    discountPercent: 0,
    taxRate: wiper.taxRate,
    source: 'Additional',
  },
  ACTOR,
)
const wiperLine = s().jobCardById(jcId)!.items.find((i) => i.productId === wiper.id)!
s().issuePart(jcId, wiperLine.id, ACTOR)
check('wiper stock decremented', s().productById('prd-7')!.onHand === wiper.onHand - 2)
s().removeItem(jcId, wiperLine.id, ACTOR)
check(
  'removing an issued line returns its stock',
  s().productById('prd-7')!.onHand === wiper.onHand,
  `${s().productById('prd-7')!.onHand} vs ${wiper.onHand}`,
)

const guardAfter = canCompleteRepair(s().jobCardById(jcId)!)
check('repair now allowed', guardAfter.ok, guardAfter.reason ?? '')

/* ========================================================== 9. INVOICE */
section('9. Invoice generation')

check('cannot invoice mid-repair', !canInvoice(s().jobCardById(jcId)!).ok)
s().transition(jcId, 'Repair Completed', ACTOR)
check('can invoice once repair completed', canInvoice(s().jobCardById(jcId)!).ok)

const invoiceNo = s().generateInvoice(jcId, ACTOR)
const invoiced = s().jobCardById(jcId)!
check('invoice number format', /^INV-2026-\d{6}$/.test(invoiceNo ?? ''), String(invoiceNo))
check('status moved to Invoiced', invoiced.status === 'Invoiced')
check('invoicedAt stamped', Boolean(invoiced.invoicedAt))
check('payment status Unpaid', paymentStatus(invoiced) === 'Unpaid')

const invTotal = invoiceTotals(invoiced).total
check('balance equals invoice total', balanceDue(invoiced) === invTotal, formatMoney(invTotal))
check('invoice includes additional work', invoiced.items.length === 3)

// Re-invoicing must be idempotent, not allocate a second number.
const again = s().generateInvoice(jcId, ACTOR)
check('re-invoice returns the same number', again === invoiceNo)

/* ========================================================== 10. PAYMENT */
section('10. Payment')

check('delivery blocked while unpaid', !canDeliver(s().jobCardById(jcId)!).ok)

const part = Math.floor(invTotal / 3)
const p1 = s().recordPayment(jcId, { amount: part, mode: 'Cash' }, ACTOR)
check('receipt number format', /^RCP-2026-\d{6}$/.test(p1.receiptNo), p1.receiptNo)
check('status Partially Paid', s().jobCardById(jcId)!.status === 'Partially Paid')
check('paymentStatus Partially Paid', paymentStatus(s().jobCardById(jcId)!) === 'Partially Paid')
check('balance reduced correctly', balanceDue(s().jobCardById(jcId)!) === invTotal - part)
check('delivery still blocked', !canDeliver(s().jobCardById(jcId)!).ok)

const remaining = balanceDue(s().jobCardById(jcId)!)
s().recordPayment(jcId, { amount: remaining, mode: 'UPI', reference: 'UPI-77231' }, ACTOR)
const settled = s().jobCardById(jcId)!
check('status Paid', settled.status === 'Paid')
check('balance zero', balanceDue(settled) === 0, formatMoney(balanceDue(settled)))
check('amountPaid equals invoice total', amountPaid(settled) === invTotal)
check('two receipts recorded', settled.payments.length === 2)
check('receipt numbers unique', settled.payments[0]!.receiptNo !== settled.payments[1]!.receiptNo)
check('delivery now allowed', canDeliver(settled).ok)

/* ========================================================= 11. DELIVERY */
section('11. Delivery')

const gatePassNo = s().completeDelivery(
  jcId,
  {
    vehicleCleaned: true,
    accessoriesReturned: true,
    documentsHanded: true,
    customerSatisfied: true,
  },
  'Vikram Shinde',
  ACTOR,
)
const delivered = s().jobCardById(jcId)!
check('gate pass number format', /^GP-2026-\d{6}$/.test(gatePassNo), gatePassNo)
check('status Delivered', delivered.status === 'Delivered')
check('deliveredAt stamped', Boolean(delivered.deliveredAt))
check('checklist stored', delivered.deliveryChecklist?.vehicleCleaned === true)
check(
  'delivery recorded on timeline',
  delivered.timeline.some((t) => t.kind === 'delivery'),
)
check('Delivered is terminal — no further transitions', (() => {
  try {
    s().transition(jcId, 'Paid', ACTOR)
    return false
  } catch {
    return true
  }
})())

/* ======================================================== 12. INTEGRITY */
section('12. Cross-cutting integrity')

check('timeline is append-only and non-trivial', delivered.timeline.length >= 15, String(delivered.timeline.length))
check(
  'every timeline event has actor and timestamp',
  delivered.timeline.every((t) => Boolean(t.by) && Boolean(t.at)),
)
check(
  'every item total is a whole number of paise',
  delivered.items.every((i) => Number.isInteger(i.rate) && Number.isInteger(Math.round(i.quantity * i.rate))),
)
check('invoice total is an integer', Number.isInteger(invoiceTotals(delivered).total))
check(
  'all payments are integers',
  delivered.payments.every((p) => Number.isInteger(p.amount)),
)
check(
  'job card appears in customer history',
  s().jobCardsOfCustomer(customer.id).some((j) => j.id === jcId),
)
check(
  'job card appears in vehicle history',
  s().jobCardsOfVehicle(vehicle.id).some((j) => j.id === jcId),
)
check(
  'customer history excludes other customers’ job cards',
  s().jobCardsOfCustomer(customer.id).every((j) => j.customerId === customer.id),
)

/* -------------------------- second job card: numbering continues -------- */
const jc2 = s().createJobCard(
  {
    branchId: 'br-pune-main',
    financialYear: '2026-27',
    customerId: customer2.id,
    vehicleId: vehicle.id,
    complaints: ['Service due'],
    serviceType: 'Running Repair',
    priority: 'High',
    odometer: 25000,
    fuelLevel: 'F',
    advisorId: 'emp-2',
    expectedDelivery: new Date(Date.now() + 172800000).toISOString(),
  },
  ACTOR,
)
check('second job card gets a new number', jc2.jobCardNo !== jobCard.jobCardNo, `${jobCard.jobCardNo} / ${jc2.jobCardNo}`)
check('numbering is sequential', jc2.jobCardNo > jobCard.jobCardNo)

/* ----------------------------- cancellation path ------------------------ */
s().transition(jc2.id, 'Cancelled', ACTOR, { reason: 'Customer withdrew the vehicle' })
const cancelled = s().jobCardById(jc2.id)!
check('cancelled status set', cancelled.status === 'Cancelled')
check('cancellation reason stored', cancelled.cancellationReason === 'Customer withdrew the vehicle')
check('cancelledAt stamped', Boolean(cancelled.cancelledAt))

/* --------------------------------- persistence -------------------------- */
const persisted = mem.get('garage-erp-workshop')
check('state persisted to storage', Boolean(persisted))
if (persisted) {
  const parsed = JSON.parse(persisted)
  check('persisted payload contains job cards', Array.isArray(parsed.state?.jobCards))
  check('persisted job card count matches', parsed.state.jobCards.length === s().jobCards.length)
  check(
    'counters persisted and match live state',
    parsed.state.counters.jobCard === s().counters.jobCard &&
      parsed.state.counters.invoice === s().counters.invoice,
    JSON.stringify(parsed.state.counters),
  )
}


/* ================================================== 13. STOCK LEDGER */
section('13. Stock ledger integrity')

const {
  balanceFromLedger,
  reconcileStock,
  stockPosition,
  stockLevel,
  signedQuantity,
} = await import('../packages/shared/src/index')

const ledger = s().stockTransactions
check('ledger has entries', ledger.length > 0, String(ledger.length))
check('every entry has a number', ledger.every((t) => /^STK-\d{4}-\d{6}$/.test(t.txnNo)))
check('entry numbers are unique', new Set(ledger.map((t) => t.txnNo)).size === ledger.length)
check('quantities are always positive', ledger.every((t) => t.quantity > 0))
check(
  'direction matches sign',
  ledger.every((t) => signedQuantity(t) === (t.direction === 'In' ? t.quantity : -t.quantity)),
)

// The invariant this whole design exists to guarantee.
const divergence = reconcileStock(s().products, ledger)
check('every product balance matches its ledger', divergence.length === 0,
  divergence.map((d) => `${d.sku}: cached ${d.cachedOnHand} vs ledger ${d.ledgerBalance}`).join('; '))

const padProduct = s().productById('prd-5')!
const padLedger = ledger.filter((t) => t.productId === 'prd-5')
check(
  'issued part left an audit trail',
  padLedger.some((t) => t.type === 'Job Card Issue' && t.sourceRef?.startsWith('JC-')),
)
check('returned part left an audit trail', padLedger.some((t) => t.type === 'Job Card Return'))
check(
  'balanceFromLedger equals cached onHand',
  balanceFromLedger(padLedger) === padProduct.onHand,
  `${balanceFromLedger(padLedger)} vs ${padProduct.onHand}`,
)

/* ---------------------------- manual stock entries --------------------- */
const before = s().productById('prd-12')!.onHand // AC Filter Drier, starts at 0
const inRes = s().recordStockEntry(
  { productId: 'prd-12', type: 'Stock In', quantity: 10, reason: 'Purchase receipt', financialYear: '2026-27' },
  ACTOR,
)
check('stock in accepted', inRes.ok, inRes.error ?? '')
check('stock in increases balance', s().productById('prd-12')!.onHand === before + 10)
check('stock in wrote a ledger entry', Boolean(inRes.transaction?.txnNo), inRes.transaction?.txnNo ?? '')
check('balanceAfter recorded correctly', inRes.transaction?.balanceAfter === before + 10)

const dmg = s().recordStockEntry(
  { productId: 'prd-12', type: 'Damage', quantity: 3, reason: 'Crushed in transit', financialYear: '2026-27' },
  ACTOR,
)
check('damage accepted', dmg.ok, dmg.error ?? '')
check('damage decreases balance', s().productById('prd-12')!.onHand === before + 7)

const tooMuch = s().recordStockEntry(
  { productId: 'prd-12', type: 'Loss', quantity: 999, reason: 'Test', financialYear: '2026-27' },
  ACTOR,
)
check('cannot remove more than on hand', !tooMuch.ok, tooMuch.error ?? '')
check('failed removal left balance untouched', s().productById('prd-12')!.onHand === before + 7)

/* ------------------------- physical verification ----------------------- */
const pv = s().recordPhysicalVerification(
  { productId: 'prd-12', countedQuantity: 5, reason: 'Monthly count', financialYear: '2026-27' },
  ACTOR,
)
check('physical verification accepted', pv.ok, pv.error ?? '')
check('counted quantity becomes the balance', s().productById('prd-12')!.onHand === 5)
const pvTxn = s().transactionsOfProduct('prd-12')[0]!
check('verification recorded the difference', pvTxn.quantity === 2 && pvTxn.direction === 'Out',
  `${pvTxn.direction} ${pvTxn.quantity}`)

const noop = s().recordPhysicalVerification(
  { productId: 'prd-12', countedQuantity: 5, financialYear: '2026-27' },
  ACTOR,
)
check('no-change count is rejected', !noop.ok, noop.error ?? '')

check('ledger still reconciles after manual entries',
  reconcileStock(s().products, s().stockTransactions).length === 0)

/* -------------------------------- helpers ------------------------------ */
const pos = stockPosition(s().productById('prd-5')!)
check('on hand − reserved = available', pos.onHand - pos.reserved === pos.available)
check('out of stock detected', stockLevel({ ...s().productById('prd-12')!, onHand: 0, reserved: 0 }) === 'Out of Stock')
check('low stock detected', stockLevel({ ...s().productById('prd-12')!, onHand: 2, reserved: 0, reorderLevel: 5 }) === 'Low Stock')

/* ============================================ 14. REHYDRATION ON RELOAD */
section('14. Rehydration after reload')

const snapshot = mem.get('garage-erp-workshop')!
const expectedJobCards = s().jobCards.length
const expectedProducts = s().products.length
const expectedLedger = s().stockTransactions.length
const expectedCounters = { ...s().counters }
const padOnHand = s().productById('prd-5')!.onHand

// Simulate a browser reload: fresh module registry, same storage.
const modPath = '../apps/web/src/store/workshopStore'
const fresh = await import(`${modPath}?reload=${expectedLedger}`)
const r = fresh.useWorkshopStore.getState()

check('storage survived', Boolean(snapshot))
check('job cards rehydrated', r.jobCards.length === expectedJobCards,
  `${r.jobCards.length} vs ${expectedJobCards}`)
check('products rehydrated', r.products.length === expectedProducts)
check('stock ledger rehydrated', r.stockTransactions.length === expectedLedger,
  `${r.stockTransactions.length} vs ${expectedLedger}`)
check('counters rehydrated', r.counters.jobCard === expectedCounters.jobCard &&
  r.counters.invoice === expectedCounters.invoice &&
  r.counters.stockTxn === expectedCounters.stockTxn,
  JSON.stringify(r.counters))
check('stock balance survived reload', r.productById('prd-5')?.onHand === padOnHand,
  `${r.productById('prd-5')?.onHand} vs ${padOnHand}`)
check('delivered job card kept its status',
  r.jobCards.find((j: { id: string }) => j.id === jcId)?.status === 'Delivered')
check('invoice number survived reload',
  r.jobCards.find((j: { id: string }) => j.id === jcId)?.invoiceNo === invoiceNo)
check('ledger reconciles after reload',
  reconcileStock(r.products, r.stockTransactions).length === 0)

/* ================================================== 15. FINANCE */
section('15. Receivables and collection')

const {
  receivablesFrom,
  ageingSummary,
  ageingBucket,
  totalOutstanding,
  overdueOnly,
  receiptsFrom,
  collectionByMode,
  outstandingByCustomer,
  totalBilled,
  totalCollected,
} = await import('../packages/shared/src/index')

// The delivered job card is fully paid, so it must NOT appear as a receivable.
const settledReceivables = receivablesFrom(s().jobCards)
check(
  'fully paid invoice is not a receivable',
  !settledReceivables.some((r) => r.sourceId === jcId),
)

// Build an unpaid invoice to exercise the receivable path.
const debtJc = s().createJobCard(
  {
    branchId: 'br-pune-main',
    financialYear: '2026-27',
    customerId: customer2.id,
    vehicleId: vehicle.id,
    complaints: ['AC not cooling'],
    serviceType: 'AC Service',
    priority: 'Normal',
    odometer: 26000,
    fuelLevel: '1/2',
    advisorId: 'emp-1',
    expectedDelivery: new Date(Date.now() + 86400000).toISOString(),
  },
  ACTOR,
)
s().addItem(
  debtJc.id,
  { type: 'Labour', name: 'AC Service', quantity: 2, unit: 'Hr', rate: toPaise(1800),
    discountPercent: 0, taxRate: 18, source: 'Estimate' },
  ACTOR,
)
s().transition(debtJc.id, 'Checked-In', ACTOR)
s().transition(debtJc.id, 'Estimate Preparation', ACTOR)
s().transition(debtJc.id, 'Approval Pending', ACTOR)
s().transition(debtJc.id, 'Approved', ACTOR)
s().assignTechnician(debtJc.id, 'emp-11', 'B-02', ACTOR)
s().transition(debtJc.id, 'Repair In Progress', ACTOR)
s().transition(debtJc.id, 'Repair Completed', ACTOR)
const debtInvoice = s().generateInvoice(debtJc.id, ACTOR)

const receivables = receivablesFrom(s().jobCards)
const debt = receivables.find((r) => r.sourceId === debtJc.id)
check('unpaid invoice becomes a receivable', Boolean(debt), String(receivables.length))
check('receivable carries its invoice number', debt?.invoiceNo === debtInvoice)
check('receivable links back to the job card', debt?.sourceRef === debtJc.jobCardNo)
check('balance equals the invoice total when nothing is paid',
  debt?.balance === debt?.invoiceTotal)
check('outstanding total matches the sum of balances',
  totalOutstanding(receivables) === receivables.reduce((a, r) => a + r.balance, 0))

/* ------------------------------- ageing -------------------------------- */
check('0-30 bucket', ageingBucket(0) === '0 – 30 days' && ageingBucket(30) === '0 – 30 days')
check('31-60 bucket', ageingBucket(31) === '31 – 60 days' && ageingBucket(60) === '31 – 60 days')
check('61-90 bucket', ageingBucket(61) === '61 – 90 days' && ageingBucket(90) === '61 – 90 days')
check('over 90 bucket', ageingBucket(91) === 'Over 90 days')

const ageing = ageingSummary(receivables)
check('ageing counts every receivable',
  Object.values(ageing).reduce((a, b) => a + b.count, 0) === receivables.length)
check('ageing amounts sum to the outstanding total',
  Object.values(ageing).reduce((a, b) => a + b.amount, 0) === totalOutstanding(receivables))

// A freshly raised invoice is inside terms; an old one is not.
const aged = receivablesFrom(s().jobCards, { now: Date.now() + 100 * 86_400_000 })
check('a 100-day-old invoice is overdue', overdueOnly(aged).length > 0)
check('a same-day invoice is within terms', overdueOnly(receivables).length === 0,
  String(overdueOnly(receivables).length))

/* ------------------------------ receipts ------------------------------- */
const receipts = receiptsFrom(s().jobCards)
check('receipts collected across job cards', receipts.length === 2, String(receipts.length))
check('receipts sorted newest first',
  new Date(receipts[0]!.receivedAt).getTime() >= new Date(receipts[1]!.receivedAt).getTime())
check('each receipt links to its job card', receipts.every((r) => Boolean(r.sourceRef)))

const modes = collectionByMode(receipts)
check('collection by mode sums to total collected',
  Object.values(modes).reduce((a, b) => a + b, 0) === receipts.reduce((a, r) => a + r.amount, 0))
check('cash and UPI both recorded', modes.Cash > 0 && modes.UPI > 0)

/* ------------------------ billed vs collected -------------------------- */
const billed = totalBilled(s().jobCards)
const collected = totalCollected(s().jobCards)
check('billed exceeds collected while a debt is open', billed > collected)
check('billed − collected equals outstanding',
  billed - collected === totalOutstanding(receivables),
  `${billed - collected} vs ${totalOutstanding(receivables)}`)

/* ---------------------------- top debtors ------------------------------ */
const debtors = outstandingByCustomer(receivables)
check('debtor list produced', debtors.length > 0)
check('debtor balances sum to outstanding',
  debtors.reduce((a, d) => a + d.balance, 0) === totalOutstanding(receivables))
check('debtors sorted by balance descending',
  debtors.every((d, i) => i === 0 || debtors[i - 1]!.balance >= d.balance))

/* ------------------- collecting clears the receivable ------------------ */
s().recordPayment(debtJc.id, { amount: debt!.balance, mode: 'Card' }, ACTOR)
const afterPayment = receivablesFrom(s().jobCards)
check('settled invoice drops off receivables',
  !afterPayment.some((r) => r.sourceId === debtJc.id))
check('outstanding returns to zero', totalOutstanding(afterPayment) === 0,
  formatMoney(totalOutstanding(afterPayment)))
check('cancelled job cards never appear as receivables',
  !receivablesFrom(s().jobCards).some((r) => r.sourceId === jc2.id))




console.log('\n=========================================')
console.log(`  ${pass} passed, ${fail} failed`)
console.log('=========================================\n')

if (fail === 0) {
  const jc = s().jobCardById(jcId)!
  console.log('Walkthrough summary:')
  console.log(`  Customer     ${customer.name} (${customer.code})`)
  console.log(`  Vehicle      ${vehicle.registration} — ${vehicle.manufacturer} ${vehicle.model}`)
  console.log(`  Job Card     ${jc.jobCardNo}  →  ${jc.status}`)
  console.log(`  Technician   ${s().employeeById(jc.technicianId)?.name}  ·  Bay ${jc.bay}`)
  console.log(`  Items        ${jc.items.length}`)
  console.log(`  Invoice      ${jc.invoiceNo}  ${formatMoney(invoiceTotals(jc).total)}`)
  console.log(`  Received     ${formatMoney(amountPaid(jc))} in ${jc.payments.length} receipts`)
  console.log(`  Gate Pass    ${jc.gatePassNo}`)
  console.log(`  Timeline     ${jc.timeline.length} events`)
  console.log(`  Stock ledger ${s().stockTransactions.length} entries, reconciled\n`)
}

process.exit(fail === 0 ? 0 : 1)
