import { useMemo } from 'react'
import { Badge, Layout, Menu, Tag, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { layout, palette } from '@garage/ui'
import { useAppStore, usePermissions } from '../context/appStore'
import {
  flattenMenu,
  isBuilt,
  menuRegistry,
  resolveActiveKeys,
  visibleMenu,
  type MenuNode,
} from '../navigation/menu'
import { demoLandingPath, demoModuleKeys, demoPaths } from '@/modules/demo/registry'

/** Menu keys that resolve to a mockup rather than working software. */
const isDemo = (node: MenuNode) =>
  !isBuilt(node) && (demoModuleKeys.has(node.key) || (!!node.path && demoPaths.has(node.path)))

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

  /**
   * Unbuilt items are shown but not navigable, so the full product shape is
   * visible without any link leading to a dead route.
   */
  const renderLabel = (node: MenuNode) => {
    const count = node.badge ? badges[node.badge as keyof BadgeCounts] : undefined

    if (!isBuilt(node)) {
      const demo = isDemo(node)
      return (
        <Tooltip
          title={demo ? 'Demo screens — illustrative only' : 'Not built yet'}
          placement="right"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {node.label}
            <Tag
              style={{
                marginInlineEnd: 0,
                fontSize: 9,
                lineHeight: '14px',
                padding: '0 4px',
                background: 'transparent',
                borderColor: demo ? palette.warning[500] : palette.neutral[600],
                color: demo ? palette.warning[300] : palette.neutral[400],
              }}
            >
              {demo ? 'DEMO' : 'SOON'}
            </Tag>
          </span>
        </Tooltip>
      )
    }

    if (!count) return node.label
    return (
      <Badge count={count} size="small" offset={[8, 0]} style={{ boxShadow: 'none' }}>
        <span style={{ paddingRight: 4 }}>{node.label}</span>
      </Badge>
    )
  }

  const toItems = (list: MenuNode[]): MenuProps['items'] =>
    list.map((node) => {
      if (node.children?.length) {
        return {
          key: node.key,
          icon: node.icon,
          label: renderLabel(node),
          // A parent is disabled only when none of its children are built.
          disabled: !isBuilt(node) && !isDemo(node) && !node.children.some((c) => isBuilt(c) || isDemo(c)),
          children: node.children.map((child) => ({
            key: child.key,
            label: renderLabel(child),
            disabled: !isBuilt(child) && !isDemo(child),
          })),
        }
      }
      return {
        key: node.key,
        icon: node.icon,
        label: renderLabel(node),
        disabled: !isBuilt(node) && !isDemo(node),
      }
    })

  const operations = nodes.filter((n) => n.section !== 'system')
  const system = nodes.filter((n) => n.section === 'system')

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const target = flattenMenu(nodes).find((n) => n.key === key)
    if (!target) return
    if (isBuilt(target) && target.path) return navigate(target.path)
    // Demo modules land on their dashboard, or their first list if they have none.
    // A demo submenu navigates to its own path; a module lands on its dashboard.
    if (target.path && demoPaths.has(target.path)) return navigate(target.path)
    const demoPath = demoLandingPath(target.key)
    if (demoPath) navigate(demoPath)
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
