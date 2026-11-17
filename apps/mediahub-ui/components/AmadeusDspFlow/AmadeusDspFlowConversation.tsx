import React, { useEffect, useState } from 'react'

import { Icon, Select, colors } from '@amadeus/react-design-factory'
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { SelectProps } from '@amadeus/react-design-factory/components/Select/Select.d'
import { buildServerOptionsQueryFn, mergeWithSelected, useServerOptions } from '@amadeus/react-utils'
import { AdvertiserTypesEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'

// AdvertiserQL is an ambient global namespace (advertiser-gql.d.ts) — referenced without an import.

import {
  AssistantBodyText,
  AssistantContent,
  AssistantDetailsCard,
  AssistantReasoningCheck,
  AssistantReasoningLine,
  AssistantReasoningLoader,
  AssistantReasoningPending,
  AssistantSectionCaret,
  AssistantSectionHeader,
  AssistantSectionRow,
  AssistantThinkingDots,
  AssistantTurn,
  ChatBubble,
  ChatBubbleContent,
  ChatBubbleTimestamp,
} from '../AmadeusMaxPanel/AmadeusMaxPanel.styled'
import {
  BasicInfoCard,
  BasicInfoCardHeading,
  BasicInfoConfirmButton,
  BasicInfoConfirmRow,
} from '../CampaignFlow/CampaignFlow.styled'
import {
  confirmDspAdvertiser,
  confirmDspInsertionOrder,
  setDspAdvertiser,
  setDspInsertionOrder,
  useAmadeusDspFlowState,
} from './amadeusDspFlowStore'

// Compact chat timestamp, e.g. "9 Aug · 6:30 PM" (local to this flow; the panel keeps its own copy).
const formatTurnTimestamp = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return ''
  const day = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${day} · ${time}`
}

const mapAdvertiserToOption = (advertiser: AdvertiserQL.Advertiser): SelectOption => ({
  label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
  value: advertiser.advertiserId,
})

// Animated reasoning checklist, matching the campaign flow's StepList: done = green check,
// active = spinner, pending = empty dot.
const StepList: React.FC<{ steps: string[]; completedSteps: number; animating: boolean }> = ({
  steps,
  completedSteps,
  animating,
}) => (
  <>
    {steps.map((step, index) => {
      const isDone = index < completedSteps
      const isActive = animating && index === completedSteps
      return (
        <AssistantReasoningLine key={step} active={isActive}>
          <AssistantReasoningCheck>
            {isDone ? (
              <Icon name='checkCircle' width={14} height={14} color={colors.forest_60} />
            ) : isActive ? (
              <AssistantReasoningLoader aria-label='In progress' />
            ) : (
              <AssistantReasoningPending />
            )}
          </AssistantReasoningCheck>
          <span>{step}</span>
        </AssistantReasoningLine>
      )
    })}
  </>
)

type AmadeusDspFlowConversationProps = {
  fullWidth?: boolean
  onContentChange?: () => void
}

// Renders the Amadeus DSP flow as a single scripted assistant turn: the user's prompt bubble, a
// collapsible "Analysis details" reasoning section that animates in, then the result — a short
// intro plus a searchable single-select advertiser picker with a Confirm button. No feedback /
// sources action bar here: the conversation is ongoing (the AI is waiting for the advertiser pick),
// so that bar is reserved for when a conversation ends.
const AmadeusDspFlowConversation: React.FC<AmadeusDspFlowConversationProps> = ({
  fullWidth = false,
  onContentChange,
}) => {
  const {
    active,
    userPrompt,
    timestamp,
    steps,
    completedSteps,
    revealed,
    selectedAdvertiser,
    confirmed,
    ioSteps,
    ioCompletedSteps,
    ioRevealed,
    insertionOrders,
    selectedInsertionOrder,
    insertionOrderConfirmed,
  } = useAmadeusDspFlowState()
  const [detailsExpanded, setDetailsExpanded] = useState(true)
  const [ioDetailsExpanded, setIoDetailsExpanded] = useState(true)

  const animating = active && !revealed
  // The IO reasoning only runs once the advertiser is confirmed.
  const ioAnimating = active && confirmed && !ioRevealed

  // Collapse the reasoning details once the steps finish and the result is revealed.
  useEffect(() => {
    if (revealed) setDetailsExpanded(false)
  }, [revealed])

  // Same for the IO reasoning section.
  useEffect(() => {
    if (ioRevealed) setIoDetailsExpanded(false)
  }, [ioRevealed])

  // Server-backed advertiser search, mirroring the Advertiser (BPID) filter used elsewhere in the
  // app. Query is skipped until the Select requests options (skip=true + lazy refetch).
  const { refetch: refetchAdvertisersOptions } = useGetAdvertiserOptionsQuery(true)
  const advertiserOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchAdvertisersOptions,
      buildVars: (search, pagination) => ({
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: (search ?? '').trim(),
          isFollowingOnly: false,
          paging: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.advertisers?.advertisers ?? [],
      mapToOption: adv => mapAdvertiserToOption(adv as AdvertiserQL.Advertiser),
    }),
    pageSize: 20,
  })

  // Keep the picked option available to the Select even once the search list has moved on.
  // Typed as a plain {label,value} (what mergeWithSelected expects), not DF's SelectOption.
  const selectedOption: { label: string; value: string | number } | null = selectedAdvertiser
    ? { label: selectedAdvertiser.label, value: selectedAdvertiser.advertiserId }
    : null

  // Scroll the chat as the DSP turn appears / advances (mirrors CampaignFlowConversation).
  const signature = [
    active,
    completedSteps,
    revealed,
    selectedAdvertiser?.advertiserId ?? '',
    confirmed,
    ioCompletedSteps,
    ioRevealed,
    selectedInsertionOrder?.insertionOrderId ?? '',
    insertionOrderConfirmed,
  ].join(':')
  useEffect(() => {
    if (active) onContentChange?.()
  }, [signature])

  if (!active) return null

  const handleChange: SelectProps['onChange'] = (value, option) => {
    if (value === undefined || value === null || value === '') {
      setDspAdvertiser(null)
      return
    }
    const picked = Array.isArray(option) ? option[0] : option
    const rawLabel = picked?.label
    const label = typeof rawLabel === 'string' ? rawLabel : String(value)
    setDspAdvertiser({ advertiserId: value, label })
  }

  // IO options come straight from the (mock) list built for the confirmed advertiser — a short,
  // client-side list, so no server search is needed here.
  const insertionOrderOptions: SelectOption[] = insertionOrders.map(io => ({ label: io.name, value: io.id }))

  const handleInsertionOrderChange: SelectProps['onChange'] = (value, option) => {
    if (value === undefined || value === null || value === '') {
      setDspInsertionOrder(null)
      return
    }
    const picked = Array.isArray(option) ? option[0] : option
    const rawLabel = picked?.label
    const label = typeof rawLabel === 'string' ? rawLabel : String(value)
    setDspInsertionOrder({ insertionOrderId: String(value), label })
  }

  return (
    <AssistantTurn data-testid='amadeus-dsp-flow'>
      {userPrompt ? (
        <ChatBubble author='user'>
          <ChatBubbleContent>{userPrompt}</ChatBubbleContent>
          <ChatBubbleTimestamp data-chat-bubble-timestamp='true'>{formatTurnTimestamp(timestamp)}</ChatBubbleTimestamp>
        </ChatBubble>
      ) : null}

      <AssistantContent>
        {steps.length > 0 ? (
          <>
            <AssistantSectionRow>
              <Icon name='sparkles' width={12} height={12} color={colors.violet_60} />
              <AssistantSectionCaret expanded={detailsExpanded}>
                <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
              </AssistantSectionCaret>
              <AssistantSectionHeader
                type='button'
                aria-expanded={detailsExpanded}
                onClick={() => {
                  if (!animating) setDetailsExpanded(current => !current)
                }}
              >
                Analysis details
              </AssistantSectionHeader>
              {animating ? (
                <AssistantThinkingDots aria-label='Amadeus Max is working'>
                  <span />
                  <span />
                  <span />
                </AssistantThinkingDots>
              ) : null}
            </AssistantSectionRow>
            <AssistantDetailsCard fullWidth={fullWidth} expanded={detailsExpanded}>
              <StepList steps={steps} completedSteps={revealed ? steps.length : completedSteps} animating={animating} />
            </AssistantDetailsCard>
          </>
        ) : null}

        {revealed ? (
          <>
            <AssistantBodyText>
              Let&apos;s set up your campaign in Amadeus DSP. First, choose the advertiser you&apos;re creating
              campaigns for.
            </AssistantBodyText>

            {confirmed && selectedAdvertiser ? (
              <AssistantBodyText data-testid='amadeus-dsp-advertiser-confirmed'>
                <Icon name='checkCircle' width={14} height={14} color={colors.forest_70} title='Advertiser selected' />{' '}
                Advertiser <strong>{selectedAdvertiser.label}</strong> selected. Next, choose the insertion order (IO)
                you want to create campaigns under.
              </AssistantBodyText>
            ) : (
              <BasicInfoCard>
                <BasicInfoCardHeading>Select an advertiser</BasicInfoCardHeading>
                <Select
                  label='Advertiser (BPID)'
                  id='amadeus-dsp-advertiser-sel'
                  placeholder='Search advertisers'
                  showSearch
                  popupMatchSelectWidth={420}
                  allowClear
                  options={mergeWithSelected(advertiserOptions.options, selectedOption ? [selectedOption] : [])}
                  value={selectedAdvertiser ? selectedAdvertiser.advertiserId : undefined}
                  onChange={handleChange}
                  loading={advertiserOptions.loading}
                  onSearch={advertiserOptions.onSearch}
                  onBlur={advertiserOptions.onBlur}
                  onPopupScroll={advertiserOptions.onPopupScroll}
                  filterMode='server'
                />
                <BasicInfoConfirmRow style={{ marginTop: 16 }}>
                  <BasicInfoConfirmButton
                    type='button'
                    disabled={!selectedAdvertiser}
                    onClick={() => confirmDspAdvertiser()}
                    data-testid='amadeus-dsp-advertiser-confirm'
                  >
                    Confirm
                  </BasicInfoConfirmButton>
                </BasicInfoConfirmRow>
              </BasicInfoCard>
            )}

            {/* IO step — gated behind the advertiser confirmation. A short "loading IOs" analysis
                section, then the IO-select card with its own confirm gate. */}
            {confirmed ? (
              <>
                {ioSteps.length > 0 ? (
                  <>
                    <AssistantSectionRow>
                      <Icon name='sparkles' width={12} height={12} color={colors.violet_60} />
                      <AssistantSectionCaret expanded={ioDetailsExpanded}>
                        <Icon name='caretDown' width={10} height={10} color={colors.cloud_70} />
                      </AssistantSectionCaret>
                      <AssistantSectionHeader
                        type='button'
                        aria-expanded={ioDetailsExpanded}
                        onClick={() => {
                          if (!ioAnimating) setIoDetailsExpanded(current => !current)
                        }}
                      >
                        Analysis details
                      </AssistantSectionHeader>
                      {ioAnimating ? (
                        <AssistantThinkingDots aria-label='Amadeus Max is working'>
                          <span />
                          <span />
                          <span />
                        </AssistantThinkingDots>
                      ) : null}
                    </AssistantSectionRow>
                    <AssistantDetailsCard fullWidth={fullWidth} expanded={ioDetailsExpanded}>
                      <StepList
                        steps={ioSteps}
                        completedSteps={ioRevealed ? ioSteps.length : ioCompletedSteps}
                        animating={ioAnimating}
                      />
                    </AssistantDetailsCard>
                  </>
                ) : null}

                {ioRevealed ? (
                  <>
                    <AssistantBodyText>
                      {insertionOrders.length > 1
                        ? `I found ${insertionOrders.length} insertion orders available for this advertiser. Select the one you want to use.`
                        : 'I found the insertion order available for this advertiser. Confirm the one you want to use.'}
                    </AssistantBodyText>

                    {insertionOrderConfirmed && selectedInsertionOrder ? (
                      <AssistantBodyText data-testid='amadeus-dsp-io-confirmed'>
                        <Icon
                          name='checkCircle'
                          width={14}
                          height={14}
                          color={colors.forest_70}
                          title='Insertion order selected'
                        />{' '}
                        Insertion order <strong>{selectedInsertionOrder.label}</strong> selected. Next, we&apos;ll
                        configure the campaign details.
                      </AssistantBodyText>
                    ) : (
                      <BasicInfoCard>
                        <BasicInfoCardHeading>Select an insertion order</BasicInfoCardHeading>
                        <Select
                          label='Insertion order (IO)'
                          id='amadeus-dsp-io-sel'
                          placeholder='Select an insertion order'
                          popupMatchSelectWidth={520}
                          allowClear
                          options={insertionOrderOptions}
                          value={selectedInsertionOrder ? selectedInsertionOrder.insertionOrderId : undefined}
                          onChange={handleInsertionOrderChange}
                        />
                        <BasicInfoConfirmRow style={{ marginTop: 16 }}>
                          <BasicInfoConfirmButton
                            type='button'
                            disabled={!selectedInsertionOrder}
                            onClick={() => confirmDspInsertionOrder()}
                            data-testid='amadeus-dsp-io-confirm'
                          >
                            Confirm
                          </BasicInfoConfirmButton>
                        </BasicInfoConfirmRow>
                      </BasicInfoCard>
                    )}
                  </>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </AssistantContent>
    </AssistantTurn>
  )
}

export default AmadeusDspFlowConversation
