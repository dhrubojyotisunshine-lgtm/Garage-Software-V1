/**
 * Sample rows for the layout-only screens.
 *
 * Values are generated from the column label so every list shows realistic
 * content while the module is unwired. Deterministic, so the same screen looks
 * the same on every visit.
 */

const FIRST = ['Rajesh', 'Priya', 'Sunil', 'Meena', 'Amol', 'Kavita', 'Nitin', 'Sneha']
const LAST = ['Sharma', 'Desai', 'Kulkarni', 'Joshi', 'Patil', 'Rane', 'Bhosale', 'Kadam']
const COMPANY = [
  'Bosch Auto Parts', 'Castrol Distributors', 'Brembo India', 'Exide Batteries',
  'NGK Spark Plugs', 'Monroe Suspension', 'Mahle Filters', 'Shree Denting Works',
]
const BRANDS = ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Honda', 'Toyota', 'Kia', 'Mahindra', 'Skoda']
const MODELS = ['Swift VXI', 'i20 Asta', 'Nexon XZ+', 'City ZX', 'Innova Crysta', 'Seltos HTX', 'XUV700 AX7', 'Slavia']
const TYPES = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Commercial', 'Two Wheeler', 'Pickup', 'Van']
const COLOURS = ['Pearl White', 'Midnight Black', 'Fiery Red', 'Titan Grey', 'Nexa Blue', 'Silver', 'Bronze', 'Green']
const PRODUCTS = ['Oil Filter', 'Air Filter', 'Brake Pad Set', 'Engine Oil 5W-30', 'Spark Plug', 'Battery 45Ah', 'Wiper Blade', 'Coolant']
const SERVICES = ['Periodic Service', 'Running Repair', 'AC Service', 'Accident Repair', 'Wheel Alignment', 'Brake Service', 'Bodyshop', 'Diagnostics']
const DESIGNATIONS = ['Technician', 'Service Advisor', 'Supervisor', 'Spares Incharge', 'Accountant', 'Manager', 'Driver', 'Helper']
const STATUSES = ['Active', 'Pending', 'Completed', 'Open', 'Approved', 'Paid', 'Draft', 'Closed']
const BRANCHES = ['Pune Main Branch', 'Mumbai Andheri', 'Nashik']
const PAY_METHODS = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']
const TAXES = ['GST 5%', 'GST 12%', 'GST 18%', 'GST 28%', 'Exempt']
const PLANS = [
  'Silver Care Annual', 'Gold Care Annual', 'Platinum Care 2-Year',
  'Two Wheeler Basic', 'Commercial Fleet Plan', 'Express Service Plan',
]

const pick = <T,>(list: T[], i: number): T => list[i % list.length]!

const plate = (i: number) =>
  `MH${12 + (i % 4)}${pick(['AB', 'CD', 'EF', 'GH', 'JK'], i)}${1000 + i * 431}`

const money = (i: number) => (1500 + i * 1730) * 100

const dateOffset = (i: number, back = true) => {
  const d = new Date(2026, 7, 3)
  d.setDate(d.getDate() + (back ? -(i * 6 + 2) : i * 5 + 3))
  return d.toISOString()
}

/**
 * One cell value, chosen from the column label.
 * Ordering matters: more specific checks come first.
 */
function valueFor(label: string, i: number): unknown {
  const l = label.toLowerCase()

  if (l === 'image' || l.includes('photo') || l.includes('avatar')) return ''
  if (l.includes('first name')) return pick(FIRST, i)
  if (l.includes('last name')) return pick(LAST, i)
  if (l.includes('company')) return pick(COMPANY, i)
  if (l.includes('customer')) return `${pick(FIRST, i)} ${pick(LAST, i + 3)}`
  if (l.includes('supplier') || l.includes('vendor')) return pick(COMPANY, i)
  if (l.includes('email')) return `${pick(FIRST, i).toLowerCase()}.${pick(LAST, i).toLowerCase()}@example.com`
  if (l.includes('mobile') || l.includes('phone') || l.includes('contact')) return `98${String(21004455 + i * 1237).slice(0, 8)}`
  if (l.includes('number plate') || l.includes('registration') || l.includes('vehicle no')) return plate(i)
  if (l.includes('brand')) return pick(BRANDS, i)
  if (l.includes('model')) return pick(MODELS, i)
  if (l.includes('vehicle type') || l === 'type') return pick(TYPES, i)
  if (l.includes('colour') || l.includes('color')) return pick(COLOURS, i)
  // Membership rules sit ahead of the generic ones: "Free Services" and
  // "Plan Name" would otherwise be caught by the service and name checks below
  // and show a service name where a count or a plan belongs.
  if (l.includes('membership no') || l === 'membership') return `MEM-2026-${String(1500 + i).padStart(6, '0')}`
  if (l.includes('plan')) return pick(PLANS, i)
  if (l.includes('validity')) return pick(['6 Months', '12 Months', '24 Months'], i)
  if (l.includes('discount')) return `${5 + (i % 4) * 5}%`
  if (l.includes('free services')) return String(2 + (i % 3))
  if (l.includes('services used')) return `${i % 4} of ${2 + (i % 3)}`
  if (l === 'members') return String(12 + i * 9)
  if (l.includes('days left')) return String(3 + i * 7)
  if (l.includes('reminder')) return dateOffset(i)

  if (l.includes('product') || l.includes('part') || l.includes('item')) return pick(PRODUCTS, i)
  if (l.includes('service')) return pick(SERVICES, i)
  if (l.includes('designation') || l.includes('role')) return pick(DESIGNATIONS, i)
  if (l.includes('branch')) return pick(BRANCHES, i)
  if (l.includes('payment') || l.includes('method')) return pick(PAY_METHODS, i)
  if (l.includes('tax')) return pick(TAXES, i)
  if (l.includes('status')) return pick(STATUSES, i)
  if (l.includes('engine')) return `K12NN${100000 + i * 7919}`
  if (l.includes('chassis') || l.includes('vin')) return `MA3EYD61S${String(100000 + i * 3571)}`
  if (l.includes('odometer') || l.includes('km')) return `${(12000 + i * 4300).toLocaleString('en-IN')} km`
  if (l.includes('upcoming') || l.includes('due') || l.includes('expiry')) return dateOffset(i, false)
  if (l.includes('date')) return dateOffset(i)
  if (l.includes('amount') || l.includes('price') || l.includes('total') || l.includes('rate')) return money(i)
  if (l.includes('qty') || l.includes('quantity') || l.includes('stock')) return String(4 + i * 3)
  if (l.includes('invoice') || l.includes('bill')) return `INV-2026-${String(4800 + i).padStart(6, '0')}`
  if (l.includes('quotation')) return `QT-2026-${String(1200 + i).padStart(6, '0')}`
  if (l.includes('job') || l.includes('card')) return `JC-2026-${String(1240 + i).padStart(6, '0')}`
  if (l.includes('gate pass')) return `GP-2026-${String(300 + i).padStart(6, '0')}`
  if (l.includes('name') || l.includes('title') || l.includes('subject')) return pick(SERVICES, i)
  if (l.includes('description') || l.includes('note') || l.includes('remark')) {
    return pick(
      [
        'Routine check completed',
        'Customer reported noise while braking',
        'Awaiting spare part',
        'Approved by supervisor',
      ],
      i,
    )
  }
  if (l.includes('code')) return `CD-${String(1000 + i * 7)}`
  return `${label} ${i + 1}`
}

const columnKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** Builds sample rows for a set of column labels. */
export function sampleRows(
  columns: string[],
  count = 8,
): Array<Record<string, unknown> & { id: string }> {
  return Array.from({ length: count }, (_, i) => {
    const row: Record<string, unknown> & { id: string } = { id: `sample-${i + 1}` }
    for (const label of columns) row[columnKey(label)] = valueFor(label, i)
    return row
  })
}
