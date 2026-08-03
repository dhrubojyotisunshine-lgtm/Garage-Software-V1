import { activeStatusMap, paymentStatusMap } from '@garage/shared'
import type { DemoModuleDef } from '../types'

/** Insurance, Customer Programs, Finance and HRM mockups. */

const L = (v: number) => `₹ ${v.toFixed(2)} L`

export const insuranceDemo: DemoModuleDef = {
  key: 'insurance',
  label: 'Insurance',
  path: '/insurance',
  dashboard: {
    title: 'Insurance',
    description: 'Policies, renewals and workshop claims',
    kpis: [
      { key: 'active', label: 'Active Policies', value: '412', delta: 3.8 },
      { key: 'renewals', label: 'Renewals This Month', value: '38', delta: -6.1 },
      { key: 'claims', label: 'Open Claims', value: '17', higherIsBetter: false },
      { key: 'value', label: 'Claim Value', value: L(23.8), delta: 12.4 },
      { key: 'settled', label: 'Settled (MTD)', value: L(14.2), delta: 8.9 },
    ],
    attention: [
      { key: 'expiring', severity: 'critical', label: 'Policies expiring in 7 days', count: 9 },
      { key: 'survey', severity: 'critical', label: 'Awaiting surveyor visit', count: 5 },
      { key: 'approval', severity: 'warning', label: 'Claims pending insurer approval', count: 7 },
      { key: 'settlement', severity: 'info', label: 'Settlements received this week', count: 4 },
    ],
    widgets: [
      {
        key: 'claims',
        title: 'Active Claims',
        span: 16,
        rows: [
          { title: 'CLM-2026-000318', subtitle: 'MH12AB4582 · Bajaj Allianz · Accident', tag: { label: 'Survey', tone: 'action' } },
          { title: 'CLM-2026-000317', subtitle: 'MH14CD7781 · ICICI Lombard · Own Damage', tag: { label: 'Approved', tone: 'success' } },
          { title: 'CLM-2026-000316', subtitle: 'MH12XY9021 · HDFC Ergo · Accident', tag: { label: 'Repair', tone: 'progress' } },
          { title: 'CLM-2026-000315', subtitle: 'MH12GH3344 · New India · Third Party', tag: { label: 'Intimated', tone: 'neutral' } },
          { title: 'CLM-2026-000314', subtitle: 'MH12EF5566 · Tata AIG · Own Damage', tag: { label: 'Settled', tone: 'closed' } },
        ],
      },
      {
        key: 'insurers',
        title: 'Claims by Insurer',
        span: 8,
        rows: [
          { title: 'Bajaj Allianz', right: '6' },
          { title: 'ICICI Lombard', right: '4' },
          { title: 'HDFC Ergo', right: '3' },
          { title: 'New India Assurance', right: '2' },
          { title: 'Tata AIG', right: '2' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'policies',
      title: 'Insurance Policies',
      searchPlaceholder: 'Search policy number, customer or registration',
      primaryActionLabel: 'Add Policy',
      filters: [
        { key: 'insurer', label: 'Insurer', type: 'select', width: 180,
          options: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'New India Assurance', 'Tata AIG'].map((v) => ({ label: v, value: v })) },
      ],
      columns: [
        { key: 'policyNo', title: 'Policy No', type: 'identifier', width: 180, fixed: 'left', locked: true },
        { key: 'customer', title: 'Customer', width: 170 },
        { key: 'registration', title: 'Vehicle', type: 'registration', width: 135 },
        { key: 'insurer', title: 'Insurer', width: 175 },
        { key: 'type', title: 'Type', width: 135 },
        { key: 'expiry', title: 'Expiry', type: 'date', width: 130 },
        { key: 'premium', title: 'Premium', type: 'money', width: 135 },
        { key: 'idv', title: 'IDV', type: 'money', width: 145 },
      ],
      rows: [
        { id: '1', policyNo: 'BA/2026/8841273', customer: 'Rajesh Sharma', registration: 'MH12AB4582', insurer: 'Bajaj Allianz', type: 'Comprehensive', expiry: '2026-08-09', premium: 1842000, idv: 54000000 },
        { id: '2', policyNo: 'IL/2026/5512908', customer: 'Priya Desai', registration: 'MH12XY9021', insurer: 'ICICI Lombard', type: 'Comprehensive', expiry: '2026-08-14', premium: 2140000, idv: 78000000 },
        { id: '3', policyNo: 'HE/2026/3390172', customer: 'Sunil Kulkarni', registration: 'MH12EF5566', insurer: 'HDFC Ergo', type: 'Third Party', expiry: '2026-09-01', premium: 640000, idv: 0 },
        { id: '4', policyNo: 'NI/2026/7781234', customer: 'Deshmukh Logistics Pvt. Ltd.', registration: 'MH12GH3344', insurer: 'New India Assurance', type: 'Commercial', expiry: '2026-08-06', premium: 4820000, idv: 96000000 },
        { id: '5', policyNo: 'TA/2026/2214578', customer: 'Rajesh Sharma', registration: 'MH14CD7781', insurer: 'Tata AIG', type: 'Comprehensive', expiry: '2027-01-22', premium: 1980000, idv: 68000000 },
      ],
    },
    {
      path: 'claims',
      title: 'Insurance Claims',
      searchPlaceholder: 'Search claim number, policy or registration',
      primaryActionLabel: 'New Claim',
      quickFilters: [
        { key: 'all', label: 'All', count: 5 },
        { key: 'intimated', label: 'Intimated', count: 1, tone: 'neutral' },
        { key: 'survey', label: 'Survey', count: 1, tone: 'action' },
        { key: 'repair', label: 'Repair', count: 1, tone: 'progress' },
        { key: 'settled', label: 'Settled', count: 1, tone: 'closed' },
      ],
      filters: [],
      columns: [
        { key: 'claimNo', title: 'Claim No', type: 'identifier', width: 180, fixed: 'left', locked: true },
        { key: 'registration', title: 'Vehicle', type: 'registration', width: 135 },
        { key: 'insurer', title: 'Insurer', width: 175 },
        { key: 'jobCard', title: 'Job Card', type: 'identifier', width: 165 },
        { key: 'estimate', title: 'Estimate', type: 'money', width: 140 },
        { key: 'approved', title: 'Approved', type: 'money', width: 140 },
        { key: 'liability', title: 'Customer Share', type: 'money', width: 155 },
        { key: 'status', title: 'Status', width: 135 },
      ],
      rows: [
        { id: '1', claimNo: 'CLM-2026-000318', registration: 'MH12AB4582', insurer: 'Bajaj Allianz', jobCard: 'JC-2026-001284', estimate: 8420000, approved: 0, liability: 0, status: 'Survey' },
        { id: '2', claimNo: 'CLM-2026-000317', registration: 'MH14CD7781', insurer: 'ICICI Lombard', jobCard: 'JC-2026-001279', estimate: 5640000, approved: 4980000, liability: 660000, status: 'Approved' },
        { id: '3', claimNo: 'CLM-2026-000316', registration: 'MH12XY9021', insurer: 'HDFC Ergo', jobCard: 'JC-2026-001271', estimate: 11200000, approved: 10100000, liability: 1100000, status: 'Repair' },
        { id: '4', claimNo: 'CLM-2026-000315', registration: 'MH12GH3344', insurer: 'New India Assurance', jobCard: 'JC-2026-001268', estimate: 3180000, approved: 0, liability: 0, status: 'Intimated' },
        { id: '5', claimNo: 'CLM-2026-000314', registration: 'MH12EF5566', insurer: 'Tata AIG', jobCard: 'JC-2026-001255', estimate: 6740000, approved: 6100000, liability: 640000, status: 'Settled' },
      ],
    },
  ],
}

export const programsDemo: DemoModuleDef = {
  key: 'programs',
  label: 'Customer Programs',
  path: '/programs',
  dashboard: {
    title: 'Customer Programs',
    description: 'Membership, loyalty, AMC and wallet',
    kpis: [
      { key: 'members', label: 'Active Members', value: '186', delta: 7.4 },
      { key: 'amc', label: 'Active AMCs', value: '94', delta: 4.2 },
      { key: 'points', label: 'Loyalty Points Issued', value: '2,48,120', delta: 11.1 },
      { key: 'wallet', label: 'Wallet Balance', value: L(4.86), delta: 2.8 },
      { key: 'expiring', label: 'Expiring in 30 days', value: '23', higherIsBetter: false },
    ],
    attention: [
      { key: 'expiring', severity: 'warning', label: 'Memberships expiring this month', count: 14 },
      { key: 'amc', severity: 'warning', label: 'AMC services unused, expiring soon', count: 9 },
      { key: 'points', severity: 'info', label: 'Loyalty points expiring', count: 31 },
    ],
    widgets: [
      {
        key: 'members',
        title: 'Recent Enrolments',
        span: 16,
        rows: [
          { title: 'Rajesh Sharma', subtitle: 'Gold Membership · 12 months', tag: { label: 'Active', tone: 'success' } },
          { title: 'Priya Desai', subtitle: 'AMC Standard · 4 services', tag: { label: 'Active', tone: 'success' } },
          { title: 'Sunil Kulkarni', subtitle: 'Silver Membership · 6 months', tag: { label: 'Expiring', tone: 'waiting' } },
          { title: 'Deshmukh Logistics', subtitle: 'Fleet AMC · 24 services', tag: { label: 'Active', tone: 'success' } },
        ],
      },
      {
        key: 'plans',
        title: 'Members by Plan',
        span: 8,
        rows: [
          { title: 'Gold', right: '64' },
          { title: 'Silver', right: '82' },
          { title: 'Fleet', right: '18' },
          { title: 'Basic', right: '22' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'membership',
      title: 'Membership',
      searchPlaceholder: 'Search customer or membership number',
      primaryActionLabel: 'Enrol Customer',
      filters: [
        { key: 'plan', label: 'Plan', type: 'select', width: 140,
          options: ['Gold', 'Silver', 'Fleet', 'Basic'].map((v) => ({ label: v, value: v })) },
      ],
      columns: [
        { key: 'memberNo', title: 'Member No', type: 'identifier', width: 165, fixed: 'left', locked: true },
        { key: 'customer', title: 'Customer', width: 210 },
        { key: 'plan', title: 'Plan', width: 120 },
        { key: 'startDate', title: 'Start', type: 'date', width: 130 },
        { key: 'expiry', title: 'Expiry', type: 'date', width: 130 },
        { key: 'used', title: 'Benefits Used', type: 'number', width: 140 },
        { key: 'fee', title: 'Fee', type: 'money', width: 130 },
        { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 120 },
      ],
      rows: [
        { id: '1', memberNo: 'MEM-000184', customer: 'Rajesh Sharma', plan: 'Gold', startDate: '2026-01-14', expiry: '2027-01-13', used: 4, fee: 1200000, status: 'Active' },
        { id: '2', memberNo: 'MEM-000185', customer: 'Priya Desai', plan: 'Silver', startDate: '2026-03-02', expiry: '2026-09-01', used: 2, fee: 600000, status: 'Active' },
        { id: '3', memberNo: 'MEM-000186', customer: 'Sunil Kulkarni', plan: 'Silver', startDate: '2026-02-20', expiry: '2026-08-19', used: 5, fee: 600000, status: 'Active' },
        { id: '4', memberNo: 'MEM-000187', customer: 'Deshmukh Logistics Pvt. Ltd.', plan: 'Fleet', startDate: '2025-11-01', expiry: '2026-10-31', used: 18, fee: 4800000, status: 'Active' },
        { id: '5', memberNo: 'MEM-000188', customer: 'Anjali Gokhale', plan: 'Basic', startDate: '2025-08-11', expiry: '2026-08-10', used: 1, fee: 250000, status: 'Inactive' },
      ],
    },
  ],
}

export const financeDemo: DemoModuleDef = {
  key: 'finance',
  label: 'Finance & Accounts',
  path: '/finance',
  dashboard: {
    title: 'Finance & Accounts',
    description: 'Receivables, payables and cash position',
    kpis: [
      { key: 'receivable', label: 'Receivables', value: L(18.42), delta: 6.4, higherIsBetter: false },
      { key: 'payable', label: 'Payables', value: L(11.24), delta: -3.2 },
      { key: 'collected', label: 'Collected (MTD)', value: L(42.8), delta: 14.2 },
      { key: 'expenses', label: 'Expenses (MTD)', value: L(6.94), delta: 2.1, higherIsBetter: false },
      { key: 'cash', label: 'Cash & Bank', value: L(28.16), delta: 9.8 },
    ],
    attention: [
      { key: 'overdue', severity: 'critical', label: 'Receivables overdue 90+ days', count: 8 },
      { key: 'cheque', severity: 'critical', label: 'Cheques bounced this month', count: 2 },
      { key: 'payable', severity: 'warning', label: 'Vendor payments due this week', count: 11 },
      { key: 'gst', severity: 'info', label: 'GST filing due in 6 days', count: 1 },
    ],
    widgets: [
      {
        key: 'ageing',
        title: 'Receivables Ageing',
        span: 12,
        rows: [
          { title: '0 – 30 days', subtitle: '34 invoices', right: '₹ 8.24 L' },
          { title: '31 – 60 days', subtitle: '18 invoices', right: '₹ 5.16 L' },
          { title: '61 – 90 days', subtitle: '9 invoices', right: '₹ 3.08 L' },
          { title: 'Over 90 days', subtitle: '8 invoices', right: '₹ 1.94 L' },
        ],
      },
      {
        key: 'collection',
        title: 'Collection by Mode',
        span: 12,
        rows: [
          { title: 'Cash', right: '₹ 9.82 L' },
          { title: 'UPI', right: '₹ 18.44 L' },
          { title: 'Card', right: '₹ 6.12 L' },
          { title: 'Bank Transfer', right: '₹ 7.20 L' },
          { title: 'Cheque', right: '₹ 1.22 L' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'receivables',
      title: 'Receivables',
      description: 'Outstanding customer invoices across all modules',
      searchPlaceholder: 'Search invoice number or customer',
      quickFilters: [
        { key: 'all', label: 'All', count: 6 },
        { key: 'current', label: 'Current', count: 2, tone: 'progress' },
        { key: 'overdue', label: 'Overdue', count: 3, tone: 'failure' },
        { key: 'credit', label: 'On Credit', count: 1, tone: 'waiting' },
      ],
      filters: [
        { key: 'source', label: 'Source', type: 'select', width: 160,
          options: ['Workshop', 'Counter Sale', 'Vehicle Sale', 'Insurance'].map((v) => ({ label: v, value: v })) },
      ],
      columns: [
        { key: 'invoiceNo', title: 'Invoice', type: 'identifier', width: 175, fixed: 'left', locked: true },
        { key: 'customer', title: 'Customer', width: 210 },
        { key: 'source', title: 'Source', width: 140 },
        { key: 'invoiceDate', title: 'Date', type: 'date', width: 130 },
        { key: 'dueDate', title: 'Due', type: 'date', width: 130 },
        { key: 'amount', title: 'Amount', type: 'money', width: 140 },
        { key: 'received', title: 'Received', type: 'money', width: 140 },
        { key: 'balance', title: 'Balance', type: 'money', width: 140 },
        { key: 'ageing', title: 'Ageing', width: 120 },
        { key: 'paymentStatus', title: 'Status', type: 'status', statusMap: paymentStatusMap, width: 140 },
      ],
      rows: [
        { id: '1', invoiceNo: 'INV-2026-004821', customer: 'Rajesh Sharma', source: 'Workshop', invoiceDate: '2026-07-28', dueDate: '2026-08-11', amount: 1874500, received: 500000, balance: 1374500, ageing: '0 – 30 days', paymentStatus: 'Partially Paid' },
        { id: '2', invoiceNo: 'INV-2026-004802', customer: 'Deshmukh Logistics Pvt. Ltd.', source: 'Workshop', invoiceDate: '2026-06-14', dueDate: '2026-07-14', amount: 8240000, received: 4000000, balance: 4240000, ageing: '31 – 60 days', paymentStatus: 'Overdue' },
        { id: '3', invoiceNo: 'INV-2026-004776', customer: 'Priya Desai', source: 'Counter Sale', invoiceDate: '2026-05-02', dueDate: '2026-05-16', amount: 486160, received: 0, balance: 486160, ageing: 'Over 90 days', paymentStatus: 'Overdue' },
        { id: '4', invoiceNo: 'VS-2026-000112', customer: 'Rohit Agarwal', source: 'Vehicle Sale', invoiceDate: '2026-07-22', dueDate: '2026-08-06', amount: 149500000, received: 25000000, balance: 124500000, ageing: '0 – 30 days', paymentStatus: 'Partially Paid' },
        { id: '5', invoiceNo: 'INV-2026-004744', customer: 'Sunil Kulkarni', source: 'Workshop', invoiceDate: '2026-05-28', dueDate: '2026-06-27', amount: 2140000, received: 0, balance: 2140000, ageing: '61 – 90 days', paymentStatus: 'Overdue' },
        { id: '6', invoiceNo: 'CLM-2026-000317', customer: 'ICICI Lombard', source: 'Insurance', invoiceDate: '2026-07-19', dueDate: '2026-08-18', amount: 4980000, received: 0, balance: 4980000, ageing: '0 – 30 days', paymentStatus: 'Credit' },
      ],
    },
    {
      path: 'payables',
      title: 'Payables',
      description: 'Amounts owed to vendors',
      searchPlaceholder: 'Search vendor or bill number',
      filters: [],
      columns: [
        { key: 'billNo', title: 'Bill No', type: 'identifier', width: 175, fixed: 'left', locked: true },
        { key: 'vendor', title: 'Vendor', width: 210 },
        { key: 'billDate', title: 'Date', type: 'date', width: 130 },
        { key: 'dueDate', title: 'Due', type: 'date', width: 130 },
        { key: 'amount', title: 'Amount', type: 'money', width: 145 },
        { key: 'paid', title: 'Paid', type: 'money', width: 140 },
        { key: 'balance', title: 'Balance', type: 'money', width: 145 },
        { key: 'ageing', title: 'Ageing', width: 130 },
      ],
      rows: [
        { id: '1', billNo: 'BIL-BOS-11284', vendor: 'Bosch Auto Parts', billDate: '2026-07-24', dueDate: '2026-08-23', amount: 4812000, paid: 0, balance: 4812000, ageing: '0 – 30 days' },
        { id: '2', billNo: 'BIL-CAS-00912', vendor: 'Castrol Distributors', billDate: '2026-06-30', dueDate: '2026-07-30', amount: 2140000, paid: 500000, balance: 1640000, ageing: '31 – 60 days' },
        { id: '3', billNo: 'BIL-EXI-04471', vendor: 'Exide Batteries', billDate: '2026-07-18', dueDate: '2026-08-17', amount: 1248000, paid: 0, balance: 1248000, ageing: '0 – 30 days' },
        { id: '4', billNo: 'BIL-BRE-00238', vendor: 'Brembo India', billDate: '2026-05-11', dueDate: '2026-06-10', amount: 1980000, paid: 0, balance: 1980000, ageing: '61 – 90 days' },
        { id: '5', billNo: 'BIL-SDW-00114', vendor: 'Shree Denting Works', billDate: '2026-04-22', dueDate: '2026-05-22', amount: 808000, paid: 0, balance: 808000, ageing: 'Over 90 days' },
      ],
    },
  ],
}

export const hrmDemo: DemoModuleDef = {
  key: 'hr',
  label: 'HRM',
  path: '/hr',
  dashboard: {
    title: 'HRM',
    description: 'Workforce, attendance and payroll',
    kpis: [
      { key: 'employees', label: 'Employees', value: '34', delta: 2.9 },
      { key: 'present', label: 'Present Today', value: '28' },
      { key: 'leave', label: 'On Leave', value: '3', higherIsBetter: false },
      { key: 'payroll', label: 'Payroll (Jul)', value: L(9.84), delta: 1.6 },
      { key: 'efficiency', label: 'Technician Efficiency', value: '84%', delta: 4.2 },
    ],
    attention: [
      { key: 'absent', severity: 'critical', label: 'Unreported absences today', count: 3 },
      { key: 'leave', severity: 'warning', label: 'Leave requests pending approval', count: 5 },
      { key: 'payroll', severity: 'warning', label: 'Payroll approval due', count: 1 },
      { key: 'probation', severity: 'info', label: 'Probation reviews this month', count: 2 },
    ],
    widgets: [
      {
        key: 'attendance',
        title: 'Attendance Today',
        span: 16,
        rows: [
          { title: 'Rahul More', subtitle: 'Technician · In 09:02', tag: { label: 'Present', tone: 'success' } },
          { title: 'Ganesh Salunkhe', subtitle: 'Technician · In 09:14', tag: { label: 'Present', tone: 'success' } },
          { title: 'Imran Shaikh', subtitle: 'Technician · In 09:48', tag: { label: 'Late', tone: 'waiting' } },
          { title: 'Dattatray Pote', subtitle: 'Technician · Casual leave', tag: { label: 'On Leave', tone: 'neutral' } },
          { title: 'Ravi Yadav', subtitle: 'Technician · Not marked', tag: { label: 'Absent', tone: 'failure' } },
        ],
      },
      {
        key: 'headcount',
        title: 'Headcount by Department',
        span: 8,
        rows: [
          { title: 'Workshop', right: '18' },
          { title: 'Service Advisory', right: '5' },
          { title: 'Spares', right: '4' },
          { title: 'Accounts', right: '3' },
          { title: 'Administration', right: '4' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'employees',
      title: 'Employees',
      searchPlaceholder: 'Search name, code or designation',
      primaryActionLabel: 'Add Employee',
      filters: [
        { key: 'department', label: 'Department', type: 'select', width: 175,
          options: ['Workshop', 'Service Advisory', 'Spares', 'Accounts', 'Administration'].map((v) => ({ label: v, value: v })) },
      ],
      columns: [
        { key: 'code', title: 'Code', type: 'identifier', width: 120, fixed: 'left', locked: true },
        { key: 'name', title: 'Name', width: 185 },
        { key: 'designation', title: 'Designation', width: 165 },
        { key: 'department', title: 'Department', width: 165 },
        { key: 'joined', title: 'Joined', type: 'date', width: 130 },
        { key: 'mobile', title: 'Mobile', type: 'mobile', width: 155 },
        { key: 'salary', title: 'Monthly Salary', type: 'money', width: 155 },
        { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 115 },
      ],
      rows: [
        { id: '1', code: 'TECH-01', name: 'Rahul More', designation: 'Senior Technician', department: 'Workshop', joined: '2021-06-14', mobile: '9822014455', salary: 3200000, status: 'Active' },
        { id: '2', code: 'TECH-02', name: 'Ganesh Salunkhe', designation: 'Technician', department: 'Workshop', joined: '2022-02-01', mobile: '9822014466', salary: 2600000, status: 'Active' },
        { id: '3', code: 'TECH-03', name: 'Imran Shaikh', designation: 'AC Specialist', department: 'Workshop', joined: '2020-11-09', mobile: '9822014477', salary: 3400000, status: 'Active' },
        { id: '4', code: 'SA-01', name: 'Amit Patil', designation: 'Service Advisor', department: 'Service Advisory', joined: '2019-04-22', mobile: '9822014488', salary: 3800000, status: 'Active' },
        { id: '5', code: 'SA-02', name: 'Suresh Kale', designation: 'Service Advisor', department: 'Service Advisory', joined: '2023-01-16', mobile: '9822014499', salary: 3100000, status: 'Active' },
        { id: '6', code: 'SP-01', name: 'Kavita Rane', designation: 'Spares Incharge', department: 'Spares', joined: '2021-09-06', mobile: '9822014400', salary: 2900000, status: 'Active' },
        { id: '7', code: 'AC-01', name: 'Nitin Bhosale', designation: 'Accountant', department: 'Accounts', joined: '2018-07-30', mobile: '9822014411', salary: 4200000, status: 'Active' },
        { id: '8', code: 'TECH-04', name: 'Dattatray Pote', designation: 'Denting & Painting', department: 'Workshop', joined: '2024-03-11', mobile: '9822014422', salary: 2400000, status: 'Active' },
      ],
    },
  ],
}
