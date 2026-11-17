import type { ItemType } from '@amadeus/react-design-factory/components/DropdownMenu'
import { ReactElement } from 'react'

export interface UserOptionItem {
  key: string
  label: string
  component: ReactElement
}

export interface UserOptionsProps {
  options: ItemType[]
}
