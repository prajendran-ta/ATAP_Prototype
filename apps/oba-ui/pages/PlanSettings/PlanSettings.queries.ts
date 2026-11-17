import { gql, useMutation, useQuery } from '@apollo/client'

// Query to get all available currencies
const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      code
      name
      symbol
    }
  }
`
export const useCurrenciesQuery = () => {
  const { data, loading, ...rest } = useQuery<Pick<ObaQL.Query, 'currencies'>>(GET_CURRENCIES)
  return { currencies: data?.currencies, currenciesLoading: loading, ...rest }
}

// Fragment for Advertiser Plan Settings
export const ADV_PLAN_SETTINGS_FRAGMENT = gql`
  fragment AdvPlanSettingsFragment on AdvertiserPlan {
    id
    version
    name
    status
    currency
    marginPercent
    dispatchOptIn
    managementFeePercent
    advertiser {
      id
      name
    }
    period {
      startDate
      endDate
    }
    totalBudget {
      allottedCents
      budgetCents
      originalCents
      spentCents
      unSpentCents
    }
    groups {
      id
      version
      name
      bundles {
        channel
      }
    }
  }
`

// Query to get Advertiser Plan Settings by its plan ID
const GET_ADV_PLAN_SETTINGS = gql`
  query GetAdvPlanSettings($id: ID!) {
    advertiserPlan(id: $id) {
      ...AdvPlanSettingsFragment
    }
  }
  ${ADV_PLAN_SETTINGS_FRAGMENT}
`
export const useAdvPlanSettingsQuery = (id?: string | number) => {
  const { data, loading, error, ...rest } = useQuery<
    Pick<ObaQL.Query, 'advertiserPlan'>,
    ObaQL.QueryAdvertiserPlanArgs
  >(GET_ADV_PLAN_SETTINGS, {
    variables: { id: id ? +id : 0 },
    skip: !id,
  })
  return {
    ...rest,
    planSettings: data?.advertiserPlan,
    planSettingsLoading: loading,
    planSettingsError: error,
  }
}

// Mutation to create a new Advertiser Plan Budget
const UPDATE_ADV_PLAN_SETTINGS = gql`
  mutation UpdateAdvPlanSettings($input: AdvertiserPlanInput!) {
    updateAdvertiserPlan(input: $input) {
      ...AdvPlanSettingsFragment
    }
  }
  ${ADV_PLAN_SETTINGS_FRAGMENT}
`
export const useUpdateAdvPlanMutation = (variables?: ObaQL.MutationUpdateAdvertiserPlanArgs) => {
  const [updateAdvPlan, { data, loading, error, ...rest }] = useMutation<
    Pick<ObaQL.Mutation, 'updateAdvertiserPlan'>,
    ObaQL.MutationUpdateAdvertiserPlanArgs
  >(UPDATE_ADV_PLAN_SETTINGS, {
    variables,
  })
  return {
    updateAdvPlan,
    updatedAdvPlanData: data?.updateAdvertiserPlan,
    updatedAdvPlanLoading: loading,
    updatedAdvPlanError: error,
    ...rest,
  }
}

// Mutation to delete an Advertiser Plan
const DELETE_ADV_PLAN = gql`
  mutation DeleteAdvertiserPlan($input: DeleteInput!) {
    deleteAdvertiserPlan(input: $input)
  }
`
export const useDeleteAdvPlanMutation = (variables?: ObaQL.MutationDeleteAdvertiserPlanArgs) => {
  const [deleteAdvPlan, { data, loading, error, ...rest }] = useMutation<
    Pick<ObaQL.Mutation, 'deleteAdvertiserPlan'>,
    ObaQL.MutationDeleteAdvertiserPlanArgs
  >(DELETE_ADV_PLAN, { variables })

  return {
    deleteAdvPlan,
    deletedAdvPlanData: data?.deleteAdvertiserPlan,
    deletedAdvPlanLoading: loading,
    deletedAdvPlanError: error,
    ...rest,
  }
}
