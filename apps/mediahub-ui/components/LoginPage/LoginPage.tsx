import React, { useEffect, useState } from 'react'
import { ButtonWrapper, Root, Body, Footer } from './LoginPage.styled'
import { Button as LoginButton } from '@amadeus/react-design-factory/components/Button'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { apiConfig } from '@mediahub/mediahub-ui/api'
import { Toggle, colors } from '@amadeus/react-design-factory'
import {
  isLoginDisabled,
  isOfflineMode,
  setLoginDisabled,
  setOfflineMode,
  startOfflineSession,
} from '@mediahub/mediahub-ui/shared/offlineMode'

const LoginPage: React.FC = () => {
  const { user } = useAuth()
  const [offline, setOffline] = useState(isOfflineMode())
  const [loginSkipped, setLoginSkipped] = useState(isLoginDisabled())

  // If you are already authenticated, automatically redirect
  useEffect(() => {
    if (user) {
      window.location.href = '/'
    }
  }, [user])

  const destinationPath = new URLSearchParams(window.location.search).get('destinationPath') || '/'

  // Sign-in switched off: go straight into the app (`/login?login=on` shows this page again).
  useEffect(() => {
    if (loginSkipped) window.location.href = destinationPath
  }, [destinationPath, loginSkipped])

  return (
    <Root>
      <Body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ButtonWrapper>
            <LoginButton
              id='signin'
              size='large'
              onClick={() => {
                // Backend switched off: sign in locally with the demo user (no network call).
                if (offline) {
                  startOfflineSession()
                  window.location.href = destinationPath
                  return
                }
                // TEMP (TTT-3635 QA-env unblock): staging's backend now requires a tenant-selection
                // step (#425/#452/#454/#462, not ported here) for the slug-less /login; this branch
                // is a never-productionized prototype, so always use the internal tenant slug to
                // skip that step, regardless of host. Remove if tenant-selection is ever ported.
                let loginUrl = `${apiConfig.shared}/b0a8be27d966/login?destinationPath=${encodeURIComponent(destinationPath)}`
                if (origin.includes('localhost')) {
                  // from local
                  loginUrl = `${loginUrl}&env=local`
                }
                window.location.href = loginUrl
              }}
            >
              Sign in
            </LoginButton>
          </ButtonWrapper>
          <label
            htmlFor='offline-switch'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
              fontSize: 14,
              color: colors.cloud_0,
            }}
          >
            <Toggle
              id='offline-switch'
              size='small'
              checked={offline}
              disabled={loginSkipped}
              onChange={checked => {
                setOfflineMode(checked)
                setOffline(checked)
              }}
            />
            Work offline (backend off, demo data)
          </label>
          <label
            htmlFor='skip-login-switch'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
              fontSize: 14,
              color: colors.cloud_0,
            }}
          >
            <Toggle
              id='skip-login-switch'
              size='small'
              checked={loginSkipped}
              onChange={checked => {
                // Skipping sign-in implies the backend is off (the effect above then redirects).
                setLoginDisabled(checked)
                setLoginSkipped(checked)
                setOffline(isOfflineMode())
              }}
            />
            Skip sign-in (always signed in as the demo user)
          </label>
        </div>
      </Body>
      <Footer>&copy; {new Date().getFullYear()} TRAVELAUDIENCE.COM GmbH. All rights reserved</Footer>
    </Root>
  )
}

export default LoginPage
