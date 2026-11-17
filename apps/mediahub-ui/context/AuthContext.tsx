import { createContext, useCallback, useContext } from 'react'
import { featureFlags } from '@mediahub/mediahub-ui/shared/featureFlags'

export interface UserInterface {
  firstName?: string
  id?: number
  lastName?: string
  username?: string
  picture?: string
  roles?: { key: string; name: string }[]
  permissions?: string[]
  sessionTimeout?: number
}

export const AuthContext = createContext<
  | {
      user?: UserInterface
      permissions?: string[]
      role?: string
      permissionsLoaded: boolean
      logout: () => void
      isAuthChecked: boolean
      sessionTimeout?: number
      onSessionExtended: (newTimeoutSeconds: number) => void
    }
  | undefined
>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  const hasPermission = useCallback(
    (name: string) => !!context.permissions && context.permissions.includes(name),
    [context.permissions],
  )

  const isAdmin = 'mh-administrator' === context?.role
  const isStandard = 'mh-standard' === context?.role
  const isReadOnly = 'mh-read-only' === context?.role
  // TODO: replace with role check e.g. 'mh-advertiser' === context?.role
  const isExternal = featureFlags.multiLanguage && localStorage.getItem('mh-external') === 'true'


  const getTokenFromUrl = (): string | null => {
    const params = new URLSearchParams(window.location.search)
    return params.get('token')
  }

  const tokenFromUrl = getTokenFromUrl()
  const params = new URLSearchParams(window.location.search)

  if (tokenFromUrl) {
    // `Secure` cookies are silently rejected by the browser on insecure origins (e.g. local
    // dev on http://localhost), which would otherwise leave the auth cookie unset and cause
    // an endless redirect back to /login.
    const isSecureContext = window.location.protocol === 'https:'
    const cookieFlags = isSecureContext ? '; Secure; SameSite=None' : ''
    document.cookie = `authorization=${encodeURIComponent(tokenFromUrl)}; Path=/${cookieFlags}`
    params.delete('token')
    const newQuery = params.toString()
    const newUrl = newQuery ? `/?${newQuery}` : '/'

    window.history.replaceState({}, document.title, newUrl)
  }

  return { ...context, hasPermission, isAdmin, isStandard, isReadOnly, isExternal }
}
