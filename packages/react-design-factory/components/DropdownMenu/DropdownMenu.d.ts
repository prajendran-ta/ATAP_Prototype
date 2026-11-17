import type { DropdownProps as AntdDropdownProps } from 'antd/es/dropdown'
import type { ItemType } from 'antd/es/menu/interface'

export interface DropdownProps
  extends Pick<AntdDropdownProps, 'align' | 'children' | 'disabled' | 'placement' | 'trigger'> {
  items: ItemType[]
  menuType?: 'kebab'
}

export { ItemType }
