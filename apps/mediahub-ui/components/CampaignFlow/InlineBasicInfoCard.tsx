import React, { useEffect, useState } from 'react'
import { Input, Toggle } from '@amadeus/react-design-factory'
import { AiIndicator } from './AiIndicator'
import { campaignFlowData } from './campaignFlowData'
import {
  closedWonMediaPlanPlatforms,
  formatDisplayDate,
  groupPlatformsByChannel,
  normalizePlatforms,
  resolveMediaPlan,
  type MediaPlanYear,
} from './campaignFlowLogic'
import { confirmCampaignInfo, ensureDraft, updateDraftFields, useCampaignFlowState } from './campaignFlowStore'
import * as Styled from './CampaignFlow.styled'

// Single source of truth for the campaign-name length bound.
// Resolves the Req 1.4 (1-120) vs Req 3.1/3.5 (1-255) inconsistency; defaults to 255.
export const CAMPAIGN_NAME_MAX = 255
const MAX_PROPERTIES = 100
const EMPTY_STATE = '—'

export type CampaignNameValidation = { ok: true; value: string } | { ok: false; reason: 'empty' | 'too-long' }

export const validateCampaignName = (raw: string): CampaignNameValidation => {
  const trimmed = raw.trim()
  if (trimmed.length < 1) return { ok: false, reason: 'empty' }
  if (trimmed.length > CAMPAIGN_NAME_MAX) return { ok: false, reason: 'too-long' }
  return { ok: true, value: raw }
}

const CAMPAIGN_NAME_ERROR = `Campaign name is required and must be 1 to ${CAMPAIGN_NAME_MAX} characters`
const OBA_SUMMARY = 'Optimized Budget Allocation moves spend to the best-performing platforms automatically.'
const OBA_REASONS = [
  'Spend is allocated across the platforms in the media plan',
  'Past campaigns improved ROAS with OBA enabled',
]
const NAME_SUMMARY = 'Named for the advertiser and the full-year 2027 campaign period.'
const NAME_REASONS = ['Follows the campaign naming convention', 'Keeps reporting aligned with the media plan']
const CONFIRM_HINT =
  'Click Confirm when you are happy with the general campaign info and would move on to creating the campaigns on the different platforms.'

type ReadOnlyRow = { label: string; value: string | null }

const formatBudget = (value: number | null | undefined): string | null => {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  return `$${value.toLocaleString('en-US')}`
}

export const buildReadOnlyRows = (
  data = campaignFlowData,
  // Flight dates + total budget come from the active draft when present (so plan-specific values
  // like the US Push plan's Jan–Jun dates and $50,000 budget show here), falling back to basicInfo.
  draft?: { startDate: string; endDate: string; totalBudget: number },
  // Current-plan edit mode: show the Media plan name instead of Total budget (campaigns are added
  // into an existing plan, so the budget field is not relevant here).
  options?: { usCurrentPlanEdit?: boolean; mediaPlanName?: string },
): ReadOnlyRow[] => {
  const rows: ReadOnlyRow[] = [
    { label: 'Advertiser', value: data.basicInfo.advertiser || null },
    { label: 'Flight start date', value: formatDisplayDate(draft?.startDate ?? data.basicInfo.startDate) || null },
    { label: 'Flight end date', value: formatDisplayDate(draft?.endDate ?? data.basicInfo.endDate) || null },
  ]
  if (options?.usCurrentPlanEdit) {
    rows.push({ label: 'Media plan', value: options.mediaPlanName ?? null })
  } else {
    rows.push({ label: 'Total budget', value: formatBudget(draft?.totalBudget ?? data.basicInfo.totalBudget) })
  }
  return rows
}

export const cappedProperties = (properties: string[]): string[] => properties.slice(0, MAX_PROPERTIES)

// Platforms as defined in the media plan, grouped by channel, e.g.
// "Paid search: Google Ads, Bing · Social: Meta, TikTok".
export const buildPlatformsByChannel = (year?: MediaPlanYear): { channel: string; platforms: string }[] => {
  const mediaPlanTable = year ? resolveMediaPlan(year).mediaPlanTable : undefined
  const platforms = closedWonMediaPlanPlatforms(normalizePlatforms(), campaignFlowData, mediaPlanTable)
  return groupPlatformsByChannel(platforms).map(group => ({
    channel: group.channel,
    platforms: group.platforms.map(platform => platform.name).join(', '),
  }))
}

export const InlineBasicInfoCard: React.FC = () => {
  const { draft, closedWonSetupPhase, campaignInfoConfirmed, selectedMediaPlanYear, usCurrentPlanEdit } =
    useCampaignFlowState()
  const activeDraft = draft ?? ensureDraft()

  const [nameText, setNameText] = useState(activeDraft.campaignName)
  const [nameError, setNameError] = useState<string | undefined>(undefined)

  // Keep the local text in sync when the stored name changes elsewhere (e.g. canvas edits).
  useEffect(() => {
    setNameText(activeDraft.campaignName)
  }, [activeDraft.campaignName])

  const editable = closedWonSetupPhase !== 'complete' && !campaignInfoConfirmed
  const rows = buildReadOnlyRows(campaignFlowData, activeDraft, {
    usCurrentPlanEdit,
    mediaPlanName: resolveMediaPlan(selectedMediaPlanYear).mediaPlanName,
  })
  const properties = cappedProperties(campaignFlowData.properties)
  const platformsByChannel = buildPlatformsByChannel(selectedMediaPlanYear)

  // AI styling stays only while the value equals the AI recommendation; once a human changes
  // it to a different value, the field reverts to the standard component styling.
  const nameMatchesAi = nameText.trim() === campaignFlowData.basicInfo.campaignName.trim()
  const obaMatchesAi = activeDraft.manageBudgetByOba === campaignFlowData.basicInfo.manageBudgetByOba

  const commitName = () => {
    const result = validateCampaignName(nameText)
    if (!result.ok) {
      setNameError(CAMPAIGN_NAME_ERROR)
      setNameText(activeDraft.campaignName)
      return
    }
    setNameError(undefined)
    updateDraftFields({ campaignName: result.value })
  }

  const handleConfirm = () => {
    const result = validateCampaignName(nameText)
    if (!result.ok) {
      setNameError(CAMPAIGN_NAME_ERROR)
      setNameText(activeDraft.campaignName)
      return
    }
    setNameError(undefined)
    updateDraftFields({ campaignName: result.value })
    confirmCampaignInfo()
  }

  const renderValue = (value: string | null) =>
    value ? value : <Styled.BasicInfoEmptyState>{EMPTY_STATE}</Styled.BasicInfoEmptyState>

  return (
    <>
      <Styled.BasicInfoCard data-testid='inline-basic-info-card'>
        <Styled.BasicInfoCardHeading>Campaign Info</Styled.BasicInfoCardHeading>

        <Styled.BasicInfoTableWrap>
          <Styled.BasicInfoTable aria-label='Campaign info'>
            <tbody>
              {rows.map(row => (
                <tr key={row.label}>
                  <th scope='row'>
                    <Styled.BasicInfoLabelCell>{row.label}</Styled.BasicInfoLabelCell>
                  </th>
                  <td>{renderValue(row.value)}</td>
                </tr>
              ))}

              <tr>
                <th scope='row'>
                  <Styled.BasicInfoLabelCell>Platforms</Styled.BasicInfoLabelCell>
                </th>
                <td>
                  {platformsByChannel.length > 0 ? (
                    <Styled.BasicInfoPropertyList>
                      {platformsByChannel.map(group => (
                        <li key={group.channel}>
                          <strong>{group.channel}:</strong> {group.platforms}
                        </li>
                      ))}
                    </Styled.BasicInfoPropertyList>
                  ) : (
                    <Styled.BasicInfoEmptyState>No platforms available</Styled.BasicInfoEmptyState>
                  )}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <Styled.BasicInfoLabelCell>Properties</Styled.BasicInfoLabelCell>
                </th>
                <td>
                  {properties.length > 0 ? (
                    <Styled.BasicInfoPropertyList>
                      {properties.map(property => (
                        <li key={property}>{property}</li>
                      ))}
                    </Styled.BasicInfoPropertyList>
                  ) : (
                    <Styled.BasicInfoEmptyState>No properties available</Styled.BasicInfoEmptyState>
                  )}
                </td>
              </tr>

              {/* Editable fields live at the end of the table; they lock in place on confirm. */}
              <tr>
                <th scope='row'>
                  <Styled.BasicInfoLabelCell>
                    <label htmlFor='campaign-info-name-inp'>
                      Campaign name
                      <Styled.BasicInfoRequired> *</Styled.BasicInfoRequired>
                    </label>
                    {campaignInfoConfirmed || !nameMatchesAi ? null : (
                      <AiIndicator summary={NAME_SUMMARY} reasons={NAME_REASONS} />
                    )}
                  </Styled.BasicInfoLabelCell>
                </th>
                <td>
                  {campaignInfoConfirmed ? (
                    renderValue(activeDraft.campaignName)
                  ) : (
                    <Styled.BasicInfoAiField data-ai-filled={String(nameMatchesAi)}>
                      <Input
                        id='campaign-info-name-inp'
                        value={nameText}
                        disabled={!editable}
                        status={nameError ? 'error' : undefined}
                        errorMessage={nameError}
                        onChange={event => setNameText(event.target.value)}
                        onBlur={commitName}
                        onPressEnter={commitName}
                      />
                    </Styled.BasicInfoAiField>
                  )}
                </td>
              </tr>

              <tr>
                <th scope='row'>
                  <Styled.BasicInfoLabelCell>
                    Manage budget by OBA
                    {campaignInfoConfirmed || !obaMatchesAi ? null : (
                      <AiIndicator summary={OBA_SUMMARY} reasons={OBA_REASONS} />
                    )}
                  </Styled.BasicInfoLabelCell>
                </th>
                <td>
                  {campaignInfoConfirmed ? (
                    activeDraft.manageBudgetByOba ? (
                      'On'
                    ) : (
                      'Off'
                    )
                  ) : (
                    <>
                      <Styled.BasicInfoToggleCell>
                        <Toggle
                          id='campaign-info-oba'
                          checked={activeDraft.manageBudgetByOba}
                          disabled={!editable}
                          onChange={(checked: boolean) => updateDraftFields({ manageBudgetByOba: checked })}
                        />
                      </Styled.BasicInfoToggleCell>
                      <Styled.BasicInfoFieldHint>
                        Distributes spend across platforms automatically based on performance.
                      </Styled.BasicInfoFieldHint>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </Styled.BasicInfoTable>
        </Styled.BasicInfoTableWrap>
      </Styled.BasicInfoCard>

      {campaignInfoConfirmed ? null : (
        <Styled.BasicInfoConfirmRow>
          <Styled.BasicInfoConfirmHint>{CONFIRM_HINT}</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton type='button' onClick={handleConfirm} data-testid='inline-basic-info-confirm'>
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      )}
    </>
  )
}
