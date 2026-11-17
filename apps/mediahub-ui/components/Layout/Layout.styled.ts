import styled from '@emotion/styled'
import { injectGlobal } from '@emotion/css'
import Layout from 'antd/es/layout'
import { colors, zIndex, Navbar, Text } from '@amadeus/react-design-factory'

export const StyledLayout = styled(Layout, {
  shouldForwardProp: propName => propName !== 'isMobile',
})<{ isMobile?: boolean }>`
  min-width: 1200px;
  min-height: calc(100vh - 54px);
`

export const WrapperLayout = styled.div`
  .amadeus-layout {
    background: ${colors.cloud_0} !important;
  }
`

export const GlobalAmadeusMaxPanel = styled.div<{ width: number }>`
  position: fixed;
  top: 54px;
  right: 0;
  bottom: 0;
  width: ${({ width }) => `${width}px`};
  z-index: ${zIndex.sidebar + 2};
  background: ${colors.cloud_0};
  border-left: 1px solid ${colors.cloud_30};
  box-shadow: -2px 0 8px rgba(0, 8, 53, 0.08);
  max-width: 50vw;
  overflow: visible;

  > div {
    height: 100%;
    overflow-y: auto;
  }
`

export const AmadeusMaxResizeHandle = styled.span`
  position: absolute;
  top: 0;
  left: -6px;
  bottom: 0;
  width: 12px;
  cursor: col-resize;
  z-index: 10;

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      width: 2px;
      background: ${colors.sky_60};
    }
  }
`

export const FloatingMaxEntryPoint = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: ${zIndex.drawer};

  .amadeus-btn {
    width: 44px !important;
    height: 44px !important;
    border-radius: 999px !important;
    background: ${colors.sky_60} !important;
    color: ${colors.cloud_0} !important;
    box-shadow: 0 8px 20px rgba(0, 8, 53, 0.28);
  }
`

export const GlobalFloatingMaxPanelOverlay = styled.div`
  position: fixed;
  right: 16px;
  top: 70px;
  bottom: 16px;
  width: 360px;
  z-index: ${zIndex.drawer + 1};
  box-shadow: 0 8px 24px rgba(0, 8, 53, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: ${colors.cloud_0};

  > div {
    height: 100%;
  }
`

export const GlobalFullScreenMaxPanelOverlay = styled.div`
  position: fixed;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 60px;
  z-index: ${zIndex.drawer + 2};
  background: ${colors.cloud_0};

  > div {
    height: 100%;
    overflow-y: auto;
  }
`

export const CustomNavbar = styled(Navbar)`
  color: ${colors.cloud_0};
`

export const NavbarTitle = styled(Text.H4)`
  color: ${colors.sky_90};
  font-weight: 500;
  font-family: 'Amadeus Neue Web';
  line-height: 27px;
  margin: 0;
`

export const NavbarAppName = styled(Text.H4)`
  color: ${colors.sky_90};
  font-weight: 400;
  font-family: 'Amadeus Neue Web';
  line-height: 18px;
  margin: 0;
`

export const NavbarRow = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 18px;
`

export const RightIcons = styled.div`
  margin-left: auto;
  display: flex;
  gap: 16px;
`

export const HeaderIconWrapper = styled('div', {
  shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: ${({ active }) => (active ? colors.sky_30 : 'transparent')};

  .amadeus-btn {
    width: 100% !important;
    height: 100% !important;
    padding: 5px !important;
    border-radius: 999px !important;
  }
`

export const StyledSider = styled(Layout.Sider)`
  border-right: 1px solid ${colors.cloud_30} !important;
  overflow-y: auto;
  height: calc(100vh - 104px);
  background: ${colors.sky_10} !important;
  position: fixed;
  top: 54px;
  left: 0;
  scrollbar-width: thin;
  z-index: ${zIndex.sidebar};
  transition: none !important;

  .amadeus-menu {
    background: ${colors.sky_10} !important;
  }

  .amadeus-menu-title-content {
    margin-left: 12px;
  }

  /* Vertical bar on child items inside open submenus */
  .amadeus-menu-sub .amadeus-menu-title-content {
    border-left: 1px solid ${colors.sky_35};
    padding-left: 24px;
    margin-left: 4px;
    position: relative;
    left: -20px;
  }

  /* Menu item state colors */
  .amadeus-menu-item,
  .amadeus-menu-submenu-title {
    margin-block: 2px;
    transition:
      background-color 0.15s ease,
      box-shadow 0.15s ease;
    border-radius: 4px;
    &:hover {
      background: ${colors.sky_20} !important;
      color: ${colors.cloud_100} !important;
    }
    &.amadeus-menu-item-selected {
      background: ${colors.sky_30} !important;
      color: ${colors.cloud_100} !important;
      font-weight: bold;
    }
    &:focus-visible {
      outline: 1px solid ${colors.cloud_100} !important;
    }
  }

  /* Active / Selected */
  .amadeus-menu-item-selected {
    background: ${colors.sky_30} !important;
    color: ${colors.cloud_100} !important;
  }

  .amadeus-menu-submenu-selected > .amadeus-menu-submenu-title {
    background: ${colors.sky_30} !important;
    color: ${colors.cloud_100} !important;
  }

  /* Focus (keyboard navigation) */
  .amadeus-menu-item:focus-visible,
  .amadeus-menu-submenu-title:focus-visible {
    outline: 1px solid ${colors.cloud_100} !important;
  }

  .amadeus-menu.amadeus-menu-root.amadeus-menu-vertical {
    border-inline-end: none !important;
  }

  .amadeus-layout-sider-trigger {
    transition: none !important;
    animation: none !important;
    background: ${colors.sky_10} !important;
    height: 100px;
    color: ${colors.cloud_100} !important;
    border-right: 1px solid ${colors.cloud_30};
    border-top: none;
    box-shadow: none;
    text-align: start;
    padding-left: 12px;
    .amadeus-icon {
      color: ${colors.cloud_100} !important;
      font-size: 14px;
    }
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.cloud_20};
    border-radius: 3px;
  }
`

export const StyledContent = styled(Layout.Content, {
  shouldForwardProp: propName => !['collapsed', 'left', 'isHome', 'hasRightPanel', 'panelWidth'].includes(propName),
})<{
  collapsed: boolean
  left: string
  isHome: boolean
  hasRightPanel?: boolean
  panelWidth?: number
}>`
  flex: 1;
  background-color: ${colors.cloud_10};
  padding: ${({ isHome, hasRightPanel, panelWidth = 360 }) => {
    if (isHome) return '0'
    return hasRightPanel ? `24px calc(${panelWidth}px + 24px) 24px 24px` : '24px'
  }};
  margin-left: ${({ collapsed, left }) => (collapsed ? '60px' : left)};
`

export const ContentWrapper = styled(Layout)`
  display: flex;
  flex-direction: column;
`

export const FixedBottomWrapper = styled('div', {
  shouldForwardProp: propName => !['collapsed', 'left', 'rightPanelOpen', 'panelWidth'].includes(propName),
})<{
  collapsed: boolean
  left: string
  rightPanelOpen?: boolean
  panelWidth?: number
}>`
  position: relative;
  z-index: ${zIndex.sidebar + 1};
  margin-left: ${({ collapsed, left }) => (collapsed ? '-60px' : `-${left}`)};
  width: ${({ collapsed, left }) => (collapsed ? 'calc(100% + 60px)' : `calc(100% + ${left})`)};
  padding-right: ${({ rightPanelOpen, panelWidth = 360 }) => (rightPanelOpen ? `${panelWidth}px` : '0')};
`

export const TriggerIcon = styled.span<{ collapsed: boolean }>`
  display: inline-flex;
  align-items: start;
  justify-content: center;
  transform: ${({ collapsed }) => (collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.sky_60};
  background-color: ${colors.cloud_0};
`

export const HoverIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const IconLight = styled.span`
  display: block;

  .amadeus-menu-item-selected &,
  .amadeus-menu-submenu-selected & {
    display: none;
  }
`

export const IconSolid = styled.span`
  display: none;

  .amadeus-menu-item-selected &,
  .amadeus-menu-submenu-selected & {
    display: block;
  }
`

// Sidebar submenu popups render as portals in <body>, so scoped CSS won't reach them
void injectGlobal`
  .amadeus-menu-light.amadeus-menu-submenu-popup > .amadeus-menu {
    background-color: ${colors.sky_10} !important;
  }

  body:has([data-action-footer='true']) .amadeus-fixed-bottom-wrapper {
    display: none;
  }
`
