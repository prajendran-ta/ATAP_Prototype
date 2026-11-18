/**
 * The four Londoner campaigns created by 'Create campaigns with Max' (Google Ads Brand + Generic, Amadeus DSP
 * Prospecting + Remarketing). Kept dependency-free so mock data can use it. The names are what the flow
 * generates (buildCampaignName with the Londoner naming parts): keep them equal if that changes.
 */
import { LONDONER_MAX_LANGUAGES, campaignNameFor } from '../../shared/campaignNaming'

export type MaxCampaignRef =
  | { platformId: 'google-ads'; tactic: 'Brand' | 'Generic' }
  | { platformId: 'amadeus-dsp'; tactic: 'Prospecting' | 'Remarketing' }

const LONDONER_BPID = 'BP-910077'
const londonerName = (channel: 'PaidSearch' | 'Display', tactic: string) =>
  campaignNameFor(LONDONER_BPID, channel, tactic, { language: LONDONER_MAX_LANGUAGES[channel] })

export const MAX_CAMPAIGN_NAMES = {
  'google-ads|Brand': londonerName('PaidSearch', 'Brand'),
  'google-ads|Generic': londonerName('PaidSearch', 'Generic'),
  'amadeus-dsp|Prospecting': londonerName('Display', 'Prospecting'),
  'amadeus-dsp|Remarketing': londonerName('Display', 'Remarketing'),
} as const

export const maxCampaignName = (ref: MaxCampaignRef): string =>
  MAX_CAMPAIGN_NAMES[`${ref.platformId}|${ref.tactic}` as keyof typeof MAX_CAMPAIGN_NAMES]
