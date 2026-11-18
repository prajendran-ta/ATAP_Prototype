/**
 * Settings of The Londoner Hotel's campaigns that were not created with Max (Video, Metasearch and the Bing Ads
 * copies of the Google Ads search campaigns), keyed by external campaign ID, for the campaign summary drawer. Each one matches its name
 * (Channel_Tactic_OriginMarket_DestinationMarket_Language): e.g. YouTube_Prospecting_FR_GB_French targets France,
 * runs French creatives and promotes the hotel in London (GB). Prototype data.
 * The four Max campaigns (GA-LN-1001/1002, DSP-LN-2001/2002) are built in londonerCampaignSummary.ts instead.
 */
import { LONDONER, LONDONER_NAMES } from '../../shared/londonerHotel'
import {
  buildLondonerCampaignSummary,
  type CampaignSettingsSummary,
  type SummaryField,
} from './londonerCampaignSummary'

const SITE = 'https://www.thelondoner.com'
const FLIGHT = `${LONDONER.startDateDisplay} → ${LONDONER.endDateDisplay}`
const landingPage = (source: string, medium: string, campaign: string) =>
  `${SITE}/fr/?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`

const basicInfo = (objective: string, campaignType: string, budget: string): SummaryField[] => [
  { label: 'Media plan', value: LONDONER_NAMES.mediaPlan },
  { label: 'Objective', value: objective },
  { label: 'Campaign type', value: campaignType },
  { label: 'Flight', value: FLIGHT },
  { label: 'Budget', value: budget },
  { label: 'Campaign split', value: 'Tactic' },
  { label: 'Second-level split', value: 'None' },
]

const HOTEL = 'The Londoner Hotel, Leicester Square, London (GB)'

// ---- Video (DV360 / YouTube): France -> London, French creatives -------------------------------------------

// The video creative, hosted on YouTube: The Londoner's brand film (The Londoner Hotel channel).
const BRAND_FILM = {
  name: 'The Londoner Brand Film',
  youtubeId: 'U3aN51bXUl8',
  length: '2:09',
  format: '16:9',
}

const VIDEO_FIELDS = (format: string, campaign: string): SummaryField[] => [
  { label: 'Ad format', value: format },
  { label: 'Call to action', value: 'Réserver' },
  { label: 'Companion banner', value: 'Auto-generated from channel assets' },
  { label: 'Destination / landing page', value: landingPage('youtube', 'video', campaign) },
  { label: 'Tracking parameters', value: 'Floodlight activity; YouTube view-through conversions; UTM parameters' },
]

const videoProspecting: CampaignSettingsSummary = {
  platformName: 'YouTube (DV360)',
  basicInfo: basicInfo('Consideration (video views)', 'Video (YouTube)', '£60,000'),
  budgetStrategy: [
    { label: 'Budget & pacing', value: 'Insertion order budget, even pacing' },
    { label: 'Bid strategy', value: 'Target CPV' },
    { label: 'Optimization event', value: 'Video view (30 seconds or completion)' },
    { label: 'Target CPA / cost per result', value: '£0.04 per view' },
    { label: 'Target ROAS', value: '—' },
    { label: 'Max CPC / bid cap', value: '£0.06 max CPV' },
    { label: 'Frequency cap', value: '3 impressions per user per week' },
  ],
  targeting: [
    { label: 'Locations', value: 'France' },
    {
      label: 'Audiences',
      value: 'In-market: Hotels & accommodation; custom intent: London city break; affinity: Luxury travellers',
    },
    { label: 'Audience strategy', value: 'Prospecting: new travellers in France considering a stay in London' },
    { label: 'Creative languages', value: 'French' },
    { label: 'Placements', value: 'YouTube in-stream; YouTube Shorts; Google video partners' },
    { label: 'Devices', value: 'All devices, including connected TV' },
    { label: 'Brand safety', value: 'Standard inventory; sensitive categories excluded' },
  ],
  creatives: {
    fields: VIDEO_FIELDS('Skippable in-stream video ad', 'youtube_prospecting_fr_gb'),
    copy: [
      { field: 'Headline', english: '', french: 'Votre séjour de luxe au cœur de Londres' },
      {
        field: 'Long headline',
        english: '',
        french: 'The Londoner : hôtel 5 étoiles à Leicester Square, au cœur du West End',
      },
      {
        field: 'Description',
        english: '',
        french: 'Spa, piscine, rooftop et dîner-théâtre. Réservez en direct au meilleur tarif.',
      },
    ],
    videos: [BRAND_FILM],
  },
}

const youtubeRetargeting: CampaignSettingsSummary = {
  platformName: 'YouTube (DV360)',
  basicInfo: basicInfo('Conversions (direct bookings)', 'Video (YouTube)', '£36,000'),
  budgetStrategy: [
    { label: 'Budget & pacing', value: 'Insertion order budget, even pacing' },
    { label: 'Bid strategy', value: 'Target CPA' },
    { label: 'Optimization event', value: 'Booking (Floodlight purchase)' },
    { label: 'Target CPA / cost per result', value: '£45.00 per booking' },
    { label: 'Target ROAS', value: '—' },
    { label: 'Max CPC / bid cap', value: '£15.00 max CPM' },
    { label: 'Frequency cap', value: '4 impressions per user per week' },
    { label: 'Lookback window', value: '30 days' },
  ],
  targeting: [
    { label: 'Locations', value: 'France' },
    {
      label: 'Audiences',
      value:
        'Remarketing: thelondoner.com visitors (30 days), booking-engine abandoners (14 days), viewers of The Londoner YouTube videos',
    },
    { label: 'Exclusions', value: 'Guests who booked in the last 30 days' },
    {
      label: 'Audience strategy',
      value: 'Retargeting: bring back travellers in France who visited the site or watched our videos',
    },
    { label: 'Creative languages', value: 'French' },
    { label: 'Placements', value: 'YouTube in-stream; YouTube Shorts; Google video partners' },
    { label: 'Devices', value: 'All devices, including connected TV' },
    { label: 'Brand safety', value: 'Standard inventory; sensitive categories excluded' },
  ],
  creatives: {
    fields: VIDEO_FIELDS('Skippable in-stream video ad with sitelinks', 'youtube_retargeting_fr_gb'),
    copy: [
      { field: 'Headline', english: '', french: 'Votre chambre à Londres vous attend' },
      {
        field: 'Long headline',
        english: '',
        french: 'Revenez à The Londoner : réservez en direct et profitez du petit-déjeuner offert',
      },
      {
        field: 'Description',
        english: '',
        french: 'Meilleur tarif garanti sur thelondoner.com. Annulation gratuite.',
      },
    ],
    videos: [BRAND_FILM],
  },
}

// ---- Metasearch: French travellers (point of sale France) booking the hotel in London ---------------------------
// Metasearch ads are built by the platform from the hotel's price feed, so these campaigns have no creatives.

const metasearchTargeting = (pointOfSale: string): SummaryField[] => [
  { label: 'Locations', value: 'France (user country)' },
  { label: 'Point of sale', value: pointOfSale },
  { label: 'Hotel', value: HOTEL },
  { label: 'Devices', value: 'Desktop, mobile, tablet' },
  { label: 'Length of stay', value: '1–14 nights' },
  { label: 'Check-in window', value: '0–330 days ahead' },
]

const metasearchRevenueTracking: CampaignSettingsSummary = {
  platformName: 'Google Hotel Ads (DerbySoft)',
  basicInfo: basicInfo('Direct bookings', 'Hotel metasearch', '£48,000'),
  budgetStrategy: [
    { label: 'Budget & pacing', value: 'Monthly budget cap, standard pacing' },
    { label: 'Bid strategy', value: 'Commission per stay (pay per stay)' },
    { label: 'Commission rate', value: '12% of booking value' },
    { label: 'Optimization event', value: 'Completed stay (revenue tracked by DerbySoft)' },
    { label: 'Target ROAS', value: '8.0' },
    { label: 'Bid modifiers', value: 'Length of stay 3+ nights +15%; check-in 30+ days ahead +10%; mobile −10%' },
    { label: 'Value rules / conversion value', value: 'Booking revenue net of cancellations' },
  ],
  targeting: metasearchTargeting('Google Hotel Ads — France (google.fr, Google Maps)'),
}

const metasearchCpc: CampaignSettingsSummary = {
  platformName: 'Trivago (WIHP)',
  basicInfo: basicInfo('Direct bookings', 'Hotel metasearch', '£24,000'),
  budgetStrategy: [
    { label: 'Budget & pacing', value: 'Monthly budget cap, standard pacing' },
    { label: 'Bid strategy', value: 'Manual CPC' },
    { label: 'Base CPC', value: '£1.20' },
    { label: 'Max CPC / bid cap', value: '£2.40' },
    { label: 'Optimization event', value: 'Booking on the hotel booking engine (WIHP)' },
    { label: 'Target ROAS', value: '6.0' },
    { label: 'Bid modifiers', value: 'Length of stay 3+ nights +20%; weekend check-in +10%; mobile −15%' },
  ],
  targeting: metasearchTargeting('Trivago France (trivago.fr)'),
}

// ---- Bing Ads paid search: copies of the Google Ads search campaigns ---------------------------------------------
// Same targeting, keywords and ad copy as GA-LN-1001 / GA-LN-1002 (France, English and French ads), so they carry
// the same names. Only the platform, budget, bidding and tracking differ.

const BING_PLACEMENTS = 'Microsoft Search Network (Bing, Yahoo, AOL); syndicated search partners excluded'

const bingCopyOf = (
  tactic: 'Brand' | 'Generic',
  budget: string,
  budgetStrategy: SummaryField[],
): CampaignSettingsSummary => {
  const google = buildLondonerCampaignSummary({ platformId: 'google-ads', tactic })
  const displayUrl = google.creatives?.fields.find(field => field.label === 'Display URL')?.value ?? '—'
  return {
    ...google,
    platformName: 'Microsoft Advertising (Bing Ads)',
    basicInfo: google.basicInfo.map(field =>
      field.label === 'Budget'
        ? { ...field, value: budget }
        : field.label === 'Campaign type'
          ? { ...field, value: 'Search (Microsoft Advertising)' }
          : field,
    ),
    budgetStrategy,
    targeting: google.targeting.map(field =>
      field.label === 'Placements' ? { ...field, value: BING_PLACEMENTS } : field,
    ),
    creatives: {
      ...google.creatives,
      fields: [
        { label: 'Ad format', value: 'Responsive search ad' },
        { label: 'Display URL', value: displayUrl },
        {
          label: 'Destination / landing page',
          value: `${SITE}/?utm_source=bing&utm_medium=cpc&utm_campaign=paidsearch_${tactic.toLowerCase()}_fr_gb`,
        },
        { label: 'Tracking parameters', value: 'UET tag; auto-tagging (msclkid); UTM parameters' },
      ],
    },
  }
}

const paidSearchBrand = bingCopyOf('Brand', '£14,000', [
  { label: 'Budget & pacing', value: 'Daily budget, standard pacing' },
  { label: 'Bid strategy', value: 'Target impression share (top of page, 95%)' },
  { label: 'Optimization event', value: 'Booking / purchase (primary)' },
  { label: 'Target CPA / cost per result', value: '£22.00' },
  { label: 'Target ROAS', value: '9.0' },
  { label: 'Max CPC / bid cap', value: '£1.50' },
  { label: 'Value rules / conversion value', value: 'Booking revenue × 1.0' },
])

const paidSearchGeneric = bingCopyOf('Generic', '£26,000', [
  { label: 'Budget & pacing', value: 'Daily budget, standard pacing' },
  { label: 'Bid strategy', value: 'Target CPA' },
  { label: 'Optimization event', value: 'Booking / purchase (primary)' },
  { label: 'Target CPA / cost per result', value: '£58.00' },
  { label: 'Target ROAS', value: '4.0' },
  { label: 'Max CPC / bid cap', value: '£3.00' },
  {
    label: 'Value rules / conversion value',
    value: 'Booking revenue × 1.0; +15% value adjustment for stays of 3+ nights',
  },
])

/** Settings by external campaign ID (the IDs shown in Campaign Setup). */
export const LONDONER_CAMPAIGN_SETTINGS: Record<string, CampaignSettingsSummary> = {
  'DV-LN-3001': videoProspecting, // YouTube_Prospecting_FR_GB_French
  'DV-LN-3002': youtubeRetargeting, // YouTube_Retargeting_FR_GB_French
  'DS-LN-4001': metasearchRevenueTracking, // Metasearch_RevenueTracking_FR_GB_French
  'WIHP-LN-5001': metasearchCpc, // Metasearch_CPC_FR_GB_French
  'cm-ln001': paidSearchBrand, // PaidSearch_Brand_FR_GB_English-French (Bing Ads)
  'cm-ln002': paidSearchGeneric, // PaidSearch_Generic_FR_GB_English-French (Bing Ads)
}
