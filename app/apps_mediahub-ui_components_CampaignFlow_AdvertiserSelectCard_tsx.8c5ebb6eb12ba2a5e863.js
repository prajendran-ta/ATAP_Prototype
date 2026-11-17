"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_components_CampaignFlow_AdvertiserSelectCard_tsx"],{

/***/ "./apps/mediahub-ui/components/CampaignFlow/AdvertiserSelectCard.tsx"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/components/CampaignFlow/AdvertiserSelectCard.tsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AmadeusMaxPanel/AmadeusMaxPanel.styled */ "./apps/mediahub-ui/components/AmadeusMaxPanel/AmadeusMaxPanel.styled.ts");
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/londonerFollowStore */ "./apps/mediahub-ui/shared/londonerFollowStore.ts");
/* harmony import */ var _campaignFlowStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var _CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CampaignFlow.styled */ "./apps/mediahub-ui/components/CampaignFlow/CampaignFlow.styled.ts");










/**
 * The 5 advertisers suggested first: the ones with a SIGNED-OFF media plan (closed-won, ready to create
 * campaigns for). The Londoner Hotel is always first. Ids/names come from the demo registry; when the
 * advertiser list returns the same BPID (e.g. a backend-owned advertiser) its real id is used instead.
 */
const SIGNED_OFF_KEYS = ['howard', 'mulia', 'elpalace', 'trumplv'];
const SIGNED_OFF = [
    {
        id: String(_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__.LONDONER.advertiserId),
        name: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__.LONDONER.name,
        bpid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__.LONDONER.bpid,
        mediaPlanName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__.LONDONER_NAMES.mediaPlan,
    },
    ...SIGNED_OFF_KEYS.map(key => _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_6__.DEMO_ADVERTISERS.find(advertiser => advertiser.key === key)).flatMap(advertiser => advertiser
        ? [{ id: String(advertiser.advertiserId), name: advertiser.name, bpid: advertiser.bpid, mediaPlanName: advertiser.mediaPlanName }]
        : []),
];
const CONFIRM_HINT = 'Select the advertiser you want to create campaigns for, then click Confirm.';
const SIGNED_OFF_TITLE = 'Advertisers with a signed-off media plan';
/**
 * First step of 'Create campaigns with Max': which advertiser are the campaigns for?
 *  - the 5 advertisers with a signed-off media plan (The Londoner Hotel first), as a radio list,
 *  - or any advertiser from a searchable dropdown with the complete list.
 * Confirm continues into the campaign-creation flow (see confirmAdvertiserSelection). After Confirm the
 * card collapses to a read-only line, like the other inline confirmation cards.
 */
const AdvertiserSelectCard = ({ actionsDisabled }) => {
    const { advertiserConfirmed, flowAdvertiser } = (0,_campaignFlowStore__WEBPACK_IMPORTED_MODULE_8__.useCampaignFlowState)();
    const { data, loading } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_3__.useGetAdvertiserOptionsQuery)();
    // One choice overall (selectedId). `dropdownId` is set only when it was made in the dropdown, so the
    // dropdown stays empty unless the user picks from it (it does not mirror the radio list), and the
    // radio list shows no selection while a dropdown choice is active.
    const [selectedId, setSelectedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dropdownId, setDropdownId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const advertisers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const rows = (data?.advertisers?.advertisers ?? []).map(advertiser => ({
            id: String(advertiser.advertiserId),
            name: advertiser.advertiserName,
            bpid: String(advertiser.bpid).toUpperCase(),
        }));
        // Alphabetical, with The Londoner Hotel (the followed demo advertiser) always at the top.
        const sorted = rows.sort((a, b) => a.name.localeCompare(b.name));
        return (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_7__.londonerFirst)(sorted, a => a.bpid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_5__.LONDONER.bpid);
    }, [data]);
    // Suggested advertisers (signed-off media plan), with the real id when the advertiser list has the BPID.
    const suggested = SIGNED_OFF.map(entry => {
        const match = advertisers.find(advertiser => advertiser.bpid === entry.bpid.toUpperCase());
        return match ? { ...entry, id: match.id } : entry;
    });
    // A suggested advertiser is selectable even if the full list hasn't loaded (offline demo).
    const selectable = [...suggested, ...advertisers.filter(a => !suggested.some(s => s.bpid === a.bpid))];
    const selected = selectable.find(advertiser => advertiser.id === selectedId) ?? null;
    const locked = actionsDisabled || advertiserConfirmed;
    if (advertiserConfirmed && flowAdvertiser) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_4__.AssistantBodyText, { children: ["Creating campaigns for ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: flowAdvertiser.name }), " (", flowAdvertiser.bpid, ")."] }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_4__.AssistantBodyText, { children: "Which advertiser would you like to create campaigns for?" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.BasicInfoCard, { "data-testid": 'advertiser-select-card', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.BasicInfoCardHeading, { children: "Select an advertiser" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AmadeusMaxPanel_AmadeusMaxPanel_styled__WEBPACK_IMPORTED_MODULE_4__.AssistantBodyText, { children: SIGNED_OFF_TITLE }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOptionList, { role: 'radiogroup', "aria-label": SIGNED_OFF_TITLE, children: suggested.map(advertiser => {
                            const isSelected = selectedId === advertiser.id && dropdownId === null;
                            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOption, { type: 'button', role: 'radio', "aria-checked": isSelected, selected: isSelected, disabled: locked, onClick: () => {
                                    setSelectedId(advertiser.id);
                                    setDropdownId(null);
                                }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { className: 'us-growth-option-radio', "aria-hidden": 'true' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOptionBody, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOptionTitleRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOptionTitle, { children: advertiser.name }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.UsGrowthOptionDescription, { children: `${advertiser.bpid} · ${advertiser.mediaPlanName}` })] })] }, advertiser.bpid));
                        }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { marginTop: 12 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'campaign-flow-advertiser-sel', placeholder: 'Select advertiser', showSearch: true, allowClear: true, filterMode: 'client', searchBy: 'label', popupMatchSelectWidth: 420, loading: loading, disabled: locked, value: dropdownId ?? undefined, options: selectable.map(advertiser => ({ label: `${advertiser.name} (${advertiser.bpid})`, value: advertiser.id })), onChange: (value) => {
                                setDropdownId(value ?? null);
                                setSelectedId(value ?? null);
                            } }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.BasicInfoConfirmRow, { style: { marginTop: 16 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.BasicInfoConfirmHint, { children: CONFIRM_HINT }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignFlow_styled__WEBPACK_IMPORTED_MODULE_9__.BasicInfoConfirmButton, { type: 'button', disabled: locked || !selected, "data-testid": 'advertiser-select-confirm', onClick: () => selected && (0,_campaignFlowStore__WEBPACK_IMPORTED_MODULE_8__.confirmAdvertiserSelection)({ advertiserId: selected.id, name: selected.name, bpid: selected.bpid }), children: "Confirm" })] })] })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertiserSelectCard);


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_components_CampaignFlow_AdvertiserSelectCard_tsx.8c5ebb6eb12ba2a5e863.js.map