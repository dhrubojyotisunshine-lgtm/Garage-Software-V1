import { Card, Flex, Space } from 'antd'
import { DownloadOutlined, ExportOutlined, PrinterOutlined } from '@ant-design/icons'
import { PageHeader, palette } from '@garage/ui'

/**
 * Module & Flow Guide.
 *
 * The guide itself is a standalone HTML file in public/, so there is one copy
 * of the content: this route, the file you can email, and the PDF all render
 * the same source. Embedding it rather than duplicating it means the three can
 * never drift apart.
 */
const GUIDE_URL = '/user-guide.html'

export default function UserGuide() {
  return (
    <div>
      <PageHeader
        title="Module & Flow Guide"
        description="What each module does today, how the flows work, and what is still pending"
        primaryAction={{
          key: 'print',
          label: 'Print / Save as PDF',
          icon: <PrinterOutlined />,
          onClick: () => window.open(GUIDE_URL, '_blank')?.print(),
        }}
        secondaryAction={{
          key: 'open',
          label: 'Open in new tab',
          icon: <ExportOutlined />,
          onClick: () => window.open(GUIDE_URL, '_blank'),
        }}
        moreActions={[
          {
            key: 'download',
            label: 'Download HTML',
            icon: <DownloadOutlined />,
            onClick: () => {
              const a = document.createElement('a')
              a.href = GUIDE_URL
              a.download = 'garage-erp-guide.html'
              a.click()
            },
          },
        ]}
      />

      <Card styles={{ body: { padding: 0 } }}>
        <iframe
          src={GUIDE_URL}
          title="Module and flow guide"
          style={{
            width: '100%',
            height: 'calc(100vh - 210px)',
            border: 'none',
            display: 'block',
            borderRadius: 8,
          }}
        />
      </Card>

      <Flex justify="space-between" style={{ marginTop: 12, fontSize: 12, color: palette.neutral[500] }}>
        <span>
          Source: <code>apps/web/public/user-guide.html</code> — the PDF and this page render the
          same file.
        </span>
        <Space size={4}>Status labels describe what the code does, not what is planned.</Space>
      </Flex>
    </div>
  )
}
