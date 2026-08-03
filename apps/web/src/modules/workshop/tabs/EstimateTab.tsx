import { useState } from 'react'
import { App, Alert, Button, Flex, Input, Modal, Space, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons'
import { DateTimeText, MoneyText, SectionCard, palette } from '@garage/ui'
import { canSendEstimate, estimateTotals, isPreApproval, type JobCard } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'
import { ItemGrid } from '../components/ItemGrid'
import { AddItemDrawer } from '../components/AddItemDrawer'

/**
 * Estimate tab — build the quote, send it, record the customer's decision.
 *
 * Approval is recorded here rather than in a separate module: the approval is
 * a stage of this job card, not an independent document.
 * Ref: 04_ALL_MODULES.md §92, Workshop §54–59
 */
export function EstimateTab({ jobCard }: { jobCard: JobCard }) {
  const { message } = App.useApp()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)
  const [addOpen, setAddOpen] = useState(false)

  const totals = estimateTotals(jobCard)
  const sendGuard = canSendEstimate(jobCard)

  /**
   * The estimate can be prepared from Draft onwards — an advisor often quotes
   * while the vehicle is still being booked in. Sending it still requires
   * check-in, so the process order is preserved rather than skipped.
   */
  const canEdit = ['Draft', 'Checked-In', 'Estimate Preparation'].includes(jobCard.status)
  const isDraft = jobCard.status === 'Draft'
  const awaiting = jobCard.status === 'Approval Pending'
  const preApproval = isPreApproval(jobCard.status)

  const actor = user?.name ?? 'System'

  const completeCheckIn = () => {
    store.transition(jobCard.id, 'Checked-In', actor)
    message.success('Check-in completed')
  }

  const send = () => {
    if (!sendGuard.ok) return message.warning(sendGuard.reason)
    if (jobCard.status === 'Checked-In') {
      store.transition(jobCard.id, 'Estimate Preparation', actor)
    }
    store.transition(jobCard.id, 'Approval Pending', actor)
    message.success('Estimate sent for customer approval')
  }

  /** Why "Send for Approval" is unavailable — surfaced as a tooltip. */
  const sendBlockedReason: string | null = isDraft
    ? 'Complete check-in before sending the estimate'
    : sendGuard.ok
      ? null
      : (sendGuard.reason ?? 'Cannot send yet')

  /** Why the estimate is read-only, when it is. Never a silent dead end. */
  const readOnlyReason = ((): string | null => {
    if (canEdit || awaiting) return null
    switch (jobCard.status) {
      case 'Approved':
        return 'The customer has approved this estimate. Add further work from the Items tab as Additional Work.'
      case 'Repair In Progress':
      case 'Repair Completed':
        return 'Repair has started. Add further work from the Items tab as Additional Work.'
      case 'Invoiced':
      case 'Partially Paid':
      case 'Paid':
      case 'Delivered':
        return 'The invoice has been generated, so the estimate is locked.'
      case 'Cancelled':
        return 'This job card was cancelled.'
      default:
        return null
    }
  })()

  const approve = () => {
    store.transition(jobCard.id, 'Approved', actor)
    message.success('Customer approval recorded')
  }

  const reject = () => {
    let reason = ''
    Modal.confirm({
      title: 'Customer did not approve',
      content: (
        <Input.TextArea
          rows={3}
          placeholder="Reason for rejection or revision"
          onChange={(e) => {
            reason = e.target.value
          }}
        />
      ),
      okText: 'Revise Estimate',
      onOk: () => {
        store.transition(jobCard.id, 'Estimate Preparation', actor, { reason })
        message.info('Estimate reopened for revision')
      },
    })
  }

  return (
    <>
      {isDraft ? (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Check-in not completed"
          description={
            <Flex justify="space-between" align="center" wrap gap={12}>
              <span>
                You can build the estimate now, but it cannot be sent for approval until check-in is
                complete.
              </span>
              <Button type="primary" onClick={completeCheckIn}>
                Complete Check-In
              </Button>
            </Flex>
          }
        />
      ) : null}

      {readOnlyReason ? (
        <Alert type="info" showIcon style={{ marginBottom: 16 }} message={readOnlyReason} />
      ) : null}

      {awaiting ? (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Awaiting customer approval"
          description={
            <Flex justify="space-between" align="center" wrap gap={12}>
              <span>
                Estimate of <MoneyText value={totals.total} strong /> sent{' '}
                <DateTimeText value={jobCard.estimateSentAt} />.
              </span>
              <Space>
                <Button danger icon={<CloseOutlined />} onClick={reject}>
                  Not Approved
                </Button>
                <Button type="primary" icon={<CheckOutlined />} onClick={approve}>
                  Record Approval
                </Button>
              </Space>
            </Flex>
          }
        />
      ) : null}

      {jobCard.estimateApprovedAt ? (
        <Alert
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
          message={
            <span>
              Estimate approved <DateTimeText value={jobCard.estimateApprovedAt} /> —{' '}
              <MoneyText value={totals.total} strong />
            </span>
          }
        />
      ) : null}

      <SectionCard
        title="Estimate Lines"
        description="Labour, spares and lubricants quoted to the customer"
        padding={0}
        extra={
          canEdit ? (
            <Space>
              <Button size="small" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>
                Add Line
              </Button>
              <Tooltip title={sendBlockedReason ?? undefined}>
                <Button
                  size="small"
                  type="primary"
                  icon={<SendOutlined />}
                  disabled={Boolean(sendBlockedReason)}
                  onClick={send}
                >
                  Send for Approval
                </Button>
              </Tooltip>
            </Space>
          ) : null
        }
      >
        <div style={{ padding: 12 }}>
          {/* Before approval every line is part of the quote, so nothing added
              from the Items tab can go missing here. */}
          <ItemGrid jobCard={jobCard} source={preApproval ? undefined : 'Estimate'} />
        </div>
      </SectionCard>

      {sendBlockedReason && canEdit ? (
        <div style={{ fontSize: 12, color: palette.neutral[500] }}>{sendBlockedReason}</div>
      ) : null}

      <AddItemDrawer
        open={addOpen}
        jobCardId={jobCard.id}
        source="Estimate"
        onClose={() => setAddOpen(false)}
      />
    </>
  )
}
