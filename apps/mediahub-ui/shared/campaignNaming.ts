/**
 * Campaign naming convention: Channel_Tactic_OriginMarket_DestinationMarket_Language,
 * e.g. `PaidSearch_Brand_FR_GB_French` (paid search, brand, travellers from France, hotel in Great Britain, French ads).
 *
 * - Channel: PaidSearch, Display, Video, YouTube, Metasearch or Social.
 * - Tactic depends on the channel: Brand / Generic for PaidSearch; Prospecting / Retargeting (and similar) for the others.
 * - Origin market: where the audience is. Destination market: where the hotel is. Both are ISO 2-letter country codes.
 * - Language: the full language name.
 *
 * Origin and destination markets come from the advertiser (shared/demoAdvertisers.ts).
 */
import { LONDONER } from './londonerHotel'
import { currentDemoAdvertiser } from './demoAdvertisers'

export type CampaignChannel = 'PaidSearch' | 'Display' | 'Video' | 'YouTube' | 'Metasearch' | 'Social'

export type CampaignNameParts = {
  channel: CampaignChannel
  tactic: string
  origin: string
  destination: string
  language: string
}

// Hyphens are kept so a token can list several values, e.g. the language "English-French".
const toToken = (value: string) => value.replace(/[^A-Za-z0-9-]+/g, '')

// The tactic names the Max flow uses internally that the convention spells differently.
const TACTIC_ALIASES: Record<string, string> = { Remarketing: 'Retargeting' }

export const campaignNameFromParts = ({ channel, tactic, origin, destination, language }: CampaignNameParts): string =>
  [channel, TACTIC_ALIASES[tactic] ?? tactic, origin, destination, language].map(toToken).join('_')

const CHANNEL_BY_PLATFORM: Record<string, CampaignChannel> = {
  // Campaign Setup platform values
  sa360: 'PaidSearch',
  bing: 'PaidSearch',
  'google ads': 'PaidSearch',
  cm360: 'Display',
  'amadeus dsp': 'Display',
  dv360: 'Video',
  derbysoft: 'Metasearch',
  wihp: 'Metasearch',
  meta: 'Social',
  // Max flow platform ids
  'google-ads': 'PaidSearch',
  'amadeus-dsp': 'Display',
  amazon: 'Display',
  demandgen: 'Display',
  youtube: 'Video',
  tiktok: 'Social',
  linkedin: 'Social',
}

export const channelForPlatform = (platform: string): CampaignChannel | undefined =>
  CHANNEL_BY_PLATFORM[platform.toLowerCase()]

const LANGUAGE_BY_MARKET: Record<string, string> = { FR: 'French', ES: 'Spanish', DE: 'German', IT: 'Italian' }

/** The language spoken in a market (English when not listed). */
export const languageForMarket = (market: string): string => LANGUAGE_BY_MARKET[market] ?? 'English'

const LANGUAGE_BY_CODE: Record<string, string> = {
  EN: 'English',
  FR: 'French',
  ES: 'Spanish',
  DE: 'German',
  IT: 'Italian',
}

/** Full language name for a language code such as 'FR' (the code itself when unknown). */
export const languageName = (code: string): string => LANGUAGE_BY_CODE[code] ?? code

/** Origin markets that speak each language, used when a name has to be told apart from another one. */
const ORIGINS_BY_LANGUAGE: Record<string, string[]> = {
  English: ['GB', 'US', 'CA', 'AU', 'IE', 'SG', 'NZ', 'ZA', 'IN', 'AE', 'HK', 'MY'],
  French: ['FR', 'BE', 'CH', 'CA', 'LU', 'MC', 'MA', 'TN', 'SN', 'CI'],
  Spanish: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'UY', 'EC'],
  German: ['DE', 'AT', 'CH', 'LU', 'LI', 'NL', 'DK', 'SE'],
  Italian: ['IT', 'CH', 'SM', 'MT'],
}

const CHANNEL_BY_LABEL: Record<string, CampaignChannel> = {
  'paid search': 'PaidSearch',
  display: 'Display',
  video: 'Video',
  metasearch: 'Metasearch',
  social: 'Social',
}

/** Channel for a tactic label such as 'Paid Search' (the Tactic column of the mapped campaigns). */
export const channelFromLabel = (label: string): CampaignChannel | undefined => CHANNEL_BY_LABEL[label.toLowerCase()]

/**
 * The convention tactic for a channel, from a free-form sub-type: Brand / Generic for PaidSearch,
 * RevenueTracking / CPC for Metasearch, and Prospecting / Retargeting / AlwaysOn / Brand for the others.
 */
export const tacticForChannel = (channel: CampaignChannel, subType: string): string => {
  const value = subType.toLowerCase()
  if (channel === 'PaidSearch') return value === 'brand' ? 'Brand' : 'Generic'
  if (channel === 'Metasearch') return value.includes('revenue') ? 'RevenueTracking' : 'CPC'
  if (value === 'remarketing' || value === 'retargeting') return 'Retargeting'
  if (value === 'always-on') return 'AlwaysOn'
  if (value === 'brand') return 'Brand'
  return 'Prospecting'
}

type AdvertiserMarkets = { destination: string; origins: string[] }

// The Londoner's campaigns target France first (see campaignFlowProfiles.ts), then the home market and the US.
const LONDONER_MARKETS: AdvertiserMarkets = { destination: 'GB', origins: ['FR', 'GB', 'US'] }

/**
 * Creative languages of the Londoner campaigns created with Max, per channel (they match the campaign settings):
 * the search ads are in English and French, the HTML5 display banners in English.
 */
export const LONDONER_MAX_LANGUAGES: Partial<Record<CampaignChannel, string>> = {
  PaidSearch: 'English-French',
  Display: 'English',
}

/**
 * Destination market (the hotel's country) and the origin markets its campaigns target, per advertiser BPID.
 * Prototype data: the real origin markets come from the media plan.
 */
const marketsFor = (bpid: string | undefined): AdvertiserMarkets | undefined => {
  if (bpid === LONDONER.bpid) return LONDONER_MARKETS
  const advertiser = currentDemoAdvertiser(bpid)
  return advertiser && { destination: advertiser.destination, origins: advertiser.origins }
}

/**
 * Convention name for an advertiser's campaign. Destination and the origin market default from the advertiser's
 * markets (the origin is the `originIndex`-th of its origin markets); language follows the origin.
 */
export const campaignNameFor = (
  bpid: string | undefined,
  channel: CampaignChannel,
  tactic: string,
  overrides: Partial<Pick<CampaignNameParts, 'origin' | 'destination' | 'language'>> = {},
  originIndex = 0,
): string => {
  const markets = marketsFor(bpid)
  const origin = overrides.origin ?? markets?.origins[originIndex % markets.origins.length] ?? 'US'
  return campaignNameFromParts({
    channel,
    tactic,
    origin,
    destination: overrides.destination ?? markets?.destination ?? 'US',
    language: overrides.language ?? languageForMarket(origin),
  })
}

type NameableRow = {
  advertiserBid: string
  tactic: string
  subType: string
  language: string
}

/**
 * Convention names for campaign rows that carry a tactic label ('Paid Search'), a sub-type and a language code.
 * The language drives the origin market (French -> FR, ...). When two campaigns of one advertiser would get the
 * same name (or the name is in `reserved`), the next origin market that speaks the language is used.
 */
export const conventionNamesFor = (
  rows: NameableRow[],
  reserved: { advertiserBid: string; name: string }[] = [],
): string[] => {
  const used = new Map<string, Set<string>>()
  const takenFor = (advertiserBid: string) => {
    const taken = used.get(advertiserBid) ?? new Set<string>()
    used.set(advertiserBid, taken)
    return taken
  }
  reserved.forEach(({ advertiserBid, name }) => takenFor(advertiserBid).add(name))
  return rows.map(row => {
    const channel = channelFromLabel(row.tactic) ?? 'Display'
    const tactic = tacticForChannel(channel, row.subType)
    const language = languageName(row.language)
    const markets = marketsFor(row.advertiserBid)
    const origins = [
      ...(markets?.origins.filter(origin => languageForMarket(origin) === language) ?? []),
      ...(ORIGINS_BY_LANGUAGE[language] ?? ['US']),
    ]
    const names = origins.map(origin =>
      campaignNameFromParts({ channel, tactic, origin, destination: markets?.destination ?? 'US', language }),
    )
    const taken = takenFor(row.advertiserBid)
    const name = names.find(candidate => !taken.has(candidate)) ?? names[0]
    taken.add(name)
    return name
  })
}
