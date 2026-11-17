// Mediaplanner GraphQL Typescript Definitions
declare namespace MediaplannerQL {
  type Maybe<T> = T | null
  type InputMaybe<T> = Maybe<T>
  type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
  type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
  type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
  type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
  type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
  /** All built-in and custom scalars, mapped to their actual values */
  type Scalars = {
    ID: { input: number; output: number }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
  }

  /** Advertiser information (output type) */
  interface AdvertiserInformation {
    __typename?: 'AdvertiserInformation'
    /** Advertiser Business Partner ID (BPID) */
    advertiserBpid: Scalars['String']['output']
    /** Advertiser identifier */
    advertiserId: Scalars['String']['output']
    /** Breakdown descriptor */
    breakdown: BreakdownEnum
    /** Currency for the media plan */
    currency: Scalars['String']['output']
    /** Type of plan */
    planType: PlanTypeEnum
    /** Indicates whether prefill is enabled for the media plan */
    prefillEnabled: Scalars['Boolean']['output']
    /** Proposal identifier */
    proposalId: Scalars['String']['output']
    /** Region of the advertiser */
    region: RegionEnum
    /** Salesforce opportunity identifier */
    salesforceOpportunityId: Scalars['String']['output']
  }

  /** Advertiser information for the media plan */
  interface AdvertiserInformationInput {
    /** Advertiser Business Partner ID (BPID) - unique identifier for the advertiser in the system */
    advertiserBpid: Scalars['String']['input']
    /** Advertiser identifier */
    advertiserId: Scalars['String']['input']
    /** Breakdown descriptor */
    breakdown: BreakdownEnum
    /** Currency for the media plan */
    currency: Scalars['String']['input']
    /** Type of plan */
    planType: PlanTypeEnum
    /** Indicates whether prefill is enabled for the media plan */
    prefillEnabled: Scalars['Boolean']['input']
    /** Proposal identifier */
    proposalId: Scalars['String']['input']
    /** Region of the advertiser */
    region: RegionEnum
    /** Salesforce opportunity identifier */
    salesforceOpportunityId: Scalars['String']['input']
  }

  /** Breakdown descriptor for the media plan */
  enum BreakdownEnum {
    MultiProperty = 'MULTI_PROPERTY',
    SingleProperty = 'SINGLE_PROPERTY',
  }

  /** Calculation mode for the channel allocation - only applicable for display channel */
  enum CalculationModeEnum {
    Cpm = 'CPM',
    Margin = 'MARGIN',
  }

  /** Channel allocation for the last distribution response (output type) */
  interface ChannelAllocation {
    __typename?: 'ChannelAllocation'
    /** Budget amount for this channel */
    budgetAmount: Scalars['Float']['output']
    /** Budget percentage for this channel */
    budgetPct: Scalars['Float']['output']
    /** Media channel */
    channel: MediaChannelEnum
    /** Unique identifier of the channel allocation */
    id: Scalars['String']['output']
    /** Media plan identifier */
    mediaPlanId: Scalars['String']['output']
    /** Tactic allocations within this channel */
    tactics: Array<TacticAllocation>
  }

  /** Input for creating a media plan - General Settings (Step 1) */
  interface CreateMediaPlanInput1 {
    /** Advertiser information */
    advertiserInformation: AdvertiserInformationInput
    /** Plan information */
    planInformation: PlanInformationInput
    /** Price settings */
    priceSettings: PriceSettingsInput
  }

  /** Input for creating a media plan - Budget Distribution (Step 2) */
  interface CreateMediaPlanInput2 {
    /** Actual margin percentage for the media plan */
    actualMarginPct: Scalars['Float']['input']
    /** List of media allocations by channel, platform and tactic */
    allocations: Array<MediaAllocationInput>
    /** Contract margin amount for the media plan */
    contractMarginAmt: Scalars['Float']['input']
    /** Contract margin percentage for the media plan */
    contractMarginPct: Scalars['Float']['input']
    /** Media plan identifier */
    mediaPlanId: Scalars['String']['input']
    /** Total spend budget for the media plan */
    spendBudget: Scalars['Float']['input']
    /** Monthly spend budget distribution percentages */
    spendBudgetDistribution: Array<SpendBudgetDistributionInput>
  }

  /** Response type for last closed won distribution */
  interface LastDistributionResponse {
    __typename?: 'LastDistributionResponse'
    /** List of channel allocations for the media plan used as source for the distribution */
    channelAllocations: Array<ChannelAllocation>
    /** Monthly distributions for the media plan used as source for the distribution */
    monthlyDistributions: Array<MonthlyDistribution>
    /** sourcePlanId: Identifier of the media plan used as source for the distribution */
    sourcePlanId: Scalars['String']['output']
    /** Name of the media plan used as source for the distribution */
    sourcePlanName: Scalars['String']['output']
  }

  /** Media allocation (output type) */
  interface MediaAllocation {
    __typename?: 'MediaAllocation'
    /** Budget amount for this channel */
    budgetAmount: Scalars['Float']['output']
    /** Budget percentage for this channel */
    budgetPct: Scalars['Float']['output']
    /** Media channel */
    channel: MediaChannelEnum
    /** Tactic allocations within this channel */
    tactics: Array<TacticAllocation>
  }

  /** Media allocation entry grouped by channel for the budget distribution */
  interface MediaAllocationInput {
    /** Budget amount for this channel */
    budgetAmount: Scalars['Float']['input']
    /** Budget percentage for this channel */
    budgetPct: Scalars['Float']['input']
    /** Media channel (e.g. paid search, display, social) */
    channel: MediaChannelEnum
    /** Tactic allocations within this channel */
    tactics: Array<TacticAllocationInput>
  }

  /** Media channel for the allocation */
  enum MediaChannelEnum {
    Display = 'DISPLAY',
    Metasearch = 'METASEARCH',
    PaidSearch = 'PAID_SEARCH',
    Social = 'SOCIAL',
    Video = 'VIDEO',
  }

  /** Media Plan entity */
  interface MediaPlan {
    __typename?: 'MediaPlan'
    /** Business Partner ID of the advertiser */
    advertiserBpid: Scalars['String']['output']
    /** Name of the advertiser */
    advertiserName: Scalars['String']['output']
    /** Contract budget allocated (may be null if not set) */
    contractBudget?: Maybe<Scalars['String']['output']>
    /** Currency for the media plan */
    currency: Scalars['String']['output']
    /** End date of the plan */
    endDate: Scalars['String']['output']
    /** Unique identifier */
    id: Scalars['ID']['output']
    /** Opportunity ID associated with the plan */
    opportunityId: Scalars['String']['output']
    /** Name of the media plan */
    planName: Scalars['String']['output']
    /** Type of the plan (New or Renewal) */
    planType: PlanTypeEnum
    /** Proposal ID associated with the plan */
    proposalId: Scalars['String']['output']
    /** Start date of the plan */
    startDate: Scalars['String']['output']
    /** Current status of the plan */
    status: StatusEnum
  }

  /** Response type for media plan budget distribution */
  interface MediaPlanBdSectionResponse {
    __typename?: 'MediaPlanBdSectionResponse'
    /** Actual margin percentage for the media plan */
    actualMarginPct: Scalars['Float']['output']
    /** List of media allocations by channel, platform and tactic */
    allocations: Array<MediaAllocation>
    /** Contract margin amount for the media plan */
    contractMarginAmt: Scalars['Float']['output']
    /** Contract margin percentage for the media plan */
    contractMarginPct: Scalars['Float']['output']
    /** Media plan identifier */
    mediaPlanId: Scalars['String']['output']
    /** Total spend budget for the media plan */
    spendBudget: Scalars['Float']['output']
    /** Monthly spend budget distribution percentages */
    spendBudgetDistribution: Array<SpendBudgetDistribution>
  }

  /** Input type for filtering media plans */
  interface MediaPlanFilter {
    /** Filter by advertiserID */
    advertiserId?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
    /** Filter to show only plans owned by the current user */
    myPlansOnly?: InputMaybe<Scalars['Boolean']['input']>
    /** Pagination input - reserved for future implementation */
    paging?: InputMaybe<PagingInput>
    /** Filter by plan name */
    planName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
    /** Filter by plan type */
    planType?: InputMaybe<Array<PlanTypeEnum>>
    /** Search text across multiple fields */
    search?: InputMaybe<Scalars['String']['input']>
    /** Filter by status */
    status?: InputMaybe<Array<StatusEnum>>
  }

  /** Response type for media plan general settings */
  interface MediaPlanGsSectionResponse {
    __typename?: 'MediaPlanGsSectionResponse'
    /** Advertiser information */
    advertiserInformation: AdvertiserInformation
    /** Plan information */
    planInformation: PlanInformation
    /** Price settings */
    priceSettings: PriceSettings
  }

  interface MediaPlanResponse {
    __typename?: 'MediaPlanResponse'
    /** Budget distribution details of the media plan */
    budgetDistribution: MediaPlanBdSectionResponse
    /** General settings of the media plan */
    generalSettings: MediaPlanGsSectionResponse
    /** Unique identifier */
    mediaPlanId: Scalars['String']['output']
  }

  /** Response wrapper for media plans list */
  interface MediaPlansResponse {
    __typename?: 'MediaPlansResponse'
    /** Count of all plans */
    allPlansCount: Scalars['Int']['output']
    /** Count of plans owned by the current user */
    myPlansCount: Scalars['Int']['output']
    /** List of media plans */
    plans: Array<MediaPlan>
    /** Total number of plans matching the filter */
    totalCount: Scalars['Int']['output']
  }

  /** Media platform for the allocation */
  enum MediaPlatformEnum {
    AmadeusDsp = 'AMADEUS_DSP',
    Bing = 'BING',
    Dv360 = 'DV360',
    FacebookIg = 'FACEBOOK_IG',
    GoogleAds = 'GOOGLE_ADS',
    Kayak = 'KAYAK',
    Linkedin = 'LINKEDIN',
    Pinterest = 'PINTEREST',
    Tiktok = 'TIKTOK',
    Tripadvisor = 'TRIPADVISOR',
    Trivago = 'TRIVAGO',
    Youtube = 'YOUTUBE',
  }

  /** Media tactic for the allocation */
  enum MediaTacticEnum {
    AdvantagePlus = 'ADVANTAGE_PLUS',
    Brand = 'BRAND',
    DemandGen = 'DEMAND_GEN',
    Generic = 'GENERIC',
    Pmax = 'PMAX',
    Prospecting = 'PROSPECTING',
    Remarketing = 'REMARKETING',
  }

  /** Monthly distribution for the last distribution response (output type) */
  interface MonthlyDistribution {
    __typename?: 'MonthlyDistribution'
    /** Calculated monetary amount for this month's distribution */
    calculatedAmount: Scalars['Float']['output']
    /** Unique identifier of the channel allocation */
    id: Scalars['String']['output']
    /** Media plan identifier */
    mediaPlanId: Scalars['String']['output']
    /** Month period in DD-MMM-YYYY format */
    month: Scalars['String']['output']
    /** Spend percentage for this month */
    spendPct: Scalars['Int']['output']
    /** Distribution value type: PERCENTAGE or FIXED */
    valueType: Scalars['String']['output']
  }

  interface Mutation {
    __typename?: 'Mutation'
    /** Create a new media plan for General Settings */
    createMediaPlanGs: ResponseMediaPlanInput
    /** Update a media plan for Budget Distribution */
    updateMediaPlanBd: ResponseMediaPlanInput
    /** Update a media plan for General Settings */
    updateMediaPlanGs: ResponseMediaPlanInput
  }

  type MutationCreateMediaPlanGsArgs = {
    input: CreateMediaPlanInput1
  }

  type MutationUpdateMediaPlanBdArgs = {
    input: CreateMediaPlanInput2
  }

  type MutationUpdateMediaPlanGsArgs = {
    input: UpdateMediaPlanInput3
  }

  /** Input for pagination (reserved for future implementation) */
  interface PagingInput {
    /** Maximum number of items to return (max 100) */
    limit?: InputMaybe<Scalars['Int']['input']>
    /** Number of items to skip */
    offset?: InputMaybe<Scalars['Int']['input']>
  }

  /** Plan information (output type) */
  interface PlanInformation {
    __typename?: 'PlanInformation'
    /** Contract budget target */
    contractBudgetTarget: Scalars['String']['output']
    /** Contract profit target */
    contractProfitTarget: Scalars['String']['output']
    /** End date in DD-MMM-YYYY format */
    endDate: Scalars['String']['output']
    /** Name of the plan */
    planName: Scalars['String']['output']
    /** Start date in DD-MMM-YYYY format */
    startDate: Scalars['String']['output']
    /** Status of the plan */
    status: StatusEnum
  }

  /** Plan information for the media plan */
  interface PlanInformationInput {
    /** Contract budget target */
    contractBudgetTarget?: InputMaybe<Scalars['String']['input']>
    /** Contract profit target */
    contractProfitTarget?: InputMaybe<Scalars['String']['input']>
    /** End date in DD-MMM-YYYY format */
    endDate: Scalars['String']['input']
    /** Name of the plan */
    planName: Scalars['String']['input']
    /** Start date in DD-MMM-YYYY format */
    startDate: Scalars['String']['input']
    /** Status of the plan */
    status: StatusEnum
  }

  /** Type of plan */
  enum PlanTypeEnum {
    New = 'NEW',
    Renewal = 'RENEWAL',
  }

  /** Price settings (output type) */
  interface PriceSettings {
    __typename?: 'PriceSettings'
    /** Creative fee */
    creativeFee: Scalars['String']['output']
    /** Management fee percentage */
    managementFeePct: Scalars['String']['output']
    /** Metasearch connectivity fee */
    metasearchConnectivityFee: Scalars['String']['output']
    /** Metasearch setup fee */
    metasearchSetupFee: Scalars['String']['output']
    /** Setup fee */
    setupFee: Scalars['String']['output']
    /** Video creative fee */
    videoCreativeFee: Scalars['String']['output']
  }

  /** Price settings for the media plan */
  interface PriceSettingsInput {
    /** Creative fee - optional, must be numeric when provided */
    creativeFee?: InputMaybe<Scalars['String']['input']>
    /** Management fee percentage - required, must be numeric */
    managementFeePct: Scalars['String']['input']
    /** Metasearch connectivity fee - optional, must be numeric when provided */
    metasearchConnectivityFee?: InputMaybe<Scalars['String']['input']>
    /** Metasearch setup fee - optional, must be numeric when provided */
    metasearchSetupFee?: InputMaybe<Scalars['String']['input']>
    /** Setup fee - optional, must be numeric when provided */
    setupFee?: InputMaybe<Scalars['String']['input']>
    /** Video creative fee - optional, must be numeric when provided */
    videoCreativeFee?: InputMaybe<Scalars['String']['input']>
  }

  /** Root Query Type */
  interface Query {
    __typename?: 'Query'
    /** Returns the last closed won distribution for an advertiser by ID */
    GetLastDistribution: LastDistributionResponse
    /**
     * Returns general settings and budget distribution details for a media plan by ID
     *   - mediaPlanId: ID of the media plan to retrieve
     */
    GetMediaPlan: MediaPlanResponse
    /** Returns a list of media plans with optional filtering */
    GetMediaPlans: MediaPlansResponse
    /**
     * Returns spend budget recommendation for a media plan by ID
     *   - mediaPlanId: ID of the media plan to retrieve
     */
    GetSpendBudgetRecommendation: SpendBudgetRecommendationResponse
  }

  /** Root Query Type */
  type QueryGetLastDistributionArgs = {
    advertiserId: Scalars['String']['input']
  }

  /** Root Query Type */
  type QueryGetMediaPlanArgs = {
    mediaPlanId: Scalars['String']['input']
  }

  /** Root Query Type */
  type QueryGetMediaPlansArgs = {
    filter?: InputMaybe<MediaPlanFilter>
  }

  /** Root Query Type */
  type QueryGetSpendBudgetRecommendationArgs = {
    input: SpendBudgetRecommendationInput
  }

  /** Region associated with an advertiser */
  enum RegionEnum {
    Aspac = 'ASPAC',
    Emea = 'EMEA',
    Latam = 'LATAM',
    Noram = 'NORAM',
  }

  /** Response returned after creating a media plan */
  interface ResponseMediaPlanInput {
    __typename?: 'ResponseMediaPlanInput'
    /** Date and time when the media plan was created, in ISO 8601 format */
    dateCreated: Scalars['String']['output']
    /** Unique identifier assigned to the created media plan */
    mediaPlanId: Scalars['String']['output']
    /** Human-readable message describing the result */
    message: Scalars['String']['output']
    /** Indicates whether the operation was successful */
    success: Scalars['Boolean']['output']
  }

  /** Monthly spend budget distribution (output type) */
  interface SpendBudgetDistribution {
    __typename?: 'SpendBudgetDistribution'
    /** Month period in DD-MMM-YYYY format */
    month: Scalars['String']['output']
    /** Spend percentage for this month */
    spendPct: Scalars['Int']['output']
  }

  /** Monthly spend budget distribution entry */
  interface SpendBudgetDistributionInput {
    /** Month period in DD-MMM-YYYY format (e.g. 01-Jan-2026) */
    month: Scalars['String']['input']
    /** Spend percentage for this month */
    spendPct: Scalars['Int']['input']
  }

  /** Single period budget allocation returned by the spend budget recommendation */
  interface SpendBudgetItem {
    __typename?: 'SpendBudgetItem'
    /** Budget amount allocated for this period */
    budget: Scalars['Int']['output']
    /** End date of the period in DD-MMM-YYYY format */
    endDate: Scalars['String']['output']
    /** Indicates whether this period covers a partial month */
    partialMonth: Scalars['Boolean']['output']
    /** Start date of the period in DD-MMM-YYYY format */
    startDate: Scalars['String']['output']
  }

  interface SpendBudgetRecommendationInput {
    /** Advertiser Business Partner ID (BPID) */
    advertiserBpid: Scalars['String']['input']
    /** Advertiser identifier */
    advertiserId: Scalars['String']['input']
    /** Date range for the recommendation in DD-MMM-YYYY format */
    endDate: Scalars['String']['input']
    /** Optional group identifier for OBA budget allocation */
    groupId?: InputMaybe<Scalars['Int']['input']>
    /** Date range for the recommendation in DD-MMM-YYYY format */
    startDate: Scalars['String']['input']
    /** Total budget to distribute across the date range */
    totalBudget: Scalars['Int']['input']
  }

  interface SpendBudgetRecommendationResponse {
    __typename?: 'SpendBudgetRecommendationResponse'
    items: Array<SpendBudgetItem>
    /** Status code returned by the media plans API service */
    status: Scalars['String']['output']
  }

  /** Status of a media plan creation */
  enum StatusEnum {
    Archived = 'ARCHIVED',
    ClosedLost = 'CLOSED_LOST',
    ClosedWon = 'CLOSED_WON',
    Draft = 'DRAFT',
    Submitted = 'SUBMITTED',
  }

  /** Tactic allocation (output type) */
  interface TacticAllocation {
    __typename?: 'TacticAllocation'
    /** Calculation mode for this channel (e.g. use margin or use CPM) - applicable only for display */
    calculationMode?: Maybe<Scalars['String']['output']>
    /** Cost per thousand impressions (CPM) */
    cpmAmount?: Maybe<Scalars['Float']['output']>
    /** Margin amount */
    marginAmount?: Maybe<Scalars['Float']['output']>
    /** Margin percentage */
    marginPct?: Maybe<Scalars['Float']['output']>
    /** Percentage of expected for this tactic allocation */
    pctOfExpected: Scalars['Float']['output']
    /** Ad platform - single value */
    platform?: Maybe<MediaPlatformEnum>
    /** Platform cost */
    platformCost?: Maybe<Scalars['Float']['output']>
    /** Ad platforms - array (for metasearch) */
    platforms?: Maybe<Array<MediaPlatformEnum>>
    /** Spend amount for this tactic allocation */
    spendAmount: Scalars['Float']['output']
    /** Spend percentage for this tactic allocation */
    spendPct: Scalars['Float']['output']
    /** Media tactic */
    tactic?: Maybe<MediaTacticEnum>
  }

  /** Tactic allocation entry within a channel */
  interface TacticAllocationInput {
    /** Calculation mode for this channel (e.g. use margin or use CPM) - applicable only for display */
    calculationMode?: InputMaybe<CalculationModeEnum>
    /** Cost per thousand impressions (CPM) - applicable for display */
    cpmAmount?: InputMaybe<Scalars['Float']['input']>
    /** Margin amount - applicable for display, social, video, metasearch */
    marginAmount?: InputMaybe<Scalars['Float']['input']>
    /** Margin percentage - applicable for social, video */
    marginPct?: InputMaybe<Scalars['Float']['input']>
    /** Percentage of expected for this tactic allocation */
    pctOfExpected: Scalars['Float']['input']
    /** Ad platform - single value (for paid search, display, social, video) */
    platform?: InputMaybe<MediaPlatformEnum>
    /** Platform cost - applicable for display */
    platformCost?: InputMaybe<Scalars['Float']['input']>
    /** Ad platforms - array (for metasearch) */
    platforms?: InputMaybe<Array<MediaPlatformEnum>>
    /** Spend amount for this tactic allocation */
    spendAmount: Scalars['Float']['input']
    /** Spend percentage for this tactic allocation */
    spendPct: Scalars['Float']['input']
    /** Media tactic (e.g. brand, generic, prospecting) - not applicable for metasearch */
    tactic?: InputMaybe<MediaTacticEnum>
  }

  /** Input for updating a media plan - General Settings (Step 3) */
  interface UpdateMediaPlanInput3 {
    /** Advertiser information */
    advertiserInformation: AdvertiserInformationInput
    /** Unique identifier assigned to the created media plan */
    mediaPlanId: Scalars['String']['input']
    /** Plan information */
    planInformation: PlanInformationInput
    /** Price settings */
    priceSettings: PriceSettingsInput
  }
}
