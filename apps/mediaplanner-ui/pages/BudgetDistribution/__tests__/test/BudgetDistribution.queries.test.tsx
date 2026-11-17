import { renderHook } from '@testing-library/react'
import {
  useGetMediaPlanBdQuery,
  useUpdateMediaPlanBdMutation,
  useGetSpendBudgetRecommendationQuery,
  GET_MEDIA_PLAN_BD,
  GET_SPEND_BUDGET_RECOMMENDATION,
  UPDATE_MEDIA_PLAN_BD,
} from '../../BudgetDistribution.queries'
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

describe('BudgetDistribution.queries — hooks', () => {
  describe('useGetMediaPlanBdQuery', () => {
    test('skips the query when no mediaPlanId is provided', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaPlanBdQuery(undefined))
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_MEDIA_PLAN_BD,
        expect.objectContaining({ skip: true }),
      )
    })

    test('executes with correct variables and client when mediaPlanId is provided', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetMediaPlanBdQuery('plan-123'))
      expect(mockUseQuery).toHaveBeenCalledWith(GET_MEDIA_PLAN_BD, {
        variables: { mediaPlanId: 'plan-123' },
        skip: false,
        client: gqlProvider.client,
        errorPolicy: 'all',
      })
    })
  })

  describe('useUpdateMediaPlanBdMutation', () => {
    test('uses UPDATE_MEDIA_PLAN_BD with the mediaplanner client', () => {
      mockUseMutation.mockReturnValue([jest.fn(), {}])
      renderHook(() => useUpdateMediaPlanBdMutation())
      expect(mockUseMutation).toHaveBeenCalledWith(UPDATE_MEDIA_PLAN_BD, {
        client: gqlProvider.client,
      })
    })
  })

  describe('useGetSpendBudgetRecommendationQuery', () => {
    test('skips the query when no input is provided', () => {
      mockUseQuery.mockReturnValue({})
      renderHook(() => useGetSpendBudgetRecommendationQuery(undefined))
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_SPEND_BUDGET_RECOMMENDATION,
        expect.objectContaining({ skip: true }),
      )
    })

    test('executes with correct variables and client when input is provided', () => {
      mockUseQuery.mockReturnValue({})
      const input = {
        advertiserId: 'adv-001',
        advertiserBpid: 'ADV001',
        startDate: '01-Jan-2026',
        endDate: '31-Dec-2026',
        totalBudget: 100000,
      }
      renderHook(() => useGetSpendBudgetRecommendationQuery(input as any))
      expect(mockUseQuery).toHaveBeenCalledWith(GET_SPEND_BUDGET_RECOMMENDATION, {
        variables: { input },
        skip: false,
        client: gqlProvider.client,
        errorPolicy: 'all',
      })
    })
  })
})
