"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_oba-ui_ObaGqlProvider_londonerObaMock_ts"],{

/***/ "./apps/oba-ui/ObaGqlProvider/londonerObaMock.ts"
/*!*******************************************************!*\
  !*** ./apps/oba-ui/ObaGqlProvider/londonerObaMock.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GBP_CURRENCY: () => (/* binding */ GBP_CURRENCY),
/* harmony export */   LONDONER_ADVERTISER_ID: () => (/* binding */ LONDONER_ADVERTISER_ID),
/* harmony export */   LONDONER_CAMPAIGN_CATALOG: () => (/* binding */ LONDONER_CAMPAIGN_CATALOG),
/* harmony export */   LONDONER_OBA_PLAN_IDS: () => (/* binding */ LONDONER_OBA_PLAN_IDS),
/* harmony export */   LONDONER_OBA_PLAN_ID_2026: () => (/* binding */ LONDONER_OBA_PLAN_ID_2026),
/* harmony export */   LONDONER_OBA_PLAN_ID_2027: () => (/* binding */ LONDONER_OBA_PLAN_ID_2027),
/* harmony export */   LONDONER_OBA_PLAN_NAME_2026: () => (/* binding */ LONDONER_OBA_PLAN_NAME_2026),
/* harmony export */   MOCK_CURRENCIES: () => (/* binding */ MOCK_CURRENCIES),
/* harmony export */   MOCK_TODAY: () => (/* binding */ MOCK_TODAY),
/* harmony export */   OBA_2026_TOTAL_BUDGET: () => (/* binding */ OBA_2026_TOTAL_BUDGET),
/* harmony export */   OBA_TOTAL_BUDGET: () => (/* binding */ OBA_TOTAL_BUDGET),
/* harmony export */   advertiserNameEntities: () => (/* binding */ advertiserNameEntities),
/* harmony export */   applyCampaignPause: () => (/* binding */ applyCampaignPause),
/* harmony export */   applyGroupUpdate: () => (/* binding */ applyGroupUpdate),
/* harmony export */   applyPlanPause: () => (/* binding */ applyPlanPause),
/* harmony export */   applyPlanUpdate: () => (/* binding */ applyPlanUpdate),
/* harmony export */   campaignDetailsEntity: () => (/* binding */ campaignDetailsEntity),
/* harmony export */   campaignNameEntities: () => (/* binding */ campaignNameEntities),
/* harmony export */   demoPlanId: () => (/* binding */ demoPlanId),
/* harmony export */   findGroup: () => (/* binding */ findGroup),
/* harmony export */   getPlan: () => (/* binding */ getPlan),
/* harmony export */   getPlans: () => (/* binding */ getPlans),
/* harmony export */   getPlansForAdvertiser: () => (/* binding */ getPlansForAdvertiser),
/* harmony export */   groupNameEntities: () => (/* binding */ groupNameEntities),
/* harmony export */   groupPlanEntity: () => (/* binding */ groupPlanEntity),
/* harmony export */   isMockAdvertiserId: () => (/* binding */ isMockAdvertiserId),
/* harmony export */   isMockPlanId: () => (/* binding */ isMockPlanId),
/* harmony export */   monthKeysOf: () => (/* binding */ monthKeysOf),
/* harmony export */   planEntity: () => (/* binding */ planEntity),
/* harmony export */   planLiteEntity: () => (/* binding */ planLiteEntity),
/* harmony export */   planNameEntities: () => (/* binding */ planNameEntities)
/* harmony export */ });
/* harmony import */ var _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _mediahub_mediahub_ui_pages_CampaignMapping_mockData_campaigns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/mockData/campaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/oba-ui/graphql/generated/oba-enums */ "./apps/oba-ui/graphql/generated/oba-enums.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * The Londoner Hotel — OBA (Omnichannel Budget Allocation) mock data.
 *
 * Two plans (same group structure), served by `obaMockLink` without touching the backend:
 *  - "The Londoner Hotel OBA 2027" (Scheduled, 2027-01-01..2027-12-31) — cross-module plan, matches
 *    the Media Plan period; nothing is spent yet (all months are in the future).
 *  - "The Londoner Hotel OBA 2026" (Live, 2026-01-01..2026-12-31) — carries spend history so the
 *    Details / Budget Distribution screens have realistic numbers.
 *
 * Money is Int53 CENTS (GBP whole pounds x100). Months are 'YYYY-MM'. Dates are 'YYYY-MM-DD'.
 * "Today" for the demo is pinned to MOCK_TODAY so past / current / future flags are deterministic.
 *
 * Ids are NUMERIC STRINGS on purpose: the OBA pages call `+planId` / `Number(planId)`, so a
 * non-numeric id such as 'oba-plan-londoner-2027' would turn into NaN.
 *
 * Metasearch is NOT part of OBA (billed outside it): OBA total = Paid Search + Display + Video.
 *
 * Besides the Londoner's two plans, ONE plan per demo advertiser (shared/demoAdvertisers.ts) is
 * generated below ("demo plans"): ids `${advertiserId}1` (e.g. '9200011'), group ids `${planId}${n}`.
 * Live demo plans carry spend history up to MOCK_TODAY (same buildSpend as the Londoner 2026 plan);
 * Scheduled demo plans (2027) have no spend.
 */




/** Pinned "today" (Nov 16 2026) used to compute past / current / future month flags. */
const MOCK_TODAY = '2026-11-16';
const MOCK_TODAY_MONTH = MOCK_TODAY.slice(0, 7);
const MOCK_TODAY_DAY = Number(MOCK_TODAY.slice(8, 10));
/**
 * OBA total budget (whole GBP) = Paid Search 192,000 + Display 120,000 + Video 96,000.
 * The full 480,000 contract (incl. 72,000 Metasearch) lives in the Media Plan, not in OBA.
 */
const OBA_TOTAL_BUDGET = 408000;
/** Budget of the 2026 plan (whole GBP). */
const OBA_2026_TOTAL_BUDGET = 420000;
const LONDONER_OBA_PLAN_ID_2027 = '9100771';
const LONDONER_OBA_PLAN_ID_2026 = '9100772';
const LONDONER_OBA_PLAN_NAME_2026 = 'The Londoner Hotel OBA 2026';
const LONDONER_OBA_PLAN_IDS = [LONDONER_OBA_PLAN_ID_2027, LONDONER_OBA_PLAN_ID_2026];
const LONDONER_ADVERTISER_ID = String(_mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.advertiserId);
const CENTS = 100;
const TS = '__typename';
// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------
const monthKeysOf = (period) => {
    let [y, m] = period.startDate.slice(0, 7).split('-').map(Number);
    const [ey, em] = period.endDate.slice(0, 7).split('-').map(Number);
    const out = [];
    while ((y < ey || (y === ey && m <= em)) && out.length < 120) {
        out.push(`${y}-${String(m).padStart(2, '0')}`);
        m += 1;
        if (m > 12) {
            m = 1;
            y += 1;
        }
    }
    return out;
};
/** London hotel seasonality (per mille): spring / summer peak, Christmas-market November. */
const SEASONALITY = [60, 60, 80, 85, 90, 90, 95, 90, 95, 85, 95, 75];
/**
 * Splits whole currency units across the plan's months by calendar-month seasonality; the result
 * sums EXACTLY to `units` (cents). For a Jan-Dec plan this equals the original Londoner split.
 */
const splitSeasonal = (units, months) => {
    const weights = months.map(m => SEASONALITY[Number(m.slice(5, 7)) - 1] ?? 80);
    const total = weights.reduce((a, b) => a + b, 0) || 1;
    const parts = weights.map(w => Math.floor((units * w) / total));
    let diff = units - parts.reduce((a, b) => a + b, 0);
    for (let i = 0; diff > 0 && parts.length; i = (i + 1) % parts.length, diff -= 1)
        parts[i] += 1;
    return parts.map(p => p * CENTS);
};
const PACING = [0.99, 1.01, 0.98, 1.0, 0.97, 1.02, 0.99, 1.01, 0.98, 1.0];
/** Deterministic spend history for a plan year relative to MOCK_TODAY (past months ~on pace). */
const buildSpend = (months, budgetCents, groupIndex) => {
    const spent = {};
    months.forEach((month, i) => {
        if (month < MOCK_TODAY_MONTH) {
            const pacing = PACING[(i + groupIndex) % PACING.length];
            spent[month] = Math.round((budgetCents[i] * pacing) / CENTS) * CENTS;
        }
        else if (month === MOCK_TODAY_MONTH) {
            const daysInMonth = 30;
            const elapsed = Math.max(0, MOCK_TODAY_DAY - 1) / daysInMonth;
            spent[month] = Math.round((budgetCents[i] * elapsed * 0.98) / CENTS) * CENTS;
        }
    });
    return spent;
};
// ---------------------------------------------------------------------------------------------
// Fixture definition
// ---------------------------------------------------------------------------------------------
const PLATFORMS = {
    googleAds: { id: '91007701', name: 'Google Ads' },
    amadeusDsp: { id: '91007702', name: 'Amadeus DSP' },
    dv360: { id: '91007703', name: 'DV360' },
};
/** Campaign ids / names ARE the Londoner rows in Campaign Setup (cm-ln0xx): names follow its Naming Convention String. */
const setupName = (id) => _mediahub_mediahub_ui_pages_CampaignMapping_mockData_campaigns__WEBPACK_IMPORTED_MODULE_1__.mappedCampaigns.find(c => c.id === id)?.campaignName ?? id;
const LONDONER_CAMPAIGN_CATALOG = [
    'cm-ln001', 'cm-ln002', 'cm-ln003', 'cm-ln004', 'cm-ln009', 'cm-ln010', 'cm-ln011', 'cm-ln013', 'cm-ln014',
].map(id => ({ id, name: setupName(id) }));
/** id -> name for every mock campaign (Londoner catalog + generated demo campaigns). */
const CAMPAIGN_NAMES = new Map(LONDONER_CAMPAIGN_CATALOG.map(c => [c.id, c.name]));
const campaignName = (id) => CAMPAIGN_NAMES.get(id) ?? id;
const ok = (id, weight) => ({ id, weight, status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active, message: '' });
const GROUP_DEFS = [
    {
        name: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.paidSearch.label,
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.PaidSearch,
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.GoogleAds,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Sa360,
        platform: PLATFORMS.googleAds,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Conversions,
        specs: 'Brand protection, non-brand and Performance Max for The Londoner Hotel (London). ' +
            'Metasearch (GBP 72,000) is billed outside OBA and is not part of this allocation.',
        bundles: [
            { tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Brand, campaigns: [ok('cm-ln001', 25)] },
            {
                tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Generic,
                campaigns: [
                    ok('cm-ln002', 30),
                    { id: 'cm-ln004', weight: 10, status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused, message: 'Recommendation paused' },
                ],
            },
            {
                tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Pmax,
                campaigns: [
                    {
                        id: 'cm-ln003',
                        weight: 35,
                        status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Warning,
                        message: 'Campaign is limited by the platform daily budget cap',
                    },
                ],
            },
        ],
        pounds2027: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.paidSearch.budget,
        pounds2026: 197000,
        bounds: { lower: 90, upper: 110 },
    },
    {
        name: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.display.label,
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Display,
        // No Amadeus DSP value exists in DeliveryPlatformEnum / MappingPlatformEnum: DV360 is used for the
        // enum fields and the platform label ({ name: 'Amadeus DSP' }) carries the real name.
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Dv360,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Dv360,
        platform: PLATFORMS.amadeusDsp,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Clicks,
        specs: 'Prospecting and remarketing display through Amadeus DSP targeting UK and EU leisure travellers.',
        bundles: [
            { tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Prospecting, campaigns: [ok('cm-ln009', 50)] },
            {
                tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Remarketing,
                campaigns: [
                    {
                        id: 'cm-ln010',
                        weight: 30,
                        status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Manual,
                        message: 'Budget must be updated manually in Amadeus DSP',
                    },
                ],
            },
            { tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.DemandGen, campaigns: [ok('cm-ln011', 20)] },
        ],
        pounds2027: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.display.budget,
        pounds2026: 123000,
        bounds: { lower: 85, upper: 115 },
    },
    {
        name: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.video.label,
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.YouTube,
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Dv360,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Dv360,
        platform: PLATFORMS.dv360,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Clicks,
        specs: 'Upper-funnel YouTube video (DV360) with remarketing to engaged viewers.',
        bundles: [
            { tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Prospecting, campaigns: [ok('cm-ln013', 65)] },
            {
                tactic: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Remarketing,
                campaigns: [{ id: 'cm-ln014', weight: 35, status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused, message: 'Recommendation paused' }],
            },
        ],
        pounds2027: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_CHANNELS.video.budget,
        pounds2026: 100000,
        bounds: { lower: 80, upper: 120 },
    },
];
const createPlan = (year) => {
    const planId = year === 2027 ? LONDONER_OBA_PLAN_ID_2027 : LONDONER_OBA_PLAN_ID_2026;
    const period = { startDate: `${year}-01-01`, endDate: `${year}-12-31` };
    const months = monthKeysOf(period);
    const status = year === 2027 ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Scheduled : _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Live;
    const updated = year === 2027 ? '2026-11-16' : '2026-11-15';
    const groups = GROUP_DEFS.map((def, gi) => {
        const groupId = `${planId}${gi + 1}`;
        const monthBudgetCents = splitSeasonal(year === 2027 ? def.pounds2027 : def.pounds2026, months);
        const bundles = [];
        const campaigns = [];
        def.bundles.forEach((b, bi) => {
            const bundleId = `${groupId}${bi + 1}`;
            bundles.push({
                id: bundleId,
                version: 1,
                channel: def.channel,
                deliveryPlatform: def.delivery,
                mappingPlatform: def.mapping,
                platform: def.platform,
                tactic: b.tactic,
                vendorCampaignIds: b.campaigns.map(c => c.id),
                lowerBoundPercent: null,
                upperBoundPercent: null,
            });
            b.campaigns.forEach(c => campaigns.push({
                id: c.id,
                name: campaignName(c.id),
                bundleId,
                weight: c.weight,
                status: c.status,
                resumeStatus: c.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active : c.status,
                statusMessage: c.message,
                lastUpdated: updated,
                previousUpdated: '2026-11-14',
            }));
        });
        return {
            id: groupId,
            version: 1,
            name: def.name,
            status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.GroupStatusEnum.Active,
            kpi: def.kpi,
            specs: def.specs,
            monthBudgetCents,
            monthSpentCents: year === 2026 ? buildSpend(months, monthBudgetCents, gi) : {},
            bundles,
            campaigns,
            channelBounds: { [def.channel]: { lower: def.bounds.lower, upper: def.bounds.upper } },
        };
    });
    return {
        id: planId,
        version: 1,
        name: year === 2027 ? _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_NAMES.obaPlan : LONDONER_OBA_PLAN_NAME_2026,
        status,
        unpausedStatus: status,
        currency: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.currency,
        advertiser: { id: LONDONER_ADVERTISER_ID, name: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name, bpid: _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid },
        marginPercent: 12.5,
        managementFeePercent: 10,
        dispatchOptIn: false,
        period,
        totalBudgetCents: (year === 2027 ? OBA_TOTAL_BUDGET : OBA_2026_TOTAL_BUDGET) * CENTS,
        groups,
    };
};
const DEMO_CHANNEL_SPECS = {
    paidSearch: {
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.PaidSearch,
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.GoogleAds,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Sa360,
        platform: PLATFORMS.googleAds,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Conversions,
        bounds: { lower: 90, upper: 110 },
        specs: 'Brand protection, non-brand and generic paid search (Google Ads / SA360). Metasearch is billed outside OBA.',
        bundles: [
            [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Brand, [['Paid Search_Brand_EN', 25]]],
            [
                _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Generic,
                [
                    ['Paid Search_Non-Brand_EN', 40],
                    ['Paid Search_Generic_EN', 35],
                ],
            ],
        ],
    },
    display: {
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Display,
        // No Amadeus DSP value exists in the enums: DV360 is used for the enum fields (as for the Londoner).
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Dv360,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Dv360,
        platform: PLATFORMS.amadeusDsp,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Clicks,
        bounds: { lower: 85, upper: 115 },
        specs: 'Prospecting and remarketing display through Amadeus DSP.',
        bundles: [
            [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Prospecting, [['Display_Prospecting_EN', 55]]],
            [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Remarketing, [['Display_Remarketing_EN', 45]]],
        ],
    },
    video: {
        channel: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.YouTube,
        delivery: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Dv360,
        mapping: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Dv360,
        platform: PLATFORMS.dv360,
        kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Clicks,
        bounds: { lower: 80, upper: 120 },
        specs: 'Upper-funnel YouTube video (DV360) with remarketing to engaged viewers.',
        bundles: [
            [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Prospecting, [['Video_Prospecting_EN', 65]]],
            [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.TacticEnum.Remarketing, [['Video_Remarketing_EN', 35]]],
        ],
    },
};
/** Rotating "variety" status (one campaign per demo plan is not plain Active). */
const demoStatusFor = (advIndex, suffix) => {
    const kind = advIndex % 3;
    if (kind === 0 && suffix === 'Paid Search_Non-Brand_EN') {
        return { status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Warning, message: 'Campaign is limited by the platform daily budget cap' };
    }
    if (kind === 1 && suffix === 'Display_Remarketing_EN') {
        return { status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused, message: 'Recommendation paused' };
    }
    if (kind === 2 && suffix === 'Display_Remarketing_EN') {
        return { status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Manual, message: 'Budget must be updated manually in Amadeus DSP' };
    }
    return { status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active, message: '' };
};
const demoPlanId = (adv) => `${adv.advertiserId}1`;
const createDemoPlan = (adv, advIndex) => {
    const planId = demoPlanId(adv);
    const period = { startDate: adv.startDate, endDate: adv.endDate };
    const months = monthKeysOf(period);
    const live = adv.obaStatus === 'Live';
    const status = live ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Live : _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Scheduled;
    const updated = live ? '2026-11-15' : '2026-11-16';
    let campaignSeq = 0;
    const channels = (0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.activeChannels)(adv).filter((c) => _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_CHANNEL_INFO[c].inOba);
    const groups = channels.map((channelKey, gi) => {
        const spec = DEMO_CHANNEL_SPECS[channelKey];
        const groupId = `${planId}${gi + 1}`;
        const monthBudgetCents = splitSeasonal(adv.budgets[channelKey], months);
        const bundles = [];
        const campaigns = [];
        spec.bundles.forEach(([tactic, defs], bi) => {
            const bundleId = `${groupId}${bi + 1}`;
            const vendorCampaignIds = [];
            defs.forEach(([suffix, weight]) => {
                campaignSeq += 1;
                const id = `oba-${adv.key}-${campaignSeq}`;
                const name = `${adv.campaignPrefix}_${suffix}`;
                CAMPAIGN_NAMES.set(id, name);
                vendorCampaignIds.push(id);
                const { status: cStatus, message } = demoStatusFor(advIndex, suffix);
                campaigns.push({
                    id,
                    name,
                    bundleId,
                    weight,
                    status: cStatus,
                    resumeStatus: cStatus === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active : cStatus,
                    statusMessage: message,
                    lastUpdated: updated,
                    previousUpdated: '2026-11-14',
                });
            });
            bundles.push({
                id: bundleId,
                version: 1,
                channel: spec.channel,
                deliveryPlatform: spec.delivery,
                mappingPlatform: spec.mapping,
                platform: spec.platform,
                tactic,
                vendorCampaignIds,
                lowerBoundPercent: null,
                upperBoundPercent: null,
            });
        });
        return {
            id: groupId,
            version: 1,
            name: _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_CHANNEL_INFO[channelKey].label,
            status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.GroupStatusEnum.Active,
            kpi: spec.kpi,
            specs: spec.specs,
            monthBudgetCents,
            monthSpentCents: live ? buildSpend(months, monthBudgetCents, gi) : {},
            bundles,
            campaigns,
            channelBounds: { [spec.channel]: { lower: spec.bounds.lower, upper: spec.bounds.upper } },
        };
    });
    return {
        id: planId,
        version: 1,
        name: adv.obaPlanName,
        status,
        unpausedStatus: status,
        currency: adv.currency,
        advertiser: { id: String(adv.advertiserId), name: adv.name, bpid: adv.bpid },
        marginPercent: 12.5,
        managementFeePercent: 10,
        dispatchOptIn: false,
        period,
        totalBudgetCents: adv.obaBudget * CENTS,
        groups,
    };
};
/**
 * In-memory plan state (mutations update it; lost on reload).
 * Order matters: the Londoner plans first, then the demo plans in DEMO_ADVERTISERS order.
 */
const plans = [createPlan(2027), createPlan(2026), ..._mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_ADVERTISERS.map(createDemoPlan)];
/** True for any mock plan id (Londoner or demo advertiser). */
const isMockPlanId = (id) => id != null && plans.some(p => p.id === String(id));
/** True for the (synthetic) advertiser id of the Londoner or any demo advertiser. */
const isMockAdvertiserId = (id) => id != null && (String(id) === LONDONER_ADVERTISER_ID || _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_ADVERTISERS.some(a => String(a.advertiserId) === String(id)));
const getPlans = () => plans;
/** Plans of one advertiser by BPID: the Londoner has two, a demo advertiser one, anyone else none. */
const getPlansForAdvertiser = (bpid) => {
    const key = String(bpid ?? '').trim().toLowerCase();
    return plans.filter(p => p.advertiser.bpid.toLowerCase() === key);
};
const getPlan = (id) => plans.find(p => p.id === String(id));
const findGroup = (id) => {
    for (const plan of plans) {
        const group = plan.groups.find(g => g.id === String(id));
        if (group)
            return { plan, group };
    }
    return undefined;
};
// ---------------------------------------------------------------------------------------------
// Derived numbers
// ---------------------------------------------------------------------------------------------
const sum = (values) => values.reduce((a, b) => a + b, 0);
const groupSpent = (group) => sum(Object.values(group.monthSpentCents));
const planSpent = (plan) => sum(plan.groups.map(groupSpent));
const planAllotted = (plan) => sum(plan.groups.map(g => sum(g.monthBudgetCents)));
const budget = (budgetCents, spentCents, allottedCents = budgetCents) => ({
    [TS]: 'Budget',
    allocatedCents: allottedCents,
    allotedCents: allottedCents,
    allottedCents,
    budgetCents,
    originalBudgetCents: budgetCents,
    originalCents: budgetCents,
    overSpentCents: Math.max(0, spentCents - budgetCents),
    spentCents,
    unSpentCents: Math.max(0, budgetCents - spentCents),
});
const idName = (id, name) => ({ [TS]: 'IdAndName', id, name, notFound: false });
/** Index of the month recommendations refer to: current month, else the first future month. */
const referenceMonthIndex = (months) => {
    const current = months.indexOf(MOCK_TODAY_MONTH);
    if (current >= 0)
        return current;
    return months.findIndex(m => m > MOCK_TODAY_MONTH);
};
// ---------------------------------------------------------------------------------------------
// Entity builders (full objects; the link prunes them to each query's selection set)
// ---------------------------------------------------------------------------------------------
const advertiserEntity = (advertiser) => ({
    [TS]: 'AdvertiserName',
    id: advertiser.id,
    bid: advertiser.id,
    name: advertiser.name,
    bpid: advertiser.bpid,
    notFound: false,
});
const periodEntity = (plan) => ({ [TS]: 'Period', ...plan.period });
const planTotalBudget = (plan) => budget(plan.totalBudgetCents, planSpent(plan), planAllotted(plan));
const monthBudgetEntities = (plan, group) => monthKeysOf(plan.period).map((month, i) => ({
    [TS]: 'MonthBudget',
    month,
    past: month < MOCK_TODAY_MONTH,
    current: month === MOCK_TODAY_MONTH,
    future: month > MOCK_TODAY_MONTH,
    budget: budget(group.monthBudgetCents[i] ?? 0, group.monthSpentCents[month] ?? 0),
}));
const bundleEntity = (group, bundle) => ({
    [TS]: 'BundlePlan',
    id: bundle.id,
    version: bundle.version,
    groupId: group.id,
    group: idName(group.id, group.name),
    channel: bundle.channel,
    deliveryPlatform: bundle.deliveryPlatform,
    mappingPlatform: bundle.mappingPlatform,
    platform: idName(bundle.platform.id, bundle.platform.name),
    tactic: bundle.tactic,
    vendorCampaignIds: bundle.vendorCampaignIds,
    vendorCampaigns: bundle.vendorCampaignIds.map(id => ({
        [TS]: 'VendorCampaign',
        Id: id,
        name: campaignName(id),
        Status: group.campaigns.find(c => c.id === id)?.status ?? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active,
    })),
    lowerBoundPercent: bundle.lowerBoundPercent,
    upperBoundPercent: bundle.upperBoundPercent,
    updated: null,
});
const channelSettings = (group, channel) => {
    const bounds = group.channelBounds[channel];
    return bounds ? { [TS]: 'ChannelSettings', lowerBoundPercent: bounds.lower, upperBoundPercent: bounds.upper } : null;
};
const liteEntity = (plan) => ({
    [TS]: 'AdvertiserPlanLite',
    id: plan.id,
    version: plan.version,
    name: plan.name,
    status: plan.status,
    unpausedStatus: plan.unpausedStatus,
    advertiserId: plan.advertiser.id,
    advertiser: advertiserEntity(plan.advertiser),
    currency: plan.currency,
    dispatchMode: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DispatchModeEnum.Off,
    dispatchOptIn: plan.dispatchOptIn,
    managementFeePercent: plan.managementFeePercent,
    marginPercent: plan.marginPercent,
    nbGroups: plan.groups.length,
    nbCampaigns: sum(plan.groups.map(g => g.campaigns.length)),
    nbIncludedCampaigns: sum(plan.groups.map(g => g.campaigns.filter(c => c.status !== _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused).length)),
    period: periodEntity(plan),
    totalBudget: planTotalBudget(plan),
    updated: null,
});
const groupPlanEntity = (plan, group) => ({
    [TS]: 'GroupPlan',
    id: group.id,
    version: group.version,
    advertiserPlanId: plan.id,
    advertiserPlan: liteEntity(plan),
    name: group.name,
    status: group.status,
    kpi: group.kpi,
    specs: group.specs,
    bundles: group.bundles.map(b => bundleEntity(group, b)),
    monthBudgets: monthBudgetEntities(plan, group),
    totalBudget: budget(sum(group.monthBudgetCents), groupSpent(group)),
    paidSearchChannel: channelSettings(group, _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.PaidSearch),
    facebookChannel: channelSettings(group, _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Facebook),
    displayChannel: channelSettings(group, _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Display),
    youtubeChannel: channelSettings(group, _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.YouTube),
    updated: null,
});
const campaignDetailsEntity = (plan, group, campaign) => {
    const bundle = group.bundles.find(b => b.id === campaign.bundleId) ?? group.bundles[0];
    const months = monthKeysOf(plan.period);
    const refIdx = referenceMonthIndex(months);
    const totalWeight = sum(group.campaigns.map(c => c.weight)) || 1;
    const share = campaign.weight / totalWeight;
    const isPaused = campaign.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused;
    let monthly = null;
    let daily = null;
    if (!isPaused && refIdx >= 0) {
        const refMonth = months[refIdx];
        const monthBudget = group.monthBudgetCents[refIdx] ?? 0;
        monthly = Math.round((monthBudget * share) / CENTS) * CENTS;
        if (refMonth === MOCK_TODAY_MONTH) {
            const remainingDays = Math.max(1, 30 - MOCK_TODAY_DAY + 1);
            const remaining = Math.max(0, monthBudget - (group.monthSpentCents[refMonth] ?? 0));
            daily = Math.round((remaining * share) / remainingDays / CENTS) * CENTS;
        }
        else {
            daily = Math.round(monthly / 31 / CENTS) * CENTS;
        }
    }
    const currentSpent = Math.round(((group.monthSpentCents[MOCK_TODAY_MONTH] ?? 0) * share) / CENTS) * CENTS;
    const totalSpent = Math.round((groupSpent(group) * share) / CENTS) * CENTS;
    return {
        [TS]: 'CampaignDetails',
        campaignId: campaign.id,
        groupId: group.id,
        status: campaign.status,
        statusMessage: campaign.statusMessage,
        campaign: {
            [TS]: 'CampaignName',
            id: campaign.id,
            name: campaign.name,
            notFound: false,
            bid: plan.advertiser.id,
            deliveryPlatform: bundle.deliveryPlatform,
            mappingPlatform: bundle.mappingPlatform,
            tactic: bundle.tactic,
        },
        channel: bundle.channel,
        currency: plan.currency,
        currentMonthSpentCents: currentSpent,
        dailyRecommendedCents: daily,
        deliveryPlatform: bundle.deliveryPlatform,
        deltaDailyRecommendedCents: null,
        deltaMonthlyRecommendedCents: null,
        group: idName(group.id, group.name),
        lastUpdated: campaign.lastUpdated,
        mappingPlatform: bundle.mappingPlatform,
        monthlyRecommendedCents: monthly,
        percentDailyRecommendedCents: null,
        percentMonthlyRecommendedCents: null,
        platform: idName(bundle.platform.id, bundle.platform.name),
        previousDailyRecommendedCents: null,
        previousMonthlyRecommendedCents: null,
        previousUpdated: campaign.previousUpdated,
        tactic: bundle.tactic,
        totalSpentCents: totalSpent,
    };
};
const ids = (list) => (Array.isArray(list) ? list.map(String) : []);
/** `campaignDetails(filter)` — all CampaignDetailsFilter members are optional lists (empty = no filter). */
const campaignDetailsList = (plan, filter) => {
    const f = filter ?? {};
    const rows = [];
    plan.groups.forEach(group => group.campaigns.forEach(c => rows.push(campaignDetailsEntity(plan, group, c))));
    const match = (values, actual) => {
        const list = ids(values);
        return !list.length || list.includes(String(actual));
    };
    return rows.filter(r => match(f.statuses, r.status) &&
        match(f.groupIds, r.groupId) &&
        match(f.channels, r.channel) &&
        match(f.tactics, r.tactic) &&
        match(f.vendorCampaignIds, r.campaignId) &&
        match(f.platformIds, r.platform.id) &&
        match(f.deliveryPlatforms, r.deliveryPlatform) &&
        match(f.mappingPlatforms, r.mappingPlatform));
};
const planEntity = (plan) => {
    const paused = plan.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Paused;
    return {
        [TS]: 'AdvertiserPlan',
        id: plan.id,
        version: plan.version,
        name: plan.name,
        status: plan.status,
        unpausedStatus: plan.unpausedStatus,
        advertiserId: plan.advertiser.id,
        advertiser: advertiserEntity(plan.advertiser),
        currency: plan.currency,
        dispatchMode: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DispatchModeEnum.Off,
        dispatchOptIn: plan.dispatchOptIn,
        managementFeePercent: plan.managementFeePercent,
        marginPercent: plan.marginPercent,
        isRunnable: plan.groups.some(g => g.bundles.length > 0),
        // `disable.pause` / `disable.resume` are "button disabled" flags used by ObaDetails.
        disable: {
            [TS]: 'AdvertiserPlanDisableStates',
            delete: plan.status !== _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Scheduled,
            endDate: false,
            pause: paused || plan.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Completed,
            resume: !paused,
            startDate: plan.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Live || plan.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Completed,
            totalBudget: false,
        },
        period: periodEntity(plan),
        totalBudget: planTotalBudget(plan),
        groups: plan.groups.map(g => groupPlanEntity(plan, g)),
        // Field with arguments: resolved lazily by the link (`campaignDetails(filter: ...)`).
        campaignDetails: (args) => campaignDetailsList(plan, args?.filter),
        campaigns: null,
        recommendations: [],
        unmappedCampaigns: [],
        updated: null,
    };
};
const planLiteEntity = liteEntity;
/** Every mock advertiser (Londoner first, then the demo advertisers in order). */
const advertiserNameEntities = () => {
    const seen = new Set();
    const out = [];
    plans.forEach(p => {
        if (seen.has(p.advertiser.id))
            return;
        seen.add(p.advertiser.id);
        out.push(advertiserEntity(p.advertiser));
    });
    return out;
};
const planNameEntities = () => plans.map(p => idName(p.id, p.name));
// ---------------------------------------------------------------------------------------------
// Lookups used by the link
// ---------------------------------------------------------------------------------------------
const groupNameEntities = (planId) => {
    const plan = getPlan(planId);
    if (!plan)
        return [];
    return plan.groups.map(g => ({
        [TS]: 'GroupName',
        id: g.id,
        name: g.name,
        notFound: false,
        startDate: plan.period.startDate,
        endDate: plan.period.endDate,
    }));
};
const campaignNameEntities = (filter) => {
    const f = filter ?? {};
    const planFilter = f.advertiserPlanId != null ? getPlan(f.advertiserPlanId) : undefined;
    const groupFilter = f.groupId != null ? findGroup(f.groupId) : undefined;
    const idList = ids(f.ids);
    const nameQuery = typeof f.name === 'string' ? f.name.trim().toLowerCase() : '';
    const rows = [];
    plans.forEach(plan => {
        if (planFilter && plan.id !== planFilter.id)
            return;
        if (f.advertiserId != null && plan.advertiser.id !== String(f.advertiserId))
            return;
        plan.groups.forEach(group => {
            if (groupFilter && group.id !== groupFilter.group.id)
                return;
            group.campaigns.forEach(c => {
                const bundle = group.bundles.find(b => b.id === c.bundleId);
                if (!bundle)
                    return;
                if (f.channel && bundle.channel !== f.channel)
                    return;
                if (f.tactic && bundle.tactic !== f.tactic)
                    return;
                if (idList.length && !idList.includes(c.id))
                    return;
                if (nameQuery && !c.name.toLowerCase().includes(nameQuery))
                    return;
                rows.push({
                    [TS]: 'CampaignName',
                    id: c.id,
                    name: c.name,
                    notFound: false,
                    bid: plan.advertiser.id,
                    deliveryPlatform: bundle.deliveryPlatform,
                    mappingPlatform: bundle.mappingPlatform,
                    tactic: bundle.tactic,
                });
            });
        });
    });
    // One campaign can live in several plans (same vendor id): keep a single option per id.
    return Array.from(new Map(rows.map(r => [r.id, r])).values());
};
const GBP_CURRENCY = { [TS]: 'Currency', code: 'GBP', name: 'British Pound', symbol: '£' };
/** GBP (Londoner) plus the demo advertisers' currencies. */
const MOCK_CURRENCIES = [
    GBP_CURRENCY,
    { [TS]: 'Currency', code: 'EUR', name: 'Euro', symbol: '€' },
    { [TS]: 'Currency', code: 'NZD', name: 'New Zealand Dollar', symbol: '$' },
    { [TS]: 'Currency', code: 'USD', name: 'US Dollar', symbol: '$' },
];
// ---------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------
const resizeBudgets = (values, size) => Array.from({ length: size }, (_, i) => values[i] ?? 0);
const applyPlanUpdate = (input) => {
    const plan = getPlan(input?.id);
    if (!plan)
        return undefined;
    if (typeof input.name === 'string' && input.name)
        plan.name = input.name;
    if (typeof input.currency === 'string' && input.currency)
        plan.currency = input.currency;
    if (typeof input.marginPercent === 'number')
        plan.marginPercent = input.marginPercent;
    if (typeof input.managementFeePercent === 'number')
        plan.managementFeePercent = input.managementFeePercent;
    if (typeof input.dispatchOptIn === 'boolean')
        plan.dispatchOptIn = input.dispatchOptIn;
    if (typeof input.totalBudget === 'number')
        plan.totalBudgetCents = input.totalBudget;
    if (input.period?.startDate || input.period?.endDate) {
        plan.period = {
            startDate: input.period.startDate ?? plan.period.startDate,
            endDate: input.period.endDate ?? plan.period.endDate,
        };
        const size = monthKeysOf(plan.period).length;
        plan.groups.forEach(g => {
            g.monthBudgetCents = resizeBudgets(g.monthBudgetCents, size);
        });
    }
    if (Array.isArray(input.groups)) {
        const size = monthKeysOf(plan.period).length;
        input.groups.forEach((gi) => {
            let group = gi?.id != null ? plan.groups.find(g => g.id === String(gi.id)) : undefined;
            if (!group) {
                const seq = plan.groups.length + 1;
                group = {
                    id: `${plan.id}${seq}`,
                    version: 1,
                    name: gi?.name ?? `Group Name ${seq}`,
                    status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.GroupStatusEnum.Incomplete,
                    kpi: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.KpiEnum.Conversions,
                    specs: '',
                    monthBudgetCents: resizeBudgets([], size),
                    monthSpentCents: {},
                    bundles: [],
                    campaigns: [],
                    channelBounds: {},
                };
                plan.groups.push(group);
            }
            if (typeof gi?.name === 'string' && gi.name)
                group.name = gi.name;
            if (Array.isArray(gi?.monthBudgetCents)) {
                group.monthBudgetCents = resizeBudgets(gi.monthBudgetCents.map((v) => (typeof v === 'number' ? v : 0)), size);
            }
            group.version += 1;
        });
    }
    plan.version += 1;
    return plan;
};
const applyPlanPause = (id, pause) => {
    const plan = getPlan(id);
    if (!plan)
        return undefined;
    if (pause && plan.status !== _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Paused) {
        plan.unpausedStatus = plan.status;
        plan.status = _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Paused;
    }
    else if (!pause && plan.status === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.AdvertiserPlanStatusEnum.Paused) {
        plan.status = plan.unpausedStatus;
    }
    plan.version += 1;
    return plan;
};
const applyCampaignPause = (campaignId, groupId, pause) => {
    const found = findGroup(groupId);
    const campaign = found?.group.campaigns.find(c => c.id === String(campaignId));
    if (!found || !campaign)
        return undefined;
    if (pause) {
        if (campaign.status !== _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused)
            campaign.resumeStatus = campaign.status;
        campaign.status = _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused;
    }
    else {
        campaign.status = campaign.resumeStatus === _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Paused ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active : campaign.resumeStatus;
    }
    campaign.lastUpdated = MOCK_TODAY;
    return campaignDetailsEntity(found.plan, found.group, campaign);
};
const PLATFORM_BY_DELIVERY = {
    [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.GoogleAds]: PLATFORMS.googleAds,
    [_mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Dv360]: PLATFORMS.dv360,
};
const applyGroupUpdate = (input) => {
    const found = findGroup(input?.id);
    if (!found)
        return undefined;
    const { plan, group } = found;
    if (typeof input.name === 'string' && input.name)
        group.name = input.name;
    if (input.kpi)
        group.kpi = input.kpi;
    if (typeof input.specs === 'string')
        group.specs = input.specs;
    if (Array.isArray(input.monthBudgetCents)) {
        group.monthBudgetCents = resizeBudgets(input.monthBudgetCents.map((v) => (typeof v === 'number' ? v : 0)), monthKeysOf(plan.period).length);
    }
    const channelKeys = [
        ['paidSearchChannel', _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.PaidSearch],
        ['facebookChannel', _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Facebook],
        ['displayChannel', _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.Display],
        ['youtubeChannel', _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.ChannelEnum.YouTube],
    ];
    channelKeys.forEach(([key, channel]) => {
        if (input[key]) {
            group.channelBounds[channel] = {
                lower: input[key].lowerBoundPercent ?? null,
                upper: input[key].upperBoundPercent ?? null,
            };
        }
    });
    if (Array.isArray(input.bundles)) {
        const previousBundles = group.bundles;
        const previousCampaigns = group.campaigns;
        const nextBundles = [];
        const nextCampaigns = [];
        input.bundles.forEach((bi, index) => {
            const existing = bi?.id != null ? previousBundles.find(b => b.id === String(bi.id)) : undefined;
            const bundleId = existing?.id ?? `${group.id}${previousBundles.length + index + 1}${Date.now() % 1000}`;
            const delivery = bi.deliveryPlatform ?? existing?.deliveryPlatform ?? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.DeliveryPlatformEnum.Unknown;
            const vendorCampaignIds = ids(bi.vendorCampaignIds);
            nextBundles.push({
                id: bundleId,
                version: (existing?.version ?? 0) + 1,
                channel: bi.channel,
                deliveryPlatform: delivery,
                mappingPlatform: bi.mappingPlatform ?? existing?.mappingPlatform ?? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.MappingPlatformEnum.Unknown,
                platform: existing?.platform ?? PLATFORM_BY_DELIVERY[delivery] ?? { id: `91007709`, name: String(delivery) },
                tactic: bi.tactic,
                vendorCampaignIds,
                lowerBoundPercent: bi.lowerBoundPercent ?? null,
                upperBoundPercent: bi.upperBoundPercent ?? null,
            });
            vendorCampaignIds.forEach(vid => {
                const prev = previousCampaigns.find(c => c.id === vid);
                nextCampaigns.push(prev
                    ? { ...prev, bundleId }
                    : {
                        id: vid,
                        name: campaignName(vid),
                        bundleId,
                        weight: 10,
                        status: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active,
                        resumeStatus: _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.CampaignStatusEnum.Active,
                        statusMessage: '',
                        lastUpdated: MOCK_TODAY,
                        previousUpdated: MOCK_TODAY,
                    });
            });
        });
        group.bundles = nextBundles;
        group.campaigns = nextCampaigns;
        group.status = nextBundles.length ? _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.GroupStatusEnum.Active : _mediahub_oba_ui_graphql_generated_oba_enums__WEBPACK_IMPORTED_MODULE_3__.GroupStatusEnum.Incomplete;
    }
    group.version += 1;
    plan.version += 1;
    return found;
};


/***/ },

/***/ "./apps/oba-ui/graphql/generated/oba-enums.ts"
/*!****************************************************!*\
  !*** ./apps/oba-ui/graphql/generated/oba-enums.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertiserPlanStatusEnum: () => (/* binding */ AdvertiserPlanStatusEnum),
/* harmony export */   CampaignFlightStatusEnum: () => (/* binding */ CampaignFlightStatusEnum),
/* harmony export */   CampaignStatusEnum: () => (/* binding */ CampaignStatusEnum),
/* harmony export */   ChannelEnum: () => (/* binding */ ChannelEnum),
/* harmony export */   DeliveryPlatformEnum: () => (/* binding */ DeliveryPlatformEnum),
/* harmony export */   DispatchModeEnum: () => (/* binding */ DispatchModeEnum),
/* harmony export */   GroupStatusEnum: () => (/* binding */ GroupStatusEnum),
/* harmony export */   KpiEnum: () => (/* binding */ KpiEnum),
/* harmony export */   MappingPlatformEnum: () => (/* binding */ MappingPlatformEnum),
/* harmony export */   MappingStatusEnum: () => (/* binding */ MappingStatusEnum),
/* harmony export */   PlatformEnum: () => (/* binding */ PlatformEnum),
/* harmony export */   TacticEnum: () => (/* binding */ TacticEnum)
/* harmony export */ });
/**  Enum  */
var AdvertiserPlanStatusEnum;
(function (AdvertiserPlanStatusEnum) {
    AdvertiserPlanStatusEnum["Completed"] = "Completed";
    AdvertiserPlanStatusEnum["Live"] = "Live";
    AdvertiserPlanStatusEnum["Paused"] = "Paused";
    AdvertiserPlanStatusEnum["Scheduled"] = "Scheduled";
    AdvertiserPlanStatusEnum["Unknown"] = "Unknown";
})(AdvertiserPlanStatusEnum || (AdvertiserPlanStatusEnum = {}));
var CampaignFlightStatusEnum;
(function (CampaignFlightStatusEnum) {
    /**  campaign assigned to one group = consumption assigned to this group ( campaign could be paused or active )  */
    CampaignFlightStatusEnum["ConsumptionActive"] = "ConsumptionActive";
    /**  campaign not assigned to any group = consumption paused  */
    CampaignFlightStatusEnum["ConsumptionPaused"] = "ConsumptionPaused";
    CampaignFlightStatusEnum["Unknown"] = "Unknown";
})(CampaignFlightStatusEnum || (CampaignFlightStatusEnum = {}));
var CampaignStatusEnum;
(function (CampaignStatusEnum) {
    CampaignStatusEnum["Active"] = "Active";
    CampaignStatusEnum["Error"] = "Error";
    CampaignStatusEnum["Manual"] = "Manual";
    CampaignStatusEnum["Paused"] = "Paused";
    CampaignStatusEnum["Unknown"] = "Unknown";
    CampaignStatusEnum["Warning"] = "Warning";
})(CampaignStatusEnum || (CampaignStatusEnum = {}));
var ChannelEnum;
(function (ChannelEnum) {
    ChannelEnum["Display"] = "Display";
    ChannelEnum["Facebook"] = "Facebook";
    ChannelEnum["PaidSearch"] = "PaidSearch";
    ChannelEnum["Unknown"] = "Unknown";
    ChannelEnum["YouTube"] = "YouTube";
})(ChannelEnum || (ChannelEnum = {}));
var DeliveryPlatformEnum;
(function (DeliveryPlatformEnum) {
    DeliveryPlatformEnum["BingAds"] = "BingAds";
    DeliveryPlatformEnum["Dv360"] = "DV360";
    DeliveryPlatformEnum["Facebook"] = "Facebook";
    DeliveryPlatformEnum["GoogleAds"] = "GoogleAds";
    DeliveryPlatformEnum["Unknown"] = "Unknown";
    DeliveryPlatformEnum["YouTube"] = "YouTube";
})(DeliveryPlatformEnum || (DeliveryPlatformEnum = {}));
var DispatchModeEnum;
(function (DispatchModeEnum) {
    DispatchModeEnum["Off"] = "Off";
    DispatchModeEnum["UnspentAtProRata"] = "UnspentAtProRata";
    DispatchModeEnum["UnspentEvenly"] = "UnspentEvenly";
})(DispatchModeEnum || (DispatchModeEnum = {}));
var GroupStatusEnum;
(function (GroupStatusEnum) {
    GroupStatusEnum["Active"] = "Active";
    GroupStatusEnum["Error"] = "Error";
    GroupStatusEnum["Incomplete"] = "Incomplete";
    GroupStatusEnum["Unknown"] = "Unknown";
})(GroupStatusEnum || (GroupStatusEnum = {}));
var KpiEnum;
(function (KpiEnum) {
    KpiEnum["Clicks"] = "Clicks";
    KpiEnum["Conversions"] = "Conversions";
    KpiEnum["Roas"] = "ROAS";
    KpiEnum["Unknown"] = "Unknown";
})(KpiEnum || (KpiEnum = {}));
var MappingPlatformEnum;
(function (MappingPlatformEnum) {
    MappingPlatformEnum["Dv360"] = "DV360";
    MappingPlatformEnum["Meta"] = "Meta";
    MappingPlatformEnum["Sa360"] = "SA360";
    MappingPlatformEnum["Unknown"] = "Unknown";
})(MappingPlatformEnum || (MappingPlatformEnum = {}));
var MappingStatusEnum;
(function (MappingStatusEnum) {
    MappingStatusEnum["Mapped"] = "Mapped";
    MappingStatusEnum["Unknown"] = "Unknown";
    MappingStatusEnum["Unmapped"] = "Unmapped";
})(MappingStatusEnum || (MappingStatusEnum = {}));
/**  used for campaign mappings ( check diff from delivery platform and mapping platform ) */
var PlatformEnum;
(function (PlatformEnum) {
    PlatformEnum["Dv360"] = "DV360";
    PlatformEnum["Derbysoft"] = "Derbysoft";
    PlatformEnum["Facebook"] = "Facebook";
    PlatformEnum["Sa360"] = "SA360";
    PlatformEnum["Unknown"] = "Unknown";
    PlatformEnum["Wihp"] = "WIHP";
})(PlatformEnum || (PlatformEnum = {}));
var TacticEnum;
(function (TacticEnum) {
    TacticEnum["AdvantagePlus"] = "AdvantagePlus";
    TacticEnum["Brand"] = "Brand";
    TacticEnum["DemandGen"] = "DemandGen";
    TacticEnum["Generic"] = "Generic";
    TacticEnum["Pmax"] = "Pmax";
    TacticEnum["Prospecting"] = "Prospecting";
    TacticEnum["Remarketing"] = "Remarketing";
    TacticEnum["Unknown"] = "Unknown";
})(TacticEnum || (TacticEnum = {}));


/***/ }

}]);
//# sourceMappingURL=apps_oba-ui_ObaGqlProvider_londonerObaMock_ts.a16a5d15806c7e5d00ac.js.map