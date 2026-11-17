/**
 * Demo advertisers (besides The Londoner Hotel) with a full mock data set.
 *
 * Same idea as londonerHotel.ts but data-driven: each entry is a compact config and every module
 * (Advertisers list injection, Campaign Setup, OBA, Media Planner, Audience, platform connections)
 * derives its rows from it so the story stays consistent per advertiser:
 *   Advertiser -> Platforms -> Media Plan -> OBA -> Campaign Setup -> Audience
 *
 * The 10 advertisers are ones the repo already names with BPIDs: 3 exist in the live Advertisers
 * list (11 Howard, 1 Hotel Brooklyn Bridge, 25 hours Dubai) and 7 come from the Campaign Setup
 * mocks. The Advertisers mock link injects any that the backend does not already return (matched
 * by BPID), so there are never duplicates. Everything is keyed by BPID wherever possible, because a
 * backend-owned advertiser keeps its real advertiserId.
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
  { key: 'howard', advertiserId: 920001, bpid: 'BP-9074305', name: '11 Howard New York a Member of Design Hotels', short: '11 Howard NY', market: 'New York', currency: 'USD', totalBudget: 360000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.35, 0.25, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'brooklyn', advertiserId: 920002, bpid: 'BP-9113259', name: '1 Hotel Brooklyn Bridge', short: '1 Hotel Brooklyn Bridge', market: 'New York', currency: 'USD', totalBudget: 420000, followedByDefault: false, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.4, 0.2, 0.2, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'dubai', advertiserId: 920003, bpid: 'BP-9104332', name: '25 hours Hotel Dubai One Central', short: '25h Dubai One Central', market: 'Dubai', currency: 'USD', totalBudget: 300000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.3, 0.3, 0.25, 0.15], reporting: { custom1: 'Market', custom2: 'Booking Window', custom3: 'Fiscal Year' } },
  { key: 'mulia', advertiserId: 920004, bpid: 'BP-64517', name: 'Mulia Resort', short: 'Mulia Resort', market: 'Bali', currency: 'USD', totalBudget: 540000, followedByDefault: true, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.35, 0.3, 0.2, 0.15], reporting: { custom1: 'Region', custom2: 'Campaign Objective', custom3: 'Fiscal Year' } },
  { key: 'elpalace', advertiserId: 920005, bpid: 'BP-2850', name: 'El Palace Barcelona', short: 'El Palace Barcelona', market: 'Barcelona', currency: 'EUR', totalBudget: 380000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.45, 0.2, 0.15, 0.2], reporting: { custom1: 'Market', custom2: '', custom3: '' } },
  { key: 'trumplv', advertiserId: 920006, bpid: 'BP-51546', name: 'Trump International Hotel Las Vegas', short: 'Trump Intl LV', market: 'Las Vegas', currency: 'USD', totalBudget: 600000, followedByDefault: true, startDate: '2026-10-01', endDate: '2027-09-30', obaStatus: 'Live', shares: [0.3, 0.25, 0.3, 0.15], reporting: { custom1: 'Market', custom2: 'Booking Window', custom3: '' } },
  { key: 'copthorneakl', advertiserId: 920007, bpid: 'BP-33011', name: 'Copthorne Hotel Auckland HarbourCity', short: 'Copthorne Auckland', market: 'Auckland', currency: 'NZD', totalBudget: 260000, followedByDefault: true, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.5, 0.3, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'millqt', advertiserId: 920008, bpid: 'BP-33012', name: 'Millennium Hotel Queenstown', short: 'Millennium Queenstown', market: 'Queenstown', currency: 'NZD', totalBudget: 240000, followedByDefault: false, startDate: '2026-07-01', endDate: '2027-06-30', obaStatus: 'Live', shares: [0.4, 0.3, 0.15, 0.15], reporting: { custom1: 'Region', custom2: 'Campaign Objective', custom3: '' } },
  { key: 'copthornewlg', advertiserId: 920009, bpid: 'BP-33015', name: 'Copthorne Hotel Wellington Oriental Bay', short: 'Copthorne Wellington', market: 'Wellington', currency: 'NZD', totalBudget: 180000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.55, 0.25, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
  { key: 'millrot', advertiserId: 920010, bpid: 'BP-33016', name: 'Millennium Hotel Rotorua', short: 'Millennium Rotorua', market: 'Rotorua', currency: 'NZD', totalBudget: 150000, followedByDefault: false, startDate: '2027-01-01', endDate: '2027-12-31', obaStatus: 'Scheduled', shares: [0.6, 0.2, 0, 0.2], reporting: { custom1: 'Region', custom2: '', custom3: '' } },
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

/** The 10 demo advertisers, in display order (The Londoner Hotel is separate and always first). */
export const DEMO_ADVERTISERS: DemoAdvertiser[] = SEEDS.map(build)

/** Channels an advertiser actually runs (non-zero share), in display order. */
export const activeChannels = (advertiser: DemoAdvertiser): DemoChannelKey[] =>
  DEMO_CHANNEL_ORDER.filter(channel => advertiser.budgets[channel] > 0)

const norm = (value: string | number | undefined | null) => String(value ?? '').trim().toLowerCase()

export const getDemoAdvertiserByBpid = (bpid: string | undefined | null): DemoAdvertiser | undefined =>
  DEMO_ADVERTISERS.find(a => norm(a.bpid) === norm(bpid))

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

/** Londoner or one of the 10 demo advertisers. */
export const isAnyDemoAdvertiser = (value: string | number | undefined | null): boolean =>
  !!findDemoAdvertiser(value) ||
  norm(value) === norm(LONDONER.bpid) ||
  norm(value) === norm(LONDONER.name) ||
  norm(value).startsWith(`${norm(LONDONER.name)} (`) ||
  norm(value) === String(LONDONER.advertiserId)
