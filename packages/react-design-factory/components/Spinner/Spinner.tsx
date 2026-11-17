import React, { FC } from 'react'
import AntdSpin from 'antd/es/spin'
import LoadingOutlinedIcon from '@ant-design/icons/LoadingOutlined'
import type { SpinnerProps } from './Spinner.d'
import * as Styled from './Spinner.styled'

const Spinner: FC<SpinnerProps> = ({ fullscreen, size = 'large' }) => {
  return (
    <Styled.SpinnerWrapper>
      <AntdSpin indicator={<LoadingOutlinedIcon spin />} fullscreen={fullscreen} size={size} />
    </Styled.SpinnerWrapper>
  )
}

export default Spinner
