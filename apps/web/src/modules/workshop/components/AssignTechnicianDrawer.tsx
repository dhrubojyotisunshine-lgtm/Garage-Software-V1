import { useState } from 'react'
import { App, Button, Drawer, Flex, Radio, Select, Space, Tag } from 'antd'
import { layout, palette } from '@garage/ui'
import type { JobCard } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { BAYS } from '@/store/seed'

/**
 * Assign Technician — a contextual action, so it opens as a DRAWER and keeps
 * the job card visible behind it. Ref: 03_PAGE_TEMPLATES.md §10, Workshop §65
 */
export function AssignTechnicianDrawer({
  open,
  jobCard,
  onClose,
}: {
  open: boolean
  jobCard: JobCard
  onClose: () => void
}) {
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)

  const [technicianId, setTechnicianId] = useState<string | undefined>(jobCard.technicianId)
  const [bay, setBay] = useState<string | undefined>(jobCard.bay)

  const technicians = store.technicians()

  /** Current load per technician, so assignment is an informed choice. */
  const loadOf = (id: string) =>
    store.jobCards.filter(
      (j) =>
        j.technicianId === id &&
        !['Delivered', 'Cancelled', 'Paid'].includes(j.status) &&
        j.id !== jobCard.id,
    ).length

  const occupiedBays = new Set(
    store.jobCards
      .filter((j) => j.bay && j.id !== jobCard.id && !['Delivered', 'Cancelled'].includes(j.status))
      .map((j) => j.bay!),
  )

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Assign Technician"
      width={layout.drawerSm}
      footer={
        <Flex justify="flex-end">
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              disabled={!technicianId}
              onClick={() => {
                store.assignTechnician(jobCard.id, technicianId!, bay, user?.name ?? 'System')
                message.success('Technician assigned')
                onClose()
              }}
            >
              Assign
            </Button>
          </Space>
        </Flex>
      }
    >
      <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Technician</div>
      <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 24 }}>
        {technicians.map((t) => {
          const load = loadOf(t.id)
          const selected = t.id === technicianId
          return (
            <div
              key={t.id}
              onClick={() => t.available && setTechnicianId(t.id)}
              style={{
                padding: '10px 12px',
                borderRadius: 6,
                cursor: t.available ? 'pointer' : 'not-allowed',
                opacity: t.available ? 1 : 0.55,
                border: `1px solid ${selected ? palette.primary[500] : palette.neutral[200]}`,
                background: selected ? palette.primary[50] : palette.neutral[0],
              }}
            >
              <Flex justify="space-between" align="center">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: palette.neutral[500] }}>
                    {t.code} · {(t.skills ?? []).join(', ') || 'General'}
                  </div>
                </div>
                <Space size={4}>
                  {!t.available ? (
                    <Tag color="gold" style={{ marginInlineEnd: 0 }}>
                      On leave
                    </Tag>
                  ) : (
                    <Tag
                      color={load === 0 ? 'green' : load < 3 ? 'blue' : 'orange'}
                      style={{ marginInlineEnd: 0 }}
                    >
                      {load} active
                    </Tag>
                  )}
                </Space>
              </Flex>
            </div>
          )
        })}
      </Space>

      <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Bay (optional)</div>
      <Select
        allowClear
        style={{ width: '100%' }}
        placeholder="Select a bay"
        value={bay}
        onChange={setBay}
        options={BAYS.map((b) => ({
          value: b,
          label: occupiedBays.has(b) ? `${b} — occupied` : b,
          disabled: occupiedBays.has(b),
        }))}
      />

      <Radio.Group style={{ display: 'none' }} />
    </Drawer>
  )
}
