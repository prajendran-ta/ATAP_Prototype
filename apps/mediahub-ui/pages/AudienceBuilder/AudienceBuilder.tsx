import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Breadcrumb, Button, Drawer, Input, Pagination, Select, StickyFooter, Table, Text } from '@amadeus/react-design-factory'
import { TableWithFilterBanner } from '@mediahub/mediahub-ui/components/TableWithFilters'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { ColumnType } from 'antd/es/table'
import { AudienceBuilderWrapper } from './AudienceBuilder.styled'
import type { FilterItemWithType } from './AudienceBuilder.d'
import { MOCK_RULES, TRAVEL_INTENT_CATEGORY_LABEL, TRAVEL_INTENT_CATEGORY_OPTIONS, type MockRule } from './mockAudienceRules'
import { MOCK_AUDIENCES, type MockAudience } from '../Audience/mockAudiences'
import { AudienceDrawerContent, AudienceDrawerFooter, AudienceSettingsCard } from '../Audience/Audience.styled'
import { CardHeaderRow } from './AudienceBuilder.styled'
import { getSharedRules, setSharedRules } from '../../shared/audienceRuleStore'
import { getSharedAudiences } from '../../shared/audienceStore'

// Adds the display label alongside the raw enum so the table search can match either.
type RuleRow = MockRule & { travelIntentCategoryLabel: string }
type AudienceUsageRow = Pick<MockAudience, 'id' | 'advertiser' | 'audienceName'>

function AudienceBuilderPage() {
  const navigate = useNavigate()
  const tableRef = useRef<any>(null)
  const [rules] = useState(() => {
    const sharedRules = getSharedRules()
    setSharedRules(sharedRules)
    return sharedRules
  })
  const [usageRuleId, setUsageRuleId] = useState<string | null>(null)
  const [usageSearch, setUsageSearch] = useState('')
  const [usagePage, setUsagePage] = useState(1)
  const availableAudiences = getSharedAudiences()
  const audienceRecords = availableAudiences.length > 0 ? availableAudiences : MOCK_AUDIENCES
  const usageAudiences: AudienceUsageRow[] = usageRuleId
    ? audienceRecords
      .filter(audience => audience.audienceRuleIds.includes(usageRuleId))
      .map(({ id, advertiser, audienceName }) => ({ id, advertiser, audienceName }))
    : []
  const filteredUsageAudiences = usageAudiences.filter(audience => {
    const search = usageSearch.trim().toLowerCase()
    return !search || audience.advertiser.toLowerCase().includes(search) || audience.audienceName.toLowerCase().includes(search)
  })
  const pagedUsageAudiences = filteredUsageAudiences.slice((usagePage - 1) * 10, usagePage * 10)

  const ruleNameOptions = rules.map(rule => ({ label: rule.ruleName, value: rule.ruleName }))

  const handleRuleClick = (ruleId: string) => {
    navigate(`/audience-builder/${ruleId}`)
  }

  const handleUsageClick = (ruleId: string) => {
    setUsageRuleId(ruleId)
    setUsageSearch('')
    setUsagePage(1)
  }

  const columns: ColumnType<RuleRow>[] = [
    {
      title: 'Rule Name',
      dataIndex: 'ruleName',
      key: 'ruleName',
      width: 'auto',
      ellipsis: true,
      render: (value: string, record: RuleRow, index: number) => (
        <Button id={`audience_builder-open-${index}-btn`} variant='text' onClick={() => handleRuleClick(record.id)}>
          {value}
        </Button>
      ),
    },
    {
      title: 'Travel Intent Category',
      dataIndex: 'travelIntentCategory',
      key: 'travelIntentCategory',
      width: '25%',
      ellipsis: true,
      render: (value: string) => TRAVEL_INTENT_CATEGORY_LABEL[value] ?? value,
    },
    {
      title: 'Used in Audiences',
      dataIndex: 'usedInAudiences',
      key: 'usedInAudiences',
      width: '20%',
      ellipsis: true,
      render: (value: number, record: RuleRow) => (
        <Button
          id={`audience_builder-used_in_audiences-${record.id}-btn`}
          variant='text'
          disabled={value === 0}
          onClick={() => handleUsageClick(record.id)}
        >
          {value} {value === 1 ? 'audience' : 'audiences'}
        </Button>
      ),
    },
  ]

  const filterItems: FilterItemWithType<RuleRow>[] = [
    {
      name: 'ruleName',
      label: 'Rule Name',
      type: 'multiple',
      options: ruleNameOptions,
      renderControl: ({ value, setValue }) => (
        <Select
          label='Rule Name'
          id='audience_builder-rule_name_filter-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => setValue(v as FilterValue)}
          options={ruleNameOptions}
          allowClear
        />
      ),
    },
    {
      name: 'travelIntentCategory',
      label: 'Travel Intent Category',
      type: 'multiple',
      options: TRAVEL_INTENT_CATEGORY_OPTIONS,
      renderControl: ({ value, setValue }) => (
        <Select
          label='Travel Intent Category'
          id='audience_builder-travel_intent_category_filter-sel'
          placeholder='Select'
          mode='multiple'
          showSearch
          value={Array.isArray(value) ? value : []}
          onChange={(v: FilterValue) => setValue(v as FilterValue)}
          options={TRAVEL_INTENT_CATEGORY_OPTIONS}
          allowClear
        />
      ),
    },
  ]

  const queryFn = async (): Promise<{ data: RuleRow[]; total: number }> => ({
    data: rules.map(rule => ({
      ...rule,
      usedInAudiences: audienceRecords.filter(audience => audience.audienceRuleIds.includes(rule.id)).length,
      travelIntentCategoryLabel: TRAVEL_INTENT_CATEGORY_LABEL[rule.travelIntentCategory] ?? rule.travelIntentCategory,
    })),
    total: rules.length,
  })

  return (
    <AudienceBuilderWrapper>
      <div id='audience_builder-breadcrumb-nav'>
        <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Audience Rules' }]} />
      </div>
      <TableWithFilterBanner<RuleRow>
        ref={tableRef}
        sectionTitle='Audience Rules'
        titleButtons={
          <Button id='audience_builder-add_rule-btn' variant='solid' onClick={() => navigate('/audience-builder/new')}>
            New Audience Rule
          </Button>
        }
        columns={columns}
        filterItems={filterItems}
        filterMode='client'
        clientSideFilters={['ruleName', 'travelIntentCategory', 'search']}
        queryFn={queryFn}
        tableSearch={{ show: true, placeholder: 'Search', keys: ['ruleName', 'travelIntentCategoryLabel', 'usedInAudiences'] }}
        tableTitle='Rules'
        id='audience_builder-tbl'
        cellsIdPrefix='audience_builder'
        rowKey='id'
      />
      <Drawer
        id='audience_builder-usage-drawer'
        title='Used in Audiences'
        placement='right'
        width='720px'
        open={usageRuleId !== null}
        onClose={() => { setUsageRuleId(null); setUsageSearch(''); setUsagePage(1) }}
      >
        <AudienceDrawerContent>
          <AudienceSettingsCard>
            <CardHeaderRow>
              <Text.H5>Audience rule usage</Text.H5>
              <div style={{ width: 220 }}>
                <Input
                  id='audience_builder-usage-search-inp'
                  placeholder='Search'
                  value={usageSearch}
                  onChange={event => { setUsageSearch(event.target.value); setUsagePage(1) }}
                />
              </div>
            </CardHeaderRow>
            <Table<AudienceUsageRow>
              id='audience_builder-usage-tbl'
              rowKey='id'
              pagination={false}
              dataSource={pagedUsageAudiences}
              columns={[
                { title: 'Advertiser', dataIndex: 'advertiser', key: 'advertiser' },
                { title: 'Audience', dataIndex: 'audienceName', key: 'audienceName' },
              ]}
            />
            <Pagination
              current={usagePage}
              pageSize={10}
              total={filteredUsageAudiences.length}
              showTotal={(total, [_, endItem]) => `${endItem} of ${total} items`}
              showSizeChanger={false}
              onChange={setUsagePage}
            />
          </AudienceSettingsCard>
            <StickyFooter left='calc(100% - 720px)'>
              <AudienceDrawerFooter>
              <Button onClick={() => { setUsageRuleId(null); setUsageSearch(''); setUsagePage(1) }}>Close</Button>
              </AudienceDrawerFooter>
            </StickyFooter>
        </AudienceDrawerContent>
      </Drawer>
    </AudienceBuilderWrapper>
  )
}

export default AudienceBuilderPage
