import { LONDONER } from '../../shared/londonerHotel'
import { buildAdvertiserFlowData, type DisplayBanner } from './campaignFlowData'
import { formatDisplayDate, languageTabsFor, normalizePlatforms, resolveMediaPlan } from './campaignFlowLogic'
import type { MaxCampaignRef } from './londonerMaxCampaigns'

/**
 * Settings of a campaign created by 'Create campaigns with Max' for The Londoner Hotel, derived from the SAME
 * Londoner flow data the creation steps use (buildAdvertiserFlowData), so the drawer in Campaign Setup always
 * shows what Max configured. Split like the campaign creation canvas: Basic info, Budget strategy,
 * Targeting, Keywords (paid search only) and Creatives.
 */
export type SummaryField = { label: string; value: string }
export type KeywordRow = { keyword: string; matchType: string }
export type CopyRow = { field: string; english: string; french: string }
export type SitelinkRow = { n: number; titleEn: string; descriptionEn: string; titleFr: string; descriptionFr: string }
/** A video creative hosted on YouTube. */
export type VideoAssetRow = { name: string; youtubeId: string; length: string; format: string }
export type ImageAssetRow = { name: string; type: string; path: string }

export type CampaignSettingsSummary = {
  platformName: string
  /** Flow-derived basic info (the drawer prepends the row facts: name, ID, advertiser...). */
  basicInfo: SummaryField[]
  budgetStrategy: SummaryField[]
  targeting: SummaryField[]
  /** Paid search only. */
  keywords?: { tactic: string; matchType: string; keywords: KeywordRow[]; negative: KeywordRow[] }
  /** Absent for campaigns without creatives (metasearch). */
  creatives?: {
    fields: SummaryField[]
    /** Search ads: headline / description in English and French. */
    copy?: CopyRow[]
    sitelinks?: SitelinkRow[]
    /** Display: the HTML5 banners. */
    banners?: DisplayBanner[]
    /** Video: the video assets. */
    videos?: VideoAssetRow[]
    /** Search ads: image assets (logo and images). */
    images?: ImageAssetRow[]
  }
}

const AMOUNT = (raw: string) => (raw.trim() ? `£${Number(raw).toFixed(2)}` : '—')

// Keywords of the Google Ads Brand campaign (GA-LN-1001), with the match type of each row.
const LONDONER_BRAND_KEYWORDS: KeywordRow[] = [
  { keyword: 'hotel londoner leicester square', matchType: 'Broad' },
  { keyword: 'hotel londoner london', matchType: 'Broad' },
  { keyword: 'hotel londoner londres', matchType: 'Broad' },
  { keyword: 'hotel the londoner', matchType: 'Broad' },
  { keyword: 'hotel the londoner edwardian', matchType: 'Broad' },
  { keyword: 'hotel the londoner leicester square', matchType: 'Broad' },
  { keyword: 'londoner hotel leicester square', matchType: 'Broad' },
  { keyword: 'londoner hotel leicester square', matchType: 'Exact' },
  { keyword: 'londoner hotel london', matchType: 'Broad' },
  { keyword: 'londoner hotel london', matchType: 'Exact' },
  { keyword: 'the londoner', matchType: 'Broad' },
  { keyword: 'the londoner', matchType: 'Exact' },
  { keyword: 'the londoner edwardian', matchType: 'Broad' },
  { keyword: 'the londoner edwardian', matchType: 'Exact' },
  { keyword: 'the londoner edwardian hotel', matchType: 'Broad' },
  { keyword: 'the londoner edwardian hotel', matchType: 'Exact' },
  { keyword: 'the londoner hotel', matchType: 'Broad' },
  { keyword: 'the londoner hotel', matchType: 'Exact' },
  { keyword: 'the londoner hotel leicester square', matchType: 'Broad' },
  { keyword: 'the londoner hotel leicester square', matchType: 'Exact' },
  { keyword: 'the londoner hotel london', matchType: 'Broad' },
  { keyword: 'the londoner hotel london', matchType: 'Exact' },
  { keyword: 'the londoner leicester square', matchType: 'Broad' },
  { keyword: 'the londoner london', matchType: 'Broad' },
  { keyword: 'the londoner londres', matchType: 'Broad' },
]

export const buildLondonerCampaignSummary = ({ platformId, tactic }: MaxCampaignRef): CampaignSettingsSummary => {
  const data = buildAdvertiserFlowData(LONDONER.name, LONDONER.bpid)
  const platform = normalizePlatforms(data).find(entry => entry.id === platformId)!
  const plan = resolveMediaPlan('2027', data)
  const budget =
    plan.mediaPlanTable.groups
      .flatMap(group => group.items)
      .find(item => item.tactic === tactic && item.platforms.includes(platformId))?.budget ?? '—'
  const languages = languageTabsFor(
    platform.targeting.location.split(';').map(location => location.trim()),
    [],
    data,
  )
    .map(language => language.label)
    .join(', ')

  const basicInfo: SummaryField[] = [
    { label: 'Media plan', value: plan.mediaPlanName },
    { label: 'Objective', value: data.basicInfo.objective },
    { label: 'Campaign type', value: data.basicInfo.campaignType },
    { label: 'Flight', value: `${formatDisplayDate(plan.startDate)} → ${formatDisplayDate(plan.endDate)}` },
    { label: 'Budget', value: budget },
    { label: 'Campaign split', value: 'Tactic' },
    { label: 'Second-level split', value: 'None' },
  ]

  const budgetStrategy: SummaryField[] = [
    { label: 'Budget & pacing', value: platform.bidding.budgetPacing },
    { label: 'Bid strategy', value: platform.bidding.bidStrategy },
    { label: 'Optimization event', value: platform.bidding.optimizationEvent },
    { label: 'Target CPA / cost per result', value: AMOUNT(platform.bidding.targetCpa) },
    { label: 'Target ROAS', value: platform.bidding.targetRoas || '—' },
    { label: 'Max CPC / bid cap', value: AMOUNT(platform.bidding.maxCpc) },
    { label: 'Value rules / conversion value', value: platform.bidding.valueRules || '—' },
  ]

  const targeting: SummaryField[] = [
    { label: 'Locations', value: platform.targeting.location },
    { label: 'Audiences', value: platform.targeting.audience },
    { label: 'Creative languages', value: languages },
    { label: 'Placements', value: platform.targeting.placements },
  ]

  if (platformId === 'google-ads') {
    const searchAd = platform.creative.searchAd
    const fr = data.localizedCreative['google-ads']?.fr
    const isBrand = tactic === 'Brand'
    const matchType = isBrand ? data.defaultBrandMatchType : data.defaultGenericMatchType
    const negativeMatchType = data.defaultNegativeMatchType ?? data.defaultGenericMatchType
    const frLinks = searchAd?.localizedSitelinks?.fr ?? []
    return {
      platformName: platform.name,
      basicInfo,
      budgetStrategy,
      targeting,
      keywords: {
        tactic,
        matchType,
        keywords: isBrand ? LONDONER_BRAND_KEYWORDS : data.keywords.generic.map(keyword => ({ keyword, matchType })),
        negative: data.keywords.negative.map(keyword => ({ keyword, matchType: negativeMatchType })),
      },
      creatives: {
        fields: [
          { label: 'Ad format', value: platform.creative.adFormat },
          { label: 'Display URL', value: searchAd?.displayUrl ?? '—' },
          { label: 'Destination / landing page', value: platform.creative.destination },
          { label: 'Tracking parameters', value: platform.creative.tracking },
        ],
        copy: [
          { field: 'Headline', english: platform.creative.headline, french: fr?.headline ?? '—' },
          { field: 'Description', english: platform.creative.description, french: fr?.description ?? '—' },
        ],
        images: [
          ...(searchAd?.logo ? [{ name: `${searchAd.displayName} logo`, type: 'Logo', path: searchAd.logo }] : []),
          ...(searchAd?.images ?? []).map(image => ({ ...image, type: 'Image' })),
        ],
        sitelinks: (searchAd?.sitelinks ?? []).map((link, index) => ({
          n: index + 1,
          titleEn: link.title,
          descriptionEn: link.description,
          titleFr: frLinks[index]?.title ?? '—',
          descriptionFr: frLinks[index]?.description ?? '—',
        })),
      },
    }
  }

  const isProspecting = tactic === 'Prospecting'
  return {
    platformName: platform.name,
    basicInfo,
    budgetStrategy,
    targeting: [
      ...targeting.slice(0, 2),
      {
        label: 'Audience strategy',
        value: isProspecting
          ? 'Prospecting: new travellers in France interested in London stays'
          : 'Remarketing: website visitors, abandoned bookings and past guests',
      },
      ...targeting.slice(2),
    ],
    creatives: {
      fields: [
        { label: 'Ad format', value: 'HTML5 display banners' },
        { label: 'Destination / landing page', value: platform.creative.destination },
        { label: 'Tracking parameters', value: platform.creative.tracking },
      ],
      banners: platform.creative.banners ?? [],
    },
  }
}
