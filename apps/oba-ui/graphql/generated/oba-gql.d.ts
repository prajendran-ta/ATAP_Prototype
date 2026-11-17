// OBA GraphQL Typescript Definitions
declare namespace ObaQL {
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
    Int53: { input: number; output: number }
    /**  Scalar  */
    Void: { input: any; output: any }
  }

  interface AdvertiserName {
    __typename?: 'AdvertiserName'
    bid?: Maybe<Scalars['ID']['output']>
    bpid?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    notFound: Scalars['Boolean']['output']
  }

  interface AdvertiserNameFilter {
    fromExistingAdvertiserPlans?: InputMaybe<Scalars['Boolean']['input']>
    ids?: InputMaybe<Array<Scalars['ID']['input']>>
    name?: InputMaybe<Scalars['String']['input']>
  }

  /**  Retrieve avertiser plan  */
  interface AdvertiserPlan {
    __typename?: 'AdvertiserPlan'
    advertiser: AdvertiserName
    advertiserId: Scalars['ID']['output']
    /**  TODO PIB-1633 to be replaced by campaigns  */
    campaignDetails: Array<CampaignDetails>
    /**  Retrieve campaign flights  */
    campaignFlights: CampaignFlights
    campaigns: Campaigns
    currency: Scalars['String']['output']
    disable: AdvertiserPlanDisableStates
    dispatchMode: DispatchModeEnum
    dispatchOptIn: Scalars['Boolean']['output']
    groups: Array<GroupPlan>
    id: Scalars['ID']['output']
    isRunnable: Scalars['Boolean']['output']
    managementFeePercent: Scalars['Float']['output']
    marginPercent: Scalars['Float']['output']
    name: Scalars['String']['output']
    period: Period
    recommendations: Array<Recommendation>
    status: AdvertiserPlanStatusEnum
    totalBudget: Budget
    unmappedCampaigns: Array<UnmappedCampaignName>
    unpausedStatus: AdvertiserPlanStatusEnum
    updated?: Maybe<UserAndTime>
    version: Scalars['Int53']['output']
  }

  /**  Retrieve avertiser plan  */
  type AdvertiserPlanCampaignDetailsArgs = {
    filter?: InputMaybe<CampaignDetailsFilter>
  }

  /**  Retrieve avertiser plan  */
  type AdvertiserPlanCampaignFlightsArgs = {
    id: Scalars['String']['input']
  }

  /**  Retrieve avertiser plan  */
  type AdvertiserPlanCampaignsArgs = {
    filter?: InputMaybe<CampaignFilter>
  }

  /**  Retrieve avertiser plan  */
  type AdvertiserPlanRecommendationsArgs = {
    filter?: InputMaybe<RecommendationFilter>
  }

  /**  Update budgets at advertiser plan level  */
  interface AdvertiserPlanBudgetsInput {
    advertiserId?: InputMaybe<Scalars['Int53']['input']>
    currency?: InputMaybe<Scalars['String']['input']>
    dispatchOptIn?: InputMaybe<Scalars['Boolean']['input']>
    groups: Array<GroupPlanBudgetsInput>
    id?: InputMaybe<Scalars['ID']['input']>
    /**  remove deprecated settings fields  */
    name?: InputMaybe<Scalars['String']['input']>
    period?: InputMaybe<PeriodInput>
    totalBudget?: InputMaybe<Scalars['Int53']['input']>
    version?: InputMaybe<Scalars['Int53']['input']>
  }

  interface AdvertiserPlanDisableStates {
    __typename?: 'AdvertiserPlanDisableStates'
    delete: Scalars['Boolean']['output']
    endDate: Scalars['Boolean']['output']
    pause: Scalars['Boolean']['output']
    resume: Scalars['Boolean']['output']
    startDate: Scalars['Boolean']['output']
    totalBudget: Scalars['Boolean']['output']
  }

  /**  List advertiser plans  */
  interface AdvertiserPlanFilter {
    advertiserIds?: InputMaybe<Array<Scalars['ID']['input']>>
    ids?: InputMaybe<Array<Scalars['ID']['input']>>
    myAdvertisers?: InputMaybe<Scalars['Boolean']['input']>
    name?: InputMaybe<Scalars['String']['input']>
    paging?: InputMaybe<PagingInput>
    status?: InputMaybe<Array<AdvertiserPlanStatusEnum>>
  }

  /**  Update advertiser plan level  */
  interface AdvertiserPlanInput {
    advertiserId?: InputMaybe<Scalars['ID']['input']>
    currency?: InputMaybe<Scalars['String']['input']>
    dispatchOptIn?: InputMaybe<Scalars['Boolean']['input']>
    groups?: InputMaybe<Array<GroupPlanInput>>
    id?: InputMaybe<Scalars['ID']['input']>
    managementFeePercent?: InputMaybe<Scalars['Float']['input']>
    marginPercent?: InputMaybe<Scalars['Float']['input']>
    name?: InputMaybe<Scalars['String']['input']>
    period?: InputMaybe<PeriodInput>
    totalBudget?: InputMaybe<Scalars['Int53']['input']>
    version?: InputMaybe<Scalars['Int53']['input']>
  }

  /**  Retrieve a list of advertiser plans ( lite version )  */
  interface AdvertiserPlanLite {
    __typename?: 'AdvertiserPlanLite'
    advertiser: AdvertiserName
    advertiserId: Scalars['ID']['output']
    currency: Scalars['String']['output']
    dispatchMode: DispatchModeEnum
    dispatchOptIn: Scalars['Boolean']['output']
    id: Scalars['ID']['output']
    managementFeePercent: Scalars['Float']['output']
    marginPercent: Scalars['Float']['output']
    name: Scalars['String']['output']
    nbCampaigns: Scalars['Int53']['output']
    nbGroups: Scalars['Int53']['output']
    nbIncludedCampaigns: Scalars['Int53']['output']
    period: Period
    status: AdvertiserPlanStatusEnum
    totalBudget: Budget
    unpausedStatus: AdvertiserPlanStatusEnum
    updated?: Maybe<UserAndTime>
    version: Scalars['Int53']['output']
  }

  interface AdvertiserPlanNameFilter {
    ids?: InputMaybe<Array<Scalars['ID']['input']>>
    name?: InputMaybe<Scalars['String']['input']>
  }

  /**  Enum  */
  enum AdvertiserPlanStatusEnum {
    Completed = 'Completed',
    Live = 'Live',
    Paused = 'Paused',
    Scheduled = 'Scheduled',
    Unknown = 'Unknown',
  }

  interface Budget {
    __typename?: 'Budget'
    /** @deprecated use `allottedCents` */
    allocatedCents?: Maybe<Scalars['Int53']['output']>
    /** @deprecated use `allottedCents` */
    allotedCents?: Maybe<Scalars['Int53']['output']>
    allottedCents?: Maybe<Scalars['Int53']['output']>
    budgetCents?: Maybe<Scalars['Int53']['output']>
    /**
     *  deprecated
     * @deprecated use `originalCents`
     */
    originalBudgetCents?: Maybe<Scalars['Int53']['output']>
    originalCents?: Maybe<Scalars['Int53']['output']>
    overSpentCents?: Maybe<Scalars['Int53']['output']>
    /**  spent metrics  */
    spentCents?: Maybe<Scalars['Int53']['output']>
    unSpentCents?: Maybe<Scalars['Int53']['output']>
  }

  /**  A bundle is a group of vendor campaigns that share the same channel, tactic and platform  */
  interface BundlePlan {
    __typename?: 'BundlePlan'
    channel: ChannelEnum
    deliveryPlatform: DeliveryPlatformEnum
    group: IdAndName
    groupId: Scalars['ID']['output']
    id: Scalars['ID']['output']
    lowerBoundPercent?: Maybe<Scalars['Int']['output']>
    mappingPlatform: MappingPlatformEnum
    platform: IdAndName
    tactic: TacticEnum
    updated?: Maybe<UserAndTime>
    upperBoundPercent?: Maybe<Scalars['Int']['output']>
    vendorCampaignIds: Array<Scalars['String']['output']>
    vendorCampaigns: Array<VendorCampaign>
    version: Scalars['Int53']['output']
  }

  interface BundlePlanInput {
    channel: ChannelEnum
    deliveryPlatform?: InputMaybe<DeliveryPlatformEnum>
    id?: InputMaybe<Scalars['ID']['input']>
    lowerBoundPercent?: InputMaybe<Scalars['Int']['input']>
    mappingPlatform?: InputMaybe<MappingPlatformEnum>
    tactic: TacticEnum
    upperBoundPercent?: InputMaybe<Scalars['Int']['input']>
    vendorCampaignIds: Array<Scalars['String']['input']>
    version?: InputMaybe<Scalars['Int53']['input']>
  }

  interface CampaignDetails {
    __typename?: 'CampaignDetails'
    campaign: CampaignName
    campaignId: Scalars['String']['output']
    channel: ChannelEnum
    currency?: Maybe<Scalars['String']['output']>
    /**
     *  deprecated
     * @deprecated not filled
     */
    currentMonthSpentCents?: Maybe<Scalars['Int53']['output']>
    dailyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    deliveryPlatform: DeliveryPlatformEnum
    deltaDailyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    deltaMonthlyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    group: IdAndName
    groupId: Scalars['ID']['output']
    /**  date in format: YYYY-MM-DD  */
    lastUpdated?: Maybe<Scalars['String']['output']>
    mappingPlatform: MappingPlatformEnum
    monthlyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    percentDailyRecommendedCents?: Maybe<Scalars['Float']['output']>
    percentMonthlyRecommendedCents?: Maybe<Scalars['Float']['output']>
    platform: IdAndName
    previousDailyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    previousMonthlyRecommendedCents?: Maybe<Scalars['Int53']['output']>
    previousUpdated?: Maybe<Scalars['String']['output']>
    status: CampaignStatusEnum
    statusMessage: Scalars['String']['output']
    tactic: TacticEnum
    /** @deprecated not filled */
    totalSpentCents?: Maybe<Scalars['Int53']['output']>
  }

  interface CampaignDetailsFilter {
    channels?: InputMaybe<Array<ChannelEnum>>
    deliveryPlatforms?: InputMaybe<Array<DeliveryPlatformEnum>>
    groupIds?: InputMaybe<Array<Scalars['ID']['input']>>
    mappingPlatforms?: InputMaybe<Array<MappingPlatformEnum>>
    platformIds?: InputMaybe<Array<Scalars['ID']['input']>>
    statuses?: InputMaybe<Array<CampaignStatusEnum>>
    tactics?: InputMaybe<Array<TacticEnum>>
    vendorCampaignIds?: InputMaybe<Array<Scalars['String']['input']>>
  }

  interface CampaignFilter {
    channels?: InputMaybe<Array<ChannelEnum>>
    deliveryPlatforms?: InputMaybe<Array<DeliveryPlatformEnum>>
    groupIds?: InputMaybe<Array<Scalars['ID']['input']>>
    mappingPlatforms?: InputMaybe<Array<MappingPlatformEnum>>
    platformIds?: InputMaybe<Array<Scalars['ID']['input']>>
    statuses?: InputMaybe<Array<CampaignStatusEnum>>
    tactics?: InputMaybe<Array<TacticEnum>>
    vendorCampaignIds?: InputMaybe<Array<Scalars['String']['input']>>
  }

  interface CampaignFlight {
    __typename?: 'CampaignFlight'
    /**  Added at in format: YYYY-MM-DD  */
    addedAt?: Maybe<Scalars['String']['output']>
    current: Scalars['Boolean']['output']
    /**  End date in format: YYYY-MM-DD  */
    endDate?: Maybe<Scalars['String']['output']>
    group?: Maybe<IdAndName>
    groupId?: Maybe<Scalars['ID']['output']>
    /**  Start date in format: YYYY-MM-DD  */
    startDate?: Maybe<Scalars['String']['output']>
    status: CampaignFlightStatusEnum
  }

  interface CampaignFlightInput {
    /**  Added at in format: YYYY-MM-DD ( default today ) */
    addedAt?: InputMaybe<Scalars['String']['input']>
    /**  End date in format: YYYY-MM-DD  */
    endDate: Scalars['String']['input']
    /**  ( default: 0 = unassigned / consumption paused )  */
    groupId?: InputMaybe<Scalars['ID']['input']>
    /**  Start date in format: YYYY-MM-DD  */
    startDate: Scalars['String']['input']
    status: CampaignFlightStatusEnum
  }

  enum CampaignFlightStatusEnum {
    /**  campaign assigned to one group = consumption assigned to this group ( campaign could be paused or active )  */
    ConsumptionActive = 'ConsumptionActive',
    /**  campaign not assigned to any group = consumption paused  */
    ConsumptionPaused = 'ConsumptionPaused',
    Unknown = 'Unknown',
  }

  /** Retrieve campaign fliggts */
  interface CampaignFlights {
    __typename?: 'CampaignFlights'
    campaign: CampaignName
    campaignId: Scalars['String']['output']
    /**  End date in format: YYYY-MM-DD  */
    endDate?: Maybe<Scalars['String']['output']>
    flights: Array<CampaignFlight>
    /**  Start date in format: YYYY-MM-DD  */
    startDate?: Maybe<Scalars['String']['output']>
  }

  /**  Update campaign flights  */
  interface CampaignFlightsInput {
    advertiserPlanId: Scalars['ID']['input']
    campaignId: Scalars['String']['input']
    flights: Array<CampaignFlightInput>
  }

  /** Retrieve campaign mappings ( and sub campaigns if applicable )  */
  interface CampaignMapping {
    __typename?: 'CampaignMapping'
    advertiser?: Maybe<AdvertiserName>
    /**  (optional) advertiser is set only if external advertiser has been mapped  */
    advertiserId?: Maybe<Scalars['Int53']['output']>
    /** @deprecated do not use it / not filled */
    deliveryPlatform?: Maybe<DeliveryPlatformEnum>
    externalAdvertiser: ExternalAdvertiserName
    externalAdvertiserId: Scalars['String']['output']
    id: Scalars['String']['output']
    mapping: CampaignMappings
    /**
     *  deprecated
     * @deprecated do not use it / not filled
     */
    mappingPlatform?: Maybe<MappingPlatformEnum>
    name: Scalars['String']['output']
    platform?: Maybe<PlatformEnum>
    subCampaignMappings?: Maybe<Array<SubCampaignMapping>>
  }

  interface CampaignMappingFilter {
    advertiserIds?: InputMaybe<Array<Scalars['ID']['input']>>
    advertiserMapping?: InputMaybe<MappingStatusEnum>
    campaignIds?: InputMaybe<Array<Scalars['String']['input']>>
    campaignMapping?: InputMaybe<MappingStatusEnum>
    /** @deprecated not implemented */
    deliveryPlatforms?: InputMaybe<Array<DeliveryPlatformEnum>>
    externalAdvertiserIds?: InputMaybe<Array<Scalars['String']['input']>>
    invoiceMapping?: InputMaybe<MappingStatusEnum>
    /** @deprecated not implemented */
    mappingPlatforms?: InputMaybe<Array<MappingPlatformEnum>>
    myAdvertisers?: InputMaybe<Scalars['Boolean']['input']>
    obaMapping?: InputMaybe<MappingStatusEnum>
    offerMapping?: InputMaybe<MappingStatusEnum>
    paging?: InputMaybe<PagingInput>
    platforms?: InputMaybe<Array<PlatformEnum>>
  }

  interface CampaignMappingResult {
    __typename?: 'CampaignMappingResult'
    items: Array<CampaignMapping>
    totalCount: Scalars['Int53']['output']
  }

  interface CampaignMappings {
    __typename?: 'CampaignMappings'
    advertiser?: Maybe<MappingStatusEnum>
    campaign?: Maybe<MappingStatusEnum>
    invoice?: Maybe<MappingStatusEnum>
    /**  (optional) invoice mapping id provided if invoice status is mapped  */
    invoiceMappingId?: Maybe<Scalars['Int53']['output']>
    oba?: Maybe<MappingStatusEnum>
  }

  interface CampaignMetric {
    __typename?: 'CampaignMetric'
    currency: Scalars['String']['output']
    /**  date in format: YYYY-MM-DD  */
    date: Scalars['String']['output']
    percentRecommendedCents?: Maybe<Scalars['Float']['output']>
    percentSpentCents?: Maybe<Scalars['Float']['output']>
    recommendedCents: Scalars['Int53']['output']
    spentCents: Scalars['Int53']['output']
  }

  interface CampaignName {
    __typename?: 'CampaignName'
    bid?: Maybe<Scalars['ID']['output']>
    deliveryPlatform?: Maybe<DeliveryPlatformEnum>
    id: Scalars['String']['output']
    mappingPlatform?: Maybe<MappingPlatformEnum>
    name: Scalars['String']['output']
    notFound: Scalars['Boolean']['output']
    tactic?: Maybe<TacticEnum>
  }

  interface CampaignNameFilter {
    advertiserId?: InputMaybe<Scalars['Int53']['input']>
    advertiserPlanId?: InputMaybe<Scalars['Int53']['input']>
    bid?: InputMaybe<Scalars['Int53']['input']>
    channel?: InputMaybe<ChannelEnum>
    fromExistingAdvertiserPlans?: InputMaybe<Scalars['Boolean']['input']>
    groupId?: InputMaybe<Scalars['Int53']['input']>
    ids?: InputMaybe<Array<Scalars['ID']['input']>>
    name?: InputMaybe<Scalars['String']['input']>
    tactic?: InputMaybe<TacticEnum>
  }

  enum CampaignStatusEnum {
    Active = 'Active',
    Error = 'Error',
    Manual = 'Manual',
    Paused = 'Paused',
    Unknown = 'Unknown',
    Warning = 'Warning',
  }

  /** Retrieve plan details  */
  interface Campaigns {
    __typename?: 'Campaigns'
    details: Array<CampaignDetails>
    metrics: Array<CampaignMetric>
  }

  enum ChannelEnum {
    Display = 'Display',
    Facebook = 'Facebook',
    PaidSearch = 'PaidSearch',
    Unknown = 'Unknown',
    YouTube = 'YouTube',
  }

  interface ChannelInput {
    lowerBoundPercent?: InputMaybe<Scalars['Int']['input']>
    upperBoundPercent?: InputMaybe<Scalars['Int']['input']>
  }

  interface ChannelSettings {
    __typename?: 'ChannelSettings'
    lowerBoundPercent?: Maybe<Scalars['Int']['output']>
    upperBoundPercent?: Maybe<Scalars['Int']['output']>
  }

  /**  Save invoice mapping (OpportunityId + ShipToBid)  */
  interface CreateInvoiceMappingInput {
    externalAdvertiserId: Scalars['String']['input']
    externalCampaignId: Scalars['String']['input']
    opportunityId: Scalars['String']['input']
    platform: PlatformEnum
    shipToAdvertiserId: Scalars['Int53']['input']
  }

  interface Currency {
    __typename?: 'Currency'
    code: Scalars['String']['output']
    name: Scalars['String']['output']
    symbol?: Maybe<Scalars['String']['output']>
  }

  /**  Delete advertiser plan  */
  interface DeleteInput {
    id: Scalars['ID']['input']
    version: Scalars['Int53']['input']
  }

  enum DeliveryPlatformEnum {
    BingAds = 'BingAds',
    Dv360 = 'DV360',
    Facebook = 'Facebook',
    GoogleAds = 'GoogleAds',
    Unknown = 'Unknown',
    YouTube = 'YouTube',
  }

  enum DispatchModeEnum {
    Off = 'Off',
    UnspentAtProRata = 'UnspentAtProRata',
    UnspentEvenly = 'UnspentEvenly',
  }

  interface ExternalAdvertiserName {
    __typename?: 'ExternalAdvertiserName'
    id: Scalars['String']['output']
    name: Scalars['String']['output']
  }

  interface ExternalAdvertiserNameFilter {
    ids?: InputMaybe<Array<Scalars['String']['input']>>
    name?: InputMaybe<Scalars['String']['input']>
  }

  interface GroupName {
    __typename?: 'GroupName'
    endDate: Scalars['String']['output']
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    notFound: Scalars['Boolean']['output']
    startDate: Scalars['String']['output']
  }

  interface GroupNameFilter {
    advertiserPlanId: Scalars['Int53']['input']
    name?: InputMaybe<Scalars['String']['input']>
  }

  /**
   * Retrieve group / media-plan
   *
   * A group ( or media-plan ) is a group of vendor campaigns that share the same channel, tactic and platform
   */
  interface GroupPlan {
    __typename?: 'GroupPlan'
    advertiserPlan: AdvertiserPlanLite
    advertiserPlanId: Scalars['ID']['output']
    bundles: Array<BundlePlan>
    displayChannel?: Maybe<ChannelSettings>
    facebookChannel?: Maybe<ChannelSettings>
    id: Scalars['ID']['output']
    kpi?: Maybe<KpiEnum>
    monthBudgets: Array<MonthBudget>
    name: Scalars['String']['output']
    paidSearchChannel?: Maybe<ChannelSettings>
    specs?: Maybe<Scalars['String']['output']>
    status: GroupStatusEnum
    totalBudget: Budget
    updated?: Maybe<UserAndTime>
    version: Scalars['Int53']['output']
    youtubeChannel?: Maybe<ChannelSettings>
  }

  interface GroupPlanBudgetsInput {
    id?: InputMaybe<Scalars['ID']['input']>
    monthBudgetCents: Array<Scalars['Int53']['input']>
    name: Scalars['String']['input']
    version?: InputMaybe<Scalars['Int53']['input']>
  }

  interface GroupPlanInput {
    bundles?: InputMaybe<Array<BundlePlanInput>>
    displayChannel?: InputMaybe<ChannelInput>
    facebookChannel?: InputMaybe<ChannelInput>
    id?: InputMaybe<Scalars['ID']['input']>
    kpi?: InputMaybe<KpiEnum>
    monthBudgetCents?: InputMaybe<Array<InputMaybe<Scalars['Int53']['input']>>>
    name?: InputMaybe<Scalars['String']['input']>
    paidSearchChannel?: InputMaybe<ChannelInput>
    specs?: InputMaybe<Scalars['String']['input']>
    version?: InputMaybe<Scalars['Int53']['input']>
    youtubeChannel?: InputMaybe<ChannelInput>
  }

  enum GroupStatusEnum {
    Active = 'Active',
    Error = 'Error',
    Incomplete = 'Incomplete',
    Unknown = 'Unknown',
  }

  interface IdAndName {
    __typename?: 'IdAndName'
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    notFound: Scalars['Boolean']['output']
  }

  /** Invoice mapping settings for a campaign (OpportunityId + ShipToBid) */
  interface InvoiceMapping {
    __typename?: 'InvoiceMapping'
    externalAdvertiser?: Maybe<ExternalAdvertiserName>
    externalAdvertiserId: Scalars['String']['output']
    externalCampaign?: Maybe<CampaignName>
    externalCampaignId: Scalars['String']['output']
    id: Scalars['ID']['output']
    opportunityId?: Maybe<Scalars['String']['output']>
    platform: PlatformEnum
    shipToAdvertiser?: Maybe<AdvertiserName>
    shipToAdvertiserId?: Maybe<Scalars['Int53']['output']>
    version: Scalars['Int53']['output']
  }

  enum KpiEnum {
    Clicks = 'Clicks',
    Conversions = 'Conversions',
    Roas = 'ROAS',
    Unknown = 'Unknown',
  }

  enum MappingPlatformEnum {
    Dv360 = 'DV360',
    Meta = 'Meta',
    Sa360 = 'SA360',
    Unknown = 'Unknown',
  }

  enum MappingStatusEnum {
    Mapped = 'Mapped',
    Unknown = 'Unknown',
    Unmapped = 'Unmapped',
  }

  interface MonthBudget {
    __typename?: 'MonthBudget'
    budget: Budget
    current: Scalars['Boolean']['output']
    future: Scalars['Boolean']['output']
    /**  Month format: YYYY-MM  */
    month: Scalars['String']['output']
    past: Scalars['Boolean']['output']
  }

  interface Mutation {
    __typename?: 'Mutation'
    /**  Save invoice mapping (create or update OpportunityId + ShipToBid)  */
    createInvoiceMapping?: Maybe<InvoiceMapping>
    /**  delete advertiser plan  */
    deleteAdvertiserPlan?: Maybe<Scalars['Void']['output']>
    /**  Pause/Unpause  */
    pauseAdvertiserPlan?: Maybe<AdvertiserPlan>
    pauseCampaign?: Maybe<CampaignDetails>
    unpauseAdvertiserPlan?: Maybe<AdvertiserPlan>
    unpauseCampaign?: Maybe<CampaignDetails>
    /**  Update advertiser plan  */
    updateAdvertiserPlan?: Maybe<AdvertiserPlan>
    /**  Update campaign flights  */
    updateCampaignFlights?: Maybe<CampaignFlights>
    /**  Update group plan  */
    updateGroupPlan?: Maybe<GroupPlan>
    /**  Update invoice mapping (update OpportunityId + ShipToBid)  */
    updateInvoiceMapping?: Maybe<InvoiceMapping>
  }

  type MutationCreateInvoiceMappingArgs = {
    input: CreateInvoiceMappingInput
  }

  type MutationDeleteAdvertiserPlanArgs = {
    input: DeleteInput
  }

  type MutationPauseAdvertiserPlanArgs = {
    id: Scalars['ID']['input']
  }

  type MutationPauseCampaignArgs = {
    campaignId: Scalars['String']['input']
    groupId: Scalars['ID']['input']
  }

  type MutationUnpauseAdvertiserPlanArgs = {
    id: Scalars['ID']['input']
  }

  type MutationUnpauseCampaignArgs = {
    campaignId: Scalars['String']['input']
    groupId: Scalars['ID']['input']
  }

  type MutationUpdateAdvertiserPlanArgs = {
    input: AdvertiserPlanInput
  }

  type MutationUpdateCampaignFlightsArgs = {
    input: CampaignFlightsInput
  }

  type MutationUpdateGroupPlanArgs = {
    input: GroupPlanInput
  }

  type MutationUpdateInvoiceMappingArgs = {
    input: UpdateInvoiceMappingInput
  }

  /**  Common  */
  interface PagingInput {
    /**  TODO cursor or offset ?  */
    cursor?: InputMaybe<Scalars['String']['input']>
    limit?: InputMaybe<Scalars['Int53']['input']>
    offset?: InputMaybe<Scalars['Int53']['input']>
  }

  interface Period {
    __typename?: 'Period'
    /**  End date in format: YYYY-MM-DD  */
    endDate?: Maybe<Scalars['String']['output']>
    /**  Start date in format: YYYY-MM-DD  */
    startDate?: Maybe<Scalars['String']['output']>
  }

  interface PeriodInput {
    /**  End date in format: YYYY-MM-DD  */
    endDate?: InputMaybe<Scalars['String']['input']>
    /**  Start date in format: YYYY-MM-DD  */
    startDate?: InputMaybe<Scalars['String']['input']>
  }

  /**  used for campaign mappings ( check diff from delivery platform and mapping platform ) */
  enum PlatformEnum {
    Dv360 = 'DV360',
    Derbysoft = 'Derbysoft',
    Facebook = 'Facebook',
    Sa360 = 'SA360',
    Unknown = 'Unknown',
    Wihp = 'WIHP',
  }

  interface Query {
    __typename?: 'Query'
    advertiserNames: Array<AdvertiserName>
    /**  Retrieve a specific advertiser plan by ID  */
    advertiserPlan?: Maybe<AdvertiserPlan>
    /**  Helpers for auto-complete  */
    advertiserPlanNames: Array<IdAndName>
    /**  List advertiser plans ( with filtering and paging capabilities )  */
    advertiserPlans: Array<AdvertiserPlanLite>
    /**  Retrieve campaign mappings  */
    campaignMappings: CampaignMappingResult
    /**  list all existing external campaigns ( usable for OBA = budget entity )  */
    campaignNames: Array<CampaignName>
    currencies: Array<Currency>
    /**  list all existing external advertisers  */
    externalAdvertiserNames: Array<ExternalAdvertiserName>
    groupNames: Array<IdAndName>
    /**  Retrieve a specific group plan by ID  */
    groupPlan?: Maybe<GroupPlan>
    /**  Retrieve invoice mapping settings by ID  */
    invoiceMapping?: Maybe<InvoiceMapping>
    /**  list all existing external sub campaigns ( usable for Invoice & Mapping tool / ad set level for Facebook )  */
    subCampaignNames: Array<SubCampaignName>
  }

  type QueryAdvertiserNamesArgs = {
    filter: AdvertiserNameFilter
  }

  type QueryAdvertiserPlanArgs = {
    id: Scalars['ID']['input']
  }

  type QueryAdvertiserPlanNamesArgs = {
    filter: AdvertiserPlanNameFilter
  }

  type QueryAdvertiserPlansArgs = {
    filter: AdvertiserPlanFilter
  }

  type QueryCampaignMappingsArgs = {
    filter: CampaignMappingFilter
  }

  type QueryCampaignNamesArgs = {
    filter: CampaignNameFilter
  }

  type QueryExternalAdvertiserNamesArgs = {
    filter: ExternalAdvertiserNameFilter
  }

  type QueryGroupNamesArgs = {
    filter: GroupNameFilter
  }

  type QueryGroupPlanArgs = {
    id: Scalars['ID']['input']
  }

  type QueryInvoiceMappingArgs = {
    id: Scalars['ID']['input']
  }

  type QuerySubCampaignNamesArgs = {
    filter: SubCampaignNameFilter
  }

  interface Recommendation {
    __typename?: 'Recommendation'
    /**  technical field to ease sorting  */
    appliedAt: Scalars['Int53']['output']
    campaign: CampaignName
    campaignId: Scalars['String']['output']
    channel: ChannelEnum
    currency?: Maybe<Scalars['String']['output']>
    dailyRecommendedCents: Scalars['Int53']['output']
    /**  date in format: YYYY-MM-DD  */
    date: Scalars['String']['output']
    /** @deprecated do not use it / not filled */
    deliveryPlatform: DeliveryPlatformEnum
    deltaDailyRecommendedCents: Scalars['Int53']['output']
    /** @deprecated do not use it / not filled */
    mappingPlatform: MappingPlatformEnum
    percentDailyRecommendedCents?: Maybe<Scalars['Float']['output']>
    /** @deprecated do not use it / not filled */
    platform: IdAndName
    previousDailyRecommendedCents: Scalars['Int53']['output']
    /** @deprecated do not use it / not filled */
    status: CampaignStatusEnum
    tactic: TacticEnum
  }

  interface RecommendationFilter {
    channels?: InputMaybe<Array<ChannelEnum>>
    /**  date in format: YYYY-MM-DD  */
    dates?: InputMaybe<Array<Scalars['String']['input']>>
    endDate?: InputMaybe<Scalars['String']['input']>
    /** @deprecated do not use it / not used */
    platformIds?: InputMaybe<Array<Scalars['ID']['input']>>
    startDate?: InputMaybe<Scalars['String']['input']>
    /** @deprecated do not use it / not used */
    statuses?: InputMaybe<Array<CampaignStatusEnum>>
    tactics?: InputMaybe<Array<TacticEnum>>
    vendorCampaignIds?: InputMaybe<Array<Scalars['String']['input']>>
  }

  interface SubCampaignMapping {
    __typename?: 'SubCampaignMapping'
    id: Scalars['String']['output']
    mapping: SubCampaignMappings
    name: Scalars['String']['output']
  }

  interface SubCampaignMappings {
    __typename?: 'SubCampaignMappings'
    campaign?: Maybe<MappingStatusEnum>
    invoice?: Maybe<MappingStatusEnum>
    /**  (optional) invoice mapping id provided if invoice status is mapped  */
    invoiceMappingId?: Maybe<Scalars['Int53']['output']>
  }

  interface SubCampaignName {
    __typename?: 'SubCampaignName'
    id: Scalars['String']['output']
    name: Scalars['String']['output']
  }

  interface SubCampaignNameFilter {
    ids?: InputMaybe<Array<Scalars['String']['input']>>
    name?: InputMaybe<Scalars['String']['input']>
  }

  enum TacticEnum {
    AdvantagePlus = 'AdvantagePlus',
    Brand = 'Brand',
    DemandGen = 'DemandGen',
    Generic = 'Generic',
    Pmax = 'Pmax',
    Prospecting = 'Prospecting',
    Remarketing = 'Remarketing',
    Unknown = 'Unknown',
  }

  interface UnmappedCampaignName {
    __typename?: 'UnmappedCampaignName'
    id: Scalars['String']['output']
    name: Scalars['String']['output']
    wasMapped: Scalars['Boolean']['output']
  }

  /**  Update invoice mapping (OpportunityId + ShipToBid)  */
  interface UpdateInvoiceMappingInput {
    id: Scalars['ID']['input']
    opportunityId?: InputMaybe<Scalars['String']['input']>
    shipToAdvertiserId?: InputMaybe<Scalars['Int53']['input']>
    version: Scalars['Int53']['input']
  }

  interface User {
    __typename?: 'User'
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
  }

  interface UserAndTime {
    __typename?: 'UserAndTime'
    at: Scalars['Int53']['output']
    by: User
  }

  interface VendorCampaign {
    __typename?: 'VendorCampaign'
    Id: Scalars['String']['output']
    Status: CampaignStatusEnum
    name: Scalars['String']['output']
  }
}
