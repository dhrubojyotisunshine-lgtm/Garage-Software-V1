import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { App as AntApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/en-in'

import { lightTheme } from '@garage/ui'
import '@garage/ui/theme/global.css'
import '@garage/ui/theme/print.css'

import { router } from './app/routes'
import { useAppStore } from './app/context/appStore'
import { seedBranches } from './store/seed'
import type { CurrentUser } from '@garage/shared'

/** Demo session. Replaced by the auth/session call in the backend phase. */
const demoUser: CurrentUser = {
  id: 'u-1',
  name: 'Amit Patil',
  email: 'amit.patil@garage.example',
  roleName: 'Service Advisor',
  employeeId: 'emp-1',
  branchIds: seedBranches.map((b) => b.id),
  permissions: [
    'workshop:view',
    'workshop:job-card:create',
    'workshop:job-card:approve',
    'crm:view',
    'crm:customer:create',
    'inventory:view',
    // View rights on the remaining modules so the full ERP shape is visible
    // in the sidebar. They render disabled until their screens exist.
    'vehicle-sales:view',
    'counter-sale:view',
    'purchase:view',
    'insurance:view',
    'programs:view',
    'finance:view',
    'hr:view',
    'reports:view',
    'masters:view',
    'admin:view',
    'settings:view',
  ],
}

dayjs.locale('en-in')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function Bootstrap() {
  const { setBranches, setUser } = useAppStore()

  useEffect(() => {
    setBranches(seedBranches)
    setUser(demoUser)
  }, [setBranches, setUser])

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={lightTheme}
      locale={enUS}
      componentSize="middle"
      form={{ requiredMark: true, scrollToFirstError: true }}
    >
      {/* AntApp provides the context message/notification/Modal.confirm need
          in order to respect the theme. Ref: 01_ADMIN_THEME.md §11 */}
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <Bootstrap />
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)
