/**
 * End-to-end check of the Workshop MVP domain logic.
 * Exercises the pure domain layer the store depends on.
 */
import {
  jobCardMachine,
  calculateTotals,
  lineTotals,
  invoiceTotals,
  balanceDue,
  paymentStatus,
  canSendEstimate,
  canCompleteRepair,
  canInvoice,
  canDeliver,
  canCancel,
  jobCardStages,
  formatDocumentNumber,
  computeGst,
  formatMoney,
  toPaise,
} from '../packages/shared/src/index'

let pass = 0
let fail = 0
const check = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  ok   ${name}`) }
  else { fail++; console.log(`  FAIL ${name} ${extra}`) }
}

console.log('\n--- state machine: happy path ---')
const HAPPY = [
  'Draft', 'Checked-In', 'Estimate Preparation', 'Approval Pending', 'Approved',
  'Repair In Progress', 'Repair Completed', 'Invoiced', 'Paid', 'Delivered',
]
for (let i = 0; i < HAPPY.length - 1; i++) {
  check(`${HAPPY[i]} -> ${HAPPY[i + 1]}`, jobCardMachine.can(HAPPY[i], HAPPY[i + 1]))
}

console.log('\n--- state machine: illegal jumps rejected ---')
check('Draft -> Delivered blocked', !jobCardMachine.can('Draft', 'Delivered'))
check('Checked-In -> Invoiced blocked', !jobCardMachine.can('Checked-In', 'Invoiced'))
check('Approved -> Paid blocked', !jobCardMachine.can('Approved', 'Paid'))
check('Delivered is terminal', jobCardMachine.transitionsFrom('Delivered').length === 0)
check('Cancelled is terminal', jobCardMachine.transitionsFrom('Cancelled').length === 0)
let threw = false
try { jobCardMachine.assert('Draft', 'Paid') } catch { threw = true }
check('assert throws on illegal transition', threw)

console.log('\n--- money: integer paise, no float drift ---')
check('toPaise(18750) === 1875000', toPaise(18750) === 1875000)
const gst = computeGst(100001, 18, false)
check('cgst + sgst === total tax (odd paisa absorbed)', gst.cgst + gst.sgst === gst.total - gst.taxable,
  `${gst.cgst}+${gst.sgst} vs ${gst.total - gst.taxable}`)
check('formatMoney Indian grouping', formatMoney(1875000) === '₹ 18,750.00', formatMoney(1875000))
check('negative parenthesised', formatMoney(-125000) === '(₹ 1,250.00)', formatMoney(-125000))

console.log('\n--- line + document totals ---')
const items = [
  { id: '1', type: 'Labour', name: 'Periodic Service', quantity: 2, unit: 'Hr', rate: 125000, discountPercent: 0, taxRate: 18, source: 'Estimate', issued: false },
  { id: '2', type: 'Spare', name: 'Brake Pad Set', quantity: 1, unit: 'Set', rate: 185000, discountPercent: 10, taxRate: 28, source: 'Estimate', issued: true },
  { id: '3', type: 'Lubricant', name: 'Engine Oil', quantity: 4, unit: 'Ltr', rate: 65000, discountPercent: 0, taxRate: 18, source: 'Additional', issued: true },
]
const l2 = lineTotals(items[1])
check('discount applied before tax', l2.taxable === 185000 - 18500, String(l2.taxable))
check('tax on discounted value', l2.tax === Math.round(l2.taxable * 0.28), String(l2.tax))
const totals = calculateTotals(items)
const sumLines = items.reduce((a, i) => a + lineTotals(i).total, 0)
check('document total === sum of line totals', totals.total === sumLines, `${totals.total} vs ${sumLines}`)
check('cgst + sgst === total tax', totals.cgst + totals.sgst === totals.tax)
check('byType splits taxable', Object.keys(totals.byType).sort().join(',') === 'Labour,Lubricant,Spare')

console.log('\n--- guards ---')
const base = {
  id: 'jc1', items: [], payments: [], status: 'Estimate Preparation',
  technicianId: undefined, invoiceNo: undefined, expectedDelivery: new Date(Date.now() + 86400000).toISOString(),
}
check('empty estimate cannot be sent', !canSendEstimate(base).ok)
check('estimate with a line can be sent', canSendEstimate({ ...base, items }).ok)
check('repair blocked while parts un-issued',
  !canCompleteRepair({ ...base, technicianId: 't1', items: [{ ...items[0], type: 'Spare', issued: false }] }).ok)
check('repair blocked without technician',
  !canCompleteRepair({ ...base, technicianId: undefined, items: [] }).ok)
check('repair allowed when issued + assigned',
  canCompleteRepair({ ...base, technicianId: 't1', items }).ok)
check('cannot invoice before repair completed', !canInvoice({ ...base, items }).ok)
check('can invoice after repair completed', canInvoice({ ...base, items, status: 'Repair Completed' }).ok)
check('delivery blocked without invoice', !canDeliver({ ...base, items }).ok)

console.log('\n--- payment lifecycle ---')
const invoiced = { ...base, items, status: 'Invoiced', invoiceNo: 'INV-2026-000001', payments: [] }
const total = invoiceTotals(invoiced).total
check('payment status Unpaid at zero received', paymentStatus(invoiced) === 'Unpaid')
check('balance === invoice total', balanceDue(invoiced) === total)

const partial = { ...invoiced, payments: [{ id: 'p1', amount: Math.floor(total / 3), mode: 'Cash' }] }
check('Partially Paid detected', paymentStatus(partial) === 'Partially Paid', paymentStatus(partial))
check('delivery blocked on balance', !canDeliver(partial).ok)

const settled = { ...invoiced, payments: [{ id: 'p1', amount: total, mode: 'UPI' }] }
check('Paid detected', paymentStatus(settled) === 'Paid')
check('balance zero', balanceDue(settled) === 0)
check('delivery allowed once settled', canDeliver(settled).ok)

console.log('\n--- cancellation rules ---')
check('cannot cancel an invoiced job card', !canCancel(invoiced).ok)
check('can cancel before invoicing', canCancel({ ...base, items }).ok)
check('cannot cancel a delivered job card', !canCancel({ ...base, status: 'Delivered' }).ok)

console.log('\n--- stages ---')
const st = jobCardStages('Repair In Progress')
check('exactly one current stage', st.filter((s) => s.state === 'current').length === 1)
check('current stage is repair', st.find((s) => s.state === 'current').key === 'repair')
check('delivered marks all complete', jobCardStages('Delivered').every((s) => s.state === 'complete'))

console.log('\n--- numbering ---')
check('JC number format', formatDocumentNumber('JC', '2026-27', 7) === 'JC-2026-000007',
  formatDocumentNumber('JC', '2026-27', 7))
check('INV number format', formatDocumentNumber('INV', '2026-27', 42) === 'INV-2026-000042')

console.log(`\n=========================================`)
console.log(`  ${pass} passed, ${fail} failed`)
console.log(`=========================================\n`)
process.exit(fail === 0 ? 0 : 1)
