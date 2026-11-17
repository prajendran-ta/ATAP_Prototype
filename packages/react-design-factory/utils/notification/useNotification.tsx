import { App } from '../..'
import MinusCircleIcon from '@ant-design/icons/MinusCircleFilled'
import WarningFilledIcon from '@ant-design/icons/WarningFilled'
import { colors } from '../../styles'
import { NotificationUndoAction } from '@amadeus/react-design-factory/utils/notification/NotificationUndoAction'
import type { ReactNode } from 'react'

export const useNotification = () => {
  const { notification } = App.useApp()

  const success = (message: string, config?: { description?: ReactNode; onUndo?: () => Promise<void> }) => {
    const content = config?.onUndo ? <NotificationUndoAction message={message} onUndo={config.onUndo} /> : message

    notification.success({
      message: content,
      placement: 'bottomLeft',
      description: config?.description,
      pauseOnHover: true,
      style: {
        backgroundColor: colors.forest_10,
        borderLeft: `4px solid ${colors.forest_60}`,
        borderRadius: '4px',
        ...(config?.onUndo && { width: 'fit-content' }),
      },
    })
  }

  const error = (message: string, config?: { description?: ReactNode }) => {
    notification.error({
      message,
      description: config?.description,
      placement: 'bottomLeft',
      pauseOnHover: true,
      icon: <MinusCircleIcon style={{ color: colors.crimson_60 }} />,
      style: {
        backgroundColor: colors.crimson_10,
        borderLeft: `4px solid ${colors.crimson_60}`,
        borderRadius: '4px',
      },
    })
  }

  const info = (message: string, config?: { description?: ReactNode }) => {
    notification.info({
      message,
      description: config?.description,
      placement: 'bottomLeft',
      pauseOnHover: true,
      style: {
        backgroundColor: colors.sky_10,
        borderLeft: `4px solid ${colors.sky_60}`,
        borderRadius: '4px',
      },
    })
  }

  const warning = (message: string, config?: { description?: ReactNode }) => {
    notification.warning({
      message,
      description: config?.description,
      placement: 'bottomLeft',
      pauseOnHover: true,
      icon: <WarningFilledIcon style={{ color: colors.pumpkin_60 }} />,
      style: {
        backgroundColor: colors.pumpkin_10,
        borderLeft: `4px solid ${colors.pumpkin_60}`,
        borderRadius: '4px',
      },
    })
  }

  return { success, error, info, warning }
}
