import { useSyncExternalStore } from 'react'

// --- Amadeus DSP flow (self-contained) --------------------------------------------------------
//
// A separate, isolated scripted flow for creating campaigns in Amadeus's own DSP. It deliberately
// does NOT reuse the closed-won campaign flow store (`campaignFlowStore.ts`): that flow is tied to
// media plans / platform splits, whereas the DSP flow starts from a fresh thread and (for now) only
// asks the user to pick an advertiser that already exists in the DSP.
//
// Mirrors the campaign store's singleton pattern (module-level `state` + listeners +
// `useSyncExternalStore`) so the two flows behave consistently, but keeps all state separate. Only
// one scripted flow is active at a time — `AmadeusMaxPanel` resets the other when starting one.

// A selected advertiser option (same shape the advertiser Select produces: label carries the
// "{name} ({BPID})" text, value is the advertiserId).
export type DspAdvertiserSelection = {
  advertiserId: string | number
  label: string
}

// An insertion order (IO) available in the DSP for the chosen advertiser. The DSP has no backend
// here, so IOs are generated as a small per-advertiser mock (see `buildInsertionOrdersForAdvertiser`).
// The name follows the DSP IO naming convention, e.g.
//   IO.Amsterdam Manor Beach Resort Aruba.HOS.Q4 2026.CPM.CTRCVR
// = IO.<Advertiser>.<Dept>.<Quarter Year>.<Pricing model>.<Optimization goal>
export type DspInsertionOrder = {
  id: string
  name: string
}

// A selected IO option (same shape the IO Select produces: label is the IO name, value is its id).
export type DspInsertionOrderSelection = {
  insertionOrderId: string
  label: string
}

export type AmadeusDspFlowState = {
  // Bumped whenever the flow is (re)started or reset; lets any in-flight step timer cancel itself.
  flowId: number
  // The user's prompt that opened the flow (rendered as the prompt bubble).
  userPrompt: string | null
  // When the flow started (for the prompt-bubble timestamp).
  timestamp: string
  // Whether the DSP conversation should render at all.
  active: boolean
  // The "thinking" reasoning steps shown before the advertiser card, and how many have ticked off.
  steps: string[]
  completedSteps: number
  // True once all steps have animated in and the result (advertiser card) should render.
  revealed: boolean
  // The advertiser the user has picked (not yet confirmed).
  selectedAdvertiser: DspAdvertiserSelection | null
  // Whether the user has confirmed their advertiser selection (gates the follow-up content).
  confirmed: boolean

  // --- Insertion order (IO) step (gated behind `confirmed`) -----------------------------------
  // The reasoning steps shown while "loading" the advertiser's IOs, and how many have ticked off.
  ioSteps: string[]
  ioCompletedSteps: number
  // True once the IO reasoning finishes and the IO-select card should render.
  ioRevealed: boolean
  // The IOs available for the confirmed advertiser (mock; 1, or at most 2, per advertiser).
  insertionOrders: DspInsertionOrder[]
  // The IO the user has picked (not yet confirmed).
  selectedInsertionOrder: DspInsertionOrderSelection | null
  // Whether the user has confirmed their IO selection (gates the follow-up content).
  insertionOrderConfirmed: boolean
}

// The reasoning steps the AI "runs through" before asking for an advertiser. Kept short — this is
// the first turn of an ongoing conversation.
const ADVERTISER_STEP_LABELS = [
  'Opening Amadeus DSP',
  'Checking your DSP access',
  'Loading advertisers available in the DSP',
]

// The reasoning steps the AI "runs through" after the advertiser is confirmed, while it looks up
// the insertion orders available for that advertiser.
const IO_STEP_LABELS = ['Opening the selected advertiser', 'Loading insertion orders for this advertiser']

const STEP_INTERVAL_MS = 700
const STEP_FINISH_DELAY_MS = 400

// --- Insertion order (IO) mock -----------------------------------------------------------------
//
// The DSP has no backend here, so a small, deterministic set of IOs is generated per advertiser.
// Names follow the DSP IO naming convention:
//   IO.<Advertiser>.<Dept>.<Quarter Year>.<Pricing model>.<Optimization goal>
// e.g. IO.Amsterdam Manor Beach Resort Aruba.HOS.Q4 2026.CPM.CTRCVR
//
// Most advertisers have a single IO; a few have 2 (never more). Which advertisers get a second IO
// is decided deterministically from the advertiser id so the result is stable across renders.

// Pull a clean advertiser name out of the Select label, which is "{name} ({BPID})".
const advertiserNameFromLabel = (label: string): string => label.replace(/\s*\([^)]*\)\s*$/, '').trim()

// Stable, non-negative hash of a string → used to vary the mock IO details per advertiser.
const stableHash = (value: string): number => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0
  }
  return Math.abs(hash)
}

const IO_QUARTERS = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026']
const IO_PRICING = ['CPM', 'CPC', 'CPCV']
const IO_OPTIMIZATION = ['CTRCVR', 'VIEWABILITY', 'REACH']

// Builds the (mock) IOs for a confirmed advertiser: 1 IO, or 2 for roughly a third of advertisers.
export const buildInsertionOrdersForAdvertiser = (
  advertiser: DspAdvertiserSelection,
): DspInsertionOrder[] => {
  const advertiserName = advertiserNameFromLabel(advertiser.label)
  const seed = stableHash(String(advertiser.advertiserId) + advertiserName)
  // Dept segment: hotels in this flow are "HOS" (as in the reference screenshot).
  const dept = 'HOS'

  const makeIo = (variant: number): DspInsertionOrder => {
    const salt = seed + variant * 7
    const quarter = IO_QUARTERS[salt % IO_QUARTERS.length]
    const pricing = IO_PRICING[(salt >> 2) % IO_PRICING.length]
    const optimization = IO_OPTIMIZATION[(salt >> 4) % IO_OPTIMIZATION.length]
    const name = `IO.${advertiserName}.${dept}.${quarter}.${pricing}.${optimization}`
    return { id: `${advertiser.advertiserId}-io-${variant}`, name }
  }

  // ~1 in 3 advertisers get a second IO; the rest have exactly one.
  const hasSecondIo = seed % 3 === 0
  return hasSecondIo ? [makeIo(0), makeIo(1)] : [makeIo(0)]
}

const initialState: AmadeusDspFlowState = {
  flowId: 0,
  userPrompt: null,
  timestamp: '',
  active: false,
  steps: [],
  completedSteps: 0,
  revealed: false,
  selectedAdvertiser: null,
  confirmed: false,
  ioSteps: [],
  ioCompletedSteps: 0,
  ioRevealed: false,
  insertionOrders: [],
  selectedInsertionOrder: null,
  insertionOrderConfirmed: false,
}

let state: AmadeusDspFlowState = initialState
let flowTimers: number[] = []
const listeners = new Set<() => void>()

const setState = (updater: (current: AmadeusDspFlowState) => AmadeusDspFlowState) => {
  state = updater(state)
  listeners.forEach(listener => listener())
}

const schedule = (callback: () => void, delay: number) => {
  flowTimers.push(window.setTimeout(callback, delay))
}

const clearFlowTimers = () => {
  flowTimers.forEach(timerId => window.clearTimeout(timerId))
  flowTimers = []
}

export const getAmadeusDspFlowState = () => state

export const subscribeAmadeusDspFlow = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const useAmadeusDspFlowState = () =>
  useSyncExternalStore(subscribeAmadeusDspFlow, getAmadeusDspFlowState, getAmadeusDspFlowState)

// Animates the reasoning steps in one-by-one, then flips `revealed` so the advertiser card shows.
// Guarded by flowId so a reset/restart cancels any pending ticks.
const runAdvertiserReasoning = (flowId: number) => {
  const steps = state.steps
  steps.forEach((_, index) => {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current => ({ ...current, completedSteps: index + 1 }))
      },
      STEP_INTERVAL_MS * (index + 1),
    )
  })

  schedule(
    () => {
      if (state.flowId !== flowId) return
      setState(current => ({ ...current, revealed: true }))
    },
    STEP_INTERVAL_MS * steps.length + STEP_FINISH_DELAY_MS,
  )
}

// Starts a fresh DSP thread: clears any previous DSP state, animates the reasoning steps, then
// renders the advertiser-select card as the first AI response.
export const startAmadeusDspFlow = (prompt: string) => {
  clearFlowTimers()
  setState(current => ({
    ...initialState,
    flowId: current.flowId + 1,
    userPrompt: prompt,
    timestamp: new Date().toISOString(),
    active: true,
    steps: ADVERTISER_STEP_LABELS,
    completedSteps: 0,
    revealed: false,
  }))
  runAdvertiserReasoning(state.flowId)
}

export const resetAmadeusDspFlow = () => {
  clearFlowTimers()
  setState(current => ({ ...initialState, flowId: current.flowId + 1 }))
}

// Records the user's advertiser pick (before confirming).
export const setDspAdvertiser = (advertiser: DspAdvertiserSelection | null) => {
  setState(current => ({ ...current, selectedAdvertiser: advertiser }))
}

// Animates the IO reasoning steps in one-by-one, then flips `ioRevealed` so the IO-select card
// shows. Guarded by flowId so a reset/restart cancels any pending ticks.
const runInsertionOrderReasoning = (flowId: number) => {
  const steps = state.ioSteps
  steps.forEach((_, index) => {
    schedule(
      () => {
        if (state.flowId !== flowId) return
        setState(current => ({ ...current, ioCompletedSteps: index + 1 }))
      },
      STEP_INTERVAL_MS * (index + 1),
    )
  })

  schedule(
    () => {
      if (state.flowId !== flowId) return
      setState(current => ({ ...current, ioRevealed: true }))
    },
    STEP_INTERVAL_MS * steps.length + STEP_FINISH_DELAY_MS,
  )
}

// Confirms the selected advertiser, then kicks off the IO step: load the advertiser's insertion
// orders (mock) and animate the "loading IOs" reasoning before revealing the IO-select card.
export const confirmDspAdvertiser = () => {
  if (!state.selectedAdvertiser || state.confirmed) return
  const insertionOrders = buildInsertionOrdersForAdvertiser(state.selectedAdvertiser)
  setState(current => ({
    ...current,
    confirmed: true,
    ioSteps: IO_STEP_LABELS,
    ioCompletedSteps: 0,
    ioRevealed: false,
    insertionOrders,
    selectedInsertionOrder: null,
    insertionOrderConfirmed: false,
  }))
  runInsertionOrderReasoning(state.flowId)
}

// Records the user's IO pick (before confirming).
export const setDspInsertionOrder = (insertionOrder: DspInsertionOrderSelection | null) => {
  setState(current => ({ ...current, selectedInsertionOrder: insertionOrder }))
}

// Confirms the selected IO, revealing the acknowledgment / next step.
export const confirmDspInsertionOrder = () => {
  if (!state.selectedInsertionOrder || state.insertionOrderConfirmed) return
  setState(current => ({ ...current, insertionOrderConfirmed: true }))
}

export const isAmadeusDspPrompt = (prompt: string) =>
  prompt.trim().toLowerCase().startsWith('create campaigns in amadeus dsp')
