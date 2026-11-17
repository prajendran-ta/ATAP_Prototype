import { apiConfig } from '@mediahub/mediahub-ui/api/apiConfig/apiConfig'
import { isOfflineMode } from '../../shared/offlineMode'

const API_URL = location.host.includes('localhost') ? '/api.shared' : apiConfig.shared

export const startCopilotConversation = (): Promise<Response> =>
  isOfflineMode()
    ? Promise.reject(new Error('Backend is switched off (offline mode)'))
    : fetch(`${API_URL}/chatbot/start`, {
        method: 'POST',
        credentials: 'include',
      })

export const sendCopilotMessage = (conversationId: string, text: string): Promise<Response> =>
  isOfflineMode()
    ? Promise.reject(new Error('Backend is switched off (offline mode)'))
    : fetch(`${API_URL}/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ conversationId, text }),
      })
