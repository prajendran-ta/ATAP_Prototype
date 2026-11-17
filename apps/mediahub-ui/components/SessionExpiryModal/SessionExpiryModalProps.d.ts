export interface SessionExpiryModalProps {
  open: boolean
  secondsRemaining: number
  onExtended: (newTimeoutSeconds: number) => void
}