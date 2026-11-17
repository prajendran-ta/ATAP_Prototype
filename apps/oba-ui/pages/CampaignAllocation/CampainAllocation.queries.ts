import { gql, useQuery } from '@apollo/client'

export const GROUP_PLAN_FRAGMENT = gql`
  fragment GroupPlanFragment on GroupPlan {
    advertiserPlanId
    bundles {
      channel
      platform {
        id
        name
      }
      tactic
      vendorCampaignIds
      lowerBoundPercent
      upperBoundPercent
      version
      id
    }
    id
    kpi
    monthBudgets {
      month
      current
      budget {
        budgetCents
        spentCents
        originalCents
      }
    }
    name
    specs
    status
    totalBudget {
      budgetCents
      originalCents
      spentCents
    }
    version
    paidSearchChannel {
      lowerBoundPercent
    }
    facebookChannel {
      lowerBoundPercent
    }
    displayChannel {
      lowerBoundPercent
    }
    youtubeChannel {
      lowerBoundPercent
    }
  }
`

const GET_ADVERTISER_PLAN = gql`
  ${GROUP_PLAN_FRAGMENT}
  query GetAdvertiserPlan($id: ID!) {
    advertiserPlan(id: $id) {
      advertiser {
        id
        name
      }
      currency
      groups {
        ...GroupPlanFragment
      }
      id
      marginPercent
      name
      period {
        endDate
        startDate
      }
      totalBudget {
        budgetCents
        originalCents
        spentCents
      }
    }
  }
`

//fetch advertiser plans for the table, with AdvertiserId
export const useAdvertiserPlanQuery = (variables: ObaQL.QueryAdvertiserPlanArgs) => {
  const { data, loading, ...rest } = useQuery<ObaQL.Query, ObaQL.QueryAdvertiserPlanArgs>(GET_ADVERTISER_PLAN, {
    variables,
  })

  return {
    advertiserPlans: data?.advertiserPlan,
    advertiserPlansLoading: loading,
    ...rest,
  }
}
