import { Tag, Tooltip } from 'antd'
import {
  ClockCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import type { StatusTone } from '@garage/shared'
import { colorsFor, effectiveTone } from '../theme/statusColors'
import type { StatusChipDef } from '../types'

/**
 * The single status renderer for the whole ERP.
 *
 * Colour comes from the tone, never from the caller.
 * Tones that require an icon get one automatically — status is never
 * communicated by colour alone.
 *
 * Ref: 01_ADMIN_THEME.md §6, 03_PAGE_TEMPLATES.md §9
 */

const toneIcon: Partial<Record<StatusTone, React.ReactNode>> = {
  action: <ExclamationCircleFilled />,
  failure: <CloseCircleFilled />,
  waiting: <ClockCircleFilled />,
}

export interface StatusChipProps extends StatusChipDef {
  size?: 'default' | 'small'
  /** Additional context shown on hover, e.g. "Overdue by 2 days". */
  tooltip?: string
}

export function StatusChip({ label, tone, overdue, icon, size = 'default', tooltip }: StatusChipProps) {
  const resolved = effectiveTone(tone, overdue)
  const colors = colorsFor(tone, overdue)
  const autoIcon = icon ?? (colors.requiresIcon ? toneIcon[resolved] : undefined)

  const chip = (
    <Tag
      icon={autoIcon}
      style={{
        color: colors.text,
        background: colors.bg,
        borderColor: colors.border,
        fontWeight: 500,
        fontSize: size === 'small' ? 11 : 12,
        lineHeight: size === 'small' ? '18px' : '20px',
        paddingInline: size === 'small' ? 6 : 8,
        marginInlineEnd: 0,
        borderRadius: 4,
      }}
    >
      {label}
    </Tag>
  )

  const hint = tooltip ?? (overdue ? 'Overdue' : undefined)
  return hint ? <Tooltip title={hint}>{chip}</Tooltip> : chip
}

/** Priority reuses the same visual language. */
export function PriorityChip({ priority }: { priority: string }) {
  const map: Record<string, StatusTone> = {
    Low: 'neutral',
    Normal: 'neutral',
    Medium: 'progress',
    High: 'action',
    Urgent: 'failure',
    Critical: 'failure',
  }
  return <StatusChip label={priority} tone={map[priority] ?? 'neutral'} size="small" />
}
