import styled from '@emotion/styled'
import AntDrawer from 'antd/es/drawer'
import { colors } from '../../styles/colors'

export const drawerStyles = {
  mask: {
    background: `${colors.sky_90}`,
    opacity: 0.8,
  },
  content: {
    boxShadow: '0 4px 32px rgba(10, 47, 98, 0.12)',
    background: colors.cloud_0,
  },
  header: {
    background: colors.cloud_10,
    borderBottom: 'none',
    padding: '24px 24px 0px 24px',
  },
  body: {
    background: colors.cloud_10,
    color: colors.cloud_100,
    overflowY: 'auto',
    padding: '0px 24px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.cloud_100,
  },
  footer: {
    background: colors.cloud_10,
    borderTop: `1px solid ${colors.cloud_30}`,
    padding: '16px 32px',
  },
}

export const StyledDrawer = styled(AntDrawer)`
  & .amadeus-drawer-header-title {
    flex-direction: row-reverse !important;
  }

  & .amadeus-drawer-header {
    background-color: ${colors.cloud_10};
  }
`
