import { isFollowedDemoAdvertiser } from '@mediahub/mediahub-ui/shared/londonerFollowStore'
import { DEMO_ADVERTISERS } from '@mediahub/mediahub-ui/shared/demoAdvertisers'
import {
  RegionEnum,
  StatusEnum,
  PlanTypeEnum,
  BreakdownEnum,
} from '@mediahub/mediaplanner-ui/graphql/generated/mediaplanner-enums'
import type { SelectOption } from '@amadeus/react-design-factory/components/Select'
import type { FilterValue } from '@mediahub/mediahub-ui/components/TableWithFilters/FilterBanner/FilterBanner.d'
import type { TablePaginationConfig } from 'antd/es/table'
import { LONDONER, LONDONER_NAMES } from '@mediahub/mediahub-ui/shared/londonerHotel'

export const mapMediaPlanAdvertiserToOption = (advertiser: AdvertiserQL.Advertiser): SelectOption => ({
  label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
  value: advertiser.advertiserId,
  bpid: advertiser.bpid,
})

export const mapMediaPlanUserToOption = (user: SharedQL.User): SelectOption => ({
  label: user.name,
  value: user.id,
})

export const mediaplannerPlanTypeConfig: Record<string, { label: string }> = {
  [PlanTypeEnum.New]: {
    label: 'New',
  },
  [PlanTypeEnum.Renewal]: {
    label: 'Renewal',
  },
  // 'Amendment' is a prototype-only plan type (not in PlanTypeEnum; Plan Amendment is a future
  // capability per the spec). Carried as a raw string on seeded demo rows for the overview table.
  AMENDMENT: {
    label: 'Amendment',
  },
}

export const mediaplannerStatusConfig: Record<string, { label: string }> = {
  // Salesforce-originated plans start as NEW (not in StatusEnum; carried as a raw string).
  NEW: {
    label: 'New',
  },
  [StatusEnum.Draft]: {
    label: 'Draft',
  },
  [StatusEnum.Submitted]: {
    label: 'Submitted',
  },
  [StatusEnum.ClosedWon]: {
    label: 'Closed Won',
  },
  [StatusEnum.ClosedLost]: {
    label: 'Closed Lost',
  },
  [StatusEnum.Archived]: {
    label: 'Archived',
  },
}

/**
 * The single plan status to show in a wizard step header. Status belongs to the plan, so it is the
 * same across all four steps — the only variation is the create flow:
 *   - Step 1 of a brand-new, unsaved plan (no saved status) → NEW ("New Media Plan").
 *   - Step 2 onward (or any step once past Step 1) with no saved status yet → DRAFT.
 *   - An existing/opened plan → its real saved status on every step.
 * `savedStatus` is the plan's persisted status (undefined until the plan is saved). `isFirstStep`
 * marks the General Settings step, where an unsaved plan still reads as NEW.
 */
export const resolveHeaderStatus = (savedStatus: string | null | undefined, isFirstStep: boolean): string =>
  savedStatus ?? (isFirstStep ? 'NEW' : StatusEnum.Draft)

/** Solid status-chip tone per plan status, shared by the overview table and all wizard headers. */
export type StatusChipTone = 'new' | 'draft' | 'submitted' | 'won' | 'lost' | 'archived'

export const mediaplannerStatusChipTone: Record<string, StatusChipTone> = {
  NEW: 'new',
  [StatusEnum.Draft]: 'draft',
  [StatusEnum.Submitted]: 'submitted',
  [StatusEnum.ClosedWon]: 'won',
  [StatusEnum.ClosedLost]: 'lost',
  [StatusEnum.Archived]: 'archived',
}

export const mediaplannerRegionConfig: Record<string, { label: string }> = {
  [RegionEnum.Aspac]: {
    label: 'ASPAC',
  },
  [RegionEnum.Noram]: {
    label: 'NORAM',
  },
  [RegionEnum.Latam]: {
    label: 'LATAM',
  },
  [RegionEnum.Emea]: {
    label: 'EMEA',
  },
}

export const mediaplannerBreakdownConfig: Record<string, { label: string }> = {
  [BreakdownEnum.SingleProperty]: {
    label: 'Single Property',
  },
  [BreakdownEnum.MultiProperty]: {
    label: 'Multi Property',
  },
}

export function generateOptions<T extends { label: string; value?: string }>(
  config: Record<string, T>,
  includeKeyAsValue = false,
): { label: string; value: string }[] {
  return Object.entries(config).map(([key, { label, value }]) => ({
    label,
    value: value ?? (includeKeyAsValue ? key : ''),
  }))
}

export const formatMediaPlanUsers = (users: SharedQL.User[]): SelectOption[] => users.map(mapMediaPlanUserToOption)

/**
 * Prototype-only: Closed Won plans available to amend, keyed by advertiser name. In the amendment
 * flow (Step 1) the Plan Name field becomes a dropdown of the selected advertiser's Closed Won
 * plans. Replace with a real query (status = CLOSED_WON for the advertiser) when wired to backend.
 */
const CLOSED_WON_PLANS_BY_ADVERTISER: Record<string, string[]> = {
  'The Estate Yountville': [
    'The Estate Yountville — 2026 (Closed Won)',
    'The Estate Yountville — Q4 2026 Push (Closed Won)',
  ],
  '1 Hotel Brooklyn Bridge': [
    '1 Hotel Brooklyn Bridge — 2026 (Closed Won)',
    '1 Hotel Brooklyn Bridge — Summer 2026 (Closed Won)',
  ],
  'Grand Harbor Hotel': ['Grand Harbor Hotel — 2026 (Closed Won)'],
}

const DEFAULT_CLOSED_WON_PLANS = ['2026 Annual Plan (Closed Won)', '2026 H2 Campaign (Closed Won)']

/** Closed Won plan-name options for the amendment dropdown, for a given advertiser. */
export const closedWonPlanOptions = (advertiserName?: string): { label: string; value: string }[] => {
  const names = (advertiserName && CLOSED_WON_PLANS_BY_ADVERTISER[advertiserName]) || DEFAULT_CLOSED_WON_PLANS
  return names.map(name => ({ label: name, value: name }))
}

export function buildPlanNameOptionsQueryFn(
  refetch: (vars: MediaplannerQL.QueryGetMediaPlansArgs) => Promise<{
    data?: Pick<MediaplannerQL.Query, 'GetMediaPlans'>
  }>,
) {
  return async (search: string, pagination?: { limit: number; offset: number }): Promise<SelectOption[]> => {
    const query = (search ?? '').trim()

    let plans: NonNullable<Pick<MediaplannerQL.Query, 'GetMediaPlans'>['GetMediaPlans']>['plans'] = []
    try {
      const { data } = await refetch({
        filter: {
          search: query || undefined,
          paging: { limit: pagination?.limit, offset: pagination?.offset ?? 0 },
        },
      })
      plans = data?.GetMediaPlans?.plans ?? []
    } catch {
      plans = []
    }
    const seen = new Set<string | number>()
    const options: SelectOption[] = []

    for (const plan of plans) {
      if (!seen.has(plan.id)) {
        seen.add(plan.id)
        options.push({
          label: plan.planName,
          value: plan.id,
        })
      }
    }

    return options
  }
}

/**
 * Prototype-only seeded overview rows, all in NEW status (as if just arrived from Salesforce):
 * 1 Londoner demo plan + 10 demo-advertiser plans (alternating New / Renewal) + the 10 original
 * prototype rows (4 New, 4 Renewal, 2 Amendment) = 21 rows. Prepended to the live backend results
 * in the overview table so the different plan types / the NEW status chip can be demoed. The
 * Londoner and demo-advertiser rows use id 'sf-plan-<key>' so each opens its own mocked Salesforce
 * plan (see mockSalesforcePlans.ts). The original seed-new-3 / seed-new-6 rows (11 Howard, 1 Hotel
 * Brooklyn Bridge, BP-900003 / BP-900006) predate the demo registry and are intentionally kept as
 * they are. Remove when the real Salesforce intake seeds the list.
 */
const seededNewPlan = (
  index: number,
  planName: string,
  advertiserName: string,
  advertiserBpid: string,
  planType: string,
  contractBudget: number,
  overrides?: Partial<{ id: string; currency: string; startDate: string; endDate: string }>,
): MediaplannerQL.MediaPlan =>
  ({
    id: `seed-new-${index}`,
    status: 'NEW',
    planName,
    advertiserName,
    advertiserBpid,
    contractBudget: String(contractBudget),
    currency: 'USD',
    startDate: '01-Jan-2027',
    endDate: '31-Dec-2027',
    planType,
    ...overrides,
  }) as unknown as MediaplannerQL.MediaPlan

const DISPLAY_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** ISO 'YYYY-MM-DD' -> 'DD-Mon-YYYY' (matches the display strings on the other seeded rows). */
const isoToDisplayDate = (iso: string): string => {
  const [year, month, day] = iso.split('-')
  return `${day}-${DISPLAY_MONTHS[Number(month) - 1]}-${year}`
}

export const SEEDED_NEW_PLANS: MediaplannerQL.MediaPlan[] = [
  // The Londoner Hotel demo plan (own mocked Salesforce plan: sf-plan-londoner)
  seededNewPlan(
    0,
    LONDONER_NAMES.mediaPlan,
    LONDONER.name,
    LONDONER.bpid,
    PlanTypeEnum.New,
    LONDONER.totalBudget,
    {
      id: 'sf-plan-londoner',
      currency: LONDONER.currency,
      startDate: LONDONER.startDateDisplay,
      endDate: LONDONER.endDateDisplay,
    },
  ),
  // The 10 demo advertisers (shared/demoAdvertisers.ts), each opening its own mocked Salesforce plan
  // (sf-plan-<key>). Plan type alternates New / Renewal by index.
  ...DEMO_ADVERTISERS.map((adv, index) =>
    seededNewPlan(
      0,
      adv.mediaPlanName,
      adv.name,
      adv.bpid,
      index % 2 === 0 ? PlanTypeEnum.New : PlanTypeEnum.Renewal,
      adv.totalBudget,
      {
        id: `sf-plan-${adv.key}`,
        currency: adv.currency,
        startDate: isoToDisplayDate(adv.startDate),
        endDate: isoToDisplayDate(adv.endDate),
      },
    ),
  ),
  // 4 New
  seededNewPlan(1, 'The Estate Yountville — 2027', 'The Estate Yountville', 'BP-900001', PlanTypeEnum.New, 500000),
  seededNewPlan(2, 'Grand Harbor Hotel — 2027', 'Grand Harbor Hotel', 'BP-900002', PlanTypeEnum.New, 350000),
  seededNewPlan(
    3,
    '11 Howard New York — 2027',
    '11 Howard New York a Member of Design Hotels',
    'BP-900003',
    PlanTypeEnum.New,
    420000,
  ),
  seededNewPlan(4, 'Alila Ventana Big Sur — 2027', 'Alila Ventana Big Sur', 'BP-900004', PlanTypeEnum.New, 610000),
  // 4 Renewal
  seededNewPlan(
    5,
    '1926 Heritage Hotel Penang — 2027',
    '1926 Heritage Hotel Penang by The Unlimited Collection',
    'BP-900005',
    PlanTypeEnum.Renewal,
    280000,
  ),
  seededNewPlan(
    6,
    '1 Hotel Brooklyn Bridge — 2027',
    '1 Hotel Brooklyn Bridge',
    'BP-900006',
    PlanTypeEnum.Renewal,
    540000,
  ),
  seededNewPlan(7, 'Hotel Nova — 2027', 'Hotel Nova', 'BP-900007', PlanTypeEnum.Renewal, 190000),
  seededNewPlan(
    8,
    'The Hoxton Downtown LA — 2027',
    'The Hoxton Downtown LA',
    'BP-900008',
    PlanTypeEnum.Renewal,
    460000,
  ),
  // 2 Amendment
  seededNewPlan(
    9,
    'The Estate Yountville — 2027 (Amendment)',
    'The Estate Yountville',
    'BP-900001',
    'AMENDMENT',
    525000,
  ),
  seededNewPlan(
    10,
    '1 Hotel Brooklyn Bridge — 2027 (Amendment)',
    '1 Hotel Brooklyn Bridge',
    'BP-900006',
    'AMENDMENT',
    560000,
  ),
]

// Apply the overview table's status/planType/search filters to the seeded rows so they behave like
// real rows under filtering. (advertiser/plan-name multi-selects target backend ids, so seeded rows
// aren't filtered by those — fine for a prototype.)
const filterSeededPlans = (filters?: Record<string, FilterValue>): MediaplannerQL.MediaPlan[] => {
  const rawStatus = filters?.status as string[] | undefined
  const rawPlanType = filters?.planType as string[] | undefined
  const search = typeof filters?.search === 'string' ? filters.search.trim().toLowerCase() : ''

  return SEEDED_NEW_PLANS.filter(plan => {
    if (Array.isArray(rawStatus) && rawStatus.length > 0 && !rawStatus.includes(String(plan.status))) return false
    if (Array.isArray(rawPlanType) && rawPlanType.length > 0 && !rawPlanType.includes(String(plan.planType)))
      return false
    if (search && !`${plan.planName} ${plan.advertiserName} ${plan.advertiserBpid}`.toLowerCase().includes(search)) {
      return false
    }
    return true
  })
}

export function buildMediaPlanQueryFn(
  refetch: (vars: {
    filter: MediaplannerQL.MediaPlanFilter
  }) => Promise<{ data?: Pick<MediaplannerQL.Query, 'GetMediaPlans'> }>,
  setToggleTotals: (totals: { allPlansCount: number; myPlansCount: number }) => void,
) {
  return async (
    filters?: Record<string, FilterValue>,
    pagination?: TablePaginationConfig,
  ): Promise<{ data: MediaplannerQL.MediaPlan[]; total: number }> => {
    const rawIds = filters?.ids as string[] | undefined
    const advertiserId = Array.isArray(rawIds) && rawIds.length > 0 ? rawIds : undefined

    const rawStatus = filters?.status as string[] | undefined
    const statusFilter: StatusEnum[] | undefined =
      Array.isArray(rawStatus) && rawStatus.length > 0 ? (rawStatus as StatusEnum[]) : undefined

    const rawPlanType = filters?.planType as PlanTypeEnum[] | undefined
    const planType: PlanTypeEnum[] | undefined =
      Array.isArray(rawPlanType) && rawPlanType.length > 0 ? (rawPlanType as PlanTypeEnum[]) : undefined

    const filter: MediaplannerQL.MediaPlanFilter = {
      advertiserId,
      planName:
        Array.isArray(filters?.planIds) && (filters.planIds as string[]).length > 0
          ? (filters.planIds as string[])
          : undefined,
      myPlansOnly: filters?.myPlansOnly === true,
      status: statusFilter,
      planType: planType,

      search: typeof filters?.search === 'string' ? filters.search.trim() : undefined,
      paging: {
        limit: pagination?.pageSize ?? 10,
        offset: ((pagination?.current ?? 1) - 1) * (pagination?.pageSize ?? 10),
      },
    }

    // Tolerate backend failures (e.g. a 401 while navigating): fall back to no backend plans so
    // the page still renders the seeded prototype plans instead of throwing an uncaught error.
    let result: Pick<MediaplannerQL.Query, 'GetMediaPlans'>['GetMediaPlans'] | undefined
    try {
      const { data } = await refetch({ filter })
      result = data?.GetMediaPlans
    } catch {
      result = undefined
    }

    // Prototype: prepend the seeded NEW plans (filtered the same way) at the top of the first page.
    // "My Plans" shows only the user's own plans, so skip the seeded rows there.
    // "My Plans" excludes the seeded prototype rows, EXCEPT the Londoner's and the demo advertisers'
    // plans while the user follows that advertiser.
    const seeded =
      filters?.myPlansOnly === true
        ? filterSeededPlans(filters).filter(plan => isFollowedDemoAdvertiser(plan.advertiserBpid))
        : filterSeededPlans(filters)
    const isFirstPage = (pagination?.current ?? 1) === 1
    const seededForPage = isFirstPage ? seeded : []

    setToggleTotals({
      allPlansCount: (result?.allPlansCount ?? 0) + seeded.length,
      myPlansCount: (result?.myPlansCount ?? 0) + SEEDED_NEW_PLANS.filter(plan => isFollowedDemoAdvertiser(plan.advertiserBpid)).length,
    })

    return {
      data: [...seededForPage, ...((result?.plans ?? []) as MediaplannerQL.MediaPlan[])],
      total: (result?.totalCount ?? 0) + seeded.length,
    }
  }
}
