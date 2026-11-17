import styled from '@emotion/styled'
import {
  CheckCircleOutlined as AntdCheckCircleOutlined,
  CloseCircleOutlined as AntdCloseCircleOutlined,
  InfoCircleOutlined as AntdInfoCircleOutlined,
} from '@ant-design/icons'
import { getStatusColor } from '@amadeus/react-design-factory/utils'

export const CheckCircleOutlined = styled(AntdCheckCircleOutlined)`
  color: ${getStatusColor('success')};
  font-size: 16px;
`

export const InfoCircleOutlined = styled(AntdInfoCircleOutlined)`
  color: ${getStatusColor('warning')};
  font-size: 16px;
`

export const CloseCircleOutlined = styled(AntdCloseCircleOutlined)`
  color: ${getStatusColor('error')};
  font-size: 16px;
`