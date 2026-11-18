/**
 * Mocked Audience Rules data for the prototype — there is no backend for this
 * module yet, so the list is seeded here and filtered/paginated client-side.
 */
export interface MockRule {
  id: string
  ruleName: string
  travelIntentCategory: string
  usedInAudiences: number
  criteriaRows?: import('./ruleCriteria').CriteriaRow[]
}

export const TRAVEL_INTENT_CATEGORY_OPTIONS = [
  { label: 'Airline', value: 'AIRLINE' },
  { label: 'Hotel', value: 'HOTEL' },
  { label: 'Destination', value: 'DESTINATION' },
  { label: 'Cruise', value: 'CRUISE' },
  { label: 'Train', value: 'TRAIN' },
  { label: 'Car Rental', value: 'CAR_RENTAL' },
  { label: 'Bus', value: 'BUS' },
  { label: 'Package', value: 'PACKAGE' },
  { label: 'All', value: 'ALL' },
  { label: 'Others', value: 'OTHERS' },
]

export const TRAVEL_INTENT_CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  TRAVEL_INTENT_CATEGORY_OPTIONS.map(o => [o.value, o.label]),
)

export const MOCK_RULES: MockRule[] = [
  { id: 'rule-001', ruleName: 'High-Value Corporate Bookers', travelIntentCategory: 'AIRLINE', usedInAudiences: 4 },
  { id: 'rule-002', ruleName: 'Weekend Getaway Seekers', travelIntentCategory: 'DESTINATION', usedInAudiences: 2 },
  { id: 'rule-003', ruleName: 'Family Suite Browsers', travelIntentCategory: 'HOTEL', usedInAudiences: 3 },
  { id: 'rule-004', ruleName: '5-Star Repeat Guests', travelIntentCategory: 'PACKAGE', usedInAudiences: 1 },
  { id: 'rule-005', ruleName: 'Flash Sale Responders', travelIntentCategory: 'ALL', usedInAudiences: 5 },
  { id: 'rule-006', ruleName: 'Conference & Meeting Planners', travelIntentCategory: 'TRAIN', usedInAudiences: 2 },
  { id: 'rule-007', ruleName: 'Frequent Business Extenders', travelIntentCategory: 'CAR_RENTAL', usedInAudiences: 0 },
  { id: 'rule-008', ruleName: 'Beach Resort Explorers', travelIntentCategory: 'CRUISE', usedInAudiences: 6 },
  // The Londoner Hotel rules. usedInAudiences matches the Londoner audiences (aud-ln001..007) that reference them.
  {
    id: 'rule-009',
    ruleName: 'London Weekend Breakers',
    travelIntentCategory: 'DESTINATION',
    usedInAudiences: 2, // aud-ln001, aud-ln003
    criteriaRows: [
      { id: 'rule-009-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
      { id: 'rule-009-c2', type: 'DESTINATION', values: ['LONDON'] },
      { id: 'rule-009-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 3 },
    ],
  },
  {
    id: 'rule-010',
    ruleName: 'Business Travellers - Central London',
    travelIntentCategory: 'HOTEL',
    usedInAudiences: 1, // aud-ln005
    criteriaRows: [
      { id: 'rule-010-c1', type: 'DESTINATION', values: ['LONDON'] },
      { id: 'rule-010-c2', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'VISITED'] },
      { id: 'rule-010-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'EQ', numberValue: 1 },
    ],
  },
  {
    id: 'rule-011',
    ruleName: 'US & Gulf Luxury Long-Haul Visitors',
    travelIntentCategory: 'ALL',
    usedInAudiences: 1, // aud-ln004
    criteriaRows: [
      { id: 'rule-011-c1', type: 'ORIGIN', values: ['UNITED_STATES', 'UNITED_ARAB_EMIRATES', 'SAUDI_ARABIA', 'QATAR'] },
      { id: 'rule-011-c2', type: 'DESTINATION', values: ['LONDON'] },
      { id: 'rule-011-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 4 },
    ],
  },
  {
    id: 'rule-012',
    ruleName: 'Abandoned Booking Re-engagers',
    travelIntentCategory: 'HOTEL',
    usedInAudiences: 1, // aud-ln002
    criteriaRows: [{ id: 'rule-012-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['ABANDONED_CARTS'] }],
  },
  {
    id: 'rule-013',
    ruleName: 'Afternoon Tea & Theatre Package Seekers',
    travelIntentCategory: 'PACKAGE',
    usedInAudiences: 1, // aud-ln003
    criteriaRows: [
      { id: 'rule-013-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
      { id: 'rule-013-c2', type: 'DESTINATION', values: ['LONDON'] },
      { id: 'rule-013-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 2 },
    ],
  },
  // Reusable hotel rules shared by the 19 demo advertisers (see generated audiences in
  // pages/Audience/mockAudiences.ts, ids aud-<key>-NN). usedInAudiences = number of those audiences
  // that reference the rule (19 advertisers; 4/5/6 audiences each by index -> 19 / 12 / 6 per template).
  {
    id: 'rule-014',
    ruleName: 'Resort & Spa Leisure Seekers',
    travelIntentCategory: 'HOTEL',
    usedInAudiences: 19, // "<short> website visitors 30d" x19
    criteriaRows: [
      { id: 'rule-014-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'VISITED'] },
      { id: 'rule-014-c2', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 3 },
      { id: 'rule-014-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 2 },
    ],
  },
  {
    id: 'rule-015',
    ruleName: 'Long-Haul Trans-Pacific Visitors',
    travelIntentCategory: 'ALL',
    usedInAudiences: 19, // "Long-haul visitors to <market>" x19
    criteriaRows: [
      { id: 'rule-015-c1', type: 'ORIGIN', values: ['AUSTRALIA', 'JAPAN', 'SOUTH_KOREA', 'SINGAPORE'] },
      { id: 'rule-015-c2', type: 'ORIGIN', values: ['CANADA', 'UNITED_STATES'] },
      { id: 'rule-015-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 5 },
    ],
  },
  {
    id: 'rule-016',
    ruleName: 'City Break Weekenders',
    travelIntentCategory: 'DESTINATION',
    usedInAudiences: 19, // "<market> weekend breakers" x19
    criteriaRows: [
      { id: 'rule-016-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
      { id: 'rule-016-c2', type: 'DESTINATION', values: ['NEW_YORK', 'BARCELONA', 'SYDNEY', 'MELBOURNE'] },
      { id: 'rule-016-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 3 },
    ],
  },
  {
    id: 'rule-017',
    ruleName: 'Business & Conference Travellers',
    travelIntentCategory: 'HOTEL',
    usedInAudiences: 12, // "Business & conference travellers - <market>" on advertisers with 5+ audiences
    criteriaRows: [
      { id: 'rule-017-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'BOOKED'] },
      { id: 'rule-017-c2', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'EQ', numberValue: 1 },
      { id: 'rule-017-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 4 },
    ],
  },
  {
    id: 'rule-018',
    ruleName: 'Family Holiday Planners',
    travelIntentCategory: 'PACKAGE',
    usedInAudiences: 6, // "<short> family holiday planners" on advertisers with 6 audiences
    criteriaRows: [
      { id: 'rule-018-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'ABANDONED_CARTS'] },
      { id: 'rule-018-c2', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 3 },
      { id: 'rule-018-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 5 },
    ],
  },
  {
    id: 'rule-019',
    ruleName: 'Last-Minute Deal Seekers',
    travelIntentCategory: 'ALL',
    usedInAudiences: 6, // the same 6 "family holiday planners" audiences (they carry rule-018 + rule-019)
    criteriaRows: [
      { id: 'rule-019-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['VISITED', 'ABANDONED_CARTS'] },
      { id: 'rule-019-c2', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 2 },
    ],
  },
]

export function getMockRule(ruleId?: string): MockRule | undefined {
  if (!ruleId) return undefined
  return MOCK_RULES.find(rule => rule.id === ruleId)
}
