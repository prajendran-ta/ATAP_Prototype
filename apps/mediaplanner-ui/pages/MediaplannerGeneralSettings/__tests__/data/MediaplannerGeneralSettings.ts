export const mockMediaPlanGsData = {
  GetMediaPlan: {
    mediaPlanId: 'plan-123',
    generalSettings: {
      advertiserInformation: {
        advertiserId: 'adv-001',
        advertiserBpid: 'BP001',
        region: 'EMEA',
        salesforceOpportunityId: 'SF-001',
        proposalId: 'PROP-001',
        currency: 'USD',
        breakdown: 'SINGLE_PROPERTY',
        planType: 'RENEWAL',
        prefillEnabled: true,
      },
      planInformation: {
        contractBudgetTarget: '100000',
        contractProfitTarget: '20',
        startDate: '01-Jan-2027',
        endDate: '31-Dec-2027',
        planName: 'Test Plan Alpha',
        status: 'DRAFT',
      },
      priceSettings: {
        managementFeePct: '10',
        setupFee: '500',
        metasearchSetupFee: '200',
        metasearchConnectivityFee: '150',
        creativeFee: '300',
        videoCreativeFee: '400',
      },
    },
  },
}

export const mockCurrencies = {
  currencies: [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
  ],
}

export const adminAuthData = {
  user: { id: 1 },
  isAdmin: true,
  isStandard: false,
}

export const standardAuthData = {
  user: { id: 2 },
  isAdmin: false,
  isStandard: true,
}

export const readOnlyAuthData = {
  user: { id: 3 },
  isAdmin: false,
  isStandard: false,
}

// Status = SUBMITTED so isDatesDisabled = true (skips date validation in submit tests)
export const mockMediaPlanGsDataSubmitted = {
  GetMediaPlan: {
    mediaPlanId: 'plan-123',
    generalSettings: {
      advertiserInformation: {
        advertiserId: 'adv-001',
        advertiserBpid: 'BP001',
        region: 'EMEA',
        salesforceOpportunityId: 'SF-001',
        proposalId: 'PROP-001',
        currency: 'USD',
        breakdown: 'SINGLE_PROPERTY',
        planType: 'STANDARD',
        prefillEnabled: false,
      },
      planInformation: {
        contractBudgetTarget: '100000',
        contractProfitTarget: '20',
        startDate: '01-Jan-2027',
        endDate: '31-Dec-2027',
        planName: 'Test Plan Alpha',
        status: 'SUBMITTED',
      },
      priceSettings: {
        managementFeePct: '10',
        setupFee: '500',
        metasearchSetupFee: '200',
        metasearchConnectivityFee: '150',
        creativeFee: '300',
        videoCreativeFee: '400',
      },
    },
  },
}


