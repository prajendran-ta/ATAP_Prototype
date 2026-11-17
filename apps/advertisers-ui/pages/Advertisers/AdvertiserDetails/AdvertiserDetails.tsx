import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import Tooltip from 'antd/es/tooltip'
import { Breadcrumb, Button, colors, Drawer, Form, Icon, Input, Modal, Select, Spinner, StickyFooter, Table, Tag, Text, useNotification } from '@amadeus/react-design-factory'
import { AdvertiserDetailsProps } from './AdvertiserDetails.d'
import {
  CardHeaderRow,
  ConnectedAdvertiserChip,
  DrawerActionButtons,
  DrawerActions,
  DrawerContent,
  FieldsWrapper,
  FieldsGrid,
  PlatformDrawerContent,
  PlatformConnectionStatus,
  PlatformConnectionCell,
  PlatformInformationCard,
  PlatformIdInputRow,
  PageTitleRow,
  AdvertiserSectionContent,
  AdvertiserSectionLayout,
  AdvertiserSectionNavigation,
  AdvertiserSectionTab,
  AudienceEnabledTag,
  TableWrapper,
} from './AdvertiserDetails.styled'
import { useGetAdvertiserDetailsQuery } from '../Advertisers.queries'
import { useGetAdvertiserByIdQuery } from '../Advertisers.queries'
import { capitalize } from '@amadeus/react-utils/utils/string'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'
import { getAddedAdvertiserPlatforms, setAddedAdvertiserPlatforms } from '@mediahub/mediahub-ui/shared/advertiserPlatformStore'
import { getAdvertiserReporting, setAdvertiserReporting, seedAdvertiserReporting } from '@mediahub/mediahub-ui/shared/advertiserReportingStore'
import { getKnownPlatformAdvertiser } from '@mediahub/mediahub-ui/shared/platformAdvertiserValidation'
import { AdvertiserCampaignsTable } from '@mediahub/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns'
import { AdvertiserAudiencesTable } from '@mediahub/mediahub-ui/pages/Audience/Audience'
import { seedDemoPlatformsFor } from '@mediahub/mediahub-ui/shared/advertiserPlatformStore'
import { DemoMediaPlansTab, DemoObaTab, isDemoBpid } from './DemoSummaryTabs'

// Labels are shown to users, so normalise free text to Title Case as it's typed.
const toTitleCase = (value: string): string =>
  value.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

const PLATFORM_OPTIONS = [
  'CM360',
  'SA360',
  'Meta (Facebook)',
  'WHIP',
  'Derbysoft',
  'Google DV360',
  'Google ADS',
  'Amadeus DSP',
].map(platform => ({ label: platform, value: platform }))

const AdvertiserDetails = ({ advertiser, index }: AdvertiserDetailsProps) => {
  const { t } = useTranslation(['advertisers', 'common'])

  return (
    <Button id={`advertiser-details-${index}-btn`} variant='text' href={`/advertisers/${advertiser.advertiserId}`}>
        {t('common:details')}
    </Button>
  )
}

export const AdvertiserDetailsContent = ({ advertiser, view = 'settings' }: AdvertiserDetailsProps) => {
  const { t } = useTranslation(['advertisers', 'common'])
  const { isExternal, isAdmin, isStandard } = useAuth()
  // Read-only role (not admin/standard): the Reporting tab is view-only (UX-2.2).
  const isReadOnly = !(isAdmin || isStandard)
  const navigate = useNavigate()
  const location = useLocation()
  const notification = useNotification()
  const initialSummaryView = view === 'summary'
  const requestedSection = new URLSearchParams(location.search).get('section')
  const initialSection = initialSummaryView
    ? ['campaigns', 'audience', 'segmentation', 'media-plans', 'oba'].includes(requestedSection ?? '') ? requestedSection! : 'campaigns'
    : ['general-settings', 'platform-settings', 'reporting-settings'].includes(requestedSection ?? '') ? requestedSection! : 'general-settings'
  const activeTab = initialSummaryView ? 'summary' : 'settings'
  // Demo advertisers (The Londoner Hotel + 10 others) are matched by BPID: a backend-owned one keeps its real id.
  const isDemo = isDemoBpid(advertiser.bpid)
  // Seed the demo platform connections under this advertiser's id (idempotent; no-op for non-demo).
  seedDemoPlatformsFor(advertiser.advertiserId, advertiser.bpid)
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isPlatformDrawerOpen, setIsPlatformDrawerOpen] = useState(false)
  const [isDeletePlatformModalOpen, setIsDeletePlatformModalOpen] = useState(false)
  const [removedPlatformKeys, setRemovedPlatformKeys] = useState<string[]>([])
  // Reporting labels are keyed by BPID so the Campaign Mapping module (which only knows the
  // advertiser by BPID) inherits the same Custom 1/2/3 labels defined here (Req 3).
  const [reporting, setReporting] = useState(() => { seedAdvertiserReporting(); return getAdvertiserReporting(advertiser.bpid) })
  const [isReportingDrawerOpen, setIsReportingDrawerOpen] = useState(false)
  const [reportingDraft, setReportingDraft] = useState(reporting)
  const [addedPlatforms, setAddedPlatforms] = useState<Array<{
    key: string
    platformName: string
    platformAdvertiserName: string
    platformAdvertiserId: string
    connected: boolean
  }>>(() => getAddedAdvertiserPlatforms(advertiser.advertiserId).map(platform => ({
    key: platform.id,
    platformName: platform.platform,
    platformAdvertiserName: platform.advertiserName,
    platformAdvertiserId: platform.advertiserId,
    connected: platform.connected,
  })))
  useEffect(() => {
    const refreshPlatforms = () => {
      setAddedPlatforms(getAddedAdvertiserPlatforms(advertiser.advertiserId).map(platform => ({
        key: platform.id,
        platformName: platform.platform,
        platformAdvertiserName: platform.advertiserName,
        platformAdvertiserId: platform.advertiserId,
        connected: platform.connected,
      })))
    }
    window.addEventListener('storage', refreshPlatforms)
    return () => window.removeEventListener('storage', refreshPlatforms)
  }, [advertiser.advertiserId])
  const [editingPlatformKey, setEditingPlatformKey] = useState<string | null>(null)
  const [platformForm] = Form.useForm<{ platform: string; platformAdvertiserId: string }>()
  const selectedPlatform = Form.useWatch('platform', platformForm)
  const platformAdvertiserId = Form.useWatch('platformAdvertiserId', platformForm)
  const { loading } = useGetAdvertiserDetailsQuery(advertiser.advertiserId)

  const columns = [
    { title: 'Platform', dataIndex: 'platformName', key: 'platformName' },
    { title: 'Platform Advertiser ID', dataIndex: 'platformAdvertiserId', key: 'platformAdvertiserId' },
    { title: 'Platform Advertiser Name', dataIndex: 'platformAdvertiserName', key: 'platformAdvertiserName' },
    {
      title: 'Audience Status',
      key: 'audienceStatus',
      render: (_: unknown, record: { platformName: string }) => {
        const audienceEnabledPlatforms = ['google ads', 'google dv360', 'facebook', 'meta (facebook)', 'amadeus dsp']
        return audienceEnabledPlatforms.includes(record.platformName.toLowerCase())
          ? <AudienceEnabledTag>Audience Enabled</AudienceEnabledTag>
          : null
      },
    },
    {
      title: 'Data Connection',
      dataIndex: 'connected',
      key: 'connected',
      align: 'center' as const,
      render: (connected: boolean) => (
        <Tooltip title={!connected ? 'It may take some time to sync and will turn green once updated.' : undefined}>
          <PlatformConnectionCell>
            <Icon
              name={connected ? 'checkCircle' : 'timesCircle'}
              color={connected ? '#2e8540' : colors.crimson_60}
              width={18}
              height={18}
            />
          </PlatformConnectionCell>
        </Tooltip>
      ),
    },
    {
      title: '',
      key: 'details',
      render: (_: unknown, record: { key: string; platformName: string; platformAdvertiserId: string }) => (
        <Button
          variant='text'
          id={`advertiser-platform-details-${record.key}-btn`}
          onClick={() => {
            setEditingPlatformKey(record.key)
            platformForm.setFieldsValue({ platform: record.platformName, platformAdvertiserId: record.platformAdvertiserId })
            setIsPlatformDrawerOpen(true)
          }}
        >
          Details
        </Button>
      ),
    },
  ]

  const tableData = [
    {
      key: 'default-amadeus-dsp',
      platformName: 'Amadeus DSP',
      platformAdvertiserName: advertiser.advertiserName,
      platformAdvertiserId: String(advertiser.advertiserId),
      connected: true,
    },
    ...addedPlatforms,
  ].filter(platform => !removedPlatformKeys.includes(platform.key))
  const editingPlatform = tableData.find(platform => platform.key === editingPlatformKey)

  const knownPlatformAdvertiser = useMemo(
    () => {
      const normalizedId = platformAdvertiserId?.trim()
      return getKnownPlatformAdvertiser(selectedPlatform, normalizedId)
    },
    [platformAdvertiserId, selectedPlatform],
  )

  const handleAddPlatform = (values: { platform: string; platformAdvertiserId: string }) => {
    const normalizedId = values.platformAdvertiserId.trim()
    const knownAdvertiser = getKnownPlatformAdvertiser(values.platform, normalizedId)
    const platformRow = {
      key: editingPlatformKey ?? `added-${values.platform}-${normalizedId}`,
      platformName: values.platform,
      platformAdvertiserName: knownAdvertiser?.name ?? '-',
      platformAdvertiserId: normalizedId,
      connected: Boolean(knownAdvertiser),
    }
    const nextPlatforms = editingPlatformKey
      ? addedPlatforms.map(platform => (platform.key === editingPlatformKey ? platformRow : platform))
      : [...addedPlatforms, platformRow]
    setAddedPlatforms(nextPlatforms)
    setAddedAdvertiserPlatforms(advertiser.advertiserId, nextPlatforms.map(platform => ({
      id: platform.key,
      platform: platform.platformName,
      advertiserName: platform.platformAdvertiserName,
      advertiserId: platform.platformAdvertiserId,
      connected: platform.connected,
    })))
    notification.success(editingPlatformKey ? 'Platform settings updated successfully.' : 'Platform settings added successfully.')
    setEditingPlatformKey(null)
    setIsPlatformDrawerOpen(false)
    platformForm.resetFields()
  }

  const closePlatformDrawer = () => {
    setIsPlatformDrawerOpen(false)
    setEditingPlatformKey(null)
    platformForm.resetFields()
  }

  const confirmDeletePlatform = () => {
    if (!editingPlatformKey) return
    const nextPlatforms = addedPlatforms.filter(platform => platform.key !== editingPlatformKey)
    setRemovedPlatformKeys(previous => previous.includes(editingPlatformKey) ? previous : [...previous, editingPlatformKey])
    setAddedPlatforms(nextPlatforms)
    setAddedAdvertiserPlatforms(advertiser.advertiserId, nextPlatforms.map(platform => ({
      id: platform.key,
      platform: platform.platformName,
      advertiserName: platform.platformAdvertiserName,
      advertiserId: platform.platformAdvertiserId,
      connected: platform.connected,
    })))
    setIsDeletePlatformModalOpen(false)
    closePlatformDrawer()
    notification.success('Platform settings removed successfully.')
  }


  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    navigate(`${location.pathname}?section=${section}`, { replace: true })
  }

  return (
    <DrawerContent>
      <AdvertiserSectionLayout>
        <AdvertiserSectionNavigation aria-label={activeTab === 'settings' ? 'Advertiser settings sections' : 'Advertiser summary sections'}>
          {(activeTab === 'settings' ? [
            { key: 'general-settings', label: 'General' },
            { key: 'platform-settings', label: 'Platforms' },
            { key: 'reporting-settings', label: 'Reporting' },
          ] : [
            { key: 'campaigns', label: 'Campaigns' },
            // OBA / Media Plans have no per-advertiser summary data except for the demo advertiser.
            { key: 'oba', label: 'OBA', disabled: !isDemo },
            { key: 'audience', label: 'Audience' },
            { key: 'media-plans', label: 'Media Plans', disabled: !isDemo },
          ]).map(section => (
            <AdvertiserSectionTab
              key={section.key}
              type='button'
              active={activeSection === section.key}
              disabled={section.disabled}
              onClick={() => handleSectionChange(section.key)}
            >
              {section.label}
            </AdvertiserSectionTab>
          ))}
        </AdvertiserSectionNavigation>
        <AdvertiserSectionContent>
      {activeTab === 'settings' && activeSection === 'general-settings' && (
        <FieldsWrapper>
          <Text.H5 id='advertiser-drawer_general_settings-ttl'>{t('advertisers:details.generalSettings')}</Text.H5>
          <FieldsGrid>
            <Input id='advertiser-drawer_name-inp' label={t('advertisers:details.advertiserName')} value={capitalize(advertiser.advertiserName)} disabled />
            {!isExternal && <Input id='advertiser-drawer_bpid-inp' label='BPID' value={advertiser.bpid} disabled />}
            <Input id='advertiser-drawer_type-inp' label={t('advertisers:details.advertiserType')} value={advertiser.advertiserTypes || '-'} disabled />
          </FieldsGrid>
        </FieldsWrapper>
      )}

      {activeTab === 'settings' && activeSection === 'platform-settings' && (
        <TableWrapper>
          <CardHeaderRow>
            <Text.H5 id='advertiser-drawer_config_settings-ttl'>Platform Settings</Text.H5>
            <Button id='advertiser-platform-add-btn' variant='solid' onClick={() => setIsPlatformDrawerOpen(true)}>
              Add Platform
            </Button>
          </CardHeaderRow>
          <Table id='advertiser-drawer_configuration-tbl' cellsIdPrefix='advertiser-drawer_configuration' rowKey='key' columns={columns} dataSource={tableData} loading={loading} pagination={false} />
        </TableWrapper>
      )}

      {activeTab === 'settings' && activeSection === 'reporting-settings' && (
        <FieldsWrapper>
          <CardHeaderRow>
            <Text.H5 id='advertiser-drawer_reporting_settings-ttl'>Reporting Settings</Text.H5>
            {!isReadOnly && (
              <Button
                id='advertiser-reporting-edit-btn'
                variant='solid'
                onClick={() => { setReportingDraft(reporting); setIsReportingDrawerOpen(true) }}
              >
                Edit
              </Button>
            )}
          </CardHeaderRow>
          <Text.Body style={{ color: colors.cloud_80 }}>
            The labels defined here are later shown in campaign mapping and reporting.
          </Text.Body>
          <FieldsGrid>
            <Input id='advertiser-drawer_custom1-inp' label='Custom Label 1' value={reporting.custom1 || '-'} disabled />
            <Input id='advertiser-drawer_custom2-inp' label='Custom Label 2' value={reporting.custom2 || '-'} disabled />
            <Input id='advertiser-drawer_custom3-inp' label='Custom Label 3' value={reporting.custom3 || '-'} disabled />
          </FieldsGrid>
        </FieldsWrapper>
      )}

      {activeTab === 'summary' && activeSection === 'campaigns' && (
        /* This advertiser's campaigns (mapped + unmapped) — the Campaign Setup table scoped to
           this advertiser (BPID): a Platform ToggleTab is the only filter, Edit columns is kept
           (Advertiser BPID off by default), no breadcrumb/filter banner/search. Renders a plain
           header + table. No outer TableWrapper card: the table renders its own card, so wrapping
           it again would nest cards. */
        <AdvertiserCampaignsTable advertiserBid={advertiser.bpid} />
      )}

      {activeTab === 'summary' && activeSection === 'audience' && (
        /* Audiences created for this advertiser (same data as the Audience module). */
        <AdvertiserAudiencesTable advertiserName={advertiser.advertiserName} bpid={advertiser.bpid} advertiserId={String(advertiser.advertiserId)} />
      )}

      {activeTab === 'summary' && isDemo && activeSection === 'media-plans' && <DemoMediaPlansTab bpid={advertiser.bpid} />}
      {activeTab === 'summary' && isDemo && activeSection === 'oba' && <DemoObaTab bpid={advertiser.bpid} />}

      {activeTab === 'summary' && !isDemo && (activeSection === 'media-plans' || activeSection === 'oba') && (
        <TableWrapper>
          <Text.H5>{activeSection === 'media-plans' ? 'Media Plans' : 'OBA'}</Text.H5>
          <Text.Body style={{ color: colors.cloud_80, fontStyle: 'italic' }}>No {activeSection === 'media-plans' ? 'media plans' : 'OBA records'} available.</Text.Body>
        </TableWrapper>
      )}
        </AdvertiserSectionContent>
      </AdvertiserSectionLayout>


      <Drawer id='advertiser-platform-drawer' title='Add Platform' placement='right' width='480px' open={isPlatformDrawerOpen} onClose={closePlatformDrawer}>
        <PlatformDrawerContent>
          <Form form={platformForm} layout='vertical' onFinish={handleAddPlatform}>
            <PlatformInformationCard>
              <Text.H5>Platform Information</Text.H5>
              <Form.Item name='platform' label='Platform Name' rules={[{ required: true, message: 'Please select a platform' }]}>
                <Select<string> id='advertiser-platform_name-sel' options={PLATFORM_OPTIONS} placeholder='Select a platform' disabled={editingPlatform?.connected === true} />
              </Form.Item>
              <PlatformIdInputRow>
                <Form.Item name='platformAdvertiserId' label='Platform Advertiser ID' rules={[{ required: true, message: 'Please enter the Platform Advertiser ID' }] }>
                  <Input id='advertiser-platform_advertiser_id-inp' placeholder='Enter platform advertiser ID' disabled={editingPlatform?.connected === true} />
                </Form.Item>
                {platformAdvertiserId?.trim() && (
                  <PlatformConnectionStatus id='advertiser-platform-connection-status'>
                    <Icon
                      name={knownPlatformAdvertiser ? 'checkCircle' : 'timesCircle'}
                      color={knownPlatformAdvertiser ? '#2e8540' : colors.crimson_60}
                      width={18}
                      height={18}
                    />
                  </PlatformConnectionStatus>
                )}
              </PlatformIdInputRow>
              {knownPlatformAdvertiser && (
                <ConnectedAdvertiserChip id='advertiser-platform-connected-chip'>
                  <Icon name='checkCircle' color='#2e8540' width={16} height={16} />
                  <Tag>{knownPlatformAdvertiser.name}</Tag>
                </ConnectedAdvertiserChip>
              )}
            </PlatformInformationCard>
            <StickyFooter left='calc(100% - 480px)'>
              <DrawerActions>
                {editingPlatformKey && !editingPlatform?.connected && (
                  <Button color='danger' variant='outlined' htmlType='button' onClick={() => setIsDeletePlatformModalOpen(true)}>Remove Platform</Button>
                )}
                <DrawerActionButtons>
                  <Button id='advertiser-platform-cancel-btn' variant='outlined' htmlType='button' onClick={closePlatformDrawer}>Cancel</Button>
                  <Button htmlType='submit' id='advertiser-platform-save-btn' disabled={editingPlatform?.connected === true}>Save</Button>
                </DrawerActionButtons>
              </DrawerActions>
            </StickyFooter>
          </Form>
        </PlatformDrawerContent>
      </Drawer>

      <Drawer id='advertiser-reporting-drawer' title='Edit Reporting Settings' placement='right' width='480px' open={isReportingDrawerOpen} onClose={() => setIsReportingDrawerOpen(false)}>
        <PlatformDrawerContent>
          <PlatformInformationCard>
            <Text.H5>Reporting Settings</Text.H5>
            <Text.Body style={{ color: colors.cloud_80 }}>
              The labels defined here are later shown in campaign mapping and reporting.
            </Text.Body>
            <Input
              id='advertiser-reporting_custom1-inp'
              label='Custom Label 1'
              placeholder='Enter Custom Label 1'
              maxLength={255}
              value={reportingDraft.custom1}
              onChange={e => setReportingDraft(r => ({ ...r, custom1: toTitleCase(e.target.value) }))}
            />
            <Input
              id='advertiser-reporting_custom2-inp'
              label='Custom Label 2'
              placeholder='Enter Custom Label 2'
              maxLength={255}
              value={reportingDraft.custom2}
              onChange={e => setReportingDraft(r => ({ ...r, custom2: toTitleCase(e.target.value) }))}
            />
            <Input
              id='advertiser-reporting_custom3-inp'
              label='Custom Label 3'
              placeholder='Enter Custom Label 3'
              maxLength={255}
              value={reportingDraft.custom3}
              onChange={e => setReportingDraft(r => ({ ...r, custom3: toTitleCase(e.target.value) }))}
            />
          </PlatformInformationCard>
          <StickyFooter left='calc(100% - 480px)'>
            <DrawerActions>
              <DrawerActionButtons>
                <Button id='advertiser-reporting-cancel-btn' variant='outlined' htmlType='button' onClick={() => setIsReportingDrawerOpen(false)}>Cancel</Button>
                <Button
                  id='advertiser-reporting-save-btn'
                  htmlType='button'
                  onClick={() => {
                    setReporting(reportingDraft)
                    setAdvertiserReporting(advertiser.bpid, reportingDraft)
                    setIsReportingDrawerOpen(false)
                    notification.success('Reporting settings saved.')
                  }}
                >
                  Save
                </Button>
              </DrawerActionButtons>
            </DrawerActions>
          </StickyFooter>
        </PlatformDrawerContent>
      </Drawer>
      <Modal
        idPrefix='advertiser-platform-delete-modal'
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name='exclamationTriangle' color={colors.pumpkin_60} width={24} height={24} />
            <span>Remove Platform Settings</span>
          </span>
        }
        open={isDeletePlatformModalOpen}
        maskStyle={{ backgroundColor: colors.sky_90 }}
        okText='Remove'
        onOk={confirmDeletePlatform}
        onCancel={() => setIsDeletePlatformModalOpen(false)}
      >
        <Text.Body>Are you sure you want to remove these platform settings? This action cannot be undone.</Text.Body>
        <Text.Body>Would you like to proceed with the Remove?</Text.Body>
      </Modal>
    </DrawerContent>
  )
}

export const AdvertiserDetailsPage = () => {
  const { t } = useTranslation(['advertisers', 'common'])
  const { advertiserId } = useParams<{ advertiserId: string }>()
  const location = useLocation()
  const numericAdvertiserId = advertiserId ? Number(advertiserId) : undefined
  const { data, loading } = useGetAdvertiserByIdQuery(numericAdvertiserId)
  const advertiser = data?.advertisers?.advertisers?.[0]

  const isSummaryView = location.pathname.endsWith('/summary')
    const pageParams = new URLSearchParams(location.search)
    const fromSummary = pageParams.get('from') === 'summary'
    const fromSection = pageParams.get('fromSection')

  if (loading) return <Spinner />
  if (!advertiser) return null

  return (
    <div>
      <Breadcrumb
        items={[
          { title: t('common:home'), href: '/' },
          { title: 'Advertiser', href: '/advertisers' },
          ...(fromSummary ? [{ title: 'Advertiser Details', href: `/advertisers/${advertiserId}/summary?section=${fromSection ?? 'segmentation'}` }] : []),
          { title: isSummaryView ? 'Advertiser Details' : 'Advertiser Settings', href: location.pathname },
        ]}
      />
      <PageTitleRow>
        <Text.H3 id='advertiser-details-page-ttl'>{isSummaryView ? `Advertiser Details - ${capitalize(advertiser.advertiserName)}` : capitalize(advertiser.advertiserName)}</Text.H3>
        {isSummaryView ? (
          <Button variant='solid' href={`/advertisers/${advertiser.advertiserId}/settings?section=general-settings&from=summary&fromSection=segmentation`}>Settings</Button>
        ) : (
          <Button variant='solid' href={`/advertisers/${advertiser.advertiserId}/summary?section=campaigns`}>Details</Button>
        )}
      </PageTitleRow>
      <AdvertiserDetailsContent advertiser={advertiser} view={isSummaryView ? 'summary' : 'settings'} />
    </div>
  )
}

export default AdvertiserDetails
