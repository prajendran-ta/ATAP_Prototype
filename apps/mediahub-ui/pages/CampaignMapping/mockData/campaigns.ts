// Mock data for the Campaigns (mapped) page — campaigns whose campaign/reporting mapping is
// complete. Mirrors the Unmapped list structure but lists MAPPED campaigns with the internal
// (ATAP) identity: internal Campaign Name + ATAP advertiser + tactic/sub-type/language.

import { platformLabel, unmappedCampaigns } from './unmappedCampaigns'
import { LONDONER, LONDONER_CHANNELS, londonerCampaignCustoms, londonerFirst } from '../../../shared/londonerHotel'
import { conventionNamesFor } from '../../../shared/campaignNaming'
import { maxCampaignName } from '../../../components/CampaignFlow/londonerMaxCampaigns'
import {
  DEMO_ADVERTISERS,
  DEMO_CHANNEL_INFO,
  activeChannels,
  currentDemoAdvertiser,
} from '../../../shared/demoAdvertisers'
import type { DemoAdvertiser, DemoChannelKey } from '../../../shared/demoAdvertisers'

export type MappingStatus = 'grey' | 'green' | 'red'

// Platform run-state of the campaign (distinct from the DWI MappingStatus).
export type CampaignStatus = 'scheduled' | 'live' | 'pause' | 'complete' | 'unknown'

export interface MappedCampaign {
  id: string
  /** External platform / channel (the mapping family). */
  platform: string
  /** DWI-derived downstream delivery platform the data comes from. '—' when N/A (e.g. WIHP). */
  reportingPlatform: string
  /** Internal (ATAP) mapped campaign name — the main identifier for a mapped campaign. */
  campaignName: string
  /** ATAP advertiser. */
  advertiserName: string
  advertiserBid: string
  /** Mapping dimensions. */
  tactic: string
  subType: string
  language: string
  /** Grey = saved, awaiting DWI; Green = DWI-confirmed; Red = issue (48h elapsed). */
  mappingStatus: MappingStatus
  /** Platform run-state shown as a colored dot by the campaign name. */
  campaignStatus: CampaignStatus
  /** Offers mapping state (icon column). N/A for WIHP/DerbySoft (platform check). */
  offersMapping: 'mapped' | 'unmapped'
  /** Rollup of this campaign's Offer_ID statuses (for the Offers column dots). */
  offerCounts: { green: number; grey: number; red: number }
  /** Optional Custom 1/2/3 values (part of the Naming Convention String); sampled when absent. */
  custom1?: string
  custom2?: string
  custom3?: string
  /** Name fixed by the campaign's settings; otherwise the name is derived by conventionNamesFor(). */
  fixedName?: string
  /** Followed advertiser (My Campaigns scope). */
  isFollowed: boolean
}

// The Londoner Hotel (BP-910077) demo rows — ids/names/channels come from shared/londonerHotel.ts.
type LnChannel = 'paidSearch' | 'display' | 'video' | 'metasearch'
const ln = (
  n: number, ch: LnChannel, subType: string, lang: string, campaignStatus: CampaignStatus,
  mappingStatus: MappingStatus, counts: [number, number, number] | null,
  o: { platform?: string; reportingPlatform?: string; tactic?: string; fixedName?: string } = {},
): MappedCampaign => {
  const c = LONDONER_CHANNELS[ch]
  const tactic = o.tactic ?? c.tactic
  const [green, grey, red] = counts ?? [0, 0, 0]
  return {
    id: `cm-ln${String(n).padStart(3, '0')}`,
    platform: o.platform ?? c.mappingPlatform,
    reportingPlatform: o.reportingPlatform ?? c.reportingPlatform,
    campaignName: '', // set for every row by conventionNamesFor() at the bottom of this file
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    tactic,
    subType,
    language: lang,
    fixedName: o.fixedName,
    // Custom 1/2/3 are separate reporting columns (Market / Campaign Objective / Fiscal Year).
    ...londonerCampaignCustoms(tactic, subType, lang),
    mappingStatus,
    campaignStatus,
    offersMapping: counts ? 'mapped' : 'unmapped',
    offerCounts: { green, grey, red },
    isFollowed: true,
  }
}

/**
 * The hand-authored rows below were written for an earlier set of demo advertisers, which they still identify by
 * their old BPIDs (see currentDemoAdvertiser). Re-attributes a row to the current advertiser.
 */
const reattribute = (campaign: MappedCampaign): MappedCampaign => {
  const advertiser = currentDemoAdvertiser(campaign.advertiserBid)
  return advertiser ? { ...campaign, advertiserName: advertiser.name, advertiserBid: advertiser.bpid } : campaign
}

const legacyMappedCampaigns: MappedCampaign[] = [
  { id: 'cm-r001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'El Palace Barcelona_Paid Search_Brand_EN', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'red', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-r002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Mulia Resort_Social_Retargeting_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-r003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Trump Intl LV_Display_Prospecting_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-r004', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Copthorne Auckland_Paid Search_Brand_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0001', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Mulia Resort_Paid Search_Brand_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: true },
  { id: 'cm-0002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Mulia Resort_Social_Prospecting_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'El Palace Barcelona_Display_Remarketing_ES', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Display', subType: 'Remarketing', language: 'ES', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0004', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: 'Trump Intl LV_Metasearch_RevTracking_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0005', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Copthorne Auckland_Paid Search_NonBrand_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0006', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Millennium Queenstown_Social_Retargeting_EN', advertiserName: 'Millennium Hotel Queenstown', advertiserBid: 'BP-33012', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0007', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Mulia Villa_Display_Prospecting_EN', advertiserName: 'Mulia Villa - Nusa Dua, Bali', advertiserBid: 'BP-64518', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 11, grey: 4, red: 1 }, isFollowed: true },
  { id: 'cm-0008', platform: 'WIHP', reportingPlatform: '—', campaignName: 'El Palace Barcelona_Metasearch_Meta_ES', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Metasearch', subType: 'Metasearch', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0009', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Wellington_Display_Prospecting_EN', advertiserName: 'Copthorne Hotel Wellington Oriental Bay', advertiserBid: 'BP-33015', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0010', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Millennium Rotorua_Paid Search_Brand_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0011', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Trump Intl LV_Social_Prospecting_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 14, grey: 3, red: 3 }, isFollowed: true },
  { id: 'cm-0012', platform: 'DerbySoft', reportingPlatform: 'Tripadvisor', campaignName: 'Millennium Rotorua_Metasearch_RevTracking_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0013', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Mulia Resort_Display_Remarketing_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 20, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0014', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'El Palace Barcelona_Paid Search_NonBrand_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0015', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Copthorne Auckland_Social_Prospecting_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: true },
  // ---- Additional rows: broader platform + campaign-status coverage ----
  { id: 'cm-0016', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Mulia Resort_Paid Search_Brand_FR', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0017', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'El Palace Barcelona_Paid Search_NonBrand_EN', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 2 }, isFollowed: true },
  { id: 'cm-0018', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Trump Intl LV_Paid Search_Brand_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0019', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Auckland_Display_Prospecting_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 18, grey: 2, red: 0 }, isFollowed: true },
  { id: 'cm-0020', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Millennium Rotorua_Social_Retargeting_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0021', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Mulia Villa_Paid Search_NonBrand_EN', advertiserName: 'Mulia Villa - Nusa Dua, Bali', advertiserBid: 'BP-64518', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0022', platform: 'WIHP', reportingPlatform: '—', campaignName: 'Trump Intl LV_Metasearch_Meta_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0023', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: 'El Palace Barcelona_Metasearch_RevTracking_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 7, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0024', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Millennium Queenstown_Display_Remarketing_EN', advertiserName: 'Millennium Hotel Queenstown', advertiserBid: 'BP-33012', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0025', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Wellington_Display_Prospecting_FR', advertiserName: 'Copthorne Hotel Wellington Oriental Bay', advertiserBid: 'BP-33015', tactic: 'Display', subType: 'Prospecting', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 14, grey: 3, red: 3 }, isFollowed: true },
  { id: 'cm-0026', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Mulia Resort_Paid Search_NonBrand_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
  { id: 'cm-0027', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'El Palace Barcelona_Social_Prospecting_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Social', subType: 'Prospecting', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 20, grey: 0, red: 0 }, isFollowed: false },

  // ---- Real backend advertisers (BPIDs from the live Advertisers list) so the per-advertiser
  // ---- Campaigns tab is populated for a few advertisers; others correctly show "No data".
  // 11 Howard New York a Member of Design Hotels (BP-9074305)
  { id: 'cm-h001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Paid Search_Brand_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 8, grey: 1, red: 0 }, isFollowed: false },
  { id: 'cm-h002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Social_Prospecting_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-h003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_Display_Remarketing_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-h004', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_Metasearch_RevTracking_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'red', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },

  // 1 Hotel Brooklyn Bridge (BP-9113259)
  { id: 'cm-b001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '1 Hotel Brooklyn Bridge_Paid Search_Brand_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 12, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-b002', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '1 Hotel Brooklyn Bridge_Display_Prospecting_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 6, grey: 1, red: 1 }, isFollowed: false },
  { id: 'cm-b003', platform: 'WIHP', reportingPlatform: '—', campaignName: '1 Hotel Brooklyn Bridge_Metasearch_Meta_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },

  // 25 hours Hotel Dubai One Central (BP-9104332)
  { id: 'cm-d001', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '25h Dubai One Central_Social_Retargeting_EN', advertiserName: '25 hours Hotel Dubai One Central', advertiserBid: 'BP-9104332', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 15, grey: 2, red: 1 }, isFollowed: false },
  { id: 'cm-d002', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '25h Dubai One Central_Paid Search_NonBrand_EN', advertiserName: '25 hours Hotel Dubai One Central', advertiserBid: 'BP-9104332', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'red', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  // ---- Bulk demo campaigns for 11 Howard (BP-9074305): 6–10 per platform to exercise
  // ---- the per-advertiser Campaigns tab filtering + pagination. ----
  { id: 'cm-hh001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh002', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh003', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
  { id: 'cm-hh004', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh005', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh006', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh007', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'grey', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh008', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh009', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh010', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh011', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
  { id: 'cm-hh012', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh013', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'red', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh014', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh015', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh016', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh017', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh018', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
  { id: 'cm-hh019', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh020', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh021', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh022', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh023', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh024', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh025', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh026', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
  { id: 'cm-hh027', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh028', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh029', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh030', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_9', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 13, grey: 2, red: 0 }, isFollowed: false },
  { id: 'cm-hh031', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh032', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'red', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh033', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
  { id: 'cm-hh034', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh035', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh036', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh037', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 11, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh038', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh039', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_9', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 13, grey: 2, red: 0 }, isFollowed: false },
  { id: 'cm-hh040', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_10', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh041', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh042', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh043', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
  { id: 'cm-hh044', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh045', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh046', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh047', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh048', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh049', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh050', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh051', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'red', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh052', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh053', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh054', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh055', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh056', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh057', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh058', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh059', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh060', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  { id: 'cm-hh061', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
  // ---- The Londoner Hotel (BP-910077): Paid Search (SA360), Display (Amadeus DSP), Video (DV360), Metasearch ----
  // Bing Ads copies of the Google Ads search campaigns: same targeting, so the same names
  // (settings: components/CampaignFlow/londonerCampaignSettings.ts).
  ln(1, 'paidSearch', 'Brand', 'FR', 'live', 'green', [9, 1, 0], {
    reportingPlatform: 'Bing Ads',
    fixedName: maxCampaignName({ platformId: 'google-ads', tactic: 'Brand' }),
  }),
  ln(2, 'paidSearch', 'Generic', 'FR', 'live', 'green', [7, 0, 0], {
    reportingPlatform: 'Bing Ads',
    fixedName: maxCampaignName({ platformId: 'google-ads', tactic: 'Generic' }),
  }),
  ln(3, 'paidSearch', 'Generic', 'EN', 'live', 'green', [5, 2, 0]),
  ln(4, 'paidSearch', 'Remarketing', 'EN', 'pause', 'green', null),
  ln(5, 'paidSearch', 'Brand', 'EN', 'live', 'green', null),
  ln(6, 'paidSearch', 'Non-Brand', 'DE', 'scheduled', 'grey', null),
  ln(7, 'paidSearch', 'Brand', 'DE', 'live', 'green', [4, 0, 1]),
  ln(8, 'paidSearch', 'Non-Brand', 'FR', 'unknown', 'green', null),
  ln(9, 'display', 'Prospecting', 'FR', 'live', 'green', [12, 2, 0]),
  ln(10, 'display', 'Remarketing', 'FR', 'live', 'green', [8, 1, 1]),
  ln(11, 'display', 'Always-on', 'EN', 'live', 'green', null),
  ln(12, 'display', 'Remarketing', 'EN', 'scheduled', 'green', null),
  ln(13, 'video', 'Prospecting', 'EN', 'live', 'green', [6, 0, 0]),
  ln(14, 'video', 'Remarketing', 'EN', 'pause', 'red', null),
  ln(15, 'video', 'Prospecting', 'FR', 'unknown', 'green', null),
  ln(16, 'metasearch', 'Revenue Tracking', 'EN', 'live', 'green', null, { reportingPlatform: 'Google Hotel Ads' }),
  ln(17, 'metasearch', 'Revenue Tracking', 'EN', 'live', 'green', null, { reportingPlatform: 'Tripadvisor' }),
  ln(18, 'metasearch', 'Metasearch', 'EN', 'live', 'green', null, { platform: 'WIHP', reportingPlatform: '—' }),
]

const baseMappedCampaigns = legacyMappedCampaigns.map(reattribute)

// ---- Generated demo rows for the 19 demo advertisers (deterministic; ids 'cm-<key>-NNN') ----------
// Same builder idea as ln() above, generalized to a DemoAdvertiser. Channel slots are ordered so a
// smaller budget simply keeps the first N (EN-first) slots.
interface CmSlot {
  subType: string
  lang: 'EN' | 'L2' | 'L3'
  platform?: string
  reportingPlatform?: string
}
const CM_SLOTS: Record<DemoChannelKey, CmSlot[]> = {
  paidSearch: [
    { subType: 'Brand', lang: 'EN' }, { subType: 'Non-Brand', lang: 'EN' }, { subType: 'Generic', lang: 'EN' },
    { subType: 'Remarketing', lang: 'EN' }, { subType: 'Brand', lang: 'L2' }, { subType: 'Non-Brand', lang: 'L2' },
    { subType: 'Brand', lang: 'L3' },
  ],
  display: [
    { subType: 'Prospecting', lang: 'EN' }, { subType: 'Remarketing', lang: 'EN' }, { subType: 'Always-on', lang: 'EN' },
    { subType: 'Prospecting', lang: 'L2' }, { subType: 'Remarketing', lang: 'L2' },
  ],
  video: [{ subType: 'Prospecting', lang: 'EN' }, { subType: 'Remarketing', lang: 'EN' }, { subType: 'Prospecting', lang: 'L2' }],
  metasearch: [
    { subType: 'Revenue Tracking', lang: 'EN', reportingPlatform: 'Google Hotel Ads' },
    { subType: 'Revenue Tracking', lang: 'EN', reportingPlatform: 'Tripadvisor' },
    { subType: 'Metasearch', lang: 'EN', platform: 'WIHP', reportingPlatform: '—' },
  ],
}
// Platforms (mapping family) that already count as covering a channel in the hand-written rows.
const CM_COVERING_PLATFORMS: Record<DemoChannelKey, string[]> = {
  paidSearch: ['SA360'],
  display: ['Amadeus DSP', 'CM360'],
  video: ['DV360'],
  metasearch: ['DerbySoft', 'WIHP'],
}
// Languages of the two non-English campaign sets per advertiser (default FR, DE).
const EXTRA_LANGS: Record<string, [string, string]> = {
  derby: ['ES', 'FR'],
  crownparadise: ['ES', 'FR'],
  sensira: ['ES', 'FR'],
  mhrna: ['ES', 'FR'],
  cwresorts: ['ES', 'FR'],
  mhreurope: ['DE', 'FR'],
  seacontainers: ['FR', 'DE'],
}

const generateMappedFor = (adv: DemoAdvertiser, advIndex: number, existing: MappedCampaign[]): MappedCampaign[] => {
  const big = adv.totalBudget >= 400000
  const mid = adv.totalBudget >= 250000
  const take: Record<DemoChannelKey, number> = {
    paidSearch: 3 + (mid ? 1 : 0) + (big ? 1 : 0),
    display: 2 + (mid ? 1 : 0) + (big ? 1 : 0),
    video: 2 + (big ? 1 : 0),
    metasearch: 3,
  }
  const langs = EXTRA_LANGS[adv.key] ?? ['FR', 'DE']
  const statusCycle: CampaignStatus[] =
    adv.obaStatus === 'Live'
      ? ['live', 'live', 'live', 'pause', 'live', 'live', 'scheduled', 'live']
      : ['scheduled', 'live', 'scheduled', 'unknown', 'live', 'scheduled', 'pause', 'unknown']
  const rows: MappedCampaign[] = []
  let n = 0
  activeChannels(adv).forEach(ch => {
    const covered = existing.filter(c => c.advertiserBid === adv.bpid && CM_COVERING_PLATFORMS[ch].includes(c.platform)).length
    if (covered >= 2) return
    const info = DEMO_CHANNEL_INFO[ch]
    CM_SLOTS[ch].slice(0, take[ch]).forEach(slot => {
      const i = n
      n += 1
      const lang = slot.lang === 'EN' ? 'EN' : slot.lang === 'L2' ? langs[0] : langs[1]
      const mappingStatus: MappingStatus = (i * 3 + advIndex) % 11 === 5 ? 'grey' : (i * 5 + advIndex) % 13 === 9 ? 'red' : 'green'
      const meta = ch === 'metasearch'
      const withOffers = !meta && (i + advIndex) % 3 !== 2
      const offerCounts = withOffers
        ? { green: 4 + ((i * 7 + advIndex * 3) % 14), grey: (i + advIndex) % 3, red: (i + advIndex) % 5 === 4 ? 1 : 0 }
        : { green: 0, grey: 0, red: 0 }
      const tactic = info.tactic
      rows.push({
        id: `cm-${adv.key}-${String(i + 1).padStart(3, '0')}`,
        platform: slot.platform ?? info.mappingPlatform,
        reportingPlatform: slot.reportingPlatform ?? info.reportingPlatform,
        campaignName: '', // set for every row by conventionNamesFor() at the bottom of this file
        advertiserName: adv.name,
        advertiserBid: adv.bpid,
        tactic,
        subType: slot.subType,
        language: lang,
        mappingStatus,
        campaignStatus: statusCycle[(i + advIndex) % statusCycle.length],
        offersMapping: withOffers ? 'mapped' : 'unmapped',
        offerCounts,
        isFollowed: adv.followedByDefault,
      })
    })
  })
  return rows
}

// Every campaign is named Channel_Tactic_OriginMarket_DestinationMarket_Language (shared/campaignNaming.ts),
// derived from the row's own tactic, sub-type and language. The `campaignName` written in the hand-authored
// rows above is only a legacy label and is replaced here. Names already used in Campaign Setup are avoided, so
// the combined All Campaigns list never shows one name on two rows, except for rows with a `fixedName`
// (The Londoner's Bing Ads campaigns share the names of the Google Ads campaigns they mirror).
const allMappedCampaigns: MappedCampaign[] = [
  ...baseMappedCampaigns,
  ...DEMO_ADVERTISERS.flatMap((adv, i) => generateMappedFor(adv, i, baseMappedCampaigns)),
]
const namedByConvention = allMappedCampaigns.filter(c => !c.fixedName)
const conventionNames = conventionNamesFor(
  namedByConvention,
  unmappedCampaigns
    .filter(c => c.advertiserBid && c.externalCampaignName !== '-')
    .map(c => ({ advertiserBid: c.advertiserBid, name: c.externalCampaignName })),
)

// The Londoner's rows come first, so every list and filter option derived from them starts with it.
export const mappedCampaigns: MappedCampaign[] = londonerFirst(
  allMappedCampaigns.map(c => ({ ...c, campaignName: c.fixedName ?? conventionNames[namedByConvention.indexOf(c)] })),
  campaign => campaign.advertiserBid === LONDONER.bpid,
)

export const platformOptions = Array.from(new Set(mappedCampaigns.map(c => c.platform))).map(p => ({ label: platformLabel(p), value: p }))

export const reportingPlatformOptions = Array.from(new Set(mappedCampaigns.map(c => c.reportingPlatform)))
  .filter(rp => rp !== '—')
  .map(rp => ({ label: rp, value: rp }))

export const advertiserOptions = Array.from(
  new Map(mappedCampaigns.map(c => [c.advertiserBid, { label: `${c.advertiserName} (${c.advertiserBid})`, value: c.advertiserBid }])).values(),
)

export const tacticOptions = Array.from(new Set(mappedCampaigns.map(c => c.tactic))).map(t => ({ label: t, value: t }))

export const languageOptions = Array.from(new Set(mappedCampaigns.map(c => c.language))).map(l => ({ label: l, value: l }))

export const subTypeOptions = Array.from(new Set(mappedCampaigns.map(c => c.subType))).map(st => ({ label: st, value: st }))

export const campaignStatusOptions = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Live', value: 'live' },
  { label: 'Pause', value: 'pause' },
  { label: 'Complete', value: 'complete' },
  { label: 'Unknown', value: 'unknown' },
]

export const statusOptions = [
  { label: 'Pending', value: 'grey' },
  { label: 'Confirmed', value: 'green' },
  { label: 'Needs attention', value: 'red' },
]

// --- Adapter for the combined "All Campaigns" view -------------------------------------------------
// Render a MAPPED campaign in the Unmapped-Campaigns table shape: a fully mapped campaign has all
// four per-type mapping columns = 'mapped'. Offers follow the campaign's offersMapping. The internal
// campaign name is surfaced as the external campaign name so the row is identifiable in that table.
import type { UnmappedCampaign } from './unmappedCampaigns'

// Deterministic sample VALUES for the optional Custom 1/2/3 columns (All Campaigns view).
// These are the campaign's own values entered under the advertiser's labels — NOT the labels.
// e.g. the advertiser's Custom 1 label might be "Market" and a campaign's Custom 1 value is "US".
const CUSTOM1_SAMPLES = ['US', 'UK', 'DACH', 'APAC', 'Nordics', '']
const CUSTOM2_SAMPLES = ['Awareness', 'Conversion', '0-30 days', 'Flagship', 'Retargeting', '']
const CUSTOM3_SAMPLES = ['FY26', 'FY25', 'Leisure', 'Corporate', 'Promo', '']

export function mappedAsUnmappedRows(): UnmappedCampaign[] {
  return mappedCampaigns.map((c, i): UnmappedCampaign => ({
    id: `mapped-${c.id}`,
    platform: c.platform,
    advertiserName: c.advertiserName,
    advertiserBid: c.advertiserBid,
    externalAdvertiserName: c.advertiserName,
    externalAdvertiserId: c.advertiserBid,
    externalCampaignName: c.campaignName,
    externalCampaignId: c.id,
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: c.offersMapping,
    isFollowed: c.isFollowed,
    expandable: false,
    // Optional detail columns (varied combinations so the column customizer has data to show).
    tactic: c.tactic,
    subType: c.subType,
    language: c.language,
    reportingPlatform: c.reportingPlatform,
    custom1: c.custom1 ?? CUSTOM1_SAMPLES[i % CUSTOM1_SAMPLES.length],
    custom2: c.custom2 ?? CUSTOM2_SAMPLES[i % CUSTOM2_SAMPLES.length],
    custom3: c.custom3 ?? CUSTOM3_SAMPLES[i % CUSTOM3_SAMPLES.length],
    opportunityId: `OPP-${100000 + (i * 37) % 900000}`,
    // Ship_To is usually the mapped advertiser.
    shipTo: c.advertiserName,
    // Only live/pause/unknown exist in the real data; normalize anything else to 'unknown'.
    campaignStatus: c.campaignStatus === 'live' ? 'live' : c.campaignStatus === 'pause' ? 'pause' : 'unknown',
  }))
}
