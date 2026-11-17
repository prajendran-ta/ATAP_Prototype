import { gql, useMutation, useQuery } from '@apollo/client'
import { PlanDetailsQueryVariables } from './ObaDetails.d'

// Group Names Query

const GET_GROUP_NAMES = gql`
  query GetGroupNames($filter: GroupNameFilter!) {
    groupNames(filter: $filter) {
      id
      name
    }
  }
`
export const useGroupNamesQuery = (variables?: ObaQL.QueryGroupNamesArgs) => {
  const { data, loading, error } = useQuery<Pick<ObaQL.Query, 'groupNames'>, ObaQL.QueryGroupNamesArgs>(
    GET_GROUP_NAMES,
    { variables },
  )

  return {
    groupNamesData: data?.groupNames || [],
    groupNamesLoading: loading,
    groupNamesError: error,
  }
}

// Campaign Names Query

const GET_CAMPAIGN_NAMES = gql`
  query GetCampaignNames($filter: CampaignNameFilter!) {
    campaignNames(filter: $filter) {
      id
      name
    }
  }
`
export const useCampaignNamesQuery = (variables?: ObaQL.QueryCampaignNamesArgs) => {
  const { data, loading, error, refetch, ...rest } = useQuery<
    Pick<ObaQL.Query, 'campaignNames'>,
    ObaQL.QueryCampaignNamesArgs
  >(GET_CAMPAIGN_NAMES, { variables })

  return {
    campaignNamesData: data?.campaignNames || [],
    campaignNamesLoading: loading,
    campaignNamesError: error,
    refetchCampaignNames: refetch,
    ...rest,
  }
}

// Campaign Details Fragment

const CAMPAIGN_DETAILS_FRAGMENT = gql`
  fragment CampaignDetailsFragment on CampaignDetails {
    campaignId
    groupId
    status
    statusMessage
    campaign {
      id
      name
      notFound
    }
    channel
    currency
    currentMonthSpentCents
    dailyRecommendedCents
    group {
      id
      name
    }
    lastUpdated
    monthlyRecommendedCents
    platform {
      id
      name
    }
    tactic
    totalSpentCents
  }
`

const ADVERTISER_PLAN_FRAGMENT = gql`
  fragment AdvertiserPlanFragment on AdvertiserPlan {
    id
    name
    version
    advertiserId
    status
    isRunnable
    disable {
      pause
      resume
    }
  }
`

// OBA Plan Details Query

const GET_PLAN_DETAILS = gql`
  ${ADVERTISER_PLAN_FRAGMENT}
  ${CAMPAIGN_DETAILS_FRAGMENT}
  query GetPlanDetails($id: ID!, $filter: CampaignDetailsFilter) {
    advertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
      campaignDetails(filter: $filter) {
        ...CampaignDetailsFragment
      }
    }
  }
`
export const usePlanDetailsQuery = (variables: PlanDetailsQueryVariables) => {
  const { data, loading, error, refetch, ...rest } = useQuery<
    Pick<ObaQL.Query, 'advertiserPlan'>,
    PlanDetailsQueryVariables
  >(GET_PLAN_DETAILS, { variables })

  return {
    planDetailsData: data?.advertiserPlan,
    planDetailsLoading: loading,
    planDetailsError: error,
    refetchPlanDetails: refetch,
    ...rest,
  }
}

// Pause OBA Advertiser Plan

const PAUSE_ADVERTISER_PLAN = gql`
  ${ADVERTISER_PLAN_FRAGMENT}
  mutation PauseAdvertiserPlan($id: ID!) {
    pauseAdvertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
    }
  }
`
export const usePauseAdvPlanMutation = (variables?: ObaQL.MutationPauseAdvertiserPlanArgs) => {
  const [pauseAdvPlan, { data, loading, error }] = useMutation<
    Pick<ObaQL.Mutation, 'pauseAdvertiserPlan'>,
    ObaQL.MutationPauseAdvertiserPlanArgs
  >(PAUSE_ADVERTISER_PLAN, { variables })

  return {
    pauseAdvPlan,
    pausedAdvPlanData: data?.pauseAdvertiserPlan,
    pausedAdvPlanLoading: loading,
    pausedAdvPlanError: error,
  }
}

// Unpause (Resume) OBA Advertiser Plan

const UNPAUSE_ADVERTISER_PLAN = gql`
  ${ADVERTISER_PLAN_FRAGMENT}
  mutation UnpauseAdvertiserPlan($id: ID!) {
    unpauseAdvertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
    }
  }
`
export const useUnpauseAdvPlanMutation = (variables?: ObaQL.MutationUnpauseAdvertiserPlanArgs) => {
  const [unpauseAdvPlan, { data, loading, error }] = useMutation<
    Pick<ObaQL.Mutation, 'unpauseAdvertiserPlan'>,
    ObaQL.MutationUnpauseAdvertiserPlanArgs
  >(UNPAUSE_ADVERTISER_PLAN, { variables })

  return {
    unpauseAdvPlan,
    unpausedAdvPlanData: data?.unpauseAdvertiserPlan,
    unpausedAdvPlanLoading: loading,
    unpausedAdvPlanError: error,
  }
}

// Pause Campaign Mutation

const PAUSE_CAMPAIGN = gql`
  ${CAMPAIGN_DETAILS_FRAGMENT}
  mutation PauseCampaign($campaignId: String!, $groupId: ID!) {
    pauseCampaign(campaignId: $campaignId, groupId: $groupId) {
      ...CampaignDetailsFragment
    }
  }
`
export const usePauseCampaignMutation = (variables?: ObaQL.MutationPauseCampaignArgs) => {
  const [pauseCampaign, { data, loading, error }] = useMutation<
    Pick<ObaQL.Mutation, 'pauseCampaign'>,
    ObaQL.MutationPauseCampaignArgs
  >(PAUSE_CAMPAIGN, { variables })

  return {
    pauseCampaign,
    pausedCampaignData: data?.pauseCampaign,
    pausedCampaignLoading: loading,
    pausedCampaignError: error,
  }
}

// Unpause (Resume) Campaign Mutation

const UNPAUSE_CAMPAIGN = gql`
  ${CAMPAIGN_DETAILS_FRAGMENT}
  mutation UnpauseCampaign($campaignId: String!, $groupId: ID!) {
    unpauseCampaign(campaignId: $campaignId, groupId: $groupId) {
      ...CampaignDetailsFragment
    }
  }
`
export const useUnpauseCampaignMutation = (variables?: ObaQL.MutationUnpauseCampaignArgs) => {
  const [unpauseCampaign, { data, loading, error }] = useMutation<
    Pick<ObaQL.Mutation, 'unpauseCampaign'>,
    ObaQL.MutationUnpauseCampaignArgs
  >(UNPAUSE_CAMPAIGN, { variables })

  return {
    unpauseCampaign,
    unpausedCampaignData: data?.unpauseCampaign,
    unpausedCampaignLoading: loading,
    unpausedCampaignError: error,
  }
}
