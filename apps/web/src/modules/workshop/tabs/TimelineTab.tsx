import { Empty, Timeline, Tag } from 'antd'
import {
  CheckCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  InboxOutlined,
  ToolOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { SectionCard, palette } from '@garage/ui'
import { formatDateTime, formatRelative, type JobCard } from '@garage/shared'

/**
 * Timeline — append-only history of everything that happened to this job card.
 *
 * Events are emitted by store actions, never by components, so nothing can
 * happen without being recorded. Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.3
 */

const KIND_ICON: Record<string, React.ReactNode> = {
  status: <CheckCircleOutlined />,
  item: <ToolOutlined />,
  stock: <InboxOutlined />,
  payment: <DollarOutlined />,
  invoice: <FileTextOutlined />,
  assignment: <UserSwitchOutlined />,
  delivery: <CheckCircleOutlined />,
}

const KIND_COLOR: Record<string, string> = {
  status: palette.primary[500],
  item: palette.neutral[500],
  stock: palette.warning[500],
  payment: palette.success[500],
  invoice: palette.primary[700],
  assignment: palette.neutral[600],
  delivery: palette.success[500],
}

export function TimelineTab({ jobCard }: { jobCard: JobCard }) {
  if (!jobCard.timeline.length) {
    return (
      <SectionCard title="Timeline">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No activity yet" />
      </SectionCard>
    )
  }

  return (
    <SectionCard title="Timeline" description="Every action recorded against this job card">
      <Timeline
        style={{ marginTop: 8 }}
        items={jobCard.timeline.map((e) => ({
          dot: KIND_ICON[e.kind],
          color: KIND_COLOR[e.kind] ?? palette.neutral[400],
          children: (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                {e.title}
                <Tag style={{ marginLeft: 8, fontSize: 10 }} color="default">
                  {e.kind}
                </Tag>
              </div>
              {e.detail ? (
                <div style={{ fontSize: 12, color: palette.neutral[600] }}>{e.detail}</div>
              ) : null}
              <div style={{ fontSize: 11, color: palette.neutral[400], marginTop: 2 }}>
                {e.by} · {formatDateTime(e.at)} · {formatRelative(e.at)}
              </div>
            </div>
          ),
        }))}
      />
    </SectionCard>
  )
}
