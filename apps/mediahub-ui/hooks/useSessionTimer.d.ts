export interface UseSessionTimerResult {
  showWarning: boolean
  secondsRemaining: number
  resetTimer: (newTimeoutSeconds: number) => void
}