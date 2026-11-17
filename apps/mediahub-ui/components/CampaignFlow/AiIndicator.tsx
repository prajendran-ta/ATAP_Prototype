import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@amadeus/react-design-factory'
import { chipColor, chipLabel } from './campaignFlowLogic'
import * as Styled from './CampaignFlow.styled'

type AiIndicatorProps = {
  label?: string
  heading?: string
  summary: string
  reasons?: string[]
  showSources?: boolean
}

export const AiIndicator: React.FC<AiIndicatorProps> = ({
  label = 'AI',
  heading = 'Suggested by MAX',
  summary,
  reasons = [],
  showSources = false,
}) => {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <Styled.AiIndicatorWrap ref={wrapRef}>
      <Styled.AiIndicatorButton
        type='button'
        aria-label={`${heading}: ${summary}`}
        aria-expanded={open}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(current => !current)
        }}
      >
        <Icon name='sparkles' width={10} height={10} />
        {label}
      </Styled.AiIndicatorButton>
      {open ? (
        <Styled.AiPopover role='dialog' aria-label={heading}>
          <Styled.AiPopoverHeading>
            <Icon name='sparkles' width={12} height={12} />
            {heading}
          </Styled.AiPopoverHeading>
          <div>{summary}</div>
          {reasons.length > 0 ? (
            <Styled.AiPopoverReasons>
              {reasons.map(reason => (
                <li key={reason}>{reason}</li>
              ))}
            </Styled.AiPopoverReasons>
          ) : null}
          {showSources ? (
            <Styled.AiPopoverAction type='button' onClick={() => setOpen(false)}>
              View sources
            </Styled.AiPopoverAction>
          ) : null}
        </Styled.AiPopover>
      ) : null}
    </Styled.AiIndicatorWrap>
  )
}

export const PlatformChip: React.FC<{ chipKey: string; label?: string }> = ({ chipKey, label }) => (
  <Styled.PlatformChip $color={chipColor(chipKey)}>{label ?? chipLabel(chipKey)}</Styled.PlatformChip>
)
