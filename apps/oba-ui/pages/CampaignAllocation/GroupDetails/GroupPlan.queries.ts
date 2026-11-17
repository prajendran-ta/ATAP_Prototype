import { gql, useMutation, useQuery } from '@apollo/client'
import { GROUP_PLAN_FRAGMENT } from '../CampainAllocation.queries'

export const GET_GROUP_PLAN = gql`
  ${GROUP_PLAN_FRAGMENT}
  query GetGroupPlan($id: ID!) {
    groupPlan(id: $id) {
      ...GroupPlanFragment
      advertiserPlan {
        advertiser {
          id
          name
        }
      }
    }
  }
`

//fetch group plan data for Group Details using groupId
export const useGroupPlanQuery = (variables: ObaQL.QueryGroupPlanArgs) => {
  const { data, loading, ...rest } = useQuery<ObaQL.Query, ObaQL.QueryGroupPlanArgs>(GET_GROUP_PLAN, {
    variables,
    skip: !variables.id,
  })
  return { groupPlan: data?.groupPlan, groupPlanLoading: loading, ...rest }
}

const MUTATE_UPDATE_GROUP_PLAN = gql`
  mutation UpdateGroupPlan($input: GroupPlanInput!) {
    updateGroupPlan(input: $input) {
      ...GroupPlanFragment
    }
  }
  ${GROUP_PLAN_FRAGMENT}
`

//mutate group plan data
export const useGroupPlanMutate = (variables?: ObaQL.MutationUpdateGroupPlanArgs) => {
  const [updateGroupPlan, { data, loading, error, ...rest }] = useMutation<
    Pick<ObaQL.Mutation, 'updateGroupPlan'>,
    ObaQL.MutationUpdateGroupPlanArgs
  >(MUTATE_UPDATE_GROUP_PLAN, {
    variables,
  })
  return {
    updateGroupPlan,
    updateGroupPlanData: data?.updateGroupPlan,
    updateGroupPlanLoading: loading,
    updateGroupPlanError: error,
    ...rest,
  }
}
