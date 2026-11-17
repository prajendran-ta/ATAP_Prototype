import { renderHook } from '@testing-library/react'
import {
  useGetAdvertisersQuery,
  useGetAdvertisersFollowingTotalQuery,
  useGetAdvertiserOptionsQuery,
  useGetAdvertiserDetailsQuery,
  useFollowAdvertiserMutation,
  useUnfollowAdvertiserMutation,
  GET_ADVERTISERS,
  GET_ADVERTISERS_FOLLOWING_TOTAL,
  GET_ADVERTISER_OPTIONS,
  GET_ADVERTISER_DETAILS,
  FOLLOW_ADVERTISER,
  UNFOLLOW_ADVERTISER,
} from '../../Advertisers.queries'
import { AdvertiserTypesEnum, AdvertiserStatusEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import * as apollo from '@apollo/client'
import * as gqlProvider from '@mediahub/advertisers-ui/AdvertisersGqlProvider/AdvertisersGqlProvider'

jest.mock('@apollo/client')
jest.mock('@mediahub/advertisers-ui/AdvertisersGqlProvider/AdvertisersGqlProvider', () => ({
  client: {} as any,
}))

const mockUseQuery = apollo.useQuery as jest.Mock
const mockUseMutation = apollo.useMutation as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Advertisers.queries hooks', () => {
  test('useGetAdvertisersQuery passes advertiserTypes=Hotel and isFollowingOnly=false', () => {
    mockUseQuery.mockReturnValue({})

    const filter = { foo: 'bar' } as any

    renderHook(() => useGetAdvertisersQuery(filter))

    expect(mockUseQuery).toHaveBeenCalledWith(GET_ADVERTISERS, {
      variables: {
        filter: {
          ...filter,
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          isFollowingOnly: false,
        },
      },
      skip: false,
      client: gqlProvider.client,
    })
  })

  test('useGetAdvertisersFollowingTotalQuery adds advertiserTypes=Hotel and isFollowingOnly=false', () => {
    mockUseQuery.mockReturnValue({})

    const filter = { baz: 'qux' } as any

    renderHook(() => useGetAdvertisersFollowingTotalQuery(filter))

    expect(mockUseQuery).toHaveBeenCalledWith(GET_ADVERTISERS_FOLLOWING_TOTAL, {
      variables: {
        filter: {
          ...filter,
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          isFollowingOnly: false,
        },
      },
      client: gqlProvider.client,
    })
  })

  test('useGetAdvertiserOptionsQuery uses default filters and respects skip', () => {
    mockUseQuery.mockReturnValue({})

    renderHook(() => useGetAdvertiserOptionsQuery())

    expect(mockUseQuery).toHaveBeenCalledWith(GET_ADVERTISER_OPTIONS, {
      variables: {
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          status: [AdvertiserStatusEnum.Active, AdvertiserStatusEnum.Paused],
          isFollowingOnly: false,
        },
      },
      skip: false,
      client: gqlProvider.client,
    })
  })

  test('useGetAdvertiserDetailsQuery passes variables and correct skip', () => {
    mockUseQuery.mockReturnValue({})

    const advertiserId = 42
    renderHook(() => useGetAdvertiserDetailsQuery(advertiserId))

    expect(mockUseQuery).toHaveBeenCalledWith(GET_ADVERTISER_DETAILS, {
      variables: { advertiserId },
      skip: !advertiserId,
    })
  })

  test('useFollowAdvertiserMutation uses FOLLOW_ADVERTISER', () => {
    mockUseMutation.mockReturnValue([jest.fn(), {}])

    renderHook(() => useFollowAdvertiserMutation())

    expect(mockUseMutation).toHaveBeenCalledWith(FOLLOW_ADVERTISER)
  })

  test('useUnfollowAdvertiserMutation uses UNFOLLOW_ADVERTISER', () => {
    mockUseMutation.mockReturnValue([jest.fn(), {}])

    renderHook(() => useUnfollowAdvertiserMutation())

    expect(mockUseMutation).toHaveBeenCalledWith(UNFOLLOW_ADVERTISER)
  })
})
