import { useState } from 'react'
import { Alert, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { SectionCard } from '@garage/ui'
import {
  canCompleteRepair,
  canEditItems,
  defaultItemSource,
  isPreApproval,
  type JobCard,
} from '@garage/shared'
import { ItemGrid } from '../components/ItemGrid'
import { AddItemDrawer } from '../components/AddItemDrawer'

/**
 * Items tab — the complete working item list.
 *
 * This is where stock actually moves: issuing a part decrements inventory in
 * the same operation that marks the line issued (§4.6 transactional boundary).
 *
 * New lines take their source from the job card status, not from this screen —
 * work added before approval is part of the estimate, work added after is
 * Additional Work.
 */
export function ItemsTab({ jobCard }: { jobCard: JobCard }) {
  const [addOpen, setAddOpen] = useState(false)

  const editable = canEditItems(jobCard)
  const repairGuard = canCompleteRepair(jobCard)
  const source = defaultItemSource(jobCard.status)
  const preApproval = isPreApproval(jobCard.status)

  const pendingIssue = jobCard.items.filter(
    (i) => (i.type === 'Spare' || i.type === 'Lubricant') && !i.issued,
  ).length

  return (
    <>
      {preApproval && jobCard.items.length > 0 ? (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="These lines form the estimate"
          description="The customer has not approved yet, so everything added here appears on the Estimate tab. Work added after approval is tracked separately as Additional Work."
        />
      ) : null}

      {pendingIssue > 0 && jobCard.status === 'Repair In Progress' ? (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message={`${pendingIssue} part(s) not yet issued from stock`}
          description="Issue each part as it is fitted. Repair cannot be completed while parts remain un-issued."
        />
      ) : null}

      {!repairGuard.ok && jobCard.status === 'Repair In Progress' && pendingIssue === 0 ? (
        <Alert type="warning" showIcon style={{ marginBottom: 16 }} message={repairGuard.reason} />
      ) : null}

      {!editable.ok ? (
        <Alert type="info" showIcon style={{ marginBottom: 16 }} message={editable.reason} />
      ) : null}

      <SectionCard
        title="All Items"
        description={
          preApproval
            ? 'Labour, spares and lubricants on this job card'
            : 'Estimate lines plus any additional work approved during repair'
        }
        padding={0}
        extra={
          editable.ok ? (
            <Space>
              <Button size="small" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>
                {source === 'Estimate' ? 'Add Item' : 'Add Additional Work'}
              </Button>
            </Space>
          ) : null
        }
      >
        <div style={{ padding: 12 }}>
          <ItemGrid jobCard={jobCard} showIssue />
        </div>
      </SectionCard>

      <AddItemDrawer
        open={addOpen}
        jobCardId={jobCard.id}
        source={source}
        onClose={() => setAddOpen(false)}
      />
    </>
  )
}
