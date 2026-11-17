import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MediaSettingsDrawer } from '../../MediaSettingsDrawer'
import { buildInitialTabsFromSchema } from '../../helpers'
import type { MediaTab } from '../../BudgetDistribution.d'

Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      getPropertyValue: () => '',
      overflow: 'scroll',
      overflowY: 'scroll',
      overflowX: 'scroll',
    }) as any,
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(global as any).ResizeObserver = ResizeObserverMock

jest.mock('rc-util/lib/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('rc-util/es/getScrollBarSize', () => ({
  __esModule: true,
  default: () => 0,
  getTargetScrollBarSize: () => ({ width: 0, height: 0 }),
}))

jest.mock('@amadeus/react-design-factory/components/Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid='icon' />,
}))

// Stateful wrapper so setSettingsDraftTabs mutations are reflected in re-renders
function DrawerHarness({
  isOpen = true,
  onClose = jest.fn(),
  onSave = jest.fn(),
}: {
  isOpen?: boolean
  onClose?: () => void
  onSave?: () => void
}) {
  const [draftTabs, setDraftTabs] = useState<MediaTab[]>(buildInitialTabsFromSchema())
  return (
    <MediaSettingsDrawer
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      settingsDraftTabs={draftTabs}
      setSettingsDraftTabs={setDraftTabs}
    />
  )
}

describe('MediaSettingsDrawer — visibility', () => {
  test('renders the "Media Settings" title when open', () => {
    render(<DrawerHarness isOpen />)
    expect(screen.getByText('Media Settings')).toBeInTheDocument()
  })

  test('does not render drawer content when closed', () => {
    render(<DrawerHarness isOpen={false} />)
    expect(screen.queryByText('Media Settings')).not.toBeInTheDocument()
  })
})

describe('MediaSettingsDrawer — footer buttons', () => {
  test('renders Cancel button', () => {
    render(<DrawerHarness />)
    expect(document.getElementById('media_plan_budget_distribution-settings_drawer_cancel-btn')).toBeInTheDocument()
  })

  test('renders Save button', () => {
    render(<DrawerHarness />)
    expect(document.getElementById('media_plan_budget_distribution-settings_drawer_save-btn')).toBeInTheDocument()
  })

  test('Cancel button calls onClose', () => {
    const onClose = jest.fn()
    render(<DrawerHarness onClose={onClose} />)
    fireEvent.click(document.getElementById('media_plan_budget_distribution-settings_drawer_cancel-btn')!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('Save button calls onSave', () => {
    const onSave = jest.fn()
    render(<DrawerHarness onSave={onSave} />)
    fireEvent.click(document.getElementById('media_plan_budget_distribution-settings_drawer_save-btn')!)
    expect(onSave).toHaveBeenCalledTimes(1)
  })
})

describe('MediaSettingsDrawer — channel groups', () => {
  test('renders a group for each channel tab', () => {
    render(<DrawerHarness />)
    expect(screen.getByText('Paidsearch')).toBeInTheDocument()
    expect(screen.getByText('Display')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
    expect(screen.getByText('Video')).toBeInTheDocument()
    expect(screen.getByText('Metasearch')).toBeInTheDocument()
  })
})

describe('MediaSettingsDrawer — digital platform & tactic checkboxes', () => {
  test('renders Google Ads platform checkbox for paid-search', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById('media_plan_budget_distribution-settings_platform-paid-search-google-ads-chk')
    expect(chk).toBeInTheDocument()
  })

  test('Google Ads platform checkbox is initially checked (all enabled by default)', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById(
      'media_plan_budget_distribution-settings_platform-paid-search-google-ads-chk',
    ) as HTMLInputElement
    expect(chk).toBeChecked()
  })

  test('renders Brand tactic checkbox nested under Google Ads', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById(
      'media_plan_budget_distribution-settings_tactic-paid-search-google-ads-google-ads-brand-chk',
    )
    expect(chk).toBeInTheDocument()
  })

  test('unchecking a platform checkbox disables it and all its tactics', () => {
    render(<DrawerHarness />)
    const platformChk = document.getElementById(
      'media_plan_budget_distribution-settings_platform-paid-search-google-ads-chk',
    ) as HTMLInputElement

    fireEvent.click(platformChk)

    // Platform should now be unchecked
    expect(platformChk).not.toBeChecked()
    // Tactics under it should be disabled (their platform is off)
    const tacticChk = document.getElementById(
      'media_plan_budget_distribution-settings_tactic-paid-search-google-ads-google-ads-brand-chk',
    ) as HTMLInputElement
    expect(tacticChk).toBeDisabled()
  })

  test('toggling a tactic checkbox while platform is enabled changes checked state', () => {
    render(<DrawerHarness />)
    const tacticChk = document.getElementById(
      'media_plan_budget_distribution-settings_tactic-paid-search-google-ads-google-ads-brand-chk',
    ) as HTMLInputElement

    expect(tacticChk).toBeChecked()
    fireEvent.click(tacticChk)
    expect(tacticChk).not.toBeChecked()
  })

  test('renders Facebook/IG platform checkbox for social', () => {
    render(<DrawerHarness />)
    expect(
      document.getElementById('media_plan_budget_distribution-settings_platform-social-facebook-ig-chk'),
    ).toBeInTheDocument()
  })
})

describe('MediaSettingsDrawer — metasearch platform checkboxes', () => {
  test('renders Trivago metasearch checkbox', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById(
      'media_plan_budget_distribution-settings_metasearch_platform-metasearch-trivago-chk',
    )
    expect(chk).toBeInTheDocument()
  })

  test('Trivago checkbox is initially checked', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById(
      'media_plan_budget_distribution-settings_metasearch_platform-metasearch-trivago-chk',
    ) as HTMLInputElement
    expect(chk).toBeChecked()
  })

  test('clicking Trivago checkbox toggles its checked state', () => {
    render(<DrawerHarness />)
    const chk = document.getElementById(
      'media_plan_budget_distribution-settings_metasearch_platform-metasearch-trivago-chk',
    ) as HTMLInputElement

    fireEvent.click(chk)
    expect(chk).not.toBeChecked()

    fireEvent.click(chk)
    expect(chk).toBeChecked()
  })

  test('renders Google Hotel, Kayak, and Tripadvisor metasearch checkboxes', () => {
    render(<DrawerHarness />)
    expect(screen.getByText('Google Hotel')).toBeInTheDocument()
    expect(screen.getByText('Kayak')).toBeInTheDocument()
    expect(screen.getByText('Tripadvisor')).toBeInTheDocument()
  })
})