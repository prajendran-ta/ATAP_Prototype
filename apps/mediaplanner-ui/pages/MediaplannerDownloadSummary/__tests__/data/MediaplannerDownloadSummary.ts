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

export const mockMediaPlanBdData = {
  GetMediaPlan: {
    generalSettings: {
      advertiserInformation: {
        advertiserId: 'adv-001',
        advertiserBpid: 'BP001',
        currency: 'USD',
        region: 'EMEA',
        salesforceOpportunityId: 'SF-001',
        proposalId: 'PROP-001',
        breakdown: 'SINGLE_PROPERTY',
        planType: 'NEW',
      },
      planInformation: {
        contractBudgetTarget: '100000',
        contractProfitTarget: '20',
        startDate: '01-Jan-2026',
        endDate: '28-Feb-2026',
        planName: 'Alpha Campaign',
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
    budgetDistribution: {
      mediaPlanId: 'plan-001',
      spendBudget: 90000,
      contractMarginAmt: 10000,
      contractMarginPct: 10,
      actualMarginPct: 11,
      spendBudgetDistribution: [
        { month: '01-Jan-2026', spendPct: 50 },
        { month: '01-Feb-2026', spendPct: 50 },
      ],
      allocations: [
        {
          channel: 'DISPLAY',
          budgetAmount: 90000,
          budgetPct: 100,
          tactics: [
            {
              calculationMode: 'CPM',
              platform: 'DV360',
              platforms: null,
              tactic: 'DISPLAY_STANDARD',
              spendAmount: 90000,
              spendPct: 100,
              pctOfExpected: 95,
              cpmAmount: 2.5,
              marginAmount: 9000,
              marginPct: 10,
              platformCost: 2.0,
            },
          ],
        },
      ],
    },
  },
}

export const mockAdvertiserDetails = {
  advertisers: {
    advertisers: [{ advertiserName: 'Hotel Alpha Ltd', bpid: 'ALPHA001', advertiserId: 123 }],
  },
}
