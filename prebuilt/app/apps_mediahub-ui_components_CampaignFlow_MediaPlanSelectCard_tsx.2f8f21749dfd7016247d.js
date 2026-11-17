"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_components_CampaignFlow_MediaPlanSelectCard_tsx"],{

/***/ "./apps/mediahub-ui/components/CampaignFlow/MediaPlanSelectCard.tsx"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/components/CampaignFlow/MediaPlanSelectCard.tsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mediahub_mediaplanner_ui_pages_MediaplannerProductSettings_mockSalesforcePlans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediahub/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans */ "./apps/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans.ts");
/* harmony import */ var _AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AmadeusMaxPanel/AmadeusMaxPanel.styled */ "./apps/mediahub-ui/components/AmadeusMaxPanel/AmadeusMaxPanel.styled.ts");
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./campaignFlowLogic */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowLogic.ts");
/* harmony import */ var _campaignFlowStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var _CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CampaignFlow.styled */ "./apps/mediahub-ui/components/CampaignFlow/CampaignFlow.styled.ts");









const CONFIRM_HINT = 'Select the media plan you want to create campaigns for, then click Confirm.';
const money = (value, currency) => new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
/**
 * Media plans the advertiser can create campaigns for. Advertisers with a signed-off Media Planner plan (The
 * Londoner Hotel and the demo advertisers) offer THAT plan (a new setup, flight in 2027). Advertisers without
 * one get the flow's own 2027 and 2026 plans (named for the chosen advertiser).
 */
const buildPlanOptions = (bpid) => {
    const options = [];
    const planner = (0,_mediahub_mediaplanner_ui_pages_MediaplannerProductSettings_mockSalesforcePlans__WEBPACK_IMPORTED_MODULE_2__.getMockSalesforcePlanForAdvertiser)(bpid);
    const registry = bpid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__.LONDONER.bpid ? _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__.LONDONER : (0,_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_5__.getDemoAdvertiserByBpid)(bpid);
    if (planner && registry) {
        options.push({
            id: planner.id,
            name: planner.planName,
            statusLabel: 'Signed off',
            description: `Flight ${planner.startDate} → ${planner.endDate} · Total budget ${money(planner.contractBudgetTarget, planner.currency)}`,
            choice: {
                name: planner.planName,
                year: '2027',
                override: {
                    startDate: registry.startDate,
                    endDate: registry.endDate,
                    // The Londoner's flow creates Google Ads + Amadeus DSP campaigns only, so the budget being allocated
                    // is those two channels (the rest of the plan, video and metasearch, is created separately).
                    totalBudget: bpid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__.LONDONER.bpid
                        ? _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__.LONDONER_CHANNELS.paidSearch.budget + _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_4__.LONDONER_CHANNELS.display.budget
                        : planner.contractBudgetTarget,
                },
            },
        });
    }
    else {
        const plan2027 = (0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.resolveMediaPlan)('2027');
        options.push({
            id: 'plan-2027',
            name: plan2027.mediaPlanName,
            statusLabel: 'Scheduled',
            description: `Flight ${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.formatDisplayDate)(plan2027.startDate)} → ${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.formatDisplayDate)(plan2027.endDate)} · Total budget ${plan2027.mediaPlanTable.total}`,
            choice: { name: plan2027.mediaPlanName, year: '2027' },
        });
    }
    // A signed-off Media Planner plan is the only option: the flow's example 2026 plan is a different, already
    // running setup that does not exist for this advertiser.
    if (planner && registry)
        return options;
    const plan2026 = (0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.resolveMediaPlan)('2026');
    options.push({
        id: 'plan-2026',
        name: plan2026.mediaPlanName,
        statusLabel: 'Active',
        description: `Flight ${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.formatDisplayDate)(plan2026.startDate)} → ${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_6__.formatDisplayDate)(plan2026.endDate)} · Total budget ${plan2026.mediaPlanTable.total}`,
        choice: { name: plan2026.mediaPlanName, year: '2026' },
    });
    return options;
};
/**
 * Second step of 'Create campaigns with Max': which media plan are the campaigns for? Radio list +
 * Confirm; after Confirm the card collapses to a read-only line and the campaign creation continues.
 */
const MediaPlanSelectCard = ({ actionsDisabled }) => {
    const { flowAdvertiser, mediaPlanConfirmed, flowMediaPlan } = (0,_campaignFlowStore__WEBPACK_IMPORTED_MODULE_7__.useCampaignFlowState)();
    const [selectedId, setSelectedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const options = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (flowAdvertiser ? buildPlanOptions(flowAdvertiser.bpid) : []), [flowAdvertiser]);
    const selected = options.find(option => option.id === selectedId) ?? null;
    const locked = actionsDisabled || mediaPlanConfirmed;
    if (mediaPlanConfirmed && flowMediaPlan) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_3__.AssistantBodyText, { children: ["Creating campaigns for the media plan ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: flowMediaPlan.name }), "."] }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_3__.AssistantBodyText, { children: ["Which media plan would you like to create campaigns for", flowAdvertiser ? ` ${flowAdvertiser.name}` : '', "?"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.BasicInfoCard, { "data-testid": 'media-plan-select-card', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.BasicInfoCardHeading, { children: "Select a media plan" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionList, { role: 'radiogroup', "aria-label": 'Select a media plan', children: options.map(option => {
                            const isSelected = selectedId === option.id;
                            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOption, { type: 'button', role: 'radio', "aria-checked": isSelected, selected: isSelected, disabled: locked, onClick: () => setSelectedId(option.id), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { className: 'us-growth-option-radio', "aria-hidden": 'true' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionBody, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionTitleRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionTitle, { children: option.name }), option.statusLabel === 'Signed off' ? null : option.statusLabel === 'Active' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionRecommended, { children: option.statusLabel })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.PlanPickerStatusTag, { children: option.statusLabel }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.UsGrowthOptionDescription, { children: option.description })] })] }, option.id));
                        }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.BasicInfoConfirmRow, { style: { marginTop: 16 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.BasicInfoConfirmHint, { children: CONFIRM_HINT }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_8__.BasicInfoConfirmButton, { type: 'button', disabled: locked || !selected, "data-testid": 'media-plan-select-confirm', onClick: () => selected && (0,_campaignFlowStore__WEBPACK_IMPORTED_MODULE_7__.confirmMediaPlanSelection)(selected.choice), children: "Confirm" })] })] })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaPlanSelectCard);


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_components_CampaignFlow_MediaPlanSelectCard_tsx.2f8f21749dfd7016247d.js.map