export type NotificationType = 'error' | 'warning' | 'info' | 'default'

export interface NotificationConfig {
  color: string
  icon: React.ReactNode
}
