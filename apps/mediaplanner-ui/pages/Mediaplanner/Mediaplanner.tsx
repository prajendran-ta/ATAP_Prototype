import { useRef, useState } from 'react'
import { Breadcrumb, Button, Select, Spinner, ToggleTab } from '@amadeus/react-design-factory'
import { TableWithFilterBanner } from '@mediahub/mediahub-ui/components/TableWithFilters'
import type { FilterItemWithType } from '../../../advertisers-ui/pages/Advertisers/Advertisers.d'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType } from 'antd/es/table'
import { MediaplannerWrapper, CreatePlanButton, StatusChip } from './Mediaplanner.styled'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useServerOptions, updateSelectedOptions, mergeWithSelected } from '@amadeus/react-utils'
import {
  generateOptions,
  buildPlanNameOptionsQueryFn,
  buildMediaPlanQueryFn,
  mediaplannerPlanTypeConfig,
  mediaplannerStatusConfig,
  mediaplannerStatusChipTone,
} from './mediaplanUtils'
import { buildServerOptionsQueryFn } from '@amadeus/react-utils'
import { formatNumber } from '../utils/number'
import { useGetMediaplansQuery, useGetMediaplansOptionsQuery } from './Mediaplanner.queries'
import { AdvertiserTypesEnum } from '@mediahub/advertisers-ui/graphql/generated/advertiser-enums'
import { useLocation, useNavigate } from 'react-router'

function MediaplannerPage() {
  const { user, isAdmin, isStandard, isReadOnly } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const canManageMediaPlans = isAdmin || isStandard
  const userId = user?.id as number
  const [isMyPlansView, setIsMyPlansView] = useState<boolean>(false)
  const [toggleTotals, seToggleTotals] = useState<{ allPlansCount: number; myPlansCount: number }>({
    allPlansCount: 0,
    myPlansCount: 0,
  })

  const tableRef = useRef<any>(null)
  const { refetch: refetchAdvertisers } = useGetAdvertiserOptionsQuery(true)
  const advertisersServerOptions = useServerOptions({
    queryFn: buildServerOptionsQueryFn({
      refetch: refetchAdvertisers,
      buildVars: (search, pagination) => ({
        filter: {
          advertiserTypes: AdvertiserTypesEnum.Hotel,
          name: (search ?? '').trim() || undefined,
          isFollowingOnly: false,
          paging: { limit: pagination.limit, offset: pagination.offset },
        },
      }),
      getItems: data => data?.advertisers?.advertisers ?? [],
      mapToOption: adv => {
        const a = adv as AdvertiserQL.Advertiser
        return {
          label: `${a.advertiserName} (${String(a.bpid).toUpperCase()})`,
          value: a.advertiserId,
          bpid: a.bpid,
        }
      },
    }),
    pageSize: 20,
  })

  const { refetch: refetchMediaPlans } = useGetMediaplansQuery(undefined, true)
  const { refetch: refetchMediaPlansOptions } = useGetMediaplansOptionsQuery(true)

  const planNameServerOptions = useServerOptions({
    queryFn: buildPlanNameOptionsQueryFn(refetchMediaPlansOptions),
    pageSize: 20,
  })

  const queryFn = buildMediaPlanQueryFn(refetchMediaPlans, seToggleTotals)
  const params = new URLSearchParams(location.search)
  const myPlansOnlyQueryParam = params.get('myPlansOnly')
  const initialMyPlansOnly = myPlansOnlyQueryParam === 'true'

  const [selectedAdvertisers, setSelectedAdvertisers] = useState<{ label: string; value: string | number }[]>([])
  const [selectedPlans, setSelectedPlans] = useState<{ label: string; value: string | number }[]>([])

  const handlePlanClick = (record: MediaplannerQL.MediaPlan) => {
    // Amendment plan type opens Step 1 in "amendment" mode: Plan Name becomes a dropdown of the
    // advertiser's Closed Won plans (prototype). Passed via router state for the demo.
    const isAmendment = String(record.planType) === 'AMENDMENT'
    navigate(`/mediaplanner/edit/${record.id}`, {
      state: isAmendment ? { amendment: true, advertiserName: record.advertiserName } : undefined,
    })
  }

  const columns: ColumnType<MediaplannerQL.MediaPlan>[] = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '9%',
      render: (value: string) => {
        const label = mediaplannerStatusConfig[value]?.label ?? value
        const tone = mediaplannerStatusChipTone[value]
        return tone ? <StatusChip tone={tone}>{label}</StatusChip> : label
      },
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
      width: '16%',
      ellipsis: true,
      render: (value: string, record: MediaplannerQL.MediaPlan, index: number) => {
        if (!record.id) return value

        return (
          <Button id={`mediaplan-open-${index}-btn`} variant='text' onClick={() => handlePlanClick(record)}>
            {value}
          </Button>
        )
      },
    },
    {
      title: 'Advertiser (BPID)',
      dataIndex: 'advertiserBpid',
      key: 'advertiserBpid',
      // Explicit width so the column percentages sum to 100% (9+16+20+10+9+9+9+9+9); without it the
      // long advertiser strings pushed the table wider than its container, overflowing Proposal ID.
      width: '20%',
      ellipsis: true,
      render: (_: string, record: MediaplannerQL.MediaPlan) => `${record.advertiserName} (${record.advertiserBpid})`,
    },
    {
      title: 'Contract Budget',
      dataIndex: 'contractBudget',
      key: 'contractBudget',
      width: '10%',
      ellipsis: true,
      render: (_: string, record: MediaplannerQL.MediaPlan) => {
        return `${formatNumber(Number(record.contractBudget))} ${record.currency}`
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
      width: '9%',
      render: (value: string) => value,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
      width: '9%',
      render: (value: string) => value,
    },
    {
      title: 'Plan Type',
      dataIndex: 'planType',
      key: 'planType',
      ellipsis: true,
      width: '9%',
      render: (value: string) => mediaplannerPlanTypeConfig[value]?.label ?? value,
    },
    {
      title: 'Opportunity ID',
      dataIndex: 'opportunityId',
      key: 'opportunityId',
      width: '9%',
      ellipsis: true,
    },
    {
      title: 'Proposal ID',
      dataIndex: 'proposalId',
      key: 'proposalId',
      width: '9%',
      ellipsis: true,
    },
  ]

  if (!userId) return <Spinner />

  const planTypeOptions = generateOptions(mediaplannerPlanTypeConfig, true)
  const statusOptions = generateOptions(mediaplannerStatusConfig, true)

  const filterItems: FilterItemWithType<MediaplannerQL.MediaPlan>[] = [
    {
      name: 'planIds',
      label: 'Plan Name',
      type: 'multiple',
      options: selectedPlans,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label='Plan Name'
          id='mediaplan-plan_name_filter-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, planNameServerOptions.options, setSelectedPlans)
          }}
          options={mergeWithSelected(planNameServerOptions.options, selectedPlans)}
          loading={planNameServerOptions.loading}
          onSearch={planNameServerOptions.onSearch}
          onPopupScroll={planNameServerOptions.onPopupScroll}
          onBlur={planNameServerOptions.onBlur}
          filterMode='server'
        />
      ),
    },
    {
      name: 'ids',
      label: 'Advertiser (BPID)',
      type: 'multiple',
      options: selectedAdvertisers,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label='Advertiser (BPID)'
          id='mediaplan-advertiser_filter-sel'
          placeholder='Select'
          popupMatchSelectWidth={600}
          mode='multiple'
          showSearch
          options={mergeWithSelected(advertisersServerOptions.options, selectedAdvertisers)}
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => {
            setValue(v as FilterValue)
            updateSelectedOptions(v, advertisersServerOptions.options, setSelectedAdvertisers)
          }}
          loading={advertisersServerOptions.loading}
          onSearch={advertisersServerOptions.onSearch}
          onBlur={advertisersServerOptions.onBlur}
          onPopupScroll={advertisersServerOptions.onPopupScroll}
          filterMode='server'
        />
      ),
    },
    {
      name: 'status',
      label: 'Status',
      type: 'multiple',
      options: statusOptions,
      optionsTagLabelKey: 'label',
      renderControl: ({ value, setValue }) => (
        <Select
          label='Status'
          id='mediaplan-status_filter-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={v => setValue(v)}
          options={statusOptions}
        />
      ),
    },
    {
      name: 'planType',
      label: 'Plan Type',
      type: 'multiple',
      options: planTypeOptions,
      renderControl: ({ value, setValue }) => (
        <Select
          label='Plan Type'
          id='mediaplan-plan_type_filter-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => setValue(v as FilterValue)}
          options={planTypeOptions}
          allowClear
        />
      ),
    },
  ]

  const tableFilterItems: FilterItemWithType<MediaplannerQL.MediaPlan>[] = [
    {
      name: 'myPlansOnly',
      label: 'View',
      type: 'single',
      placement: 'header',
      renderControl: ({ value, setValue }) => (
        <ToggleTab<FilterValue>
          value={value}
          onChange={v => {
            setValue(v)
            setIsMyPlansView(v === true)
            navigate(v === true ? '/mediaplanner?myPlansOnly=true' : '/mediaplanner')
          }}
          options={[
            { label: <span id='mediaplan-view_my-tab'>{`My Plans (${toggleTotals.myPlansCount})`}</span>, value: true },
            {
              label: <span id='mediaplan-view_all-tab'>{`All Plans (${toggleTotals.allPlansCount})`}</span>,
              value: false,
            },
          ]}
        />
      ),
    },
  ]

  const initialFilters: Partial<Record<keyof MediaplannerQL.MediaPlanFilter, FilterValue>> = {
    myPlansOnly: true,
  }

  const titleButtons = canManageMediaPlans ? (
    <CreatePlanButton
      id='mediaplan_create-btn'
      title='Create a New Media Plan'
      variant='solid'
      href='/mediaplanner/create'
    >
      New Media Plan
    </CreatePlanButton>
  ) : null

  return (
    <MediaplannerWrapper>
      <div id='mediaplan-breadcrumb-nav'>
        <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Media Plans' }]} />
      </div>
      <span id='mediaplan-ttl' />
      <span id='mediaplan_overview-ttl' />
      <TableWithFilterBanner
        ref={tableRef}
        tableLayout='fixed'
        sectionTitle='Media Plans'
        titleButtons={titleButtons}
        columns={columns}
        filterItems={[...filterItems, ...tableFilterItems]}
        initialFilters={initialFilters}
        filterMode='server'
        queryFn={queryFn}
        tableSearch={{ show: true }}
        tableTitle='Media Plans Overview'
        id='mediaplan-tbl'
        cellsIdPrefix='mediaplan'
        rowKey='id'
      />
    </MediaplannerWrapper>
  )
}

export default MediaplannerPage
