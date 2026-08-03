import { useMemo } from 'react'
import { Badge, Layout, Menu, Tag, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
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
import { staticMenuKeys } from '@/modules/screens/registry'
import { adminMenuRegistry } from '../navigation/adminMenu'

/** Menu keys that resolve to a mockup rather than working software. */
const isDemo = (node: MenuNode) =>
  !isBuilt(node) && (demoModuleKeys.has(node.key) || (!!node.path && demoPaths.has(node.path)))

/** Backed by a layout-only screen: navigable, but nothing is wired yet. */
const isStatic = (node: MenuNode) => !isBuilt(node) && staticMenuKeys.has(node.key)

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

  /**
   * The Super Admin runs the platform; garage staff run a workshop. They get
   * different menu trees rather than one tree with a hidden section.
   */
  const isAdminArea = location.pathname.startsWith('/admin')
  const registry = isAdminArea ? adminMenuRegistry : menuRegistry
  const nodes = useMemo(
    () => visibleMenu(registry, permissions),
    [registry, permissions],
  )

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

    if (isStatic(node)) return node.label

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
      // AntD's .ant-badge sets color: colorText, which is near-black and would
      // make the label invisible on the dark sidebar. Inherit instead.
      <Badge
        count={count}
        size="small"
        offset={[8, 0]}
        style={{ boxShadow: 'none' }}
        styles={{ root: { color: 'inherit' } }}
      >
        <span style={{ paddingRight: 4, color: 'inherit' }}>{node.label}</span>
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
          disabled:
            !isBuilt(node) &&
            !isDemo(node) &&
            !isStatic(node) &&
            !node.children.some((c) => isBuilt(c) || isDemo(c) || isStatic(c)),
          children: node.children.map((child) => ({
            key: child.key,
            label: renderLabel(child),
            disabled: !isBuilt(child) && !isDemo(child) && !isStatic(child),
          })),
        }
      }
      return {
        key: node.key,
        icon: node.icon,
        label: renderLabel(node),
        disabled: !isBuilt(node) && !isDemo(node) && !isStatic(node),
      }
    })

  const operations = nodes.filter((n) => n.section !== 'system')
  const system = nodes.filter((n) => n.section === 'system')

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const target = flattenMenu(nodes).find((n) => n.key === key)
    if (!target) return
    if ((isBuilt(target) || isStatic(target)) && target.path) return navigate(target.path)
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
      {isAdminArea && !collapsed ? (
        <div
          style={{
            margin: '10px 12px 4px',
            padding: '6px 10px',
            borderRadius: 6,
            background: 'rgba(0,0,0,.18)',
            border: '1px solid rgba(255,255,255,.25)',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.04em',
          }}
        >
          SUPER ADMIN
        </div>
      ) : null}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        defaultOpenKeys={openKey && !collapsed ? [openKey] : []}
        onClick={handleClick}
        items={toItems(operations)}
        style={{ paddingTop: isAdminArea ? 4 : 8, borderInlineEnd: 'none' }}
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
        style={{ paddingBottom: 8, borderInlineEnd: 'none' }}
      />

      {isAdminArea ? (
        <div
          onClick={() => navigate('/workshop')}
          style={{
            margin: '4px 8px 16px',
            padding: '10px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            color: '#FFFFFF',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <LogoutOutlined />
          {!collapsed ? <span>Logout</span> : null}
        </div>
      ) : null}
    </Sider>
  )
}
