import { useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, Button, Icon, Input, Modal, Pagination, Select, Text, colors } from '@amadeus/react-design-factory'
import AntInput from 'antd/es/input'
import type { UnmappedCampaign } from './mockData/unmappedCampaigns'
import { getOffersForCampaign, type OfferGroup, type OfferId, type OfferIdStatus } from './mockData/offers'
import {
  DrawerBody,
  TopRow,
  GroupCard,
  GroupHeader,
  GroupTitle,
  GroupCount,
  StatusSummary,
  StatusCount,
  GroupBody,
  IdRow,
  IdListHead,
  IdMain,
  IdLabel,
  IdDetail,
  StatusDot,
  IconBtn,
  AddIdsRow,
  AddIdsField,
  ViewMappedRow,
  NewTextRow,
  NewTextField,
  DrawerFooter,
  EmptyState,
  NewTag,
  GroupCardNew,
  IdRowNew,
} from './OffersDrawer.styled'

interface OffersDrawerProps {
  open: boolean
  campaign: UnmappedCampaign | null
  /** Read-only users: view offers only — no add/delete/save. */
  readOnly?: boolean
  onClose: () => void
}

const OWN_ID_PREFIX = '__own__:'

function dotColor(status: OfferIdStatus): string {
  if (status === 'green') return colors.forest_60
  if (status === 'red') return colors.crimson_60
  return colors.cloud_50 // grey
}

function statusLabel(status: OfferIdStatus): string {
  if (status === 'green') return 'Confirmed'
  if (status === 'red') return 'Not confirmed after 48h'
  return 'Awaiting backend confirmation'
}

// Platform-shaped Offer_ID presentation (Req 8.9–8.12):
//  - SA360 → Ad ID + Ad URL
//  - CM360 (static banner, Feed_1_Reporting_Label = "(not set)") → Creative ID + Creatives
//    (CM360 DYNAMIC banners instead expose the Feed 1 Reporting label with no unique ID —
//     documented variant, not modelled in this prototype.)
//  - Meta → Ad ID + Ad Name
function offerIdLabels(platform: string | undefined): { idHeader: string; detailHeader: string; addLabel: string } {
  switch (platform) {
    case 'SA360':
      return { idHeader: 'Ad ID', detailHeader: 'Ad URL', addLabel: 'Add Ad IDs' }
    case 'CM360':
      return { idHeader: 'Creative ID', detailHeader: 'Creatives', addLabel: 'Add Creative IDs' }
    case 'Meta':
      return { idHeader: 'Ad ID', detailHeader: 'Ad Name', addLabel: 'Add Ad IDs' }
    default:
      return { idHeader: 'Offer ID', detailHeader: 'Detail', addLabel: 'Add Offer IDs' }
  }
}

function OffersDrawer({ open, campaign, readOnly = false, onClose }: OffersDrawerProps) {
  const [groups, setGroups] = useState<OfferGroup[]>([])
  const [available, setAvailable] = useState<OfferId[]>([])
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  // Per-group: user explicitly revealed the already-mapped offers via the "View mapped offers"
  // button (mapped offers are hidden by default; Req 8, revised).
  const [revealedGroups, setRevealedGroups] = useState<Set<string>>(new Set())
  const [addingText, setAddingText] = useState(false)
  const [newText, setNewText] = useState('')
  const [search, setSearch] = useState('')
  // Baseline captured on open — used to detect deletions when the user hits Save.
  const [baseline, setBaseline] = useState<{ groupIds: Set<string>; offerIds: Set<string> }>({ groupIds: new Set(), offerIds: new Set() })
  const [confirmSave, setConfirmSave] = useState(false)

  useEffect(() => {
    if (open && campaign) {
      const data = getOffersForCampaign(campaign.id, campaign.platform)
      setGroups(data.groups.map(g => ({ ...g, offerIds: [...g.offerIds] })))
      setAvailable([...data.available])
      setOpenGroups(new Set()) // accordions closed by default
      setRevealedGroups(new Set()) // mapped offers hidden until explicitly revealed
      setAddingText(false)
      setNewText('')
      setSearch('')
      setConfirmSave(false)
      setBaseline({
        groupIds: new Set(data.groups.map(g => g.id)),
        offerIds: new Set(data.groups.flatMap(g => g.offerIds.map(o => o.id))),
      })
    }
  }, [open, campaign])

  // When a search is active, auto-expand the groups that match — but keep them toggleable
  // afterwards (we only seed openGroups, we don't force the open state on every render).
  useEffect(() => {
    const term = search.trim().toLowerCase()
    // Clearing the search collapses everything back to the default (all closed).
    if (!term) {
      setOpenGroups(new Set())
      return
    }
    const matchIds = groups
      .filter(
        g =>
          g.text.toLowerCase().includes(term) ||
          g.offerIds.some(o => o.idLabel.toLowerCase().includes(term) || o.detail.toLowerCase().includes(term)),
      )
      .map(g => g.id)
    setOpenGroups(new Set(matchIds))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const toggleGroup = (id: string) =>
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleRevealed = (id: string) =>
    setRevealedGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // IDs already used across all groups — excluded from the add-ID pickers (one offer per ID).
  const usedIds = useMemo(() => new Set(groups.flatMap(g => g.offerIds.map(o => o.id))), [groups])
  // Platform-shaped Offer_ID labels (Req 8.9–8.12).
  const labels = offerIdLabels(campaign?.platform)

  // Add Offer_IDs to a group. A value from the available list -> green; a typed/own id -> grey.
  const addIdsToGroup = (groupId: string, values: string[]) => {
    if (!values.length) return
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g
        const additions: OfferId[] = values.flatMap<OfferId>(v => {
          if (v.startsWith(OWN_ID_PREFIX)) {
            // A typed value may be a comma-separated list of IDs; each typed/own id -> grey.
            const raw = v.slice(OWN_ID_PREFIX.length)
            return raw
              .split(',')
              .map(x => x.trim())
              .filter(Boolean)
              .map((x): OfferId => ({ id: x, idLabel: x, detail: 'Manually added', status: 'grey' }))
          }
          const found = available.find(o => o.id === v)
          const one: OfferId = found
            ? { ...found, status: 'green' }
            : { id: v, idLabel: v, detail: '', status: 'green' }
          return [one]
        })
        const existing = new Set(g.offerIds.map(o => o.id))
        const fresh = additions.filter(a => !existing.has(a.id))
        return { ...g, offerIds: [...fresh, ...g.offerIds] }
      }),
    )
  }

  const removeId = (groupId: string, idToRemove: string) =>
    setGroups(prev => prev.map(g => (g.id === groupId ? { ...g, offerIds: g.offerIds.filter(o => o.id !== idToRemove) } : g)))

  const addGroup = () => {
    const text = newText.trim()
    if (text.length < 1 || text.length > 255) return
    const id = `og-new-${Date.now()}`
    setGroups(prev => [{ id, text, offerIds: [] }, ...prev])
    setOpenGroups(prev => new Set(prev).add(id))
    setAddingText(false)
    setNewText('')
  }

  // Deleting a group (or an Offer_ID) only STAGES the removal — nothing is committed until Save.
  const deleteGroup = (groupId: string) => setGroups(prev => prev.filter(g => g.id !== groupId))

  // Any original group removed, or any original Offer_ID no longer present → staged deletion.
  const hasDeletions = () => {
    const currentGroups = new Set(groups.map(g => g.id))
    const currentIds = new Set(groups.flatMap(g => g.offerIds.map(o => o.id)))
    for (const gid of baseline.groupIds) if (!currentGroups.has(gid)) return true
    for (const oid of baseline.offerIds) if (!currentIds.has(oid)) return true
    return false
  }

  // Save: if the staged changes include a deletion, confirm once; otherwise commit immediately.
  const handleSave = () => {
    if (hasDeletions()) {
      setConfirmSave(true)
      return
    }
    onClose()
  }

  const commitSave = () => {
    setConfirmSave(false)
    onClose()
  }

  const q = search.trim().toLowerCase()
  // When searching, keep groups that match on their Offer text OR contain a matching Offer_ID.
  // If the match is on the text, show all its IDs; if the match is only on IDs, show just those.
  const visibleGroups = useMemo(() => {
    let out: OfferGroup[] = groups
    if (q) {
      out = []
      for (const g of groups) {
        const textMatch = g.text.toLowerCase().includes(q)
        const idMatches = g.offerIds.filter(
          o => o.idLabel.toLowerCase().includes(q) || o.detail.toLowerCase().includes(q),
        )
        if (textMatch) out.push(g)
        else if (idMatches.length > 0) out.push({ ...g, offerIds: idMatches })
      }
    }
    // Staged (unsaved) offer groups float to the top so they're on the first page; keep relative
    // order within the new vs saved buckets, each sorted alphabetically by Offer text.
    const isNew = (g: OfferGroup) => !baseline.groupIds.has(g.id)
    return [...out].sort(
      (a, b) => Number(isNew(b)) - Number(isNew(a)) || a.text.localeCompare(b.text),
    )
  }, [groups, q, baseline])

  const title = campaign ? `Offers — ${campaign.externalCampaignName}` : 'Offers'
  const newTextValid = newText.trim().length >= 1 && newText.trim().length <= 255

  return (
    <Drawer
      id='offers-drawer'
      title={title}
      placement='right'
      width={'820px'}
      onClose={onClose}
      open={open}
      destroyOnClose
      styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' }, header: { background: 'transparent' } }}
    >
      <DrawerBody>
        <TopRow>
          <div>
            <Text.H5 id='offers-drawer_ttl'>Offers ({groups.length})</Text.H5>
            {/* Offer_ID type is platform-level (same for every offer here), so show it once. */}
            <Text.Body id='offers-drawer_idtype-txt' style={{ color: colors.cloud_80, fontSize: 12 }}>
              Offer IDs for this campaign: {labels.idHeader} ({labels.detailHeader})
            </Text.Body>
          </div>
          {!readOnly && (
            <Button id='offers-drawer_add-text-btn' variant='outlined' size='small' onClick={() => setAddingText(true)}>
              Add Offer text
            </Button>
          )}
        </TopRow>

        <AntInput.Search
          id='offers-drawer_search-inp'
          placeholder='Search offers by text, Offer ID, or name/URL'
          allowClear
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {addingText && (
          <NewTextRow>
            <NewTextField>
              <Input
                id='offers-drawer_new-text-inp'
                label='New Offer text'
                required
                placeholder='Offer text (1–255 characters)'
                value={newText}
                onChange={e => setNewText(e.target.value)}
                errorMessage={newText.length > 0 && !newTextValid ? 'Offer text must be 1–255 characters' : undefined}
              />
            </NewTextField>
            <Button id='offers-drawer_create-text-btn' htmlType='button' onClick={addGroup} disabled={!newTextValid}>
              Add
            </Button>
            <Button id='offers-drawer_cancel-text-btn' variant='outlined' htmlType='button' onClick={() => { setAddingText(false); setNewText('') }}>
              Cancel
            </Button>
          </NewTextRow>
        )}

        {groups.length === 0 && !addingText && <EmptyState>No offers yet. Use “Add Offer text” to create one.</EmptyState>}
        {groups.length > 0 && visibleGroups.length === 0 && <EmptyState>No offers match your search.</EmptyState>}

        {visibleGroups.map(g => {
          const isOpen = openGroups.has(g.id)
          const options = available.filter(o => !usedIds.has(o.id)).map(o => ({ label: `${o.idLabel} · ${o.detail}`, value: o.id }))
          const noneAvailable = options.length === 0
          const isNewGroup = !baseline.groupIds.has(g.id)
          const Card = isNewGroup ? GroupCardNew : GroupCard
          return (
            <Card key={g.id}>
              <GroupHeader>
                <GroupTitle type='button' onClick={() => toggleGroup(g.id)}>
                  <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} width={12} height={12} />
                  <span>{g.text}</span>
                  <GroupCount>· {g.offerIds.length} offer{g.offerIds.length === 1 ? '' : 's'}</GroupCount>
                  {isNewGroup && <NewTag id={`offers-drawer_new-group-${g.id}`}>New</NewTag>}
                </GroupTitle>
                {(() => {
                  const counts = { green: 0, grey: 0, red: 0 }
                  g.offerIds.forEach(o => (counts[o.status] += 1))
                  return (
                    <StatusSummary>
                      {counts.green > 0 && (
                        <StatusCount title='Confirmed'>
                          <StatusDot color={colors.forest_60} /> {counts.green}
                        </StatusCount>
                      )}
                      {counts.grey > 0 && (
                        <StatusCount title='Awaiting backend confirmation'>
                          <StatusDot color={colors.cloud_50} /> {counts.grey}
                        </StatusCount>
                      )}
                      {counts.red > 0 && (
                        <StatusCount title='Needs attention'>
                          <StatusDot color={colors.crimson_60} /> {counts.red}
                        </StatusCount>
                      )}
                    </StatusSummary>
                  )
                })()}
                {!readOnly && (
                  <IconBtn type='button' aria-label={`Delete offer text "${g.text}"`} onClick={() => deleteGroup(g.id)}>
                    <Icon name='trashCan' width={16} height={16} />
                  </IconBtn>
                )}
              </GroupHeader>

              {isOpen && (
                <GroupBody>
                  {/* Adding Offer_IDs is the primary action here, so the Add control sits at the TOP.
                      Already-mapped offers are hidden by default (Req 8, revised) and opened below via
                      the "View mapped offers" toggle (or a search). Newly added (unsaved) IDs show
                      right under the Add control so the user sees what they just added. */}
                  {(() => {
                    const newlyAdded = g.offerIds.filter(o => !baseline.offerIds.has(o.id))
                    const existingCount = g.offerIds.length
                    // The mapped-offers table opens on toggle (button) OR when a search is active.
                    const revealed = revealedGroups.has(g.id)
                    const showExisting = !!q || revealed
                    const idsToShow = showExisting ? g.offerIds : newlyAdded
                    return (
                      <>
                        {/* 1. Add control — the main function. */}
                        {!readOnly && (
                          <AddIdsRow>
                            <AddIdsField>
                              {noneAvailable ? (
                                // Req 8.13: no Offer_IDs left to map — show empty state, no add control.
                                <EmptyState>No {labels.idHeader}s available to map — all are already mapped.</EmptyState>
                              ) : (
                                <AddOfferIds
                                  id={`offers-drawer_add-ids-${g.id}`}
                                  options={options}
                                  addLabel={labels.addLabel}
                                  onAdd={values => addIdsToGroup(g.id, values)}
                                />
                              )}
                            </AddIdsField>
                          </AddIdsRow>
                        )}

                        {/* 2. Newly added (unsaved) IDs — just under the Add control. */}
                        {!showExisting && newlyAdded.length > 0 && (
                          <GroupIdList offerIds={newlyAdded} readOnly={readOnly} baselineIds={baseline.offerIds} onRemove={id => removeId(g.id, id)} idHeader={labels.idHeader} detailHeader={labels.detailHeader} />
                        )}

                        {/* 3. Right-aligned toggle to reveal the already-mapped offers below it.
                               Hidden while searching (search already drives what's visible). */}
                        {!q && existingCount > 0 && (
                          <ViewMappedRow>
                            <Button
                              id={`offers-drawer_view-mapped-${g.id}`}
                              variant='outlined'
                              size='small'
                              onClick={() => toggleRevealed(g.id)}
                            >
                              {revealed ? 'Hide mapped offers' : `View mapped offers (${existingCount})`}
                            </Button>
                          </ViewMappedRow>
                        )}

                        {/* 4. Revealed/searched mapped-offers table — below the toggle. */}
                        {showExisting && (
                          idsToShow.length > 0 ? (
                            <GroupIdList offerIds={idsToShow} readOnly={readOnly} baselineIds={baseline.offerIds} onRemove={id => removeId(g.id, id)} idHeader={labels.idHeader} detailHeader={labels.detailHeader} />
                          ) : (
                            <EmptyState>No {labels.idHeader}s to show.</EmptyState>
                          )
                        )}

                        {readOnly && existingCount === 0 && (
                          <EmptyState>No {labels.idHeader}s yet.</EmptyState>
                        )}
                      </>
                    )
                  })()}
                </GroupBody>
              )}
            </Card>
          )
        })}
      </DrawerBody>

      <DrawerFooter>
        <Button htmlType='button' id='offers-drawer_cancel-btn' variant='outlined' onClick={onClose}>
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {!readOnly && (
          <Button htmlType='button' id='offers-drawer_save-btn' onClick={handleSave}>
            Save
          </Button>
        )}
      </DrawerFooter>

      <Modal
        idPrefix='offers-save'
        title='Save changes'
        open={confirmSave}
        okText='Save'
        cancelText='Cancel'
        onCancel={() => setConfirmSave(false)}
        onOk={commitSave}
      >
        Your changes include deleting offers or Offer IDs. Saving will remove them. Continue?
      </Modal>
    </Drawer>
  )
}

// Renders a group's Offer_IDs with pagination (keeps the DOM light for large groups).
function GroupIdList({ offerIds, readOnly = false, baselineIds, onRemove, idHeader, detailHeader }: { offerIds: OfferId[]; readOnly?: boolean; baselineIds: Set<string>; onRemove: (id: string) => void; idHeader: string; detailHeader: string }) {
  const PAGE = 10
  const [page, setPage] = useState(1)
  // New IDs are prepended, so jump back to page 1 whenever the list grows to reveal them.
  const prevLen = useRef(offerIds.length)
  useEffect(() => {
    if (offerIds.length > prevLen.current) setPage(1)
    prevLen.current = offerIds.length
  }, [offerIds.length])
  // Clamp when the list shrinks (e.g. removals) so we never land on an empty page.
  const pageCount = Math.max(1, Math.ceil(offerIds.length / PAGE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * PAGE
  const slice = offerIds.slice(start, start + PAGE)
  return (
    <>
      <IdListHead>
        <span aria-hidden />
        <span>{idHeader} · {detailHeader}</span>
        <span aria-hidden />
      </IdListHead>
      {slice.map(o => {
        const isNew = !baselineIds.has(o.id)
        const Row = isNew ? IdRowNew : IdRow
        return (
          <Row key={o.id}>
            <StatusDot color={dotColor(o.status)} title={statusLabel(o.status)} />
            <IdMain>
              <IdLabel>
                {o.idLabel}
                {isNew && <NewTag style={{ marginLeft: 8 }}>New</NewTag>}
              </IdLabel>
              <IdDetail>{o.detail}</IdDetail>
            </IdMain>
            {!readOnly && (
              <IconBtn type='button' aria-label={`Remove ${o.idLabel}`} onClick={() => onRemove(o.id)}>
                <Icon name='trashCan' width={14} height={14} />
              </IconBtn>
            )}
          </Row>
        )
      })}
      {offerIds.length > PAGE && (
        <Pagination
          current={current}
          pageSize={PAGE}
          total={offerIds.length}
          showTotal={(total, [s2, e2]) => `${s2}–${e2} of ${total} offer IDs`}
          onChange={p => setPage(p)}
        />
      )}
    </>
  )
}

// A multi-select of available Offer_IDs with a "type to add your own" option; adds on confirm.
function AddOfferIds({
  id,
  options,
  addLabel,
  onAdd,
}: {
  id: string
  options: { label: string; value: string }[]
  addLabel: string
  onAdd: (values: string[]) => void
}) {
  const SELECT_ALL = '__select_all__'
  const [selected, setSelected] = useState<string[]>([])
  const [term, setTerm] = useState('')
  // Options matching the current search term — what 'Select all' maps in one go.
  const matches = useMemo(() => {
    const t = term.trim().toLowerCase()
    return t ? options.filter(o => o.label.toLowerCase().includes(t)) : options
  }, [term, options])
  const opts = useMemo(() => {
    const t = term.trim()
    const inList = options.some(o => o.label.toLowerCase().includes(t.toLowerCase()))
    const ownOpt = t && !inList ? [{ label: `Add "${t}" (comma-separate for multiple)`, value: `${OWN_ID_PREFIX}${t}` }] : []
    // 'Select all' is the FIRST item; its label embeds the term so label-search keeps it visible.
    const selectAllOpt =
      matches.length > 0
        ? [{ label: t ? `Select all ${matches.length} matching "${t}"` : 'Select all', value: SELECT_ALL }]
        : []
    return [...selectAllOpt, ...ownOpt, ...options]
  }, [term, options, matches])
  const handleChange = (vals: string[]) => {
    // 'Select all' TICKS all current matches (union with any existing selection), keeping the
    // search filter so they render checked and the user can still deselect a few before Add.
    // It is never stored in the selection itself.
    if (vals.includes(SELECT_ALL)) {
      setSelected(prev => Array.from(new Set([...prev, ...matches.map(o => o.value)])))
      return
    }
    setSelected(vals.filter(v => v !== SELECT_ALL))
  }
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Select
          id={id}
          label={addLabel}
          mode='multiple'
          showSearch
          placeholder='Select from available, or type IDs (comma-separated) to add'
          options={opts}
          value={selected}
          onChange={v => handleChange(v as string[])}
          onSearch={setTerm}
          searchBy='label'
          notFoundContent='Type to add an Offer ID'
        />
      </div>
      <Button
        htmlType='button'
        size='small'
        disabled={selected.length === 0}
        onClick={() => {
          onAdd(selected)
          setSelected([])
          setTerm('')
        }}
      >
        Add
      </Button>
    </div>
  )
}

export default OffersDrawer
