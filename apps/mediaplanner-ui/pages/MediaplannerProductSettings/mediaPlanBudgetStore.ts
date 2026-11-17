/**
 * Lightweight, dependency-free, module-level budget store.
 *
 * Step 2 (Product Settings) publishes the current budget model into this store,
 * keyed by planId, and Step 3 (Budget Distribution) subscribes to it via the
 * `useBudgetModel` hook. There is no backend for this prototype data, so the
 * store is the bridge that carries Step 2's categories / standalone entries into
 * Step 3's read-only vertical navigation.
 */
import React from 'react'

export interface SharedBudgetCategory {
  id: string
  name: string
  activity: string
  budgetPct: number
  budgetValue: number
  memberBpids: string[]
}

export interface SharedStandaloneEntry {
  bpid: string
  name: string
  budgetPct: number
  budgetValue: number
}

export interface SharedBudgetModel {
  currency: string
  categories: SharedBudgetCategory[]
  standalone: SharedStandaloneEntry[]
  /** bpid -> display name, for resolving member names */
  propertyNames: Record<string, string>
}

export interface SharedBudgetGroupSpendStats {
  spendBudget: number
  spendPct: number
}

/**
 * The store is keyed by planId + productId so each product keeps its OWN budget
 * groups (Step 2's per-product property split flows to Step 3's product tab).
 * Undefined ids fall back to 'default'.
 */
const keyOf = (planId: string | undefined, productId: string | undefined): string =>
  `${planId ?? 'default'}::${productId ?? 'default'}`

const store = new Map<string, SharedBudgetModel>()
const completedStore = new Map<string, Set<string>>()
const spendStatsStore = new Map<string, Map<string, SharedBudgetGroupSpendStats>>()
// Emulated Salesforce scenario id selected in Step 2 (prototype), keyed by planId. Persisted here
// so Step 3/4 resolve the SAME plan (and the SAME product ids) Step 2 used — otherwise their store
// reads miss and they fall back to the default mock plan, dropping Step 2's edits. Keyed by planId
// ('default' when none) because the scenario applies to the whole plan, not a single product.
const scenarioStore = new Map<string, string>()
const listeners = new Set<() => void>()

const notify = (): void => {
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Store a shallow copy of the model and notify subscribers. */
export function setBudgetModel(
  planId: string | undefined,
  productId: string | undefined,
  model: SharedBudgetModel,
): void {
  store.set(keyOf(planId, productId), {
    currency: model.currency,
    categories: model.categories.map(c => ({ ...c, memberBpids: [...c.memberBpids] })),
    standalone: model.standalone.map(s => ({ ...s })),
    propertyNames: { ...model.propertyNames },
  })
  notify()
}

export function getBudgetModel(
  planId: string | undefined,
  productId: string | undefined,
): SharedBudgetModel | undefined {
  return store.get(keyOf(planId, productId))
}

/** Persist the Step 2 scenario-emulator selection for a plan so later steps resolve the same plan. */
export function setPlanScenarioId(planId: string | undefined, scenarioId: string): void {
  scenarioStore.set(planId ?? 'default', scenarioId)
  notify()
}

export function getPlanScenarioId(planId: string | undefined): string | undefined {
  return scenarioStore.get(planId ?? 'default')
}

export function setCompletedBudgetGroupKeys(
  planId: string | undefined,
  productId: string | undefined,
  completedKeys: Set<string>,
): void {
  completedStore.set(keyOf(planId, productId), new Set(completedKeys))
}

export function getCompletedBudgetGroupKeys(
  planId: string | undefined,
  productId: string | undefined,
): Set<string> {
  return new Set(completedStore.get(keyOf(planId, productId)) ?? [])
}

export function setBudgetGroupSpendStats(
  planId: string | undefined,
  productId: string | undefined,
  groupKey: string,
  stats: SharedBudgetGroupSpendStats,
): void {
  const key = keyOf(planId, productId)
  const productStats = new Map(spendStatsStore.get(key) ?? [])
  productStats.set(groupKey, { ...stats })
  spendStatsStore.set(key, productStats)
}

export function getBudgetGroupSpendStats(
  planId: string | undefined,
  productId: string | undefined,
): Map<string, SharedBudgetGroupSpendStats> {
  return new Map(
    [...(spendStatsStore.get(keyOf(planId, productId)) ?? new Map())].map(([groupKey, stats]) => [groupKey, { ...stats }]),
  )
}

/**
 * React hook that re-renders when the model for the given planId changes.
 * Uses useSyncExternalStore so subscribers stay consistent across renders.
 */
export function useBudgetModel(
  planId: string | undefined,
  productId: string | undefined,
): SharedBudgetModel | undefined {
  const getSnapshot = React.useCallback(() => getBudgetModel(planId, productId), [planId, productId])
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
