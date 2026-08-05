/**
 * Seed data for the Workshop MVP.
 *
 * Shaped exactly like the eventual API response. When the backend arrives this
 * file is deleted and the store's actions call the API instead — screens do not
 * change. Ref: 03_PAGE_TEMPLATES.md §26
 */

import type {
  Branch,
  Customer,
  Employee,
  Person,
  Product,
  Supplier,
  Vehicle,
} from '@garage/shared'

export const COMPANY_ID = 'co-1'

export const seedBranches: Branch[] = [
  { id: 'br-pune-main', name: 'Pune Main Branch', code: 'PUN', city: 'Pune' },
  { id: 'br-mumbai', name: 'Mumbai Andheri', code: 'MUM', city: 'Mumbai' },
]

const base = { companyId: COMPANY_ID, branchId: 'br-pune-main' }

export const seedEmployees: Employee[] = [
  { ...base, id: 'emp-1', code: 'SA-01', name: 'Amit Patil', role: 'Service Advisor', available: true },
  { ...base, id: 'emp-2', code: 'SA-02', name: 'Suresh Kale', role: 'Service Advisor', available: true },
  { ...base, id: 'emp-3', code: 'SV-01', name: 'Nilesh Pawar', role: 'Supervisor', available: true },
  {
    ...base,
    id: 'emp-10',
    code: 'TECH-01',
    name: 'Rahul More',
    role: 'Technician',
    skills: ['Engine', 'Periodic Service'],
    available: true,
  },
  {
    ...base,
    id: 'emp-11',
    code: 'TECH-02',
    name: 'Ganesh Salunkhe',
    role: 'Technician',
    skills: ['Brakes', 'Suspension'],
    available: true,
  },
  {
    ...base,
    id: 'emp-12',
    code: 'TECH-03',
    name: 'Imran Shaikh',
    role: 'Technician',
    skills: ['AC', 'Electricals'],
    available: true,
  },
  {
    ...base,
    id: 'emp-13',
    code: 'TECH-04',
    name: 'Dattatray Pote',
    role: 'Technician',
    skills: ['Bodyshop', 'Denting'],
    available: false,
  },
]

export const seedCustomers: Customer[] = [
  {
    ...base,
    id: 'cust-1',
    code: 'CUS-000001',
    name: 'Rajesh Sharma',
    type: 'Individual',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    addressLine: 'Flat 402, Sai Residency, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    creditLimit: 2500000,
    status: 'Active',
    createdAt: '2021-03-14T09:20:00.000Z',
  },
  {
    ...base,
    id: 'cust-2',
    code: 'CUS-000002',
    name: 'Priya Desai',
    type: 'Individual',
    mobile: '9823014567',
    email: 'priya.desai@example.com',
    addressLine: '12 Sunrise Apartments, Baner',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411045',
    creditLimit: 0,
    status: 'Active',
    createdAt: '2022-08-02T11:05:00.000Z',
  },
  {
    ...base,
    id: 'cust-3',
    code: 'CUS-000003',
    name: 'Deshmukh Logistics Pvt. Ltd.',
    type: 'Business',
    mobile: '9011223344',
    email: 'accounts@deshmukhlogistics.example',
    addressLine: 'Plot 14, MIDC Bhosari',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411026',
    gstin: '27AABCD1234E1ZP',
    creditLimit: 15000000,
    status: 'Active',
    createdAt: '2020-11-19T08:00:00.000Z',
  },
  {
    ...base,
    id: 'cust-4',
    code: 'CUS-000004',
    name: 'Sunil Kulkarni',
    type: 'Individual',
    mobile: '9765432198',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    creditLimit: 0,
    status: 'Active',
    createdAt: '2024-01-08T14:40:00.000Z',
  },
]

export const seedVehicles: Vehicle[] = [
  {
    ...base,
    id: 'veh-1',
    customerId: 'cust-1',
    registration: 'MH12AB4582',
    manufacturer: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'VXI',
    fuelType: 'Petrol',
    transmission: 'Manual',
    colour: 'Pearl Arctic White',
    manufacturingYear: 2021,
    vin: 'MA3EYD61SMB123456',
    engineNumber: 'K12NN1234567',
    lastOdometer: 42580,
    createdAt: '2021-03-14T09:25:00.000Z',
  },
  {
    ...base,
    id: 'veh-2',
    customerId: 'cust-1',
    registration: 'MH14CD7781',
    manufacturer: 'Hyundai',
    model: 'i20',
    variant: 'Asta',
    fuelType: 'Petrol',
    transmission: 'AMT',
    colour: 'Fiery Red',
    manufacturingYear: 2023,
    lastOdometer: 18240,
    createdAt: '2023-06-11T10:00:00.000Z',
  },
  {
    ...base,
    id: 'veh-3',
    customerId: 'cust-2',
    registration: 'MH12XY9021',
    manufacturer: 'Tata Motors',
    model: 'Nexon',
    variant: 'XZ+',
    fuelType: 'Diesel',
    transmission: 'Manual',
    colour: 'Calgary White',
    manufacturingYear: 2022,
    lastOdometer: 31900,
    createdAt: '2022-08-02T11:10:00.000Z',
  },
  {
    ...base,
    id: 'veh-4',
    customerId: 'cust-3',
    registration: 'MH12GH3344',
    manufacturer: 'Toyota',
    model: 'Innova Crysta',
    variant: 'GX',
    fuelType: 'Diesel',
    transmission: 'Manual',
    colour: 'Silver',
    manufacturingYear: 2019,
    lastOdometer: 128400,
    createdAt: '2020-11-19T08:10:00.000Z',
  },
  {
    ...base,
    id: 'veh-5',
    customerId: 'cust-4',
    registration: 'MH12EF5566',
    manufacturer: 'Honda',
    model: 'City',
    variant: 'ZX',
    fuelType: 'Petrol',
    transmission: 'CVT',
    colour: 'Platinum White',
    manufacturingYear: 2020,
    lastOdometer: 56120,
    createdAt: '2024-01-08T14:45:00.000Z',
  },
]

/** Prices are integer paise throughout. */
export const seedProducts: Product[] = [
  { ...base, id: 'prd-1', sku: 'SKU-1001', name: 'Engine Oil 5W-30 (1 Ltr)', type: 'Lubricant', partNumber: 'CAS5W30-1L', category: 'Lubricants', brand: 'Castrol', unit: 'Ltr', hsn: '27101980', taxRate: 18, purchasePrice: 48000, sellingPrice: 65000, onHand: 64, reserved: 6, reorderLevel: 20, status: 'Active' },
  { ...base, id: 'prd-2', sku: 'SKU-1002', name: 'Oil Filter', type: 'Spare Part', partNumber: 'BOS-OF-2210', category: 'Filters', brand: 'Bosch', unit: 'Nos', hsn: '84212300', taxRate: 18, purchasePrice: 21000, sellingPrice: 32000, onHand: 38, reserved: 4, reorderLevel: 15, status: 'Active' },
  { ...base, id: 'prd-3', sku: 'SKU-1003', name: 'Air Filter', type: 'Spare Part', partNumber: 'BOS-AF-1180', category: 'Filters', brand: 'Bosch', unit: 'Nos', hsn: '84213100', taxRate: 18, purchasePrice: 29000, sellingPrice: 45000, onHand: 22, reserved: 2, reorderLevel: 12, status: 'Active' },
  { ...base, id: 'prd-4', sku: 'SKU-1004', name: 'Cabin Air Filter', type: 'Spare Part', partNumber: 'MHL-CF-330', category: 'Filters', brand: 'Mahle', unit: 'Nos', hsn: '84213900', taxRate: 18, purchasePrice: 26000, sellingPrice: 39000, onHand: 9, reserved: 1, reorderLevel: 12, status: 'Active' },
  { ...base, id: 'prd-5', sku: 'SKU-1005', name: 'Brake Pad Set — Front', type: 'Spare Part', partNumber: 'BRE-BP-4410', category: 'Brakes', brand: 'Brembo', unit: 'Set', hsn: '87083000', taxRate: 28, purchasePrice: 132000, sellingPrice: 185000, onHand: 7, reserved: 2, reorderLevel: 8, status: 'Active' },
  { ...base, id: 'prd-6', sku: 'SKU-1006', name: 'Brake Disc — Front', type: 'Spare Part', partNumber: 'BRE-BD-2201', category: 'Brakes', brand: 'Brembo', unit: 'Nos', hsn: '87083000', taxRate: 28, purchasePrice: 245000, sellingPrice: 340000, onHand: 3, reserved: 0, reorderLevel: 6, status: 'Active' },
  { ...base, id: 'prd-7', sku: 'SKU-1007', name: 'Wiper Blade 24"', type: 'Spare Part', partNumber: 'BOS-WB-24', category: 'Body Parts', brand: 'Bosch', unit: 'Nos', hsn: '85122010', taxRate: 18, purchasePrice: 38000, sellingPrice: 55000, onHand: 26, reserved: 0, reorderLevel: 10, status: 'Active' },
  { ...base, id: 'prd-8', sku: 'SKU-1008', name: 'Spark Plug (Iridium)', type: 'Spare Part', partNumber: 'NGK-SP-9012', category: 'Electricals', brand: 'NGK', unit: 'Nos', hsn: '85111000', taxRate: 18, purchasePrice: 42000, sellingPrice: 62000, onHand: 44, reserved: 4, reorderLevel: 16, status: 'Active' },
  { ...base, id: 'prd-9', sku: 'SKU-1009', name: 'Battery 45Ah', type: 'Spare Part', partNumber: 'EXD-B45', category: 'Electricals', brand: 'Exide', unit: 'Nos', hsn: '85071000', taxRate: 28, purchasePrice: 385000, sellingPrice: 495000, onHand: 5, reserved: 1, reorderLevel: 4, status: 'Active' },
  { ...base, id: 'prd-10', sku: 'SKU-1010', name: 'Coolant (1 Ltr)', type: 'Lubricant', partNumber: 'CAS-CL-1L', category: 'Lubricants', brand: 'Castrol', unit: 'Ltr', hsn: '38200000', taxRate: 18, purchasePrice: 24000, sellingPrice: 36000, onHand: 31, reserved: 0, reorderLevel: 12, status: 'Active' },
  { ...base, id: 'prd-11', sku: 'SKU-1011', name: 'Gear Oil 75W-90 (1 Ltr)', type: 'Lubricant', partNumber: 'MOB-GO-1L', category: 'Lubricants', brand: 'Mobil', unit: 'Ltr', hsn: '27101980', taxRate: 18, purchasePrice: 41000, sellingPrice: 58000, onHand: 18, reserved: 0, reorderLevel: 10, status: 'Active' },
  { ...base, id: 'prd-12', sku: 'SKU-1012', name: 'AC Filter Drier', type: 'Spare Part', partNumber: 'DEN-AC-771', category: 'Electricals', brand: 'Denso', unit: 'Nos', hsn: '84159000', taxRate: 18, purchasePrice: 88000, sellingPrice: 125000, onHand: 0, reserved: 0, reorderLevel: 5, status: 'Active' },
  { ...base, id: 'prd-13', sku: 'SKU-1013', name: 'Clutch Plate Assembly', type: 'Spare Part', partNumber: 'VAL-CP-660', category: 'Suspension', brand: 'Valeo', unit: 'Set', hsn: '87089300', taxRate: 28, purchasePrice: 620000, sellingPrice: 820000, onHand: 2, reserved: 0, reorderLevel: 3, status: 'Active' },
  { ...base, id: 'prd-14', sku: 'SKU-1014', name: 'Shock Absorber — Rear', type: 'Spare Part', partNumber: 'MON-SA-118', category: 'Suspension', brand: 'Monroe', unit: 'Nos', hsn: '87088000', taxRate: 28, purchasePrice: 168000, sellingPrice: 235000, onHand: 6, reserved: 0, reorderLevel: 4, status: 'Active' },
  { ...base, id: 'prd-15', sku: 'SKU-1015', name: 'Windshield Washer Fluid (500ml)', type: 'Consumable', partNumber: 'GEN-WW-500', category: 'Lubricants', brand: 'Generic', unit: 'Nos', hsn: '38200000', taxRate: 18, purchasePrice: 9000, sellingPrice: 15000, onHand: 48, reserved: 0, reorderLevel: 20, status: 'Active' },
]

/** Standard labour operations — a Masters table in the full build. */
export const seedLabourCatalogue = [
  { name: 'Periodic Service — Paid Service', hours: 2, rate: 125000 },
  { name: 'Engine Oil & Filter Change', hours: 1, rate: 60000 },
  { name: 'Brake Pad Replacement — Front', hours: 1.5, rate: 90000 },
  { name: 'Brake Disc Machining', hours: 1, rate: 75000 },
  { name: 'AC Service & Gas Top-Up', hours: 2, rate: 180000 },
  { name: 'Wheel Alignment & Balancing', hours: 1, rate: 85000 },
  { name: 'Clutch Overhaul', hours: 5, rate: 450000 },
  { name: 'Suspension Inspection', hours: 1, rate: 50000 },
  { name: 'General Diagnostics', hours: 1, rate: 65000 },
]

export const SERVICE_TYPES = [
  'Periodic Service',
  'Running Repair',
  'Accident Repair',
  'AC Service',
  'Bodyshop',
]

export const BAYS = ['B-01', 'B-02', 'B-03', 'B-04', 'B-05', 'B-06', 'B-07', 'B-08']

export const MANUFACTURERS = [
  'Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Honda',
  'Toyota', 'Kia', 'Renault', 'Volkswagen', 'Skoda',
]

/** Suppliers — the parties the garage buys parts from. */
export const seedSuppliers: Supplier[] = [
  {
    ...base, id: 'sup-1', code: 'SUP-000001',
    firstName: 'Ramesh', lastName: 'Bhandari', companyName: 'Bosch Auto Parts',
    email: 'sales@boschautoparts.example', mobile: '9822114455',
    productNames: ['Oil Filter', 'Air Filter', 'Spark Plug'],
    addressLine: 'Plot 22, MIDC Bhosari', city: 'Pune', state: 'Maharashtra',
    pincode: '411026', gstin: '27AAACB1234F1Z5',
    status: 'Active', createdAt: '2024-02-11T09:00:00.000Z',
  },
  {
    ...base, id: 'sup-2', code: 'SUP-000002',
    firstName: 'Anil', lastName: 'Mehta', companyName: 'Castrol Distributors',
    email: 'orders@castroldist.example', mobile: '9820556677',
    productNames: ['Engine Oil 5W-30', 'Gear Oil 75W-90', 'Coolant'],
    addressLine: '14 Andheri Industrial Estate', city: 'Mumbai', state: 'Maharashtra',
    pincode: '400053', gstin: '27AABCC5678G1Z2',
    status: 'Active', createdAt: '2024-05-03T09:00:00.000Z',
  },
  {
    ...base, id: 'sup-3', code: 'SUP-000003',
    firstName: 'Suresh', lastName: 'Iyer', companyName: 'Brembo India',
    email: 'contact@brembo.example', mobile: '9845003311',
    productNames: ['Brake Pad Set', 'Brake Disc'],
    addressLine: 'Peenya Industrial Area', city: 'Bengaluru', state: 'Karnataka',
    pincode: '560058', gstin: '29AADCB9012H1Z8',
    status: 'Active', createdAt: '2025-01-19T09:00:00.000Z',
  },
  {
    ...base, id: 'sup-4', code: 'SUP-000004',
    firstName: 'Pradeep', lastName: 'Shah', companyName: 'Exide Batteries',
    email: 'dealer@exide.example', mobile: '9811223344',
    productNames: ['Battery 45Ah'],
    addressLine: 'Sector 8, Hadapsar', city: 'Pune', state: 'Maharashtra',
    pincode: '411013', gstin: '27AAACE3456J1Z1',
    status: 'Active', createdAt: '2025-06-27T09:00:00.000Z',
  },
  {
    ...base, id: 'sup-5', code: 'SUP-000005',
    firstName: 'Imtiaz', lastName: 'Khan', companyName: 'NGK Spark Plugs',
    email: 'india@ngk.example', mobile: '9898001122',
    productNames: ['Spark Plug (Iridium)'],
    addressLine: 'GIDC Vatva', city: 'Ahmedabad', state: 'Gujarat',
    pincode: '382445', gstin: '24AABCN7890K1Z6',
    status: 'Active', createdAt: '2025-09-14T09:00:00.000Z',
  },
]

/**
 * Staff-side user records.
 *
 * The workshop Employee list above stays as it is — it is what the job card
 * references. These are the fuller HR-side records the Users screens manage,
 * and the workshop names are repeated here so the two agree on who works here.
 */
export const seedPersons: Person[] = [
  {
    id: 'per-1', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0001',
    role: 'Employee', firstName: 'Amit', lastName: 'Patil', email: 'amit.patil@example.com',
    mobile: '9822011001', gender: 'Male', designation: 'Service Advisor',
    joinDate: '2022-04-11', city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2022-04-11T09:00:00.000Z',
  },
  {
    id: 'per-2', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0002',
    role: 'Employee', firstName: 'Nilesh', lastName: 'Pawar', email: 'nilesh.pawar@example.com',
    mobile: '9822011002', gender: 'Male', designation: 'Supervisor',
    joinDate: '2021-09-01', city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2021-09-01T09:00:00.000Z',
  },
  {
    id: 'per-3', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0003',
    role: 'Employee', firstName: 'Rahul', lastName: 'More', email: 'rahul.more@example.com',
    mobile: '9822011003', gender: 'Male', designation: 'Technician',
    joinDate: '2023-01-16', city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2023-01-16T09:00:00.000Z',
  },
  {
    id: 'per-4', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0004',
    role: 'Employee', firstName: 'Dattatray', lastName: 'Pote', mobile: '9822011004',
    gender: 'Male', designation: 'Denting & Painting', joinDate: '2020-06-02',
    city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Inactive', createdAt: '2020-06-02T09:00:00.000Z',
  },
  {
    id: 'per-5', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0005',
    role: 'Support Staff', firstName: 'Kavita', lastName: 'Rane',
    email: 'kavita.rane@example.com', mobile: '9822011005', gender: 'Female',
    designation: 'Front Desk', joinDate: '2023-03-20',
    city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2023-03-20T09:00:00.000Z',
  },
  {
    id: 'per-6', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0006',
    role: 'Support Staff', firstName: 'Sneha', lastName: 'Kadam', mobile: '9822011006',
    gender: 'Female', designation: 'Customer Care', joinDate: '2024-02-05',
    city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2024-02-05T09:00:00.000Z',
  },
  {
    id: 'per-7', companyId: COMPANY_ID, branchId: 'br-pune-main', code: 'EMP-0007',
    role: 'Accountant', firstName: 'Sunil', lastName: 'Joshi',
    email: 'sunil.joshi@example.com', mobile: '9822011007', gender: 'Male',
    designation: 'Senior Accountant', joinDate: '2021-11-08',
    city: 'Pune', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2021-11-08T09:00:00.000Z',
  },
  {
    id: 'per-8', companyId: COMPANY_ID, branchId: 'br-mumbai-andheri', code: 'EMP-0008',
    role: 'Branch Admin', firstName: 'Meena', lastName: 'Desai',
    email: 'meena.desai@example.com', mobile: '9822011008', gender: 'Female',
    designation: 'Branch Manager', joinDate: '2022-07-18',
    city: 'Mumbai', state: 'Maharashtra', country: 'India',
    status: 'Active', createdAt: '2022-07-18T09:00:00.000Z',
  },
]
