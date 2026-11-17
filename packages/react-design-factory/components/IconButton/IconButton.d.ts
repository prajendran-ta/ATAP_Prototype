import type { StatusColor } from '../../utils'
import type { ButtonProps } from '../Button/Button.d'
import type { iconRegistry } from '../Icon/Icon'
import type { IconProps } from '../Icon/Icon.d'

export interface IconButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  iconName: keyof typeof iconRegistry
  color?: IconProps['color']
  status?: StatusColor
  width?: IconProps['width']
  height?: IconButtonProps['height']
}
