import React from 'react'
import {
  Breadcrumb,
  Button,
  Checkbox,
  DropdownMenu,
  Grid,
  Icon,
  Input,
  InputNumber,
  Select,
  Spinner,
  Stepper,
  StickyFooter,
  Tab,
  Table,
  Tag,
  Text,
  ToggleTab,
  colors,
} from '@amadeus/react-design-factory'
import type { ColumnsType } from '@amadeus/react-design-factory/components/Table'
import { useNavigate, useParams, useLocation } from 'react-router'
import { MediaplannerWrapper, SaveVersionInline } from '../Mediaplanner/Mediaplanner.styled'
import { PlanTitleHeader } from '../Mediaplanner/PlanTitleHeader'
import { resolveHeaderStatus } from '../Mediaplanner/mediaplanUtils'
import { PlanVersionsDrawer } from '../Mediaplanner/PlanVersionsDrawer'
import { usePlanVersions, savePlanVersion, type PlanVersionSnapshot } from '../Mediaplanner/planVersionStore'
import { formatCurrencyWithSuffixSymbol, formatNumber, getCurrencySymbol } from '../utils/number'
import { useGetAdvertisersQuery } from '@mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries'
import { useGetMediaPlanGsQuery } from '../MediaplannerGeneralSettings/MediaplannerGeneralSettings.queries'
import {
  ProductTabsBar,
  Card,
  CardTitle,
  CardHeaderRow,
  SummaryGrid,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  PropertiesActions,
  TableHeaderText,
  InlineCategoryRow,
  InlineCategoryActions,
  ExpandIconBtn,
  ExpandIconSpacer,
  PropertiesTableWrap,
  AllocatedBadge,
  BudgetPctHeader,
  ParentLabel,
  PropertyLabel,
  SalesforceChip,
  ScenarioEmulatorBar,
  ScenarioEmulatorLabel,
  ScenarioEmulatorHint,
} from './MediaplannerProductSettings.styled'
import { PropertySettingsDrawer, type PropertyOption } from './PropertySettingsDrawer'
import {
  getMockSalesforcePlan,
  MOCK_SF_SCENARIOS,
  DEFAULT_SF_SCENARIO_ID,
  getSalesforceScenario,
  type MockFee,
  type MockProduct,
  type SalesforceScenarioId,
} from './mockSalesforcePlans'
import { setBudgetModel, setPlanScenarioId, getPlanScenarioId } from './mediaPlanBudgetStore'

type AllocationMode = 'PCT' | 'VALUE'

const ACTIVITY_OPTIONS = [
  { value: 'REGULAR_CAMPAIGN', label: 'Rooms' },
  { value: 'FOOD_AND_BEVERAGE', label: 'F&B' },
  { value: 'MICE', label: 'MICE' },
  { value: 'SPA', label: 'Spa' },
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'OTHERS', label: 'Others' },
]
const ACTIVITY_LABEL: Record<string, string> = Object.fromEntries(
  ACTIVITY_OPTIONS.map(o => [o.value, o.label]),
)

interface BudgetCategory {
  id: string
  name: string
  activity: string
  /** Editable value depends on allocation mode; the other is derived. */
  budgetPct: number
  budgetValue: number
  memberBpids: string[]
}

interface FeeRow {
  key: string
  fee: string
  chargeType: string
  amount: string
}

/** A flattened table row — either a standalone property, a category, or a property nested in a category. */
interface TableRow {
  key: string
  rowType: 'standalone-group' | 'standalone' | 'category' | 'category-property'
  label: string
  bpid?: string
  activity?: string
  categoryId?: string
  budgetPct?: number
  budgetValue?: number
  memberCount?: number
  /** For a property row: which group it belongs to ('standalone' or a category id). */
  groupId?: string
  children?: TableRow[]
}

const CHARGE_TYPE_LABEL: Record<string, string> = {
  PERCENTAGE_FEE: 'Percentage fee',
  FIXED_RECURRING: 'Fixed recurring',
  THRESHOLD: 'Threshold',
  ONE_TIME_SETUP: 'One-time setup',
}

function buildFeeRows(fees: MockFee[]): FeeRow[] {
  return fees.map((f, i) => ({
    key: String(i),
    fee: f.mandatory ? `${f.name} *` : f.name,
    chargeType: CHARGE_TYPE_LABEL[f.chargeType] ?? f.chargeType,
    amount: f.display,
  }))
}

const round2 = (n: number) => Math.round(n * 100) / 100

function MediaplannerProductSettings() {
  const navigate = useNavigate()
  const location = useLocation()
  const isNewPlan = Boolean((location.state as { isNewPlan?: boolean } | null)?.isNewPlan)
  const { planId } = useParams<{ planId: string }>()
  const isDetailsView = Boolean(planId)

  // Salesforce scenario emulator (PROTOTYPE ONLY): when the page isn't opened against a specific
  // seeded SF plan, a temporary dropdown picks which intake shape to prototype against
  // (single/single, single/multi, multi/multi). Replaced by the real SF connection later.
  const planFromId = getMockSalesforcePlan(planId)
  // Initialize from the persisted scenario (if the planner already picked one and came back) so the
  // selection survives navigation; persist every change so Step 3/4 resolve the SAME plan.
  const [activeScenarioId, setActiveScenarioId] = React.useState<SalesforceScenarioId>(
    () => (getPlanScenarioId(planId) as SalesforceScenarioId | undefined) ?? DEFAULT_SF_SCENARIO_ID,
  )
  React.useEffect(() => {
    if (!planFromId) setPlanScenarioId(planId, activeScenarioId)
  }, [planFromId, planId, activeScenarioId])
  const scenarioPlan = getSalesforceScenario(activeScenarioId).plan
  const plan = planFromId ?? scenarioPlan

  // Read the Contract Budget entered in Step 1 (General Settings) for this plan.
  // When a saved plan is open (:planId), it comes from the backend; otherwise we fall
  // back to the seeded mock plan's value so the prototype is demonstrable standalone.
  const { data: gsData, loading: gsLoading } = useGetMediaPlanGsQuery(planId)
  const step1ContractBudget = gsData?.GetMediaPlan?.generalSettings?.planInformation?.contractBudgetTarget
  const planBudget = planId
    ? Number(step1ContractBudget ?? 0)
    : plan.contractBudgetTarget
  const currencyCode = planId
    ? (gsData?.GetMediaPlan?.generalSettings?.advertiserInformation?.currency ?? plan.currency)
    : plan.currency
  const currencySymbol = getCurrencySymbol(currencyCode)
  // Title shows the REAL backend plan name when a saved plan is open (so it matches Step 1 for the
  // same plan); only the emulator/mock path falls back to the scenario fixture's plan name. While a
  // real plan's data is still loading, render an empty title rather than briefly flashing the mock
  // fallback name and then swapping to the real one.
  const planName = planId
    ? gsLoading
      ? ''
      : (gsData?.GetMediaPlan?.generalSettings?.planInformation?.planName ?? plan.planName)
    : plan.planName

  const [activeProductId, setActiveProductId] = React.useState(plan.products[0]?.id)
  const activeProduct: MockProduct | undefined =
    plan.products.find(p => p.id === activeProductId) ?? plan.products[0]

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const hasContractBudget = planBudget > 0
  const [allocationMode, setAllocationMode] = React.useState<AllocationMode>(
    hasContractBudget ? 'PCT' : 'VALUE',
  )
  // Without a contract budget, % cannot be computed — force Value mode and disable the toggle.
  React.useEffect(() => {
    if (!hasContractBudget && allocationMode !== 'VALUE') setAllocationMode('VALUE')
  }, [hasContractBudget, allocationMode])

  // Pull real hotel advertisers to use as selectable properties.
  const { data: advData, loading: advLoading } = useGetAdvertisersQuery()
  const hotelAdvertisers = React.useMemo(() => advData?.advertisers?.advertisers ?? [], [advData])

  const propertyOptions: PropertyOption[] = React.useMemo(
    () =>
      hotelAdvertisers.map((adv, i) => ({
        advertiserId: String(adv.advertiserId ?? i),
        advertiserName: adv.advertiserName ?? `Property ${i + 1}`,
        bpid: String(adv.bpid ?? `BPID-${i + 1}`),
      })),
    [hotelAdvertisers],
  )

  // Salesforce Ship_To = a per-product slice of hotel advertisers; these are locked.
  // Each product uses its own offset so products pick distinct (non-overlapping) properties.
  const lockedBpids = React.useMemo(() => {
    // Explicit Ship_To by BPID (e.g. The Londoner Hotel) wins over the index slice.
    if (activeProduct?.shipToBpids?.length) return new Set(activeProduct.shipToBpids)
    const count = activeProduct?.shipToCount ?? 0
    const offset = activeProduct?.shipToOffset ?? 0
    return new Set(propertyOptions.slice(offset, offset + count).map(o => o.bpid))
  }, [activeProduct, propertyOptions])

  // Selected properties (Ship_To + manually added). Seeded per product with its Ship_To.
  const [selectedBpids, setSelectedBpids] = React.useState<Set<string>>(new Set())
  // Products that have already been seeded with their locked Ship_To (once each).
  const seededProductsRef = React.useRef<Set<string>>(new Set())

  const propertyByBpid = React.useMemo(() => {
    const m = new Map<string, PropertyOption>()
    propertyOptions.forEach(o => m.set(o.bpid, o))
    return m
  }, [propertyOptions])

  // ---- Budget categories + standalone property budgets ----
  const [categories, setCategories] = React.useState<BudgetCategory[]>([])
  // Per-standalone-property budget (keyed by bpid).
  const [propertyBudgets, setPropertyBudgets] = React.useState<Record<string, { pct: number; value: number }>>({})

  // Each selected property has exactly ONE Regular Campaign instance, located either
  // in Standalone or in a single Regular-Campaign category. This map tracks that
  // location per bpid: 'standalone' | categoryId. Non-RC category memberships are
  // independent copies and do NOT affect this map.
  const [rcLocation, setRcLocation] = React.useState<Record<string, string>>({})

  // Keep rcLocation in sync with the selected properties: newly-selected properties
  // default to 'standalone'; deselected ones are dropped.
  React.useEffect(() => {
    setRcLocation(prev => {
      const next: Record<string, string> = {}
      selectedBpids.forEach(b => {
        next[b] = prev[b] ?? 'standalone'
      })
      return next
    })
  }, [selectedBpids])

  const isRegularCampaign = React.useCallback(
    (activity?: string) => activity === 'REGULAR_CAMPAIGN',
    [],
  )

  const rcCategoryById = React.useCallback(
    (categoryId: string) => categories.find(c => c.id === categoryId),
    [categories],
  )

  // Standalone rows = selected properties whose RC instance lives in 'standalone'.
  const standaloneBpids = React.useMemo(
    () => Array.from(selectedBpids).filter(b => (rcLocation[b] ?? 'standalone') === 'standalone'),
    [selectedBpids, rcLocation],
  )

  // A standalone property cannot be removed (via the drawer) while it is the only
  // home for its Regular Campaign instance — i.e. it lives in standalone and is not
  // a member of any other budget group.
  const nonRemovableBpids = React.useMemo(() => {
    const s = new Set<string>()
    selectedBpids.forEach(b => {
      const standalone = (rcLocation[b] ?? 'standalone') === 'standalone'
      const elsewhere = categories.some(c => c.memberBpids.includes(b))
      if (standalone && !elsewhere) s.add(b)
    })
    return s
  }, [selectedBpids, rcLocation, categories])

  // ---- Inline "add category" row ----
  const [isAddingCategory, setIsAddingCategory] = React.useState(false)
  const [newCatName, setNewCatName] = React.useState('')
  const [newCatActivity, setNewCatActivity] = React.useState<string>('REGULAR_CAMPAIGN')
  // Inline editing of an existing category's name/activity.
  const [editingCategoryId, setEditingCategoryId] = React.useState<string | null>(null)
  // Bulk selection of property rows (by bpid).
  const [selectedProps, setSelectedProps] = React.useState<Set<string>>(new Set())

  // --- Plan versioning (prototype) -------------------------------------------------------------
  const [isVersionsOpen, setIsVersionsOpen] = React.useState(false)
  const [isSavingVersion, setIsSavingVersion] = React.useState(false)
  const [versionName, setVersionName] = React.useState('')
  const { versions } = usePlanVersions(planId)

  // Step 2 contributes its product-settings slice to the snapshot: the active scenario and the
  // current product's selection/budget state. (In-memory snapshot — Sets/records kept as-is.)
  const captureSnapshot = React.useCallback(
    (): PlanVersionSnapshot => ({
      productSettings: {
        scenarioId: activeScenarioId,
        activeProductId,
        selectedBpids: Array.from(selectedBpids),
        rcLocation: { ...rcLocation },
        categories: categories.map(c => ({ ...c, memberBpids: [...c.memberBpids] })),
        propertyBudgets: { ...propertyBudgets },
      },
    }),
    [activeScenarioId, activeProductId, selectedBpids, rcLocation, categories, propertyBudgets],
  )

  // Restore the product-settings slice from a viewed version into the current product's state.
  const handleViewVersion = React.useCallback(
    (snapshot: PlanVersionSnapshot) => {
      const ps = snapshot.productSettings as
        | {
            scenarioId?: SalesforceScenarioId
            activeProductId?: string
            selectedBpids?: string[]
            rcLocation?: Record<string, string>
            categories?: BudgetCategory[]
            propertyBudgets?: Record<string, { pct: number; value: number }>
          }
        | undefined
      if (!ps) return
      if (ps.scenarioId && !planFromId) setActiveScenarioId(ps.scenarioId)
      if (ps.activeProductId) setActiveProductId(ps.activeProductId)
      setSelectedBpids(new Set(ps.selectedBpids ?? []))
      setRcLocation({ ...(ps.rcLocation ?? {}) })
      setCategories((ps.categories ?? []).map(c => ({ ...c, memberBpids: [...c.memberBpids] })))
      setPropertyBudgets({ ...(ps.propertyBudgets ?? {}) })
    },
    [planFromId],
  )

  const confirmSaveAsVersion = () => {
    savePlanVersion(planId, versionName.trim() || 'Untitled version', captureSnapshot())
    setIsSavingVersion(false)
    setVersionName('')
  }

  // Selection is scoped per ROW (groupId::bpid) so the same property appearing in
  // multiple groups (a non-RC copy) is selected independently in each group.
  const rowSelKey = (groupId: string, bpid: string) => `${groupId}::${bpid}`
  const togglePropSelected = (groupId: string, bpid: string, on: boolean) => {
    setSelectedProps(prev => {
      const next = new Set(prev)
      const k = rowSelKey(groupId, bpid)
      if (on) next.add(k)
      else next.delete(k)
      return next
    })
  }

  const startAddCategory = () => {
    setNewCatActivity('REGULAR_CAMPAIGN')
    setNewCatName(ACTIVITY_LABEL['REGULAR_CAMPAIGN'])
    setIsAddingCategory(true)
  }
  const confirmAddCategory = () => {
    const name = newCatName.trim() || ACTIVITY_LABEL[newCatActivity]
    // Prepend so the new category appears as the first budget group (right under the
    // Standalone group), keeping it immediately visible without scrolling.
    setCategories(prev => [
      {
        id: `cat-${Date.now()}`,
        name,
        activity: newCatActivity,
        budgetPct: 0,
        budgetValue: 0,
        memberBpids: [],
      },
      ...prev,
    ])
    setIsAddingCategory(false)
    setNewCatName('')
  }

  // Where does a property's Regular Campaign instance currently live?
  const rcLocOf = (bpid: string) => rcLocation[bpid] ?? 'standalone'

  // Is a given property already the Regular Campaign instance somewhere OTHER than
  // the given source group? (Regular Campaign is unique plan-wide.)
  const hasRcElsewhere = (bpid: string, exceptGroupId: string) => {
    const loc = rcLocOf(bpid)
    return loc !== exceptGroupId
  }

  // Add / move a single property from a source group into a target category.
  //  mode 'move' -> the property LEAVES its source (Standalone or source group) and
  //                 its "home" (rcLocation) now points at the target group. Works for
  //                 both Regular Campaign and non-Regular targets.
  //  mode 'add'  -> the property is ADDED as an independent copy (source untouched).
  //                 Only meaningful for non-Regular targets.
  // Regular Campaign remains unique plan-wide: moving to an RC group is blocked if the
  // property's RC home already lives in a different RC group.
  const addPropertyToCategory = (
    bpid: string,
    categoryId: string,
    sourceGroupId = 'standalone',
    mode: 'move' | 'add' = 'move',
  ) => {
    const target = rcCategoryById(categoryId)
    if (!target) return
    const targetIsRc = isRegularCampaign(target.activity)

    // ADD (copy) into a non-RC group: leave the source as-is.
    if (mode === 'add' && !targetIsRc) {
      setCategories(prev =>
        prev.map(c =>
          c.id === categoryId && !c.memberBpids.includes(bpid)
            ? { ...c, memberBpids: [...c.memberBpids, bpid] }
            : c,
        ),
      )
      return
    }

    // MOVE into any group. For an RC target, enforce plan-wide uniqueness.
    if (targetIsRc && hasRcElsewhere(bpid, sourceGroupId)) return

    // Point the property's home at the target group and add it as a member.
    setRcLocation(prev => ({ ...prev, [bpid]: categoryId }))
    setCategories(prev =>
      prev.map(c => {
        if (c.id === categoryId) {
          return c.memberBpids.includes(bpid) ? c : { ...c, memberBpids: [...c.memberBpids, bpid] }
        }
        // Remove from the source group when it was this property's home
        // (i.e. the property is moving out of that group). Independent non-RC
        // copies in other groups are left untouched.
        if (c.id === sourceGroupId && sourceGroupId !== 'standalone') {
          return { ...c, memberBpids: c.memberBpids.filter(b => b !== bpid) }
        }
        return c
      }),
    )
    // Leaving standalone clears its standalone budget.
    setPropertyBudgets(prev => {
      const next = { ...prev }
      delete next[bpid]
      return next
    })
  }

  // Remove a property from a specific category.
  //  - RC category      -> the RC instance returns to Standalone.
  //  - non-RC category  -> just drop the membership (it exists elsewhere already).
  const removePropertyFromCategory = (bpid: string, categoryId: string) => {
    const cat = rcCategoryById(categoryId)
    if (!cat) return
    setCategories(prev =>
      prev.map(c =>
        c.id === categoryId ? { ...c, memberBpids: c.memberBpids.filter(b => b !== bpid) } : c,
      ),
    )
    if (isRegularCampaign(cat.activity) && rcLocOf(bpid) === categoryId) {
      // RC instance goes back to Standalone.
      setRcLocation(prev => ({ ...prev, [bpid]: 'standalone' }))
      setPropertyBudgets(prev => ({ ...prev, [bpid]: { pct: 0, value: 0 } }))
    }
  }

  const updateCategory = (categoryId: string, patch: { name?: string; activity?: string }) => {
    setCategories(prev => prev.map(c => (c.id === categoryId ? { ...c, ...patch } : c)))
  }
  const removeCategory = (categoryId: string) => {
    const cat = rcCategoryById(categoryId)
    // If it was a Regular Campaign category, its RC-instance members return to Standalone.
    if (cat && isRegularCampaign(cat.activity)) {
      setRcLocation(prev => {
        const next = { ...prev }
        cat.memberBpids.forEach(b => {
          if (next[b] === categoryId) next[b] = 'standalone'
        })
        return next
      })
    }
    setCategories(prev => prev.filter(c => c.id !== categoryId))
    setEditingCategoryId(null)
  }

  // Bulk move/add a set of properties from a source group to a target group.
  //  - target 'standalone'  -> return each property's RC instance to Standalone
  //                            (only valid for props whose RC instance is in the source).
  //  - target RC category   -> move (unique) each property's RC instance.
  //  - target non-RC        -> add independent copies.
  const moveProperties = (bpids: string[], target: string, sourceGroupId = 'standalone') => {
    if (bpids.length === 0) return

    if (target === 'standalone') {
      // Only meaningful when the source is an RC category (its RC instances go home).
      const src = rcCategoryById(sourceGroupId)
      if (src && isRegularCampaign(src.activity)) {
        setRcLocation(prev => {
          const next = { ...prev }
          bpids.forEach(b => {
            if (next[b] === sourceGroupId) next[b] = 'standalone'
          })
          return next
        })
        setCategories(prev =>
          prev.map(c =>
            c.id === sourceGroupId
              ? { ...c, memberBpids: c.memberBpids.filter(b => !bpids.includes(b)) }
              : c,
          ),
        )
        setPropertyBudgets(prev => {
          const next = { ...prev }
          bpids.forEach(b => (next[b] = { pct: 0, value: 0 }))
          return next
        })
      }
      setSelectedProps(new Set())
      return
    }

    // Delegate each property to the single-property handler (which enforces the
    // RC-vs-non-RC semantics + uniqueness).
    bpids.forEach(b => addPropertyToCategory(b, target, sourceGroupId))
    setSelectedProps(new Set())
  }

  // Is a property a member of at least one budget category?
  const memberOfAnyCategory = (bpid: string) => categories.some(c => c.memberBpids.includes(bpid))

  // Remove a property from Standalone entirely (deselect it from the plan). Only
  // allowed when the property still lives in another budget group — otherwise its
  // Regular Campaign instance would have no home.
  const removeFromStandalone = (bpid: string) => {
    if (!memberOfAnyCategory(bpid)) return
    setSelectedBpids(prev => {
      const next = new Set(prev)
      next.delete(bpid)
      return next
    })
    setPropertyBudgets(prev => {
      const next = { ...prev }
      delete next[bpid]
      return next
    })
    setSelectedProps(prev => {
      const next = new Set(prev)
      next.delete(rowSelKey('standalone', bpid))
      return next
    })
  }

  // ---- Budget editing ----
  // The stored source of truth per row is its VALUE. In Value mode the typed number
  // IS the value; in % mode the typed % is converted to a value against the contract
  // budget (Percentage mode is only enabled when a contract budget exists).
  const toValue = (raw: number): number => {
    const v = Number.isFinite(raw) ? raw : 0
    if (allocationMode === 'VALUE') return v
    return planBudget > 0 ? round2((v / 100) * planBudget) : 0
  }
  const setStandaloneBudget = (bpid: string, raw: number) => {
    const value = toValue(raw)
    setPropertyBudgets(prev => ({ ...prev, [bpid]: { pct: 0, value } }))
  }
  const setCategoryBudget = (categoryId: string, raw: number) => {
    const value = toValue(raw)
    setCategories(prev => prev.map(c => (c.id === categoryId ? { ...c, budgetValue: value } : c)))
  }

  // Total of all entered budget values (categories + standalone properties).
  const standaloneBpidSet = React.useMemo(() => new Set(standaloneBpids), [standaloneBpids])
  const totalEnteredValue = React.useMemo(() => {
    const catValue = categories.reduce((sum, c) => sum + (c.budgetValue || 0), 0)
    const saValue = Object.entries(propertyBudgets)
      .filter(([bpid]) => standaloneBpidSet.has(bpid))
      .reduce((sum, [, b]) => sum + (b.value || 0), 0)
    return round2(catValue + saValue)
  }, [categories, propertyBudgets, standaloneBpidSet])

  // Base for computing Budget %: the contract budget if available, otherwise the
  // sum of entered values (so rows total 100% of what's been entered).
  const pctBase = planBudget > 0 ? planBudget : totalEnteredValue
  const derivePct = (value: number) => (pctBase > 0 ? round2((value / pctBase) * 100) : 0)

  // Publish the current budget model into the shared store so Step 3 (Budget
  // Distribution) can read the categories / standalone entries. Backend is offline
  // for this prototype data, so this module-level store is the Step 2 -> Step 3 bridge.
  React.useEffect(() => {
    setBudgetModel(planId, activeProductId, {
      currency: currencyCode,
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        activity: c.activity,
        budgetPct: derivePct(c.budgetValue),
        budgetValue: c.budgetValue,
        memberBpids: c.memberBpids,
      })),
      standalone: standaloneBpids.map(bpid => {
        const value = propertyBudgets[bpid]?.value ?? 0
        return {
          bpid,
          name: propertyByBpid.get(bpid)?.advertiserName ?? bpid,
          budgetValue: value,
          budgetPct: derivePct(value),
        }
      }),
      propertyNames: Object.fromEntries(
        Array.from(propertyByBpid.entries()).map(([bpid, o]) => [bpid, o.advertiserName]),
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, activeProductId, categories, standaloneBpids, propertyBudgets, propertyByBpid, currencyCode])

  // ---- Build the expandable table rows ----
  // Structure: each Budget Category is a parent row (with member children), and all
  // standalone properties live under a single "Standalone Properties" parent group.
  const STANDALONE_GROUP_KEY = 'standalone-group'

  // Standalone group is ALWAYS expanded. Budget Categories are collapsed by default;
  // we track which category ids are collapsed and render rows flat (no Ant expandable).
  const [collapsedCategoryIds, setCollapsedCategoryIds] = React.useState<Set<string>>(new Set())

  // ---- Per-product property selection ----
  // Each product keeps its OWN independent selection (Ship_To + added properties,
  // categories, budgets, collapsed state). Switching products saves the current
  // product's snapshot and restores (or first-time seeds) the target product's.
  interface ProductSelectionSnapshot {
    selectedBpids: Set<string>
    rcLocation: Record<string, string>
    categories: BudgetCategory[]
    propertyBudgets: Record<string, { pct: number; value: number }>
    collapsedCategoryIds: Set<string>
  }
  const perProductRef = React.useRef<Record<string, ProductSelectionSnapshot>>({})
  const prevProductIdRef = React.useRef<string | undefined>(undefined)
  // Latest-value refs so the swap effect saves current state without stale closures.
  const selRef = React.useRef(selectedBpids)
  const rcRef = React.useRef(rcLocation)
  const catRef = React.useRef(categories)
  const budRef = React.useRef(propertyBudgets)
  const collRef = React.useRef(collapsedCategoryIds)
  selRef.current = selectedBpids
  rcRef.current = rcLocation
  catRef.current = categories
  budRef.current = propertyBudgets
  collRef.current = collapsedCategoryIds

  React.useEffect(() => {
    const prevId = prevProductIdRef.current
    // Save the outgoing product's current selection.
    if (prevId !== undefined && prevId !== activeProductId) {
      perProductRef.current[prevId] = {
        selectedBpids: selRef.current,
        rcLocation: rcRef.current,
        categories: catRef.current,
        propertyBudgets: budRef.current,
        collapsedCategoryIds: collRef.current,
      }
    }

    if (activeProductId !== undefined) {
      const snap = perProductRef.current[activeProductId]
      if (snap) {
        // Restore the previously-edited selection for this product.
        setSelectedBpids(new Set(snap.selectedBpids))
        setRcLocation({ ...snap.rcLocation })
        setCategories(snap.categories.map(c => ({ ...c, memberBpids: [...c.memberBpids] })))
        setPropertyBudgets({ ...snap.propertyBudgets })
        setCollapsedCategoryIds(new Set(snap.collapsedCategoryIds))
      } else {
        // First visit: seed this product with its own locked Ship_To, fresh groups.
        const seeded = new Set(lockedBpids)
        setSelectedBpids(seeded)
        setRcLocation(Object.fromEntries(Array.from(seeded).map(b => [b, 'standalone'])))
        setCategories([])
        setPropertyBudgets({})
        setCollapsedCategoryIds(new Set())
        // Only mark as seeded once advertisers have actually loaded. If lockedBpids is
        // still empty (advertisers not loaded yet), leave it unseeded so the delayed
        // seed effect fills the Ship_To once the advertiser list arrives.
        if (lockedBpids.size > 0) seededProductsRef.current.add(activeProductId)
      }
    }

    prevProductIdRef.current = activeProductId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProductId])

  // When the emulated Salesforce scenario changes (prototype dropdown): discard every product's
  // saved selection/seed state and jump to the new scenario's first product, so the swap + seed
  // effects re-seed the new products fresh from their Ship_To. No-op when the page is opened
  // against a real seeded SF plan (planFromId) — scenario switching only applies to the emulator.
  const prevScenarioIdRef = React.useRef(activeScenarioId)
  React.useEffect(() => {
    if (planFromId) return
    if (prevScenarioIdRef.current === activeScenarioId) return
    prevScenarioIdRef.current = activeScenarioId
    perProductRef.current = {}
    seededProductsRef.current = new Set()
    prevProductIdRef.current = undefined
    setSelectedBpids(new Set())
    setRcLocation({})
    setCategories([])
    setPropertyBudgets({})
    setCollapsedCategoryIds(new Set())
    setSelectedProps(new Set())
    setIsAddingCategory(false)
    setEditingCategoryId(null)
    setActiveProductId(plan.products[0]?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScenarioId])

  // Initial seed for the very first product once advertisers (lockedBpids) load.
  React.useEffect(() => {
    if (
      activeProductId !== undefined &&
      !seededProductsRef.current.has(activeProductId) &&
      lockedBpids.size > 0 &&
      selectedBpids.size === 0
    ) {
      const seeded = new Set(lockedBpids)
      setSelectedBpids(seeded)
      setRcLocation(Object.fromEntries(Array.from(seeded).map(b => [b, 'standalone'])))
      seededProductsRef.current.add(activeProductId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockedBpids, activeProductId])

  // Newly created categories start collapsed.
  const prevCategoryIds = React.useRef<Set<string>>(new Set())
  React.useEffect(() => {
    setCollapsedCategoryIds(prev => {
      const next = new Set(prev)
      categories.forEach(c => {
        if (!prevCategoryIds.current.has(c.id)) next.add(c.id)
      })
      // Drop ids for removed categories.
      Array.from(next).forEach(id => {
        if (!categories.some(c => c.id === id)) next.delete(id)
      })
      prevCategoryIds.current = new Set(categories.map(c => c.id))
      return next
    })
  }, [categories])

  const toggleCategoryCollapsed = (categoryId: string) => {
    setCollapsedCategoryIds(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      return next
    })
  }

  const tableRows: TableRow[] = React.useMemo(() => {
    const rows: TableRow[] = []

    // Budget Categories first — new ones are prepended to `categories`, so the most
    // recently added group appears at the very TOP of the table (above Standalone).
    categories.forEach(cat => {
      const children: TableRow[] = cat.memberBpids
        .map(bpid => propertyByBpid.get(bpid))
        .filter((o): o is PropertyOption => Boolean(o))
        .map(o => ({
          key: `catprop-${cat.id}-${o.bpid}`,
          rowType: 'category-property' as const,
          label: `${o.advertiserName} (${String(o.bpid).toUpperCase()})`,
          bpid: o.bpid,
          groupId: cat.id,
          categoryId: cat.id,
        }))
      rows.push({
        key: `cat-${cat.id}`,
        rowType: 'category',
        label: cat.name,
        activity: cat.activity,
        categoryId: cat.id,
        memberCount: children.length,
        budgetPct: derivePct(cat.budgetValue),
        budgetValue: cat.budgetValue,
      })
      // Category members are shown only when the category is expanded.
      if (!collapsedCategoryIds.has(cat.id)) {
        children.forEach(r => rows.push(r))
      }
    })

    // ...then the Standalone Properties group (always shown, always expanded) last.
    const standaloneChildren: TableRow[] = standaloneBpids
      .map(bpid => propertyByBpid.get(bpid))
      .filter((o): o is PropertyOption => Boolean(o))
      .map(o => {
        const b = propertyBudgets[o.bpid] ?? { pct: 0, value: 0 }
        return {
          key: `sa-${o.bpid}`,
          rowType: 'standalone' as const,
          label: `${o.advertiserName} (${String(o.bpid).toUpperCase()})`,
          bpid: o.bpid,
          groupId: 'standalone',
          activity: 'REGULAR_CAMPAIGN',
          budgetPct: derivePct(b.value),
          budgetValue: b.value,
        }
      })

    rows.push({
      key: STANDALONE_GROUP_KEY,
      rowType: 'standalone-group',
      label: 'Properties',
      activity: 'REGULAR_CAMPAIGN',
      memberCount: standaloneChildren.length,
    })
    standaloneChildren.forEach(r => rows.push(r))

    return rows
  }, [categories, standaloneBpids, propertyByBpid, propertyBudgets, pctBase, collapsedCategoryIds])

  // Total allocated as a % of the base (contract budget, or total entered when none).
  const allocatedPct = React.useMemo(() => {
    if (pctBase <= 0) return 0
    return round2((totalEnteredValue / pctBase) * 100)
  }, [totalEnteredValue, pctBase])



  // ---- Columns ----

  // A budget row exists only on categories and standalone properties.
  // Group rows (Standalone group) and category-member rows carry no budget.
  const hasBudget = (record: TableRow) =>
    record.rowType === 'category' || record.rowType === 'standalone'

  const applyBudgetChange = (record: TableRow, n: number) => {
    if (record.rowType === 'category' && record.categoryId) setCategoryBudget(record.categoryId, n)
    else if (record.rowType === 'standalone' && record.bpid) setStandaloneBudget(record.bpid, n)
  }

  // Renders one of the two budget columns. `column` is 'PCT' or 'VALUE'.
  // The column matching the active allocation mode is editable; the other is read-only.
  const renderBudgetColumn = (record: TableRow, column: AllocationMode) => {
    if (!hasBudget(record)) return <Text.Body>—</Text.Body>
    const editable = column === allocationMode
    const val = column === 'PCT' ? record.budgetPct ?? 0 : record.budgetValue ?? 0
    if (!editable) {
      return (
        <Text.Body>
          {column === 'PCT' ? `${formatNumber(val)}%` : formatCurrencyWithSuffixSymbol(val, currencyCode, { min: 0, max: 0 })}
        </Text.Body>
      )
    }
    return (
      <InputNumber
        id={`mediaplan_product_settings-budget_${column.toLowerCase()}-${record.key}-inp`}
        value={val}
        onChange={(v: number | string | null) => applyBudgetChange(record, Number(v ?? 0))}
        affixAfter={column === 'PCT' ? undefined : currencySymbol}
        formatter={(v) => (v != null && v !== '' ? formatNumber(Number(v)) : '')}
      />
    )
  }

  const kebabItems = (record: TableRow): any[] => {
    if (record.rowType === 'standalone') {
      const bpid = record.bpid ?? ''
      const nonRcGroups = categories.filter(c => !isRegularCampaign(c.activity))
      const removable = memberOfAnyCategory(bpid)
      const items: any[] = []

      // "Move to" — EVERY budget group. Moving removes the property from Standalone.
      // For an RC target, plan-wide uniqueness still applies (guarded below).
      if (categories.length > 0) {
        items.push({
          key: 'grp-move',
          type: 'group',
          label: 'Move to',
          children: categories.map(c => {
            const rc = isRegularCampaign(c.activity)
            // A standalone property's RC home is standalone, so moving to any group is
            // valid; guard only against the rare already-elsewhere RC case.
            const blocked = rc && hasRcElsewhere(bpid, 'standalone')
            return {
              key: `move-${c.id}`,
              label: <span>{c.name}</span>,
              disabled: blocked,
              onClick: () => !blocked && bpid && addPropertyToCategory(bpid, c.id, 'standalone', 'move'),
            }
          }),
        })
      }

      // "Add to" — only non-Regular Campaign budget groups (adds an independent copy;
      // the property stays in Standalone).
      if (nonRcGroups.length > 0) {
        items.push({
          key: 'grp-add',
          type: 'group',
          label: 'Add to',
          children: nonRcGroups.map(c => ({
            key: `add-${c.id}`,
            label: <span>{c.name}</span>,
            onClick: () => bpid && addPropertyToCategory(bpid, c.id, 'standalone', 'add'),
          })),
        })
      }

      if (items.length > 0) items.push({ key: 'div-1', type: 'divider' })

      // "Remove from Standalone" — only when the property lives in another group.
      items.push({
        key: 'remove-standalone',
        label: (
          <span>
            Remove from Standalone
          </span>
        ),
        disabled: !removable,
        onClick: () => removable && bpid && removeFromStandalone(bpid),
      })

      return items
    }
    if (record.rowType === 'category-property') {
      const parentCat = record.categoryId ? rcCategoryById(record.categoryId) : undefined
      const rc = isRegularCampaign(parentCat?.activity)
      return [
        {
          key: 'remove',
          label: <span>{rc ? 'Remove (back to Standalone)' : 'Remove from category'}</span>,
          onClick: () =>
            record.bpid && record.categoryId && removePropertyFromCategory(record.bpid, record.categoryId),
        },
      ]
    }
    if (record.rowType === 'category') {
      return [
        {
          key: 'edit',
          label: <span>Edit Name / Activity</span>,
          onClick: () => record.categoryId && setEditingCategoryId(record.categoryId),
        },
        {
          key: 'remove-category',
          label: <span>Remove Category</span>,
          onClick: () => record.categoryId && removeCategory(record.categoryId),
        },
      ]
    }
    return []
  }

  // Members (bpids) of a parent row: 'standalone' group or a category.
  const groupMemberBpids = (record: TableRow): string[] => {
    if (record.rowType === 'standalone-group') return standaloneBpids
    if (record.rowType === 'category' && record.categoryId) {
      return categories.find(c => c.id === record.categoryId)?.memberBpids ?? []
    }
    return []
  }

  const groupIdOf = (record: TableRow): string =>
    record.rowType === 'standalone-group' ? 'standalone' : (record.categoryId ?? '')

  // Bulk action menu items for a selected set of properties in a source group.
  // Mirrors the per-row kebab (Move to / Add to / Remove) but applies to all selected.
  const bulkActionItems = (sourceGroupId: string, selected: string[]): any[] => {
    if (selected.length === 0) return []
    const items: any[] = []
    const nonRcGroups = categories.filter(c => !isRegularCampaign(c.activity) && c.id !== sourceGroupId)

    if (sourceGroupId === 'standalone') {
      // Move to — every category (RC move enforces uniqueness; only movable ones apply).
      if (categories.length > 0) {
        items.push({
          key: 'bulk-move-grp',
          type: 'group',
          label: 'Move to',
          children: categories.map(c => {
            const rc = isRegularCampaign(c.activity)
            const movable = rc
              ? selected.filter(b => !hasRcElsewhere(b, 'standalone'))
              : selected
            return {
              key: `bulk-move-${c.id}`,
              label: <span>{c.name}</span>,
              disabled: movable.length === 0,
              onClick: () => movable.forEach(b => addPropertyToCategory(b, c.id, 'standalone', 'move')),
            }
          }),
        })
      }
      // Add to — non-RC categories (copy).
      if (nonRcGroups.length > 0) {
        items.push({
          key: 'bulk-add-grp',
          type: 'group',
          label: 'Add to',
          children: nonRcGroups.map(c => ({
            key: `bulk-add-${c.id}`,
            label: <span>{c.name}</span>,
            onClick: () => selected.forEach(b => addPropertyToCategory(b, c.id, 'standalone', 'add')),
          })),
        })
      }
      if (items.length > 0) items.push({ key: 'bulk-div', type: 'divider' })
      // Remove from Standalone — only those that live in another group.
      const removable = selected.filter(b => memberOfAnyCategory(b))
      items.push({
        key: 'bulk-remove-standalone',
        label: <span>Remove from Standalone ({removable.length})</span>,
        disabled: removable.length === 0,
        onClick: () => removable.forEach(b => removeFromStandalone(b)),
      })
      return items
    }

    // Source is a category.
    const srcCat = rcCategoryById(sourceGroupId)
    const srcIsRc = isRegularCampaign(srcCat?.activity)

    // Move to — other groups (Standalone only when source is RC), and other categories.
    const moveChildren: any[] = []
    if (srcIsRc) {
      moveChildren.push({
        key: 'bulk-move-standalone',
        label: <span>Properties</span>,
        onClick: () => moveProperties(selected, 'standalone', sourceGroupId),
      })
    }
    categories.forEach(c => {
      if (c.id === sourceGroupId) return
      const rc = isRegularCampaign(c.activity)
      moveChildren.push({
        key: `bulk-move-${c.id}`,
        label: <span>{rc ? 'Move to' : 'Add to'}: {c.name}</span>,
        onClick: () => selected.forEach(b => addPropertyToCategory(b, c.id, sourceGroupId, rc ? 'move' : 'add')),
      })
    })
    if (moveChildren.length > 0) {
      items.push({ key: 'bulk-move-grp', type: 'group', label: 'Move / Add to', children: moveChildren })
      items.push({ key: 'bulk-div', type: 'divider' })
    }
    // Remove from this category.
    items.push({
      key: 'bulk-remove',
      label: <span>{srcIsRc ? 'Remove (back to Standalone)' : 'Remove from category'} ({selected.length})</span>,
      onClick: () => selected.forEach(b => removePropertyFromCategory(b, sourceGroupId)),
    })
    return items
  }

  const propertyColumns: ColumnsType<TableRow> = [
    {
      title: <TableHeaderText>Budget Category / Property</TableHeaderText>,
      dataIndex: 'label',
      key: 'label',
      width: '40%',
      render: (value: string, record: TableRow) => {
        // Inline edit mode for a category name/activity.
        if (record.rowType === 'category' && editingCategoryId === record.categoryId) {
          return (
            <InlineCategoryRow>
              <Input
                id={`mediaplan_product_settings-edit_category_name-${record.categoryId}-inp`}
                label='Category Name'
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  record.categoryId && updateCategory(record.categoryId, { name: e.target.value })
                }
              />
              <Select<string>
                id={`mediaplan_product_settings-edit_category_activity-${record.categoryId}-sel`}
                label='Activity'
                value={record.activity}
                options={ACTIVITY_OPTIONS}
                onChange={(v: string) => record.categoryId && updateCategory(record.categoryId, { activity: v })}
              />
              <Button
                id={`mediaplan_product_settings-edit_category_done-${record.categoryId}-btn`}
                onClick={() => setEditingCategoryId(null)}
              >
                Done
              </Button>
            </InlineCategoryRow>
          )
        }

        // Parent group rows (Standalone group / Category): name + count + activity tag,
        // a select-all checkbox for its members, and a Move-to dropdown when any are selected.
        if (record.rowType === 'standalone-group' || record.rowType === 'category') {
          const members = groupMemberBpids(record)
          const srcGroupId = groupIdOf(record)
          // Selected bpids scoped to THIS group's rows only.
          const selectedHere = members.filter(b => selectedProps.has(rowSelKey(srcGroupId, b)))
          const allSelected = members.length > 0 && selectedHere.length === members.length
          const someSelected = selectedHere.length > 0
          const isCategory = record.rowType === 'category'
          const collapsed = isCategory && record.categoryId
            ? collapsedCategoryIds.has(record.categoryId)
            : false
          return (
            <ParentLabel>
              {isCategory ? (
                <ExpandIconBtn
                  role='button'
                  aria-label={collapsed ? 'Expand category' : 'Collapse category'}
                  onClick={() => record.categoryId && toggleCategoryCollapsed(record.categoryId)}
                >
                  <Icon name={collapsed ? 'chevronRight' : 'chevronDown'} width={12} height={12} color={colors.cloud_80} />
                </ExpandIconBtn>
              ) : (
                // Standalone group is always expanded (static chevron, no toggle).
                <ExpandIconBtn as='span' style={{ cursor: 'default' }}>
                  <Icon name='chevronDown' width={12} height={12} color={colors.cloud_80} />
                </ExpandIconBtn>
              )}
              <Checkbox
                id={`mediaplan_product_settings-selectall-${record.key}-chk`}
                checked={allSelected}
                disabled={members.length === 0}
                onChange={(e: { target: { checked: boolean } }) => {
                  const on = e.target.checked
                  setSelectedProps(prev => {
                    const next = new Set(prev)
                    members.forEach(b => (on ? next.add(rowSelKey(srcGroupId, b)) : next.delete(rowSelKey(srcGroupId, b))))
                    return next
                  })
                }}
              />
              <Text.Body><strong>{value}</strong></Text.Body>
              <Text.Body><span style={{ color: colors.cloud_50 }}>Properties: {record.memberCount ?? 0}</span></Text.Body>
              {someSelected && bulkActionItems(srcGroupId, selectedHere).length > 0 && (
                <DropdownMenu items={bulkActionItems(srcGroupId, selectedHere)}>
                  <span>
                    <Button id={`mediaplan_product_settings-bulk_actions-${record.key}-btn`} size='small' variant='outlined'>
                      Bulk actions ({selectedHere.length})
                    </Button>
                  </span>
                </DropdownMenu>
              )}
            </ParentLabel>
          )
        }

        // Property rows (standalone or category member): indent + checkbox + label.
        const bpid = record.bpid ?? ''
        return (
          <PropertyLabel>
            <ExpandIconSpacer />
            <Checkbox
              id={`mediaplan_product_settings-select-${record.key}-chk`}
              checked={selectedProps.has(rowSelKey(record.groupId ?? 'standalone', bpid))}
              onChange={(e: { target: { checked: boolean } }) =>
                togglePropSelected(record.groupId ?? 'standalone', bpid, e.target.checked)
              }
            />
            <Text.Body>{value}</Text.Body>
          </PropertyLabel>
        )
      },
    },
    {
      title: <TableHeaderText>Source</TableHeaderText>,
      key: 'source',
      width: '12%',
      render: (_: unknown, record: TableRow) => {
        // Parent rows (Standalone group / Category): show the activity chip here so it
        // aligns in the same column as the Salesforce chips.
        if (record.rowType === 'standalone-group' || record.rowType === 'category') {
          return (
            <Tag status='primary'>{ACTIVITY_LABEL[record.activity ?? ''] ?? record.activity}</Tag>
          )
        }
        // Property rows: show the Salesforce chip when the property is a Ship_To source.
        const bpid = record.bpid ?? ''
        if (!lockedBpids.has(bpid)) return null
        return <SalesforceChip id={`mediaplan_product_settings-sf_chip-${record.key}`}>Salesforce</SalesforceChip>
      },
    },
    {
      title: (
        <BudgetPctHeader>
          <TableHeaderText>Budget (%)</TableHeaderText>
          <AllocatedBadge id='mediaplan_product_settings-allocated-txt'>
            Total % : {formatNumber(allocatedPct)}%
          </AllocatedBadge>
        </BudgetPctHeader>
      ),
      key: 'budgetPct',
      width: '18%',
      render: (_: unknown, record: TableRow) => renderBudgetColumn(record, 'PCT'),
    },
    {
      title: (
        <BudgetPctHeader>
          <TableHeaderText>Budget ({currencySymbol})</TableHeaderText>
          <AllocatedBadge id='mediaplan_product_settings-total-txt'>
            Total: {formatCurrencyWithSuffixSymbol(totalEnteredValue, currencyCode, { min: 0, max: 0 })}
          </AllocatedBadge>
        </BudgetPctHeader>
      ),
      key: 'budgetValue',
      width: '18%',
      render: (_: unknown, record: TableRow) => renderBudgetColumn(record, 'VALUE'),
    },
    {
      title: '',
      key: 'actions',
      width: '6%',
      align: 'center',
      render: (_: unknown, record: TableRow) => {
        const items = kebabItems(record)
        if (items.length === 0) return null
        return (
          <DropdownMenu
            menuType='kebab'
            items={items}
          />
        )
      },
    },
  ]

  const feeRows = React.useMemo(() => (activeProduct ? buildFeeRows(activeProduct.fees) : []), [activeProduct])
  const feeColumns: ColumnsType<FeeRow> = [
    { title: <TableHeaderText>Fee</TableHeaderText>, dataIndex: 'fee', key: 'fee' },
    { title: <TableHeaderText>Charge Type</TableHeaderText>, dataIndex: 'chargeType', key: 'chargeType' },
    { title: <TableHeaderText>Amount / Value</TableHeaderText>, dataIndex: 'amount', key: 'amount' },
  ]

  const productTabItems = plan.products.map(product => ({
    key: product.id,
    label: <span id={`mediaplan_product_settings-tab-${product.id}-txt`}>{product.name}</span>,
    children: null,
  }))

  return (
    <MediaplannerWrapper>
      <div id='mediaplan_product_settings-breadcrumb-nav'>
        <Breadcrumb
          defaultHome
          items={[
            { title: 'Media Plans', href: '/mediaplanner' },
            { title: isNewPlan ? 'New Media Plan' : 'Media Plan Settings' },
          ]}
        />
      </div>

      <PlanTitleHeader
        titleId='mediaplan_product_settings-ttl'
        title={planName}
        status={
          planId && gsLoading
            ? undefined
            : resolveHeaderStatus(gsData?.GetMediaPlan?.generalSettings?.planInformation?.status, false)
        }
        versionCount={versions.length}
        onOpenVersions={() => setIsVersionsOpen(true)}
      />

      <Stepper
        id='mediaplan_product_settings-stepper'
        current={1}
        items={[
          {
            title: 'General Settings',
            status: 'finish',
            ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/edit/${planId}`, { state: { isNewPlan } }) }),
          },
          { title: 'Product Settings', status: 'process' },
          {
            title: 'Budget Distribution',
            status: 'wait',
            ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } }) }),
          },
          {
            title: 'Media Plan',
            status: 'wait',
            ...(isDetailsView && { onClick: () => navigate(`/mediaplanner/download-summary/${planId}`, { state: { isNewPlan } }) }),
          },
        ]}
      />

      {/* Prototype-only: emulate the Salesforce intake shape. Replaced by the real SF connection. */}
      {!planFromId && (
        <ScenarioEmulatorBar>
          <ScenarioEmulatorLabel>
            {/* violet-60 (df/color/tip) — not exported in DF colors, raw hex */}
            <Icon name='database' width={14} height={14} color='#9240cc' />
            Salesforce scenario (prototype)
          </ScenarioEmulatorLabel>
          <Select<SalesforceScenarioId>
            id='mediaplan_product_settings-sf_scenario-sel'
            value={activeScenarioId}
            options={MOCK_SF_SCENARIOS.map(s => ({ label: s.label, value: s.id }))}
            onChange={(value: SalesforceScenarioId) => setActiveScenarioId(value)}
          />
          <ScenarioEmulatorHint>Emulates the Salesforce intake. Replaced by the live connection.</ScenarioEmulatorHint>
        </ScenarioEmulatorBar>
      )}

      {/* Section 1 — Product tabs (outside the cards) */}
      <ProductTabsBar>
        <Tab
          id='mediaplan_product_settings-product_tabs-tab'
          activeKey={activeProductId}
          onChange={setActiveProductId}
          items={productTabItems}
        />
      </ProductTabsBar>

      {/* Card 1 — Summary */}
      <Card>
        <CardTitle id='mediaplan_product_settings-summary-ttl'>Summary</CardTitle>
        <SummaryGrid>
          <SummaryItem>
            <SummaryLabel>Pricing Model</SummaryLabel>
            <SummaryValue>{activeProduct?.pricingModelLabel ?? '—'}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Currency</SummaryLabel>
            <SummaryValue>{currencyCode}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Bill To</SummaryLabel>
            <SummaryValue>
              {activeProduct?.billTo?.name ?? '—'}
              {activeProduct?.billTo?.accountReference ? ` (${activeProduct.billTo.accountReference})` : ''}
            </SummaryValue>
          </SummaryItem>
        </SummaryGrid>
      </Card>

      {/* Card 2 — Fee summary */}
      <Card>
        <CardHeaderRow>
          <Text.H5 id='mediaplan_product_settings-fees-ttl'>Fee Summary</Text.H5>
        </CardHeaderRow>
        <Table
          id='mediaplan_product_settings-fees-tbl'
          columns={feeColumns}
          dataSource={feeRows}
          pagination={false}
        />
      </Card>

      {/* Card 3 — Properties */}
      <Card>
        <CardHeaderRow>
          <Text.H5 id='mediaplan_product_settings-properties-ttl'>Properties</Text.H5>
          <PropertiesActions>
            <ToggleTab<AllocationMode>
              value={allocationMode}
              onChange={v => hasContractBudget && setAllocationMode(v)}
              disabled={!hasContractBudget}
              options={[
                { label: <span id='mediaplan_product_settings-alloc_pct-tab'>Budget %</span>, value: 'PCT' },
                { label: <span id='mediaplan_product_settings-alloc_value-tab'>Budget Value</span>, value: 'VALUE' },
              ]}
            />
            <Button
              id='mediaplan_product_settings-property_settings-btn'
              variant='outlined'
              onClick={() => setIsDrawerOpen(true)}
            >
              Property Settings
            </Button>
            <Button
              id='mediaplan_product_settings-add_category-btn'
              variant='outlined'
              onClick={startAddCategory}
              disabled={isAddingCategory}
            >
              Add Budget Category
            </Button>
          </PropertiesActions>
        </CardHeaderRow>

        {isAddingCategory && (
          <InlineCategoryRow>
            <Input
              id='mediaplan_product_settings-new_category_name-inp'
              label='Category Name'
              value={newCatName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCatName(e.target.value)}
            />
            <Select<string>
              id='mediaplan_product_settings-new_category_activity-sel'
              label='Activity'
              value={newCatActivity}
              options={ACTIVITY_OPTIONS}
              onChange={(v: string) => {
                setNewCatActivity(v)
                // Pre-fill the name from the activity if the user hasn't customized it.
                setNewCatName(prev => (prev.trim() === '' || ACTIVITY_LABEL[newCatActivity] === prev ? ACTIVITY_LABEL[v] : prev))
              }}
            />
            <InlineCategoryActions>
              <Button id='mediaplan_product_settings-new_category_confirm-btn' onClick={confirmAddCategory}>
                Add
              </Button>
              <Button
                id='mediaplan_product_settings-new_category_cancel-btn'
                variant='outlined'
                onClick={() => setIsAddingCategory(false)}
              >
                Cancel
              </Button>
            </InlineCategoryActions>
          </InlineCategoryRow>
        )}

        {advLoading ? (
          <Spinner />
        ) : (
          <PropertiesTableWrap>
            <Table
              id='mediaplan_product_settings-properties-tbl'
              columns={propertyColumns}
              dataSource={tableRows}
              pagination={false}
              {...({
                // rowClassName is forwarded to the underlying Ant table (the design-factory
                // Table spreads unknown props through) to style parent group rows.
                rowClassName: (record: TableRow) =>
                  record.rowType === 'standalone-group' || record.rowType === 'category'
                    ? 'mediaplan-parent-row'
                    : '',
              } as any)}
            />
          </PropertiesTableWrap>
        )}

      </Card>

      <StickyFooter>
        <Button
          href='/mediaplanner'
          variant='outlined'
          color='primary'
          id='mediaplan_product_settings-cancel-btn'
          disabled={isSavingVersion}
        >
          Cancel
        </Button>
        {isSavingVersion ? (
          <SaveVersionInline>
            <Input
              id='mediaplan_product_settings-save_version_name-inp'
              placeholder='Version name'
              value={versionName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVersionName(e.target.value)}
            />
            <Button
              id='mediaplan_product_settings-save_version_confirm-btn'
              variant='solid'
              color='primary'
              onClick={confirmSaveAsVersion}
            >
              Save
            </Button>
            <Button
              id='mediaplan_product_settings-save_version_cancel-btn'
              variant='outlined'
              color='primary'
              aria-label='Cancel saving version'
              onClick={() => setIsSavingVersion(false)}
            >
              ×
            </Button>
          </SaveVersionInline>
        ) : (
          <Button
            id='mediaplan_product_settings-save_as_version-btn'
            variant='outlined'
            color='primary'
            onClick={() => {
              setVersionName('')
              setIsSavingVersion(true)
            }}
          >
            Save as Version
          </Button>
        )}
        {isDetailsView && (
          <Button
            id='mediaplan_product_settings-submit-btn'
            disabled={isSavingVersion}
            onClick={() => navigate(`/mediaplanner/budget-distribution/${planId}`, { state: { isNewPlan } })}
          >
            Save & Continue
          </Button>
        )}
      </StickyFooter>

      <PropertySettingsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lockedBpids={lockedBpids}
        selectedBpids={selectedBpids}
        nonRemovableBpids={nonRemovableBpids}
        onSave={setSelectedBpids}
      />

      <PlanVersionsDrawer
        planId={planId}
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        captureSnapshot={captureSnapshot}
        onView={handleViewVersion}
      />
    </MediaplannerWrapper>
  )
}

export default MediaplannerProductSettings
