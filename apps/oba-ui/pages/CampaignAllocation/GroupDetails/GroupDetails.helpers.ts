import { ChannelEnum, KpiEnum, TacticEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'

export const kpiOptions: { label: string; value: KpiEnum }[] = [
  { label: 'Clicks', value: KpiEnum.Clicks },
  { label: 'Conversions', value: KpiEnum.Conversions },
  { label: 'ROAS', value: KpiEnum.Roas },
]

export const channelOptions: { label: string; value: ChannelEnum }[] = [
  { label: 'Display', value: ChannelEnum.Display },
  { label: 'Facebook', value: ChannelEnum.Facebook },
  { label: 'PaidSearch', value: ChannelEnum.PaidSearch },
  { label: 'Youtube', value: ChannelEnum.YouTube },
]

export const tacticOptions: { label: string; value: TacticEnum }[] = [
  { label: 'AdvantagePlus', value: TacticEnum.AdvantagePlus },
  { label: 'Brand', value: TacticEnum.Brand },
  { label: 'Generic', value: TacticEnum.Generic },
  { label: 'DemandGen', value: TacticEnum.DemandGen },
  { label: 'Pmax', value: TacticEnum.Pmax },
  { label: 'Prospecting', value: TacticEnum.Prospecting },
  { label: 'Remarketing', value: TacticEnum.Remarketing },
]

export const channelTacticMapping: Partial<Record<ChannelEnum, TacticEnum[]>> = {
  [ChannelEnum.PaidSearch]: [TacticEnum.Brand, TacticEnum.Generic, TacticEnum.Pmax],
  [ChannelEnum.Display]: [TacticEnum.Prospecting, TacticEnum.Remarketing, TacticEnum.DemandGen],
  [ChannelEnum.Facebook]: [TacticEnum.Prospecting, TacticEnum.Remarketing, TacticEnum.AdvantagePlus],
  [ChannelEnum.YouTube]: [TacticEnum.Remarketing, TacticEnum.Prospecting],
}
