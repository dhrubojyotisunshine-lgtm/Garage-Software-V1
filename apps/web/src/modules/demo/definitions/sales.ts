import { activeStatusMap, paymentStatusMap } from '@garage/shared'
import type { DemoModuleDef } from '../types'

/** Vehicle Sales, Counter Sale and Purchase & Vendor mockups. */

const L = (v: number) => `₹ ${v.toFixed(2)} L`

export const vehicleSalesDemo: DemoModuleDef = {
  key: 'vehicle-sales',
  label: 'Vehicle Sales',
  path: '/vehicle-sales',
  dashboard: {
    title: 'Vehicle Sales',
    description: 'Vehicle inventory and sales pipeline',
    kpis: [
      { key: 'stock', label: 'Vehicles in Stock', value: '38', delta: -4.2, higherIsBetter: false },
      { key: 'booked', label: 'Bookings This Month', value: '17', delta: 12.5 },
      { key: 'delivered', label: 'Delivered', value: '11', delta: 8.1 },
      { key: 'revenue', label: 'Sales Value', value: L(142.6), delta: 15.4 },
      { key: 'aging', label: 'Ageing > 90 days', value: '6', delta: 3.1, higherIsBetter: false },
    ],
    attention: [
      { key: 'rto', severity: 'critical', label: 'RTO pending beyond 7 days', count: 4 },
      { key: 'finance', severity: 'critical', label: 'Finance approval pending', count: 3 },
      { key: 'delivery', severity: 'warning', label: 'Deliveries scheduled today', count: 5 },
      { key: 'aging', severity: 'info', label: 'Vehicles ageing over 90 days', count: 6 },
    ],
    widgets: [
      {
        key: 'pipeline',
        title: 'Sales Pipeline',
        span: 16,
        rows: [
          { title: 'Rohit Agarwal', subtitle: 'Hyundai Creta SX · Booking amount received', tag: { label: 'Booked', tone: 'progress' } },
          { title: 'Sneha Kadam', subtitle: 'Maruti Baleno Zeta · Awaiting finance approval', tag: { label: 'Finance', tone: 'waiting' } },
          { title: 'Farhan Qureshi', subtitle: 'Tata Nexon XZ+ · RTO in progress', tag: { label: 'RTO', tone: 'action' } },
          { title: 'Deepa Chavan', subtitle: 'Kia Seltos HTX · Ready for delivery', tag: { label: 'Ready', tone: 'success' } },
          { title: 'Manoj Jadhav', subtitle: 'Honda City ZX · Quotation shared', tag: { label: 'Quotation', tone: 'neutral' } },
        ],
      },
      {
        key: 'aging',
        title: 'Stock Ageing',
        span: 8,
        rows: [
          { title: '0 – 30 days', right: '14' },
          { title: '31 – 60 days', right: '11' },
          { title: '61 – 90 days', right: '7' },
          { title: 'Over 90 days', right: '6' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'stock',
      title: 'Vehicle Stock',
      description: 'Vehicles available for sale',
      searchPlaceholder: 'Search model, variant, VIN or colour',
      primaryActionLabel: 'Add Vehicle',
      filters: [
        {
          key: 'make',
          label: 'Make',
          type: 'select',
          width: 150,
          options: ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Kia', 'Honda'].map((v) => ({ label: v, value: v })),
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          width: 140,
          options: ['Available', 'Booked', 'Delivered'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'vin', title: 'VIN', type: 'identifier', width: 175, fixed: 'left', locked: true },
        { key: 'make', title: 'Make', width: 140 },
        { key: 'model', title: 'Model', width: 150 },
        { key: 'variant', title: 'Variant', width: 110 },
        { key: 'colour', title: 'Colour', width: 130 },
        { key: 'year', title: 'Year', type: 'number', width: 90 },
        { key: 'ageDays', title: 'Age (days)', type: 'number', width: 110 },
        { key: 'cost', title: 'Cost', type: 'money', width: 140 },
        { key: 'price', title: 'Selling Price', type: 'money', width: 150 },
        { key: 'status', title: 'Status', width: 120 },
      ],
      rows: [
        { id: '1', vin: 'MA3EYD61SPB884213', make: 'Maruti Suzuki', model: 'Baleno', variant: 'Zeta', colour: 'Nexa Blue', year: 2026, ageDays: 18, cost: 78500000, price: 84900000, status: 'Available' },
        { id: '2', vin: 'MALC381CLPM117742', make: 'Hyundai', model: 'Creta', variant: 'SX', colour: 'Titan Grey', year: 2026, ageDays: 42, cost: 138000000, price: 149500000, status: 'Booked' },
        { id: '3', vin: 'MAT625184PGA31882', make: 'Tata Motors', model: 'Nexon', variant: 'XZ+', colour: 'Calgary White', year: 2025, ageDays: 96, cost: 112000000, price: 121000000, status: 'Available' },
        { id: '4', vin: 'KNAB3811PMT552901', make: 'Kia', model: 'Seltos', variant: 'HTX', colour: 'Gravity Grey', year: 2026, ageDays: 7, cost: 158000000, price: 172000000, status: 'Available' },
        { id: '5', vin: 'MAKGM6613PN228834', make: 'Honda', model: 'City', variant: 'ZX', colour: 'Platinum White', year: 2025, ageDays: 118, cost: 141000000, price: 152500000, status: 'Available' },
        { id: '6', vin: 'MA3EYD61SPB884977', make: 'Maruti Suzuki', model: 'Swift', variant: 'VXI', colour: 'Pearl Red', year: 2026, ageDays: 23, cost: 62000000, price: 68500000, status: 'Booked' },
        { id: '7', vin: 'MALC381CLPM118003', make: 'Hyundai', model: 'i20', variant: 'Asta', colour: 'Fiery Red', year: 2026, ageDays: 51, cost: 89000000, price: 96500000, status: 'Available' },
        { id: '8', vin: 'MAT625184PGA32551', make: 'Tata Motors', model: 'Punch', variant: 'Accomplished', colour: 'Tropical Mist', year: 2026, ageDays: 12, cost: 76000000, price: 82500000, status: 'Delivered' },
      ],
    },
    {
      path: 'sales',
      title: 'Vehicle Sales',
      description: 'Bookings, deliveries and their payment state',
      searchPlaceholder: 'Search sale number, customer or vehicle',
      primaryActionLabel: 'New Sale',
      quickFilters: [
        { key: 'all', label: 'All', count: 6 },
        { key: 'quotation', label: 'Quotation', count: 1, tone: 'neutral' },
        { key: 'booked', label: 'Booked', count: 2, tone: 'progress' },
        { key: 'rto', label: 'RTO', count: 1, tone: 'action' },
        { key: 'delivered', label: 'Delivered', count: 2, tone: 'success' },
      ],
      filters: [
        {
          key: 'executive',
          label: 'Executive',
          type: 'select',
          width: 160,
          options: ['Nilesh Pawar', 'Suresh Kale'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'saleNo', title: 'Sale No', type: 'identifier', width: 165, fixed: 'left', locked: true },
        { key: 'customer', title: 'Customer', width: 170 },
        { key: 'vehicle', title: 'Vehicle', width: 200 },
        { key: 'executive', title: 'Executive', width: 150 },
        { key: 'bookedOn', title: 'Booked', type: 'date', width: 130 },
        { key: 'amount', title: 'Amount', type: 'money', width: 150 },
        { key: 'received', title: 'Received', type: 'money', width: 140 },
        { key: 'paymentStatus', title: 'Payment', type: 'status', statusMap: paymentStatusMap, width: 140 },
        { key: 'stage', title: 'Stage', width: 130 },
      ],
      rows: [
        { id: '1', saleNo: 'VS-2026-000112', customer: 'Rohit Agarwal', vehicle: 'Hyundai Creta SX', executive: 'Nilesh Pawar', bookedOn: '2026-07-22', amount: 149500000, received: 25000000, paymentStatus: 'Partially Paid', stage: 'Booked' },
        { id: '2', saleNo: 'VS-2026-000113', customer: 'Sneha Kadam', vehicle: 'Maruti Baleno Zeta', executive: 'Suresh Kale', bookedOn: '2026-07-25', amount: 84900000, received: 5000000, paymentStatus: 'Partially Paid', stage: 'Finance' },
        { id: '3', saleNo: 'VS-2026-000114', customer: 'Farhan Qureshi', vehicle: 'Tata Nexon XZ+', executive: 'Nilesh Pawar', bookedOn: '2026-07-18', amount: 121000000, received: 121000000, paymentStatus: 'Paid', stage: 'RTO' },
        { id: '4', saleNo: 'VS-2026-000115', customer: 'Deepa Chavan', vehicle: 'Kia Seltos HTX', executive: 'Suresh Kale', bookedOn: '2026-07-12', amount: 172000000, received: 172000000, paymentStatus: 'Paid', stage: 'Delivered' },
        { id: '5', saleNo: 'VS-2026-000116', customer: 'Manoj Jadhav', vehicle: 'Honda City ZX', executive: 'Nilesh Pawar', bookedOn: '2026-07-30', amount: 152500000, received: 0, paymentStatus: 'Unpaid', stage: 'Quotation' },
        { id: '6', saleNo: 'VS-2026-000117', customer: 'Anjali Gokhale', vehicle: 'Tata Punch Accomplished', executive: 'Suresh Kale', bookedOn: '2026-06-28', amount: 82500000, received: 82500000, paymentStatus: 'Paid', stage: 'Delivered' },
      ],
    },
  ],
}

export const counterSaleDemo: DemoModuleDef = {
  key: 'counter-sale',
  label: 'Counter Sale',
  path: '/counter-sale',
  dashboard: {
    title: 'Counter Sale',
    description: 'Over-the-counter parts and accessories retail',
    kpis: [
      { key: 'today', label: 'Sales Today', value: '23', delta: 9.6 },
      { key: 'value', label: 'Value Today', value: '₹ 48,250', delta: 6.2 },
      { key: 'month', label: 'Month to Date', value: L(9.42), delta: 11.8 },
      { key: 'avg', label: 'Average Bill', value: '₹ 2,098', delta: -2.4 },
      { key: 'held', label: 'Held Sales', value: '2', higherIsBetter: false },
    ],
    attention: [
      { key: 'held', severity: 'warning', label: 'Sales on hold over 2 hours', count: 2 },
      { key: 'returns', severity: 'info', label: 'Returns pending approval', count: 1 },
    ],
    widgets: [
      {
        key: 'recent',
        title: 'Recent Sales',
        span: 16,
        rows: [
          { title: 'CS-2026-004412', subtitle: 'Walk-In · 3 items · Cash', right: '₹ 2,772' },
          { title: 'CS-2026-004411', subtitle: 'Rajesh Sharma · 1 item · UPI', right: '₹ 1,180' },
          { title: 'CS-2026-004410', subtitle: 'Walk-In · 5 items · Card', right: '₹ 6,340' },
          { title: 'CS-2026-004409', subtitle: 'Deshmukh Logistics · 8 items · Credit', right: '₹ 14,920' },
          { title: 'CS-2026-004408', subtitle: 'Walk-In · 2 items · UPI', right: '₹ 890' },
        ],
      },
      {
        key: 'modes',
        title: 'Collection by Mode',
        span: 8,
        rows: [
          { title: 'Cash', right: '₹ 12,480' },
          { title: 'UPI', right: '₹ 21,350' },
          { title: 'Card', right: '₹ 9,500' },
          { title: 'Credit', right: '₹ 4,920' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'history',
      title: 'Sales History',
      description: 'Counter sale invoices',
      searchPlaceholder: 'Search bill number or customer',
      filters: [
        {
          key: 'mode',
          label: 'Payment Mode',
          type: 'select',
          width: 160,
          options: ['Cash', 'UPI', 'Card', 'Credit'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'billNo', title: 'Bill No', type: 'identifier', width: 170, fixed: 'left', locked: true },
        { key: 'at', title: 'Date & Time', type: 'datetime', width: 190 },
        { key: 'customer', title: 'Customer', width: 190 },
        { key: 'items', title: 'Items', type: 'number', width: 90 },
        { key: 'taxable', title: 'Taxable', type: 'money', width: 130 },
        { key: 'gst', title: 'GST', type: 'money', width: 120 },
        { key: 'total', title: 'Total', type: 'money', width: 140 },
        { key: 'mode', title: 'Mode', width: 120 },
      ],
      rows: [
        { id: '1', billNo: 'CS-2026-004412', at: '2026-08-03T15:42:00Z', customer: 'Walk-In', items: 3, taxable: 235000, gst: 42300, total: 277300, mode: 'Cash' },
        { id: '2', billNo: 'CS-2026-004411', at: '2026-08-03T14:05:00Z', customer: 'Rajesh Sharma', items: 1, taxable: 100000, gst: 18000, total: 118000, mode: 'UPI' },
        { id: '3', billNo: 'CS-2026-004410', at: '2026-08-03T12:20:00Z', customer: 'Walk-In', items: 5, taxable: 537000, gst: 96660, total: 633660, mode: 'Card' },
        { id: '4', billNo: 'CS-2026-004409', at: '2026-08-03T11:12:00Z', customer: 'Deshmukh Logistics Pvt. Ltd.', items: 8, taxable: 1264000, gst: 227520, total: 1491520, mode: 'Credit' },
        { id: '5', billNo: 'CS-2026-004408', at: '2026-08-03T10:35:00Z', customer: 'Walk-In', items: 2, taxable: 75400, gst: 13570, total: 88970, mode: 'UPI' },
        { id: '6', billNo: 'CS-2026-004407', at: '2026-08-02T17:48:00Z', customer: 'Priya Desai', items: 4, taxable: 412000, gst: 74160, total: 486160, mode: 'Cash' },
      ],
    },
  ],
}

export const purchaseDemo: DemoModuleDef = {
  key: 'purchase',
  label: 'Purchase & Vendor',
  path: '/purchase',
  dashboard: {
    title: 'Purchase & Vendor',
    description: 'Procurement and supplier management',
    kpis: [
      { key: 'open', label: 'Open Purchase Orders', value: '14', delta: 5.5, higherIsBetter: false },
      { key: 'grn', label: 'Pending GRN', value: '6', higherIsBetter: false },
      { key: 'value', label: 'PO Value (MTD)', value: L(18.65), delta: 9.2 },
      { key: 'payable', label: 'Payables', value: L(11.24), delta: 4.1, higherIsBetter: false },
      { key: 'vendors', label: 'Active Vendors', value: '27' },
    ],
    attention: [
      { key: 'overdue', severity: 'critical', label: 'Purchase orders overdue', count: 4 },
      { key: 'approval', severity: 'critical', label: 'Awaiting approval', count: 3 },
      { key: 'grn', severity: 'warning', label: 'Goods received, invoice pending', count: 6 },
      { key: 'payment', severity: 'info', label: 'Vendor payments due this week', count: 9 },
    ],
    widgets: [
      {
        key: 'pos',
        title: 'Recent Purchase Orders',
        span: 16,
        rows: [
          { title: 'PO-2026-000841', subtitle: 'Bosch Auto Parts · 12 lines', tag: { label: 'Approved', tone: 'success' } },
          { title: 'PO-2026-000840', subtitle: 'Castrol Distributors · 5 lines', tag: { label: 'Partially Received', tone: 'progress' } },
          { title: 'PO-2026-000839', subtitle: 'Brembo India · 3 lines', tag: { label: 'Approval Pending', tone: 'action' } },
          { title: 'PO-2026-000838', subtitle: 'Exide Batteries · 8 lines', tag: { label: 'Received', tone: 'success' } },
          { title: 'PO-2026-000837', subtitle: 'NGK Spark Plugs · 4 lines', tag: { label: 'Overdue', tone: 'failure' } },
        ],
      },
      {
        key: 'payables',
        title: 'Payables Ageing',
        span: 8,
        rows: [
          { title: '0 – 30 days', right: '₹ 4.812 L' },
          { title: '31 – 60 days', right: '₹ 3.640 L' },
          { title: '61 – 90 days', right: '₹ 1.980 L' },
          { title: 'Over 90 days', right: '₹ 0.808 L' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'orders',
      title: 'Purchase Orders',
      description: 'Orders raised on suppliers',
      searchPlaceholder: 'Search PO number or vendor',
      primaryActionLabel: 'New Purchase Order',
      quickFilters: [
        { key: 'all', label: 'All', count: 7 },
        { key: 'approval', label: 'Approval Pending', count: 1, tone: 'action' },
        { key: 'open', label: 'Open', count: 3, tone: 'progress' },
        { key: 'received', label: 'Received', count: 2, tone: 'success' },
        { key: 'overdue', label: 'Overdue', count: 1, tone: 'failure' },
      ],
      filters: [
        {
          key: 'vendor',
          label: 'Vendor',
          type: 'select',
          width: 190,
          options: ['Bosch Auto Parts', 'Castrol Distributors', 'Brembo India', 'Exide Batteries', 'NGK Spark Plugs'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'poNo', title: 'PO No', type: 'identifier', width: 170, fixed: 'left', locked: true },
        { key: 'vendor', title: 'Vendor', width: 200 },
        { key: 'raisedOn', title: 'Raised', type: 'date', width: 130 },
        { key: 'expected', title: 'Expected', type: 'date', width: 130 },
        { key: 'lines', title: 'Lines', type: 'number', width: 90 },
        { key: 'value', title: 'Value', type: 'money', width: 145 },
        { key: 'received', title: 'Received %', type: 'number', width: 125 },
        { key: 'status', title: 'Status', width: 165 },
      ],
      rows: [
        { id: '1', poNo: 'PO-2026-000841', vendor: 'Bosch Auto Parts', raisedOn: '2026-07-28', expected: '2026-08-05', lines: 12, value: 4860000, received: 0, status: 'Approved' },
        { id: '2', poNo: 'PO-2026-000840', vendor: 'Castrol Distributors', raisedOn: '2026-07-26', expected: '2026-08-02', lines: 5, value: 1240000, received: 60, status: 'Partially Received' },
        { id: '3', poNo: 'PO-2026-000839', vendor: 'Brembo India', raisedOn: '2026-07-30', expected: '2026-08-08', lines: 3, value: 890000, received: 0, status: 'Approval Pending' },
        { id: '4', poNo: 'PO-2026-000838', vendor: 'Exide Batteries', raisedOn: '2026-07-20', expected: '2026-07-27', lines: 8, value: 3120000, received: 100, status: 'Received' },
        { id: '5', poNo: 'PO-2026-000837', vendor: 'NGK Spark Plugs', raisedOn: '2026-07-10', expected: '2026-07-18', lines: 4, value: 640000, received: 0, status: 'Overdue' },
        { id: '6', poNo: 'PO-2026-000836', vendor: 'Monroe Suspension', raisedOn: '2026-07-15', expected: '2026-07-24', lines: 6, value: 1420000, received: 100, status: 'Received' },
        { id: '7', poNo: 'PO-2026-000835', vendor: 'Mahle Filters', raisedOn: '2026-07-29', expected: '2026-08-06', lines: 9, value: 980000, received: 0, status: 'Approved' },
      ],
    },
    {
      path: 'vendors',
      title: 'Vendors',
      description: 'One vendor record serves parts, lubricants and outside jobs',
      searchPlaceholder: 'Search vendor name, code or GSTIN',
      primaryActionLabel: 'Add Vendor',
      filters: [
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          width: 140,
          options: ['Active', 'Inactive'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'code', title: 'Code', type: 'identifier', width: 125, fixed: 'left', locked: true },
        { key: 'name', title: 'Vendor', width: 220 },
        { key: 'category', title: 'Category', width: 150 },
        { key: 'gstin', title: 'GSTIN', type: 'identifier', width: 180 },
        { key: 'city', title: 'City', width: 120 },
        { key: 'orders', title: 'Orders', type: 'number', width: 100 },
        { key: 'outstanding', title: 'Outstanding', type: 'money', width: 150 },
        { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 115 },
      ],
      rows: [
        { id: '1', code: 'VEN-000001', name: 'Bosch Auto Parts', category: 'Spare Parts', gstin: '27AAACB1234F1Z5', city: 'Pune', orders: 148, outstanding: 48120000, status: 'Active' },
        { id: '2', code: 'VEN-000002', name: 'Castrol Distributors', category: 'Lubricants', gstin: '27AABCC5678G1Z2', city: 'Mumbai', orders: 92, outstanding: 21400000, status: 'Active' },
        { id: '3', code: 'VEN-000003', name: 'Brembo India', category: 'Brakes', gstin: '29AADCB9012H1Z8', city: 'Bengaluru', orders: 37, outstanding: 8900000, status: 'Active' },
        { id: '4', code: 'VEN-000004', name: 'Exide Batteries', category: 'Electricals', gstin: '27AAACE3456J1Z1', city: 'Pune', orders: 64, outstanding: 12480000, status: 'Active' },
        { id: '5', code: 'VEN-000005', name: 'NGK Spark Plugs', category: 'Electricals', gstin: '24AABCN7890K1Z6', city: 'Ahmedabad', orders: 41, outstanding: 3200000, status: 'Active' },
        { id: '6', code: 'VEN-000006', name: 'Shree Denting Works', category: 'Outside Job', gstin: '27AAFPS2345L1Z9', city: 'Pune', orders: 23, outstanding: 1850000, status: 'Active' },
        { id: '7', code: 'VEN-000007', name: 'Old Tyre Traders', category: 'Tyres', gstin: '27AAGPT6789M1Z3', city: 'Pune', orders: 4, outstanding: 0, status: 'Inactive' },
      ],
    },
  ],
}
