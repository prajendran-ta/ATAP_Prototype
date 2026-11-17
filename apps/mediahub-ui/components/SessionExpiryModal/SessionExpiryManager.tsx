import React from 'react'
import SessionExpiryModal from './SessionExpiryModal'
import { useSessionTimer } from '../../hooks/useSessionTimer'

interface SessionExpiryManagerProps {
  sessionTimeout?: number
  onExpired: () => void
  onExtended: (newTimeoutSeconds: number) => void
}

const SessionExpiryManager: React.FC<SessionExpiryManagerProps> = ({
  sessionTimeout,
  onExpired,
  onExtended,
}) => {
  const { showWarning, secondsRemaining, resetTimer } = useSessionTimer(sessionTimeout, onExpired)

  const handleExtended = React.useCallback(
    (newTimeoutSeconds: number) => {
      resetTimer(newTimeoutSeconds)
      onExtended(newTimeoutSeconds)
    },
    [onExtended, resetTimer],
  )

  return <SessionExpiryModal open={showWarning} secondsRemaining={secondsRemaining} onExtended={handleExtended} />
}

export default SessionExpiryManager