import React from 'react'
import { Container, Icon, Text } from '@amadeus/react-design-factory'
import { StatusChip, VersionsButton } from './Mediaplanner.styled'
import { mediaplannerStatusConfig, mediaplannerStatusChipTone } from './mediaplanUtils'

interface PlanTitleHeaderProps {
  /** The H3 page title — the plan name (or a "New Media Plan" placeholder). */
  title: string
  /** Plan status (StatusEnum value or the raw 'NEW' string). Omit to render the title alone. */
  status?: string | null
  /** id for the H3 — kept per-step so existing selectors/tests still resolve. */
  titleId?: string
  /** When provided, renders a right-aligned "Versions (N)" button that opens the versions drawer. */
  versionCount?: number
  onOpenVersions?: () => void
}

/**
 * Shared wizard header: the plan-name H3 with the solid status chip beside it, and an optional
 * right-aligned "Versions (N)" button. Used by all four media-planner steps so the header looks
 * identical everywhere. The chip renders only when a known status is provided; the Versions button
 * renders only when onOpenVersions is given.
 */
export const PlanTitleHeader: React.FC<PlanTitleHeaderProps> = ({
  title,
  status,
  titleId,
  versionCount,
  onOpenVersions,
}) => {
  const tone = status ? mediaplannerStatusChipTone[status] : undefined
  return (
    <Container.Header>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, width: '100%' }}>
        <Text.H3 id={titleId}>{title}</Text.H3>
        {status && tone ? (
          <StatusChip tone={tone}>{mediaplannerStatusConfig[status]?.label ?? status}</StatusChip>
        ) : null}
        {onOpenVersions ? (
          <VersionsButton
            type='button'
            id='mediaplan-versions-open-btn'
            style={{ marginLeft: 'auto' }}
            onClick={onOpenVersions}
          >
            <Icon name='clockRotateLeft' width={14} height={14} color='currentColor' />
            {`Versions${versionCount ? ` (${versionCount})` : ''}`}
          </VersionsButton>
        ) : null}
      </span>
    </Container.Header>
  )
}
