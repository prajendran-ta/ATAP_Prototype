import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { client as mediaplannerClient } from '@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider'

// =====================
// QUERIES
// =====================

export const GET_MEDIA_PLAN_GS = gql`
  query GetMediaPlanGs($mediaPlanId: String!) {
    GetMediaPlan(mediaPlanId: $mediaPlanId) {
      mediaPlanId
      generalSettings {
        advertiserInformation {
          advertiserId
          advertiserBpid
          region
          salesforceOpportunityId
          proposalId
          currency
          breakdown
          planType
          prefillEnabled
        }
        planInformation {
          contractBudgetTarget
          contractProfitTarget
          startDate
          endDate
          planName
          status
        }
        priceSettings {
          managementFeePct
          setupFee
          metasearchSetupFee
          metasearchConnectivityFee
          creativeFee
          videoCreativeFee
        }
      }
      budgetDistribution {
        spendBudgetDistribution {
          month
          spendPct
        }
      }
    }
  }
`

// =====================
// QUERY HOOKS
// =====================

export function useGetMediaPlanGsQuery(mediaPlanId?: string) {
  return useQuery<
    Pick<MediaplannerQL.Query, 'GetMediaPlan'>,
    MediaplannerQL.QueryGetMediaPlanArgs
  >(GET_MEDIA_PLAN_GS, {
    variables: { mediaPlanId: mediaPlanId! },
    skip: !mediaPlanId,
    client: mediaplannerClient,
    errorPolicy: 'all',
  })
}

// =====================
// MUTATIONS
// =====================

export const CREATE_MEDIA_PLAN_GS = gql`
  mutation CreateMediaPlanGs(
    $advertiserId: String!
    $advertiserBpid: String!
    $region: RegionEnum!
    $salesforceOpportunityId: String!
    $proposalId: String!
    $currency: String!
    $breakdown: BreakdownEnum!
    $planType: PlanTypeEnum!
    $prefillEnabled: Boolean!
    $contractBudgetTarget: String!
    $contractProfitTarget: String!
    $startDate: String!
    $endDate: String!
    $planName: String!
    $status: StatusEnum!
    $managementFeePct: String!
    $setupFee: String!
    $metasearchSetupFee: String!
    $metasearchConnectivityFee: String!
    $creativeFee: String!
    $videoCreativeFee: String!
  ) {
    createMediaPlanGs(
      input: {
        advertiserInformation: {
          advertiserId: $advertiserId
          advertiserBpid: $advertiserBpid
          region: $region
          salesforceOpportunityId: $salesforceOpportunityId
          proposalId: $proposalId
          currency: $currency
          breakdown: $breakdown
          planType: $planType
          prefillEnabled: $prefillEnabled
        }
        planInformation: {
          contractBudgetTarget: $contractBudgetTarget
          contractProfitTarget: $contractProfitTarget
          startDate: $startDate
          endDate: $endDate
          planName: $planName
          status: $status
        }
        priceSettings: {
          managementFeePct: $managementFeePct
          setupFee: $setupFee
          metasearchSetupFee: $metasearchSetupFee
          metasearchConnectivityFee: $metasearchConnectivityFee
          creativeFee: $creativeFee
          videoCreativeFee: $videoCreativeFee
        }
      }
    ) {
      mediaPlanId
      success
      message
    }
  }
`

// =====================
// MUTATION HOOKS
// =====================

export type CreateMediaPlanGsVars = MediaplannerQL.AdvertiserInformationInput &
  MediaplannerQL.PlanInformationInput &
  MediaplannerQL.PriceSettingsInput

export function useCreateMediaPlanGsMutation() {
  return useMutation<Pick<MediaplannerQL.Mutation, 'createMediaPlanGs'>, CreateMediaPlanGsVars>(CREATE_MEDIA_PLAN_GS, {
    client: mediaplannerClient,
  })
}

export const UPDATE_MEDIA_PLAN_GS = gql`
  mutation UpdateMediaPlanGs(
    $mediaPlanId: String!
    $advertiserId: String!
    $advertiserBpid: String!
    $region: RegionEnum!
    $salesforceOpportunityId: String!
    $proposalId: String!
    $currency: String!
    $breakdown: BreakdownEnum!
    $planType: PlanTypeEnum!
    $prefillEnabled: Boolean!
    $contractBudgetTarget: String!
    $contractProfitTarget: String!
    $startDate: String!
    $endDate: String!
    $planName: String!
    $status: StatusEnum!
    $managementFeePct: String!
    $setupFee: String!
    $metasearchSetupFee: String!
    $metasearchConnectivityFee: String!
    $creativeFee: String!
    $videoCreativeFee: String!
  ) {
    updateMediaPlanGs(
      input: {
        mediaPlanId: $mediaPlanId
        advertiserInformation: {
          advertiserId: $advertiserId
          advertiserBpid: $advertiserBpid
          region: $region
          salesforceOpportunityId: $salesforceOpportunityId
          proposalId: $proposalId
          currency: $currency
          breakdown: $breakdown
          planType: $planType
          prefillEnabled: $prefillEnabled
        }
        planInformation: {
          contractBudgetTarget: $contractBudgetTarget
          contractProfitTarget: $contractProfitTarget
          startDate: $startDate
          endDate: $endDate
          planName: $planName
          status: $status
        }
        priceSettings: {
          managementFeePct: $managementFeePct
          setupFee: $setupFee
          metasearchSetupFee: $metasearchSetupFee
          metasearchConnectivityFee: $metasearchConnectivityFee
          creativeFee: $creativeFee
          videoCreativeFee: $videoCreativeFee
        }
      }
    ) {
      mediaPlanId
      success
      message
      dateCreated
    }
  }
`

export type UpdateMediaPlanGsVars = Pick<MediaplannerQL.UpdateMediaPlanInput3, 'mediaPlanId'> &
  MediaplannerQL.AdvertiserInformationInput &
  MediaplannerQL.PlanInformationInput &
  MediaplannerQL.PriceSettingsInput

export function useUpdateMediaPlanGsMutation() {
  return useMutation<Pick<MediaplannerQL.Mutation, 'updateMediaPlanGs'>, UpdateMediaPlanGsVars>(UPDATE_MEDIA_PLAN_GS, {
    client: mediaplannerClient,
  })
}
