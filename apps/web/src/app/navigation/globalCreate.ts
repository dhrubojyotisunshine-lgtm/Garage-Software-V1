/**
 * Global Create registry — MVP scope.
 *
 * Only actions with a real destination are listed. Ref: 02_NAVIGATION.md §6
 */

export interface GlobalCreateItem {
  key: string
  label: string
  path: string
  permission?: string
}

export interface GlobalCreateGroup {
  key: string
  label: string
  items: GlobalCreateItem[]
}

export const GLOBAL_CREATE_GROUPS: GlobalCreateGroup[] = [
  {
    key: 'workshop',
    label: 'WORKSHOP',
    items: [
      {
        key: 'job-card',
        label: 'Job Card',
        path: '/workshop/job-cards/new',
        permission: 'workshop:job-card:create',
      },
    ],
  },
  {
    key: 'crm',
    label: 'CUSTOMERS',
    items: [
      {
        key: 'customer',
        label: 'Customer',
        path: '/crm/customers/new',
        permission: 'crm:customer:create',
      },
    ],
  },
]

/** Filters by permission — a user never sees what they cannot create. §6 */
export function visibleCreateGroups(permissions: string[]): GlobalCreateGroup[] {
  return GLOBAL_CREATE_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) => !i.permission || permissions.includes(i.permission)),
  })).filter((g) => g.items.length > 0)
}
