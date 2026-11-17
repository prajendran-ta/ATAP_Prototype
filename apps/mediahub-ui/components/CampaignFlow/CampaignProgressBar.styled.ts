import styled from '@emotion/styled'
import { colors } from '@amadeus/react-design-factory'

export const ProgressBar = styled.div`
  padding: 8px 12px 10px;
  border-top: 1px solid ${colors.cloud_20};
  background: ${colors.cloud_0};
`

// Inner column constrained to the same width as the conversation/composer content
// (BodyContent / ComposerContent = 800px, centered) so the stepper lines up with the
// content area in full-screen mode instead of stretching edge to edge.
export const ProgressContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 800px;
  min-width: 0;
  margin: 0 auto;
`

export const ProgressSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`

export const ProgressStepCount = styled.span`
  color: ${colors.cloud_80};
  font-size: 11px;
  line-height: 14px;
  font-weight: 600;
  white-space: nowrap;
`

export const ProgressStepLabel = styled.span`
  color: ${colors.cloud_100};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ProgressTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 2px;
`

export const ProgressDot = styled.span`
  flex: 1 1 auto;
  min-width: 10px;
  height: 6px;
  border-radius: 3px;
  background: ${colors.cloud_30};

  &[data-status='done'] {
    background: ${colors.forest_60};
  }

  &[data-status='current'] {
    background: ${colors.sky_60};
  }
`
