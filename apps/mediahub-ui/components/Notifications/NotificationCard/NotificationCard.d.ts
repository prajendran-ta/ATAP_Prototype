export interface NotificationCardProps {
  notification: SharedQL.GroupedNotification
}

export interface LinkActionProps extends Pick<ButtonProps, 'id' | 'children'> {
  onClick?: () => void
  href?: string
}
