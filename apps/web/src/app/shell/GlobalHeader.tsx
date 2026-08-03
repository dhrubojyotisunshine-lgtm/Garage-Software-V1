import { useState } from 'react'
import { Badge, Button, Dropdown, Flex, Input, Layout, Select, Space, Tag, Tooltip, Avatar } from 'antd'
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { palette } from '@garage/ui'
import { ALL_BRANCHES, useAppStore, useIsCurrentFinancialYear } from '../context/appStore'
import { GLOBAL_CREATE_GROUPS } from '../navigation/globalCreate'

const { Header } = Layout

/**
 * Global header.
 *
 * Contents are FIXED (Dashboard flow §5): search · branch · FY · + Create ·
 * notifications · help · profile. Nothing else may be added, ever.
 * Module-specific actions belong in the Page Header.
 *
 * Ref: 02_NAVIGATION.md §4-§9
 */

export interface GlobalHeaderProps {
  onOpenSearch: () => void
  onOpenNotifications: () => void
  notificationCount?: number
}

export function GlobalHeader({
  onOpenSearch,
  onOpenNotifications,
  notificationCount = 0,
}: GlobalHeaderProps) {
  const navigate = useNavigate()
  const { sidebarCollapsed, toggleSidebar, branchId, setBranch, branches, financialYear, setFinancialYear, user } =
    useAppStore()
  const isCurrentFy = useIsCurrentFinancialYear()
  const [searchHover, setSearchHover] = useState(false)

  const branchOptions = [
    { label: 'All Branches', value: ALL_BRANCHES },
    ...branches.map((b) => ({ label: b.name, value: b.id })),
  ]

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 16px',
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}
    >
      {/* ------------------------------------------------------------ LEFT */}
      <Flex align="center" gap={8}>
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar (Ctrl+B)"
        />
        <a
          onClick={(e) => {
            e.preventDefault()
            navigate('/dashboard')
          }}
          href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: palette.primary[500],
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            G
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: palette.neutral[900] }}>
            Garage ERP
          </span>
        </a>
      </Flex>

      {/* ---------------------------------------------------------- CENTER */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
        <Input
          readOnly
          onClick={onOpenSearch}
          onMouseEnter={() => setSearchHover(true)}
          onMouseLeave={() => setSearchHover(false)}
          prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
          suffix={
            <Tag
              style={{
                marginInlineEnd: 0,
                fontSize: 11,
                background: palette.neutral[100],
                borderColor: palette.neutral[200],
                color: palette.neutral[500],
              }}
            >
              Ctrl K
            </Tag>
          }
          placeholder="Search job cards, customers, vehicles, parts…"
          style={{
            maxWidth: 460,
            cursor: 'pointer',
            background: searchHover ? palette.neutral[0] : palette.neutral[50],
          }}
        />
      </div>

      {/* ----------------------------------------------------------- RIGHT */}
      <Space size={8}>
        <Select
          value={branchId}
          onChange={setBranch}
          options={branchOptions}
          variant="filled"
          suffixIcon={<ShopOutlined />}
          style={{ width: 190 }}
          popupMatchSelectWidth={220}
        />

        <Tooltip
          title={isCurrentFy ? undefined : 'You are viewing a previous financial year'}
        >
          <Select
            value={financialYear}
            onChange={setFinancialYear}
            variant="filled"
            options={[
              { label: 'FY 2026-27', value: '2026-27' },
              { label: 'FY 2025-26', value: '2025-26' },
              { label: 'FY 2024-25', value: '2024-25' },
            ]}
            style={{
              width: 130,
              // Non-current FY shows a persistent amber indicator. §8
              outline: isCurrentFy ? undefined : `2px solid ${palette.warning[300]}`,
              borderRadius: 6,
            }}
          />
        </Tooltip>

        <Dropdown
          trigger={['click']}
          menu={{
            items: GLOBAL_CREATE_GROUPS.map((group) => ({
              key: group.key,
              type: 'group' as const,
              label: group.label,
              children: group.items.map((item) => ({
                key: item.key,
                label: item.label,
                onClick: () => navigate(item.path),
              })),
            })),
          }}
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Create
          </Button>
        </Dropdown>

        <Badge count={notificationCount} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            onClick={onOpenNotifications}
            aria-label="Notifications"
          />
        </Badge>

        <Button
          type="text"
          icon={<QuestionCircleOutlined />}
          onClick={() => navigate('/help')}
          aria-label="Help"
        />

        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              { key: 'profile', label: user?.name ?? 'Profile', disabled: true },
              { key: 'role', label: user?.roleName ?? '—', disabled: true },
              { type: 'divider' },
              { key: 'settings', label: 'My settings', onClick: () => navigate('/settings/general') },
              { key: 'logout', label: 'Sign out', danger: true },
            ],
          }}
        >
          <Avatar
            size={32}
            style={{ background: palette.primary[100], color: palette.primary[700], cursor: 'pointer' }}
            icon={<UserOutlined />}
          >
            {user?.name?.[0]}
          </Avatar>
        </Dropdown>
      </Space>
    </Header>
  )
}
