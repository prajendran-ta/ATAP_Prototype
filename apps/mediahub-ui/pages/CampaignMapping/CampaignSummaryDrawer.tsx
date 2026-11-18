import React, { useEffect, useMemo, useState } from 'react'
import { Drawer, Pagination, Table, Tag, Text, ToggleTab, colors } from '@amadeus/react-design-factory'
import {
  AdvertiserSectionContent,
  AdvertiserSectionTab,
} from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'
import {
  buildLondonerCampaignSummary,
  type CampaignSettingsSummary,
  type KeywordRow,
  type SummaryField,
} from '../../components/CampaignFlow/londonerCampaignSummary'
import { ScaledBanner } from '../../components/CampaignCreationCanvas/CampaignAdPreview'
import { LONDONER_CAMPAIGN_SETTINGS } from '../../components/CampaignFlow/londonerCampaignSettings'
import {
  campaignStatusOf,
  isMultipleAdvertisers,
  obaMappingOf,
  platformLabel,
  reportingPlatformForPlatform,
  type UnmappedCampaign,
} from './mockData/unmappedCampaigns'
import CampaignPerformanceCard from './CampaignPerformanceCard'
import * as Styled from './CampaignSummaryDrawer.styled'

type CampaignSummaryDrawerProps = {
  campaign: UnmappedCampaign | null
  onClose: () => void
}

// The same sections as the campaign creation canvas (Basic info, Budget strategy, Targeting, Keywords,
// Creatives), followed by the campaign's mapping status. Keywords only exists for paid search.
type TabKey = 'basic' | 'budget' | 'targeting' | 'keywords' | 'creatives' | 'mapping'
const TAB_LABELS: Record<TabKey, string> = {
  basic: 'Basic info',
  budget: 'Budget strategy',
  targeting: 'Targeting',
  keywords: 'Keywords',
  creatives: 'Creatives',
  mapping: 'Mapping',
}

// Creative languages: ad copy and sitelinks are shown one language at a time (English / French toggle).
type CreativeLanguage = 'en' | 'fr'
const CREATIVE_LANGUAGES: { value: CreativeLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
]
const hasText = (value: string | undefined) => !!value && value !== '—'

const STATUS_LABEL = { live: 'Live', pause: 'Paused', unknown: 'Unknown' } as const
const STATUS_TAG = { live: 'success', pause: 'warning', unknown: 'helper' } as const

const KEY_VALUE_COLUMNS = [
  { title: 'Setting', dataIndex: 'label', key: 'label', width: '32%' },
  { title: 'Value', dataIndex: 'value', key: 'value', render: (value: string) => value || '—' },
]

/** Setting / Value table (ATAP table) for a list of fields. */
const KeyValueTable: React.FC<{ id: string; fields: SummaryField[] }> = ({ id, fields }) => (
  <Table id={id} cellsIdPrefix={id} rowKey='label' columns={KEY_VALUE_COLUMNS} dataSource={fields} pagination={false} />
)

// The same keyword can appear once per match type, so the keyword alone is not a unique row key.
const withRowId = (rows: KeywordRow[]) => rows.map(row => ({ ...row, id: `${row.keyword}|${row.matchType}` }))

const KEYWORD_COLUMNS = [
  { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
  { title: 'Match type', dataIndex: 'matchType', key: 'matchType', width: '25%' },
]

/** Keyword table paged with the design-system Pagination, like the other drawers. */
const KeywordTable: React.FC<{ id: string; rows: KeywordRow[] }> = ({ id, rows }) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const start = (page - 1) * pageSize
  return (
    <>
      <Table
        id={id}
        cellsIdPrefix={id}
        rowKey='id'
        columns={KEYWORD_COLUMNS}
        dataSource={withRowId(rows.slice(start, start + pageSize))}
        pagination={false}
      />
      {rows.length > 10 ? (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={rows.length}
          onChange={(nextPage, nextSize) => {
            setPage(nextPage)
            setPageSize(nextSize)
          }}
        />
      ) : null}
    </>
  )
}

/**
 * Read-only summary of a campaign, opened from the campaign name in Campaign Setup. Vertical tabs follow the
 * campaign creation canvas (Basic info · Budget strategy · Targeting · Keywords · Creatives), then Mapping, and every
 * section is an ATAP table. Settings beyond Basic info exist for the campaigns created with Max (they carry
 * a `maxCampaign` reference); for other campaigns only the basic facts are known.
 */
export const CampaignSummaryDrawer: React.FC<CampaignSummaryDrawerProps> = ({ campaign, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const summary: CampaignSettingsSummary | null = useMemo(
    () =>
      campaign?.maxCampaign
        ? buildLondonerCampaignSummary(campaign.maxCampaign)
        : ((campaign && LONDONER_CAMPAIGN_SETTINGS[campaign.externalCampaignId]) ?? null),
    [campaign],
  )
  const [creativeLanguage, setCreativeLanguage] = useState<CreativeLanguage>('en')
  // Start on Basic info (and the first creative language) for each campaign.
  useEffect(() => {
    setActiveTab('basic')
    setCreativeLanguage('en')
  }, [campaign?.id])

  const tabs: TabKey[] = summary
    ? [
        'basic',
        'budget',
        'targeting',
        ...(summary.keywords ? (['keywords'] as TabKey[]) : []),
        ...(summary.creatives ? (['creatives'] as TabKey[]) : []),
        'mapping',
      ]
    : ['basic', 'mapping']

  const renderBasic = (current: UnmappedCampaign) => {
    return (
      <Styled.Panel>
        <CampaignPerformanceCard
          campaignId={current.externalCampaignId}
          platform={current.platform}
          status={campaignStatusOf(current)}
          budget={summary?.basicInfo.find(field => field.label === 'Budget')?.value}
        />
        <Styled.Card>
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
        </Styled.Card>
        {!summary ? (
          <Styled.Note>
            Budget, targeting, keyword and creative settings are shown for campaigns created with Amadeus Max. This
            campaign was not created there.
          </Styled.Note>
        ) : null}
      </Styled.Panel>
    )
  }

  const renderMapping = (current: UnmappedCampaign) => {
    const mapping = [
      { label: 'Advertiser mapping', state: isMultipleAdvertisers(current) ? 'unmapped' : current.advertiserMapping },
      { label: 'Campaign mapping', state: current.campaignMapping },
      { label: 'Offers mapping', state: current.offersMapping },
      { label: 'Invoice mapping', state: current.invoiceMapping },
      { label: 'OBA mapping', state: obaMappingOf(current) },
    ]
    return (
      <Styled.Card>
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
      </Styled.Card>
    )
  }

  const renderKeywords = (keywords: NonNullable<CampaignSettingsSummary['keywords']>) => (
    <Styled.Panel>
      <Styled.Card>
        <Text.H5>
          {keywords.tactic} keywords ({keywords.keywords.length})
        </Text.H5>
        <KeywordTable id='campaign-summary-keywords' rows={keywords.keywords} />
      </Styled.Card>
      <Styled.Card>
        <Text.H5>Negative keywords ({keywords.negative.length})</Text.H5>
        <KeywordTable id='campaign-summary-negative-keywords' rows={keywords.negative} />
      </Styled.Card>
    </Styled.Panel>
  )

  const renderCreatives = (creatives: NonNullable<CampaignSettingsSummary['creatives']>) => {
    // Only the languages the campaign has copy in (e.g. French-only campaigns get no English tab).
    const languages = CREATIVE_LANGUAGES.filter(({ value }) =>
      value === 'en'
        ? creatives.copy?.some(row => hasText(row.english)) || creatives.sitelinks?.some(row => hasText(row.titleEn))
        : creatives.copy?.some(row => hasText(row.french)) || creatives.sitelinks?.some(row => hasText(row.titleFr)),
    )
    const language = languages.some(({ value }) => value === creativeLanguage)
      ? creativeLanguage
      : (languages[0]?.value ?? 'en')
    const isEnglish = language === 'en'
    const copy = creatives.copy?.map(row => ({ field: row.field, text: isEnglish ? row.english : row.french }))
    const sitelinks = creatives.sitelinks?.map(row => ({
      n: row.n,
      title: isEnglish ? row.titleEn : row.titleFr,
      description: isEnglish ? row.descriptionEn : row.descriptionFr,
    }))
    return (
      <Styled.Panel>
        <Styled.Card>
          <KeyValueTable id='campaign-summary-creatives' fields={creatives.fields} />
        </Styled.Card>
        {creatives.images && creatives.images.length > 0 ? (
          <Styled.Card>
            <Text.H5>Image assets ({creatives.images.length})</Text.H5>
            <Styled.ImageStrip id='campaign-summary-images'>
              {creatives.images.map(image => (
                <Styled.ImageThumb key={image.path} src={image.path} alt={image.name} title={image.name} />
              ))}
            </Styled.ImageStrip>
          </Styled.Card>
        ) : null}
        {creatives.videos && creatives.videos.length > 0 ? (
          <Styled.Card>
            <Text.H5>YouTube video{creatives.videos.length > 1 ? `s (${creatives.videos.length})` : ''}</Text.H5>
            <Styled.VideoList id='campaign-summary-videos'>
              {creatives.videos.map(video => {
                const url = `https://www.youtube.com/watch?v=${video.youtubeId}`
                return (
                  <Styled.VideoItem key={video.youtubeId}>
                    <a
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Watch ${video.name} on YouTube`}
                    >
                      <Styled.VideoThumb src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt='' />
                    </a>
                    <Styled.VideoInfo>
                      <strong>{video.name}</strong>
                      <a href={url} target='_blank' rel='noopener noreferrer'>
                        {url}
                      </a>
                      <span>
                        {video.length} · {video.format}
                      </span>
                    </Styled.VideoInfo>
                  </Styled.VideoItem>
                )
              })}
            </Styled.VideoList>
          </Styled.Card>
        ) : null}
        {languages.length > 1 ? (
          <ToggleTab
            id='campaign-summary-creative-language'
            value={language}
            onChange={value => setCreativeLanguage(value as CreativeLanguage)}
            options={languages.map(({ value, label }) => ({
              value,
              label: <span id={`campaign-summary-creative-language-${value}`}>{label}</span>,
            }))}
          />
        ) : null}
        {copy ? (
          <Styled.Card>
            <Text.H5>Ad copy</Text.H5>
            <Table
              id='campaign-summary-copy'
              cellsIdPrefix='campaign-summary-copy'
              rowKey='field'
              pagination={false}
              dataSource={copy}
              columns={[
                { title: 'Field', dataIndex: 'field', key: 'field', width: '16%' },
                { title: 'Text', dataIndex: 'text', key: 'text', render: (value: string) => value || '—' },
              ]}
            />
          </Styled.Card>
        ) : null}
        {sitelinks && sitelinks.length > 0 ? (
          <Styled.Card>
            <Text.H5>Sitelinks</Text.H5>
            <Table
              id='campaign-summary-sitelinks'
              cellsIdPrefix='campaign-summary-sitelinks'
              rowKey='n'
              pagination={false}
              dataSource={sitelinks}
              columns={[
                { title: '#', dataIndex: 'n', key: 'n', width: '5%' },
                { title: 'Title', dataIndex: 'title', key: 'title', width: '30%' },
                { title: 'Description', dataIndex: 'description', key: 'description' },
              ]}
            />
          </Styled.Card>
        ) : null}
        {creatives.banners && creatives.banners.length > 0 ? (
          <Styled.Card>
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
          </Styled.Card>
        ) : null}
      </Styled.Panel>
    )
  }

  const renderTab = (current: UnmappedCampaign) => {
    if (activeTab === 'mapping') return renderMapping(current)
    if (!summary || activeTab === 'basic') return renderBasic(current)
    switch (activeTab) {
      case 'budget':
        return (
          <Styled.Card>
            <KeyValueTable id='campaign-summary-budget' fields={summary.budgetStrategy} />
          </Styled.Card>
        )
      case 'targeting':
        return (
          <Styled.Card>
            <KeyValueTable id='campaign-summary-targeting' fields={summary.targeting} />
          </Styled.Card>
        )
      case 'keywords':
        return summary.keywords ? renderKeywords(summary.keywords) : renderBasic(current)
      case 'creatives':
        return summary.creatives ? renderCreatives(summary.creatives) : renderBasic(current)
      default:
        return renderBasic(current)
    }
  }

  const renderTitle = (current: UnmappedCampaign) => {
    const status = campaignStatusOf(current)
    const reporting = current.reportingPlatform || reportingPlatformForPlatform(current.platform)
    return (
      <Styled.DrawerTitle>
        <Styled.DrawerTitleRow>
          <Styled.DrawerTitleName>{current.externalCampaignName}</Styled.DrawerTitleName>
          <Tag status={STATUS_TAG[status]}>{STATUS_LABEL[status]}</Tag>
          {reporting && reporting !== '-' ? (
            <Tag status='default' color={colors.cloud_30}>
              {reporting}
            </Tag>
          ) : null}
        </Styled.DrawerTitleRow>
        <Styled.DrawerSubtitle id='campaign-summary-advertiser'>
          {current.advertiserBid ? current.advertiserName : 'Advertiser not mapped'}
        </Styled.DrawerSubtitle>
      </Styled.DrawerTitle>
    )
  }

  return (
    <Drawer
      id='campaign-summary-drawer'
      title={campaign ? renderTitle(campaign) : 'Campaign'}
      placement='right'
      width='min(1100px, 92vw)'
      open={Boolean(campaign)}
      onClose={onClose}
    >
      {campaign ? (
        <Styled.SummaryLayout data-testid='campaign-summary-drawer'>
          <Styled.SummaryNavigation aria-label='Campaign summary sections'>
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
          </Styled.SummaryNavigation>
          <AdvertiserSectionContent>
            <Text.H5 id='campaign-summary-title'>{TAB_LABELS[activeTab]}</Text.H5>
            {renderTab(campaign)}
          </AdvertiserSectionContent>
        </Styled.SummaryLayout>
      ) : null}
    </Drawer>
  )
}

export default CampaignSummaryDrawer
