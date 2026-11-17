import './i18n'
import i18n from './i18n'
import React, { lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import MediaHubProvider from '@mediahub/mediahub-ui/MediaHubProvider'
import MediaplannerUi from '@mediahub/mediaplanner-ui'
import ProtectedRoute from './routes/ProtectedRoute'
import SiteContainer from './routes/SiteContainer'
import MediaHubGqlProvider from '@mediahub/mediahub-ui/MediaHubGqlProvider'
import { App } from '@amadeus/react-design-factory'
import { appendPingDomScript } from './scripts/PingDom'
import { featureFlags } from '@mediahub/mediahub-ui/shared/featureFlags'

const LoginPage = lazy(() => import(/* webpackChunkName: "login" */ '@mediahub/mediahub-ui/components/LoginPage'))
const MediaHubUi = lazy(() => import(/* webpackChunkName: "mediahub" */ '@mediahub/mediahub-ui'))
const ObaUi = lazy(() => import(/* webpackChunkName: "oba" */ '@mediahub/oba-ui'))
const AdPreviewPage = lazy(() => import(/* webpackChunkName: "ad-preview" */ '@mediahub/mediahub-ui/pages/AdPreview'))
const AdvertisersUi = lazy(() => import(/* webpackChunkName: "advertisers" */ '@mediahub/advertisers-ui'))

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <MediaHubGqlProvider>
        <App>
          <MediaHubProvider>
            <BrowserRouter>
              {/* Boundary for the lazy LoginPage (the shell has its own in SiteContainer). */}
              <React.Suspense fallback={null}>
                <Routes>
                  {/* public routes */}
                  <Route path='/login' element={<LoginPage />} />

                  {/* Standalone publisher page for previewing display ads (no app shell) */}
                  <Route
                    path='/all-campaigns/preview'
                    element={
                      <ProtectedRoute>
                        <AdPreviewPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Routes with Shared Layout */}
                  <Route
                    element={
                      <ProtectedRoute>
                        <SiteContainer />
                      </ProtectedRoute>
                    }
                  >
                    <Route path='/oba/*' element={<ObaUi />} />
                    <Route path='/advertisers/*' element={<AdvertisersUi />} />
                    {featureFlags.mediaPlan && <Route path='/mediaplanner/*' element={<MediaplannerUi />} />}
                    <Route path='/*' element={<MediaHubUi />} />
                  </Route>

                  {/* Default Fallback */}
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
          </MediaHubProvider>
        </App>
      </MediaHubGqlProvider>
    </I18nextProvider>
  </React.StrictMode>,
)
appendPingDomScript()
