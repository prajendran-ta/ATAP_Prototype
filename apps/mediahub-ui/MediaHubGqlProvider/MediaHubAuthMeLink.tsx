import { setContext } from '@apollo/client/link/context'
import * as api from '@mediahub/mediahub-ui/api'

export const clearCokkiesAndRedirect = async () => {
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim()
    document.cookie = `${name}=`
  })
  window.location.href = '/login'
}

// Runs on every GraphQL request as a lightweight session tripwire. Only a DEFINITIVE 401
// (session genuinely invalid) triggers a redirect to /login. Transient backend blips —
// network errors, timeouts, 5xx/501 "Not Implemented" — are ignored so they don't yank the
// user to the backend host mid-navigation (the real auth gate still runs at app load in
// MediaHubProvider).
export const meLink = setContext(async (_, { headers }) => {
  api
    .me()
    .then(response => {
      if (response.status === 401) {
        clearCokkiesAndRedirect()
      }
    })
    .catch(() => {
      // Swallow network/transient errors — do not redirect on a flaky /me.
    })

  return {
    headers: {
      ...headers,
    },
  }
})
