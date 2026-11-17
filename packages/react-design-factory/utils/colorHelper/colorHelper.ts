import { colors } from '../../styles'
import { type StatusColor } from './colorHelper.d'

export const getStatusColor = (status?: StatusColor) => {
  switch (status) {
    case 'primary':
      return colors.sky_60
    case 'error':
      return colors.crimson_60
    case 'success':
      return colors.forest_60
    case 'warning':
      return colors.pumpkin_70
    case 'helper':
      return colors.cloud_80
    case 'disabled':
      return colors.cloud_50
    case 'default':
    default:
      return colors.cloud_100
  }
}

export const getStatusFontColor = (status?: StatusColor) => {
  switch (status) {
    case 'disabled':
      return colors.cloud_30
    case 'success':
    case 'default':
      return colors.cloud_100
    case 'primary':
    case 'error':
    case 'warning':
    case 'helper':
    default:
      return colors.cloud_0
  }
}
