import React, { useMemo, useState } from 'react'
import { getMockSalesforcePlanForAdvertiser } from '@mediahub/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans'
import { AssistantBodyText } from '../AmadeusMaxPanel/AmadeusMaxPanel.styled'
import { LONDONER, LONDONER_CHANNELS } from '../../shared/londonerHotel'
import { getDemoAdvertiserByBpid } from '../../shared/demoAdvertisers'
import { formatDisplayDate, resolveMediaPlan } from './campaignFlowLogic'
import { confirmMediaPlanSelection, useCampaignFlowState, type FlowMediaPlanChoice } from './campaignFlowStore'
import * as Styled from './CampaignFlow.styled'

type PlanOption = {
  id: string
  name: string
  statusLabel: 'Active' | 'Scheduled' | 'Signed off'
  description: string
  choice: FlowMediaPlanChoice
}

const CONFIRM_HINT = 'Select the media plan you want to create campaigns for, then click Confirm.'

const money = (value: number, currency: string) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

/**
 * Media plans the advertiser can create campaigns for. Advertisers with a signed-off Media Planner plan (The
 * Londoner Hotel and the demo advertisers) offer THAT plan (a new setup, flight in 2027). Advertisers without
 * one get the flow's own 2027 and 2026 plans (named for the chosen advertiser).
 */
const buildPlanOptions = (bpid: string): PlanOption[] => {
  const options: PlanOption[] = []
  const planner = getMockSalesforcePlanForAdvertiser(bpid)
  const registry = bpid === LONDONER.bpid ? LONDONER : getDemoAdvertiserByBpid(bpid)

  if (planner && registry) {
    options.push({
      id: planner.id,
      name: planner.planName,
      statusLabel: 'Signed off',
      description: `Flight ${planner.startDate} → ${planner.endDate} · Total budget ${money(planner.contractBudgetTarget, planner.currency)}`,
      choice: {
        name: planner.planName,
        year: '2027',
        override: {
          startDate: registry.startDate,
          endDate: registry.endDate,
          // The Londoner's flow creates Google Ads + Amadeus DSP campaigns only, so the budget being allocated
          // is those two channels (the rest of the plan, video and metasearch, is created separately).
          totalBudget:
            bpid === LONDONER.bpid
              ? LONDONER_CHANNELS.paidSearch.budget + LONDONER_CHANNELS.display.budget
              : planner.contractBudgetTarget,
        },
      },
    })
  } else {
    const plan2027 = resolveMediaPlan('2027')
    options.push({
      id: 'plan-2027',
      name: plan2027.mediaPlanName,
      statusLabel: 'Scheduled',
      description: `Flight ${formatDisplayDate(plan2027.startDate)} → ${formatDisplayDate(plan2027.endDate)} · Total budget ${plan2027.mediaPlanTable.total}`,
      choice: { name: plan2027.mediaPlanName, year: '2027' },
    })
  }

  // A signed-off Media Planner plan is the only option: the flow's example 2026 plan is a different, already
  // running setup that does not exist for this advertiser.
  if (planner && registry) return options

  const plan2026 = resolveMediaPlan('2026')
  options.push({
    id: 'plan-2026',
    name: plan2026.mediaPlanName,
    statusLabel: 'Active',
    description: `Flight ${formatDisplayDate(plan2026.startDate)} → ${formatDisplayDate(plan2026.endDate)} · Total budget ${plan2026.mediaPlanTable.total}`,
    choice: { name: plan2026.mediaPlanName, year: '2026' },
  })
  return options
}

/**
 * Second step of 'Create campaigns with Max': which media plan are the campaigns for? Radio list +
 * Confirm; after Confirm the card collapses to a read-only line and the campaign creation continues.
 */
const MediaPlanSelectCard: React.FC<{ fullWidth: boolean; actionsDisabled: boolean }> = ({ actionsDisabled }) => {
  const { flowAdvertiser, mediaPlanConfirmed, flowMediaPlan } = useCampaignFlowState()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const options = useMemo(() => (flowAdvertiser ? buildPlanOptions(flowAdvertiser.bpid) : []), [flowAdvertiser])
  const selected = options.find(option => option.id === selectedId) ?? null
  const locked = actionsDisabled || mediaPlanConfirmed

  if (mediaPlanConfirmed && flowMediaPlan) {
    return (
      <AssistantBodyText>
        Creating campaigns for the media plan <strong>{flowMediaPlan.name}</strong>.
      </AssistantBodyText>
    )
  }

  return (
    <>
      <AssistantBodyText>
        Which media plan would you like to create campaigns for{flowAdvertiser ? ` ${flowAdvertiser.name}` : ''}?
      </AssistantBodyText>
      <Styled.BasicInfoCard data-testid='media-plan-select-card'>
        <Styled.BasicInfoCardHeading>Select a media plan</Styled.BasicInfoCardHeading>
        <Styled.UsGrowthOptionList role='radiogroup' aria-label='Select a media plan'>
          {options.map(option => {
            const isSelected = selectedId === option.id
            return (
              <Styled.UsGrowthOption
                key={option.id}
                type='button'
                role='radio'
                aria-checked={isSelected}
                selected={isSelected}
                disabled={locked}
                onClick={() => setSelectedId(option.id)}
              >
                <span className='us-growth-option-radio' aria-hidden='true' />
                <Styled.UsGrowthOptionBody>
                  <Styled.UsGrowthOptionTitleRow>
                    <Styled.UsGrowthOptionTitle>{option.name}</Styled.UsGrowthOptionTitle>
                    {/* A signed-off (Media Planner) plan needs no chip; only the flow's own plans show their status. */}
                    {option.statusLabel === 'Signed off' ? null : option.statusLabel === 'Active' ? (
                      <Styled.UsGrowthOptionRecommended>{option.statusLabel}</Styled.UsGrowthOptionRecommended>
                    ) : (
                      <Styled.PlanPickerStatusTag>{option.statusLabel}</Styled.PlanPickerStatusTag>
                    )}
                  </Styled.UsGrowthOptionTitleRow>
                  <Styled.UsGrowthOptionDescription>{option.description}</Styled.UsGrowthOptionDescription>
                </Styled.UsGrowthOptionBody>
              </Styled.UsGrowthOption>
            )
          })}
        </Styled.UsGrowthOptionList>

        <Styled.BasicInfoConfirmRow style={{ marginTop: 16 }}>
          <Styled.BasicInfoConfirmHint>{CONFIRM_HINT}</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton
            type='button'
            disabled={locked || !selected}
            data-testid='media-plan-select-confirm'
            onClick={() => selected && confirmMediaPlanSelection(selected.choice)}
          >
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      </Styled.BasicInfoCard>
    </>
  )
}

export default MediaPlanSelectCard
