import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../shell/AppShell'
import { ForbiddenPage, NotFoundPage } from '@/pages/SystemPages'
import { demoRoutes } from '@/modules/demo/registry'

/**
 * Route map — Workshop MVP slice.
 *
 * Only routes backed by a real screen are declared. Modules outside the MVP
 * remain in the menu registry (marked not visible) so expansion is a config
 * change, but they do not resolve to placeholder screens.
 *
 * Route-level code splitting via React.lazy. Ref: 02_NAVIGATION.md §12, §19
 */

/* Workshop */
const WorkshopDashboard = lazy(() => import('@/modules/workshop/pages/WorkshopDashboard'))
const JobCardList = lazy(() => import('@/modules/workshop/pages/JobCardList'))
const JobCardCreate = lazy(() => import('@/modules/workshop/pages/JobCardCreate'))
const JobCardWorkspace = lazy(() => import('@/modules/workshop/pages/JobCardWorkspace'))
const VehicleQueue = lazy(() => import('@/modules/workshop/pages/VehicleQueue'))
const PrintDocument = lazy(() => import('@/modules/workshop/pages/PrintDocument'))

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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/workshop" replace /> },
      { path: 'dashboard', element: <Navigate to="/workshop" replace /> },

      /* -------------------------------------------------------- WORKSHOP */
      { path: 'workshop', element: <WorkshopDashboard /> },
      { path: 'workshop/job-cards', element: <JobCardList /> },
      { path: 'workshop/job-cards/new', element: <JobCardCreate /> },
      { path: 'workshop/job-cards/:id', element: <Navigate to="overview" replace /> },
      { path: 'workshop/job-cards/:id/:tab', element: <JobCardWorkspace /> },
      { path: 'workshop/queue', element: <VehicleQueue /> },
      { path: 'workshop/technicians', element: <VehicleQueue /> },

      /* ------------------------------------------------------------- CRM */
      { path: 'crm/customers', element: <CustomerList /> },
      { path: 'crm/customers/new', element: <CustomerCreate /> },
      { path: 'crm/customers/:id/edit', element: <CustomerCreate /> },
      { path: 'crm/customers/:id', element: <Navigate to="overview" replace /> },
      { path: 'crm/customers/:id/:tab', element: <CustomerDetail /> },

      /* ------------------------------------------------------- INVENTORY */
      { path: 'inventory', element: <Navigate to="/inventory/products" replace /> },
      { path: 'inventory/products', element: <ProductList /> },
      { path: 'inventory/products/new', element: <ProductForm /> },
      { path: 'inventory/products/:id/edit', element: <ProductForm /> },
      { path: 'inventory/products/:id', element: <Navigate to="overview" replace /> },
      { path: 'inventory/products/:id/:tab', element: <ProductDetail /> },

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
