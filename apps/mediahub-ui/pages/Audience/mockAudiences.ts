import { LONDONER, LONDONER_PLATFORM_ADVERTISERS } from '../../shared/londonerHotel'
import { DEMO_ADVERTISERS, type DemoAdvertiser } from '../../shared/demoAdvertisers'

export interface MockAudience {
  id: string
  advertiser: string
  audienceName: string
  dataType: string
  fileId?: string
  channels: string
  audienceSize: number
  lastUpload: string
  nextUpload: string
  platformAdvertisers: MockPlatformAdvertiser[]
  audienceRuleIds: string[]
}

export interface MockPlatformAdvertiser {
  id: string
  platform: string
  advertiserName: string
  advertiserId: string
  connected: boolean
}

export const DATA_TYPE_OPTIONS = [
  { label: 'Amadeus audience', value: 'DATAPARTNER' },
  { label: 'First party data', value: 'FILE' },
  { label: 'Amadeus tracking', value: 'ADVERTISER' },
]

export const MOCK_PLATFORM_ADVERTISERS: MockPlatformAdvertiser[] = [
  { id: 'platform-001', platform: 'CM360', advertiserName: 'Hotel Alpha CM360', advertiserId: '1111', connected: true },
  { id: 'platform-002', platform: 'SA360', advertiserName: 'Hotel Alpha SA360', advertiserId: '2222', connected: true },
  { id: 'platform-003', platform: 'Meta (Facebook)', advertiserName: 'Hotel Alpha Facebook', advertiserId: '3333', connected: false },
]

const BASE_MOCK_AUDIENCES: MockAudience[] = [
  { id: 'aud-001', advertiser: 'Hotel Alpha', audienceName: 'High-value hotel bookers', dataType: 'ADVERTISER', channels: 'Google Ads, Meta', audienceSize: 125000, lastUpload: '18 Sep 2026', nextUpload: '25 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS, audienceRuleIds: ['rule-001'] },
  { id: 'aud-002', advertiser: 'Grand Aurora', audienceName: 'Weekend leisure travelers', dataType: 'DATAPARTNER', channels: 'DV360', audienceSize: 84500, lastUpload: '17 Sep 2026', nextUpload: '24 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS.slice(1), audienceRuleIds: ['rule-002'] },
  { id: 'aud-003', advertiser: 'Harborlight Resort', audienceName: 'Luxury repeat guests', dataType: 'FILE', channels: 'CM360, Meta', audienceSize: 39200, lastUpload: '15 Sep 2026', nextUpload: '22 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS.slice(0, 1), audienceRuleIds: ['rule-004'] },
]

/**
 * The Londoner Hotel audiences. Only audience-enabled platforms are used (Google ADS, Amadeus DSP,
 * Google DV360); metasearch has no audience targeting. Platform records are cloned per audience and
 * `channels` is derived from them so the two never drift apart.
 */
const londonerPlatforms = (...platforms: string[]): MockPlatformAdvertiser[] =>
  LONDONER_PLATFORM_ADVERTISERS.filter(p => platforms.includes(p.platform)).map(p => ({ ...p }))

const londonerAudience = (
  audience: Omit<MockAudience, 'advertiser' | 'channels' | 'platformAdvertisers'>,
  platforms: string[],
): MockAudience => {
  const platformAdvertisers = londonerPlatforms(...platforms)
  return {
    ...audience,
    advertiser: LONDONER.name,
    channels: platformAdvertisers.map(p => p.platform).join(', '),
    platformAdvertisers,
  }
}

const LONDONER_AUDIENCES: MockAudience[] = [
  londonerAudience(
    { id: 'aud-ln001', audienceName: 'Londoner website visitors 30d', dataType: 'ADVERTISER', audienceSize: 310000, lastUpload: '09 Nov 2026', nextUpload: '16 Nov 2026', audienceRuleIds: ['rule-009'] },
    ['Google ADS', 'Amadeus DSP', 'Google DV360'],
  ),
  londonerAudience(
    { id: 'aud-ln002', audienceName: 'Londoner abandoned bookings', dataType: 'ADVERTISER', audienceSize: 4200, lastUpload: '12 Nov 2026', nextUpload: '19 Nov 2026', audienceRuleIds: ['rule-012'] },
    ['Google ADS', 'Amadeus DSP'],
  ),
  londonerAudience(
    { id: 'aud-ln003', audienceName: 'London weekend breakers', dataType: 'DATAPARTNER', audienceSize: 86000, lastUpload: '05 Nov 2026', nextUpload: '12 Nov 2026', audienceRuleIds: ['rule-009', 'rule-013'] },
    ['Google ADS', 'Google DV360'],
  ),
  londonerAudience(
    { id: 'aud-ln004', audienceName: 'US long-haul luxury travellers', dataType: 'DATAPARTNER', audienceSize: 52000, lastUpload: '29 Oct 2026', nextUpload: '05 Nov 2026', audienceRuleIds: ['rule-011'] },
    ['Amadeus DSP', 'Google DV360'],
  ),
  londonerAudience(
    { id: 'aud-ln005', audienceName: 'Business travellers - Central London', dataType: 'DATAPARTNER', audienceSize: 38500, lastUpload: '22 Oct 2026', nextUpload: '29 Oct 2026', audienceRuleIds: ['rule-010'] },
    ['Amadeus DSP'],
  ),
  londonerAudience(
    { id: 'aud-ln006', audienceName: 'Londoner loyalty members', dataType: 'FILE', fileId: 'londoner-loyalty-members', audienceSize: 12800, lastUpload: '14 Oct 2026', nextUpload: '21 Oct 2026', audienceRuleIds: [] },
    ['Google ADS', 'Amadeus DSP'],
  ),
  londonerAudience(
    { id: 'aud-ln007', audienceName: 'Londoner past guests (CRM)', dataType: 'FILE', fileId: 'londoner-past-guests-crm', audienceSize: 24600, lastUpload: '15 Oct 2026', nextUpload: '22 Oct 2026', audienceRuleIds: [] },
    ['Google ADS', 'Google DV360'],
  ),
]

/**
 * Demo advertiser audiences (the 10 in shared/demoAdvertisers.ts), generated deterministically.
 * Each advertiser gets 4-6 audiences (4 + index % 3) from the templates below, covering all three
 * data types. Only audience-enabled platforms are used (Google ADS, Amadeus DSP, Google DV360 when
 * the advertiser has video); `channels` is derived from the cloned platform records so the two never
 * drift apart. Rule usage (see mockAudienceRules.ts rule-014..019): T1->014, T2->016, T4->015,
 * T5->017, T6->018+019.
 */
interface DemoAudienceTemplate {
  name: (adv: DemoAdvertiser) => string
  dataType: 'ADVERTISER' | 'DATAPARTNER' | 'FILE'
  platforms: string[]
  ruleIds: string[]
  /** Base size for a ~300k-budget advertiser; scaled by the advertiser's budget. */
  baseSize: number
  fileSuffix?: string
}

const DEMO_AUDIENCE_TEMPLATES: DemoAudienceTemplate[] = [
  { name: adv => `${adv.campaignPrefix} website visitors 30d`, dataType: 'ADVERTISER', platforms: ['Google ADS', 'Amadeus DSP', 'Google DV360'], ruleIds: ['rule-014'], baseSize: 240000 },
  { name: adv => `${adv.market} weekend breakers`, dataType: 'DATAPARTNER', platforms: ['Google ADS', 'Google DV360'], ruleIds: ['rule-016'], baseSize: 78000 },
  { name: adv => `${adv.campaignPrefix} loyalty members`, dataType: 'FILE', platforms: ['Google ADS', 'Amadeus DSP'], ruleIds: [], baseSize: 14500, fileSuffix: 'loyalty-members' },
  { name: adv => `Long-haul visitors to ${adv.market}`, dataType: 'DATAPARTNER', platforms: ['Amadeus DSP', 'Google DV360'], ruleIds: ['rule-015'], baseSize: 46000 },
  { name: adv => `Business & conference travellers - ${adv.market}`, dataType: 'DATAPARTNER', platforms: ['Amadeus DSP'], ruleIds: ['rule-017'], baseSize: 31000 },
  { name: adv => `${adv.campaignPrefix} family holiday planners`, dataType: 'DATAPARTNER', platforms: ['Google ADS', 'Amadeus DSP'], ruleIds: ['rule-018', 'rule-019'], baseSize: 22500 },
]

const AUDIENCE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** Date -> 'DD Mon YYYY' (the audience table's display format). */
const formatUploadDate = (date: Date): string =>
  `${String(date.getUTCDate()).padStart(2, '0')} ${AUDIENCE_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`

const buildDemoAdvertiserAudiences = (adv: DemoAdvertiser, advIndex: number): MockAudience[] => {
  const count = 4 + (advIndex % 3)
  return DEMO_AUDIENCE_TEMPLATES.slice(0, count).map((template, templateIndex) => {
    const platformAdvertisers = adv.platformAdvertisers
      .filter(p => template.platforms.includes(p.platform))
      .map(p => ({ ...p }))
    // lastUpload falls in Oct-Nov 2026 (month alternates), nextUpload is a week later.
    const lastUpload = new Date(Date.UTC(2026, 9 + ((advIndex + templateIndex) % 2), 1 + ((advIndex * 5 + templateIndex * 3) % 28)))
    const nextUpload = new Date(lastUpload.getTime() + 7 * 24 * 60 * 60 * 1000)
    const sizeScale = adv.totalBudget / 300000
    const variation = 0.85 + ((advIndex * 3 + templateIndex * 7) % 10) * 0.03
    return {
      id: `aud-${adv.key}-${String(templateIndex + 1).padStart(2, '0')}`,
      advertiser: adv.name,
      audienceName: template.name(adv),
      dataType: template.dataType,
      ...(template.fileSuffix ? { fileId: `${adv.key}-${template.fileSuffix}` } : {}),
      channels: platformAdvertisers.map(p => p.platform).join(', '),
      audienceSize: Math.round((template.baseSize * sizeScale * variation) / 100) * 100,
      lastUpload: formatUploadDate(lastUpload),
      nextUpload: formatUploadDate(nextUpload),
      platformAdvertisers,
      audienceRuleIds: [...template.ruleIds],
    }
  })
}

const DEMO_ADVERTISER_AUDIENCES: MockAudience[] = DEMO_ADVERTISERS.flatMap(buildDemoAdvertiserAudiences)

export const MOCK_AUDIENCES: MockAudience[] = [...BASE_MOCK_AUDIENCES, ...LONDONER_AUDIENCES, ...DEMO_ADVERTISER_AUDIENCES]

export const DATA_TYPE_LABEL: Record<string, string> = Object.fromEntries(DATA_TYPE_OPTIONS.map(option => [option.value, option.label]))
