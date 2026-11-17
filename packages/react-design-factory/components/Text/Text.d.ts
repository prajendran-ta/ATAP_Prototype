import { StatusColor } from '../../utils'

export interface TextProps {
  status?: StatusColor
  children?: React.ReactNode
}

export interface LabelProps extends TextProps {
  htmlFor?: string
  status?: StatusColor
}
