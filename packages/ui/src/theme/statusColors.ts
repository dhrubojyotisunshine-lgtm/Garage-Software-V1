/**
 * Status tone → colour.
 *
 * This is the ONLY place a status colour is decided.
 * Ref: 01_ADMIN_THEME.md §6, 03_PAGE_TEMPLATES.md §9
 */

import type { StatusTone } from '@garage/shared'
import { palette } from './tokens'

export interface ToneColors {
  text: string
  bg: string
  border: string
  /** Nearest Ant Design Tag colour, for components that take a preset. */
  antTag: string
  /** Whether items with this tone must also carry an icon (§6). */
  requiresIcon: boolean
}

export const toneColors: Record<StatusTone, ToneColors> = {
  neutral: {
    text: palette.neutral[600],
    bg: palette.neutral[100],
    border: palette.neutral[300],
    antTag: 'default',
    requiresIcon: false,
  },
  progress: {
    text: palette.primary[700],
    bg: palette.primary[50],
    border: palette.primary[200],
    antTag: 'blue',
    requiresIcon: false,
  },
  waiting: {
    text: palette.warning[700],
    bg: palette.warning[50],
    border: palette.warning[100],
    antTag: 'gold',
    requiresIcon: false,
  },
  action: {
    // Amber and orange sit close together, so NEEDS ACTION always carries an
    // icon in addition to colour. §6
    text: palette.action[700],
    bg: palette.action[50],
    border: palette.action[100],
    antTag: 'orange',
    requiresIcon: true,
  },
  success: {
    text: palette.success[700],
    bg: palette.success[50],
    border: palette.success[100],
    antTag: 'green',
    requiresIcon: false,
  },
  failure: {
    text: palette.error[700],
    bg: palette.error[50],
    border: palette.error[100],
    antTag: 'red',
    requiresIcon: true,
  },
  closed: {
    text: palette.neutral[700],
    bg: palette.neutral[50],
    border: palette.neutral[200],
    antTag: 'default',
    requiresIcon: false,
  },
}

/**
 * Overdue overrides the base tone. An overdue in-progress job is red, not blue.
 * Ref: 01_ADMIN_THEME.md §6
 */
export function effectiveTone(tone: StatusTone, overdue?: boolean): StatusTone {
  return overdue ? 'failure' : tone
}

export function colorsFor(tone: StatusTone, overdue?: boolean): ToneColors {
  return toneColors[effectiveTone(tone, overdue)]
}

/** Severity colours for the attention strip. */
export const severityColors = {
  critical: { text: palette.error[700], bg: palette.error[50], border: palette.error[100] },
  warning: { text: palette.action[700], bg: palette.action[50], border: palette.action[100] },
  info: { text: palette.primary[700], bg: palette.primary[50], border: palette.primary[200] },
} as const
