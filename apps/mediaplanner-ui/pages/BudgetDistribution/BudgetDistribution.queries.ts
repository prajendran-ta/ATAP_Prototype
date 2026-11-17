import { gql, useMutation, useQuery } from '@apollo/client'
import { client as mediaplannerClient } from '@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider'

// =====================
// QUERIES
// =====================

export const GET_MEDIA_PLAN_BD = gql`
  query GetMediaPlanBd($mediaPlanId: String!) {
    GetMediaPlan(mediaPlanId: $mediaPlanId) {
      generalSettings {
        advertiserInformation {
          advertiserId
          advertiserBpid
          currency
          region
          salesforceOpportunityId
          proposalId
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
          creativeFee
          videoCreativeFee
          metasearchConnectivityFee
        }
      }
      budgetDistribution {
        mediaPlanId
        spendBudget
        contractMarginAmt
        contractMarginPct
        actualMarginPct
        spendBudgetDistribution {
          month
          spendPct
        }
        allocations {
          channel
          budgetAmount
          budgetPct
          tactics {
            calculationMode
            calculationMode
            platform
            platforms
            tactic
            spendAmount
            spendPct
            pctOfExpected
            cpmAmount
            marginAmount
            marginPct
            platformCost
          }
        }
      }
    }
  }
`

export const GET_SPEND_BUDGET_RECOMMENDATION = gql`
  query GetSpendBudgetRecommendation($input: SpendBudgetRecommendationInput!) {
    GetSpendBudgetRecommendation(input: $input) {
      items {
        startDate
        budget
      }
      status
    }
  }
`

// =====================
// MUTATIONS
// =====================

export const UPDATE_MEDIA_PLAN_BD = gql`
  mutation UpdateMediaPlanBd(
    $mediaPlanId: String!
    $allocations: [MediaAllocationInput!]!
    $spendBudgetDistribution: [SpendBudgetDistributionInput!]!
    $spendBudget: Float!
    $contractMarginAmt: Float!
    $contractMarginPct: Float!
    $actualMarginPct: Float!
  ) {
    updateMediaPlanBd(
      input: {
        mediaPlanId: $mediaPlanId
        allocations: $allocations
        spendBudgetDistribution: $spendBudgetDistribution
        spendBudget: $spendBudget
        contractMarginAmt: $contractMarginAmt
        contractMarginPct: $contractMarginPct
        actualMarginPct: $actualMarginPct
      }
    ) {
      mediaPlanId
      success
      message
    }
  }
`

// =====================
// TYPES
// =====================

export type TacticAllocationInputVars = MediaplannerQL.TacticAllocationInput
export type MediaAllocationInputVars = MediaplannerQL.MediaAllocationInput
export type SpendBudgetDistributionInputVars = MediaplannerQL.SpendBudgetDistributionInput

export interface UpdateMediaPlanBdVars {
  mediaPlanId: string
  allocations: MediaAllocationInputVars[]
  spendBudgetDistribution: SpendBudgetDistributionInputVars[]
  spendBudget: number
  contractMarginAmt: number
  contractMarginPct: number
  actualMarginPct: number
}

// =====================
// MUTATION HOOKS
// =====================

export function useUpdateMediaPlanBdMutation() {
  return useMutation<Pick<MediaplannerQL.Mutation, 'updateMediaPlanBd'>, UpdateMediaPlanBdVars>(UPDATE_MEDIA_PLAN_BD, {
    client: mediaplannerClient,
  })
}

export function useGetMediaPlanBdQuery(mediaPlanId?: string) {
  return useQuery<Pick<MediaplannerQL.Query, 'GetMediaPlan'>, MediaplannerQL.QueryGetMediaPlanArgs>(GET_MEDIA_PLAN_BD, {
    variables: { mediaPlanId: mediaPlanId! },
    skip: !mediaPlanId,
    client: mediaplannerClient,
    errorPolicy: 'all',
  })
}

export function useGetSpendBudgetRecommendationQuery(input?: MediaplannerQL.SpendBudgetRecommendationInput) {
  return useQuery<
    Pick<MediaplannerQL.Query, 'GetSpendBudgetRecommendation'>,
    MediaplannerQL.QueryGetSpendBudgetRecommendationArgs
  >(GET_SPEND_BUDGET_RECOMMENDATION, {
    variables: { input: input! },
    skip: !input,
    client: mediaplannerClient,
    errorPolicy: 'all',
  })
}
