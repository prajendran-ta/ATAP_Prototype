"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["audience"],{

/***/ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveFiltersBadge: () => (/* binding */ ActiveFiltersBadge),
/* harmony export */   AdvertiserSectionContent: () => (/* binding */ AdvertiserSectionContent),
/* harmony export */   AdvertiserSectionLayout: () => (/* binding */ AdvertiserSectionLayout),
/* harmony export */   AdvertiserSectionNavigation: () => (/* binding */ AdvertiserSectionNavigation),
/* harmony export */   AdvertiserSectionTab: () => (/* binding */ AdvertiserSectionTab),
/* harmony export */   AudienceEnabledTag: () => (/* binding */ AudienceEnabledTag),
/* harmony export */   AudiencePlatformChip: () => (/* binding */ AudiencePlatformChip),
/* harmony export */   AudiencePlatformChipRow: () => (/* binding */ AudiencePlatformChipRow),
/* harmony export */   AudiencePlatformChipRows: () => (/* binding */ AudiencePlatformChipRows),
/* harmony export */   CardHeaderRow: () => (/* binding */ CardHeaderRow),
/* harmony export */   ConnectedAdvertiserChip: () => (/* binding */ ConnectedAdvertiserChip),
/* harmony export */   DrawerActionButtons: () => (/* binding */ DrawerActionButtons),
/* harmony export */   DrawerActions: () => (/* binding */ DrawerActions),
/* harmony export */   DrawerContent: () => (/* binding */ DrawerContent),
/* harmony export */   FieldsGrid: () => (/* binding */ FieldsGrid),
/* harmony export */   FieldsWrapper: () => (/* binding */ FieldsWrapper),
/* harmony export */   PageSubtitle: () => (/* binding */ PageSubtitle),
/* harmony export */   PageTitleRow: () => (/* binding */ PageTitleRow),
/* harmony export */   PlatformConnectionCell: () => (/* binding */ PlatformConnectionCell),
/* harmony export */   PlatformConnectionStatus: () => (/* binding */ PlatformConnectionStatus),
/* harmony export */   PlatformDrawerContent: () => (/* binding */ PlatformDrawerContent),
/* harmony export */   PlatformIdInputRow: () => (/* binding */ PlatformIdInputRow),
/* harmony export */   PlatformInformationCard: () => (/* binding */ PlatformInformationCard),
/* harmony export */   TableWrapper: () => (/* binding */ TableWrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const DrawerContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  min-width: 700px;
  gap: 16px;
  margin-bottom: 50px;
`;
const AudiencePlatformChip = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-block;
  padding: 2px 12px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-radius: 999px;
  background-color: ${({ $isAmadeus }) => $isAmadeus ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_40 : '#9240CC'};
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  height: 24px;
  margin-inline-end: 0;
`;
const AudiencePlatformChipRows = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const AudiencePlatformChipRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const AudienceEnabledTag = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid #9240CC;
  border-radius: 999px;
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  color: #9240CC;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`;
const FieldsWrapper = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Grid.Col) `
  display: flex;
  flex-direction: column;
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-radius: 5px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  gap: 16px;
  padding: 16px;
  margin-top: 10px;
`;
const FieldsGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;
const TableWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  padding: 16px;
  border-radius: 5px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  min-height: 0;
`;
const CardHeaderRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
const PageTitleRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 8px 0 16px;
`;
const AdvertiserSectionLayout = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
`;
const AdvertiserSectionNavigation = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].nav `
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-right: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
`;
const AdvertiserSectionTab = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  border: 0;
  border-left: 3px solid ${({ active }) => active ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_80 : 'transparent'};
  border-radius: 4px;
  padding: 10px 12px;
  text-align: left;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  background: transparent;
  font: inherit;
  font-weight: ${({ active }) => active ? 700 : 400};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_20};
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_80};
  }

  &:disabled {
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_50};
    cursor: not-allowed;
  }
`;
const AdvertiserSectionContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 0;
  padding-top: 16px;
`;
const PageSubtitle = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin: 4px 0 20px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  font-size: 16px;
`;
const PlatformDrawerContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0 64px;
`;
const PlatformInformationCard = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 5px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
`;
const DrawerActions = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
const DrawerActionButtons = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;
const PlatformConnectionStatus = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
`;
const PlatformConnectionCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
const PlatformIdInputRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-end;
  gap: 8px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }

  > div:last-child {
    flex: 0 0 auto;
    padding-bottom: 8px;
  }
`;
const ConnectedAdvertiserChip = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 16px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const ActiveFiltersBadge = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Badge)) `
  border: none;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.violet_20};
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Audience/AudienceDetails.tsx"
/*!*************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/AudienceDetails.tsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var antd_es_radio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/radio */ "./node_modules/antd/es/radio/index.js");
/* harmony import */ var antd_es_switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/switch */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var _Audience_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Audience.styled */ "./apps/mediahub-ui/pages/Audience/Audience.styled.tsx");
/* harmony import */ var _mockAudiences__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AudienceBuilder/mockAudienceRules */ "./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts");








function AudienceDetailsPage() {
    const { audienceId } = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useParams)();
    const audience = _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.MOCK_AUDIENCES.find(item => item.id === audienceId);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: 'Audience', href: '/audience' }, { title: audience?.audienceName ?? 'Audience Settings' }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H3, { id: 'audience-details-ttl', children: "Audience Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Audience Information" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { label: 'Advertiser', value: audience?.advertiser ?? '-', disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { label: 'Audience Name', value: audience?.audienceName ?? '-', disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_radio__WEBPACK_IMPORTED_MODULE_3__["default"].Group, { value: audience?.dataType, options: _mockAudiences__WEBPACK_IMPORTED_MODULE_6__.DATA_TYPE_OPTIONS, disabled: true })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Platform Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'audience-details-platforms-tbl', rowKey: 'id', pagination: false, dataSource: audience?.platformAdvertisers ?? [], columns: [
                            { title: 'Enable', key: 'enabled', render: () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_switch__WEBPACK_IMPORTED_MODULE_4__["default"], { defaultChecked: true }) },
                            { title: 'Platform', dataIndex: 'platform', key: 'platform' },
                            { title: 'Advertiser Name', dataIndex: 'advertiserName', key: 'advertiserName' },
                            { title: 'Advertiser ID', dataIndex: 'advertiserId', key: 'advertiserId' },
                            { title: 'Connection', dataIndex: 'connected', key: 'connected', render: (connected) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: connected ? 'checkCircle' : 'timesCircle', color: connected ? '#2e8540' : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60, width: 18, height: 18 }) },
                        ] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Audience Rules" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { mode: 'multiple', value: audience?.audienceRuleIds, options: _AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_7__.MOCK_RULES.map(rule => ({ label: rule.ruleName, value: rule.id })), disabled: true })] })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudienceDetailsPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/Audience/AudienceFormDrawer.tsx"
/*!****************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/AudienceFormDrawer.tsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudienceFormDrawer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/tooltip */ "./node_modules/antd/es/tooltip/index.js");
/* harmony import */ var antd_es_radio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/es/radio */ "./node_modules/antd/es/radio/index.js");
/* harmony import */ var antd_es_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/es/switch */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var _Audience_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Audience.styled */ "./apps/mediahub-ui/pages/Audience/Audience.styled.tsx");
/* harmony import */ var _mockAudiences__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/audienceRuleStore */ "./apps/mediahub-ui/shared/audienceRuleStore.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/advertiserPlatformStore */ "./apps/mediahub-ui/shared/advertiserPlatformStore.ts");
/* harmony import */ var _shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/platformAdvertiserValidation */ "./apps/mediahub-ui/shared/platformAdvertiserValidation.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts");
















const AUDIENCE_ENABLED_PLATFORMS = new Set(['google ads', 'google dv360', 'facebook', 'meta (facebook)', 'amadeus dsp']);
const isAudienceEnabledPlatform = (platform) => AUDIENCE_ENABLED_PLATFORMS.has(platform.platform.trim().toLowerCase());
const AVAILABLE_FILES = [
    { label: 'Hotel Alpha Customer List', value: 'hotel-alpha-customer-list' },
    { label: 'Hotel Alpha Loyalty Members', value: 'hotel-alpha-loyalty-members' },
    { label: 'Hotel Alpha Website Visitors', value: 'hotel-alpha-website-visitors' },
    { label: 'Londoner Loyalty Members', value: 'londoner-loyalty-members' },
    { label: 'Londoner Past Guests (CRM)', value: 'londoner-past-guests-crm' },
    // One first-party loyalty file per demo advertiser (ids match the FILE audiences in mockAudiences.ts).
    ..._shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_10__.DEMO_ADVERTISERS.map(adv => ({ label: `${adv.campaignPrefix} Loyalty Members`, value: `${adv.key}-loyalty-members` })),
];
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
const AUDIENCE_PLATFORM_OPTIONS = PLATFORM_OPTIONS.filter(option => AUDIENCE_ENABLED_PLATFORMS.has(option.value.toLowerCase()));
function AudienceFormDrawer({ open, mode = 'create', initialAudience, advertiserOptions, lockedAdvertiser, onClose, onSave, onDelete, page = false, advertiserBreadcrumb }) {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const [form] = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useForm();
    const [selectedPlatformAdvertiserIds, setSelectedPlatformAdvertiserIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isPlatformDrawerOpen, setIsPlatformDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [addedPlatforms, setAddedPlatforms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [platformForm] = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useForm();
    const selectedRuleIds = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useWatch('audienceRuleIds', form) ?? [];
    const selectedAdvertiser = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useWatch('advertiser', form);
    const selectedDataType = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useWatch('dataType', form);
    const selectedPlatform = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useWatch('platform', platformForm);
    const platformAdvertiserId = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.useWatch('platformAdvertiserId', platformForm);
    const knownPlatformAdvertiser = (0,_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_13__.getKnownPlatformAdvertiser)(selectedPlatform, platformAdvertiserId);
    const initialAdvertiserOption = initialAudience
        ? advertiserOptions.find(option => option.label === initialAudience.advertiser)
        : undefined;
    const effectiveAdvertiser = selectedAdvertiser ?? lockedAdvertiser ?? initialAdvertiserOption?.value;
    const { loading: platformsLoading } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_11__.useGetAdvertiserDetailsQuery)(Number(effectiveAdvertiser));
    const availableRules = (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_9__.getSharedRules)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setAddedPlatforms(effectiveAdvertiser ? (0,_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_12__.getAddedAdvertiserPlatforms)(effectiveAdvertiser) : []);
    }, [effectiveAdvertiser]);
    const dataTypeOptions = _mockAudiences__WEBPACK_IMPORTED_MODULE_8__.DATA_TYPE_OPTIONS.map(option => option.value === 'ADVERTISER'
        ? {
            ...option,
            label: ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { children: [option.label, ' ', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: 'the text here is TBD', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { style: { display: 'inline-flex', cursor: 'help' }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'infoCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, width: 14, height: 14 }) }) })] })),
        }
        : option);
    const mappedPlatforms = effectiveAdvertiser
        ? [
            {
                id: `default-amadeus-dsp-${effectiveAdvertiser}`,
                platform: 'Amadeus DSP',
                advertiserName: advertiserOptions.find(option => option.value === effectiveAdvertiser)?.label.replace(/\s\([^)]*\)$/, '') ?? '-',
                advertiserId: effectiveAdvertiser,
                connected: true,
            },
            ...addedPlatforms.map(platform => {
                const knownAdvertiser = (0,_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_13__.getKnownPlatformAdvertiser)(platform.platform, platform.advertiserId);
                return knownAdvertiser
                    ? { ...platform, advertiserName: knownAdvertiser.name, connected: true }
                    : platform;
            }),
        ]
        : [];
    const audienceEnabledPlatforms = mappedPlatforms.filter(isAudienceEnabledPlatform);
    const audiencePlatformCandidates = [
        ...audienceEnabledPlatforms,
        ...(initialAudience?.platformAdvertisers ?? []).filter(isAudienceEnabledPlatform),
    ];
    const audiencePlatforms = audiencePlatformCandidates.filter((platform, index, platforms) => platforms.findIndex(candidate => candidate.platform.trim().toLowerCase() === platform.platform.trim().toLowerCase()) === index);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (!open)
            return;
        const existingPlatforms = initialAudience?.platformAdvertisers ?? [];
        const existingPlatformNames = new Set(existingPlatforms.map(platform => platform.platform.trim().toLowerCase()));
        const existingPlatformIds = audiencePlatforms
            .filter(platform => existingPlatforms.some(existing => existing.id === platform.id || existingPlatformNames.has(platform.platform.trim().toLowerCase())))
            .map(platform => platform.id);
        const selectedPlatformIds = existingPlatformIds;
        if (initialAudience) {
            form.setFieldsValue({
                advertiser: effectiveAdvertiser,
                audienceName: initialAudience.audienceName,
                dataType: initialAudience.dataType,
                fileId: initialAudience.fileId,
                audienceRuleIds: initialAudience.audienceRuleIds,
                platformAdvertiserIds: selectedPlatformIds,
            });
        }
        else if (lockedAdvertiser && !selectedAdvertiser) {
            form.setFieldsValue({ advertiser: lockedAdvertiser });
        }
        else if (!selectedAdvertiser && !lockedAdvertiser) {
            form.resetFields();
        }
        setSelectedPlatformAdvertiserIds(selectedPlatformIds);
    }, [form, initialAudience, open, effectiveAdvertiser, selectedAdvertiser, lockedAdvertiser]);
    const handleSubmit = (values) => {
        onSave({
            ...values,
            platformAdvertiserIds: selectedPlatformAdvertiserIds,
            platformAdvertisers: audiencePlatforms.filter(platform => selectedPlatformAdvertiserIds.includes(platform.id)),
            audienceRuleIds: values.audienceRuleIds ?? [],
        });
        form.resetFields();
        setSelectedPlatformAdvertiserIds([]);
    };
    const confirmDelete = () => {
        setIsDeleteModalOpen(false);
        onDelete?.();
    };
    const handleAddPlatform = (values) => {
        if (!effectiveAdvertiser)
            return;
        const normalizedId = values.platformAdvertiserId.trim();
        const knownAdvertiser = (0,_shared_platformAdvertiserValidation__WEBPACK_IMPORTED_MODULE_13__.getKnownPlatformAdvertiser)(values.platform, normalizedId);
        const platform = {
            id: `added-${values.platform}-${normalizedId}`,
            platform: values.platform,
            advertiserName: knownAdvertiser?.name ?? advertiserOptions.find(option => option.value === effectiveAdvertiser)?.label.replace(/\s\([^)]*\)$/, '') ?? '-',
            advertiserId: normalizedId,
            connected: Boolean(knownAdvertiser),
        };
        const nextPlatforms = [...(0,_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_12__.getAddedAdvertiserPlatforms)(effectiveAdvertiser).filter(existing => existing.id !== platform.id), platform];
        (0,_shared_advertiserPlatformStore__WEBPACK_IMPORTED_MODULE_12__.setAddedAdvertiserPlatforms)(effectiveAdvertiser, nextPlatforms);
        setAddedPlatforms(nextPlatforms);
        setIsPlatformDrawerOpen(false);
        platformForm.resetFields();
    };
    const formContent = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceDrawerContent, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form, { form: form, layout: 'vertical', onFinish: handleSubmit, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceFormSections, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceSettingsGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceSettingsCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: "General Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'audienceName', rules: [{ required: true }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Input, { id: 'audience-add-name-inp', label: 'Audience Name', required: true }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'advertiser', rules: [{ required: true }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: 'audience-add-advertiser-sel', label: 'Advertiser', options: advertiserOptions, required: true, disabled: Boolean(initialAudience?.advertiser || lockedAdvertiser) }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceSettingsCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: "Data Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { children: ["Data Type ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { status: 'error', children: " *" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'dataType', rules: [{ required: true }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_radio__WEBPACK_IMPORTED_MODULE_5__["default"].Group, { id: 'audience-add-data_type-radio', options: dataTypeOptions }) })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceSettingsCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: selectedDataType === 'FILE' ? 'First party data settings' : 'Audience Rule Settings' }), selectedDataType === 'FILE' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'fileId', required: false, label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { children: ["File name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { status: 'error', children: " *" })] }), rules: [{ required: true, message: 'Please select a file' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: 'audience-add-file-sel', options: AVAILABLE_FILES, placeholder: 'Select a file' }) })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { children: ["Audience Rules ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Label, { status: 'error', children: " *" })] }), availableRules.length === 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { htmlType: 'button', variant: 'outlined', onClick: () => navigate('/audience-builder/new'), children: "Create an Audience Rule" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'audienceRuleIds', rules: [{ required: true, message: 'Please select at least one Audience Rule' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: 'audience-add-rules-sel', mode: 'multiple', options: availableRules.map(rule => ({ label: rule.ruleName, value: rule.id })), required: true }) }), selectedRuleIds.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.SelectedRulesChips, { children: selectedRuleIds.map(ruleId => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Tag, { children: availableRules.find(rule => rule.id === ruleId)?.ruleName ?? ruleId }, ruleId)) })] }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceSettingsCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: "Platform Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { variant: 'outlined', htmlType: 'button', disabled: !effectiveAdvertiser, onClick: () => setIsPlatformDrawerOpen(true), children: "Add Platform" })] }), !effectiveAdvertiser ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Body, { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, fontStyle: 'italic' }, children: "Please select advertiser to see platforms." })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Table, { id: 'audience-add-platforms-tbl', rowKey: 'id', pagination: false, loading: platformsLoading, dataSource: audiencePlatforms, columns: [
                                                { title: 'Enable', key: 'enabled', render: (_, record) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_switch__WEBPACK_IMPORTED_MODULE_6__["default"], { checked: selectedPlatformAdvertiserIds.includes(record.id), onChange: checked => setSelectedPlatformAdvertiserIds(prev => checked ? [...prev, record.id] : prev.filter(id => id !== record.id)) }) },
                                                { title: 'Platform', dataIndex: 'platform', key: 'platform' },
                                                { title: 'Platform Advertiser ID', dataIndex: 'advertiserId', key: 'advertiserId' },
                                                { title: 'Platform Advertiser Name', dataIndex: 'advertiserName', key: 'advertiserName' },
                                                { title: 'Data connection', dataIndex: 'connected', key: 'connected', render: (connected) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: connected ? 'checkCircle' : 'timesCircle', color: connected ? '#2e8540' : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, width: 18, height: 18 }) },
                                            ] }))] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.StickyFooter, { left: page ? '60px' : 'calc(100% - 720px)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceDrawerFooter, { children: [mode === 'edit' && onDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { color: 'danger', variant: 'outlined', htmlType: 'button', onClick: () => setIsDeleteModalOpen(true), children: "Delete Audience" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceDrawerActions, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { htmlType: 'button', variant: 'outlined', onClick: onClose, children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { htmlType: 'submit', children: "Save" })] })] }) })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Drawer, { id: 'audience-platform-drawer', title: 'Add Platform', placement: 'right', width: '480px', open: isPlatformDrawerOpen, onClose: () => { setIsPlatformDrawerOpen(false); platformForm.resetFields(); }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.PlatformDrawerContent, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form, { form: platformForm, layout: 'vertical', onFinish: handleAddPlatform, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.PlatformInformationCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: "Platform Information" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'platform', label: 'Platform Name', rules: [{ required: true, message: 'Please select a platform' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: 'audience-platform_name-sel', options: AUDIENCE_PLATFORM_OPTIONS, placeholder: 'Select a platform' }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.PlatformIdInputRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Form.Item, { name: 'platformAdvertiserId', label: 'Platform Advertiser ID', rules: [{ required: true, message: 'Please enter the Platform Advertiser ID' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Input, { id: 'audience-platform_advertiser_id-inp', placeholder: 'Enter platform advertiser ID' }) }), platformAdvertiserId?.trim() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.PlatformConnectionStatus, { id: 'audience-platform-connection-status', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: knownPlatformAdvertiser ? 'checkCircle' : 'timesCircle', color: knownPlatformAdvertiser ? '#2e8540' : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, width: 18, height: 18 }) }))] }), knownPlatformAdvertiser && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.ConnectedAdvertiserChip, { id: 'audience-platform-connected-chip', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'checkCircle', color: '#2e8540', width: 16, height: 16 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Tag, { children: knownPlatformAdvertiser.name })] }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.StickyFooter, { left: 'calc(100% - 480px)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.DrawerActions, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_14__.DrawerActionButtons, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { htmlType: 'button', variant: 'outlined', onClick: () => { setIsPlatformDrawerOpen(false); platformForm.resetFields(); }, children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { htmlType: 'submit', children: "Save" })] }) }) })] }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Modal, { idPrefix: 'audience-delete-modal', title: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'exclamationTriangle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.pumpkin_60, width: 24, height: 24 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Delete Audience" })] }), open: isDeleteModalOpen, maskStyle: { backgroundColor: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_90 }, okText: 'Delete', onOk: confirmDelete, onCancel: () => setIsDeleteModalOpen(false), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Body, { children: ["Are you sure you want to delete the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: initialAudience?.audienceName }), " Audience? This action cannot be undone."] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.Body, { children: "Would you like to proceed with the Delete?" })] })] }));
    if (page) {
        const breadcrumbItems = advertiserBreadcrumb
            ? [
                { title: 'Home', href: '/' },
                { title: 'Advertiser', href: '/advertisers' },
                { title: 'Advertiser Details', href: advertiserBreadcrumb.href },
                { title: 'Audiences', href: advertiserBreadcrumb.href },
                { title: mode === 'edit' ? 'Audience Settings' : 'New Audience' },
            ]
            : [{ title: 'Home', href: '/' }, { title: 'Audience', href: '/audience' }, { title: mode === 'edit' ? 'Audience Settings' : 'New Audience' }];
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_styled__WEBPACK_IMPORTED_MODULE_7__.AudienceWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: breadcrumbItems }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H3, { children: mode === 'edit' ? 'Audience Settings' : 'New Audience' }), formContent] }));
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Drawer, { id: 'audience-form-drawer', title: mode === 'edit' ? 'Audience Settings' : 'Add Audience', placement: 'right', width: '720px', open: open, onClose: onClose, children: formContent });
}


/***/ },

/***/ "./apps/mediahub-ui/pages/Audience/AudienceFormPage.tsx"
/*!**************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/AudienceFormPage.tsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudienceFormPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _AudienceFormDrawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AudienceFormDrawer */ "./apps/mediahub-ui/pages/Audience/AudienceFormDrawer.tsx");
/* harmony import */ var _mockAudiences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _shared_audienceStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/audienceStore */ "./apps/mediahub-ui/shared/audienceStore.ts");







function AudienceFormPage() {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useLocation)();
    const { audienceId } = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useParams)();
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.useNotification)();
    const { data: advertiserData } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_5__.useGetAdvertiserOptionsQuery)();
    const audiences = (0,_shared_audienceStore__WEBPACK_IMPORTED_MODULE_6__.getSharedAudiences)();
    const audienceRecords = audiences.length > 0 ? audiences : _mockAudiences__WEBPACK_IMPORTED_MODULE_4__.MOCK_AUDIENCES;
    const initialAudience = audienceId ? audienceRecords.find(audience => audience.id === audienceId) : undefined;
    const routeState = location.state;
    const advertiserOptions = (advertiserData?.advertisers?.advertisers ?? []).map(advertiser => ({
        label: `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
        value: String(advertiser.advertiserId),
    }));
    const returnTo = routeState?.returnTo ?? '/audience';
    const advertiserContextOption = advertiserOptions.find(option => option.value === routeState?.advertiserId)
        ?? advertiserOptions.find(option => option.label === initialAudience?.advertiser);
    const advertiserBreadcrumb = advertiserContextOption && returnTo.startsWith('/advertisers/')
        ? { label: advertiserContextOption.label.replace(/\s\([^)]*\)$/, ''), href: returnTo }
        : undefined;
    const handleSave = (values) => {
        const id = initialAudience?.id ?? `aud-${Date.now()}`;
        const advertiserName = advertiserOptions.find(option => option.value === values.advertiser)?.label ?? values.advertiser;
        const selectedPlatforms = values.platformAdvertisers ?? [];
        const nextAudience = {
            id,
            advertiser: advertiserName,
            audienceName: values.audienceName,
            dataType: values.dataType,
            fileId: values.fileId,
            channels: selectedPlatforms.map(platform => platform.platform).join(', ') || 'Not configured',
            audienceSize: initialAudience?.audienceSize ?? 0,
            lastUpload: initialAudience?.lastUpload ?? '-',
            nextUpload: initialAudience?.nextUpload ?? '-',
            platformAdvertisers: selectedPlatforms,
            audienceRuleIds: values.audienceRuleIds ?? [],
        };
        const nextAudiences = initialAudience
            ? audienceRecords.map(audience => audience.id === initialAudience.id ? nextAudience : audience)
            : [nextAudience, ...audienceRecords];
        (0,_shared_audienceStore__WEBPACK_IMPORTED_MODULE_6__.setSharedAudiences)(nextAudiences);
        notification.success(initialAudience ? 'Audience updated successfully.' : 'Audience added successfully.');
        navigate(returnTo);
    };
    const handleDelete = () => {
        if (!initialAudience)
            return;
        (0,_shared_audienceStore__WEBPACK_IMPORTED_MODULE_6__.setSharedAudiences)(audienceRecords.filter(audience => audience.id !== initialAudience.id));
        notification.success('Audience deleted successfully.');
        navigate(returnTo);
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceFormDrawer__WEBPACK_IMPORTED_MODULE_3__["default"], { open: true, page: true, mode: initialAudience ? 'edit' : 'create', initialAudience: initialAudience, advertiserOptions: advertiserOptions, lockedAdvertiser: routeState?.advertiserId, advertiserBreadcrumb: advertiserBreadcrumb, onClose: () => navigate(returnTo), onSave: handleSave, onDelete: handleDelete }));
}


/***/ },

/***/ "./apps/mediahub-ui/pages/Audience/index.ts"
/*!**************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/index.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudienceDetailsPage: () => (/* reexport safe */ _AudienceDetails__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AudienceFormPage: () => (/* reexport safe */ _AudienceFormPage__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "default": () => (/* reexport safe */ _Audience__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Audience__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Audience */ "./apps/mediahub-ui/pages/Audience/Audience.tsx");
/* harmony import */ var _AudienceDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AudienceDetails */ "./apps/mediahub-ui/pages/Audience/AudienceDetails.tsx");
/* harmony import */ var _AudienceFormPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AudienceFormPage */ "./apps/mediahub-ui/pages/Audience/AudienceFormPage.tsx");





/***/ },

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts"
/*!*********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MOCK_RULES: () => (/* binding */ MOCK_RULES),
/* harmony export */   TRAVEL_INTENT_CATEGORY_LABEL: () => (/* binding */ TRAVEL_INTENT_CATEGORY_LABEL),
/* harmony export */   TRAVEL_INTENT_CATEGORY_OPTIONS: () => (/* binding */ TRAVEL_INTENT_CATEGORY_OPTIONS),
/* harmony export */   getMockRule: () => (/* binding */ getMockRule)
/* harmony export */ });
const TRAVEL_INTENT_CATEGORY_OPTIONS = [
    { label: 'Airline', value: 'AIRLINE' },
    { label: 'Hotel', value: 'HOTEL' },
    { label: 'Destination', value: 'DESTINATION' },
    { label: 'Cruise', value: 'CRUISE' },
    { label: 'Train', value: 'TRAIN' },
    { label: 'Car Rental', value: 'CAR_RENTAL' },
    { label: 'Bus', value: 'BUS' },
    { label: 'Package', value: 'PACKAGE' },
    { label: 'All', value: 'ALL' },
    { label: 'Others', value: 'OTHERS' },
];
const TRAVEL_INTENT_CATEGORY_LABEL = Object.fromEntries(TRAVEL_INTENT_CATEGORY_OPTIONS.map(o => [o.value, o.label]));
const MOCK_RULES = [
    { id: 'rule-001', ruleName: 'High-Value Corporate Bookers', travelIntentCategory: 'AIRLINE', usedInAudiences: 4 },
    { id: 'rule-002', ruleName: 'Weekend Getaway Seekers', travelIntentCategory: 'DESTINATION', usedInAudiences: 2 },
    { id: 'rule-003', ruleName: 'Family Suite Browsers', travelIntentCategory: 'HOTEL', usedInAudiences: 3 },
    { id: 'rule-004', ruleName: '5-Star Repeat Guests', travelIntentCategory: 'PACKAGE', usedInAudiences: 1 },
    { id: 'rule-005', ruleName: 'Flash Sale Responders', travelIntentCategory: 'ALL', usedInAudiences: 5 },
    { id: 'rule-006', ruleName: 'Conference & Meeting Planners', travelIntentCategory: 'TRAIN', usedInAudiences: 2 },
    { id: 'rule-007', ruleName: 'Frequent Business Extenders', travelIntentCategory: 'CAR_RENTAL', usedInAudiences: 0 },
    { id: 'rule-008', ruleName: 'Beach Resort Explorers', travelIntentCategory: 'CRUISE', usedInAudiences: 6 },
    // The Londoner Hotel rules. usedInAudiences matches the Londoner audiences (aud-ln001..007) that reference them.
    {
        id: 'rule-009',
        ruleName: 'London Weekend Breakers',
        travelIntentCategory: 'DESTINATION',
        usedInAudiences: 2, // aud-ln001, aud-ln003
        criteriaRows: [
            { id: 'rule-009-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
            { id: 'rule-009-c2', type: 'DESTINATION', values: ['LONDON'] },
            { id: 'rule-009-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 3 },
        ],
    },
    {
        id: 'rule-010',
        ruleName: 'Business Travellers - Central London',
        travelIntentCategory: 'HOTEL',
        usedInAudiences: 1, // aud-ln005
        criteriaRows: [
            { id: 'rule-010-c1', type: 'DESTINATION', values: ['LONDON'] },
            { id: 'rule-010-c2', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'VISITED'] },
            { id: 'rule-010-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'EQ', numberValue: 1 },
        ],
    },
    {
        id: 'rule-011',
        ruleName: 'US & Gulf Luxury Long-Haul Visitors',
        travelIntentCategory: 'ALL',
        usedInAudiences: 1, // aud-ln004
        criteriaRows: [
            { id: 'rule-011-c1', type: 'ORIGIN', values: ['UNITED_STATES', 'UNITED_ARAB_EMIRATES', 'SAUDI_ARABIA', 'QATAR'] },
            { id: 'rule-011-c2', type: 'DESTINATION', values: ['LONDON'] },
            { id: 'rule-011-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 4 },
        ],
    },
    {
        id: 'rule-012',
        ruleName: 'Abandoned Booking Re-engagers',
        travelIntentCategory: 'HOTEL',
        usedInAudiences: 1, // aud-ln002
        criteriaRows: [{ id: 'rule-012-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['ABANDONED_CARTS'] }],
    },
    {
        id: 'rule-013',
        ruleName: 'Afternoon Tea & Theatre Package Seekers',
        travelIntentCategory: 'PACKAGE',
        usedInAudiences: 1, // aud-ln003
        criteriaRows: [
            { id: 'rule-013-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
            { id: 'rule-013-c2', type: 'DESTINATION', values: ['LONDON'] },
            { id: 'rule-013-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 2 },
        ],
    },
    // Reusable hotel rules shared by the 10 demo advertisers (see generated audiences in
    // pages/Audience/mockAudiences.ts, ids aud-<key>-NN). usedInAudiences = number of those audiences
    // that reference the rule (10 advertisers; 4/5/6 audiences each by index -> 10 / 6 / 3 per template).
    {
        id: 'rule-014',
        ruleName: 'Resort & Spa Leisure Seekers',
        travelIntentCategory: 'HOTEL',
        usedInAudiences: 10, // "<short> website visitors 30d" x10
        criteriaRows: [
            { id: 'rule-014-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'VISITED'] },
            { id: 'rule-014-c2', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 3 },
            { id: 'rule-014-c3', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 2 },
        ],
    },
    {
        id: 'rule-015',
        ruleName: 'Long-Haul Trans-Pacific Visitors',
        travelIntentCategory: 'ALL',
        usedInAudiences: 10, // "Long-haul visitors to <market>" x10
        criteriaRows: [
            { id: 'rule-015-c1', type: 'ORIGIN', values: ['AUSTRALIA', 'JAPAN', 'SOUTH_KOREA', 'SINGAPORE'] },
            { id: 'rule-015-c2', type: 'ORIGIN', values: ['CANADA', 'UNITED_STATES'] },
            { id: 'rule-015-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 5 },
        ],
    },
    {
        id: 'rule-016',
        ruleName: 'City Break Weekenders',
        travelIntentCategory: 'DESTINATION',
        usedInAudiences: 10, // "<market> weekend breakers" x10
        criteriaRows: [
            { id: 'rule-016-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED'] },
            { id: 'rule-016-c2', type: 'DESTINATION', values: ['NEW_YORK', 'BARCELONA', 'SYDNEY', 'MELBOURNE'] },
            { id: 'rule-016-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 3 },
        ],
    },
    {
        id: 'rule-017',
        ruleName: 'Business & Conference Travellers',
        travelIntentCategory: 'HOTEL',
        usedInAudiences: 6, // "Business & conference travellers - <market>" on advertisers with 5+ audiences
        criteriaRows: [
            { id: 'rule-017-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'BOOKED'] },
            { id: 'rule-017-c2', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'EQ', numberValue: 1 },
            { id: 'rule-017-c3', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 4 },
        ],
    },
    {
        id: 'rule-018',
        ruleName: 'Family Holiday Planners',
        travelIntentCategory: 'PACKAGE',
        usedInAudiences: 3, // "<short> family holiday planners" on advertisers with 6 audiences
        criteriaRows: [
            { id: 'rule-018-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['SEARCHED', 'ABANDONED_CARTS'] },
            { id: 'rule-018-c2', type: 'NUMBER_OF_PASSENGERS', values: [], operator: 'GTE', numberValue: 3 },
            { id: 'rule-018-c3', type: 'DURATION_OF_STAY', values: [], operator: 'GTE', numberValue: 5 },
        ],
    },
    {
        id: 'rule-019',
        ruleName: 'Last-Minute Deal Seekers',
        travelIntentCategory: 'ALL',
        usedInAudiences: 3, // the same 3 "family holiday planners" audiences (they carry rule-018 + rule-019)
        criteriaRows: [
            { id: 'rule-019-c1', type: 'ENGAGEMENT_ACTIVITY', values: ['VISITED', 'ABANDONED_CARTS'] },
            { id: 'rule-019-c2', type: 'DURATION_OF_STAY', values: [], operator: 'LTE', numberValue: 2 },
        ],
    },
];
function getMockRule(ruleId) {
    if (!ruleId)
        return undefined;
    return MOCK_RULES.find(rule => rule.id === ruleId);
}


/***/ },

/***/ "./apps/mediahub-ui/shared/audienceRuleStore.ts"
/*!******************************************************!*\
  !*** ./apps/mediahub-ui/shared/audienceRuleStore.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSharedRules: () => (/* binding */ getSharedRules),
/* harmony export */   setSharedRules: () => (/* binding */ setSharedRules)
/* harmony export */ });
/* harmony import */ var _pages_AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/AudienceBuilder/mockAudienceRules */ "./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts");

const STORAGE_KEY = 'mediahub.audience-rules';
let rules = [];
let seedMerged = false;
/** Ids of seed (MOCK_RULES) entries already offered to this session, so deleted ones never come back. */
const SEEDED_IDS_KEY = 'mediahub.audience-rules.seeded-ids';
/**
 * Merge-safe seeding: appends seed rules whose id has never been offered to this session and is not
 * already present. Never overwrites or duplicates user-created/edited rules; deleted seeds stay deleted.
 * Runs once per module load.
 */
function mergeNewSeeds() {
    if (seedMerged)
        return;
    seedMerged = true;
    let seededIds = [];
    try {
        seededIds = JSON.parse(sessionStorage.getItem(SEEDED_IDS_KEY) ?? '[]');
    }
    catch {
        seededIds = [];
    }
    const known = new Set([...seededIds, ...rules.map(rule => rule.id)]);
    const missing = _pages_AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_0__.MOCK_RULES.filter(seed => !known.has(seed.id));
    if (missing.length > 0) {
        rules = [...rules, ...missing.map(rule => ({ ...rule }))];
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    }
    sessionStorage.setItem(SEEDED_IDS_KEY, JSON.stringify([...new Set([...seededIds, ..._pages_AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_0__.MOCK_RULES.map(seed => seed.id)])]));
}
function hydrate() {
    if (typeof sessionStorage === 'undefined')
        return;
    if (rules.length === 0) {
        try {
            rules = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') ?? _pages_AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_0__.MOCK_RULES.map(rule => ({ ...rule }));
            // A fresh session is seeded with every MOCK_RULES entry, so they are all "already offered".
        }
        catch {
            rules = _pages_AudienceBuilder_mockAudienceRules__WEBPACK_IMPORTED_MODULE_0__.MOCK_RULES.map(rule => ({ ...rule }));
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }
    mergeNewSeeds();
}
function getSharedRules() {
    hydrate();
    return rules.map(rule => ({ ...rule }));
}
function setSharedRules(nextRules) {
    // Record seed ids as offered first, so seeds missing from `nextRules` (deleted) are not re-added later.
    if (typeof sessionStorage !== 'undefined' && !seedMerged)
        hydrate();
    rules = nextRules.map(rule => ({ ...rule }));
    if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
}


/***/ }

}]);
//# sourceMappingURL=audience.3a8cf9e2ee7c296d4e99.js.map