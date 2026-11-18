/**
 * Demo advertisers (besides The Londoner Hotel) with a full mock data set.
 *
 * Same idea as londonerHotel.ts but data-driven: each entry is a compact config and every module
 * (Advertisers list injection, Campaign Setup, OBA, Media Planner, Audience, platform connections)
 * derives its rows from it so the story stays consistent per advertiser:
 *   Advertiser -> Platforms -> Media Plan -> OBA -> Campaign Setup -> Audience
 *
 * The 19 advertisers are the customer list the demo uses everywhere (home dashboard included). The Advertisers
 * mock link injects any that the backend does not already return (matched by BPID), so there are never
 * duplicates. Everything is keyed by BPID wherever possible, because a backend-owned advertiser keeps its real
 * advertiserId.
 *
 * Prototype only. Money is whole units of the advertiser's own currency.
 */
import { LONDONER } from './londonerHotel'

export type DemoChannelKey = 'paidSearch' | 'display' | 'video' | 'metasearch'

export const DEMO_CHANNEL_ORDER: DemoChannelKey[] = ['paidSearch', 'display', 'video', 'metasearch']

/** Static facts shared by every advertiser for each channel (platform names / keys). */
export const DEMO_CHANNEL_INFO: Record<
  DemoChannelKey,
  {
    label: string
    /** Advertiser Details / Audience platform name. */
    platform: string
    /** Campaign Setup mapping-family platform key. */
    mappingPlatform: string
    /** DWI reporting platform shown in Campaign Setup. */
    reportingPlatform: string
    tactic: string
    /** Counts toward the OBA plan (metasearch is billed outside OBA). */
    inOba: boolean
  }
> = {
  paidSearch: { label: 'Paid Search - Google', platform: 'Google ADS', mappingPlatform: 'SA360', reportingPlatform: 'Google Ads', tactic: 'Paid Search', inOba: true },
  display: { label: 'Display - Amadeus DSP', platform: 'Amadeus DSP', mappingPlatform: 'Amadeus DSP', reportingPlatform: 'Amadeus DSP', tactic: 'Display', inOba: true },
  video: { label: 'Video - DV360', platform: 'Google DV360', mappingPlatform: 'DV360', reportingPlatform: 'DV360', tactic: 'Video', inOba: true },
  metasearch: { label: 'Metasearch', platform: 'Derbysoft', mappingPlatform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', tactic: 'Metasearch', inOba: false },
}

export interface DemoPlatformAdvertiser {
  id: string
  platform: string
  advertiserName: string
  advertiserId: string
  connected: boolean
}

export interface DemoAdvertiser {
  /** Short stable key, e.g. 'howard'. */
  key: string
  /** Synthetic backend-style id used only when the backend does not return this advertiser. */
  advertiserId: number
  bpid: string
  name: string
  market: string
  /** Destination market (ISO country of the hotel) and the origin markets its campaigns target (campaign names). */
  destination: string
  origins: string[]
  currency: string
  /** Total media plan / contract budget. */
  totalBudget: number
  /** Whether the demo user follows it by default (drives every "My ..." scope; persisted). */
  followedByDefault: boolean
  /** Plan period (ISO). */
  startDate: string
  endDate: string
  /** Current-date relative status of the OBA plan: Live plans get spend history. */
  obaStatus: 'Live' | 'Scheduled'
  /** Channel budget shares (sum to 1); a 0 share means the advertiser doesn't run that channel. */
  shares: Record<DemoChannelKey, number>
  /** Per-channel budgets (derived from totalBudget x shares, rounded to 1,000, summing exactly). */
  budgets: Record<DemoChannelKey, number>
  /** OBA plan budget = sum of the OBA channels (everything except metasearch). */
  obaBudget: number
  /** Platform advertiser connections (Advertiser Details > Platforms, Audience chips). */
  platformAdvertisers: DemoPlatformAdvertiser[]
  /** External (platform-side) advertiser ids used by Campaign Setup rows, per mapping platform key. */
  externalAdvertisers: Record<string, { id: string; name: string }>
  /** Advertiser-level reporting labels for Campaign Setup (Custom 1/2/3). */
  reporting: { custom1: string; custom2: string; custom3: string }
  /** Salesforce-style references for the Media Planner. */
  bid: string
  opportunityId: string
  proposalId: string
  /** Names that must read identically across modules. */
  mediaPlanName: string
  obaPlanName: string
  campaignPrefix: string
}

interface Seed {
  key: string
  advertiserId: number
  bpid: string
  name: string
  /** Short name used in campaign / plan names. */
  short: string
  market: string
  destination: string
  origins: string[]
  currency: string
  totalBudget: number
  followedByDefault: boolean
  startDate: string
  endDate: string
  obaStatus: 'Live' | 'Scheduled'
  shares: [number, number, number, number]
  reporting: { custom1: string; custom2: string; custom3: string }
}

const SEEDS: Seed[] = [
  { key: 'mhreurope', advertiserId: 920001, bpid: 'BP-720101', name: 'Millennium Hotels and Resorts Europe', short: 'Millennium Europe', market: 'Europe', destination: 'GB', origins: ['DE', 'FR', 'US'], currency: 'GBP', totalBudget: 640000, followedByDefault: true, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.4, 0.25, 0.2, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } },
  { key: 'crown', advertiserId: 920002, bpid: 'BP-720102', name: 'Crown Limited', short: 'Crown Limited', market: 'Melbourne', destination: 'AU', origins: ['NZ', 'SG', 'GB'], currency: 'AUD', totalBudget: 720000, followedByDefault: true, startDate: '2026-10-01', endDate: '2027-09-30', obaStatus: 'Live', shares: [0.3, 0.3, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Booking Window', custom3: '' } },
  { key: 'soi', advertiserId: 920003, bpid: 'BP-720103', name: 'S O I Acquisition', short: 'SOI Acquisition', market: 'Miami', destination: 'US', origins: ['CA', 'GB', 'IE'], currency: 'USD', totalBudget: 280000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.5, 0.3, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'mhrna', advertiserId: 920004, bpid: 'BP-720104', name: 'Millennium Hotels and Resorts North America', short: 'Millennium North America', market: 'North America', destination: 'US', origins: ['CA', 'GB', 'DE'], currency: 'USD', totalBudget: 480000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.35, 0.25, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'cwresorts', advertiserId: 920005, bpid: 'BP-720105', name: 'Colonial Williamsburg Resorts', short: 'Colonial Williamsburg Resorts', market: 'Williamsburg', destination: 'US', origins: ['US', 'CA'], currency: 'USD', totalBudget: 420000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.4, 0.2, 0.2, 0.2], reporting: { custom1: 'Region', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'grove', advertiserId: 920006, bpid: 'BP-720106', name: 'The Grove Resort Orlando', short: 'The Grove Resort Orlando', market: 'Orlando', destination: 'US', origins: ['US', 'CA', 'GB'], currency: 'USD', totalBudget: 380000, followedByDefault: false, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.5, 0.3, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'cwfoundation', advertiserId: 920007, bpid: 'BP-720107', name: 'The Colonial Williamsburg Foundation', short: 'Colonial Williamsburg Foundation', market: 'Williamsburg', destination: 'US', origins: ['US', 'CA'], currency: 'USD', totalBudget: 300000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.4, 0.3, 0.15, 0.15], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'mhrasia', advertiserId: 920008, bpid: 'BP-720108', name: 'Millennium Hotels and Resorts Asia', short: 'Millennium Asia', market: 'Asia', destination: 'SG', origins: ['AU', 'GB', 'IN'], currency: 'SGD', totalBudget: 520000, followedByDefault: true, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.35, 0.3, 0.2, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } },
  { key: 'star', advertiserId: 920009, bpid: 'BP-720109', name: 'The Star Entertainment Group', short: 'The Star Entertainment', market: 'Sydney', destination: 'AU', origins: ['NZ', 'SG', 'US'], currency: 'AUD', totalBudget: 560000, followedByDefault: false, startDate: '2026-10-01', endDate: '2027-09-30', obaStatus: 'Live', shares: [0.3, 0.3, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Booking Window', custom3: '' } },
  { key: 'derby', advertiserId: 920010, bpid: 'BP-720110', name: 'Derby Hoteles', short: 'Derby Hoteles', market: 'Barcelona', destination: 'ES', origins: ['GB', 'FR', 'ES'], currency: 'EUR', totalBudget: 400000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.45, 0.2, 0.15, 0.2], reporting: { custom1: 'Market', custom2: '', custom3: '' } },
  { key: 'thwaites', advertiserId: 920011, bpid: 'BP-720111', name: 'Thwaites', short: 'Thwaites', market: 'Blackburn', destination: 'GB', origins: ['GB', 'IE'], currency: 'GBP', totalBudget: 260000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.5, 0.3, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'southseas', advertiserId: 920012, bpid: 'BP-720112', name: 'South Seas', short: 'South Seas', market: 'Captiva Island', destination: 'US', origins: ['US', 'CA', 'DE'], currency: 'USD', totalBudget: 350000, followedByDefault: false, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.4, 0.25, 0.2, 0.15], reporting: { custom1: 'Region', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'crownparadise', advertiserId: 920013, bpid: 'BP-720113', name: 'Crown Paradise Club Cancun', short: 'Crown Paradise Cancun', market: 'Cancun', destination: 'MX', origins: ['US', 'CA', 'ES'], currency: 'USD', totalBudget: 450000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.35, 0.3, 0.2, 0.15], reporting: { custom1: 'Region', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } },
  { key: 'sensira', advertiserId: 920014, bpid: 'BP-720114', name: 'Sensira Resort And Spa Riviera Maya', short: 'Sensira Riviera Maya', market: 'Riviera Maya', destination: 'MX', origins: ['US', 'CA'], currency: 'USD', totalBudget: 330000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.45, 0.25, 0.15, 0.15], reporting: { custom1: 'Region', custom2: 'Property Cluster', custom3: '' } },
  { key: 'seacontainers', advertiserId: 920015, bpid: 'BP-720115', name: 'Sea Containers London', short: 'Sea Containers London', market: 'London', destination: 'GB', origins: ['FR', 'DE', 'US'], currency: 'GBP', totalBudget: 410000, followedByDefault: true, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.4, 0.25, 0.2, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'mhrmea', advertiserId: 920016, bpid: 'BP-720116', name: 'Millennium Hotels and Resorts Middle East and Africa', short: 'Millennium MEA', market: 'Dubai', destination: 'AE', origins: ['GB', 'DE', 'IN'], currency: 'USD', totalBudget: 390000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.3, 0.3, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Booking Window', custom3: 'Fiscal Year' } },
  { key: 'langham', advertiserId: 920017, bpid: 'BP-720117', name: 'Langham Hospitality Group', short: 'Langham Hospitality', market: 'Hong Kong', destination: 'HK', origins: ['AU', 'GB', 'SG'], currency: 'HKD', totalBudget: 2800000, followedByDefault: true, startDate: '2026-10-01', endDate: '2027-09-30', obaStatus: 'Live', shares: [0.35, 0.25, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'ark', advertiserId: 920018, bpid: 'BP-720118', name: 'ARK Canary Wharf', short: 'ARK Canary Wharf', market: 'Canary Wharf', destination: 'GB', origins: ['GB', 'IE'], currency: 'GBP', totalBudget: 220000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.55, 0.25, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'ascott', advertiserId: 920019, bpid: 'BP-720119', name: 'Ascott International Management', short: 'Ascott International', market: 'Singapore', destination: 'SG', origins: ['AU', 'GB', 'FR'], currency: 'SGD', totalBudget: 600000, followedByDefault: true, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.35, 0.3, 0.2, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } },
]

/** Split `total` by `shares` into 1,000-rounded budgets that sum EXACTLY to total (remainder to the biggest). */
const splitBudget = (total: number, shares: number[]): number[] => {
  const raw = shares.map(s => Math.round((total * s) / 1000) * 1000)
  const diff = total - raw.reduce((a, b) => a + b, 0)
  const biggest = shares.indexOf(Math.max(...shares))
  raw[biggest] += diff
  return raw
}

const build = (seed: Seed): DemoAdvertiser => {
  const [ps, dsp, vid, meta] = splitBudget(seed.totalBudget, seed.shares)
  const budgets: Record<DemoChannelKey, number> = { paidSearch: ps, display: dsp, video: vid, metasearch: meta }
  const n = seed.advertiserId
  const platformAdvertisers: DemoPlatformAdvertiser[] = [
    { id: `${seed.key}-platform-ads`, platform: 'Google ADS', advertiserName: `${seed.short} Google ADS`, advertiserId: `ADS-${n}`, connected: true },
    { id: `${seed.key}-platform-dsp`, platform: 'Amadeus DSP', advertiserName: `${seed.short} Amadeus DSP`, advertiserId: `DSP-${n}`, connected: true },
    ...(budgets.video > 0
      ? [{ id: `${seed.key}-platform-dv360`, platform: 'Google DV360', advertiserName: `${seed.short} Google DV360`, advertiserId: `DV-${n}`, connected: true }]
      : []),
    { id: `${seed.key}-platform-derbysoft`, platform: 'Derbysoft', advertiserName: `${seed.short} Derbysoft`, advertiserId: `DS-${n}`, connected: true },
    { id: `${seed.key}-platform-whip`, platform: 'WHIP', advertiserName: `${seed.short} WHIP`, advertiserId: `WHIP-${n}`, connected: true },
  ]
  // External advertiser name = the hotel (plus its market when the short name doesn't already say
  // it); no platform suffix, the Platform column already shows that.
  const extName = seed.short.toLowerCase().includes(seed.market.toLowerCase()) ? seed.short : `${seed.short} ${seed.market}`
  const ext = (offset: number) => ({ id: String(8200000 + n * 10 + offset), name: extName })
  return {
    key: seed.key,
    advertiserId: seed.advertiserId,
    bpid: seed.bpid,
    name: seed.name,
    market: seed.market,
    destination: seed.destination,
    origins: seed.origins,
    currency: seed.currency,
    totalBudget: seed.totalBudget,
    followedByDefault: seed.followedByDefault,
    startDate: seed.startDate,
    endDate: seed.endDate,
    obaStatus: seed.obaStatus,
    shares: { paidSearch: seed.shares[0], display: seed.shares[1], video: seed.shares[2], metasearch: seed.shares[3] },
    budgets,
    obaBudget: ps + dsp + vid,
    platformAdvertisers,
    externalAdvertisers: {
      SA360: ext(1),
      'Amadeus DSP': ext(2),
      DV360: ext(3),
      DerbySoft: ext(4),
      WIHP: ext(5),
      CM360: ext(6),
      Meta: ext(7),
    },
    reporting: seed.reporting,
    bid: String(n),
    opportunityId: `OPP-${n}`,
    proposalId: `PROP-${n}`,
    mediaPlanName: `${seed.name} — ${seed.startDate.slice(0, 4)}`,
    obaPlanName: `${seed.short} OBA ${seed.startDate.slice(0, 4)}`,
    campaignPrefix: seed.short,
  }
}

/** The 19 demo advertisers, in display order (The Londoner Hotel is separate and always first). */
export const DEMO_ADVERTISERS: DemoAdvertiser[] = SEEDS.map(build)

/** Channels an advertiser actually runs (non-zero share), in display order. */
export const activeChannels = (advertiser: DemoAdvertiser): DemoChannelKey[] =>
  DEMO_CHANNEL_ORDER.filter(channel => advertiser.budgets[channel] > 0)

const norm = (value: string | number | undefined | null) => String(value ?? '').trim().toLowerCase()

export const getDemoAdvertiserByBpid = (bpid: string | undefined | null): DemoAdvertiser | undefined =>
  DEMO_ADVERTISERS.find(a => norm(a.bpid) === norm(bpid))

/**
 * The hand-authored Campaign Setup / Campaigns rows were written for an earlier set of demo advertisers, which
 * they still identify by these BPIDs. Each one now stands for one of the current advertisers (by key).
 */
const LEGACY_ADVERTISER_KEYS: Record<string, string> = {
  'BP-64517': 'crownparadise',
  'BP-64518': 'sensira',
  'BP-2850': 'derby',
  'BP-51546': 'star',
  'BP-9074305': 'mhrna',
  'BP-9113259': 'grove',
  'BP-9104332': 'mhrmea',
  'BP-33011': 'mhrasia',
  'BP-33012': 'crown',
  'BP-33015': 'ascott',
  'BP-33016': 'langham',
  'BP-99021': 'southseas',
  'BP-99022': 'cwfoundation',
  'BP-99023': 'cwresorts',
  'BP-78630': 'thwaites',
}

/** The current demo advertiser for a BPID, resolving the BPIDs of the earlier advertisers (see above). */
export const currentDemoAdvertiser = (bpid: string | undefined | null): DemoAdvertiser | undefined => {
  const key = LEGACY_ADVERTISER_KEYS[bpid ?? '']
  return key ? DEMO_ADVERTISERS.find(a => a.key === key) : getDemoAdvertiserByBpid(bpid)
}

export const getDemoAdvertiserById = (id: string | number | undefined | null): DemoAdvertiser | undefined =>
  DEMO_ADVERTISERS.find(a => String(a.advertiserId) === String(id ?? ''))

/** Matches a free-text advertiser value: name, 'Name (BPID)', BPID, or synthetic id. */
export const findDemoAdvertiser = (value: string | number | undefined | null): DemoAdvertiser | undefined => {
  const v = norm(value)
  if (!v) return undefined
  return DEMO_ADVERTISERS.find(
    a => v === norm(a.name) || v.startsWith(`${norm(a.name)} (`) || v === norm(a.bpid) || v === String(a.advertiserId),
  )
}

/** Londoner or one of the 19 demo advertisers. */
export const isAnyDemoAdvertiser = (value: string | number | undefined | null): boolean =>
  !!findDemoAdvertiser(value) ||
  norm(value) === norm(LONDONER.bpid) ||
  norm(value) === norm(LONDONER.name) ||
  norm(value).startsWith(`${norm(LONDONER.name)} (`) ||
  norm(value) === String(LONDONER.advertiserId)
