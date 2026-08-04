/**
 * Static screen routes.
 *
 * Maps each generated screen definition to a path in our own URL scheme.
 * Screens already built for real (Suppliers, Product, Stock, Customers, Job
 * Card, Invoices, Income) are deliberately absent — their real routes win.
 */

export interface ScreenRoute {
  /** Key into screenDefs. */
  defKey: string
  path: string
  kind: 'list' | 'form'
  /** Singular noun for the "Add X" button. */
  singular?: string
  description?: string
  /** Where the add form returns to. */
  backPath?: string
  /** Add form for a list screen. */
  addPath?: string
  /** Sidebar key this screen satisfies, so the menu can mark it navigable. */
  menuKey?: string
}

export const screenRoutes: ScreenRoute[] = [
  /* ------------------------------------------------------------- people */
  { defKey: 'employee-list', path: '/admin/users/employees', kind: 'list', singular: 'Employee',
    description: 'Workshop and office staff', addPath: '/admin/users/employees/new', menuKey: 'admin-users-employees' },
  { defKey: 'employee-add', path: '/admin/users/employees/new', kind: 'form', backPath: '/admin/users/employees' },

  { defKey: 'supportstaff-list', path: '/admin/users/support-staff', kind: 'list', singular: 'Support Staff',
    description: 'Staff handling customer support', addPath: '/admin/users/support-staff/new', menuKey: 'admin-users-support' },
  { defKey: 'supportstaff-add', path: '/admin/users/support-staff/new', kind: 'form', backPath: '/admin/users/support-staff' },

  { defKey: 'accountant-list', path: '/admin/users/accountants', kind: 'list', singular: 'Accountant',
    description: 'Staff with accounts access', addPath: '/admin/users/accountants/new', menuKey: 'admin-users-accountants' },
  { defKey: 'accountant-add', path: '/admin/users/accountants/new', kind: 'form', backPath: '/admin/users/accountants' },

  { defKey: 'branchadmin-list', path: '/admin/users/branch-admin', kind: 'list', singular: 'Branch Admin',
    description: 'Administrators scoped to a branch', addPath: '/admin/users/branch-admin/new', menuKey: 'admin-users-branch-admin' },
  { defKey: 'branchadmin-add', path: '/admin/users/branch-admin/new', kind: 'form', backPath: '/admin/users/branch-admin' },

  /* ----------------------------------------------------------- vehicles */
  { defKey: 'vehicle-list', path: '/admin/vehicles', kind: 'list', singular: 'Vehicle',
    description: 'All vehicles on record', addPath: '/admin/vehicles/new', menuKey: 'admin-veh-list' },
  { defKey: 'vehicle-add', path: '/admin/vehicles/new', kind: 'form', backPath: '/admin/vehicles' },

  { defKey: 'vehicletype-list', path: '/admin/vehicles/types', kind: 'list', singular: 'Vehicle Type',
    description: 'Reference data used across vehicles', menuKey: 'admin-veh-type' },
  { defKey: 'vehiclebrand-list', path: '/admin/vehicles/brands', kind: 'list', singular: 'Vehicle Brand',
    description: 'Brands, grouped by vehicle type', menuKey: 'admin-veh-brand' },
  { defKey: 'vehiclemodel-list', path: '/admin/vehicles/models', kind: 'list', singular: 'Vehicle Model',
    description: 'Models, grouped by brand', menuKey: 'admin-veh-model' },
  { defKey: 'color-list', path: '/admin/vehicles/colors', kind: 'list', singular: 'Colour',
    description: 'Vehicle colours', menuKey: 'admin-veh-colors' },

  /* --------------------------------------------------------- operations */
  { defKey: 'service-list', path: '/admin/services', kind: 'list', singular: 'Service',
    description: 'Service records', addPath: '/admin/services/new', menuKey: 'admin-services' },
  { defKey: 'service-add', path: '/admin/services/new', kind: 'form', backPath: '/admin/services' },

  { defKey: 'gatepass-list', path: '/admin/job-card/gate-pass', kind: 'list', singular: 'Gate Pass',
    description: 'Vehicle release passes', addPath: '/admin/job-card/gate-pass/new', menuKey: 'admin-jc-gatepass' },
  { defKey: 'gatepass-add', path: '/admin/job-card/gate-pass/new', kind: 'form', backPath: '/admin/job-card/gate-pass' },

  /* ------------------------------------------------------------ purchase */
  { defKey: 'purchase-list', path: '/admin/inventory/purchase', kind: 'list', singular: 'Purchase',
    description: 'Goods bought from suppliers', addPath: '/admin/inventory/purchase/new', menuKey: 'admin-inv-purchase' },
  { defKey: 'purchase-add', path: '/admin/inventory/purchase/new', kind: 'form', backPath: '/admin/inventory/purchase' },

  /* ------------------------------------------------------------ accounts */
  { defKey: 'taxrates-list', path: '/admin/accounts/tax-rates', kind: 'list', singular: 'Tax Rate',
    description: 'Rates applied on invoices', menuKey: 'admin-acc-tax' },
  { defKey: 'payment-list', path: '/admin/accounts/payment-methods', kind: 'list', singular: 'Payment Method',
    description: 'How customers may pay', menuKey: 'admin-acc-payment' },
  { defKey: 'expense-list', path: '/admin/accounts/expenses', kind: 'list', singular: 'Expense',
    description: 'Money going out', addPath: '/admin/accounts/expenses/new', menuKey: 'admin-acc-expenses' },
  { defKey: 'expense-add', path: '/admin/accounts/expenses/new', kind: 'form', backPath: '/admin/accounts/expenses' },

  /* --------------------------------------------------------------- other */
  { defKey: 'partsells-list', path: '/admin/part-sells', kind: 'list', singular: 'Part Sell',
    description: 'Parts sold over the counter', menuKey: 'admin-partsells' },
  { defKey: 'compliances-list', path: '/admin/compliances', kind: 'list', singular: 'Compliance',
    description: 'RTO and regulatory records', menuKey: 'admin-compliances' },
  { defKey: 'reports-service', path: '/admin/reports', kind: 'list', singular: 'Report',
    description: 'Service reporting', menuKey: 'admin-reports' },
  { defKey: 'email-templates', path: '/admin/email-templates', kind: 'list', singular: 'Template',
    description: 'Messages sent to customers', menuKey: 'admin-email-templates' },
  { defKey: 'customfields-list', path: '/admin/custom-fields', kind: 'list', singular: 'Custom Field',
    description: 'Extra fields on records', menuKey: 'admin-custom-fields' },
  { defKey: 'observation-list', path: '/admin/observation-library', kind: 'list', singular: 'Observation',
    description: 'Reusable inspection observations', menuKey: 'admin-observation' },
  { defKey: 'notes-list', path: '/admin/notes', kind: 'list', singular: 'Note',
    description: 'Internal and shared notes', menuKey: 'admin-notes' },
  { defKey: 'branch-list', path: '/admin/branch', kind: 'list', singular: 'Branch',
    description: 'Locations this garage operates from', menuKey: 'admin-branch' },
  { defKey: 'helpdocument-list', path: '/admin/help', kind: 'list', singular: 'Document',
    description: 'Guides for staff', menuKey: 'admin-help' },

  /* ---------------------------------------------------------- membership */
  { defKey: 'membership-plan-list', path: '/admin/membership/plans', kind: 'list', singular: 'Plan',
    description: 'Service plans customers can subscribe to', addPath: '/admin/membership/plans/new',
    menuKey: 'admin-mem-plans' },
  { defKey: 'membership-plan-add', path: '/admin/membership/plans/new', kind: 'form',
    backPath: '/admin/membership/plans' },

  { defKey: 'membership-list', path: '/admin/membership/members', kind: 'list', singular: 'Member',
    description: 'Customers enrolled on a plan', addPath: '/admin/membership/members/new',
    menuKey: 'admin-mem-members' },
  { defKey: 'membership-add', path: '/admin/membership/members/new', kind: 'form',
    backPath: '/admin/membership/members' },

  { defKey: 'membership-renewal-list', path: '/admin/membership/renewals', kind: 'list',
    description: 'Memberships approaching expiry', menuKey: 'admin-mem-renewals' },

  /* ------------------------------------------------------------ settings */
  { defKey: 'settings-general', path: '/admin/settings', kind: 'form', singular: 'Setting',
    description: 'Company-wide configuration', backPath: '/admin', menuKey: 'admin-set-general' },
  { defKey: 'addons', path: '/admin/settings/addons', kind: 'list', singular: 'Addon',
    description: 'Optional modules', menuKey: 'admin-set-addons' },
  { defKey: 'how-to-videos', path: '/admin/settings/videos', kind: 'list', singular: 'Video',
    description: 'Training material', menuKey: 'admin-set-videos' },
]

/** Menu keys now backed by a static screen. */
export const staticMenuKeys = new Set(
  screenRoutes.map((r) => r.menuKey).filter((k): k is string => Boolean(k)),
)
