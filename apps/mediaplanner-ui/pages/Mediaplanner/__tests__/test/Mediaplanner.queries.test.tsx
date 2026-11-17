import { renderHook } from '@testing-library/react'
import {
  useGetMediaplansQuery,
  useGetMediaplansOptionsQuery,
  useGetLastDistributionLazyQuery,
  GET_MEDIAPLANS,
  GET_MEDIAPLANS_OPTIONS,
  GET_LAST_DISTRIBUTION,
} from '../../Mediaplanner.queries'
import * as apollo from '@apollo/client'
import * as gqlProvider from '@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider'

jest.mock('@apollo/client')
jest.mock('@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider', () => ({
  client: {} as any,
}))

const mockUseQuery = apollo.useQuery as jest.Mock
const mockUseLazyQuery = apollo.useLazyQuery as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Mediaplanner.queries — hooks', () => {
  describe('useGetMediaplansQuery', () => {
    test('skips the query when skip is true', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaplansQuery(undefined, true))
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_MEDIAPLANS,
        expect.objectContaining({ skip: true }),
      )
    })

    test('executes with correct variables and client when skip is false', () => {
      mockUseQuery.mockReturnValue({})
      const filter = { myPlansOnly: true }
      renderHook(() => useGetMediaplansQuery(filter, false))
      expect(mockUseQuery).toHaveBeenCalledWith(GET_MEDIAPLANS, {
        variables: { filter },
        skip: false,
        client: gqlProvider.client,
        errorPolicy: 'all',
      })
    })
  })

  describe('useGetMediaplansOptionsQuery', () => {
    test('skips when skip is true', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaplansOptionsQuery(true))
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_MEDIAPLANS_OPTIONS,
        expect.objectContaining({ skip: true }),
      )
    })

    test('executes with the mediaplanner client when skip is false', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaplansOptionsQuery(false))
      expect(mockUseQuery).toHaveBeenCalledWith(GET_MEDIAPLANS_OPTIONS, {
        skip: false,
        client: gqlProvider.client,
      })
    })
  })

  describe('useGetLastDistributionLazyQuery', () => {
    test('calls useLazyQuery with GET_LAST_DISTRIBUTION and correct options', () => {
      mockUseLazyQuery.mockReturnValue([jest.fn(), {}])
      renderHook(() => useGetLastDistributionLazyQuery())
      expect(mockUseLazyQuery).toHaveBeenCalledWith(GET_LAST_DISTRIBUTION, {
        client: gqlProvider.client,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      })
    })
  })
})
