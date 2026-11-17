import styled from '@emotion/styled'
import AntdLink from 'antd/es/typography/Link'
import type { LinkProps } from './Link.d'
import { colors } from '../../styles'

type StyleProps = Pick<LinkProps, 'iconAlone' | 'size'>

const fontSizeBySize = (size: StyleProps['size']) => {
  switch (size) {
    case 'small':
      return '12px'
    case 'large':
      return '16px'
    default:
      return '14px'
  }
}

const blockedWrapperProps: ReadonlySet<keyof StyleProps> = new Set(['iconAlone', 'size'])
const blockedLinkProps: ReadonlySet<keyof StyleProps> = new Set(['iconAlone', 'size'])

export const StyledWrapper = styled('span', {
  shouldForwardProp: (prop: string) => !blockedWrapperProps.has(prop as keyof StyleProps),
})<StyleProps>`
  ${({ iconAlone, size }: StyleProps) =>
    iconAlone
      ? `
          border-bottom: none;
          padding: 6px;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          font-size:  ${fontSizeBySize(size)};

          &:hover {
            background-color: ${colors.cloud_20} !important;
          }
          &:active {
            background-color: ${colors.cloud_20} !important;
            border: 2px solid ${colors.cloud_80};
          }
          &:focus {
            border: 2px solid ${colors.cloud_80};
            outline: none;
          }

        `
      : `
          &:hover  {
            background-color: ${colors.sky_20};
            color: ${colors.sky_90};

          }

          &:focus {
            border: 2px solid ${colors.sky_60};
            outline: none;
            padding:1px
          }
        
          &:visited {
            color: ${colors.violet_60} !important;
          }
          &:visited:hover {
            color: ${colors.violet_60} !important;
            background-color: ${colors.violet_20} !important;
          }
        
          [aria-disabled='true'],
          .ant-typography-disabled {
            color: ${colors.cloud_50} !important;
            fill: ${colors.cloud_50} !important;
            pointer-events: none;
            cursor: not-allowed;
          }
        `}
`

export const StyledLink = styled(AntdLink, {
  shouldForwardProp: (prop: string) => !blockedLinkProps.has(prop as keyof StyleProps),
})<StyleProps>`
  ${({ iconAlone, size }: StyleProps) =>
    !iconAlone
      ? `
    align-items: center;
    gap: 4px;
    padding: 4px 2px 2px 0px;
    font-size: ${fontSizeBySize(size)};
    border-bottom: 1px solid currentColor !important;
  `
      : `
   `}
`

export const IconWrapper = styled.span<StyleProps>`
  ${({ iconAlone }) =>
    !iconAlone &&
    `
    &:visited & svg {
      fill: ${colors.violet_60} !important;
    }

    .ant-typography-disabled & {
      color: ${colors.cloud_50} !important;
      fill: ${colors.cloud_50} !important;
      pointer-events: none;
      cursor: not-allowed;
    }
  `}
`
