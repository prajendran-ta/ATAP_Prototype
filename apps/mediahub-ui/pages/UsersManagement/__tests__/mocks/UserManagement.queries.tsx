import React from 'react'
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, Observable } from '@apollo/client'

export type LinkHandler = (
  operation: { variables: Record<string, unknown> },
) => Record<string, unknown>

let _sharedLinkHandler: LinkHandler | null = null

export function setSharedLinkHandler(handler: LinkHandler) {
  _sharedLinkHandler = handler
}

export function clearSharedLinkHandler() {
  _sharedLinkHandler = null
}

const sharedSpyLink = new ApolloLink(operation => {
  const data = _sharedLinkHandler ? _sharedLinkHandler(operation) : {}
  return Observable.of({ data })
})

export const sharedSpyClient = new ApolloClient({
  link: sharedSpyLink,
  cache: new InMemoryCache(),
})

// ---------------------------------------------------------------------------
// Spy client factory — used for queries/mutations that go through ApolloProvider
// ---------------------------------------------------------------------------
export function createSpyClient(mockData: Record<string, unknown>) {
  let capturedVariables: Record<string, unknown> | null = null

  const spyLink = new ApolloLink(operation => {
    capturedVariables = operation.variables
    return Observable.of({ data: mockData })
  })

  const client = new ApolloClient({ link: spyLink, cache: new InMemoryCache() })

  return {
    client,
    getCapturedVariables: () => capturedVariables,
  }
}

export function UseGetUsersHarness({ limit, offset }: { limit?: number; offset?: number }) {
  const { useGetUsersQuery } = require('../../UserManagement.queries')
  useGetUsersQuery(limit, offset)
  return null
}

export function UseGetUsersOptionsHarness({ limit, offset }: { limit?: number; offset?: number }) {
  const { useGetUsersOptionsQuery } = require('../../UserManagement.queries')
  useGetUsersOptionsQuery(limit, offset)
  return null
}

export function UseUserPermissionsHarness({ userId }: { userId: number }) {
  const { useUserPermissionsQuery } = require('../../UserManagement.queries')
  useUserPermissionsQuery(userId)
  return null
}

export function UseUpdateUserHarness({
  userId,
  role,
  isActive,
}: {
  userId: number
  role?: string
  isActive?: boolean
}) {
  const { useUpdateUserMutation } = require('../../UserManagementDetails/UserManagementDetails.queries')
  const [updateUser] = useUpdateUserMutation()
  React.useEffect(() => {
    updateUser({ variables: { userId, role, isActive } })
  }, [])
  return null
}

// ---------------------------------------------------------------------------
// Wrapper that provides a spy ApolloProvider
// ---------------------------------------------------------------------------
export function SpyApolloProvider({
  client,
  children,
}: {
  client: ApolloClient<any>
  children: React.ReactNode
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
