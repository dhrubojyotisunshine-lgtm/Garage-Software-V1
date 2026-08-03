import type { ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import type { ActionDef } from '../types'
import { ActionGroup } from './Actions'
import { palette } from '../theme/tokens'

const { Title, Text } = Typography

/**
 * Universal page header.
 *
 * LEFT:  title · description · context line
 * RIGHT: primary action (max 1) · secondary action (max 1) · More
 *
 * Ref: 03_PAGE_TEMPLATES.md §6
 */

export interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  /** Branch / date / record identity line. */
  context?: ReactNode
  primaryAction?: ActionDef
  secondaryAction?: ActionDef
  moreActions?: ActionDef[]
  /** Rendered between the title block and the actions (e.g. a date filter). */
  extra?: ReactNode
  /** Removes the bottom border, for headers sitting directly above tabs. */
  borderless?: boolean
}

export function PageHeader({
  title,
  description,
  context,
  primaryAction,
  secondaryAction,
  moreActions,
  extra,
  borderless,
}: PageHeaderProps) {
  return (
    <Flex
      align="flex-start"
      justify="space-between"
      gap={16}
      wrap
      style={{
        paddingBottom: 16,
        marginBottom: 16,
        borderBottom: borderless ? 'none' : `1px solid ${palette.neutral[200]}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <Title level={3} style={{ margin: 0, fontSize: 24, lineHeight: '32px' }}>
          {title}
        </Title>
        {description ? (
          <Text type="secondary" style={{ display: 'block', marginTop: 2 }}>
            {description}
          </Text>
        ) : null}
        {context ? (
          <div style={{ marginTop: 6, fontSize: 12, color: palette.neutral[500] }}>{context}</div>
        ) : null}
      </div>

      <Flex align="center" gap={12} wrap>
        {extra}
        <ActionGroup
          primary={primaryAction}
          secondary={secondaryAction}
          more={moreActions ?? []}
        />
      </Flex>
    </Flex>
  )
}

/** Section heading used inside tabs and forms. */
export function SectionHeading({
  title,
  description,
  extra,
}: {
  title: ReactNode
  description?: ReactNode
  extra?: ReactNode
}) {
  return (
    <Flex align="center" justify="space-between" style={{ marginBottom: 12 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: palette.neutral[900] }}>{title}</div>
        {description ? (
          <div style={{ fontSize: 12, color: palette.neutral[500], marginTop: 2 }}>
            {description}
          </div>
        ) : null}
      </div>
      {extra}
    </Flex>
  )
}
