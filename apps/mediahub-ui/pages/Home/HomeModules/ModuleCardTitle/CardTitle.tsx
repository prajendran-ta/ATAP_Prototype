import React from 'react'
import { Text } from '@amadeus/react-design-factory'
import { TitleRow, IconWrapper } from './CardTitle.styled'
import { CardTitleProps } from './CardTitle.d'

const CardTitle: React.FC<CardTitleProps> = ({ icon, text }) => (
  <TitleRow>
    <IconWrapper>{icon}</IconWrapper>
    <Text.H5>{text}</Text.H5>
  </TitleRow>
)

export default CardTitle
