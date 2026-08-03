import { useState } from 'react'
import { Alert, App, Button, Checkbox, Empty, Flex, Input, Result, Space } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { DateTimeText, FieldGrid, SectionCard, palette } from '@garage/ui'
import { canDeliver, type DeliveryChecklist, type JobCard } from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'
import { useAppStore } from '@/app/context/appStore'

/**
 * Delivery tab — checklist, gate pass, handover.
 *
 * Delivery blockers are shown explicitly rather than the action simply being
 * disabled. Ref: Workshop §143–145
 */

const CHECKLIST_ITEMS: Array<{ key: keyof DeliveryChecklist; label: string }> = [
  { key: 'vehicleCleaned', label: 'Vehicle cleaned and ready' },
  { key: 'accessoriesReturned', label: 'Accessories verified and returned' },
  { key: 'documentsHanded', label: 'Invoice and documents handed over' },
  { key: 'customerSatisfied', label: 'Work explained to customer' },
]

export function DeliveryTab({ jobCard }: { jobCard: JobCard }) {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const store = useWorkshopStore()
  const user = useAppStore((s) => s.user)

  const [checklist, setChecklist] = useState<DeliveryChecklist>(
    jobCard.deliveryChecklist ?? {
      vehicleCleaned: false,
      accessoriesReturned: false,
      documentsHanded: false,
      customerSatisfied: false,
    },
  )
  const [receivedBy, setReceivedBy] = useState('')

  const guard = canDeliver(jobCard)
  const allChecked = CHECKLIST_ITEMS.every((i) => checklist[i.key])

  if (jobCard.status === 'Delivered') {
    return (
      <SectionCard title="Delivery">
        <Result
          status="success"
          title="Vehicle delivered"
          subTitle={
            <span>
              Gate pass <span className="erp-mono">{jobCard.gatePassNo}</span> issued{' '}
              <DateTimeText value={jobCard.deliveredAt} />
            </span>
          }
          extra={
            <Button
              icon={<PrinterOutlined />}
              onClick={() => navigate(`/print/gate-pass/${jobCard.id}`)}
            >
              Print Gate Pass
            </Button>
          }
        />
        <FieldGrid
          columns={2}
          bordered
          rows={CHECKLIST_ITEMS.map((i) => ({
            label: i.label,
            value: jobCard.deliveryChecklist?.[i.key] ? 'Yes' : 'No',
          }))}
        />
      </SectionCard>
    )
  }

  if (!guard.ok) {
    return (
      <SectionCard title="Delivery">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Delivery is blocked</div>
              <div style={{ color: palette.neutral[500], fontSize: 13 }}>{guard.reason}</div>
            </div>
          }
        />
      </SectionCard>
    )
  }

  return (
    <>
      <Alert
        type="success"
        showIcon
        style={{ marginBottom: 16 }}
        message="Invoice settled — the vehicle is cleared for delivery."
      />

      <SectionCard title="Delivery Checklist" description="All items must be confirmed before handover">
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          {CHECKLIST_ITEMS.map((item) => (
            <Checkbox
              key={item.key}
              checked={checklist[item.key]}
              onChange={(e) => setChecklist((c) => ({ ...c, [item.key]: e.target.checked }))}
            >
              {item.label}
            </Checkbox>
          ))}
        </Space>

        <div style={{ marginTop: 20, maxWidth: 360 }}>
          <div style={{ fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
            Received By <span style={{ color: palette.error[500] }}>*</span>
          </div>
          <Input
            placeholder="Name of person collecting the vehicle"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
          />
        </div>

        <Flex justify="flex-end" style={{ marginTop: 20 }}>
          <Button
            type="primary"
            size="large"
            disabled={!allChecked || !receivedBy.trim()}
            onClick={() => {
              const gatePassNo = store.completeDelivery(
                jobCard.id,
                checklist,
                receivedBy.trim(),
                user?.name ?? 'System',
              )
              message.success(`Delivered — gate pass ${gatePassNo}`)
            }}
          >
            Complete Delivery & Generate Gate Pass
          </Button>
        </Flex>
      </SectionCard>
    </>
  )
}
