/**
 * Lightweight, dependency-free, module-level PLAN VERSION store (prototype only).
 *
 * Lets the planner save named snapshots of a plan, view them, mark one active, and delete them.
 * There is no backend for v2 version data, so versions live here in memory for the SPA session
 * (lost on full page reload) — enough to demo the versioning UX across all four wizard steps.
 *
 * A version's `snapshot` is an opaque, JSON-serialisable blob the steps contribute to and restore
 * from. Each step reads/writes its own slice by key (e.g. 'generalSettings', 'budgetModel',
 * 'budgetDistribution'), so no step needs to know another step's shape. "View" restores the
 * snapshot into the live client state the pages render from (in-memory only; no backend write-back).
 */
import React from 'react'

export const MAX_PLAN_VERSIONS = 10

export type PlanVersionSnapshot = Record<string, unknown>

export interface PlanVersion {
  id: string
  /** Sequential label shown in the UI, e.g. 'v1', 'v2'. */
  label: string
  /** Optional user-given name, e.g. 'Conservative'. */
  name: string
  /** ISO timestamp when the version was saved. */
  savedAt: string
  /** The captured plan state across steps (opaque per-step slices). */
  snapshot: PlanVersionSnapshot
}

interface PlanVersionState {
  versions: PlanVersion[]
  activeVersionId: string | null
}

const keyOf = (planId: string | undefined): string => planId ?? 'default'

const store = new Map<string, PlanVersionState>()
const listeners = new Set<() => void>()

const EMPTY_STATE: PlanVersionState = { versions: [], activeVersionId: null }

const notify = (): void => {
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getState = (planId: string | undefined): PlanVersionState => store.get(keyOf(planId)) ?? EMPTY_STATE

/** Next 'vN' label — one above the highest existing version number for the plan. */
const nextLabel = (versions: PlanVersion[]): string => {
  const maxNum = versions.reduce((max, v) => {
    const match = /^v(\d+)$/.exec(v.label)
    return match ? Math.max(max, Number(match[1])) : max
  }, 0)
  return `v${maxNum + 1}`
}

/**
 * Save a new named version from the given snapshot. The new version becomes active. Returns the
 * created version, or undefined when the plan already has MAX_PLAN_VERSIONS saved.
 */
export function savePlanVersion(
  planId: string | undefined,
  name: string,
  snapshot: PlanVersionSnapshot,
): PlanVersion | undefined {
  const current = getState(planId)
  if (current.versions.length >= MAX_PLAN_VERSIONS) return undefined

  const version: PlanVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: nextLabel(current.versions),
    name: name.trim(),
    savedAt: new Date().toISOString(),
    snapshot,
  }
  // Newest first.
  store.set(keyOf(planId), {
    versions: [version, ...current.versions],
    activeVersionId: version.id,
  })
  notify()
  return version
}

export function setActivePlanVersion(planId: string | undefined, versionId: string): void {
  const current = getState(planId)
  if (!current.versions.some(v => v.id === versionId)) return
  store.set(keyOf(planId), { ...current, activeVersionId: versionId })
  notify()
}

export function deletePlanVersion(planId: string | undefined, versionId: string): void {
  const current = getState(planId)
  const versions = current.versions.filter(v => v.id !== versionId)
  const activeVersionId = current.activeVersionId === versionId ? null : current.activeVersionId
  store.set(keyOf(planId), { versions, activeVersionId })
  notify()
}

export function getPlanVersion(planId: string | undefined, versionId: string): PlanVersion | undefined {
  return getState(planId).versions.find(v => v.id === versionId)
}

/** React hook: re-renders when the plan's versions change. */
export function usePlanVersions(planId: string | undefined): PlanVersionState {
  const getSnapshot = React.useCallback(() => getState(planId), [planId])
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
