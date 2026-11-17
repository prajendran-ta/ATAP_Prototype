import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import {
  Breadcrumb,
  Button,
  Container,
  DropdownMenu,
  Grid,
  Modal,
  Search,
  Select,
  Spinner,
  Table,
  Tag,
  Text,
  ToggleTab,
  useNotification,
} from '@amadeus/react-design-factory'
// Hooks & Helpers
import { formatCurrency, formatDate } from '@amadeus/react-utils'
import { AdvertiserPlanStatusEnum, CampaignStatusEnum } from '@mediahub/oba-ui/graphql/generated/oba-enums'
import {
  usePlanDetailsQuery,
  usePauseAdvPlanMutation,
  useUnpauseAdvPlanMutation,
  usePauseCampaignMutation,
  useUnpauseCampaignMutation,
} from './ObaDetails.queries'
import {
  detailsFilterMap,
  obaStatusOptions,
  channelOptions,
  tacticOptions,
  getStatusIcon,
  emptyFilterValues,
  emptyFilterLabels,
  useCampaignNamesOptions,
  useGroupNamesOptions,
} from './ObaDetails.helpers'
// Types
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import type { ObaDetailsFilter } from './ObaDetails.d'

const ObaDetails = () => {
  const notification = useNotification()
  const { planId } = useParams<{ planId: string }>()

  const [filterValues, setFilterValues] = useState<ObaQL.CampaignDetailsFilter>(emptyFilterValues)
  const [filterLabels, setFilterLabels] = useState<Record<ObaDetailsFilter, string>>(emptyFilterLabels)
  const [tableStatusFilter, setTableStatusFilter] = useState<ObaQL.CampaignStatusEnum | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pauseModalIsOpen, setPauseModalIsOpen] = useState<boolean>(false)

  const { planDetailsData, planDetailsLoading, planDetailsError, refetchPlanDetails } = usePlanDetailsQuery({
    id: Number(planId),
    filter: filterValues,
  })

  const { groupNamesOptions, groupNamesLoading, groupNamesError } = useGroupNamesOptions({
    advertiserPlanId: Number(planId),
  })

  const { campaignNamesOptions, campaignNamesLoading, campaignNamesError } = useCampaignNamesOptions({
    fromExistingAdvertiserPlans: true,
    advertiserId: planDetailsData?.advertiserId,
  })

  const [campaignDetails, setCampaignDetails] = useState<ObaQL.CampaignDetails[]>(
    planDetailsData?.campaignDetails || [],
  )

  const { pauseAdvPlan, pausedAdvPlanData, pausedAdvPlanLoading, pausedAdvPlanError } = usePauseAdvPlanMutation()
  const { unpauseAdvPlan, unpausedAdvPlanData, unpausedAdvPlanLoading, unpausedAdvPlanError } =
    useUnpauseAdvPlanMutation()

  const { pauseCampaign, pausedCampaignData, pausedCampaignError } = usePauseCampaignMutation()
  const { unpauseCampaign, unpausedCampaignData, unpausedCampaignError } = useUnpauseCampaignMutation()

  const isPausedObaPlan = planDetailsData?.status === AdvertiserPlanStatusEnum.Paused

  useEffect(() => {
    if (groupNamesError || campaignNamesError || planDetailsError) {
      notification.error('Error in fetching data', {
        description: groupNamesError?.message || campaignNamesError?.message || planDetailsError?.message,
      })
    }
  }, [groupNamesError, campaignNamesError, planDetailsError])

  useEffect(() => {
    if (pausedAdvPlanData) {
      notification.success(`OBA Plan has been Paused.`)
    }
  }, [pausedAdvPlanData])

  useEffect(() => {
    if (unpausedAdvPlanData) {
      notification.success('OBA Plan has been Resumed.')
    }
  }, [unpausedAdvPlanData])

  useEffect(() => {
    if (pausedAdvPlanError || unpausedAdvPlanError) {
      notification.error(`Error while ${pausedAdvPlanError ? 'pausing' : 'resuming'} OBA Plan.`, {
        description: (pausedAdvPlanError || unpausedAdvPlanError)?.message,
      })
    }
  }, [pausedAdvPlanError, unpausedAdvPlanError])

  useEffect(() => {
    if (pausedCampaignData || unpausedCampaignData) {
      notification.success(`Campaign recommendation has been ${pausedCampaignData ? 'Paused' : 'Resumed'}.`)
    }
  }, [pausedCampaignData, unpausedCampaignData])

  useEffect(() => {
    if (pausedCampaignError || unpausedCampaignError) {
      notification.error(`Error while ${pausedCampaignError ? 'pausing' : 'resuming'} OBA Plan.`, {
        description: (pausedCampaignError || unpausedCampaignError)?.message,
      })
    }
  }, [pausedCampaignError, unpausedCampaignError])

  const updateFilters = (filter: ObaDetailsFilter, value: (number | string)[] = [], options: SelectOption[] = []) => {
    setFilterValues(prevState => ({ ...prevState, [filter]: value }))
    setFilterLabels(prevState => ({ ...prevState, [filter]: options.map(option => option.label).join(', ') }))
  }

  const clearAllFilters = () => {
    setFilterValues(emptyFilterValues)
    setFilterLabels(emptyFilterLabels)
  }

  const updateTableFilterStatus = (value: ObaQL.CampaignStatusEnum | null) => {
    setTableStatusFilter(value)
    updateFilters(
      'statuses',
      !value ? [] : [value],
      obaStatusOptions.filter(option => option.value === value) as SelectOption[],
    )
  }

  const openPauseModal = () => setPauseModalIsOpen(true)
  const closePauseModal = () => setPauseModalIsOpen(false)

  const togglePauseObaPlan = async () => {
    if (isPausedObaPlan) {
      await unpauseAdvPlan({ variables: { id: Number(planId) } })
    } else {
      await pauseAdvPlan({ variables: { id: Number(planId) } })
      setTableStatusFilter(null)
    }
    closePauseModal()
  }

  const togglePauseCampaign = async (campaignId: string, groupId: number, isPausedCampaign: boolean) => {
    if (isPausedCampaign) {
      await unpauseCampaign({ variables: { campaignId, groupId } })
    } else {
      await pauseCampaign({ variables: { campaignId, groupId } })
    }
    await refetchPlanDetails()
  }

  useEffect(() => {
    let campaigns = planDetailsData?.campaignDetails

    if (searchTerm) {
      campaigns = planDetailsData?.campaignDetails.filter(campaignDetail => {
        const { group, channel, platform, tactic, campaign } = campaignDetail

        return (
          group?.name.toLowerCase().includes(searchTerm) ||
          channel.toLowerCase().includes(searchTerm) ||
          platform?.name.toLowerCase().includes(searchTerm) ||
          tactic.toLowerCase().includes(searchTerm) ||
          campaign.name.toLowerCase().includes(searchTerm)
        )
      })
    }
    setCampaignDetails(campaigns || [])
  }, [searchTerm, planDetailsData])

  const obaTableColumns: ColumnsType<ObaQL.CampaignDetails> = useMemo(
    () => [
      {
        title: 'OBA Status',
        dataIndex: 'status',
        width: 60,
        align: 'center',
        render: (value: ObaQL.CampaignStatusEnum) => getStatusIcon(value, isPausedObaPlan),
      },
      { title: 'Group Name', dataIndex: ['group', 'name'] },
      { title: 'Channel', dataIndex: 'channel' },
      { title: 'Tactic', dataIndex: 'tactic' },
      {
        title: 'Campaign Name',
        dataIndex: 'campaign',
        render: (campaign: ObaQL.CampaignName, record) => (
          <Text.Body {...((campaign.notFound || record.status === CampaignStatusEnum.Error) && { status: 'error' })}>
            {campaign.name}
          </Text.Body>
        ),
      },
      {
        title: 'Monthly Recom.',
        dataIndex: 'monthlyRecommendedCents',
        render: (value: number, { currency }) => (value ? formatCurrency(value / 100, currency!) : '-'),
      },
      {
        title: 'Daily Recom.',
        dataIndex: 'dailyRecommendedCents',
        render: (value: number, { currency }) => (value ? formatCurrency(value / 100, currency!) : '-'),
      },
      { title: 'Last Updated', dataIndex: 'lastUpdated', render: (value: string) => (value ? formatDate(value) : '-') },
      {
        title: '',
        dataIndex: 'actions',
        align: 'center',
        width: 40,
        render: (_, { campaign, group, status }) => {
          const isPausedCampaign = status === CampaignStatusEnum.Paused
          return (
            <DropdownMenu
              menuType='kebab'
              disabled={isPausedObaPlan}
              items={[
                {
                  key: 'pause',
                  disabled: isPausedObaPlan,
                  label: `${isPausedCampaign ? 'Resume' : 'Pause'} Campaign Recommendation`,
                  onClick: () => togglePauseCampaign(campaign.id, group.id, isPausedCampaign),
                },
              ]}
            />
          )
        },
      },
    ],
    [isPausedObaPlan],
  )

  const renderActiveFilters = () => {
    const activeFilterEntries = Object.entries(filterLabels).filter(([, value]) => value)

    if (activeFilterEntries.length) {
      return activeFilterEntries.map(([key, values]) => (
        <Tag key={key} status='primary'>
          {`${detailsFilterMap[key as ObaDetailsFilter]}: ${values}`}
        </Tag>
      ))
    } else {
      return <Tag status='disabled'>None</Tag>
    }
  }

  if (pausedAdvPlanLoading || unpausedAdvPlanLoading) {
    return <Spinner />
  }

  return (
    <>
      <Breadcrumb
        defaultHome
        items={[{ title: 'Omni-Channel Budget Allocation', href: '/oba/plans' }, { title: 'OBA Details' }]}
      />

      <Container.Header>
        <Text.H3>OBA Details - {planDetailsData?.name}</Text.H3>
        <Container.Row>
          <Button
            id='oba-pause_oba-btn'
            variant='outlined'
            disabled={planDetailsData?.disable[isPausedObaPlan ? 'resume' : 'pause']}
            onClick={openPauseModal}
          >
            {isPausedObaPlan ? 'Resume' : 'Pause'} OBA
          </Button>
          <Button id='oba-settings-btn' href={`/oba/plans/${planId}/details/settings`}>
            Settings
          </Button>
        </Container.Row>
      </Container.Header>

      <Container.Section>
        <Container.Header>
          <Text.H5>Filters</Text.H5>
          <Button variant='link' onClick={clearAllFilters}>
            Clear All
          </Button>
        </Container.Header>

        <Grid.Row>
          <Grid.Col span={2}>
            <Select<ObaQL.CampaignStatusEnum[]>
              label={detailsFilterMap.statuses}
              id='oba-status-sel'
              mode='multiple'
              allowClear
              options={obaStatusOptions}
              value={filterValues.statuses}
              onChange={(statuses, options) => updateFilters('statuses', statuses, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<number[]>
              label={detailsFilterMap.groupIds}
              id='oba-group-sel'
              mode='multiple'
              allowClear
              loading={groupNamesLoading}
              options={groupNamesOptions}
              value={filterValues.groupIds}
              onChange={(groupIds, options) => updateFilters('groupIds', groupIds, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<ObaQL.ChannelEnum[]>
              label={detailsFilterMap.channels}
              id='oba-channel-sel'
              mode='multiple'
              allowClear
              options={channelOptions}
              value={filterValues.channels}
              onChange={(channels, options) => updateFilters('channels', channels, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<ObaQL.TacticEnum[]>
              label={detailsFilterMap.tactics}
              id='oba-tactic-sel'
              mode='multiple'
              allowClear
              options={tacticOptions}
              value={filterValues.tactics}
              onChange={(tactics, options) => updateFilters('tactics', tactics, options as SelectOption[])}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Select<string[]>
              label={detailsFilterMap.vendorCampaignIds}
              id='oba-campaigns-sel'
              mode='multiple'
              allowClear
              loading={campaignNamesLoading}
              options={campaignNamesOptions}
              value={filterValues.vendorCampaignIds}
              onChange={(vendorCampaignIds, options) =>
                updateFilters('vendorCampaignIds', vendorCampaignIds, options as SelectOption[])
              }
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col>
            <Text.Body>Active Filters</Text.Body>
          </Grid.Col>
          <Grid.Col>{renderActiveFilters()}</Grid.Col>
        </Grid.Row>
      </Container.Section>

      <Container.Section>
        <Text.H5>Budget Spend</Text.H5>
        <Grid.Row justify='space-between'>
          <Grid.Col span={4}>
            <ToggleTab<ObaQL.CampaignStatusEnum | null>
              id='oba-status_filter-tab'
              disabled={isPausedObaPlan}
              value={tableStatusFilter}
              options={[{ label: 'All Campaigns', value: null }, ...obaStatusOptions]}
              onChange={updateTableFilterStatus}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Search id='oba-bud_spend-search' placeholder='Group, Channel, Tactic, Campaign' onSearch={setSearchTerm} />
          </Grid.Col>
        </Grid.Row>
        <Table<ObaQL.CampaignDetails>
          id='oba-bud_spend-tbl'
          cellsIdPrefix='oba'
          rowKey={record => record.campaign.id}
          dataSource={campaignDetails}
          columns={obaTableColumns}
          loading={planDetailsLoading}
          pagination={true}
        />
      </Container.Section>

      <Modal
        idPrefix='oba-pause_oba-modal'
        title={`${isPausedObaPlan ? 'Resume' : 'Pause'} Budget Optimization`}
        open={pauseModalIsOpen}
        okText='Confirm'
        onOk={togglePauseObaPlan}
        onCancel={closePauseModal}
      >
        <Text.Body>
          This action will {isPausedObaPlan ? 'resume' : 'pause'} automatic budget optimizations for all campaigns
          within this plan.
        </Text.Body>
        <Text.Body>You can {isPausedObaPlan ? 'pause' : 'resume'} optimizations at any time.</Text.Body>
      </Modal>
    </>
  )
}

export default ObaDetails
