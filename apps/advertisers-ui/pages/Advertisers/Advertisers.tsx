import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Breadcrumb,
  Button,
  DropdownMenu,
  Icon,
  IconButton,
  Select,
  Spinner,
  Tag,
  ToggleTab,
  colors,
} from '@amadeus/react-design-factory'
import { TableWithFilterBanner } from '@mediahub/mediahub-ui/components/TableWithFilters'
import type { FilterItemWithType } from './Advertisers.d'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType } from 'antd/es/table'
import { AdvertisersWrapper, DropdownTrigger, MappedCell, MappedRing, MappedLabel } from './Advertisers.styled'
import { useGetAdvertiserOptionsQuery, useGetAdvertisersQuery } from './Advertisers.queries'
import { AdvertiserTypesEnum } from '../../graphql/generated/advertiser-enums'
import { SelectOption } from '@amadeus/react-design-factory/components/Select'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { useLocation } from 'react-router'
import { useGetUsersOptionsQuery } from '@mediahub/mediahub-ui/pages/UsersManagement/UserManagement.queries'
import { useAdvertiserFollowActions } from './useAdvertiserFollowActions'
import {
  refetchAdvertisersFiltersFormatted,
  formatAndSortAdvertisers,
  formatUsersToOptions,
  normalizeAdvertiserSearch,
} from './AdvertisersConfig'
import { useServerOptions, updateSelectedOptions, mergeWithSelected, buildServerOptionsQueryFn } from '@amadeus/react-utils'
import { LONDONER, LONDONER_NAMES, LONDONER_PLATFORM_ADVERTISERS } from '@mediahub/mediahub-ui/shared/londonerHotel'
import { DEMO_ADVERTISERS, getDemoAdvertiserByBpid } from '@mediahub/mediahub-ui/shared/demoAdvertisers'
import { mappedCampaigns } from '@mediahub/mediahub-ui/pages/CampaignMapping/mockData/campaigns'
import { unmappedCampaigns } from '@mediahub/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns'

// Demo advertisers' (The Londoner Hotel + the 19 in demoAdvertisers.ts) summary, computed from the
// same mock rows Campaign Setup shows, so the list agrees with the detail screens.
//  - Campaigns: mapped campaigns / (mapped + still-to-map rows for this BPID)
//  - OBA: only paid search, display and video are in the OBA plan (metasearch is billed outside it)
//  - Invoice: every mapped campaign has its invoice mapped
function demoMappingSummary(bpid: string, platforms: number, mediaPlanName: string) {
  // Campaign Setup rows whose campaign mapping is done (e.g. the campaigns created with Max) count as mapped.
  const setupRows = unmappedCampaigns.filter(c => c.advertiserBid === bpid)
  const mapped = [...mappedCampaigns.filter(c => c.advertiserBid === bpid), ...setupRows.filter(c => c.campaignMapping === 'mapped')]
  const toMap = setupRows.filter(c => c.campaignMapping !== 'mapped')
  const isObaChannel = (platform: string) => platform !== 'DerbySoft' && platform !== 'WIHP'
  const campaignsTotal = mapped.length + toMap.length
  const obaTotal = mapped.filter(c => isObaChannel(c.platform)).length + toMap.filter(c => isObaChannel(c.platform)).length
  const obaMapped = toMap.length === 0 ? obaTotal : mapped.filter(c => isObaChannel(c.platform)).length
  return {
    platformsMapped: platforms,
    campaignsMapped: mapped.length,
    campaignsTotal,
    obaMapped,
    obaTotal,
    invoiceMapped: mapped.length,
    invoiceTotal: campaignsTotal,
    contractActive: true,
    mediaPlans: [mediaPlanName],
  }
}

/** Demo summary for an advertiser, matched by BPID (a backend-owned demo advertiser keeps its real id). */
function demoSummaryFor(bpid: string | undefined) {
  if (!bpid) return undefined
  if (bpid === LONDONER.bpid) {
    return demoMappingSummary(bpid, LONDONER_PLATFORM_ADVERTISERS.length, LONDONER_NAMES.mediaPlan)
  }
  const demo = getDemoAdvertiserByBpid(bpid)
  return demo ? demoMappingSummary(bpid, demo.platformAdvertisers.length, demo.mediaPlanName) : undefined
}

// Prototype-only: derive a stable per-advertiser mapping summary from its id (no backend field yet).
// platformsMapped <= platformsTotal (2-5); campaignsMapped <= campaignsTotal (up to ~30), with some
// advertisers fully mapped (green ring) and others partial (orange arc).
function advertiserMappingSummary(advertiserId: string | number, bpid?: string): {
  platformsMapped: number
  campaignsMapped: number
  campaignsTotal: number
  obaMapped: number
  obaTotal: number
  invoiceMapped: number
  invoiceTotal: number
  contractActive: boolean
  mediaPlans: string[]
} {
  // Demo advertisers: derive the summary from their real mock data (not a random hash).
  const demo = demoSummaryFor(bpid ?? (String(advertiserId) === String(LONDONER.advertiserId) ? LONDONER.bpid : undefined))
  if (demo) return demo

  const n = Math.abs(Array.from(String(advertiserId)).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) || 1

  // Contract status drives everything: ~1 in 3 advertisers are INACTIVE and read as fully empty —
  // 0 platforms, 0/0 campaigns, 0/0 OBA, 0/0 invoice, and no media plans. Active advertisers get
  // real mock counts and 1-3 media plans (mostly 1).
  const contractActive = n % 3 !== 0
  if (!contractActive) {
    return {
      platformsMapped: 0,
      campaignsMapped: 0,
      campaignsTotal: 0,
      obaMapped: 0,
      obaTotal: 0,
      invoiceMapped: 0,
      invoiceTotal: 0,
      contractActive: false,
      mediaPlans: [],
    }
  }

  const platformsMapped = 1 + (n % 10) // 1..10 — a standalone count (no total)
  const campaignsTotal = 8 + (n % 23) // 8..30
  // some advertisers fully mapped (green ring); the rest partial (orange arc).
  const campaignsMapped = n % 2 === 0 ? campaignsTotal : Math.max(1, Math.floor(campaignsTotal * (0.3 + (n % 6) * 0.1)))
  const obaTotal = campaignsTotal
  const obaMapped = n % 4 === 0 ? obaTotal : Math.max(1, Math.floor(obaTotal * (0.2 + (n % 7) * 0.1)))
  const invoiceTotal = campaignsTotal
  const invoiceMapped = n % 5 === 0 ? invoiceTotal : Math.max(1, Math.floor(invoiceTotal * (0.25 + (n % 5) * 0.12)))
  const ALL_PLANS = ['Always-On Search', 'Q4 Brand Push', 'Summer Metasearch', 'Hotel Display 2026', 'Retargeting Core']
  const planCount = n % 7 === 0 ? 3 : n % 3 === 1 ? 2 : 1
  const mediaPlans = Array.from({ length: planCount }, (_, i) => ALL_PLANS[(n + i) % ALL_PLANS.length])
  return {
    platformsMapped,
    campaignsMapped: Math.min(campaignsMapped, campaignsTotal),
    campaignsTotal,
    obaMapped: Math.min(obaMapped, obaTotal),
    obaTotal,
    invoiceMapped: Math.min(invoiceMapped, invoiceTotal),
    invoiceTotal,
    contractActive: true,
    mediaPlans,
  }
}

// Shared donut-ring cell ("N Inc / M Tot") for the mapped-count columns (Campaigns / OBA / Invoice).
function renderMappedRing(mapped: number, total: number) {
  const pct = total > 0 ? mapped / total : 0
  return (
    <MappedCell>
      <MappedRing pct={pct} aria-hidden />
      <MappedLabel>{mapped} Inc / {total} Tot</MappedLabel>
    </MappedCell>
  )
}

// Prototype-only: advertisers flagged as "New" (shown with a primary-blue chip next to the name).
// Matched by advertiser name since there's no backend "new" flag yet.
const NEW_ADVERTISERS = new Set<string>([
  'Sensira Resort And Spa Riviera Maya',
  'S O I Acquisition',
  'ARK Canary Wharf',
])

function AdvertisersPage() {
  const { t } = useTranslation(['advertisers', 'common'])
  const { user, isExternal } = useAuth()
  const userId = user?.id as number

  const [toggleTotals, seToggleTotals] = useState<AdvertiserQL.TotalToggle>({
    totalAdvertisers: 0,
    totalFollowing: 0,
  })

  const tableRef = useRef<any>(null)
  const [selectedRows, setSelectedRows] = useState<AdvertiserQL.Advertiser[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const isAnyRowSelected = selectedRows?.length > 0

  const [selectedAdvertisers, setSelectedAdvertisers] = useState<{ label: string; value: string | number }[]>([])
  const [selectedUsers, setSelectedUsers] = useState<{ label: string; value: string | number }[]>([])

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const followingOnlyQueryParam = params.get('isFollowingOnly')

  const { handleFollowAll, handleUnfollowAll, handleToggleFollow } = useAdvertiserFollowActions({
    selectedRows,
    setSelectedRows,
    setSelectedRowKeys,
    refetchWithFilters: () => tableRef.current?.refetchWithFilters?.(),
  })

  const bulkActionsDropdownItems = [
    {
      key: 'follow',
      label: <span id='advertiser-follow_all-txt'>{t('advertisers:actions.followAll')}</span>,
      onClick: handleFollowAll,
    },
    {
      key: 'unfollow',
      label: <span id='advertiser-unfollow_all-txt'>{t('advertisers:actions.unfollowAll')}</span>,
      onClick: handleUnfollowAll,
    },
  ]

  const columns: ColumnType<AdvertiserQL.Advertiser>[] = [
    {
      title: t('advertisers:columns.following'),
      key: 'follow',
      align: 'center',
      width: 70,
      fixed: 'left' as const,

      render: (_: unknown, record: AdvertiserQL.Advertiser, idx: number) => (
        <IconButton
          id={`advertiser-follow-${idx}-btn`}
          onClick={() => handleToggleFollow(record)}
          iconName={record.isFollowing ? 'userPlusSolid' : 'userPlus'}
          color={record.isFollowing ? colors.sky_60 : colors.cloud_50}
          height={16}
          width={16}
        />
      ),
    },

    {
      title: t(isExternal ? 'advertisers:columns.advertiserName' : 'advertisers:details.advertiserName'),
      dataIndex: 'advertiserName',
      key: 'advertiserName',
      width: 220,
      fixed: 'left' as const,
      ellipsis: true,
      render: (value: string, record: AdvertiserQL.Advertiser) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <Button variant='text' href={`/advertisers/${record.advertiserId}/settings`}>
            {value}
          </Button>
          {NEW_ADVERTISERS.has(value) && <Tag status='primary'>New</Tag>}
        </span>
      ),
    },
    ...(!isExternal
      ? [
          {
            title: 'BPID',
            dataIndex: 'bpid',
            key: 'bpid',
            width: 130,
            fixed: 'left' as const,
            ellipsis: true,
          },
        ]
      : []),
    {
      title: t('advertisers:columns.advertiserType'),
      dataIndex: 'advertiserTypes',
      key: 'advertiserTypes',
      width: 120,
      ellipsis: true,
      render: (types: string[]) => types,
    },

    // Prototype-only: contract status + media plans (no backend field yet; derived per advertiser).
    {
      title: 'Contract Status',
      key: 'contractStatus',
      width: 120,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const active = advertiserMappingSummary(record.advertiserId, record.bpid).contractActive
        return <Tag status={active ? 'success' : 'disabled'}>{active ? 'Active' : 'Inactive'}</Tag>
      },
    },
    {
      title: 'Media Plans',
      key: 'mediaPlans',
      width: 220,
      ellipsis: true,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const plans = advertiserMappingSummary(record.advertiserId, record.bpid).mediaPlans
        return plans.length > 0 ? plans.join(', ') : '-'
      },
    },
    // Prototype-only mapping summary. Real data isn't on the Advertiser record yet, so these are
    // derived deterministically from the advertiser id (stable across renders). Remove / wire to
    // real data when the backend provides per-advertiser platform + campaign-mapping counts.
    {
      title: 'Platforms Mapped',
      key: 'platformsMapped',
      width: 130,
      align: 'center' as const,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        // No "total" for platforms — just the count of mapped platforms.
        return advertiserMappingSummary(record.advertiserId, record.bpid).platformsMapped
      },
    },
    {
      title: 'Campaigns Mapped',
      key: 'campaignsMapped',
      width: 150,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const m = advertiserMappingSummary(record.advertiserId, record.bpid)
        return renderMappedRing(m.campaignsMapped, m.campaignsTotal)
      },
    },
    {
      title: 'Campaigns in OBA',
      key: 'obaMapped',
      width: 150,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const m = advertiserMappingSummary(record.advertiserId, record.bpid)
        return renderMappedRing(m.obaMapped, m.obaTotal)
      },
    },
    {
      title: 'Campaigns Invoice Mapped',
      key: 'invoiceMapped',
      width: 180,
      render: (_: unknown, record: AdvertiserQL.Advertiser) => {
        const m = advertiserMappingSummary(record.advertiserId, record.bpid)
        return renderMappedRing(m.invoiceMapped, m.invoiceTotal)
      },
    },

    { title: t('advertisers:columns.followedBy'), dataIndex: 'followedBy', key: 'followedBy', width: 110 },
    {
      title: '',
      key: 'details',
      width: 90,
      render: (_: unknown, record: AdvertiserQL.Advertiser, index: number) => (
        <Button
          id={`advertiser-overview-details-${index}-btn`}
          variant='text'
          href={`/advertisers/${record.advertiserId}/summary`}
        >
          Details
        </Button>
      ),
    },
  ]

  const advertiserTypeOptions: SelectOption[] = Object.values(AdvertiserTypesEnum).map(value => ({
    value,
    label: value,
  }))

  if (!userId) return <Spinner />

  const { refetch: refetchAdvertisersOptions } = useGetAdvertiserOptionsQuery(true)
  const advertiserOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchAdvertisersOptions,
      buildVars: (search, pagination) => ({
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: normalizeAdvertiserSearch(search),
          isFollowingOnly: false,
          paging: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.advertisers?.advertisers ?? [],
      mapToOption: adv => formatAndSortAdvertisers([adv as AdvertiserQL.Advertiser], isExternal)[0],
    }),
    pageSize: 20,
  })

  const { refetch: refetchUsersOptions } = useGetUsersOptionsQuery(100, 0, true)
  const usersOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchUsersOptions,
      buildVars: (search, pagination) => ({
        options: {
          search: { query: search, fields: ['name', 'email'] },
          paginate: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.users?.users ?? [],
      mapToOption: user => formatUsersToOptions([user as SharedQL.User])[0],
    }),
    pageSize: 20,
  })

  const filterItems: FilterItemWithType<AdvertiserQL.Advertiser>[] = [
    {
      name: 'ids',
      label: isExternal ? t('advertisers:filters.advertiserBpid') : `${t('advertisers:filters.advertiserBpid')} (BPID)`,
      type: 'multiple',
      options: selectedAdvertisers,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label={isExternal ? t('advertisers:filters.advertiserBpid') : `${t('advertisers:filters.advertiserBpid')} (BPID)`}
          id='advertiser-bpid-sel'
          placeholder={t('common:select')}
          popupMatchSelectWidth={600}
          mode='multiple'
          showSearch
          options={mergeWithSelected(advertiserOptions.options, selectedAdvertisers)}
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, advertiserOptions.options, setSelectedAdvertisers)
          }}
          loading={advertiserOptions.loading}
          onSearch={advertiserOptions.onSearch}
          onBlur={advertiserOptions.onBlur}
          onPopupScroll={advertiserOptions.onPopupScroll}
          filterMode='server'
        />
      ),
    },
    {
      name: 'advertiserTypes',
      label: t('advertisers:filters.advertiserType'),
      type: 'multiple',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('advertisers:filters.advertiserType')}
          id='advertiser-type-sel'
          placeholder={t('common:select')}
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={advertiserTypeOptions}
        />
      ),
    },
    {
      name: 'followedBy',
      label: t('advertisers:filters.followedBy'),
      type: 'multiple',
      options: selectedUsers,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label={t('advertisers:filters.followedBy')}
          id='advertiser-followed_by-sel'
          placeholder={t('common:select')}
          mode='multiple'
          showSearch
          options={mergeWithSelected(usersOptions.options, selectedUsers)}
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, usersOptions.options, setSelectedUsers)
          }}
          loading={usersOptions.loading}
          onSearch={usersOptions.onSearch}
          onBlur={usersOptions.onBlur}
          onPopupScroll={usersOptions.onPopupScroll}
          filterMode='server'
        />
      ),
    },
  ]

  const tableFilterItems: FilterItemWithType<AdvertiserQL.Advertiser>[] = [
    {
      name: 'isFollowingOnly',
      label: 'View',
      type: 'single',
      placement: 'header',
      renderControl: ({ value, setValue }) => (
        <ToggleTab<FilterValue>
          value={value}
          onChange={v => setValue(v)}
          options={[
            {
              label: (
                <span id='advertiser-my-txt'>
                  {t('advertisers:filters.myAdvertisers', { count: toggleTotals.totalFollowing })}
                </span>
              ),
              value: true,
            },
            {
              label: (
                <span id='advertiser-all-txt'>
                  {t('advertisers:filters.allAdvertisers', { count: toggleTotals.totalAdvertisers })}
                </span>
              ),
              value: false,
            },
          ]}
        />
      ),
    },
  ]

  const tableCustomControls = (
    <DropdownMenu items={bulkActionsDropdownItems}>
      <div>
        <DropdownTrigger id='advertiser-bulk_actions-btn' variant='outlined' disabled={!isAnyRowSelected}>
          {t('advertisers:actions.bulkActions')}{' '}
          <Icon name='chevronDown' color={!isAnyRowSelected ? colors.cloud_40 : colors.sky_60} width={10} height={10} />
        </DropdownTrigger>
      </div>
    </DropdownMenu>
  )

  const initialFilters: Partial<Record<keyof AdvertiserQL.AdvertiserFilter, FilterValue>> = {
    isFollowingOnly: followingOnlyQueryParam ? true : false,
  }

  const { refetch: refetchAdvertisers } = useGetAdvertisersQuery()

  const queryFn = refetchAdvertisersFiltersFormatted(refetchAdvertisers, seToggleTotals)

  return (
    <AdvertisersWrapper>
      <Breadcrumb items={[{ title: t('common:home'), href: '/' }, { title: t('advertisers:title') }]} />
      <TableWithFilterBanner
        ref={tableRef}
        sectionTitle={t('advertisers:title')}
        columns={columns}
        filterItems={[...filterItems, ...tableFilterItems]}
        initialFilters={initialFilters}
        filterMode='server'
        queryFn={queryFn}
        tableSearch={{ show: true }}
        tableScrollX={1690}
        tableCustomControls={tableCustomControls}
        tableTitle={t('advertisers:tableTitle')}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys)
            setSelectedRows(rows)
          },
        }}
        id='advertiser-tbl'
        cellsIdPrefix='advertiser'
        rowKey='advertiserId'
      />
    </AdvertisersWrapper>
  )
}

export default AdvertisersPage
