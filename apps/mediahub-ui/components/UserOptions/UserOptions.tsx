import React from 'react'
import { DropdownMenu, colors } from '@amadeus/react-design-factory'
import { UserOptionsProps } from './UserOptions.d'
import { UsersOptionsButton } from './UserOptions.styled'

const UserOptions: React.FC<UserOptionsProps> = ({ options }) => {
  return (
    <DropdownMenu items={options}>
      <UsersOptionsButton iconName='user' color={colors.sky_90} height={20} width={20} />
    </DropdownMenu>
  )
}

export default UserOptions
