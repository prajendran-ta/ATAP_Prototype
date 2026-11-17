import React, { useState, useCallback } from 'react'
import { Modal, Button, Text } from '@amadeus/react-design-factory'
import { clearCokkiesAndRedirect } from '@mediahub/mediahub-ui/MediaHubGqlProvider/MediaHubAuthMeLink'
import * as api from '@mediahub/mediahub-ui/api'
import * as Styled from './SessionExpiryModal.styled'
import type { SessionExpiryModalProps } from './SessionExpiryModalProps.d'

const DEFAULT_EXTENSION_MINUTES = 15

const formatCountdown = (seconds: number): string => {
  const mins = Math.floor(Math.max(seconds, 0) / 60)
  const secs = Math.max(seconds, 0) % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const SessionExpiryModal: React.FC<SessionExpiryModalProps> = ({ open, secondsRemaining, onExtended }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExtendSession = useCallback(
    async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await api.extendSession(DEFAULT_EXTENSION_MINUTES)

        if (response.status === 200) {
          const json = await response.json()
          onExtended(json.sessionTimeout)
        } else {
          setError('Something went wrong while extending the session. Please try again.')
        }
      } catch (err) {
        setError('Something went wrong while extending the session.')
      } finally {
        setLoading(false)
      }
    },
    [onExtended],
  )

  const handleExpire = useCallback(() => {
    clearCokkiesAndRedirect()
  }, [])

  const handleCancel = useCallback(() => {}, [])

  return (
    <Modal
      idPrefix='session-expiry-modal'
      title={<Text.H3>Session Expiring Soon</Text.H3>}
      open={open}
      onCancel={handleCancel}
      closable={false}
      width={500}
      centered
      footer={
        <>
          <Button variant='outlined' onClick={handleExpire} disabled={loading}>
            Log out now
          </Button>
          <Button onClick={handleExtendSession} loading={loading}>
            Extend session
          </Button>
        </>
      }
    >
      <Styled.CountdownText>
        Your session will expire in{' '}
        <strong>{formatCountdown(secondsRemaining)}</strong>.
      </Styled.CountdownText>
      <Styled.MessageText>
       Click "Extend session" to keep working without losing your progress.
      </Styled.MessageText>
      {error && (
        <Styled.ErrorText>
          {error}
        </Styled.ErrorText>
      )}
    </Modal>
  )
}

export default SessionExpiryModal
