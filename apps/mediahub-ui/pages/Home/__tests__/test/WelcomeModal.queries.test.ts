import { renderHook } from '@testing-library/react'
import * as apollo from '@apollo/client'
import {
  useGetWelcomeModal,
  useIgnoreWelcomeModal,
  GET_WELCOME_MODAL,
  IGNORE_WELCOME_MODAL,
} from '../../WelcomeModal/WelcomeModal.queries'

// Keep the real `gql` so the GQL AST is fully parsed and inspectable.
// Only override the hook functions which would otherwise require an ApolloProvider.
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

const mockUseQuery = apollo.useQuery as jest.Mock
const mockUseMutation = apollo.useMutation as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
  mockUseQuery.mockReturnValue({})
  mockUseMutation.mockReturnValue([jest.fn(), { loading: false }])
})

describe('WelcomeModal.queries - GET_WELCOME_MODAL document', () => {
  test('is a query operation', () => {
    const def = GET_WELCOME_MODAL.definitions[0] as any

    expect(def.operation).toBe('query')
  })

  test('operation is named GetWelcomeModal', () => {
    const def = GET_WELCOME_MODAL.definitions[0] as any

    expect(def.name.value).toBe('GetWelcomeModal')
  })

  test('top-level field is getWelcomeModal', () => {
    const def = GET_WELCOME_MODAL.definitions[0] as any
    const topField = def.selectionSet.selections[0]

    expect(topField.name.value).toBe('getWelcomeModal')
  })

  test('selects the status field from getWelcomeModal', () => {
    const def = GET_WELCOME_MODAL.definitions[0] as any
    const nestedFields = def.selectionSet.selections[0].selectionSet.selections

    expect(nestedFields).toHaveLength(1)
    expect(nestedFields[0].name.value).toBe('status')
  })
})

describe('WelcomeModal.queries - IGNORE_WELCOME_MODAL document', () => {
  test('is a mutation operation', () => {
    const def = IGNORE_WELCOME_MODAL.definitions[0] as any

    expect(def.operation).toBe('mutation')
  })

  test('operation is named IgnoreWelcomeModal', () => {
    const def = IGNORE_WELCOME_MODAL.definitions[0] as any

    expect(def.name.value).toBe('IgnoreWelcomeModal')
  })

  test('top-level field is ignoreWelcomeModal', () => {
    const def = IGNORE_WELCOME_MODAL.definitions[0] as any
    const topField = def.selectionSet.selections[0]

    expect(topField.name.value).toBe('ignoreWelcomeModal')
  })

  test('selects the success field from ignoreWelcomeModal', () => {
    const def = IGNORE_WELCOME_MODAL.definitions[0] as any
    const nestedFields = def.selectionSet.selections[0].selectionSet.selections

    expect(nestedFields).toHaveLength(1)
    expect(nestedFields[0].name.value).toBe('success')
  })
})

describe('WelcomeModal.queries - hook composition', () => {
  test('useGetWelcomeModal calls useQuery with GET_WELCOME_MODAL', () => {
    renderHook(() => useGetWelcomeModal())

    expect(mockUseQuery).toHaveBeenCalledTimes(1)
    expect(mockUseQuery).toHaveBeenCalledWith(GET_WELCOME_MODAL)
  })

  test('useIgnoreWelcomeModal calls useMutation with IGNORE_WELCOME_MODAL', () => {
    renderHook(() => useIgnoreWelcomeModal())

    expect(mockUseMutation).toHaveBeenCalledTimes(1)
    expect(mockUseMutation).toHaveBeenCalledWith(IGNORE_WELCOME_MODAL)
  })
})
