import { useMemo, useState } from 'react'
import { Segmented } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  BoardKanban,
  BoardList,
  T06Board,
  type BoardColumnDef,
} from '@garage/ui'
import {
  formatDateTime,
  isOverdue,
  invoiceTotals,
  type JobCardStatus,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Vehicle Queue (T06-kanban) and Technician Board (T06-list).
 *
 * Both are monitoring surfaces — every card opens the Job Card workspace
 * (Workshop §17). Neither is the only route to a record.
 */

const QUEUE_COLUMNS: Array<{ key: JobCardStatus[]; label: string; tone: BoardColumnDef['tone'] }> = [
  { key: ['Draft'], label: 'Waiting', tone: 'neutral' },
  { key: ['Checked-In', 'Estimate Preparation'], label: 'Check-In / Estimate', tone: 'progress' },
  { key: ['Approval Pending'], label: 'Approval Pending', tone: 'action' },
  { key: ['Approved', 'Repair In Progress'], label: 'Repair', tone: 'progress' },
  { key: ['Repair Completed', 'Invoiced', 'Partially Paid'], label: 'Billing', tone: 'action' },
  { key: ['Paid'], label: 'Ready', tone: 'success' },
]

export default function VehicleQueue() {
  const navigate = useNavigate()
  const location = useLocation()
  const store = useWorkshopStore()

  const [variant, setVariant] = useState<'queue' | 'technicians'>(
    location.pathname.includes('technicians') ? 'technicians' : 'queue',
  )
  const [fullScreen, setFullScreen] = useState(false)

  const columns = useMemo<BoardColumnDef[]>(
    () =>
      QUEUE_COLUMNS.map((col) => ({
        key: col.label,
        label: col.label,
        tone: col.tone,
        cards: store.jobCards
          .filter((j) => col.key.includes(j.status))
          .map((j) => {
            const vehicle = store.vehicleById(j.vehicleId)
            const customer = store.customerById(j.customerId)
            const tech = store.employeeById(j.technicianId)
            return {
              key: j.id,
              title: vehicle?.registration ?? j.jobCardNo,
              subtitle: `${vehicle?.manufacturer ?? ''} ${vehicle?.model ?? ''} · ${customer?.name ?? ''}`,
              status: isOverdue(j)
                ? { label: 'Overdue', tone: 'failure' as const }
                : j.priority !== 'Normal'
                  ? {
                      label: j.priority,
                      tone: j.priority === 'Urgent' ? ('failure' as const) : ('action' as const),
                    }
                  : undefined,
              meta: [
                { label: 'Tech', value: tech?.name.split(' ')[0] ?? '—' },
                { label: 'Bay', value: j.bay ?? '—' },
                { label: 'Due', value: formatDateTime(j.expectedDelivery).split(',')[0]! },
              ],
              onClick: () => navigate(`/workshop/job-cards/${j.id}/overview`),
            }
          }),
      })),
    [store, navigate],
  )

  const technicianRows = useMemo(
    () =>
      store.technicians().map((t) => {
        const assigned = store.jobCards.filter(
          (j) => j.technicianId === t.id && !['Delivered', 'Cancelled'].includes(j.status),
        )
        const completed = store.jobCards.filter(
          (j) => j.technicianId === t.id && ['Delivered', 'Paid'].includes(j.status),
        )
        const current = assigned.find((j) => j.status === 'Repair In Progress')
        return {
          key: t.id,
          title: t.name,
          subtitle: current
            ? `Working on ${current.jobCardNo}`
            : assigned.length
              ? `${assigned.length} job(s) assigned`
              : 'No active work',
          status: {
            label: t.available ? 'Available' : 'On Leave',
            tone: (t.available ? 'success' : 'waiting') as 'success' | 'waiting',
          },
          metrics: [
            { label: 'Active', value: assigned.length },
            { label: 'Completed', value: completed.length },
            { label: 'Skills', value: (t.skills ?? ['General']).join(', ') },
          ],
          onClick: current
            ? () => navigate(`/workshop/job-cards/${current.id}/overview`)
            : undefined,
        }
      }),
    [store, navigate],
  )

  const totalInQueue = columns.reduce((a, c) => a + c.cards.length, 0)
  const queueValue = store.jobCards
    .filter((j) => !['Delivered', 'Cancelled'].includes(j.status))
    .reduce((a, j) => a + invoiceTotals(j).total, 0)

  return (
    <T06Board
      title={variant === 'queue' ? 'Vehicle Queue' : 'Technician Board'}
      subtitle={
        variant === 'queue'
          ? `${totalInQueue} vehicles · ₹ ${(queueValue / 100).toLocaleString('en-IN')} in progress`
          : `${store.technicians().length} technicians`
      }
      lastUpdated="just now"
      onRefresh={() => undefined}
      fullScreen={fullScreen}
      onToggleFullScreen={() => setFullScreen((v) => !v)}
      extra={
        <Segmented
          value={variant}
          onChange={(v) => {
            const next = v as 'queue' | 'technicians'
            setVariant(next)
            navigate(next === 'queue' ? '/workshop/queue' : '/workshop/technicians')
          }}
          options={[
            { label: 'Queue', value: 'queue' },
            { label: 'Technicians', value: 'technicians' },
          ]}
        />
      }
    >
      {variant === 'queue' ? <BoardKanban columns={columns} /> : <BoardList rows={technicianRows} />}
    </T06Board>
  )
}
