import { gql, useMutation } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $role: String, $isActive: Boolean) {
    updateUser(userId: $userId, role: $role, isActive: $isActive) {
      success
      message
      user {
        id
        role
        status
      }
    }
  }
`

export function useUpdateUserMutation() {
  return useMutation<Pick<SharedQL.Mutation, 'updateUser'>, SharedQL.MutationUpdateUserArgs>(UPDATE_USER)
}
