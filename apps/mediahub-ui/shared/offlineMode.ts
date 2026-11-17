/**
 * Prototype "backend off" switch.
 *
 * When ON, the app makes no backend calls: sign-in creates a local demo session, `/me`, `/logout` and
 * `/resources` are answered locally, and every GraphQL request that reaches the network layer fails
 * fast (the advertiser / OBA mock links then serve their demo data). The login page is kept.
 *
 * A second switch, "skip sign-in", also removes the login step: the demo user is always signed in and
 * `/login` redirects straight into the app. It implies the backend is off.
 *
 * Turn it on/off:
 *  - the "Work offline" toggle on the login page, or
 *  - `?offline=on` / `?offline=off` on any URL (persisted), or
 *  - `localStorage.setItem('mediahub.offline-mode', 'on')` in the console.
 *  - Skip sign-in: the login-page toggle, or `?login=off` (skip) / `?login=on` (show login again).
 */
// Set to true by webpack.config.ts: the standalone "ATAP demo" bundle starts with the backend off
// and sign-in skipped. A stored choice (toggle or ?offline= / ?login= URL param) still wins.
declare const __ATAP_DEMO__: boolean | undefined
const DEMO_DEFAULT = typeof __ATAP_DEMO__ !== 'undefined' && __ATAP_DEMO__ === true

const MODE_KEY = 'mediahub.offline-mode'
const SESSION_KEY = 'mediahub.offline-session'
const LOGIN_KEY = 'mediahub.login-disabled'

const readStorage = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStorage = (key: string, value: string | null) => {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable (private mode): the switch simply won't persist.
  }
}

// `?offline=on|off` persists the choice, so it survives the redirects of the login flow.
if (typeof window !== 'undefined') {
  const requested = new URLSearchParams(window.location.search).get('offline')
  if (requested === 'on' || requested === 'off') writeStorage(MODE_KEY, requested)
  const login = new URLSearchParams(window.location.search).get('login')
  if (login === 'off' || login === 'on') writeStorage(LOGIN_KEY, login)
}

/** True when sign-in is skipped (always the demo user). Implies the backend is off. */
export const isLoginDisabled = (): boolean => {
  const stored = readStorage(LOGIN_KEY)
  return stored === null ? DEMO_DEFAULT : stored === 'off'
}

export const setLoginDisabled = (disabled: boolean) => writeStorage(LOGIN_KEY, disabled ? 'off' : 'on')

export const isOfflineMode = (): boolean => {
  const stored = readStorage(MODE_KEY)
  return isLoginDisabled() || (stored === null ? DEMO_DEFAULT : stored === 'on')
}

export const setOfflineMode = (on: boolean) => writeStorage(MODE_KEY, on ? 'on' : 'off')

export const hasOfflineSession = (): boolean => isLoginDisabled() || readStorage(SESSION_KEY) === 'active'

export const startOfflineSession = () => writeStorage(SESSION_KEY, 'active')

export const endOfflineSession = () => writeStorage(SESSION_KEY, null)

/** All permission keys the demo user holds (administrator). */
const DEMO_PERMISSIONS = ['mh-user-read', 'mh-user-write', 'mh-admin']

export const OFFLINE_DEMO_USER = {
  id: 1,
  firstName: 'Demo',
  lastName: 'User',
  username: 'demo.user@example.com',
  roles: [{ key: 'mh-administrator', name: 'Administrator' }],
  permissions: DEMO_PERMISSIONS,
}

export const OFFLINE_DEMO_ROLE = 'mh-administrator'
