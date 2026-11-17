"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_pages_CampaignMapping_UnmappedCampaigns_tsx"],{

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

/***/ "./apps/mediahub-ui/components/CampaignFlow/londonerCampaignSummary.ts"
/*!*****************************************************************************!*\
  !*** ./apps/mediahub-ui/components/CampaignFlow/londonerCampaignSummary.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildLondonerCampaignSummary: () => (/* binding */ buildLondonerCampaignSummary)
/* harmony export */ });
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _campaignFlowData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./campaignFlowData */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowData.ts");
/* harmony import */ var _campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./campaignFlowLogic */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowLogic.ts");



const AMOUNT = (raw) => (raw.trim() ? `£${Number(raw).toFixed(2)}` : '—');
const buildLondonerCampaignSummary = ({ platformId, tactic }) => {
    const data = (0,_campaignFlowData__WEBPACK_IMPORTED_MODULE_1__.buildAdvertiserFlowData)(_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name, _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid);
    const platform = (0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__.normalizePlatforms)(data).find(entry => entry.id === platformId);
    const plan = (0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__.resolveMediaPlan)('2027', data);
    const budget = plan.mediaPlanTable.groups
        .flatMap(group => group.items)
        .find(item => item.tactic === tactic && item.platforms.includes(platformId))?.budget ?? '—';
    const languages = (0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__.languageTabsFor)(platform.targeting.location.split(';').map(location => location.trim()), [], data)
        .map(language => language.label)
        .join(', ');
    const basicInfo = [
        { label: 'Media plan', value: plan.mediaPlanName },
        { label: 'Objective', value: data.basicInfo.objective },
        { label: 'Campaign type', value: data.basicInfo.campaignType },
        { label: 'Flight', value: `${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__.formatDisplayDate)(plan.startDate)} → ${(0,_campaignFlowLogic__WEBPACK_IMPORTED_MODULE_2__.formatDisplayDate)(plan.endDate)}` },
        { label: 'Budget', value: budget },
        { label: 'Campaign split', value: 'Tactic' },
        { label: 'Second-level split', value: 'None' },
    ];
    const budgetStrategy = [
        { label: 'Budget & pacing', value: platform.bidding.budgetPacing },
        { label: 'Bid strategy', value: platform.bidding.bidStrategy },
        { label: 'Optimization event', value: platform.bidding.optimizationEvent },
        { label: 'Target CPA / cost per result', value: AMOUNT(platform.bidding.targetCpa) },
        { label: 'Target ROAS', value: platform.bidding.targetRoas || '—' },
        { label: 'Max CPC / bid cap', value: AMOUNT(platform.bidding.maxCpc) },
        { label: 'Value rules / conversion value', value: platform.bidding.valueRules || '—' },
    ];
    const targeting = [
        { label: 'Locations', value: platform.targeting.location },
        { label: 'Audiences', value: platform.targeting.audience },
        { label: 'Creative languages', value: languages },
        { label: 'Placements', value: platform.targeting.placements },
    ];
    if (platformId === 'google-ads') {
        const searchAd = platform.creative.searchAd;
        const fr = data.localizedCreative['google-ads']?.fr;
        const isBrand = tactic === 'Brand';
        const matchType = isBrand ? data.defaultBrandMatchType : data.defaultGenericMatchType;
        const negativeMatchType = data.defaultNegativeMatchType ?? data.defaultGenericMatchType;
        const frLinks = searchAd?.localizedSitelinks?.fr ?? [];
        return {
            platformName: platform.name,
            basicInfo,
            budgetStrategy,
            targeting,
            keywords: {
                tactic,
                matchType,
                keywords: (isBrand ? data.keywords.brand : data.keywords.generic).map(keyword => ({ keyword, matchType })),
                negative: data.keywords.negative.map(keyword => ({ keyword, matchType: negativeMatchType })),
            },
            creatives: {
                fields: [
                    { label: 'Ad format', value: platform.creative.adFormat },
                    { label: 'Display URL', value: searchAd?.displayUrl ?? '—' },
                    { label: 'Destination / landing page', value: platform.creative.destination },
                    { label: 'Tracking parameters', value: platform.creative.tracking },
                ],
                copy: [
                    { field: 'Headline', english: platform.creative.headline, french: fr?.headline ?? '—' },
                    { field: 'Description', english: platform.creative.description, french: fr?.description ?? '—' },
                ],
                sitelinks: (searchAd?.sitelinks ?? []).map((link, index) => ({
                    n: index + 1,
                    titleEn: link.title,
                    descriptionEn: link.description,
                    titleFr: frLinks[index]?.title ?? '—',
                    descriptionFr: frLinks[index]?.description ?? '—',
                })),
            },
        };
    }
    const isProspecting = tactic === 'Prospecting';
    return {
        platformName: platform.name,
        basicInfo,
        budgetStrategy,
        targeting: [
            ...targeting.slice(0, 2),
            {
                label: 'Audience strategy',
                value: isProspecting
                    ? 'Prospecting: new travellers in France interested in London stays'
                    : 'Remarketing: website visitors, abandoned bookings and past guests',
            },
            ...targeting.slice(2),
        ],
        creatives: {
            fields: [
                { label: 'Ad format', value: 'HTML5 display banners' },
                { label: 'Destination / landing page', value: platform.creative.destination },
                { label: 'Tracking parameters', value: platform.creative.tracking },
            ],
            banners: platform.creative.banners ?? [],
        },
    };
};


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.styled.ts"
/*!********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.styled.ts ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BannerCell: () => (/* binding */ BannerCell),
/* harmony export */   Note: () => (/* binding */ Note),
/* harmony export */   Panel: () => (/* binding */ Panel),
/* harmony export */   SummaryLayout: () => (/* binding */ SummaryLayout),
/* harmony export */   TableBlock: () => (/* binding */ TableBlock)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts");



// Space between the drawer title and the tabs/content below it.
const SummaryLayout = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_2__.AdvertiserSectionLayout)) `
  padding-top: 24px;
`;
const Panel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;
const TableBlock = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Note = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].p `
  margin: 0;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  font-size: 13px;
  font-style: italic;
`;
const BannerCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  width: 140px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.tsx"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.tsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampaignSummaryDrawer: () => (/* binding */ CampaignSummaryDrawer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled */ "./apps/advertisers-ui/pages/Advertisers/AdvertiserDetails/AdvertiserDetails.styled.ts");
/* harmony import */ var _components_CampaignFlow_londonerCampaignSummary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/CampaignFlow/londonerCampaignSummary */ "./apps/mediahub-ui/components/CampaignFlow/londonerCampaignSummary.ts");
/* harmony import */ var _components_CampaignCreationCanvas_CampaignAdPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/CampaignCreationCanvas/CampaignAdPreview */ "./apps/mediahub-ui/components/CampaignCreationCanvas/CampaignAdPreview.tsx");
/* harmony import */ var _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CampaignSummaryDrawer.styled */ "./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.styled.ts");








const TAB_LABELS = {
    basic: 'Basic info',
    budget: 'Budget strategy',
    targeting: 'Targeting',
    keywords: 'Keywords',
    creatives: 'Creatives',
};
const STATUS_LABEL = { live: 'Live', pause: 'Paused', unknown: 'Unknown' };
const KEY_VALUE_COLUMNS = [
    { title: 'Setting', dataIndex: 'label', key: 'label', width: '32%' },
    { title: 'Value', dataIndex: 'value', key: 'value', render: (value) => value || '—' },
];
/** Setting / Value table (ATAP table) for a list of fields. */
const KeyValueTable = ({ id, fields }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: id, cellsIdPrefix: id, rowKey: 'label', columns: KEY_VALUE_COLUMNS, dataSource: fields, pagination: false }));
const PAGED = { pageSize: 10, hideOnSinglePage: true, size: 'small' };
/**
 * Read-only summary of a campaign, opened from the campaign name in Campaign Setup. Vertical tabs follow the
 * campaign creation canvas (Basic info · Budget strategy · Targeting · Keywords · Creatives) and every
 * section is an ATAP table. Settings beyond Basic info exist for the campaigns created with Max (they carry
 * a `maxCampaign` reference); for other campaigns only the basic facts are known.
 */
const CampaignSummaryDrawer = ({ campaign, onClose }) => {
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('basic');
    const summary = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (campaign?.maxCampaign ? (0,_components_CampaignFlow_londonerCampaignSummary__WEBPACK_IMPORTED_MODULE_4__.buildLondonerCampaignSummary)(campaign.maxCampaign) : null), [campaign]);
    // Start on Basic info for each campaign.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => setActiveTab('basic'), [campaign?.id]);
    const tabs = summary
        ? ['basic', 'budget', 'targeting', ...(summary.keywords ? ['keywords'] : []), 'creatives']
        : ['basic'];
    const renderBasic = (current) => {
        const mapping = [
            { label: 'Advertiser mapping', state: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_6__.isMultipleAdvertisers)(current) ? 'unmapped' : current.advertiserMapping },
            { label: 'Campaign mapping', state: current.campaignMapping },
            { label: 'Offers mapping', state: current.offersMapping },
            { label: 'Invoice mapping', state: current.invoiceMapping },
            { label: 'OBA mapping', state: current.obaMapping ?? 'unmapped' },
        ];
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.Panel, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KeyValueTable, { id: 'campaign-summary-basic', fields: [
                        { label: 'Campaign name', value: current.externalCampaignName },
                        { label: 'Campaign ID', value: current.externalCampaignId },
                        { label: 'Platform', value: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_6__.platformLabel)(current.platform) },
                        {
                            label: 'Reporting platform',
                            value: current.reportingPlatform || (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_6__.reportingPlatformForPlatform)(current.platform) || '—',
                        },
                        {
                            label: 'Platform advertiser',
                            value: `${current.externalAdvertiserName} (${current.externalAdvertiserId})`,
                        },
                        {
                            label: 'Advertiser',
                            value: current.advertiserBid ? `${current.advertiserName} (${current.advertiserBid})` : 'Not mapped',
                        },
                        { label: 'Campaign status', value: STATUS_LABEL[(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_6__.campaignStatusOf)(current)] },
                        ...(summary?.basicInfo ?? []),
                    ] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Mapping" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-mapping', cellsIdPrefix: 'campaign-summary-mapping', rowKey: 'label', pagination: false, dataSource: mapping, columns: [
                        { title: 'Mapping', dataIndex: 'label', key: 'label', width: '32%' },
                        {
                            title: 'Status',
                            dataIndex: 'state',
                            key: 'state',
                            render: (state) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Tag, { status: state === 'mapped' ? 'success' : 'error', children: state === 'mapped' ? 'Mapped' : 'Unmapped' })),
                        },
                    ] }), !summary ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.Note, { children: "Budget, targeting, keyword and creative settings are shown for campaigns created with Amadeus Max. This campaign was not created there." })) : null] }));
    };
    const renderKeywords = (keywords) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.Panel, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.TableBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: [keywords.tactic, " keywords (", keywords.keywords.length, ")"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-keywords', cellsIdPrefix: 'campaign-summary-keywords', rowKey: 'keyword', pagination: PAGED, dataSource: keywords.keywords, columns: [
                            { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
                            { title: 'Match type', dataIndex: 'matchType', key: 'matchType', width: '25%' },
                        ] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.TableBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: ["Negative keywords (", keywords.negative.length, ")"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-negative-keywords', cellsIdPrefix: 'campaign-summary-negative-keywords', rowKey: 'keyword', pagination: PAGED, dataSource: keywords.negative, columns: [
                            { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
                            { title: 'Match type', dataIndex: 'matchType', key: 'matchType', width: '25%' },
                        ] })] })] }));
    const renderCreatives = (creatives) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.Panel, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KeyValueTable, { id: 'campaign-summary-creatives', fields: creatives.fields }), creatives.copy ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.TableBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Ad copy" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-copy', cellsIdPrefix: 'campaign-summary-copy', rowKey: 'field', pagination: false, dataSource: creatives.copy, columns: [
                            { title: 'Field', dataIndex: 'field', key: 'field', width: '16%' },
                            { title: 'English', dataIndex: 'english', key: 'english' },
                            { title: 'French', dataIndex: 'french', key: 'french' },
                        ] })] })) : null, creatives.sitelinks && creatives.sitelinks.length > 0 ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.TableBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "Sitelinks" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-sitelinks', cellsIdPrefix: 'campaign-summary-sitelinks', rowKey: 'n', pagination: false, dataSource: creatives.sitelinks, columns: [
                            { title: '#', dataIndex: 'n', key: 'n', width: '5%' },
                            { title: 'Title (English)', dataIndex: 'titleEn', key: 'titleEn' },
                            { title: 'Description (English)', dataIndex: 'descriptionEn', key: 'descriptionEn' },
                            { title: 'Title (French)', dataIndex: 'titleFr', key: 'titleFr' },
                            { title: 'Description (French)', dataIndex: 'descriptionFr', key: 'descriptionFr' },
                        ] })] })) : null, creatives.banners && creatives.banners.length > 0 ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.TableBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: ["HTML5 banners (", creatives.banners.length, ")"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'campaign-summary-banners', cellsIdPrefix: 'campaign-summary-banners', rowKey: 'id', pagination: false, dataSource: creatives.banners, columns: [
                            { title: 'Size', dataIndex: 'size', key: 'size', width: '16%' },
                            {
                                title: 'Preview',
                                key: 'preview',
                                render: (_, banner) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.BannerCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CampaignCreationCanvas_CampaignAdPreview__WEBPACK_IMPORTED_MODULE_5__.ScaledBanner, { banner: banner, boxHeight: 72 }) })),
                            },
                            { title: 'File', dataIndex: 'path', key: 'path' },
                        ] })] })) : null] }));
    const renderTab = (current) => {
        if (!summary || activeTab === 'basic')
            return renderBasic(current);
        switch (activeTab) {
            case 'budget':
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KeyValueTable, { id: 'campaign-summary-budget', fields: summary.budgetStrategy });
            case 'targeting':
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KeyValueTable, { id: 'campaign-summary-targeting', fields: summary.targeting });
            case 'keywords':
                return summary.keywords ? renderKeywords(summary.keywords) : renderBasic(current);
            case 'creatives':
                return renderCreatives(summary.creatives);
            default:
                return renderBasic(current);
        }
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { id: 'campaign-summary-drawer', title: campaign?.externalCampaignName ?? 'Campaign', placement: 'right', width: 'min(1100px, 92vw)', open: Boolean(campaign), onClose: onClose, children: campaign ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CampaignSummaryDrawer_styled__WEBPACK_IMPORTED_MODULE_7__.SummaryLayout, { "data-testid": 'campaign-summary-drawer', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_3__.AdvertiserSectionNavigation, { "aria-label": 'Campaign summary sections', children: tabs.map(tab => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_3__.AdvertiserSectionTab, { type: 'button', id: `campaign-summary-tab-${tab}`, active: activeTab === tab, onClick: () => setActiveTab(tab), children: TAB_LABELS[tab] }, tab))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_advertisers_ui_pages_Advertisers_AdvertiserDetails_AdvertiserDetails_styled__WEBPACK_IMPORTED_MODULE_3__.AdvertiserSectionContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'campaign-summary-title', children: [TAB_LABELS[activeTab], summary && activeTab !== 'basic' ? ` · ${summary.platformName}` : ''] }), renderTab(campaign)] })] })) : null }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CampaignSummaryDrawer);


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.styled.tsx"
/*!*****************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.styled.tsx ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampaignNameCell: () => (/* binding */ CampaignNameCell),
/* harmony export */   CampaignNameLink: () => (/* binding */ CampaignNameLink),
/* harmony export */   EntityChip: () => (/* binding */ EntityChip),
/* harmony export */   MultiAdvertiser: () => (/* binding */ MultiAdvertiser),
/* harmony export */   PlatformChip: () => (/* binding */ PlatformChip),
/* harmony export */   RunStatusDot: () => (/* binding */ RunStatusDot),
/* harmony export */   StatusIconButton: () => (/* binding */ StatusIconButton),
/* harmony export */   StatusIconDisabled: () => (/* binding */ StatusIconDisabled),
/* harmony export */   SubText: () => (/* binding */ SubText),
/* harmony export */   TwoLineCell: () => (/* binding */ TwoLineCell),
/* harmony export */   UnmappedCampaignsWrapper: () => (/* binding */ UnmappedCampaignsWrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const UnmappedCampaignsWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;

  /* Facebook Ad Set sub-rows (antd tree level 1) get a soft tint vs campaign rows. */
  .amadeus-table-tbody tr.amadeus-table-row-level-1 > td {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_10} !important;
  }
  .amadeus-table-tbody tr.amadeus-table-row-level-1:hover > td {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_20} !important;
  }

  /* Ignored unmapped-advertiser campaigns: greyed + dimmed until un-ignored. */
  .mh-ignored-row > td {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_10} !important;
    opacity: 0.55;
  }
  .mh-ignored-row:hover > td {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20} !important;
  }

  /* Keep the first column (Platform) on one line so the tree caret + the platform chip don't
     stack vertically on Facebook (expandable) rows. */
  .amadeus-table-tbody > tr > td:first-of-type {
    white-space: nowrap;
  }
`;
const TwoLineCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  line-height: 18px;
`;
const SubText = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  font-size: 12px;
`;
// A small campaign run-status dot shown before the External Campaign name.
const RunStatusDot = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-top: 4px;
`;
// Row for [dot] + the two-line campaign name cell.
const CampaignNameCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`;
// Clickable mapping-status icon. Looks like a plain icon but is a real button
// so users who don't realise the icon is interactive still get hover/focus affordance.
const StatusIconButton = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_20};
  }

  &:focus-visible {
    outline: 2px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
    outline-offset: 1px;
  }
`;
// Non-interactive status icon (grey X) — used when a mapping type is not available / gated.
const StatusIconDisabled = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: not-allowed;
`;
// External advertiser mapped to many ATAP advertisers (many:many) — shown italic/grey.
const MultiAdvertiser = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-style: italic;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
// Platform cell rendered as a SOLID chip; color varies per platform (bg/fg passed in).
const PlatformChip = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 14px;
  line-height: 1.4;
  background: ${({ bg }) => bg};
  color: ${({ fg }) => fg};
  white-space: nowrap;
`;
// Mapping Entity cell rendered as an OUTLINE chip; color matches its row's platform chip.
const EntityChip = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 14px;
  line-height: 1.4;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  color: ${({ chipColor }) => chipColor};
  border: 1px solid ${({ chipColor }) => chipColor};
  white-space: nowrap;
`;
// Campaign name in the table: a link that opens the campaign summary drawer.
const CampaignNameLink = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: block;
  max-width: 100%;
  padding: 0;
  overflow: hidden;
  border: none;
  background: transparent;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
  cursor: pointer;
  font: inherit;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.tsx"
/*!**********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.tsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvertiserCampaignsTable: () => (/* binding */ AdvertiserCampaignsTable),
/* harmony export */   AllCampaignsPage: () => (/* binding */ AllCampaignsPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/tooltip */ "./node_modules/antd/es/tooltip/index.js");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner */ "./apps/mediahub-ui/components/TableWithFilters/TableWithFilterBanner.tsx");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/CampaignFlow/campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var _CampaignSummaryDrawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CampaignSummaryDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/CampaignSummaryDrawer.tsx");
/* harmony import */ var _MappingDrawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MappingDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.tsx");
/* harmony import */ var _mockData_campaigns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mockData/campaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts");
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _OffersDrawer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./OffersDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.tsx");
/* harmony import */ var _UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./UnmappedCampaigns.styled */ "./apps/mediahub-ui/pages/CampaignMapping/UnmappedCampaigns.styled.tsx");















function asArray(value) {
    if (Array.isArray(value))
        return value;
    if (typeof value === 'string' && value.length > 0)
        return [value];
    return [];
}
function UnmappedCampaignsPage({ mode = 'unmapped', advertiserBid } = {}) {
    // Read-only role (not admin/standard): view-only — mapping controls are disabled (UX-1.4).
    const { isAdmin, isStandard } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_6__.useAuth)();
    const isReadOnly = !(isAdmin || isStandard);
    const scoped = !!advertiserBid;
    // Campaign whose summary drawer is open (opened from the campaign name in the table).
    const [summaryCampaign, setSummaryCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
    // Scoping to an advertiser implies the combined (mapped + unmapped) view.
    const isAll = mode === 'all' || scoped;
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Prototype-local campaign list so a mapping Save can mutate a row and move it between scopes.
    // In 'all' mode, also fold in the mapped campaigns (rendered in this table's shape).
    // When scoped to an advertiser, keep only that advertiser's rows: a row whose resolved BPID is
    // this advertiser, OR a multi-advertiser candidate row that lists this BPID (shown as a
    // 'Multiple Advertisers' warning until resolved).
    const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
        const base = isAll ? [..._mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.unmappedCampaigns, ...(0,_mockData_campaigns__WEBPACK_IMPORTED_MODULE_11__.mappedAsUnmappedRows)()] : _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.unmappedCampaigns;
        if (!advertiserBid)
            return base;
        return base.filter(c => c.advertiserBid === advertiserBid || (c.candidateBpids?.includes(advertiserBid) ?? false));
    });
    // The full filtered set the table currently shows (pre-pagination). The chart summary reflects
    // THIS, so the charts always match the table below (scope + all filters applied).
    const [displayedRows, setDisplayedRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [drawerOpen, setDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [activeType, setActiveType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeCampaign, setActiveCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [offersOpen, setOffersOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [offersCampaign, setOffersCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const openMapping = (campaign, type) => {
        if (type === 'offers') {
            setOffersCampaign(campaign);
            setOffersOpen(true);
            return;
        }
        setActiveCampaign(campaign);
        setActiveType(type);
        setDrawerOpen(true);
    };
    const closeOffers = () => {
        setOffersOpen(false);
        setOffersCampaign(null);
    };
    const closeMapping = () => {
        setDrawerOpen(false);
        setActiveType(null);
        setActiveCampaign(null);
    };
    // Toggle 'ignore' on an unmapped-advertiser campaign (prototype-local). Ignored rows are greyed
    // and their mapping is disabled; the user must un-ignore before mapping.
    const toggleIgnore = (campaign) => {
        setRows(prev => prev.map(r => (r.id === campaign.id ? { ...r, ignored: !r.ignored } : r)));
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    // Apply a mapping Save to the prototype-local rows, then refetch so the row moves scope.
    const handleMappingSave = (result) => {
        setRows(prev => prev.map(r => {
            if (r.id !== result.campaignId)
                return r;
            if (result.mappingType === 'advertiser') {
                const bpid = result.bpid;
                if (!bpid)
                    return r;
                return {
                    ...r,
                    advertiserBid: bpid,
                    advertiserName: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.advertiserNameForBpid)(bpid),
                    advertiserMapping: 'mapped',
                    // Resolving a multi-advertiser row to one candidate clears the many:many state.
                    candidateBpids: undefined,
                    // Followed advertiser -> appears in My + All; otherwise All only.
                    isFollowed: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isFollowedBpid)(bpid),
                };
            }
            if (result.mappingType === 'campaign') {
                // If a BPID was picked (multi-advertiser row), resolve the row to that single advertiser
                // so the table shows the picked advertiser instead of 'Multiple Advertisers'.
                if (result.bpid) {
                    return {
                        ...r,
                        campaignMapping: 'mapped',
                        advertiserBid: result.bpid,
                        advertiserName: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.advertiserNameForBpid)(result.bpid),
                        candidateBpids: undefined,
                        isFollowed: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isFollowedBpid)(result.bpid),
                    };
                }
                return { ...r, campaignMapping: 'mapped' };
            }
            if (result.mappingType === 'invoice')
                return { ...r, invoiceMapping: 'mapped' };
            if (result.mappingType === 'offers')
                return { ...r, offersMapping: 'mapped' };
            if (result.mappingType === 'oba')
                return { ...r, obaMapping: 'mapped' };
            return r;
        }));
        closeMapping();
        // Let state settle, then re-run the table query so the saved row leaves/moves scope.
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    // Why a mapping type may be unavailable. Returns:
    //  - { kind: 'unavailable' } — permanently N/A (e.g. offers on WIHP/DerbySoft) → ban glyph.
    //  - { kind: 'gated' }       — a prerequisite isn't done yet → grey X, becomes actionable later.
    //  - null                    — available to map/edit.
    const disabledInfo = (campaign, type) => {
        if (type === 'campaign' &&
            campaign.advertiserMapping !== 'mapped' &&
            !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(campaign)) {
            return { reason: 'Advertiser mapping is needed first', kind: 'gated' };
        }
        if (type === 'offers') {
            if (!(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(campaign.platform)) {
                return { reason: 'Offer mapping does not exist for this platform', kind: 'unavailable' };
            }
            if (campaign.campaignMapping !== 'mapped') {
                return { reason: 'Campaign mapping is needed first', kind: 'gated' };
            }
        }
        return null;
    };
    // A status icon:
    //  - green check   = mapped
    //  - red X         = unmapped but available (actionable)
    //  - grey X        = gated (prerequisite pending) — non-clickable
    //  - grey ban (⊘)  = not applicable for this platform — non-clickable, visually distinct
    const renderMappingCell = (campaign, type, state) => {
        const label = _MappingDrawer__WEBPACK_IMPORTED_MODULE_10__.mappingTypeLabels[type];
        // Facebook hierarchy: Advertiser is a CAMPAIGN-LEVEL mapping (it never varies per Ad Set).
        //  - On an Ad Set child row -> N/A (ban icon), like OBA.
        //  - On the Campaign parent row -> a normal actionable Advertiser cell (falls through below).
        if (type === 'advertiser' && campaign.rowLevel === 'adset') {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: 'Advertiser Mapping: handled at the campaign level', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": 'Advertiser Mapping: not applicable at Ad Set level', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'banSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, width: 18, height: 18 }) }) }));
        }
        // Facebook campaign-level PARENT: Campaign/Offers/Invoice are a read-only roll-up of the Ad Set
        // children (mapped only if ALL children mapped). Shown as a DISABLED grey tick/cross; the
        // actionable mapping happens on the expanded Ad Set (child) rows. (Advertiser is excluded — it
        // is mapped directly on the parent.)
        if ((0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.hasAdSetChildren)(campaign) && type !== 'advertiser') {
            const key = `${type}Mapping`;
            const rolled = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.rollupMapping)(campaign, key);
            const rMapped = rolled === 'mapped';
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `${label}: ${rMapped ? 'All Ad Sets mapped' : 'Some Ad Sets unmapped'} — expand to map`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": `${label} (roll-up): ${rMapped ? 'mapped' : 'unmapped'}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: rMapped ? 'checkCircleSolid' : 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, width: 18, height: 18 }) }) }));
        }
        const mapped = state === 'mapped';
        const info = mapped ? null : disabledInfo(campaign, type);
        // Read-only users see status only — the icon is never a button (no mapping/edit).
        if (isReadOnly) {
            const glyph = mapped ? 'checkCircleSolid' : info?.kind === 'unavailable' ? 'banSolid' : 'timesCircleSolid';
            const color = mapped ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 : info ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60;
            const state2 = mapped ? 'Mapped' : info ? info.reason : 'Unmapped';
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `${label}: ${state2}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": `${label}: ${state2}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: glyph, color: color, width: 18, height: 18 }) }) }));
        }
        if (info) {
            const glyph = info.kind === 'unavailable' ? 'banSolid' : 'timesCircleSolid';
            const suffix = info.kind === 'unavailable' ? 'not applicable' : 'unavailable';
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: info.reason, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": `${label}: ${suffix} — ${info.reason}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: glyph, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, width: 18, height: 18 }) }) }));
        }
        // Multi-advertiser rows (external advertiser mapped to several ATAP advertisers) show a
        // WARNING-orange state on the Advertiser Mapping icon: it IS mapped, but needs the user to
        // pick one. Clickable (opens the drawer to resolve).
        const isMultiAdvertiserCell = type === 'advertiser' && !mapped && (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(campaign);
        if (isMultiAdvertiserCell) {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: 'Mapped to multiple advertisers \u2014 pick one to resolve', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconButton, { type: 'button', "aria-label": `Resolve ${label} for ${campaign.externalAdvertiserName} — mapped to multiple advertisers`, onClick: () => openMapping(campaign, type), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'exclamationTriangleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.pumpkin_60, width: 18, height: 18 }) }) }));
        }
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `${label}: ${mapped ? 'Mapped — click to edit' : 'Unmapped — click to map'}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconButton, { type: 'button', "aria-label": `${mapped ? 'Edit' : 'Add'} ${label} for ${campaign.externalAdvertiserName}`, onClick: () => openMapping(campaign, type), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: mapped ? 'checkCircleSolid' : 'timesCircleSolid', color: mapped ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, width: 18, height: 18 }) }) }));
    };
    const kebabItem = (campaign, type, key, noun) => {
        const mapped = type === 'oba' ? (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.obaMappingOf)(campaign) === 'mapped' : campaign[`${type}Mapping`] === 'mapped';
        const info = mapped ? null : disabledInfo(campaign, type);
        return {
            key,
            label: `${mapped ? 'Edit' : 'Map'} ${noun}`,
            disabled: isReadOnly || !!info || !!campaign.ignored,
            title: isReadOnly
                ? 'You have view-only access'
                : campaign.ignored
                    ? 'Campaign is ignored — restore it first'
                    : info?.reason ?? undefined,
            onClick: isReadOnly || info || campaign.ignored ? undefined : () => openMapping(campaign, type),
        };
    };
    const kebabItems = (campaign) => [
        kebabItem(campaign, 'advertiser', 'map-advertiser', 'Advertiser'),
        kebabItem(campaign, 'campaign', 'map-campaign', 'Campaign'),
        kebabItem(campaign, 'offers', 'map-offers', 'Offers'),
        kebabItem(campaign, 'invoice', 'map-invoice', 'Invoice'),
        // OBA is campaign-level: an actionable item on campaign/flat rows, N/A (omitted) on Ad Set children.
        ...(campaign.rowLevel === 'adset' ? [] : [kebabItem(campaign, 'oba', 'map-oba', 'OBA')]),
        // Ignore / Un-ignore — only for campaigns whose ADVERTISER is unmapped (and not multi). Last item.
        ...(!isReadOnly && campaign.advertiserMapping !== 'mapped' && !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(campaign)
            ? [
                { type: 'divider', key: 'ignore-div' },
                {
                    key: 'ignore',
                    label: campaign.ignored ? 'Restore campaign' : 'Ignore campaign',
                    onClick: () => toggleIgnore(campaign),
                },
            ]
            : []),
    ];
    // --- All Campaigns: optional "detail" columns the user can toggle via the Columns control. ---
    // --- All Campaigns: 3-section column customizer ("Edit columns"). ---
    // Section 1 Details + Section 3 Mapping = the base `columns` below (default-on; Campaign locked).
    // Section 2 Attributes = opt-in detail columns (default-off), inserted after External Campaign.
    const DETAILS_COLUMNS = [
        { key: 'platform', label: 'Platform' },
        { key: 'advertiserBid', label: 'Advertiser (BPID)' },
        { key: 'externalAdvertiserName', label: 'Platform Advertiser (ID)' },
        { key: 'externalCampaignName', label: 'External Campaign', locked: true },
        { key: 'entityType', label: 'Mapping Entity' },
    ];
    const ATTRIBUTE_COLUMNS = [
        { key: 'tactic', label: 'Tactic', field: 'tactic' },
        { key: 'subType', label: 'Sub-Type', field: 'subType' },
        { key: 'language', label: 'Language', field: 'language' },
        { key: 'custom1', label: 'Custom 1', field: 'custom1' },
        { key: 'custom2', label: 'Custom 2', field: 'custom2' },
        { key: 'custom3', label: 'Custom 3', field: 'custom3' },
        { key: 'reportingPlatform', label: 'Reporting Platform', field: 'reportingPlatform' },
        { key: 'opportunityId', label: 'Opportunity ID', field: 'opportunityId' },
        { key: 'shipTo', label: 'Ship To', field: 'shipTo' },
    ];
    const MAPPING_COLUMNS = [
        { key: 'advertiserMapping', label: 'Advertiser Mapping' },
        { key: 'campaignMapping', label: 'Campaign Mapping' },
        { key: 'offersMapping', label: 'Offers Mapping' },
        { key: 'invoiceMapping', label: 'Invoice Mapping' },
        { key: 'obaMapping', label: 'OBA Mapping' },
    ];
    // Visibility map (All Campaigns only; resets on reload). Details + Mapping default ON;
    // Attributes default OFF. External Campaign is locked ON.
    const [colVisible, setColVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
        const v = {};
        DETAILS_COLUMNS.forEach(c => (v[c.key] = true));
        MAPPING_COLUMNS.forEach(c => (v[c.key] = true));
        ATTRIBUTE_COLUMNS.forEach(c => (v[c.key] = false));
        // Reporting Platform is shown by default in place of Mapping Entity (both stay toggleable via Edit columns).
        v['reportingPlatform'] = true;
        v['entityType'] = false;
        // Platform Advertiser (ID) is off by default (still toggleable via Edit columns).
        v['externalAdvertiserName'] = false;
        // Scoped (advertiser tab): the Advertiser (BPID) column is redundant (one advertiser) — the
        // 'Multiple Advertisers' warning on the Advertiser Mapping cell covers the many:many case — so
        // it is OFF by default here (still toggleable via Edit columns).
        if (scoped)
            v['advertiserBid'] = false;
        return v;
    });
    const toggleCol = (key) => setColVisible(prev => ({ ...prev, [key]: !prev[key] }));
    const [colsMenuOpen, setColsMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Scoped (advertiser tab) Platform filter — a ToggleTab ('all' or a specific platform),
    // the ONLY filter in scoped mode.
    const [scopedPlatform, setScopedPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // All Campaigns: per-column mapping filter (header icons). Each column is single-select
    //   (null | 'mapped' | 'unmapped'); clicking the active state clears it. Advertiser Mapping has
    //   no column filter. Active column selections combine with OR (see queryFn).
    // Header filter: each mapping column has a grey filter icon opening an ICON-ONLY multi-select of
    //   the states that column can have. Within a column = OR across selected states; across columns
    //   = OR. Default: 'unmapped' selected on every column.
    const MAPPING_COL_KEYS = ['advertiserMapping', 'campaignMapping', 'offersMapping', 'invoiceMapping', 'obaMapping'];
    // Resolve a row's status for a given mapping column (what the cell actually shows).
    const rowColStatus = (c, key) => {
        if (key === 'advertiserMapping') {
            if ((0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(c))
                return 'warning';
            return c.advertiserMapping === 'mapped' ? 'mapped' : 'unmapped';
        }
        if (key === 'obaMapping')
            return (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.obaMappingOf)(c) === 'mapped' ? 'mapped' : 'unmapped';
        // campaign / offers / invoice — 'blocked' when not applicable or gated.
        if (key === 'offersMapping' && !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(c.platform))
            return 'blocked';
        const type = key.replace('Mapping', '');
        const mapped = c[key] === 'mapped';
        if (mapped)
            return 'mapped';
        if (disabledInfo(c, type))
            return 'blocked'; // gated (prereq pending) or unavailable
        return 'unmapped';
    };
    // The status options each column can present in its filter (icon-only).
    const COL_STATUS_OPTIONS = {
        advertiserMapping: ['mapped', 'unmapped', 'warning'],
        // 'Unmapped' covers BOTH a true red-cross and a grey-cross (blocked / gated / N-A) — anything
        // not mapped — so 'blocked' is not a separate filter option (see the queryFn 'icons' branch).
        campaignMapping: ['mapped', 'unmapped'],
        offersMapping: ['mapped', 'unmapped'],
        invoiceMapping: ['mapped', 'unmapped'],
        obaMapping: ['mapped', 'unmapped'],
    };
    // Icon + color for each status (same vocabulary as the cells; solid glyphs).
    const STATUS_META = {
        mapped: { icon: 'checkCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60, label: 'Mapped' },
        unmapped: { icon: 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, label: 'Unmapped' },
        warning: { icon: 'exclamationTriangleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.pumpkin_60, label: 'Multiple advertisers' },
        blocked: { icon: 'banSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, label: 'Blocked / N/A' },
    };
    const makeDefaultColFilter = () => MAPPING_COL_KEYS.reduce((acc, k) => {
        // Default: nothing selected on any column (no filter, shows everything). A hidden default
        // selection was unclear — users had to open each menu to see it.
        acc[k] = new Set();
        return acc;
    }, {});
    const [colStatusFilter, setColStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(makeDefaultColFilter);
    const [openColMenu, setOpenColMenu] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Anchor rect (viewport coords) of the clicked filter icon — the popover renders at page level
    // (NOT inside the table header cell, which antd re-renders and would unmount the menu).
    const [colMenuAnchor, setColMenuAnchor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const colMenuRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Closing the column menu applies the (possibly multi-select) filter. We intentionally DON'T
    // refetch on each toggle — a refetch re-renders the table header and would unmount the open
    // popover (closing it after one pick). So selections accumulate while open; apply on close.
    const closeColMenu = () => {
        setOpenColMenu(null);
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (!openColMenu)
            return;
        const onDocClick = (e) => {
            if (colMenuRef.current && !colMenuRef.current.contains(e.target))
                closeColMenu();
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openColMenu]);
    const toggleColStatus = (key, status) => {
        // Update selection only; the table refetch happens when the menu closes (see closeColMenu).
        setColStatusFilter(prev => {
            const next = new Set(prev[key]);
            if (next.has(status))
                next.delete(status);
            else
                next.add(status);
            return { ...prev, [key]: next };
        });
    };
    const reviewView = 'chart'; // fixed; header-icons mode retired (icons branches are dead)
    const isChartView = true;
    // Advanced controls are shown on demand via the "View mappings" expander (default collapsed).
    const [advancedExpanded, setAdvancedExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const isAdvancedChart = advancedExpanded;
    const MAPPING_DIMS = [
        { key: 'advertiserMapping', label: 'Advertiser' },
        { key: 'campaignMapping', label: 'Campaign' },
        { key: 'offersMapping', label: 'Offers' },
        { key: 'invoiceMapping', label: 'Invoice' },
        { key: 'obaMapping', label: 'OBA' },
    ];
    const [sentenceStatus, setSentenceStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [sentenceConnector, setSentenceConnector] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('or');
    // All dimension chips selected by default (both statuses). A manual change persists when
    // switching between Unmapped / Mapped (status switching only flips the smart-default connector).
    const [sentenceDims, setSentenceDims] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set(MAPPING_DIMS.map(d => d.key)));
    const toggleSentenceDim = (key) => {
        setSentenceDims(prev => {
            const next = new Set(prev);
            if (next.has(key))
                next.delete(key);
            else
                next.add(key);
            return next;
        });
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    const selectSentenceStatus = (status) => {
        setSentenceStatus(status);
        // Smart default connector: unmapped -> OR, mapped -> AND.
        setSentenceConnector(status === 'mapped' ? 'and' : 'or');
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    const toggleSentenceConnector = () => {
        setSentenceConnector(prev => (prev === 'or' ? 'and' : 'or'));
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    const [statusMenuOpen, setStatusMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const statusWrapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (!statusMenuOpen)
            return;
        const onDocClick = (e) => {
            if (statusWrapRef.current && !statusWrapRef.current.contains(e.target))
                setStatusMenuOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [statusMenuOpen]);
    const MAPPING_MODES = [
        { key: 'all', label: 'All mapping' },
        { key: 'campaign', label: 'Campaign mapping' },
        { key: 'invoice', label: 'Invoice mapping' },
    ];
    // null = no mode selected -> show EVERYTHING (mapped + unmapped). Modes are single-select but
    // deselectable: clicking the active mode turns it off (back to null).
    // Mode pills are hidden for now (per-column header filters are preferred). Default null = no
    // mode filter applied. Keep the pill code so we can re-enable easily.
    const [mappingMode, setMappingMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const selectMode = (mode) => {
        setMappingMode(prev => (prev === mode ? null : mode));
        // Re-run the query so the mode's background filter (read from this state) takes effect.
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    // All Campaigns: Advanced filters (the Attribute fields). AND logic; resets on reload.
    const ADVANCED_FIELDS = [
        { key: 'tactic', label: 'Tactic', field: 'tactic' },
        { key: 'subType', label: 'Sub-Type', field: 'subType' },
        { key: 'language', label: 'Language', field: 'language' },
        { key: 'custom1', label: 'Custom 1', field: 'custom1' },
        { key: 'custom2', label: 'Custom 2', field: 'custom2' },
        { key: 'custom3', label: 'Custom 3', field: 'custom3' },
        { key: 'reportingPlatform', label: 'Reporting Platform', field: 'reportingPlatform' },
        { key: 'opportunityId', label: 'Opportunity ID', field: 'opportunityId' },
        { key: 'shipTo', label: 'Ship To', field: 'shipTo' },
    ];
    const [advancedOpen, setAdvancedOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [advancedValues, setAdvancedValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const setAdvanced = (key, vals) => {
        setAdvancedValues(prev => ({ ...prev, [key]: vals }));
        setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
    };
    // Distinct option values per advanced field (from all rows), for the dropdowns.
    const advancedOptions = (field) => {
        const vals = Array.from(new Set(rows.map(r => r[field] || '').filter(v => v.length))).sort();
        return vals.map(v => ({ label: v, value: v }));
    };
    const attributeColumnDefs = ATTRIBUTE_COLUMNS.filter(o => colVisible[o.key]).map(o => ({
        title: o.label,
        dataIndex: o.field,
        key: o.key,
        width: '10%',
        ellipsis: true,
        render: (_, record) => {
            let val = record[o.field];
            // Rows still to be mapped have no stored Reporting Platform: derive it from the platform (DWI rule).
            if (o.key === 'reportingPlatform' && !val)
                val = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.reportingPlatformForPlatform)(record.platform);
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: val && val.length ? val : '-' });
        },
    }));
    // Only mapping columns currently shown via Edit columns participate in the filters/charts.
    const visibleMappingDims = MAPPING_DIMS.filter(d => colVisible[d.key] !== false);
    // Summary reflects the table's current filtered set (displayedRows); before the first query
    // runs it falls back to the full row set.
    const summaryRows = displayedRows.length > 0 ? displayedRows : rows;
    const mappingSummary = visibleMappingDims.map(({ key, label }) => {
        let mapped = 0, unmapped = 0;
        for (const c of summaryRows) {
            // N/A (not available) counts as mapped — nothing to action.
            if (key === 'offersMapping' && !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(c.platform)) {
                mapped += 1;
                continue;
            }
            // Advertiser: an unresolved many-to-one (Multiple Advertisers) is still UNMAPPED.
            if (key === 'advertiserMapping' && (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(c)) {
                unmapped += 1;
                continue;
            }
            const val = key === 'obaMapping' ? (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.obaMappingOf)(c) : c[key];
            if (val === 'mapped')
                mapped += 1;
            else
                unmapped += 1;
        }
        const total = summaryRows.length;
        const pct = total > 0 ? Math.round((mapped / total) * 100) : 0;
        return { label, mapped, unmapped, total, pct };
    });
    // Summary strip: one card per dimension (progress bar + count chips + % ready). Display-only.
    const chartSummary = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { display: 'grid', gridTemplateColumns: `repeat(${mappingSummary.length}, minmax(0, 1fr))`, gap: 12, padding: '4px 0 8px' }, children: mappingSummary.map(d => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { border: `1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_30}`, borderRadius: 6, padding: '10px 12px', minWidth: 0 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, gap: 6 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { fontSize: 14, fontWeight: 500, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: [d.label, " Mapping"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { fontSize: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, whiteSpace: 'nowrap' }, children: [d.pct, "% mapped"] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_20, marginBottom: 8 }, children: [d.mapped > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { flex: d.mapped, background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 } }), d.unmapped > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { flex: d.unmapped, background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60 } })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', gap: 12, fontSize: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'checkCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 }), " ", d.mapped] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'timesCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60 }), " ", d.unmapped] })] })] }, d.label))) }));
    // Sentence filter bar: "Show rows where [status ▾] in [any|all] of [dimension pills]".
    const statusLabel = sentenceStatus === 'mapped' ? 'Mapped' : sentenceStatus === 'unmapped' ? 'Unmapped' : 'All';
    const statusIcon = sentenceStatus === 'mapped' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'checkCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 })) : sentenceStatus === 'unmapped' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'timesCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60 })) : null;
    const sentenceBar = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: '4px 0 12px', fontSize: 14, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Show campaigns that have settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { ref: statusWrapRef, style: { position: 'relative', display: 'inline-block' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'all-campaigns-sentence-status-btn', variant: 'outlined', size: 'small', onClick: () => setStatusMenuOpen(o => !o), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 6 }, children: [statusIcon, statusLabel, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'chevronDown', width: 12, height: 12 })] }) }), statusMenuOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: {
                            position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1000,
                            background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0, border: `1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_30}`, borderRadius: 6,
                            boxShadow: '0 2px 8px #80808040', minWidth: 160, padding: 4,
                        }, children: ([
                            { key: 'all', label: 'All', icon: null },
                            { key: 'unmapped', label: 'Unmapped', icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'timesCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60 }) },
                            { key: 'mapped', label: 'Mapped', icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'checkCircle', width: 12, height: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 }) },
                        ]).map(opt => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", { type: 'button', id: `all-campaigns-sentence-status-${opt.key}`, onClick: () => { selectSentenceStatus(opt.key); setStatusMenuOpen(false); }, style: {
                                display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left',
                                border: 'none', background: sentenceStatus === opt.key ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_10 : 'transparent',
                                color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_100, borderRadius: 4, padding: '6px 8px', fontSize: 14, cursor: 'pointer',
                            }, children: [opt.icon, opt.label] }, opt.key))) }))] }), sentenceStatus !== 'all' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "in" }), sentenceStatus === 'all' ? null : isAdvancedChart ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { type: 'button', id: 'all-campaigns-sentence-connector', onClick: toggleSentenceConnector, title: 'Toggle match: any (OR) / all (AND)', style: {
                    border: `1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_40}`, background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60,
                    borderRadius: 9999, padding: '2px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }, children: sentenceConnector === 'and' ? 'all' : 'any' })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_100 }, children: sentenceStatus === 'mapped' ? 'all' : 'any' })), sentenceStatus !== 'all' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "of" }), sentenceStatus === 'all' ? null : !isAdvancedChart ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "the mappings" })) : (visibleMappingDims.map((dim, i) => {
                const on = sentenceDims.has(dim.key);
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 8 }, children: [i > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { style: { fontSize: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_70, fontWeight: 600 }, children: sentenceConnector === 'and' ? 'AND' : 'OR' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { type: 'button', id: `all-campaigns-sentence-${dim.key}`, onClick: () => toggleSentenceDim(dim.key), "aria-pressed": on, style: {
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                border: 'none',
                                background: on ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_40,
                                color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0,
                                borderRadius: 9999, padding: '4px 12px', fontSize: 14, fontWeight: 400, lineHeight: 1.2, cursor: 'pointer',
                            }, children: dim.label })] }, dim.key));
            })), sentenceStatus !== 'all' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'all-campaigns-view-mappings-toggle', variant: 'link', size: 'small', onClick: () => { setAdvancedExpanded(o => !o); setTimeout(() => tableRef.current?.refetchWithFilters(), 0); }, "aria-expanded": advancedExpanded, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4 }, children: [advancedExpanded ? 'Hide mappings' : 'View mappings', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: advancedExpanded ? 'chevronDown' : 'chevronRight', width: 12, height: 12 })] }) }))] }));
    // Chart view = summary cards + sentence filter bar, shown in the table title area.
    const chartControls = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [chartSummary, sentenceBar] }));
    // All Campaigns: mapping column header = label + two filter icons (green check = mapped,
    // red cross = unmapped). Single-select per column, both deselectable (click active to clear).
    // No filter icons on Advertiser Mapping. Column selections combine with OR (see queryFn).
    const mappingHeader = (key, label) => {
        if (!isAll || reviewView !== 'icons')
            return label;
        const active = colStatusFilter[key].size > 0;
        const open = openColMenu === key;
        // Header renders ONLY the label + a grey filter icon. The multi-select popover is rendered once
        // at page level (see colMenuPopover) so antd header re-renders can't unmount it mid-selection.
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'center' }, children: [label, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { type: 'button', id: `all-campaigns-colfilter-${key}`, onClick: e => {
                        e.stopPropagation();
                        if (open) {
                            closeColMenu();
                        }
                        else {
                            const r = e.currentTarget.getBoundingClientRect();
                            setColMenuAnchor({ top: r.bottom + 4, left: r.left });
                            setOpenColMenu(key);
                        }
                    }, title: `Filter ${label}`, "aria-label": `Filter ${label}`, "aria-expanded": open, style: {
                        display: 'inline-flex', alignItems: 'center', border: 'none', background: 'transparent',
                        padding: 2, cursor: 'pointer', lineHeight: 0,
                    }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'filter', width: 12, height: 12, color: active ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.violet_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50 }) })] }));
    };
    // Page-level column-filter popover (fixed-positioned at the clicked icon's anchor). Rendered
    // outside the table so header re-renders don't unmount it — fixes the multi-select drop.
    const colMenuPopover = isAll && reviewView === 'icons' && openColMenu && colMenuAnchor ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { ref: colMenuRef, onMouseDown: e => e.stopPropagation(), style: {
            position: 'fixed', top: colMenuAnchor.top, left: colMenuAnchor.left, zIndex: 2000,
            background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0, border: `1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_30}`, borderRadius: 6,
            boxShadow: '0 2px 8px #80808040', padding: 4, display: 'inline-flex', gap: 2,
        }, children: COL_STATUS_OPTIONS[openColMenu].map(st => {
            const meta = STATUS_META[st];
            const on = colStatusFilter[openColMenu].has(st);
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { type: 'button', id: `all-campaigns-colfilter-${openColMenu}-${st}`, onClick: () => toggleColStatus(openColMenu, st), title: meta.label, "aria-label": meta.label, "aria-pressed": on, style: {
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 30, height: 30, borderRadius: 6, cursor: 'pointer',
                    // Non-brand violet highlight — a prototype review control, not a shipping option.
                    border: `1px solid ${on ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.violet_60 : 'transparent'}`,
                    background: on ? '#f3e8ff' : 'transparent', // soft violet (df/color/violet ~10; not exported)
                }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: meta.icon, width: 16, height: 16, color: meta.color }) }, st));
        }) })) : null;
    // Per-platform solid-chip color (uses exported DF palette keys; fg chosen for contrast).
    const platformChipColor = (platform) => {
        switch (platform) {
            case 'SA360':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            case 'CM360':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.violet_60, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            case 'Meta':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_80, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            case 'Amadeus DSP':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_70, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            case 'DV360':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.canary_70, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_100 };
            case 'DerbySoft':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_70, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            case 'WIHP':
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.pumpkin_60, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
            default:
                return { bg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, fg: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 };
        }
    };
    const columns = [
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            // Fixed px (not %) so the caret (on Facebook rows) + the chip (e.g. 'Meta (Facebook)') fit
            // on one line and the chip never wraps below the expander.
            width: 190,
            render: (platform, record) => {
                if (record.rowLevel === 'adset')
                    return null; // child rows don't repeat the platform
                const col = platformChipColor(platform);
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.PlatformChip, { bg: col.bg, fg: col.fg, children: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformLabel)(platform) });
            },
        },
        {
            title: 'Advertiser (BPID)',
            dataIndex: 'advertiserBid',
            key: 'advertiserBid',
            width: '15%',
            ellipsis: true,
            render: (_, record) => {
                if (record.rowLevel === 'adset')
                    return null; // advertiser is campaign-level; not repeated per Ad Set
                // Multi-advertiser rows show 'Multiple Advertisers' until one candidate is picked
                // (red icon while unresolved); once resolved they show the single advertiser below.
                if ((0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(record))
                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.MultiAdvertiser, { children: "Multiple Advertisers" });
                if (record.advertiserMapping === 'mapped' && record.advertiserBid)
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.TwoLineCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: record.advertiserName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.SubText, { children: record.advertiserBid })] }));
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "-" });
            },
        },
        {
            title: 'Platform Advertiser (ID)',
            dataIndex: 'externalAdvertiserName',
            key: 'externalAdvertiserName',
            width: '17%',
            ellipsis: true,
            render: (_, record) => record.rowLevel === 'adset' ? null : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.TwoLineCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: record.externalAdvertiserName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.SubText, { children: record.externalAdvertiserId })] })),
        },
        {
            title: 'External Campaign Name (ID)',
            dataIndex: 'externalCampaignName',
            key: 'externalCampaignName',
            width: '10%', // narrowed from the original 17% (long names truncate with an ellipsis)
            ellipsis: true,
            render: (_, record) => record.externalCampaignId === '-' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "-" })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.CampaignNameCell, { children: [(() => {
                        const st = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.campaignStatusOf)(record);
                        const color = st === 'live' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 : st === 'pause' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.pumpkin_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50;
                        const label = st === 'live' ? 'Live' : st === 'pause' ? 'Pause' : 'Unknown';
                        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `Campaign Status in Platform is ${label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.RunStatusDot, { color: color, "aria-label": `Campaign status: ${label}` }) }));
                    })(), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.TwoLineCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.CampaignNameLink, { type: 'button', title: record.externalCampaignName, onClick: () => setSummaryCampaign(record), children: record.externalCampaignName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.SubText, { children: record.externalCampaignId })] })] })),
        },
        {
            // Per-platform mapping unit / entity type (Campaign / Placement / AdSet) — req-defined.
            title: 'Mapping Entity',
            key: 'entityType',
            width: '9%',
            render: (_, record) => {
                // An explicit Ad Set CHILD shows 'AdSet'. At the TOP level, Facebook rows show 'Campaign'
                // (that's what you see first, before expanding); other platforms use their mapping unit
                // (SA360/DerbySoft/WIHP -> Campaign, CM360 -> Placement).
                const entity = record.rowLevel === 'adset'
                    ? 'AdSet'
                    : record.platform === 'Meta'
                        ? 'Campaign'
                        : (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingUnitName)(record.platform);
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.EntityChip, { chipColor: platformChipColor(record.platform).bg, children: entity });
            },
        },
        {
            title: mappingHeader('advertiserMapping', 'Advertiser Mapping'),
            dataIndex: 'advertiserMapping',
            key: 'advertiserMapping',
            width: '8%',
            align: 'center',
            render: (state, record) => renderMappingCell(record, 'advertiser', state),
        },
        {
            title: mappingHeader('campaignMapping', 'Campaign Mapping'),
            dataIndex: 'campaignMapping',
            key: 'campaignMapping',
            width: '8%',
            align: 'center',
            render: (state, record) => renderMappingCell(record, 'campaign', state),
        },
        {
            title: mappingHeader('offersMapping', 'Offers Mapping'),
            dataIndex: 'offersMapping',
            key: 'offersMapping',
            width: '8%',
            align: 'center',
            render: (state, record) => renderMappingCell(record, 'offers', state),
        },
        {
            title: mappingHeader('invoiceMapping', 'Invoice Mapping'),
            dataIndex: 'invoiceMapping',
            key: 'invoiceMapping',
            width: '8%',
            align: 'center',
            render: (state, record) => renderMappingCell(record, 'invoice', state),
        },
        {
            // OBA (Omnichannel Budget Allocation) mapping — campaign-level. Actionable green/red on
            // campaign/flat rows (opens the mapping drawer, like Invoice); N/A (ban) on Ad Set children.
            title: mappingHeader('obaMapping', 'OBA Mapping'),
            key: 'obaMapping',
            width: '8%',
            align: 'center',
            render: (_, record) => {
                if (record.rowLevel === 'adset') {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: 'OBA Mapping: not applicable at Ad Set level', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": 'OBA Mapping: not applicable', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'banSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_50, width: 18, height: 18 }) }) }));
                }
                const mapped = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.obaMappingOf)(record) === 'mapped';
                if (isReadOnly) {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `OBA Mapping: ${mapped ? 'Mapped' : 'Unmapped'}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconDisabled, { "aria-label": `OBA Mapping: ${mapped ? 'Mapped' : 'Unmapped'}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: mapped ? 'checkCircleSolid' : 'timesCircleSolid', color: mapped ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, width: 18, height: 18 }) }) }));
                }
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], { title: `OBA Mapping: ${mapped ? 'Mapped — click to edit' : 'Unmapped — click to map'}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.StatusIconButton, { type: 'button', "aria-label": `${mapped ? 'Edit' : 'Add'} OBA Mapping for ${record.externalCampaignName}`, onClick: () => openMapping(record, 'oba'), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: mapped ? 'checkCircleSolid' : 'timesCircleSolid', color: mapped ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.forest_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.crimson_60, width: 18, height: 18 }) }) }));
            },
        },
        {
            key: 'actions',
            align: 'center',
            width: '4%',
            render: (_, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.DropdownMenu, { items: kebabItems(record), menuType: 'kebab', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.IconButton, { id: `unmapped-campaign-${record.id}-actions-btn`, iconName: 'ellipsisVertical', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80 }) })),
        },
    ];
    // All Campaigns: build the displayed columns from the base `columns` filtered by visibility,
    // with the selected Attribute columns inserted right after External Campaign. Other pages use the
    // base `columns` unchanged. The actions column is always kept.
    // Fixed/sticky detail columns — Mapping Entity is a detail column but scrolls (not pinned).
    const DETAIL_KEYS = new Set(DETAILS_COLUMNS.map(c => c.key).filter(k => k !== 'entityType'));
    const displayColumns = (() => {
        if (!isAll)
            return columns;
        const base = columns.filter(c => c.key === 'actions' || colVisible[c.key] !== false);
        // Insert attribute columns after Mapping Entity; if it's hidden, fall back to External Campaign.
        let idx = base.findIndex(c => c.key === 'entityType');
        if (idx < 0)
            idx = base.findIndex(c => c.key === 'externalCampaignName');
        const at = idx >= 0 ? idx + 1 : base.length;
        const merged = [...base.slice(0, at), ...attributeColumnDefs, ...base.slice(at)];
        // Keep the Details columns pinned to the left on small screens; the rest scroll horizontally.
        return merged.map(c => (DETAIL_KEYS.has(c.key) ? { ...c, fixed: 'left' } : c));
    })();
    // Only scroll horizontally when the columns would overflow. Rough per-column widths: details/
    // attributes ~180px, mapping/status ~110px. No scroll by default (few columns => small total).
    const scrollX = isAll
        ? displayColumns.reduce((sum, c) => {
            const k = c.key;
            if (k === 'actions')
                return sum + 56;
            if (['advertiserMapping', 'campaignMapping', 'offersMapping', 'invoiceMapping', 'obaMapping'].includes(k))
                return sum + 120;
            if (k === 'entityType')
                return sum + 110;
            if (k === 'externalCampaignName')
                return sum + 105; // narrower than the 180px default
            return sum + 180;
        }, 0)
        : undefined;
    // "Edit columns" control (All Campaigns only): a button that opens a sectioned checkbox panel
    // BELOW it. The panel is controlled (stays open while toggling) so clicks don't dismiss it.
    const colCheckboxRow = (key, label, locked = false) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { padding: '4px 0' }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Checkbox, { checked: locked ? true : !!colVisible[key], disabled: locked, onChange: locked ? undefined : () => toggleCol(key), children: label }) }, key));
    const colSectionTitle = (title) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { fontSize: 12, fontWeight: 600, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, margin: '8px 0 2px' }, children: title }));
    const columnsPanel = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: {
            background: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0,
            border: `1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_30}`,
            borderRadius: 6,
            boxShadow: '0 4px 12px #80808040',
            padding: '8px 16px 12px',
            minWidth: 220,
            maxHeight: 420,
            overflowY: 'auto',
        }, children: [colSectionTitle('Details'), DETAILS_COLUMNS.map(c => colCheckboxRow(c.key, c.label, c.locked)), colSectionTitle('Attributes'), ATTRIBUTE_COLUMNS.map(c => colCheckboxRow(c.key, c.label)), colSectionTitle('Mapping'), MAPPING_COLUMNS.map(c => colCheckboxRow(c.key, c.label))] }));
    // Self-anchored popover: the panel is absolutely positioned directly below the button. Open
    // state is controlled; an outside-click (not inside the wrapper) closes it, so toggling the
    // checkboxes inside keeps it open.
    const colsWrapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (!colsMenuOpen)
            return;
        const onDocClick = (e) => {
            if (colsWrapRef.current && !colsWrapRef.current.contains(e.target))
                setColsMenuOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [colsMenuOpen]);
    const columnsControl = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { ref: colsWrapRef, style: { position: 'relative', display: 'inline-block' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'all-campaigns-edit-columns-btn', variant: 'outlined', size: 'small', onClick: () => setColsMenuOpen(o => !o), children: ["Edit columns ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'chevronDown', width: 12, height: 12 })] }), colsMenuOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1000 }, children: columnsPanel }))] }));
    // Search-row adornment for All Campaigns: the review switcher + Edit columns.
    const allCampaignsAdornment = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 8 }, children: columnsControl }));
    // Scoped (advertiser tab): keep Edit columns but NOT the review-filter switcher.
    const scopedAdornment = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { display: 'inline-flex', alignItems: 'center', gap: 8 }, children: columnsControl }));
    // Scoped (advertiser tab): the only filter — a Platform ToggleTab ('All' + each platform present
    // across this advertiser's rows). Rendered in the table title area.
    const scopedPlatformTabs = (() => {
        const present = Array.from(new Set(rows.map(r => r.platform)));
        const current = present.includes(scopedPlatform) || scopedPlatform === 'all' ? scopedPlatform : 'all';
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { display: 'inline-flex', alignItems: 'center' }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { value: current, onChange: (v) => {
                    setScopedPlatform(String(v));
                    setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
                }, options: [
                    { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'adv-campaigns-platform-all', children: "All Campaigns" }), value: 'all' },
                    ...present.map(pf => ({ label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: `adv-campaigns-platform-${pf}`, children: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformLabel)(pf) }), value: pf })),
                ] }) }));
    })();
    const makeMultiSelect = (id, label, options) => ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: id, label: label, mode: 'multiple', showSearch: true, placeholder: 'Select', options: options, value: asArray(value), onChange: (v) => setValue(v) }));
    const campaignStatusFilterOptions = [
        { label: 'Live', value: 'live' },
        { label: 'Pause', value: 'pause' },
        { label: 'Unknown', value: 'unknown' },
        { label: 'Ignored', value: 'ignored' },
    ];
    const filterItems = [
        {
            name: 'platform',
            label: 'Platform',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformOptions,
            renderControl: makeMultiSelect('unmapped-platform-sel', 'Platform', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformOptions),
        },
        {
            name: 'advertiserBid',
            label: 'Advertiser (BPID)',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.advertiserOptions,
            renderControl: makeMultiSelect('unmapped-advertiser-sel', 'Advertiser (BPID)', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.advertiserOptions),
        },
        {
            name: 'externalAdvertiserId',
            label: 'Platform Advertiser (ID)',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.externalAdvertiserOptions,
            renderControl: makeMultiSelect('unmapped-ext-advertiser-sel', 'Platform Advertiser (ID)', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.externalAdvertiserOptions),
        },
        {
            // Campaign (platform run) status filter. Live/Pause/Unknown come from the DB; Ignored returns
            // the campaigns the user marked as ignored. Placed before External Campaign Name.
            name: 'campaignStatus',
            label: 'Campaign Status',
            type: 'multiple',
            placement: 'banner',
            options: campaignStatusFilterOptions,
            renderControl: makeMultiSelect('unmapped-campaign-status-sel', 'Campaign Status', campaignStatusFilterOptions),
        },
        {
            name: 'externalCampaignId',
            label: 'External Campaign Name (ID)',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.externalCampaignOptions,
            renderControl: makeMultiSelect('unmapped-ext-campaign-sel', 'External Campaign Name (ID)', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.externalCampaignOptions),
        },
        {
            name: 'advertiserMapping',
            label: 'Advertiser mapping',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions,
            renderControl: makeMultiSelect('unmapped-advertiser-mapping-sel', 'Advertiser mapping', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions),
        },
        {
            name: 'campaignMapping',
            label: 'Campaign Mapping',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions,
            renderControl: makeMultiSelect('unmapped-campaign-mapping-sel', 'Campaign Mapping', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions),
        },
        {
            name: 'invoiceMapping',
            label: 'Invoice Mapping',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions,
            renderControl: makeMultiSelect('unmapped-invoice-mapping-sel', 'Invoice Mapping', _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.mappingStateOptions),
        },
        {
            name: 'scope',
            label: 'Scope',
            type: 'single',
            placement: 'header',
            showInTags: false,
            renderControl: ({ value, setValue }) => {
                const current = typeof value === 'string' && value.length > 0 ? value : 'my';
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { value: current, onChange: (v) => setValue(String(v)), options: [
                        { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'unmapped-scope-my-txt', children: "My Campaigns" }), value: 'my' },
                        { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'unmapped-scope-all-txt', children: "All Campaigns" }), value: 'all' },
                        { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'unmapped-scope-unmapped-txt', children: "Unmapped Advertisers" }), value: 'unmappedAdv' },
                    ] }));
            },
        },
    ];
    // Campaign Setup / Unmapped Campaigns open on "My Campaigns" by default.
    const initialFilters = { scope: 'my' };
    const queryFn = async (filters, pagination) => {
        const f = (filters ?? {});
        const platforms = asArray(f.platform);
        const advertisers = asArray(f.advertiserBid);
        const extAdvertisers = asArray(f.externalAdvertiserId);
        const extCampaigns = asArray(f.externalCampaignId);
        const advMapping = asArray(f.advertiserMapping);
        const campMapping = asArray(f.campaignMapping);
        const invMapping = asArray(f.invoiceMapping);
        const campStatus = asArray(f.campaignStatus);
        const scope = (typeof f.scope === 'string' ? f.scope : 'my');
        const search = typeof f.search === 'string' ? f.search.trim().toLowerCase() : '';
        const filtered = rows.filter(c => {
            // Scoped (advertiser tab): rows are already limited to this advertiser. The only controls
            // are the Platform ToggleTab + the table Search — skip the whole banner/review/mode pipeline.
            if (scoped) {
                if (!(scopedPlatform === 'all' || c.platform === scopedPlatform))
                    return false;
                if (search) {
                    const haystack = [
                        c.platform,
                        c.advertiserName,
                        c.advertiserBid,
                        c.externalAdvertiserName,
                        c.externalAdvertiserId,
                        c.externalCampaignName,
                        c.externalCampaignId,
                    ]
                        .join(' ')
                        .toLowerCase();
                    if (!haystack.includes(search))
                        return false;
                }
                return true;
            }
            if (platforms.length > 0 && !platforms.includes(c.platform))
                return false;
            if (advertisers.length > 0 && !advertisers.includes(c.advertiserBid))
                return false;
            if (extAdvertisers.length > 0 && !extAdvertisers.includes(c.externalAdvertiserId))
                return false;
            if (extCampaigns.length > 0 && !extCampaigns.includes(c.externalCampaignId))
                return false;
            if (advMapping.length > 0 && !advMapping.includes(c.advertiserMapping))
                return false;
            if (campMapping.length > 0 && !campMapping.includes(c.campaignMapping))
                return false;
            if (invMapping.length > 0 && !invMapping.includes(c.invoiceMapping))
                return false;
            // Campaign status filter: live/pause/unknown from data; 'ignored' matches the ignored flag.
            // Selected values combine with OR.
            if (campStatus.length > 0) {
                const wantIgnored = campStatus.includes('ignored');
                const wantStatuses = campStatus.filter(v => v !== 'ignored');
                const matchIgnored = wantIgnored && !!c.ignored;
                const matchStatus = wantStatuses.length > 0 && wantStatuses.includes((0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.campaignStatusOf)(c));
                if (!(matchIgnored || matchStatus))
                    return false;
            }
            // Scope rules (a multi-advertiser row counts as mapped — the external advertiser IS mapped,
            // just to several ATAP advertisers — so it belongs in All / My, not Unmapped Advertisers):
            //  - My Campaigns: advertiser mapped (or multi) AND followed.
            //  - All Campaigns: advertiser mapped (or multi), followed or not.
            //  - Unmapped Advertisers: advertiser NOT mapped and NOT multi.
            const advMapped = c.advertiserMapping === 'mapped' || (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(c);
            if (scope === 'my' && !(advMapped && (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.rowIsFollowed)(c)))
                return false;
            if (scope === 'all' && !advMapped)
                return false;
            if (scope === 'unmappedAdv' && advMapped)
                return false;
            // All Campaigns: mapping-mode background filter (single-select, deselectable).
            //  - null:     no mode -> show everything (mapped + unmapped), no filter applied
            //  - all:      unmapped in campaign OR offers OR invoice
            //  - campaign: unmapped in campaign OR offers
            //  - invoice:  unmapped in invoice
            if (isAll) {
                const needsCampaign = c.campaignMapping === 'unmapped' || c.offersMapping === 'unmapped';
                const needsInvoice = c.invoiceMapping === 'unmapped';
                if (mappingMode === 'campaign' && !needsCampaign)
                    return false;
                if (mappingMode === 'invoice' && !needsInvoice)
                    return false;
                if (mappingMode === 'all' && !(needsCampaign || needsInvoice))
                    return false;
            }
            // All Campaigns mapping filter — only the ACTIVE review view filters (mutually exclusive).
            if (isAll && reviewView === 'icons') {
                // Per-column multi-select header filter. A column with a non-empty selection contributes a
                // match when the row's status for that column is in the selected set. OR across columns:
                // the row passes if it matches ANY column that has a selection. (No selections anywhere ->
                // no filter.)
                const activeCols = MAPPING_COL_KEYS.filter(k => colVisible[k] !== false && colStatusFilter[k].size > 0);
                if (activeCols.length > 0) {
                    const colMatches = (k) => {
                        const sel = colStatusFilter[k];
                        const st = rowColStatus(c, k);
                        // 'Unmapped' folds in the grey-cross (blocked / gated / N-A): anything not mapped.
                        if (sel.has('unmapped') && (st === 'unmapped' || st === 'blocked'))
                            return true;
                        return sel.has(st);
                    };
                    const anyMatch = activeCols.some(colMatches);
                    if (!anyMatch)
                        return false;
                }
            }
            if (isAll && isChartView && sentenceStatus !== 'all') {
                // Sentence bar: "show campaigns that have settings [status] in [any|all] of [the mappings]".
                //  - Simple chart: no per-dimension chips — evaluate ALL mapping dimensions.
                //  - Advanced chart: only the selected dimension chips.
                //  - N/A offers (WIHP/DerbySoft): never count as 'unmapped'; count as 'mapped'
                //    (you can't map what doesn't exist — so N/A shouldn't block a 'fully mapped' AND).
                const dimSatisfies = (k) => {
                    const na = k === 'offersMapping' && !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(c.platform);
                    const val = k === 'obaMapping' ? (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.obaMappingOf)(c) : c[k];
                    if (sentenceStatus === 'unmapped')
                        return na ? false : val === 'unmapped';
                    return na ? true : val === 'mapped';
                };
                const dims = (isAdvancedChart ? Array.from(sentenceDims) : MAPPING_DIMS.map(d => d.key)).filter(k => colVisible[k] !== false);
                // Advanced uses the toggled connector; simple uses the smart default (unmapped -> any/OR,
                // mapped -> all/AND) shown as bold static text.
                const effectiveConnector = isAdvancedChart ? sentenceConnector : (sentenceStatus === 'mapped' ? 'and' : 'or');
                if (dims.length > 0) {
                    const pass = effectiveConnector === 'and' ? dims.every(dimSatisfies) : dims.some(dimSatisfies);
                    if (!pass)
                        return false;
                }
            }
            // All Campaigns: Advanced attribute filters (AND). Each active field must match (by value).
            if (isAll) {
                for (const af of ADVANCED_FIELDS) {
                    const sel = advancedValues[af.key] ?? [];
                    if (sel.length > 0) {
                        const v = c[af.field] || '';
                        if (!sel.includes(v))
                            return false;
                    }
                }
            }
            if (search) {
                const haystack = [
                    c.platform,
                    c.advertiserName,
                    c.advertiserBid,
                    c.externalAdvertiserName,
                    c.externalAdvertiserId,
                    c.externalCampaignName,
                    c.externalCampaignId,
                ]
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(search))
                    return false;
            }
            return true;
        });
        // Ignored (unmapped-advertiser) campaigns sink to the bottom of the list; relative order is
        // otherwise preserved (stable sort).
        const ordered = filtered
            .map((c, i) => ({ c, i }))
            // The Londoner Hotel (followed demo advertiser) always sits at the top.
            .sort((a, b) => Number(!!a.c.ignored) - Number(!!b.c.ignored) ||
            Number(b.c.advertiserBid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_12__.LONDONER.bpid) - Number(a.c.advertiserBid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_12__.LONDONER.bpid) ||
            a.i - b.i)
            .map(x => x.c);
        // Expose the full filtered set (all pages) so the chart summary can mirror the table.
        setDisplayedRows(ordered);
        const pageSize = pagination?.pageSize ?? 10;
        const current = pagination?.current ?? 1;
        const start = (current - 1) * pageSize;
        const paged = ordered.slice(start, start + pageSize);
        return { data: paged, total: ordered.length };
    };
    // In All Campaigns mode the mapping dropdowns are replaced by the Mode pills, so hide them from
    // the Details filter banner. (Keeps platform / advertiser / platform advertiser / external
    // campaign + scope.)
    const HIDDEN_IN_ALL = new Set(['advertiserMapping', 'campaignMapping', 'invoiceMapping']);
    const displayFilterItems = isAll
        ? filterItems.filter(fi => !HIDDEN_IN_ALL.has(String(fi.name)))
        : filterItems;
    // Mode pills (single-select) — rendered in the table title row for All Campaigns.
    const modePills = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '4px 0 12px' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { style: { fontSize: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80 }, children: "Mode:" }), MAPPING_MODES.map(m => {
                const on = mappingMode === m.key;
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", { type: 'button', id: `all-campaigns-mode-${m.key}`, onClick: () => selectMode(m.key), title: on ? 'Click to clear this mode (show all campaigns)' : m.label, "aria-pressed": on, style: {
                        border: `1px solid ${on ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_40}`,
                        background: on ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0,
                        color: on ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_0 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80,
                        borderRadius: 9999,
                        padding: '4px 14px',
                        fontSize: 12,
                        fontWeight: on ? 600 : 400,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    }, children: [m.label, on ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { "aria-hidden": true, style: { fontSize: 13, lineHeight: 1, opacity: 0.85 }, children: "\u00D7" }) : null] }, m.key));
            }), mappingMode === null ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { style: { fontSize: 12, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_70, fontStyle: 'italic' }, children: "Showing all campaigns (mapped + unmapped)" })) : null] }));
    // Advanced filters expander — rendered inside the filter card (bottom-right, below the filter
    // inputs and above the active-filter tags / mode selection). All Campaigns only.
    const advancedCount = Object.values(advancedValues).reduce((n, v) => n + (v?.length ? 1 : 0), 0);
    const advancedFilters = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'all-campaigns-advanced-toggle', variant: 'link', onClick: () => setAdvancedOpen(o => !o), "aria-expanded": advancedOpen, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 4 }, children: ["Advanced filters", advancedCount ? ` (${advancedCount})` : '', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: advancedOpen ? 'chevronDown' : 'chevronRight', width: 12, height: 12 })] }) }), advancedOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: {
                    width: '100%',
                    display: 'grid',
                    // Match the default filter card: max 6 filters per row.
                    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                    gap: 12,
                    padding: '12px 0 4px',
                }, children: ADVANCED_FIELDS.map(af => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: `all-campaigns-adv-${af.key}`, label: af.label, mode: 'multiple', showSearch: true, placeholder: 'Any', options: advancedOptions(af.field), value: advancedValues[af.key] ?? [], onChange: (v) => setAdvanced(af.key, asArray(v)) }, af.key))) }))] }));
    const pageTitle = scoped ? 'Campaigns' : isAll ? 'Campaign Setup' : 'Unmapped Campaigns';
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UnmappedCampaigns_styled__WEBPACK_IMPORTED_MODULE_14__.UnmappedCampaignsWrapper, { children: [!scoped && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: pageTitle }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_5__["default"], { id: 'unmapped-campaign-tbl', cellsIdPrefix: 'unmapped-campaign', rowKey: 'id', ref: tableRef, sectionTitle: scoped ? undefined : pageTitle, titleButtons: scoped || isReadOnly ? undefined : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'campaign-setup-create-with-max-btn', variant: 'solid', size: 'small', 
                    // Opens the Max panel next to this page with the first step of the campaign-creation flow:
                    // pick the advertiser (followed list or full dropdown), then Confirm.
                    onClick: () => {
                        (0,_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_8__.startAdvertiserSelection)();
                        navigate(`${location.pathname}?panel=amadeus-max`);
                    }, children: "Create campaigns with Max" })), tableTitleContent: undefined, showFilterBanner: !scoped, belowControls: !scoped && isAll && isChartView ? chartControls : undefined, bannerFooter: !scoped && isAll ? advancedFilters : undefined, columns: displayColumns, filterItems: scoped ? [] : displayFilterItems, initialFilters: initialFilters, filterMode: 'server', queryFn: queryFn, tableSearch: { show: true, placeholder: 'Search' }, tableCustomControls: scoped ? scopedPlatformTabs : undefined, searchAdornment: scoped ? scopedAdornment : isAll ? allCampaignsAdornment : undefined, tableScrollX: scrollX, rowClassName: (record) => (record.ignored ? 'mh-ignored-row' : ''), tableTitle: `${pageTitle} Overview` }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CampaignSummaryDrawer__WEBPACK_IMPORTED_MODULE_9__["default"], { campaign: summaryCampaign, onClose: () => setSummaryCampaign(null) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer__WEBPACK_IMPORTED_MODULE_10__["default"], { open: drawerOpen, mappingType: activeType, campaign: activeCampaign, readOnly: isReadOnly, onClose: closeMapping, onSave: handleMappingSave }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer__WEBPACK_IMPORTED_MODULE_13__["default"], { open: offersOpen, campaign: offersCampaign, readOnly: isReadOnly, onClose: closeOffers }), colMenuPopover] }));
}
function AllCampaignsPage() {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UnmappedCampaignsPage, { mode: 'all' });
}
/** The Campaign Setup table scoped to a single advertiser (Advertiser Details > Campaigns tab):
 *  that advertiser's campaigns (mapped + unmapped) with only a Platform ToggleTab, Edit columns
 *  kept (Advertiser BPID off by default), no breadcrumb / filter banner / search. */
function AdvertiserCampaignsTable({ advertiserBid }) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UnmappedCampaignsPage, { mode: 'all', advertiserBid: advertiserBid });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnmappedCampaignsPage);


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_pages_CampaignMapping_UnmappedCampaigns_tsx.105662172eac484e3634.js.map