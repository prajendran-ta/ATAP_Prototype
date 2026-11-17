import React from 'react'
import { closedWonMediaPlanPlatforms, normalizePlatforms, resolveMediaPlan } from './campaignFlowLogic'
import { closedWonPausePlatformsForYear, useCampaignFlowState } from './campaignFlowStore'
import * as Styled from './CampaignProgressBar.styled'

type ProgressStep = { key: string; label: string; status: 'done' | 'current' | 'pending' }

// Sticky progress bar giving the user a frame of reference across the campaign-creation flow:
// Campaign Info, then one step per media-plan platform.
export const CampaignProgressBar: React.FC = () => {
  const {
    aiFlowType,
    useClosedWonMediaPlanScope,
    campaignInfoConfirmed,
    closedWonSetupPhase,
    closedWonPlatformId,
    closedWonCreatedPlatformIds,
    selectedMediaPlanYear,
    usCurrentPlanEdit,
    blocks,
  } = useCampaignFlowState()

  // Only show during the closed-won campaign-creation flow, and only once the AI analysis
  // for the create-campaign response has finished revealing (not during the analysis phase).
  if (aiFlowType !== 'campaign' || !useClosedWonMediaPlanScope) return null
  const createCampaignRevealed = blocks.some(block => block.kind === 'create-campaign' && block.revealed)
  if (!createCampaignRevealed) return null

  const platforms = closedWonMediaPlanPlatforms(
    normalizePlatforms(),
    undefined,
    resolveMediaPlan(selectedMediaPlanYear).mediaPlanTable,
  )
  if (platforms.length === 0) return null

  const steps: ProgressStep[] = [
    {
      key: 'campaign-info',
      label: 'Campaign Info',
      status: campaignInfoConfirmed ? 'done' : 'current',
    },
    ...platforms.map<ProgressStep>(platform => {
      const created = closedWonCreatedPlatformIds.includes(platform.id)
      const current = campaignInfoConfirmed && closedWonPlatformId === platform.id && !created
      return {
        key: platform.id,
        label: platform.name,
        status: created ? 'done' : current ? 'current' : 'pending',
      }
    }),
  ]

  // Final step: for the US Push flow this is the old-setup US cleanup (always shown); for other
  // plans it is the out-of-plan pause step, shown only when there are platforms to pause.
  const isUsPush = selectedMediaPlanYear === 'us-push'
  // Both US growth flows always show a final cleanup step; other plans show the out-of-plan pause
  // step only when there are platforms to pause.
  const hasCleanupStep = isUsPush || usCurrentPlanEdit
  const hasPauseStep = hasCleanupStep || closedWonPausePlatformsForYear(selectedMediaPlanYear).length > 0
  if (hasPauseStep) {
    steps.push({
      key: 'pause-campaigns',
      label: hasCleanupStep ? 'Pause/Update old campaigns' : 'Pause out-of-plan campaigns',
      status:
        closedWonSetupPhase === 'complete' ? 'done' : closedWonSetupPhase === 'pause-review' ? 'current' : 'pending',
    })
  }

  const total = steps.length
  const doneCount = steps.filter(step => step.status === 'done').length
  const currentIndex = steps.findIndex(step => step.status === 'current')
  const activeIndex = currentIndex === -1 ? (doneCount >= total ? total - 1 : doneCount) : currentIndex
  const activeStep = steps[activeIndex]
  // Once every platform's campaigns are created (the green success toast is shown), hide the
  // progress bar — there is no next step to track.
  if (closedWonSetupPhase === 'complete') return null

  return (
    <Styled.ProgressBar role='group' aria-label='Campaign creation progress' data-testid='campaign-progress-bar'>
      <Styled.ProgressContent>
        <Styled.ProgressSummary>
          <Styled.ProgressStepCount>{`Step ${activeIndex + 1} of ${total}`}</Styled.ProgressStepCount>
          <Styled.ProgressStepLabel>{activeStep?.label}</Styled.ProgressStepLabel>
        </Styled.ProgressSummary>
        <Styled.ProgressTrack>
          {steps.map(step => (
            <Styled.ProgressDot
              key={step.key}
              data-status={step.status}
              title={step.label}
              aria-label={`${step.label}: ${step.status}`}
            />
          ))}
        </Styled.ProgressTrack>
      </Styled.ProgressContent>
    </Styled.ProgressBar>
  )
}

export default CampaignProgressBar
