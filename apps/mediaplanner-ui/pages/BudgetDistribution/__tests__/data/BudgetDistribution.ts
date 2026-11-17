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

// Minimal BD response — no allocations, no distribution period (dates undefined)
// Used for page-structure tests where date-driven rendering is not relevant
export const mockBdDataEmpty = {
  GetMediaPlan: {
    generalSettings: {
      advertiserInformation: {
        advertiserId: undefined,
        advertiserBpid: undefined,
        region: 'EMEA',
        currency: 'USD',
      },
      planInformation: {
        startDate: undefined,
        endDate: undefined,
        contractBudgetTarget: '0',
        contractProfitTarget: '0',
      },
      priceSettings: {
        managementFeePct: '10',
        setupFee: '500',
        metasearchSetupFee: '200',
        creativeFee: '300',
        videoCreativeFee: '400',
      },
    },
    budgetDistribution: {
      allocations: [],
      spendBudgetDistribution: [],
    },
  },
}

// BD response with a valid distribution period (Jan-Mar 2025)
export const mockBdDataWithDates = {
  GetMediaPlan: {
    generalSettings: {
      advertiserInformation: {
        advertiserId: 'adv-001',
        advertiserBpid: 'BP001',
        region: 'EMEA',
        currency: 'USD',
        prefillEnabled: true,
      },
      planInformation: {
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        contractBudgetTarget: '100000',
        contractProfitTarget: '20',
      },
      priceSettings: {
        managementFeePct: '10',
        setupFee: '500',
        metasearchSetupFee: '200',
        creativeFee: '300',
        videoCreativeFee: '400',
      },
    },
    budgetDistribution: {
      allocations: [
        {
          channel: 'SOCIAL',
          tactics: [
            {
              platform: 'FACEBOOK_IG',
              tactic: 'PROSPECTING',
              spendAmount: 2000,
              marginPct: 50,
            },
          ],
        },
      ],
      spendBudgetDistribution: [],
    },
  },
}
