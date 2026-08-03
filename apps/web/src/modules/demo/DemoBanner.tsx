import { Alert } from 'antd'
import { ExperimentOutlined } from '@ant-design/icons'

/**
 * Every mockup screen carries this banner.
 *
 * Hardcoded demo screens look more finished than working software, which has
 * already caused one misreading of fake figures as real. Nothing in this app
 * shows invented numbers without saying so.
 */
export function DemoBanner({ module }: { module: string }) {
  return (
    <Alert
      type="warning"
      showIcon
      icon={<ExperimentOutlined />}
      style={{ marginBottom: 16 }}
      message="Demo screen — not functional"
      description={
        <>
          Every figure below is hardcoded to illustrate the {module} module. Nothing is calculated,
          saved or connected to real records. Workshop, Customers and Inventory are the working
          modules.
        </>
      }
    />
  )
}
