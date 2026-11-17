import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import {
  createSpyClient,
  clearSharedLinkHandler,
  setSharedLinkHandler,
  sharedSpyClient,
  SpyApolloProvider,
  UseGetUsersHarness,
  UseGetUsersOptionsHarness,
  UseUpdateUserHarness,
  UseUserPermissionsHarness,
} from '../mocks/UserManagement.queries'
import {
  getUserPermissionsResponseData,
  getUsersOptionsResponseData,
  getUsersResponseData,
  updateUserSuccessResponseData,
} from '../data/UserManagement.queries'

// Prevent the real HttpLink (which requires a global `fetch`) from being
// instantiated when the module-level `sharedClient` in UserManagement.queries
// is imported. We replace it with the spy client so that useGetUsersOptionsQuery
// (which explicitly passes `client: sharedClient`) also goes through our spy.
// Note: jest.mock is hoisted before imports, so we use require() inside the
// factory to access sharedSpyClient after the module has been evaluated.
jest.mock('@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubGqlProvider', () => {
  const { sharedSpyClient } = require('../mocks/UserManagement.queries')
  return { client: sharedSpyClient }
})

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  clearSharedLinkHandler()
})

// ---------------------------------------------------------------------------
// useGetUsersQuery
// ---------------------------------------------------------------------------
describe('useGetUsersQuery — variables sent to the backend', () => {
  test('sends the default paginate limit (1000) and offset (0) when called without arguments', async () => {
    const { client, getCapturedVariables } = createSpyClient(getUsersResponseData)

    render(
      <SpyApolloProvider client={client}>
        <UseGetUsersHarness />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toEqual({
      options: { paginate: { limit: 1000, offset: 0 } },
    })
  })

  test('sends the provided limit and offset when called with custom arguments', async () => {
    const { client, getCapturedVariables } = createSpyClient(getUsersResponseData)

    render(
      <SpyApolloProvider client={client}>
        <UseGetUsersHarness limit={10} offset={20} />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toEqual({
      options: { paginate: { limit: 10, offset: 20 } },
    })
  })
})

// ---------------------------------------------------------------------------
// useGetUsersOptionsQuery
// ---------------------------------------------------------------------------
describe('useGetUsersOptionsQuery — variables sent to the backend', () => {
  test('sends the default paginate limit (1000000) and offset (0) when called without arguments', async () => {
    let capturedVariables: Record<string, unknown> | null = null

    setSharedLinkHandler(operation => {
      capturedVariables = operation.variables
      return getUsersOptionsResponseData
    })

    render(<UseGetUsersOptionsHarness />)

    await waitFor(() => expect(capturedVariables).not.toBeNull())

    expect(capturedVariables).toEqual({
      options: { paginate: { limit: 1000000, offset: 0 } },
    })
  })

  test('sends the provided limit and offset when called with custom arguments', async () => {
    let capturedVariables: Record<string, unknown> | null = null

    setSharedLinkHandler(operation => {
      capturedVariables = operation.variables
      return getUsersOptionsResponseData
    })

    render(<UseGetUsersOptionsHarness limit={50} offset={10} />)

    await waitFor(() => expect(capturedVariables).not.toBeNull())

    expect(capturedVariables).toEqual({
      options: { paginate: { limit: 50, offset: 10 } },
    })
  })
})

// ---------------------------------------------------------------------------
// useUserPermissionsQuery
// ---------------------------------------------------------------------------
describe('useUserPermissionsQuery — variables sent to the backend', () => {
  test('sends the provided userId as the query variable', async () => {
    const { client, getCapturedVariables } = createSpyClient(getUserPermissionsResponseData)

    render(
      <SpyApolloProvider client={client}>
        <UseUserPermissionsHarness userId={1} />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toEqual({ userId: 1 })
  })

  test('skips the network request when userId is 0 (falsy)', async () => {
    const { client, getCapturedVariables } = createSpyClient({})

    render(
      <SpyApolloProvider client={client}>
        <UseUserPermissionsHarness userId={0} />
      </SpyApolloProvider>,
    )

    // Give Apollo a tick — the query must not fire
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(getCapturedVariables()).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// useUpdateUserMutation
// ---------------------------------------------------------------------------
describe('useUpdateUserMutation — variables sent to the backend', () => {
  test('sends userId and role when only the role is being updated', async () => {
    const { client, getCapturedVariables } = createSpyClient(updateUserSuccessResponseData)

    render(
      <SpyApolloProvider client={client}>
        <UseUpdateUserHarness userId={1} role='mh-standard' />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toMatchObject({ userId: 1, role: 'mh-standard' })
  })

  test('sends userId and isActive when only the status is being updated', async () => {
    const { client, getCapturedVariables } = createSpyClient({
      updateUser: {
        ...updateUserSuccessResponseData.updateUser,
        user: { id: 2, role: 'mh-read-only', status: 'inactive' },
      },
    })

    render(
      <SpyApolloProvider client={client}>
        <UseUpdateUserHarness userId={2} isActive={false} />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toMatchObject({ userId: 2, isActive: false })
  })

  test('sends userId, role, and isActive when both fields are being updated simultaneously', async () => {
    const { client, getCapturedVariables } = createSpyClient({
      updateUser: {
        ...updateUserSuccessResponseData.updateUser,
        user: { id: 3, role: 'mh-administrator', status: 'active' },
      },
    })

    render(
      <SpyApolloProvider client={client}>
        <UseUpdateUserHarness userId={3} role='mh-administrator' isActive={true} />
      </SpyApolloProvider>,
    )

    await waitFor(() => expect(getCapturedVariables()).not.toBeNull())

    expect(getCapturedVariables()).toEqual({ userId: 3, role: 'mh-administrator', isActive: true })
  })
})
