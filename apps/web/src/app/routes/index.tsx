import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../shell/AppShell'
import { ForbiddenPage, NotFoundPage } from '@/pages/SystemPages'
import { demoRoutes } from '@/modules/demo/registry'
import { screenRoutes } from '@/modules/screens/registry'

/**
 * Route map.
 *
 * One application, one navigation tree. Landing goes to the admin dashboard.
 * Route-level code splitting via React.lazy. Ref: 02_NAVIGATION.md §12, §19
 */

/* Workshop */
const WorkshopDashboard = lazy(() => import('@/modules/workshop/pages/WorkshopDashboard'))
const JobCardList = lazy(() => import('@/modules/workshop/pages/JobCardList'))
const JobCardCreate = lazy(() => import('@/modules/workshop/pages/JobCardCreate'))
const JobCardWorkspace = lazy(() => import('@/modules/workshop/pages/JobCardWorkspace'))
const JobCardFormPage = lazy(() => import('@/modules/workshop/pages/JobCardFormPage'))
const VehicleQueue = lazy(() => import('@/modules/workshop/pages/VehicleQueue'))
const PrintDocument = lazy(() => import('@/modules/workshop/pages/PrintDocument'))

/* People — employees, support staff, accountants, branch admins */
const PersonList = lazy(() => import('@/modules/people/pages/PersonList'))
const PersonForm = lazy(() => import('@/modules/people/pages/PersonForm'))

/* Quotation — what is offered before a job card exists */
const QuotationList = lazy(() => import('@/modules/quotation/pages/QuotationList'))
const QuotationCreate = lazy(() => import('@/modules/quotation/pages/QuotationCreate'))
const QuotationDetail = lazy(() => import('@/modules/quotation/pages/QuotationDetail'))

/* CRM — the customer and vehicle records Workshop depends on */
const CustomerList = lazy(() => import('@/modules/crm/pages/CustomerList'))
const CustomerCreate = lazy(() => import('@/modules/crm/pages/CustomerCreate'))
const CustomerDetail = lazy(() => import('@/modules/crm/pages/CustomerDetail'))

/* Demo mockups for the 12 modules that are not yet built */
const DemoModuleIndex = lazy(() =>
  import('@/modules/demo/DemoScreens').then((m) => ({ default: m.DemoModuleIndex })),
)
const DemoList = lazy(() =>
  import('@/modules/demo/DemoScreens').then((m) => ({ default: m.DemoList })),
)

/* Inventory */
const ProductList = lazy(() => import('@/modules/inventory/pages/ProductList'))
const ProductForm = lazy(() => import('@/modules/inventory/pages/ProductForm'))
const ProductDetail = lazy(() => import('@/modules/inventory/pages/ProductDetail'))
const InventoryDashboard = lazy(() => import('@/modules/inventory/pages/InventoryDashboard'))
const StockLedger = lazy(() => import('@/modules/inventory/pages/StockLedger'))
const SupplierList = lazy(() => import('@/modules/inventory/pages/SupplierList'))
const SupplierForm = lazy(() => import('@/modules/inventory/pages/SupplierForm'))

/* Finance — receivables and collection, derived from job cards */
const FinanceDashboard = lazy(() => import('@/modules/finance/pages/FinanceDashboard'))
const Receivables = lazy(() => import('@/modules/finance/pages/Receivables'))
const Transactions = lazy(() => import('@/modules/finance/pages/Transactions'))

/* Admin — the garage administrator's dashboard */
const AdminDashboard = lazy(() => import('@/modules/admin/pages/AdminDashboard'))
const UserGuide = lazy(() => import('@/modules/admin/pages/UserGuide'))

/* Static screens generated from the reference structure */
const StaticListPage = lazy(() =>
  import('@/modules/screens/ScreenPages').then((m) => ({ default: m.StaticListPage })),
)
const StaticFormPage = lazy(() =>
  import('@/modules/screens/ScreenPages').then((m) => ({ default: m.StaticFormPage })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/admin" replace /> },
      { path: 'dashboard', element: <Navigate to="/admin" replace /> },

      /* The module & flow guide, embedded from public/user-guide.html. */
      { path: 'guide', element: <UserGuide /> },

      /* -------------------------------------------------------- WORKSHOP */
      { path: 'workshop', element: <WorkshopDashboard /> },
      { path: 'workshop/job-cards', element: <JobCardList /> },
      { path: 'workshop/job-cards/new', element: <JobCardCreate /> },
      { path: 'workshop/job-cards/:id', element: <Navigate to="overview" replace /> },
      /* The full capture form. Declared before :tab so it is not swallowed by it. */
      { path: 'workshop/job-cards/:id/form', element: <JobCardFormPage /> },
      { path: 'workshop/job-cards/:id/:tab', element: <JobCardWorkspace /> },
      { path: 'workshop/queue', element: <VehicleQueue /> },
      { path: 'workshop/technicians', element: <VehicleQueue /> },

      /* ---------------------------------------------------------- PEOPLE */
      /* One list and one form serve all four roles; the slug carries which. */
      ...['employees', 'support-staff', 'accountants', 'branch-admin'].flatMap((slug) => [
        { path: `admin/users/${slug}`, element: <PersonList /> },
        { path: `admin/users/${slug}/new`, element: <PersonForm /> },
        { path: `admin/users/${slug}/:id/edit`, element: <PersonForm /> },
      ]),

      /* ------------------------------------------------------- QUOTATION */
      { path: 'quotation', element: <QuotationList /> },
      { path: 'quotation/new', element: <QuotationCreate /> },
      { path: 'quotation/:id', element: <QuotationDetail /> },

      /* ------------------------------------------------------------- CRM */
      { path: 'crm/customers', element: <CustomerList /> },
      { path: 'crm/customers/new', element: <CustomerCreate /> },
      { path: 'crm/customers/:id/edit', element: <CustomerCreate /> },
      { path: 'crm/customers/:id', element: <Navigate to="overview" replace /> },
      { path: 'crm/customers/:id/:tab', element: <CustomerDetail /> },

      /* ------------------------------------------------------- INVENTORY */
      { path: 'inventory', element: <InventoryDashboard /> },
      { path: 'inventory/ledger', element: <StockLedger /> },
      { path: 'inventory/suppliers', element: <SupplierList /> },
      { path: 'inventory/suppliers/new', element: <SupplierForm /> },
      { path: 'inventory/suppliers/:id/edit', element: <SupplierForm /> },
      { path: 'inventory/products', element: <ProductList /> },
      { path: 'inventory/products/new', element: <ProductForm /> },
      { path: 'inventory/products/:id/edit', element: <ProductForm /> },
      { path: 'inventory/products/:id', element: <Navigate to="overview" replace /> },
      { path: 'inventory/products/:id/:tab', element: <ProductDetail /> },

      /* --------------------------------------------------------- FINANCE */
      { path: 'finance', element: <FinanceDashboard /> },
      { path: 'finance/receivables', element: <Receivables /> },
      { path: 'finance/transactions', element: <Transactions /> },

      /* ----------------------------------------------------------- ADMIN */
      { path: 'admin', element: <AdminDashboard /> },

      /* Layout-only screens; structure is real, data is not wired yet. */
      ...screenRoutes.map((r) => ({
        path: r.path.replace(/^\//, ''),
        element: r.kind === 'form' ? <StaticFormPage /> : <StaticListPage />,
      })),

      /* ------------------------------------------------------------ DEMO */
      /* Generated from the demo registry — every path is a mockup and says so. */
      ...demoRoutes().map((r) => ({
        // Router children take paths without the leading slash.
        path: r.path.replace(/^\//, ''),
        element: r.redirectTo ? (
          <Navigate to={r.redirectTo} replace />
        ) : r.screen ? (
          <DemoList />
        ) : (
          <DemoModuleIndex />
        ),
      })),

      /* ---------------------------------------------------------- SYSTEM */
      { path: '403', element: <ForbiddenPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  /* Full-screen, outside the shell chrome. Ref: 02_NAVIGATION.md §3 */
  { path: '/print/:document/:id', element: <PrintDocument /> },
])
