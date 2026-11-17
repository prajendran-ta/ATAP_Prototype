import { gql, useQuery } from '@apollo/client'
import { client as sharedClient } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubGqlProvider'

export const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      users {
        id
        name
        email
        role
        location
        status
        lastLogin
      }
      totalCount
      hasNextPage
      totalAdministrators
      totalStandard
      totalReadOnly
      toggle {
        totalActive
        totalInactive
        totalUsers
      }
    }
  }
`

export const GET_USERS_OPTIONS = gql`
  query GetUsersOptions($options: PageQueryOptions) {
    users(options: $options) {
      users {
        id
        name
      }
    }
  }
`

export const GET_USERS_PERMISSIONS = gql`
  query GetUserPermissions($userId: ID!) {
    user(userId: $userId) {
      id
      name
      email
      role
      permissions
    }
  }
`

export function useGetUsersQuery(limit = 1000, offset = 0) {
  return useQuery<Pick<SharedQL.Query, 'users'>, SharedQL.QueryUsersArgs>(GET_USERS, {
    variables: {
      options: {
        paginate: { limit, offset },
      },
    },
  })
}

export function useGetUsersOptionsQuery(limit = 1000000, offset = 0, skip = false) {
  // TODO: quit limit = 10 by default on BE to get all the registers
  return useQuery<Pick<SharedQL.Query, 'users'>, SharedQL.QueryUsersArgs>(GET_USERS_OPTIONS, {
    variables: {
      options: {
        paginate: { limit, offset },
      },
    },
    skip: skip,
    client: sharedClient,
  })
}

export function useUserPermissionsQuery(userId: number) {
  return useQuery<Pick<SharedQL.Query, 'user'>, SharedQL.QueryUserArgs>(GET_USERS_PERMISSIONS, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: 'no-cache',
  })
}
