import styled from '@emotion/styled'
import { colors, zIndex } from '../../styles'
import { StickyFooterProps } from './StickyFooter.d'

export const FooterContainer = styled.footer<StickyFooterProps>`
  &[data-action-footer='true'] {
    display: flex;
  }
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  height: 50px;
  padding: 16px;
  position: fixed;
  left: ${({ left }) => left ?? 0};
  right: 0;
  bottom: ${({ marginBottom }) => marginBottom}px;
  background-color: ${colors.cloud_0};
  border: 1px solid ${colors.cloud_30};
  box-shadow: 0px 0px 8px 0px rgba(128, 128, 128, 0.25);
  z-index: ${zIndex.stickyFooter};
`
