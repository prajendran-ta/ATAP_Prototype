import { useEffect, useMemo, useState } from 'react'
import { Drawer, Button, Icon, Input, Select, Text, useNotification } from '@amadeus/react-design-factory'
import TextArea from 'antd/es/input/TextArea'
import type { UnmappedCampaign } from './mockData/unmappedCampaigns'
import {
  bpidSelectOptions,
  tacticOptions,
  derbyTacticOptions,
  subTypeOptions,
  languageOptions,
  wihpCampaignNameOptions,
  DERBY_PLATFORMS,
  platformLabel,
  WIHP_PLATFORMS,
  isMultipleAdvertisers,
  advertiserNameForBpid,
  reportingPlatformForPlatform,
} from './mockData/unmappedCampaigns'
import { getAdvertiserReporting, seedAdvertiserReporting } from '../../shared/advertiserReportingStore'
import {
  DrawerContent,
  Card,
  ReadOnlyField,
  ReadOnlyLabel,
  ReadOnlyValueBox,
  FieldGridTwo,
  FieldGridThree,
  FullWidthField,
  GeneratedNameRow,
  CopyButton,
  PlaceholderNote,
  DrawerFooter,
} from './MappingDrawer.styled'

export type MappingType = 'advertiser' | 'campaign' | 'invoice' | 'offers' | 'oba'

export const mappingTypeLabels: Record<MappingType, string> = {
  advertiser: 'Advertiser Mapping',
  campaign: 'Campaign Mapping',
  invoice: 'Invoice Mapping',
  offers: 'Offers Mapping',
  oba: 'OBA Mapping',
}

export interface MappingSaveResult {
  mappingType: MappingType
  campaignId: string
  /** BPID chosen for an advertiser mapping (undefined for other types). */
  bpid?: string
}

interface MappingDrawerProps {
  open: boolean
  mappingType: MappingType | null
  campaign: UnmappedCampaign | null
  /** When provided, a left-aligned 'Delete mapping' button appears in the footer (any campaign). */
  onDelete?: () => void
  /** Read-only users: inputs disabled, no Save/Delete (view-only). */
  readOnly?: boolean
  onClose: () => void
  onSave: (result: MappingSaveResult) => void
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <ReadOnlyField>
      <ReadOnlyLabel>{label}</ReadOnlyLabel>
      <ReadOnlyValueBox>{value}</ReadOnlyValueBox>
    </ReadOnlyField>
  )
}

function MappingDrawer({ open, mappingType, campaign, onClose, onSave, onDelete, readOnly = false }: MappingDrawerProps) {
  const title = mappingType ? mappingTypeLabels[mappingType] : 'Mapping'
  const notification = useNotification()

  // Local form state (prototype only — not persisted).
  const [bpid, setBpid] = useState<string | undefined>(undefined)
  const [tactic, setTactic] = useState<string | undefined>(undefined)
  const [subType, setSubType] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<string | undefined>(undefined)
  const [custom1, setCustom1] = useState('')
  const [custom2, setCustom2] = useState('')
  const [custom3, setCustom3] = useState('')
  const [paidSearchId, setPaidSearchId] = useState('')
  const [wihpCampaignName, setWihpCampaignName] = useState<string | undefined>(undefined)
  const [paidSearchIds, setPaidSearchIds] = useState('')
  const [bpidError, setBpidError] = useState(false)

  // Prefill the BPID select from the campaign's current advertiser when editing an
  // already-mapped advertiser; clear it for an unmapped advertiser.
  useEffect(() => {
    if (open && campaign) {
      // Prototype: ensure the campaign-mock advertisers have inherited reporting labels.
      seedAdvertiserReporting()
      // Multi-advertiser rows have no single advertiser yet — force the user to pick one.
      setBpid(isMultipleAdvertisers(campaign) ? undefined : campaign.advertiserBid || undefined)
      setBpidError(false)
      // Prefill dimensions when editing an ALREADY-mapped campaign; clear them for an unmapped one
      // (so only unmapped campaigns open empty with Save disabled). Also resets stale state between
      // opening different campaigns.
      const pre = campaign.prefill
      const derby = DERBY_PLATFORMS.includes(campaign.platform)
      // DerbySoft Sub-Type / Language remain standards (Metasearch / EN). Tactic is now a
      // backend-supplied dropdown the user selects (Req 6, revised) — not hard-coded.
      setTactic(pre?.tactic)
      setSubType(derby ? 'Metasearch' : pre?.subType)
      setLanguage(derby ? 'EN' : pre?.language)
      setCustom1(pre?.custom1 ?? '')
      setCustom2(pre?.custom2 ?? '')
      setCustom3(pre?.custom3 ?? '')
      setPaidSearchId('')
      setWihpCampaignName(undefined)
      setPaidSearchIds('')
    }
  }, [open, campaign])

  const isDerby = !!campaign && DERBY_PLATFORMS.includes(campaign.platform)
  const isWihp = !!campaign && WIHP_PLATFORMS.includes(campaign.platform)

  // Many:many — when the external advertiser maps to several ATAP advertisers, the campaign
  // mapping must pick ONE of the candidate BPIDs. Limit the BPID options to those candidates.
  const isMulti = !!campaign && isMultipleAdvertisers(campaign)
  const bpidOptions = useMemo(() => {
    if (isMulti && campaign?.candidateBpids) {
      const set = new Set(campaign.candidateBpids)
      return bpidSelectOptions.filter(o => set.has(o.value))
    }
    return bpidSelectOptions
  }, [isMulti, campaign])

  // Generated Naming Convention String (read-only), per UX-5.4:
  // <advertiser name>_<Tactic>_<Sub-Type>_<Language>_<Custom1>_<Custom2>_<Custom3>
  // Uses the advertiser NAME (resolved from the chosen BPID), not the id.
  const generatedName = useMemo(() => {
    if (!campaign) return '-'
    const advName = advertiserNameForBpid(bpid) || campaign.advertiserName
    const parts = [advName, tactic, subType, language, custom1, custom2, custom3].filter(Boolean)
    return parts.length ? parts.join('_') : '-'
  }, [campaign, bpid, tactic, subType, language, custom1, custom2, custom3])

  // Custom 1/2/3 field LABELS inherited from the advertiser's Reporting settings (Req 3).
  // The advertiser-level value IS the label (value-is-label). When an advertiser hasn't defined a
  // given custom value, fall back to the generic 'Custom N'. Keyed by the selected BPID.
  const customLabels = useMemo(() => {
    const r = getAdvertiserReporting(bpid)
    return {
      custom1: r.custom1.trim() || 'Custom 1',
      custom2: r.custom2.trim() || 'Custom 2',
      custom3: r.custom3.trim() || 'Custom 3',
    }
  }, [bpid])

  const copyGeneratedName = () => {
    if (!navigator.clipboard || generatedName === '-') {
      notification.error('Nothing to copy yet — complete the mapping first.')
      return
    }
    navigator.clipboard
      .writeText(generatedName)
      .then(() => notification.success('Campaign name copied to clipboard.'))
      .catch(() => notification.error('Could not copy the campaign name.'))
  }

  // Mandatory-dimension validation (Req 5.9/5.12): Save stays disabled until every required field
  // for the current mapping type / platform is filled.
  const canSave = (() => {
    if (!campaign || !mappingType) return false
    if (mappingType === 'offers' || mappingType === 'invoice' || mappingType === 'oba') return true
    if (mappingType === 'advertiser') return !!bpid
    // mappingType === 'campaign'
    if (!bpid) return false
    if (isWihp) {
      // WIHP: campaign name + at least one Paid Search ID required (Tactic auto / Sub-Type / Language hard-coded).
      return !!wihpCampaignName && paidSearchIds.trim().length > 0
    }
    if (isDerby) {
      // DerbySoft (Req 6, revised): Tactic is a backend-supplied dropdown and the Paid Search ID is
      // now MANDATORY. Sub-Type / Language remain standards. Require BPID + Tactic + Paid Search ID.
      return !!tactic && paidSearchId.trim().length > 0
    }
    // SA360 / CM360 / Meta / Others: Tactic, Sub-Type, Language all mandatory (Req 5.2–5.4).
    return !!tactic && !!subType && !!language
  })()

  const handleSave = () => {
    if (!campaign || !mappingType) {
      onClose()
      return
    }
    // Advertiser (BPID) is mandatory for advertiser (and campaign) mapping — block save if empty.
    if ((mappingType === 'advertiser' || mappingType === 'campaign') && !bpid) {
      setBpidError(true)
      return
    }
    onSave({
      mappingType,
      campaignId: campaign.id,
      // Carry the chosen BPID for both advertiser mapping and campaign mapping (the latter needs
      // it to resolve a multi-advertiser row to the picked advertiser).
      bpid: mappingType === 'advertiser' || mappingType === 'campaign' ? bpid : undefined,
    })
  }

  const isCampaign = mappingType === 'campaign'
  const isAdvertiser = mappingType === 'advertiser'
  const advertiserReadOnly = isCampaign && !isMulti && campaign?.advertiserMapping === 'mapped'

  return (
    <Drawer
      id='mapping-drawer'
      title={title}
      placement='right'
      width={'640px'}
      onClose={onClose}
      open={open}
      destroyOnClose
      styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' } }}
    >
      <DrawerContent>
        {campaign && (
          <>
            {/* External Advertiser Settings (read-only context) */}
            <Card>
              <Text.H5 id='mapping-drawer_external-ttl'>External Advertiser Settings</Text.H5>
              {(() => {
                const rp = reportingPlatformForPlatform(campaign.platform)
                return rp ? (
                  <FieldGridTwo>
                    <ReadOnly label='Platform' value={platformLabel(campaign.platform)} />
                    <ReadOnly label='Reporting Platform' value={rp} />
                  </FieldGridTwo>
                ) : (
                  <ReadOnly label='Platform' value={platformLabel(campaign.platform)} />
                )
              })()}

              {isAdvertiser ? (
                <>
                  <FieldGridTwo>
                    <ReadOnly label='External ID' value={campaign.externalAdvertiserId} />
                    <ReadOnly label='External Advertiser Name' value={campaign.externalAdvertiserName} />
                  </FieldGridTwo>
                  <ReadOnly
                    label='Campaign Name (ID)'
                    value={
                      campaign.externalCampaignId === '-'
                        ? '-'
                        : `${campaign.externalCampaignName} (${campaign.externalCampaignId})`
                    }
                  />
                </>
              ) : (
                <>
                  <FieldGridTwo>
                    <ReadOnly label='External Advertiser Name' value={campaign.externalAdvertiserName} />
                    <ReadOnly label='External Advertiser ID' value={campaign.externalAdvertiserId} />
                  </FieldGridTwo>
                  <FieldGridTwo>
                    <ReadOnly
                      label='External Campaign Name'
                      value={campaign.externalCampaignName === '-' ? '-' : campaign.externalCampaignName}
                    />
                    <ReadOnly
                      label='External Campaign ID'
                      value={campaign.externalCampaignId === '-' ? '-' : campaign.externalCampaignId}
                    />
                  </FieldGridTwo>
                </>
              )}
            </Card>

            {/* Advertiser Settings — read-only once resolved (campaign), else the required pick */}
            {(isAdvertiser || isCampaign) && (
              <Card>
                <Text.H5 id='mapping-drawer_advertiser-ttl'>Advertiser Settings</Text.H5>
                {advertiserReadOnly ? (
                  <ReadOnly
                    label='Advertiser (BPID)'
                    value={
                      campaign.advertiserBid
                        ? `${campaign.advertiserName} (${campaign.advertiserBid})`
                        : '-'
                    }
                  />
                ) : (
                  <Select
                    id='mapping-drawer_bpid-sel'
                    label='Advertiser (BPID)'
                    required
                    showSearch
                    placeholder={isMulti ? 'Pick one of the mapped advertisers' : 'Advertiser Name'}
                    options={bpidOptions}
                    value={bpid}
                    disabled={readOnly}
                    status={bpidError ? 'error' : undefined}
                    errorMessage={bpidError ? 'Select an advertiser (BPID)' : undefined}
                    helperMessage={
                      isMulti
                        ? 'This external advertiser is mapped to multiple ATAP advertisers — pick the one this campaign belongs to.'
                        : undefined
                    }
                    onChange={v => {
                      setBpid(v as string)
                      setBpidError(false)
                    }}
                  />
                )}
              </Card>
            )}

            {/* Campaign Mapping — platform-specific cards */}
            {isCampaign && isDerby && (
              <Card>
                <Text.H5 id='mapping-drawer_campaign-settings-ttl'>Campaign Settings</Text.H5>
                <Input
                  id='mapping-drawer_paid-search-id-inp'
                  label='Paid Search ID'
                  required
                  placeholder='Enter the Paid Search ID'
                  disabled={readOnly}
                  value={paidSearchId}
                  onChange={e => setPaidSearchId(e.target.value)}
                />
              </Card>
            )}

            {isCampaign && isWihp && (
              <Card>
                <Text.H5 id='mapping-drawer_campaign-settings-ttl'>Campaign Settings</Text.H5>
                <Select
                  id='mapping-drawer_wihp-campaign-sel'
                  label='WIHP Campaign Name'
                  required
                  showSearch
                  placeholder='-'
                  options={wihpCampaignNameOptions}
                  disabled={readOnly}
                  value={wihpCampaignName}
                  onChange={v => setWihpCampaignName(v as string)}
                />
                <ReadOnlyField>
                  <ReadOnlyLabel>Paid Search IDs *</ReadOnlyLabel>
                  <TextArea
                    id='mapping-drawer_paid-search-ids-txt'
                    placeholder='-'
                    rows={4}
                    disabled={readOnly}
                    value={paidSearchIds}
                    onChange={e => setPaidSearchIds(e.target.value)}
                  />
                </ReadOnlyField>
              </Card>
            )}

            {/* Additional Settings — Derby and "Others" (not WIHP) */}
            {isCampaign && !isWihp && (
              <Card>
                <Text.H5 id='mapping-drawer_additional-ttl'>Additional Settings</Text.H5>
                {isDerby ? (
                  // DerbySoft (Req 6, revised): Tactic is a backend-supplied dropdown (user selects);
                  // Sub-Type / Language remain standards, shown read-only.
                  <FieldGridThree>
                    <Select
                      id='mapping-drawer_derby-tactic-sel'
                      label='Tactic'
                      required
                      placeholder='Select a tactic'
                      options={derbyTacticOptions}
                      disabled={readOnly}
                      value={tactic}
                      onChange={v => setTactic(v as string)}
                    />
                    <ReadOnly label='Sub-Type' value={subType ?? '-'} />
                    <ReadOnly label='Language' value={language ?? '-'} />
                  </FieldGridThree>
                ) : (
                  <FieldGridThree>
                    <Select
                      id='mapping-drawer_tactic-sel'
                      label='Tactic'
                      required
                      placeholder='-'
                      options={tacticOptions}
                      disabled={readOnly}
                      value={tactic}
                      onChange={v => setTactic(v as string)}
                    />
                    <Select
                      id='mapping-drawer_subtype-sel'
                      label='Sub-Type'
                      required
                      placeholder='-'
                      options={subTypeOptions}
                      disabled={readOnly}
                      value={subType}
                      onChange={v => setSubType(v as string)}
                    />
                    <Select
                      id='mapping-drawer_language-sel'
                      label='Language'
                      required
                      placeholder='-'
                      options={languageOptions}
                      disabled={readOnly}
                      value={language}
                      onChange={v => setLanguage(v as string)}
                    />
                  </FieldGridThree>
                )}
                <FieldGridThree>
                  <Input
                    id='mapping-drawer_custom1-inp'
                    label={customLabels.custom1}
                    placeholder='-'
                    disabled={readOnly}
                    value={custom1}
                    onChange={e => setCustom1(e.target.value)}
                  />
                  <Input
                    id='mapping-drawer_custom2-inp'
                    label={customLabels.custom2}
                    placeholder='-'
                    disabled={readOnly}
                    value={custom2}
                    onChange={e => setCustom2(e.target.value)}
                  />
                  <Input
                    id='mapping-drawer_custom3-inp'
                    label={customLabels.custom3}
                    placeholder='-'
                    disabled={readOnly}
                    value={custom3}
                    onChange={e => setCustom3(e.target.value)}
                  />
                </FieldGridThree>
                <GeneratedNameRow>
                  <FullWidthField style={{ flex: 1 }}>
                    <ReadOnly label='Campaign Name' value={generatedName} />
                  </FullWidthField>
                  <CopyButton type='button' aria-label='Copy campaign name' onClick={copyGeneratedName}>
                    <Icon name='copy' width={16} height={16} />
                  </CopyButton>
                </GeneratedNameRow>
              </Card>
            )}

            {/* Invoice / Offers — placeholder until designed */}
            {(mappingType === 'invoice' || mappingType === 'offers' || mappingType === 'oba') && (
              <Card>
                <Text.H5 id='mapping-drawer_placeholder-ttl'>{title} Settings</Text.H5>
                <PlaceholderNote>
                  The {title.toLowerCase()} form will be built later. This confirms the entry point opens the
                  correct mapping type.
                </PlaceholderNote>
              </Card>
            )}
          </>
        )}
      </DrawerContent>

      <DrawerFooter style={{ justifyContent: 'space-between' }}>
        <span>
          {!readOnly && onDelete && (
            <Button
              htmlType='button'
              id='mapping-drawer_delete-btn'
              variant='outlined'
              color='danger'
              onClick={onDelete}
            >
              Delete mapping
            </Button>
          )}
        </span>
        <span style={{ display: 'flex', gap: 16 }}>
          <Button onClick={onClose} htmlType='button' id='mapping-drawer_cancel-btn' variant='outlined'>
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && (
            <Button htmlType='button' id='mapping-drawer_save-btn' onClick={handleSave} disabled={!canSave}>
              Save
            </Button>
          )}
        </span>
      </DrawerFooter>
    </Drawer>
  )
}

export default MappingDrawer
