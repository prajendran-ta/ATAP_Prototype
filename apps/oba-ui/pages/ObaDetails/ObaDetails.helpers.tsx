import { colors, Icon } from '@amadeus/react-design-factory'
import { CampaignStatusEnum, ChannelEnum, TacticEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
import { useCampaignNamesQuery, useGroupNamesQuery } from './ObaDetails.queries'
// Types
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { ObaDetailsFilter } from './ObaDetails.d'

export const detailsFilterMap = {
  statuses: 'OBA Status',
  groupIds: 'Group',
  channels: 'Channel',
  tactics: 'Tactic',
  vendorCampaignIds: 'Campaigns',
}

export const emptyFilterValues: ObaQL.CampaignDetailsFilter = {
  statuses: [],
  groupIds: [],
  channels: [],
  tactics: [],
  vendorCampaignIds: [],
}

export const emptyFilterLabels: Record<ObaDetailsFilter, string> = {
  statuses: '',
  groupIds: '',
  channels: '',
  tactics: '',
  vendorCampaignIds: '',
}

export const obaStatusOptions: SelectOption<CampaignStatusEnum | null>[] = Object.values(CampaignStatusEnum)
  .filter(status => status !== CampaignStatusEnum.Unknown)
  .map(status => ({
    label: status,
    value: status,
  }))

export const channelOptions: SelectOption[] = Object.values(ChannelEnum)
  .filter(channel => channel !== ChannelEnum.Unknown)
  .map(channel => ({
    label: channel,
    value: channel,
  }))

export const tacticOptions: SelectOption[] = Object.values(TacticEnum)
  .filter(tactic => tactic !== TacticEnum.Unknown)
  .map(tactic => ({
    label: tactic,
    value: tactic,
  }))

export const useGroupNamesOptions = (filter: ObaQL.GroupNameFilter) => {
  const { groupNamesData, ...rest } = useGroupNamesQuery({ filter })

  const groupNamesOptions: SelectOption[] = groupNamesData.map(group => ({
    label: group.name,
    value: group.id,
  }))

  return { groupNamesOptions, ...rest }
}

export const useCampaignNamesOptions = (filter: ObaQL.CampaignNameFilter) => {
  const { campaignNamesData, ...rest } = useCampaignNamesQuery({ filter })

  const campaignNamesOptions: SelectOption[] = campaignNamesData.map(campaign => ({
    label: campaign.name,
    value: campaign.id,
  }))

  return { campaignNamesOptions, ...rest }
}

export const getStatusIcon = (status: ObaQL.CampaignStatusEnum, isDisabled?: boolean) => {
  switch (status) {
    case CampaignStatusEnum.Active:
      return (
        <Icon
          name='checkCircle'
          width={18}
          color={isDisabled ? colors.cloud_50 : colors.forest_70}
          title={isDisabled ? 'OBA Plan is paused' : 'Campaign is active'}
        />
      )
    case CampaignStatusEnum.Error:
      return (
        <Icon
          name='timesCircle'
          width={18}
          color={isDisabled ? colors.cloud_50 : colors.crimson_70}
          title={isDisabled ? 'OBA Plan is paused' : 'Failed to generate & push the recommendation'}
        />
      )
    case CampaignStatusEnum.Paused:
      return (
        <Icon
          name='pauseCircle'
          width={18}
          color={isDisabled ? colors.cloud_50 : colors.canary_70}
          title={isDisabled ? 'OBA Plan is paused' : 'Campaign is paused'}
        />
      )
    case CampaignStatusEnum.Manual:
      return (
        <Icon
          name='userEdit'
          width={21}
          height={18}
          color={isDisabled ? colors.cloud_50 : colors.forest_70}
          title={isDisabled ? 'OBA Plan is paused' : 'Campaign needs to be updated manually'}
        />
      )
    case CampaignStatusEnum.Warning:
      return (
        <Icon
          name='exclamationTriangle'
          width={21}
          height={18}
          color={isDisabled ? colors.cloud_50 : colors.pumpkin_60}
          title={isDisabled ? 'OBA Plan is paused' : 'Campaign is not delivering'}
        />
      )
    case CampaignStatusEnum.Unknown:
      return (
        <Icon
          name='exclamationTriangle'
          width={21}
          height={18}
          color={isDisabled ? colors.cloud_50 : colors.pumpkin_60}
          title={isDisabled ? 'OBA Plan is paused' : 'Unknown recommendation status'}
        />
      )
    default:
      return '-'
  }
}
