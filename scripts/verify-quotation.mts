/**
 * Quotation verification.
 *
 * Covers the state machine, the guards, the conversion to a job card, and the
 * flat-vs-percentage discount that lineTotals previously ignored.
 *
 * Run: npx tsx --tsconfig tsconfig.base.json scripts/verify-quotation.mts
 */

import {
  QUOTATION_TRANSITIONS,
  canConvertQuotation,
  canTransitionQuotation,
  isQuotationExpired,
  lineTotals,
  toPaise,
  type JobCardItem,
  type Quotation,
  type QuotationStatus,
} from '../packages/shared/src/index'

let passed = 0
let failed = 0

function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed += 1
    console.log(`  ok   ${label}`)
  } else {
    failed += 1
    console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

const line = (over: Partial<JobCardItem> = {}): JobCardItem => ({
  id: 'i1',
  type: 'Labour',
  name: 'Brake overhaul',
  quantity: 1,
  unit: 'Job',
  rate: toPaise(1000),
  discountPercent: 0,
  taxRate: 18,
  source: 'Estimate',
  issued: false,
  ...over,
})

console.log('\nLine discount honours its type')
console.log('------------------------------')

{
  const pct = lineTotals(line({ discountPercent: 10 }))
  check('10% off ₹1000 discounts ₹100', pct.discount === toPaise(100), `got ${pct.discount}`)

  // The bug this suite was written for: a flat amount read as a percentage.
  const flat = lineTotals(line({ discountPercent: toPaise(100), discountType: 'amount' }))
  check('₹100 flat off ₹1000 discounts ₹100', flat.discount === toPaise(100), `got ${flat.discount}`)
  check('flat and percent agree here', flat.total === pct.total, `${flat.total} vs ${pct.total}`)

  const huge = lineTotals(line({ discountPercent: toPaise(5000), discountType: 'amount' }))
  check('a flat discount cannot exceed the gross', huge.discount === toPaise(1000), `got ${huge.discount}`)
  check('and never makes the line negative', huge.total >= 0, `got ${huge.total}`)

  const none = lineTotals(line())
  check('no discount leaves the gross intact', none.discount === 0)
  check('tax is 18% of the taxable amount', none.tax === toPaise(180), `got ${none.tax}`)
}

console.log('\nQuotation state machine')
console.log('-----------------------')

const legal: Array<[QuotationStatus, QuotationStatus]> = [
  ['Draft', 'Sent'],
  ['Sent', 'Accepted'],
  ['Sent', 'Rejected'],
  ['Sent', 'Expired'],
  ['Accepted', 'Converted'],
  ['Expired', 'Draft'],
]
for (const [from, to] of legal) {
  check(`${from} → ${to} allowed`, canTransitionQuotation(from, to))
}

const illegal: Array<[QuotationStatus, QuotationStatus]> = [
  ['Draft', 'Accepted'],
  ['Draft', 'Converted'],
  ['Sent', 'Converted'],
  ['Rejected', 'Draft'],
  ['Rejected', 'Accepted'],
  ['Converted', 'Draft'],
  ['Converted', 'Sent'],
  ['Accepted', 'Rejected'],
]
for (const [from, to] of illegal) {
  check(`${from} → ${to} refused`, !canTransitionQuotation(from, to))
}

check(
  'a rejected quotation is terminal',
  QUOTATION_TRANSITIONS.Rejected.length === 0,
)
check(
  'a converted quotation is terminal',
  QUOTATION_TRANSITIONS.Converted.length === 0,
)

console.log('\nConversion guard')
console.log('----------------')

const base = (over: Partial<Quotation> = {}): Quotation => ({
  id: 'q1',
  companyId: 'c1',
  branchId: 'b1',
  financialYear: '2026-27',
  quotationNo: 'QT-2026-000001',
  customerId: 'cus1',
  vehicleId: 'veh1',
  status: 'Accepted',
  complaints: [],
  items: [line()],
  discount: 0,
  discountType: 'amount',
  validUntil: new Date(Date.now() + 86400000).toISOString(),
  createdBy: 'Test',
  createdAt: new Date().toISOString(),
  ...over,
})

check('an accepted quotation with lines converts', canConvertQuotation(base()).ok)
check('a draft cannot convert', !canConvertQuotation(base({ status: 'Draft' })).ok)
check('a sent-but-unanswered quote cannot convert', !canConvertQuotation(base({ status: 'Sent' })).ok)
check('a rejected quote cannot convert', !canConvertQuotation(base({ status: 'Rejected' })).ok)
check('converting twice is refused', !canConvertQuotation(base({ status: 'Converted' })).ok)
check('an empty quotation cannot convert', !canConvertQuotation(base({ items: [] })).ok)
check(
  'the refusal explains itself',
  Boolean(canConvertQuotation(base({ status: 'Draft' })).reason),
)

console.log('\nExpiry is derived, not stored')
console.log('-----------------------------')

const yesterday = new Date(Date.now() - 86400000).toISOString()
const tomorrow = new Date(Date.now() + 86400000).toISOString()

check('past its validity date is expired', isQuotationExpired(base({ validUntil: yesterday })))
check('before its validity date is not', !isQuotationExpired(base({ validUntil: tomorrow })))
check(
  'a converted quote never reads as expired',
  !isQuotationExpired(base({ status: 'Converted', validUntil: yesterday })),
)
check(
  'a rejected quote never reads as expired',
  !isQuotationExpired(base({ status: 'Rejected', validUntil: yesterday })),
)

console.log('\n=========================================')
console.log(`  ${passed} passed, ${failed} failed`)
console.log('=========================================\n')

process.exit(failed === 0 ? 0 : 1)
