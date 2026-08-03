import { counterSaleDemo, purchaseDemo, vehicleSalesDemo } from './definitions/sales'
import { financeDemo, hrmDemo, insuranceDemo, programsDemo } from './definitions/finance'
import {
  adminDemo,
  helpDemo,
  mastersDemo,
  reportsDemo,
  settingsDemo,
} from './definitions/admin'
import type { DemoModuleDef } from './types'

/**
 * The 12 mockup modules.
 *
 * Routes are generated from this list, so adding a demo module is one entry
 * here — never a new screen file.
 */
export const demoModules: DemoModuleDef[] = [
  vehicleSalesDemo,
  counterSaleDemo,
  purchaseDemo,
  insuranceDemo,
  programsDemo,
  financeDemo,
  hrmDemo,
  reportsDemo,
  mastersDemo,
  adminDemo,
  settingsDemo,
  helpDemo,
]

/** Menu keys backed by a demo screen, so the sidebar can tag them. */
export const demoModuleKeys = new Set(demoModules.map((m) => m.key))

export interface DemoRoute {
  path: string
  moduleKey: string
  screen?: string
  /** Set when a module has no dashboard — the base path redirects here. */
  redirectTo?: string
}

/** Every demo route, for the router to register. */
export function demoRoutes(): DemoRoute[] {
  const routes: DemoRoute[] = []
  for (const m of demoModules) {
    if (m.dashboard) {
      routes.push({ path: m.path, moduleKey: m.key })
    } else if (m.lists[0]) {
      // Config modules (Masters, Settings, Help) have no dashboard.
      routes.push({ path: m.path, moduleKey: m.key, redirectTo: `${m.path}/${m.lists[0].path}` })
    }
    for (const list of m.lists) {
      routes.push({ path: `${m.path}/${list.path}`, moduleKey: m.key, screen: list.path })
    }
  }
  return routes
}

/** Every path backed by a demo screen — used by the sidebar. */
export const demoPaths = new Set(demoRoutes().map((r) => r.path))

/** First reachable screen for a module — used when it has no dashboard. */
export function demoLandingPath(moduleKey: string): string | undefined {
  const m = demoModules.find((x) => x.key === moduleKey)
  if (!m) return undefined
  if (m.dashboard) return m.path
  return m.lists[0] ? `${m.path}/${m.lists[0].path}` : undefined
}
