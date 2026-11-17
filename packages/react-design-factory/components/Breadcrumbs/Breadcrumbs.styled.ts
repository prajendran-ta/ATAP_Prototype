import styled from '@emotion/styled'
import AntdBreadcrumb from 'antd/es/breadcrumb'
import { colors } from '../../styles'

export const Breadcrumb = styled(AntdBreadcrumb)`
  margin-bottom: 24px;

  & .amadeus-breadcrumb-separator {
    color: ${colors.cloud_100};
    svg {
      font-size: 12px;
    }
  }

  // Last item (Text)
  > ol > li > span {
    color: ${colors.cloud_100};
  }

  // Links
  & a {
    color: ${colors.sky_60};
    &:hover {
      color: ${colors.sky_80};
      background-color: ${colors.sky_20};
      text-decoration: underline;
    }
    &:active {
      color: ${colors.sky_90};
      background-color: ${colors.sky_30};
      text-decoration: underline;
    }
  }
`
