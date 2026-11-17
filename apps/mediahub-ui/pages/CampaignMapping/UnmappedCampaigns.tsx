import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Breadcrumb, Button, Checkbox, DropdownMenu, Icon, IconButton, Select, ToggleTab, colors } from '@amadeus/react-design-factory'
import type { ColumnType, TablePaginationConfig } from 'antd/es/table'
import type { SegmentedValue } from 'antd/es/segmented'
import type { ItemType } from 'antd/es/menu/interface'
import type {
  FilterItem,
  FilterValue,
} from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import Tooltip from 'antd/es/tooltip'
import TableWithFilterBanner from '@mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import {
  unmappedCampaigns,
  platformOptions,
  advertiserOptions,
  externalAdvertiserOptions,
  externalCampaignOptions,
  mappingStateOptions,
  isFollowedBpid,
  rowIsFollowed,
  advertiserNameForBpid,
  platformSupportsOffers,
  platformLabel,
  mappingUnitName,
  reportingPlatformForPlatform,
  obaMappingOf,
  campaignStatusOf,
  hasAdSetChildren,
  rollupMapping,
  isMultipleAdvertisers,
  type UnmappedCampaign,
  type MappingState,
} from './mockData/unmappedCampaigns'
import { startAdvertiserSelection } from '../../components/CampaignFlow/campaignFlowStore'
import CampaignSummaryDrawer from './CampaignSummaryDrawer'
import MappingDrawer, { mappingTypeLabels, type MappingType, type MappingSaveResult } from './MappingDrawer'
import { mappedAsUnmappedRows } from './mockData/campaigns'
import { LONDONER } from '../../shared/londonerHotel'
import OffersDrawer from './OffersDrawer'
import {
  UnmappedCampaignsWrapper,
  TwoLineCell,
  SubText,
  StatusIconButton,
  StatusIconDisabled,
  MultiAdvertiser,
  PlatformChip,
  EntityChip,
  RunStatusDot,
  CampaignNameCell,
  CampaignNameLink,
} from './UnmappedCampaigns.styled'

type ScopeValue = 'my' | 'all' | 'unmappedAdv'

function asArray(value: FilterValue | undefined): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.length > 0) return [value]
  return []
}

interface CampaignsListProps {
  /** 'unmapped' = the Unmapped Campaigns page (default). 'all' = the combined All Campaigns view
   *  (unmapped + mapped campaigns in one table; Campaign Mapping filter defaults to Unmapped). */
  mode?: 'unmapped' | 'all'
  /** When set, scope the table to a single advertiser (by BPID) for the Advertiser Details >
   *  Campaigns tab: shows that advertiser's campaigns (mapped + unmapped) in the Campaign Setup
   *  table shape, with ONLY a Platform ToggleTab (no filter banner / review-filter UI / search),
   *  no breadcrumb, and the Advertiser (BPID) column off by default. Forces 'all' behaviour. */
  advertiserBid?: string
}

function UnmappedCampaignsPage({ mode = 'unmapped', advertiserBid }: CampaignsListProps = {}) {
  // Read-only role (not admin/standard): view-only — mapping controls are disabled (UX-1.4).
  const { isAdmin, isStandard } = useAuth()
  const isReadOnly = !(isAdmin || isStandard)
  const scoped = !!advertiserBid
  // Campaign whose summary drawer is open (opened from the campaign name in the table).
  const [summaryCampaign, setSummaryCampaign] = useState<UnmappedCampaign | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  // Scoping to an advertiser implies the combined (mapped + unmapped) view.
  const isAll = mode === 'all' || scoped
  const tableRef = useRef<{ refetchWithFilters: () => void } | null>(null)

  // Prototype-local campaign list so a mapping Save can mutate a row and move it between scopes.
  // In 'all' mode, also fold in the mapped campaigns (rendered in this table's shape).
  // When scoped to an advertiser, keep only that advertiser's rows: a row whose resolved BPID is
  // this advertiser, OR a multi-advertiser candidate row that lists this BPID (shown as a
  // 'Multiple Advertisers' warning until resolved).
  const [rows, setRows] = useState<UnmappedCampaign[]>(() => {
    const base = isAll ? [...unmappedCampaigns, ...mappedAsUnmappedRows()] : unmappedCampaigns
    if (!advertiserBid) return base
    return base.filter(
      c => c.advertiserBid === advertiserBid || (c.candidateBpids?.includes(advertiserBid) ?? false),
    )
  })
  // The full filtered set the table currently shows (pre-pagination). The chart summary reflects
  // THIS, so the charts always match the table below (scope + all filters applied).
  const [displayedRows, setDisplayedRows] = useState<UnmappedCampaign[]>([])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeType, setActiveType] = useState<MappingType | null>(null)
  const [activeCampaign, setActiveCampaign] = useState<UnmappedCampaign | null>(null)
  const [offersOpen, setOffersOpen] = useState(false)
  const [offersCampaign, setOffersCampaign] = useState<UnmappedCampaign | null>(null)

  const openMapping = (campaign: UnmappedCampaign, type: MappingType) => {
    if (type === 'offers') {
      setOffersCampaign(campaign)
      setOffersOpen(true)
      return
    }
    setActiveCampaign(campaign)
    setActiveType(type)
    setDrawerOpen(true)
  }

  const closeOffers = () => {
    setOffersOpen(false)
    setOffersCampaign(null)
  }

  const closeMapping = () => {
    setDrawerOpen(false)
    setActiveType(null)
    setActiveCampaign(null)
  }

  // Toggle 'ignore' on an unmapped-advertiser campaign (prototype-local). Ignored rows are greyed
  // and their mapping is disabled; the user must un-ignore before mapping.
  const toggleIgnore = (campaign: UnmappedCampaign) => {
    setRows(prev => prev.map(r => (r.id === campaign.id ? { ...r, ignored: !r.ignored } : r)))
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }

  // Apply a mapping Save to the prototype-local rows, then refetch so the row moves scope.
  const handleMappingSave = (result: MappingSaveResult) => {
    setRows(prev =>
      prev.map(r => {
        if (r.id !== result.campaignId) return r
        if (result.mappingType === 'advertiser') {
          const bpid = result.bpid
          if (!bpid) return r
          return {
            ...r,
            advertiserBid: bpid,
            advertiserName: advertiserNameForBpid(bpid),
            advertiserMapping: 'mapped',
            // Resolving a multi-advertiser row to one candidate clears the many:many state.
            candidateBpids: undefined,
            // Followed advertiser -> appears in My + All; otherwise All only.
            isFollowed: isFollowedBpid(bpid),
          }
        }
        if (result.mappingType === 'campaign') {
          // If a BPID was picked (multi-advertiser row), resolve the row to that single advertiser
          // so the table shows the picked advertiser instead of 'Multiple Advertisers'.
          if (result.bpid) {
            return {
              ...r,
              campaignMapping: 'mapped',
              advertiserBid: result.bpid,
              advertiserName: advertiserNameForBpid(result.bpid),
              candidateBpids: undefined,
              isFollowed: isFollowedBpid(result.bpid),
            }
          }
          return { ...r, campaignMapping: 'mapped' }
        }
        if (result.mappingType === 'invoice') return { ...r, invoiceMapping: 'mapped' }
        if (result.mappingType === 'offers') return { ...r, offersMapping: 'mapped' }
        if (result.mappingType === 'oba') return { ...r, obaMapping: 'mapped' }
        return r
      }),
    )
    closeMapping()
    // Let state settle, then re-run the table query so the saved row leaves/moves scope.
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }

  // Why a mapping type may be unavailable. Returns:
  //  - { kind: 'unavailable' } — permanently N/A (e.g. offers on WIHP/DerbySoft) → ban glyph.
  //  - { kind: 'gated' }       — a prerequisite isn't done yet → grey X, becomes actionable later.
  //  - null                    — available to map/edit.
  const disabledInfo = (
    campaign: UnmappedCampaign,
    type: MappingType,
  ): { reason: string; kind: 'unavailable' | 'gated' } | null => {
    if (
      type === 'campaign' &&
      campaign.advertiserMapping !== 'mapped' &&
      !isMultipleAdvertisers(campaign)
    ) {
      return { reason: 'Advertiser mapping is needed first', kind: 'gated' }
    }
    if (type === 'offers') {
      if (!platformSupportsOffers(campaign.platform)) {
        return { reason: 'Offer mapping does not exist for this platform', kind: 'unavailable' }
      }
      if (campaign.campaignMapping !== 'mapped') {
        return { reason: 'Campaign mapping is needed first', kind: 'gated' }
      }
    }
    return null
  }

  // A status icon:
  //  - green check   = mapped
  //  - red X         = unmapped but available (actionable)
  //  - grey X        = gated (prerequisite pending) — non-clickable
  //  - grey ban (⊘)  = not applicable for this platform — non-clickable, visually distinct
  const renderMappingCell = (campaign: UnmappedCampaign, type: MappingType, state: MappingState) => {
    const label = mappingTypeLabels[type]

    // Facebook hierarchy: Advertiser is a CAMPAIGN-LEVEL mapping (it never varies per Ad Set).
    //  - On an Ad Set child row -> N/A (ban icon), like OBA.
    //  - On the Campaign parent row -> a normal actionable Advertiser cell (falls through below).
    if (type === 'advertiser' && campaign.rowLevel === 'adset') {
      return (
        <Tooltip title='Advertiser Mapping: handled at the campaign level'>
          <StatusIconDisabled aria-label='Advertiser Mapping: not applicable at Ad Set level'>
            <Icon name='banSolid' color={colors.cloud_50} width={18} height={18} />
          </StatusIconDisabled>
        </Tooltip>
      )
    }

    // Facebook campaign-level PARENT: Campaign/Offers/Invoice are a read-only roll-up of the Ad Set
    // children (mapped only if ALL children mapped). Shown as a DISABLED grey tick/cross; the
    // actionable mapping happens on the expanded Ad Set (child) rows. (Advertiser is excluded — it
    // is mapped directly on the parent.)
    if (hasAdSetChildren(campaign) && type !== 'advertiser') {
      const key = `${type}Mapping` as 'campaignMapping' | 'offersMapping' | 'invoiceMapping'
      const rolled = rollupMapping(campaign, key)
      const rMapped = rolled === 'mapped'
      return (
        <Tooltip title={`${label}: ${rMapped ? 'All Ad Sets mapped' : 'Some Ad Sets unmapped'} — expand to map`}>
          <StatusIconDisabled aria-label={`${label} (roll-up): ${rMapped ? 'mapped' : 'unmapped'}`}>
            <Icon name={rMapped ? 'checkCircleSolid' : 'timesCircleSolid'} color={colors.cloud_50} width={18} height={18} />
          </StatusIconDisabled>
        </Tooltip>
      )
    }

    const mapped = state === 'mapped'
    const info = mapped ? null : disabledInfo(campaign, type)

    // Read-only users see status only — the icon is never a button (no mapping/edit).
    if (isReadOnly) {
      const glyph = mapped ? 'checkCircleSolid' : info?.kind === 'unavailable' ? 'banSolid' : 'timesCircleSolid'
      const color = mapped ? colors.forest_60 : info ? colors.cloud_50 : colors.crimson_60
      const state2 = mapped ? 'Mapped' : info ? info.reason : 'Unmapped'
      return (
        <Tooltip title={`${label}: ${state2}`}>
          <StatusIconDisabled aria-label={`${label}: ${state2}`}>
            <Icon name={glyph} color={color} width={18} height={18} />
          </StatusIconDisabled>
        </Tooltip>
      )
    }

    if (info) {
      const glyph = info.kind === 'unavailable' ? 'banSolid' : 'timesCircleSolid'
      const suffix = info.kind === 'unavailable' ? 'not applicable' : 'unavailable'
      return (
        <Tooltip title={info.reason}>
          <StatusIconDisabled aria-label={`${label}: ${suffix} — ${info.reason}`}>
            <Icon name={glyph} color={colors.cloud_50} width={18} height={18} />
          </StatusIconDisabled>
        </Tooltip>
      )
    }

    // Multi-advertiser rows (external advertiser mapped to several ATAP advertisers) show a
    // WARNING-orange state on the Advertiser Mapping icon: it IS mapped, but needs the user to
    // pick one. Clickable (opens the drawer to resolve).
    const isMultiAdvertiserCell = type === 'advertiser' && !mapped && isMultipleAdvertisers(campaign)
    if (isMultiAdvertiserCell) {
      return (
        <Tooltip title='Mapped to multiple advertisers — pick one to resolve'>
          <StatusIconButton
            type='button'
            aria-label={`Resolve ${label} for ${campaign.externalAdvertiserName} — mapped to multiple advertisers`}
            onClick={() => openMapping(campaign, type)}
          >
            <Icon name='exclamationTriangleSolid' color={colors.pumpkin_60} width={18} height={18} />
          </StatusIconButton>
        </Tooltip>
      )
    }

    return (
      <Tooltip title={`${label}: ${mapped ? 'Mapped — click to edit' : 'Unmapped — click to map'}`}>
        <StatusIconButton
          type='button'
          aria-label={`${mapped ? 'Edit' : 'Add'} ${label} for ${campaign.externalAdvertiserName}`}
          onClick={() => openMapping(campaign, type)}
        >
          <Icon
            name={mapped ? 'checkCircleSolid' : 'timesCircleSolid'}
            color={mapped ? colors.forest_60 : colors.crimson_60}
            width={18}
            height={18}
          />
        </StatusIconButton>
      </Tooltip>
    )
  }

  const kebabItem = (campaign: UnmappedCampaign, type: MappingType, key: string, noun: string): ItemType => {
    const mapped = type === 'oba' ? obaMappingOf(campaign) === 'mapped' : campaign[`${type}Mapping` as keyof UnmappedCampaign] === 'mapped'
    const info = mapped ? null : disabledInfo(campaign, type)
    return {
      key,
      label: `${mapped ? 'Edit' : 'Map'} ${noun}`,
      disabled: isReadOnly || !!info || !!campaign.ignored,
      title: isReadOnly
        ? 'You have view-only access'
        : campaign.ignored
          ? 'Campaign is ignored — restore it first'
          : info?.reason ?? undefined,
      onClick: isReadOnly || info || campaign.ignored ? undefined : () => openMapping(campaign, type),
    }
  }

  const kebabItems = (campaign: UnmappedCampaign): ItemType[] => [
    kebabItem(campaign, 'advertiser', 'map-advertiser', 'Advertiser'),
    kebabItem(campaign, 'campaign', 'map-campaign', 'Campaign'),
    kebabItem(campaign, 'offers', 'map-offers', 'Offers'),
    kebabItem(campaign, 'invoice', 'map-invoice', 'Invoice'),
    // OBA is campaign-level: an actionable item on campaign/flat rows, N/A (omitted) on Ad Set children.
    ...(campaign.rowLevel === 'adset' ? [] : [kebabItem(campaign, 'oba', 'map-oba', 'OBA')]),
    // Ignore / Un-ignore — only for campaigns whose ADVERTISER is unmapped (and not multi). Last item.
    ...(!isReadOnly && campaign.advertiserMapping !== 'mapped' && !isMultipleAdvertisers(campaign)
      ? [
          { type: 'divider' as const, key: 'ignore-div' } as ItemType,
          {
            key: 'ignore',
            label: campaign.ignored ? 'Restore campaign' : 'Ignore campaign',
            onClick: () => toggleIgnore(campaign),
          } as ItemType,
        ]
      : []),
  ]

  // --- All Campaigns: optional "detail" columns the user can toggle via the Columns control. ---
  // --- All Campaigns: 3-section column customizer ("Edit columns"). ---
  // Section 1 Details + Section 3 Mapping = the base `columns` below (default-on; Campaign locked).
  // Section 2 Attributes = opt-in detail columns (default-off), inserted after External Campaign.
  const DETAILS_COLUMNS = [
    { key: 'platform', label: 'Platform' },
    { key: 'advertiserBid', label: 'Advertiser (BPID)' },
    { key: 'externalAdvertiserName', label: 'Platform Advertiser (ID)' },
    { key: 'externalCampaignName', label: 'External Campaign', locked: true },
    { key: 'entityType', label: 'Mapping Entity' },
  ]
  const ATTRIBUTE_COLUMNS: { key: string; label: string; field: keyof UnmappedCampaign }[] = [
    { key: 'tactic', label: 'Tactic', field: 'tactic' },
    { key: 'subType', label: 'Sub-Type', field: 'subType' },
    { key: 'language', label: 'Language', field: 'language' },
    { key: 'custom1', label: 'Custom 1', field: 'custom1' },
    { key: 'custom2', label: 'Custom 2', field: 'custom2' },
    { key: 'custom3', label: 'Custom 3', field: 'custom3' },
    { key: 'reportingPlatform', label: 'Reporting Platform', field: 'reportingPlatform' },
    { key: 'opportunityId', label: 'Opportunity ID', field: 'opportunityId' },
    { key: 'shipTo', label: 'Ship To', field: 'shipTo' },
  ]
  const MAPPING_COLUMNS = [
    { key: 'advertiserMapping', label: 'Advertiser Mapping' },
    { key: 'campaignMapping', label: 'Campaign Mapping' },
    { key: 'offersMapping', label: 'Offers Mapping' },
    { key: 'invoiceMapping', label: 'Invoice Mapping' },
    { key: 'obaMapping', label: 'OBA Mapping' },
  ]

  // Visibility map (All Campaigns only; resets on reload). Details + Mapping default ON;
  // Attributes default OFF. External Campaign is locked ON.
  const [colVisible, setColVisible] = useState<Record<string, boolean>>(() => {
    const v: Record<string, boolean> = {}
    DETAILS_COLUMNS.forEach(c => (v[c.key] = true))
    MAPPING_COLUMNS.forEach(c => (v[c.key] = true))
    ATTRIBUTE_COLUMNS.forEach(c => (v[c.key] = false))
    // Reporting Platform is shown by default in place of Mapping Entity (both stay toggleable via Edit columns).
    v['reportingPlatform'] = true
    v['entityType'] = false
    // Platform Advertiser (ID) is off by default (still toggleable via Edit columns).
    v['externalAdvertiserName'] = false
    // Scoped (advertiser tab): the Advertiser (BPID) column is redundant (one advertiser) — the
    // 'Multiple Advertisers' warning on the Advertiser Mapping cell covers the many:many case — so
    // it is OFF by default here (still toggleable via Edit columns).
    if (scoped) v['advertiserBid'] = false
    return v
  })
  const toggleCol = (key: string) => setColVisible(prev => ({ ...prev, [key]: !prev[key] }))
  const [colsMenuOpen, setColsMenuOpen] = useState(false)
  // Scoped (advertiser tab) Platform filter — a ToggleTab ('all' or a specific platform),
  // the ONLY filter in scoped mode.
  const [scopedPlatform, setScopedPlatform] = useState<string>('all')

  // All Campaigns: per-column mapping filter (header icons). Each column is single-select
  //   (null | 'mapped' | 'unmapped'); clicking the active state clears it. Advertiser Mapping has
  //   no column filter. Active column selections combine with OR (see queryFn).
  // Header filter: each mapping column has a grey filter icon opening an ICON-ONLY multi-select of
  //   the states that column can have. Within a column = OR across selected states; across columns
  //   = OR. Default: 'unmapped' selected on every column.
  const MAPPING_COL_KEYS = ['advertiserMapping', 'campaignMapping', 'offersMapping', 'invoiceMapping', 'obaMapping'] as const
  type MappingColKey = (typeof MAPPING_COL_KEYS)[number]
  type ColStatus = 'mapped' | 'unmapped' | 'warning' | 'blocked'

  // Resolve a row's status for a given mapping column (what the cell actually shows).
  const rowColStatus = (c: UnmappedCampaign, key: MappingColKey): ColStatus => {
    if (key === 'advertiserMapping') {
      if (isMultipleAdvertisers(c)) return 'warning'
      return c.advertiserMapping === 'mapped' ? 'mapped' : 'unmapped'
    }
    if (key === 'obaMapping') return obaMappingOf(c) === 'mapped' ? 'mapped' : 'unmapped'
    // campaign / offers / invoice — 'blocked' when not applicable or gated.
    if (key === 'offersMapping' && !platformSupportsOffers(c.platform)) return 'blocked'
    const type = key.replace('Mapping', '') as MappingType
    const mapped = c[key] === 'mapped'
    if (mapped) return 'mapped'
    if (disabledInfo(c, type)) return 'blocked' // gated (prereq pending) or unavailable
    return 'unmapped'
  }

  // The status options each column can present in its filter (icon-only).
  const COL_STATUS_OPTIONS: Record<MappingColKey, ColStatus[]> = {
    advertiserMapping: ['mapped', 'unmapped', 'warning'],
    // 'Unmapped' covers BOTH a true red-cross and a grey-cross (blocked / gated / N-A) — anything
    // not mapped — so 'blocked' is not a separate filter option (see the queryFn 'icons' branch).
    campaignMapping: ['mapped', 'unmapped'],
    offersMapping: ['mapped', 'unmapped'],
    invoiceMapping: ['mapped', 'unmapped'],
    obaMapping: ['mapped', 'unmapped'],
  }

  // Icon + color for each status (same vocabulary as the cells; solid glyphs).
  const STATUS_META: Record<ColStatus, { icon: 'checkCircleSolid' | 'timesCircleSolid' | 'exclamationTriangleSolid' | 'banSolid'; color: string; label: string }> = {
    mapped: { icon: 'checkCircleSolid', color: colors.forest_60, label: 'Mapped' },
    unmapped: { icon: 'timesCircleSolid', color: colors.crimson_60, label: 'Unmapped' },
    warning: { icon: 'exclamationTriangleSolid', color: colors.pumpkin_60, label: 'Multiple advertisers' },
    blocked: { icon: 'banSolid', color: colors.cloud_50, label: 'Blocked / N/A' },
  }

  const makeDefaultColFilter = () =>
    MAPPING_COL_KEYS.reduce((acc, k) => {
      // Default: nothing selected on any column (no filter, shows everything). A hidden default
      // selection was unclear — users had to open each menu to see it.
      acc[k] = new Set<ColStatus>()
      return acc
    }, {} as Record<MappingColKey, Set<ColStatus>>)
  const [colStatusFilter, setColStatusFilter] = useState<Record<MappingColKey, Set<ColStatus>>>(makeDefaultColFilter)
  const [openColMenu, setOpenColMenu] = useState<MappingColKey | null>(null)
  // Anchor rect (viewport coords) of the clicked filter icon — the popover renders at page level
  // (NOT inside the table header cell, which antd re-renders and would unmount the menu).
  const [colMenuAnchor, setColMenuAnchor] = useState<{ top: number; left: number } | null>(null)
  const colMenuRef = useRef<HTMLDivElement | null>(null)
  // Closing the column menu applies the (possibly multi-select) filter. We intentionally DON'T
  // refetch on each toggle — a refetch re-renders the table header and would unmount the open
  // popover (closing it after one pick). So selections accumulate while open; apply on close.
  const closeColMenu = () => {
    setOpenColMenu(null)
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }
  useEffect(() => {
    if (!openColMenu) return
    const onDocClick = (e: MouseEvent) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target as Node)) closeColMenu()
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openColMenu])
  const toggleColStatus = (key: MappingColKey, status: ColStatus) => {
    // Update selection only; the table refetch happens when the menu closes (see closeColMenu).
    setColStatusFilter(prev => {
      const next = new Set(prev[key])
      if (next.has(status)) next.delete(status)
      else next.add(status)
      return { ...prev, [key]: next }
    })
  }

  // --- All Campaigns review: two mapping-filter UIs to compare. Mutually exclusive. ---
  //   'icons' = per-column green/red header icons (above).
  //   'chart' = summary cards (display-only) + a "sentence" filter bar (status + dimension pills).
  // A view switcher next to Search toggles which one is shown; only the shown one filters.
  // A9 (resolved): ship the chart + filters view only. Default is the SIMPLE view (Option B);
  // a "View mappings" link reveals the advanced controls (clickable any/all toggle + per-dimension
  // chips = Option C). The old 3-mode switcher and the header-icons mode are retired.
  type ReviewView = 'icons' | 'chart' | 'chartAdvanced'
  const reviewView = 'chart' as ReviewView // fixed; header-icons mode retired (icons branches are dead)
  const isChartView = true
  // Advanced controls are shown on demand via the "View mappings" expander (default collapsed).
  const [advancedExpanded, setAdvancedExpanded] = useState(false)
  const isAdvancedChart = advancedExpanded

  // Sentence-bar filter (chart view):
  //   "Show rows where [status] in [connector] of [dimension pills]".
  // Status = unmapped (default) | mapped. Connector = OR (any) | AND (all).
  // Smart default: switching to 'unmapped' -> OR (show anything still to do); 'mapped' -> AND
  // (show only fully-complete rows). The user can override the connector afterwards.
  type MappingDimKey = 'advertiserMapping' | 'campaignMapping' | 'offersMapping' | 'invoiceMapping' | 'obaMapping'
  const MAPPING_DIMS: { key: MappingDimKey; label: string }[] = [
    { key: 'advertiserMapping', label: 'Advertiser' },
    { key: 'campaignMapping', label: 'Campaign' },
    { key: 'offersMapping', label: 'Offers' },
    { key: 'invoiceMapping', label: 'Invoice' },
    { key: 'obaMapping', label: 'OBA' },
  ]
  // 'all' = no mapping-status filter (every campaign, mapped or not). Default so My Campaigns
  // opens showing all of the user's campaigns.
  type SentenceStatus = MappingState | 'all'
  const [sentenceStatus, setSentenceStatus] = useState<SentenceStatus>('all')
  const [sentenceConnector, setSentenceConnector] = useState<'or' | 'and'>('or')
  // All dimension chips selected by default (both statuses). A manual change persists when
  // switching between Unmapped / Mapped (status switching only flips the smart-default connector).
  const [sentenceDims, setSentenceDims] = useState<Set<MappingDimKey>>(
    new Set(MAPPING_DIMS.map(d => d.key)),
  )
  const toggleSentenceDim = (key: MappingDimKey) => {
    setSentenceDims(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }
  const selectSentenceStatus = (status: SentenceStatus) => {
    setSentenceStatus(status)
    // Smart default connector: unmapped -> OR, mapped -> AND.
    setSentenceConnector(status === 'mapped' ? 'and' : 'or')
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }
  const toggleSentenceConnector = () => {
    setSentenceConnector(prev => (prev === 'or' ? 'and' : 'or'))
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusWrapRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!statusMenuOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (statusWrapRef.current && !statusWrapRef.current.contains(e.target as Node)) setStatusMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [statusMenuOpen])

  // All Campaigns: mapping "mode" — a single-select preset that applies a background filter.
  //  - all:      campaigns needing ANY fix (campaign OR offers OR invoice unmapped)
  //  - campaign: campaigns needing campaign OR offers mapping
  //  - invoice:  campaigns needing invoice mapping
  // (Unmapped advertisers are handled by the Unmapped Advertisers scope, not a mode.)
  type MappingMode = 'all' | 'campaign' | 'invoice'
  const MAPPING_MODES: { key: MappingMode; label: string }[] = [
    { key: 'all', label: 'All mapping' },
    { key: 'campaign', label: 'Campaign mapping' },
    { key: 'invoice', label: 'Invoice mapping' },
  ]
  // null = no mode selected -> show EVERYTHING (mapped + unmapped). Modes are single-select but
  // deselectable: clicking the active mode turns it off (back to null).
  // Mode pills are hidden for now (per-column header filters are preferred). Default null = no
  // mode filter applied. Keep the pill code so we can re-enable easily.
  const [mappingMode, setMappingMode] = useState<MappingMode | null>(null)
  const selectMode = (mode: MappingMode) => {
    setMappingMode(prev => (prev === mode ? null : mode))
    // Re-run the query so the mode's background filter (read from this state) takes effect.
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }

  // All Campaigns: Advanced filters (the Attribute fields). AND logic; resets on reload.
  const ADVANCED_FIELDS: { key: string; label: string; field: keyof UnmappedCampaign }[] = [
    { key: 'tactic', label: 'Tactic', field: 'tactic' },
    { key: 'subType', label: 'Sub-Type', field: 'subType' },
    { key: 'language', label: 'Language', field: 'language' },
    { key: 'custom1', label: 'Custom 1', field: 'custom1' },
    { key: 'custom2', label: 'Custom 2', field: 'custom2' },
    { key: 'custom3', label: 'Custom 3', field: 'custom3' },
    { key: 'reportingPlatform', label: 'Reporting Platform', field: 'reportingPlatform' },
    { key: 'opportunityId', label: 'Opportunity ID', field: 'opportunityId' },
    { key: 'shipTo', label: 'Ship To', field: 'shipTo' },
  ]
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [advancedValues, setAdvancedValues] = useState<Record<string, string[]>>({})
  const setAdvanced = (key: string, vals: string[]) => {
    setAdvancedValues(prev => ({ ...prev, [key]: vals }))
    setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
  }
  // Distinct option values per advanced field (from all rows), for the dropdowns.
  const advancedOptions = (field: keyof UnmappedCampaign): { label: string; value: string }[] => {
    const vals = Array.from(
      new Set(rows.map(r => (r[field] as string | undefined) || '').filter(v => v.length)),
    ).sort()
    return vals.map(v => ({ label: v, value: v }))
  }

  const attributeColumnDefs: ColumnType<UnmappedCampaign>[] = ATTRIBUTE_COLUMNS.filter(
    o => colVisible[o.key],
  ).map(o => ({
    title: o.label,
    dataIndex: o.field as string,
    key: o.key,
    width: '10%',
    ellipsis: true,
    render: (_: unknown, record: UnmappedCampaign) => {
      let val = record[o.field] as string | undefined
      // Rows still to be mapped have no stored Reporting Platform: derive it from the platform (DWI rule).
      if (o.key === 'reportingPlatform' && !val) val = reportingPlatformForPlatform(record.platform)
      return <span>{val && val.length ? val : '-'}</span>
    },
  }))

  // --- All Campaigns review (chart view): per-dimension summary over the whole row set. ---
  // Two buckets only — mapped / unmapped. Classification of "blocked" states:
  //   - Multiple Advertisers (unresolved) -> UNMAPPED (user must still pick one).
  //   - Mapping not available / N/A (e.g. Offers on WIHP/DerbySoft) -> MAPPED (nothing to do).
  // "% mapped" = mapped / total.
  type DimSummary = { label: string; mapped: number; unmapped: number; total: number; pct: number }
  // Only mapping columns currently shown via Edit columns participate in the filters/charts.
  const visibleMappingDims = MAPPING_DIMS.filter(d => colVisible[d.key] !== false)

  // Summary reflects the table's current filtered set (displayedRows); before the first query
  // runs it falls back to the full row set.
  const summaryRows = displayedRows.length > 0 ? displayedRows : rows
  const mappingSummary: DimSummary[] = visibleMappingDims.map(({ key, label }) => {
    let mapped = 0, unmapped = 0
    for (const c of summaryRows) {
      // N/A (not available) counts as mapped — nothing to action.
      if (key === 'offersMapping' && !platformSupportsOffers(c.platform)) { mapped += 1; continue }
      // Advertiser: an unresolved many-to-one (Multiple Advertisers) is still UNMAPPED.
      if (key === 'advertiserMapping' && isMultipleAdvertisers(c)) { unmapped += 1; continue }
      const val = key === 'obaMapping' ? obaMappingOf(c) : (c[key] as MappingState | undefined)
      if (val === 'mapped') mapped += 1
      else unmapped += 1
    }
    const total = summaryRows.length
    const pct = total > 0 ? Math.round((mapped / total) * 100) : 0
    return { label, mapped, unmapped, total, pct }
  })

  // Summary strip: one card per dimension (progress bar + count chips + % ready). Display-only.
  const chartSummary = (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${mappingSummary.length}, minmax(0, 1fr))`, gap: 12, padding: '4px 0 8px' }}>
      {mappingSummary.map(d => (
        <div key={d.label} style={{ border: `1px solid ${colors.cloud_30}`, borderRadius: 6, padding: '10px 12px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.cloud_100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label} Mapping</span>
            <span style={{ fontSize: 12, color: colors.cloud_80, whiteSpace: 'nowrap' }}>{d.pct}% mapped</span>
          </div>
          <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: colors.cloud_20, marginBottom: 8 }}>
            {d.mapped > 0 && <div style={{ flex: d.mapped, background: colors.forest_60 }} />}
            {d.unmapped > 0 && <div style={{ flex: d.unmapped, background: colors.crimson_60 }} />}
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: colors.cloud_80 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name='checkCircle' width={12} height={12} color={colors.forest_60} /> {d.mapped}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name='timesCircle' width={12} height={12} color={colors.crimson_60} /> {d.unmapped}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  // Sentence filter bar: "Show rows where [status ▾] in [any|all] of [dimension pills]".
  const statusLabel = sentenceStatus === 'mapped' ? 'Mapped' : sentenceStatus === 'unmapped' ? 'Unmapped' : 'All'
  const statusIcon =
    sentenceStatus === 'mapped' ? (
      <Icon name='checkCircle' width={12} height={12} color={colors.forest_60} />
    ) : sentenceStatus === 'unmapped' ? (
      <Icon name='timesCircle' width={12} height={12} color={colors.crimson_60} />
    ) : null
  const sentenceBar = (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: '4px 0 12px', fontSize: 14, color: colors.cloud_80 }}>
      <span>Show campaigns that have settings</span>

      {/* Status — secondary dropdown button (self-anchored popover). */}
      <div ref={statusWrapRef} style={{ position: 'relative', display: 'inline-block' }}>
        <Button
          id='all-campaigns-sentence-status-btn'
          variant='outlined'
          size='small'
          onClick={() => setStatusMenuOpen(o => !o)}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {statusIcon}
            {statusLabel}
            <Icon name='chevronDown' width={12} height={12} />
          </span>
        </Button>
        {statusMenuOpen && (
          <div
            style={{
              position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1000,
              background: colors.cloud_0, border: `1px solid ${colors.cloud_30}`, borderRadius: 6,
              boxShadow: '0 2px 8px #80808040', minWidth: 160, padding: 4,
            }}
          >
            {([
              { key: 'all' as SentenceStatus, label: 'All', icon: null },
              { key: 'unmapped' as SentenceStatus, label: 'Unmapped', icon: <Icon name='timesCircle' width={12} height={12} color={colors.crimson_60} /> },
              { key: 'mapped' as SentenceStatus, label: 'Mapped', icon: <Icon name='checkCircle' width={12} height={12} color={colors.forest_60} /> },
            ]).map(opt => (
              <button
                key={opt.key}
                type='button'
                id={`all-campaigns-sentence-status-${opt.key}`}
                onClick={() => { selectSentenceStatus(opt.key); setStatusMenuOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left',
                  border: 'none', background: sentenceStatus === opt.key ? colors.sky_10 : 'transparent',
                  color: colors.cloud_100, borderRadius: 4, padding: '6px 8px', fontSize: 14, cursor: 'pointer',
                }}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Connector — ADVANCED: a clickable any/all toggle. SIMPLE: bold static text driven by the
          smart default (unmapped -> any, mapped -> all). */}
      {sentenceStatus !== 'all' && <span>in</span>}
      {sentenceStatus === 'all' ? null : isAdvancedChart ? (
        <button
          type='button'
          id='all-campaigns-sentence-connector'
          onClick={toggleSentenceConnector}
          title='Toggle match: any (OR) / all (AND)'
          style={{
            border: `1px solid ${colors.cloud_40}`, background: colors.cloud_0, color: colors.sky_60,
            borderRadius: 9999, padding: '2px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {sentenceConnector === 'and' ? 'all' : 'any'}
        </button>
      ) : (
        <strong style={{ color: colors.cloud_100 }}>{sentenceStatus === 'mapped' ? 'all' : 'any'}</strong>
      )}
      {sentenceStatus !== 'all' && <span>of</span>}

      {/* Simple chart: no per-dimension chips — filter across ALL mappings. */}
      {sentenceStatus === 'all' ? null : !isAdvancedChart ? (
        <span>the mappings</span>
      ) : (
        visibleMappingDims.map((dim, i) => {
          const on = sentenceDims.has(dim.key)
          return (
            <span key={dim.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ fontSize: 12, color: colors.cloud_70, fontWeight: 600 }}>{sentenceConnector === 'and' ? 'AND' : 'OR'}</span>}
              {/* Chip styled to match the DF active-filter tags: selected = solid sky_60,
                  unselected = solid cloud_40 (both white text, pill, no border). */}
              <button
                type='button'
                id={`all-campaigns-sentence-${dim.key}`}
                onClick={() => toggleSentenceDim(dim.key)}
                aria-pressed={on}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  border: 'none',
                  background: on ? colors.sky_60 : colors.cloud_40,
                  color: colors.cloud_0,
                  borderRadius: 9999, padding: '4px 12px', fontSize: 14, fontWeight: 400, lineHeight: 1.2, cursor: 'pointer',
                }}
              >
                {dim.label}
              </button>
            </span>
          )
        })
      )}

      {/* "View mappings" expander: default collapsed = SIMPLE (bold any/all, no chips = Option B).
          Expanded = ADVANCED (clickable any/all toggle + per-dimension chips = Option C). */}
      {sentenceStatus !== 'all' && (
      <Button
        id='all-campaigns-view-mappings-toggle'
        variant='link'
        size='small'
        onClick={() => { setAdvancedExpanded(o => !o); setTimeout(() => tableRef.current?.refetchWithFilters(), 0) }}
        aria-expanded={advancedExpanded}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          {advancedExpanded ? 'Hide mappings' : 'View mappings'}
          <Icon name={advancedExpanded ? 'chevronDown' : 'chevronRight'} width={12} height={12} />
        </span>
      </Button>
      )}
    </div>
  )

  // Chart view = summary cards + sentence filter bar, shown in the table title area.
  const chartControls = (
    <div>
      {chartSummary}
      {sentenceBar}
    </div>
  )

  // All Campaigns: mapping column header = label + two filter icons (green check = mapped,
  // red cross = unmapped). Single-select per column, both deselectable (click active to clear).
  // No filter icons on Advertiser Mapping. Column selections combine with OR (see queryFn).
  const mappingHeader = (key: MappingColKey, label: string): React.ReactNode => {
    if (!isAll || reviewView !== 'icons') return label
    const active = colStatusFilter[key].size > 0
    const open = openColMenu === key
    // Header renders ONLY the label + a grey filter icon. The multi-select popover is rendered once
    // at page level (see colMenuPopover) so antd header re-renders can't unmount it mid-selection.
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
        {label}
        <button
          type='button'
          id={`all-campaigns-colfilter-${key}`}
          onClick={e => {
            e.stopPropagation()
            if (open) {
              closeColMenu()
            } else {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
              setColMenuAnchor({ top: r.bottom + 4, left: r.left })
              setOpenColMenu(key)
            }
          }}
          title={`Filter ${label}`}
          aria-label={`Filter ${label}`}
          aria-expanded={open}
          style={{
            display: 'inline-flex', alignItems: 'center', border: 'none', background: 'transparent',
            padding: 2, cursor: 'pointer', lineHeight: 0,
          }}
        >
          {/* Non-brand violet so reviewers don't mistake this prototype filter control for a
              shipping feature (the status glyphs keep their real colors). */}
          <Icon name='filter' width={12} height={12} color={active ? colors.violet_60 : colors.cloud_50} />
        </button>
      </span>
    )
  }

  // Page-level column-filter popover (fixed-positioned at the clicked icon's anchor). Rendered
  // outside the table so header re-renders don't unmount it — fixes the multi-select drop.
  const colMenuPopover =
    isAll && reviewView === 'icons' && openColMenu && colMenuAnchor ? (
      <div
        ref={colMenuRef}
        onMouseDown={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: colMenuAnchor.top, left: colMenuAnchor.left, zIndex: 2000,
          background: colors.cloud_0, border: `1px solid ${colors.cloud_30}`, borderRadius: 6,
          boxShadow: '0 2px 8px #80808040', padding: 4, display: 'inline-flex', gap: 2,
        }}
      >
        {COL_STATUS_OPTIONS[openColMenu].map(st => {
          const meta = STATUS_META[st]
          const on = colStatusFilter[openColMenu].has(st)
          return (
            <button
              key={st}
              type='button'
              id={`all-campaigns-colfilter-${openColMenu}-${st}`}
              onClick={() => toggleColStatus(openColMenu, st)}
              title={meta.label}
              aria-label={meta.label}
              aria-pressed={on}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, borderRadius: 6, cursor: 'pointer',
                // Non-brand violet highlight — a prototype review control, not a shipping option.
                border: `1px solid ${on ? colors.violet_60 : 'transparent'}`,
                background: on ? '#f3e8ff' : 'transparent', // soft violet (df/color/violet ~10; not exported)
              }}
            >
              <Icon name={meta.icon} width={16} height={16} color={meta.color} />
            </button>
          )
        })}
      </div>
    ) : null

  // Per-platform solid-chip color (uses exported DF palette keys; fg chosen for contrast).
  const platformChipColor = (platform: string): { bg: string; fg: string } => {
    switch (platform) {
      case 'SA360':
        return { bg: colors.sky_60, fg: colors.cloud_0 }
      case 'CM360':
        return { bg: colors.violet_60, fg: colors.cloud_0 }
      case 'Meta':
        return { bg: colors.sky_80, fg: colors.cloud_0 }
      case 'Amadeus DSP':
        return { bg: colors.crimson_70, fg: colors.cloud_0 }
      case 'DV360':
        return { bg: colors.canary_70, fg: colors.cloud_100 }
      case 'DerbySoft':
        return { bg: colors.forest_70, fg: colors.cloud_0 }
      case 'WIHP':
        return { bg: colors.pumpkin_60, fg: colors.cloud_0 }
      default:
        return { bg: colors.cloud_80, fg: colors.cloud_0 }
    }
  }

  const columns: ColumnType<UnmappedCampaign>[] = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      // Fixed px (not %) so the caret (on Facebook rows) + the chip (e.g. 'Meta (Facebook)') fit
      // on one line and the chip never wraps below the expander.
      width: 190,
      render: (platform: string, record: UnmappedCampaign) => {
        if (record.rowLevel === 'adset') return null // child rows don't repeat the platform
        const col = platformChipColor(platform)
        return <PlatformChip bg={col.bg} fg={col.fg}>{platformLabel(platform)}</PlatformChip>
      },
    },
    {
      title: 'Advertiser (BPID)',
      dataIndex: 'advertiserBid',
      key: 'advertiserBid',
      width: '15%',
      ellipsis: true,
      render: (_: unknown, record: UnmappedCampaign) => {
        if (record.rowLevel === 'adset') return null // advertiser is campaign-level; not repeated per Ad Set
        // Multi-advertiser rows show 'Multiple Advertisers' until one candidate is picked
        // (red icon while unresolved); once resolved they show the single advertiser below.
        if (isMultipleAdvertisers(record)) return <MultiAdvertiser>Multiple Advertisers</MultiAdvertiser>
        if (record.advertiserMapping === 'mapped' && record.advertiserBid)
          return (
            <TwoLineCell>
              <span>{record.advertiserName}</span>
              <SubText>{record.advertiserBid}</SubText>
            </TwoLineCell>
          )
        return <span>-</span>
      },
    },
    {
      title: 'Platform Advertiser (ID)',
      dataIndex: 'externalAdvertiserName',
      key: 'externalAdvertiserName',
      width: '17%',
      ellipsis: true,
      render: (_: unknown, record: UnmappedCampaign) =>
        record.rowLevel === 'adset' ? null : (
          <TwoLineCell>
            <span>{record.externalAdvertiserName}</span>
            <SubText>{record.externalAdvertiserId}</SubText>
          </TwoLineCell>
        ),
    },
    {
      title: 'External Campaign Name (ID)',
      dataIndex: 'externalCampaignName',
      key: 'externalCampaignName',
      width: '10%', // narrowed from the original 17% (long names truncate with an ellipsis)
      ellipsis: true,
      render: (_: unknown, record: UnmappedCampaign) =>
        record.externalCampaignId === '-' ? (
          <span>-</span>
        ) : (
          <CampaignNameCell>
            {(() => {
              const st = campaignStatusOf(record)
              const color = st === 'live' ? colors.forest_60 : st === 'pause' ? colors.pumpkin_60 : colors.cloud_50
              const label = st === 'live' ? 'Live' : st === 'pause' ? 'Pause' : 'Unknown'
              return (
                <Tooltip title={`Campaign Status in Platform is ${label}`}>
                  <RunStatusDot color={color} aria-label={`Campaign status: ${label}`} />
                </Tooltip>
              )
            })()}
            <TwoLineCell>
              <CampaignNameLink
                type='button'
                title={record.externalCampaignName}
                onClick={() => setSummaryCampaign(record)}
              >
                {record.externalCampaignName}
              </CampaignNameLink>
              <SubText>{record.externalCampaignId}</SubText>
            </TwoLineCell>
          </CampaignNameCell>
        ),
    },
    {
      // Per-platform mapping unit / entity type (Campaign / Placement / AdSet) — req-defined.
      title: 'Mapping Entity',
      key: 'entityType',
      width: '9%',
      render: (_: unknown, record: UnmappedCampaign) => {
        // An explicit Ad Set CHILD shows 'AdSet'. At the TOP level, Facebook rows show 'Campaign'
        // (that's what you see first, before expanding); other platforms use their mapping unit
        // (SA360/DerbySoft/WIHP -> Campaign, CM360 -> Placement).
        const entity =
          record.rowLevel === 'adset'
            ? 'AdSet'
            : record.platform === 'Meta'
              ? 'Campaign'
              : mappingUnitName(record.platform)
        return <EntityChip chipColor={platformChipColor(record.platform).bg}>{entity}</EntityChip>
      },
    },
    {
      title: mappingHeader('advertiserMapping', 'Advertiser Mapping'),
      dataIndex: 'advertiserMapping',
      key: 'advertiserMapping',
      width: '8%',
      align: 'center',
      render: (state: MappingState, record: UnmappedCampaign) => renderMappingCell(record, 'advertiser', state),
    },
    {
      title: mappingHeader('campaignMapping', 'Campaign Mapping'),
      dataIndex: 'campaignMapping',
      key: 'campaignMapping',
      width: '8%',
      align: 'center',
      render: (state: MappingState, record: UnmappedCampaign) => renderMappingCell(record, 'campaign', state),
    },
    {
      title: mappingHeader('offersMapping', 'Offers Mapping'),
      dataIndex: 'offersMapping',
      key: 'offersMapping',
      width: '8%',
      align: 'center',
      render: (state: MappingState, record: UnmappedCampaign) => renderMappingCell(record, 'offers', state),
    },
    {
      title: mappingHeader('invoiceMapping', 'Invoice Mapping'),
      dataIndex: 'invoiceMapping',
      key: 'invoiceMapping',
      width: '8%',
      align: 'center',
      render: (state: MappingState, record: UnmappedCampaign) => renderMappingCell(record, 'invoice', state),
    },
    {
      // OBA (Omnichannel Budget Allocation) mapping — campaign-level. Actionable green/red on
      // campaign/flat rows (opens the mapping drawer, like Invoice); N/A (ban) on Ad Set children.
      title: mappingHeader('obaMapping', 'OBA Mapping'),
      key: 'obaMapping',
      width: '8%',
      align: 'center',
      render: (_: unknown, record: UnmappedCampaign) => {
        if (record.rowLevel === 'adset') {
          return (
            <Tooltip title='OBA Mapping: not applicable at Ad Set level'>
              <StatusIconDisabled aria-label='OBA Mapping: not applicable'>
                <Icon name='banSolid' color={colors.cloud_50} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        const mapped = obaMappingOf(record) === 'mapped'
        if (isReadOnly) {
          return (
            <Tooltip title={`OBA Mapping: ${mapped ? 'Mapped' : 'Unmapped'}`}>
              <StatusIconDisabled aria-label={`OBA Mapping: ${mapped ? 'Mapped' : 'Unmapped'}`}>
                <Icon name={mapped ? 'checkCircleSolid' : 'timesCircleSolid'} color={mapped ? colors.forest_60 : colors.crimson_60} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        return (
          <Tooltip title={`OBA Mapping: ${mapped ? 'Mapped — click to edit' : 'Unmapped — click to map'}`}>
            <StatusIconButton
              type='button'
              aria-label={`${mapped ? 'Edit' : 'Add'} OBA Mapping for ${record.externalCampaignName}`}
              onClick={() => openMapping(record, 'oba')}
            >
              <Icon name={mapped ? 'checkCircleSolid' : 'timesCircleSolid'} color={mapped ? colors.forest_60 : colors.crimson_60} width={18} height={18} />
            </StatusIconButton>
          </Tooltip>
        )
      },
    },
    {
      key: 'actions',
      align: 'center',
      width: '4%',
      render: (_: unknown, record: UnmappedCampaign) => (
        <DropdownMenu items={kebabItems(record)} menuType='kebab'>
          <IconButton
            id={`unmapped-campaign-${record.id}-actions-btn`}
            iconName='ellipsisVertical'
            color={colors.cloud_80}
          />
        </DropdownMenu>
      ),
    },
  ]

  // All Campaigns: build the displayed columns from the base `columns` filtered by visibility,
  // with the selected Attribute columns inserted right after External Campaign. Other pages use the
  // base `columns` unchanged. The actions column is always kept.
  // Fixed/sticky detail columns — Mapping Entity is a detail column but scrolls (not pinned).
  const DETAIL_KEYS = new Set(DETAILS_COLUMNS.map(c => c.key).filter(k => k !== 'entityType'))
  const displayColumns: ColumnType<UnmappedCampaign>[] = (() => {
    if (!isAll) return columns
    const base = columns.filter(c => c.key === 'actions' || colVisible[c.key as string] !== false)
    // Insert attribute columns after Mapping Entity; if it's hidden, fall back to External Campaign.
    let idx = base.findIndex(c => c.key === 'entityType')
    if (idx < 0) idx = base.findIndex(c => c.key === 'externalCampaignName')
    const at = idx >= 0 ? idx + 1 : base.length
    const merged = [...base.slice(0, at), ...attributeColumnDefs, ...base.slice(at)]
    // Keep the Details columns pinned to the left on small screens; the rest scroll horizontally.
    return merged.map(c => (DETAIL_KEYS.has(c.key as string) ? { ...c, fixed: 'left' as const } : c))
  })()

  // Only scroll horizontally when the columns would overflow. Rough per-column widths: details/
  // attributes ~180px, mapping/status ~110px. No scroll by default (few columns => small total).
  const scrollX = isAll
    ? displayColumns.reduce((sum, c) => {
        const k = c.key as string
        if (k === 'actions') return sum + 56
        if (['advertiserMapping', 'campaignMapping', 'offersMapping', 'invoiceMapping', 'obaMapping'].includes(k)) return sum + 120
        if (k === 'entityType') return sum + 110
        if (k === 'externalCampaignName') return sum + 105 // narrower than the 180px default
        return sum + 180
      }, 0)
    : undefined

  // "Edit columns" control (All Campaigns only): a button that opens a sectioned checkbox panel
  // BELOW it. The panel is controlled (stays open while toggling) so clicks don't dismiss it.
  const colCheckboxRow = (key: string, label: string, locked = false) => (
    <div key={key} style={{ padding: '4px 0' }}>
      <Checkbox
        checked={locked ? true : !!colVisible[key]}
        disabled={locked}
        onChange={locked ? undefined : () => toggleCol(key)}
      >
        {label}
      </Checkbox>
    </div>
  )
  const colSectionTitle = (title: string) => (
    <div style={{ fontSize: 12, fontWeight: 600, color: colors.cloud_80, margin: '8px 0 2px' }}>{title}</div>
  )
  const columnsPanel = (
    <div
      style={{
        background: colors.cloud_0,
        border: `1px solid ${colors.cloud_30}`,
        borderRadius: 6,
        boxShadow: '0 4px 12px #80808040',
        padding: '8px 16px 12px',
        minWidth: 220,
        maxHeight: 420,
        overflowY: 'auto',
      }}
    >
      {colSectionTitle('Details')}
      {DETAILS_COLUMNS.map(c => colCheckboxRow(c.key, c.label, (c as { locked?: boolean }).locked))}
      {colSectionTitle('Attributes')}
      {ATTRIBUTE_COLUMNS.map(c => colCheckboxRow(c.key, c.label))}
      {colSectionTitle('Mapping')}
      {MAPPING_COLUMNS.map(c => colCheckboxRow(c.key, c.label))}
    </div>
  )
  // Self-anchored popover: the panel is absolutely positioned directly below the button. Open
  // state is controlled; an outside-click (not inside the wrapper) closes it, so toggling the
  // checkboxes inside keeps it open.
  const colsWrapRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!colsMenuOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (colsWrapRef.current && !colsWrapRef.current.contains(e.target as Node)) setColsMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [colsMenuOpen])

  const columnsControl = (
    <div ref={colsWrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        id='all-campaigns-edit-columns-btn'
        variant='outlined'
        size='small'
        onClick={() => setColsMenuOpen(o => !o)}
      >
        Edit columns <Icon name='chevronDown' width={12} height={12} />
      </Button>
      {colsMenuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1000 }}>
          {columnsPanel}
        </div>
      )}
    </div>
  )


  // Search-row adornment for All Campaigns: the review switcher + Edit columns.
  const allCampaignsAdornment = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {columnsControl}
    </div>
  )

  // Scoped (advertiser tab): keep Edit columns but NOT the review-filter switcher.
  const scopedAdornment = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{columnsControl}</div>
  )

  // Scoped (advertiser tab): the only filter — a Platform ToggleTab ('All' + each platform present
  // across this advertiser's rows). Rendered in the table title area.
  const scopedPlatformTabs = (() => {
    const present = Array.from(new Set(rows.map(r => r.platform)))
    const current = present.includes(scopedPlatform) || scopedPlatform === 'all' ? scopedPlatform : 'all'
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <ToggleTab
          value={current as SegmentedValue}
          onChange={(v: SegmentedValue) => {
            setScopedPlatform(String(v))
            setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
          }}
          options={[
            { label: <span id='adv-campaigns-platform-all'>All Campaigns</span>, value: 'all' },
            ...present.map(pf => ({ label: <span id={`adv-campaigns-platform-${pf}`}>{platformLabel(pf)}</span>, value: pf })),
          ]}
        />
      </div>
    )
  })()

  const makeMultiSelect = (
    id: string,
    label: string,
    options: { label: string; value: string }[],
  ): FilterItem<UnmappedCampaign>['renderControl'] =>
    ({ value, setValue }) => (
      <Select
        id={id}
        label={label}
        mode='multiple'
        showSearch
        placeholder='Select'
        options={options}
        value={asArray(value)}
        onChange={(v: FilterValue) => setValue(v)}
      />
    )

  const campaignStatusFilterOptions = [
    { label: 'Live', value: 'live' },
    { label: 'Pause', value: 'pause' },
    { label: 'Unknown', value: 'unknown' },
    { label: 'Ignored', value: 'ignored' },
  ]

  const filterItems: FilterItem<UnmappedCampaign>[] = [
    {
      name: 'platform',
      label: 'Platform',
      type: 'multiple',
      placement: 'banner',
      options: platformOptions,
      renderControl: makeMultiSelect('unmapped-platform-sel', 'Platform', platformOptions),
    },
    {
      name: 'advertiserBid',
      label: 'Advertiser (BPID)',
      type: 'multiple',
      placement: 'banner',
      options: advertiserOptions,
      renderControl: makeMultiSelect('unmapped-advertiser-sel', 'Advertiser (BPID)', advertiserOptions),
    },
    {
      name: 'externalAdvertiserId',
      label: 'Platform Advertiser (ID)',
      type: 'multiple',
      placement: 'banner',
      options: externalAdvertiserOptions,
      renderControl: makeMultiSelect(
        'unmapped-ext-advertiser-sel',
        'Platform Advertiser (ID)',
        externalAdvertiserOptions,
      ),
    },
    {
      // Campaign (platform run) status filter. Live/Pause/Unknown come from the DB; Ignored returns
      // the campaigns the user marked as ignored. Placed before External Campaign Name.
      name: 'campaignStatus',
      label: 'Campaign Status',
      type: 'multiple',
      placement: 'banner',
      options: campaignStatusFilterOptions,
      renderControl: makeMultiSelect('unmapped-campaign-status-sel', 'Campaign Status', campaignStatusFilterOptions),
    },
    {
      name: 'externalCampaignId',
      label: 'External Campaign Name (ID)',
      type: 'multiple',
      placement: 'banner',
      options: externalCampaignOptions,
      renderControl: makeMultiSelect(
        'unmapped-ext-campaign-sel',
        'External Campaign Name (ID)',
        externalCampaignOptions,
      ),
    },
    {
      name: 'advertiserMapping',
      label: 'Advertiser mapping',
      type: 'multiple',
      placement: 'banner',
      options: mappingStateOptions,
      renderControl: makeMultiSelect('unmapped-advertiser-mapping-sel', 'Advertiser mapping', mappingStateOptions),
    },
    {
      name: 'campaignMapping',
      label: 'Campaign Mapping',
      type: 'multiple',
      placement: 'banner',
      options: mappingStateOptions,
      renderControl: makeMultiSelect('unmapped-campaign-mapping-sel', 'Campaign Mapping', mappingStateOptions),
    },
    {
      name: 'invoiceMapping',
      label: 'Invoice Mapping',
      type: 'multiple',
      placement: 'banner',
      options: mappingStateOptions,
      renderControl: makeMultiSelect('unmapped-invoice-mapping-sel', 'Invoice Mapping', mappingStateOptions),
    },
    {
      name: 'scope',
      label: 'Scope',
      type: 'single',
      placement: 'header',
      showInTags: false,
      renderControl: ({ value, setValue }) => {
        const current: SegmentedValue = typeof value === 'string' && value.length > 0 ? value : 'my'
        return (
          <ToggleTab
            value={current}
            onChange={(v: SegmentedValue) => setValue(String(v))}
            options={[
              { label: <span id='unmapped-scope-my-txt'>My Campaigns</span>, value: 'my' },
              { label: <span id='unmapped-scope-all-txt'>All Campaigns</span>, value: 'all' },
              { label: <span id='unmapped-scope-unmapped-txt'>Unmapped Advertisers</span>, value: 'unmappedAdv' },
            ]}
          />
        )
      },
    },
  ]

  // Campaign Setup / Unmapped Campaigns open on "My Campaigns" by default.
  const initialFilters: Partial<Record<keyof UnmappedCampaign | 'scope', FilterValue>> = { scope: 'my' }

  const queryFn = async (
    filters?: Partial<Record<keyof UnmappedCampaign, FilterValue>>,
    pagination?: TablePaginationConfig,
  ): Promise<{ data: UnmappedCampaign[]; total: number }> => {
    const f = (filters ?? {}) as Record<string, FilterValue | undefined>

    const platforms = asArray(f.platform)
    const advertisers = asArray(f.advertiserBid)
    const extAdvertisers = asArray(f.externalAdvertiserId)
    const extCampaigns = asArray(f.externalCampaignId)
    const advMapping = asArray(f.advertiserMapping)
    const campMapping = asArray(f.campaignMapping)
    const invMapping = asArray(f.invoiceMapping)
    const campStatus = asArray(f.campaignStatus)
    const scope = (typeof f.scope === 'string' ? f.scope : 'my') as ScopeValue
    const search = typeof f.search === 'string' ? f.search.trim().toLowerCase() : ''

    const filtered = rows.filter(c => {
      // Scoped (advertiser tab): rows are already limited to this advertiser. The only controls
      // are the Platform ToggleTab + the table Search — skip the whole banner/review/mode pipeline.
      if (scoped) {
        if (!(scopedPlatform === 'all' || c.platform === scopedPlatform)) return false
        if (search) {
          const haystack = [
            c.platform,
            c.advertiserName,
            c.advertiserBid,
            c.externalAdvertiserName,
            c.externalAdvertiserId,
            c.externalCampaignName,
            c.externalCampaignId,
          ]
            .join(' ')
            .toLowerCase()
          if (!haystack.includes(search)) return false
        }
        return true
      }
      if (platforms.length > 0 && !platforms.includes(c.platform)) return false
      if (advertisers.length > 0 && !advertisers.includes(c.advertiserBid)) return false
      if (extAdvertisers.length > 0 && !extAdvertisers.includes(c.externalAdvertiserId)) return false
      if (extCampaigns.length > 0 && !extCampaigns.includes(c.externalCampaignId)) return false
      if (advMapping.length > 0 && !advMapping.includes(c.advertiserMapping)) return false
      if (campMapping.length > 0 && !campMapping.includes(c.campaignMapping)) return false
      if (invMapping.length > 0 && !invMapping.includes(c.invoiceMapping)) return false
      // Campaign status filter: live/pause/unknown from data; 'ignored' matches the ignored flag.
      // Selected values combine with OR.
      if (campStatus.length > 0) {
        const wantIgnored = campStatus.includes('ignored')
        const wantStatuses = campStatus.filter(v => v !== 'ignored')
        const matchIgnored = wantIgnored && !!c.ignored
        const matchStatus = wantStatuses.length > 0 && wantStatuses.includes(campaignStatusOf(c))
        if (!(matchIgnored || matchStatus)) return false
      }

      // Scope rules (a multi-advertiser row counts as mapped — the external advertiser IS mapped,
      // just to several ATAP advertisers — so it belongs in All / My, not Unmapped Advertisers):
      //  - My Campaigns: advertiser mapped (or multi) AND followed.
      //  - All Campaigns: advertiser mapped (or multi), followed or not.
      //  - Unmapped Advertisers: advertiser NOT mapped and NOT multi.
      const advMapped = c.advertiserMapping === 'mapped' || isMultipleAdvertisers(c)
      if (scope === 'my' && !(advMapped && rowIsFollowed(c))) return false
      if (scope === 'all' && !advMapped) return false
      if (scope === 'unmappedAdv' && advMapped) return false

      // All Campaigns: mapping-mode background filter (single-select, deselectable).
      //  - null:     no mode -> show everything (mapped + unmapped), no filter applied
      //  - all:      unmapped in campaign OR offers OR invoice
      //  - campaign: unmapped in campaign OR offers
      //  - invoice:  unmapped in invoice
      if (isAll) {
        const needsCampaign = c.campaignMapping === 'unmapped' || c.offersMapping === 'unmapped'
        const needsInvoice = c.invoiceMapping === 'unmapped'
        if (mappingMode === 'campaign' && !needsCampaign) return false
        if (mappingMode === 'invoice' && !needsInvoice) return false
        if (mappingMode === 'all' && !(needsCampaign || needsInvoice)) return false
      }

      // All Campaigns mapping filter — only the ACTIVE review view filters (mutually exclusive).
      if (isAll && reviewView === 'icons') {
        // Per-column multi-select header filter. A column with a non-empty selection contributes a
        // match when the row's status for that column is in the selected set. OR across columns:
        // the row passes if it matches ANY column that has a selection. (No selections anywhere ->
        // no filter.)
        const activeCols = MAPPING_COL_KEYS.filter(k => colVisible[k] !== false && colStatusFilter[k].size > 0)
        if (activeCols.length > 0) {
          const colMatches = (k: MappingColKey): boolean => {
            const sel = colStatusFilter[k]
            const st = rowColStatus(c, k)
            // 'Unmapped' folds in the grey-cross (blocked / gated / N-A): anything not mapped.
            if (sel.has('unmapped') && (st === 'unmapped' || st === 'blocked')) return true
            return sel.has(st)
          }
          const anyMatch = activeCols.some(colMatches)
          if (!anyMatch) return false
        }
      }
      if (isAll && isChartView && sentenceStatus !== 'all') {
        // Sentence bar: "show campaigns that have settings [status] in [any|all] of [the mappings]".
        //  - Simple chart: no per-dimension chips — evaluate ALL mapping dimensions.
        //  - Advanced chart: only the selected dimension chips.
        //  - N/A offers (WIHP/DerbySoft): never count as 'unmapped'; count as 'mapped'
        //    (you can't map what doesn't exist — so N/A shouldn't block a 'fully mapped' AND).
        const dimSatisfies = (k: MappingDimKey): boolean => {
          const na = k === 'offersMapping' && !platformSupportsOffers(c.platform)
          const val = k === 'obaMapping' ? obaMappingOf(c) : c[k]
          if (sentenceStatus === 'unmapped') return na ? false : val === 'unmapped'
          return na ? true : val === 'mapped'
        }
        const dims = (isAdvancedChart ? Array.from(sentenceDims) : MAPPING_DIMS.map(d => d.key)).filter(k => colVisible[k] !== false)
        // Advanced uses the toggled connector; simple uses the smart default (unmapped -> any/OR,
        // mapped -> all/AND) shown as bold static text.
        const effectiveConnector = isAdvancedChart ? sentenceConnector : (sentenceStatus === 'mapped' ? 'and' : 'or')
        if (dims.length > 0) {
          const pass = effectiveConnector === 'and' ? dims.every(dimSatisfies) : dims.some(dimSatisfies)
          if (!pass) return false
        }
      }

      // All Campaigns: Advanced attribute filters (AND). Each active field must match (by value).
      if (isAll) {
        for (const af of ADVANCED_FIELDS) {
          const sel = advancedValues[af.key] ?? []
          if (sel.length > 0) {
            const v = (c[af.field] as string | undefined) || ''
            if (!sel.includes(v)) return false
          }
        }
      }

      if (search) {
        const haystack = [
          c.platform,
          c.advertiserName,
          c.advertiserBid,
          c.externalAdvertiserName,
          c.externalAdvertiserId,
          c.externalCampaignName,
          c.externalCampaignId,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(search)) return false
      }

      return true
    })

    // Ignored (unmapped-advertiser) campaigns sink to the bottom of the list; relative order is
    // otherwise preserved (stable sort).
    const ordered = filtered
      .map((c, i) => ({ c, i }))
      // The Londoner Hotel (followed demo advertiser) always sits at the top.
      .sort(
        (a, b) =>
          Number(!!a.c.ignored) - Number(!!b.c.ignored) ||
          Number(b.c.advertiserBid === LONDONER.bpid) - Number(a.c.advertiserBid === LONDONER.bpid) ||
          a.i - b.i,
      )
      .map(x => x.c)

    // Expose the full filtered set (all pages) so the chart summary can mirror the table.
    setDisplayedRows(ordered)

    const pageSize = pagination?.pageSize ?? 10
    const current = pagination?.current ?? 1
    const start = (current - 1) * pageSize
    const paged = ordered.slice(start, start + pageSize)

    return { data: paged, total: ordered.length }
  }

  // In All Campaigns mode the mapping dropdowns are replaced by the Mode pills, so hide them from
  // the Details filter banner. (Keeps platform / advertiser / platform advertiser / external
  // campaign + scope.)
  const HIDDEN_IN_ALL = new Set(['advertiserMapping', 'campaignMapping', 'invoiceMapping'])
  const displayFilterItems = isAll
    ? filterItems.filter(fi => !HIDDEN_IN_ALL.has(String(fi.name)))
    : filterItems

  // Mode pills (single-select) — rendered in the table title row for All Campaigns.
  const modePills = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '4px 0 12px' }}>
      <span style={{ fontSize: 12, color: colors.cloud_80 }}>Mode:</span>
      {MAPPING_MODES.map(m => {
        const on = mappingMode === m.key
        return (
          <button
            key={m.key}
            type='button'
            id={`all-campaigns-mode-${m.key}`}
            onClick={() => selectMode(m.key)}
            title={on ? 'Click to clear this mode (show all campaigns)' : m.label}
            aria-pressed={on}
            style={{
              border: `1px solid ${on ? colors.sky_60 : colors.cloud_40}`,
              background: on ? colors.sky_60 : colors.cloud_0,
              color: on ? colors.cloud_0 : colors.cloud_80,
              borderRadius: 9999,
              padding: '4px 14px',
              fontSize: 12,
              fontWeight: on ? 600 : 400,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {m.label}
            {on ? <span aria-hidden style={{ fontSize: 13, lineHeight: 1, opacity: 0.85 }}>&times;</span> : null}
          </button>
        )
      })}
      {mappingMode === null ? (
        <span style={{ fontSize: 12, color: colors.cloud_70, fontStyle: 'italic' }}>
          Showing all campaigns (mapped + unmapped)
        </span>
      ) : null}
    </div>
  )

  // Advanced filters expander — rendered inside the filter card (bottom-right, below the filter
  // inputs and above the active-filter tags / mode selection). All Campaigns only.
  const advancedCount = Object.values(advancedValues).reduce((n, v) => n + (v?.length ? 1 : 0), 0)
  const advancedFilters = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
      <Button
        id='all-campaigns-advanced-toggle'
        variant='link'
        onClick={() => setAdvancedOpen(o => !o)}
        aria-expanded={advancedOpen}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Advanced filters{advancedCount ? ` (${advancedCount})` : ''}
          <Icon name={advancedOpen ? 'chevronDown' : 'chevronRight'} width={12} height={12} />
        </span>
      </Button>
      {advancedOpen && (
        <div
          style={{
            width: '100%',
            display: 'grid',
            // Match the default filter card: max 6 filters per row.
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: 12,
            padding: '12px 0 4px',
          }}
        >
          {ADVANCED_FIELDS.map(af => (
            <Select
              key={af.key}
              id={`all-campaigns-adv-${af.key}`}
              label={af.label}
              mode='multiple'
              showSearch
              placeholder='Any'
              options={advancedOptions(af.field)}
              value={advancedValues[af.key] ?? []}
              onChange={(v: FilterValue) => setAdvanced(af.key, asArray(v))}
            />
          ))}
        </div>
      )}
    </div>
  )

  const pageTitle = scoped ? 'Campaigns' : isAll ? 'Campaign Setup' : 'Unmapped Campaigns'

  return (
    <UnmappedCampaignsWrapper>
      {!scoped && <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: pageTitle }]} />}
      <TableWithFilterBanner<UnmappedCampaign>
        id='unmapped-campaign-tbl'
        cellsIdPrefix='unmapped-campaign'
        rowKey='id'
        ref={tableRef}
        sectionTitle={scoped ? undefined : pageTitle}
        titleButtons={
          scoped || isReadOnly ? undefined : (
            <Button
              id='campaign-setup-create-with-max-btn'
              variant='solid'
              size='small'
              // Opens the Max panel next to this page with the first step of the campaign-creation flow:
              // pick the advertiser (followed list or full dropdown), then Confirm.
              onClick={() => {
                startAdvertiserSelection()
                navigate(`${location.pathname}?panel=amadeus-max`)
              }}
            >
              Create campaigns with Max
            </Button>
          )
        }
        tableTitleContent={undefined}
        showFilterBanner={!scoped}
        belowControls={!scoped && isAll && isChartView ? chartControls : undefined}
        bannerFooter={!scoped && isAll ? advancedFilters : undefined}
        columns={displayColumns}
        filterItems={scoped ? [] : displayFilterItems}
        initialFilters={initialFilters as Partial<Record<keyof UnmappedCampaign, FilterValue>>}
        filterMode='server'
        queryFn={queryFn}
        tableSearch={{ show: true, placeholder: 'Search' }}
        tableCustomControls={scoped ? scopedPlatformTabs : undefined}
        searchAdornment={scoped ? scopedAdornment : isAll ? allCampaignsAdornment : undefined}
        tableScrollX={scrollX}
        rowClassName={(record: UnmappedCampaign) => (record.ignored ? 'mh-ignored-row' : '')}
        tableTitle={`${pageTitle} Overview`}
      />
      <CampaignSummaryDrawer campaign={summaryCampaign} onClose={() => setSummaryCampaign(null)} />
      <MappingDrawer
        open={drawerOpen}
        mappingType={activeType}
        campaign={activeCampaign}
        readOnly={isReadOnly}
        onClose={closeMapping}
        onSave={handleMappingSave}
      />
      <OffersDrawer open={offersOpen} campaign={offersCampaign} readOnly={isReadOnly} onClose={closeOffers} />
      {colMenuPopover}
    </UnmappedCampaignsWrapper>
  )
}

export function AllCampaignsPage() {
  return <UnmappedCampaignsPage mode='all' />
}

/** The Campaign Setup table scoped to a single advertiser (Advertiser Details > Campaigns tab):
 *  that advertiser's campaigns (mapped + unmapped) with only a Platform ToggleTab, Edit columns
 *  kept (Advertiser BPID off by default), no breadcrumb / filter banner / search. */
export function AdvertiserCampaignsTable({ advertiserBid }: { advertiserBid: string }) {
  return <UnmappedCampaignsPage mode='all' advertiserBid={advertiserBid} />
}

export default UnmappedCampaignsPage
