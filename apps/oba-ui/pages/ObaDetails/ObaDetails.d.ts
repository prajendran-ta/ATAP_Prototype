export type ObaDetailsFilter = keyof Pick<
  ObaQL.CampaignDetailsFilter,
  'statuses' | 'groupIds' | 'channels' | 'tactics' | 'vendorCampaignIds'
>

export interface PlanDetailsQueryVariables extends ObaQL.QueryAdvertiserPlanArgs {
  filter?: ObaQL.CampaignDetailsFilter
}
