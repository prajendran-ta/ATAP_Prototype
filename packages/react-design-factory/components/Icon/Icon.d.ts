import type { iconRegistry } from './Icon'
import type { StatusColor } from '../../utils'

export interface IconProps extends Pick<React.SVGProps<SVGSVGElement>, 'id' | 'color' | 'width' | 'height'> {
  name: keyof typeof iconRegistry
  status?: StatusColor
  title?: string
}

export type SvgIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

export type LazySvgIconComponent = React.LazyExoticComponent<SvgIconComponent>
