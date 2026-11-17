import React from 'react'
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined'
import WarningOutlined from '@ant-design/icons/WarningOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import type { NotificationType, NotificationConfig } from './Notifications.d'

const notificationsConfig: Record<NotificationType, NotificationConfig> = {
  error: {
    color: 'red',
    icon: <CloseCircleOutlined style={{ color: 'red', fontSize: 18 }} />,
  },
  warning: {
    color: 'orange',
    icon: <WarningOutlined style={{ color: 'orange', fontSize: 18 }} />,
  },
  info: {
    color: 'blue',
    icon: <InfoCircleOutlined style={{ color: 'blue', fontSize: 18 }} />,
  },
  default: {
    color: '#d9d9d9',
    icon: null,
  },
}

export const getNotificationConfig = (type: string) => {
  const settings = notificationsConfig[type as NotificationType] || notificationsConfig['default']

  return {
    color: settings.color,
    icon: settings.icon,
  }
}
