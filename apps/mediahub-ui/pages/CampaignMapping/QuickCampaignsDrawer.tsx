import { useEffect, useMemo, useState } from 'react'
import { Drawer, Button, Icon, Input, Select, Text } from '@amadeus/react-design-factory'
import {
  bpidSelectOptions,
  tacticOptions,
  subTypeOptions,
  languageOptions,
  advertiserNameForBpid,
  externalAdvertiserSelectOptions,
  availableToMapCampaignIds,
  mappingUnitName,
  platformLabel,
  wihpFakeCampaignOptions,
  derbyCampaignOptions,
  derbyTacticOptions,
} from './mockData/unmappedCampaigns'
import {
  DrawerContent,
  Card,
  FieldGridTwo,
  FieldGridThree,
  DrawerFooter,
  ReadOnlyField,
  ReadOnlyLabel,
} from './MappingDrawer.styled'
import TextArea from 'antd/es/input/TextArea'
import {
  QuickHeaderRow,
  QuickRowGrid,
  QuickRowNum,
  QuickGeneratedName,
  QuickRowNote,
  QuickDeleteBtn,
  QuickColHeadGrid,
  QuickColHead,
} from './QuickCampaignsDrawer.styled'

const platformOptions = [
  { label: 'SA360', value: 'SA360' },
  { label: 'CM360', value: 'CM360' },
  { label: 'Meta (Facebook)', value: 'Meta' },
  { label: 'DerbySoft', value: 'DerbySoft' },
  { label: 'WIHP', value: 'WIHP' },
]

// Bulk mapping (multiple campaigns / Add Campaign) is only for SA360 / CM360 / Meta (UX-7.1).
// WIHP and DerbySoft map a single campaign at a time.
const BULK_PLATFORMS = new Set(['SA360', 'CM360', 'Meta'])

const MAX_ROWS = 20

interface QuickRow {
  id: number
  externalName: string
  tactic?: string
  subType?: string
  language?: string
  custom1: string
  custom2: string
  custom3: string
}

interface QuickCampaignsDrawerProps {
  open: boolean
  /** Read-only users: inputs disabled, no Save (view-only). */
  readOnly?: boolean
  onClose: () => void
}

const emptyRow = (id: number): QuickRow => ({
  id,
  externalName: '',
  custom1: '',
  custom2: '',
  custom3: '',
})

const OWN_ID_PREFIX = '__own__:'

// Per-row Campaign ID combo: pick from the DWI available-to-map list, or type a new ID.
// Hoisted to module scope so it keeps a stable identity across parent renders.
function CampaignIdCombo({
  id,
  value,
  placeholder,
  disabled,
  excludeValues,
  onPick,
}: {
  id: string
  value?: string
  placeholder: string
  disabled?: boolean
  excludeValues: Set<string>
  onPick: (value: string | undefined) => void
}) {
  const [term, setTerm] = useState('')
  const options = useMemo(() => {
    const t = term.trim()
    // A campaign can only be mapped once — hide IDs already picked in other rows (but keep this
    // row's own current value visible).
    const list = availableToMapCampaignIds.filter(o => o.value === value || !excludeValues.has(o.value))
    const inList = list.some(o => o.value.toLowerCase() === t.toLowerCase())
    const ownOpt = t && !inList ? [{ label: t, value: `${OWN_ID_PREFIX}${t}` }] : []
    return [...ownOpt, ...list]
  }, [term, value, excludeValues])
  return (
    <Select
      id={id}
      showSearch
      allowClear
      placeholder={placeholder}
      options={options}
      value={value}
      disabled={disabled}
      onChange={v => onPick(v as string | undefined)}
      onSearch={setTerm}
      searchBy='label'
      notFoundContent='Type to add a Campaign ID'
    />
  )
}

// Read-only hard-coded field rendered as a disabled DF Input so its label matches the editable
// fields exactly (same type scale/spacing as Tactic/Custom selects/inputs).
function SReadOnly({ id, label, value }: { id: string; label: string; value: string }) {
  return <Input id={id} label={label} value={value} disabled />
}

function QuickCampaignsDrawer({ open, readOnly = false, onClose }: QuickCampaignsDrawerProps) {
  const [platform, setPlatform] = useState<string | undefined>(undefined)
  const [bpid, setBpid] = useState<string | undefined>(undefined)
  const [extAdvertiser, setExtAdvertiser] = useState<string | undefined>(undefined)
  const [rows, setRows] = useState<QuickRow[]>([emptyRow(1)])
  // Single-campaign state for DerbySoft / WIHP (they don't use the bulk table).
  const [singleCampaign, setSingleCampaign] = useState<string | undefined>(undefined)
  const [wihpTactic, setWihpTactic] = useState<string | undefined>(undefined)
  const [derbyTactic, setDerbyTactic] = useState<string | undefined>(undefined)
  const [paidSearchId, setPaidSearchId] = useState('')
  const [paidSearchIds, setPaidSearchIds] = useState('')
  const [sCustom1, setSCustom1] = useState('')
  const [sCustom2, setSCustom2] = useState('')
  const [sCustom3, setSCustom3] = useState('')

  useEffect(() => {
    if (open) {
      setPlatform(undefined)
      setBpid(undefined)
      setExtAdvertiser(undefined)
      setRows([emptyRow(1)])
      setSingleCampaign(undefined)
      setWihpTactic(undefined)
      setDerbyTactic(undefined)
      setPaidSearchId('')
      setPaidSearchIds('')
      setSCustom1('')
      setSCustom2('')
      setSCustom3('')
    }
  }, [open])

  const addRow = () => {
    if (!!platform && !BULK_PLATFORMS.has(platform)) return
    setRows(prev => (prev.length >= MAX_ROWS ? prev : [...prev, emptyRow((prev[prev.length - 1]?.id ?? 0) + 1)]))
  }
  const removeRow = (id: number) => setRows(prev => (prev.length === 1 ? prev : prev.filter(r => r.id !== id)))
  const update = (id: number, patch: Partial<QuickRow>) =>
    setRows(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)))

  const platformChosen = !!platform
  const supportsBulk = !!platform && BULK_PLATFORMS.has(platform)
  const platformDisplay = platform ? platformLabel(platform) : 'Platform'
  // The per-platform mapping-unit name, e.g. 'Placement' (CM360), 'AdSet' (Meta), else 'Campaign'.
  const unitLabel = `${platformDisplay} ${mappingUnitName(platform)}`
  // Rows are enabled once the shared context (platform + advertiser + external advertiser) is set.
  const contextReady = !!platform && !!bpid && !!extAdvertiser && !readOnly

  const generatedName = (r: QuickRow) => {
    const parts = [advertiserNameForBpid(bpid), r.tactic, r.subType, r.language, r.custom1, r.custom2, r.custom3].filter(
      Boolean,
    )
    return parts.length ? parts.join('_') : '-'
  }

  // Mandatory-dimension validation for Save (Req 5.9/5.12 applied to Quick Campaigns):
  //  - bulk (SA360/CM360/Meta): ≥1 row with a campaign ID, and EVERY row that has a campaign ID
  //    must have Tactic + Sub-Type + Language.
  //  - DerbySoft single: campaign + backend Tactic (dropdown) + mandatory Paid Search ID (Req 6, revised).
  //  - WIHP single: a campaign must be selected (Tactic/Sub-Type/Language hard-coded;
  //    WIHP additionally needs ≥1 Paid Search ID).
  const canSaveQuick = (() => {
    if (!contextReady) return false
    if (supportsBulk) {
      const filled = rows.filter(r => r.externalName)
      if (filled.length === 0) return false
      return filled.every(r => r.tactic && r.subType && r.language)
    }
    if (platform === 'WIHP') return !!singleCampaign && paidSearchIds.trim().length > 0
    if (platform === 'DerbySoft') return !!singleCampaign && !!derbyTactic && paidSearchId.trim().length > 0
    return false
  })()

  return (
    <Drawer
      id='quick-campaigns-drawer'
      title='Map Campaign'
      placement='right'
      width={'1200px'}
      onClose={onClose}
      open={open}
      destroyOnClose
      styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' }, header: { background: 'transparent' } }}
    >
      <DrawerContent>
        {/* Combined mapping context: advertiser on row 1; platform + external advertiser on row 2. */}
        <Card>
          <Text.H5 id='quick-campaigns-drawer_settings-ttl'>Mapping Settings</Text.H5>
          <Select
            id='quick-campaigns-drawer_bpid-sel'
            label='Advertiser (BPID)'
            required
            showSearch
            placeholder='Advertiser Name'
            options={bpidSelectOptions}
            value={bpid}
            disabled={readOnly}
            onChange={v => setBpid(v as string)}
          />
          <FieldGridTwo>
            <Select
              id='quick-campaigns-drawer_platform-sel'
              label='Platform'
              required
              placeholder='Select a platform'
              options={platformOptions}
              value={platform}
              disabled={readOnly}
              onChange={v => {
                const next = v as string
                setPlatform(next)
                // External advertiser + available campaigns depend on the platform — reset them.
                setExtAdvertiser(undefined)
                setRows(prev =>
                  (BULK_PLATFORMS.has(next) ? prev : prev.slice(0, 1)).map(r => ({ ...r, externalName: '' })),
                )
              }}
            />
            <Select
              id='quick-campaigns-drawer_ext-advertiser-sel'
              label={`${platformDisplay} Advertiser`}
              required
              showSearch
              placeholder='Select an external advertiser'
              options={externalAdvertiserSelectOptions}
              value={extAdvertiser}
              disabled={!platformChosen || readOnly}
              onChange={v => setExtAdvertiser(v as string)}
            />
          </FieldGridTwo>
        </Card>

        {supportsBulk ? (
        <Card>
          <QuickHeaderRow>
            <Text.H5 id='quick-campaigns-drawer_campaigns-ttl'>Campaigns ({rows.length})</Text.H5>
            <Button
              id='quick-campaigns-drawer_add-btn'
              variant='outlined'
              size='small'
              onClick={addRow}
              disabled={!contextReady || !supportsBulk || rows.length >= MAX_ROWS}
            >
              Add Campaign
            </Button>
          </QuickHeaderRow>

          <QuickColHeadGrid>
            {/* leading spacer cell aligns with the row-number column */}
            <QuickColHead />
            <QuickColHead>{unitLabel} *</QuickColHead>
            <QuickColHead>Tactic *</QuickColHead>
            <QuickColHead>Sub-Type *</QuickColHead>
            <QuickColHead>Language *</QuickColHead>
            <QuickColHead>Custom 1</QuickColHead>
            <QuickColHead>Custom 2</QuickColHead>
            <QuickColHead>Custom 3</QuickColHead>
            {/* trailing spacer cell aligns with the delete button column */}
            <QuickColHead />
          </QuickColHeadGrid>

          {rows.map((r, idx) => (
            <div key={r.id}>
              <QuickRowGrid>
                <QuickRowNum>{idx + 1}</QuickRowNum>
                <CampaignIdCombo
                  id={`quick-campaigns-drawer_campaign-${r.id}-sel`}
                  placeholder={unitLabel}
                  disabled={!contextReady}
                  value={r.externalName || undefined}
                  excludeValues={new Set(rows.filter(o => o.id !== r.id && o.externalName).map(o => o.externalName))}
                  onPick={v => update(r.id, { externalName: v ?? '' })}
                />
                <Select placeholder='-' options={tacticOptions} value={r.tactic} disabled={!contextReady} onChange={v => update(r.id, { tactic: v as string })} />
                <Select placeholder='-' options={subTypeOptions} value={r.subType} disabled={!contextReady} onChange={v => update(r.id, { subType: v as string })} />
                <Select placeholder='-' options={languageOptions} value={r.language} disabled={!contextReady} onChange={v => update(r.id, { language: v as string })} />
                <Input placeholder='-' disabled={!contextReady} value={r.custom1} onChange={e => update(r.id, { custom1: e.target.value })} />
                <Input placeholder='-' disabled={!contextReady} value={r.custom2} onChange={e => update(r.id, { custom2: e.target.value })} />
                <Input placeholder='-' disabled={!contextReady} value={r.custom3} onChange={e => update(r.id, { custom3: e.target.value })} />
                <QuickDeleteBtn
                  type='button'
                  aria-label={`Remove campaign ${idx + 1}`}
                  disabled={rows.length === 1}
                  onClick={() => removeRow(r.id)}
                >
                  <Icon name='trashCan' width={16} height={16} />
                </QuickDeleteBtn>
              </QuickRowGrid>
              {!!r.externalName && r.externalName.startsWith(OWN_ID_PREFIX) && (
                <QuickRowNote>
                  Once the campaign is available in the backend the mapping will be complete. This can take up to 48 hours.
                </QuickRowNote>
              )}
              <QuickGeneratedName>Campaign Name: {generatedName(r)}</QuickGeneratedName>
            </div>
          ))}
        </Card>
        ) : platform === 'DerbySoft' ? (
          <Card>
            <Text.H5 id='quick-campaigns-drawer_derby-ttl'>Campaign Settings</Text.H5>
            <Select
              id='quick-campaigns-drawer_derby-campaign-sel'
              label='DerbySoft Campaign'
              required
              showSearch
              placeholder='Select a DerbySoft campaign'
              options={derbyCampaignOptions}
              value={singleCampaign}
              disabled={!contextReady}
              onChange={v => setSingleCampaign(v as string)}
            />
            <Input
              id='quick-campaigns-drawer_derby-paid-search-inp'
              label='Paid Search ID'
              required
              placeholder='Enter the Paid Search ID'
              disabled={!contextReady}
              value={paidSearchId}
              onChange={e => setPaidSearchId(e.target.value)}
            />
            <FieldGridThree>
              <Select
                id='quick-campaigns-drawer_derby-tactic-sel'
                label='Tactic'
                required
                placeholder='Select a tactic'
                options={derbyTacticOptions}
                value={derbyTactic}
                disabled={!contextReady}
                onChange={v => setDerbyTactic(v as string)}
              />
              <SReadOnly id='quick-campaigns-drawer_derby-subtype-ro' label='Sub-Type' value='Metasearch' />
              <SReadOnly id='quick-campaigns-drawer_derby-lang-ro' label='Language' value='EN' />
            </FieldGridThree>
            <FieldGridThree>
              <Input id='quick-campaigns-drawer_derby-c1-inp' label='Custom 1' placeholder='-' disabled={!contextReady} value={sCustom1} onChange={e => setSCustom1(e.target.value)} />
              <Input id='quick-campaigns-drawer_derby-c2-inp' label='Custom 2' placeholder='-' disabled={!contextReady} value={sCustom2} onChange={e => setSCustom2(e.target.value)} />
              <Input id='quick-campaigns-drawer_derby-c3-inp' label='Custom 3' placeholder='-' disabled={!contextReady} value={sCustom3} onChange={e => setSCustom3(e.target.value)} />
            </FieldGridThree>
            <QuickGeneratedName>
              Campaign Name: {[advertiserNameForBpid(bpid), derbyTactic, 'Metasearch', 'EN', sCustom1, sCustom2, sCustom3].filter(Boolean).join('_') || '-'}
            </QuickGeneratedName>
          </Card>
        ) : platform === 'WIHP' ? (
          <Card>
            <Text.H5 id='quick-campaigns-drawer_wihp-ttl'>Campaign Settings</Text.H5>
            <Select
              id='quick-campaigns-drawer_wihp-campaign-sel'
              label='WIHP Campaign'
              required
              showSearch
              placeholder='Select a WIHP campaign'
              options={wihpFakeCampaignOptions}
              value={singleCampaign}
              disabled={!contextReady}
              onChange={v => {
                const val = v as string
                setSingleCampaign(val)
                // Tactic is auto-derived from the selected fake campaign and non-editable.
                setWihpTactic(wihpFakeCampaignOptions.find(o => o.value === val)?.tactic)
              }}
            />
            {/* Paid Search IDs sits right under the campaign select (one level up from the customs). */}
            <ReadOnlyField>
              <ReadOnlyLabel>Paid Search IDs</ReadOnlyLabel>
              <TextArea
                id='quick-campaigns-drawer_wihp-paid-search-txt'
                placeholder='Add one or more Paid Search IDs'
                rows={3}
                disabled={!contextReady}
                value={paidSearchIds}
                onChange={e => setPaidSearchIds(e.target.value)}
              />
            </ReadOnlyField>
            {/* Tactic / Sub-Type / Language grouped with the Custom fields. */}
            <FieldGridThree>
              <SReadOnly id='quick-campaigns-drawer_wihp-tactic-ro' label='Tactic' value={wihpTactic ?? '-'} />
              <SReadOnly id='quick-campaigns-drawer_wihp-subtype-ro' label='Sub-Type' value='Metasearch' />
              <SReadOnly id='quick-campaigns-drawer_wihp-lang-ro' label='Language' value='EN' />
            </FieldGridThree>
            <FieldGridThree>
              <Input id='quick-campaigns-drawer_wihp-c1-inp' label='Custom 1' placeholder='-' disabled={!contextReady} value={sCustom1} onChange={e => setSCustom1(e.target.value)} />
              <Input id='quick-campaigns-drawer_wihp-c2-inp' label='Custom 2' placeholder='-' disabled={!contextReady} value={sCustom2} onChange={e => setSCustom2(e.target.value)} />
              <Input id='quick-campaigns-drawer_wihp-c3-inp' label='Custom 3' placeholder='-' disabled={!contextReady} value={sCustom3} onChange={e => setSCustom3(e.target.value)} />
            </FieldGridThree>
            <QuickGeneratedName>
              Campaign Name: {[advertiserNameForBpid(bpid), wihpTactic, 'Metasearch', 'EN', sCustom1, sCustom2, sCustom3].filter(Boolean).join('_') || '-'}
            </QuickGeneratedName>
          </Card>
        ) : null}
      </DrawerContent>

      <DrawerFooter>
        <Button htmlType='button' id='quick-campaigns-drawer_cancel-btn' variant='outlined' onClick={onClose}>
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {!readOnly && (
          <Button htmlType='button' id='quick-campaigns-drawer_save-btn' onClick={onClose} disabled={!canSaveQuick}>
            Save
          </Button>
        )}
      </DrawerFooter>
    </Drawer>
  )
}

export default QuickCampaignsDrawer
