/**  Enum  */
export enum AdvertiserPlanStatusEnum {
  Completed = 'Completed',
  Live = 'Live',
  Paused = 'Paused',
  Scheduled = 'Scheduled',
  Unknown = 'Unknown',
}

export enum CampaignFlightStatusEnum {
  /**  campaign assigned to one group = consumption assigned to this group ( campaign could be paused or active )  */
  ConsumptionActive = 'ConsumptionActive',
  /**  campaign not assigned to any group = consumption paused  */
  ConsumptionPaused = 'ConsumptionPaused',
  Unknown = 'Unknown',
}

export enum CampaignStatusEnum {
  Active = 'Active',
  Error = 'Error',
  Manual = 'Manual',
  Paused = 'Paused',
  Unknown = 'Unknown',
  Warning = 'Warning',
}

export enum ChannelEnum {
  Display = 'Display',
  Facebook = 'Facebook',
  PaidSearch = 'PaidSearch',
  Unknown = 'Unknown',
  YouTube = 'YouTube',
}

export enum DeliveryPlatformEnum {
  BingAds = 'BingAds',
  Dv360 = 'DV360',
  Facebook = 'Facebook',
  GoogleAds = 'GoogleAds',
  Unknown = 'Unknown',
  YouTube = 'YouTube',
}

export enum DispatchModeEnum {
  Off = 'Off',
  UnspentAtProRata = 'UnspentAtProRata',
  UnspentEvenly = 'UnspentEvenly',
}

export enum GroupStatusEnum {
  Active = 'Active',
  Error = 'Error',
  Incomplete = 'Incomplete',
  Unknown = 'Unknown',
}

export enum KpiEnum {
  Clicks = 'Clicks',
  Conversions = 'Conversions',
  Roas = 'ROAS',
  Unknown = 'Unknown',
}

export enum MappingPlatformEnum {
  Dv360 = 'DV360',
  Meta = 'Meta',
  Sa360 = 'SA360',
  Unknown = 'Unknown',
}

export enum MappingStatusEnum {
  Mapped = 'Mapped',
  Unknown = 'Unknown',
  Unmapped = 'Unmapped',
}

/**  used for campaign mappings ( check diff from delivery platform and mapping platform ) */
export enum PlatformEnum {
  Dv360 = 'DV360',
  Derbysoft = 'Derbysoft',
  Facebook = 'Facebook',
  Sa360 = 'SA360',
  Unknown = 'Unknown',
  Wihp = 'WIHP',
}

export enum TacticEnum {
  AdvantagePlus = 'AdvantagePlus',
  Brand = 'Brand',
  DemandGen = 'DemandGen',
  Generic = 'Generic',
  Pmax = 'Pmax',
  Prospecting = 'Prospecting',
  Remarketing = 'Remarketing',
  Unknown = 'Unknown',
}
