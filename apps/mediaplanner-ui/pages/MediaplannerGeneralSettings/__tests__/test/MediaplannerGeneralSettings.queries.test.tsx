import { renderHook } from '@testing-library/react'
import {
  useGetMediaPlanGsQuery,
  useCreateMediaPlanGsMutation,
  useUpdateMediaPlanGsMutation,
  GET_MEDIA_PLAN_GS,
  CREATE_MEDIA_PLAN_GS,
  UPDATE_MEDIA_PLAN_GS,
} from '../../MediaplannerGeneralSettings.queries'
import * as apollo from '@apollo/client'
import * as gqlProvider from '@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider'

jest.mock('@apollo/client')
jest.mock('@mediahub/mediaplanner-ui/MediaplannerGqlProvider/MediaplannerGqlProvider', () => ({
  client: {} as any,
}))

const mockUseQuery = apollo.useQuery as jest.Mock
const mockUseMutation = apollo.useMutation as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('MediaplannerGeneralSettings.queries — hooks', () => {
  describe('useGetMediaPlanGsQuery', () => {
    test('skips the query when no mediaPlanId is provided', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaPlanGsQuery(undefined))
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_MEDIA_PLAN_GS,
        expect.objectContaining({ skip: true }),
      )
    })

    test('executes the query and passes correct variables when mediaPlanId is provided', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaPlanGsQuery('plan-123'))
      expect(mockUseQuery).toHaveBeenCalledWith(GET_MEDIA_PLAN_GS, {
        variables: { mediaPlanId: 'plan-123' },
        skip: false,
        client: gqlProvider.client,
        errorPolicy: 'all',
      })
    })
  })

  describe('useCreateMediaPlanGsMutation', () => {
    test('uses CREATE_MEDIA_PLAN_GS with the mediaplanner client', () => {
      mockUseMutation.mockReturnValue([jest.fn(), {}])
      renderHook(() => useCreateMediaPlanGsMutation())
      expect(mockUseMutation).toHaveBeenCalledWith(CREATE_MEDIA_PLAN_GS, {
        client: gqlProvider.client,
      })
    })
  })

  describe('useUpdateMediaPlanGsMutation', () => {
    test('uses UPDATE_MEDIA_PLAN_GS with the mediaplanner client', () => {
      mockUseMutation.mockReturnValue([jest.fn(), {}])
      renderHook(() => useUpdateMediaPlanGsMutation())
      expect(mockUseMutation).toHaveBeenCalledWith(UPDATE_MEDIA_PLAN_GS, {
        client: gqlProvider.client,
      })
    })
  })
})
