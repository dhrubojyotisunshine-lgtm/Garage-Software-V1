import { useEffect, useMemo, useState } from 'react'
import { Empty, Input, Modal, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { palette } from '@garage/ui'
import { GLOBAL_CREATE_GROUPS } from '../navigation/globalCreate'
import { searchEverything, type SearchResult } from '../navigation/search'

/**
 * Global Search — a command palette, not a results page.
 *
 * Results grouped by entity type, max 5 per group. Enter opens the record
 * directly, with no intermediate page. Also matches ACTIONS, which is what
 * makes it a command palette rather than just search.
 *
 * Ref: 02_NAVIGATION.md §5
 */

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  const groups = useMemo(() => searchEverything(query), [query])

  const actions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return GLOBAL_CREATE_GROUPS.flatMap((g) => g.items)
      .filter((i) => `create ${i.label}`.toLowerCase().includes(q))
      .slice(0, 4)
  }, [query])

  /** Flat list for keyboard navigation across groups. */
  const flat = useMemo<Array<SearchResult | { kind: 'action'; label: string; path: string }>>(
    () => [
      ...groups.flatMap((g) => g.results),
      ...actions.map((a) => ({ kind: 'action' as const, label: `Create ${a.label}`, path: a.path })),
    ],
    [groups, actions],
  )

  const go = (path: string) => {
    navigate(path)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = flat[activeIndex]
      if (target) go(target.path)
    }
  }

  let runningIndex = -1

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={640}
      styles={{ body: { padding: 0 } }}
      style={{ top: 80 }}
      destroyOnClose
    >
      <Input
        autoFocus
        size="large"
        variant="borderless"
        prefix={<SearchOutlined style={{ color: palette.neutral[400] }} />}
        placeholder="Search job cards, customers, vehicles, parts, invoices…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
        }}
        onKeyDown={handleKeyDown}
        style={{ padding: '14px 16px', fontSize: 15 }}
      />

      <div style={{ borderTop: `1px solid ${palette.neutral[200]}`, maxHeight: 420, overflow: 'auto' }}>
        {!query.trim() ? (
          <div style={{ padding: 24, color: palette.neutral[500], fontSize: 13 }}>
            Search across vehicles, job cards, customers, products, invoices and more.
          </div>
        ) : flat.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No matches"
            style={{ margin: '32px 0' }}
          />
        ) : (
          <>
            {groups.map((group) => (
              <div key={group.entity}>
                <div
                  style={{
                    padding: '8px 16px 4px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: palette.neutral[400],
                    letterSpacing: '.04em',
                  }}
                >
                  {group.entity.toUpperCase()}
                </div>
                {group.results.map((r) => {
                  runningIndex += 1
                  const active = runningIndex === activeIndex
                  return (
                    <div
                      key={r.id}
                      onClick={() => go(r.path)}
                      onMouseEnter={() => setActiveIndex(flat.findIndex((f) => 'id' in f && f.id === r.id))}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        background: active ? palette.primary[50] : undefined,
                        borderLeft: `2px solid ${active ? palette.primary[500] : 'transparent'}`,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</div>
                      {/* Enough context to disambiguate. §5 */}
                      <div style={{ fontSize: 12, color: palette.neutral[500] }}>{r.subtitle}</div>
                    </div>
                  )
                })}
              </div>
            ))}

            {actions.length ? (
              <div>
                <div
                  style={{
                    padding: '8px 16px 4px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: palette.neutral[400],
                    letterSpacing: '.04em',
                  }}
                >
                  ACTIONS
                </div>
                {actions.map((a) => {
                  runningIndex += 1
                  const active = runningIndex === activeIndex
                  return (
                    <div
                      key={a.key}
                      onClick={() => go(a.path)}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: 13,
                        background: active ? palette.primary[50] : undefined,
                        borderLeft: `2px solid ${active ? palette.primary[500] : 'transparent'}`,
                      }}
                    >
                      Create {a.label}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </>
        )}
      </div>

      <div
        style={{
          borderTop: `1px solid ${palette.neutral[200]}`,
          padding: '8px 16px',
          fontSize: 11,
          color: palette.neutral[500],
          display: 'flex',
          gap: 16,
        }}
      >
        <span>
          <Tag style={{ marginInlineEnd: 4, fontSize: 10 }}>↑↓</Tag> navigate
        </span>
        <span>
          <Tag style={{ marginInlineEnd: 4, fontSize: 10 }}>↵</Tag> open
        </span>
        <span>
          <Tag style={{ marginInlineEnd: 4, fontSize: 10 }}>esc</Tag> close
        </span>
      </div>
    </Modal>
  )
}
