import React, { FC } from 'react'
import AntdDropdown from 'antd/es/dropdown'
import { colors, IconButton } from '../..'
import type { DropdownProps } from './DropdownMenu.d'

const DropdownMenu: FC<DropdownProps> = ({
  align,
  children,
  menuType,
  disabled,
  items,
  placement = 'bottomRight',
  trigger = ['click'],
}) => {
  return (
    <AntdDropdown align={align} disabled={disabled} menu={{ items }} placement={placement} trigger={trigger}>
      {menuType === 'kebab' ? <IconButton iconName='ellipsisVertical' color={colors.cloud_80} /> : children}
    </AntdDropdown>
  )
}

export default DropdownMenu
