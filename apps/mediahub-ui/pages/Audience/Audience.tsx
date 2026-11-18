import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Breadcrumb, Button, Select, ToggleTab } from '@amadeus/react-design-factory'
import { TableWithFilterBanner } from '@mediahub/mediahub-ui/components/TableWithFilters'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType } from 'antd/es/table'
import { AudienceNoWrap, AudiencePlatformChip, AudiencePlatformChipRow, AudienceWrapper } from './Audience.styled'
import { DATA_TYPE_LABEL, DATA_TYPE_OPTIONS, MOCK_AUDIENCES, type MockAudience } from './mockAudiences'
import { useGetAdvertiserOptionsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { getSharedAudiences, setSharedAudiences } from '@mediahub/mediahub-ui/shared/audienceStore'
import { isLondonerAdvertiser } from '@mediahub/mediahub-ui/shared/londonerHotel'
import { isFollowedDemoAdvertiser, londonerFirst } from '@mediahub/mediahub-ui/shared/londonerFollowStore'
import { findDemoAdvertiser } from '@mediahub/mediahub-ui/shared/demoAdvertisers'

type AudienceRow = MockAudience

const renderPlatformChips = (record: AudienceRow) => {
  const platforms = record.platformAdvertisers.length > 0
    ? record.platformAdvertisers
    : record.channels.split(', ').filter(platform => platform && platform !== 'Not configured').map((platform, index) => ({ id: `${record.id}-${index}`, platform, advertiserName: '-', advertiserId: '-', connected: false }))

  return <AudiencePlatformChipRow>{platforms.map(platform => <AudiencePlatformChip key={`${record.id}-${platform.id}-${platform.platform}`} $isAmadeus={platform.platform.trim().toLowerCase() === 'amadeus dsp'}>{platform.platform}</AudiencePlatformChip>)}</AudiencePlatformChipRow>
}

function AudiencePage() {
  const tableRef = useRef<any>(null)
  const navigate = useNavigate()
  const [showMyAudiences, setShowMyAudiences] = useState(true)
  const [audiences, setAudiences] = useState(() => {
    const sharedAudiences = getSharedAudiences()
    if (sharedAudiences.length > 0) return sharedAudiences
    setSharedAudiences(MOCK_AUDIENCES)
    return MOCK_AUDIENCES
  })
  const { data: advertiserData } = useGetAdvertiserOptionsQuery()

  const advertiserOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
    label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
    value: String(advertiser.advertiserId),
  }))

  const advertiserFilterOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
    label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
    value: advertiser.advertiserName,
  }))
  const audienceNameOptions = [...new Set(audiences.map(audience => audience.audienceName))].map(value => ({ label: value, value }))
  const dataTypeOptions = DATA_TYPE_OPTIONS

  const columns: ColumnType<AudienceRow>[] = [
    {
      title: 'Audience Name', dataIndex: 'audienceName', key: 'audienceName',
      render: (value: string, record: AudienceRow) => (
        <Button variant='text' id={`audience-open-${record.id}-btn`} onClick={() => {
          navigate(`/audience/${record.id}/edit`)
        }}>{value}</Button>
      ),
    },
    { title: 'Advertiser(BPID)', dataIndex: 'advertiser', key: 'advertiser', width: '20%' },
    { title: 'Data Type', dataIndex: 'dataType', key: 'dataType', width: '12%', render: (value: string) => DATA_TYPE_LABEL[value] ?? value },
    { title: 'Platform', dataIndex: 'platformAdvertisers', key: 'platform', render: (_: unknown, record: AudienceRow) => <AudienceNoWrap>{renderPlatformChips(record)}</AudienceNoWrap> },
    { title: 'Audience Size', dataIndex: 'audienceSize', key: 'audienceSize', render: (value: number) => <AudienceNoWrap>{value}</AudienceNoWrap> },
    { title: 'Last Upload', dataIndex: 'lastUpload', key: 'lastUpload', render: (value: string) => <AudienceNoWrap>{value}</AudienceNoWrap> },
    { title: 'Next Upload', dataIndex: 'nextUpload', key: 'nextUpload', render: (value: string) => <AudienceNoWrap>{value}</AudienceNoWrap> },
  ]

  const filterItems = [
    {
      name: 'advertiser', label: 'Advertiser(BPID)', type: 'multiple' as const, options: advertiserFilterOptions,
      renderControl: ({ value, setValue }: { value: FilterValue; setValue: (value: FilterValue) => void }) => (
        <Select label='Advertiser(BPID)' id='audience-advertiser_filter-sel' placeholder='Select' mode='multiple' showSearch value={Array.isArray(value) ? value : []} onChange={setValue} options={advertiserFilterOptions} allowClear />
      ),
    },
    {
      name: 'audienceName', label: 'Audience Name', type: 'multiple' as const, options: audienceNameOptions,
      renderControl: ({ value, setValue }: { value: FilterValue; setValue: (value: FilterValue) => void }) => (
        <Select label='Audience Name' id='audience-name_filter-sel' placeholder='Select' mode='multiple' showSearch value={Array.isArray(value) ? value : []} onChange={setValue} options={audienceNameOptions} allowClear />
      ),
    },
    {
      name: 'dataType', label: 'Data Type', type: 'multiple' as const, options: dataTypeOptions,
      renderControl: ({ value, setValue }: { value: FilterValue; setValue: (value: FilterValue) => void }) => (
        <Select label='Data Type' id='audience-data_type_filter-sel' placeholder='Select' mode='multiple' showSearch value={Array.isArray(value) ? value : []} onChange={setValue} options={dataTypeOptions} allowClear />
      ),
    },
  ]

  const followedAdvertisers = (advertiserData?.advertisers?.advertisers ?? [])
    .filter(advertiser => advertiser.isFollowing !== false)
  const isFollowedAdvertiser = (audience: AudienceRow) => {
    // Demo advertisers (Londoner + the 19 in demoAdvertisers.ts): follow state is live (persisted
    // store); the cached advertiser lookup can be stale.
    if (isLondonerAdvertiser(audience.advertiser) || findDemoAdvertiser(audience.advertiser)) {
      return isFollowedDemoAdvertiser(audience.advertiser)
    }
    const audienceAdvertiser = audience.advertiser.trim().toLowerCase()
    return followedAdvertisers.some(advertiser => (
      audienceAdvertiser === advertiser.advertiserName.trim().toLowerCase()
      || audienceAdvertiser.startsWith(`${advertiser.advertiserName.trim().toLowerCase()} (`)
      || audienceAdvertiser.includes(String(advertiser.bpid).trim().toLowerCase())
      || audienceAdvertiser === String(advertiser.advertiserId).toLowerCase()
    ))
  }
  // The Londoner Hotel (followed demo advertiser) always sits at the top.
  const visibleAudiences = londonerFirst(
    showMyAudiences ? audiences.filter(isFollowedAdvertiser) : audiences,
    audience => isLondonerAdvertiser(audience.advertiser),
  )
  const audienceQueryFn = async (): Promise<{ data: AudienceRow[]; total: number }> => ({ data: visibleAudiences, total: visibleAudiences.length })
  const audienceTableKey = [
    audiences.length,
    showMyAudiences,
    ...(advertiserData?.advertisers?.advertisers ?? []).map(advertiser => `${advertiser.advertiserId}:${advertiser.isFollowing}`),
  ].join('|')
  return (
    <AudienceWrapper>
      <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Audience' }]} />
      <TableWithFilterBanner<AudienceRow>
        key={`audience-table-${audienceTableKey}`}
        ref={tableRef}
        sectionTitle='Audience'
        titleButtons={<Button id='audience-add-btn' variant='solid' onClick={() => navigate('/audience/new')}>New Audience</Button>}
        tableCustomControls={
            <ToggleTab<boolean>
              options={[
                { label: 'My Audience', value: true },
                { label: 'All Audience', value: false },
              ]}
              onChange={setShowMyAudiences}
            />
          }
        columns={columns}
        filterItems={filterItems}
        filterMode='client'
        clientSideFilters={['advertiser', 'audienceName', 'dataType', 'search']}
        queryFn={audienceQueryFn}
        tableTitle='Audiences'
        tableSearch={{ show: true, placeholder: 'Search', keys: ['advertiser', 'audienceName', 'dataType', 'channels'] }}
        id='audience-tbl'
        cellsIdPrefix='audience'
        rowKey='id'
      />
    </AudienceWrapper>
  )
}

/** Audiences created for ONE advertiser (Advertiser Details → Audience tab). Same table as the
 *  Audience page, scoped by advertiser: no Advertiser column, no filter banner, search kept.
 *  Audiences store the advertiser as free text (name, sometimes "Name (BPID)"), so match on
 *  name / BPID / id like the "My Audience" filter does. */
export function AdvertiserAudiencesTable({ advertiserName, bpid, advertiserId }: { advertiserName: string; bpid: string; advertiserId: string }) {
  const navigate = useNavigate()
  const [audiences] = useState(() => {
    const shared = getSharedAudiences()
    if (shared.length > 0) return shared
    setSharedAudiences(MOCK_AUDIENCES)
    return MOCK_AUDIENCES
  })

  const name = advertiserName.trim().toLowerCase()
  const bpidLower = String(bpid).trim().toLowerCase()
  const scopedAudiences = audiences.filter(audience => {
    const owner = audience.advertiser.trim().toLowerCase()
    return owner === name
      || owner.startsWith(`${name} (`)
      || (!!bpidLower && owner.includes(bpidLower))
      || owner === String(advertiserId).toLowerCase()
  })

  const columns: ColumnType<AudienceRow>[] = [
    {
      title: 'Audience Name', dataIndex: 'audienceName', key: 'audienceName',
      render: (value: string, record: AudienceRow) => (
        <Button variant='text' id={`advertiser-audience-open-${record.id}-btn`} onClick={() => navigate(`/audience/${record.id}/edit`)}>{value}</Button>
      ),
    },
    { title: 'Data Type', dataIndex: 'dataType', key: 'dataType', width: '14%', render: (value: string) => DATA_TYPE_LABEL[value] ?? value },
    { title: 'Platform', dataIndex: 'platformAdvertisers', key: 'platform', render: (_: unknown, record: AudienceRow) => <AudienceNoWrap>{renderPlatformChips(record)}</AudienceNoWrap> },
    { title: 'Audience Size', dataIndex: 'audienceSize', key: 'audienceSize', render: (value: number) => <AudienceNoWrap>{value}</AudienceNoWrap> },
    { title: 'Last Upload', dataIndex: 'lastUpload', key: 'lastUpload', render: (value: string) => <AudienceNoWrap>{value}</AudienceNoWrap> },
    { title: 'Next Upload', dataIndex: 'nextUpload', key: 'nextUpload', render: (value: string) => <AudienceNoWrap>{value}</AudienceNoWrap> },
  ]

  const queryFn = async (): Promise<{ data: AudienceRow[]; total: number }> => ({ data: scopedAudiences, total: scopedAudiences.length })

  return (
    <TableWithFilterBanner<AudienceRow>
      key={`advertiser-audience-table-${scopedAudiences.length}`}
      showFilterBanner={false}
      columns={columns}
      filterItems={[]}
      filterMode='client'
      clientSideFilters={['search']}
      queryFn={queryFn}
      tableTitle='Audiences'
      tableSearch={{ show: true, placeholder: 'Search', keys: ['audienceName', 'dataType', 'channels'] }}
      id='advertiser-audience-tbl'
      cellsIdPrefix='advertiser-audience'
      rowKey='id'
    />
  )
}

export default AudiencePage
