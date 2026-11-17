export const adminAuthData = {
  user: { id: 1 },
  isAdmin: true,
  isStandard: false,
  isReadOnly: false,
}

export const standardAuthData = {
  user: { id: 2 },
  isAdmin: false,
  isStandard: true,
  isReadOnly: false,
}

export const readOnlyAuthData = {
  user: { id: 3 },
  isAdmin: false,
  isStandard: false,
  isReadOnly: true,
}

export const mockMediaPlansData = [
  {
    id: 'plan-001',
    planName: 'Alpha Campaign',
    advertiserName: 'Hotel Alpha',
    advertiserBpid: 'BP123',
    contractBudget: '50000',
    currency: 'USD',
    startDate: '01-Jan-2026',
    endDate: '31-Dec-2026',
    planType: 'NEW',
    opportunityId: 'OPP-001',
    proposalId: 'PROP-001',
    status: 'DRAFT',
  },
  {
    id: 'plan-002',
    planName: 'Beta Campaign',
    advertiserName: 'Hotel Beta',
    advertiserBpid: 'BP456',
    contractBudget: '75000',
    currency: 'EUR',
    startDate: '01-Mar-2026',
    endDate: '30-Nov-2026',
    planType: 'RENEWAL',
    opportunityId: 'OPP-002',
    proposalId: 'PROP-002',
    status: 'SUBMITTED',
  },
]

export const mockGetMediaPlansResponse = {
  data: {
    GetMediaPlans: {
      plans: mockMediaPlansData,
      totalCount: 2,
      allPlansCount: 2,
      myPlansCount: 1,
    },
  },
}
