"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["mediahub"],{

/***/ "./apps/mediahub-ui/MediaHubRoutes.tsx"
/*!*********************************************!*\
  !*** ./apps/mediahub-ui/MediaHubRoutes.tsx ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");




const Home = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | home */[__webpack_require__.e("vendors-node_modules_antd_es_popover_index_js"), __webpack_require__.e("home")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/Home */ "./apps/mediahub-ui/pages/Home/index.ts"))));
const UserManagementPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() | user-management */ "user-management").then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/UsersManagement */ "./apps/mediahub-ui/pages/UsersManagement/index.ts"))));
const NotificationsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() | notifications */ "notifications").then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/Notifications */ "./apps/mediahub-ui/pages/Notifications/index.ts"))));
const UnmappedCampaignsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | unmapped-campaigns */[__webpack_require__.e("vendors-node_modules_antd_es_input_index_js"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_mockData_campaigns_ts"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_MappingDrawer_tsx-apps_mediahub-ui_pages_CampaignMappi-cb39d6"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_UnmappedCampaigns_tsx"), __webpack_require__.e("unmapped-campaigns")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping */ "./apps/mediahub-ui/pages/CampaignMapping/index.ts"))));
const CampaignsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | campaigns */[__webpack_require__.e("vendors-node_modules_antd_es_input_index_js"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_mockData_campaigns_ts"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_MappingDrawer_tsx-apps_mediahub-ui_pages_CampaignMappi-cb39d6"), __webpack_require__.e("campaigns")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/campaignsIndex */ "./apps/mediahub-ui/pages/CampaignMapping/campaignsIndex.ts"))));
const AllCampaignsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | all-campaigns */[__webpack_require__.e("vendors-node_modules_antd_es_input_index_js"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_mockData_campaigns_ts"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_MappingDrawer_tsx-apps_mediahub-ui_pages_CampaignMappi-cb39d6"), __webpack_require__.e("apps_mediahub-ui_pages_CampaignMapping_UnmappedCampaigns_tsx"), __webpack_require__.e("all-campaigns")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/CampaignMapping/allCampaignsIndex */ "./apps/mediahub-ui/pages/CampaignMapping/allCampaignsIndex.ts"))));
const AudienceBuilderPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | audience-builder */[__webpack_require__.e("vendors-node_modules_antd_es_tree-select_index_js"), __webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"), __webpack_require__.e("audience-builder")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/AudienceBuilder */ "./apps/mediahub-ui/pages/AudienceBuilder/index.ts"))));
const AudienceBuilderDetailsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | audience-builder */[__webpack_require__.e("vendors-node_modules_antd_es_tree-select_index_js"), __webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"), __webpack_require__.e("audience-builder")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/AudienceBuilder */ "./apps/mediahub-ui/pages/AudienceBuilder/index.ts"))).then(m => ({
    default: m.AudienceBuilderDetailsPage,
})));
const AudiencePage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | audience */[__webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"), __webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_tsx-apps_mediahub-ui_shared_advertiserPlatformStore_-47d358"), __webpack_require__.e("audience")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/Audience */ "./apps/mediahub-ui/pages/Audience/index.ts"))));
const AudienceDetailsPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | audience */[__webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"), __webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_tsx-apps_mediahub-ui_shared_advertiserPlatformStore_-47d358"), __webpack_require__.e("audience")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/Audience */ "./apps/mediahub-ui/pages/Audience/index.ts"))).then(m => ({
    default: m.AudienceDetailsPage,
})));
const AudienceFormPage = (0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => Promise.all(/*! import() | audience */[__webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"), __webpack_require__.e("apps_mediahub-ui_pages_Audience_Audience_tsx-apps_mediahub-ui_shared_advertiserPlatformStore_-47d358"), __webpack_require__.e("audience")]).then(() => (__webpack_require__(/*! @mediahub/mediahub-ui/pages/Audience */ "./apps/mediahub-ui/pages/Audience/index.ts"))).then(m => ({
    default: m.AudienceFormPage,
})));
const MediaHubRoutes = () => {
    const { user } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.useAuth)();
    if (!user)
        return null;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router__WEBPACK_IMPORTED_MODULE_2__.Routes, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Home, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/user-management', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserManagementPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/notifications', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/campaigns', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CampaignsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/unmapped-campaigns', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UnmappedCampaignsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/all-campaigns', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AllCampaignsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience-builder', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudienceBuilderPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience-builder/:ruleId', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudienceBuilderDetailsPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudiencePage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience/new', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudienceFormPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience/:audienceId/edit', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudienceFormPage, {}) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_2__.Route, { path: '/audience/:audienceId', element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudienceDetailsPage, {}) })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaHubRoutes);


/***/ },

/***/ "./apps/mediahub-ui/index.tsx"
/*!************************************!*\
  !*** ./apps/mediahub-ui/index.tsx ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _MediaHubRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaHubRoutes */ "./apps/mediahub-ui/MediaHubRoutes.tsx");


const MediaHubUi = () => {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MediaHubRoutes__WEBPACK_IMPORTED_MODULE_1__["default"], {});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaHubUi);


/***/ }

}]);
//# sourceMappingURL=mediahub.89efafc1f71a756aab29.js.map