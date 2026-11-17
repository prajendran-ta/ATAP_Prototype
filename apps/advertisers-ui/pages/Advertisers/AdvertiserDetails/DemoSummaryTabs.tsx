import { Button, Table, Tag, Text, colors } from '@amadeus/react-design-factory'
import { CardHeaderRow, TableWrapper } from './AdvertiserDetails.styled'
import { LONDONER, LONDONER_CHANNELS } from '@mediahub/mediahub-ui/shared/londonerHotel'
import { DEMO_CHANNEL_INFO, activeChannels, getDemoAdvertiserByBpid } from '@mediahub/mediahub-ui/shared/demoAdvertisers'
import { getMockSalesforcePlanForAdvertiser } from '@mediahub/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans'
import { getPlansForAdvertiser } from '@mediahub/oba-ui/ObaGqlProvider/londonerObaMock'

/**
 * Advertiser Details > Media Plans / OBA tabs for the demo advertisers (The Londoner Hotel and the
 * 10 in demoAdvertisers.ts), looked up by BPID. These tabs are disabled for every other advertiser
 * (no backend summary data exists for them).
 * Both read the SAME mock fixtures as the Media Planner / OBA modules so the numbers agree.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// dd-Mmm-yyyy display format (global convention); accepts ISO or already-formatted strings.
const formatDate = (value: string): string => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!iso) return value
  return `${iso[3]}-${MONTHS[Number(iso[2]) - 1]}-${iso[1]}`
}

const money = (value: number, currency: string): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

const statusTag = (status: string) => {
  const map: Record<string, 'success' | 'warning' | 'primary' | 'default'> = {
    Live: 'success',
    Scheduled: 'primary',
    Paused: 'warning',
    Completed: 'default',
    NEW: 'primary',
  }
  return <Tag status={map[status] ?? 'default'}>{status === 'NEW' ? 'New' : status}</Tag>
}

const linkButton = (id: string, label: string, href: string) => (
  <Button id={id} variant='text' href={href}>
    {label}
  </Button>
)

/** True when the BPID is The Londoner Hotel or one of the 10 demo advertisers. */
export const isDemoBpid = (bpid: string | undefined): boolean =>
  !!bpid && (bpid === LONDONER.bpid || !!getDemoAdvertiserByBpid(bpid))

export const DemoMediaPlansTab = ({ bpid }: { bpid: string }) => {
  const plan = getMockSalesforcePlanForAdvertiser(bpid)
  if (!plan) return null
  const rows = [
    {
      key: plan.id,
      name: plan.planName,
      type: plan.planType === 'NEW' ? 'New' : 'Renewal',
      period: `${formatDate(plan.startDate)} to ${formatDate(plan.endDate)}`,
      budget: money(plan.contractBudgetTarget, plan.currency),
      products: plan.products.map(p => p.name).join(', '),
      status: plan.status,
      id: plan.id,
    },
  ]

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: { id: string }) =>
        linkButton(`advertiser-media-plan-${record.id}-btn`, value, `/mediaplanner/edit/${record.id}`),
    },
    { title: 'Plan Type', dataIndex: 'type', key: 'type' },
    { title: 'Period', dataIndex: 'period', key: 'period' },
    { title: 'Contract Budget', dataIndex: 'budget', key: 'budget' },
    { title: 'Products', dataIndex: 'products', key: 'products' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (value: string) => statusTag(value) },
  ]

  // Budget split by channel — the same split the OBA plan and Campaign Setup are built from.
  const demo = getDemoAdvertiserByBpid(bpid)
  const channelRows = demo
    ? activeChannels(demo).map(key => ({
        key,
        channel: DEMO_CHANNEL_INFO[key].label,
        platform: DEMO_CHANNEL_INFO[key].platform,
        share: `${Math.round(demo.shares[key] * 100)}%`,
        budget: money(demo.budgets[key], plan.currency),
      }))
    : Object.entries(LONDONER_CHANNELS).map(([key, channel]) => ({
        key,
        channel: channel.label,
        platform: channel.platform,
        share: `${Math.round(channel.share * 100)}%`,
        budget: money(channel.budget, plan.currency),
      }))
  const channelColumns = [
    { title: 'Channel', dataIndex: 'channel', key: 'channel' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Share of Budget', dataIndex: 'share', key: 'share' },
    { title: 'Budget', dataIndex: 'budget', key: 'budget' },
  ]

  return (
    <>
      <TableWrapper>
        <CardHeaderRow>
          <Text.H5 id='advertiser-media_plans-ttl'>Media Plans</Text.H5>
        </CardHeaderRow>
        <Table
          id='advertiser-media_plans-tbl'
          cellsIdPrefix='advertiser-media_plans'
          rowKey='key'
          columns={columns}
          dataSource={rows}
          pagination={false}
        />
      </TableWrapper>
      <TableWrapper style={{ marginTop: 16 }}>
        <CardHeaderRow>
          <Text.H5 id='advertiser-media_plan_split-ttl'>Budget by Channel</Text.H5>
          <Text.Body style={{ color: colors.cloud_80 }}>{plan.planName}</Text.Body>
        </CardHeaderRow>
        <Table
          id='advertiser-media_plan_split-tbl'
          cellsIdPrefix='advertiser-media_plan_split'
          rowKey='key'
          columns={channelColumns}
          dataSource={channelRows}
          pagination={false}
        />
      </TableWrapper>
    </>
  )
}

export const DemoObaTab = ({ bpid }: { bpid: string }) => {
  const rows = getPlansForAdvertiser(bpid).map(plan => {
    const spent = sum(plan.groups.map(group => sum(Object.values(group.monthSpentCents)))) / 100
    const budget = plan.totalBudgetCents / 100
    return {
      key: plan.id,
      id: plan.id,
      name: plan.name,
      period: `${formatDate(plan.period.startDate)} to ${formatDate(plan.period.endDate)}`,
      budget: money(budget, plan.currency),
      spent: money(spent, plan.currency),
      groups: plan.groups.length,
      campaigns: sum(plan.groups.map(group => group.campaigns.length)),
      status: String(plan.status),
    }
  })

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: { id: string }) =>
        linkButton(`advertiser-oba-plan-${record.id}-btn`, value, `/oba/plans/${record.id}/settings`),
    },
    { title: 'Period', dataIndex: 'period', key: 'period' },
    { title: 'Total Budget', dataIndex: 'budget', key: 'budget' },
    { title: 'Spent', dataIndex: 'spent', key: 'spent' },
    { title: 'Groups', dataIndex: 'groups', key: 'groups' },
    { title: 'Campaigns', dataIndex: 'campaigns', key: 'campaigns' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (value: string) => statusTag(value) },
    {
      title: '',
      key: 'details',
      render: (_: unknown, record: { id: string }) =>
        linkButton(`advertiser-oba-plan-details-${record.id}-btn`, 'Details', `/oba/plans/${record.id}/details`),
    },
  ]

  return (
    <TableWrapper>
      <CardHeaderRow>
        <Text.H5 id='advertiser-oba-ttl'>OBA</Text.H5>
      </CardHeaderRow>
      <Table
        id='advertiser-oba-tbl'
        cellsIdPrefix='advertiser-oba'
        rowKey='key'
        columns={columns}
        dataSource={rows}
        pagination={false}
      />
    </TableWrapper>
  )
}
