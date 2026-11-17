import { useRef, useState } from 'react'
import { Breadcrumb, Button, DropdownMenu, Icon, IconButton, Input, Modal, Pagination, Select, Table, Text, ToggleTab, colors } from '@amadeus/react-design-factory'
import type { ColumnType, TablePaginationConfig } from 'antd/es/table'
import type { SegmentedValue } from 'antd/es/segmented'
import type { ItemType } from 'antd/es/menu/interface'
import type {
  FilterItem,
  FilterValue,
} from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import TableWithFilterBanner from '@mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import Tooltip from 'antd/es/tooltip'
import {
  mappedCampaigns,
  platformOptions,
  advertiserOptions,
  tacticOptions,
  languageOptions,
  subTypeOptions,
  statusOptions,
  campaignStatusOptions,
  reportingPlatformOptions,
  type MappedCampaign,
  type MappingStatus,
  type CampaignStatus,
} from './mockData/campaigns'
import type { UnmappedCampaign } from './mockData/unmappedCampaigns'
import { platformSupportsOffers, unmappedCampaigns, isMultipleAdvertisers, platformLabel, rowIsFollowed } from './mockData/unmappedCampaigns'
import { LONDONER } from '../../shared/londonerHotel'
import { londonerFirst } from '../../shared/londonerFollowStore'
import MappingDrawer, { type MappingType } from './MappingDrawer'
import OffersDrawer from './OffersDrawer'
import QuickCampaignsDrawer from './QuickCampaignsDrawer'
import {
  CampaignsWrapper,
  TwoLineCell,
  SubText,
  NameLink,
  NameCell,
  StatusDot,
  StatusIconButton,
  StatusIconDisabled,
  OfferDotsBtn,
  OfferDotCount,
  ScopedHeaderRow,
  ScopedFilterRow,
  PlaceholderNameLink,
} from './Campaigns.styled'

type ScopeValue = 'my' | 'all'

const campaignStatusConfig: Record<CampaignStatus, { color: string; label: string }> = {
  scheduled: { color: colors.violet_60, label: 'Scheduled' },
  live: { color: colors.forest_60, label: 'Live' },
  pause: { color: colors.pumpkin_60, label: 'Pause' },
  complete: { color: colors.sky_60, label: 'Complete' },
  unknown: { color: colors.cloud_50, label: 'Unknown' },
}

function asArray(value: FilterValue | undefined): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.length > 0) return [value]
  return []
}

// Resolve a stored dimension string (which may be a label like 'Paid Search' or already a value
// like 'paid-search') to the Select option VALUE the drawer expects.
function toOptionValue(opts: { label: string; value: string }[], stored: string): string | undefined {
  if (!stored) return undefined
  const byValue = opts.find(o => o.value === stored)
  if (byValue) return byValue.value
  const byLabel = opts.find(o => o.label.toLowerCase() === stored.toLowerCase())
  if (byLabel) return byLabel.value
  // Fall back to the raw stored string so an unknown value still displays.
  return stored
}

// Adapt a mapped campaign into the shape MappingDrawer reads (advertiser already mapped).
function toDrawerCampaign(c: MappedCampaign): UnmappedCampaign {
  return {
    id: c.id,
    platform: c.platform,
    advertiserName: c.advertiserName,
    advertiserBid: c.advertiserBid,
    externalAdvertiserName: c.advertiserName,
    externalAdvertiserId: c.advertiserBid,
    externalCampaignName: c.campaignName,
    externalCampaignId: c.id,
    advertiserMapping: 'mapped',
    campaignMapping: 'mapped',
    invoiceMapping: 'unmapped',
    offersMapping: 'unmapped',
    isFollowed: c.isFollowed,
    expandable: false,
    // Prefill the editor with this campaign's saved dimensions (it IS mapped).
    prefill: {
      tactic: toOptionValue(tacticOptions, c.tactic),
      subType: toOptionValue(subTypeOptions, c.subType),
      language: toOptionValue(languageOptions, c.language),
    },
  }
}

interface CampaignsTableProps {
  /** When set, scope the table to a single advertiser (by BPID) and hide the advertiser filter
   *  + My/All scope tabs. Used by the Advertiser Summary > Campaigns tab. */
  advertiserBid?: string
  /** Show the page breadcrumb (module page only; embedded tab omits it). */
  showBreadcrumb?: boolean
}

export function CampaignsTable({ advertiserBid, showBreadcrumb = false }: CampaignsTableProps) {
  // Read-only role (not admin/standard): view-only — drawers open read-only, no edit/delete (UX-1.4).
  const { isAdmin, isStandard } = useAuth()
  const isReadOnly = !(isAdmin || isStandard)
  const scoped = !!advertiserBid
  const tableRef = useRef<{ refetchWithFilters: () => void } | null>(null)

  // Prototype-local list so a delete can remove a row. When scoped to an advertiser, pre-filter.
  const [rows, setRows] = useState<MappedCampaign[]>(
    advertiserBid ? mappedCampaigns.filter(c => c.advertiserBid === advertiserBid) : mappedCampaigns,
  )
  const [deleteTarget, setDeleteTarget] = useState<MappedCampaign | null>(null)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeType, setActiveType] = useState<MappingType | null>(null)
  const [activeCampaign, setActiveCampaign] = useState<UnmappedCampaign | null>(null)
  const [editTarget, setEditTarget] = useState<MappedCampaign | null>(null)
  const [offersOpen, setOffersOpen] = useState(false)
  const [offersCampaign, setOffersCampaign] = useState<UnmappedCampaign | null>(null)
  const [quickOpen, setQuickOpen] = useState(false)
  // Pagination for the lightweight scoped (advertiser-tab) table (module page uses its own).
  const [scopedPage, setScopedPage] = useState(1)
  const scopedPageSize = 10
  // Platform filter (ToggleTab) for the scoped tab: 'all' or a specific platform.
  const [scopedPlatform, setScopedPlatform] = useState<string>('all')

  const openEdit = (c: MappedCampaign) => {
    setEditTarget(c)
    setActiveCampaign(toDrawerCampaign(c))
    setActiveType('campaign')
    setDrawerOpen(true)
  }

  const openOffers = (c: MappedCampaign) => {
    setOffersCampaign(toDrawerCampaign(c))
    setOffersOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setActiveType(null)
    setActiveCampaign(null)
    setEditTarget(null)
  }
  const closeOffers = () => {
    setOffersOpen(false)
    setOffersCampaign(null)
  }

  const kebabItems = (c: MappedCampaign): ItemType[] => [
    { key: 'edit', label: isReadOnly ? 'View mapping' : 'Edit mapping', onClick: () => openEdit(c) },
    { key: 'offers', label: isReadOnly ? 'View offers' : 'Offers', onClick: () => openOffers(c) },
    // Delete is offered for ANY campaign regardless of status (Req 9, revised) — never for read-only.
    // The confirmation dialog states explicitly when the campaign has offers or is Green.
    ...(!isReadOnly
      ? [{ key: 'delete', label: 'Delete mapping', danger: true, onClick: () => setDeleteTarget(c) }]
      : []),
  ]

  const columns: ColumnType<MappedCampaign>[] = [
    {
      title: 'Mapping Status',
      dataIndex: 'mappingStatus',
      key: 'mappingStatus',
      width: '8%',
      align: 'center',
      render: (status: MappingStatus) => {
        // Solid icons: green check = DWI-confirmed; grey X = saved/awaiting backend; red X = 48h elapsed.
        const cfg =
          status === 'green'
            ? { name: 'checkCircleSolid' as const, color: colors.forest_60, label: 'Confirmed' }
            : status === 'red'
              ? { name: 'timesCircleSolid' as const, color: colors.crimson_60, label: 'Not confirmed after 48h' }
              : { name: 'timesCircleSolid' as const, color: colors.cloud_50, label: 'Awaiting backend confirmation' }
        return (
          <Tooltip title={`Mapping status: ${cfg.label}`}>
            <StatusIconDisabled aria-label={`Mapping status: ${cfg.label}`}>
              <Icon name={cfg.name} color={cfg.color} width={18} height={18} />
            </StatusIconDisabled>
          </Tooltip>
        )
      },
    },
    {
      title: 'Advertiser (BPID)',
      dataIndex: 'advertiserBid',
      key: 'advertiserBid',
      width: '20%',
      ellipsis: true,
      render: (_: unknown, record: MappedCampaign) => (
        <TwoLineCell>
          <span>{record.advertiserName}</span>
          <SubText>{record.advertiserBid}</SubText>
        </TwoLineCell>
      ),
    },
    { title: 'Platform', dataIndex: 'platform', key: 'platform', width: '10%', render: (platform: string) => <span>{platformLabel(platform)}</span> },
    {
      title: 'Reporting Platform',
      dataIndex: 'reportingPlatform',
      key: 'reportingPlatform',
      width: '12%',
      render: (rp: string) => <span>{rp}</span>,
    },
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      width: '26%',
      ellipsis: true,
      render: (_: unknown, record: MappedCampaign) => {
        const cs = campaignStatusConfig[record.campaignStatus]
        return (
          <NameCell>
            <Tooltip title={`Campaign Status in Platform : ${cs.label}`}>
              <StatusDot color={cs.color} aria-label={`Campaign status: ${cs.label}`} />
            </Tooltip>
            <NameLink type='button' onClick={() => openEdit(record)}>
              {record.campaignName}
            </NameLink>
          </NameCell>
        )
      },
    },
    { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', width: '12%' },
    { title: 'Sub-Type', dataIndex: 'subType', key: 'subType', width: '12%' },
    { title: 'Language', dataIndex: 'language', key: 'language', width: '8%' },
    {
      title: 'Offers',
      dataIndex: 'offersMapping',
      key: 'offersMapping',
      width: '8%',
      align: 'center',
      render: (state: 'mapped' | 'unmapped', record: MappedCampaign) => {
        // WIHP / DerbySoft: offer mapping not available → grey ban.
        if (!platformSupportsOffers(record.platform)) {
          return (
            <Tooltip title='Offer mapping does not exist for this platform'>
              <StatusIconDisabled aria-label='Offers: not applicable'>
                <Icon name='ban' color={colors.cloud_50} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        // Offers require a Green (DWI-confirmed) campaign (Req 8.1/8.3). Grey/Red → disabled grey X.
        if (record.mappingStatus !== 'green') {
          return (
            <Tooltip title='Campaign must be confirmed (Green) before offers can be mapped'>
              <StatusIconDisabled aria-label='Offers: unavailable until the campaign is confirmed'>
                <Icon name='timesCircle' color={colors.cloud_50} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        // Green campaign → 3-dot rollup. With offers: counts; without offers: a dash per status.
        const c = record.offerCounts
        const total = c.green + c.grey + c.red
        const hasOffers = total > 0
        return (
          <Tooltip
            title={
              hasOffers
                ? `Offers: ${c.green} confirmed · ${c.grey} awaiting · ${c.red} attention — click to view/edit`
                : 'No offers yet — click to map'
            }
          >
            <OfferDotsBtn
              type='button'
              aria-label={hasOffers ? `View offers for ${record.campaignName}` : `Map offers for ${record.campaignName}`}
              onClick={() => openOffers(record)}
            >
              <OfferDotCount>
                <StatusDot color={colors.forest_60} /> {c.green}
              </OfferDotCount>
              <OfferDotCount>
                <StatusDot color={colors.cloud_50} /> {c.grey}
              </OfferDotCount>
              <OfferDotCount>
                <StatusDot color={colors.crimson_60} /> {c.red}
              </OfferDotCount>
            </OfferDotsBtn>
          </Tooltip>
        )
      },
    },
    {
      key: 'actions',
      align: 'center',
      width: '4%',
      render: (_: unknown, record: MappedCampaign) => (
        <DropdownMenu items={kebabItems(record)} menuType='kebab'>
          <IconButton id={`campaign-${record.id}-actions-btn`} iconName='ellipsisVertical' color={colors.cloud_80} />
        </DropdownMenu>
      ),
    },
  ]

  const makeMultiSelect = (
    id: string,
    label: string,
    options: { label: string; value: string }[],
  ): FilterItem<MappedCampaign>['renderControl'] =>
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

  const allFilterItems: FilterItem<MappedCampaign>[] = [
    // Filters mirror the column order: Mapping Status · Advertiser (BPID) · Platform ·
    // Campaign Name · Tactic · Sub-Type · Language. Campaign Name is a free-text input.
    {
      name: 'mappingStatus',
      label: 'Mapping Status',
      type: 'multiple',
      placement: 'banner',
      options: statusOptions,
      renderControl: makeMultiSelect('campaign-mapping-status-sel', 'Mapping Status', statusOptions),
    },
    {
      name: 'advertiserBid',
      label: 'Advertiser (BPID)',
      type: 'multiple',
      placement: 'banner',
      options: advertiserOptions,
      renderControl: makeMultiSelect('campaign-advertiser-sel', 'Advertiser (BPID)', advertiserOptions),
    },
    {
      name: 'platform',
      label: 'Platform',
      type: 'multiple',
      placement: 'banner',
      options: platformOptions,
      renderControl: makeMultiSelect('campaign-platform-sel', 'Platform', platformOptions),
    },
    {
      name: 'reportingPlatform',
      label: 'Reporting Platform',
      type: 'multiple',
      placement: 'banner',
      options: reportingPlatformOptions,
      renderControl: makeMultiSelect('campaign-reporting-platform-sel', 'Reporting Platform', reportingPlatformOptions),
    },
    {
      name: 'campaignName',
      label: 'Campaign Name',
      placement: 'banner',
      renderControl: ({ value, setValue }) => (
        <Input
          id='campaign-name-inp'
          label='Campaign Name'
          placeholder='Campaign Name'
          value={typeof value === 'string' ? value : ''}
          onChange={e => setValue(e.target.value)}
        />
      ),
    },
    {
      name: 'campaignStatus',
      label: 'Campaign Status',
      type: 'multiple',
      placement: 'banner',
      options: campaignStatusOptions,
      renderControl: makeMultiSelect('campaign-status-sel', 'Campaign Status', campaignStatusOptions),
    },
    {
      name: 'tactic',
      label: 'Tactic',
      type: 'multiple',
      placement: 'banner',
      options: tacticOptions,
      renderControl: makeMultiSelect('campaign-tactic-sel', 'Tactic', tacticOptions),
    },
    {
      name: 'subType',
      label: 'Sub-Type',
      type: 'multiple',
      placement: 'banner',
      options: subTypeOptions,
      renderControl: makeMultiSelect('campaign-subtype-sel', 'Sub-Type', subTypeOptions),
    },
    {
      name: 'language',
      label: 'Language',
      type: 'multiple',
      placement: 'banner',
      options: languageOptions,
      renderControl: makeMultiSelect('campaign-language-sel', 'Language', languageOptions),
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
              { label: <span id='campaign-scope-my-txt'>My Campaigns</span>, value: 'my' },
              { label: <span id='campaign-scope-all-txt'>All Campaigns</span>, value: 'all' },
            ]}
          />
        )
      },
    },
  ]

  // Scoped (advertiser) view: no filter banner at all — the tab already shows exactly this
  // advertiser's campaigns (keep only the table search + the Map Campaign action).
  const filterItems = scoped ? [] : allFilterItems

  const initialFilters: Partial<Record<keyof MappedCampaign | 'scope', FilterValue>> = scoped
    ? { scope: 'all' }
    : { scope: 'my' }

  const queryFn = async (
    filters?: Partial<Record<keyof MappedCampaign, FilterValue>>,
    pagination?: TablePaginationConfig,
  ): Promise<{ data: MappedCampaign[]; total: number }> => {
    const f = (filters ?? {}) as Record<string, FilterValue | undefined>
    const platforms = asArray(f.platform)
    const reportingPlatforms = asArray(f.reportingPlatform)
    const advertisers = asArray(f.advertiserBid)
    const tactics = asArray(f.tactic)
    const subTypes = asArray(f.subType)
    const campStatuses = asArray(f.campaignStatus)
    const mapStatuses = asArray(f.mappingStatus)
    const languages = asArray(f.language)
    const nameText = typeof f.campaignName === 'string' ? f.campaignName.trim().toLowerCase() : ''
    const scope = (scoped ? 'all' : typeof f.scope === 'string' ? f.scope : 'my') as ScopeValue
    const search = typeof f.search === 'string' ? f.search.trim().toLowerCase() : ''

    const filtered = rows.filter(c => {
      if (platforms.length > 0 && !platforms.includes(c.platform)) return false
      if (reportingPlatforms.length > 0 && !reportingPlatforms.includes(c.reportingPlatform)) return false
      if (advertisers.length > 0 && !advertisers.includes(c.advertiserBid)) return false
      if (tactics.length > 0 && !tactics.includes(c.tactic)) return false
      if (subTypes.length > 0 && !subTypes.includes(c.subType)) return false
      if (campStatuses.length > 0 && !campStatuses.includes(c.campaignStatus)) return false
      if (mapStatuses.length > 0 && !mapStatuses.includes(c.mappingStatus)) return false
      if (languages.length > 0 && !languages.includes(c.language)) return false
      if (nameText && !c.campaignName.toLowerCase().includes(nameText)) return false
      if (scope === 'my' && !rowIsFollowed(c)) return false
      if (search) {
        const haystack = [c.platform, c.campaignName, c.advertiserName, c.advertiserBid, c.tactic, c.subType, c.language]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(search)) return false
      }
      return true
    })

    // The Londoner Hotel (followed demo advertiser) always sits at the top.
    const ordered = londonerFirst(filtered, c => c.advertiserBid === LONDONER.bpid)
    const pageSize = pagination?.pageSize ?? 10
    const current = pagination?.current ?? 1
    const start = (current - 1) * pageSize
    return { data: ordered.slice(start, start + pageSize), total: ordered.length }
  }

  const titleButtons = isReadOnly ? null : (
    <Button
      id='campaign-map-btn'
      size='small'
      variant={scoped ? 'outlined' : 'solid'}
      onClick={() => setQuickOpen(true)}
    >
      Map Campaign
    </Button>
  )

  // Shared editors (drawers + delete modal) used by both the module page and the scoped tab.
  const drawers = (
    <>
      <MappingDrawer
        open={drawerOpen}
        mappingType={activeType}
        campaign={activeCampaign}
        readOnly={isReadOnly}
        onClose={closeDrawer}
        onSave={closeDrawer}
        onDelete={
          !isReadOnly && editTarget
            ? () => {
                const target = editTarget
                closeDrawer()
                setDeleteTarget(target)
              }
            : undefined
        }
      />
      <OffersDrawer open={offersOpen} campaign={offersCampaign} readOnly={isReadOnly} onClose={closeOffers} />
      <Modal
        idPrefix='campaign-delete'
        title='Delete campaign mapping'
        open={!!deleteTarget}
        okText='Delete'
        cancelText='Cancel'
        onCancel={() => setDeleteTarget(null)}
        onOk={() => {
          if (deleteTarget) {
            setRows(prev => prev.filter(r => r.id !== deleteTarget.id))
            setDeleteTarget(null)
            // Only the module page has the TableWithFilterBanner ref to refetch.
            if (!scoped) setTimeout(() => tableRef.current?.refetchWithFilters(), 0)
          }
        }}
      >
        {(() => {
          if (!deleteTarget) return null
          const counts = deleteTarget.offerCounts
          const hasOffers =
            deleteTarget.offersMapping === 'mapped' || counts.green + counts.grey + counts.red > 0
          const isGreen = deleteTarget.mappingStatus === 'green'
          return (
            <>
              Delete the mapping for <strong>{deleteTarget.campaignName}</strong>? This removes the
              campaign mapping.
              {hasOffers && (
                <>
                  {' '}
                  This campaign has <strong>mapped offers</strong>, which will also be deleted.
                </>
              )}
              {isGreen && (
                <>
                  {' '}
                  This campaign is <strong>Green</strong> (DWI-confirmed) — deleting it removes a
                  confirmed mapping.
                </>
              )}
            </>
          )
        })()}
      </Modal>
      <QuickCampaignsDrawer open={quickOpen} readOnly={isReadOnly} onClose={() => setQuickOpen(false)} />
    </>
  )

  // Scoped row = a mapped campaign OR a still-unmapped (Step-1-done) campaign for this advertiser.
  type ScopedRow = { kind: 'mapped'; src: MappedCampaign } | { kind: 'unmapped'; src: UnmappedCampaign }

  const DASH = '\u2013'

  // Open the mapping drawer for a still-unmapped campaign (campaign mapping only — advertiser
  // is already mapped). Reuses the Unmapped flow's drawer.
  const openUnmappedEdit = (c: UnmappedCampaign) => {
    setActiveCampaign(c)
    setActiveType('campaign')
    setDrawerOpen(true)
  }

  const scopedColumns: ColumnType<ScopedRow>[] = [
    {
      title: 'Mapping Status',
      key: 'mappingStatus',
      width: '8%',
      align: 'center',
      render: (_: unknown, row: ScopedRow) => {
        if (row.kind === 'unmapped') {
          return (
            <Tooltip title='Campaign mapping: Unmapped — click the name to map'>
              <StatusIconDisabled aria-label='Campaign mapping: unmapped'>
                <Icon name='timesCircle' color={colors.crimson_60} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        const status = row.src.mappingStatus
        const cfg =
          status === 'green'
            ? { name: 'checkCircleSolid' as const, color: colors.forest_60, label: 'Confirmed' }
            : status === 'red'
              ? { name: 'timesCircleSolid' as const, color: colors.crimson_60, label: 'Not confirmed after 48h' }
              : { name: 'timesCircleSolid' as const, color: colors.cloud_50, label: 'Awaiting backend confirmation' }
        return (
          <Tooltip title={`Mapping status: ${cfg.label}`}>
            <StatusIconDisabled aria-label={`Mapping status: ${cfg.label}`}>
              <Icon name={cfg.name} color={cfg.color} width={18} height={18} />
            </StatusIconDisabled>
          </Tooltip>
        )
      },
    },
    { title: 'Platform', key: 'platform', width: '10%', render: (_: unknown, row: ScopedRow) => platformLabel(row.src.platform) },
    {
      title: 'Reporting Platform',
      key: 'reportingPlatform',
      width: '12%',
      render: (_: unknown, row: ScopedRow) => (row.kind === 'mapped' ? row.src.reportingPlatform : DASH),
    },
    {
      title: 'Campaign Name',
      key: 'campaignName',
      width: '28%',
      ellipsis: true,
      render: (_: unknown, row: ScopedRow) => {
        if (row.kind === 'unmapped') {
          // No internal Campaign Name yet (that's the generated Naming Convention String produced
          // on mapping). Show the EXTERNAL campaign name + ID as a placeholder, click to map.
          const extName =
            row.src.externalCampaignName === '-' ? row.src.externalAdvertiserName : row.src.externalCampaignName
          const extId = row.src.externalCampaignId === '-' ? row.src.externalAdvertiserId : row.src.externalCampaignId
          return (
            <NameCell>
              <Tooltip title='Not yet mapped — external campaign (click to map)'>
                <StatusDot color={colors.crimson_60} aria-label='Unmapped' />
              </Tooltip>
              <TwoLineCell>
                <PlaceholderNameLink type='button' onClick={() => openUnmappedEdit(row.src)}>
                  {extName}
                </PlaceholderNameLink>
                <SubText>{extId}</SubText>
              </TwoLineCell>
            </NameCell>
          )
        }
        const cs = campaignStatusConfig[row.src.campaignStatus]
        const c = row.src
        return (
          <NameCell>
            <Tooltip title={`Campaign Status in Platform : ${cs.label}`}>
              <StatusDot color={cs.color} aria-label={`Campaign status: ${cs.label}`} />
            </Tooltip>
            <NameLink type='button' onClick={() => openEdit(c)}>
              {c.campaignName}
            </NameLink>
          </NameCell>
        )
      },
    },
    {
      title: 'Tactic',
      key: 'tactic',
      width: '12%',
      render: (_: unknown, row: ScopedRow) => (row.kind === 'mapped' ? row.src.tactic : DASH),
    },
    {
      title: 'Sub-Type',
      key: 'subType',
      width: '12%',
      render: (_: unknown, row: ScopedRow) => (row.kind === 'mapped' ? row.src.subType : DASH),
    },
    {
      title: 'Language',
      key: 'language',
      width: '8%',
      render: (_: unknown, row: ScopedRow) => (row.kind === 'mapped' ? row.src.language : DASH),
    },
    {
      title: 'Offers',
      key: 'offers',
      width: '8%',
      align: 'center',
      render: (_: unknown, row: ScopedRow) => {
        // Unmapped campaigns have no offers yet (offers require a Green mapping) — show a dash.
        if (row.kind === 'unmapped') return <span>{DASH}</span>
        const record = row.src
        if (!platformSupportsOffers(record.platform)) {
          return (
            <Tooltip title='Offer mapping does not exist for this platform'>
              <StatusIconDisabled aria-label='Offers: not applicable'>
                <Icon name='ban' color={colors.cloud_50} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        if (record.mappingStatus !== 'green') {
          return (
            <Tooltip title='Campaign must be confirmed (Green) before offers can be mapped'>
              <StatusIconDisabled aria-label='Offers: unavailable until the campaign is confirmed'>
                <Icon name='timesCircle' color={colors.cloud_50} width={18} height={18} />
              </StatusIconDisabled>
            </Tooltip>
          )
        }
        const cnt = record.offerCounts
        const hasOffers = cnt.green + cnt.grey + cnt.red > 0
        return (
          <Tooltip title={hasOffers ? `Offers: ${cnt.green} confirmed · ${cnt.grey} awaiting · ${cnt.red} attention` : 'No offers yet — click to map'}>
            <OfferDotsBtn type='button' aria-label={`Offers for ${record.campaignName}`} onClick={() => openOffers(record)}>
              <OfferDotCount><StatusDot color={colors.forest_60} /> {cnt.green}</OfferDotCount>
              <OfferDotCount><StatusDot color={colors.cloud_50} /> {cnt.grey}</OfferDotCount>
              <OfferDotCount><StatusDot color={colors.crimson_60} /> {cnt.red}</OfferDotCount>
            </OfferDotsBtn>
          </Tooltip>
        )
      },
    },
    {
      key: 'actions',
      align: 'center',
      width: '4%',
      render: (_: unknown, row: ScopedRow) => {
        const items: ItemType[] =
          row.kind === 'unmapped'
            ? [{ key: 'map', label: isReadOnly ? 'View mapping' : 'Map campaign', onClick: () => openUnmappedEdit(row.src) }]
            : kebabItems(row.src)
        return (
          <DropdownMenu items={items} menuType='kebab'>
            <IconButton id={`advertiser-campaign-${row.kind}-actions-btn`} iconName='ellipsisVertical' color={colors.cloud_80} />
          </DropdownMenu>
        )
      },
    },
  ]

  // --- Scoped (advertiser Summary tab): one table of UNMAPPED (top) + MAPPED campaigns.
  if (scoped) {
    // Unmapped campaigns that belong to THIS advertiser: external advertiser already mapped to
    // this BPID (Step 1 done), campaign mapping still pending. Campaigns under an unmapped (or
    // multi-) external advertiser are NOT attributable to this advertiser, so they are excluded.
    const scopedUnmapped = unmappedCampaigns.filter(
      c =>
        c.advertiserBid === advertiserBid &&
        c.advertiserMapping === 'mapped' &&
        c.campaignMapping === 'unmapped' &&
        !isMultipleAdvertisers(c),
    )

    // Platform ToggleTab options: 'All' + each platform present across mapped + unmapped rows.
    const platformsPresent = Array.from(new Set([...rows, ...scopedUnmapped].map(r => r.platform)))
    const platformTabs = [
      { label: 'All Campaigns', value: 'all' },
      ...platformsPresent.map(pf => ({ label: platformLabel(pf), value: pf })),
    ]
    const current = platformsPresent.includes(scopedPlatform) || scopedPlatform === 'all' ? scopedPlatform : 'all'

    const unmappedVisible = current === 'all' ? scopedUnmapped : scopedUnmapped.filter(c => c.platform === current)
    const mappedVisible = current === 'all' ? rows : rows.filter(r => r.platform === current)

    const allRows: ScopedRow[] = [
      ...unmappedVisible.map(c => ({ kind: 'unmapped' as const, src: c })),
      ...mappedVisible.map(c => ({ kind: 'mapped' as const, src: c })),
    ]

    // Sort by the column order: Mapping Status (unmapped -> red -> grey -> green) -> Platform ->
    // Reporting Platform -> Tactic -> Sub-Type -> Language.
    const statusRank = (r: ScopedRow): number =>
      r.kind === 'unmapped' ? 0 : { red: 1, grey: 2, green: 3 }[r.src.mappingStatus]
    const field = (r: ScopedRow, key: 'reportingPlatform' | 'tactic' | 'subType' | 'language'): string =>
      r.kind === 'mapped' ? r.src[key] : ''
    const merged = [...allRows].sort((a, b) => {
      let d = statusRank(a) - statusRank(b)
      if (d) return d
      d = a.src.platform.localeCompare(b.src.platform)
      if (d) return d
      d = field(a, 'reportingPlatform').localeCompare(field(b, 'reportingPlatform'))
      if (d) return d
      d = field(a, 'tactic').localeCompare(field(b, 'tactic'))
      if (d) return d
      d = field(a, 'subType').localeCompare(field(b, 'subType'))
      if (d) return d
      return field(a, 'language').localeCompare(field(b, 'language'))
    })
    const total = merged.length
    const start = (scopedPage - 1) * scopedPageSize
    const pageRows = merged.slice(start, start + scopedPageSize)

    return (
      <>
        <ScopedHeaderRow>
          <Text.H5 id='advertiser-campaigns-ttl'>Campaigns</Text.H5>
          {titleButtons}
        </ScopedHeaderRow>
        {platformsPresent.length > 1 && (
          <ScopedFilterRow>
            <ToggleTab
              value={current}
              onChange={v => {
                setScopedPlatform(String(v))
                setScopedPage(1)
              }}
              options={platformTabs}
            />
          </ScopedFilterRow>
        )}
        <Table<ScopedRow>
          id='advertiser-campaigns-tbl'
          cellsIdPrefix='advertiser-campaigns'
          rowKey={r => (r.kind === 'mapped' ? r.src.id : `um-${r.src.id}`)}
          columns={scopedColumns}
          dataSource={pageRows}
          pagination={false}
        />
        {total > scopedPageSize && (
          <Pagination
            current={scopedPage}
            pageSize={scopedPageSize}
            total={total}
            showTotal={(tot, [, endItem]) => `${endItem} of ${tot} items`}
            onChange={p => setScopedPage(p)}
          />
        )}
        {drawers}
      </>
    )
  }

  return (
    <CampaignsWrapper>
      {showBreadcrumb && <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Campaigns' }]} />}
      <TableWithFilterBanner<MappedCampaign>
        id='campaign-tbl'
        cellsIdPrefix='campaign'
        rowKey='id'
        ref={tableRef}
        sectionTitle='Campaigns'
        titleButtons={titleButtons}
        columns={columns}
        filterItems={filterItems}
        initialFilters={initialFilters as Partial<Record<keyof MappedCampaign, FilterValue>>}
        filterMode='server'
        queryFn={queryFn}
        tableSearch={{ show: true, placeholder: 'Search' }}
        tableTitle='Campaigns Overview'
      />
      {drawers}
    </CampaignsWrapper>
  )
}

function CampaignsPage() {
  return <CampaignsTable showBreadcrumb />
}

export default CampaignsPage
