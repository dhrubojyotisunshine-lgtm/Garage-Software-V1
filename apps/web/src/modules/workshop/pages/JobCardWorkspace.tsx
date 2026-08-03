import { useState } from 'react'
import { App, Input, Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  NotFoundState,
  RegistrationText,
  T03Workspace,
  type ActionDef,
  type SummaryMetric,
  type WorkspaceTabDef,
} from '@garage/ui'
import {
  amountPaid,
  balanceDue,
  canCancel,
  canCompleteRepair,
  canDeliver,
  canInvoice,
  invoiceTotals,
  isOverdue,
  jobCardMachine,
  jobCardStages,
  jobCardStatusMap,
  resolveStatus,
  type JobCardStatus,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { OverviewTab } from '../tabs/OverviewTab'
import { EstimateTab } from '../tabs/EstimateTab'
import { ItemsTab } from '../tabs/ItemsTab'
import { InvoiceTab } from '../tabs/InvoiceTab'
import { DeliveryTab } from '../tabs/DeliveryTab'
import { TimelineTab } from '../tabs/TimelineTab'
import { AssignTechnicianDrawer } from '../components/AssignTechnicianDrawer'
import { NextStepBar } from '../components/NextStepBar'

/**
 * Job Card Workspace (T03) — the operational centre of the Workshop MVP.
 *
 * One record, one workspace, all roles (Workshop §9). The progress bar is not a
 * wizard: any reachable tab can be opened at any time (§12). Status changes go
 * through the state machine, never a direct write.
 */

const TABS: WorkspaceTabDef[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'estimate', label: 'Estimate' },
  { key: 'items', label: 'Items' },
  { key: 'invoice', label: 'Invoice & Payment' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'timeline', label: 'Timeline' },
]

/** Maps a progress stage back to the tab that owns it. */
const STAGE_TAB: Record<string, string> = {
  'check-in': 'overview',
  estimate: 'estimate',
  approval: 'estimate',
  repair: 'items',
  invoice: 'invoice',
  payment: 'invoice',
  delivery: 'delivery',
}

export default function JobCardWorkspace() {
  const params = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)

  const [assignOpen, setAssignOpen] = useState(false)

  const jobCard = store.jobCardById(params.id)
  const activeTab = params.tab ?? 'overview'

  if (!jobCard) return <NotFoundState what="job card" />

  const customer = store.customerById(jobCard.customerId)
  const vehicle = store.vehicleById(jobCard.vehicleId)
  const advisor = store.employeeById(jobCard.advisorId)
  const technician = store.employeeById(jobCard.technicianId)

  const actor = user?.name ?? 'System'
  const status = resolveStatus(jobCard.status, jobCardStatusMap, { overdue: isOverdue(jobCard) })
  const totals = invoiceTotals(jobCard)
  const paid = amountPaid(jobCard)
  const balance = balanceDue(jobCard)

  const goTab = (key: string) => navigate(`/workshop/job-cards/${jobCard.id}/${key}`)

  /* -------------------------------------------------------- guarded moves */

  const doTransition = (to: JobCardStatus, opts?: { reason?: string }) => {
    try {
      store.transition(jobCard.id, to, actor, opts)
      message.success(`Status updated to ${to}`)
    } catch (e) {
      message.error((e as Error).message)
    }
  }

  const cancelJobCard = () => {
    const guard = canCancel(jobCard)
    if (!guard.ok) return message.warning(guard.reason)

    let reason = ''
    Modal.confirm({
      title: `Cancel ${jobCard.jobCardNo}?`,
      content: (
        <div>
          <p style={{ marginTop: 0 }}>
            Issued parts will need to be returned separately. This cannot be undone.
          </p>
          <Input.TextArea
            rows={3}
            placeholder="Reason for cancellation (required)"
            onChange={(e) => {
              reason = e.target.value
            }}
          />
        </div>
      ),
      okText: 'Cancel Job Card',
      okButtonProps: { danger: true },
      cancelText: 'Keep it open',
      onOk: () => {
        if (!reason.trim()) {
          message.error('A reason is required')
          return Promise.reject()
        }
        doTransition('Cancelled', { reason })
        return Promise.resolve()
      },
    })
  }

  /**
   * The primary action is derived from the current status, so the advisor
   * always has exactly one obvious next step.
   */
  const primaryAction = ((): ActionDef | undefined => {
    switch (jobCard.status) {
      case 'Draft':
        return {
          key: 'checkin',
          label: 'Complete Check-In',
          type: 'primary',
          onClick: () => doTransition('Checked-In'),
        }
      case 'Checked-In':
        return {
          key: 'estimate',
          label: 'Start Estimate',
          type: 'primary',
          onClick: () => {
            doTransition('Estimate Preparation')
            goTab('estimate')
          },
        }
      case 'Estimate Preparation':
        return {
          key: 'goEstimate',
          label: 'Open Estimate',
          type: 'primary',
          onClick: () => goTab('estimate'),
        }
      case 'Approval Pending':
        return {
          key: 'approve',
          label: 'Record Approval',
          type: 'primary',
          onClick: () => goTab('estimate'),
        }
      case 'Approved': {
        const needsTech = !jobCard.technicianId
        return {
          key: 'startRepair',
          label: needsTech ? 'Assign Technician' : 'Start Repair',
          type: 'primary',
          onClick: needsTech ? () => setAssignOpen(true) : () => doTransition('Repair In Progress'),
        }
      }
      case 'Repair In Progress': {
        const guard = canCompleteRepair(jobCard)
        return {
          key: 'completeRepair',
          label: 'Complete Repair',
          type: 'primary',
          disabled: !guard.ok,
          disabledReason: guard.reason,
          onClick: () => doTransition('Repair Completed'),
        }
      }
      case 'Repair Completed': {
        const guard = canInvoice(jobCard)
        return {
          key: 'invoice',
          label: 'Generate Invoice',
          type: 'primary',
          disabled: !guard.ok,
          disabledReason: guard.reason,
          onClick: () => {
            const no = store.generateInvoice(jobCard.id, actor)
            message.success(`Invoice ${no} generated`)
            goTab('invoice')
          },
        }
      }
      case 'Invoiced':
      case 'Partially Paid':
        return {
          key: 'payment',
          label: 'Receive Payment',
          type: 'primary',
          onClick: () => goTab('invoice'),
        }
      case 'Paid': {
        const guard = canDeliver(jobCard)
        return {
          key: 'deliver',
          label: 'Complete Delivery',
          type: 'primary',
          disabled: !guard.ok,
          disabledReason: guard.reason,
          onClick: () => goTab('delivery'),
        }
      }
      default:
        return undefined
    }
  })()

  /** Everything else lives behind More — max two visible buttons. §6 */
  const moreActions: ActionDef[] = [
    {
      key: 'assign',
      label: jobCard.technicianId ? 'Reassign Technician' : 'Assign Technician',
      onClick: () => setAssignOpen(true),
    },
    ...(jobCard.invoiceNo
      ? [
          {
            key: 'printInvoice',
            label: 'Print Invoice',
            onClick: () => navigate(`/print/invoice/${jobCard.id}`),
          },
        ]
      : []),
    ...(jobCard.gatePassNo
      ? [
          {
            key: 'printGatePass',
            label: 'Print Gate Pass',
            onClick: () => navigate(`/print/gate-pass/${jobCard.id}`),
          },
        ]
      : []),
    // Legal transitions the machine allows but that are not the happy path.
    ...jobCardMachine
      .transitionsFrom(jobCard.status)
      .filter((t) => t.to !== 'Cancelled' && t.to !== primaryActionTarget(jobCard.status))
      .map((t) => ({
        key: `to-${t.to}`,
        label: t.label,
        onClick: () => doTransition(t.to),
      })),
    {
      key: 'cancel',
      label: 'Cancel Job Card',
      danger: true,
      dividerBefore: true,
      disabled: !canCancel(jobCard).ok,
      disabledReason: canCancel(jobCard).reason,
      onClick: cancelJobCard,
    },
  ]

  const summary: SummaryMetric[] = [
    { key: 'odo', label: 'Odometer', value: `${jobCard.odometer.toLocaleString('en-IN')} km` },
    { key: 'fuel', label: 'Fuel', value: jobCard.fuelLevel },
    { key: 'items', label: 'Items', value: totals.itemCount },
    {
      key: 'total',
      label: jobCard.invoiceNo ? 'Invoice' : 'Current Total',
      value: totals.total,
      type: 'money',
    },
    ...(jobCard.invoiceNo
      ? [
          { key: 'paid', label: 'Paid', value: paid, type: 'money' as const, tone: 'success' as const },
          {
            key: 'balance',
            label: 'Balance',
            value: balance,
            type: 'money' as const,
            tone: balance > 0 ? ('danger' as const) : ('muted' as const),
          },
        ]
      : []),
    { key: 'bay', label: 'Bay', value: jobCard.bay ?? '—' },
  ]

  const stages = jobCardStages(jobCard.status).map((s) => ({ ...s, tabKey: STAGE_TAB[s.key] }))

  const tabs = TABS.map((t) => {
    if (t.key === 'items') return { ...t, badge: jobCard.items.length }
    if (t.key === 'delivery' && !canDeliver(jobCard).ok) {
      return { ...t, disabled: true, disabledReason: canDeliver(jobCard).reason }
    }
    if (t.key === 'invoice' && !jobCard.invoiceNo && jobCard.status !== 'Repair Completed') {
      return { ...t, disabledReason: 'Available once repair is completed' }
    }
    return t
  })

  return (
    <>
      <T03Workspace
        recordNumber={jobCard.jobCardNo}
        status={{ label: status.label, tone: status.tone, overdue: isOverdue(jobCard) }}
        priority={
          jobCard.priority !== 'Normal'
            ? {
                label: `${jobCard.priority} Priority`,
                tone: jobCard.priority === 'Urgent' ? 'failure' : jobCard.priority === 'High' ? 'action' : 'neutral',
              }
            : undefined
        }
        identity={[
          customer?.name ?? '—',
          vehicle ? `${vehicle.manufacturer} ${vehicle.model} ${vehicle.variant ?? ''}`.trim() : '—',
          vehicle ? <RegistrationText key="reg" value={vehicle.registration} /> : null,
        ].filter(Boolean)}
        responsibility={[
          { label: 'Advisor', value: advisor?.name ?? '—' },
          { label: 'Technician', value: technician?.name ?? 'Unassigned' },
          { label: 'Bay', value: jobCard.bay ?? '—' },
          { label: 'Service', value: jobCard.serviceType },
        ]}
        summary={summary}
        stages={stages}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={goTab}
        primaryAction={primaryAction}
        moreActions={moreActions}
      >
        {/* The one next action, visible from every tab — same derived action as
            the header, so there is a single source of truth. */}
        <NextStepBar jobCard={jobCard} action={primaryAction} />

        {activeTab === 'overview' ? (
          <OverviewTab jobCard={jobCard} onAssign={() => setAssignOpen(true)} />
        ) : activeTab === 'estimate' ? (
          <EstimateTab jobCard={jobCard} />
        ) : activeTab === 'items' ? (
          <ItemsTab jobCard={jobCard} />
        ) : activeTab === 'invoice' ? (
          <InvoiceTab jobCard={jobCard} />
        ) : activeTab === 'delivery' ? (
          <DeliveryTab jobCard={jobCard} />
        ) : (
          <TimelineTab jobCard={jobCard} />
        )}
      </T03Workspace>

      <AssignTechnicianDrawer
        open={assignOpen}
        jobCard={jobCard}
        onClose={() => setAssignOpen(false)}
      />
    </>
  )
}

/** The transition already surfaced as the primary button, so More does not repeat it. */
function primaryActionTarget(status: JobCardStatus): JobCardStatus | undefined {
  const map: Partial<Record<JobCardStatus, JobCardStatus>> = {
    Draft: 'Checked-In',
    'Checked-In': 'Estimate Preparation',
    Approved: 'Repair In Progress',
    'Repair In Progress': 'Repair Completed',
    'Repair Completed': 'Invoiced',
  }
  return map[status]
}
