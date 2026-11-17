import React, { useEffect, useMemo, useState } from 'react'
import { Drawer, Table, Tag, Text } from '@amadeus/react-design-factory'
import {
  AdvertiserSectionContent,
  AdvertiserSectionNavigation,
  AdvertiserSectionTab,
} from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'
import {
  buildLondonerCampaignSummary,
  type CampaignSettingsSummary,
  type SummaryField,
} from '../../components/CampaignFlow/londonerCampaignSummary'
import { ScaledBanner } from '../../components/CampaignCreationCanvas/CampaignAdPreview'
import {
  campaignStatusOf,
  isMultipleAdvertisers,
  platformLabel,
  reportingPlatformForPlatform,
  type UnmappedCampaign,
} from './mockData/unmappedCampaigns'
import * as Styled from './CampaignSummaryDrawer.styled'

type CampaignSummaryDrawerProps = {
  campaign: UnmappedCampaign | null
  onClose: () => void
}

// The same sections as the campaign creation canvas (Basic info, Budget strategy, Targeting, Keywords,
// Creatives). Keywords only exists for paid search.
type TabKey = 'basic' | 'budget' | 'targeting' | 'keywords' | 'creatives'
const TAB_LABELS: Record<TabKey, string> = {
  basic: 'Basic info',
  budget: 'Budget strategy',
  targeting: 'Targeting',
  keywords: 'Keywords',
  creatives: 'Creatives',
}

const STATUS_LABEL = { live: 'Live', pause: 'Paused', unknown: 'Unknown' } as const

const KEY_VALUE_COLUMNS = [
  { title: 'Setting', dataIndex: 'label', key: 'label', width: '32%' },
  { title: 'Value', dataIndex: 'value', key: 'value', render: (value: string) => value || '—' },
]

/** Setting / Value table (ATAP table) for a list of fields. */
const KeyValueTable: React.FC<{ id: string; fields: SummaryField[] }> = ({ id, fields }) => (
  <Table id={id} cellsIdPrefix={id} rowKey='label' columns={KEY_VALUE_COLUMNS} dataSource={fields} pagination={false} />
)

const PAGED = { pageSize: 10, hideOnSinglePage: true, size: 'small' as const }

/**
 * Read-only summary of a campaign, opened from the campaign name in Campaign Setup. Vertical tabs follow the
 * campaign creation canvas (Basic info · Budget strategy · Targeting · Keywords · Creatives) and every
 * section is an ATAP table. Settings beyond Basic info exist for the campaigns created with Max (they carry
 * a `maxCampaign` reference); for other campaigns only the basic facts are known.
 */
export const CampaignSummaryDrawer: React.FC<CampaignSummaryDrawerProps> = ({ campaign, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const summary: CampaignSettingsSummary | null = useMemo(
    () => (campaign?.maxCampaign ? buildLondonerCampaignSummary(campaign.maxCampaign) : null),
    [campaign],
  )
  // Start on Basic info for each campaign.
  useEffect(() => setActiveTab('basic'), [campaign?.id])

  const tabs: TabKey[] = summary
    ? ['basic', 'budget', 'targeting', ...(summary.keywords ? (['keywords'] as TabKey[]) : []), 'creatives']
    : ['basic']

  const renderBasic = (current: UnmappedCampaign) => {
    const mapping = [
      { label: 'Advertiser mapping', state: isMultipleAdvertisers(current) ? 'unmapped' : current.advertiserMapping },
      { label: 'Campaign mapping', state: current.campaignMapping },
      { label: 'Offers mapping', state: current.offersMapping },
      { label: 'Invoice mapping', state: current.invoiceMapping },
      { label: 'OBA mapping', state: current.obaMapping ?? 'unmapped' },
    ]
    return (
      <Styled.Panel>
        <KeyValueTable
          id='campaign-summary-basic'
          fields={[
            { label: 'Campaign name', value: current.externalCampaignName },
            { label: 'Campaign ID', value: current.externalCampaignId },
            { label: 'Platform', value: platformLabel(current.platform) },
            {
              label: 'Reporting platform',
              value: current.reportingPlatform || reportingPlatformForPlatform(current.platform) || '—',
            },
            {
              label: 'Platform advertiser',
              value: `${current.externalAdvertiserName} (${current.externalAdvertiserId})`,
            },
            {
              label: 'Advertiser',
              value: current.advertiserBid ? `${current.advertiserName} (${current.advertiserBid})` : 'Not mapped',
            },
            { label: 'Campaign status', value: STATUS_LABEL[campaignStatusOf(current)] },
            ...(summary?.basicInfo ?? []),
          ]}
        />
        <Text.H5>Mapping</Text.H5>
        <Table
          id='campaign-summary-mapping'
          cellsIdPrefix='campaign-summary-mapping'
          rowKey='label'
          pagination={false}
          dataSource={mapping}
          columns={[
            { title: 'Mapping', dataIndex: 'label', key: 'label', width: '32%' },
            {
              title: 'Status',
              dataIndex: 'state',
              key: 'state',
              render: (state: string) => (
                <Tag status={state === 'mapped' ? 'success' : 'error'}>
                  {state === 'mapped' ? 'Mapped' : 'Unmapped'}
                </Tag>
              ),
            },
          ]}
        />
        {!summary ? (
          <Styled.Note>
            Budget, targeting, keyword and creative settings are shown for campaigns created with Amadeus Max. This
            campaign was not created there.
          </Styled.Note>
        ) : null}
      </Styled.Panel>
    )
  }

  const renderKeywords = (keywords: NonNullable<CampaignSettingsSummary['keywords']>) => (
    <Styled.Panel>
      <Styled.TableBlock>
        <Text.H5>
          {keywords.tactic} keywords ({keywords.keywords.length})
        </Text.H5>
        <Table
          id='campaign-summary-keywords'
          cellsIdPrefix='campaign-summary-keywords'
          rowKey='keyword'
          pagination={PAGED}
          dataSource={keywords.keywords}
          columns={[
            { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
            { title: 'Match type', dataIndex: 'matchType', key: 'matchType', width: '25%' },
          ]}
        />
      </Styled.TableBlock>
      <Styled.TableBlock>
        <Text.H5>Negative keywords ({keywords.negative.length})</Text.H5>
        <Table
          id='campaign-summary-negative-keywords'
          cellsIdPrefix='campaign-summary-negative-keywords'
          rowKey='keyword'
          pagination={PAGED}
          dataSource={keywords.negative}
          columns={[
            { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
            { title: 'Match type', dataIndex: 'matchType', key: 'matchType', width: '25%' },
          ]}
        />
      </Styled.TableBlock>
    </Styled.Panel>
  )

  const renderCreatives = (creatives: CampaignSettingsSummary['creatives']) => (
    <Styled.Panel>
      <KeyValueTable id='campaign-summary-creatives' fields={creatives.fields} />
      {creatives.copy ? (
        <Styled.TableBlock>
          <Text.H5>Ad copy</Text.H5>
          <Table
            id='campaign-summary-copy'
            cellsIdPrefix='campaign-summary-copy'
            rowKey='field'
            pagination={false}
            dataSource={creatives.copy}
            columns={[
              { title: 'Field', dataIndex: 'field', key: 'field', width: '16%' },
              { title: 'English', dataIndex: 'english', key: 'english' },
              { title: 'French', dataIndex: 'french', key: 'french' },
            ]}
          />
        </Styled.TableBlock>
      ) : null}
      {creatives.sitelinks && creatives.sitelinks.length > 0 ? (
        <Styled.TableBlock>
          <Text.H5>Sitelinks</Text.H5>
          <Table
            id='campaign-summary-sitelinks'
            cellsIdPrefix='campaign-summary-sitelinks'
            rowKey='n'
            pagination={false}
            dataSource={creatives.sitelinks}
            columns={[
              { title: '#', dataIndex: 'n', key: 'n', width: '5%' },
              { title: 'Title (English)', dataIndex: 'titleEn', key: 'titleEn' },
              { title: 'Description (English)', dataIndex: 'descriptionEn', key: 'descriptionEn' },
              { title: 'Title (French)', dataIndex: 'titleFr', key: 'titleFr' },
              { title: 'Description (French)', dataIndex: 'descriptionFr', key: 'descriptionFr' },
            ]}
          />
        </Styled.TableBlock>
      ) : null}
      {creatives.banners && creatives.banners.length > 0 ? (
        <Styled.TableBlock>
          <Text.H5>HTML5 banners ({creatives.banners.length})</Text.H5>
          <Table
            id='campaign-summary-banners'
            cellsIdPrefix='campaign-summary-banners'
            rowKey='id'
            pagination={false}
            dataSource={creatives.banners}
            columns={[
              { title: 'Size', dataIndex: 'size', key: 'size', width: '16%' },
              {
                title: 'Preview',
                key: 'preview',
                render: (_: unknown, banner: (typeof creatives.banners & object)[number]) => (
                  <Styled.BannerCell>
                    <ScaledBanner banner={banner} boxHeight={72} />
                  </Styled.BannerCell>
                ),
              },
              { title: 'File', dataIndex: 'path', key: 'path' },
            ]}
          />
        </Styled.TableBlock>
      ) : null}
    </Styled.Panel>
  )

  const renderTab = (current: UnmappedCampaign) => {
    if (!summary || activeTab === 'basic') return renderBasic(current)
    switch (activeTab) {
      case 'budget':
        return <KeyValueTable id='campaign-summary-budget' fields={summary.budgetStrategy} />
      case 'targeting':
        return <KeyValueTable id='campaign-summary-targeting' fields={summary.targeting} />
      case 'keywords':
        return summary.keywords ? renderKeywords(summary.keywords) : renderBasic(current)
      case 'creatives':
        return renderCreatives(summary.creatives)
      default:
        return renderBasic(current)
    }
  }

  return (
    <Drawer
      id='campaign-summary-drawer'
      title={campaign?.externalCampaignName ?? 'Campaign'}
      placement='right'
      width='min(1100px, 92vw)'
      open={Boolean(campaign)}
      onClose={onClose}
    >
      {campaign ? (
        <Styled.SummaryLayout data-testid='campaign-summary-drawer'>
          <AdvertiserSectionNavigation aria-label='Campaign summary sections'>
            {tabs.map(tab => (
              <AdvertiserSectionTab
                key={tab}
                type='button'
                id={`campaign-summary-tab-${tab}`}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {TAB_LABELS[tab]}
              </AdvertiserSectionTab>
            ))}
          </AdvertiserSectionNavigation>
          <AdvertiserSectionContent>
            <Text.H5 id='campaign-summary-title'>
              {TAB_LABELS[activeTab]}
              {summary && activeTab !== 'basic' ? ` · ${summary.platformName}` : ''}
            </Text.H5>
            {renderTab(campaign)}
          </AdvertiserSectionContent>
        </Styled.SummaryLayout>
      ) : null}
    </Drawer>
  )
}

export default CampaignSummaryDrawer
