import { gql, useMutation, useQuery } from '@apollo/client'

// Fragment for Plan's Budget Distribution
const ADV_PLAN_BUDGETS_FRAGMENT = gql`
  fragment AdvPlanBudgetsFragment on AdvertiserPlan {
    id
    version
    name
    currency
    status
    period {
      startDate
      endDate
    }
    dispatchOptIn
    totalBudget {
      budgetCents
      originalCents
      spentCents
      unSpentCents
      allottedCents
    }
    groups {
      id
      version
      name
      status
      monthBudgets {
        current
        future
        past
        month
        budget {
          budgetCents
          originalCents
          allottedCents
          spentCents
          unSpentCents
          overSpentCents
        }
      }
      bundles {
        channel
      }
    }
  }
`

// Query to get Adv Plan's Budget Distribution (by plan ID)
const GET_ADV_PLAN_BUDGETS = gql`
  query GetAdvPlanBudgets($id: ID!) {
    advertiserPlan(id: $id) {
      ...AdvPlanBudgetsFragment
    }
  }
  ${ADV_PLAN_BUDGETS_FRAGMENT}
`
export const useAdvPlanBudgetsQuery = (id?: string | number) => {
  const { data, loading, error, ...rest } = useQuery<
    Pick<ObaQL.Query, 'advertiserPlan'>,
    ObaQL.QueryAdvertiserPlanArgs
  >(GET_ADV_PLAN_BUDGETS, {
    variables: { id: id ? +id : 0 },
    skip: !id,
  })
  return {
    ...rest,
    planBudgets: data?.advertiserPlan,
    planBudgetsLoading: loading,
    planBudgetsError: error,
  }
}

// Mutation to update Adv Plan's Budgets
const UPDATE_ADV_PLAN_BUDGETS = gql`
  mutation UpdateAdvPlanBudgets($input: AdvertiserPlanInput!) {
    updateAdvertiserPlan(input: $input) {
      ...AdvPlanBudgetsFragment
    }
  }
  ${ADV_PLAN_BUDGETS_FRAGMENT}
`

export const useUpdateAdvPlanBudgetsMutation = (variables?: ObaQL.MutationUpdateAdvertiserPlanArgs) => {
  const [updateAdvPlanBudgets, { data, loading, error, ...rest }] = useMutation<
    Pick<ObaQL.Mutation, 'updateAdvertiserPlan'>,
    ObaQL.MutationUpdateAdvertiserPlanArgs
  >(UPDATE_ADV_PLAN_BUDGETS, {
    variables,
  })
  return {
    updateAdvPlanBudgets,
    updatedAdvPlanBudgetsData: data?.updateAdvertiserPlan,
    updatedAdvPlanBudgetsLoading: loading,
    updatedAdvPlanBudgetsError: error,
    ...rest,
  }
}
