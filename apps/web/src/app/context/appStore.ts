import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Branch, CurrentUser } from '@garage/shared'
import { financialYearOf } from '@garage/shared'

/**
 * Application context: branch, financial year, sidebar state, current user.
 *
 * Branch and FY are USER CONTEXT, not URL state — they persist per user and
 * are not encoded in the URL. Ref: 02_NAVIGATION.md §13
 *
 * Deliberately small. Server data belongs in TanStack Query, not here.
 */

export const ALL_BRANCHES = '__all__'

export interface AppState {
  /** Selected branch id, or ALL_BRANCHES. */
  branchId: string
  financialYear: string
  sidebarCollapsed: boolean

  branches: Branch[]
  user: CurrentUser | null

  setBranch: (id: string) => void
  setFinancialYear: (fy: string) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  setBranches: (b: Branch[]) => void
  setUser: (u: CurrentUser | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      branchId: 'br-pune-main',
      financialYear: financialYearOf(),
      sidebarCollapsed: false,
      branches: [],
      user: null,

      setBranch: (branchId) => set({ branchId }),
      setFinancialYear: (financialYear) => set({ financialYear }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setBranches: (branches) => set({ branches }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'garage-erp-app',
      // Only context and UI preference persist. Never the user object.
      partialize: (s) => ({
        branchId: s.branchId,
        financialYear: s.financialYear,
        sidebarCollapsed: s.sidebarCollapsed,
      }),
    },
  ),
)

/** Convenience selectors. */
export const useCurrentBranch = () => {
  const { branchId, branches } = useAppStore()
  if (branchId === ALL_BRANCHES) return null
  return branches.find((b) => b.id === branchId) ?? null
}

export const usePermissions = () => useAppStore((s) => s.user?.permissions ?? [])

export const useHasPermission = (permission?: string) => {
  const permissions = usePermissions()
  if (!permission) return true
  return permissions.includes(permission)
}

/** Is the selected financial year the current one? Drives the header warning. §8 */
export const useIsCurrentFinancialYear = () => {
  const fy = useAppStore((s) => s.financialYear)
  return fy === financialYearOf()
}
