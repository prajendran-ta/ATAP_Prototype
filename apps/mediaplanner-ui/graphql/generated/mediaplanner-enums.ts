/** Breakdown descriptor for the media plan */
export enum BreakdownEnum {
  MultiProperty = 'MULTI_PROPERTY',
  SingleProperty = 'SINGLE_PROPERTY',
}

/** Calculation mode for the channel allocation - only applicable for display channel */
export enum CalculationModeEnum {
  Cpm = 'CPM',
  Margin = 'MARGIN',
}

/** Media channel for the allocation */
export enum MediaChannelEnum {
  Display = 'DISPLAY',
  Metasearch = 'METASEARCH',
  PaidSearch = 'PAID_SEARCH',
  Social = 'SOCIAL',
  Video = 'VIDEO',
}

/** Media platform for the allocation */
export enum MediaPlatformEnum {
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
export enum MediaTacticEnum {
  AdvantagePlus = 'ADVANTAGE_PLUS',
  Brand = 'BRAND',
  DemandGen = 'DEMAND_GEN',
  Generic = 'GENERIC',
  Pmax = 'PMAX',
  Prospecting = 'PROSPECTING',
  Remarketing = 'REMARKETING',
}

/** Type of plan */
export enum PlanTypeEnum {
  New = 'NEW',
  Renewal = 'RENEWAL',
}

/** Region associated with an advertiser */
export enum RegionEnum {
  Aspac = 'ASPAC',
  Emea = 'EMEA',
  Latam = 'LATAM',
  Noram = 'NORAM',
}

/** Status of a media plan creation */
export enum StatusEnum {
  Archived = 'ARCHIVED',
  ClosedLost = 'CLOSED_LOST',
  ClosedWon = 'CLOSED_WON',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED',
}
