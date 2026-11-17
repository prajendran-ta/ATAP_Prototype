import React, { useMemo, useState } from 'react'
import { Select } from '@amadeus/react-design-factory'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { AssistantBodyText } from '../AmadeusMaxPanel/AmadeusMaxPanel.styled'
import { LONDONER, LONDONER_NAMES } from '../../shared/londonerHotel'
import { DEMO_ADVERTISERS } from '../../shared/demoAdvertisers'
import { londonerFirst } from '../../shared/londonerFollowStore'
import { confirmAdvertiserSelection, useCampaignFlowState } from './campaignFlowStore'
import * as Styled from './CampaignFlow.styled'

type AdvertiserChoice = { id: string; name: string; bpid: string }
type SignedOffAdvertiser = AdvertiserChoice & { mediaPlanName: string }

/**
 * The 5 advertisers suggested first: the ones with a SIGNED-OFF media plan (closed-won, ready to create
 * campaigns for). The Londoner Hotel is always first. Ids/names come from the demo registry; when the
 * advertiser list returns the same BPID (e.g. a backend-owned advertiser) its real id is used instead.
 */
const SIGNED_OFF_KEYS = ['howard', 'mulia', 'elpalace', 'trumplv']
const SIGNED_OFF: SignedOffAdvertiser[] = [
  {
    id: String(LONDONER.advertiserId),
    name: LONDONER.name,
    bpid: LONDONER.bpid,
    mediaPlanName: LONDONER_NAMES.mediaPlan,
  },
  ...SIGNED_OFF_KEYS.map(key => DEMO_ADVERTISERS.find(advertiser => advertiser.key === key)).flatMap(advertiser =>
    advertiser
      ? [{ id: String(advertiser.advertiserId), name: advertiser.name, bpid: advertiser.bpid, mediaPlanName: advertiser.mediaPlanName }]
      : [],
  ),
]

const CONFIRM_HINT = 'Select the advertiser you want to create campaigns for, then click Confirm.'
const SIGNED_OFF_TITLE = 'Advertisers with a signed-off media plan'

/**
 * First step of 'Create campaigns with Max': which advertiser are the campaigns for?
 *  - the 5 advertisers with a signed-off media plan (The Londoner Hotel first), as a radio list,
 *  - or any advertiser from a searchable dropdown with the complete list.
 * Confirm continues into the campaign-creation flow (see confirmAdvertiserSelection). After Confirm the
 * card collapses to a read-only line, like the other inline confirmation cards.
 */
const AdvertiserSelectCard: React.FC<{ fullWidth: boolean; actionsDisabled: boolean }> = ({ actionsDisabled }) => {
  const { advertiserConfirmed, flowAdvertiser } = useCampaignFlowState()
  const { data, loading } = useGetAdvertiserOptionsQuery()
  // One choice overall (selectedId). `dropdownId` is set only when it was made in the dropdown, so the
  // dropdown stays empty unless the user picks from it (it does not mirror the radio list), and the
  // radio list shows no selection while a dropdown choice is active.
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dropdownId, setDropdownId] = useState<string | null>(null)

  const advertisers: AdvertiserChoice[] = useMemo(() => {
    const rows = (data?.advertisers?.advertisers ?? []).map(advertiser => ({
      id: String(advertiser.advertiserId),
      name: advertiser.advertiserName,
      bpid: String(advertiser.bpid).toUpperCase(),
    }))
    // Alphabetical, with The Londoner Hotel (the followed demo advertiser) always at the top.
    const sorted = rows.sort((a, b) => a.name.localeCompare(b.name))
    return londonerFirst(sorted, a => a.bpid === LONDONER.bpid)
  }, [data])

  // Suggested advertisers (signed-off media plan), with the real id when the advertiser list has the BPID.
  const suggested: SignedOffAdvertiser[] = SIGNED_OFF.map(entry => {
    const match = advertisers.find(advertiser => advertiser.bpid === entry.bpid.toUpperCase())
    return match ? { ...entry, id: match.id } : entry
  })
  // A suggested advertiser is selectable even if the full list hasn't loaded (offline demo).
  const selectable: AdvertiserChoice[] = [...suggested, ...advertisers.filter(a => !suggested.some(s => s.bpid === a.bpid))]
  const selected = selectable.find(advertiser => advertiser.id === selectedId) ?? null
  const locked = actionsDisabled || advertiserConfirmed

  if (advertiserConfirmed && flowAdvertiser) {
    return (
      <AssistantBodyText>
        Creating campaigns for <strong>{flowAdvertiser.name}</strong> ({flowAdvertiser.bpid}).
      </AssistantBodyText>
    )
  }

  return (
    <>
      <AssistantBodyText>Which advertiser would you like to create campaigns for?</AssistantBodyText>
      <Styled.BasicInfoCard data-testid='advertiser-select-card'>
        <Styled.BasicInfoCardHeading>Select an advertiser</Styled.BasicInfoCardHeading>

        <AssistantBodyText>{SIGNED_OFF_TITLE}</AssistantBodyText>
        <Styled.UsGrowthOptionList role='radiogroup' aria-label={SIGNED_OFF_TITLE}>
          {suggested.map(advertiser => {
            const isSelected = selectedId === advertiser.id && dropdownId === null
            return (
              <Styled.UsGrowthOption
                key={advertiser.bpid}
                type='button'
                role='radio'
                aria-checked={isSelected}
                selected={isSelected}
                disabled={locked}
                onClick={() => {
                  setSelectedId(advertiser.id)
                  setDropdownId(null)
                }}
              >
                <span className='us-growth-option-radio' aria-hidden='true' />
                <Styled.UsGrowthOptionBody>
                  <Styled.UsGrowthOptionTitleRow>
                    <Styled.UsGrowthOptionTitle>{advertiser.name}</Styled.UsGrowthOptionTitle>
                  </Styled.UsGrowthOptionTitleRow>
                  <Styled.UsGrowthOptionDescription>
                    {`${advertiser.bpid} · ${advertiser.mediaPlanName}`}
                  </Styled.UsGrowthOptionDescription>
                </Styled.UsGrowthOptionBody>
              </Styled.UsGrowthOption>
            )
          })}
        </Styled.UsGrowthOptionList>

        <div style={{ marginTop: 12 }}>
          <Select<string>
            id='campaign-flow-advertiser-sel'
            placeholder='Select advertiser'
            showSearch
            allowClear
            filterMode='client'
            searchBy='label'
            popupMatchSelectWidth={420}
            loading={loading}
            disabled={locked}
            value={dropdownId ?? undefined}
            options={selectable.map(advertiser => ({ label: `${advertiser.name} (${advertiser.bpid})`, value: advertiser.id }))}
            onChange={(value: string | undefined) => {
              setDropdownId(value ?? null)
              setSelectedId(value ?? null)
            }}
          />
        </div>

        <Styled.BasicInfoConfirmRow style={{ marginTop: 16 }}>
          <Styled.BasicInfoConfirmHint>{CONFIRM_HINT}</Styled.BasicInfoConfirmHint>
          <Styled.BasicInfoConfirmButton
            type='button'
            disabled={locked || !selected}
            data-testid='advertiser-select-confirm'
            onClick={() =>
              selected && confirmAdvertiserSelection({ advertiserId: selected.id, name: selected.name, bpid: selected.bpid })
            }
          >
            Confirm
          </Styled.BasicInfoConfirmButton>
        </Styled.BasicInfoConfirmRow>
      </Styled.BasicInfoCard>
    </>
  )
}

export default AdvertiserSelectCard
