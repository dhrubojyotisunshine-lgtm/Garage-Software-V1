/**
 * @garage/ui — design system, shared element library and page templates.
 *
 * A screen imports from here. It never imports a raw Ant Design component
 * that this package wraps, and it never hard-codes a colour or dimension.
 *
 * Ref: 01_ADMIN_THEME.md, 03_PAGE_TEMPLATES.md
 */

/* ------------------------------------------------------------------ theme */
export * from './theme/tokens'
export * from './theme/statusColors'
export { lightTheme, darkTheme, compactAlgorithm } from './theme/antdTheme'

/* ------------------------------------------------------------------ types */
export type * from './types'

/* ------------------------------------------------- shared element library */
export * from './components/StatusChip'
export * from './components/Value'
export * from './components/Actions'
export * from './components/PageHeader'
export * from './components/States'
export * from './components/DataTable'
export * from './components/FilterBar'
export * from './components/Kpi'
export * from './components/ProcessProgress'
export * from './components/Panels'

/* -------------------------------------------------------------- templates */
export * from './templates/T01Dashboard'
export * from './templates/T02ListPage'
export * from './templates/T03Workspace'
export * from './templates/T04DetailPage'
export * from './templates/T05Form'
export * from './templates/T06Board'
export * from './templates/T07Report'
export * from './templates/T08Settings'
export * from './templates/T09MasterCenter'
export * from './templates/T10Transaction'
export * from './templates/T11PrintPreview'
