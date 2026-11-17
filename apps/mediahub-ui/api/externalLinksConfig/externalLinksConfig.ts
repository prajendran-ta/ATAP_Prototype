import { currentEnv } from '@mediahub/mediahub-ui/api/apiConfig'
import { EnvironmentConfig, ExternalLinks } from './externalLinksConfig.d'

const singlePropertyURL =
  'https://amadeusworkplace.sharepoint.com/:x:/r/sites/DigitalMediaDeliveryGlobalTeam/_layouts/15/Doc.aspx?sourcedoc=%7B0F2E776A-401A-4073-8D5B-3CDD228828C7%7D&file=MEDIA%20PLANNING%20TEMPLATE%20-%20Single%20Property%20SMA%20-%20Americas%20-%20August%202025.xlsm&action=default&mobileredirect=true'
const multiPropertyURL =
  'https://amadeusworkplace.sharepoint.com/:x:/r/sites/DigitalMediaDeliveryGlobalTeam/_layouts/15/Doc.aspx?sourcedoc=%7BAA27F35F-9F68-4F46-9BE5-2A405C84CFC6%7D&file=MEDIA%20PLANNING%20TEMPLATE%20-%20Multi%20Property%20SMA%20-%20Americas%20-%20%20August%202025.xlsm&action=default&mobileredirect=true'
const internationalURL =
  'https://amadeusworkplace.sharepoint.com/:x:/s/HOS_DC_WEMEA_MediaTeam/IQCYwxSAuDwMSIqiFVN7g-RjAR_gUDX1J2Fv0TiqCbrPciE?e=PEbm6G'

export const externalLinksConfig: Record<EnvironmentConfig, ExternalLinks> = {
  production: {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.travelaudience.com',
      insite: 'https://insite.travelclick.com/dmp/logon.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://emc.travelclick.com/dmp/logon.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://identity.travelclick.com/tc-idp/login?',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite.travelclick.com/dmp/logon.cfm',
    },
    userManagement: '/user-management',
  },
  uat: {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.uat.travelaudience.com',
      insite: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.uat.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.uat.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  'uat-1': {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.uat.travelaudience.com',
      insite: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.uat.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.uat.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  'uat-2': {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.uat-2.travelaudience.com',
      insite: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.uat-2.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.uat-2.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-t2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  staging: {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.staging.travelaudience.com',
      insite: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.staging.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.staging.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  'staging-1': {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.staging.travelaudience.com',
      insite: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.staging.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.staging.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  'staging-2': {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.staging-2.travelaudience.com',
      insite: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.staging-2.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.staging-2.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
  'staging-3': {
    advertisers: '/advertisers',
    mediaPlanning: {
      singleProperty: singlePropertyURL,
      multiProperty: multiPropertyURL,
      international: internationalURL,
      mediaplanner: '/mediaplanner/',
    },
    campaignManagement: {
      cmt: 'https://cmt.staging-2.travelaudience.com',
      insite: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
      adCopies: {
        americas:
          'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/Ea2flLvWmPNIkRpwmv6BT4UBg6iPns4Lamaw7s0bhdMmwA?e=kvJvrB',
        emea: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EYuX6UBc0zhHlj5uM3OSXVwBNaY9nArbWQXw6BCwbU01Kg?e=G7Up7y',
        apac: 'https://amadeusworkplace.sharepoint.com/:x:/s/DigitalMediaDeliveryGlobalTeam/EbdCV6mQbvBAmmdQXLt0wDsBgbUyZ9IGuDKuCime9s0Ofw?e=X3iaZb',
      },
    },
    campaignOptimization: {
      pacingTool:
        'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/fd3c546d-d92f-4320-818b-ac2a7667b0dd/3958066ae6504da1e287?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
      oba: '/oba/',
    },
    reports: {
      dmic: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/supplier/index.cfm',
      roas: 'https://app.powerbi.com/groups/5701d67c-5946-473c-859a-2c2d9ba55fe6/reports/42bb1c87-a326-4a47-8f1f-2cb3aed1ed60/ReportSection?ctid=b3f4f7c2-72ce-4192-aba4-d6c7719b5766&experience=power-bi',
    },
    marketInsights: {
      tiPortal: 'https://hotelligence360-stage.travelclick.com/homepage/',
      ami: 'https://analytics.amadeus.net/',
      googleTravelAnalytics: 'https://partnerdash.google.com/apps/flightsreportingcenter/home?a=287780265',
    },
    dataManagement: {
      segmentation: 'https://cmt.staging-2.travelaudience.com/site/advertiser/accounts',
      datapartners: 'https://cmt.staging-2.travelaudience.com/site/datapartners',
    },
    pricingBilling: {
      invoicing: 'https://insite-d2.travelclick.com/dmp/logon.cfm?nextpage=/dmp/emp/index.cfm',
    },
    userManagement: '/user-management',
  },
}

export const externalLinks = externalLinksConfig[currentEnv] ?? externalLinksConfig.production
