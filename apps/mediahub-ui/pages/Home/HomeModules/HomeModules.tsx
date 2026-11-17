import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GridWrapper } from './HomeModules.styled'
import ModuleCard from './ModuleCard'
import CardTitle from './ModuleCardTitle'
import CardContent from './ModuleCardContent'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { colors, Icon } from '@amadeus/react-design-factory'
import { useATAPLinks } from '@mediahub/mediahub-ui/api/useATAPLinks/useATAPLinks'
import { featureFlags } from '@mediahub/mediahub-ui/shared/featureFlags'

type ModuleLink = { label: string; url?: string; subLinks?: { label: string; url: string }[] }
type ModuleDef = {
  key: string
  title: string
  description: string
  links?: ModuleLink[]
  icon: React.ReactNode
}

const HomeModules: React.FC = () => {
  const { isAdmin, isExternal } = useAuth()
  const externalLinks = useATAPLinks()
  const { t: tNav } = useTranslation('nav')
  const { t: tHome } = useTranslation('home')

  const MODULES: ModuleDef[] = React.useMemo(() => {
    if (!externalLinks) return []
    return [
  {
    key: 'advertisers',
    title: tNav('advertisers'),
    description: tHome('moduleCards.advertisers.desc'),
    links: [{ label: tHome('moduleCards.advertisers.link'), url: `${externalLinks?.advertisers}?isFollowingOnly=true` }],
    icon: <Icon name='wallet' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'media-planning',
    title: 'Media Planning & Requests',
    description: 'Contains media planning module , monthly distributions & margin calculator.',
    links: [
      {
        label: 'Media Plan Calculator',
        subLinks: [
          { label: 'NORAM single-property', url: externalLinks?.mediaPlanning?.singleProperty },
          { label: 'NORAM multi-property', url: externalLinks?.mediaPlanning?.multiProperty },
          { label: 'International', url: externalLinks?.mediaPlanning?.international },
        ],
      },
      ...(featureFlags.mediaPlan
        ? [
            {
              label: 'Media Planner',
              url: `${externalLinks?.mediaPlanning?.mediaplanner}?myPlansOnly=true`,
            },
          ]
        : []),
    ],
    icon: <Icon name='clipboardListCheck' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'campaign-management',
    title: 'Campaign Management & Setup',
    description: 'Campaign Setup & Management on different platforms.',
    links: [
      // Campaigns + Unmapped Campaigns removed from the Home card (still in the left nav).
      { label: 'Campaign Setup', url: '/all-campaigns' },
    ],
    icon: <Icon name='ad' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'campaign-optimization',
    title: isExternal ? tNav('campaignOptimization') : tNav('campaignOptimizationPacing'),
    description: tHome('moduleCards.campaignOpt.desc'),
    links: [
      ...(isExternal ? [] : [{ label: 'Pacing Tool', url: externalLinks?.campaignOptimization?.pacingTool }]),
      { label: isExternal ? tHome('moduleCards.campaignOpt.link') : 'OBA', url: externalLinks?.campaignOptimization?.oba },
    ],
    icon: <Icon name='slidersV' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'reports',
    title: 'Reports',
    description: 'Covers diverse campaign reports both internal and customer facing.',
    links: [
      { label: 'DMIC', url: externalLinks?.reports?.dmic },
      { label: 'ROAS', url: externalLinks?.reports?.roas },
    ],
    icon: <Icon name='chartBar' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'market-insights',
    title: 'Market Insights',
    description: 'Links to different TI tools that provide key market insights.',
    links: [
      { label: 'TI Portal', url: externalLinks?.marketInsights?.tiPortal },
      { label: 'AMI', url: externalLinks?.marketInsights?.ami },
      { label: 'Google Travel Analytics', url: externalLinks?.marketInsights?.googleTravelAnalytics },
    ],
    icon: <Icon name='chartLine' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'data-management',
    title: 'Data Management',
    description: 'Includes generic data setups across modules and Advertisers.',
    links: [
      { label: 'Data Partners', url: externalLinks?.dataManagement?.datapartners },
      { label: 'Audience Rules', url: externalLinks?.dataManagement?.audienceBuilder },
      { label: 'Audience', url: externalLinks?.dataManagement?.audience },
    ],
    icon: <Icon name='database' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'pricing-billing',
    title: 'Pricing & Billing',
    description: 'Includes links to invoicing tools.',
    icon: <Icon name='fileInvoiceDollar' width={21} height={21} color={colors.sky_80} />,
  },
  {
    key: 'user-management',
    title: tNav('userManagement'),
    description: tHome('moduleCards.userMgmt.desc'),
    links: [{ label: tHome('moduleCards.userMgmt.link'), url: externalLinks?.userManagement }],
    icon: <Icon name='userCog' width={21} height={21} color={colors.sky_80} />,
  },
    ]
  }, [externalLinks, isExternal, tNav, tHome])

  const externalHiddenKeys = ['media-planning', 'campaign-management', 'reports', 'market-insights', 'data-management', 'pricing-billing']

  // Temporarily hidden module-card links, by label. Hidden for now — remove a label here
  // to restore the link. Applied to top-level links and their sub-links.
  const hiddenLinkLabels = new Set<string>([
    'Media Plan Calculator',
    'Campaigns',
    'Unmapped Campaigns',
    'Insite',
    'Ad Copies Creator',
    'Pacing Tool',
    'ROAS',
  ])

  const filteredModules = useMemo(() => {
    return MODULES.filter(m => {
      if (m.key === 'user-management') return isAdmin
      if (isExternal && externalHiddenKeys.includes(m.key)) return false
      return true
    }).map(m =>
      m.links
        ? {
            ...m,
            links: m.links
              .filter(link => !hiddenLinkLabels.has(link.label))
              .map(link =>
                link.subLinks ? { ...link, subLinks: link.subLinks.filter(sub => !hiddenLinkLabels.has(sub.label)) } : link,
              ),
          }
        : m,
    )
  }, [isAdmin, isExternal, MODULES])

  return (
    <GridWrapper>
      {filteredModules.map(m => {
        const Title = () => <CardTitle icon={m.icon} text={m.title} />
        const Content = () => <CardContent description={m.description} links={m.links} />
        return <ModuleCard key={m.key} Title={Title} Content={Content} />
      })}
    </GridWrapper>
  )
}

export default HomeModules
