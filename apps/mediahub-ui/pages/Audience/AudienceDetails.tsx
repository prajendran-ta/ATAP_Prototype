import { useParams } from 'react-router'
import { Breadcrumb, Icon, colors, Input, Select, Table, Text } from '@amadeus/react-design-factory'
import Radio from 'antd/es/radio'
import Switch from 'antd/es/switch'
import { AudienceInformationCard, AudienceWrapper } from './Audience.styled'
import { DATA_TYPE_OPTIONS, MOCK_AUDIENCES } from './mockAudiences'
import { MOCK_RULES } from '../AudienceBuilder/mockAudienceRules'

function AudienceDetailsPage() {
  const { audienceId } = useParams<{ audienceId: string }>()
  const audience = MOCK_AUDIENCES.find(item => item.id === audienceId)

  return (
    <AudienceWrapper>
      <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Audience', href: '/audience' }, { title: audience?.audienceName ?? 'Audience Settings' }]} />
      <Text.H3 id='audience-details-ttl'>Audience Settings</Text.H3>
      <AudienceInformationCard>
        <Text.H5>Audience Information</Text.H5>
        <Input label='Advertiser' value={audience?.advertiser ?? '-'} disabled />
        <Input label='Audience Name' value={audience?.audienceName ?? '-'} disabled />
        <Radio.Group value={audience?.dataType} options={DATA_TYPE_OPTIONS} disabled />
      </AudienceInformationCard>
      <AudienceInformationCard>
        <Text.H5>Platform Settings</Text.H5>
        <Table
          id='audience-details-platforms-tbl'
          rowKey='id'
          pagination={false}
          dataSource={audience?.platformAdvertisers ?? []}
          columns={[
            { title: 'Enable', key: 'enabled', render: () => <Switch defaultChecked /> },
            { title: 'Platform', dataIndex: 'platform', key: 'platform' },
            { title: 'Advertiser Name', dataIndex: 'advertiserName', key: 'advertiserName' },
            { title: 'Advertiser ID', dataIndex: 'advertiserId', key: 'advertiserId' },
            { title: 'Connection', dataIndex: 'connected', key: 'connected', render: (connected: boolean) => <Icon name={connected ? 'checkCircle' : 'timesCircle'} color={connected ? '#2e8540' : colors.crimson_60} width={18} height={18} /> },
          ]}
        />
      </AudienceInformationCard>
      <AudienceInformationCard>
        <Text.H5>Audience Rules</Text.H5>
        <Select<string[]>
          mode='multiple'
          value={audience?.audienceRuleIds}
          options={MOCK_RULES.map(rule => ({ label: rule.ruleName, value: rule.id }))}
          disabled
        />
      </AudienceInformationCard>
    </AudienceWrapper>
  )
}

export default AudienceDetailsPage
