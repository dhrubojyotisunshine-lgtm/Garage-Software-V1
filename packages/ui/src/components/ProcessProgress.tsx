import { Steps, Tooltip } from 'antd'
import { CheckCircleFilled, CloseCircleFilled, MinusCircleOutlined } from '@ant-design/icons'
import type { StageDef } from '../types'
import { palette } from '../theme/tokens'

/**
 * Process progress bar for T03 workspaces.
 *
 * CRITICAL RULE (Workshop §12):
 *   "Do NOT make this a rigid wizard."
 *   Users may move between allowed sections while maintaining business context.
 *
 * So: completed stages are clickable, the bar never blocks navigation, and it
 * carries no "Next" button.
 *
 * Ref: 03_PAGE_TEMPLATES.md §14
 */

export interface ProcessProgressProps {
  stages: StageDef[]
  onStageClick?: (stage: StageDef) => void
  size?: 'default' | 'small'
}

export function ProcessProgress({ stages, onStageClick, size = 'small' }: ProcessProgressProps) {
  const currentIndex = Math.max(
    0,
    stages.findIndex((s) => s.state === 'current'),
  )

  return (
    <div style={{ padding: '12px 0' }}>
      <Steps
        size={size}
        current={currentIndex}
        labelPlacement="vertical"
        items={stages.map((stage) => {
          const clickable = stage.state === 'complete' || stage.state === 'current'
          const item = {
            title: (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: stage.state === 'current' ? 600 : 500,
                  color:
                    stage.state === 'current'
                      ? palette.primary[700]
                      : stage.state === 'complete'
                        ? palette.neutral[700]
                        : stage.state === 'error'
                          ? palette.error[600]
                          : palette.neutral[400],
                  cursor: clickable && onStageClick ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (clickable && onStageClick) onStageClick(stage)
                }}
              >
                {stage.label}
              </span>
            ),
            status:
              stage.state === 'complete'
                ? ('finish' as const)
                : stage.state === 'current'
                  ? ('process' as const)
                  : stage.state === 'error'
                    ? ('error' as const)
                    : ('wait' as const),
            icon:
              stage.state === 'complete' ? (
                <CheckCircleFilled style={{ color: palette.success[500] }} />
              ) : stage.state === 'error' ? (
                <CloseCircleFilled style={{ color: palette.error[500] }} />
              ) : stage.state === 'skipped' ? (
                <Tooltip title="Skipped">
                  <MinusCircleOutlined style={{ color: palette.neutral[400] }} />
                </Tooltip>
              ) : undefined,
          }
          return item
        })}
      />
    </div>
  )
}

/** Compact inline variant for list rows and board cards. */
export function StageDots({ stages }: { stages: StageDef[] }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {stages.map((s) => (
        <Tooltip key={s.key} title={s.label}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              display: 'inline-block',
              background:
                s.state === 'complete'
                  ? palette.success[500]
                  : s.state === 'current'
                    ? palette.primary[500]
                    : s.state === 'error'
                      ? palette.error[500]
                      : palette.neutral[300],
            }}
          />
        </Tooltip>
      ))}
    </span>
  )
}
