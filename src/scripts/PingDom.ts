import { currentEnv } from '@mediahub/mediahub-ui/api'

const pingDomConfig: Record<string, string> = {
  'staging-1': '//rum-static.pingdom.net/pa-69b968f54ee16c001200000c.js',
  production: '//rum-static.pingdom.net/pa-69ba5b1b707a270012000009.js',
}

export const appendPingDomScript = () => {
  if (
    location.hostname === 'localhost' ||
    location.hostname.includes('uat') ||
    location.hostname.includes('staging-2') ||
    location.hostname.includes('staging-3') ||
    location.hostname.split('.')[1] === 'staging'
  ) {
    return // Skip PingDom monitoring
  }

  const scriptUrl = pingDomConfig[currentEnv] || ''
  if (!scriptUrl) return

  const pingDomScript = document.createElement('script')
  pingDomScript.async = true
  pingDomScript.src = scriptUrl
  document.body.appendChild(pingDomScript)
}
