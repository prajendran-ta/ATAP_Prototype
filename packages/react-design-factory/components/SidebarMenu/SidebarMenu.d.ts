import type React from 'react'
import type { MenuProps } from 'antd/es/menu'

export type SidebarMenuNode = {
  key: string
  label: string
  icon?: React.ReactNode
  children?: SidebarMenuNode[]
  href?: string
  activePatterns?: string[]
}

export interface SidebarMenuProps
  extends Pick<MenuProps, 'id' | 'defaultSelectedKeys' | 'style' | 'openKeys' | 'motion' | 'onOpenChange'> {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  onSelect?: (key: string) => void
  items: SidebarMenuNode[]
  showSearch?: boolean
  searchPlaceholder?: string
}
