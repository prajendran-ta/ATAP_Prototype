import { DrawerProps as AntDrawerProps } from 'antd/es'

export type DrawerMode = 'userDetails' | 'notifications' | string

export type DrawerProps = AntDrawerProps & {
  /**
   * Custom content renderer for the drawer body.
   */
  renderContent?: () => React.ReactNode
  /**
   * Optional mode/type for predefined layouts or styling.
   */
  mode?: DrawerMode
}
