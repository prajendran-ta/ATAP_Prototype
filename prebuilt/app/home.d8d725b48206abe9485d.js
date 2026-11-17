"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["home"],{

/***/ "./apps/mediahub-ui/pages/Home/Home.styled.ts"
/*!****************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/Home.styled.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CarouselSection: () => (/* binding */ CarouselSection),
/* harmony export */   FloatingAiButton: () => (/* binding */ FloatingAiButton),
/* harmony export */   FloatingPanelOverlay: () => (/* binding */ FloatingPanelOverlay),
/* harmony export */   HomeMaxResizeHandle: () => (/* binding */ HomeMaxResizeHandle),
/* harmony export */   LeftCol: () => (/* binding */ LeftCol),
/* harmony export */   MetricsHeader: () => (/* binding */ MetricsHeader),
/* harmony export */   MetricsHeading: () => (/* binding */ MetricsHeading),
/* harmony export */   MetricsHeadingGroup: () => (/* binding */ MetricsHeadingGroup),
/* harmony export */   MetricsLegend: () => (/* binding */ MetricsLegend),
/* harmony export */   MetricsLegendDot: () => (/* binding */ MetricsLegendDot),
/* harmony export */   MetricsLegendItem: () => (/* binding */ MetricsLegendItem),
/* harmony export */   MetricsPanel: () => (/* binding */ MetricsPanel),
/* harmony export */   MetricsPanelTitle: () => (/* binding */ MetricsPanelTitle),
/* harmony export */   MetricsPrimaryValue: () => (/* binding */ MetricsPrimaryValue),
/* harmony export */   MetricsSplitGrid: () => (/* binding */ MetricsSplitGrid),
/* harmony export */   MetricsSubheading: () => (/* binding */ MetricsSubheading),
/* harmony export */   MetricsTabButton: () => (/* binding */ MetricsTabButton),
/* harmony export */   MetricsTable: () => (/* binding */ MetricsTable),
/* harmony export */   MetricsTableCell: () => (/* binding */ MetricsTableCell),
/* harmony export */   MetricsTableHeadCell: () => (/* binding */ MetricsTableHeadCell),
/* harmony export */   MetricsTablePanelBody: () => (/* binding */ MetricsTablePanelBody),
/* harmony export */   MetricsTableWrap: () => (/* binding */ MetricsTableWrap),
/* harmony export */   MetricsTabs: () => (/* binding */ MetricsTabs),
/* harmony export */   MetricsTrend: () => (/* binding */ MetricsTrend),
/* harmony export */   MetricsValueStack: () => (/* binding */ MetricsValueStack),
/* harmony export */   MetricsVisualAxisColumn: () => (/* binding */ MetricsVisualAxisColumn),
/* harmony export */   MetricsVisualAxisLabel: () => (/* binding */ MetricsVisualAxisLabel),
/* harmony export */   MetricsVisualAxisTicks: () => (/* binding */ MetricsVisualAxisTicks),
/* harmony export */   MetricsVisualBar: () => (/* binding */ MetricsVisualBar),
/* harmony export */   MetricsVisualBarGroup: () => (/* binding */ MetricsVisualBarGroup),
/* harmony export */   MetricsVisualBarsColumn: () => (/* binding */ MetricsVisualBarsColumn),
/* harmony export */   MetricsVisualBarsTrack: () => (/* binding */ MetricsVisualBarsTrack),
/* harmony export */   MetricsVisualChartRow: () => (/* binding */ MetricsVisualChartRow),
/* harmony export */   MetricsVisualChartSection: () => (/* binding */ MetricsVisualChartSection),
/* harmony export */   MetricsVisualContainer: () => (/* binding */ MetricsVisualContainer),
/* harmony export */   MetricsVisualHeader: () => (/* binding */ MetricsVisualHeader),
/* harmony export */   MetricsVisualLabel: () => (/* binding */ MetricsVisualLabel),
/* harmony export */   MetricsVisualLabelsRow: () => (/* binding */ MetricsVisualLabelsRow),
/* harmony export */   MetricsVisualLegend: () => (/* binding */ MetricsVisualLegend),
/* harmony export */   MetricsVisualLegendItem: () => (/* binding */ MetricsVisualLegendItem),
/* harmony export */   MetricsVisualLegendSwatch: () => (/* binding */ MetricsVisualLegendSwatch),
/* harmony export */   MetricsVisualPeriod: () => (/* binding */ MetricsVisualPeriod),
/* harmony export */   MetricsVisualUpdatedAt: () => (/* binding */ MetricsVisualUpdatedAt),
/* harmony export */   Page: () => (/* binding */ Page),
/* harmony export */   RightCol: () => (/* binding */ RightCol),
/* harmony export */   SidePanelViewport: () => (/* binding */ SidePanelViewport)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _amadeus_react_design_factory_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory/styles */ "./packages/react-design-factory/styles/index.ts");



const Page = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen', 'panelWidth'].includes(propName) }) `
  display: grid;
  grid-template-columns: ${({ twoCols, fullScreen }) => fullScreen ? '1fr' : twoCols ? `minmax(0, 1fr) var(--home-panel-width)` : '1fr'};
  row-gap: 14px;
  column-gap: 0;
  height: ${({ twoCols }) => (twoCols ? 'calc(100vh - 54px)' : 'auto')};
  overflow: ${({ twoCols }) => (twoCols ? 'hidden' : 'visible')};
  --home-panel-width: ${({ panelWidth }) => `${panelWidth}px`};
`;
const CarouselSection = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-radius: 5px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  padding: 14px 14px 12px;
  margin: 0px 0px 28px 0px;
  min-height: 200px;
`;
const MetricsTableWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  width: 100%;
  overflow-x: auto;
`;
const MetricsTablePanelBody = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  max-height: 560px;
  overflow-y: auto;
  overflow-x: auto;
`;
const MetricsHeader = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;
const MetricsHeadingGroup = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 0;
`;
const MetricsHeading = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].h4 `
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const MetricsSubheading = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].p `
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 16px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
const MetricsLegend = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;
const MetricsLegendItem = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
const MetricsLegendDot = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
    shouldForwardProp: propName => propName !== 'kind',
}) `
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ kind }) => kind === 'improved' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.forest_60 : kind === 'declined' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.crimson_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_50};
`;
const MetricsTabs = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 0;
  margin: 4px 0 12px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
`;
const MetricsTabButton = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('button', {
    shouldForwardProp: propName => propName !== 'active',
}) `
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_80 : 'transparent')};
  border-radius: 0;
  padding: 8px 12px 7px;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ active }) => (active ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100)};
  background: transparent;
  cursor: pointer;
  text-align: center;
`;
const MetricsTable = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].table `
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;
const MetricsTableHeadCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].th `
  padding: 7px 10px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  text-align: left;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_10};

  &:not(:first-of-type) {
    text-align: center;
  }

  &:first-of-type {
    width: 132px;
  }
`;
const MetricsTableCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].td `
  padding: 7px 10px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  font-size: 11px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:first-of-type) {
    text-align: center;
  }
`;
const MetricsValueStack = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;
const MetricsPrimaryValue = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 11px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  font-weight: 600;
`;
const MetricsTrend = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
    shouldForwardProp: propName => propName !== 'trendKind',
}) `
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ trendKind }) => trendKind === 'positive' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.forest_60 : trendKind === 'negative' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.crimson_60 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_60};
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
`;
const MetricsSplitGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
const MetricsPanel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 6px;
  overflow: hidden;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
`;
const MetricsPanelTitle = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].h5 `
  margin: 0;
  padding: 7px 10px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_10};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const MetricsVisualContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MetricsVisualHeader = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
const MetricsVisualPeriod = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 14px;
  line-height: 18px;
  color: #666666;
  margin-bottom: 10px;
`;
const MetricsVisualLegend = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 28px;
`;
const MetricsVisualLegendItem = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 18px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const MetricsVisualLegendSwatch = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
    shouldForwardProp: propName => propName !== 'kind',
}) `
  width: 12px;
  height: 20px;
  display: inline-block;
  background: ${({ kind }) => (kind === 'last-year' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_40 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_90)};
`;
const MetricsVisualChartSection = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const MetricsVisualChartRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: stretch;
  gap: 10px;
`;
const MetricsVisualAxisColumn = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  width: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4px;
`;
const MetricsVisualAxisTicks = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 12px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
const MetricsVisualAxisLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
  font-size: 12px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  white-space: nowrap;
`;
const MetricsVisualBarsColumn = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1;
  min-width: 0;
`;
const MetricsVisualBarsTrack = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  height: 120px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;
`;
const MetricsVisualBarGroup = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
`;
const MetricsVisualBar = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
    shouldForwardProp: propName => !['kind', 'heightPercent'].includes(propName),
}) `
  display: block;
  width: 10px;
  height: ${({ heightPercent }) => `${heightPercent}%`};
  min-height: 2px;
  background: ${({ kind }) => (kind === 'last-year' ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_40 : _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_90)};
`;
const MetricsVisualLabelsRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 14px;
`;
const MetricsVisualLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
const MetricsVisualUpdatedAt = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin-top: 6px;
  font-size: 13px;
  line-height: 16px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
`;
const LeftCol = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen', 'campaignCanvas'].includes(propName) }) `
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 24px 24px 0;
  ${({ fullScreen }) => fullScreen
    ? `
  display: none;
`
    : ''}
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  overflow-y: ${({ twoCols }) => (twoCols ? 'auto' : 'visible')};

  ${({ campaignCanvas }) => campaignCanvas
    ? `
    > :not([data-campaign-canvas='true']) {
      display: none;
    }
  `
    : ''}
`;
const RightCol = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen'].includes(propName) }) `
  padding: 0;
  min-width: 0;
  min-height: 0;
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  overflow: ${({ twoCols }) => (twoCols ? 'hidden' : 'visible')};
  position: relative;
`;
const HomeMaxResizeHandle = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  position: absolute;
  top: 0;
  left: -6px;
  bottom: 0;
  width: 12px;
  cursor: col-resize;
  z-index: 10;

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      width: 2px;
      background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
    }
  }
`;
const SidePanelViewport = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('div', { shouldForwardProp: propName => !['twoCols', 'fullScreen'].includes(propName) }) `
  height: ${({ twoCols }) => (twoCols ? '100%' : 'auto')};
  margin: 0;
`;
const FloatingAiButton = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.IconButton)) `
  position: fixed;
  right: 16px;
  bottom: 72px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 999px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60} !important;
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.25);
  z-index: ${_amadeus_react_design_factory_styles__WEBPACK_IMPORTED_MODULE_2__.zIndex.stickyFooter};

  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_80} !important;
  }

  .amadeus-icon {
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0} !important;
  }
`;
const FloatingPanelOverlay = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  position: fixed;
  right: 16px;
  top: 54px;
  bottom: 0;
  width: 360px;
  z-index: ${_amadeus_react_design_factory_styles__WEBPACK_IMPORTED_MODULE_2__.zIndex.drawer};
  box-shadow: 0 8px 24px rgba(0, 8, 53, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/Home.tsx"
/*!**********************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/Home.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var antd_es_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/grid */ "./node_modules/antd/es/grid/index.js");
/* harmony import */ var antd_es_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/layout */ "./node_modules/antd/es/layout/index.js");
/* harmony import */ var _mediahub_mediahub_ui_pages_Home_SectionLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/Home/SectionLayout */ "./apps/mediahub-ui/pages/Home/SectionLayout/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_pages_Home_HomeModules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mediahub/mediahub-ui/pages/Home/HomeModules */ "./apps/mediahub-ui/pages/Home/HomeModules/index.ts");
/* harmony import */ var _MediaPlannerClosedWonNotification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MediaPlannerClosedWonNotification */ "./apps/mediahub-ui/pages/Home/MediaPlannerClosedWonNotification.tsx");
/* harmony import */ var _MediaPlannerGrowthOpportunityNotification__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MediaPlannerGrowthOpportunityNotification */ "./apps/mediahub-ui/pages/Home/MediaPlannerGrowthOpportunityNotification.tsx");
/* harmony import */ var _mediahub_mediahub_ui_components_Notifications__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/Notifications */ "./apps/mediahub-ui/components/Notifications/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_CopilotWidget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/CopilotWidget */ "./apps/mediahub-ui/components/CopilotWidget/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_AmadeusMaxPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/AmadeusMaxPanel */ "./apps/mediahub-ui/components/AmadeusMaxPanel/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_CampaignCreationCanvas_CampaignCreationCanvas__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/CampaignCreationCanvas/CampaignCreationCanvas */ "./apps/mediahub-ui/components/CampaignCreationCanvas/CampaignCreationCanvas.tsx");
/* harmony import */ var _mediahub_mediahub_ui_components_MediaPlanCanvas_MediaPlanCanvas__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/MediaPlanCanvas/MediaPlanCanvas */ "./apps/mediahub-ui/components/MediaPlanCanvas/MediaPlanCanvas.tsx");
/* harmony import */ var _mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var _Home_styled__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Home.styled */ "./apps/mediahub-ui/pages/Home/Home.styled.ts");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _WelcomeModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./WelcomeModal */ "./apps/mediahub-ui/pages/Home/WelcomeModal/index.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");



















const { Content } = antd_es_layout__WEBPACK_IMPORTED_MODULE_4__["default"];
const { useBreakpoint } = antd_es_grid__WEBPACK_IMPORTED_MODULE_3__["default"];
const RIGHT_PANEL_STORAGE_KEY = 'mediahub.rightPanel.active';
const MAX_PANEL_WIDTH_STORAGE_KEY = 'mediahub.amadeusMax.panelWidth.v2';
const DEFAULT_PANEL_WIDTH = 360;
const MIN_PANEL_WIDTH = 300;
const MAX_PANEL_WIDTH = 800;
// Largest the Amadeus Max panel can be resized to: up to MAX_PANEL_WIDTH (800px),
// but never wider than the viewport.
const getMaxPanelWidth = () => (typeof window === 'undefined' ? MAX_PANEL_WIDTH : Math.min(MAX_PANEL_WIDTH, window.innerWidth));
const isRightPanelType = (value) => {
    return value === 'amadeus-max' || value === 'ai-chat' || value === 'notifications';
};
const chartAdvertiserPerformanceRows = [
    {
        advertiser: 'Marriott Hotels',
        impressions: { value: 1850000, changePercent: 14.2 },
        spend: { value: 25600, changePercent: -9.2 },
        bookings: { value: 385000, changePercent: 12.6 },
        roas: { value: 3.7, changePercent: 24.1 },
    },
    {
        advertiser: 'Hilton Worldwide',
        impressions: { value: 1420000, changePercent: 2.9 },
        spend: { value: 19800, changePercent: 7.0 },
        bookings: { value: 292000, changePercent: 6.2 },
        roas: { value: 3.2, changePercent: -0.8 },
    },
    {
        advertiser: 'IHG Hotels & Resorts',
        impressions: { value: 980000, changePercent: 15.3 },
        spend: { value: 13700, changePercent: -9.9 },
        bookings: { value: 201000, changePercent: 8.6 },
        roas: { value: 3.0, changePercent: 20.4 },
    },
    {
        advertiser: 'Hyatt Hotels',
        impressions: { value: 750000, changePercent: 4.2 },
        spend: { value: 10500, changePercent: 7.1 },
        bookings: { value: 158000, changePercent: 9.0 },
        roas: { value: 2.9, changePercent: 1.8 },
    },
    {
        advertiser: 'Accor Hotels',
        impressions: { value: 540000, changePercent: -6.9 },
        spend: { value: 7600, changePercent: -6.2 },
        bookings: { value: 118000, changePercent: -5.6 },
        roas: { value: 2.6, changePercent: 0.7 },
    },
    {
        advertiser: 'Wyndham Hotels',
        impressions: { value: 385000, changePercent: -3.8 },
        spend: { value: 5400, changePercent: -6.9 },
        bookings: { value: 82000, changePercent: -6.8 },
        roas: { value: 2.8, changePercent: 0.1 },
    },
    {
        advertiser: 'Choice Hotels',
        impressions: { value: 320000, changePercent: 10.3 },
        spend: { value: 4500, changePercent: 7.1 },
        bookings: { value: 68000, changePercent: 9.7 },
        roas: { value: 2.9, changePercent: 2.4 },
    },
    {
        advertiser: 'Best Western',
        impressions: { value: 295000, changePercent: -4.8 },
        spend: { value: 4100, changePercent: -4.7 },
        bookings: { value: 61000, changePercent: -6.2 },
        roas: { value: 2.7, changePercent: -1.1 },
    },
    {
        advertiser: 'Radisson Hotel Group',
        impressions: { value: 185000, changePercent: 5.7 },
        spend: { value: 2600, changePercent: 8.3 },
        bookings: { value: 38000, changePercent: 8.6 },
        roas: { value: 2.5, changePercent: -2.5 },
    },
    {
        advertiser: 'Four Seasons',
        impressions: { value: 165000, changePercent: 6.5 },
        spend: { value: 2300, changePercent: 9.5 },
        bookings: { value: 52000, changePercent: 8.3 },
        roas: { value: 2.4, changePercent: -3.2 },
    },
];
const advertiserPerformanceRows = [...chartAdvertiserPerformanceRows];
const formatCompactNumber = (value) => {
    if (value >= 1000000)
        return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000)
        return `${Math.round(value / 1000)}K`;
    return `${value}`;
};
const formatCurrency = (value) => {
    if (value >= 1000000)
        return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000)
        return `$${Math.round(value / 1000)}K`;
    return `$${value}`;
};
const formatRoaS = (value) => `${value.toFixed(1)}x`;
const getTrendKind = (changePercent, options) => {
    if (Math.abs(changePercent) < 0.1)
        return 'neutral';
    const isPositive = options?.invert ? changePercent < 0 : changePercent > 0;
    return isPositive ? 'positive' : 'negative';
};
const formatChangePercent = (value) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
const getTrendSymbol = (trendKind) => {
    if (trendKind === 'neutral')
        return '•';
    return trendKind === 'positive' ? '▲' : '▼';
};
const deriveLastYearValue = (currentValue, changePercent) => {
    const denominator = 1 + changePercent / 100;
    if (denominator <= 0)
        return currentValue;
    return currentValue / denominator;
};
const metricsVisualKpis = ['spend', 'bookings', 'roas', 'revenue'];
const getScaleStep = (metricKey, rawMaxValue) => {
    if (metricKey === 'roas') {
        if (rawMaxValue <= 2.5)
            return 0.25;
        if (rawMaxValue <= 4.0)
            return 0.5;
        return 1;
    }
    if (metricKey === 'bookings') {
        if (rawMaxValue <= 120000)
            return 10000;
        if (rawMaxValue <= 260000)
            return 25000;
        return 50000;
    }
    if (rawMaxValue <= 1600000)
        return 200000;
    if (rawMaxValue <= 3500000)
        return 250000;
    return 500000;
};
const formatAxisTickLabel = (metricKey, value) => {
    if (value === 0)
        return '0';
    if (metricKey === 'roas') {
        const rounded = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
        return `${rounded}x`;
    }
    if (metricKey === 'bookings') {
        if (value >= 1000) {
            const inThousands = value / 1000;
            return Number.isInteger(inThousands) ? `${inThousands.toFixed(0)}K` : `${inThousands.toFixed(1)}K`;
        }
        return `${Math.round(value)}`;
    }
    if (value >= 1000000) {
        const inMillions = value / 1000000;
        return Number.isInteger(inMillions) ? `${inMillions.toFixed(0)}M` : `${inMillions.toFixed(1)}M`;
    }
    const inThousands = value / 1000;
    return Number.isInteger(inThousands) ? `${inThousands.toFixed(0)}K` : `${inThousands.toFixed(1)}K`;
};
const buildMetricScale = (metricKey, rawMaxValue) => {
    const step = getScaleStep(metricKey, rawMaxValue);
    const maxWithHeadroom = rawMaxValue * 1.12;
    const maxValue = Math.ceil(maxWithHeadroom / step) * step;
    const quarterStep = maxValue / 4;
    return {
        maxValue,
        tickLabels: [4, 3, 2, 1, 0].map(multiplier => formatAxisTickLabel(metricKey, quarterStep * multiplier)),
    };
};
const metricsVisualProfiles = [
    {
        spendCurrent: 4200000,
        spendChangePercent: 11.4,
        bookingsCurrent: 402000,
        bookingsChangePercent: 12.6,
        roasCurrent: 4.1,
        roasChangePercent: 10.8,
    },
    {
        spendCurrent: 3650000,
        spendChangePercent: -3.6,
        bookingsCurrent: 338000,
        bookingsChangePercent: 5.2,
        roasCurrent: 3.7,
        roasChangePercent: -1.4,
    },
    {
        spendCurrent: 2980000,
        spendChangePercent: 7.8,
        bookingsCurrent: 276000,
        bookingsChangePercent: 8.9,
        roasCurrent: 3.4,
        roasChangePercent: 6.1,
    },
    {
        spendCurrent: 2410000,
        spendChangePercent: 2.9,
        bookingsCurrent: 221000,
        bookingsChangePercent: 4.4,
        roasCurrent: 3.1,
        roasChangePercent: 1.8,
    },
    {
        spendCurrent: 1870000,
        spendChangePercent: -6.8,
        bookingsCurrent: 178000,
        bookingsChangePercent: -4.1,
        roasCurrent: 2.8,
        roasChangePercent: -2.4,
    },
    {
        spendCurrent: 1540000,
        spendChangePercent: -2.7,
        bookingsCurrent: 146000,
        bookingsChangePercent: -1.9,
        roasCurrent: 2.9,
        roasChangePercent: 0.9,
    },
    {
        spendCurrent: 1260000,
        spendChangePercent: 4.2,
        bookingsCurrent: 119000,
        bookingsChangePercent: 6.4,
        roasCurrent: 3.0,
        roasChangePercent: 2.1,
    },
    {
        spendCurrent: 980000,
        spendChangePercent: -4.9,
        bookingsCurrent: 98000,
        bookingsChangePercent: -5.3,
        roasCurrent: 2.6,
        roasChangePercent: -1.7,
    },
    {
        spendCurrent: 760000,
        spendChangePercent: 1.6,
        bookingsCurrent: 77000,
        bookingsChangePercent: 2.2,
        roasCurrent: 2.5,
        roasChangePercent: -0.9,
    },
    {
        spendCurrent: 640000,
        spendChangePercent: -5.4,
        bookingsCurrent: 69000,
        bookingsChangePercent: -3.8,
        roasCurrent: 2.3,
        roasChangePercent: -2.6,
    },
];
const buildFallbackMetricsProfile = (row) => ({
    spendCurrent: Math.round(row.spend.value * 300),
    spendChangePercent: row.spend.changePercent,
    bookingsCurrent: Math.round(row.bookings.value),
    bookingsChangePercent: row.bookings.changePercent,
    roasCurrent: Number(row.roas.value.toFixed(2)),
    roasChangePercent: row.roas.changePercent,
});
const metricsVisualData = chartAdvertiserPerformanceRows.map((row, index) => {
    const profile = metricsVisualProfiles[index] ?? buildFallbackMetricsProfile(row);
    const spendCurrent = profile.spendCurrent;
    const spendLastYear = Math.round(deriveLastYearValue(spendCurrent, profile.spendChangePercent));
    const bookingsCurrent = profile.bookingsCurrent;
    const bookingsLastYear = Math.round(deriveLastYearValue(bookingsCurrent, profile.bookingsChangePercent));
    const roasCurrent = Number(profile.roasCurrent.toFixed(2));
    const roasLastYear = Number(deriveLastYearValue(roasCurrent, profile.roasChangePercent).toFixed(2));
    const revenueCurrent = Math.round(bookingsCurrent * roasCurrent * 3.0);
    const revenueLastYear = Math.round(bookingsLastYear * roasLastYear * 3.0);
    return {
        advertiser: row.advertiser,
        spend: {
            lastYear: spendLastYear,
            currentYear: spendCurrent,
        },
        bookings: {
            lastYear: bookingsLastYear,
            currentYear: bookingsCurrent,
        },
        roas: {
            lastYear: roasLastYear,
            currentYear: roasCurrent,
        },
        revenue: {
            lastYear: revenueLastYear,
            currentYear: revenueCurrent,
        },
    };
});
const metricScales = metricsVisualKpis.reduce((accumulator, metricKey) => {
    const rawMaxValue = Math.max(...metricsVisualData.map(dataPoint => Math.max(dataPoint[metricKey].lastYear, dataPoint[metricKey].currentYear)));
    accumulator[metricKey] = buildMetricScale(metricKey, rawMaxValue);
    return accumulator;
}, {});
const getPerformanceScore = (row) => {
    const impressionsScore = row.impressions.changePercent;
    const spendScore = -row.spend.changePercent;
    const bookingsScore = row.bookings.changePercent;
    const roasScore = row.roas.changePercent;
    return impressionsScore * 0.2 + spendScore * 0.2 + bookingsScore * 0.3 + roasScore * 0.3;
};
const Home = () => {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['home', 'common']);
    const screens = useBreakpoint();
    const twoCols = !!screens.lg;
    const location = (0,react_router__WEBPACK_IMPORTED_MODULE_18__.useLocation)();
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_18__.useNavigate)();
    const searchParams = new URLSearchParams(location.search);
    const selectedPanel = searchParams.get('panel');
    const selectedLayoutMode = searchParams.get('layout');
    const persistedPanel = !selectedPanel && typeof window !== 'undefined' ? window.sessionStorage.getItem(RIGHT_PANEL_STORAGE_KEY) : null;
    const homePanel = isRightPanelType(selectedPanel)
        ? selectedPanel
        : isRightPanelType(persistedPanel)
            ? persistedPanel
            : 'notifications';
    const showAmadeusMax = homePanel === 'amadeus-max';
    const showAiChat = homePanel === 'ai-chat';
    const showNotifications = !showAiChat && !showAmadeusMax;
    const isFullScreenPanel = showAmadeusMax && selectedLayoutMode === 'full-screen';
    const [metricsTab, setMetricsTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('kpi-trends');
    const [isFloatingMaxOpen, setIsFloatingMaxOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { aiWorkspaceMode: isCampaignCanvasOpen, aiWorkspaceType } = (0,_mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_14__.useCampaignFlowState)();
    const setIsCampaignCanvasOpen = _mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_14__.setCampaignWorkspaceOpen;
    const [maxPanelWidth, setMaxPanelWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => typeof window === 'undefined'
        ? 360
        : Math.max(MIN_PANEL_WIDTH, Math.min(getMaxPanelWidth(), Number(window.sessionStorage.getItem(MAX_PANEL_WIDTH_STORAGE_KEY)) || 360)));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        window.sessionStorage.setItem(MAX_PANEL_WIDTH_STORAGE_KEY, String(maxPanelWidth));
    }, [maxPanelWidth]);
    const homePanelWidth = showAmadeusMax ? maxPanelWidth : DEFAULT_PANEL_WIDTH;
    const handleMaxPanelResizeStart = (event) => {
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = maxPanelWidth;
        const handlePointerMove = (moveEvent) => {
            const maxWidth = Math.max(MIN_PANEL_WIDTH, getMaxPanelWidth());
            const nextWidth = startWidth + (startX - moveEvent.clientX);
            setMaxPanelWidth(Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, nextWidth)));
        };
        const handlePointerUp = () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };
    const rankedAdvertisers = [...advertiserPerformanceRows].sort((firstRow, secondRow) => getPerformanceScore(secondRow) - getPerformanceScore(firstRow));
    const needsAttentionAdvertisers = [...advertiserPerformanceRows]
        .sort((firstRow, secondRow) => firstRow.roas.changePercent - secondRow.roas.changePercent)
        .slice(0, 10);
    const topSpendersAdvertisers = [...advertiserPerformanceRows]
        .sort((firstRow, secondRow) => secondRow.spend.value - firstRow.spend.value)
        .slice(0, 10);
    const underperformers = rankedAdvertisers.slice(-4).reverse();
    const renderVisualChartRow = (metricLabel, metricKey) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualChartRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualAxisColumn, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualAxisTicks, { children: metricScales[metricKey].tickLabels.map(tickLabel => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: tickLabel }, `${metricLabel}-${tickLabel}`))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualAxisLabel, { children: metricLabel })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualBarsColumn, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualBarsTrack, { children: metricsVisualData.map((dataPoint, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualBarGroup, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualBar, { kind: 'last-year', heightPercent: (dataPoint[metricKey].lastYear / metricScales[metricKey].maxValue) * 100 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualBar, { kind: 'current-year', heightPercent: (dataPoint[metricKey].currentYear / metricScales[metricKey].maxValue) * 100 })] }, `${metricLabel}-${index + 1}`))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLabelsRow, { children: metricsVisualData.map((dataPoint, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLabel, { children: dataPoint.advertiser }, `${metricLabel}-label-${index + 1}`))) })] })] }));
    const handleCloseChatPanel = () => {
        navigate({ pathname: '/', search: '?panel=notifications' });
    };
    const handleAmadeusMaxLayoutChange = (layoutMode) => {
        if (layoutMode === 'floating') {
            setIsFloatingMaxOpen(true);
            navigate({ pathname: '/', search: '?panel=notifications' });
            return;
        }
        setIsFloatingMaxOpen(false);
        const nextParams = new URLSearchParams(location.search);
        nextParams.set('panel', 'amadeus-max');
        nextParams.set('layout', layoutMode);
        navigate({ pathname: '/', search: `?${nextParams.toString()}` });
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WelcomeModal__WEBPACK_IMPORTED_MODULE_17__["default"], {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.Page, { as: Content, twoCols: twoCols, fullScreen: isFullScreenPanel && !isCampaignCanvasOpen, panelWidth: homePanelWidth, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.LeftCol, { twoCols: twoCols, fullScreen: isFullScreenPanel && !isCampaignCanvasOpen, campaignCanvas: isCampaignCanvasOpen, children: [isCampaignCanvasOpen ? (aiWorkspaceType === 'media-plan' ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_MediaPlanCanvas_MediaPlanCanvas__WEBPACK_IMPORTED_MODULE_13__["default"], {}) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_CampaignCreationCanvas_CampaignCreationCanvas__WEBPACK_IMPORTED_MODULE_12__.CampaignCreationCanvas, {})) : null, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_16__.Text.H3, { children: 'Welcome to Amadeus travel advertising platform' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_Home_SectionLayout__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Advertiser Performance Metrics', titleStyle: { fontSize: 14 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.CarouselSection, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTabs, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTabButton, { active: metricsTab === 'kpi-trends', type: 'button', onClick: () => setMetricsTab('kpi-trends'), children: "Needs attention" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTabButton, { active: metricsTab === 'top-performers', type: 'button', onClick: () => setMetricsTab('top-performers'), children: "Top Spenders" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTabButton, { active: metricsTab === 'underperformers', type: 'button', onClick: () => setMetricsTab('underperformers'), children: "Spend & Booking" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTabButton, { active: metricsTab === 'comparison', type: 'button', onClick: () => setMetricsTab('comparison'), children: "ROAS & Revenue" })] }), (metricsTab === 'kpi-trends' || metricsTab === 'top-performers') && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualPeriod, { children: "Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)" })), metricsTab === 'kpi-trends' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableWrap, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTable, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Advertiser" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Impressions" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Impr YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Spend" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Spend YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Bookings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Bookings YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "ROAS" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "ROAS YoY" })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", { children: needsAttentionAdvertisers.map(row => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: row.advertiser }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCompactNumber(row.impressions.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.impressions.changePercent), children: [getTrendSymbol(getTrendKind(row.impressions.changePercent)), ' ', formatChangePercent(row.impressions.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCurrency(row.spend.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.spend.changePercent, { invert: true }), children: [getTrendSymbol(getTrendKind(row.spend.changePercent, { invert: true })), ' ', formatChangePercent(row.spend.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCompactNumber(row.bookings.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.bookings.changePercent), children: [getTrendSymbol(getTrendKind(row.bookings.changePercent)), ' ', formatChangePercent(row.bookings.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatRoaS(row.roas.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.roas.changePercent), children: [getTrendSymbol(getTrendKind(row.roas.changePercent)), ' ', formatChangePercent(row.roas.changePercent)] }) })] }, row.advertiser))) })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualUpdatedAt, { children: "Data last updated on: 31-Jan-2026" })] })) : metricsTab === 'top-performers' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsPanel, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTablePanelBody, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTable, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Advertiser" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "ROAS" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "ROAS YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Spend" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Spend YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Impressions" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Impr YoY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Bookings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableHeadCell, { children: "Bookings YoY" })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", { children: topSpendersAdvertisers.map(row => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: row.advertiser }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatRoaS(row.roas.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.roas.changePercent), children: [getTrendSymbol(getTrendKind(row.roas.changePercent)), ' ', formatChangePercent(row.roas.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCurrency(row.spend.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.spend.changePercent, { invert: true }), children: [getTrendSymbol(getTrendKind(row.spend.changePercent, { invert: true })), ' ', formatChangePercent(row.spend.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCompactNumber(row.impressions.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.impressions.changePercent), children: [getTrendSymbol(getTrendKind(row.impressions.changePercent)), ' ', formatChangePercent(row.impressions.changePercent)] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: formatCompactNumber(row.bookings.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTableCell, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsTrend, { trendKind: getTrendKind(row.bookings.changePercent), children: [getTrendSymbol(getTrendKind(row.bookings.changePercent)), ' ', formatChangePercent(row.bookings.changePercent)] }) })] }, `top-${row.advertiser}`))) })] }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualUpdatedAt, { children: "Data last updated on: 31-Jan-2026" })] })) : metricsTab === 'underperformers' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualContainer, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualHeader, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualPeriod, { children: "Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegend, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendItem, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendSwatch, { kind: 'last-year' }), "Last Year"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendItem, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendSwatch, { kind: 'current-year' }), "Current Year"] })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualChartSection, { children: [renderVisualChartRow('Spend', 'spend'), renderVisualChartRow('Bookings', 'bookings')] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualUpdatedAt, { children: "Data last updated on: 31-Jan-2026" })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualContainer, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualHeader, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualPeriod, { children: "Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegend, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendItem, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendSwatch, { kind: 'last-year' }), "Last Year"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendItem, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualLegendSwatch, { kind: 'current-year' }), "Current Year"] })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualChartSection, { children: [renderVisualChartRow('ROAS', 'roas'), renderVisualChartRow('Revenue', 'revenue')] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.MetricsVisualUpdatedAt, { children: "Data last updated on: 31-Jan-2026" })] }))] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_Home_SectionLayout__WEBPACK_IMPORTED_MODULE_5__["default"], { title: t('home:modules'), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_Home_HomeModules__WEBPACK_IMPORTED_MODULE_6__["default"], {}) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.RightCol, { twoCols: twoCols, fullScreen: isFullScreenPanel, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.SidePanelViewport, { twoCols: twoCols, fullScreen: isFullScreenPanel, children: [showAiChat ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_CopilotWidget__WEBPACK_IMPORTED_MODULE_10__.CopilotWidget, { titleText: 'AskMia', displayMode: 'inline', showTrigger: false, onClosePanel: handleCloseChatPanel })) : showAmadeusMax ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_AmadeusMaxPanel__WEBPACK_IMPORTED_MODULE_11__.AmadeusMaxPanel, { onClosePanel: handleCloseChatPanel, layoutMode: selectedLayoutMode === 'full-screen' ? 'full-screen' : 'sidebar', onLayoutModeChange: handleAmadeusMaxLayoutChange, onCampaignCanvasChange: setIsCampaignCanvasOpen, campaignCanvasOpen: isCampaignCanvasOpen })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { paddingTop: 24, paddingRight: 24 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_pages_Home_SectionLayout__WEBPACK_IMPORTED_MODULE_5__["default"], { title: 'Notifications', link: { enabled: true, url: '/notifications', title: 'View All' }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications__WEBPACK_IMPORTED_MODULE_9__.Notifications, { contractExtraContent: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MediaPlannerClosedWonNotification__WEBPACK_IMPORTED_MODULE_7__["default"], {}), performanceExtraContent: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MediaPlannerGrowthOpportunityNotification__WEBPACK_IMPORTED_MODULE_8__["default"], {}) }) }) })), showAmadeusMax && !isFullScreenPanel && !isFloatingMaxOpen ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.HomeMaxResizeHandle, { onPointerDown: handleMaxPanelResizeStart, "aria-label": 'Resize Amadeus Max panel' })) : null] }) })] }), isFloatingMaxOpen ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Home_styled__WEBPACK_IMPORTED_MODULE_15__.FloatingPanelOverlay, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_AmadeusMaxPanel__WEBPACK_IMPORTED_MODULE_11__.AmadeusMaxPanel, { onClosePanel: () => setIsFloatingMaxOpen(false), layoutMode: 'floating', onLayoutModeChange: handleAmadeusMaxLayoutChange, onCampaignCanvasChange: setIsCampaignCanvasOpen, campaignCanvasOpen: isCampaignCanvasOpen }) })) : null] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.styled.ts"
/*!***********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.styled.ts ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridWrapper: () => (/* binding */ GridWrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");

const GridWrapper = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])('div') `
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  align-items: start;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.tsx"
/*!*****************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.tsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _HomeModules_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HomeModules.styled */ "./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.styled.ts");
/* harmony import */ var _ModuleCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModuleCard */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/index.ts");
/* harmony import */ var _ModuleCardTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ModuleCardTitle */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/index.ts");
/* harmony import */ var _ModuleCardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ModuleCardContent */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_api_useATAPLinks_useATAPLinks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mediahub/mediahub-ui/api/useATAPLinks/useATAPLinks */ "./apps/mediahub-ui/api/useATAPLinks/useATAPLinks.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_featureFlags__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/featureFlags */ "./apps/mediahub-ui/shared/featureFlags.ts");











const HomeModules = () => {
    const { isAdmin, isExternal } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_7__.useAuth)();
    const externalLinks = (0,_mediahub_mediahub_ui_api_useATAPLinks_useATAPLinks__WEBPACK_IMPORTED_MODULE_9__.useATAPLinks)();
    const { t: tNav } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('nav');
    const { t: tHome } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('home');
    const MODULES = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => {
        if (!externalLinks)
            return [];
        return [
            {
                key: 'advertisers',
                title: tNav('advertisers'),
                description: tHome('moduleCards.advertisers.desc'),
                links: [{ label: tHome('moduleCards.advertisers.link'), url: `${externalLinks?.advertisers}?isFollowingOnly=true` }],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'wallet', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'media-planning',
                title: 'Media Planning & Requests',
                description: 'Contains media planning module , monthly distributions & margin calculator.',
                links: [
                    {
                        label: 'Media Plan Calculator',
                        subLinks: [
                            { label: 'NORAM single-property', url: externalLinks?.mediaPlanning?.singleProperty },
                            { label: 'NORAM multi-property', url: externalLinks?.mediaPlanning?.multiProperty },
                            { label: 'International', url: externalLinks?.mediaPlanning?.international },
                        ],
                    },
                    ...(_mediahub_mediahub_ui_shared_featureFlags__WEBPACK_IMPORTED_MODULE_10__.featureFlags.mediaPlan
                        ? [
                            {
                                label: 'Media Planner',
                                url: `${externalLinks?.mediaPlanning?.mediaplanner}?myPlansOnly=true`,
                            },
                        ]
                        : []),
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'clipboardListCheck', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'campaign-management',
                title: 'Campaign Management & Setup',
                description: 'Campaign Setup & Management on different platforms.',
                links: [
                    // Campaigns + Unmapped Campaigns removed from the Home card (still in the left nav).
                    { label: 'Campaign Setup', url: '/all-campaigns' },
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'ad', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'campaign-optimization',
                title: isExternal ? tNav('campaignOptimization') : tNav('campaignOptimizationPacing'),
                description: tHome('moduleCards.campaignOpt.desc'),
                links: [
                    ...(isExternal ? [] : [{ label: 'Pacing Tool', url: externalLinks?.campaignOptimization?.pacingTool }]),
                    { label: isExternal ? tHome('moduleCards.campaignOpt.link') : 'OBA', url: externalLinks?.campaignOptimization?.oba },
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'slidersV', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'reports',
                title: 'Reports',
                description: 'Covers diverse campaign reports both internal and customer facing.',
                links: [
                    { label: 'DMIC', url: externalLinks?.reports?.dmic },
                    { label: 'ROAS', url: externalLinks?.reports?.roas },
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'chartBar', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'market-insights',
                title: 'Market Insights',
                description: 'Links to different TI tools that provide key market insights.',
                links: [
                    { label: 'TI Portal', url: externalLinks?.marketInsights?.tiPortal },
                    { label: 'AMI', url: externalLinks?.marketInsights?.ami },
                    { label: 'Google Travel Analytics', url: externalLinks?.marketInsights?.googleTravelAnalytics },
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'chartLine', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'data-management',
                title: 'Data Management',
                description: 'Includes generic data setups across modules and Advertisers.',
                links: [
                    { label: 'Data Partners', url: externalLinks?.dataManagement?.datapartners },
                    { label: 'Audience Rules', url: externalLinks?.dataManagement?.audienceBuilder },
                    { label: 'Audience', url: externalLinks?.dataManagement?.audience },
                ],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'database', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'pricing-billing',
                title: 'Pricing & Billing',
                description: 'Includes links to invoicing tools.',
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'fileInvoiceDollar', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
            {
                key: 'user-management',
                title: tNav('userManagement'),
                description: tHome('moduleCards.userMgmt.desc'),
                links: [{ label: tHome('moduleCards.userMgmt.link'), url: externalLinks?.userManagement }],
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.Icon, { name: 'userCog', width: 21, height: 21, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_8__.colors.sky_80 }),
            },
        ];
    }, [externalLinks, isExternal, tNav, tHome]);
    const externalHiddenKeys = ['media-planning', 'campaign-management', 'reports', 'market-insights', 'data-management', 'pricing-billing'];
    // Temporarily hidden module-card links, by label. Hidden for now — remove a label here
    // to restore the link. Applied to top-level links and their sub-links.
    const hiddenLinkLabels = new Set([
        'Media Plan Calculator',
        'Campaigns',
        'Unmapped Campaigns',
        'Insite',
        'Ad Copies Creator',
        'Pacing Tool',
        'ROAS',
    ]);
    const filteredModules = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return MODULES.filter(m => {
            if (m.key === 'user-management')
                return isAdmin;
            if (isExternal && externalHiddenKeys.includes(m.key))
                return false;
            return true;
        }).map(m => m.links
            ? {
                ...m,
                links: m.links
                    .filter(link => !hiddenLinkLabels.has(link.label))
                    .map(link => link.subLinks ? { ...link, subLinks: link.subLinks.filter(sub => !hiddenLinkLabels.has(sub.label)) } : link),
            }
            : m);
    }, [isAdmin, isExternal, MODULES]);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_HomeModules_styled__WEBPACK_IMPORTED_MODULE_3__.GridWrapper, { children: filteredModules.map(m => {
            const Title = () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModuleCardTitle__WEBPACK_IMPORTED_MODULE_5__["default"], { icon: m.icon, text: m.title });
            const Content = () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModuleCardContent__WEBPACK_IMPORTED_MODULE_6__["default"], { description: m.description, links: m.links });
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModuleCard__WEBPACK_IMPORTED_MODULE_4__["default"], { Title: Title, Content: Content }, m.key);
        }) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HomeModules);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.styled.ts"
/*!*********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.styled.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CardBody: () => (/* binding */ CardBody),
/* harmony export */   CardHeader: () => (/* binding */ CardHeader),
/* harmony export */   CardRoot: () => (/* binding */ CardRoot)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const CardRoot = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].article `
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 8px;
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  cursor: default;

  &:hover,
  &:focus-within {
    border-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
`;
const CardHeader = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].header `
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
`;
const CardBody = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  gap: 10px;

  p {
    margin: 0;
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
    font-size: 13px;
    line-height: 1.4;
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.tsx"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.tsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _ModuleCard_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModuleCard.styled */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.styled.ts");


const ModuleCard = ({ Title, Content, onClick, className }) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ModuleCard_styled__WEBPACK_IMPORTED_MODULE_1__.CardRoot, { className: className, onClick: onClick, role: 'group', tabIndex: 0, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModuleCard_styled__WEBPACK_IMPORTED_MODULE_1__.CardHeader, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Title, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModuleCard_styled__WEBPACK_IMPORTED_MODULE_1__.CardBody, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Content, {}) })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModuleCard);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/index.ts"
/*!*********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/index.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _ModuleCard__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ModuleCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModuleCard */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCard/ModuleCard.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.styled.ts"
/*!*****************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.styled.ts ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentWrapper: () => (/* binding */ ContentWrapper),
/* harmony export */   Description: () => (/* binding */ Description),
/* harmony export */   LinksWrapper: () => (/* binding */ LinksWrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const ContentWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Description = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].p `
  margin: 0 0 12px 0;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  font-size: 13px;
  line-height: 1.4;
`;
const LinksWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].nav `
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.tsx"
/*!***********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.tsx ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var antd_es_popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/es/popover */ "./node_modules/antd/es/popover/index.js");
/* harmony import */ var _CardContent_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CardContent.styled */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.styled.ts");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");





const CardContent = ({ description, links = [] }) => {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();
    const handleNavigation = (href) => {
        if (!href)
            return;
        const isExternal = href.startsWith('http://') || href.startsWith('https://');
        if (isExternal) {
            window.open(href, '_blank');
        }
        else {
            navigate(href);
        }
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CardContent_styled__WEBPACK_IMPORTED_MODULE_2__.ContentWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CardContent_styled__WEBPACK_IMPORTED_MODULE_2__.Description, { children: description }), links.length > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CardContent_styled__WEBPACK_IMPORTED_MODULE_2__.LinksWrapper, { "aria-label": 'Amadeus Home Modules links', children: links.map((link, index) => {
                    if (link.subLinks && link.subLinks.length > 0) {
                        const popoverContent = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: link.subLinks.map((subLink, subIndex) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Link, { onClick: () => handleNavigation(subLink.url), children: subLink.label }, subIndex))) }));
                        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_popover__WEBPACK_IMPORTED_MODULE_1__["default"], { content: popoverContent, trigger: 'hover', placement: 'bottom', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Link, { id: `amadeus-home-modules-link-${index}`, href: '#', onClick: e => e.preventDefault(), children: link.label }, index) }, index));
                    }
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Link, { onClick: () => handleNavigation(link.url), children: link.label }, index));
                }) }))] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardContent);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/index.ts"
/*!****************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/index.ts ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _CardContent__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _CardContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardContent */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardContent/CardContent.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.styled.tsx"
/*!**************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.styled.tsx ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconWrapper: () => (/* binding */ IconWrapper),
/* harmony export */   TitleRow: () => (/* binding */ TitleRow)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const TitleRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
`;
const IconWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  border-radius: 4px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.tsx"
/*!*******************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.tsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _CardTitle_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CardTitle.styled */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.styled.tsx");



const CardTitle = ({ icon, text }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CardTitle_styled__WEBPACK_IMPORTED_MODULE_2__.TitleRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CardTitle_styled__WEBPACK_IMPORTED_MODULE_2__.IconWrapper, { children: icon }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H5, { children: text })] }));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardTitle);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/index.ts"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/index.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _CardTitle__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _CardTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardTitle */ "./apps/mediahub-ui/pages/Home/HomeModules/ModuleCardTitle/CardTitle.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/HomeModules/index.ts"
/*!**********************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/HomeModules/index.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _HomeModules__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _HomeModules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomeModules */ "./apps/mediahub-ui/pages/Home/HomeModules/HomeModules.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/MediaPlannerClosedWonNotification.tsx"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/MediaPlannerClosedWonNotification.tsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/Notifications/NotificationCard/NotificationCard.styled */ "./apps/mediahub-ui/components/Notifications/NotificationCard/NotificationCard.styled.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");







const mediaPlanName = 'Amadeus Hotels All year 2027 Rooms';
const notificationMessage = `BID-1234 - Amadeus Hotels - Media plan '${mediaPlanName}' is closed-won.`;
const MediaPlannerPill = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.OBAButton)) `
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.violet_20};
`;
const NotificationActions = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.LeftSlot)) `
  gap: 2px;

  .amadeus-btn {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`;
const NotificationTime = _emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_60};
`;
const MediaPlannerClosedWonNotification = () => {
    const [isRead, setIsRead] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isSnoozed, setIsSnoozed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.StyledCard, { accent: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60, "data-testid": 'media-planner-closed-won-notification', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Item, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.IconColumn, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.IconWrap, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'infoCircle', width: 18, height: 18, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 }) }), !isRead ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Dot, { "data-testid": 'media-planner-closed-won-unread-dot' }) : null] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.ContentColumn, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.RowsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Message, { children: notificationMessage }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.BottomContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(NotificationActions, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'media-planner-notification-view-btn', variant: 'link', onClick: () => navigate('/mediaplanner/'), children: "View" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'media-planner-notification-create-with-max-btn', variant: 'link', onClick: () => {
                                                    (0,_mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_5__.showClosedWonPlanPromptSuggestions)();
                                                    navigate('/?panel=amadeus-max');
                                                }, children: "Proceed with Max" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.DropdownMenu, { items: [
                                                    {
                                                        key: 'toggle-read',
                                                        label: isRead ? 'Mark as unread' : 'Mark as read',
                                                        onClick: () => setIsRead(current => !current),
                                                    },
                                                    {
                                                        key: 'toggle-snooze',
                                                        label: isSnoozed ? 'Unsnooze' : 'Snooze',
                                                        onClick: () => setIsSnoozed(current => !current),
                                                    },
                                                ], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.IconButton, { iconName: 'ellipsisVertical', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, title: 'More notification actions', "aria-label": 'More notification actions' }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.RightSlot, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationTime, { children: "2 hours ago" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MediaPlannerPill, { children: "Media Planner" })] })] })] }) })] }) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaPlannerClosedWonNotification);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/MediaPlannerGrowthOpportunityNotification.tsx"
/*!***********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/MediaPlannerGrowthOpportunityNotification.tsx ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/Notifications/NotificationCard/NotificationCard.styled */ "./apps/mediahub-ui/components/Notifications/NotificationCard/NotificationCard.styled.ts");
/* harmony import */ var _mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/CampaignFlow/campaignFlowStore */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowStore.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");







// Performance growth-opportunity notification for Amadeus Hotels. Mirrors the Media Planner
// closed-won notification (same View / Proceed with Max / more-actions options and Media Planner
// pill), shown under the Performance group on the home notifications panel.
const notificationMessage = 'BID-5678 - MockStay Hotels - Growth opportunity identified in the US market.';
const MediaPlannerPill = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.OBAButton)) `
  background-color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_20};
`;
const NotificationActions = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.LeftSlot)) `
  gap: 2px;

  .amadeus-btn {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`;
const NotificationTime = _emotion_styled__WEBPACK_IMPORTED_MODULE_2__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_60};
`;
const MediaPlannerGrowthOpportunityNotification = () => {
    const [isRead, setIsRead] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isSnoozed, setIsSnoozed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.StyledCard, { accent: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60, "data-testid": 'media-planner-growth-opportunity-notification', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Item, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.IconColumn, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.IconWrap, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Icon, { name: 'infoCircle', width: 18, height: 18, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.sky_60 }) }), !isRead ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Dot, { "data-testid": 'media-planner-growth-opportunity-unread-dot' }) : null] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.ContentColumn, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.RowsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.Message, { children: notificationMessage }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.BottomContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(NotificationActions, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'media-planner-growth-notification-view-btn', variant: 'link', onClick: () => navigate('/mediaplanner/'), children: "View" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'media-planner-growth-notification-create-with-max-btn', variant: 'link', onClick: () => {
                                                    (0,_mediahub_mediahub_ui_components_CampaignFlow_campaignFlowStore__WEBPACK_IMPORTED_MODULE_5__.showGrowthOpportunityPromptSuggestions)();
                                                    navigate('/?panel=amadeus-max');
                                                }, children: "Proceed with Max" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.DropdownMenu, { items: [
                                                    {
                                                        key: 'toggle-read',
                                                        label: isRead ? 'Mark as unread' : 'Mark as read',
                                                        onClick: () => setIsRead(current => !current),
                                                    },
                                                    {
                                                        key: 'toggle-snooze',
                                                        label: isSnoozed ? 'Unsnooze' : 'Snooze',
                                                        onClick: () => setIsSnoozed(current => !current),
                                                    },
                                                ], children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.IconButton, { iconName: 'ellipsisVertical', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.colors.cloud_80, title: 'More notification actions', "aria-label": 'More notification actions' }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mediahub_mediahub_ui_components_Notifications_NotificationCard_NotificationCard_styled__WEBPACK_IMPORTED_MODULE_4__.RightSlot, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationTime, { children: "2 hours ago" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MediaPlannerPill, { children: "ATI" })] })] })] }) })] }) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaPlannerGrowthOpportunityNotification);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.styled.ts"
/*!***************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.styled.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header),
/* harmony export */   Wrapper: () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");

const Wrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin: 10px 0;
`;
const Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  margin: 10px 0;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.tsx"
/*!*********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.tsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _SectionLayout_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SectionLayout.styled */ "./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.styled.ts");



const SectionLayout = ({ title, children, style, titleStyle, link }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_SectionLayout_styled__WEBPACK_IMPORTED_MODULE_2__.Wrapper, { style: style, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_SectionLayout_styled__WEBPACK_IMPORTED_MODULE_2__.Header, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H5, { children: title }), link?.enabled && link.url && link.title && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Link, { id: 'home-notifications-link', href: link.url, children: link.title }))] }), children] }));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionLayout);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/SectionLayout/index.ts"
/*!************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/SectionLayout/index.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _SectionLayout__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SectionLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SectionLayout */ "./apps/mediahub-ui/pages/Home/SectionLayout/SectionLayout.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.queries.ts"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.queries.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET_WELCOME_MODAL: () => (/* binding */ GET_WELCOME_MODAL),
/* harmony export */   IGNORE_WELCOME_MODAL: () => (/* binding */ IGNORE_WELCOME_MODAL),
/* harmony export */   useGetWelcomeModal: () => (/* binding */ useGetWelcomeModal),
/* harmony export */   useIgnoreWelcomeModal: () => (/* binding */ useIgnoreWelcomeModal)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/react/hooks/useQuery.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "./node_modules/graphql-tag/lib/index.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/react/hooks/useMutation.js");


const GET_WELCOME_MODAL = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql) `
  query GetWelcomeModal {
    getWelcomeModal {
      status
    }
  }
`;
const IGNORE_WELCOME_MODAL = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql) `
  mutation IgnoreWelcomeModal {
    ignoreWelcomeModal {
      success
    }
  }
`;
const useGetWelcomeModal = () => {
    return (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery)(GET_WELCOME_MODAL);
};
function useIgnoreWelcomeModal() {
    return (0,_apollo_client__WEBPACK_IMPORTED_MODULE_2__.useMutation)(IGNORE_WELCOME_MODAL);
}


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.tsx"
/*!*******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.tsx ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _WelcomeModal_queries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WelcomeModal.queries */ "./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.queries.ts");






const WelcomeModal = () => {
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [ignoreWelcomeModal] = (0,_WelcomeModal_queries__WEBPACK_IMPORTED_MODULE_5__.useIgnoreWelcomeModal)();
    const { data: AdvData, loading: AdvLoading, error: AdvError } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_4__.useGetAdvertisersFollowingTotalQuery)();
    const { data: wmData, loading: wmLoading, error: wmError, refetch: refetchWelcomeModal } = (0,_WelcomeModal_queries__WEBPACK_IMPORTED_MODULE_5__.useGetWelcomeModal)();
    const followingTotal = AdvData?.advertisers?.toggle?.totalFollowing ?? 0;
    const isIgnored = wmData?.getWelcomeModal?.status === true;
    const hasLoginSuccess = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('login') === 'success';
    }, []);
    const removeLoginParam = () => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('login');
        const newQuery = currentParams.toString();
        const newUrl = newQuery ? `/?${newQuery}` : '/';
        window.history.replaceState({}, document.title, newUrl);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        const canShow = hasLoginSuccess && !AdvLoading && !AdvError && !wmLoading && !wmError && followingTotal === 0 && !isIgnored;
        setIsVisible(canShow);
    }, [hasLoginSuccess, AdvLoading, AdvError, followingTotal, wmLoading, wmError, isIgnored]);
    const onIgnore = async () => {
        try {
            await ignoreWelcomeModal({});
            await refetchWelcomeModal();
        }
        catch {
            // API errors are non-critical; cleanup is guaranteed via finally
        }
        finally {
            onClose();
        }
    };
    const onClose = () => {
        setIsVisible(false);
        removeLoginParam();
    };
    const onGoAdvertisers = () => {
        removeLoginParam();
        navigate('/advertisers');
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Modal, { idPrefix: 'welcome-mediahub-modal', title: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H3, { children: "Welcome to Media Hub" }), open: isVisible, onCancel: onClose, width: 500, centered: true, footer: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { variant: 'outlined', onClick: onIgnore, children: "Ignore" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onGoAdvertisers, children: "Go to Advertiser" })] }), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.Body, { style: { marginTop: 20 }, children: "To personalize your experience, we recommend following advertisers that you manage." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.Body, { style: { marginTop: 10 }, children: "This helps us tailor every screen to your preferences \u2014 making your journey smoother, smarter, and more relevant." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.Body, { style: { margin: '12px 0px 10px 0px' }, children: "\uD83D\uDC49 Start by selecting the advertisers." })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WelcomeModal);


/***/ },

/***/ "./apps/mediahub-ui/pages/Home/WelcomeModal/index.ts"
/*!***********************************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/WelcomeModal/index.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _WelcomeModal__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _WelcomeModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WelcomeModal */ "./apps/mediahub-ui/pages/Home/WelcomeModal/WelcomeModal.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/Home/index.ts"
/*!**********************************************!*\
  !*** ./apps/mediahub-ui/pages/Home/index.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Home__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home */ "./apps/mediahub-ui/pages/Home/Home.tsx");



/***/ }

}]);
//# sourceMappingURL=home.d8d725b48206abe9485d.js.map