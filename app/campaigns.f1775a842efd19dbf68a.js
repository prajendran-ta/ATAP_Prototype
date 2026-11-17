"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["campaigns"],{

/***/ "./apps/mediahub-ui/pages/CampaignMapping/Campaigns.styled.tsx"
/*!*********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/Campaigns.styled.tsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampaignsWrapper: () => (/* binding */ CampaignsWrapper),
/* harmony export */   NameCell: () => (/* binding */ NameCell),
/* harmony export */   NameLink: () => (/* binding */ NameLink),
/* harmony export */   OfferDotCount: () => (/* binding */ OfferDotCount),
/* harmony export */   OfferDotsBtn: () => (/* binding */ OfferDotsBtn),
/* harmony export */   PlaceholderNameLink: () => (/* binding */ PlaceholderNameLink),
/* harmony export */   ScopedFilterRow: () => (/* binding */ ScopedFilterRow),
/* harmony export */   ScopedHeaderRow: () => (/* binding */ ScopedHeaderRow),
/* harmony export */   StatusDot: () => (/* binding */ StatusDot),
/* harmony export */   StatusIconButton: () => (/* binding */ StatusIconButton),
/* harmony export */   StatusIconDisabled: () => (/* binding */ StatusIconDisabled),
/* harmony export */   SubText: () => (/* binding */ SubText),
/* harmony export */   TwoLineCell: () => (/* binding */ TwoLineCell)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const CampaignsWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
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
// Campaign name rendered as a link to the mapping Settings drawer (no underline, DF table-link rule).
const NameLink = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  padding: 0;
  border: none;
  background: transparent;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
// Campaign run-status dot shown before the campaign name.
const NameCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;
const StatusDot = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
// Clickable offers status icon (green check / red X).
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
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  }

  &:focus-visible {
    outline: 2px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
    outline-offset: 1px;
  }
`;
// Non-interactive offers icon (grey ⊘) for platforms without offer mapping.
const StatusIconDisabled = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: not-allowed;
`;
// Offers status rollup (green/grey/red dot + count), clickable to open the Offers drawer.
const OfferDotsBtn = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_20};
  }

  &:focus-visible {
    outline: 2px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
    outline-offset: 1px;
  }
`;
const OfferDotCount = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
`;
// Lightweight header row for the embedded (advertiser-scoped) Campaigns panel: title left,
// action button right. Matches the sibling Advertiser Details panels (title + action + table).
const ScopedHeaderRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// Inline filter row for the scoped (advertiser) Campaigns panel: platform ToggleTab on the left.
const ScopedFilterRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
// Unmapped row: the external campaign name shown as a placeholder (no internal name yet).
// Italic + muted to signal it's the source campaign, not a generated Naming Convention String.
const PlaceholderNameLink = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  padding: 0;
  border: none;
  background: transparent;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;
  font-style: italic;

  &:hover {
    text-decoration: underline;
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/Campaigns.tsx"
/*!**************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/Campaigns.tsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CampaignsTable: () => (/* binding */ CampaignsTable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner */ "./apps/mediahub-ui/components/TableWithFilters/TableWithFilterBanner.tsx");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/es/tooltip */ "./node_modules/antd/es/tooltip/index.js");
/* harmony import */ var _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockData/campaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts");
/* harmony import */ var _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/londonerFollowStore */ "./apps/mediahub-ui/shared/londonerFollowStore.ts");
/* harmony import */ var _MappingDrawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MappingDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.tsx");
/* harmony import */ var _OffersDrawer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./OffersDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.tsx");
/* harmony import */ var _QuickCampaignsDrawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./QuickCampaignsDrawer */ "./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.tsx");
/* harmony import */ var _Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Campaigns.styled */ "./apps/mediahub-ui/pages/CampaignMapping/Campaigns.styled.tsx");














const campaignStatusConfig = {
    scheduled: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.violet_60, label: 'Scheduled' },
    live: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60, label: 'Live' },
    pause: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.pumpkin_60, label: 'Pause' },
    complete: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.sky_60, label: 'Complete' },
    unknown: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, label: 'Unknown' },
};
function asArray(value) {
    if (Array.isArray(value))
        return value;
    if (typeof value === 'string' && value.length > 0)
        return [value];
    return [];
}
// Resolve a stored dimension string (which may be a label like 'Paid Search' or already a value
// like 'paid-search') to the Select option VALUE the drawer expects.
function toOptionValue(opts, stored) {
    if (!stored)
        return undefined;
    const byValue = opts.find(o => o.value === stored);
    if (byValue)
        return byValue.value;
    const byLabel = opts.find(o => o.label.toLowerCase() === stored.toLowerCase());
    if (byLabel)
        return byLabel.value;
    // Fall back to the raw stored string so an unknown value still displays.
    return stored;
}
// Adapt a mapped campaign into the shape MappingDrawer reads (advertiser already mapped).
function toDrawerCampaign(c) {
    return {
        id: c.id,
        platform: c.platform,
        advertiserName: c.advertiserName,
        advertiserBid: c.advertiserBid,
        externalAdvertiserName: c.advertiserName,
        externalAdvertiserId: c.advertiserBid,
        externalCampaignName: c.campaignName,
        externalCampaignId: c.id,
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: c.isFollowed,
        expandable: false,
        // Prefill the editor with this campaign's saved dimensions (it IS mapped).
        prefill: {
            tactic: toOptionValue(_mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.tacticOptions, c.tactic),
            subType: toOptionValue(_mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.subTypeOptions, c.subType),
            language: toOptionValue(_mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.languageOptions, c.language),
        },
    };
}
function CampaignsTable({ advertiserBid, showBreadcrumb = false }) {
    // Read-only role (not admin/standard): view-only — drawers open read-only, no edit/delete (UX-1.4).
    const { isAdmin, isStandard } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__.useAuth)();
    const isReadOnly = !(isAdmin || isStandard);
    const scoped = !!advertiserBid;
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Prototype-local list so a delete can remove a row. When scoped to an advertiser, pre-filter.
    const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(advertiserBid ? _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.mappedCampaigns.filter(c => c.advertiserBid === advertiserBid) : _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.mappedCampaigns);
    const [deleteTarget, setDeleteTarget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [drawerOpen, setDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [activeType, setActiveType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeCampaign, setActiveCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editTarget, setEditTarget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [offersOpen, setOffersOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [offersCampaign, setOffersCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [quickOpen, setQuickOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Pagination for the lightweight scoped (advertiser-tab) table (module page uses its own).
    const [scopedPage, setScopedPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const scopedPageSize = 10;
    // Platform filter (ToggleTab) for the scoped tab: 'all' or a specific platform.
    const [scopedPlatform, setScopedPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const openEdit = (c) => {
        setEditTarget(c);
        setActiveCampaign(toDrawerCampaign(c));
        setActiveType('campaign');
        setDrawerOpen(true);
    };
    const openOffers = (c) => {
        setOffersCampaign(toDrawerCampaign(c));
        setOffersOpen(true);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
        setActiveType(null);
        setActiveCampaign(null);
        setEditTarget(null);
    };
    const closeOffers = () => {
        setOffersOpen(false);
        setOffersCampaign(null);
    };
    const kebabItems = (c) => [
        { key: 'edit', label: isReadOnly ? 'View mapping' : 'Edit mapping', onClick: () => openEdit(c) },
        { key: 'offers', label: isReadOnly ? 'View offers' : 'Offers', onClick: () => openOffers(c) },
        // Delete is offered for ANY campaign regardless of status (Req 9, revised) — never for read-only.
        // The confirmation dialog states explicitly when the campaign has offers or is Green.
        ...(!isReadOnly
            ? [{ key: 'delete', label: 'Delete mapping', danger: true, onClick: () => setDeleteTarget(c) }]
            : []),
    ];
    const columns = [
        {
            title: 'Mapping Status',
            dataIndex: 'mappingStatus',
            key: 'mappingStatus',
            width: '8%',
            align: 'center',
            render: (status) => {
                // Solid icons: green check = DWI-confirmed; grey X = saved/awaiting backend; red X = 48h elapsed.
                const cfg = status === 'green'
                    ? { name: 'checkCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60, label: 'Confirmed' }
                    : status === 'red'
                        ? { name: 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60, label: 'Not confirmed after 48h' }
                        : { name: 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, label: 'Awaiting backend confirmation' };
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: `Mapping status: ${cfg.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": `Mapping status: ${cfg.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: cfg.name, color: cfg.color, width: 18, height: 18 }) }) }));
            },
        },
        {
            title: 'Advertiser (BPID)',
            dataIndex: 'advertiserBid',
            key: 'advertiserBid',
            width: '20%',
            ellipsis: true,
            render: (_, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.TwoLineCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: record.advertiserName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.SubText, { children: record.advertiserBid })] })),
        },
        { title: 'Platform', dataIndex: 'platform', key: 'platform', width: '10%', render: (platform) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformLabel)(platform) }) },
        {
            title: 'Reporting Platform',
            dataIndex: 'reportingPlatform',
            key: 'reportingPlatform',
            width: '12%',
            render: (rp) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: rp }),
        },
        {
            title: 'Campaign Name',
            dataIndex: 'campaignName',
            key: 'campaignName',
            width: '26%',
            ellipsis: true,
            render: (_, record) => {
                const cs = campaignStatusConfig[record.campaignStatus];
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.NameCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: `Campaign Status in Platform : ${cs.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: cs.color, "aria-label": `Campaign status: ${cs.label}` }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.NameLink, { type: 'button', onClick: () => openEdit(record), children: record.campaignName })] }));
            },
        },
        { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', width: '12%' },
        { title: 'Sub-Type', dataIndex: 'subType', key: 'subType', width: '12%' },
        { title: 'Language', dataIndex: 'language', key: 'language', width: '8%' },
        {
            title: 'Offers',
            dataIndex: 'offersMapping',
            key: 'offersMapping',
            width: '8%',
            align: 'center',
            render: (state, record) => {
                // WIHP / DerbySoft: offer mapping not available → grey ban.
                if (!(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(record.platform)) {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Offer mapping does not exist for this platform', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": 'Offers: not applicable', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'ban', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, width: 18, height: 18 }) }) }));
                }
                // Offers require a Green (DWI-confirmed) campaign (Req 8.1/8.3). Grey/Red → disabled grey X.
                if (record.mappingStatus !== 'green') {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Campaign must be confirmed (Green) before offers can be mapped', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": 'Offers: unavailable until the campaign is confirmed', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'timesCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, width: 18, height: 18 }) }) }));
                }
                // Green campaign → 3-dot rollup. With offers: counts; without offers: a dash per status.
                const c = record.offerCounts;
                const total = c.green + c.grey + c.red;
                const hasOffers = total > 0;
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: hasOffers
                        ? `Offers: ${c.green} confirmed · ${c.grey} awaiting · ${c.red} attention — click to view/edit`
                        : 'No offers yet — click to map', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotsBtn, { type: 'button', "aria-label": hasOffers ? `View offers for ${record.campaignName}` : `Map offers for ${record.campaignName}`, onClick: () => openOffers(record), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60 }), " ", c.green] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50 }), " ", c.grey] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60 }), " ", c.red] })] }) }));
            },
        },
        {
            key: 'actions',
            align: 'center',
            width: '4%',
            render: (_, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.DropdownMenu, { items: kebabItems(record), menuType: 'kebab', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.IconButton, { id: `campaign-${record.id}-actions-btn`, iconName: 'ellipsisVertical', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_80 }) })),
        },
    ];
    const makeMultiSelect = (id, label, options) => ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: id, label: label, mode: 'multiple', showSearch: true, placeholder: 'Select', options: options, value: asArray(value), onChange: (v) => setValue(v) }));
    const allFilterItems = [
        // Filters mirror the column order: Mapping Status · Advertiser (BPID) · Platform ·
        // Campaign Name · Tactic · Sub-Type · Language. Campaign Name is a free-text input.
        {
            name: 'mappingStatus',
            label: 'Mapping Status',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.statusOptions,
            renderControl: makeMultiSelect('campaign-mapping-status-sel', 'Mapping Status', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.statusOptions),
        },
        {
            name: 'advertiserBid',
            label: 'Advertiser (BPID)',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.advertiserOptions,
            renderControl: makeMultiSelect('campaign-advertiser-sel', 'Advertiser (BPID)', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.advertiserOptions),
        },
        {
            name: 'platform',
            label: 'Platform',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.platformOptions,
            renderControl: makeMultiSelect('campaign-platform-sel', 'Platform', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.platformOptions),
        },
        {
            name: 'reportingPlatform',
            label: 'Reporting Platform',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.reportingPlatformOptions,
            renderControl: makeMultiSelect('campaign-reporting-platform-sel', 'Reporting Platform', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.reportingPlatformOptions),
        },
        {
            name: 'campaignName',
            label: 'Campaign Name',
            placement: 'banner',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'campaign-name-inp', label: 'Campaign Name', placeholder: 'Campaign Name', value: typeof value === 'string' ? value : '', onChange: e => setValue(e.target.value) })),
        },
        {
            name: 'campaignStatus',
            label: 'Campaign Status',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.campaignStatusOptions,
            renderControl: makeMultiSelect('campaign-status-sel', 'Campaign Status', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.campaignStatusOptions),
        },
        {
            name: 'tactic',
            label: 'Tactic',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.tacticOptions,
            renderControl: makeMultiSelect('campaign-tactic-sel', 'Tactic', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.tacticOptions),
        },
        {
            name: 'subType',
            label: 'Sub-Type',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.subTypeOptions,
            renderControl: makeMultiSelect('campaign-subtype-sel', 'Sub-Type', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.subTypeOptions),
        },
        {
            name: 'language',
            label: 'Language',
            type: 'multiple',
            placement: 'banner',
            options: _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.languageOptions,
            renderControl: makeMultiSelect('campaign-language-sel', 'Language', _mockData_campaigns__WEBPACK_IMPORTED_MODULE_6__.languageOptions),
        },
        {
            name: 'scope',
            label: 'Scope',
            type: 'single',
            placement: 'header',
            showInTags: false,
            renderControl: ({ value, setValue }) => {
                const current = typeof value === 'string' && value.length > 0 ? value : 'my';
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.ToggleTab, { value: current, onChange: (v) => setValue(String(v)), options: [
                        { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'campaign-scope-my-txt', children: "My Campaigns" }), value: 'my' },
                        { label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'campaign-scope-all-txt', children: "All Campaigns" }), value: 'all' },
                    ] }));
            },
        },
    ];
    // Scoped (advertiser) view: no filter banner at all — the tab already shows exactly this
    // advertiser's campaigns (keep only the table search + the Map Campaign action).
    const filterItems = scoped ? [] : allFilterItems;
    const initialFilters = scoped
        ? { scope: 'all' }
        : { scope: 'my' };
    const queryFn = async (filters, pagination) => {
        const f = (filters ?? {});
        const platforms = asArray(f.platform);
        const reportingPlatforms = asArray(f.reportingPlatform);
        const advertisers = asArray(f.advertiserBid);
        const tactics = asArray(f.tactic);
        const subTypes = asArray(f.subType);
        const campStatuses = asArray(f.campaignStatus);
        const mapStatuses = asArray(f.mappingStatus);
        const languages = asArray(f.language);
        const nameText = typeof f.campaignName === 'string' ? f.campaignName.trim().toLowerCase() : '';
        const scope = (scoped ? 'all' : typeof f.scope === 'string' ? f.scope : 'my');
        const search = typeof f.search === 'string' ? f.search.trim().toLowerCase() : '';
        const filtered = rows.filter(c => {
            if (platforms.length > 0 && !platforms.includes(c.platform))
                return false;
            if (reportingPlatforms.length > 0 && !reportingPlatforms.includes(c.reportingPlatform))
                return false;
            if (advertisers.length > 0 && !advertisers.includes(c.advertiserBid))
                return false;
            if (tactics.length > 0 && !tactics.includes(c.tactic))
                return false;
            if (subTypes.length > 0 && !subTypes.includes(c.subType))
                return false;
            if (campStatuses.length > 0 && !campStatuses.includes(c.campaignStatus))
                return false;
            if (mapStatuses.length > 0 && !mapStatuses.includes(c.mappingStatus))
                return false;
            if (languages.length > 0 && !languages.includes(c.language))
                return false;
            if (nameText && !c.campaignName.toLowerCase().includes(nameText))
                return false;
            if (scope === 'my' && !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.rowIsFollowed)(c))
                return false;
            if (search) {
                const haystack = [c.platform, c.campaignName, c.advertiserName, c.advertiserBid, c.tactic, c.subType, c.language]
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(search))
                    return false;
            }
            return true;
        });
        // The Londoner Hotel (followed demo advertiser) always sits at the top.
        const ordered = (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_9__.londonerFirst)(filtered, c => c.advertiserBid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_8__.LONDONER.bpid);
        const pageSize = pagination?.pageSize ?? 10;
        const current = pagination?.current ?? 1;
        const start = (current - 1) * pageSize;
        return { data: ordered.slice(start, start + pageSize), total: ordered.length };
    };
    const titleButtons = isReadOnly ? null : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'campaign-map-btn', size: 'small', variant: scoped ? 'outlined' : 'solid', onClick: () => setQuickOpen(true), children: "Map Campaign" }));
    // Shared editors (drawers + delete modal) used by both the module page and the scoped tab.
    const drawers = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer__WEBPACK_IMPORTED_MODULE_10__["default"], { open: drawerOpen, mappingType: activeType, campaign: activeCampaign, readOnly: isReadOnly, onClose: closeDrawer, onSave: closeDrawer, onDelete: !isReadOnly && editTarget
                    ? () => {
                        const target = editTarget;
                        closeDrawer();
                        setDeleteTarget(target);
                    }
                    : undefined }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer__WEBPACK_IMPORTED_MODULE_11__["default"], { open: offersOpen, campaign: offersCampaign, readOnly: isReadOnly, onClose: closeOffers }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Modal, { idPrefix: 'campaign-delete', title: 'Delete campaign mapping', open: !!deleteTarget, okText: 'Delete', cancelText: 'Cancel', onCancel: () => setDeleteTarget(null), onOk: () => {
                    if (deleteTarget) {
                        setRows(prev => prev.filter(r => r.id !== deleteTarget.id));
                        setDeleteTarget(null);
                        // Only the module page has the TableWithFilterBanner ref to refetch.
                        if (!scoped)
                            setTimeout(() => tableRef.current?.refetchWithFilters(), 0);
                    }
                }, children: (() => {
                    if (!deleteTarget)
                        return null;
                    const counts = deleteTarget.offerCounts;
                    const hasOffers = deleteTarget.offersMapping === 'mapped' || counts.green + counts.grey + counts.red > 0;
                    const isGreen = deleteTarget.mappingStatus === 'green';
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: ["Delete the mapping for ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: deleteTarget.campaignName }), "? This removes the campaign mapping.", hasOffers && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [' ', "This campaign has ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: "mapped offers" }), ", which will also be deleted."] })), isGreen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [' ', "This campaign is ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: "Green" }), " (DWI-confirmed) \u2014 deleting it removes a confirmed mapping."] }))] }));
                })() }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer__WEBPACK_IMPORTED_MODULE_12__["default"], { open: quickOpen, readOnly: isReadOnly, onClose: () => setQuickOpen(false) })] }));
    const DASH = '\u2013';
    // Open the mapping drawer for a still-unmapped campaign (campaign mapping only — advertiser
    // is already mapped). Reuses the Unmapped flow's drawer.
    const openUnmappedEdit = (c) => {
        setActiveCampaign(c);
        setActiveType('campaign');
        setDrawerOpen(true);
    };
    const scopedColumns = [
        {
            title: 'Mapping Status',
            key: 'mappingStatus',
            width: '8%',
            align: 'center',
            render: (_, row) => {
                if (row.kind === 'unmapped') {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Campaign mapping: Unmapped \u2014 click the name to map', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": 'Campaign mapping: unmapped', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'timesCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60, width: 18, height: 18 }) }) }));
                }
                const status = row.src.mappingStatus;
                const cfg = status === 'green'
                    ? { name: 'checkCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60, label: 'Confirmed' }
                    : status === 'red'
                        ? { name: 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60, label: 'Not confirmed after 48h' }
                        : { name: 'timesCircleSolid', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, label: 'Awaiting backend confirmation' };
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: `Mapping status: ${cfg.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": `Mapping status: ${cfg.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: cfg.name, color: cfg.color, width: 18, height: 18 }) }) }));
            },
        },
        { title: 'Platform', key: 'platform', width: '10%', render: (_, row) => (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformLabel)(row.src.platform) },
        {
            title: 'Reporting Platform',
            key: 'reportingPlatform',
            width: '12%',
            render: (_, row) => (row.kind === 'mapped' ? row.src.reportingPlatform : DASH),
        },
        {
            title: 'Campaign Name',
            key: 'campaignName',
            width: '28%',
            ellipsis: true,
            render: (_, row) => {
                if (row.kind === 'unmapped') {
                    // No internal Campaign Name yet (that's the generated Naming Convention String produced
                    // on mapping). Show the EXTERNAL campaign name + ID as a placeholder, click to map.
                    const extName = row.src.externalCampaignName === '-' ? row.src.externalAdvertiserName : row.src.externalCampaignName;
                    const extId = row.src.externalCampaignId === '-' ? row.src.externalAdvertiserId : row.src.externalCampaignId;
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.NameCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Not yet mapped \u2014 external campaign (click to map)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60, "aria-label": 'Unmapped' }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.TwoLineCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.PlaceholderNameLink, { type: 'button', onClick: () => openUnmappedEdit(row.src), children: extName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.SubText, { children: extId })] })] }));
                }
                const cs = campaignStatusConfig[row.src.campaignStatus];
                const c = row.src;
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.NameCell, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: `Campaign Status in Platform : ${cs.label}`, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: cs.color, "aria-label": `Campaign status: ${cs.label}` }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.NameLink, { type: 'button', onClick: () => openEdit(c), children: c.campaignName })] }));
            },
        },
        {
            title: 'Tactic',
            key: 'tactic',
            width: '12%',
            render: (_, row) => (row.kind === 'mapped' ? row.src.tactic : DASH),
        },
        {
            title: 'Sub-Type',
            key: 'subType',
            width: '12%',
            render: (_, row) => (row.kind === 'mapped' ? row.src.subType : DASH),
        },
        {
            title: 'Language',
            key: 'language',
            width: '8%',
            render: (_, row) => (row.kind === 'mapped' ? row.src.language : DASH),
        },
        {
            title: 'Offers',
            key: 'offers',
            width: '8%',
            align: 'center',
            render: (_, row) => {
                // Unmapped campaigns have no offers yet (offers require a Green mapping) — show a dash.
                if (row.kind === 'unmapped')
                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: DASH });
                const record = row.src;
                if (!(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformSupportsOffers)(record.platform)) {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Offer mapping does not exist for this platform', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": 'Offers: not applicable', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'ban', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, width: 18, height: 18 }) }) }));
                }
                if (record.mappingStatus !== 'green') {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Campaign must be confirmed (Green) before offers can be mapped', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusIconDisabled, { "aria-label": 'Offers: unavailable until the campaign is confirmed', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'timesCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, width: 18, height: 18 }) }) }));
                }
                const cnt = record.offerCounts;
                const hasOffers = cnt.green + cnt.grey + cnt.red > 0;
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], { title: hasOffers ? `Offers: ${cnt.green} confirmed · ${cnt.grey} awaiting · ${cnt.red} attention` : 'No offers yet — click to map', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotsBtn, { type: 'button', "aria-label": `Offers for ${record.campaignName}`, onClick: () => openOffers(record), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60 }), " ", cnt.green] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50 }), " ", cnt.grey] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.OfferDotCount, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60 }), " ", cnt.red] })] }) }));
            },
        },
        {
            key: 'actions',
            align: 'center',
            width: '4%',
            render: (_, row) => {
                const items = row.kind === 'unmapped'
                    ? [{ key: 'map', label: isReadOnly ? 'View mapping' : 'Map campaign', onClick: () => openUnmappedEdit(row.src) }]
                    : kebabItems(row.src);
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.DropdownMenu, { items: items, menuType: 'kebab', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.IconButton, { id: `advertiser-campaign-${row.kind}-actions-btn`, iconName: 'ellipsisVertical', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_80 }) }));
            },
        },
    ];
    // --- Scoped (advertiser Summary tab): one table of UNMAPPED (top) + MAPPED campaigns.
    if (scoped) {
        // Unmapped campaigns that belong to THIS advertiser: external advertiser already mapped to
        // this BPID (Step 1 done), campaign mapping still pending. Campaigns under an unmapped (or
        // multi-) external advertiser are NOT attributable to this advertiser, so they are excluded.
        const scopedUnmapped = _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.unmappedCampaigns.filter(c => c.advertiserBid === advertiserBid &&
            c.advertiserMapping === 'mapped' &&
            c.campaignMapping === 'unmapped' &&
            !(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.isMultipleAdvertisers)(c));
        // Platform ToggleTab options: 'All' + each platform present across mapped + unmapped rows.
        const platformsPresent = Array.from(new Set([...rows, ...scopedUnmapped].map(r => r.platform)));
        const platformTabs = [
            { label: 'All Campaigns', value: 'all' },
            ...platformsPresent.map(pf => ({ label: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_7__.platformLabel)(pf), value: pf })),
        ];
        const current = platformsPresent.includes(scopedPlatform) || scopedPlatform === 'all' ? scopedPlatform : 'all';
        const unmappedVisible = current === 'all' ? scopedUnmapped : scopedUnmapped.filter(c => c.platform === current);
        const mappedVisible = current === 'all' ? rows : rows.filter(r => r.platform === current);
        const allRows = [
            ...unmappedVisible.map(c => ({ kind: 'unmapped', src: c })),
            ...mappedVisible.map(c => ({ kind: 'mapped', src: c })),
        ];
        // Sort by the column order: Mapping Status (unmapped -> red -> grey -> green) -> Platform ->
        // Reporting Platform -> Tactic -> Sub-Type -> Language.
        const statusRank = (r) => r.kind === 'unmapped' ? 0 : { red: 1, grey: 2, green: 3 }[r.src.mappingStatus];
        const field = (r, key) => r.kind === 'mapped' ? r.src[key] : '';
        const merged = [...allRows].sort((a, b) => {
            let d = statusRank(a) - statusRank(b);
            if (d)
                return d;
            d = a.src.platform.localeCompare(b.src.platform);
            if (d)
                return d;
            d = field(a, 'reportingPlatform').localeCompare(field(b, 'reportingPlatform'));
            if (d)
                return d;
            d = field(a, 'tactic').localeCompare(field(b, 'tactic'));
            if (d)
                return d;
            d = field(a, 'subType').localeCompare(field(b, 'subType'));
            if (d)
                return d;
            return field(a, 'language').localeCompare(field(b, 'language'));
        });
        const total = merged.length;
        const start = (scopedPage - 1) * scopedPageSize;
        const pageRows = merged.slice(start, start + scopedPageSize);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.ScopedHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'advertiser-campaigns-ttl', children: "Campaigns" }), titleButtons] }), platformsPresent.length > 1 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.ScopedFilterRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.ToggleTab, { value: current, onChange: v => {
                            setScopedPlatform(String(v));
                            setScopedPage(1);
                        }, options: platformTabs }) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { id: 'advertiser-campaigns-tbl', cellsIdPrefix: 'advertiser-campaigns', rowKey: r => (r.kind === 'mapped' ? r.src.id : `um-${r.src.id}`), columns: scopedColumns, dataSource: pageRows, pagination: false }), total > scopedPageSize && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Pagination, { current: scopedPage, pageSize: scopedPageSize, total: total, showTotal: (tot, [, endItem]) => `${endItem} of ${tot} items`, onChange: p => setScopedPage(p) })), drawers] }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Campaigns_styled__WEBPACK_IMPORTED_MODULE_13__.CampaignsWrapper, { children: [showBreadcrumb && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: 'Campaigns' }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_3__["default"], { id: 'campaign-tbl', cellsIdPrefix: 'campaign', rowKey: 'id', ref: tableRef, sectionTitle: 'Campaigns', titleButtons: titleButtons, columns: columns, filterItems: filterItems, initialFilters: initialFilters, filterMode: 'server', queryFn: queryFn, tableSearch: { show: true, placeholder: 'Search' }, tableTitle: 'Campaigns Overview' }), drawers] }));
}
function CampaignsPage() {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CampaignsTable, { showBreadcrumb: true });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CampaignsPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.styled.tsx"
/*!********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.styled.tsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickColHead: () => (/* binding */ QuickColHead),
/* harmony export */   QuickColHeadGrid: () => (/* binding */ QuickColHeadGrid),
/* harmony export */   QuickDeleteBtn: () => (/* binding */ QuickDeleteBtn),
/* harmony export */   QuickGeneratedName: () => (/* binding */ QuickGeneratedName),
/* harmony export */   QuickHeaderRow: () => (/* binding */ QuickHeaderRow),
/* harmony export */   QuickRowGrid: () => (/* binding */ QuickRowGrid),
/* harmony export */   QuickRowNote: () => (/* binding */ QuickRowNote),
/* harmony export */   QuickRowNum: () => (/* binding */ QuickRowNum)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const QuickHeaderRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
// Single shared column template used by BOTH the header and the data rows so they line up.
// # · Campaign (wide) · Tactic · Sub-Type · Language · C1 · C2 · C3 · delete
const GRID_COLS = `28px minmax(260px, 2.2fr) 128px 128px 120px 96px 96px 96px 36px`;
const GRID_GAP = '8px';
const QuickColHeadGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: ${GRID_COLS};
  gap: ${GRID_GAP};
  align-items: end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
`;
const QuickColHead = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 14px;
  font-weight: 500;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  line-height: 18px;
  white-space: normal;
  overflow-wrap: anywhere;
`;
const QuickRowGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: ${GRID_COLS};
  gap: ${GRID_GAP};
  align-items: center;
  margin-top: 12px;
`;
const QuickRowNum = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-size: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  text-align: center;
`;
const QuickGeneratedName = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  margin: 4px 0 4px 36px;
`;
// The DWI 48h note for a typed/own Campaign ID. Rendered full-width BELOW the row grid (not inside
// the first grid cell) so it never stretches a column or pushes the delete button onto a new line.
const QuickRowNote = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].p `
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  line-height: 16px;
  margin: 4px 0 0 36px;
`;
const QuickDeleteBtn = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};

  &:hover:not(:disabled) {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.crimson_60};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.tsx"
/*!*************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.tsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MappingDrawer.styled */ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.styled.tsx");
/* harmony import */ var antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/es/input/TextArea */ "./node_modules/antd/es/input/TextArea.js");
/* harmony import */ var _QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QuickCampaignsDrawer.styled */ "./apps/mediahub-ui/pages/CampaignMapping/QuickCampaignsDrawer.styled.tsx");







const platformOptions = [
    { label: 'SA360', value: 'SA360' },
    { label: 'CM360', value: 'CM360' },
    { label: 'Meta (Facebook)', value: 'Meta' },
    { label: 'DerbySoft', value: 'DerbySoft' },
    { label: 'WIHP', value: 'WIHP' },
];
// Bulk mapping (multiple campaigns / Add Campaign) is only for SA360 / CM360 / Meta (UX-7.1).
// WIHP and DerbySoft map a single campaign at a time.
const BULK_PLATFORMS = new Set(['SA360', 'CM360', 'Meta']);
const MAX_ROWS = 20;
const emptyRow = (id) => ({
    id,
    externalName: '',
    custom1: '',
    custom2: '',
    custom3: '',
});
const OWN_ID_PREFIX = '__own__:';
// Per-row Campaign ID combo: pick from the DWI available-to-map list, or type a new ID.
// Hoisted to module scope so it keeps a stable identity across parent renders.
function CampaignIdCombo({ id, value, placeholder, disabled, excludeValues, onPick, }) {
    const [term, setTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const options = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const t = term.trim();
        // A campaign can only be mapped once — hide IDs already picked in other rows (but keep this
        // row's own current value visible).
        const list = _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.availableToMapCampaignIds.filter(o => o.value === value || !excludeValues.has(o.value));
        const inList = list.some(o => o.value.toLowerCase() === t.toLowerCase());
        const ownOpt = t && !inList ? [{ label: t, value: `${OWN_ID_PREFIX}${t}` }] : [];
        return [...ownOpt, ...list];
    }, [term, value, excludeValues]);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: id, showSearch: true, allowClear: true, placeholder: placeholder, options: options, value: value, disabled: disabled, onChange: v => onPick(v), onSearch: setTerm, searchBy: 'label', notFoundContent: 'Type to add a Campaign ID' }));
}
// Read-only hard-coded field rendered as a disabled DF Input so its label matches the editable
// fields exactly (same type scale/spacing as Tactic/Custom selects/inputs).
function SReadOnly({ id, label, value }) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: id, label: label, value: value, disabled: true });
}
function QuickCampaignsDrawer({ open, readOnly = false, onClose }) {
    const [platform, setPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [bpid, setBpid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [extAdvertiser, setExtAdvertiser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([emptyRow(1)]);
    // Single-campaign state for DerbySoft / WIHP (they don't use the bulk table).
    const [singleCampaign, setSingleCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [wihpTactic, setWihpTactic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [derbyTactic, setDerbyTactic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [paidSearchId, setPaidSearchId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [paidSearchIds, setPaidSearchIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [sCustom1, setSCustom1] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [sCustom2, setSCustom2] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [sCustom3, setSCustom3] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (open) {
            setPlatform(undefined);
            setBpid(undefined);
            setExtAdvertiser(undefined);
            setRows([emptyRow(1)]);
            setSingleCampaign(undefined);
            setWihpTactic(undefined);
            setDerbyTactic(undefined);
            setPaidSearchId('');
            setPaidSearchIds('');
            setSCustom1('');
            setSCustom2('');
            setSCustom3('');
        }
    }, [open]);
    const addRow = () => {
        if (!!platform && !BULK_PLATFORMS.has(platform))
            return;
        setRows(prev => (prev.length >= MAX_ROWS ? prev : [...prev, emptyRow((prev[prev.length - 1]?.id ?? 0) + 1)]));
    };
    const removeRow = (id) => setRows(prev => (prev.length === 1 ? prev : prev.filter(r => r.id !== id)));
    const update = (id, patch) => setRows(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
    const platformChosen = !!platform;
    const supportsBulk = !!platform && BULK_PLATFORMS.has(platform);
    const platformDisplay = platform ? (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.platformLabel)(platform) : 'Platform';
    // The per-platform mapping-unit name, e.g. 'Placement' (CM360), 'AdSet' (Meta), else 'Campaign'.
    const unitLabel = `${platformDisplay} ${(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.mappingUnitName)(platform)}`;
    // Rows are enabled once the shared context (platform + advertiser + external advertiser) is set.
    const contextReady = !!platform && !!bpid && !!extAdvertiser && !readOnly;
    const generatedName = (r) => {
        const parts = [(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.advertiserNameForBpid)(bpid), r.tactic, r.subType, r.language, r.custom1, r.custom2, r.custom3].filter(Boolean);
        return parts.length ? parts.join('_') : '-';
    };
    // Mandatory-dimension validation for Save (Req 5.9/5.12 applied to Quick Campaigns):
    //  - bulk (SA360/CM360/Meta): ≥1 row with a campaign ID, and EVERY row that has a campaign ID
    //    must have Tactic + Sub-Type + Language.
    //  - DerbySoft single: campaign + backend Tactic (dropdown) + mandatory Paid Search ID (Req 6, revised).
    //  - WIHP single: a campaign must be selected (Tactic/Sub-Type/Language hard-coded;
    //    WIHP additionally needs ≥1 Paid Search ID).
    const canSaveQuick = (() => {
        if (!contextReady)
            return false;
        if (supportsBulk) {
            const filled = rows.filter(r => r.externalName);
            if (filled.length === 0)
                return false;
            return filled.every(r => r.tactic && r.subType && r.language);
        }
        if (platform === 'WIHP')
            return !!singleCampaign && paidSearchIds.trim().length > 0;
        if (platform === 'DerbySoft')
            return !!singleCampaign && !!derbyTactic && paidSearchId.trim().length > 0;
        return false;
    })();
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { id: 'quick-campaigns-drawer', title: 'Map Campaign', placement: 'right', width: '1200px', onClose: onClose, open: open, destroyOnClose: true, styles: { body: { padding: 0, display: 'flex', flexDirection: 'column' }, header: { background: 'transparent' } }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.DrawerContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'quick-campaigns-drawer_settings-ttl', children: "Mapping Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_bpid-sel', label: 'Advertiser (BPID)', required: true, showSearch: true, placeholder: 'Advertiser Name', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.bpidSelectOptions, value: bpid, disabled: readOnly, onChange: v => setBpid(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.FieldGridTwo, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_platform-sel', label: 'Platform', required: true, placeholder: 'Select a platform', options: platformOptions, value: platform, disabled: readOnly, onChange: v => {
                                            const next = v;
                                            setPlatform(next);
                                            // External advertiser + available campaigns depend on the platform — reset them.
                                            setExtAdvertiser(undefined);
                                            setRows(prev => (BULK_PLATFORMS.has(next) ? prev : prev.slice(0, 1)).map(r => ({ ...r, externalName: '' })));
                                        } }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_ext-advertiser-sel', label: `${platformDisplay} Advertiser`, required: true, showSearch: true, placeholder: 'Select an external advertiser', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.externalAdvertiserSelectOptions, value: extAdvertiser, disabled: !platformChosen || readOnly, onChange: v => setExtAdvertiser(v) })] })] }), supportsBulk ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'quick-campaigns-drawer_campaigns-ttl', children: ["Campaigns (", rows.length, ")"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'quick-campaigns-drawer_add-btn', variant: 'outlined', size: 'small', onClick: addRow, disabled: !contextReady || !supportsBulk || rows.length >= MAX_ROWS, children: "Add Campaign" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHeadGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: [unitLabel, " *"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Tactic *" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Sub-Type *" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Language *" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Custom 1" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Custom 2" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, { children: "Custom 3" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickColHead, {})] }), rows.map((r, idx) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickRowGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickRowNum, { children: idx + 1 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CampaignIdCombo, { id: `quick-campaigns-drawer_campaign-${r.id}-sel`, placeholder: unitLabel, disabled: !contextReady, value: r.externalName || undefined, excludeValues: new Set(rows.filter(o => o.id !== r.id && o.externalName).map(o => o.externalName)), onPick: v => update(r.id, { externalName: v ?? '' }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.tacticOptions, value: r.tactic, disabled: !contextReady, onChange: v => update(r.id, { tactic: v }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.subTypeOptions, value: r.subType, disabled: !contextReady, onChange: v => update(r.id, { subType: v }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.languageOptions, value: r.language, disabled: !contextReady, onChange: v => update(r.id, { language: v }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: '-', disabled: !contextReady, value: r.custom1, onChange: e => update(r.id, { custom1: e.target.value }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: '-', disabled: !contextReady, value: r.custom2, onChange: e => update(r.id, { custom2: e.target.value }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: '-', disabled: !contextReady, value: r.custom3, onChange: e => update(r.id, { custom3: e.target.value }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickDeleteBtn, { type: 'button', "aria-label": `Remove campaign ${idx + 1}`, disabled: rows.length === 1, onClick: () => removeRow(r.id), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'trashCan', width: 16, height: 16 }) })] }), !!r.externalName && r.externalName.startsWith(OWN_ID_PREFIX) && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickRowNote, { children: "Once the campaign is available in the backend the mapping will be complete. This can take up to 48 hours." })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickGeneratedName, { children: ["Campaign Name: ", generatedName(r)] })] }, r.id)))] })) : platform === 'DerbySoft' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'quick-campaigns-drawer_derby-ttl', children: "Campaign Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_derby-campaign-sel', label: 'DerbySoft Campaign', required: true, showSearch: true, placeholder: 'Select a DerbySoft campaign', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.derbyCampaignOptions, value: singleCampaign, disabled: !contextReady, onChange: v => setSingleCampaign(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_derby-paid-search-inp', label: 'Paid Search ID', required: true, placeholder: 'Enter the Paid Search ID', disabled: !contextReady, value: paidSearchId, onChange: e => setPaidSearchId(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_derby-tactic-sel', label: 'Tactic', required: true, placeholder: 'Select a tactic', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.derbyTacticOptions, value: derbyTactic, disabled: !contextReady, onChange: v => setDerbyTactic(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SReadOnly, { id: 'quick-campaigns-drawer_derby-subtype-ro', label: 'Sub-Type', value: 'Metasearch' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SReadOnly, { id: 'quick-campaigns-drawer_derby-lang-ro', label: 'Language', value: 'EN' })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_derby-c1-inp', label: 'Custom 1', placeholder: '-', disabled: !contextReady, value: sCustom1, onChange: e => setSCustom1(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_derby-c2-inp', label: 'Custom 2', placeholder: '-', disabled: !contextReady, value: sCustom2, onChange: e => setSCustom2(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_derby-c3-inp', label: 'Custom 3', placeholder: '-', disabled: !contextReady, value: sCustom3, onChange: e => setSCustom3(e.target.value) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickGeneratedName, { children: ["Campaign Name: ", [(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.advertiserNameForBpid)(bpid), derbyTactic, 'Metasearch', 'EN', sCustom1, sCustom2, sCustom3].filter(Boolean).join('_') || '-'] })] })) : platform === 'WIHP' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'quick-campaigns-drawer_wihp-ttl', children: "Campaign Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'quick-campaigns-drawer_wihp-campaign-sel', label: 'WIHP Campaign', required: true, showSearch: true, placeholder: 'Select a WIHP campaign', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.wihpFakeCampaignOptions, value: singleCampaign, disabled: !contextReady, onChange: v => {
                                    const val = v;
                                    setSingleCampaign(val);
                                    // Tactic is auto-derived from the selected fake campaign and non-editable.
                                    setWihpTactic(_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.wihpFakeCampaignOptions.find(o => o.value === val)?.tactic);
                                } }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.ReadOnlyField, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.ReadOnlyLabel, { children: "Paid Search IDs" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_5__["default"], { id: 'quick-campaigns-drawer_wihp-paid-search-txt', placeholder: 'Add one or more Paid Search IDs', rows: 3, disabled: !contextReady, value: paidSearchIds, onChange: e => setPaidSearchIds(e.target.value) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SReadOnly, { id: 'quick-campaigns-drawer_wihp-tactic-ro', label: 'Tactic', value: wihpTactic ?? '-' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SReadOnly, { id: 'quick-campaigns-drawer_wihp-subtype-ro', label: 'Sub-Type', value: 'Metasearch' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SReadOnly, { id: 'quick-campaigns-drawer_wihp-lang-ro', label: 'Language', value: 'EN' })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_wihp-c1-inp', label: 'Custom 1', placeholder: '-', disabled: !contextReady, value: sCustom1, onChange: e => setSCustom1(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_wihp-c2-inp', label: 'Custom 2', placeholder: '-', disabled: !contextReady, value: sCustom2, onChange: e => setSCustom2(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'quick-campaigns-drawer_wihp-c3-inp', label: 'Custom 3', placeholder: '-', disabled: !contextReady, value: sCustom3, onChange: e => setSCustom3(e.target.value) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_QuickCampaignsDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.QuickGeneratedName, { children: ["Campaign Name: ", [(0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_3__.advertiserNameForBpid)(bpid), wihpTactic, 'Metasearch', 'EN', sCustom1, sCustom2, sCustom3].filter(Boolean).join('_') || '-'] })] })) : null] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_4__.DrawerFooter, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'quick-campaigns-drawer_cancel-btn', variant: 'outlined', onClick: onClose, children: readOnly ? 'Close' : 'Cancel' }), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'quick-campaigns-drawer_save-btn', onClick: onClose, disabled: !canSaveQuick, children: "Save" }))] })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickCampaignsDrawer);


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/campaignsIndex.ts"
/*!******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/campaignsIndex.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Campaigns__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Campaigns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Campaigns */ "./apps/mediahub-ui/pages/CampaignMapping/Campaigns.tsx");



/***/ }

}]);
//# sourceMappingURL=campaigns.f1775a842efd19dbf68a.js.map