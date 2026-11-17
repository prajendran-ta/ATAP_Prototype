import { apiConfig, currentEnv } from './apiConfig'
import { OFFLINE_DEMO_USER, endOfflineSession, hasOfflineSession, isOfflineMode } from '../shared/offlineMode'

const isLocal = location.host.includes('localhost')

const config = {
  API_URL: isLocal ? '/api.shared' : apiConfig.shared,
}

const getCookieValue = (name: string): string | null => {
  const target = `${name}=`
  const cookie = document.cookie
    .split(';')
    .map(entry => entry.trim())
    .find(entry => entry.startsWith(target))

  if (!cookie) return null

  return decodeURIComponent(cookie.slice(target.length))
}

// The backend authenticates via the Authorization header, not the cookie itself — the cookie
// only exists so the frontend can read the token back out and attach it here.
const getAuthorizationHeader = (): Record<string, string> => {
  const authorizationToken = getCookieValue('authorization')
  if (!authorizationToken) return {}
  const bearerToken = authorizationToken.startsWith('Bearer ') ? authorizationToken : `Bearer ${authorizationToken}`
  return { Authorization: bearerToken }
}

const offlineResponse = (status: number, body?: unknown) =>
  Promise.resolve(new Response(body === undefined ? null : JSON.stringify(body), { status }))

export const logout = () => {
  if (isOfflineMode()) {
    endOfflineSession()
    return offlineResponse(200)
  }
  return fetch(config.API_URL + '/logout', {
    method: 'POST',
    credentials: 'include',
    headers: getAuthorizationHeader(),
  })
}

export const me = () => {
  // Backend off: the signed-in state is the local demo session created on the login page.
  if (isOfflineMode()) return hasOfflineSession() ? offlineResponse(200, OFFLINE_DEMO_USER) : offlineResponse(401)
  return fetch(config.API_URL + '/me', {
    method: 'GET',
    credentials: 'include',
    headers: getAuthorizationHeader(),
  })
}

export const extendSession = (minutes: number) => {
  if (isOfflineMode()) return offlineResponse(200, { sessionTimeout: undefined })
  return fetch(config.API_URL + '/session/extend', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify({ minutes }),
  })
}

export const getResources = () => {
  // Reject so the caller uses its built-in fallback links.
  if (isOfflineMode()) return Promise.reject(new Error('Backend is switched off (offline mode)'))
  return fetch(`${config.API_URL}/resources/${currentEnv}`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthorizationHeader(),
  })
}
