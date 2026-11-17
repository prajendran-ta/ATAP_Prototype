import { gql, useQuery } from '@apollo/client'

// Query to fetch Advertiser Plans for plans table
const GET_ADVERTISER_PLANS = gql`
  query GetAdvertiserPlans($filter: AdvertiserPlanFilter!) {
    advertiserPlans(filter: $filter) {
      id
      name
      status
      advertiser {
        id
        name
        bpid
      }
      currency
      totalBudget {
        budgetCents
        originalCents
        spentCents
      }
      period {
        startDate
        endDate
      }
      marginPercent
      nbGroups
    }
  }
`
export const useAdvertiserPlansQuery = (variables: ObaQL.QueryAdvertiserPlansArgs) => {
  const { data, loading, refetch, ...rest } = useQuery<
    Pick<ObaQL.Query, 'advertiserPlans'>,
    ObaQL.QueryAdvertiserPlansArgs
  >(GET_ADVERTISER_PLANS, {
    variables,
  })
  return { plans: data?.advertiserPlans, plansLoading: loading, refetchPlans: refetch, ...rest }
}

// Query to fetch advertiser plan names for filter dropdown
const GET_ADVERTISER_PLAN_NAMES = gql`
  query GetAdvertiserPlanNames($filter: AdvertiserPlanNameFilter!) {
    advertiserPlanNames(filter: $filter) {
      id
      name
    }
  }
`
export const useAdvertiserPlanNamesQuery = (variables: ObaQL.QueryAdvertiserPlanNamesArgs) => {
  const { data, loading, ...rest } = useQuery<
    Pick<ObaQL.Query, 'advertiserPlanNames'>,
    ObaQL.QueryAdvertiserPlanNamesArgs
  >(GET_ADVERTISER_PLAN_NAMES, {
    variables,
  })
  return { planNames: data?.advertiserPlanNames, planNamesLoading: loading, ...rest }
}

// Query to fetch advertiser names for filter dropdown
const GET_ADVERTISER_NAMES = gql`
  query GetAdvertiserNames($filter: AdvertiserNameFilter!) {
    advertiserNames(filter: $filter) {
      id
      name
      bpid
    }
  }
`
export const useAdvertiserNamesQuery = (variables: ObaQL.QueryAdvertiserNamesArgs) => {
  const { data, loading, ...rest } = useQuery<Pick<ObaQL.Query, 'advertiserNames'>, ObaQL.QueryAdvertiserNamesArgs>(
    GET_ADVERTISER_NAMES,
    {
      variables,
    },
  )
  return { advertiserNames: data?.advertiserNames, advertiserNamesLoading: loading, ...rest }
}
