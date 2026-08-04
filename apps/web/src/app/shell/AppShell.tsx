import { Suspense, useEffect, useMemo, useState } from 'react'
import { Breadcrumb, Layout, Drawer, Tabs, List, Badge, Empty } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { layout, LoadingState, palette } from '@garage/ui'
import { GlobalHeader } from './GlobalHeader'
import { Sidebar } from './Sidebar'
import { GlobalSearch } from './GlobalSearch'
import { breadcrumbTrail, visibleMenu } from '../navigation/menu'
import { adminMenuRegistry } from '../navigation/adminMenu'
import { useAppStore, usePermissions } from '../context/appStore'
import { buildAlertFeed, type AlertItem } from '../navigation/alerts'
import { useWorkshopStore } from '@/store/workshopStore'

const { Content } = Layout

/**
 * Application shell.
 *
 * Header fixed, sidebar fixed and independently scrollable, only Content
 * scrolls with page data.
 *
 * Ref: 02_NAVIGATION.md §3
 */

/** Routes that render full-screen without the shell chrome. §3 */
const FULL_SCREEN_PREFIXES = ['/print/', '/counter-sale/new']

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const permissions = usePermissions()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const nodes = visibleMenu(adminMenuRegistry, permissions)
  const trail = breadcrumbTrail(location.pathname, nodes)

  const isFullScreen = FULL_SCREEN_PREFIXES.some((p) => location.pathname.startsWith(p))
  const isDashboard = location.pathname === '/dashboard'

  /**
   * Global keyboard shortcuts.
   * Shortcuts never fire while focus is in a text input, except Esc and the
   * Ctrl/Cmd combinations. Ref: 02_NAVIGATION.md §15
   */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const inInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable === true

      const mod = e.ctrlKey || e.metaKey

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        return
      }
      if (mod && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSidebar()
        return
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault()
        navigate('/workshop/job-cards/new')
        return
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setNotificationsOpen(false)
        return
      }
      if (inInput || mod) return

      // G-then-key navigation sequences. §15
      if (e.key.toLowerCase() === 'g') {
        const onNext = (ev: KeyboardEvent) => {
          const map: Record<string, string> = {
            d: '/dashboard',
            j: '/workshop/job-cards',
            c: '/crm/customers',
            l: '/crm/leads',
            p: '/inventory/products',
            s: '/counter-sale/new',
            r: '/reports',
          }
          const path = map[ev.key.toLowerCase()]
          if (path) {
            ev.preventDefault()
            navigate(path)
          }
          window.removeEventListener('keydown', onNext, true)
        }
        window.addEventListener('keydown', onNext, true)
        setTimeout(() => window.removeEventListener('keydown', onNext, true), 1500)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, toggleSidebar])

  /** Exposed so sticky footers can align with the content area. */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--erp-sider-current-width',
      `${sidebarCollapsed ? layout.siderCollapsedWidth : layout.siderWidth}px`,
    )
  }, [sidebarCollapsed])

  // Recomputed whenever job cards or stock change — always live, never stale.
  const jobCards = useWorkshopStore((s) => s.jobCards)
  const products = useWorkshopStore((s) => s.products)
  const feed = useMemo(() => buildAlertFeed(), [jobCards, products])

  if (isFullScreen) {
    return (
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <GlobalHeader
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        notificationCount={feed.items.length}
      />

      <Layout>
        <Sidebar
          badges={{
            estimatesAwaiting: feed.counts.estimatesAwaiting,
            lowStock: feed.counts.lowStock,
          }}
        />

        <Layout style={{ background: palette.neutral[100] }}>
          {/* Breadcrumbs on every page except Dashboard, POS and Print. §14 */}
          {!isDashboard && trail.length ? (
            <Breadcrumb
              style={{ padding: '12px 24px 0' }}
              items={[
                { title: <Link to="/dashboard">Home</Link> },
                ...trail.map((t, i) => ({
                  title:
                    t.path && i < trail.length - 1 ? <Link to={t.path}>{t.label}</Link> : t.label,
                })),
              ]}
            />
          ) : null}

          <Content
            style={{
              padding: layout.pagePadding,
              maxWidth: layout.maxContentWidth,
              width: '100%',
            }}
          >
            <Suspense fallback={<LoadingState />}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* One bell, three tabs: Alerts · Approvals · Reminders. §9 */}
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        width={layout.drawerSm}
      >
        <Tabs
          items={[
            {
              key: 'alerts',
              label: (
                <Badge count={feed.counts.alerts} size="small" offset={[10, 0]}>
                  Alerts
                </Badge>
              ),
              children: (
                <NotificationList
                  items={feed.items.filter((i) => i.kind === 'alert')}
                  onNavigate={(href) => {
                    navigate(href)
                    setNotificationsOpen(false)
                  }}
                />
              ),
            },
            {
              key: 'approvals',
              label: (
                <Badge count={feed.counts.approvals} size="small" offset={[10, 0]}>
                  Approvals
                </Badge>
              ),
              children: (
                <NotificationList
                  items={feed.items.filter((i) => i.kind === 'approval')}
                  onNavigate={(href) => {
                    navigate(href)
                    setNotificationsOpen(false)
                  }}
                />
              ),
            },
            {
              key: 'reminders',
              label: 'Reminders',
              children: (
                <NotificationList
                  items={feed.items.filter((i) => i.kind === 'reminder')}
                  onNavigate={(href) => {
                    navigate(href)
                    setNotificationsOpen(false)
                  }}
                />
              ),
            },
          ]}
        />
      </Drawer>
    </Layout>
  )
}

function NotificationList({
  items,
  onNavigate,
}: {
  items: AlertItem[]
  onNavigate: (href: string) => void
}) {
  if (!items.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing needs attention" />

  return (
    <List
      dataSource={items}
      renderItem={(n) => (
        <List.Item onClick={() => onNavigate(n.href)} style={{ cursor: 'pointer', paddingInline: 0 }}>
          <List.Item.Meta
            title={
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: palette.primary[500],
                    marginRight: 6,
                  }}
                />
                {n.title}
              </span>
            }
            description={
              <span style={{ fontSize: 12, color: palette.neutral[500] }}>
                {n.context}
                {n.time ? ` · ${n.time}` : ''}
              </span>
            }
          />
        </List.Item>
      )}
    />
  )
}
