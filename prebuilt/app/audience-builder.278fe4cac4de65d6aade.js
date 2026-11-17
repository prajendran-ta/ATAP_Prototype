"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["audience-builder"],{

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.styled.tsx"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.styled.tsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudienceBuilderDetailsWrapper: () => (/* binding */ AudienceBuilderDetailsWrapper),
/* harmony export */   AudienceBuilderWrapper: () => (/* binding */ AudienceBuilderWrapper),
/* harmony export */   CardHeaderRow: () => (/* binding */ CardHeaderRow),
/* harmony export */   CriteriaAndDivider: () => (/* binding */ CriteriaAndDivider),
/* harmony export */   CriteriaMainRow: () => (/* binding */ CriteriaMainRow),
/* harmony export */   CriteriaRemoveBtnWrap: () => (/* binding */ CriteriaRemoveBtnWrap),
/* harmony export */   CriteriaRow: () => (/* binding */ CriteriaRow),
/* harmony export */   CriteriaTypeWrap: () => (/* binding */ CriteriaTypeWrap),
/* harmony export */   CriteriaValueWrap: () => (/* binding */ CriteriaValueWrap),
/* harmony export */   PlaceSelectionChevron: () => (/* binding */ PlaceSelectionChevron),
/* harmony export */   PlaceSelectionCount: () => (/* binding */ PlaceSelectionCount),
/* harmony export */   PlaceSelectionFooter: () => (/* binding */ PlaceSelectionFooter),
/* harmony export */   PlaceSelectionList: () => (/* binding */ PlaceSelectionList),
/* harmony export */   PlaceSelectionPath: () => (/* binding */ PlaceSelectionPath),
/* harmony export */   PlaceSelectionRow: () => (/* binding */ PlaceSelectionRow),
/* harmony export */   RuleFooterActions: () => (/* binding */ RuleFooterActions),
/* harmony export */   RuleFooterButtons: () => (/* binding */ RuleFooterButtons),
/* harmony export */   RuleSummaryCard: () => (/* binding */ RuleSummaryCard),
/* harmony export */   RuleSummaryChips: () => (/* binding */ RuleSummaryChips),
/* harmony export */   RuleSummaryEmpty: () => (/* binding */ RuleSummaryEmpty),
/* harmony export */   RuleSummaryItem: () => (/* binding */ RuleSummaryItem),
/* harmony export */   RuleSummaryList: () => (/* binding */ RuleSummaryList),
/* harmony export */   StickyFooterContainer: () => (/* binding */ StickyFooterContainer)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const AudienceBuilderWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
`;
const AudienceBuilderDetailsWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
`;
const StickyFooterContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 12px;
`;
const RuleFooterActions = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const RuleFooterButtons = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;
const CriteriaRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-start;
  gap: 16px;

  > * {
    flex: 1;
  }
`;
const CriteriaMainRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;
const CriteriaTypeWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1;
`;
const CriteriaValueWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 2;
`;
const CriteriaRemoveBtnWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 0 0 auto;
  align-self: flex-start;
  padding-top: 0;
`;
const CardHeaderRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`;
// Visual hierarchy for nested place rows: continent/country -> region -> city.
const PLACE_ROW_DEPTH_BACKGROUND = [_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_10, _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_10, _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0];
const PlaceSelectionList = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin-top: 8px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
`;
const PlaceSelectionRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  padding-left: ${({ depth = 0 }) => 12 + depth * 20}px;
  background: ${({ depth = 0, summary }) => summary ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_10 : PLACE_ROW_DEPTH_BACKGROUND[Math.min(depth, PLACE_ROW_DEPTH_BACKGROUND.length - 1)]};
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};

  &:last-child {
    border-bottom: none;
  }
`;
const PlaceSelectionChevron = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  transition: transform 0.15s ease;
`;
const PlaceSelectionPath = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const PlaceSelectionCount = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  flex-shrink: 0;
`;
const PlaceSelectionFooter = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin-top: 6px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  font-size: 12px;
`;
const CriteriaAndDivider = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  }
`;
const RuleSummaryCard = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_10};
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 8px;
  padding: 18px 24px;
  margin: 16px 0;
`;
const RuleSummaryList = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].ol `
  margin: 12px 0 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const RuleSummaryItem = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].li `
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const RuleSummaryChips = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const RuleSummaryEmpty = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin-top: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  font-size: 13px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.tsx"
/*!********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.tsx ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters */ "./apps/mediahub-ui/components/TableWithFilters/index.ts");
/* harmony import */ var _AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AudienceBuilder.styled */ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.styled.tsx");
/* harmony import */ var _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockAudienceRules */ "./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts");
/* harmony import */ var _Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Audience/mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _Audience_Audience_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Audience/Audience.styled */ "./apps/mediahub-ui/pages/Audience/Audience.styled.tsx");
/* harmony import */ var _shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/audienceRuleStore */ "./apps/mediahub-ui/shared/audienceRuleStore.ts");
/* harmony import */ var _shared_audienceStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/audienceStore */ "./apps/mediahub-ui/shared/audienceStore.ts");












function AudienceBuilderPage() {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [rules] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
        const sharedRules = (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_9__.getSharedRules)();
        (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_9__.setSharedRules)(sharedRules);
        return sharedRules;
    });
    const [usageRuleId, setUsageRuleId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [usageSearch, setUsageSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [usagePage, setUsagePage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const availableAudiences = (0,_shared_audienceStore__WEBPACK_IMPORTED_MODULE_10__.getSharedAudiences)();
    const audienceRecords = availableAudiences.length > 0 ? availableAudiences : _Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_7__.MOCK_AUDIENCES;
    const usageAudiences = usageRuleId
        ? audienceRecords
            .filter(audience => audience.audienceRuleIds.includes(usageRuleId))
            .map(({ id, advertiser, audienceName }) => ({ id, advertiser, audienceName }))
        : [];
    const filteredUsageAudiences = usageAudiences.filter(audience => {
        const search = usageSearch.trim().toLowerCase();
        return !search || audience.advertiser.toLowerCase().includes(search) || audience.audienceName.toLowerCase().includes(search);
    });
    const pagedUsageAudiences = filteredUsageAudiences.slice((usagePage - 1) * 10, usagePage * 10);
    const ruleNameOptions = rules.map(rule => ({ label: rule.ruleName, value: rule.ruleName }));
    const handleRuleClick = (ruleId) => {
        navigate(`/audience-builder/${ruleId}`);
    };
    const handleUsageClick = (ruleId) => {
        setUsageRuleId(ruleId);
        setUsageSearch('');
        setUsagePage(1);
    };
    const columns = [
        {
            title: 'Rule Name',
            dataIndex: 'ruleName',
            key: 'ruleName',
            width: 'auto',
            ellipsis: true,
            render: (value, record, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: `audience_builder-open-${index}-btn`, variant: 'text', onClick: () => handleRuleClick(record.id), children: value })),
        },
        {
            title: 'Travel Intent Category',
            dataIndex: 'travelIntentCategory',
            key: 'travelIntentCategory',
            width: '25%',
            ellipsis: true,
            render: (value) => _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.TRAVEL_INTENT_CATEGORY_LABEL[value] ?? value,
        },
        {
            title: 'Used in Audiences',
            dataIndex: 'usedInAudiences',
            key: 'usedInAudiences',
            width: '20%',
            ellipsis: true,
            render: (value, record) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: `audience_builder-used_in_audiences-${record.id}-btn`, variant: 'text', disabled: value === 0, onClick: () => handleUsageClick(record.id), children: [value, " ", value === 1 ? 'audience' : 'audiences'] })),
        },
    ];
    const filterItems = [
        {
            name: 'ruleName',
            label: 'Rule Name',
            type: 'multiple',
            options: ruleNameOptions,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: 'Rule Name', id: 'audience_builder-rule_name_filter-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: (v) => setValue(v), options: ruleNameOptions, allowClear: true })),
        },
        {
            name: 'travelIntentCategory',
            label: 'Travel Intent Category',
            type: 'multiple',
            options: _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.TRAVEL_INTENT_CATEGORY_OPTIONS,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: 'Travel Intent Category', id: 'audience_builder-travel_intent_category_filter-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: (v) => setValue(v), options: _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.TRAVEL_INTENT_CATEGORY_OPTIONS, allowClear: true })),
        },
    ];
    const queryFn = async () => ({
        data: rules.map(rule => ({
            ...rule,
            usedInAudiences: audienceRecords.filter(audience => audience.audienceRuleIds.includes(rule.id)).length,
            travelIntentCategoryLabel: _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.TRAVEL_INTENT_CATEGORY_LABEL[rule.travelIntentCategory] ?? rule.travelIntentCategory,
        })),
        total: rules.length,
    });
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceBuilderWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { id: 'audience_builder-breadcrumb-nav', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: 'Audience Rules' }] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters__WEBPACK_IMPORTED_MODULE_4__.TableWithFilterBanner, { ref: tableRef, sectionTitle: 'Audience Rules', titleButtons: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'audience_builder-add_rule-btn', variant: 'solid', onClick: () => navigate('/audience-builder/new'), children: "New Audience Rule" }), columns: columns, filterItems: filterItems, filterMode: 'client', clientSideFilters: ['ruleName', 'travelIntentCategory', 'search'], queryFn: queryFn, tableSearch: { show: true, placeholder: 'Search', keys: ['ruleName', 'travelIntentCategoryLabel', 'usedInAudiences'] }, tableTitle: 'Rules', id: 'audience_builder-tbl', cellsIdPrefix: 'audience_builder', rowKey: 'id' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Drawer, { id: 'audience_builder-usage-drawer', title: 'Used in Audiences', placement: 'right', width: '720px', open: usageRuleId !== null, onClose: () => { setUsageRuleId(null); setUsageSearch(''); setUsagePage(1); }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_Audience_styled__WEBPACK_IMPORTED_MODULE_8__.AudienceDrawerContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Audience_Audience_styled__WEBPACK_IMPORTED_MODULE_8__.AudienceSettingsCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CardHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Text.H5, { children: "Audience rule usage" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { width: 220 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Input, { id: 'audience_builder-usage-search-inp', placeholder: 'Search', value: usageSearch, onChange: event => { setUsageSearch(event.target.value); setUsagePage(1); } }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Table, { id: 'audience_builder-usage-tbl', rowKey: 'id', pagination: false, dataSource: pagedUsageAudiences, columns: [
                                        { title: 'Advertiser', dataIndex: 'advertiser', key: 'advertiser' },
                                        { title: 'Audience', dataIndex: 'audienceName', key: 'audienceName' },
                                    ] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Pagination, { current: usagePage, pageSize: 10, total: filteredUsageAudiences.length, showTotal: (total, [_, endItem]) => `${endItem} of ${total} items`, showSizeChanger: false, onChange: setUsagePage })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.StickyFooter, { left: 'calc(100% - 720px)', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Audience_Audience_styled__WEBPACK_IMPORTED_MODULE_8__.AudienceDrawerFooter, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { onClick: () => { setUsageRuleId(null); setUsageSearch(''); setUsagePage(1); }, children: "Close" }) }) })] }) })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudienceBuilderPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilderDetails.tsx"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilderDetails.tsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var antd_es_tree_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/tree-select */ "./node_modules/antd/es/tree-select/index.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AudienceBuilder.styled */ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.styled.tsx");
/* harmony import */ var _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mockAudienceRules */ "./apps/mediahub-ui/pages/AudienceBuilder/mockAudienceRules.ts");
/* harmony import */ var _shared_audienceStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/audienceStore */ "./apps/mediahub-ui/shared/audienceStore.ts");
/* harmony import */ var _shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/audienceRuleStore */ "./apps/mediahub-ui/shared/audienceRuleStore.ts");
/* harmony import */ var _Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Audience/mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");
/* harmony import */ var _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ruleCriteria */ "./apps/mediahub-ui/pages/AudienceBuilder/ruleCriteria.ts");











// A summary row shows at most this many value chips before collapsing the rest into "+N more".
const MAX_SUMMARY_CHIPS = 10;
/** All descendant values of a selection node, including itself — used to remove a whole branch. */
const collectPlaceSelectionValues = (node) => [
    node.value,
    ...node.children.flatMap(collectPlaceSelectionValues),
];
// Placeholder detail page — no rule-editing functionality is prototyped yet.
function AudienceBuilderDetailsPage() {
    const { ruleId } = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useParams)();
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.useNotification)();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const existingRule = (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__.getSharedRules)().find(rule => rule.id === ruleId) ?? (0,_mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.getMockRule)(ruleId);
    const [form] = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
    const travelIntentCategory = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Form.useWatch('travelIntentCategory', form) ?? existingRule?.travelIntentCategory ?? 'HOTEL';
    // Rows are combined with AND; the values picked within a single row are combined with OR.
    const [criteriaRows, setCriteriaRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => existingRule?.criteriaRows ?? [(0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.createEmptyCriteriaRow)('criteria-1')]);
    // Which collapsed place-selection nodes are expanded, keyed by `${criteriaRowId}::${value}`
    // and shared between the Query Rules editor and the Rule Summary sidebar.
    const [expandedInputPlaceKeys, setExpandedInputPlaceKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [expandedSummaryPlaceKeys, setExpandedSummaryPlaceKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const togglePlaceExpanded = (key, readOnly) => {
        const setExpandedKeys = readOnly ? setExpandedSummaryPlaceKeys : setExpandedInputPlaceKeys;
        setExpandedKeys(prev => {
            const next = new Set(prev);
            if (next.has(key))
                next.delete(key);
            else
                next.add(key);
            return next;
        });
    };
    const updateCriteriaRow = (id, patch) => {
        setCriteriaRows(prev => prev.map(row => (row.id === id ? { ...row, ...patch } : row)));
    };
    const addCriteriaRow = () => {
        setCriteriaRows(prev => {
            const usedTypes = new Set(prev.map(row => row.type));
            const nextType = _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.CRITERIA_TYPE_OPTIONS.find(o => !usedTypes.has(o.value))?.value;
            if (!nextType)
                return prev;
            return [{ ...(0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.createEmptyCriteriaRow)(`criteria-${Date.now()}`), type: nextType }, ...prev];
        });
    };
    const removeCriteriaRow = (id) => {
        setCriteriaRows(prev => (prev.length > 1 ? prev.filter(row => row.id !== id) : prev));
    };
    const handleTypeChange = (id, type) => {
        updateCriteriaRow(id, { type, values: [], operator: undefined, numberValue: undefined });
    };
    // Each rule type can only be used once across all rows — hide it from other rows entirely.
    const criteriaTypeOptions = (rowId) => {
        const usedTypes = new Set(criteriaRows.filter(row => row.id !== rowId).map(row => row.type));
        return _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.CRITERIA_TYPE_OPTIONS
            .filter(o => !usedTypes.has(o.value))
            .map(option => ({ ...option, label: (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.getCriteriaTypeLabel)(option.value, travelIntentCategory) }));
    };
    const allCriteriaTypesUsed = criteriaRows.length >= _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.CRITERIA_TYPE_OPTIONS.length;
    // Renders a top-level place row plus, when expanded, its auto-selected descendants (indented).
    const renderPlaceSelectionNode = (node, rowId, idPrefix, depth, readOnly = false) => {
        const key = `${rowId}::${node.value}`;
        const isExpanded = (readOnly ? expandedSummaryPlaceKeys : expandedInputPlaceKeys).has(key);
        const hasChildren = node.children.length > 0;
        // Top-level rows show the full breadcrumb path; nested rows just show their own name.
        const label = depth === 0 ? (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.getPlacePath)(node.value).join(' > ') : node.title;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionRow, { depth: depth, summary: readOnly, id: `${idPrefix}-row-${node.value}`, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionPath, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionChevron, { expanded: isExpanded, invisible: !hasChildren, id: `${idPrefix}-expand-${node.value}-btn`, onClick: () => hasChildren && togglePlaceExpanded(key, readOnly), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Icon, { name: 'chevronRight', width: 12, height: 12 }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: label }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionCount, { children: ["(", (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.getPlaceMockCount)(node.value), ")"] })] }), !readOnly && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.IconButton, { id: `${idPrefix}-remove-${node.value}-btn`, iconName: 'xmark', onClick: () => {
                                const removedValues = new Set(collectPlaceSelectionValues(node));
                                const row = criteriaRows.find(r => r.id === rowId);
                                if (row)
                                    updateCriteriaRow(rowId, { values: row.values.filter(v => !removedValues.has(v)) });
                            } })] }), hasChildren && isExpanded && node.children.map(child => renderPlaceSelectionNode(child, rowId, idPrefix, depth + 1, readOnly))] }, node.value));
    };
    const renderCriteriaValueControl = (row, index) => {
        if (_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.PLACE_CRITERIA_TYPES.includes(row.type)) {
            const selectionTree = (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.buildPlaceSelectionTree)(row.values);
            const totalCount = selectionTree.reduce((sum, node) => sum + (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.getPlaceMockCount)(node.value), 0);
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_tree_select__WEBPACK_IMPORTED_MODULE_3__["default"], { id: `audience_builder_details-criteria_value-${index}-sel`, treeData: _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.PLACE_TREE_OPTIONS_WITH_IATA, treeCheckable: true, showCheckedStrategy: antd_es_tree_select__WEBPACK_IMPORTED_MODULE_3__["default"].SHOW_ALL, placeholder: 'Select country, continent or city', style: { width: '100%' }, value: row.values, onChange: values => updateCriteriaRow(row.id, { values }), allowClear: true, 
                        // The selection is visualised as a collapsible row list below instead of the default flat tags.
                        maxTagCount: 0, maxTagPlaceholder: () => `${row.values.length} items selected` }), selectionTree.length > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionList, { children: selectionTree.map(node => renderPlaceSelectionNode(node, row.id, `audience_builder_details-criteria_value-${index}`, 0)) }) }))] }));
        }
        if (row.type === 'ENGAGEMENT_ACTIVITY') {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Select, { id: `audience_builder_details-criteria_value-${index}-sel`, placeholder: 'Select', mode: 'multiple', showSearch: true, withBadges: true, value: row.values, onChange: values => updateCriteriaRow(row.id, { values: values }), options: _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.ENGAGEMENT_ACTIVITY_OPTIONS, allowClear: true }));
        }
        if (_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.NUMBER_CRITERIA_TYPES.includes(row.type)) {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Select, { id: `audience_builder_details-criteria_operator-${index}-sel`, placeholder: 'Operator', value: row.operator, onChange: operator => updateCriteriaRow(row.id, { operator }), options: _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.NUMBER_OPERATOR_OPTIONS }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.InputNumber, { id: `audience_builder_details-criteria_number-${index}-inp`, placeholder: 'Value', value: row.numberValue, onChange: value => updateCriteriaRow(row.id, { numberValue: value == null ? undefined : Number(value) }) })] }));
        }
        return null;
    };
    const completedRows = criteriaRows
        .map((row, index) => ({ row, index, summary: (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.summarizeCriteriaRow)(row, travelIntentCategory) }))
        .filter((entry) => Boolean(entry.summary));
    const storedAudiences = (0,_shared_audienceStore__WEBPACK_IMPORTED_MODULE_7__.getSharedAudiences)();
    const dependentAudiences = (storedAudiences.length > 0 ? storedAudiences : _Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_9__.MOCK_AUDIENCES)
        .filter(audience => audience.audienceRuleIds.includes(ruleId ?? ''));
    const saveRule = (values) => {
        if (completedRows.length === 0) {
            notification.error('Add at least one complete query rule before saving.');
            return;
        }
        const currentRules = (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__.getSharedRules)();
        const savedRule = {
            id: ruleId && ruleId !== 'new' ? ruleId : `rule-${Date.now()}`,
            ruleName: values.name?.trim() || 'New Audience Rule',
            travelIntentCategory: values.travelIntentCategory ?? 'HOTEL',
            usedInAudiences: 0,
            criteriaRows,
        };
        const nextRules = currentRules.some(rule => rule.id === savedRule.id)
            ? currentRules.map(rule => rule.id === savedRule.id ? savedRule : rule)
            : [savedRule, ...currentRules];
        (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__.setSharedRules)(nextRules);
        notification.success('Audience rule saved successfully.');
        navigate('/audience-builder');
    };
    const confirmDeleteRule = () => {
        if (dependentAudiences.length > 0)
            return;
        const currentRules = (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__.getSharedRules)();
        (0,_shared_audienceRuleStore__WEBPACK_IMPORTED_MODULE_8__.setSharedRules)(currentRules.filter(rule => rule.id !== ruleId));
        setIsDeleteModalOpen(false);
        notification.success('Audience rule deleted successfully.');
        navigate('/audience-builder');
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.AudienceBuilderDetailsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { id: 'audience_builder_details-breadcrumb-nav', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Breadcrumb, { items: [{ title: 'Home', href: '/' }, { title: 'Audience Rules', href: '/audience-builder' }, { title: 'Audience Rule Settings' }] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Form, { form: form, initialValues: { name: existingRule?.ruleName, travelIntentCategory: existingRule?.travelIntentCategory ?? 'HOTEL' }, onFinish: saveRule, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Grid.Row, { align: 'top', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Grid.Col, { span: 9, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Container.Section, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.H5, { children: "General Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Grid.Row, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Form.Item, { name: 'name', colSpan: 6, rules: [{ required: true, message: 'Please enter a Name' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Input, { label: 'Name', id: 'audience_builder_details-name-inp', required: true }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Form.Item, { name: 'travelIntentCategory', colSpan: 6, rules: [{ required: true, message: 'Please select a Travel Intent Segment' }], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Select, { label: 'Travel Intent Segment', id: 'audience_builder_details-travel_intent_segment-sel', required: true, options: _mockAudienceRules__WEBPACK_IMPORTED_MODULE_6__.TRAVEL_INTENT_CATEGORY_OPTIONS }) })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Container.Section, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CardHeaderRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.H5, { children: "Query Rules" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Button, { id: 'audience_builder_details-add_criteria-btn', variant: 'outlined', onClick: addCriteriaRow, disabled: allCriteriaTypesUsed, children: "Add Rule" })] }), criteriaRows.map((row, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaMainRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaTypeWrap, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Select, { id: `audience_builder_details-criteria_type-${index}-sel`, value: row.type, onChange: (type) => handleTypeChange(row.id, type), options: criteriaTypeOptions(row.id) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaValueWrap, { children: renderCriteriaValueControl(row, index) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaRemoveBtnWrap, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.DropdownMenu, { menuType: 'kebab', items: [
                                                                    {
                                                                        key: 'remove-rule',
                                                                        label: 'Remove Rule',
                                                                        disabled: criteriaRows.length === 1,
                                                                        onClick: () => removeCriteriaRow(row.id),
                                                                    },
                                                                ] }) })] }) }, row.id)))] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Grid.Col, { span: 3, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleSummaryCard, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.H5, { children: "Rule Summary" }), completedRows.length > 0 ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleSummaryList, { children: completedRows.map(({ row, index, summary }, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleSummaryItem, { id: `audience_builder_details-rule_summary-${index}-txt`, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.Label, { children: summary.typeLabel }), _ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.PLACE_CRITERIA_TYPES.includes(row.type) ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.PlaceSelectionList, { children: (0,_ruleCriteria__WEBPACK_IMPORTED_MODULE_10__.buildPlaceSelectionTree)(row.values).map(node => renderPlaceSelectionNode(node, row.id, `audience_builder_details-rule_summary-${index}`, 0, true)) })) : summary.chips ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleSummaryChips, { children: [summary.chips.slice(0, MAX_SUMMARY_CHIPS).map((chip, chipIndex) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Tag, { children: chip }, chipIndex))), summary.chips.length > MAX_SUMMARY_CHIPS && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Tag, { children: `+${summary.chips.length - MAX_SUMMARY_CHIPS} more` }))] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: summary.text })), i < completedRows.length - 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.CriteriaAndDivider, { children: "AND" })] }, row.id))) })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleSummaryEmpty, { id: 'audience_builder_details-rule_summary_empty-txt', children: "No rules defined." }))] }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.StickyFooter, { left: '60px', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.StickyFooterContainer, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleFooterActions, { children: [ruleId && ruleId !== 'new' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Button, { id: 'audience_builder_details-delete-btn', color: 'danger', variant: 'outlined', onClick: () => setIsDeleteModalOpen(true), children: "Delete Audience Rule" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AudienceBuilder_styled__WEBPACK_IMPORTED_MODULE_5__.RuleFooterButtons, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Button, { id: 'audience_builder_details-cancel-btn', variant: 'outlined', onClick: () => navigate('/audience-builder'), children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Button, { id: 'audience_builder_details-save-btn', htmlType: 'submit', children: "Save" })] })] }) }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Modal, { idPrefix: 'audience-builder-delete-modal', title: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Icon, { name: 'exclamationTriangle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.colors.pumpkin_60, width: 24, height: 24 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Delete Audience Rule" })] }), open: isDeleteModalOpen, maskStyle: { backgroundColor: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.colors.sky_90 }, okText: dependentAudiences.length > 0 ? 'Close' : 'Delete', footer: dependentAudiences.length > 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Button, { onClick: () => setIsDeleteModalOpen(false), children: "Close" }) : undefined, onOk: confirmDeleteRule, onCancel: () => setIsDeleteModalOpen(false), children: [dependentAudiences.length > 0 ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.Body, { children: ["This audience rule ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: existingRule?.ruleName ?? 'Audience Rule' }), " is being used in the following Audiences and cannot be deleted:"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Table, { id: 'audience-builder-dependent-audiences-tbl', rowKey: 'id', pagination: false, dataSource: dependentAudiences, columns: [
                                    { title: 'Audience', dataIndex: 'audienceName', key: 'audienceName' },
                                    { title: 'Advertiser', dataIndex: 'advertiser', key: 'advertiser' },
                                ] })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.Body, { children: ["Are you sure you want to delete the ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: existingRule?.ruleName ?? 'Audience Rule' }), "? This action cannot be undone."] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.Body, { children: "This rule is not currently used in any Audience." })] })), dependentAudiences.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_4__.Text.Body, { children: "Would you like to proceed with the Delete?" })] })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudienceBuilderDetailsPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/index.ts"
/*!*********************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/index.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudienceBuilderDetailsPage: () => (/* reexport safe */ _AudienceBuilderDetails__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (/* reexport safe */ _AudienceBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _AudienceBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AudienceBuilder */ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilder.tsx");
/* harmony import */ var _AudienceBuilderDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AudienceBuilderDetails */ "./apps/mediahub-ui/pages/AudienceBuilder/AudienceBuilderDetails.tsx");




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

/***/ "./apps/mediahub-ui/pages/AudienceBuilder/ruleCriteria.ts"
/*!****************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AudienceBuilder/ruleCriteria.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CRITERIA_TYPE_LABEL: () => (/* binding */ CRITERIA_TYPE_LABEL),
/* harmony export */   CRITERIA_TYPE_OPTIONS: () => (/* binding */ CRITERIA_TYPE_OPTIONS),
/* harmony export */   ENGAGEMENT_ACTIVITY_OPTIONS: () => (/* binding */ ENGAGEMENT_ACTIVITY_OPTIONS),
/* harmony export */   NUMBER_CRITERIA_TYPES: () => (/* binding */ NUMBER_CRITERIA_TYPES),
/* harmony export */   NUMBER_OPERATOR_OPTIONS: () => (/* binding */ NUMBER_OPERATOR_OPTIONS),
/* harmony export */   PLACE_CRITERIA_TYPES: () => (/* binding */ PLACE_CRITERIA_TYPES),
/* harmony export */   PLACE_TREE_OPTIONS: () => (/* binding */ PLACE_TREE_OPTIONS),
/* harmony export */   PLACE_TREE_OPTIONS_WITH_IATA: () => (/* binding */ PLACE_TREE_OPTIONS_WITH_IATA),
/* harmony export */   buildPlaceSelectionTree: () => (/* binding */ buildPlaceSelectionTree),
/* harmony export */   createEmptyCriteriaRow: () => (/* binding */ createEmptyCriteriaRow),
/* harmony export */   getCriteriaTypeLabel: () => (/* binding */ getCriteriaTypeLabel),
/* harmony export */   getPlaceLabel: () => (/* binding */ getPlaceLabel),
/* harmony export */   getPlaceMockCount: () => (/* binding */ getPlaceMockCount),
/* harmony export */   getPlacePath: () => (/* binding */ getPlacePath),
/* harmony export */   pruneTreeToSelection: () => (/* binding */ pruneTreeToSelection),
/* harmony export */   reconcileSelectedPlaceValues: () => (/* binding */ reconcileSelectedPlaceValues),
/* harmony export */   summarizeCriteriaRow: () => (/* binding */ summarizeCriteriaRow),
/* harmony export */   summarizeCriteriaRows: () => (/* binding */ summarizeCriteriaRows)
/* harmony export */ });
const CRITERIA_TYPE_OPTIONS = [
    { label: 'Origin', value: 'ORIGIN' },
    { label: 'Destination', value: 'DESTINATION' },
    { label: 'Engagement Activity', value: 'ENGAGEMENT_ACTIVITY' },
    { label: 'Number of Passengers', value: 'NUMBER_OF_PASSENGERS' },
    { label: 'Duration of Stay', value: 'DURATION_OF_STAY' },
];
const CRITERIA_TYPE_LABEL = Object.fromEntries(CRITERIA_TYPE_OPTIONS.map(o => [o.value, o.label]));
const getCriteriaTypeLabel = (type, travelIntentCategory) => {
    if (travelIntentCategory === 'AIRLINE' && type === 'ORIGIN')
        return 'Origin IATA';
    if (travelIntentCategory === 'AIRLINE' && type === 'DESTINATION')
        return 'Destination IATA';
    return CRITERIA_TYPE_LABEL[type];
};
/** Criteria types whose value is picked from a place tree (continent -> country -> city). */
const PLACE_CRITERIA_TYPES = ['ORIGIN', 'DESTINATION'];
/** Criteria types compared against a single number with an operator. */
const NUMBER_CRITERIA_TYPES = ['NUMBER_OF_PASSENGERS', 'DURATION_OF_STAY'];
const ENGAGEMENT_ACTIVITY_OPTIONS = [
    { label: 'Visited', value: 'VISITED' },
    { label: 'Abandoned Carts', value: 'ABANDONED_CARTS' },
    { label: 'Searched', value: 'SEARCHED' },
    { label: 'Booked', value: 'BOOKED' },
];
const NUMBER_OPERATOR_OPTIONS = [
    { label: 'Greater than or equal', value: 'GTE' },
    { label: 'Less than or equal', value: 'LTE' },
    { label: 'Equals', value: 'EQ' },
];
/**
 * Continent -> country -> city tree for the Origin/Destination pickers. Country coverage
 * follows the region groupings used by Google's GeoChart (see
 * https://developers.google.com/chart/interactive/docs/gallery/geochart) for a near-complete
 * list of sovereign states per continent; a handful of major countries also include cities.
 */
const PLACE_TREE_OPTIONS = [
    {
        title: 'Africa',
        value: 'AFRICA',
        children: [
            { title: 'Algeria', value: 'ALGERIA' },
            { title: 'Angola', value: 'ANGOLA' },
            { title: 'Benin', value: 'BENIN' },
            { title: 'Botswana', value: 'BOTSWANA' },
            { title: 'Burkina Faso', value: 'BURKINA_FASO' },
            { title: 'Burundi', value: 'BURUNDI' },
            { title: 'Cabo Verde', value: 'CABO_VERDE' },
            { title: 'Cameroon', value: 'CAMEROON' },
            { title: 'Central African Republic', value: 'CENTRAL_AFRICAN_REPUBLIC' },
            { title: 'Chad', value: 'CHAD' },
            { title: 'Comoros', value: 'COMOROS' },
            { title: 'Congo', value: 'CONGO' },
            { title: 'DR Congo', value: 'DR_CONGO' },
            { title: 'Djibouti', value: 'DJIBOUTI' },
            {
                title: 'Egypt',
                value: 'EGYPT',
                children: [
                    { title: 'Cairo', value: 'CAIRO' },
                    { title: 'Alexandria', value: 'ALEXANDRIA' },
                ],
            },
            { title: 'Equatorial Guinea', value: 'EQUATORIAL_GUINEA' },
            { title: 'Eritrea', value: 'ERITREA' },
            { title: 'Eswatini', value: 'ESWATINI' },
            { title: 'Ethiopia', value: 'ETHIOPIA' },
            { title: 'Gabon', value: 'GABON' },
            { title: 'Gambia', value: 'GAMBIA' },
            { title: 'Ghana', value: 'GHANA' },
            { title: 'Guinea', value: 'GUINEA' },
            { title: 'Guinea-Bissau', value: 'GUINEA_BISSAU' },
            { title: 'Ivory Coast', value: 'IVORY_COAST' },
            { title: 'Kenya', value: 'KENYA' },
            { title: 'Lesotho', value: 'LESOTHO' },
            { title: 'Liberia', value: 'LIBERIA' },
            { title: 'Libya', value: 'LIBYA' },
            { title: 'Madagascar', value: 'MADAGASCAR' },
            { title: 'Malawi', value: 'MALAWI' },
            { title: 'Mali', value: 'MALI' },
            { title: 'Mauritania', value: 'MAURITANIA' },
            { title: 'Mauritius', value: 'MAURITIUS' },
            { title: 'Morocco', value: 'MOROCCO' },
            { title: 'Mozambique', value: 'MOZAMBIQUE' },
            { title: 'Namibia', value: 'NAMIBIA' },
            { title: 'Niger', value: 'NIGER' },
            { title: 'Nigeria', value: 'NIGERIA' },
            { title: 'Rwanda', value: 'RWANDA' },
            { title: 'Sao Tome and Principe', value: 'SAO_TOME_AND_PRINCIPE' },
            { title: 'Senegal', value: 'SENEGAL' },
            { title: 'Seychelles', value: 'SEYCHELLES' },
            { title: 'Sierra Leone', value: 'SIERRA_LEONE' },
            { title: 'Somalia', value: 'SOMALIA' },
            { title: 'South Africa', value: 'SOUTH_AFRICA' },
            { title: 'South Sudan', value: 'SOUTH_SUDAN' },
            { title: 'Sudan', value: 'SUDAN' },
            { title: 'Tanzania', value: 'TANZANIA' },
            { title: 'Togo', value: 'TOGO' },
            { title: 'Tunisia', value: 'TUNISIA' },
            { title: 'Uganda', value: 'UGANDA' },
            { title: 'Zambia', value: 'ZAMBIA' },
            { title: 'Zimbabwe', value: 'ZIMBABWE' },
        ],
    },
    {
        title: 'Asia',
        value: 'ASIA',
        children: [
            { title: 'Afghanistan', value: 'AFGHANISTAN' },
            { title: 'Armenia', value: 'ARMENIA' },
            { title: 'Azerbaijan', value: 'AZERBAIJAN' },
            { title: 'Bahrain', value: 'BAHRAIN' },
            { title: 'Bangladesh', value: 'BANGLADESH' },
            { title: 'Bhutan', value: 'BHUTAN' },
            { title: 'Brunei', value: 'BRUNEI' },
            { title: 'Cambodia', value: 'CAMBODIA' },
            {
                title: 'China',
                value: 'CHINA',
                children: [
                    { title: 'Beijing', value: 'BEIJING' },
                    { title: 'Shanghai', value: 'SHANGHAI' },
                ],
            },
            { title: 'Cyprus', value: 'CYPRUS' },
            { title: 'Georgia', value: 'GEORGIA' },
            {
                title: 'India',
                value: 'INDIA',
                children: [
                    { title: 'New Delhi', value: 'NEW_DELHI' },
                    { title: 'Mumbai', value: 'MUMBAI' },
                ],
            },
            {
                title: 'Indonesia',
                value: 'INDONESIA',
                children: [
                    { title: 'Jakarta', value: 'JAKARTA' },
                    { title: 'Bali', value: 'BALI' },
                ],
            },
            { title: 'Iran', value: 'IRAN' },
            { title: 'Iraq', value: 'IRAQ' },
            { title: 'Israel', value: 'ISRAEL' },
            {
                title: 'Japan',
                value: 'JAPAN',
                children: [
                    { title: 'Tokyo', value: 'TOKYO' },
                    { title: 'Osaka', value: 'OSAKA' },
                ],
            },
            { title: 'Jordan', value: 'JORDAN' },
            { title: 'Kazakhstan', value: 'KAZAKHSTAN' },
            { title: 'Kuwait', value: 'KUWAIT' },
            { title: 'Kyrgyzstan', value: 'KYRGYZSTAN' },
            { title: 'Laos', value: 'LAOS' },
            { title: 'Lebanon', value: 'LEBANON' },
            { title: 'Malaysia', value: 'MALAYSIA' },
            { title: 'Maldives', value: 'MALDIVES' },
            { title: 'Mongolia', value: 'MONGOLIA' },
            { title: 'Myanmar', value: 'MYANMAR' },
            { title: 'Nepal', value: 'NEPAL' },
            { title: 'North Korea', value: 'NORTH_KOREA' },
            { title: 'Oman', value: 'OMAN' },
            { title: 'Pakistan', value: 'PAKISTAN' },
            { title: 'Palestine', value: 'PALESTINE' },
            { title: 'Philippines', value: 'PHILIPPINES' },
            { title: 'Qatar', value: 'QATAR' },
            { title: 'Saudi Arabia', value: 'SAUDI_ARABIA' },
            { title: 'Singapore', value: 'SINGAPORE' },
            { title: 'South Korea', value: 'SOUTH_KOREA' },
            { title: 'Sri Lanka', value: 'SRI_LANKA' },
            { title: 'Syria', value: 'SYRIA' },
            { title: 'Taiwan', value: 'TAIWAN' },
            { title: 'Tajikistan', value: 'TAJIKISTAN' },
            {
                title: 'Thailand',
                value: 'THAILAND',
                children: [
                    { title: 'Phuket', value: 'PHUKET' },
                ],
            },
            { title: 'Timor-Leste', value: 'TIMOR_LESTE' },
            { title: 'Turkey', value: 'TURKEY' },
            { title: 'Turkmenistan', value: 'TURKMENISTAN' },
            { title: 'United Arab Emirates', value: 'UNITED_ARAB_EMIRATES' },
            { title: 'Uzbekistan', value: 'UZBEKISTAN' },
            { title: 'Vietnam', value: 'VIETNAM' },
            { title: 'Yemen', value: 'YEMEN' },
        ],
    },
    {
        title: 'Europe',
        value: 'EUROPE',
        children: [
            { title: 'Albania', value: 'ALBANIA' },
            { title: 'Andorra', value: 'ANDORRA' },
            { title: 'Austria', value: 'AUSTRIA' },
            { title: 'Belarus', value: 'BELARUS' },
            { title: 'Belgium', value: 'BELGIUM' },
            { title: 'Bosnia and Herzegovina', value: 'BOSNIA_AND_HERZEGOVINA' },
            { title: 'Bulgaria', value: 'BULGARIA' },
            { title: 'Croatia', value: 'CROATIA' },
            { title: 'Czech Republic', value: 'CZECH_REPUBLIC' },
            { title: 'Denmark', value: 'DENMARK' },
            { title: 'Estonia', value: 'ESTONIA' },
            { title: 'Finland', value: 'FINLAND' },
            {
                title: 'France',
                value: 'FRANCE',
                children: [
                    { title: 'Paris', value: 'PARIS' },
                    { title: 'Nice', value: 'NICE' },
                ],
            },
            {
                title: 'Germany',
                value: 'GERMANY',
                children: [
                    { title: 'Berlin', value: 'BERLIN' },
                    { title: 'Munich', value: 'MUNICH' },
                    { title: 'Frankfurt', value: 'FRANKFURT' },
                ],
            },
            { title: 'Greece', value: 'GREECE' },
            { title: 'Hungary', value: 'HUNGARY' },
            { title: 'Iceland', value: 'ICELAND' },
            { title: 'Ireland', value: 'IRELAND' },
            { title: 'Italy', value: 'ITALY' },
            { title: 'Kosovo', value: 'KOSOVO' },
            { title: 'Latvia', value: 'LATVIA' },
            { title: 'Liechtenstein', value: 'LIECHTENSTEIN' },
            { title: 'Lithuania', value: 'LITHUANIA' },
            { title: 'Luxembourg', value: 'LUXEMBOURG' },
            { title: 'Malta', value: 'MALTA' },
            { title: 'Moldova', value: 'MOLDOVA' },
            { title: 'Monaco', value: 'MONACO' },
            { title: 'Montenegro', value: 'MONTENEGRO' },
            { title: 'Netherlands', value: 'NETHERLANDS' },
            { title: 'North Macedonia', value: 'NORTH_MACEDONIA' },
            { title: 'Norway', value: 'NORWAY' },
            { title: 'Poland', value: 'POLAND' },
            { title: 'Portugal', value: 'PORTUGAL' },
            { title: 'Romania', value: 'ROMANIA' },
            { title: 'Russia', value: 'RUSSIA' },
            { title: 'San Marino', value: 'SAN_MARINO' },
            { title: 'Serbia', value: 'SERBIA' },
            { title: 'Slovakia', value: 'SLOVAKIA' },
            { title: 'Slovenia', value: 'SLOVENIA' },
            {
                title: 'Spain',
                value: 'SPAIN',
                children: [
                    { title: 'Madrid', value: 'MADRID' },
                    { title: 'Barcelona', value: 'BARCELONA' },
                ],
            },
            { title: 'Sweden', value: 'SWEDEN' },
            { title: 'Switzerland', value: 'SWITZERLAND' },
            { title: 'Ukraine', value: 'UKRAINE' },
            {
                title: 'United Kingdom',
                value: 'UNITED_KINGDOM',
                children: [
                    { title: 'London', value: 'LONDON' },
                    { title: 'Manchester', value: 'MANCHESTER' },
                ],
            },
            { title: 'Vatican City', value: 'VATICAN_CITY' },
        ],
    },
    {
        title: 'North America',
        value: 'NORTH_AMERICA',
        children: [
            { title: 'Antigua and Barbuda', value: 'ANTIGUA_AND_BARBUDA' },
            { title: 'Bahamas', value: 'BAHAMAS' },
            { title: 'Barbados', value: 'BARBADOS' },
            { title: 'Belize', value: 'BELIZE' },
            {
                title: 'Canada',
                value: 'CANADA',
                children: [
                    { title: 'Toronto', value: 'TORONTO' },
                    { title: 'Vancouver', value: 'VANCOUVER' },
                ],
            },
            { title: 'Costa Rica', value: 'COSTA_RICA' },
            { title: 'Cuba', value: 'CUBA' },
            { title: 'Dominica', value: 'DOMINICA' },
            { title: 'Dominican Republic', value: 'DOMINICAN_REPUBLIC' },
            { title: 'El Salvador', value: 'EL_SALVADOR' },
            { title: 'Grenada', value: 'GRENADA' },
            { title: 'Guatemala', value: 'GUATEMALA' },
            { title: 'Haiti', value: 'HAITI' },
            { title: 'Honduras', value: 'HONDURAS' },
            { title: 'Jamaica', value: 'JAMAICA' },
            {
                title: 'Mexico',
                value: 'MEXICO',
                children: [
                    { title: 'Mexico City', value: 'MEXICO_CITY' },
                    { title: 'Cancun', value: 'CANCUN' },
                ],
            },
            { title: 'Nicaragua', value: 'NICARAGUA' },
            { title: 'Panama', value: 'PANAMA' },
            { title: 'Saint Kitts and Nevis', value: 'SAINT_KITTS_AND_NEVIS' },
            { title: 'Saint Lucia', value: 'SAINT_LUCIA' },
            { title: 'Saint Vincent and the Grenadines', value: 'SAINT_VINCENT_AND_THE_GRENADINES' },
            { title: 'Trinidad and Tobago', value: 'TRINIDAD_AND_TOBAGO' },
            {
                title: 'United States',
                value: 'UNITED_STATES',
                children: [
                    { title: 'New York', value: 'NEW_YORK' },
                    { title: 'Los Angeles', value: 'LOS_ANGELES' },
                    { title: 'Miami', value: 'MIAMI' },
                ],
            },
        ],
    },
    {
        title: 'South America',
        value: 'SOUTH_AMERICA',
        children: [
            { title: 'Argentina', value: 'ARGENTINA' },
            { title: 'Bolivia', value: 'BOLIVIA' },
            {
                title: 'Brazil',
                value: 'BRAZIL',
                children: [
                    { title: 'Rio de Janeiro', value: 'RIO_DE_JANEIRO' },
                    { title: 'Sao Paulo', value: 'SAO_PAULO' },
                ],
            },
            { title: 'Chile', value: 'CHILE' },
            { title: 'Colombia', value: 'COLOMBIA' },
            { title: 'Ecuador', value: 'ECUADOR' },
            { title: 'Guyana', value: 'GUYANA' },
            { title: 'Paraguay', value: 'PARAGUAY' },
            { title: 'Peru', value: 'PERU' },
            { title: 'Suriname', value: 'SURINAME' },
            { title: 'Uruguay', value: 'URUGUAY' },
            { title: 'Venezuela', value: 'VENEZUELA' },
        ],
    },
    {
        title: 'Oceania',
        value: 'OCEANIA',
        children: [
            {
                title: 'Australia',
                value: 'AUSTRALIA',
                children: [
                    { title: 'Sydney', value: 'SYDNEY' },
                    { title: 'Melbourne', value: 'MELBOURNE' },
                ],
            },
            { title: 'Fiji', value: 'FIJI' },
            { title: 'Kiribati', value: 'KIRIBATI' },
            { title: 'Marshall Islands', value: 'MARSHALL_ISLANDS' },
            { title: 'Micronesia', value: 'MICRONESIA' },
            { title: 'Nauru', value: 'NAURU' },
            { title: 'New Zealand', value: 'NEW_ZEALAND' },
            { title: 'Palau', value: 'PALAU' },
            { title: 'Papua New Guinea', value: 'PAPUA_NEW_GUINEA' },
            { title: 'Samoa', value: 'SAMOA' },
            { title: 'Solomon Islands', value: 'SOLOMON_ISLANDS' },
            { title: 'Tonga', value: 'TONGA' },
            { title: 'Tuvalu', value: 'TUVALU' },
            { title: 'Vanuatu', value: 'VANUATU' },
        ],
    },
];
const createFakeIataCode = (value) => {
    const letters = value.replace(/[^A-Z]/gi, '').toUpperCase();
    const hash = letters.split('').reduce((total, letter) => total + letter.charCodeAt(0), 0);
    return Array.from({ length: 3 }, (_, index) => String.fromCharCode(65 + ((hash + index * 11) % 26))).join('');
};
const addFakeIataNodes = (nodes, depth = 0) => nodes.map(node => {
    const children = node.children ? addFakeIataNodes(node.children, depth + 1) : undefined;
    if (depth !== 1)
        return { ...node, ...(children ? { children } : {}) };
    const code = createFakeIataCode(node.value);
    return {
        ...node,
        children: [
            ...(children ?? []),
            { title: `${node.title} (IATA: ${code})`, value: `${node.value}_IATA_${code}` },
        ],
    };
});
const PLACE_TREE_OPTIONS_WITH_IATA = addFakeIataNodes(PLACE_TREE_OPTIONS);
const createEmptyCriteriaRow = (id) => ({
    id,
    type: 'ORIGIN',
    values: [],
});
const ENGAGEMENT_ACTIVITY_LABEL = Object.fromEntries(ENGAGEMENT_ACTIVITY_OPTIONS.map(o => [o.value, o.label]));
const NUMBER_OPERATOR_LABEL = Object.fromEntries(NUMBER_OPERATOR_OPTIONS.map(o => [o.value, o.label]));
/** Looks up a place node's display title by value, searching the whole continent/country/city tree. */
const getPlaceLabel = (value) => {
    const search = (nodes) => {
        for (const node of nodes) {
            if (node.value === value)
                return node.title;
            const found = node.children && search(node.children);
            if (found)
                return found;
        }
        return undefined;
    };
    return search(PLACE_TREE_OPTIONS_WITH_IATA) ?? value;
};
/** Full breadcrumb path (e.g. ["Europe", "Austria"]) from continent down to the given node. */
const getPlacePath = (value) => {
    const search = (nodes, path) => {
        for (const node of nodes) {
            const nextPath = [...path, node.title];
            if (node.value === value)
                return nextPath;
            const found = node.children && search(node.children, nextPath);
            if (found)
                return found;
        }
        return undefined;
    };
    return search(PLACE_TREE_OPTIONS_WITH_IATA, []) ?? [value];
};
/** Deterministic mock audience-size count for a place, purely for prototype visualisation. */
const getPlaceMockCount = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 31 + value.charCodeAt(i)) | 0;
    }
    return (Math.abs(hash) % 4990) + 10;
};
/**
 * Groups selected place values into a collapsed tree: only the highest selected ancestor of
 * each branch becomes a top-level row (e.g. selecting the "Africa" continent collapses all
 * of its auto-selected countries under one "Africa" row that can be expanded).
 */
const buildPlaceSelectionTree = (selectedValues) => {
    const selected = new Set(selectedValues);
    const build = (nodes) => {
        const result = [];
        nodes.forEach(node => {
            const isSelected = selected.has(node.value);
            const children = node.children ? build(node.children) : [];
            if (isSelected || children.length > 0) {
                result.push({ value: node.value, title: node.title, children });
            }
        });
        return result;
    };
    return build(PLACE_TREE_OPTIONS_WITH_IATA);
};
/**
 * Re-adds any ancestor whose subtree still has at least one selected descendant. antd's
 * TreeSelect auto-uncheck a parent as soon as one child becomes unchecked (e.g. removing one
 * country from a fully-selected continent also drops the continent from the value array) —
 * this keeps the remaining selections grouped under that continent/country instead of falling
 * back to a flat, ungrouped list.
 */
const reconcileSelectedPlaceValues = (values) => {
    const selected = new Set(values);
    const visit = (nodes) => {
        let anySelectedInBranch = false;
        nodes.forEach(node => {
            const childHasSelection = node.children ? visit(node.children) : false;
            if (selected.has(node.value) || childHasSelection) {
                selected.add(node.value);
                anySelectedInBranch = true;
            }
        });
        return anySelectedInBranch;
    };
    visit(PLACE_TREE_OPTIONS_WITH_IATA);
    return Array.from(selected);
};
/**
 * Prunes the continent/country/city tree down to only the branches containing a selected
 * value (plus their ancestors), so the selection can be visualised as a small tree instead
 * of a flat list of chips.
 */
const pruneTreeToSelection = (nodes, selectedValues) => {
    const selected = new Set(selectedValues);
    const prune = (list) => list.reduce((acc, node) => {
        const prunedChildren = node.children ? prune(node.children) : [];
        if (selected.has(node.value) || prunedChildren.length > 0) {
            acc.push({ ...node, ...(prunedChildren.length > 0 ? { children: prunedChildren } : {}) });
        }
        return acc;
    }, []);
    return prune(nodes);
};
/** Structured summary for chip-based rendering; returns undefined for incomplete rows. */
const summarizeCriteriaRow = (row, travelIntentCategory) => {
    const typeLabel = getCriteriaTypeLabel(row.type, travelIntentCategory);
    if (PLACE_CRITERIA_TYPES.includes(row.type)) {
        if (row.values.length === 0)
            return undefined;
        return { typeLabel, chips: row.values.map(getPlaceLabel) };
    }
    if (row.type === 'ENGAGEMENT_ACTIVITY') {
        if (row.values.length === 0)
            return undefined;
        return { typeLabel, chips: row.values.map(v => ENGAGEMENT_ACTIVITY_LABEL[v] ?? v) };
    }
    if (NUMBER_CRITERIA_TYPES.includes(row.type)) {
        if (!row.operator || row.numberValue == null)
            return undefined;
        return { typeLabel, text: `${NUMBER_OPERATOR_LABEL[row.operator] ?? row.operator} ${row.numberValue}` };
    }
    return undefined;
};
const summarizeCriteriaRows = (rows, travelIntentCategory) => rows.map(row => summarizeCriteriaRow(row, travelIntentCategory)).filter((s) => Boolean(s));


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
//# sourceMappingURL=audience-builder.278fe4cac4de65d6aade.js.map