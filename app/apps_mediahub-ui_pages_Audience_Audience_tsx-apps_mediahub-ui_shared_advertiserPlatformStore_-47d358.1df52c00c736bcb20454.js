"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_pages_Audience_Audience_tsx-apps_mediahub-ui_shared_advertiserPlatformStore_-47d358"],{

/***/ "./apps/mediahub-ui/pages/Audience/Audience.tsx"
/*!******************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/Audience.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertiserAudiencesTable: () => (/* binding */ AdvertiserAudiencesTable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters */ "./apps/mediahub-ui/components/TableWithFilters/index.ts");
/* harmony import */ var _Audience_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Audience.styled */ "./apps/mediahub-ui/pages/Audience/Audience.styled.tsx");
/* harmony import */ var _mockAudiences__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_audienceStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/audienceStore */ "./apps/mediahub-ui/shared/audienceStore.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/londonerFollowStore */ "./apps/mediahub-ui/shared/londonerFollowStore.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");












const renderPlatformChips = (record) => {
    const platforms = record.platformAdvertisers.length > 0
        ? record.platformAdvertisers
        : record.channels.split(', ').filter(platform => platform && platform !== 'Not configured').map((platform, index) => ({ id: `${record.id}-${index}`, platform, advertiserName: '-', advertiserId: '-', connected: false }));
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudiencePlatformChipRow, { children: platforms.map(platform => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudiencePlatformChip, { "$isAmadeus": platform.platform.trim().toLowerCase() === 'amadeus dsp', children: platform.platform }, `${record.id}-${platform.id}-${platform.platform}`)) });
};
function AudiencePage() {
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const [showMyAudiences, setShowMyAudiences] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [audiences, setAudiences] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
        const sharedAudiences = (0,_mediahub_mediahub_ui_shared_audienceStore__WEBPACK_IMPORTED_MODULE_8__.getSharedAudiences)();
        if (sharedAudiences.length > 0)
            return sharedAudiences;
        (0,_mediahub_mediahub_ui_shared_audienceStore__WEBPACK_IMPORTED_MODULE_8__.setSharedAudiences)(_mockAudiences__WEBPACK_IMPORTED_MODULE_6__.MOCK_AUDIENCES);
        return _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.MOCK_AUDIENCES;
    });
    const { data: advertiserData } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_7__.useGetAdvertiserOptionsQuery)();
    const advertiserOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
        label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
        value: String(advertiser.advertiserId),
    }));
    const advertiserFilterOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
        label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
        value: advertiser.advertiserName,
    }));
    const audienceNameOptions = [...new Set(audiences.map(audience => audience.audienceName))].map(value => ({ label: value, value }));
    const dataTypeOptions = _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.DATA_TYPE_OPTIONS;
    const columns = [
        {
            title: 'Audience Name', dataIndex: 'audienceName', key: 'audienceName',
            render: (value, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { variant: 'text', id: `audience-open-${record.id}-btn`, onClick: () => {
                    navigate(`/audience/${record.id}/edit`);
                }, children: value })),
        },
        { title: 'Advertiser(BPID)', dataIndex: 'advertiser', key: 'advertiser', width: '20%' },
        { title: 'Data Type', dataIndex: 'dataType', key: 'dataType', width: '12%', render: (value) => _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.DATA_TYPE_LABEL[value] ?? value },
        { title: 'Platform', dataIndex: 'platformAdvertisers', key: 'platform', render: (_, record) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: renderPlatformChips(record) }) },
        { title: 'Audience Size', dataIndex: 'audienceSize', key: 'audienceSize', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
        { title: 'Last Upload', dataIndex: 'lastUpload', key: 'lastUpload', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
        { title: 'Next Upload', dataIndex: 'nextUpload', key: 'nextUpload', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
    ];
    const filterItems = [
        {
            name: 'advertiser', label: 'Advertiser(BPID)', type: 'multiple', options: advertiserFilterOptions,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: 'Advertiser(BPID)', id: 'audience-advertiser_filter-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: setValue, options: advertiserFilterOptions, allowClear: true })),
        },
        {
            name: 'audienceName', label: 'Audience Name', type: 'multiple', options: audienceNameOptions,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: 'Audience Name', id: 'audience-name_filter-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: setValue, options: audienceNameOptions, allowClear: true })),
        },
        {
            name: 'dataType', label: 'Data Type', type: 'multiple', options: dataTypeOptions,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: 'Data Type', id: 'audience-data_type_filter-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: setValue, options: dataTypeOptions, allowClear: true })),
        },
    ];
    const followedAdvertisers = (advertiserData?.advertisers?.advertisers ?? [])
        .filter(advertiser => advertiser.isFollowing !== false);
    const isFollowedAdvertiser = (audience) => {
        // Demo advertisers (Londoner + the 10 in demoAdvertisers.ts): follow state is live (persisted
        // store); the cached advertiser lookup can be stale.
        if ((0,_mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_9__.isLondonerAdvertiser)(audience.advertiser) || (0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_11__.findDemoAdvertiser)(audience.advertiser)) {
            return (0,_mediahub_mediahub_ui_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_10__.isFollowedDemoAdvertiser)(audience.advertiser);
        }
        const audienceAdvertiser = audience.advertiser.trim().toLowerCase();
        return followedAdvertisers.some(advertiser => (audienceAdvertiser === advertiser.advertiserName.trim().toLowerCase()
            || audienceAdvertiser.startsWith(`${advertiser.advertiserName.trim().toLowerCase()} (`)
            || audienceAdvertiser.includes(String(advertiser.bpid).trim().toLowerCase())
            || audienceAdvertiser === String(advertiser.advertiserId).toLowerCase()));
    };
    // The Londoner Hotel (followed demo advertiser) always sits at the top.
    const visibleAudiences = (0,_mediahub_mediahub_ui_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_10__.londonerFirst)(showMyAudiences ? audiences.filter(isFollowedAdvertiser) : audiences, audience => (0,_mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_9__.isLondonerAdvertiser)(audience.advertiser));
    const audienceQueryFn = async () => ({ data: visibleAudiences, total: visibleAudiences.length });
    const audienceTableKey = [
        audiences.length,
        showMyAudiences,
        ...(advertiserData?.advertisers?.advertisers ?? []).map(advertiser => `${advertiser.advertiserId}:${advertiser.isFollowing}`),
    ].join('|');
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: 'Audience' }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__.TableWithFilterBanner, { ref: tableRef, sectionTitle: 'Audience', titleButtons: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'audience-add-btn', variant: 'solid', onClick: () => navigate('/audience/new'), children: "New Audience" }), tableCustomControls: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { options: [
                        { label: 'My Audience', value: true },
                        { label: 'All Audience', value: false },
                    ], onChange: setShowMyAudiences }), columns: columns, filterItems: filterItems, filterMode: 'client', clientSideFilters: ['advertiser', 'audienceName', 'dataType', 'search'], queryFn: audienceQueryFn, tableTitle: 'Audiences', tableSearch: { show: true, placeholder: 'Search', keys: ['advertiser', 'audienceName', 'dataType', 'channels'] }, id: 'audience-tbl', cellsIdPrefix: 'audience', rowKey: 'id' }, `audience-table-${audienceTableKey}`)] }));
}
/** Audiences created for ONE advertiser (Advertiser Details → Audience tab). Same table as the
 *  Audience page, scoped by advertiser: no Advertiser column, no filter banner, search kept.
 *  Audiences store the advertiser as free text (name, sometimes "Name (BPID)"), so match on
 *  name / BPID / id like the "My Audience" filter does. */
function AdvertiserAudiencesTable({ advertiserName, bpid, advertiserId }) {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const [audiences] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
        const shared = (0,_mediahub_mediahub_ui_shared_audienceStore__WEBPACK_IMPORTED_MODULE_8__.getSharedAudiences)();
        if (shared.length > 0)
            return shared;
        (0,_mediahub_mediahub_ui_shared_audienceStore__WEBPACK_IMPORTED_MODULE_8__.setSharedAudiences)(_mockAudiences__WEBPACK_IMPORTED_MODULE_6__.MOCK_AUDIENCES);
        return _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.MOCK_AUDIENCES;
    });
    const name = advertiserName.trim().toLowerCase();
    const bpidLower = String(bpid).trim().toLowerCase();
    const scopedAudiences = audiences.filter(audience => {
        const owner = audience.advertiser.trim().toLowerCase();
        return owner === name
            || owner.startsWith(`${name} (`)
            || (!!bpidLower && owner.includes(bpidLower))
            || owner === String(advertiserId).toLowerCase();
    });
    const columns = [
        {
            title: 'Audience Name', dataIndex: 'audienceName', key: 'audienceName',
            render: (value, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { variant: 'text', id: `advertiser-audience-open-${record.id}-btn`, onClick: () => navigate(`/audience/${record.id}/edit`), children: value })),
        },
        { title: 'Data Type', dataIndex: 'dataType', key: 'dataType', width: '14%', render: (value) => _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.DATA_TYPE_LABEL[value] ?? value },
        { title: 'Platform', dataIndex: 'platformAdvertisers', key: 'platform', render: (_, record) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: renderPlatformChips(record) }) },
        { title: 'Audience Size', dataIndex: 'audienceSize', key: 'audienceSize', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
        { title: 'Last Upload', dataIndex: 'lastUpload', key: 'lastUpload', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
        { title: 'Next Upload', dataIndex: 'nextUpload', key: 'nextUpload', render: (value) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceNoWrap, { children: value }) },
    ];
    const queryFn = async () => ({ data: scopedAudiences, total: scopedAudiences.length });
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__.TableWithFilterBanner, { showFilterBanner: false, columns: columns, filterItems: [], filterMode: 'client', clientSideFilters: ['search'], queryFn: queryFn, tableTitle: 'Audiences', tableSearch: { show: true, placeholder: 'Search', keys: ['audienceName', 'dataType', 'channels'] }, id: 'advertiser-audience-tbl', cellsIdPrefix: 'advertiser-audience', rowKey: 'id' }, `advertiser-audience-table-${scopedAudiences.length}`));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudiencePage);


/***/ },

/***/ "./apps/mediahub-ui/shared/advertiserPlatformStore.ts"
/*!************************************************************!*\
  !*** ./apps/mediahub-ui/shared/advertiserPlatformStore.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAddedAdvertiserPlatforms: () => (/* binding */ getAddedAdvertiserPlatforms),
/* harmony export */   seedDemoPlatformsFor: () => (/* binding */ seedDemoPlatformsFor),
/* harmony export */   setAddedAdvertiserPlatforms: () => (/* binding */ setAddedAdvertiserPlatforms)
/* harmony export */ });
/* harmony import */ var _londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");


const platformsByAdvertiser = new Map();
const STORAGE_KEY = 'mediahub.advertiser-platforms.v3';
function hydrate() {
    if (typeof localStorage === 'undefined')
        return;
    try {
        platformsByAdvertiser.clear();
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
        Object.entries(stored).forEach(([advertiserId, platforms]) => platformsByAdvertiser.set(advertiserId, platforms));
    }
    catch {
        localStorage.removeItem(STORAGE_KEY);
    }
}
function persist() {
    if (typeof localStorage === 'undefined')
        return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(platformsByAdvertiser)));
}
/**
 * Prototype seed: The Londoner Hotel's platform connections. AdvertiserDetails adds the
 * 'default-amadeus-dsp' row itself, so Amadeus DSP is intentionally NOT seeded here.
 * Idempotent: only writes when the advertiser key does not exist yet (never overwrites user edits).
 */
function readStored() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    }
    catch {
        return {};
    }
}
/** Platform connections of a demo advertiser, minus the synthetic default Amadeus DSP row. */
const demoPlatformRows = (bpid) => ((0,_demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__.getDemoAdvertiserByBpid)(bpid)?.platformAdvertisers ?? [])
    .filter(p => p.platform !== 'Amadeus DSP')
    .map(p => ({ ...p }));
/**
 * Seeds a demo advertiser's platform connections under String(advertiserId) (the REAL backend id
 * when known, otherwise the synthetic id). Idempotent: never overwrites an existing key.
 */
function seedDemoPlatformsFor(advertiserId, bpid) {
    if (typeof localStorage === 'undefined')
        return;
    const rows = demoPlatformRows(bpid);
    if (!rows.length)
        return;
    const stored = readStored();
    const key = String(advertiserId);
    if (key in stored)
        return;
    stored[key] = rows;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}
/**
 * Prototype seed: The Londoner Hotel's + the demo advertisers' platform connections, keyed by their
 * synthetic ids. AdvertiserDetails adds the 'default-amadeus-dsp' row itself, so Amadeus DSP is
 * intentionally NOT seeded. Idempotent: only writes when the advertiser key does not exist yet.
 */
function seedLondonerPlatforms() {
    if (typeof localStorage === 'undefined')
        return;
    const stored = readStored();
    let changed = false;
    const londonerKey = String(_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.advertiserId);
    if (!(londonerKey in stored)) {
        stored[londonerKey] = _londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_PLATFORM_ADVERTISERS.filter(p => p.platform !== 'Amadeus DSP').map(p => ({ ...p }));
        changed = true;
    }
    _demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__.DEMO_ADVERTISERS.forEach(adv => {
        const key = String(adv.advertiserId);
        if (!(key in stored)) {
            stored[key] = demoPlatformRows(adv.bpid);
            changed = true;
        }
    });
    if (changed)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}
function getAddedAdvertiserPlatforms(advertiserId) {
    seedLondonerPlatforms();
    hydrate();
    return [...(platformsByAdvertiser.get(String(advertiserId ?? '')) ?? [])];
}
function setAddedAdvertiserPlatforms(advertiserId, platforms) {
    platformsByAdvertiser.set(String(advertiserId ?? ''), [...platforms]);
    persist();
}


/***/ },

/***/ "./apps/mediahub-ui/shared/platformAdvertiserValidation.ts"
/*!*****************************************************************!*\
  !*** ./apps/mediahub-ui/shared/platformAdvertiserValidation.ts ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getKnownPlatformAdvertiser: () => (/* binding */ getKnownPlatformAdvertiser)
/* harmony export */ });
/* harmony import */ var _londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");


const KNOWN_PLATFORM_ADVERTISERS = {
    'CM360:CM-100001': { id: 'CM-100001', name: 'Hotel Alpha CM360' },
    'SA360:SA-100001': { id: 'SA-100001', name: 'Hotel Alpha SA360' },
    'Facebook:FB-100001': { id: 'FB-100001', name: 'Hotel Alpha Facebook' },
    'WHIP:WHIP-100001': { id: 'WHIP-100001', name: 'Hotel Alpha WHIP' },
    'Derbysoft:DS-100001': { id: 'DS-100001', name: 'Hotel Alpha Derbysoft' },
    'Google DV360:DV-100001': { id: 'DV-100001', name: 'Hotel Alpha Google DV360' },
    'Google ADS:ADS-100001': { id: 'ADS-100001', name: 'Hotel Alpha Google ADS' },
    'Amadeus DSP:DSP-100001': { id: 'DSP-100001', name: 'Hotel Alpha Amadeus DSP' },
    // The Londoner Hotel — keys '<Platform>:<id>' derived from the shared mock.
    ...Object.fromEntries(_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_PLATFORM_ADVERTISERS.map(p => [`${p.platform}:${p.advertiserId}`, { id: p.advertiserId, name: p.advertiserName }])),
    // The 10 demo advertisers — same '<Platform>:<id>' shape.
    ...Object.fromEntries(_demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__.DEMO_ADVERTISERS.flatMap(a => a.platformAdvertisers.map(p => [`${p.platform}:${p.advertiserId}`, { id: p.advertiserId, name: p.advertiserName }]))),
};
const KNOWN_PLATFORM_ADVERTISERS_BY_ID = {
    '1111': { id: '1111', name: 'Hotel Meridian' },
    '2222': { id: '2222', name: 'The Grand Aurora' },
    '3333': { id: '3333', name: 'Harborlight Resort' },
    '4444': { id: '4444', name: 'Summit House Hotel' },
};
function getKnownPlatformAdvertiser(platform, advertiserId) {
    const normalizedId = advertiserId?.trim();
    if (!normalizedId)
        return undefined;
    const normalizedPlatform = platform?.trim().toLowerCase() === 'meta (facebook)' ? 'Facebook' : platform;
    return KNOWN_PLATFORM_ADVERTISERS[`${normalizedPlatform}:${normalizedId}`] ?? KNOWN_PLATFORM_ADVERTISERS_BY_ID[normalizedId];
}


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_pages_Audience_Audience_tsx-apps_mediahub-ui_shared_advertiserPlatformStore_-47d358.1df52c00c736bcb20454.js.map