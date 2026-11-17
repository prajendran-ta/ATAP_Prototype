import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { client as mediaplannerClient } from '@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider'

// =====================
// QUERIES
// =====================

export const GET_MEDIAPLANS = gql`
  query GetMediaplans($filter: MediaPlanFilter) {
    GetMediaPlans(filter: $filter) {
      totalCount
      allPlansCount
      myPlansCount
      plans {
        id
        planName
        advertiserName
        advertiserBpid
        contractBudget
        currency
        startDate
        endDate
        planType
        opportunityId
        proposalId
        status
      }
    }
  }
`
export const GET_MEDIAPLANS_OPTIONS = gql`
  query GetMediaplansOptions($filter: MediaPlanFilter) {
    GetMediaPlans(filter: $filter) {
      plans {
        id
        planName
      }
    }
  }
`

export const GET_LAST_DISTRIBUTION = gql`
  query GetLastDistribution($advertiserId: String!) {
    GetLastDistribution(advertiserId: $advertiserId) {
      sourcePlanId
      sourcePlanName
      channelAllocations {
        id
        mediaPlanId
        channel
        budgetAmount
        budgetPct
        tactics {
          calculationMode
          tactic
          platform
          platforms
          spendAmount
          spendPct
          pctOfExpected
          cpmAmount
          marginAmount
          marginPct
          platformCost
        }
      }
      monthlyDistributions {
        id
        mediaPlanId
        month
        spendPct
        valueType
        calculatedAmount
      }
    }
  }
`
// =====================
// MUTATIONS
// =====================

// =====================
// HOOKS
// =====================
export function useGetMediaplansQuery(filter?: MediaplannerQL.MediaPlanFilter, skip = false) {
  return useQuery<Pick<MediaplannerQL.Query, 'GetMediaPlans'>, MediaplannerQL.QueryGetMediaPlansArgs>(GET_MEDIAPLANS, {
    variables: { filter },
    skip,
    client: mediaplannerClient,
    // Tolerate backend errors (e.g. a 401 while navigating) instead of throwing an uncaught
    // Apollo error that crashes the page — matches the sibling options/last-distribution queries.
    errorPolicy: 'all',
  })
}

export function useGetMediaplansOptionsQuery(skip = false) {
  return useQuery<Pick<MediaplannerQL.Query, 'GetMediaPlans'>, MediaplannerQL.QueryGetMediaPlansArgs>(
    GET_MEDIAPLANS_OPTIONS,
    {
      skip,
      client: mediaplannerClient,
    },
  )
}

export function useGetLastDistributionLazyQuery() {
  return useLazyQuery<Pick<MediaplannerQL.Query, 'GetLastDistribution'>, MediaplannerQL.QueryGetLastDistributionArgs>(
    GET_LAST_DISTRIBUTION,
    {
      client: mediaplannerClient,
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  )
}

// =====================
// MUTATION HOOKS
// =====================
