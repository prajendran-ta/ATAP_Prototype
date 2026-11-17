import { campaignFlowData } from '../campaignFlowData'
import { optionsForCampaignField, optionsForPlatformField, platformSupportsSetupField } from '../platformSetupOptions'
import {
  buildLaunchSummary,
  campaignsFor,
  campaignSplitScopesForDraft,
  chipColor,
  chipKey,
  chipLabel,
  countLines,
  createInitialDraft,
  defaultFieldValue,
  enabledPlatforms,
  fillTemplate,
  getFieldValue,
  groupPlatformsByChannel,
  hasPaidSearch,
  hotelName,
  languageTabsFor,
  normalizePlatforms,
  propertyCity,
  recommendedPlatforms,
  setFieldValue,
  splitList,
  splitValuesFor,
  tacticsFor,
  totalCampaigns,
  visibleWizardSteps,
} from '../campaignFlowLogic'

const platforms = normalizePlatforms()
const byId = (id: string) => platforms.find(platform => platform.id === id)!

describe('campaignFlowLogic', () => {
  it('uses a full-year 2027 campaign flight', () => {
    expect(campaignFlowData.basicInfo.startDate).toBe('2027-01-01')
    expect(campaignFlowData.basicInfo.endDate).toBe('2027-12-31')
    expect(campaignFlowData.basicInfo.campaignName).toBe('Amadeus Hotels 2027 Always-On Campaign')
  })

  it('fills platform defaults, locations, formats, assets, and localized creative', () => {
    const googleLocation = byId('google-ads').targeting.location

    expect(platforms.every(platform => platform.targeting.location === googleLocation)).toBe(true)
    expect(platforms.every(platform => platform.bidding.bidStrategy.length > 0)).toBe(true)
    expect(platforms.every(platform => platform.creative.adFormat !== 'Platform standard formats')).toBe(true)
    expect(platforms.every(platform => (platform.creative.assetImages?.length ?? 0) > 0)).toBe(true)
    expect(defaultFieldValue(byId('demandgen'), null, 'headline:fr')).toBe(
      campaignFlowData.localizedCreative['google-ads'].fr.headline,
    )
  })

  it('splits the $200,000 media plan across platforms and fees', () => {
    const plan = campaignFlowData.conversation.mediaPlanTable
    const mediaPlanBudgets = plan.groups.flatMap(group =>
      group.items.map(item => Number(item.budget.replace(/[$,]/g, ''))),
    )
    const marketBudgets = campaignFlowData.conversation.marketFocus.marketPlan.map(row =>
      Number(row.budget.replace(/[$,]/g, '')),
    )

    expect(campaignFlowData.basicInfo.totalBudget).toBe(200000)
    expect(plan.total).toBe('$200,000')
    expect(plan.groups.map(group => group.subtotal)).toEqual([
      '$72,000',
      '$36,000',
      '$45,000',
      '$14,000',
      '$13,000',
    ])
    expect(plan.fees).toBe('$20,000')
    expect(mediaPlanBudgets.reduce((total, budget) => total + budget, 0)).toBe(180000)
    expect(mediaPlanBudgets.reduce((total, budget) => total + budget, 0) + Number(plan.fees.replace(/[$,]/g, ''))).toBe(
      200000,
    )
    expect(campaignFlowData.conversation.marketFocus.total).toBe('$200,000')
    expect(marketBudgets.reduce((total, budget) => total + budget, 0)).toBe(200000)
  })

  it('normalizes generic platforms with defaults', () => {
    const yandex = byId('yandex')
    expect(yandex.bidding).toEqual(campaignFlowData.genericPlatformDefaults.bidding)
    expect(byId('spotify').tactics).toEqual(['Prospecting', 'Remarketing'])
    expect(byId('meta').splitBy).toBe('None (By Tactic)')
    expect(byId('expedia').splitBy).toBe('None (By Tactic)')
    expect(enabledPlatforms(platforms).map(platform => platform.id)).toEqual(['google-ads', 'bing', 'meta', 'tiktok'])
    expect(recommendedPlatforms(platforms)).toHaveLength(4)
  })

  it('supports Display prospecting and remarketing while keeping DemandGen in Social', () => {
    const displayPlatforms = platforms.filter(platform => platform.group === 'Display Advertising')

    expect(campaignFlowData.channelTactics['Display Advertising']).toEqual(['Prospecting', 'Remarketing'])
    expect(displayPlatforms).toHaveLength(6)
    expect(displayPlatforms.every(platform => tacticsFor(platform).join(', ') === 'Prospecting, Remarketing')).toBe(true)
    expect(byId('demandgen').group).toBe('Social')
    expect(tacticsFor(byId('demandgen'))).toEqual(['Prospecting', 'Remarketing'])
  })

  it('provides platform-specific matrix choices while retaining current defaults', () => {
    const google = byId('google-ads')
    const meta = byId('meta')

    const googleEvents = optionsForPlatformField(google, 'optimizationEvent', [google.bidding.optimizationEvent])
    expect(googleEvents).toContain('Purchase / booking')
    expect(googleEvents).toContain('Lead')
    expect(googleEvents).toContain(google.bidding.optimizationEvent)

    const metaEvents = optionsForPlatformField(meta, 'optimizationEvent', [meta.bidding.optimizationEvent])
    expect(metaEvents).toContain('Purchase')
    expect(metaEvents).toContain('Custom conversion')
    expect(metaEvents).toContain(meta.bidding.optimizationEvent)

    expect(optionsForCampaignField('objective', 'Website conversions')).toContain('Sales')
    expect(optionsForCampaignField('campaignType', 'Multi-channel (Performance)')).toContain('Search')
  })

  it('shows only the additional targeting fields supported by Amadeus DSP', () => {
    const dsp = byId('amadeus-dsp')

    expect(platformSupportsSetupField(dsp, 'demographics')).toBe(true)
    expect(platformSupportsSetupField(dsp, 'proximityTargeting')).toBe(true)
    expect(platformSupportsSetupField(dsp, 'hotelTargeting')).toBe(true)
    expect(platformSupportsSetupField(dsp, 'deviceTargeting')).toBe(false)
    expect(platformSupportsSetupField(dsp, 'frequencyCap')).toBe(false)
    expect(platformSupportsSetupField(dsp, 'locationType')).toBe(true)
  })

  it('groups platforms by channel order and shows keywords only with paid search', () => {
    const groups = groupPlatformsByChannel(recommendedPlatforms(platforms))
    expect(groups.map(group => group.channel)).toEqual(['Paid search', 'Social'])
    expect(hasPaidSearch(platforms)).toBe(true)
    expect(visibleWizardSteps(platforms).map(step => step.id)).toContain('keywords')

    const socialOnly = platforms.map(platform =>
      platform.group === 'Paid search' ? { ...platform, enabled: false } : platform,
    )
    expect(visibleWizardSteps(socialOnly).map(step => step.id)).not.toContain('keywords')
  })

  it('maps chip keys, colours and labels', () => {
    expect(chipKey('google-ads')).toBe('google')
    expect(chipKey('linkedin')).toBe('linkedin')
    expect(chipColor('meta')).toBe('#0866ff')
    expect(chipColor('unknown')).toBe('#4d5a7a')
    expect(chipLabel('tiktok')).toBe('TikTok')
    expect(chipLabel('other')).toBe('other')
  })

  it('handles list and template helpers', () => {
    expect(splitList(' a; b ;; c ')).toEqual(['a', 'b', 'c'])
    expect(fillTemplate('Creating {count} in {platform} {missing}', { count: 2, platform: 'Meta' })).toBe(
      'Creating 2 in Meta {missing}',
    )
    expect(countLines('a\n\n b \n')).toBe(2)
    expect(hotelName('Grand Hotel — Nice')).toBe('Grand Hotel')
    expect(hotelName(null)).toBe('Amadeus Hotels')
    expect(propertyCity('Grand Hotel — Nice')).toBe('Nice')
    expect(propertyCity(null)).toBe('Paris')
    expect(propertyCity('Solo')).toBe('Solo')
  })

  it('resolves split values per split option', () => {
    expect(splitValuesFor('Property', [])).toHaveLength(10)
    expect(splitValuesFor('Market', ['France'])).toEqual(['France'])
    expect(splitValuesFor('Market', [])).toEqual(campaignFlowData.locationOptions)
    expect(splitValuesFor('Device', [])).toEqual(['Desktop', 'Mobile', 'Tablet'])
    expect(splitValuesFor('None (By Tactic)', [])).toEqual([])
  })

  it('builds campaign names following the campaignsFor rule', () => {
    expect(campaignsFor(byId('google-ads'), 'None (By Tactic)', [], 'X')).toEqual([
      'HOS_2027_GADS_BRAND',
      'HOS_2027_GADS_GENERIC',
      'HOS_2027_GADS_PMAX',
    ])
    expect(campaignsFor(byId('meta'), 'Device', [], 'X')).toHaveLength(6)
    expect(campaignsFor(byId('spotify'), 'Market', ['France', 'Spain'], 'X')).toEqual([
      'HOS_2027_SPOTIFY_PROSPECTING_FRANCE',
      'HOS_2027_SPOTIFY_PROSPECTING_SPAIN',
      'HOS_2027_SPOTIFY_REMARKETING_FRANCE',
      'HOS_2027_SPOTIFY_REMARKETING_SPAIN',
    ])
    expect(campaignsFor(byId('dv360'), 'None (By Tactic)', [], 'Camp')).toEqual([
      'HOS_2027_DV360_PROSPECTING',
      'HOS_2027_DV360_REMARKETING',
    ])
  })

  it('keeps settings separate for each campaign tactic split', () => {
    const google = byId('google-ads')
    const draft = createInitialDraft(platforms)
    const scopes = campaignSplitScopesForDraft(draft, google)
    const brandScope = scopes.find(scope => scope.label.endsWith('Brand'))!
    const genericScope = scopes.find(scope => scope.label.endsWith('Generic'))!
    const updatedDraft = setFieldValue(draft, google, null, 'targetCpa', '$30.00', brandScope.key)

    expect(scopes.map(scope => scope.label)).toEqual([
      'Google Ads — Brand',
      'Google Ads — Generic',
      'Google Ads — Pmax',
    ])
    expect(getFieldValue(updatedDraft, google, null, 'targetCpa', campaignFlowData, brandScope.key)).toBe('$30.00')
    // The Brand edit must not leak into Generic: Generic still resolves to its own (per-campaign
    // varied) default rather than the Brand-set value.
    const genericDefault = defaultFieldValue(google, null, 'targetCpa', campaignFlowData, genericScope.key)
    expect(getFieldValue(updatedDraft, google, null, 'targetCpa', campaignFlowData, genericScope.key)).toBe(
      genericDefault,
    )
    expect(getFieldValue(updatedDraft, google, null, 'targetCpa', campaignFlowData, genericScope.key)).not.toBe('$30.00')
  })

  it('creates the seed launch summary of 9 campaigns across 4 platforms', () => {
    const summary = buildLaunchSummary(createInitialDraft(platforms), platforms)
    expect(summary.map(entry => entry.key)).toEqual(['google', 'bing', 'meta', 'tiktok'])
    expect(totalCampaigns(summary)).toBe(9)
  })

  it('resolves default, localized and property-specific field values', () => {
    const google = byId('google-ads')
    expect(defaultFieldValue(google, null, 'bidStrategy')).toBe('Maximize conversions')
    expect(defaultFieldValue(google, null, 'headline:fr')).toContain('Découvrez Paris')
    expect(defaultFieldValue(google, null, 'headline:ja')).toBe(
      campaignFlowData.localizedCreative['google-ads'].ja.headline,
    )
    expect(defaultFieldValue(google, 'Grand Hotel — Nice', 'headline:en')).toBe('Stay in Nice · Grand Hotel')
    expect(defaultFieldValue(google, 'Grand Hotel — Nice', 'description:en')).toContain('Grand Hotel')
    expect(defaultFieldValue(google, 'Grand Hotel — Nice', 'brandKeywords').split('\n')[1]).toBe('Grand Hotel Nice')
    expect(defaultFieldValue(google, 'Grand Hotel — Nice', 'genericKeywords').split('\n')[0]).toBe('Nice hotel')
    expect(defaultFieldValue(google, 'Grand Hotel — Nice', 'audience')).toContain('Destination Nice intenders')
    expect(defaultFieldValue(google, null, 'brandMatch')).toBe('Exact')
    expect(defaultFieldValue(google, null, 'genericMatch')).toBe('Phrase')
    expect(countLines(defaultFieldValue(google, null, 'negativeKeywords'))).toBe(20)
    expect(defaultFieldValue(google, null, 'unknown')).toBe('')
  })

  it('stores overrides per platform and per property', () => {
    const google = byId('google-ads')
    let draft = createInitialDraft(platforms)
    draft = setFieldValue(draft, google, 'Grand Hotel — Nice', 'bidStrategy', 'Manual CPC')
    expect(getFieldValue(draft, google, null, 'bidStrategy')).toBe('Manual CPC')

    draft = { ...draft, splitBy: { ...draft.splitBy, 'google-ads': 'Property' } }
    expect(getFieldValue(draft, google, 'Grand Hotel — Nice', 'bidStrategy')).toBe('Manual CPC')
    draft = setFieldValue(draft, google, 'Grand Hotel — Nice', 'bidStrategy', 'Target CPA')
    expect(getFieldValue(draft, google, 'Grand Hotel — Nice', 'bidStrategy')).toBe('Target CPA')
    expect(getFieldValue(draft, google, 'Grand Hotel — Paris', 'bidStrategy')).toBe('Manual CPC')
    expect(getFieldValue(draft, google, 'Grand Hotel — Paris', 'audience')).toContain('Destination Paris')
    expect(buildLaunchSummary(draft, platforms)[0].campaigns).toHaveLength(30)
  })

  it('derives creative language tabs from locations', () => {
    const tabs = languageTabsFor(['United Kingdom', 'Germany', 'Austria', 'France'], ['ja', 'de'])
    expect(tabs.map(tab => tab.lang)).toEqual(['en', 'de', 'fr', 'ja'])
  })
})
