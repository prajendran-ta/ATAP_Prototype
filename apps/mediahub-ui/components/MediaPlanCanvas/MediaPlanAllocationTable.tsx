import React, { useState } from 'react'
import { Icon } from '@amadeus/react-design-factory'
import { campaignFlowData, type MediaPlanTable } from '../CampaignFlow/campaignFlowData'
import { resolveMediaPlan, type ResolvedMediaPlan } from '../CampaignFlow/campaignFlowLogic'
import * as Styled from './MediaPlanCanvas.styled'

const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Default/legacy 12-month list (kept so existing helpers and the Amadeus/closed-won flows that
// don't pass a plan behave exactly as before).
const months = ALL_MONTHS
const parseBudget = (budget: string) => Number(budget.replace(/[$,]/g, ''))
const formatBudget = (budget: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(budget)

// Month column labels + a shared year label for a plan, derived from its start/end dates. Falls
// back to all 12 months when dates are missing/unparseable. When the plan spans a single calendar
// year the year label is that year (e.g. "2027"); across years it is left blank (each column still
// shows just the month name).
const planMonths = (plan?: { startDate?: string; endDate?: string }): { labels: string[]; yearLabel: string } => {
  const start = plan?.startDate ? new Date(plan.startDate) : null
  const end = plan?.endDate ? new Date(plan.endDate) : null
  if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { labels: ALL_MONTHS, yearLabel: '' }
  }
  const labels: string[] = []
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1)
  const last = new Date(end.getFullYear(), end.getMonth(), 1)
  while (cursor <= last && labels.length < 24) {
    labels.push(ALL_MONTHS[cursor.getMonth()])
    cursor.setMonth(cursor.getMonth() + 1)
  }
  const yearLabel = start.getFullYear() === end.getFullYear() ? String(start.getFullYear()) : ''
  return { labels: labels.length > 0 ? labels : ALL_MONTHS, yearLabel }
}

// Even split of a budget across an arbitrary number of months (remainder goes to the first months).
const splitAcross = (total: number, monthCount: number) => {
  const base = Math.floor(total / monthCount)
  const remainder = total % monthCount
  return Array.from({ length: monthCount }, (_, monthIndex) => base + (monthIndex < remainder ? 1 : 0))
}

const splitBudgetAcrossMonths = (annualBudget: number) => splitAcross(annualBudget, months.length)

type BudgetAllocation = { annualBudget: number; monthlyBudgets: number[] }
type TacticAllocation = BudgetAllocation & { name: string }
type PlatformAllocation = BudgetAllocation & { id: string; name: string; tactics: TacticAllocation[] }
type ChannelAllocation = BudgetAllocation & { name: string; platforms: PlatformAllocation[] }

type PlanAllocations = {
  channelAllocations: ChannelAllocation[]
  feesBudget: number
  monthlyFees: number[]
  monthlySpendTotals: number[]
  annualSpendTotal: number
  monthlyTotals: number[]
  annualTotal: number
}

// Computes the full channel/platform/tactic + monthly budget allocation for a media plan table.
// `monthLabels` controls how many months the budgets are split across (defaults to all 12).
const buildAllocations = (mediaPlan: MediaPlanTable, monthLabels: string[] = ALL_MONTHS): PlanAllocations => {
  const months = monthLabels
  const splitBudgetAcrossMonths = (annualBudget: number) => splitAcross(annualBudget, months.length)
  // Built from the active advertiser dataset on each call so dataset swaps are reflected.
  const platformById = new Map(campaignFlowData.platforms.map(platform => [platform.id, platform]))
  const channelAllocations: ChannelAllocation[] = mediaPlan.groups.map(group => {
    const platformsById = new Map<string, PlatformAllocation>()

    group.items.forEach(item => {
      const platforms = item.platforms.flatMap(platformId => {
        const platform = platformById.get(platformId)
        return platform ? [platform] : []
      })
      if (platforms.length === 0) return

      const itemBudget = parseBudget(item.budget)
      const platformBaseBudget = Math.floor(itemBudget / platforms.length)
      const remainder = itemBudget % platforms.length

      platforms.forEach((platform, platformIndex) => {
        const platformAllocation = platformsById.get(platform.id) ?? {
          id: platform.id,
          name: platform.name,
          annualBudget: 0,
          monthlyBudgets: months.map(() => 0),
          tactics: [],
        }
        const tacticBudget = platformBaseBudget + (platformIndex < remainder ? 1 : 0)
        const monthlyBudgets = splitBudgetAcrossMonths(tacticBudget)
        platformAllocation.annualBudget += tacticBudget
        platformAllocation.monthlyBudgets = platformAllocation.monthlyBudgets.map(
          (budget, monthIndex) => budget + monthlyBudgets[monthIndex],
        )
        if (item.tactic !== 'No tactic configured') {
          platformAllocation.tactics.push({ name: item.tactic, annualBudget: tacticBudget, monthlyBudgets })
        }
        platformsById.set(platform.id, platformAllocation)
      })
    })

    const platforms: PlatformAllocation[] = Array.from(platformsById.values())

    return {
      name: group.channel,
      platforms,
      annualBudget: platforms.reduce((total, platform) => total + platform.annualBudget, 0),
      monthlyBudgets: months.map((_, monthIndex) =>
        platforms.reduce((total, platform) => total + platform.monthlyBudgets[monthIndex], 0),
      ),
    }
  })

  const feesBudget = parseBudget(mediaPlan.fees)
  const monthlyFees = splitBudgetAcrossMonths(feesBudget)
  const monthlySpendTotals = months.map((_, monthIndex) =>
    channelAllocations.reduce((total, channel) => total + channel.monthlyBudgets[monthIndex], 0),
  )
  const annualSpendTotal = channelAllocations.reduce((total, channel) => total + channel.annualBudget, 0)
  const monthlyTotals = monthlySpendTotals.map((spend, monthIndex) => spend + monthlyFees[monthIndex])
  const annualTotal = annualSpendTotal + feesBudget

  return {
    channelAllocations,
    feesBudget,
    monthlyFees,
    monthlySpendTotals,
    annualSpendTotal,
    monthlyTotals,
    annualTotal,
  }
}

// Default (2027) allocations, used by platformBudgetAllocation and as the component default.
// A getter (not a module-scope const) so it recomputes from the active advertiser dataset.
const getDefaultAllocations = () => buildAllocations(campaignFlowData.conversation.mediaPlanTable)

export const MEDIA_PLAN_MONTHS = months

export type MonthlyBudget = { month: string; amount: number }

// Per-platform budget allocation from the media plan (annual total + 12-month split).
// Returns zeros for an unknown platform id.
export const platformBudgetAllocation = (
  platformId: string,
  plan: ResolvedMediaPlan = resolveMediaPlan('2027'),
): { annual: number; monthly: MonthlyBudget[] } => {
  const allocations = plan.year === '2027' ? getDefaultAllocations() : buildAllocations(plan.mediaPlanTable)
  const platform = allocations.channelAllocations
    .flatMap(channel => channel.platforms)
    .find(entry => entry.id === platformId)
  const monthlyBudgets = platform?.monthlyBudgets ?? months.map(() => 0)
  return {
    annual: platform?.annualBudget ?? 0,
    monthly: months.map((month, index) => ({ month, amount: monthlyBudgets[index] ?? 0 })),
  }
}

// Shared budget-allocation table. Horizontally scrollable (TableWrap overflow + table min-width),
// used both inside the media plan canvas and inline in the Amadeus Max response.
export const MediaPlanAllocationTable: React.FC<{ plan?: ResolvedMediaPlan }> = ({
  plan = resolveMediaPlan('2027'),
}) => {
  const [expandedChannels, setExpandedChannels] = useState<string[]>([])
  const [expandedPlatforms, setExpandedPlatforms] = useState<string[]>([])
  const { year } = plan
  // Month columns come from the plan's date range (e.g. the US Push plan is Jan–Jun). The 2027
  // default plan has no explicit date range here, so it keeps the full 12-month split.
  const { labels: months, yearLabel } = year === '2027' ? { labels: ALL_MONTHS, yearLabel: '2027' } : planMonths(plan)
  const {
    channelAllocations,
    feesBudget,
    monthlyFees,
    monthlySpendTotals,
    annualSpendTotal,
    monthlyTotals,
    annualTotal,
  } = year === '2027' ? getDefaultAllocations() : buildAllocations(plan.mediaPlanTable, months)

  const toggleValue = (
    values: string[],
    value: string,
    setValues: (updater: (current: string[]) => string[]) => void,
  ) => setValues(current => (current.includes(value) ? current.filter(item => item !== value) : [...current, value]))

  return (
    <Styled.TableWrap>
      <Styled.DataTable aria-label={`Media plan budget allocation for ${/^\d{4}$/.test(year) ? year : plan.mediaPlanName}`}>
        <thead>
          <tr>
            <th scope='col'>Channel / Platform / Tactic</th>
            <th scope='col'>Annual total</th>
            {months.map(month => (
              <th key={month} scope='col'>{yearLabel ? `${month} ${yearLabel}` : month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {channelAllocations.map(channel => {
            const channelExpanded = expandedChannels.includes(channel.name)
            return (
              <React.Fragment key={channel.name}>
                <tr data-row-kind='channel'>
                  <td>
                    <Styled.HierarchyButton
                      type='button'
                      aria-expanded={channelExpanded}
                      aria-label={`${channelExpanded ? 'Collapse' : 'Expand'} ${channel.name} channel`}
                      onClick={() => toggleValue(expandedChannels, channel.name, setExpandedChannels)}
                    >
                      <Styled.DisclosureIcon $expanded={channelExpanded}>
                        <Icon name='caretDown' width={10} height={10} />
                      </Styled.DisclosureIcon>
                      {channel.name}
                    </Styled.HierarchyButton>
                  </td>
                  <td>{formatBudget(channel.annualBudget)}</td>
                  {channel.monthlyBudgets.map((budget, monthIndex) => (
                    <td key={months[monthIndex]}>{formatBudget(budget)}</td>
                  ))}
                </tr>
                {channelExpanded
                  ? channel.platforms.map(platform => {
                      const platformExpanded = expandedPlatforms.includes(platform.id)
                      return (
                        <React.Fragment key={platform.id}>
                          <tr data-row-kind='platform'>
                            <td>
                              {platform.tactics.length > 0 ? (
                                <Styled.HierarchyButton
                                  type='button'
                                  data-depth='1'
                                  aria-expanded={platformExpanded}
                                  aria-label={`${platformExpanded ? 'Collapse' : 'Expand'} ${platform.name} platform`}
                                  onClick={() => toggleValue(expandedPlatforms, platform.id, setExpandedPlatforms)}
                                >
                                  <Styled.DisclosureIcon $expanded={platformExpanded}>
                                    <Icon name='caretDown' width={10} height={10} />
                                  </Styled.DisclosureIcon>
                                  {platform.name}
                                </Styled.HierarchyButton>
                              ) : (
                                <Styled.HierarchyLabel $depth={1}>{platform.name}</Styled.HierarchyLabel>
                              )}
                            </td>
                            <td>{formatBudget(platform.annualBudget)}</td>
                            {platform.monthlyBudgets.map((budget, monthIndex) => (
                              <td key={months[monthIndex]}>{formatBudget(budget)}</td>
                            ))}
                          </tr>
                          {platformExpanded
                            ? platform.tactics.map(tactic => (
                                <tr key={`${platform.id}-${tactic.name}`} data-row-kind='tactic'>
                                  <td>
                                    <Styled.HierarchyLabel $depth={2}>{tactic.name}</Styled.HierarchyLabel>
                                  </td>
                                  <td>{formatBudget(tactic.annualBudget)}</td>
                                  {tactic.monthlyBudgets.map((budget, monthIndex) => (
                                    <td key={months[monthIndex]}>{formatBudget(budget)}</td>
                                  ))}
                                </tr>
                              ))
                            : null}
                        </React.Fragment>
                      )
                    })
                  : null}
              </React.Fragment>
            )
          })}
          <tr data-row-kind='spend-total'>
            <td>Spend total</td>
            <td>{formatBudget(annualSpendTotal)}</td>
            {monthlySpendTotals.map((budget, monthIndex) => (
              <td key={months[monthIndex]}>{formatBudget(budget)}</td>
            ))}
          </tr>
          <tr data-row-kind='fees'>
            <td>Added fees (platform and service)</td>
            <td>{formatBudget(feesBudget)}</td>
            {monthlyFees.map((budget, monthIndex) => (
              <td key={months[monthIndex]}>{formatBudget(budget)}</td>
            ))}
          </tr>
          <tr data-row-kind='total'>
            <td>Total</td>
            <td>{formatBudget(annualTotal)}</td>
            {monthlyTotals.map((budget, monthIndex) => (
              <td key={months[monthIndex]}>{formatBudget(budget)}</td>
            ))}
          </tr>
        </tbody>
      </Styled.DataTable>
    </Styled.TableWrap>
  )
}

export default MediaPlanAllocationTable
