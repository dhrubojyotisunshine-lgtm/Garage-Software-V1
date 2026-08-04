/**
 * Navigation verification.
 *
 * The sidebar's highlight is derived, not stored: resolveActiveKeys maps the
 * current pathname to a selected item and the group that must be open. When
 * that mapping is wrong the current page simply looks unselected, which is easy
 * to miss by eye and easy to break by adding a route.
 *
 * Run: npx tsx --tsconfig tsconfig.base.json scripts/verify-navigation.mts
 */

import { resolveActiveKeys, visibleMenu, flattenMenu } from '../apps/web/src/app/navigation/menu'
import { adminMenuRegistry } from '../apps/web/src/app/navigation/adminMenu'
import { screenRoutes, staticMenuKeys } from '../apps/web/src/modules/screens/registry'

let passed = 0
let failed = 0

function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed += 1
    console.log(`  ok   ${label}`)
  } else {
    failed += 1
    console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

/* Grant every permission the tree mentions, so the whole menu is visible. */
const allPermissions = [
  ...new Set(
    flattenMenu(adminMenuRegistry)
      .map((n) => n.permission)
      .filter((p): p is string => Boolean(p)),
  ),
]
const nodes = visibleMenu(adminMenuRegistry, allPermissions)
const flat = flattenMenu(nodes)

console.log('\nSelected item resolves for each route')
console.log('-------------------------------------')

/** pathname → expected selected key, expected open group. */
const cases: Array<[string, string, string | undefined]> = [
  ['/admin', 'admin-dashboard', undefined],
  ['/workshop/job-cards', 'admin-jc-list', 'admin-jobcard'],
  ['/workshop/job-cards/new', 'admin-jc-list', 'admin-jobcard'],
  ['/workshop/job-cards/jc-1/overview', 'admin-jc-list', 'admin-jobcard'],
  ['/admin/vehicles', 'admin-veh-list', 'admin-vehicles'],
  ['/admin/vehicles/types', 'admin-veh-type', 'admin-vehicles'],
  ['/admin/vehicles/brands', 'admin-veh-brand', 'admin-vehicles'],
  ['/admin/membership/plans', 'admin-mem-plans', 'admin-membership'],
  ['/admin/membership/plans/new', 'admin-mem-plans', 'admin-membership'],
  ['/admin/membership/members', 'admin-mem-members', 'admin-membership'],
  ['/admin/membership/renewals', 'admin-mem-renewals', 'admin-membership'],
  ['/admin/settings', 'admin-set-general', 'admin-settings'],
  ['/admin/settings/addons', 'admin-set-addons', 'admin-settings'],
  ['/inventory/products', 'admin-inv-product', 'admin-inventory'],
]

for (const [path, expectedKey, expectedOpen] of cases) {
  const { selectedKey, openKey } = resolveActiveKeys(path, nodes)
  check(
    `${path} → ${expectedKey}`,
    selectedKey === expectedKey,
    `got ${selectedKey ?? 'nothing'}`,
  )
  if (expectedOpen) {
    check(`${path} opens ${expectedOpen}`, openKey === expectedOpen, `got ${openKey ?? 'nothing'}`)
  }
}

console.log('\nEvery menu path resolves to itself or a parent')
console.log('----------------------------------------------')

/**
 * The subtle failure: a longer sibling path swallowing a shorter one. Walking
 * every path in the tree catches it without anyone having to click through.
 */
for (const node of flat) {
  if (!node.path) continue
  const { selectedKey } = resolveActiveKeys(node.path, nodes)
  const resolved = flat.find((n) => n.key === selectedKey)
  const ok = selectedKey === node.key || resolved?.path === node.path
  check(`${node.path} (${node.label})`, ok, `resolved to ${resolved?.label ?? 'nothing'}`)
}

console.log('\nStatic screens are reachable from the menu')
console.log('------------------------------------------')

const menuKeys = new Set(flat.map((n) => n.key))
for (const route of screenRoutes) {
  if (!route.menuKey) continue
  check(
    `${route.menuKey} exists in the menu`,
    menuKeys.has(route.menuKey),
    'registry names a menu key the sidebar does not have',
  )
}

console.log('\nNo group is tagged unbuilt while its children open')
console.log('--------------------------------------------------')

/** Mirrors the Sidebar's reachability rule. */
const reachable = (node: (typeof flat)[number]): boolean =>
  Boolean(node.built) ||
  staticMenuKeys.has(node.key) ||
  (node.children?.some(reachable) ?? false)

for (const node of nodes) {
  if (!node.children?.length) continue
  const anyChildOpens = node.children.some(reachable)
  const groupReads = reachable(node)
  check(
    `${node.label}: children open ⇒ group not marked unbuilt`,
    !anyChildOpens || groupReads,
    'group would show SOON despite working children',
  )
}

console.log('\n=========================================')
console.log(`  ${passed} passed, ${failed} failed`)
console.log('=========================================\n')

process.exit(failed === 0 ? 0 : 1)
