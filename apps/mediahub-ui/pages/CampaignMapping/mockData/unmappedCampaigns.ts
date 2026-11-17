// Mock data for the Campaign Mapping prototype — Unmapped Campaigns list.
// Modelled to match the Figma "Unmapped Campaigns" frame: one Platform value per row,
// and four per-type mapping-status columns rendered as status icons (check / x-circle):
//   Advertiser Mapping, Campaign Mapping, Invoice Mapping, Offers Mapping.
// KPI columns (Impressions / Clicks / Cost) are intentionally omitted for this prototype.
//
// Source CSV reference (structure): Date, Source, Platform, Vendor_account_name,
// Vendor_account_id, Entity_name, Entity_id, ... — the Platform column here is the
// external channel shown in the design (DV360, Google Ads, Facebook, Bing, DerbySoft, WIHP).
//
// This is a curated, hand-authored subset (not the full ~15k-row export).

import { LONDONER, LONDONER_EXTERNAL_ADVERTISERS as LN_EXT } from '../../../shared/londonerHotel'
import { isLondonerFollowed, isDemoFollowed } from '../../../shared/londonerFollowStore'
import { maxCampaignName, type MaxCampaignRef } from '../../../components/CampaignFlow/londonerMaxCampaigns'
import { DEMO_ADVERTISERS, activeChannels, getDemoAdvertiserByBpid } from '../../../shared/demoAdvertisers'
import type { DemoAdvertiser } from '../../../shared/demoAdvertisers'

export type MappingState = 'mapped' | 'unmapped'

export interface UnmappedCampaign {
  /** Set on the campaigns created by 'Create campaigns with Max' (The Londoner Hotel): drives the campaign summary drawer. */
  maxCampaign?: MaxCampaignRef
  /** Stable row id (prototype only). */
  id: string
  /** External platform / channel shown in the Platform column. */
  platform: string
  /** Mapped ATAP advertiser name + BPID (the "Advertiser (BPID)" column). */
  advertiserName: string
  advertiserBid: string
  /** External advertiser name + id. */
  externalAdvertiserName: string
  externalAdvertiserId: string
  /** External campaign / placement name + id ('-' when none). */
  externalCampaignName: string
  externalCampaignId: string
  /** Per-type mapping status (each rendered as a status icon). */
  advertiserMapping: MappingState
  campaignMapping: MappingState
  invoiceMapping: MappingState
  offersMapping: MappingState
  /** OBA (Omnichannel Budget Allocation) mapping status — green mapped / red unmapped.
   *  Optional in the literals; use obaMappingOf() to resolve a deterministic value when unset. */
  obaMapping?: MappingState
  /**
   * Facebook (Meta) two-level hierarchy ONLY: a Campaign-level parent row carries its Ad Set
   * children here (antd tree data). Advertiser/Campaign/Offers/Invoice roll up from children
   * (AND: parent mapped only if ALL children mapped); OBA is mapped at the parent (campaign) level
   * and N/A for children. Other platforms are flat (no children).
   */
  children?: UnmappedCampaign[]
  /** Row level within the Facebook hierarchy. Absent for flat (non-Facebook) rows. */
  rowLevel?: 'campaign' | 'adset'
  /** Prototype: user 'ignored' this unmapped-advertiser campaign (row greyed, mapping disabled). */
  ignored?: boolean
  /** Platform run status (only Live/Pause/Unknown exist in the real data). Absent -> Unknown. */
  campaignStatus?: 'live' | 'pause' | 'unknown'
  /** Whether this row is "followed" (used for the My Campaigns scope). */
  isFollowed: boolean
  /** Whether the row can be expanded (offers / child rows) — matches the chevron in Figma. */
  expandable: boolean
  /**
   * When the external platform advertiser is mapped to MANY ATAP advertisers (many:many), the
   * candidate BPIDs. length > 1 => the table shows 'Multiple Advertisers' and the campaign
   * mapping drawer forces the user to pick ONE of these before mapping the campaign.
   */
  candidateBpids?: string[]
  /**
   * When editing an ALREADY-mapped campaign, the saved dimension values to prefill the mapping
   * drawer (so Tactic/Sub-Type/Language/Custom are not shown empty). Absent for a genuinely
   * unmapped campaign, which opens blank with Save disabled.
   */
  prefill?: {
    tactic?: string
    subType?: string
    language?: string
    custom1?: string
    custom2?: string
    custom3?: string
  }
  /**
   * Optional "detail" columns surfaced by the All Campaigns column customizer. Present on mapped
   * rows; blank/undefined on genuinely unmapped rows (they have no dimensions yet).
   */
  tactic?: string
  subType?: string
  language?: string
  custom1?: string
  custom2?: string
  custom3?: string
  reportingPlatform?: string
  opportunityId?: string
  shipTo?: string
}

// BPIDs the current user "follows". Mapping an advertiser to one of these makes the row
// show in BOTH My Campaigns and All Campaigns; any other mapped advertiser shows in All only.
export const FOLLOWED_BPIDS = new Set<string>(['BP-64517', 'BP-64518', 'BP-2850', 'BP-51546'])

export function isFollowedBpid(bpid: string | undefined): boolean {
  // The Londoner follow state is user-controlled (Advertisers page) and persisted, not static.
  if (bpid === LONDONER.bpid) return isLondonerFollowed()
  // Demo advertisers follow the persisted state (overrides the static set below).
  if (bpid && getDemoAdvertiserByBpid(bpid)) return isDemoFollowed(bpid)
  return !!bpid && FOLLOWED_BPIDS.has(bpid)
}

/** Row-level "followed" for the My scopes: the Londoner follows the live follow state, any other row
 *  keeps its static flag. */
export function rowIsFollowed(c: { advertiserBid: string; isFollowed: boolean }): boolean {
  if (c.advertiserBid === LONDONER.bpid) return isLondonerFollowed()
  if (getDemoAdvertiserByBpid(c.advertiserBid)) return isDemoFollowed(c.advertiserBid)
  return c.isFollowed
}

/** True when the external advertiser maps to more than one ATAP advertiser (many:many). */
export function isMultipleAdvertisers(c: UnmappedCampaign): boolean {
  return !!c.candidateBpids && c.candidateBpids.length > 1
}

/** Resolve a row's OBA mapping status. Uses the explicit value when set; otherwise derives a
 *  deterministic mapped/unmapped from the row id so the prototype shows varied data. */
export function obaMappingOf(c: UnmappedCampaign): MappingState {
  if (c.obaMapping) return c.obaMapping
  // Deterministic hash of the id -> ~55% mapped / 45% unmapped spread.
  let h = 0
  for (let i = 0; i < c.id.length; i++) h = (h * 31 + c.id.charCodeAt(i)) >>> 0
  return h % 100 < 55 ? 'mapped' : 'unmapped'
}

/** Resolve a row's campaign (platform run) status. Only live/pause/unknown exist; default unknown. */
export function campaignStatusOf(c: UnmappedCampaign): 'live' | 'pause' | 'unknown' {
  return c.campaignStatus ?? 'unknown'
}

/** True when a row is a Facebook campaign-level parent with Ad Set children. */
export function hasAdSetChildren(c: UnmappedCampaign): boolean {
  return !!c.children && c.children.length > 0
}

/** Roll up a mapping dimension from a parent's Ad Set children: 'mapped' only if ALL children are
 *  mapped; 'unmapped' if ANY child is unmapped. Used for Advertiser/Campaign/Offers/Invoice on
 *  Facebook campaign parents. */
export function rollupMapping(
  parent: UnmappedCampaign,
  key: 'advertiserMapping' | 'campaignMapping' | 'offersMapping' | 'invoiceMapping',
): MappingState {
  const kids = parent.children ?? []
  if (kids.length === 0) return parent[key]
  return kids.every(k => k[key] === 'mapped') ? 'mapped' : 'unmapped'
}

const baseUnmappedCampaigns: UnmappedCampaign[] = [
  // --- Facebook (Meta) two-level hierarchy: Campaign parent + Ad Set children. ---
  // Campaign/Advertiser/Offers/Invoice roll up from the Ad Sets; OBA is at the campaign (parent).
  {
    id: 'um-fb-100',
    platform: 'Meta',
    advertiserName: 'Mulia Resort',
    advertiserBid: 'BP-64517',
    externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
    externalAdvertiserId: '786300985049481',
    externalCampaignName: 'FB Social Prospecting Q2',
    externalCampaignId: 'FB-CMP-5501',
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: 'mapped',
    obaMapping: 'mapped',
    isFollowed: true,
    expandable: true,
    rowLevel: 'campaign',
    children: [
      {
        id: 'um-fb-100-a1', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
        externalCampaignName: 'AdSet · Lookalike 1%', externalCampaignId: 'FB-AS-8801',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-100-a2', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
        externalCampaignName: 'AdSet · Interest Travel', externalCampaignId: 'FB-AS-8802',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-100-a3', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
        externalCampaignName: 'AdSet · Retargeting 30d', externalCampaignId: 'FB-AS-8803',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-100-a4', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
        externalCampaignName: 'AdSet · Broad AU', externalCampaignId: 'FB-AS-8804',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
    ],
  },
  {
    id: 'um-fb-200',
    platform: 'Meta',
    advertiserName: 'El Palace Barcelona',
    advertiserBid: 'BP-2850',
    externalAdvertiserName: 'El Palace Barcelona',
    externalAdvertiserId: '178390022',
    externalCampaignName: 'FB Awareness ES',
    externalCampaignId: 'FB-CMP-5502',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    obaMapping: 'unmapped',
    isFollowed: true,
    expandable: true,
    rowLevel: 'campaign',
    children: [
      {
        id: 'um-fb-200-a1', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
        externalCampaignName: 'AdSet · Broad ES', externalCampaignId: 'FB-AS-8901',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-200-a2', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
        externalCampaignName: 'AdSet · Retargeting ES', externalCampaignId: 'FB-AS-8902',
        advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'unmapped', offersMapping: 'unmapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-200-a3', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
        externalCampaignName: 'AdSet · Lookalike ES', externalCampaignId: 'FB-AS-8903',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'unmapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-200-a4', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
        externalCampaignName: 'AdSet · Interest Luxury', externalCampaignId: 'FB-AS-8904',
        advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'unmapped', offersMapping: 'unmapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-200-a5', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
        externalCampaignName: 'AdSet · Broad FR', externalCampaignId: 'FB-AS-8905',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
    ],
  },
  {
    id: 'um-fb-300',
    platform: 'Meta',
    advertiserName: 'Trump International Hotel Las Vegas',
    advertiserBid: 'BP-51546',
    externalAdvertiserName: 'Trump International Hotel Las Vegas',
    externalAdvertiserId: '51546',
    externalCampaignName: 'FB Conversions US',
    externalCampaignId: 'FB-CMP-5503',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'mapped',
    offersMapping: 'unmapped',
    obaMapping: 'mapped',
    isFollowed: true,
    expandable: true,
    rowLevel: 'campaign',
    children: [
      {
        id: 'um-fb-300-a1', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
        externalCampaignName: 'AdSet · Purchase Lookalike', externalCampaignId: 'FB-AS-9001',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-300-a2', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
        externalCampaignName: 'AdSet · Cart Abandoners', externalCampaignId: 'FB-AS-9002',
        advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'mapped', offersMapping: 'unmapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-300-a3', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
        externalCampaignName: 'AdSet · Interest Luxury Travel', externalCampaignId: 'FB-AS-9003',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
      {
        id: 'um-fb-300-a4', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
        externalCampaignName: 'AdSet · Broad US', externalCampaignId: 'FB-AS-9004',
        advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
        isFollowed: true, expandable: false, rowLevel: 'adset',
      },
    ],
  },
  {
    id: 'um-0201',
    platform: 'CM360',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'Hyatt Regency (shared account)',
    externalAdvertiserId: '550101',
    externalCampaignName: 'Display Prospecting',
    externalCampaignId: 'DV-90001',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
    candidateBpids: ['BP-64517', 'BP-2850', 'BP-99021'],
  },
  {
    id: 'um-0001',
    platform: 'CM360',
    advertiserName: 'Mulia Resort',
    advertiserBid: 'BP-64517',
    externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
    externalAdvertiserId: '442241',
    externalCampaignName: 'Display Prospecting Q2',
    externalCampaignId: 'DV-88021',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-0002',
    platform: 'SA360',
    advertiserName: 'Mulia Resort',
    advertiserBid: 'BP-64517',
    externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
    externalAdvertiserId: '442241',
    externalCampaignName: 'Brand - Exact',
    externalCampaignId: 'GA-33110',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-0003',
    platform: 'Meta',
    advertiserName: 'El Palace Barcelona',
    advertiserBid: 'BP-2850',
    externalAdvertiserName: 'El Palace Barcelona',
    externalAdvertiserId: '178390022',
    externalCampaignName: 'Retargeting - Spring',
    externalCampaignId: 'FB-55012',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: true,
  },
  {
    id: 'um-0004',
    platform: 'WIHP',
    advertiserName: 'El Palace Barcelona',
    advertiserBid: 'BP-2850',
    externalAdvertiserName: 'El Palace Barcelona',
    externalAdvertiserId: 'wihp-5521',
    externalCampaignName: '-',
    externalCampaignId: '-',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-0005',
    platform: 'DerbySoft',
    advertiserName: 'Trump International Hotel Las Vegas',
    advertiserBid: 'BP-51546',
    externalAdvertiserName: 'Trump Intl Hotel Las Vegas',
    externalAdvertiserId: '51546',
    externalCampaignName: 'Tripadvisor Meta',
    externalCampaignId: 'DS-77190',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-0006',
    platform: 'Meta',
    advertiserName: 'Copthorne Hotel Auckland HarbourCity',
    advertiserBid: 'BP-33011',
    externalAdvertiserName: 'Copthorne Hotel Auckland HarbourCity',
    externalAdvertiserId: '178322115',
    externalCampaignName: 'Business Listings',
    externalCampaignId: 'FB-55088',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: true,
  },
  {
    id: 'um-0007',
    platform: 'SA360',
    advertiserName: 'Millennium Hotel Queenstown',
    advertiserBid: 'BP-33012',
    externalAdvertiserName: 'Millennium Hotel Queenstown',
    externalAdvertiserId: '178322116',
    externalCampaignName: 'Non-Brand - Generic',
    externalCampaignId: 'GA-33220',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0008',
    platform: 'SA360',
    advertiserName: 'Copthorne Hotel Wellington Oriental Bay',
    advertiserBid: 'BP-33015',
    externalAdvertiserName: 'Copthorne Hotel Wellington Oriental Bay',
    externalAdvertiserId: 'sa-900113',
    externalCampaignName: 'Non-Brand - Luxury',
    externalCampaignId: 'BN-41002',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0009',
    platform: 'WIHP',
    advertiserName: 'Oregon Garden Resort',
    advertiserBid: 'BP-78630',
    externalAdvertiserName: 'Oregon Garden Resort',
    externalAdvertiserId: 'wihp-5522',
    externalCampaignName: '-',
    externalCampaignId: '-',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0010',
    platform: 'CM360',
    advertiserName: 'Mulia Villa - Nusa Dua, Bali',
    advertiserBid: 'BP-64518',
    externalAdvertiserName: 'Mulia Villa - Nusa Dua, Bali',
    externalAdvertiserId: '442242',
    externalCampaignName: 'Display Remarketing',
    externalCampaignId: 'DV-88110',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-0011',
    platform: 'DerbySoft',
    advertiserName: 'Millennium Hotel Rotorua',
    advertiserBid: 'BP-33016',
    externalAdvertiserName: 'Millennium Hotel Rotorua',
    externalAdvertiserId: '442350',
    externalCampaignName: 'Tripadvisor Meta',
    externalCampaignId: 'DS-77220',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0012',
    platform: 'SA360',
    advertiserName: 'Trump International Hotel Las Vegas',
    advertiserBid: 'BP-51546',
    externalAdvertiserName: 'Trump Intl Hotel Las Vegas',
    externalAdvertiserId: 'sa-900301',
    externalCampaignName: 'Brand - Exact',
    externalCampaignId: 'GA-33330',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: true,
  },

  // ---- Step-1-done, campaign mapping pending, for a real backend advertiser (11 Howard,
  // ---- BP-9074305). advertiserMapping = 'mapped' so these surface on that advertiser's
  // ---- Campaigns tab as still-to-map rows (external advertiser already mapped to this BPID).
  {
    id: 'um-h001',
    platform: 'SA360',
    advertiserName: '11 Howard New York a Member of Design Hotels',
    advertiserBid: 'BP-9074305',
    externalAdvertiserName: '11 Howard NY (Design Hotels)',
    externalAdvertiserId: '774411',
    externalCampaignName: 'Brand - Exact',
    externalCampaignId: 'SA-11001',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-h002',
    platform: 'Meta',
    advertiserName: '11 Howard New York a Member of Design Hotels',
    advertiserBid: 'BP-9074305',
    externalAdvertiserName: '11 Howard NY (Design Hotels)',
    externalAdvertiserId: '774411',
    externalCampaignName: 'Prospecting - Summer',
    externalCampaignId: 'FB-11002',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: true,
    expandable: false,
  },

  // ---- Multiple-advertiser rows (external advertiser mapped to MANY ATAP advertisers) ----
  // Advertiser Mapping is GREEN (it IS mapped), but to several ATAP advertisers, so the table
  // shows 'Multiple Advertisers'. Campaign mapping requires picking one candidate first.
  {
    id: 'um-0202',
    platform: 'DerbySoft',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'Marriott Group (shared account)',
    externalAdvertiserId: '550102',
    externalCampaignName: 'Tripadvisor Meta',
    externalCampaignId: 'DS-90002',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
    candidateBpids: ['BP-51546', 'BP-99022'],
  },

  // ---- Unmapped-advertiser rows (Advertiser Mapping = unmapped) ----
  // No ATAP advertiser yet; these populate the "Unmapped Advertisers" scope. Mapping one
  // (Advertiser Mapping drawer) assigns an advertiser and moves the row into My/All.
  {
    id: 'um-0101',
    platform: 'SA360',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'Hilton Garden Inn Austin',
    externalAdvertiserId: '990221',
    externalCampaignName: 'Brand - Exact',
    externalCampaignId: 'SA-77010',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0102',
    platform: 'Meta',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'The Langham Chicago',
    externalAdvertiserId: '990222',
    externalCampaignName: 'Prospecting - Summer',
    externalCampaignId: 'FB-77011',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0103',
    platform: 'CM360',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'Fairmont Banff Springs',
    externalAdvertiserId: '990223',
    externalCampaignName: 'Display Remarketing',
    externalCampaignId: 'DV-77012',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },
  {
    id: 'um-0104',
    platform: 'CM360',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'Ace Hotel New York',
    externalAdvertiserId: '990224',
    externalCampaignName: 'Display Prospecting',
    externalCampaignId: 'CM-77013',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: false,
    expandable: false,
  },

  // ---- The Londoner Hotel (BP-910077) demo rows — ids/names from shared/londonerHotel.ts ----
  {
    id: 'um-ln001',
    platform: 'SA360',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['SA360'].name,
    externalAdvertiserId: LN_EXT['SA360'].id,
    maxCampaign: { platformId: 'google-ads', tactic: 'Brand' },
    externalCampaignName: maxCampaignName({ platformId: 'google-ads', tactic: 'Brand' }),
    externalCampaignId: 'GA-LN-1001',
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: 'mapped',
    obaMapping: 'mapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln002',
    platform: 'SA360',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['SA360'].name,
    externalAdvertiserId: LN_EXT['SA360'].id,
    maxCampaign: { platformId: 'google-ads', tactic: 'Generic' },
    externalCampaignName: maxCampaignName({ platformId: 'google-ads', tactic: 'Generic' }),
    externalCampaignId: 'GA-LN-1002',
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: 'mapped',
    obaMapping: 'mapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln003',
    platform: 'Amadeus DSP',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['Amadeus DSP'].name,
    externalAdvertiserId: LN_EXT['Amadeus DSP'].id,
    maxCampaign: { platformId: 'amadeus-dsp', tactic: 'Prospecting' },
    externalCampaignName: maxCampaignName({ platformId: 'amadeus-dsp', tactic: 'Prospecting' }),
    externalCampaignId: 'DSP-LN-2001',
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: 'mapped',
    obaMapping: 'mapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln004',
    platform: 'Amadeus DSP',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['Amadeus DSP'].name,
    externalAdvertiserId: LN_EXT['Amadeus DSP'].id,
    maxCampaign: { platformId: 'amadeus-dsp', tactic: 'Remarketing' },
    externalCampaignName: maxCampaignName({ platformId: 'amadeus-dsp', tactic: 'Remarketing' }),
    externalCampaignId: 'DSP-LN-2002',
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'mapped',
    offersMapping: 'mapped',
    obaMapping: 'mapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln005',
    platform: 'DV360',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['DV360'].name,
    externalAdvertiserId: LN_EXT['DV360'].id,
    externalCampaignName: 'YouTube Video - Afternoon Tea',
    externalCampaignId: 'DV-LN-3001',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    obaMapping: 'mapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln006',
    platform: 'DV360',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['DV360'].name,
    externalAdvertiserId: LN_EXT['DV360'].id,
    externalCampaignName: 'YouTube Skippable In-Stream - Brand',
    externalCampaignId: 'DV-LN-3002',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'mapped',
    offersMapping: 'unmapped',
    obaMapping: 'mapped',
    campaignStatus: 'unknown',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln007',
    platform: 'DerbySoft',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['DerbySoft'].name,
    externalAdvertiserId: LN_EXT['DerbySoft'].id,
    externalCampaignName: 'Tripadvisor Meta - London Stays',
    externalCampaignId: 'DS-LN-4001',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    obaMapping: 'unmapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln008',
    platform: 'WIHP',
    advertiserName: LONDONER.name,
    advertiserBid: LONDONER.bpid,
    externalAdvertiserName: LN_EXT['WIHP'].name,
    externalAdvertiserId: LN_EXT['WIHP'].id,
    externalCampaignName: 'WIHP Meta - Trivago',
    externalCampaignId: 'WIHP-LN-5001',
    advertiserMapping: 'mapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    obaMapping: 'unmapped',
    campaignStatus: 'pause',
    isFollowed: true,
    expandable: false,
  },
  {
    id: 'um-ln009',
    platform: 'SA360',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: `${LN_EXT.SA360.name} - Legacy`,
    externalAdvertiserId: '8100781',
    externalCampaignName: 'Brand - Legacy Exact',
    externalCampaignId: 'GA-LN-1901',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
  },
  // Multiple advertisers: the Amadeus DSP seat is shared across several ATAP advertisers.
  {
    id: 'um-ln010',
    platform: 'Amadeus DSP',
    advertiserName: '',
    advertiserBid: '',
    externalAdvertiserName: 'London Hotels Group (shared DSP seat)',
    externalAdvertiserId: '8100792',
    externalCampaignName: 'Display Always-on - London',
    externalCampaignId: 'DSP-LN-2901',
    advertiserMapping: 'unmapped',
    campaignMapping: 'unmapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    campaignStatus: 'live',
    isFollowed: true,
    expandable: false,
    candidateBpids: [LONDONER.bpid, 'BP-99021'],
  },
]

// ---- Generated demo rows for the 10 demo advertisers (deterministic; ids 'um-<key>-NNN') ----------
type UmSlot = { platform: string; name: string; id: string }
const umSlotsFor = (adv: DemoAdvertiser): UmSlot[] => {
  const channels = activeChannels(adv)
  const slots: UmSlot[] = [
    { platform: 'SA360', name: 'Brand - Exact', id: 'GA' },
    { platform: 'Amadeus DSP', name: 'Display Prospecting', id: 'DSP' },
    ...(channels.includes('video') ? [{ platform: 'DV360', name: 'YouTube Video - Brand', id: 'DV' }] : []),
    { platform: 'DerbySoft', name: 'Tripadvisor Meta', id: 'DS' },
    { platform: 'SA360', name: 'PMax - Suites & Spa', id: 'GA' },
    { platform: 'Amadeus DSP', name: 'Display Remarketing', id: 'DSP' },
    { platform: 'WIHP', name: 'WIHP Meta - Trivago', id: 'WIHP' },
  ]
  return slots
}

const generateUnmappedFor = (adv: DemoAdvertiser, advIndex: number, existing: UnmappedCampaign[]): UnmappedCampaign[] => {
  const covered = (platform: string) => existing.filter(c => c.advertiserBid === adv.bpid && c.platform === platform).length >= 2
  const want = adv.totalBudget >= 400000 ? 5 : 4
  const slots = umSlotsFor(adv).filter(s => !covered(s.platform)).slice(0, want)
  const statuses: NonNullable<UnmappedCampaign['campaignStatus']>[] =
    adv.obaStatus === 'Live' ? ['live', 'live', 'pause', 'live', 'unknown'] : ['live', 'unknown', 'pause', 'live', 'unknown']
  const pick = (i: number): MappingState => ((i + advIndex) % 3 === 0 ? 'mapped' : 'unmapped')
  return slots.map((slot, i) => {
    const ext = adv.externalAdvertisers[slot.platform]
    const meta = slot.platform === 'WIHP' || slot.platform === 'DerbySoft' // metasearch: not in OBA
    return {
      id: `um-${adv.key}-${String(i + 1).padStart(3, '0')}`,
      platform: slot.platform,
      advertiserName: adv.name,
      advertiserBid: adv.bpid,
      externalAdvertiserName: ext.name,
      externalAdvertiserId: ext.id,
      externalCampaignName: slot.name,
      externalCampaignId: `${slot.id}-${adv.key.toUpperCase()}-${1001 + i}`,
      advertiserMapping: 'mapped',
      campaignMapping: 'unmapped',
      invoiceMapping: pick(i + 1),
      offersMapping: 'unmapped',
      obaMapping: meta ? 'unmapped' : pick(i),
      campaignStatus: statuses[(i + advIndex) % statuses.length],
      isFollowed: adv.followedByDefault,
      expandable: false,
    }
  })
}

export const unmappedCampaigns: UnmappedCampaign[] = [
  ...baseUnmappedCampaigns,
  ...DEMO_ADVERTISERS.flatMap((adv, i) => generateUnmappedFor(adv, i, baseUnmappedCampaigns)),
]

/** User-facing display label for a platform value. The stored/internal value stays as-is (used as
 *  a logic key, e.g. 'Meta'); only the label shown to users differs — e.g. Meta -> 'Meta (Facebook)'. */
export function platformLabel(platform: string | undefined): string {
  if (!platform) return ''
  if (platform === 'Meta') return 'Meta (Facebook)'
  return platform
}

/** Distinct platforms present in the mock data (for the Platform filter). */
export const platformOptions = Array.from(new Set(unmappedCampaigns.map(c => c.platform))).map(p => ({
  label: platformLabel(p),
  value: p,
}))

/** Distinct mapped advertiser BPIDs (for the Advertiser (BPID) filter) — blanks excluded. */
export const advertiserOptions = Array.from(
  new Map(
    unmappedCampaigns
      .filter(c => c.advertiserBid && c.advertiserName)
      .map(c => [c.advertiserBid, { label: `${c.advertiserName} (${c.advertiserBid})`, value: c.advertiserBid }]),
  ).values(),
)

/** Distinct external advertisers (for the External Advertiser Name (ID) filter). */
export const externalAdvertiserOptions = Array.from(
  new Map(
    unmappedCampaigns.map(c => [
      c.externalAdvertiserId,
      { label: `${c.externalAdvertiserName} (${c.externalAdvertiserId})`, value: c.externalAdvertiserId },
    ]),
  ).values(),
)

/** Distinct external campaigns (for the External Campaign Name (ID) filter). */
export const externalCampaignOptions = Array.from(
  new Map(
    unmappedCampaigns
      .filter(c => c.externalCampaignId !== '-')
      .map(c => [
        c.externalCampaignId,
        { label: `${c.externalCampaignName} (${c.externalCampaignId})`, value: c.externalCampaignId },
      ]),
  ).values(),
)

/** Mapping-state filter options (shared by the three/four mapping filters). */
export const mappingStateOptions = [
  { label: 'Mapped', value: 'mapped' },
  { label: 'Unmapped', value: 'unmapped' },
]

// ---- Mapping-drawer option lists (prototype stubs) ----

/**
 * Advertiser (BPID) catalog shown in the mapping drawer's Advertiser (BPID) select.
 * Deliberately includes both FOLLOWED (BP-64517/64518/2850/51546) and NON-followed BPIDs so the
 * "map an unmapped advertiser" flow can demonstrate: mapping to a followed advertiser -> row shows
 * in My + All; mapping to a non-followed advertiser -> row shows in All only.
 */
export const bpidSelectOptions: { label: string; value: string }[] = [
  { label: 'Mulia Resort (BP-64517)', value: 'BP-64517' },
  { label: 'Mulia Villa - Nusa Dua, Bali (BP-64518)', value: 'BP-64518' },
  { label: 'El Palace Barcelona (BP-2850)', value: 'BP-2850' },
  { label: 'Trump International Hotel Las Vegas (BP-51546)', value: 'BP-51546' },
  { label: 'Hilton Garden Inn Austin (BP-99021)', value: 'BP-99021' },
  { label: 'The Langham Chicago (BP-99022)', value: 'BP-99022' },
  { label: 'Fairmont Banff Springs (BP-99023)', value: 'BP-99023' },
  { label: LONDONER.label, value: LONDONER.bpid },
]

DEMO_ADVERTISERS.forEach(adv => {
  if (!bpidSelectOptions.some(o => o.value === adv.bpid)) bpidSelectOptions.push({ label: `${adv.name} (${adv.bpid})`, value: adv.bpid })
})

/** Lookup advertiser name by BPID from the drawer catalog. */
export function advertiserNameForBpid(bpid: string | undefined): string {
  if (!bpid) return ''
  const opt = bpidSelectOptions.find(o => o.value === bpid)
  if (!opt) return ''
  // label is "Name (BPID)" — strip the trailing " (BPID)".
  return opt.label.replace(/\s*\([^)]*\)\s*$/, '')
}

export const tacticOptions = [
  { label: 'Metasearch', value: 'metasearch' },
  { label: 'Paid Search', value: 'paid-search' },
  { label: 'Display', value: 'display' },
  { label: 'Video', value: 'video' },
  { label: 'Social', value: 'social' },
  { label: 'Retargeting', value: 'retargeting' },
]

/** DerbySoft Tactic options — backend-supplied (Req 6, revised): NOT hard-coded to one value. */
export const derbyTacticOptions = [
  { label: 'Revenue Tracking', value: 'Revenue Tracking' },
  { label: 'Metasearch', value: 'Metasearch' },
  { label: 'CPC', value: 'CPC' },
]

export const subTypeOptions = [
  { label: 'Brand', value: 'brand' },
  { label: 'Non-Brand', value: 'non-brand' },
  { label: 'Prospecting', value: 'prospecting' },
  { label: 'Remarketing', value: 'remarketing' },
  { label: 'Core', value: 'core' },
]

export const languageOptions = [
  { label: 'English (EN)', value: 'EN' },
  { label: 'French (FR)', value: 'FR' },
  { label: 'German (DE)', value: 'DE' },
  { label: 'Spanish (ES)', value: 'ES' },
  { label: 'Italian (IT)', value: 'IT' },
]

/** WIHP fake-campaign options (BID + Delivery Channel + Tactic); Tactic is embedded in the name. */
export const wihpFakeCampaignOptions = [
  { label: 'BP-2850 · Google · Metasearch', value: 'wihp-fc-1', tactic: 'Metasearch' },
  { label: 'BP-2850 · Trivago · Metasearch', value: 'wihp-fc-2', tactic: 'Metasearch' },
  { label: 'BP-2850 · Skyscanner · Revenue Tracking', value: 'wihp-fc-3', tactic: 'Revenue Tracking' },
]

/** DerbySoft campaign options (the mapping unit). */
export const derbyCampaignOptions = [
  { label: 'DerbySoft - Google Hotel Ads', value: 'ds-ghc' },
  { label: 'DerbySoft - Tripadvisor Meta', value: 'ds-ta' },
  { label: 'DerbySoft - Trivago Sponsored', value: 'ds-trv' },
]

/** WIHP campaign-name select options (prototype stub). */
export const wihpCampaignNameOptions = [
  { label: 'WIHP Meta - Google', value: 'wihp-meta-google' },
  { label: 'WIHP Meta - Trivago', value: 'wihp-meta-trivago' },
  { label: 'WIHP Meta - Skyscanner', value: 'wihp-meta-skyscanner' },
]

/**
 * DWI-derived Reporting Platform (read-only). Auto-populated from the selected platform; the real
 * system derives it from DWI. WIHP is out of scope for this field (Req 6.7) -> returns ''.
 */
export function reportingPlatformForPlatform(platform: string | undefined): string {
  switch (platform) {
    case 'SA360':
      return 'Google Ads'
    case 'Bing':
      return 'Bing Ads'
    case 'CM360':
      return 'DV360'
    case 'Meta':
      return 'Facebook'
    case 'DV360':
      return 'DV360'
    case 'Amadeus DSP':
      return 'Amadeus DSP'
    case 'Google Ads':
      return 'Google Ads'
    case 'DerbySoft':
      return 'Google Hotel Ads'
    case 'WIHP':
      return '' // omitted for WIHP
    default:
      return ''
  }
}

/** The per-platform mapping-unit name (what a "campaign" is called on each platform). */
export function mappingUnitName(platform: string | undefined): string {
  switch (platform) {
    case 'CM360':
      return 'Placement'
    case 'Meta':
    case 'Facebook':
      return 'AdSet'
    // SA360, DerbySoft, WIHP, DV360, Amadeus DSP, Google Ads, Bing -> Campaign
    default:
      return 'Campaign'
  }
}

/** External advertisers available to map under a chosen platform/BPID (prototype stub). */
export const externalAdvertiserSelectOptions = [
  { label: 'Mulia Resort Nusa Dua Bali (442241)', value: '442241' },
  { label: 'El Palace Barcelona (178390022)', value: '178390022' },
  { label: 'Trump Intl Hotel Las Vegas (51546)', value: '51546' },
  { label: 'Copthorne Hotel Auckland HarbourCity (178322115)', value: '178322115' },
  { label: 'Oregon Garden Resort (786300985049481)', value: '786300985049481' },
  { label: `${LN_EXT['SA360'].name} (${LN_EXT['SA360'].id})`, value: LN_EXT['SA360'].id },
  { label: `${LN_EXT['Amadeus DSP'].name} (${LN_EXT['Amadeus DSP'].id})`, value: LN_EXT['Amadeus DSP'].id },
  { label: `${LN_EXT['DV360'].name} (${LN_EXT['DV360'].id})`, value: LN_EXT['DV360'].id },
  { label: `${LN_EXT['DerbySoft'].name} (${LN_EXT['DerbySoft'].id})`, value: LN_EXT['DerbySoft'].id },
  { label: `${LN_EXT['WIHP'].name} (${LN_EXT['WIHP'].id})`, value: LN_EXT['WIHP'].id },
]

DEMO_ADVERTISERS.forEach(adv =>
  Object.values(adv.externalAdvertisers).forEach(ext => {
    if (!externalAdvertiserSelectOptions.some(o => o.value === ext.id)) {
      externalAdvertiserSelectOptions.push({ label: `${ext.name} (${ext.id})`, value: ext.id })
    }
  }),
)

/** DWI "available-to-map" campaign IDs (prototype stub). Picking one of these -> Green on save. */
export const availableToMapCampaignIds = [
  { label: 'CAMP-10021', value: 'CAMP-10021' },
  { label: 'CAMP-10022', value: 'CAMP-10022' },
  { label: 'CAMP-10023', value: 'CAMP-10023' },
  { label: 'CAMP-10024', value: 'CAMP-10024' },
]

/** Platforms WITHOUT offer mapping — the two metasearch platforms show a non-clickable grey X. */
export const OFFERS_UNSUPPORTED_PLATFORMS = new Set<string>(['WIHP', 'DerbySoft'])

/** Whether a platform supports offer mapping (everything except WIHP / DerbySoft). */
export function platformSupportsOffers(platform: string): boolean {
  return !OFFERS_UNSUPPORTED_PLATFORMS.has(platform)
}

/** Platforms that use the DerbySoft campaign-mapping variant (single Paid Search ID). */
export const DERBY_PLATFORMS = ['DerbySoft']
/** Platforms that use the WIHP campaign-mapping variant (campaign name + multiple Paid Search IDs). */
export const WIHP_PLATFORMS = ['WIHP']
