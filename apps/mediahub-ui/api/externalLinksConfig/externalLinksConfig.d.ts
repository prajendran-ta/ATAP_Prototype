export type EnvironmentConfig =
  | 'staging'
  | 'staging-1'
  | 'staging-2'
  | 'staging-3'
  | 'uat'
  | 'uat-1'
  | 'uat-2'
  | 'production'

export interface ExternalLinks {
  advertisers: string
  mediaPlanning: {
    singleProperty: string
    multiProperty: string
    international: string
    mediaplanner: string
  }
  campaignManagement: {
    cmt: string
    insite: string
    adCopies: {
      americas: string
      emea: string
      apac: string
    }
  }
  campaignOptimization: {
    pacingTool: string
    oba: string
  }
  reports: {
    dmic: string
    roas: string
  }
  marketInsights: {
    tiPortal: string
    ami: string
    googleTravelAnalytics: string
  }
  dataManagement: {
    segmentation: string
    datapartners: string
  }
  pricingBilling: {
    invoicing: string
  }
  userManagement: string
}
