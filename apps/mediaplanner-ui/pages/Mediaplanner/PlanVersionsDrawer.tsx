import React from 'react'
import { Button, Drawer, DropdownMenu, Icon, Input } from '@amadeus/react-design-factory'
import {
  usePlanVersions,
  savePlanVersion,
  setActivePlanVersion,
  deletePlanVersion,
  MAX_PLAN_VERSIONS,
  type PlanVersion,
  type PlanVersionSnapshot,
} from './planVersionStore'
import * as Styled from './Mediaplanner.styled'

interface PlanVersionsDrawerProps {
  planId: string | undefined
  isOpen: boolean
  onClose: () => void
  /** Capture the current plan state across steps into a snapshot (for a new version). */
  captureSnapshot: () => PlanVersionSnapshot
  /** Restore a viewed version's snapshot into the live client state. */
  onView: (snapshot: PlanVersionSnapshot) => void
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "14 Oct 2026 13:34" — a time-based label, exempt from the dd-Mmm-yyyy display rule.
const formatVersionTimestamp = (iso: string): string => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${hh}:${mm}`
}

export const PlanVersionsDrawer: React.FC<PlanVersionsDrawerProps> = ({
  planId,
  isOpen,
  onClose,
  captureSnapshot,
  onView,
}) => {
  const { versions, activeVersionId } = usePlanVersions(planId)
  const [isNaming, setIsNaming] = React.useState(false)
  const [newName, setNewName] = React.useState('')
  const atLimit = versions.length >= MAX_PLAN_VERSIONS

  const startSaveNew = () => {
    setNewName('')
    setIsNaming(true)
  }

  const confirmSaveNew = () => {
    savePlanVersion(planId, newName.trim() || 'Untitled version', captureSnapshot())
    setIsNaming(false)
    setNewName('')
  }

  const handleView = (version: PlanVersion) => {
    onView(version.snapshot)
    onClose()
  }

  return (
    <Drawer id='mediaplan-versions-drawer' title='Plan Versions' width='420px' open={isOpen} onClose={onClose}>
      <Styled.VersionsPanelSubtitle id='mediaplan-versions-count-txt'>
        {`${versions.length}/${MAX_PLAN_VERSIONS} versions saved`}
      </Styled.VersionsPanelSubtitle>

      {isNaming ? (
        <Styled.SaveVersionInline style={{ marginTop: 12, marginBottom: 16, width: '100%' }}>
          <Input
            id='mediaplan-versions-new_name-inp'
            placeholder='Version name'
            value={newName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
          />
          <Button
            id='mediaplan-versions-new_save-btn'
            size='small'
            variant='solid'
            color='primary'
            onClick={confirmSaveNew}
          >
            Save
          </Button>
          <Button
            id='mediaplan-versions-new_cancel-btn'
            size='small'
            variant='outlined'
            color='primary'
            onClick={() => setIsNaming(false)}
          >
            Cancel
          </Button>
        </Styled.SaveVersionInline>
      ) : (
        <Styled.VersionsSaveNewButton
          id='mediaplan-versions-save_new-btn'
          type='button'
          disabled={atLimit}
          onClick={startSaveNew}
        >
          <Icon name='plus' width={14} height={14} color='currentColor' />
          Save current state as new version
        </Styled.VersionsSaveNewButton>
      )}

      {versions.length === 0 ? (
        <Styled.VersionsEmpty>No versions saved yet.</Styled.VersionsEmpty>
      ) : (
        versions.map(version => {
          const isActive = version.id === activeVersionId
          return (
            <Styled.VersionCard key={version.id} active={isActive} id={`mediaplan-versions-card-${version.id}`}>
              <Styled.VersionCardTitleRow>
                <Styled.VersionCardTitle>
                  {version.name ? `${version.label} — ${version.name}` : version.label}
                </Styled.VersionCardTitle>
                {isActive && <Styled.VersionActiveBadge>ACTIVE</Styled.VersionActiveBadge>}
              </Styled.VersionCardTitleRow>
              <Styled.VersionCardActions>
                <Styled.VersionCardActionButtons>
                  <Button
                    id={`mediaplan-versions-view-${version.id}-btn`}
                    size='small'
                    variant='outlined'
                    color='primary'
                    disabled={isNaming}
                    onClick={() => handleView(version)}
                  >
                    View
                  </Button>
                  {!isActive && (
                    <Button
                      id={`mediaplan-versions-set_active-${version.id}-btn`}
                      size='small'
                      variant='outlined'
                      color='primary'
                      disabled={isNaming}
                      onClick={() => setActivePlanVersion(planId, version.id)}
                    >
                      Set as Active
                    </Button>
                  )}
                  {!isActive && (
                    <DropdownMenu
                      menuType='kebab'
                      disabled={isNaming}
                      items={[
                        {
                          key: 'delete',
                          label: 'Delete',
                          onClick: () => deletePlanVersion(planId, version.id),
                        },
                      ]}
                    />
                  )}
                </Styled.VersionCardActionButtons>
                <Styled.VersionCardTimestamp>{formatVersionTimestamp(version.savedAt)}</Styled.VersionCardTimestamp>
              </Styled.VersionCardActions>
            </Styled.VersionCard>
          )
        })
      )}
    </Drawer>
  )
}
