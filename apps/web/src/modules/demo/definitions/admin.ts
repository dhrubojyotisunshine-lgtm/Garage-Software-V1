import { activeStatusMap } from '@garage/shared'
import type { DemoModuleDef } from '../types'

/**
 * Reports, Masters, Administration, Settings and Help Center mockups.
 *
 * Masters, Settings and Help have no operational dashboard by design — they
 * are configuration surfaces (04_ALL_MODULES.md §65, §76), so each is a single
 * list screen rather than a dashboard plus list.
 */

const L = (v: number) => `₹ ${v.toFixed(2)} L`

export const reportsDemo: DemoModuleDef = {
  key: 'reports',
  label: 'Reports & Analytics',
  path: '/reports',
  dashboard: {
    title: 'Reports & Analytics',
    description: 'Cross-module business intelligence',
    kpis: [
      { key: 'revenue', label: 'Revenue (MTD)', value: L(62.4), delta: 12.8 },
      { key: 'jobs', label: 'Jobs Completed', value: '184', delta: 6.2 },
      { key: 'ticket', label: 'Average Ticket', value: '₹ 3,391', delta: 4.4 },
      { key: 'retention', label: 'Customer Retention', value: '72%', delta: 2.1 },
      { key: 'margin', label: 'Gross Margin', value: '38.4%', delta: -1.2 },
    ],
    attention: [
      { key: 'rework', severity: 'warning', label: 'Rework rate above target', count: 6 },
      { key: 'dead', severity: 'warning', label: 'Dead stock lines', count: 14 },
      { key: 'scheduled', severity: 'info', label: 'Scheduled reports sent today', count: 3 },
    ],
    widgets: [
      {
        key: 'top',
        title: 'Top Revenue Sources',
        span: 12,
        rows: [
          { title: 'Workshop — Labour', right: '₹ 24.80 L' },
          { title: 'Workshop — Spares', right: '₹ 19.20 L' },
          { title: 'Vehicle Sales', right: '₹ 11.40 L' },
          { title: 'Counter Sale', right: '₹ 5.60 L' },
          { title: 'Insurance Claims', right: '₹ 1.40 L' },
        ],
      },
      {
        key: 'favourites',
        title: 'Frequently Run Reports',
        span: 12,
        rows: [
          { title: 'Daily Workshop Summary', subtitle: 'Run 128 times this month' },
          { title: 'Technician Performance', subtitle: 'Run 94 times' },
          { title: 'Parts Consumption', subtitle: 'Run 71 times' },
          { title: 'Receivables Ageing', subtitle: 'Run 64 times' },
          { title: 'GST Summary', subtitle: 'Run 12 times' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'center',
      title: 'Report Center',
      description: 'All reports, grouped by module',
      searchPlaceholder: 'Search report name',
      filters: [
        {
          key: 'category',
          label: 'Category',
          type: 'select',
          width: 175,
          options: ['Workshop', 'Inventory', 'Finance', 'CRM', 'HR'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'name', title: 'Report', width: 280, fixed: 'left', locked: true },
        { key: 'category', title: 'Category', width: 150 },
        { key: 'description', title: 'Description', ellipsis: true },
        { key: 'lastRun', title: 'Last Run', type: 'date', width: 130 },
        { key: 'runs', title: 'Runs (MTD)', type: 'number', width: 125 },
      ],
      rows: [
        { id: '1', name: 'Daily Workshop Summary', category: 'Workshop', description: 'Job cards opened, closed and delivered by day', lastRun: '2026-08-03', runs: 128 },
        { id: '2', name: 'Technician Performance', category: 'Workshop', description: 'Hours billed vs actual, efficiency and rework', lastRun: '2026-08-03', runs: 94 },
        { id: '3', name: 'Parts Consumption', category: 'Inventory', description: 'Parts issued to job cards by category', lastRun: '2026-08-02', runs: 71 },
        { id: '4', name: 'Stock Ageing', category: 'Inventory', description: 'Slow-moving and dead stock by days held', lastRun: '2026-08-01', runs: 22 },
        { id: '5', name: 'Receivables Ageing', category: 'Finance', description: 'Outstanding invoices bucketed by age', lastRun: '2026-08-03', runs: 64 },
        { id: '6', name: 'GST Summary', category: 'Finance', description: 'Output and input tax for the return period', lastRun: '2026-07-31', runs: 12 },
        { id: '7', name: 'Customer Retention', category: 'CRM', description: 'Repeat visit rate and lapsed customers', lastRun: '2026-08-02', runs: 18 },
        { id: '8', name: 'Attendance Register', category: 'HR', description: 'Daily attendance and overtime by employee', lastRun: '2026-08-03', runs: 26 },
      ],
    },
  ],
}

export const mastersDemo: DemoModuleDef = {
  key: 'masters',
  label: 'Masters',
  path: '/masters',
  lists: [
    {
      path: 'all',
      title: 'Master Center',
      description: 'Reference data defined once and reused across every module',
      searchPlaceholder: 'Search master type',
      filters: [
        {
          key: 'group',
          label: 'Group',
          type: 'select',
          width: 160,
          options: ['Vehicle', 'Workshop', 'Product', 'Finance', 'HR'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'master', title: 'Master', width: 220, fixed: 'left', locked: true },
        { key: 'group', title: 'Group', width: 150 },
        { key: 'entries', title: 'Entries', type: 'number', width: 110 },
        { key: 'usedBy', title: 'Used By', ellipsis: true },
        { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 115 },
      ],
      rows: [
        { id: '1', master: 'Manufacturer', group: 'Vehicle', entries: 18, usedBy: 'Vehicle, Vehicle Sales', status: 'Active' },
        { id: '2', master: 'Model', group: 'Vehicle', entries: 142, usedBy: 'Vehicle, Vehicle Sales', status: 'Active' },
        { id: '3', master: 'Fuel Type', group: 'Vehicle', entries: 5, usedBy: 'Vehicle', status: 'Active' },
        { id: '4', master: 'Service Type', group: 'Workshop', entries: 9, usedBy: 'Job Card', status: 'Active' },
        { id: '5', master: 'Labour Type', group: 'Workshop', entries: 34, usedBy: 'Job Card, Estimate', status: 'Active' },
        { id: '6', master: 'Bay', group: 'Workshop', entries: 8, usedBy: 'Job Card, Bay Board', status: 'Active' },
        { id: '7', master: 'Category', group: 'Product', entries: 12, usedBy: 'Product, Purchase', status: 'Active' },
        { id: '8', master: 'Brand', group: 'Product', entries: 27, usedBy: 'Product', status: 'Active' },
        { id: '9', master: 'HSN / SAC', group: 'Product', entries: 46, usedBy: 'Product, Invoice, GST', status: 'Active' },
        { id: '10', master: 'Payment Mode', group: 'Finance', entries: 6, usedBy: 'Payment, Counter Sale, Vehicle Sale', status: 'Active' },
        { id: '11', master: 'Tax Rate', group: 'Finance', entries: 5, usedBy: 'Product, Invoice', status: 'Active' },
        { id: '12', master: 'Expense Head', group: 'Finance', entries: 21, usedBy: 'Expenses', status: 'Active' },
        { id: '13', master: 'Department', group: 'HR', entries: 5, usedBy: 'Employee', status: 'Active' },
        { id: '14', master: 'Designation', group: 'HR', entries: 14, usedBy: 'Employee', status: 'Active' },
        { id: '15', master: 'Leave Type', group: 'HR', entries: 6, usedBy: 'Leave', status: 'Active' },
      ],
    },
  ],
}

export const adminDemo: DemoModuleDef = {
  key: 'admin',
  label: 'Administration',
  path: '/admin',
  dashboard: {
    title: 'Administration',
    description: 'Users, access control and audit',
    kpis: [
      { key: 'users', label: 'Active Users', value: '21' },
      { key: 'roles', label: 'Roles', value: '7' },
      { key: 'approvals', label: 'Pending Approvals', value: '4', higherIsBetter: false },
      { key: 'logins', label: 'Logins Today', value: '18' },
      { key: 'deleted', label: 'Recycle Bin', value: '12', higherIsBetter: false },
    ],
    attention: [
      { key: 'approvals', severity: 'critical', label: 'Approvals awaiting action', count: 4 },
      { key: 'failed', severity: 'warning', label: 'Failed login attempts today', count: 6 },
      { key: 'inactive', severity: 'info', label: 'Users inactive over 30 days', count: 3 },
    ],
    widgets: [
      {
        key: 'activity',
        title: 'Recent Activity',
        span: 16,
        rows: [
          { title: 'Amit Patil approved an estimate', subtitle: 'JC-2026-001284 · 5 min ago' },
          { title: 'Kavita Rane issued parts', subtitle: 'JC-2026-001281 · 22 min ago' },
          { title: 'Nitin Bhosale recorded a payment', subtitle: 'INV-2026-004821 · 1 hour ago' },
          { title: 'Suresh Kale created a job card', subtitle: 'JC-2026-001285 · 2 hours ago' },
          { title: 'Admin updated role permissions', subtitle: 'Service Advisor · 3 hours ago' },
        ],
      },
      {
        key: 'roles',
        title: 'Users by Role',
        span: 8,
        rows: [
          { title: 'Service Advisor', right: '5' },
          { title: 'Technician', right: '8' },
          { title: 'Spares', right: '3' },
          { title: 'Accounts', right: '2' },
          { title: 'Workshop Manager', right: '2' },
          { title: 'Administrator', right: '1' },
        ],
      },
    ],
  },
  lists: [
    {
      path: 'users',
      title: 'Users',
      searchPlaceholder: 'Search user name or email',
      primaryActionLabel: 'Add User',
      filters: [
        {
          key: 'role',
          label: 'Role',
          type: 'select',
          width: 180,
          options: ['Service Advisor', 'Technician', 'Spares', 'Accounts', 'Workshop Manager', 'Administrator'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'name', title: 'User', width: 180, fixed: 'left', locked: true },
        { key: 'email', title: 'Email', width: 250 },
        { key: 'role', title: 'Role', width: 175 },
        { key: 'branch', title: 'Branch', width: 165 },
        { key: 'lastLogin', title: 'Last Login', type: 'datetime', width: 190 },
        { key: 'status', title: 'Status', type: 'status', statusMap: activeStatusMap, width: 115 },
      ],
      rows: [
        { id: '1', name: 'Amit Patil', email: 'amit.patil@garage.example', role: 'Service Advisor', branch: 'Pune Main Branch', lastLogin: '2026-08-03T09:02:00Z', status: 'Active' },
        { id: '2', name: 'Suresh Kale', email: 'suresh.kale@garage.example', role: 'Service Advisor', branch: 'Pune Main Branch', lastLogin: '2026-08-03T08:48:00Z', status: 'Active' },
        { id: '3', name: 'Kavita Rane', email: 'kavita.rane@garage.example', role: 'Spares', branch: 'Pune Main Branch', lastLogin: '2026-08-03T09:20:00Z', status: 'Active' },
        { id: '4', name: 'Nitin Bhosale', email: 'nitin.bhosale@garage.example', role: 'Accounts', branch: 'Pune Main Branch', lastLogin: '2026-08-02T18:12:00Z', status: 'Active' },
        { id: '5', name: 'Nilesh Pawar', email: 'nilesh.pawar@garage.example', role: 'Workshop Manager', branch: 'Mumbai Andheri', lastLogin: '2026-08-03T10:05:00Z', status: 'Active' },
        { id: '6', name: 'Ravi Yadav', email: 'ravi.yadav@garage.example', role: 'Technician', branch: 'Pune Main Branch', lastLogin: '2026-06-28T17:40:00Z', status: 'Inactive' },
      ],
    },
  ],
}

export const settingsDemo: DemoModuleDef = {
  key: 'settings',
  label: 'Settings',
  path: '/settings',
  lists: [
    {
      path: 'all',
      title: 'Settings',
      description: 'Company-level configuration',
      searchPlaceholder: 'Search configuration',
      filters: [
        {
          key: 'category',
          label: 'Category',
          type: 'select',
          width: 175,
          options: ['General', 'Workshop', 'Finance', 'Notifications', 'Security'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'setting', title: 'Setting', width: 280, fixed: 'left', locked: true },
        { key: 'category', title: 'Category', width: 160 },
        { key: 'value', title: 'Current Value', width: 210 },
        { key: 'scope', title: 'Scope', width: 140 },
      ],
      rows: [
        { id: '1', setting: 'Company Name', category: 'General', value: 'Shree Auto Care Pvt. Ltd.', scope: 'Company' },
        { id: '2', setting: 'GSTIN', category: 'General', value: '27AABCS1429B1ZX', scope: 'Company' },
        { id: '3', setting: 'Financial Year Start', category: 'General', value: '1 April', scope: 'Company' },
        { id: '4', setting: 'Currency', category: 'General', value: 'Indian Rupee (₹)', scope: 'Company' },
        { id: '5', setting: 'Require estimate approval', category: 'Workshop', value: 'Enabled', scope: 'Company' },
        { id: '6', setting: 'Block delivery on balance', category: 'Workshop', value: 'Enabled', scope: 'Company' },
        { id: '7', setting: 'Job card number series', category: 'Workshop', value: 'JC-{YYYY}-{000000}', scope: 'Branch' },
        { id: '8', setting: 'Default GST rate', category: 'Finance', value: '18%', scope: 'Company' },
        { id: '9', setting: 'Invoice number series', category: 'Finance', value: 'INV-{YYYY}-{000000}', scope: 'Branch' },
        { id: '10', setting: 'Service due reminder', category: 'Notifications', value: 'SMS + WhatsApp, 7 days before', scope: 'Company' },
        { id: '11', setting: 'Estimate approval alert', category: 'Notifications', value: 'In-app + SMS', scope: 'Company' },
        { id: '12', setting: 'Session timeout', category: 'Security', value: '30 minutes', scope: 'Company' },
        { id: '13', setting: 'Password policy', category: 'Security', value: 'Minimum 8 characters, mixed case', scope: 'Company' },
      ],
    },
  ],
}

export const helpDemo: DemoModuleDef = {
  key: 'help',
  label: 'Help Center',
  path: '/help',
  lists: [
    {
      path: 'all',
      title: 'Help Center',
      description: 'Guides, FAQs and support',
      searchPlaceholder: 'Search help articles',
      filters: [
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          width: 160,
          options: ['Guide', 'FAQ', 'Video', 'Release Note'].map((v) => ({ label: v, value: v })),
        },
      ],
      columns: [
        { key: 'title', title: 'Article', width: 320, fixed: 'left', locked: true },
        { key: 'type', title: 'Type', width: 140 },
        { key: 'module', title: 'Module', width: 160 },
        { key: 'updated', title: 'Updated', type: 'date', width: 130 },
        { key: 'views', title: 'Views', type: 'number', width: 110 },
      ],
      rows: [
        { id: '1', title: 'Creating your first job card', type: 'Guide', module: 'Workshop', updated: '2026-07-30', views: 412 },
        { id: '2', title: 'Recording a customer estimate approval', type: 'Guide', module: 'Workshop', updated: '2026-07-28', views: 286 },
        { id: '3', title: 'Issuing parts and how stock is affected', type: 'Guide', module: 'Inventory', updated: '2026-07-26', views: 341 },
        { id: '4', title: 'Why is delivery blocked?', type: 'FAQ', module: 'Workshop', updated: '2026-07-22', views: 198 },
        { id: '5', title: 'Taking a part payment', type: 'Guide', module: 'Workshop', updated: '2026-07-19', views: 164 },
        { id: '6', title: 'Adding a new customer and vehicle', type: 'Video', module: 'Customers', updated: '2026-07-14', views: 233 },
        { id: '7', title: 'Keyboard shortcuts', type: 'Guide', module: 'General', updated: '2026-07-10', views: 129 },
        { id: '8', title: 'Release notes — v0.2', type: 'Release Note', module: 'General', updated: '2026-08-03', views: 47 },
      ],
    },
  ],
}
