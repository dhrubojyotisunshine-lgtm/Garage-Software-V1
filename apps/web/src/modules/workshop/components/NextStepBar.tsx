import type { ReactNode } from 'react'
import { Button, Flex, Tooltip } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { palette, type ActionDef } from '@garage/ui'
import type { JobCard, JobCardStatus } from '@garage/shared'

/**
 * The single next action, visible from every tab.
 *
 * The job card lifecycle has eleven statuses; without a persistent prompt a
 * user has to already know the process to advance it. This bar removes that
 * requirement — it renders the same derived primary action as the header, so
 * there is one source of truth, not two.
 */

/** Plain-language description of where the job card stands. */
export function nextStepText(jobCard: JobCard): ReactNode {
  const hasTechnician = Boolean(jobCard.technicianId)

  switch (jobCard.status) {
    case 'Draft':
      return 'Complete check-in to move this job card into the workshop.'
    case 'Checked-In':
      return 'Add labour and parts on the Estimate tab, then send it for approval.'
    case 'Estimate Preparation':
      return 'Finish the estimate and send it to the customer for approval.'
    case 'Approval Pending':
      return 'Waiting on the customer. Record their decision on the Estimate tab.'
    case 'Approved':
      return hasTechnician
        ? 'Estimate approved. Start the repair when the technician is ready.'
        : 'Estimate approved. Assign a technician, then start the repair.'
    case 'Repair In Progress':
      return 'Issue parts from stock on the Items tab, then complete the repair.'
    case 'Repair Completed':
      return 'Repair done. Generate the invoice to bill the customer.'
    case 'Invoiced':
    case 'Partially Paid':
      return 'Collect the balance. Delivery stays blocked until the invoice is settled.'
    case 'Paid':
      return 'Invoice settled. Complete the delivery checklist to issue the gate pass.'
    case 'Delivered':
      return 'This job card is complete.'
    case 'Cancelled':
      return `Cancelled: ${jobCard.cancellationReason ?? 'no reason recorded'}`
    default:
      return null
  }
}

const TERMINAL: JobCardStatus[] = ['Delivered', 'Cancelled']

export function NextStepBar({
  jobCard,
  action,
}: {
  jobCard: JobCard
  action?: ActionDef
}) {
  if (TERMINAL.includes(jobCard.status)) return null

  const button = action ? (
    <Button
      type="primary"
      disabled={action.disabled}
      onClick={action.onClick}
      icon={<ArrowRightOutlined />}
      iconPosition="end"
    >
      {action.label}
    </Button>
  ) : null

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={16}
      wrap
      style={{
        padding: '10px 14px',
        marginBottom: 16,
        borderRadius: 6,
        background: palette.primary[50],
        border: `1px solid ${palette.primary[200]}`,
      }}
    >
      <Flex align="center" gap={10} style={{ minWidth: 0 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '.04em',
            color: palette.primary[700],
            background: palette.primary[100],
            padding: '2px 7px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
          }}
        >
          NEXT STEP
        </span>
        <span style={{ fontSize: 13, color: palette.neutral[800] }}>{nextStepText(jobCard)}</span>
      </Flex>

      {action?.disabled && action.disabledReason ? (
        <Tooltip title={action.disabledReason}>
          <span>{button}</span>
        </Tooltip>
      ) : (
        button
      )}
    </Flex>
  )
}
