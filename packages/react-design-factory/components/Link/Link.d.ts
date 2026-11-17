import { LinkProps as AntdLinkProps } from 'antd/es/typography/Link'

export interface LinkProps extends Pick<AntdLinkProps, 'id' | 'children' | 'href' | 'target' | 'onClick'> {
  iconAlone?: boolean
  size?: 'small' | 'default' | 'large' | undefined
  linkIcon?: 'external' | 'chevron' | React.ReactNode
  disabled?: boolean
}
