import {
  ApiOutlined,
  AppstoreOutlined,
  AuditOutlined,
  BankOutlined,
  BellOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  MailOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { MenuNode } from './menu'

/**
 * SUPER ADMIN navigation.
 *
 * A separate persona from the garage staff: the Super Admin runs the platform,
 * not a workshop. So this is its own menu tree rather than another module in
 * the operations sidebar.
 *
 * Shape follows 04_ALL_MODULES.md §68–75 (Administration) plus §98, which
 * requires the architecture to support a future TENANT → BRANCH → OPERATIONS
 * hierarchy without being blocked by today's single-company assumption.
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

  /* ------------------------------------------------------------- tenants */
  {
    key: 'admin-garages',
    label: 'Garages',
    icon: <ShopOutlined />,
    path: '/admin/garages',
    order: 20,
    section: 'operations',
    children: [
      { key: 'admin-garages-all', label: 'All Garages', path: '/admin/garages', order: 10 },
      { key: 'admin-branches', label: 'Branches', path: '/admin/branches', order: 20 },
      { key: 'admin-onboarding', label: 'Onboarding', path: '/admin/onboarding', order: 30 },
    ],
  },

  /* -------------------------------------------------------- subscription */
  {
    key: 'admin-subscriptions',
    label: 'Subscriptions',
    icon: <CreditCardOutlined />,
    path: '/admin/subscriptions',
    order: 30,
    section: 'operations',
    children: [
      { key: 'admin-subs-active', label: 'Active Plans', path: '/admin/subscriptions', order: 10 },
      { key: 'admin-plans', label: 'Plan Catalogue', path: '/admin/plans', order: 20 },
      { key: 'admin-invoices', label: 'Billing & Invoices', path: '/admin/billing', order: 30 },
      { key: 'admin-renewals', label: 'Renewals', path: '/admin/renewals', order: 40 },
    ],
  },

  /* ---------------------------------------------------------------- users */
  {
    key: 'admin-users',
    label: 'Users & Access',
    icon: <TeamOutlined />,
    path: '/admin/users',
    order: 40,
    section: 'operations',
    children: [
      { key: 'admin-users-all', label: 'Users', path: '/admin/users', order: 10 },
      { key: 'admin-roles', label: 'Roles & Permissions', path: '/admin/roles', order: 20 },
      { key: 'admin-login-history', label: 'Login History', path: '/admin/login-history', order: 30 },
    ],
  },

  /* -------------------------------------------------------------- support */
  {
    key: 'admin-support',
    label: 'Support',
    icon: <CustomerServiceOutlined />,
    path: '/admin/support',
    order: 50,
    section: 'operations',
    children: [
      { key: 'admin-tickets', label: 'Tickets', path: '/admin/support', order: 10 },
      { key: 'admin-appointments', label: 'Appointment Requests', path: '/admin/appointments', order: 20 },
    ],
  },

  /* -------------------------------------------------------------- reports */
  {
    key: 'admin-reports',
    label: 'Platform Reports',
    icon: <AppstoreOutlined />,
    path: '/admin/reports',
    order: 60,
    section: 'operations',
  },

  /* --------------------------------------------------- below the divider */
  {
    key: 'admin-settings',
    label: 'System Settings',
    icon: <SettingOutlined />,
    path: '/admin/settings',
    order: 100,
    section: 'system',
    children: [
      { key: 'admin-general', label: 'General', path: '/admin/settings', order: 10 },
      { key: 'admin-templates', label: 'Email & SMS Templates', path: '/admin/templates', order: 20 },
      { key: 'admin-integrations', label: 'Integrations', path: '/admin/integrations', order: 30 },
    ],
  },
  {
    key: 'admin-security',
    label: 'Security',
    icon: <SafetyOutlined />,
    path: '/admin/security',
    order: 110,
    section: 'system',
  },
  {
    key: 'admin-audit',
    label: 'Audit Logs',
    icon: <AuditOutlined />,
    path: '/admin/audit',
    order: 120,
    section: 'system',
  },
]

/** Icons kept for the screens that follow, so imports stay meaningful. */
export const adminIcons = {
  bank: <BankOutlined />,
  mail: <MailOutlined />,
  bell: <BellOutlined />,
  api: <ApiOutlined />,
  compliance: <FileProtectOutlined />,
}
