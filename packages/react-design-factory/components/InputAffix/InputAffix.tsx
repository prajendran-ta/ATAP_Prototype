import React, { FC } from 'react'
import Space from 'antd/es/space'
import type { InputAffixProps } from './InputAffix.d'
import * as Styled from './InputAffix.styled'

const InputAffix: FC<InputAffixProps> = ({ children, before, after }) => {
  return (
    <Space.Compact>
      {before && <Styled.Affix position='before'>{before}</Styled.Affix>}
      {children}
      {after && <Styled.Affix position='after'>{after}</Styled.Affix>}
    </Space.Compact>
  )
}

export default InputAffix
