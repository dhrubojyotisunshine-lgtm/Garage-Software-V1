import { useMemo, useState, type ReactNode } from 'react'
import { Button, Card, Flex, Input, Menu, Modal, Space, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ActionDef, SettingsCategoryDef } from '../types'
import { palette } from '../theme/tokens'

/**
 * T08 — SETTINGS
 *
 * Company-level configuration with category navigation.
 *
 * Rules enforced here:
 *  - Changes are explicit. Nothing saves on toggle. §19
 *  - Dirty state is visible and blocks navigation.
 *  - Branch-overridable settings show inheritance clearly (Admin flow §21).
 *
 * Ref: 03_PAGE_TEMPLATES.md §19
 */

export interface T08SettingsProps {
  categories: SettingsCategoryDef[]
  activeCategory: string
  onCategoryChange: (key: string) => void

  title: ReactNode
  description?: ReactNode

  children: ReactNode

  dirty?: boolean
  saving?: boolean
  onSave?: () => void
  onDiscard?: () => void

  headerActions?: ActionDef[]
}

export function T08Settings({
  categories,
  activeCategory,
  onCategoryChange,
  title,
  description,
  children,
  dirty,
  saving,
  onSave,
  onDiscard,
}: T08SettingsProps) {
  const [search, setSearch] = useState('')

  /**
   * Configuration search is essential — there are too many settings to browse.
   * Ref: Admin flow §5
   */
  const filtered = useMemo(() => {
    if (!search.trim()) return categories
    const q = search.toLowerCase()
    const match = (c: SettingsCategoryDef): boolean =>
      c.label.toLowerCase().includes(q) || (c.children ?? []).some(match)
    return categories.filter(match)
  }, [categories, search])

  const guardedChange = (key: string) => {
    if (!dirty) return onCategoryChange(key)
    Modal.confirm({
      title: 'Discard unsaved changes?',
      content: 'You have unsaved configuration changes on this page.',
      okText: 'Discard',
      okButtonProps: { danger: true },
      cancelText: 'Keep editing',
      onOk: () => onCategoryChange(key),
    })
  }

  return (
    <div style={{ paddingBottom: dirty ? 72 : 0 }}>
      <Flex gap={16} align="flex-start">
        {/* ------------------------------------------------- CATEGORY NAV */}
        <Card
          size="small"
          styles={{ body: { padding: 8 } }}
          style={{ width: 240, flex: '0 0 240px', position: 'sticky', top: 80 }}
        >
          <Input
            allowClear
            size="small"
            prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
            placeholder="Search configuration"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <Menu
            mode="inline"
            selectedKeys={[activeCategory]}
            onClick={({ key }) => guardedChange(key)}
            style={{ border: 'none' }}
            items={filtered.map((c) => ({
              key: c.key,
              label: c.label,
              icon: c.icon,
              children: c.children?.map((child) => ({
                key: child.key,
                label: child.label,
              })),
            }))}
          />
        </Card>

        {/* ------------------------------------------------ SETTINGS PANEL */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
            {description ? (
              <div style={{ fontSize: 13, color: palette.neutral[500], marginTop: 2 }}>
                {description}
              </div>
            ) : null}
          </div>
          {children}
        </div>
      </Flex>

      {/* -------------------------------------------------- STICKY FOOTER */}
      {dirty ? (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 'var(--erp-sider-current-width, 240px)',
            right: 0,
            padding: '12px 24px',
            background: palette.neutral[0],
            borderTop: `1px solid ${palette.neutral[200]}`,
            boxShadow: '0 -2px 6px rgba(15,23,42,.05)',
            zIndex: 10,
          }}
        >
          <Flex justify="space-between" align="center">
            <span style={{ fontSize: 13, color: palette.warning[700], fontWeight: 500 }}>
              You have unsaved changes
            </span>
            <Space>
              <Button onClick={onDiscard}>Discard</Button>
              <Button type="primary" loading={saving} onClick={onSave}>
                Save changes
              </Button>
            </Space>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

/**
 * A single setting row: label · control · description · effective value.
 * Inheritance must never be hidden. Ref: Admin flow §21
 */
export function SettingRow({
  label,
  description,
  control,
  inheritedFrom,
  overridden,
}: {
  label: ReactNode
  description?: ReactNode
  control: ReactNode
  /** e.g. "Company" — shown when this branch inherits the value. */
  inheritedFrom?: string
  overridden?: boolean
}) {
  return (
    <Flex
      justify="space-between"
      align="flex-start"
      gap={24}
      style={{
        padding: '12px 0',
        borderBottom: `1px solid ${palette.neutral[100]}`,
      }}
    >
      <div style={{ maxWidth: 460 }}>
        <Flex align="center" gap={8}>
          <span style={{ fontSize: 14, fontWeight: 500, color: palette.neutral[900] }}>{label}</span>
          {inheritedFrom && !overridden ? (
            <Tag style={{ marginInlineEnd: 0, fontSize: 11 }} color="default">
              Inherited from {inheritedFrom}
            </Tag>
          ) : null}
          {overridden ? (
            <Tag style={{ marginInlineEnd: 0, fontSize: 11 }} color="blue">
              Overridden
            </Tag>
          ) : null}
        </Flex>
        {description ? (
          <div style={{ fontSize: 12, color: palette.neutral[500], marginTop: 2 }}>{description}</div>
        ) : null}
      </div>
      <div style={{ minWidth: 220, flex: '0 0 auto' }}>{control}</div>
    </Flex>
  )
}

/** Groups related settings inside a category. */
export function SettingsGroup({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Card size="small" title={title} style={{ marginBottom: 16 }} styles={{ body: { padding: '4px 16px 12px' } }}>
      {children}
    </Card>
  )
}
