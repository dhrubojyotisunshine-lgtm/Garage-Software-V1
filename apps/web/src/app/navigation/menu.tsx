import type { ReactNode } from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  BuildOutlined,
  CarOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DollarOutlined,
  InboxOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons'

/**
 * The menu is DATA, not JSX.
 *
 * One declarative registry drives the sidebar, breadcrumbs, route guards and
 * Global Create. Because it is data, menu configuration (show/hide, reorder,
 * role-wise and branch-wise visibility) becomes a filter and sort over this
 * registry — no component changes required.
 *
 * Ref: 02_NAVIGATION.md §10, §17
 */

export interface MenuNode {
  key: string
  label: string
  icon?: ReactNode
  path?: string
  permission?: string
  children?: MenuNode[]
  order: number
  /** Menu configuration: hidden without being deleted. */
  visible?: boolean
  /** Branch-wise visibility. Empty/undefined = all branches. */
  branchScope?: string[]
  /** Future licensing / subscription gating. */
  featureFlag?: string
  /** Placed below the divider — configuration, not daily operations. */
  section?: 'operations' | 'system'
  /** Badge source key; resolved at render time. */
  badge?: string
}

/**
 * MVP SCOPE
 *
 * The registry keeps all 16 modules so future expansion is a config change,
 * not a rewrite. Modules outside the Workshop MVP carry `visible: false` and
 * have no routes — they are architecture, not placeholder screens.
 *
 * To enable a module later: set `visible: true` and add its routes.
 */
export const menuRegistry: MenuNode[] = [
  {
    key: 'workshop',
    label: 'Workshop',
    icon: <ToolOutlined />,
    path: '/workshop',
    order: 10,
    section: 'operations',
    permission: 'workshop:view',
    children: [
      {
        key: 'workshop-dashboard',
        label: 'Dashboard',
        path: '/workshop',
        order: 5,
      },
      {
        key: 'workshop-job-cards',
        label: 'Job Cards',
        path: '/workshop/job-cards',
        order: 10,
        badge: 'estimatesAwaiting',
      },
      { key: 'workshop-queue', label: 'Vehicle Queue', path: '/workshop/queue', order: 20 },
      {
        key: 'workshop-technicians',
        label: 'Technician Board',
        path: '/workshop/technicians',
        order: 30,
      },
      // Not in the MVP slice.
      { key: 'workshop-calendar', label: 'Service Calendar', path: '/workshop/calendar', order: 40, visible: false },
      { key: 'workshop-bays', label: 'Bay Board', path: '/workshop/bays', order: 50, visible: false },
    ],
  },
  {
    key: 'crm',
    label: 'Customers',
    icon: <SolutionOutlined />,
    path: '/crm/customers',
    order: 20,
    section: 'operations',
    permission: 'crm:view',
    children: [
      { key: 'crm-customers', label: 'Customers', path: '/crm/customers', order: 10 },
      { key: 'crm-leads', label: 'Leads', path: '/crm/leads', order: 20, visible: false },
    ],
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: <InboxOutlined />,
    path: '/inventory/products',
    order: 30,
    section: 'operations',
    permission: 'inventory:view',
    children: [
      { key: 'inventory-products', label: 'Parts & Products', path: '/inventory/products', order: 10, badge: 'lowStock' },
      { key: 'inventory-stock', label: 'Stock', path: '/inventory/stock', order: 20, visible: false },
      { key: 'inventory-transfers', label: 'Stock Transfers', path: '/inventory/transfers', order: 30, visible: false },
    ],
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
    order: 5,
    section: 'operations',
    visible: false,
  },
  {
    key: 'vehicle-sales',
    visible: false,
    label: 'Vehicle Sales',
    icon: <CarOutlined />,
    path: '/vehicle-sales',
    order: 50,
    section: 'operations',
    permission: 'vehicle-sales:view',
    children: [
      { key: 'vs-stock', label: 'Vehicle Stock', path: '/vehicle-sales/stock', order: 10 },
      { key: 'vs-sales', label: 'Sales', path: '/vehicle-sales/sales', order: 20 },
    ],
  },
  {
    key: 'counter-sale',
    visible: false,
    label: 'Counter Sale',
    icon: <ShoppingCartOutlined />,
    path: '/counter-sale',
    order: 60,
    section: 'operations',
    permission: 'counter-sale:view',
    children: [
      { key: 'cs-new', label: 'New Sale (POS)', path: '/counter-sale/new', order: 10 },
      { key: 'cs-history', label: 'Sales History', path: '/counter-sale/history', order: 20 },
    ],
  },
  {
    key: 'purchase',
    visible: false,
    label: 'Purchase & Vendor',
    icon: <ShopOutlined />,
    path: '/purchase',
    order: 70,
    section: 'operations',
    permission: 'purchase:view',
    children: [
      { key: 'purchase-orders', label: 'Purchase Orders', path: '/purchase/orders', order: 10 },
      { key: 'purchase-vendors', label: 'Vendors', path: '/purchase/vendors', order: 20 },
    ],
  },
  {
    key: 'insurance',
    visible: false,
    label: 'Insurance',
    icon: <SafetyCertificateOutlined />,
    path: '/insurance',
    order: 80,
    section: 'operations',
    permission: 'insurance:view',
    children: [
      { key: 'ins-policies', label: 'Policies', path: '/insurance/policies', order: 10 },
      { key: 'ins-claims', label: 'Claims', path: '/insurance/claims', order: 20 },
      { key: 'ins-warranty', label: 'Warranty', path: '/insurance/warranty', order: 30 },
    ],
  },
  {
    key: 'programs',
    visible: false,
    label: 'Customer Programs',
    icon: <AppstoreOutlined />,
    path: '/programs',
    order: 90,
    section: 'operations',
    permission: 'programs:view',
    children: [
      { key: 'prog-membership', label: 'Membership', path: '/programs/membership', order: 10 },
      { key: 'prog-loyalty', label: 'Loyalty', path: '/programs/loyalty', order: 20 },
      { key: 'prog-amc', label: 'AMC', path: '/programs/amc', order: 30 },
      { key: 'prog-wallet', label: 'Wallet', path: '/programs/wallet', order: 40 },
    ],
  },
  {
    // Seven children — the most of any module. These are genuinely distinct
    // financial functions, not process steps of one document. 02_NAVIGATION §10
    key: 'finance',
    visible: false,
    label: 'Finance & Accounts',
    icon: <DollarOutlined />,
    path: '/finance',
    order: 100,
    section: 'operations',
    permission: 'finance:view',
    children: [
      { key: 'fin-receivables', label: 'Receivables', path: '/finance/receivables', order: 10 },
      { key: 'fin-payables', label: 'Payables', path: '/finance/payables', order: 20 },
      { key: 'fin-transactions', label: 'Transactions', path: '/finance/transactions', order: 30 },
      { key: 'fin-expenses', label: 'Expenses', path: '/finance/expenses', order: 40 },
      { key: 'fin-accounts', label: 'Accounts & Ledgers', path: '/finance/accounts', order: 50 },
      { key: 'fin-gst', label: 'Tax / GST', path: '/finance/gst', order: 60 },
      { key: 'fin-statements', label: 'Statements', path: '/finance/statements', order: 70 },
    ],
  },
  {
    key: 'hr',
    visible: false,
    label: 'HRM',
    icon: <TeamOutlined />,
    path: '/hr',
    order: 110,
    section: 'operations',
    permission: 'hr:view',
    children: [
      { key: 'hr-employees', label: 'Employees', path: '/hr/employees', order: 10 },
      { key: 'hr-attendance', label: 'Attendance', path: '/hr/attendance', order: 20 },
      { key: 'hr-leave', label: 'Leave', path: '/hr/leave', order: 30 },
      { key: 'hr-payroll', label: 'Payroll', path: '/hr/payroll', order: 40 },
      { key: 'hr-performance', label: 'Performance', path: '/hr/performance', order: 50 },
    ],
  },
  {
    key: 'reports',
    visible: false,
    label: 'Reports & Analytics',
    icon: <BarChartOutlined />,
    path: '/reports',
    order: 120,
    section: 'operations',
    permission: 'reports:view',
  },

  /* ---------------- below the divider: configuration, not operations ------- */
  {
    key: 'masters',
    visible: false,
    label: 'Masters',
    icon: <DatabaseOutlined />,
    path: '/masters',
    order: 200,
    section: 'system',
    permission: 'masters:view',
  },
  {
    key: 'admin',
    visible: false,
    label: 'Administration',
    icon: <BuildOutlined />,
    path: '/admin',
    order: 210,
    section: 'system',
    permission: 'admin:view',
    badge: 'pendingApprovals',
  },
  {
    key: 'settings',
    visible: false,
    label: 'Settings',
    icon: <SettingOutlined />,
    path: '/settings',
    order: 220,
    section: 'system',
    permission: 'settings:view',
  },
  {
    key: 'help',
    visible: false,
    label: 'Help Center',
    icon: <QuestionCircleOutlined />,
    path: '/help',
    order: 230,
    section: 'system',
  },
]

/* ------------------------------------------------------------------ helpers */

/**
 * Permission-aware filtering.
 * A module with no viewable children is hidden entirely. §16
 *
 * NOTE: hiding is a UX convenience, NOT a security control. Every route
 * enforces its permission separately, and the backend will enforce it again.
 */
export function visibleMenu(nodes: MenuNode[], permissions: string[]): MenuNode[] {
  const allowed = (n: MenuNode) => !n.permission || permissions.includes(n.permission)

  return nodes
    .filter((n) => n.visible !== false)
    .filter(allowed)
    .map((n) => {
      if (!n.children) return n
      const children = n.children.filter((c) => c.visible !== false).filter(allowed)
      return { ...n, children }
    })
    .filter((n) => !n.children || n.children.length > 0 || Boolean(n.path))
    .sort((a, b) => a.order - b.order)
}

/** Flattened list of every navigable node, used for breadcrumbs and lookup. */
export function flattenMenu(nodes: MenuNode[]): MenuNode[] {
  return nodes.flatMap((n) => [n, ...(n.children ?? [])])
}

/**
 * Resolves a deep route to its nearest menu ancestor.
 * /workshop/job-cards/JC-001248/estimate → workshop → workshop-job-cards
 * Ref: 02_NAVIGATION.md §11
 */
export function resolveActiveKeys(pathname: string, nodes: MenuNode[]): {
  selectedKey?: string
  openKey?: string
} {
  let selected: MenuNode | undefined
  let parent: MenuNode | undefined

  for (const node of nodes) {
    for (const child of node.children ?? []) {
      if (child.path && pathname.startsWith(child.path)) {
        if (!selected || (child.path.length > (selected.path?.length ?? 0))) {
          selected = child
          parent = node
        }
      }
    }
    if (node.path && pathname.startsWith(node.path)) {
      if (!selected) {
        selected = node
        parent = node.children?.length ? node : undefined
      }
    }
  }

  return { selectedKey: selected?.key, openKey: parent?.key }
}

/** Breadcrumb trail for a pathname. Maximum four levels. §14 */
export function breadcrumbTrail(
  pathname: string,
  nodes: MenuNode[],
): Array<{ label: string; path?: string }> {
  const { selectedKey, openKey } = resolveActiveKeys(pathname, nodes)
  const flat = flattenMenu(nodes)
  const parent = flat.find((n) => n.key === openKey)
  const selected = flat.find((n) => n.key === selectedKey)

  const trail: Array<{ label: string; path?: string }> = []
  if (parent && parent.key !== selected?.key) trail.push({ label: parent.label, path: parent.path })
  if (selected) trail.push({ label: selected.label, path: selected.path })
  return trail.slice(0, 4)
}
