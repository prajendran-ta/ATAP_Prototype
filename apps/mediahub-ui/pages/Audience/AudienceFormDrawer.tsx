import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Breadcrumb, Button, colors, Drawer, Form, Icon, Input, Modal, Select, StickyFooter, Table, Tag, Text } from '@amadeus/react-design-factory'
import Tooltip from 'antd/es/tooltip'
import Radio from 'antd/es/radio'
import Switch from 'antd/es/switch'
import { AudienceDrawerActions, AudienceDrawerContent, AudienceDrawerFooter, AudienceFormSections, AudienceInformationCard, AudienceSettingsCard, AudienceSettingsGrid, AudienceWrapper, SelectedRulesChips } from './Audience.styled'
import { DATA_TYPE_OPTIONS, MOCK_PLATFORM_ADVERTISERS, type MockAudience, type MockPlatformAdvertiser } from './mockAudiences'
import { MOCK_RULES } from '../AudienceBuilder/mockAudienceRules'
import { getSharedRules } from '../../shared/audienceRuleStore'
import { DEMO_ADVERTISERS } from '../../shared/demoAdvertisers'
import { useGetAdvertiserDetailsQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { getAddedAdvertiserPlatforms, setAddedAdvertiserPlatforms } from '../../shared/advertiserPlatformStore'
import { getKnownPlatformAdvertiser } from '../../shared/platformAdvertiserValidation'
import { ConnectedAdvertiserChip } from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'
import { DrawerActionButtons, DrawerActions, PlatformConnectionStatus, PlatformDrawerContent, PlatformIdInputRow, PlatformInformationCard } from '@mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled'

const AUDIENCE_ENABLED_PLATFORMS = new Set(['google ads', 'google dv360', 'facebook', 'meta (facebook)', 'amadeus dsp'])
const isAudienceEnabledPlatform = (platform: { platform: string }) => AUDIENCE_ENABLED_PLATFORMS.has(platform.platform.trim().toLowerCase())
const AVAILABLE_FILES = [
  { label: 'Hotel Alpha Customer List', value: 'hotel-alpha-customer-list' },
  { label: 'Hotel Alpha Loyalty Members', value: 'hotel-alpha-loyalty-members' },
  { label: 'Hotel Alpha Website Visitors', value: 'hotel-alpha-website-visitors' },
  { label: 'Londoner Loyalty Members', value: 'londoner-loyalty-members' },
  { label: 'Londoner Past Guests (CRM)', value: 'londoner-past-guests-crm' },
  // One first-party loyalty file per demo advertiser (ids match the FILE audiences in mockAudiences.ts).
  ...DEMO_ADVERTISERS.map(adv => ({ label: `${adv.campaignPrefix} Loyalty Members`, value: `${adv.key}-loyalty-members` })),
]
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
const AUDIENCE_PLATFORM_OPTIONS = PLATFORM_OPTIONS.filter(option => AUDIENCE_ENABLED_PLATFORMS.has(option.value.toLowerCase()))

export interface AudienceFormValues {
  advertiser: string
  audienceName: string
  dataType: string
  fileId?: string
  platformAdvertiserIds: string[]
  platformAdvertisers?: MockPlatformAdvertiser[]
  audienceRuleIds: string[]
}

interface AudienceFormDrawerProps {
  open: boolean
  mode?: 'create' | 'edit'
  initialAudience?: MockAudience | null
  advertiserOptions: { label: string; value: string }[]
  lockedAdvertiser?: string
  onClose: () => void
  onSave: (values: AudienceFormValues) => void
  onDelete?: () => void
  page?: boolean
  advertiserBreadcrumb?: { label: string; href: string }
}

export default function AudienceFormDrawer({ open, mode = 'create', initialAudience, advertiserOptions, lockedAdvertiser, onClose, onSave, onDelete, page = false, advertiserBreadcrumb }: AudienceFormDrawerProps) {
  const navigate = useNavigate()
  const [form] = Form.useForm<AudienceFormValues>()
  const [selectedPlatformAdvertiserIds, setSelectedPlatformAdvertiserIds] = useState<string[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPlatformDrawerOpen, setIsPlatformDrawerOpen] = useState(false)
  const [addedPlatforms, setAddedPlatforms] = useState<MockPlatformAdvertiser[]>([])
  const [platformForm] = Form.useForm<{ platform: string; platformAdvertiserId: string }>()
  const selectedRuleIds = Form.useWatch('audienceRuleIds', form) ?? []
  const selectedAdvertiser = Form.useWatch('advertiser', form)
  const selectedDataType = Form.useWatch('dataType', form)
  const selectedPlatform = Form.useWatch('platform', platformForm)
  const platformAdvertiserId = Form.useWatch('platformAdvertiserId', platformForm)
  const knownPlatformAdvertiser = getKnownPlatformAdvertiser(selectedPlatform, platformAdvertiserId)
  const initialAdvertiserOption = initialAudience
    ? advertiserOptions.find(option => option.label === initialAudience.advertiser)
    : undefined
  const effectiveAdvertiser = selectedAdvertiser ?? lockedAdvertiser ?? initialAdvertiserOption?.value
  const { loading: platformsLoading } = useGetAdvertiserDetailsQuery(Number(effectiveAdvertiser))
  const availableRules = getSharedRules()

  useEffect(() => {
    setAddedPlatforms(effectiveAdvertiser ? getAddedAdvertiserPlatforms(effectiveAdvertiser) : [])
  }, [effectiveAdvertiser])
  const dataTypeOptions = DATA_TYPE_OPTIONS.map(option => option.value === 'ADVERTISER'
    ? {
        ...option,
        label: (
          <span>
            {option.label}{' '}
            <Tooltip title='the text here is TBD'>
              <span style={{ display: 'inline-flex', cursor: 'help' }}>
                <Icon name='infoCircle' color={colors.cloud_50} width={14} height={14} />
              </span>
            </Tooltip>
          </span>
        ),
      }
    : option)

  const mappedPlatforms: MockPlatformAdvertiser[] = effectiveAdvertiser
    ? [
        {
          id: `default-amadeus-dsp-${effectiveAdvertiser}`,
          platform: 'Amadeus DSP',
          advertiserName: advertiserOptions.find(option => option.value === effectiveAdvertiser)?.label.replace(/\s\([^)]*\)$/, '') ?? '-',
          advertiserId: effectiveAdvertiser,
          connected: true,
        },
        ...addedPlatforms.map(platform => {
          const knownAdvertiser = getKnownPlatformAdvertiser(platform.platform, platform.advertiserId)
          return knownAdvertiser
            ? { ...platform, advertiserName: knownAdvertiser.name, connected: true }
            : platform
        }),
      ]
    : []
  const audienceEnabledPlatforms = mappedPlatforms.filter(isAudienceEnabledPlatform)

  const audiencePlatformCandidates = [
    ...audienceEnabledPlatforms,
    ...(initialAudience?.platformAdvertisers ?? []).filter(isAudienceEnabledPlatform),
  ]
  const audiencePlatforms = audiencePlatformCandidates.filter((platform, index, platforms) =>
    platforms.findIndex(candidate => candidate.platform.trim().toLowerCase() === platform.platform.trim().toLowerCase()) === index,
  )

  useEffect(() => {
    if (!open) return
    const existingPlatforms = initialAudience?.platformAdvertisers ?? []
    const existingPlatformNames = new Set(existingPlatforms.map(platform => platform.platform.trim().toLowerCase()))
    const existingPlatformIds = audiencePlatforms
      .filter(platform => existingPlatforms.some(existing => existing.id === platform.id || existingPlatformNames.has(platform.platform.trim().toLowerCase())))
      .map(platform => platform.id)
    const selectedPlatformIds = existingPlatformIds
    if (initialAudience) {
      form.setFieldsValue({
        advertiser: effectiveAdvertiser,
        audienceName: initialAudience.audienceName,
        dataType: initialAudience.dataType,
        fileId: initialAudience.fileId,
        audienceRuleIds: initialAudience.audienceRuleIds,
        platformAdvertiserIds: selectedPlatformIds,
      })
    } else if (lockedAdvertiser && !selectedAdvertiser) {
      form.setFieldsValue({ advertiser: lockedAdvertiser })
    } else if (!selectedAdvertiser && !lockedAdvertiser) {
      form.resetFields()
    }
    setSelectedPlatformAdvertiserIds(selectedPlatformIds)
  }, [form, initialAudience, open, effectiveAdvertiser, selectedAdvertiser, lockedAdvertiser])

  const handleSubmit = (values: AudienceFormValues) => {
    onSave({
      ...values,
      platformAdvertiserIds: selectedPlatformAdvertiserIds,
      platformAdvertisers: audiencePlatforms.filter(platform => selectedPlatformAdvertiserIds.includes(platform.id)),
      audienceRuleIds: values.audienceRuleIds ?? [],
    })
    form.resetFields()
    setSelectedPlatformAdvertiserIds([])
  }

  const confirmDelete = () => {
    setIsDeleteModalOpen(false)
    onDelete?.()
  }

  const handleAddPlatform = (values: { platform: string; platformAdvertiserId: string }) => {
    if (!effectiveAdvertiser) return
    const normalizedId = values.platformAdvertiserId.trim()
    const knownAdvertiser = getKnownPlatformAdvertiser(values.platform, normalizedId)
    const platform = {
      id: `added-${values.platform}-${normalizedId}`,
      platform: values.platform,
      advertiserName: knownAdvertiser?.name ?? advertiserOptions.find(option => option.value === effectiveAdvertiser)?.label.replace(/\s\([^)]*\)$/, '') ?? '-',
      advertiserId: normalizedId,
      connected: Boolean(knownAdvertiser),
    }
    const nextPlatforms = [...getAddedAdvertiserPlatforms(effectiveAdvertiser).filter(existing => existing.id !== platform.id), platform]
    setAddedAdvertiserPlatforms(effectiveAdvertiser, nextPlatforms)
    setAddedPlatforms(nextPlatforms)
    setIsPlatformDrawerOpen(false)
    platformForm.resetFields()
  }

  const formContent = (
    <>
      <AudienceDrawerContent>
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <AudienceFormSections>
          <AudienceSettingsGrid>
            <AudienceSettingsCard>
              <Text.H5>General Settings</Text.H5>
              <Form.Item name='audienceName' rules={[{ required: true }]}><Input id='audience-add-name-inp' label='Audience Name' required /></Form.Item>
              <Form.Item name='advertiser' rules={[{ required: true }]}><Select<string> id='audience-add-advertiser-sel' label='Advertiser' options={advertiserOptions} required disabled={Boolean(initialAudience?.advertiser || lockedAdvertiser)} /></Form.Item>
            </AudienceSettingsCard>
            <AudienceSettingsCard>
              <Text.H5>Data Settings</Text.H5>
              <Text.Label>Data Type <Text.Label status='error'> *</Text.Label></Text.Label>
              <Form.Item name='dataType' rules={[{ required: true }]}><Radio.Group id='audience-add-data_type-radio' options={dataTypeOptions} /></Form.Item>
            </AudienceSettingsCard>
          </AudienceSettingsGrid>
            <AudienceSettingsCard>
              <Text.H5>{selectedDataType === 'FILE' ? 'First party data settings' : 'Audience Rule Settings'}</Text.H5>
              {selectedDataType === 'FILE' ? (
                <Form.Item name='fileId' required={false} label={<Text.Label>File name <Text.Label status='error'> *</Text.Label></Text.Label>} rules={[{ required: true, message: 'Please select a file' }]}>
                  <Select<string> id='audience-add-file-sel' options={AVAILABLE_FILES} placeholder='Select a file' />
                </Form.Item>
              ) : (
                <>
                  <Text.Label>Audience Rules <Text.Label status='error'> *</Text.Label></Text.Label>
                  {availableRules.length === 0 && (
                    <Button htmlType='button' variant='outlined' onClick={() => navigate('/audience-builder/new')}>
                      Create an Audience Rule
                    </Button>
                  )}
                  <Form.Item name='audienceRuleIds' rules={[{ required: true, message: 'Please select at least one Audience Rule' }]}>
                    <Select<string[]> id='audience-add-rules-sel' mode='multiple' options={availableRules.map(rule => ({ label: rule.ruleName, value: rule.id }))} required />
                  </Form.Item>
                  {selectedRuleIds.length > 0 && <SelectedRulesChips>{selectedRuleIds.map(ruleId => <Tag key={ruleId}>{availableRules.find(rule => rule.id === ruleId)?.ruleName ?? ruleId}</Tag>)}</SelectedRulesChips>}
                </>
              )}
            </AudienceSettingsCard>
          <AudienceSettingsCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <Text.H5>Platform Settings</Text.H5>
              <Button variant='outlined' htmlType='button' disabled={!effectiveAdvertiser} onClick={() => setIsPlatformDrawerOpen(true)}>
                Add Platform
              </Button>
            </div>
            {!effectiveAdvertiser ? (
              <Text.Body style={{ color: colors.cloud_80, fontStyle: 'italic' }}>Please select advertiser to see platforms.</Text.Body>
            ) : (
              <Table
                id='audience-add-platforms-tbl'
                rowKey='id'
                pagination={false}
                loading={platformsLoading}
                dataSource={audiencePlatforms}
                columns={[
                  { title: 'Enable', key: 'enabled', render: (_: unknown, record: typeof MOCK_PLATFORM_ADVERTISERS[number]) => <Switch checked={selectedPlatformAdvertiserIds.includes(record.id)} onChange={checked => setSelectedPlatformAdvertiserIds(prev => checked ? [...prev, record.id] : prev.filter(id => id !== record.id))} /> },
                  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
                  { title: 'Platform Advertiser ID', dataIndex: 'advertiserId', key: 'advertiserId' },
                  { title: 'Platform Advertiser Name', dataIndex: 'advertiserName', key: 'advertiserName' },
                  { title: 'Data connection', dataIndex: 'connected', key: 'connected', render: (connected: boolean) => <Icon name={connected ? 'checkCircle' : 'timesCircle'} color={connected ? '#2e8540' : colors.crimson_60} width={18} height={18} /> },
                ]}
              />
            )}
          </AudienceSettingsCard>
          </AudienceFormSections>
          <StickyFooter left={page ? '60px' : 'calc(100% - 720px)'}>
            <AudienceDrawerFooter>
              {mode === 'edit' && onDelete && <Button color='danger' variant='outlined' htmlType='button' onClick={() => setIsDeleteModalOpen(true)}>Delete Audience</Button>}
              <AudienceDrawerActions>
                <Button htmlType='button' variant='outlined' onClick={onClose}>Cancel</Button>
                <Button htmlType='submit'>Save</Button>
              </AudienceDrawerActions>
            </AudienceDrawerFooter>
          </StickyFooter>
        </Form>
      </AudienceDrawerContent>
      <Drawer id='audience-platform-drawer' title='Add Platform' placement='right' width='480px' open={isPlatformDrawerOpen} onClose={() => { setIsPlatformDrawerOpen(false); platformForm.resetFields() }}>
        <PlatformDrawerContent>
          <Form form={platformForm} layout='vertical' onFinish={handleAddPlatform}>
            <PlatformInformationCard>
              <Text.H5>Platform Information</Text.H5>
              <Form.Item name='platform' label='Platform Name' rules={[{ required: true, message: 'Please select a platform' }]}>
                <Select<string> id='audience-platform_name-sel' options={AUDIENCE_PLATFORM_OPTIONS} placeholder='Select a platform' />
              </Form.Item>
              <PlatformIdInputRow>
                <Form.Item name='platformAdvertiserId' label='Platform Advertiser ID' rules={[{ required: true, message: 'Please enter the Platform Advertiser ID' }]}>
                  <Input id='audience-platform_advertiser_id-inp' placeholder='Enter platform advertiser ID' />
                </Form.Item>
                {platformAdvertiserId?.trim() && (
                  <PlatformConnectionStatus id='audience-platform-connection-status'>
                    <Icon name={knownPlatformAdvertiser ? 'checkCircle' : 'timesCircle'} color={knownPlatformAdvertiser ? '#2e8540' : colors.crimson_60} width={18} height={18} />
                  </PlatformConnectionStatus>
                )}
              </PlatformIdInputRow>
              {knownPlatformAdvertiser && (
                <ConnectedAdvertiserChip id='audience-platform-connected-chip'>
                  <Icon name='checkCircle' color='#2e8540' width={16} height={16} />
                  <Tag>{knownPlatformAdvertiser.name}</Tag>
                </ConnectedAdvertiserChip>
              )}
            </PlatformInformationCard>
            <StickyFooter left='calc(100% - 480px)'>
              <DrawerActions>
                <DrawerActionButtons>
                  <Button htmlType='button' variant='outlined' onClick={() => { setIsPlatformDrawerOpen(false); platformForm.resetFields() }}>Cancel</Button>
                  <Button htmlType='submit'>Save</Button>
                </DrawerActionButtons>
              </DrawerActions>
            </StickyFooter>
          </Form>
        </PlatformDrawerContent>
      </Drawer>
      <Modal
        idPrefix='audience-delete-modal'
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name='exclamationTriangle' color={colors.pumpkin_60} width={24} height={24} />
            <span>Delete Audience</span>
          </span>
        }
        open={isDeleteModalOpen}
        maskStyle={{ backgroundColor: colors.sky_90 }}
        okText='Delete'
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <Text.Body>
          Are you sure you want to delete the <strong>{initialAudience?.audienceName}</strong> Audience? This action cannot be undone.
        </Text.Body>
        <Text.Body>Would you like to proceed with the Delete?</Text.Body>
      </Modal>
    </>
  )

  if (page) {
    const breadcrumbItems = advertiserBreadcrumb
      ? [
          { title: 'Home', href: '/' },
          { title: 'Advertiser', href: '/advertisers' },
          { title: 'Advertiser Details', href: advertiserBreadcrumb.href },
          { title: 'Audiences', href: advertiserBreadcrumb.href },
          { title: mode === 'edit' ? 'Audience Settings' : 'New Audience' },
        ]
      : [{ title: 'Home', href: '/' }, { title: 'Audience', href: '/audience' }, { title: mode === 'edit' ? 'Audience Settings' : 'New Audience' }]
    return (
      <AudienceWrapper>
        <Breadcrumb items={breadcrumbItems} />
        <Text.H3>{mode === 'edit' ? 'Audience Settings' : 'New Audience'}</Text.H3>
        {formContent}
      </AudienceWrapper>
    )
  }

  return <Drawer id='audience-form-drawer' title={mode === 'edit' ? 'Audience Settings' : 'Add Audience'} placement='right' width='720px' open={open} onClose={onClose}>{formContent}</Drawer>
}
