"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["advertisers"],{

/***/ "./apps/advertisers-ui/AdvertisersGqlProvider/index.ts"
/*!*************************************************************!*\
  !*** ./apps/advertisers-ui/AdvertisersGqlProvider/index.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _AdvertisersGqlProvider__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _AdvertisersGqlProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdvertisersGqlProvider */ "./apps/advertisers-ui/AdvertisersGqlProvider/AdvertisersGqlProvider.tsx");



/***/ },

/***/ "./apps/advertisers-ui/AdvertisersHubRoutes.tsx"
/*!******************************************************!*\
  !*** ./apps/advertisers-ui/AdvertisersHubRoutes.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers */ "./apps/advertisers-ui/pages/Advertisers/index.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/index.ts");




const AdvertisersRoutes = () => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router__WEBPACK_IMPORTED_MODULE_1__.Routes, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_1__.Route, { path: '/', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers__WEBPACK_IMPORTED_MODULE_2__["default"], {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_1__.Route, { path: '/:advertiserId/settings', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails__WEBPACK_IMPORTED_MODULE_3__.AdvertiserDetailsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_1__.Route, { path: '/:advertiserId/summary', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails__WEBPACK_IMPORTED_MODULE_3__.AdvertiserDetailsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_1__.Route, { path: '/:advertiserId', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails__WEBPACK_IMPORTED_MODULE_3__.AdvertiserDetailsPage, {}) })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertisersRoutes);


/***/ },

/***/ "./apps/advertisers-ui/index.tsx"
/*!***************************************!*\
  !*** ./apps/advertisers-ui/index.tsx ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _AdvertisersGqlProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdvertisersGqlProvider */ "./apps/advertisers-ui/AdvertisersGqlProvider/index.ts");
/* harmony import */ var _AdvertisersHubRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdvertisersHubRoutes */ "./apps/advertisers-ui/AdvertisersHubRoutes.tsx");



const AdvertisersUi = () => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertisersGqlProvider__WEBPACK_IMPORTED_MODULE_1__["default"], { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertisersHubRoutes__WEBPACK_IMPORTED_MODULE_2__["default"], {}) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertisersUi);


/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.tsx"
/*!***************************************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.tsx ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertiserDetailsContent: () => (/* binding */ AdvertiserDetailsContent),
/* harmony export */   AdvertiserDetailsPage: () => (/* binding */ AdvertiserDetailsPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/tooltip */ "./node_modules/antd/es/tooltip/index.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AdvertiserDetails.styled */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts");
/* harmony import */ var _Advertisers_queries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @amadeus/react-utils/utils/string */ "./packages/react-utils/utils/string/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/advertiserPlatformStore */ "./apps/mediahub-ui/shared/advertiserPlatformStore.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/advertiserReportingStore */ "./apps/mediahub-ui/shared/advertiserReportingStore.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/platformAdvertiserValidation */ "./apps/mediahub-ui/shared/platformAdvertiserValidation.ts");
/* harmony import */ var _mediahub_mediahub_ui_pages_CampaignMapping_UnmappedCampaigns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.tsx");
/* harmony import */ var _mediahub_mediahub_ui_pages_Audience_Audience__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/Audience/Audience */ "./apps/mediahub-ui/pages/Audience/Audience.tsx");
/* harmony import */ var _DemoSummaryTabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./DemoSummaryTabs */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/DemoSummaryTabs.tsx");


















// Labels are shown to users, so normalise free text to Title Case as it's typed.
const toTitleCase = (value) => value.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
const PLATFORM_OPTIONS = [
    'CM360',
    'SA360',
    'Meta (Facebook)',
    'WHIP',
    'Derbysoft',
    'Google DV360',
    'Google ADS',
    'Amadeus DSP',
].map(platform => ({ label: platform, value: platform }));
const AdvertiserDetails = ({ advertiser, index }) => {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['advertisers', 'common']);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: `advertiser-details-${index}-btn`, variant: 'text', href: `/advertisers/${advertiser.advertiserId}`, children: t('common:details') }));
};
const AdvertiserDetailsContent = ({ advertiser, view = 'settings' }) => {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['advertisers', 'common']);
    const { isExternal, isAdmin, isStandard } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_9__.useAuth)();
    // Read-only role (not admin/standard): the Reporting tab is view-only (UX-2.2).
    const isReadOnly = !(isAdmin || isStandard);
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.useNotification)();
    const initialSummaryView = view === 'summary';
    const requestedSection = new URLSearchParams(location.search).get('section');
    const initialSection = initialSummaryView
        ? ['campaigns', 'audience', 'segmentation', 'media-plans', 'oba'].includes(requestedSection ?? '') ? requestedSection : 'campaigns'
        : ['general-settings', 'platform-settings', 'reporting-settings'].includes(requestedSection ?? '') ? requestedSection : 'general-settings';
    const activeTab = initialSummaryView ? 'summary' : 'settings';
    // Demo advertisers (The Londoner Hotel + 10 others) are matched by BPID: a backend-owned one keeps its real id.
    const isDemo = (0,_DemoSummaryTabs__WEBPACK_IMPORTED_MODULE_15__.isDemoBpid)(advertiser.bpid);
    // Seed the demo platform connections under this advertiser's id (idempotent; no-op for non-demo).
    (0,_mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__.seedDemoPlatformsFor)(advertiser.advertiserId, advertiser.bpid);
    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialSection);
    const [isPlatformDrawerOpen, setIsPlatformDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isDeletePlatformModalOpen, setIsDeletePlatformModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [removedPlatformKeys, setRemovedPlatformKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // Reporting labels are keyed by BPID so the Campaign Mapping module (which only knows the
    // advertiser by BPID) inherits the same Custom 1/2/3 labels defined here (Req 3).
    const [reporting, setReporting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => { (0,_mediahub_mediahub_ui_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_11__.seedAdvertiserReporting)(); return (0,_mediahub_mediahub_ui_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_11__.getAdvertiserReporting)(advertiser.bpid); });
    const [isReportingDrawerOpen, setIsReportingDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [reportingDraft, setReportingDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(reporting);
    const [addedPlatforms, setAddedPlatforms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => (0,_mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__.getAddedAdvertiserPlatforms)(advertiser.advertiserId).map(platform => ({
        key: platform.id,
        platformName: platform.platform,
        platformAdvertiserName: platform.advertiserName,
        platformAdvertiserId: platform.advertiserId,
        connected: platform.connected,
    })));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        const refreshPlatforms = () => {
            setAddedPlatforms((0,_mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__.getAddedAdvertiserPlatforms)(advertiser.advertiserId).map(platform => ({
                key: platform.id,
                platformName: platform.platform,
                platformAdvertiserName: platform.advertiserName,
                platformAdvertiserId: platform.advertiserId,
                connected: platform.connected,
            })));
        };
        window.addEventListener('storage', refreshPlatforms);
        return () => window.removeEventListener('storage', refreshPlatforms);
    }, [advertiser.advertiserId]);
    const [editingPlatformKey, setEditingPlatformKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [platformForm] = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form.useForm();
    const selectedPlatform = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form.useWatch('platform', platformForm);
    const platformAdvertiserId = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form.useWatch('platformAdvertiserId', platformForm);
    const { loading } = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_7__.useGetAdvertiserDetailsQuery)(advertiser.advertiserId);
    const columns = [
        { title: 'Platform', dataIndex: 'platformName', key: 'platformName' },
        { title: 'Platform Advertiser ID', dataIndex: 'platformAdvertiserId', key: 'platformAdvertiserId' },
        { title: 'Platform Advertiser Name', dataIndex: 'platformAdvertiserName', key: 'platformAdvertiserName' },
        {
            title: 'Audience Status',
            key: 'audienceStatus',
            render: (_, record) => {
                const audienceEnabledPlatforms = ['google ads', 'google dv360', 'facebook', 'meta (facebook)', 'amadeus dsp'];
                return audienceEnabledPlatforms.includes(record.platformName.toLowerCase())
                    ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.AudienceEnabledTag, { children: "Audience Enabled" })
                    : null;
            },
        },
        {
            title: 'Data Connection',
            dataIndex: 'connected',
            key: 'connected',
            align: 'center',
            render: (connected) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: !connected ? 'It may take some time to sync and will turn green once updated.' : undefined, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformConnectionCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Icon, { name: connected ? 'checkCircle' : 'timesCircle', color: connected ? '#2e8540' : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.crimson_60, width: 18, height: 18 }) }) })),
        },
        {
            title: '',
            key: 'details',
            render: (_, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { variant: 'text', id: `advertiser-platform-details-${record.key}-btn`, onClick: () => {
                    setEditingPlatformKey(record.key);
                    platformForm.setFieldsValue({ platform: record.platformName, platformAdvertiserId: record.platformAdvertiserId });
                    setIsPlatformDrawerOpen(true);
                }, children: "Details" })),
        },
    ];
    const tableData = [
        {
            key: 'default-amadeus-dsp',
            platformName: 'Amadeus DSP',
            platformAdvertiserName: advertiser.advertiserName,
            platformAdvertiserId: String(advertiser.advertiserId),
            connected: true,
        },
        ...addedPlatforms,
    ].filter(platform => !removedPlatformKeys.includes(platform.key));
    const editingPlatform = tableData.find(platform => platform.key === editingPlatformKey);
    const knownPlatformAdvertiser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const normalizedId = platformAdvertiserId?.trim();
        return (0,_mediahub_mediahub_ui_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_12__.getKnownPlatformAdvertiser)(selectedPlatform, normalizedId);
    }, [platformAdvertiserId, selectedPlatform]);
    const handleAddPlatform = (values) => {
        const normalizedId = values.platformAdvertiserId.trim();
        const knownAdvertiser = (0,_mediahub_mediahub_ui_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_12__.getKnownPlatformAdvertiser)(values.platform, normalizedId);
        const platformRow = {
            key: editingPlatformKey ?? `added-${values.platform}-${normalizedId}`,
            platformName: values.platform,
            platformAdvertiserName: knownAdvertiser?.name ?? '-',
            platformAdvertiserId: normalizedId,
            connected: Boolean(knownAdvertiser),
        };
        const nextPlatforms = editingPlatformKey
            ? addedPlatforms.map(platform => (platform.key === editingPlatformKey ? platformRow : platform))
            : [...addedPlatforms, platformRow];
        setAddedPlatforms(nextPlatforms);
        (0,_mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__.setAddedAdvertiserPlatforms)(advertiser.advertiserId, nextPlatforms.map(platform => ({
            id: platform.key,
            platform: platform.platformName,
            advertiserName: platform.platformAdvertiserName,
            advertiserId: platform.platformAdvertiserId,
            connected: platform.connected,
        })));
        notification.success(editingPlatformKey ? 'Platform settings updated successfully.' : 'Platform settings added successfully.');
        setEditingPlatformKey(null);
        setIsPlatformDrawerOpen(false);
        platformForm.resetFields();
    };
    const closePlatformDrawer = () => {
        setIsPlatformDrawerOpen(false);
        setEditingPlatformKey(null);
        platformForm.resetFields();
    };
    const confirmDeletePlatform = () => {
        if (!editingPlatformKey)
            return;
        const nextPlatforms = addedPlatforms.filter(platform => platform.key !== editingPlatformKey);
        setRemovedPlatformKeys(previous => previous.includes(editingPlatformKey) ? previous : [...previous, editingPlatformKey]);
        setAddedPlatforms(nextPlatforms);
        (0,_mediahub_mediahub_ui_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_10__.setAddedAdvertiserPlatforms)(advertiser.advertiserId, nextPlatforms.map(platform => ({
            id: platform.key,
            platform: platform.platformName,
            advertiserName: platform.platformAdvertiserName,
            advertiserId: platform.platformAdvertiserId,
            connected: platform.connected,
        })));
        setIsDeletePlatformModalOpen(false);
        closePlatformDrawer();
        notification.success('Platform settings removed successfully.');
    };
    const handleSectionChange = (section) => {
        setActiveSection(section);
        navigate(`${location.pathname}?section=${section}`, { replace: true });
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.AdvertiserSectionLayout, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.AdvertiserSectionNavigation, { "aria-label": activeTab === 'settings' ? 'Advertiser settings sections' : 'Advertiser summary sections', children: (activeTab === 'settings' ? [
                            { key: 'general-settings', label: 'General' },
                            { key: 'platform-settings', label: 'Platforms' },
                            { key: 'reporting-settings', label: 'Reporting' },
                        ] : [
                            { key: 'campaigns', label: 'Campaigns' },
                            // OBA / Media Plans have no per-advertiser summary data except for the demo advertiser.
                            { key: 'oba', label: 'OBA', disabled: !isDemo },
                            { key: 'audience', label: 'Audience' },
                            { key: 'media-plans', label: 'Media Plans', disabled: !isDemo },
                        ]).map(section => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.AdvertiserSectionTab, { type: 'button', active: activeSection === section.key, disabled: section.disabled, onClick: () => handleSectionChange(section.key), children: section.label }, section.key))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.AdvertiserSectionContent, { children: [activeTab === 'settings' && activeSection === 'general-settings' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.FieldsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { id: 'advertiser-drawer_general_settings-ttl', children: t('advertisers:details.generalSettings') }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.FieldsGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_name-inp', label: t('advertisers:details.advertiserName'), value: (0,_amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_8__.capitalize)(advertiser.advertiserName), disabled: true }), !isExternal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_bpid-inp', label: 'BPID', value: advertiser.bpid, disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_type-inp', label: t('advertisers:details.advertiserType'), value: advertiser.advertiserTypes || '-', disabled: true })] })] })), activeTab === 'settings' && activeSection === 'platform-settings' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.TableWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.CardHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { id: 'advertiser-drawer_config_settings-ttl', children: "Platform Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: 'advertiser-platform-add-btn', variant: 'solid', onClick: () => setIsPlatformDrawerOpen(true), children: "Add Platform" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Table, { id: 'advertiser-drawer_configuration-tbl', cellsIdPrefix: 'advertiser-drawer_configuration', rowKey: 'key', columns: columns, dataSource: tableData, loading: loading, pagination: false })] })), activeTab === 'settings' && activeSection === 'reporting-settings' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.FieldsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.CardHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { id: 'advertiser-drawer_reporting_settings-ttl', children: "Reporting Settings" }), !isReadOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: 'advertiser-reporting-edit-btn', variant: 'solid', onClick: () => { setReportingDraft(reporting); setIsReportingDrawerOpen(true); }, children: "Edit" }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.Body, { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.cloud_80 }, children: "The labels defined here are later shown in campaign mapping and reporting." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.FieldsGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_custom1-inp', label: 'Custom Label 1', value: reporting.custom1 || '-', disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_custom2-inp', label: 'Custom Label 2', value: reporting.custom2 || '-', disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-drawer_custom3-inp', label: 'Custom Label 3', value: reporting.custom3 || '-', disabled: true })] })] })), activeTab === 'summary' && activeSection === 'campaigns' && (
                            /* This advertiser's campaigns (mapped + unmapped) — the Campaign Setup table scoped to
                               this advertiser (BPID): a Platform ToggleTab is the only filter, Edit columns is kept
                               (Advertiser BPID off by default), no breadcrumb/filter banner/search. Renders a plain
                               header + table. No outer TableWrapper card: the table renders its own card, so wrapping
                               it again would nest cards. */
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_CampaignMapping_UnmappedCampaigns__WEBPACK_IMPORTED_MODULE_13__.AdvertiserCampaignsTable, { advertiserBid: advertiser.bpid })), activeTab === 'summary' && activeSection === 'audience' && (
                            /* Audiences created for this advertiser (same data as the Audience module). */
                            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_Audience_Audience__WEBPACK_IMPORTED_MODULE_14__.AdvertiserAudiencesTable, { advertiserName: advertiser.advertiserName, bpid: advertiser.bpid, advertiserId: String(advertiser.advertiserId) })), activeTab === 'summary' && isDemo && activeSection === 'media-plans' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DemoSummaryTabs__WEBPACK_IMPORTED_MODULE_15__.DemoMediaPlansTab, { bpid: advertiser.bpid }), activeTab === 'summary' && isDemo && activeSection === 'oba' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DemoSummaryTabs__WEBPACK_IMPORTED_MODULE_15__.DemoObaTab, { bpid: advertiser.bpid }), activeTab === 'summary' && !isDemo && (activeSection === 'media-plans' || activeSection === 'oba') && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.TableWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { children: activeSection === 'media-plans' ? 'Media Plans' : 'OBA' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.Body, { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.cloud_80, fontStyle: 'italic' }, children: ["No ", activeSection === 'media-plans' ? 'media plans' : 'OBA records', " available."] })] }))] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Drawer, { id: 'advertiser-platform-drawer', title: 'Add Platform', placement: 'right', width: '480px', open: isPlatformDrawerOpen, onClose: closePlatformDrawer, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformDrawerContent, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form, { form: platformForm, layout: 'vertical', onFinish: handleAddPlatform, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { children: "Platform Information" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { name: 'platform', label: 'Platform Name', rules: [{ required: true, message: 'Please select a platform' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Select, { id: 'advertiser-platform_name-sel', options: PLATFORM_OPTIONS, placeholder: 'Select a platform', disabled: editingPlatform?.connected === true }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformIdInputRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { name: 'platformAdvertiserId', label: 'Platform Advertiser ID', rules: [{ required: true, message: 'Please enter the Platform Advertiser ID' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-platform_advertiser_id-inp', placeholder: 'Enter platform advertiser ID', disabled: editingPlatform?.connected === true }) }), platformAdvertiserId?.trim() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformConnectionStatus, { id: 'advertiser-platform-connection-status', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Icon, { name: knownPlatformAdvertiser ? 'checkCircle' : 'timesCircle', color: knownPlatformAdvertiser ? '#2e8540' : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.crimson_60, width: 18, height: 18 }) }))] }), knownPlatformAdvertiser && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.ConnectedAdvertiserChip, { id: 'advertiser-platform-connected-chip', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Icon, { name: 'checkCircle', color: '#2e8540', width: 16, height: 16 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Tag, { children: knownPlatformAdvertiser.name })] }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.StickyFooter, { left: 'calc(100% - 480px)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerActions, { children: [editingPlatformKey && !editingPlatform?.connected && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { color: 'danger', variant: 'outlined', htmlType: 'button', onClick: () => setIsDeletePlatformModalOpen(true), children: "Remove Platform" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerActionButtons, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: 'advertiser-platform-cancel-btn', variant: 'outlined', htmlType: 'button', onClick: closePlatformDrawer, children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { htmlType: 'submit', id: 'advertiser-platform-save-btn', disabled: editingPlatform?.connected === true, children: "Save" })] })] }) })] }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Drawer, { id: 'advertiser-reporting-drawer', title: 'Edit Reporting Settings', placement: 'right', width: '480px', open: isReportingDrawerOpen, onClose: () => setIsReportingDrawerOpen(false), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformDrawerContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PlatformInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H5, { children: "Reporting Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.Body, { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.cloud_80 }, children: "The labels defined here are later shown in campaign mapping and reporting." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-reporting_custom1-inp', label: 'Custom Label 1', placeholder: 'Enter Custom Label 1', maxLength: 255, value: reportingDraft.custom1, onChange: e => setReportingDraft(r => ({ ...r, custom1: toTitleCase(e.target.value) })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-reporting_custom2-inp', label: 'Custom Label 2', placeholder: 'Enter Custom Label 2', maxLength: 255, value: reportingDraft.custom2, onChange: e => setReportingDraft(r => ({ ...r, custom2: toTitleCase(e.target.value) })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Input, { id: 'advertiser-reporting_custom3-inp', label: 'Custom Label 3', placeholder: 'Enter Custom Label 3', maxLength: 255, value: reportingDraft.custom3, onChange: e => setReportingDraft(r => ({ ...r, custom3: toTitleCase(e.target.value) })) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.StickyFooter, { left: 'calc(100% - 480px)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerActions, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerActionButtons, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: 'advertiser-reporting-cancel-btn', variant: 'outlined', htmlType: 'button', onClick: () => setIsReportingDrawerOpen(false), children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { id: 'advertiser-reporting-save-btn', htmlType: 'button', onClick: () => {
                                                setReporting(reportingDraft);
                                                (0,_mediahub_mediahub_ui_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_11__.setAdvertiserReporting)(advertiser.bpid, reportingDraft);
                                                setIsReportingDrawerOpen(false);
                                                notification.success('Reporting settings saved.');
                                            }, children: "Save" })] }) }) })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Modal, { idPrefix: 'advertiser-platform-delete-modal', title: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Icon, { name: 'exclamationTriangle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.pumpkin_60, width: 24, height: 24 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Remove Platform Settings" })] }), open: isDeletePlatformModalOpen, maskStyle: { backgroundColor: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.colors.sky_90 }, okText: 'Remove', onOk: confirmDeletePlatform, onCancel: () => setIsDeletePlatformModalOpen(false), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.Body, { children: "Are you sure you want to remove these platform settings? This action cannot be undone." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.Body, { children: "Would you like to proceed with the Remove?" })] })] }));
};
const AdvertiserDetailsPage = () => {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['advertisers', 'common']);
    const { advertiserId } = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useParams)();
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
    const numericAdvertiserId = advertiserId ? Number(advertiserId) : undefined;
    const { data, loading } = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_7__.useGetAdvertiserByIdQuery)(numericAdvertiserId);
    const advertiser = data?.advertisers?.advertisers?.[0];
    const isSummaryView = location.pathname.endsWith('/summary');
    const pageParams = new URLSearchParams(location.search);
    const fromSummary = pageParams.get('from') === 'summary';
    const fromSection = pageParams.get('fromSection');
    if (loading)
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Spinner, {});
    if (!advertiser)
        return null;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Breadcrumb, { items: [
                    { title: t('common:home'), href: '/' },
                    { title: 'Advertiser', href: '/advertisers' },
                    ...(fromSummary ? [{ title: 'Advertiser Details', href: `/advertisers/${advertiserId}/summary?section=${fromSection ?? 'segmentation'}` }] : []),
                    { title: isSummaryView ? 'Advertiser Details' : 'Advertiser Settings', href: location.pathname },
                ] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_6__.PageTitleRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Text.H3, { id: 'advertiser-details-page-ttl', children: isSummaryView ? `Advertiser Details - ${(0,_amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_8__.capitalize)(advertiser.advertiserName)}` : (0,_amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_8__.capitalize)(advertiser.advertiserName) }), isSummaryView ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { variant: 'solid', href: `/advertisers/${advertiser.advertiserId}/settings?section=general-settings&from=summary&fromSection=segmentation`, children: "Settings" })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_5__.Button, { variant: 'solid', href: `/advertisers/${advertiser.advertiserId}/summary?section=campaigns`, children: "Details" }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AdvertiserDetailsContent, { advertiser: advertiser, view: isSummaryView ? 'summary' : 'settings' })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertiserDetails);


/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/DemoSummaryTabs.tsx"
/*!*************************************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/DemoSummaryTabs.tsx ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DemoMediaPlansTab: () => (/* binding */ DemoMediaPlansTab),
/* harmony export */   DemoObaTab: () => (/* binding */ DemoObaTab),
/* harmony export */   isDemoBpid: () => (/* binding */ isDemoBpid)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdvertiserDetails.styled */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _mediahub_mediaplanner_ui_pages_MediaplannerProductSettings_mockSalesforcePlans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans */ "./apps/mediaplanner-ui/pages/MediaplannerProductSettings/mockSalesforcePlans.ts");
/* harmony import */ var _mediahub_oba_ui_ObaGqlProvider_londonerObaMock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mediahub/oba-ui/ObaGqlProvider/londonerObaMock */ "./apps/oba-ui/ObaGqlProvider/londonerObaMock.ts");







/**
 * Advertiser Details > Media Plans / OBA tabs for the demo advertisers (The Londoner Hotel and the
 * 10 in demoAdvertisers.ts), looked up by BPID. These tabs are disabled for every other advertiser
 * (no backend summary data exists for them).
 * Both read the SAME mock fixtures as the Media Planner / OBA modules so the numbers agree.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// dd-Mmm-yyyy display format (global convention); accepts ISO or already-formatted strings.
const formatDate = (value) => {
    const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (!iso)
        return value;
    return `${iso[3]}-${MONTHS[Number(iso[2]) - 1]}-${iso[1]}`;
};
const money = (value, currency) => new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
const sum = (values) => values.reduce((a, b) => a + b, 0);
const statusTag = (status) => {
    const map = {
        Live: 'success',
        Scheduled: 'primary',
        Paused: 'warning',
        Completed: 'default',
        NEW: 'primary',
    };
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Tag, { status: map[status] ?? 'default', children: status === 'NEW' ? 'New' : status });
};
const linkButton = (id, label, href) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Button, { id: id, variant: 'text', href: href, children: label }));
/** True when the BPID is The Londoner Hotel or one of the 10 demo advertisers. */
const isDemoBpid = (bpid) => !!bpid && (bpid === _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_3__.LONDONER.bpid || !!(0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__.getDemoAdvertiserByBpid)(bpid));
const DemoMediaPlansTab = ({ bpid }) => {
    const plan = (0,_mediahub_mediaplanner_ui_pages_MediaplannerProductSettings_mockSalesforcePlans__WEBPACK_IMPORTED_MODULE_5__.getMockSalesforcePlanForAdvertiser)(bpid);
    if (!plan)
        return null;
    const rows = [
        {
            key: plan.id,
            name: plan.planName,
            type: plan.planType === 'NEW' ? 'New' : 'Renewal',
            period: `${formatDate(plan.startDate)} to ${formatDate(plan.endDate)}`,
            budget: money(plan.contractBudgetTarget, plan.currency),
            products: plan.products.map(p => p.name).join(', '),
            status: plan.status,
            id: plan.id,
        },
    ];
    const columns = [
        {
            title: 'Plan Name',
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => linkButton(`advertiser-media-plan-${record.id}-btn`, value, `/mediaplanner/edit/${record.id}`),
        },
        { title: 'Plan Type', dataIndex: 'type', key: 'type' },
        { title: 'Period', dataIndex: 'period', key: 'period' },
        { title: 'Contract Budget', dataIndex: 'budget', key: 'budget' },
        { title: 'Products', dataIndex: 'products', key: 'products' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => statusTag(value) },
    ];
    // Budget split by channel — the same split the OBA plan and Campaign Setup are built from.
    const demo = (0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__.getDemoAdvertiserByBpid)(bpid);
    const channelRows = demo
        ? (0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__.activeChannels)(demo).map(key => ({
            key,
            channel: _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__.DEMO_CHANNEL_INFO[key].label,
            platform: _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_4__.DEMO_CHANNEL_INFO[key].platform,
            share: `${Math.round(demo.shares[key] * 100)}%`,
            budget: money(demo.budgets[key], plan.currency),
        }))
        : Object.entries(_mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_3__.LONDONER_CHANNELS).map(([key, channel]) => ({
            key,
            channel: channel.label,
            platform: channel.platform,
            share: `${Math.round(channel.share * 100)}%`,
            budget: money(channel.budget, plan.currency),
        }));
    const channelColumns = [
        { title: 'Channel', dataIndex: 'channel', key: 'channel' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Share of Budget', dataIndex: 'share', key: 'share' },
        { title: 'Budget', dataIndex: 'budget', key: 'budget' },
    ];
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.TableWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.CardHeaderRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H5, { id: 'advertiser-media_plans-ttl', children: "Media Plans" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Table, { id: 'advertiser-media_plans-tbl', cellsIdPrefix: 'advertiser-media_plans', rowKey: 'key', columns: columns, dataSource: rows, pagination: false })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.TableWrapper, { style: { marginTop: 16 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.CardHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H5, { id: 'advertiser-media_plan_split-ttl', children: "Budget by Channel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.Body, { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80 }, children: plan.planName })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Table, { id: 'advertiser-media_plan_split-tbl', cellsIdPrefix: 'advertiser-media_plan_split', rowKey: 'key', columns: channelColumns, dataSource: channelRows, pagination: false })] })] }));
};
const DemoObaTab = ({ bpid }) => {
    const rows = (0,_mediahub_oba_ui_ObaGqlProvider_londonerObaMock__WEBPACK_IMPORTED_MODULE_6__.getPlansForAdvertiser)(bpid).map(plan => {
        const spent = sum(plan.groups.map(group => sum(Object.values(group.monthSpentCents)))) / 100;
        const budget = plan.totalBudgetCents / 100;
        return {
            key: plan.id,
            id: plan.id,
            name: plan.name,
            period: `${formatDate(plan.period.startDate)} to ${formatDate(plan.period.endDate)}`,
            budget: money(budget, plan.currency),
            spent: money(spent, plan.currency),
            groups: plan.groups.length,
            campaigns: sum(plan.groups.map(group => group.campaigns.length)),
            status: String(plan.status),
        };
    });
    const columns = [
        {
            title: 'Plan Name',
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => linkButton(`advertiser-oba-plan-${record.id}-btn`, value, `/oba/plans/${record.id}/settings`),
        },
        { title: 'Period', dataIndex: 'period', key: 'period' },
        { title: 'Total Budget', dataIndex: 'budget', key: 'budget' },
        { title: 'Spent', dataIndex: 'spent', key: 'spent' },
        { title: 'Groups', dataIndex: 'groups', key: 'groups' },
        { title: 'Campaigns', dataIndex: 'campaigns', key: 'campaigns' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => statusTag(value) },
        {
            title: '',
            key: 'details',
            render: (_, record) => linkButton(`advertiser-oba-plan-details-${record.id}-btn`, 'Details', `/oba/plans/${record.id}/details`),
        },
    ];
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.TableWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.CardHeaderRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H5, { id: 'advertiser-oba-ttl', children: "OBA" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Table, { id: 'advertiser-oba-tbl', cellsIdPrefix: 'advertiser-oba', rowKey: 'key', columns: columns, dataSource: rows, pagination: false })] }));
};


/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/index.ts"
/*!**************************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/index.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertiserDetails: () => (/* reexport safe */ _AdvertiserDetails__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   AdvertiserDetailsPage: () => (/* reexport safe */ _AdvertiserDetails__WEBPACK_IMPORTED_MODULE_0__.AdvertiserDetailsPage)
/* harmony export */ });
/* harmony import */ var _AdvertiserDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdvertiserDetails */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.tsx");




/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/Advertisers.styled.tsx"
/*!**********************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/Advertisers.styled.tsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertisersWrapper: () => (/* binding */ AdvertisersWrapper),
/* harmony export */   DropdownTrigger: () => (/* binding */ DropdownTrigger),
/* harmony export */   MappedCell: () => (/* binding */ MappedCell),
/* harmony export */   MappedLabel: () => (/* binding */ MappedLabel),
/* harmony export */   MappedRing: () => (/* binding */ MappedRing)
/* harmony export */ });
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");


const AdvertisersWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
`;
const DropdownTrigger = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.Button)) `
  border: 1px solid ${({ disabled }) => (disabled ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_40 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_60)} !important;
  color: ${({ disabled }) => (disabled ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_40 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_60)} !important;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
// Campaigns-mapped donut ("N Inc / M Tot"): a conic-gradient ring + label, matching the proposed
// design. Fully mapped = green ring; partial = orange arc over a grey remainder.
const MappedCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
const MappedRing = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].span `
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  /* Included = dark sky blue arc; remainder (total) = grey. No green/orange distinction. */
  background: ${({ pct }) => {
    const deg = Math.round(Math.max(0, Math.min(1, pct)) * 360);
    return `conic-gradient(${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_80} 0deg ${deg}deg, ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_30} ${deg}deg 360deg)`;
}};
  /* Punch out the centre so it reads as a ring, not a pie. */
  -webkit-mask: radial-gradient(circle 6px at 50% 50%, transparent 98%, #000 100%);
  mask: radial-gradient(circle 6px at 50% 50%, transparent 98%, #000 100%);
`;
const MappedLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].span `
  font-size: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_100};
  white-space: nowrap;
`;


/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/Advertisers.tsx"
/*!***************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/Advertisers.tsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters */ "./apps/mediahub-ui/components/TableWithFilters/index.ts");
/* harmony import */ var _Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Advertisers.styled */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.styled.tsx");
/* harmony import */ var _Advertisers_queries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _graphql_generated_advertiser_enums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../graphql/generated/advertiser-enums */ "./apps/advertisers-ui/graphql/generated/advertiser-enums.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _mediahub_mediahub_ui_pages_UsersManagement_UserManagement_queries__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/UsersManagement/UserManagement.queries */ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.queries.ts");
/* harmony import */ var _useAdvertiserFollowActions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useAdvertiserFollowActions */ "./apps/advertisers-ui/pages/Advertisers/useAdvertiserFollowActions.ts");
/* harmony import */ var _AdvertisersConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./AdvertisersConfig */ "./apps/advertisers-ui/pages/Advertisers/AdvertisersConfig.tsx");
/* harmony import */ var _amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @amadeus/react-utils */ "./packages/react-utils/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _mediahub_mediahub_ui_pages_CampaignMapping_mockData_campaigns__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/mockData/campaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts");
/* harmony import */ var _mediahub_mediahub_ui_pages_CampaignMapping_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");


















// Demo advertisers' (The Londoner Hotel + the 10 in demoAdvertisers.ts) summary, computed from the
// same mock rows Campaign Setup shows, so the list agrees with the detail screens.
//  - Campaigns: mapped campaigns / (mapped + still-to-map rows for this BPID)
//  - OBA: only paid search, display and video are in the OBA plan (metasearch is billed outside it)
//  - Invoice: every mapped campaign has its invoice mapped
function demoMappingSummary(bpid, platforms, mediaPlanName) {
    // Campaign Setup rows whose campaign mapping is done (e.g. the campaigns created with Max) count as mapped.
    const setupRows = _mediahub_mediahub_ui_pages_CampaignMapping_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_17__.unmappedCampaigns.filter(c => c.advertiserBid === bpid);
    const mapped = [..._mediahub_mediahub_ui_pages_CampaignMapping_mockData_campaigns__WEBPACK_IMPORTED_MODULE_16__.mappedCampaigns.filter(c => c.advertiserBid === bpid), ...setupRows.filter(c => c.campaignMapping === 'mapped')];
    const toMap = setupRows.filter(c => c.campaignMapping !== 'mapped');
    const isObaChannel = (platform) => platform !== 'DerbySoft' && platform !== 'WIHP';
    const campaignsTotal = mapped.length + toMap.length;
    const obaTotal = mapped.filter(c => isObaChannel(c.platform)).length + toMap.filter(c => isObaChannel(c.platform)).length;
    const obaMapped = toMap.length === 0 ? obaTotal : mapped.filter(c => isObaChannel(c.platform)).length;
    return {
        platformsMapped: platforms,
        campaignsMapped: mapped.length,
        campaignsTotal,
        obaMapped,
        obaTotal,
        invoiceMapped: mapped.length,
        invoiceTotal: campaignsTotal,
        contractActive: true,
        mediaPlans: [mediaPlanName],
    };
}
/** Demo summary for an advertiser, matched by BPID (a backend-owned demo advertiser keeps its real id). */
function demoSummaryFor(bpid) {
    if (!bpid)
        return undefined;
    if (bpid === _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER.bpid) {
        return demoMappingSummary(bpid, _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER_PLATFORM_ADVERTISERS.length, _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER_NAMES.mediaPlan);
    }
    const demo = (0,_mediahub_mediahub_ui_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_15__.getDemoAdvertiserByBpid)(bpid);
    return demo ? demoMappingSummary(bpid, demo.platformAdvertisers.length, demo.mediaPlanName) : undefined;
}
// Prototype-only: derive a stable per-advertiser mapping summary from its id (no backend field yet).
// platformsMapped <= platformsTotal (2-5); campaignsMapped <= campaignsTotal (up to ~30), with some
// advertisers fully mapped (green ring) and others partial (orange arc).
function advertiserMappingSummary(advertiserId, bpid) {
    // Demo advertisers: derive the summary from their real mock data (not a random hash).
    const demo = demoSummaryFor(bpid ?? (String(advertiserId) === String(_mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER.advertiserId) ? _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER.bpid : undefined));
    if (demo)
        return demo;
    const n = Math.abs(Array.from(String(advertiserId)).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) || 1;
    // Contract status drives everything: ~1 in 3 advertisers are INACTIVE and read as fully empty —
    // 0 platforms, 0/0 campaigns, 0/0 OBA, 0/0 invoice, and no media plans. Active advertisers get
    // real mock counts and 1-3 media plans (mostly 1).
    const contractActive = n % 3 !== 0;
    if (!contractActive) {
        return {
            platformsMapped: 0,
            campaignsMapped: 0,
            campaignsTotal: 0,
            obaMapped: 0,
            obaTotal: 0,
            invoiceMapped: 0,
            invoiceTotal: 0,
            contractActive: false,
            mediaPlans: [],
        };
    }
    const platformsMapped = 1 + (n % 10); // 1..10 — a standalone count (no total)
    const campaignsTotal = 8 + (n % 23); // 8..30
    // some advertisers fully mapped (green ring); the rest partial (orange arc).
    const campaignsMapped = n % 2 === 0 ? campaignsTotal : Math.max(1, Math.floor(campaignsTotal * (0.3 + (n % 6) * 0.1)));
    const obaTotal = campaignsTotal;
    const obaMapped = n % 4 === 0 ? obaTotal : Math.max(1, Math.floor(obaTotal * (0.2 + (n % 7) * 0.1)));
    const invoiceTotal = campaignsTotal;
    const invoiceMapped = n % 5 === 0 ? invoiceTotal : Math.max(1, Math.floor(invoiceTotal * (0.25 + (n % 5) * 0.12)));
    const ALL_PLANS = ['Always-On Search', 'Q4 Brand Push', 'Summer Metasearch', 'Hotel Display 2026', 'Retargeting Core'];
    const planCount = n % 7 === 0 ? 3 : n % 3 === 1 ? 2 : 1;
    const mediaPlans = Array.from({ length: planCount }, (_, i) => ALL_PLANS[(n + i) % ALL_PLANS.length]);
    return {
        platformsMapped,
        campaignsMapped: Math.min(campaignsMapped, campaignsTotal),
        campaignsTotal,
        obaMapped: Math.min(obaMapped, obaTotal),
        obaTotal,
        invoiceMapped: Math.min(invoiceMapped, invoiceTotal),
        invoiceTotal,
        contractActive: true,
        mediaPlans,
    };
}
// Shared donut-ring cell ("N Inc / M Tot") for the mapped-count columns (Campaigns / OBA / Invoice).
function renderMappedRing(mapped, total) {
    const pct = total > 0 ? mapped / total : 0;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__.MappedCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__.MappedRing, { pct: pct, "aria-hidden": true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__.MappedLabel, { children: [mapped, " Inc / ", total, " Tot"] })] }));
}
// Prototype-only: advertisers flagged as "New" (shown with a primary-blue chip next to the name).
// Matched by advertiser name since there's no backend "new" flag yet.
const NEW_ADVERTISERS = new Set([
    'Alila Ventana Big Sur',
    'Catalina Island Company',
    'Der Laerchenhof',
    'Dragon Hill Lodge',
    _mediahub_mediahub_ui_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_14__.LONDONER.name,
]);
function AdvertisersPage() {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['advertisers', 'common']);
    const { user, isExternal } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_8__.useAuth)();
    const userId = user?.id;
    const [toggleTotals, seToggleTotals] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        totalAdvertisers: 0,
        totalFollowing: 0,
    });
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [selectedRows, setSelectedRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedRowKeys, setSelectedRowKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const isAnyRowSelected = selectedRows?.length > 0;
    const [selectedAdvertisers, setSelectedAdvertisers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedUsers, setSelectedUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_9__.useLocation)();
    const params = new URLSearchParams(location.search);
    const followingOnlyQueryParam = params.get('isFollowingOnly');
    const { handleFollowAll, handleUnfollowAll, handleToggleFollow } = (0,_useAdvertiserFollowActions__WEBPACK_IMPORTED_MODULE_11__.useAdvertiserFollowActions)({
        selectedRows,
        setSelectedRows,
        setSelectedRowKeys,
        refetchWithFilters: () => tableRef.current?.refetchWithFilters?.(),
    });
    const bulkActionsDropdownItems = [
        {
            key: 'follow',
            label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'advertiser-follow_all-txt', children: t('advertisers:actions.followAll') }),
            onClick: handleFollowAll,
        },
        {
            key: 'unfollow',
            label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'advertiser-unfollow_all-txt', children: t('advertisers:actions.unfollowAll') }),
            onClick: handleUnfollowAll,
        },
    ];
    const columns = [
        {
            title: t('advertisers:columns.following'),
            key: 'follow',
            align: 'center',
            width: 70,
            fixed: 'left',
            render: (_, record, idx) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.IconButton, { id: `advertiser-follow-${idx}-btn`, onClick: () => handleToggleFollow(record), iconName: record.isFollowing ? 'userPlusSolid' : 'userPlus', color: record.isFollowing ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, height: 16, width: 16 })),
        },
        {
            title: t(isExternal ? 'advertisers:columns.advertiserName' : 'advertisers:details.advertiserName'),
            dataIndex: 'advertiserName',
            key: 'advertiserName',
            width: 220,
            fixed: 'left',
            ellipsis: true,
            render: (value, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { variant: 'text', href: `/advertisers/${record.advertiserId}/settings`, children: value }), NEW_ADVERTISERS.has(value) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Tag, { status: 'primary', children: "New" })] })),
        },
        ...(!isExternal
            ? [
                {
                    title: 'BPID',
                    dataIndex: 'bpid',
                    key: 'bpid',
                    width: 130,
                    fixed: 'left',
                    ellipsis: true,
                },
            ]
            : []),
        {
            title: t('advertisers:columns.advertiserType'),
            dataIndex: 'advertiserTypes',
            key: 'advertiserTypes',
            width: 120,
            ellipsis: true,
            render: (types) => types,
        },
        // Prototype-only: contract status + media plans (no backend field yet; derived per advertiser).
        {
            title: 'Contract Status',
            key: 'contractStatus',
            width: 120,
            render: (_, record) => {
                const active = advertiserMappingSummary(record.advertiserId, record.bpid).contractActive;
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Tag, { status: active ? 'success' : 'disabled', children: active ? 'Active' : 'Inactive' });
            },
        },
        {
            title: 'Media Plans',
            key: 'mediaPlans',
            width: 220,
            ellipsis: true,
            render: (_, record) => {
                const plans = advertiserMappingSummary(record.advertiserId, record.bpid).mediaPlans;
                return plans.length > 0 ? plans.join(', ') : '-';
            },
        },
        // Prototype-only mapping summary. Real data isn't on the Advertiser record yet, so these are
        // derived deterministically from the advertiser id (stable across renders). Remove / wire to
        // real data when the backend provides per-advertiser platform + campaign-mapping counts.
        {
            title: 'Platforms Mapped',
            key: 'platformsMapped',
            width: 130,
            align: 'center',
            render: (_, record) => {
                // No "total" for platforms — just the count of mapped platforms.
                return advertiserMappingSummary(record.advertiserId, record.bpid).platformsMapped;
            },
        },
        {
            title: 'Campaigns Mapped',
            key: 'campaignsMapped',
            width: 150,
            render: (_, record) => {
                const m = advertiserMappingSummary(record.advertiserId, record.bpid);
                return renderMappedRing(m.campaignsMapped, m.campaignsTotal);
            },
        },
        {
            title: 'Campaigns in OBA',
            key: 'obaMapped',
            width: 150,
            render: (_, record) => {
                const m = advertiserMappingSummary(record.advertiserId, record.bpid);
                return renderMappedRing(m.obaMapped, m.obaTotal);
            },
        },
        {
            title: 'Campaigns Invoice Mapped',
            key: 'invoiceMapped',
            width: 180,
            render: (_, record) => {
                const m = advertiserMappingSummary(record.advertiserId, record.bpid);
                return renderMappedRing(m.invoiceMapped, m.invoiceTotal);
            },
        },
        { title: t('advertisers:columns.followedBy'), dataIndex: 'followedBy', key: 'followedBy', width: 110 },
        {
            title: '',
            key: 'details',
            width: 90,
            render: (_, record, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: `advertiser-overview-details-${index}-btn`, variant: 'text', href: `/advertisers/${record.advertiserId}/summary`, children: "Details" })),
        },
    ];
    const advertiserTypeOptions = Object.values(_graphql_generated_advertiser_enums__WEBPACK_IMPORTED_MODULE_7__.AdvertiserTypesEnum).map(value => ({
        value,
        label: value,
    }));
    if (!userId)
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Spinner, {});
    const { refetch: refetchAdvertisersOptions } = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_6__.useGetAdvertiserOptionsQuery)(true);
    const advertiserOptions = (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.useServerOptions)({
        queryFn: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.buildServerOptionsQueryFn)({
            refetch: refetchAdvertisersOptions,
            buildVars: (search, pagination) => ({
                filter: {
                    advertiserTypes: _graphql_generated_advertiser_enums__WEBPACK_IMPORTED_MODULE_7__.AdvertiserTypesEnum.Hotel,
                    name: (0,_AdvertisersConfig__WEBPACK_IMPORTED_MODULE_12__.normalizeAdvertiserSearch)(search),
                    isFollowingOnly: false,
                    paging: { limit: pagination.limit, offset: pagination.offset },
                },
            }),
            getItems: data => data?.advertisers?.advertisers ?? [],
            mapToOption: adv => (0,_AdvertisersConfig__WEBPACK_IMPORTED_MODULE_12__.formatAndSortAdvertisers)([adv], isExternal)[0],
        }),
        pageSize: 20,
    });
    const { refetch: refetchUsersOptions } = (0,_mediahub_mediahub_ui_pages_UsersManagement_UserManagement_queries__WEBPACK_IMPORTED_MODULE_10__.useGetUsersOptionsQuery)(100, 0, true);
    const usersOptions = (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.useServerOptions)({
        queryFn: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.buildServerOptionsQueryFn)({
            refetch: refetchUsersOptions,
            buildVars: (search, pagination) => ({
                options: {
                    search: { query: search, fields: ['name', 'email'] },
                    paginate: { limit: pagination.limit, offset: pagination.offset },
                },
            }),
            getItems: data => data?.users?.users ?? [],
            mapToOption: user => (0,_AdvertisersConfig__WEBPACK_IMPORTED_MODULE_12__.formatUsersToOptions)([user])[0],
        }),
        pageSize: 20,
    });
    const filterItems = [
        {
            name: 'ids',
            label: isExternal ? t('advertisers:filters.advertiserBpid') : `${t('advertisers:filters.advertiserBpid')} (BPID)`,
            type: 'multiple',
            options: selectedAdvertisers,
            optionsTagLabelKey: 'label',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: isExternal ? t('advertisers:filters.advertiserBpid') : `${t('advertisers:filters.advertiserBpid')} (BPID)`, id: 'advertiser-bpid-sel', placeholder: t('common:select'), popupMatchSelectWidth: 600, mode: 'multiple', showSearch: true, options: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.mergeWithSelected)(advertiserOptions.options, selectedAdvertisers), value: Array.isArray(value) ? value : [], onChange: (v) => {
                    setValue(v);
                    (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.updateSelectedOptions)(v, advertiserOptions.options, setSelectedAdvertisers);
                }, loading: advertiserOptions.loading, onSearch: advertiserOptions.onSearch, onBlur: advertiserOptions.onBlur, onPopupScroll: advertiserOptions.onPopupScroll, filterMode: 'server' })),
        },
        {
            name: 'advertiserTypes',
            label: t('advertisers:filters.advertiserType'),
            type: 'multiple',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('advertisers:filters.advertiserType'), id: 'advertiser-type-sel', placeholder: t('common:select'), mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: advertiserTypeOptions })),
        },
        {
            name: 'followedBy',
            label: t('advertisers:filters.followedBy'),
            type: 'multiple',
            options: selectedUsers,
            optionsTagLabelKey: 'label',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('advertisers:filters.followedBy'), id: 'advertiser-followed_by-sel', placeholder: t('common:select'), mode: 'multiple', showSearch: true, options: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.mergeWithSelected)(usersOptions.options, selectedUsers), value: Array.isArray(value) ? value : [], onChange: (v) => {
                    setValue(v);
                    (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_13__.updateSelectedOptions)(v, usersOptions.options, setSelectedUsers);
                }, loading: usersOptions.loading, onSearch: usersOptions.onSearch, onBlur: usersOptions.onBlur, onPopupScroll: usersOptions.onPopupScroll, filterMode: 'server' })),
        },
    ];
    const tableFilterItems = [
        {
            name: 'isFollowingOnly',
            label: 'View',
            type: 'single',
            placement: 'header',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { value: value, onChange: v => setValue(v), options: [
                    {
                        label: ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'advertiser-my-txt', children: t('advertisers:filters.myAdvertisers', { count: toggleTotals.totalFollowing }) })),
                        value: true,
                    },
                    {
                        label: ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'advertiser-all-txt', children: t('advertisers:filters.allAdvertisers', { count: toggleTotals.totalAdvertisers }) })),
                        value: false,
                    },
                ] })),
        },
    ];
    const tableCustomControls = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.DropdownMenu, { items: bulkActionsDropdownItems, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__.DropdownTrigger, { id: 'advertiser-bulk_actions-btn', variant: 'outlined', disabled: !isAnyRowSelected, children: [t('advertisers:actions.bulkActions'), ' ', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'chevronDown', color: !isAnyRowSelected ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_40 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60, width: 10, height: 10 })] }) }) }));
    const initialFilters = {
        isFollowingOnly: followingOnlyQueryParam ? true : false,
    };
    const { refetch: refetchAdvertisers } = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_6__.useGetAdvertisersQuery)();
    const queryFn = (0,_AdvertisersConfig__WEBPACK_IMPORTED_MODULE_12__.refetchAdvertisersFiltersFormatted)(refetchAdvertisers, seToggleTotals);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Advertisers_styled__WEBPACK_IMPORTED_MODULE_5__.AdvertisersWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: t('common:home'), href: '/' }, { title: t('advertisers:title') }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__.TableWithFilterBanner, { ref: tableRef, sectionTitle: t('advertisers:title'), columns: columns, filterItems: [...filterItems, ...tableFilterItems], initialFilters: initialFilters, filterMode: 'server', queryFn: queryFn, tableSearch: { show: true }, tableScrollX: 1690, tableCustomControls: tableCustomControls, tableTitle: t('advertisers:tableTitle'), rowSelection: {
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: (keys, rows) => {
                        setSelectedRowKeys(keys);
                        setSelectedRows(rows);
                    },
                }, id: 'advertiser-tbl', cellsIdPrefix: 'advertiser', rowKey: 'advertiserId' })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertisersPage);


/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/index.ts"
/*!********************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/index.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Advertisers__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Advertisers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Advertisers */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.tsx");



/***/ },

/***/ "./apps/advertisers-ui/pages/Advertisers/useAdvertiserFollowActions.ts"
/*!*****************************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/useAdvertiserFollowActions.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAdvertiserFollowActions: () => (/* binding */ useAdvertiserFollowActions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _Advertisers_queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");




function useAdvertiserFollowActions({ selectedRows, setSelectedRows, setSelectedRowKeys, refetchWithFilters, }) {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('common');
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.useNotification)();
    const [followAdvertiser, { error: followAdvertiserError }] = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_3__.useFollowAdvertiserMutation)();
    const [unfollowAdvertiser, { error: unfollowAdvertiserError }] = (0,_Advertisers_queries__WEBPACK_IMPORTED_MODULE_3__.useUnfollowAdvertiserMutation)();
    const handleFollowAll = () => {
        const advertiserIds = selectedRows.filter(r => !r.isFollowing).map(r => String(r.advertiserId));
        if (advertiserIds.length === 0)
            return;
        followAdvertiser({
            variables: { input: { advertiserId: advertiserIds } },
            errorPolicy: 'all',
        }).then(response => {
            if (!response.errors) {
                notification.success(response.data?.followAdvertiser?.message);
                setSelectedRows([]);
                setSelectedRowKeys([]);
                refetchWithFilters();
            }
        });
    };
    const handleUnfollowAll = () => {
        const advertiserIds = selectedRows.filter(r => r.isFollowing).map(r => String(r.advertiserId));
        if (advertiserIds.length === 0)
            return;
        unfollowAdvertiser({
            variables: { input: { advertiserId: advertiserIds } },
            errorPolicy: 'all',
        }).then(response => {
            if (!response.errors) {
                notification.success(response.data?.unfollowAdvertiser?.message);
                setSelectedRows([]);
                setSelectedRowKeys([]);
                refetchWithFilters();
            }
        });
    };
    const handleToggleFollow = (record) => {
        const vars = {
            input: { advertiserId: [String(record.advertiserId)] },
        };
        const exec = record.isFollowing ? unfollowAdvertiser : followAdvertiser;
        exec({ variables: vars, errorPolicy: 'all' }).then(response => {
            if (!response.errors) {
                notification.success(t('successfullyUpdated'));
                refetchWithFilters();
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (followAdvertiserError) {
            notification.error(followAdvertiserError.message);
        }
    }, [followAdvertiserError]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (unfollowAdvertiserError) {
            notification.error(unfollowAdvertiserError.message);
        }
    }, [unfollowAdvertiserError]);
    return {
        handleFollowAll,
        handleUnfollowAll,
        handleToggleFollow,
    };
}


/***/ }

}]);
//# sourceMappingURL=advertisers.f4a8017c7dd29eac912e.js.map