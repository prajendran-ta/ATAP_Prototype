import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  NavbarRow,
  NavbarTitle,
  RightIcons,
  StyledContent,
  StyledSider,
  StyledLayout,
  ContentWrapper,
  FixedBottomWrapper,
  WrapperLayout,
  NavbarAppName,
  HeaderIconWrapper,
  HoverIconWrapper,
  IconLight,
  IconSolid,
  TriggerIcon,
  CustomNavbar,
  GlobalAmadeusMaxPanel,
  AmadeusMaxResizeHandle,
  FloatingMaxEntryPoint,
  GlobalFloatingMaxPanelOverlay,
  GlobalFullScreenMaxPanelOverlay,
} from './Layout.styled'
import SidebarMenu from '@amadeus/react-design-factory/components/SidebarMenu/SidebarMenu'
import { Footer } from '@amadeus/react-design-factory'
import FooterIcon from '@mediahub/mediahub-ui/assets/amadeus-wordmark.svg'
import { UserOptions } from '@mediahub/mediahub-ui/components/UserOptions'
import { Button, Text, colors, Grid, Icon, IconButton } from '@amadeus/react-design-factory'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { useATAPLinks } from '@mediahub/mediahub-ui/api/useATAPLinks/useATAPLinks'
import { featureFlags } from '@mediahub/mediahub-ui/shared/featureFlags'
import { SignOutOption, LanguageSelectorOption } from '../UserOptions/options'
import { currentEnv } from '@mediahub/mediahub-ui/api'
import { AmadeusMaxPanel } from '@mediahub/mediahub-ui/components/AmadeusMaxPanel'
import { CampaignCreationCanvas } from '@mediahub/mediahub-ui/components/CampaignCreationCanvas/CampaignCreationCanvas'
import MediaPlanCanvas from '@mediahub/mediahub-ui/components/MediaPlanCanvas/MediaPlanCanvas'
import {
  setCampaignWorkspaceOpen,
  useCampaignFlowState,
} from '@mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore'
import { CopilotWidget } from '@mediahub/mediahub-ui/components/CopilotWidget'
import { Notifications } from '@mediahub/mediahub-ui/components/Notifications'
import type { SidebarMenuNode } from '@amadeus/react-design-factory/components/SidebarMenu/SidebarMenu.d'
import type { IconProps } from '@amadeus/react-design-factory/components/Icon/Icon.d'

const options = [{ key: 'signout', label: <SignOutOption /> }]
const RIGHT_PANEL_STORAGE_KEY = 'mediahub.rightPanel.active'
const RIGHT_PANEL_EXPLICIT_STORAGE_KEY = 'mediahub.rightPanel.explicitOpen'
const FLOATING_MAX_OPEN_STORAGE_KEY = 'mediahub.amadeusMax.floatingOpen'
const MAX_PANEL_WIDTH_STORAGE_KEY = 'mediahub.amadeusMax.panelWidth.v2'
const DEFAULT_PANEL_WIDTH = 360
const MIN_PANEL_WIDTH = 300
const MAX_PANEL_WIDTH = 800

// Largest the Amadeus Max panel can be resized to: up to MAX_PANEL_WIDTH (800px),
// but never wider than the viewport.
const getMaxPanelWidth = () => (typeof window === 'undefined' ? MAX_PANEL_WIDTH : Math.min(MAX_PANEL_WIDTH, window.innerWidth))

type RightPanelType = 'amadeus-max' | 'ai-chat' | 'notifications'

// On every fresh application load (full page load / login), reset the remembered right panel so the
// app defaults to Notifications. Within-session, in-app navigation re-persists the panel as usual;
// this only wipes state that would otherwise survive a reload or browser session-restore. Runs once
// per JS load (module scope), before the Layout reads these keys.
if (typeof window !== 'undefined') {
  window.sessionStorage.removeItem(RIGHT_PANEL_STORAGE_KEY)
  window.sessionStorage.removeItem(RIGHT_PANEL_EXPLICIT_STORAGE_KEY)
  window.sessionStorage.removeItem(FLOATING_MAX_OPEN_STORAGE_KEY)
}

const isRightPanelType = (value: string | null): value is RightPanelType => {
  return value === 'amadeus-max' || value === 'ai-chat' || value === 'notifications'
}

class NotificationsPanelBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <Text.H4 style={{ margin: 0, fontSize: 16, lineHeight: '20px' }}>Notifications</Text.H4>
          <Text.Body style={{ marginTop: 12, marginBottom: 12 }}>Unable to load notifications right now.</Text.Body>
          <Button variant='link' href='/notifications'>
            Open notifications page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

const HoverIcon: React.FC<{ name: IconProps['name']; solidName?: IconProps['name'] }> = ({ name, solidName }) => {
  const solidIconName: IconProps['name'] = solidName ?? (`${name}Solid` as IconProps['name'])
  return (
    <HoverIconWrapper>
      <IconLight>
        <Icon name={name} width={16} height={16} />
      </IconLight>
      <IconSolid>
        <Icon name={solidIconName} width={16} height={16} />
      </IconSolid>
    </HoverIconWrapper>
  )
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t: tCommon } = useTranslation('common')
  const { t: tNav } = useTranslation('nav')
  const { isAdmin, isExternal } = useAuth()

  const options = [
    ...(isExternal
      ? [
          {
            key: 'language-settings',
            label: tCommon('languageSettings'),
            children: [
              {
                key: 'lang-en',
                label: <LanguageSelectorOption langCode='en' label={tCommon('english')} />,
              },
              {
                key: 'lang-fr',
                label: <LanguageSelectorOption langCode='fr' label={tCommon('french')} />,
              },
            ],
          },
          { type: 'divider' as const },
        ]
      : []),
    { key: 'signout', label: <SignOutOption /> },
  ]
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const externalLinks = useATAPLinks()

  const searchParams = new URLSearchParams(location.search)
  const selectedPanel = searchParams.get('panel')
  const isFullScreenPanel = searchParams.get('panel') === 'amadeus-max' && searchParams.get('layout') === 'full-screen'
  const [activeRightPanel, setActiveRightPanel] = useState<RightPanelType | null>(() => {
    if (isRightPanelType(selectedPanel)) return selectedPanel
    if (typeof window === 'undefined') return null
    const persistedPanel = window.sessionStorage.getItem(RIGHT_PANEL_STORAGE_KEY)
    return isRightPanelType(persistedPanel) ? persistedPanel : null
  })
  const [isRightPanelExplicitOpen, setIsRightPanelExplicitOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(RIGHT_PANEL_EXPLICIT_STORAGE_KEY) === 'true'
  })
  const homePanel: RightPanelType = isRightPanelType(selectedPanel)
    ? selectedPanel
    : isRightPanelExplicitOpen && activeRightPanel
      ? activeRightPanel
      : 'notifications'
  const showGlobalRightPanel = !isHome && !isFullScreenPanel && isRightPanelExplicitOpen && !!activeRightPanel
  const isMiaActive = isHome ? homePanel === 'ai-chat' : showGlobalRightPanel && activeRightPanel === 'ai-chat'
  const isMaxActive = isHome ? homePanel === 'amadeus-max' : showGlobalRightPanel && activeRightPanel === 'amadeus-max'
  const isNotificationsActive = isHome
    ? homePanel === 'notifications'
    : showGlobalRightPanel && activeRightPanel === 'notifications'
  const [isFloatingMaxOpen, setIsFloatingMaxOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(FLOATING_MAX_OPEN_STORAGE_KEY) === 'true'
  })
  const [maxPanelWidth, setMaxPanelWidth] = useState(() =>
    typeof window === 'undefined'
      ? 360
      : Math.max(
          MIN_PANEL_WIDTH,
          Math.min(
            getMaxPanelWidth(),
            Number(window.sessionStorage.getItem(MAX_PANEL_WIDTH_STORAGE_KEY)) || 360,
          ),
        ),
  )
  const { aiWorkspaceMode, aiWorkspaceType } = useCampaignFlowState()
  // On Home the page renders its own canvas next to its own Amadeus Max panel.
  const isCampaignCanvasOpen = aiWorkspaceMode && !isHome
  const setIsCampaignCanvasOpen = setCampaignWorkspaceOpen
  const switchingToFloatingMaxRef = useRef(false)
  const rightPanelWidth = activeRightPanel === 'amadeus-max' ? maxPanelWidth : DEFAULT_PANEL_WIDTH
  const isHomePanelBlockingFloating = homePanel === 'ai-chat' || homePanel === 'amadeus-max'
  const showFloatingMaxEntryPoint =
    !isFloatingMaxOpen && !showGlobalRightPanel && !(isHome && isHomePanelBlockingFloating)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(MAX_PANEL_WIDTH_STORAGE_KEY, String(maxPanelWidth))
  }, [maxPanelWidth])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedWidth = Number(window.sessionStorage.getItem(MAX_PANEL_WIDTH_STORAGE_KEY))
    if (!Number.isFinite(savedWidth) || savedWidth <= 0) return
    setMaxPanelWidth(Math.min(Math.max(MIN_PANEL_WIDTH, getMaxPanelWidth()), savedWidth))
  }, [location.pathname])

  useEffect(() => {
    if (showGlobalRightPanel && !switchingToFloatingMaxRef.current) {
      setIsFloatingMaxOpen(false)
    }
  }, [showGlobalRightPanel])

  useEffect(() => {
    if (isHome && isHomePanelBlockingFloating && !switchingToFloatingMaxRef.current) {
      setIsFloatingMaxOpen(false)
    }
  }, [isHome, isHomePanelBlockingFloating])

  useEffect(() => {
    if (switchingToFloatingMaxRef.current) {
      if (!isRightPanelType(selectedPanel)) switchingToFloatingMaxRef.current = false
      return
    }

    if (isRightPanelType(selectedPanel)) {
      setActiveRightPanel(selectedPanel)
      if (!isHome || selectedPanel !== 'notifications') {
        setIsRightPanelExplicitOpen(true)
      }
    }
  }, [isHome, selectedPanel])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (activeRightPanel) {
      window.sessionStorage.setItem(RIGHT_PANEL_STORAGE_KEY, activeRightPanel)
      return
    }
    window.sessionStorage.removeItem(RIGHT_PANEL_STORAGE_KEY)
  }, [activeRightPanel])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(RIGHT_PANEL_EXPLICIT_STORAGE_KEY, String(isRightPanelExplicitOpen))
  }, [isRightPanelExplicitOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(FLOATING_MAX_OPEN_STORAGE_KEY, String(isFloatingMaxOpen))
  }, [isFloatingMaxOpen])

  const handleOpenPanel = (panel: RightPanelType) => {
    setIsFloatingMaxOpen(false)
    setIsRightPanelExplicitOpen(true)
    setActiveRightPanel(panel)
    const nextParams = new URLSearchParams(location.search)
    nextParams.set('panel', panel)
    if (panel === 'amadeus-max') {
      nextParams.set('layout', 'sidebar')
    } else {
      nextParams.delete('layout')
    }
    navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` })
  }

  const handleClosePanel = () => {
    setIsCampaignCanvasOpen(false)
    setIsRightPanelExplicitOpen(false)
    setActiveRightPanel(null)
    const nextParams = new URLSearchParams(location.search)
    nextParams.delete('panel')
    nextParams.delete('layout')
    const nextSearch = nextParams.toString()
    navigate({ pathname: location.pathname, search: nextSearch ? `?${nextSearch}` : '' })
  }

  const handleOpenFloatingMax = () => {
    setIsFloatingMaxOpen(true)
  }

  const handleMaxPanelResizeStart = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = maxPanelWidth

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = startWidth + (startX - moveEvent.clientX)
      const maxWidth = Math.max(MIN_PANEL_WIDTH, getMaxPanelWidth())
      setMaxPanelWidth(Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, nextWidth)))
    }

    const handlePointerUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handleCloseFloatingMax = () => {
    setIsFloatingMaxOpen(false)
  }

  const switchToFloatingMax = () => {
    switchingToFloatingMaxRef.current = true
    setIsRightPanelExplicitOpen(false)
    setActiveRightPanel(null)
    setIsFloatingMaxOpen(true)
    const nextParams = new URLSearchParams(location.search)
    nextParams.delete('panel')
    nextParams.delete('layout')
    const nextSearch = nextParams.toString()
    navigate({ pathname: location.pathname, search: nextSearch ? `?${nextSearch}` : '' })
  }

  const handleFloatingMaxLayoutChange = (layoutMode: 'sidebar' | 'full-screen' | 'floating') => {
    if (layoutMode === 'floating') {
      switchToFloatingMax()
      return
    }
    setIsFloatingMaxOpen(false)

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('panel', 'amadeus-max')
    nextParams.set('layout', layoutMode === 'full-screen' ? 'full-screen' : 'sidebar')
    navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` })
  }

  const handleSidebarMaxLayoutChange = (layoutMode: 'sidebar' | 'full-screen' | 'floating') => {
    if (layoutMode === 'sidebar') return

    if (layoutMode === 'floating') {
      switchToFloatingMax()
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('panel', 'amadeus-max')
    nextParams.set('layout', layoutMode === 'full-screen' ? 'full-screen' : 'sidebar')
    navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` })
  }

  const menuItems: SidebarMenuNode[] = [
    {
      key: 'home',
      label: tNav('home'),
      icon: <HoverIcon name='home' solidName='homeSolid' />,
      href: '/',
    },
    {
      key: 'advertisers',
      label: tNav('advertisers'),
      icon: <HoverIcon name='wallet' solidName='walletSolid' />,
      href: externalLinks?.advertisers,
    },
    ...(featureFlags.mediaPlan
      ? [
          {
            key: 'media-planning',
            label: 'Media Planning & Requests',
            icon: <HoverIcon name='clipboardListCheck' solidName='clipboardListCheckSolid' />,
            href: externalLinks?.mediaPlanning?.mediaplanner,
          } as SidebarMenuNode,
        ]
      : [
          {
            key: 'media-planning',
            label: 'Media Planning & Requests',
            icon: <HoverIcon name='clipboardListCheck' solidName='clipboardListCheckSolid' />,
            children: [
              {
                key: 'NORAM single-property',
                label: 'NORAM single-property',
                href: externalLinks?.mediaPlanning?.singleProperty,
              },
              {
                key: 'NORAM multi-property',
                label: 'NORAM multi-property',
                href: externalLinks?.mediaPlanning?.multiProperty,
              },
              {
                key: 'International',
                label: 'International',
                href: externalLinks?.mediaPlanning?.international,
              },
            ],
          } as SidebarMenuNode,
        ]),
    {
      key: 'campaign-management',
      label: 'Campaign Management & Setup',
      icon: <Icon name='ad' width={16} height={16} />,
      children: [
        {
          key: 'campaigns',
          label: 'Campaigns',
          href: '/campaigns',
        },
        {
          key: 'unmapped-campaigns',
          label: 'Unmapped Campaigns',
          href: '/unmapped-campaigns',
        },
        {
          key: 'all-campaigns',
          label: 'Campaign Setup',
          href: '/all-campaigns',
        },
        {
          key: 'cmt',
          label: 'Campaign Management Tool',
          href: externalLinks?.campaignManagement?.cmt,
        },
        { key: 'insite', label: 'Insite', href: externalLinks?.campaignManagement?.insite },
        {
          key: 'ad-copies',
          label: 'Ad Copies Creator',
          children: [
            {
              key: 'Americas',
              label: 'Americas',
              href: externalLinks?.campaignManagement?.adCopies?.americas,
            },
            {
              key: 'EMEA',
              label: 'EMEA',
              href: externalLinks?.campaignManagement?.adCopies?.emea,
            },
            {
              key: 'APAC',
              label: 'APAC',
              href: externalLinks?.campaignManagement?.adCopies?.apac,
            },
          ],
        },
      ],
    },
    ...(isExternal
      ? [
          {
            key: 'campaign-optimization',
            label: tNav('campaignOptimization'),
            icon: <HoverIcon name='slidersV' solidName='slidersVSolid' />,
            activePatterns: ['/oba'],
            href: externalLinks?.campaignOptimization?.oba,
          } as SidebarMenuNode,
        ]
      : [
          {
            key: 'campaign-optimization',
            label: tNav('campaignOptimizationPacing'),
            icon: <HoverIcon name='slidersV' solidName='slidersVSolid' />,
            activePatterns: ['/oba'],
            children: [
              {
                key: 'pacing-tool',
                label: 'Pacing Tool',
                href: externalLinks?.campaignOptimization?.pacingTool,
              },
              { key: 'oba', label: 'OBA', href: externalLinks?.campaignOptimization?.oba },
            ],
          } as SidebarMenuNode,
        ]),
    {
      key: 'reports',
      label: 'Reports',
      icon: <Icon name='chartBar' width={16} height={16} />,
      children: [
        { key: 'dmic', label: 'DMIC', href: externalLinks?.reports?.dmic },
        {
          key: 'roas',
          label: 'ROAS',
          href: externalLinks?.reports?.roas,
        },
      ],
    },
    {
      key: 'market-insights',
      label: 'Market Insights',
      icon: <Icon name='chartLine' width={16} height={16} />,
      children: [
        { key: 'demand360', label: 'Demand360+', href: externalLinks?.marketInsights?.tiPortal },
        { key: 'rate360', label: 'Rate360', href: externalLinks?.marketInsights?.tiPortal },
        { key: 'revstrat360', label: 'RevenueStrategy360', href: externalLinks?.marketInsights?.tiPortal },
        { key: 'ami', label: 'Amadeus Market Intelligence', href: externalLinks?.marketInsights?.ami },
        {
          key: 'google-travel-analytics',
          label: 'Google Travel Analytics',
          href: externalLinks?.marketInsights?.googleTravelAnalytics,
        },
      ],
    },
    {
      key: 'data-management',
      label: 'Data Management',
      icon: <Icon name='database' width={16} height={16} />,
      children: [
        { key: 'datapartners', label: 'Data Partners', href: externalLinks?.dataManagement?.datapartners },
        { key: 'audience-builder', label: 'Audience Rules', href: externalLinks?.dataManagement?.audienceBuilder },
        { key: 'segments', label: 'Audience', href: externalLinks?.dataManagement?.audience },
      ],
    },
    {
      key: 'pricing-billing',
      label: 'Pricing & Billing',
      icon: <Icon name='fileInvoiceDollar' width={16} height={16} />,
    },
    {
      key: 'user-management',
      label: tNav('userManagement'),
      icon: <HoverIcon name='userCog' solidName='userCogSolid' />,
      href: '/user-management',
    },
    {
      key: 'notifications',
      label: tNav('notifications'),
      icon: <HoverIcon name='bell' solidName='bellSolid' />,
      href: '/notifications',
    },
  ]

  const externalHiddenKeys = ['media-planning', 'campaign-management', 'reports', 'market-insights', 'data-management', 'pricing-billing']
  // Temporarily hidden nav items (top-level or nested children), by key. Hidden for now —
  // remove a key here to restore the item. Applied recursively to children.
  const hiddenMenuKeys = new Set<string>([
    'campaigns',
    'unmapped-campaigns',
    'insite',
    'ad-copies',
    'pacing-tool',
    'roas',
  ])
  const pruneHiddenItems = (items: SidebarMenuNode[]): SidebarMenuNode[] =>
    items
      .filter(item => !hiddenMenuKeys.has(item.key))
      .map(item =>
        item.children ? ({ ...item, children: pruneHiddenItems(item.children as SidebarMenuNode[]) } as SidebarMenuNode) : item,
      )
  const filteredMenuItems = pruneHiddenItems(
    menuItems
      .filter(item => !isExternal || !externalHiddenKeys.includes(item.key))
      .filter(item => isAdmin || item.key !== 'user-management'),
  )
  const width = 320
  // Collapse the left nav by default on every page (including Home); the user can still
  // expand it manually via the trigger until the next navigation.
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    setCollapsed(true)
  }, [isHome, isFullScreenPanel, aiWorkspaceMode])

  const [openKeys, setOpenKeys] = useState<string[]>([])

  // Close all submenus when navigating to a new page
  useEffect(() => {
    setOpenKeys([])
  }, [location.pathname])

  const noMotion = {
    motionAppear: false,
    motionEnter: false,
    motionLeave: false,
  } as const

  return (
    <>
      <CustomNavbar
        isSticky
        NavbarComponent={
          <NavbarRow>
            <NavbarTitle>Amadeus</NavbarTitle>
            <NavbarAppName>Travel Advertising Platform</NavbarAppName>
            <RightIcons>
              {/* AskMia icon hidden (not removed) for the demo; remove display:none to restore. */}
              <HeaderIconWrapper active={isMiaActive} style={{ display: 'none' }}>
                <IconButton
                  iconName='sparkles'
                  color={colors.sky_50}
                  height={20}
                  width={20}
                  title='Open AskMia'
                  onClick={() => handleOpenPanel('ai-chat')}
                />
              </HeaderIconWrapper>
              <HeaderIconWrapper active={isMaxActive}>
                <IconButton
                  iconName='sparkles'
                  color={colors.sky_90}
                  height={20}
                  width={20}
                  onClick={() => handleOpenPanel('amadeus-max')}
                />
              </HeaderIconWrapper>
              <HeaderIconWrapper active={isNotificationsActive}>
                <IconButton
                  iconName='bell'
                  color={colors.sky_90}
                  height={20}
                  width={20}
                  onClick={() => handleOpenPanel('notifications')}
                />
              </HeaderIconWrapper>
              <UserOptions options={options} />
            </RightIcons>
          </NavbarRow>
        }
      />

      <WrapperLayout>
        <StyledLayout hasSider>
          <StyledSider
            width={width}
            collapsible
            collapsed={collapsed}
            collapsedWidth={60}
            onCollapse={setCollapsed}
            trigger={
              <TriggerIcon collapsed={collapsed}>
                <Icon name='arrowToLeftLine' width={21} height={18} color={colors.sky_60} />
              </TriggerIcon>
            }
          >
            <SidebarMenu
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              items={filteredMenuItems}
              showSearch={false}
              openKeys={openKeys}
              motion={noMotion}
            />
          </StyledSider>

          <ContentWrapper>
            <StyledContent
              left={`${width}px`}
              collapsed={collapsed}
              isHome={isHome}
              hasRightPanel={showGlobalRightPanel}
              panelWidth={rightPanelWidth}
            >
              {isCampaignCanvasOpen ? (
                aiWorkspaceType === 'media-plan' ? <MediaPlanCanvas /> : <CampaignCreationCanvas />
              ) : (
                children
              )}
            </StyledContent>
            {!isHome && !isFullScreenPanel ? (
              <FixedBottomWrapper
                collapsed={collapsed}
                left={`${width}px`}
                rightPanelOpen={showGlobalRightPanel}
                panelWidth={rightPanelWidth}
              >
                <Footer
                  FooterIcon={FooterIcon}
                  footerCopy='© Amadeus IT Group SA'
                  versionLabel={'Application Version Number : v0.1.20'}
                  collapsed={collapsed}
                  left={`${width}px`}
                />
              </FixedBottomWrapper>
            ) : null}
          </ContentWrapper>
        </StyledLayout>
        {showGlobalRightPanel ? (
          <GlobalAmadeusMaxPanel width={rightPanelWidth}>
            {activeRightPanel === 'amadeus-max' ? (
              <>
                <AmadeusMaxPanel
                  onClosePanel={handleClosePanel}
                  layoutMode='sidebar'
                  onLayoutModeChange={handleSidebarMaxLayoutChange}
                  onCampaignCanvasChange={setIsCampaignCanvasOpen}
                  campaignCanvasOpen={aiWorkspaceMode}
                />
                <AmadeusMaxResizeHandle
                  onPointerDown={handleMaxPanelResizeStart}
                  aria-label='Resize Amadeus Max panel'
                />
              </>
            ) : activeRightPanel === 'ai-chat' ? (
              <CopilotWidget
                titleText='AskMia'
                displayMode='inline'
                showTrigger={false}
                onClosePanel={handleClosePanel}
              />
            ) : (
              <NotificationsPanelBoundary>
                <div style={{ padding: 24 }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
                  >
                    <Text.H4 style={{ margin: 0, fontSize: 16, lineHeight: '20px' }}>Notifications</Text.H4>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Button variant='link' href='/notifications'>
                        View All
                      </Button>
                      <IconButton
                        iconName='xmark'
                        color={colors.cloud_80}
                        width={12}
                        height={12}
                        onClick={handleClosePanel}
                      />
                    </div>
                  </div>
                  <Notifications />
                </div>
              </NotificationsPanelBoundary>
            )}
          </GlobalAmadeusMaxPanel>
        ) : null}
        {!isHome && isFullScreenPanel && activeRightPanel === 'amadeus-max' ? (
          <GlobalFullScreenMaxPanelOverlay>
            <AmadeusMaxPanel
              onClosePanel={handleClosePanel}
              layoutMode='full-screen'
              onLayoutModeChange={handleFloatingMaxLayoutChange}
              onCampaignCanvasChange={setIsCampaignCanvasOpen}
              campaignCanvasOpen={aiWorkspaceMode}
            />
          </GlobalFullScreenMaxPanelOverlay>
        ) : null}
      </WrapperLayout>
      {showFloatingMaxEntryPoint ? (
        <FloatingMaxEntryPoint>
          <IconButton
            iconName='sparkles'
            color={colors.cloud_0}
            height={20}
            width={20}
            title='Open Amadeus Max'
            onClick={handleOpenFloatingMax}
          />
        </FloatingMaxEntryPoint>
      ) : null}
      {isFloatingMaxOpen ? (
        <GlobalFloatingMaxPanelOverlay>
          <AmadeusMaxPanel
            onClosePanel={handleCloseFloatingMax}
            layoutMode='floating'
            onLayoutModeChange={handleFloatingMaxLayoutChange}
            onCampaignCanvasChange={setIsCampaignCanvasOpen}
            campaignCanvasOpen={aiWorkspaceMode}
          />
        </GlobalFloatingMaxPanelOverlay>
      ) : null}
    </>
  )
}

export default MainLayout
