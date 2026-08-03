import { useMemo } from 'react'
import { Badge, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { layout, palette } from '@garage/ui'
import { useAppStore, usePermissions } from '../context/appStore'
import { flattenMenu, menuRegistry, resolveActiveKeys, visibleMenu, type MenuNode } from '../navigation/menu'

const { Sider } = Layout

/**
 * Sidebar.
 *
 * 16 modules, two levels maximum, ever.
 * Ref: 02_NAVIGATION.md §10, §11
 */

/** Badges represent "someone must act", never a simple record count. §11 */
export interface BadgeCounts {
  overdueFollowUps?: number
  estimatesAwaiting?: number
  lowStock?: number
  pendingApprovals?: number
}

export function Sidebar({ badges = {} }: { badges?: BadgeCounts }) {
  const navigate = useNavigate()
  const location = useLocation()
  const collapsed = useAppStore((s) => s.sidebarCollapsed)
  const permissions = usePermissions()

  const nodes = useMemo(() => visibleMenu(menuRegistry, permissions), [permissions])

  const { selectedKey, openKey } = useMemo(
    () => resolveActiveKeys(location.pathname, nodes),
    [location.pathname, nodes],
  )

  const withBadge = (node: MenuNode, label: string) => {
    const count = node.badge ? badges[node.badge as keyof BadgeCounts] : undefined
    if (!count) return label
    return (
      <Badge
        count={count}
        size="small"
        offset={[8, 0]}
        style={{ boxShadow: 'none' }}
      >
        <span style={{ paddingRight: 4 }}>{label}</span>
      </Badge>
    )
  }

  const toItems = (list: MenuNode[]): MenuProps['items'] =>
    list.map((node) => {
      if (node.children?.length) {
        return {
          key: node.key,
          icon: node.icon,
          label: withBadge(node, node.label),
          children: node.children.map((child) => ({
            key: child.key,
            label: withBadge(child, child.label),
          })),
        }
      }
      return { key: node.key, icon: node.icon, label: withBadge(node, node.label) }
    })

  const operations = nodes.filter((n) => n.section !== 'system')
  const system = nodes.filter((n) => n.section === 'system')

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const target = flattenMenu(nodes).find((n) => n.key === key)
    if (target?.path) navigate(target.path)
  }

  return (
    <Sider
      theme="dark"
      collapsed={collapsed}
      width={layout.siderWidth}
      collapsedWidth={layout.siderCollapsedWidth}
      // Auto-collapses below 1280px. §11
      breakpoint="xl"
      style={{
        position: 'sticky',
        top: layout.headerHeight,
        height: `calc(100vh - ${layout.headerHeight}px)`,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        defaultOpenKeys={openKey && !collapsed ? [openKey] : []}
        onClick={handleClick}
        items={toItems(operations)}
        style={{ paddingTop: 8, borderInlineEnd: 'none' }}
      />

      {/* Divider: configuration, not daily operations. §10 */}
      <div
        style={{
          height: 1,
          background: palette.neutral[800],
          margin: '8px 16px',
        }}
      />

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        onClick={handleClick}
        items={toItems(system)}
        style={{ paddingBottom: 16, borderInlineEnd: 'none' }}
      />
    </Sider>
  )
}
