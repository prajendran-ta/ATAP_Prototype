import React from 'react'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { App } from '@amadeus/react-design-factory'
import { CampaignAdPreview } from '../../CampaignCreationCanvas/CampaignAdPreview'
import { CampaignFlowConversation, renderRichText } from '../CampaignFlowConversation'
import { CampaignCreationCanvas } from '../../CampaignCreationCanvas/CampaignCreationCanvas'
import MediaPlanCanvas from '../../MediaPlanCanvas/MediaPlanCanvas'
import { normalizePlatforms } from '../campaignFlowLogic'
import {
  getCampaignFlowState,
  isCampaignFlowPrompt,
  launchCampaign,
  openCampaignWorkspace,
  resetCampaignFlow,
  setCampaignWorkspaceOpen,
  startCampaignStructureView,
  startClosedWonCampaignCreation,
  startClosedWonMediaPlanView,
  startCampaignFlow,
  useCampaignFlowState,
} from '../campaignFlowStore'

const Harness: React.FC = () => {
  const { aiWorkspaceMode, aiWorkspaceType } = useCampaignFlowState()
  return (
    <App>
      <CampaignFlowConversation />
      {aiWorkspaceMode ? (
        aiWorkspaceType === 'media-plan' ? <MediaPlanCanvas /> : <CampaignCreationCanvas />
      ) : null}
    </App>
  )
}

const advance = (ms: number) =>
  act(() => {
    jest.advanceTimersByTime(ms)
  })

describe('Campaign flow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    resetCampaignFlow()
  })

  afterEach(() => {
    act(() => resetCampaignFlow())
    jest.useRealTimers()
  })

  it('detects the campaign prompt and renders rich text safely', () => {
    expect(isCampaignFlowPrompt('  Create campaign for Advertiser Name')).toBe(true)
    expect(isCampaignFlowPrompt('Create campaign')).toBe(false)
    render(<p>{renderRichText('Budget <strong>$20,000</strong> total')}</p>)
    expect(screen.getByText('$20,000').tagName).toBe('STRONG')
  })

  it('renders format-specific previews for added platforms', () => {
    const platforms = normalizePlatforms()
    const previewPlatformIds = ['amadeus-dsp', 'youtube', 'spotify', 'pinterest', 'snapchat', 'demandgen', 'wego', 'expedia']

    render(
      <App>
        {previewPlatformIds.map(platformId => {
          const platform = platforms.find(item => item.id === platformId)!
          return (
            <CampaignAdPreview
              key={platform.id}
              platform={platform}
              headline={platform.creative.headline}
              description={platform.creative.description}
              image={platform.creative.assetImages?.[0]}
            />
          )
        })}
      </App>,
    )

    previewPlatformIds.forEach(platformId => {
      expect(screen.getByTestId(`ad-preview-${platformId}`)).toBeInTheDocument()
    })
  })

  it('confirms campaign info, then per-platform split, then creates campaigns one platform at a time', () => {
    render(<Harness />)
    act(() => startClosedWonCampaignCreation('Create campaign for plan Amadeus Hotels All year 2027 Rooms'))

    expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['create-campaign'])
    expect(getCampaignFlowState().useClosedWonMediaPlanScope).toBe(true)
    // The closed-won flow now starts on channel setup; Basic Info lives inline in the response.
    expect(getCampaignFlowState().closedWonSetupPhase).toBe('channels')

    advance(7 * 800 + 600 + 800)
    // The canvas no longer auto-opens: Basic Info is editable inline instead.
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    expect(screen.queryByTestId('campaign-creation-canvas')).not.toBeInTheDocument()

    // Inline Campaign Info card is rendered in the response with the editable campaign name.
    const inlineCard = screen.getByTestId('inline-basic-info-card')
    expect(inlineCard).toBeInTheDocument()
    expect(within(inlineCard).getByText('Campaign Info')).toBeInTheDocument()
    expect(within(inlineCard).getByText('Advertiser')).toBeInTheDocument()

    // Before confirming, the checklist, canvas control, and feedback are hidden.
    expect(screen.queryByText('Campaign creation check list')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open campaign canvas' })).not.toBeInTheDocument()

    // Confirming campaign info reveals the per-platform checklist (no channel-settings step)
    // and starts the first platform's Split by card.
    fireEvent.click(screen.getByTestId('inline-basic-info-confirm'))
    expect(getCampaignFlowState().campaignInfoConfirmed).toBe(true)
    expect(screen.queryByTestId('inline-basic-info-confirm')).not.toBeInTheDocument()
    expect(within(inlineCard).getByText('Manage budget by OBA')).toBeInTheDocument()
    // Platforms are listed in the Campaign Info table, sourced from the media plan.
    expect(within(inlineCard).getByText('Platforms')).toBeInTheDocument()

    expect(getCampaignFlowState().closedWonSetupPhase).toBe('platform-setup')
    expect(getCampaignFlowState().closedWonPlatformId).toBe('google-ads')
    // The in-response checklist is gone (the sticky progress bar covers progress); only the active
    // platform card shows.
    expect(screen.queryByText('Campaign creation check list')).not.toBeInTheDocument()
    expect(screen.queryByText('Set up Basic Information')).not.toBeInTheDocument()
    expect(screen.queryByText('Set up channel settings')).not.toBeInTheDocument()

    // The first platform shows its Split by card; the canvas is not open yet.
    expect(screen.getByTestId('platform-setup-card-google-ads')).toBeInTheDocument()
    expect(screen.getByText(/\(1\/9\).*Google Ads/)).toBeInTheDocument()
    expect(screen.queryByTestId('campaign-creation-canvas')).not.toBeInTheDocument()

    // Confirming the split opens the canvas for that platform at its setup step.
    fireEvent.click(screen.getByTestId('platform-split-confirm-google-ads'))
    expect(getCampaignFlowState().closedWonPlatformSplitConfirmed).toBe(true)
    advance(1000)
    const campaignCanvas = screen.getByTestId('campaign-creation-canvas')
    expect(within(campaignCanvas).getByRole('combobox', { name: 'Campaign / split' })).toBeInTheDocument()
    expect(within(campaignCanvas).getByRole('heading', { name: 'Budget strategy' })).toBeInTheDocument()

    const next = () => fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    next()
    next()
    next()
    next()
    expect(screen.getByRole('button', { name: 'Create campaigns for Google Ads' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Create campaigns for Google Ads' }))
    // Campaigns animate in one by one; advance past the per-campaign reveals and the finalize hold.
    expect(getCampaignFlowState().closedWonCreatingPlatformId).toBe('google-ads')
    advance(20000)
    expect(getCampaignFlowState().closedWonCreatedPlatformIds).toEqual(['google-ads'])
    const googleCard = screen.getByTestId('platform-setup-card-google-ads')
    // The completed card collapses; expand it to review its details (View campaign link).
    fireEvent.click(within(googleCard).getByRole('button', { name: /Google Ads/ }))
    const viewCampaignLink = within(googleCard).getByRole('link', {
      name: 'View campaign for Google Ads (opens in new tab)',
    })
    expect(viewCampaignLink).toHaveAttribute('target', '_blank')
    expect(viewCampaignLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(getCampaignFlowState().closedWonPlatformId).toBe('bing')
    // The canvas closes and the next platform's card appears, gating its canvas.
    expect(getCampaignFlowState().closedWonPlatformSplitConfirmed).toBe(false)
    expect(screen.queryByTestId('campaign-creation-canvas')).not.toBeInTheDocument()
    // The completed Google Ads card persists in the response (collapsed) alongside the new one.
    expect(screen.getByTestId('platform-setup-card-google-ads')).toBeInTheDocument()
    expect(screen.getByTestId('platform-setup-card-bing')).toBeInTheDocument()
    expect(screen.getByText(/\(2\/9\).*Bing Ads/)).toBeInTheDocument()
  })

  it('shows the named media plan with channel, platform, tactic, and budget details', () => {
    render(<Harness />)
    act(() => startClosedWonMediaPlanView('View media plan Amadeus Hotels All year 2027 Rooms'))

    expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['media-plan'])
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    expect(getCampaignFlowState().aiWorkspaceType).toBe('media-plan')
    expect(screen.queryByRole('table', { name: 'Media plan' })).not.toBeInTheDocument()
    expect(getCampaignFlowState().blocks[0].steps).toEqual(['Fetching the Plan info'])
    expect(screen.getByText('Fetching the Plan info')).toBeInTheDocument()

    advance(800 + 600)
    expect(screen.getByText('The closed-won media plan - Amadeus Hotels All year 2027 Rooms for Amadeus Hotels is here.')).toBeInTheDocument()
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    expect(screen.queryByTestId('media-plan-canvas')).not.toBeInTheDocument()
    // The media plan opens inline (no canvas), so there is no "Open media plan canvas" button.
    expect(screen.queryByRole('button', { name: 'Open media plan canvas' })).not.toBeInTheDocument()
    const planSummaryCards = screen.getByTestId('closed-won-plan-summary-cards')
    expect(within(planSummaryCards).getByTestId('closed-won-contract-budget-card')).toHaveTextContent('$200,000')
    expect(within(planSummaryCards).getByTestId('closed-won-fees-card')).toHaveTextContent('$20,000')
    expect(within(planSummaryCards).getByTestId('closed-won-margin-card')).toHaveTextContent('28%')

    // The media plan renders inline in the response (no canvas auto-open).
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    expect(screen.queryByTestId('media-plan-canvas')).not.toBeInTheDocument()
    const allocationTable = screen.getByRole('table', { name: 'Media plan budget allocation for 2027' })
    expect(allocationTable).toHaveTextContent('Channel / Platform / Tactic')
    expect(allocationTable).toHaveTextContent('Paid Search')
    expect(allocationTable).toHaveTextContent('$72,000')
    expect(allocationTable).not.toHaveTextContent('Brand')
    expect(allocationTable).not.toHaveTextContent('Google Ads')
    expect(allocationTable).toHaveTextContent('Spend total')
    expect(allocationTable).toHaveTextContent('$180,000')
    expect(allocationTable).toHaveTextContent('Added fees')
    expect(allocationTable).toHaveTextContent('$20,000')
    expect(allocationTable).toHaveTextContent('$200,000')
    expect(allocationTable).toHaveTextContent('Display Advertising')
    expect(allocationTable).toHaveTextContent('Metasearch')
    expect(allocationTable).toHaveTextContent('Other')
    expect(allocationTable).toHaveTextContent('Dec 2027')
    expect(allocationTable).toHaveTextContent('$200,000')

    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Paid Search channel' }))
    expect(allocationTable).toHaveTextContent('Google Ads')
    expect(allocationTable).not.toHaveTextContent('Brand')
    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Google Ads platform' }))
    expect(allocationTable).toHaveTextContent('Brand')
    expect(allocationTable).toHaveTextContent('Generic')
    expect(allocationTable).toHaveTextContent('Pmax')
    const totalRow = within(allocationTable).getByText('Total').closest('tr')
    expect(totalRow?.children[1]).toHaveTextContent('$200,000')

    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Metasearch channel' }))
    expect(allocationTable).toHaveTextContent('Wego')
    expect(allocationTable).not.toHaveTextContent('No tactic configured')
    expect(within(allocationTable).queryByRole('button', { name: 'Expand Wego platform' })).not.toBeInTheDocument()

    expect(screen.queryByRole('table', { name: 'Media plan' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create campaign' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View campaign setup' })).toBeInTheDocument()
    // The media plan canvas is no longer used for viewing, so its toggle is gone.
    expect(screen.queryByRole('button', { name: 'Close media plan canvas' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Good response' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Create campaign' }))
    expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['media-plan', 'create-campaign'])
    expect(screen.getByTestId('campaign-flow-media-plan')).toBeInTheDocument()
    expect(screen.getByText('Create campaign for plan Amadeus Hotels All year 2027 Rooms')).toBeInTheDocument()
    expect(screen.getByText('Analyzing advertiser & budget')).toBeInTheDocument()
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)

    advance(7 * 800 + 600 + 800)
    // Campaign Info now renders inline in the response; the campaign canvas no longer auto-opens.
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    expect(screen.queryByTestId('campaign-creation-canvas')).not.toBeInTheDocument()
    const inlineCard = screen.getByTestId('inline-basic-info-card')
    expect(inlineCard).toBeInTheDocument()
    // The canvas control stays hidden until the user confirms the initial setup.
    expect(screen.queryByRole('button', { name: 'Open campaign canvas' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('inline-basic-info-confirm'))
    // Confirming campaign info starts the first platform's Split by card (channel step removed).
    expect(screen.getByTestId('platform-setup-card-google-ads')).toBeInTheDocument()
    expect(screen.queryByText('Set up channel settings')).not.toBeInTheDocument()
  })

  it('shows the 2026 media plan with its own platforms and only the view-setup action', () => {
    render(<Harness />)
    act(() => startClosedWonMediaPlanView('View media plan Amadeus Hotels All year 2026 Rooms'))

    expect(getCampaignFlowState().selectedMediaPlanYear).toBe('2026')
    advance(800 + 600)
    expect(
      screen.getByText('The closed-won media plan - Amadeus Hotels All year 2026 Rooms for Amadeus Hotels is here.'),
    ).toBeInTheDocument()

    const allocationTable = screen.getByRole('table', { name: 'Media plan budget allocation for 2026' })
    expect(within(allocationTable).getAllByText('Jan 2026').length).toBeGreaterThan(0)
    // 2026 adds Yandex & Baidu and drops Amazon & LinkedIn.
    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Paid Search channel' }))
    expect(allocationTable).toHaveTextContent('Yandex')
    expect(allocationTable).toHaveTextContent('Baidu')
    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Display Advertising channel' }))
    expect(allocationTable).not.toHaveTextContent('Amazon')
    fireEvent.click(within(allocationTable).getByRole('button', { name: 'Expand Social channel' }))
    expect(allocationTable).not.toHaveTextContent('LinkedIn')

    // 2026 campaigns already exist: no "Create campaign", only "View campaign setup".
    expect(screen.queryByRole('button', { name: 'Create campaign' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View campaign setup' })).toBeInTheDocument()
  })

  it('shows the 2026-vs-2027 campaign structure comparison with change markers', () => {
    render(<Harness />)
    act(() => startCampaignStructureView('View existing campaign structure for Amadeus Hotels'))

    expect(getCampaignFlowState().blocks.map(block => block.kind)).toEqual(['campaign-structure'])
    expect(screen.getByText('Looking at the campaign database')).toBeInTheDocument()
    advance(3 * 800 + 600)

    expect(
      screen.getByText(
        'Amadeus Hotels has one active media plan (2026) and one closed-won media plan (2027). Here is the campaign structure for both.',
      ),
    ).toBeInTheDocument()
    const table = screen.getByRole('table', { name: 'Campaign structure current vs next' })
    // Status chips across the pivot: Exists (running), New (to create), Paused (ending),
    // Unpaused (LinkedIn reactivated in 2027 via the 2025 exception).
    expect(within(table).getAllByText('Exists').length).toBeGreaterThan(0)
    expect(within(table).getAllByText('New').length).toBeGreaterThan(0)
    expect(within(table).getAllByText('Paused').length).toBeGreaterThan(0)
    expect(within(table).getAllByText('Unpaused').length).toBeGreaterThan(0)
    // Channel sections + platforms are present.
    expect(within(table).getByText('Paid Search')).toBeInTheDocument()
    expect(table).toHaveTextContent('LinkedIn')
    expect(table).toHaveTextContent('Yandex')
    expect(table).toHaveTextContent('Amazon')
    // Per-year columns are labelled Current (2026) and Next (2027).
    expect(within(table).getAllByText('Current').length).toBeGreaterThan(0)
    expect(within(table).getAllByText('Next').length).toBeGreaterThan(0)
    // Top labels carry each plan name.
    expect(table).toHaveTextContent('Amadeus Hotels All year 2026 Rooms')
    expect(table).toHaveTextContent('Amadeus Hotels 2027 Always-On Media Plan')
  })

  it('runs the conversation, opens the canvas and shows the launch summary', () => {
    render(<Harness />)
    act(() => startCampaignFlow('Create campaign for Advertiser Name'))

    expect(screen.getByText('Create campaign for Advertiser Name')).toBeInTheDocument()
    expect(screen.getByText('Checking Salesforce campaign configuration')).toBeInTheDocument()
    advance(4 * 800 + 600)
    expect(screen.getByText('Here is your Media plan')).toBeInTheDocument()
    expect(screen.getByRole('table', { name: 'Media plan' })).toHaveTextContent('$72,000')

    fireEvent.click(screen.getByRole('button', { name: 'Sources' }))
    expect(screen.getByText('System Documentation')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Good response' }))
    expect(screen.getByText('Thanks for the feedback')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Market focus Media Plan' }))
    advance(4 * 800 + 600)
    expect(screen.getByText('1. United Kingdom')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Create Media plan' })[0]).toBeDisabled()

    const marketBlock = screen.getByTestId('campaign-flow-market-focus')
    fireEvent.click(within(marketBlock).getByRole('button', { name: 'Create Media plan' }))
    expect(within(marketBlock).getByRole('button', { name: 'Create Media plan' })).toBeDisabled()
    advance(2 * 900 + 600)
    expect(screen.getByText('Media plan "Amadeus Hotels 2027 Always-On" created in ATAP.')).toBeInTheDocument()
    const mediaPlanBlock = screen.getByTestId('campaign-flow-create-media-plan')
    fireEvent.click(within(mediaPlanBlock).getByRole('button', { name: 'Sources' }))
    expect(within(mediaPlanBlock).getByText('Salesforce Campaign Records')).toBeInTheDocument()
    expect(within(mediaPlanBlock).queryByText(/ACRS|package configuration/i)).not.toBeInTheDocument()

    const createMediaPlanBlock = screen.getByTestId('campaign-flow-create-media-plan')
    // The main CTA renders as the primary (filled sky) button: white text on sky-60.
    expect(within(createMediaPlanBlock).getByRole('button', { name: 'Create Campaign' })).toHaveStyle({
      color: 'rgb(255, 255, 255)',
      background: 'rgb(12, 102, 225)',
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create Campaign' }))
    advance(7 * 800 + 600)
    expect(
      screen.getByText(
        'Creatives are sourced from the Content Management System to align with the platforms included in the campaign.',
      ),
    ).toBeInTheDocument()
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
    advance(800)
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(true)
    expect(screen.getByText('Preparing your workspace…')).toBeInTheDocument()
    advance(1000)

    const canvas = screen.getByTestId('campaign-creation-canvas')
    expect(within(canvas).getByText('Create campaign with Amadeus Max')).toBeInTheDocument()
    expect(within(canvas).getByDisplayValue('Amadeus Hotels 2027 Always-On Campaign')).toBeInTheDocument()
    expect(within(canvas).queryByText('From package')).not.toBeInTheDocument()

    fireEvent.click(within(canvas).getByRole('button', { name: /Suggested by MAX: Named for/ }))
    expect(within(canvas).getByRole('dialog', { name: 'Suggested by MAX' })).toBeInTheDocument()

    const next = () => fireEvent.click(within(canvas).getByRole('button', { name: 'Next' }))
    next()
    expect(within(canvas).getByText('Channels, platforms and tactics are set from the media plan.')).toBeInTheDocument()
    expect(within(canvas).getByText('Brand, Generic, Pmax')).toBeInTheDocument()

    next()
    expect(within(canvas).getByRole('table', { name: 'Budget strategy summary' })).toBeInTheDocument()
    fireEvent.click(within(canvas).getByRole('button', { name: 'Google Ads' }))
    // Budget & pacing default now comes from the Platform Field Matrix (Google Ads default selected value).
    expect(within(canvas).getByText('Average daily budget')).toBeInTheDocument()

    next()
    // Targeting summary now has a single Location & audience table; the Additional targeting table
    // is only rendered when additional targeting has actually been set (none by default).
    expect(within(canvas).getByRole('table', { name: 'Location and audience summary' })).toBeInTheDocument()
    expect(within(canvas).queryByRole('table', { name: 'Additional targeting summary' })).not.toBeInTheDocument()
    fireEvent.click(within(canvas).getAllByRole('button', { name: 'Meta' })[0])
    expect(within(canvas).getByRole('combobox', { name: 'Location targeting' })).toBeInTheDocument()
    expect(within(canvas).getByRole('combobox', { name: 'Audience / user list' })).toBeInTheDocument()
    expect(within(canvas).getByText('United Kingdom')).toBeInTheDocument()
    expect(within(canvas).getByText('Leisure travelers')).toBeInTheDocument()

    next()
    expect(within(canvas).getByRole('table', { name: 'Keywords summary' })).toHaveTextContent('Exact match')
    fireEvent.click(within(canvas).getByRole('button', { name: 'Back' }))
    fireEvent.click(within(canvas).getByRole('button', { name: 'Next' }))
    fireEvent.click(within(canvas).getByRole('button', { name: 'Next' }))

    expect(within(canvas).getByRole('table', { name: 'Creatives summary' })).toBeInTheDocument()
    fireEvent.click(within(canvas).getByRole('button', { name: 'Google Ads' }))
    expect(within(canvas).getByTestId('ad-preview-search')).toHaveTextContent('Sponsored Hotels')
    fireEvent.click(within(canvas).getByRole('button', { name: 'Select asset 2' }))
    expect(within(canvas).getByRole('button', { name: 'Select asset 2' })).toHaveAttribute('aria-pressed', 'true')

    next()
    // Summary step (the Objective and Campaigns-to-create cards were removed).
    expect(within(canvas).getByRole('heading', { name: 'Summary' })).toBeInTheDocument()
    fireEvent.click(within(canvas).getByRole('button', { name: 'Launch campaign' }))

    expect(getCampaignFlowState().campaignLaunched).toBe(true)
    expect(screen.queryByTestId('campaign-creation-canvas')).not.toBeInTheDocument()
    expect(screen.getByText('Creating 3 campaign(s) in Google Ads')).toBeInTheDocument()
    advance(4 * 800 + 600)
    expect(
      screen.getByText('Campaign "Amadeus Hotels 2027 Always-On" launched — 9 campaigns across 4 platforms.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Campaigns created (9)')).toBeInTheDocument()
    expect(screen.getByTestId('campaign-flow-launch-actions')).toHaveStyle({ flexWrap: 'nowrap' })

    fireEvent.click(screen.getByRole('button', { name: /Google Ads 3 campaigns/ }))
    expect(screen.getByText('HOS_2027_GADS_PMAX')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    expect(screen.getByText(/Pause requested/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Edit campaign' }))
    expect(getCampaignFlowState().aiWorkspaceTitle).toBe('Edit campaign — Amadeus Max')
    advance(1000)
    expect(screen.getByTestId('campaign-creation-canvas')).toHaveTextContent('Edit campaign — Amadeus Max')
  })

  it('previews social platforms and keeps the draft between openings', () => {
    render(<Harness />)
    act(() => openCampaignWorkspace())
    advance(1000)
    const canvas = screen.getByTestId('campaign-creation-canvas')

    fireEvent.change(within(canvas).getByDisplayValue('Amadeus Hotels 2027 Always-On Campaign'), {
      target: { value: '' },
    })
    expect(within(canvas).getByText('Campaign name is required')).toBeInTheDocument()
    expect(within(canvas).getByRole('button', { name: 'Next' })).toBeDisabled()
    fireEvent.change(within(canvas).getByRole('textbox', { name: /Campaign name/ }), { target: { value: 'Spring' } })

    act(() => setCampaignWorkspaceOpen(false))
    act(() => setCampaignWorkspaceOpen(true))
    advance(1000)
    expect(screen.getByDisplayValue('Spring')).toBeInTheDocument()

    const reopened = screen.getByTestId('campaign-creation-canvas')
    for (let step = 0; step < 5; step += 1) fireEvent.click(within(reopened).getByRole('button', { name: 'Next' }))
    fireEvent.click(within(reopened).getByRole('button', { name: 'Meta' }))
    expect(within(reopened).getByTestId('ad-preview-meta')).toBeInTheDocument()
    fireEvent.click(within(reopened).getByRole('tab', { name: 'German' }))
    expect(within(reopened).getByDisplayValue('Ihr Aufenthalt in Paris beginnt hier')).toBeInTheDocument()

    fireEvent.click(within(reopened).getByRole('button', { name: 'Next' }))
    fireEvent.click(within(reopened).getByRole('button', { name: 'Save draft' }))
    fireEvent.click(within(reopened).getByRole('button', { name: 'Close campaign canvas' }))
    expect(getCampaignFlowState().aiWorkspaceMode).toBe(false)
  })

  it('launches without an active flow and without a summary', () => {
    act(() => launchCampaign([]))
    expect(getCampaignFlowState().campaignLaunched).toBe(true)
    expect(getCampaignFlowState().blocks).toHaveLength(0)

    render(<Harness />)
    act(() => startCampaignFlow())
    act(() => launchCampaign([]))
    expect(screen.getByTestId('campaign-flow-launch')).toHaveTextContent('0 campaigns across 0 platforms')
  })
})
