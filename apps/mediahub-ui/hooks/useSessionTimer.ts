import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseSessionTimerResult } from './useSessionTimer.d'

const WARNING_THRESHOLD_SECONDS = 120
const MILLISECONDS_IN_SECOND = 1000

export const useSessionTimer = (sessionTimeout: number | undefined, onExpired?: () => void): UseSessionTimerResult => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(sessionTimeout ?? 0)
  const [showWarning, setShowWarning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const expiresAtRef = useRef<number | null>(null)
  const onExpiredRef = useRef(onExpired)

  useEffect(() => {
    onExpiredRef.current = onExpired
  }, [onExpired])

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(
    (timeoutSeconds: number) => {
      clearTimer()
      expiresAtRef.current = Date.now() + timeoutSeconds * MILLISECONDS_IN_SECOND
      setSecondsRemaining(timeoutSeconds)
      setShowWarning(timeoutSeconds > 0 && timeoutSeconds <= WARNING_THRESHOLD_SECONDS)

      intervalRef.current = setInterval(() => {
        const expiresAt = expiresAtRef.current
        if (!expiresAt) {
          return
        }

        const next = Math.max(Math.ceil((expiresAt - Date.now()) / MILLISECONDS_IN_SECOND), 0)

        setSecondsRemaining(prev => (prev === next ? prev : next))
        setShowWarning(next > 0 && next <= WARNING_THRESHOLD_SECONDS)

        if (next <= 0) {
          clearTimer()
          onExpiredRef.current?.()
        }
      }, MILLISECONDS_IN_SECOND)
    },
    [clearTimer],
  )

  const resetTimer = useCallback(
    (newTimeoutSeconds: number) => {
      startTimer(newTimeoutSeconds)
    },
    [startTimer],
  )

  useEffect(() => {
    if (sessionTimeout && sessionTimeout > 0) {
      startTimer(sessionTimeout)
    }

    return clearTimer
  }, [sessionTimeout, startTimer, clearTimer])

  return { showWarning, secondsRemaining, resetTimer }
}
