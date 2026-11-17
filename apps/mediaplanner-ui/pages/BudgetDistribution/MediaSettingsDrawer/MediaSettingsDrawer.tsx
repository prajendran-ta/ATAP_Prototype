import React, { FC, useMemo } from 'react'
import { Button, Checkbox, Drawer, Text } from '@amadeus/react-design-factory'
import * as Styled from '../BudgetDistribution.styled'
import { getFullSchemaTabs } from '../helpers'
import type { MediaTab } from '../BudgetDistribution.d'

type MediaSettingsDrawerProps = {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  settingsDraftTabs: MediaTab[]
  setSettingsDraftTabs: React.Dispatch<React.SetStateAction<MediaTab[]>>
}

export const MediaSettingsDrawer: FC<MediaSettingsDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  settingsDraftTabs,
  setSettingsDraftTabs,
}) => {
  const fullSchemaTabs = useMemo(() => getFullSchemaTabs(), [])
  const isPlatformEnabled = (tabId: string, platformId: string): boolean => {
    const tab = settingsDraftTabs.find(t => t.id === tabId)
    return !!tab?.platforms.find(p => p.id === platformId && p.enabled)
  }

  const isTacticEnabled = (tabId: string, platformId: string, tacticId: string): boolean => {
    const tab = settingsDraftTabs.find(t => t.id === tabId)
    const platform = tab?.platforms.find(p => p.id === platformId)
    return !!platform?.tactics.find(tc => tc.id === tacticId && tc.enabled)
  }

  const isMetasearchPlatformEnabled = (tabId: string, platformId: string): boolean => {
    const tab = settingsDraftTabs.find(t => t.id === tabId)
    return !!tab?.metasearchPlatforms?.find(p => p.id === platformId && p.enabled)
  }

  return (
      <Drawer
        id='media_plan_budget_distribution-settings_drawer-dwr'
        title='Media Settings'
        width='380px'
        placement='right'
        open={isOpen}
        onClose={onClose}
        footer={
          <Styled.DrawerFooter>
            <Button id='media_plan_budget_distribution-settings_drawer_cancel-btn' variant='outlined' onClick={onClose}>
              Cancel
            </Button>
            <Button id='media_plan_budget_distribution-settings_drawer_save-btn' onClick={onSave}>
              Save
            </Button>
          </Styled.DrawerFooter>
        }
      >
        <Styled.ModalBody>
        {fullSchemaTabs.map(tab => (
          <Styled.ModalGroup key={tab.id} id={`media_plan_budget_distribution-settings_tab-${tab.id}-grp`}>
            <Text.Body>
              <Styled.BoldText>{tab.label}</Styled.BoldText>
            </Text.Body>
            <Styled.ModalIndented>
              {tab.type === 'metasearch'
                ? (tab.metasearchPlatforms ?? []).map(p => (
                    <Checkbox
                      key={p.id}
                      id={`media_plan_budget_distribution-settings_metasearch_platform-${tab.id}-${p.id}-chk`}
                      checked={isMetasearchPlatformEnabled(tab.id, p.id)}
                      onChange={() =>
                        setSettingsDraftTabs(prev =>
                          prev.map(t =>
                            t.id !== tab.id
                              ? t
                              : {
                                  ...t,
                                  metasearchPlatforms: (t.metasearchPlatforms ?? []).map(mp =>
                                    mp.id !== p.id
                                      ? mp
                                      : { ...mp, enabled: !isMetasearchPlatformEnabled(tab.id, p.id) },
                                  ),
                                },
                          ),
                        )
                      }
                    >
                      {p.label}
                    </Checkbox>
                  ))
                : tab.platforms.map(p => (
                    <Styled.PlatformCheckboxGroup key={p.id}>
                      <Checkbox
                        id={`media_plan_budget_distribution-settings_platform-${tab.id}-${p.id}-chk`}
                        checked={isPlatformEnabled(tab.id, p.id)}
                        onChange={() =>
                          setSettingsDraftTabs(prev =>
                            prev.map(t =>
                              t.id !== tab.id
                                ? t
                                : {
                                    ...t,
                                    platforms: t.platforms.map(tp =>
                                      tp.id !== p.id
                                        ? tp
                                        : {
                                            ...tp,
                                            enabled: !isPlatformEnabled(tab.id, p.id),
                                            tactics: tp.tactics.map(tc => ({
                                              ...tc,
                                              enabled: !isPlatformEnabled(tab.id, p.id),
                                            })),
                                          },
                                    ),
                                  },
                            ),
                          )
                        }
                      >
                        {p.label}
                      </Checkbox>
                      <Styled.ModalIndented>
                        {p.tactics.map(tc => (
                          <Checkbox
                            key={tc.id}
                            id={`media_plan_budget_distribution-settings_tactic-${tab.id}-${p.id}-${tc.id}-chk`}
                            checked={isTacticEnabled(tab.id, p.id, tc.id)}
                            disabled={!isPlatformEnabled(tab.id, p.id)}
                            onChange={() =>
                              setSettingsDraftTabs(prev =>
                                prev.map(t =>
                                  t.id !== tab.id
                                    ? t
                                    : {
                                        ...t,
                                        platforms: t.platforms.map(tp =>
                                          tp.id !== p.id
                                            ? tp
                                            : {
                                                ...tp,
                                                tactics: tp.tactics.map(ttc =>
                                                  ttc.id !== tc.id
                                                    ? ttc
                                                    : { ...ttc, enabled: !isTacticEnabled(tab.id, p.id, tc.id) },
                                                ),
                                              },
                                        ),
                                      },
                                ),
                              )
                            }
                          >
                            {tc.label}
                          </Checkbox>
                        ))}
                      </Styled.ModalIndented>
                    </Styled.PlatformCheckboxGroup>
                  ))}
            </Styled.ModalIndented>
          </Styled.ModalGroup>
        ))}
        </Styled.ModalBody>
      </Drawer>
  )
}
