import { Button, Dropdown, Space, Tooltip } from 'antd'
import { DownOutlined, MoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ActionDef } from '../types'

/**
 * Action rendering.
 *
 * Maximum TWO visible buttons plus a More menu. Always.
 * Ref: 03_PAGE_TEMPLATES.md §6, Dashboard flow §4
 */

export function ActionButton({ action, block }: { action: ActionDef; block?: boolean }) {
  const btn = (
    <Button
      type={action.type ?? 'default'}
      icon={action.icon}
      danger={action.danger}
      disabled={action.disabled}
      loading={action.loading}
      onClick={action.onClick}
      href={action.href}
      block={block}
    >
      {action.label}
    </Button>
  )
  return action.disabled && action.disabledReason ? (
    <Tooltip title={action.disabledReason}>
      <span>{btn}</span>
    </Tooltip>
  ) : (
    btn
  )
}

function toMenuItems(actions: ActionDef[]): MenuProps['items'] {
  const items: MenuProps['items'] = []
  for (const a of actions) {
    if (a.dividerBefore) items.push({ type: 'divider' })
    items.push({
      key: a.key,
      label: a.disabled && a.disabledReason ? <Tooltip title={a.disabledReason}>{a.label}</Tooltip> : a.label,
      icon: a.icon,
      danger: a.danger,
      disabled: a.disabled,
      onClick: a.onClick,
    })
  }
  return items
}

export function MoreActions({
  actions,
  label = 'More',
  iconOnly = false,
}: {
  actions: ActionDef[]
  label?: string
  iconOnly?: boolean
}) {
  if (!actions.length) return null
  return (
    <Dropdown menu={{ items: toMenuItems(actions) }} trigger={['click']}>
      {iconOnly ? (
        <Button icon={<MoreOutlined />} aria-label={label} />
      ) : (
        <Button>
          <Space size={4}>
            {label}
            <DownOutlined style={{ fontSize: 10 }} />
          </Space>
        </Button>
      )}
    </Dropdown>
  )
}

/**
 * Standard action group: primary + secondary + More.
 * Enforces the two-button maximum structurally — anything beyond
 * `primary` and `secondary` is pushed into the More menu.
 */
export function ActionGroup({
  primary,
  secondary,
  more = [],
}: {
  primary?: ActionDef
  secondary?: ActionDef
  more?: ActionDef[]
}) {
  return (
    <Space size={8}>
      {secondary ? <ActionButton action={secondary} /> : null}
      {primary ? <ActionButton action={{ ...primary, type: primary.type ?? 'primary' }} /> : null}
      <MoreActions actions={more} />
    </Space>
  )
}

/** Row-level actions in a table: one primary link + More. §13 */
export function RowActions({ primary, more = [] }: { primary?: ActionDef; more?: ActionDef[] }) {
  return (
    <Space size={4} onClick={(e) => e.stopPropagation()}>
      {primary ? (
        <Button type="link" size="small" onClick={primary.onClick} href={primary.href}>
          {primary.label}
        </Button>
      ) : null}
      {more.length ? <MoreActions actions={more} iconOnly label="More actions" /> : null}
    </Space>
  )
}

/** Filters actions by the permissions a user holds. §16 of 02_NAVIGATION.md */
export function filterByPermission(actions: ActionDef[], permissions: string[]): ActionDef[] {
  return actions.filter((a) => !a.permission || permissions.includes(a.permission))
}
