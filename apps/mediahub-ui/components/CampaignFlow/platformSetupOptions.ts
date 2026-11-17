import type { CampaignPlatform } from './campaignFlowData'
import { matrixAllValues, matrixValues } from './platformFieldMatrix'

export type SetupOptionField =
  | 'objective'
  | 'campaignType'
  | 'bidStrategy'
  | 'optimizationEvent'
  | 'budgetPacing'
  | 'valueRules'
  | 'locationType'
  | 'audience'
  | 'keywordOptions'
  | 'placements'
  | 'adFormat'
  | 'extensions'
  | 'destinationType'
  | 'tracking'
  | 'demographics'
  | 'deviceTargeting'
  | 'languageTargeting'
  | 'audienceExclusions'
  | 'brandSafetyExclusions'
  | 'frequencyCap'
  | 'dayparting'
  | 'connectionTargeting'
  | 'proximityTargeting'
  | 'hotelTargeting'

const list = (values: string) => values.split('|')

const optionsByPlatform: Record<string, Partial<Record<SetupOptionField, string[]>>> = {
  google: {
    objective: list(
      'Sales|Leads|Website traffic|Product and brand consideration|Brand awareness and reach|App promotion|Create a campaign without guidance',
    ),
    campaignType: list(
      'Search|Performance Max|Demand Gen|Display|Video|Shopping|App|Hotel|Smart|Local (legacy)|Discovery (legacy)',
    ),
    bidStrategy: list(
      'Maximize conversions|Target CPA|Maximize conversion value|Target ROAS|Maximize clicks|Target impression share|Viewable CPM|Manual CPC|Enhanced CPC (legacy / limited availability)|Commission (Hotel)',
    ),
    optimizationEvent: list(
      'Purchase / booking|Lead|Submit lead form|Phone call|Page view|Add to cart|Begin checkout|App install|App in-app action|Store visit|Qualified lead',
    ),
    budgetPacing: list(
      'Average daily budget|Shared budget|Total campaign budget (select campaign types)|Portfolio budget',
    ),
    valueRules: list('Conversion value rules|Value adjustments'),
    locationType: list('Country|Region|City|Radius|Location groups'),
    audience: list('Your data|Interests|Demographics|Custom segments|In-market'),
    keywordOptions: list(
      'Broad match|Phrase match|Exact match|Negative broad|Negative phrase|Negative exact|Dynamic Search Ads targets|Search themes (Performance Max)',
    ),
    placements: list(
      'Google Search|Search partners|Display Network|YouTube|Discover|Gmail|Maps|Display placements|Topics|Content keywords|App categories|Brand exclusions',
    ),
    adFormat: list(
      'Responsive search ad|Dynamic search ad|Call ad|Display responsive ad|Uploaded display ad|Video ad|Demand Gen ad|Performance Max asset group|Shopping product ad|Hotel ad|App ad',
    ),
    extensions: list(
      'Sitelinks|Callouts|Structured snippets|Images|Price|Promotion|Lead form|Call|Location|Affiliate location|App|Business name|Logo',
    ),
    destinationType: list(
      'Final URL|Mobile URL|Final URL suffix|Tracking template|URL parameter|URL expansion control',
    ),
    tracking: list(
      'Google tag|Enhanced conversions|Consent mode|Auto-tagging (gclid)|UTMs|Final URL suffix|Tracking template|Offline conversion import',
    ),
  },
  meta: {
    objective: list('Awareness|Traffic|Engagement|Leads|App promotion|Sales'),
    campaignType: list('Awareness|Traffic|Engagement|Leads|App promotion|Sales campaign'),
    bidStrategy: list('Highest volume|Cost per result goal|Cost cap|Bid cap|Minimum ROAS|Highest value'),
    optimizationEvent: list(
      'Purchase|Initiate checkout|Add payment info|Add to cart|View content|Lead|Complete registration|Contact|Submit application|Subscribe|Search|Custom conversion',
    ),
    budgetPacing: list('Daily budget|Lifetime budget|Campaign budget|Ad set budget|Advantage+ campaign budget'),
    valueRules: list('Value optimization|Purchase value'),
    locationType: list('Country|Region|City|DMA|Radius'),
    audience: list('Custom audiences|Lookalike audiences|Demographics|Advantage+ audience'),
    placements: list(
      'Facebook Feed|Instagram Feed|Reels|Stories|Marketplace|Search results|Video feeds|Right column|Messenger|Audience Network|Threads (where available)',
    ),
    adFormat: list(
      'Single image|Single video|Carousel|Collection|Instant Experience|Stories|Reels|Click-to-message|Lead form|Catalog / dynamic ad',
    ),
    extensions: list(
      'CTA|Lead form|Instant experience|Catalog|Product set|Click-to-message destination|Event response|App deep link',
    ),
    destinationType: list(
      'Website URL|Deep link|App link|URL parameters|Instant experience|Click-to-message destination',
    ),
    tracking: list(
      'Meta Pixel|Conversions API|App events|Offline events|URL parameters / UTMs|Aggregated Event Measurement',
    ),
  },
  microsoft: {
    objective: list('Sales / conversions|Leads|Website visits|Search ads|Audience ads|App installs|Brand awareness'),
    campaignType: list(
      'Search|Performance Max|Audience|Shopping|Video|Multimedia|Hotel|App install|Dynamic Search Ads',
    ),
    bidStrategy: list(
      'Maximize conversions|Target CPA|Maximize conversion value|Target ROAS|Maximize clicks|Target impression share|Manual CPC|Enhanced CPC',
    ),
    optimizationEvent: list(
      'Purchase|Lead|Add to cart|Begin checkout|Page view|Phone call|Event|Offline conversion|Custom event',
    ),
    budgetPacing: list('Daily budget|Shared budget|Monthly budget (legacy / eligible accounts)'),
    valueRules: list('Revenue / conversion value'),
    locationType: list('Country|State|City|Radius'),
    audience: list('Remarketing|Customer match|In-market|LinkedIn profile targeting'),
    keywordOptions: list(
      'Broad match|Phrase match|Exact match|Negative broad|Negative phrase|Negative exact|Dynamic Search Ads targets',
    ),
    placements: list(
      'Microsoft Search Network|Search partners|Microsoft Audience Network|LinkedIn profile targeting|Multimedia placements',
    ),
    adFormat: list(
      'Responsive search ad|Dynamic search ad|Multimedia ad|Responsive display ad|Product ad|Hotel ad|Video ad|App install ad',
    ),
    extensions: list(
      'Sitelinks|Callouts|Structured snippets|Images|Price|Promotion|Action link|Call|Location|App|Business name',
    ),
    destinationType: list('Final URL|Mobile URL|Tracking template|Final URL suffix|Custom parameters'),
    tracking: list('UET tag|Offline conversions|Auto-tagging (msclkid)|UTMs|Tracking template|Custom events'),
  },
  linkedin: {
    objective: list(
      'Brand awareness|Website visits|Engagement|Video views|Lead generation|Website conversions|Job applicants',
    ),
    campaignType: list(
      'Single image|Video|Carousel|Document|Conversation|Message|Text|Spotlight|Follower|Event|Lead Gen Form',
    ),
    bidStrategy: list('Maximum delivery|Cost cap|Bid cap|Manual bidding|Maximum reach / automated bidding'),
    optimizationEvent: list(
      'Website conversion|Lead Gen Form submit|Apply|Sign up|Download|Add to cart|Purchase|Key page view|Custom conversion',
    ),
    budgetPacing: list('Daily budget|Lifetime budget|Total budget|Campaign group budget'),
    valueRules: list('Conversion value'),
    locationType: list('Country|Region|City|Metro area'),
    audience: list('Matched audiences|Company|Job title|Industry|Skills|Demographics'),
    placements: list('LinkedIn feed|LinkedIn Audience Network|Messaging inbox|Connected TV (eligible campaigns)'),
    adFormat: list(
      'Single image|Video|Carousel|Document|Conversation|Message|Text|Spotlight|Follower|Event|Thought Leader|Lead Gen Form',
    ),
    extensions: list('CTA|Lead Gen Form|Conversation starter|Document|Event|Company page|Website retargeting'),
    destinationType: list('Landing page URL|Destination URL|Lead Gen Form|Event URL|Document download destination'),
    tracking: list(
      'Insight Tag|Conversion events|Conversions API|Offline conversions|URL parameters / UTMs|Matched Audiences',
    ),
  },
  tiktok: {
    objective: list('Awareness|Traffic|Video views|Community interaction|Lead generation|App promotion|Product sales'),
    campaignType: list(
      'Web conversion|Product sales|Lead generation|App promotion|Video views|Community interaction|Reach|Traffic',
    ),
    bidStrategy: list('Lowest cost|Cost cap|Bid cap|Minimum ROAS|Highest value'),
    optimizationEvent: list(
      'Complete payment|Place order|Initiate checkout|Add payment info|Add to cart|View content|Submit form|Contact|Download|App install|App event',
    ),
    budgetPacing: list('Daily budget|Lifetime budget|Campaign budget optimization|Ad group budget'),
    valueRules: list('Value-based optimization'),
    locationType: list('Country|Region|City|DMA'),
    audience: list('Custom audience|Lookalike|Interest|Behavior|Demographics'),
    placements: list('TikTok|Pangle|Global App Bundle|Search Ads placement|TikTok Shop (eligible accounts)'),
    adFormat: list(
      'In-feed video|Spark ad|Image ad|Carousel ad|TopView|Top Feed|Search ad|Catalog / shopping ad|Lead Gen Form',
    ),
    extensions: list(
      'CTA|Instant Form|Landing page|Deep link|Catalog / product card|TikTok Shop|Add-on / interactive asset',
    ),
    destinationType: list('Landing page URL|Deep link|Instant Form|TikTok Shop|App store destination'),
    tracking: list('TikTok Pixel|Events API|App events / SDK|Offline events|URL parameters / UTMs|Advanced matching'),
  },
  dv360: {
    objective: list('Awareness|Consideration|Action / conversion|Custom objective'),
    campaignType: list('Display|Video|YouTube & Partners|Audio|Connected TV|Native|In-app|Digital out-of-home'),
    bidStrategy: list(
      'Automated bidding|Custom bidding|Fixed bid|Maximize clicks|Maximize conversions|Viewable CPM|CPM|CPC|CPV',
    ),
    optimizationEvent: list(
      'Floodlight counter activity|Floodlight sales activity|Custom bidding conversion|Google Analytics conversion',
    ),
    budgetPacing: list(
      'Budget segment|Insertion order budget|Line item budget|Flight budget|Daily pacing|Even pacing|Ahead pacing|ASAP pacing',
    ),
    valueRules: list('Floodlight revenue / custom bidding signals'),
    locationType: list('Country|Region|City|DMA|Geo fence'),
    audience: list('First-party|Affinity|In-market|Custom intent|Demo'),
    keywordOptions: list(
      'Contextual keywords|Negative keywords|Custom intent keywords|Page category / content targeting',
    ),
    placements: list(
      'Exchanges|Deals|Publishers|Sites / apps|YouTube|CTV|Audio|Native|DOOH|Inventory packages|Brand-safety controls',
    ),
    adFormat: list('Display|HTML5 rich media|Native|Video|YouTube|Audio|CTV|Interstitial|App-install|DOOH'),
    extensions: list(
      'Companion banner|Tracking pixels|Verification|Third-party measurement|Frequency cap|Brand safety settings',
    ),
    destinationType: list('Landing page URL|Click tracker|Landing page override|Custom URL parameter|Deep link'),
    tracking: list('Floodlight|CM360 tracking|Viewability verification|Third-party measurement|UTMs|Custom variables'),
  },
  cm360: {
    objective: list('Tracking / reporting objective|Floodlight conversion objective'),
    campaignType: list('Standard display|Rich media|Video|Audio|Tracking / ad-serving campaign'),
    bidStrategy: list('Not applicable — trafficking and measurement platform'),
    optimizationEvent: list('Floodlight counter activity|Floodlight sales activity|Custom Floodlight activity'),
    budgetPacing: list('No media budget — trafficking / reporting only'),
    valueRules: list('Floodlight revenue'),
    locationType: list('Country|Region|City|DMA'),
    audience: list('Audience segment|Placement audience rules'),
    placements: list('Sites / apps|Placements|Ad tags|Publishers|Ad-serving assignments'),
    adFormat: list('Display image|HTML5 rich media|Video|Audio|Native|Tracking ad / click tracker'),
    extensions: list(
      'Click tracker|Impression tracker|Placement tag|Verification tag|Third-party creative / tracking tag',
    ),
    destinationType: list('Click-through URL|Click tracker|Landing page URL|Third-party click macro'),
    tracking: list(
      'Floodlight|Impression tracker|Click tracker|Verification tags|Third-party tracking|Custom variables',
    ),
  },
  sa360: {
    objective: list('Conversion|Revenue|Traffic / click|Custom Floodlight objective'),
    campaignType: list('Search|Shopping|Hotel|Performance Max|Dynamic Search Ads'),
    bidStrategy: list(
      'Maximize conversions|Target CPA|Maximize conversion value|Target ROAS|Maximize clicks|Target impression share|Manual CPC',
    ),
    optimizationEvent: list(
      'Floodlight activity|Google Ads conversion action|Microsoft Ads conversion goal|Analytics conversion',
    ),
    budgetPacing: list('Engine account budget|Campaign budget|Portfolio budget|Daily budget'),
    valueRules: list('Conversion value rules'),
    locationType: list('Country|Region|City'),
    audience: list('RLSA|Customer match|Demographic targets'),
    keywordOptions: list('Broad match|Phrase match|Exact match|Negative keywords|Dynamic Search Ads targets'),
    placements: list('Google|Microsoft|Yahoo Japan|Baidu|Other linked engine accounts / partner networks'),
    adFormat: list('Text search ad|Responsive search ad|Dynamic search ad|Shopping ad|Hotel ad|Performance Max'),
    extensions: list('Sitelinks|Callouts|Structured snippets|Promotion|Price|Image|Product / hotel feed assets'),
    destinationType: list('Final URL|Mobile URL|Tracking template|Final URL suffix|Custom parameters'),
    tracking: list('Floodlight|Engine tracking|Auto-tagging|UTMs|Conversion API / offline upload|Custom parameters'),
  },
  derbysoft: {
    objective: list('Hotel booking / revenue objective|Visibility / traffic objective'),
    campaignType: list('Metasearch|Display / retargeting|Hotel booking campaign'),
    bidStrategy: list('Target CPA|Target ROAS|CPC|Commission|Maximize conversions'),
    optimizationEvent: list('Booking|Revenue|Booking request|Qualified lead'),
    budgetPacing: list('Daily budget|Monthly budget|Campaign budget|Commission budget'),
    valueRules: list('Booking value / revenue'),
    locationType: list('Country|Region|City'),
    audience: list('Travel intent|Device|Geography'),
    keywordOptions: list('Hotel / destination / brand search terms|Negative terms where supported'),
    placements: list('Metasearch publishers|Hotel comparison sites|Display / retargeting inventory'),
    adFormat: list('Hotel metasearch listing|Sponsored listing|Display creative|Retargeting creative'),
    extensions: list('Booking link|Property link|Rate / availability feed|Hotel / room details'),
    destinationType: list('Booking engine URL|Property landing page|Room / offer landing page|Tracking parameters'),
    tracking: list(
      'Booking tracking|Revenue tracking|UTMs|Click ID / publisher tracking|Feed / booking engine integration',
    ),
  },
  wihp: {
    objective: list('Hotel booking / revenue objective|Visibility / traffic objective'),
    campaignType: list('Metasearch|Display / retargeting|Hotel booking campaign'),
    bidStrategy: list('Target CPA|Target ROAS|CPC|Commission|Maximize conversions'),
    optimizationEvent: list('Booking|Revenue|Booking request|Qualified lead'),
    budgetPacing: list('Daily budget|Monthly budget|Campaign budget|Commission budget'),
    valueRules: list('Booking value / revenue'),
    locationType: list('Country|Region|City'),
    audience: list('Travel intent|Device|Geography'),
    keywordOptions: list('Hotel / destination / brand search terms|Negative terms where supported'),
    placements: list('Metasearch publishers|Hotel comparison sites|Display / retargeting inventory'),
    adFormat: list('Hotel metasearch listing|Sponsored listing|Display creative|Retargeting creative'),
    extensions: list('Booking link|Property link|Rate / availability feed|Hotel / room details'),
    destinationType: list('Booking engine URL|Property landing page|Room / offer landing page|Tracking parameters'),
    tracking: list(
      'Booking tracking|Revenue tracking|UTMs|Click ID / publisher tracking|Feed / booking engine integration',
    ),
  },
}

const targetingOptionsByPlatform: Record<string, Partial<Record<SetupOptionField, string[]>>> = {
  google: {
    demographics: list('Age ranges|Gender|Parental status|Household income|Detailed demographics'),
    deviceTargeting: list('Mobile|Desktop|Tablet|Connected TV|Operating system|Device model|Carrier (limited)'),
    languageTargeting: list('Language|Browser / user language settings'),
    audienceExclusions: list('Customer lists|Remarketing lists|Demographics|Content labels|Placement exclusions'),
    brandSafetyExclusions: list(
      'Content labels|Sensitive content|Topics|Placements|Apps|IP exclusions|Brand exclusions',
    ),
    frequencyCap: list('Display / video frequency cap by impressions and time period'),
    dayparting: list('Ad schedule by day and hour|Bid adjustments where supported'),
    connectionTargeting: list('Wi-Fi / carrier targeting limited by campaign and market'),
    proximityTargeting: list('Radius around location|Location groups|Distance targeting'),
    hotelTargeting: list('Hotel center|Hotel group|Itinerary / travel intent signals|Hotel feed attributes'),
  },
  meta: {
    demographics: list('Age|Gender|Relationship status|Education|Parents|Life events'),
    deviceTargeting: list('Mobile|Desktop|Tablet|iOS|Android|Device model / OS where supported'),
    languageTargeting: list('Language|Interface language|Multilingual creative by ad set'),
    audienceExclusions: list('Custom audience exclusions|Purchaser exclusions|Engaged-user exclusions'),
    brandSafetyExclusions: list('Inventory filters|Block lists|Publisher / placement exclusions|Content controls'),
    frequencyCap: list('Frequency controls by campaign and placement|Reach and frequency buying where eligible'),
    dayparting: list('Ad scheduling with lifetime budgets|Delivery schedule where eligible'),
    connectionTargeting: list('Connection type / carrier options limited or unavailable by market'),
    proximityTargeting: list('Radius around address / pin|Local business radius'),
    hotelTargeting: list('Travel intent|Destination / traveler interests|Dynamic hotel catalog where available'),
  },
  microsoft: {
    demographics: list('Age|Gender|Household income|Company / profile demographics'),
    deviceTargeting: list('Mobile|Desktop|Tablet|Operating system|Device model'),
    languageTargeting: list('Language|Market language|Ad language'),
    audienceExclusions: list('Remarketing exclusions|Customer match exclusions|Demographic exclusions'),
    brandSafetyExclusions: list('Website exclusions|Brand safety lists|Audience network exclusions'),
    frequencyCap: list('Audience campaign frequency controls where eligible'),
    dayparting: list('Ad schedule by day and hour|Bid adjustments'),
    connectionTargeting: list('Device and network controls limited by campaign'),
    proximityTargeting: list('Radius around location|Location intent'),
    hotelTargeting: list('Hotel campaign destination / property data where eligible'),
  },
  linkedin: {
    demographics: list('Age|Gender|Member traits where available'),
    deviceTargeting: list('Desktop|Mobile|Tablet|Operating system'),
    languageTargeting: list('Profile language|Campaign language / creative language'),
    audienceExclusions: list('Matched audience exclusions|Company / profile exclusions'),
    brandSafetyExclusions: list('Audience Network opt-out|Publisher exclusions where available'),
    frequencyCap: list('Limited / format-dependent frequency controls'),
    dayparting: list('Dayparting by day and hour'),
    proximityTargeting: list('Location / metro targeting|Radius options limited'),
    hotelTargeting: list('Travel / hospitality segments|Company travel audiences'),
  },
  tiktok: {
    demographics: list('Age|Gender|Household income where available'),
    deviceTargeting: list('Mobile|Desktop|Tablet|iOS|Android|Device model'),
    languageTargeting: list('Language|App / interface language'),
    audienceExclusions: list('Custom audience exclusions|Purchaser / engager exclusions'),
    brandSafetyExclusions: list('Placement exclusions|Category controls|Inventory filters'),
    frequencyCap: list('Frequency controls by campaign and placement'),
    dayparting: list('Dayparting by day and hour'),
    connectionTargeting: list('Wi-Fi|Carrier|Connection type where supported'),
    proximityTargeting: list('Radius around pin / address where supported'),
    hotelTargeting: list('Travel intent|Destination / travel content|Hotel catalog where available'),
  },
  dv360: {
    demographics: list('Age|Gender|Household income|Demographic segments'),
    deviceTargeting: list('Mobile|Desktop|Tablet|Connected TV|Operating system|App / web environment'),
    languageTargeting: list('Language|Browser language|Content language'),
    audienceExclusions: list('Audience list exclusions|Custom segment exclusions|Brand / content exclusions'),
    brandSafetyExclusions: list(
      'Brand safety segments|Sensitive categories|App / site lists|Keyword exclusions|Verification|Fraud protection',
    ),
    frequencyCap: list(
      'User-level frequency cap|Impressions per user per day|Impressions per user per week|Impressions per user per month',
    ),
    dayparting: list('Dayparting by day and hour|Time-zone selection'),
    connectionTargeting: list('Connection type|Carrier|Device environment where supported'),
    proximityTargeting: list('Geo-fence|Radius|Polygon|Custom geo'),
    hotelTargeting: list('Travel intent|Destination|Hotel / travel data segments|Custom audiences'),
  },
  cm360: {
    deviceTargeting: list('Device / browser reporting and compatible creative delivery'),
    languageTargeting: list('Creative language|Site / placement language'),
    audienceExclusions: list('Placement / audience assignment exclusions where applicable'),
    brandSafetyExclusions: list('Site / placement exclusions|Verification tags|Creative approvals'),
    frequencyCap: list('Placement and creative delivery controls|Reporting frequency'),
    dayparting: list('Placement / creative flight and delivery schedule'),
    hotelTargeting: list('Hotel feed / booking data used for tracking and reporting'),
  },
  sa360: {
    demographics: list('Age|Gender|Household income where supported'),
    deviceTargeting: list('Mobile|Desktop|Tablet|Operating system'),
    languageTargeting: list('Campaign language|Engine-language settings'),
    audienceExclusions: list('Remarketing exclusions|Customer match exclusions'),
    brandSafetyExclusions: list('Search partner / network settings|Negative keywords'),
    frequencyCap: list('Limited / engine-dependent controls'),
    dayparting: list('Ad schedule by day and hour'),
    proximityTargeting: list('Radius where engine supports it'),
    hotelTargeting: list('Hotel feed|Itinerary / travel intent through engine capabilities'),
  },
  derbysoft: {
    deviceTargeting: list('Mobile|Desktop where provider supports it'),
    languageTargeting: list('Property / market language'),
    audienceExclusions: list('Existing bookers / customer suppression where supported'),
    brandSafetyExclusions: list('Provider / publisher exclusions|Property-level safeguards'),
    frequencyCap: list('Provider / publisher dependent'),
    dayparting: list('Provider / publisher dependent'),
    proximityTargeting: list('Property / destination catchment area'),
    hotelTargeting: list('Property|Destination|Market|Rate plan|Availability|Booking window'),
  },
  wihp: {
    deviceTargeting: list('Mobile|Desktop where provider supports it'),
    languageTargeting: list('Property / market language'),
    audienceExclusions: list('Existing bookers / customer suppression where supported'),
    brandSafetyExclusions: list('Provider / publisher exclusions|Property-level safeguards'),
    frequencyCap: list('Provider / publisher dependent'),
    dayparting: list('Provider / publisher dependent'),
    proximityTargeting: list('Property / destination catchment area'),
    hotelTargeting: list('Property|Destination|Market|Rate plan|Availability|Booking window'),
  },
}

export const targetingFieldGuidance: Record<SetupOptionField, string> = {
  objective: '',
  campaignType: '',
  bidStrategy: '',
  optimizationEvent: '',
  budgetPacing: '',
  valueRules: '',
  locationType: '',
  audience: '',
  keywordOptions: '',
  placements: '',
  adFormat: '',
  extensions: '',
  destinationType: '',
  tracking: '',
  demographics: 'Leave broad by default; apply only when the campaign brief and platform policy support it.',
  deviceTargeting:
    'Include all eligible devices by default. Restrict only for experience, measurement, or performance reasons.',
  languageTargeting: 'Use the language of the landing page and approved campaign copy.',
  audienceExclusions: 'Exclude existing converters or incompatible audiences only when the campaign goal requires it.',
  brandSafetyExclusions:
    'Apply the organization’s standard brand-safety baseline; add stricter exclusions only when required.',
  frequencyCap: 'Use for awareness, display, video, or retargeting; do not apply by default to conversion campaigns.',
  dayparting: 'Run all hours by default; schedule only when booking, call-center, or performance evidence supports it.',
  connectionTargeting: 'Leave unset unless app, bandwidth, or mobile-connectivity requirements apply.',
  proximityTargeting: 'Use only for local property, event, or drive-market activity.',
  hotelTargeting: 'Use only when the platform has a verified hotel feed, booking integration, or provider capability.',
}

const platformAliases: Record<string, keyof typeof optionsByPlatform> = {
  'google-ads': 'google',
  bing: 'microsoft',
  meta: 'meta',
  tiktok: 'tiktok',
  linkedin: 'linkedin',
  dv360: 'dv360',
  'amadeus-dsp': 'dv360',
  youtube: 'dv360',
  yandex: 'sa360',
  baidu: 'sa360',
  demandgen: 'meta',
  tencent: 'meta',
  wechat: 'meta',
  pinterest: 'meta',
  snapchat: 'meta',
  spotify: 'dv360',
  'tripadvisor-display': 'dv360',
  quantcast: 'dv360',
  amazon: 'dv360',
  wego: 'derbysoft',
  skyscanner: 'derbysoft',
  trivago: 'derbysoft',
  kayak: 'derbysoft',
  'tripadvisor-meta': 'derbysoft',
  'google-hotel-meta': 'derbysoft',
  'bing-meta': 'derbysoft',
  expedia: 'wihp',
}

const matrixObjectiveOptions = [
  ...new Set(Object.values(optionsByPlatform).flatMap(options => options.objective ?? [])),
]
const matrixCampaignTypeOptions = [
  ...new Set(Object.values(optionsByPlatform).flatMap(options => options.campaignType ?? [])),
]

export const optionsForCampaignField = (field: 'objective' | 'campaignType', currentValue: string) => {
  // Prefer the Platform Field Matrix values; fall back to the legacy hardcoded union.
  const fileOptions = matrixAllValues(field)
  const matrixOptions =
    fileOptions.length > 0 ? fileOptions : field === 'objective' ? matrixObjectiveOptions : matrixCampaignTypeOptions
  return [...new Set([currentValue, ...matrixOptions].filter(Boolean))]
}

export const optionsForPlatformField = (
  platform: CampaignPlatform,
  field: SetupOptionField,
  currentValues: string[] = [],
): string[] => {
  // Prefer the Platform Field Matrix values; fall back to the legacy hardcoded tables
  // for any platform/field the matrix does not cover.
  const fileOptions = matrixValues(platform.id, field)
  if (fileOptions.length > 0) {
    return [...new Set([...currentValues, ...fileOptions].filter(Boolean))]
  }
  const alias = platformAliases[platform.id]
  const platformOptions = alias
    ? (targetingOptionsByPlatform[alias]?.[field] ?? optionsByPlatform[alias][field] ?? [])
    : []
  return [...new Set([...currentValues, ...platformOptions].filter(Boolean))]
}

export const platformSupportsSetupField = (platform: CampaignPlatform, field: SetupOptionField) => {
  const additionalTargetingFields = [
    'demographics',
    'deviceTargeting',
    'languageTargeting',
    'audienceExclusions',
    'brandSafetyExclusions',
    'frequencyCap',
    'dayparting',
    'connectionTargeting',
    'proximityTargeting',
    'hotelTargeting',
  ]
  if (platform.id === 'amadeus-dsp' && additionalTargetingFields.includes(field)) {
    return ['demographics', 'proximityTargeting', 'hotelTargeting'].includes(field)
  }

  const alias = platformAliases[platform.id]
  if (!alias) return false
  const values = targetingOptionsByPlatform[alias]?.[field] ?? optionsByPlatform[alias][field] ?? []
  return values.length > 0 && !values.every(value => /^(not applicable|not typically available)/i.test(value))
}

export const defaultLocationLevel = 'Country'

export const defaultKeywordOptions = (platform: CampaignPlatform): string[] => {
  if (platform.id === 'google-ads' || platform.id === 'bing') {
    return ['Broad match', 'Phrase match', 'Exact match', 'Negative broad', 'Negative phrase', 'Negative exact']
  }
  if (platform.id === 'dv360') return ['Contextual keywords']
  return []
}
