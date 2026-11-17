import type { CampaignFlowData, DisplayBanner, RawCampaignPlatform, SearchAdConfig } from './campaignFlowData'

/**
 * Flow profile for The Londoner Hotel ('Create campaigns with Max').
 *
 * Max only ships an Amadeus Hotels dataset, so for the advertisers picked in the first step the flow
 * reuses it with the brand name replaced (see setFlowAdvertiserName). The Londoner has a real
 * brief on top of that, applied here as data overrides:
 *  - platforms: Google Ads (Brand + Generic) and Amadeus DSP (Prospecting + Remarketing) only,
 *  - platform settings: location targeting France, the suggested brand + generic keywords adopted,
 *    the suggested creatives adopted (images are uploaded later) in French and English,
 *  - splits: first level = Tactic, second level = none (see buildClosedWonDraft, which reads the
 *    profile through getFlowProfile()).
 * Everything is a pure data override; no component knows about the Londoner.
 */

const NAME = 'The Londoner Hotel'

// Budgets by tactic for the platforms in this flow (GBP). Paid search 192,000 + Display 120,000 = 312,000
// of the 480,000 media plan (video and metasearch are created separately).
const mediaPlanTable = (): CampaignFlowData['conversation']['mediaPlanTable'] => ({
  total: '£343,200',
  fees: '£31,200',
  groups: [
    {
      channel: 'Paid Search',
      subtotal: '£192,000',
      items: [
        { tactic: 'Brand', platforms: ['google-ads'], budget: '£58,000' },
        { tactic: 'Generic', platforms: ['google-ads'], budget: '£134,000' },
      ],
    },
    {
      channel: 'Display Advertising',
      subtotal: '£120,000',
      items: [
        { tactic: 'Prospecting', platforms: ['amadeus-dsp'], budget: '£72,000' },
        { tactic: 'Remarketing', platforms: ['amadeus-dsp'], budget: '£48,000' },
      ],
    },
  ],
})

// Suggested keywords (adopted as-is): brand = the hotel and its direct-booking intents; generic = London
// stays, in English and in French for the French market being targeted.
const BRAND_KEYWORDS = [
  'The Londoner Hotel',
  'The Londoner London',
  'The Londoner Hotel Leicester Square',
  'The Londoner Hotel booking',
  'The Londoner Hotel rooms',
  'The Londoner Hotel suites',
  'The Londoner Hotel offers',
  'The Londoner Hotel rates',
  'The Londoner Hotel availability',
  'book The Londoner Hotel',
  'The Londoner Hotel official',
  'The Londoner Hotel reservations',
  'The Londoner Hotel spa',
  'The Londoner Hotel rooftop',
  'The Londoner Hotel weekend',
  'The Londoner Hotel city break',
  'The Londoner Hotel direct',
  'hôtel The Londoner',
  'The Londoner Hotel Londres',
  'réserver The Londoner Hotel',
]
const GENERIC_KEYWORDS = [
  'London hotel',
  'hotels in London',
  'luxury hotel London',
  'boutique hotel London',
  'hotel Leicester Square',
  'hotel West End London',
  'city break London',
  'weekend in London',
  'family hotel London',
  'spa hotel London',
  'best hotels London',
  'hôtel Londres',
  'hôtel de luxe Londres',
  'hôtel Londres centre',
  'hôtel Leicester Square',
  'week-end à Londres',
  'séjour Londres',
  'séjour romantique Londres',
  'hôtel Londres Eurostar',
  'meilleur hôtel Londres',
]

// Search ad modelled on the example Google result: "The Londoner | The Londoner Hotel" with three sitelinks.
const SEARCH_EN = {
  headline: 'The Londoner | The Londoner Hotel',
  description:
    'Luxury stays, spa packages, theatre dining deals and culture packages. Browse exclusive hotel offers at The Londoner.',
}
const SEARCH_FR = {
  headline: 'The Londoner | Hôtel de luxe à Londres',
  description:
    'Séjours de luxe, forfaits spa, offres dîner-théâtre et forfaits culture. Découvrez les offres exclusives de The Londoner.',
}
const SEARCH_AD: SearchAdConfig = {
  displayName: 'The Londoner',
  displayUrl: 'https://www.thelondoner.com',
  logo: '/creatives/londoner/300x250/logo.png',
  sitelinks: [
    {
      title: 'Official Website',
      description: 'Book directly with us for exclusive rates and access to the private guest Residence.',
    },
    { title: 'Book Direct', description: 'Enjoy our pool, gym, superfood clinic and much more at The Retreat' },
    { title: 'Spa, Wellness & Beauty', description: 'An urban sanctuary with pool, spa, gym, hair salon & more' },
  ],
  localizedSitelinks: {
    fr: [
      {
        title: 'Site officiel',
        description: "Réservez directement chez nous pour des tarifs exclusifs et l'accès à la Résidence privée.",
      },
      { title: 'Réserver en direct', description: 'Profitez de la piscine, du gym, de la clinique superfood et plus encore à The Retreat' },
      { title: 'Spa, bien-être & beauté', description: 'Un sanctuaire urbain avec piscine, spa, gym, salon de coiffure et plus' },
    ],
  },
}

// HTML5 display banners (Google Web Designer, DV360) served from public/creatives/londoner/<size>/index.html.
export const LONDONER_BANNERS: DisplayBanner[] = [
  { id: '300x250', size: '300x250', width: 300, height: 250 },
  { id: '300x600', size: '300x600', width: 300, height: 600 },
  { id: '728x90', size: '728x90', width: 728, height: 90 },
  { id: '160x600', size: '160x600', width: 160, height: 600 },
].map(banner => ({ ...banner, path: `/creatives/londoner/${banner.size}/index.html` }))

// The display copy lives in the banners themselves; these fields only describe it.
const DISPLAY_NOTE_EN = 'Messaging is defined in the HTML5 banners'
const DISPLAY_NOTE_FR = 'Le message est défini dans les bannières HTML5'

/** Returns a copy of `data` (already carrying the advertiser name) with the Londoner brief applied. */
export const applyLondonerProfile = (data: CampaignFlowData): CampaignFlowData => {
  const next = JSON.parse(JSON.stringify(data)) as CampaignFlowData

  next.basicInfo = {
    ...next.basicInfo,
    campaignName: `${NAME} France 2027 Campaign`,
    mediaPlanName: `${NAME} — 2027`,
    // Market (France) is part of the fixed prefix: LON_2027_FR_<PLATFORM>_<TACTIC>.
    namingConvention: 'LON_2027_FR_{platform}',
  }
  next.keywords = { ...next.keywords, brand: BRAND_KEYWORDS, generic: GENERIC_KEYWORDS }

  // One property (the hotel itself). The brief splits by Tactic, so this list is not used to split, but it
  // keeps the Paris example properties from showing up anywhere.
  next.properties = [`${NAME} — London`]
  next.propertyMediaPlans = (next.propertyMediaPlans ?? []).map(plan => ({ ...plan, properties: next.properties }))

  // Only the two platforms of the brief, in both selectable plans.
  next.conversation.mediaPlanTable = mediaPlanTable()
  next.mediaPlan2026 = { ...next.mediaPlan2026, mediaPlanTable: mediaPlanTable() }

  next.platforms = next.platforms.map(platform => {
    if (platform.id === 'google-ads') {
      return {
        ...platform,
        splitBy: 'None (By Tactic)',
        tactics: ['Brand', 'Generic'],
        targeting: {
          ...platform.targeting,
          location: 'France',
          audience: 'Destination London intenders; In-market: Hotels; Custom audience (first-party)',
        },
        creative: {
          ...platform.creative,
          ...SEARCH_EN,
          searchAd: SEARCH_AD,
          assetImages: [],
          destination:
            'https://www.thelondoner.com/?utm_source=google&utm_medium=cpc&utm_campaign=lon_2027_google',
        },
      } as RawCampaignPlatform
    }
    if (platform.id === 'amadeus-dsp') {
      return {
        ...platform,
        splitBy: 'None (By Tactic)',
        targeting: {
          ...platform.targeting,
          location: 'France',
          audience: 'First-party; affinity: Travel & Luxury; in-market: Hotels; London destination intenders',
        },
        creative: {
          ...platform.creative,
          headline: DISPLAY_NOTE_EN,
          description: DISPLAY_NOTE_EN,
          adFormat: 'HTML5 display banners',
          banners: LONDONER_BANNERS,
          assetImages: [],
          destination:
            'https://www.thelondoner.com/?utm_source=amadeus_dsp&utm_medium=display&utm_campaign=lon_2027_dsp',
        },
      } as RawCampaignPlatform
    }
    return platform
  })

  // French copy (English is always shown first; France adds the French tab).
  next.localizedCreative = {
    ...next.localizedCreative,
    'google-ads': { ...next.localizedCreative['google-ads'], fr: SEARCH_FR },
    'amadeus-dsp': {
      ...next.localizedCreative['amadeus-dsp'],
      fr: { headline: DISPLAY_NOTE_FR, description: DISPLAY_NOTE_FR },
    },
  }
  return next
}
