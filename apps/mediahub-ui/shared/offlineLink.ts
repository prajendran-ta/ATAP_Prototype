import { ApolloLink, Observable } from '@apollo/client'
import { isOfflineMode } from './offlineMode'

/**
 * Placed right before the HttpLink of every Apollo client: while the backend switch is off, requests
 * that reach the network layer fail immediately instead of hitting the network. Mock links placed
 * earlier in the chain still answer demo data (and fall back to it when this link errors).
 */
export const offlineLink = new ApolloLink((operation, forward) => {
  if (!isOfflineMode()) return forward(operation)
  return new Observable(observer => {
    observer.error(new Error(`Backend is switched off (offline mode): ${operation.operationName}`))
  })
})
