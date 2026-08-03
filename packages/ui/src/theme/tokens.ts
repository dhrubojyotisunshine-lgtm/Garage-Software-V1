/**
 * Design tokens — the single source of every colour and dimension in the ERP.
 *
 * Ref: 01_ADMIN_THEME.md §4, §5, §8, §9, §10
 *
 * RULE: no hex value may appear anywhere outside this directory.
 */

export const palette = {
  primary: {
    50: '#EFF5FF',
    100: '#D0E2FF',
    200: '#A6C8FF',
    300: '#78A9FF',
    400: '#4589FF',
    500: '#0F62FE',
    600: '#0353E9',
    700: '#0043CE',
    800: '#002D9C',
    900: '#001D6C',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  success: { 50: '#DEFBE6', 100: '#A7F0BA', 300: '#42BE65', 500: '#198038', 600: '#137333', 700: '#0E6027' },
  warning: { 50: '#FEF3C7', 100: '#FDE68A', 300: '#FBBF24', 500: '#B45309', 600: '#A14A08', 700: '#92400E' },
  error: { 50: '#FFF1F1', 100: '#FFD7D9', 300: '#FF8389', 500: '#DA1E28', 600: '#C21F26', 700: '#A2191F' },
  action: { 50: '#FFEDD5', 100: '#FED7AA', 300: '#FB923C', 500: '#C2410C', 600: '#AE3A0B', 700: '#9A3412' },
} as const

/** Layout dimensions. Ref: 01_ADMIN_THEME.md §8 */
/**
 * Sidebar brand colour. The reference product uses an orange rail; the content
 * area stays neutral so data remains the loudest thing on screen.
 */
export const brand = {
  /** Submenu panel background. */
  50: '#FFEFE6',
  100: '#FFE2CC',
  300: '#FFB877',
  /** Sidebar rail. */
  500: '#EA6B00',
  600: '#D45F00',
  700: '#B85200',
  900: '#7A390A',
  /** Active item: white pill, dark text. */
  activeBg: '#FFFFFF',
  activeText: '#454545',
  /** Submenu link text. */
  subText: '#5B5D6E',
} as const

export const layout = {
  headerHeight: 56,
  siderWidth: 240,
  siderCollapsedWidth: 64,
  pagePadding: 24,
  maxContentWidth: 1600,
  tableRowHeight: 40,
  drawerSm: 480,
  drawerMd: 640,
  drawerLg: 800,
  modalMaxWidth: 600,
} as const

/** Elevation — four levels only. §9 */
export const elevation = {
  level0: 'none',
  level1: '0 1px 2px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.10)',
  level2: '0 4px 6px -1px rgba(15,23,42,.08), 0 2px 4px -2px rgba(15,23,42,.06)',
  level3: '0 10px 15px -3px rgba(15,23,42,.10), 0 4px 6px -4px rgba(15,23,42,.08)',
} as const

/** Motion — nothing exceeds 300ms. §19 */
export const motion = {
  fast: '100ms',
  mid: '200ms',
  slow: '300ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export const fontFamily =
  "Inter, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Devanagari', Helvetica, Arial, sans-serif"

export const fontFamilyCode = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace"

/** Categorical chart palette — ordered, colourblind-considerate. §16 */
export const chartCategorical = [
  '#0F62FE',
  '#198038',
  '#B28600',
  '#6929C4',
  '#007D79',
  '#C2410C',
  '#9F1853',
  '#475569',
] as const

export const chartSequential = [
  '#EFF5FF',
  '#D0E2FF',
  '#A6C8FF',
  '#78A9FF',
  '#4589FF',
  '#0F62FE',
  '#0043CE',
] as const

export const chartDiverging = [
  '#A2191F',
  '#DA1E28',
  '#FF8389',
  '#F1F5F9',
  '#42BE65',
  '#198038',
  '#0E6027',
] as const
