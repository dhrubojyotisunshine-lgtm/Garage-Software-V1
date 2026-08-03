import {
  AppstoreOutlined,
  AuditOutlined,
  BankOutlined,
  BgColorsOutlined,
  BranchesOutlined,
  CarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FormOutlined,
  InboxOutlined,
  MailOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type { MenuNode } from './menu'

/**
 * ADMIN navigation.
 *
 * Transcribed from the reference product's admin sidebar, in its exact order.
 * This is the garage administrator's menu — not a multi-tenant console.
 *
 * `built: true` marks items backed by a working screen. The rest render
 * disabled, so the full shape is visible without any dead link.
 *
 * Logout is an action, not a destination, so it is rendered separately by the
 * sidebar rather than living in this tree.
 */
export const adminMenuRegistry: MenuNode[] = [
  {
    key: 'admin-dashboard',
    built: true,
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/admin',
    order: 10,
    section: 'operations',
  },

  {
    key: 'admin-inventory',
    built: true,
    label: 'Inventory',
    icon: <InboxOutlined />,
    path: '/inventory/products',
    order: 20,
    section: 'operations',
    children: [
      { key: 'admin-inv-suppliers', label: 'Suppliers', path: '/admin/inventory/suppliers', order: 10 },
      { key: 'admin-inv-product', built: true, label: 'Product', path: '/inventory/products', order: 20 },
      { key: 'admin-inv-purchase', label: 'Purchase', path: '/admin/inventory/purchase', order: 30 },
      { key: 'admin-inv-stock', built: true, label: 'Stock', path: '/inventory/ledger', order: 40 },
    ],
  },

  {
    key: 'admin-users',
    built: true,
    label: 'Users',
    icon: <TeamOutlined />,
    path: '/crm/customers',
    order: 30,
    section: 'operations',
    children: [
      { key: 'admin-users-customers', built: true, label: 'Customers', path: '/crm/customers', order: 10 },
      { key: 'admin-users-employees', label: 'Employees', path: '/admin/users/employees', order: 20 },
      { key: 'admin-users-support', label: 'Support Staffs', path: '/admin/users/support-staff', order: 30 },
      { key: 'admin-users-accountants', label: 'Accountants', path: '/admin/users/accountants', order: 40 },
      { key: 'admin-users-branch-admin', label: 'Branch Admin', path: '/admin/users/branch-admin', order: 50 },
    ],
  },

  {
    key: 'admin-vehicles',
    label: 'Vehicles',
    icon: <CarOutlined />,
    path: '/admin/vehicles',
    order: 40,
    section: 'operations',
    children: [
      { key: 'admin-veh-list', label: 'List Vehicle', path: '/admin/vehicles', order: 10 },
      { key: 'admin-veh-type', label: 'List Vehicle Type', path: '/admin/vehicles/types', order: 20 },
      { key: 'admin-veh-brand', label: 'List Vehicle Brand', path: '/admin/vehicles/brands', order: 30 },
      { key: 'admin-veh-model', label: 'List Vehicle Model', path: '/admin/vehicles/models', order: 40 },
      { key: 'admin-veh-colors', label: 'Colors', path: '/admin/vehicles/colors', order: 50, icon: <BgColorsOutlined /> },
    ],
  },

  {
    key: 'admin-services',
    label: 'Services',
    icon: <ToolOutlined />,
    path: '/admin/services',
    order: 50,
    section: 'operations',
  },

  {
    key: 'admin-quotation',
    label: 'Quotation',
    icon: <FileTextOutlined />,
    path: '/admin/quotation',
    order: 60,
    section: 'operations',
  },

  {
    key: 'admin-invoices',
    built: true,
    label: 'Invoices',
    icon: <FileDoneOutlined />,
    path: '/finance/receivables',
    order: 70,
    section: 'operations',
  },

  {
    key: 'admin-jobcard',
    built: true,
    label: 'Job Card',
    icon: <ProfileOutlined />,
    path: '/workshop/job-cards',
    order: 80,
    section: 'operations',
    children: [
      { key: 'admin-jc-list', built: true, label: 'Job Card', path: '/workshop/job-cards', order: 10 },
      { key: 'admin-jc-gatepass', label: 'Gate Pass', path: '/admin/job-card/gate-pass', order: 20 },
    ],
  },

  {
    key: 'admin-accounts',
    built: true,
    label: 'Accounts',
    icon: <BankOutlined />,
    path: '/finance',
    order: 90,
    section: 'operations',
    children: [
      { key: 'admin-acc-tax', label: 'List Tax Rates', path: '/admin/accounts/tax-rates', order: 10 },
      { key: 'admin-acc-payment', label: 'List Payment Method', path: '/admin/accounts/payment-methods', order: 20 },
      { key: 'admin-acc-income', built: true, label: 'Income', path: '/finance/transactions', order: 30 },
      { key: 'admin-acc-expenses', label: 'Expenses', path: '/admin/accounts/expenses', order: 40 },
    ],
  },

  {
    key: 'admin-partsells',
    label: 'Part Sells',
    icon: <ShoppingOutlined />,
    path: '/admin/part-sells',
    order: 100,
    section: 'operations',
  },
  {
    key: 'admin-compliances',
    label: 'Compliances',
    icon: <SafetyCertificateOutlined />,
    path: '/admin/compliances',
    order: 110,
    section: 'operations',
  },
  {
    key: 'admin-reports',
    label: 'Reports',
    icon: <AppstoreOutlined />,
    path: '/admin/reports',
    order: 120,
    section: 'operations',
  },
  {
    key: 'admin-email-templates',
    label: 'Email Templates',
    icon: <MailOutlined />,
    path: '/admin/email-templates',
    order: 130,
    section: 'operations',
  },
  {
    key: 'admin-custom-fields',
    label: 'Custom Fields',
    icon: <FormOutlined />,
    path: '/admin/custom-fields',
    order: 140,
    section: 'operations',
  },
  {
    key: 'admin-observation',
    label: 'Observation Library',
    icon: <ReadOutlined />,
    path: '/admin/observation-library',
    order: 150,
    section: 'operations',
  },
  {
    key: 'admin-notes',
    label: 'Notes',
    icon: <AuditOutlined />,
    path: '/admin/notes',
    order: 160,
    section: 'operations',
  },
  {
    key: 'admin-branch',
    label: 'Branch',
    icon: <BranchesOutlined />,
    path: '/admin/branch',
    order: 170,
    section: 'operations',
  },
  {
    key: 'admin-help',
    label: 'Help Document',
    icon: <QuestionCircleOutlined />,
    path: '/admin/help',
    order: 180,
    section: 'operations',
  },

  {
    key: 'admin-settings',
    label: 'Settings',
    icon: <SettingOutlined />,
    path: '/admin/settings',
    order: 190,
    section: 'operations',
    children: [
      { key: 'admin-set-general', label: 'General Settings', path: '/admin/settings', order: 10 },
      { key: 'admin-set-addons', label: 'Addons', path: '/admin/settings/addons', order: 20 },
      { key: 'admin-set-videos', label: 'How To Videos', path: '/admin/settings/videos', order: 30 },
    ],
  },
]
