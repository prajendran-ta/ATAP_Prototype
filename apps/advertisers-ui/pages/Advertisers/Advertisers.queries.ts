import { gql, useQuery, useMutation } from '@apollo/client'
import { AdvertiserStatusEnum, AdvertiserTypesEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import { client as advertisersClient } from '@mediahub/advertisers-ui/AdvertisersGqlProvider/AdvertisersGqlProvider'

// =====================
// QUERIES
// =====================

export const GET_ADVERTISERS = gql`
  query GetAdvertisers($filter: AdvertiserFilter!) {
    advertisers(filter: $filter) {
      totalCount
      toggle {
        totalAdvertisers
        totalFollowing
      }
      advertisers {
        advertiserId
        advertiserName
        bpid
        status
        advertiserTypes
        followedBy
        isFollowing
      }
    }
  }
`

export const GET_ADVERTISERS_FOLLOWING_TOTAL = gql`
  query GetAdvertisers($filter: AdvertiserFilter!) {
    advertisers(filter: $filter) {
      toggle {
        totalFollowing
      }
    }
  }
`
export const GET_ADVERTISER_OPTIONS = gql`
  query GetAdvertiserOptions($filter: AdvertiserFilter!) {
    advertisers(filter: $filter) {
      advertisers {
        advertiserId
        advertiserName
        bpid
        advertiserTypes
        isFollowing
      }
    }
  }
`

export const GET_ADVERTISER_DETAILS = gql`
  query GetAdvertiserDetails($advertiserId: ID!) {
    advertiserDetails(advertiserId: $advertiserId) {
      advertiserId
      externalAdvertiser {
        name
        platform
      }
    }
  }
`

// =====================
// MUTATIONS
// =====================
export const FOLLOW_ADVERTISER = gql`
  mutation FollowAdvertiser($input: EntityInput!) {
    followAdvertiser(input: $input) {
      success
      message
    }
  }
`

export const UNFOLLOW_ADVERTISER = gql`
  mutation UnfollowAdvertiser($input: EntityInput!) {
    unfollowAdvertiser(input: $input) {
      success
      message
    }
  }
`

// =====================
// HOOKS
// =====================
type AdvertisersQueryVariables = {
  filter: AdvertiserQL.AdvertiserFilter
}

export function useGetAdvertisersQuery(
  filter?: AdvertiserQL.AdvertiserFilter,
  skip = false,
) {
  return useQuery<Pick<AdvertiserQL.Query, 'advertisers'>, AdvertisersQueryVariables>(GET_ADVERTISERS, {
    variables: {
      filter: { ...filter, advertiserTypes: AdvertiserTypesEnum.Hotel, isFollowingOnly: false },
    },
    skip,
    client: advertisersClient,
  })
}

export function useGetAdvertisersFollowingTotalQuery(
  filter?: AdvertiserQL.AdvertiserFilter,
) {
  return useQuery<Pick<AdvertiserQL.Query, 'advertisers'>, AdvertisersQueryVariables>(
    GET_ADVERTISERS_FOLLOWING_TOTAL,
    {
      variables: {
        filter: { ...filter, advertiserTypes: AdvertiserTypesEnum.Hotel, isFollowingOnly: false },
      },
      client: advertisersClient,
    },
  )
}

export function useGetAdvertiserOptionsQuery(skip = false) {
  return useQuery<Pick<AdvertiserQL.Query, 'advertisers'>, AdvertisersQueryVariables>(GET_ADVERTISER_OPTIONS, {
    variables: {
      filter: {
        advertiserTypes: AdvertiserTypesEnum.Hotel,
        status: [AdvertiserStatusEnum.Active, AdvertiserStatusEnum.Paused],
        isFollowingOnly: false,
      },
    },
    skip,
    client: advertisersClient,
  })
}

export function useGetAdvertiserDetailsQuery(advertiserId: number) {
  return useQuery<Pick<AdvertiserQL.Query, 'advertiserDetails'>, AdvertiserQL.QueryAdvertiserDetailsArgs>(
    GET_ADVERTISER_DETAILS,
    {
      variables: { advertiserId },
      skip: !advertiserId,
    },
  )
}

export const GET_ADVERTISER_BY_ID = gql`
  query GetAdvertiserById($filter: AdvertiserFilter!) {
    advertisers(filter: $filter) {
      advertisers {
        advertiserId
        advertiserName
        bpid
      }
    }
  }
`

export function useGetAdvertiserByIdQuery(advertiserId?: number) {
  return useQuery<Pick<AdvertiserQL.Query, 'advertisers'>, AdvertisersQueryVariables>(GET_ADVERTISER_BY_ID, {
    variables: {
      filter: {
        advertiserTypes: AdvertiserTypesEnum.Hotel,
        isFollowingOnly: false,
        ids: [advertiserId!],
      },
    },
    skip: !advertiserId,
    client: advertisersClient,
  })
}

// =====================
// MUTATION HOOKS
// =====================
export function useFollowAdvertiserMutation() {
  return useMutation<Pick<AdvertiserQL.Mutation, 'followAdvertiser'>, AdvertiserQL.MutationFollowAdvertiserArgs>(
    FOLLOW_ADVERTISER,
  )
}

export function useUnfollowAdvertiserMutation() {
  return useMutation<Pick<AdvertiserQL.Mutation, 'unfollowAdvertiser'>, AdvertiserQL.MutationUnfollowAdvertiserArgs>(
    UNFOLLOW_ADVERTISER,
  )
}
