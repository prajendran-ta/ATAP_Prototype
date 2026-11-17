import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { App, ConfigProvider } from '@amadeus/react-design-factory'
import * as api from '@mediahub/mediahub-ui/api'
import { UserInterface } from './context/AuthContext'
import { useUserPermissionsQuery } from './pages/UsersManagement/UserManagement.queries'

import { clearCokkiesAndRedirect } from './MediaHubGqlProvider/MediaHubAuthMeLink'
import { OFFLINE_DEMO_ROLE, isOfflineMode } from './shared/offlineMode'
import SessionExpiryManager from './components/SessionExpiryModal/SessionExpiryManager'

const MediaHubProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | undefined>(undefined)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState<number | undefined>(undefined)

  const { data, loading } = useUserPermissionsQuery(
    isOfflineMode() ? (undefined as unknown as number) : (user?.id as number),
  )

  useEffect(() => {
    if (window.location.pathname === '/login') {
      setIsAuthChecked(true)
      return
    }

    api
      .me()
      .then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            setUser(json)
            setSessionTimeout(json.sessionTimeout)
            setIsAuthChecked(true)
          })
        } else {
          setIsAuthChecked(true)
        }
      })
      .catch(() => {
        setIsAuthChecked(true)
      })
  }, [])

  const offline = isOfflineMode()

  const handleLogout = useCallback(() => {
    api
      .logout()
      .then(() => {
        setUser(undefined)
        document.location.assign('/login')
      })
      .catch(() => {})
  }, [])

  const handleSessionExtended = useCallback((newTimeoutSeconds: number) => {
    setSessionTimeout(newTimeoutSeconds)
  }, [])

  const authContextValue = useMemo(
    () => ({
      user,
      logout: handleLogout,
      isAuthChecked,
      role: offline ? (user ? OFFLINE_DEMO_ROLE : undefined) : data?.user?.role,
      permissionsLoaded: offline ? !!user : !!data?.user?.permissions && !loading,
      permissions: offline ? user?.permissions : data?.user?.permissions,
      sessionTimeout,
      onSessionExtended: handleSessionExtended,
    }),
    [
      data?.user?.permissions,
      data?.user?.role,
      offline,
      handleLogout,
      handleSessionExtended,
      isAuthChecked,
      loading,
      sessionTimeout,
      user,
    ],
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      <ConfigProvider>
        {children}
        <SessionExpiryManager
          sessionTimeout={sessionTimeout}
          onExpired={clearCokkiesAndRedirect}
          onExtended={handleSessionExtended}
        />
      </ConfigProvider>
    </AuthContext.Provider>
  )
}

export default MediaHubProviders
