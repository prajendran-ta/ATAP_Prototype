"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["login"],{

/***/ "./apps/mediahub-ui/components/LoginPage/LoginPage.styled.ts"
/*!*******************************************************************!*\
  !*** ./apps/mediahub-ui/components/LoginPage/LoginPage.styled.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Body: () => (/* binding */ Body),
/* harmony export */   ButtonWrapper: () => (/* binding */ ButtonWrapper),
/* harmony export */   Footer: () => (/* binding */ Footer),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _mediahub_mediahub_ui_assets_background_login_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mediahub/mediahub-ui/assets/background-login.jpg */ "./apps/mediahub-ui/assets/background-login.jpg");


const ButtonWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  width: 400px;

  button {
    width: 100% !important;
    font-size: large !important;
    border: none !important;
  }
`;
const Root = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: url(${_mediahub_mediahub_ui_assets_background_login_jpg__WEBPACK_IMPORTED_MODULE_1__});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const Body = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Footer = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  text-align: center;
  color: white;
`;


/***/ },

/***/ "./apps/mediahub-ui/components/LoginPage/LoginPage.tsx"
/*!*************************************************************!*\
  !*** ./apps/mediahub-ui/components/LoginPage/LoginPage.tsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoginPage_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginPage.styled */ "./apps/mediahub-ui/components/LoginPage/LoginPage.styled.ts");
/* harmony import */ var _amadeus_react_design_factory_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amadeus/react-design-factory/components/Button */ "./packages/react-design-factory/components/Button/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _mediahub_mediahub_ui_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mediahub/mediahub-ui/api */ "./apps/mediahub-ui/api/index.ts");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mediahub/mediahub-ui/shared/offlineMode */ "./apps/mediahub-ui/shared/offlineMode.ts");








const LoginPage = () => {
    const { user } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__.useAuth)();
    const [offline, setOffline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.isOfflineMode)());
    const [loginSkipped, setLoginSkipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.isLoginDisabled)());
    // If you are already authenticated, automatically redirect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (user) {
            window.location.href = '/';
        }
    }, [user]);
    const destinationPath = new URLSearchParams(window.location.search).get('destinationPath') || '/';
    // Sign-in switched off: go straight into the app (`/login?login=on` shows this page again).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (loginSkipped)
            window.location.href = destinationPath;
    }, [destinationPath, loginSkipped]);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_LoginPage_styled__WEBPACK_IMPORTED_MODULE_2__.Root, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LoginPage_styled__WEBPACK_IMPORTED_MODULE_2__.Body, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LoginPage_styled__WEBPACK_IMPORTED_MODULE_2__.ButtonWrapper, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory_components_Button__WEBPACK_IMPORTED_MODULE_3__.Button, { id: 'signin', size: 'large', onClick: () => {
                                    // Backend switched off: sign in locally with the demo user (no network call).
                                    if (offline) {
                                        (0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.startOfflineSession)();
                                        window.location.href = destinationPath;
                                        return;
                                    }
                                    // TEMP (TTT-3635 QA-env unblock): staging's backend now requires a tenant-selection
                                    // step (#425/#452/#454/#462, not ported here) for the slug-less /login; this branch
                                    // is a never-productionized prototype, so always use the internal tenant slug to
                                    // skip that step, regardless of host. Remove if tenant-selection is ever ported.
                                    let loginUrl = `${_mediahub_mediahub_ui_api__WEBPACK_IMPORTED_MODULE_5__.apiConfig.shared}/b0a8be27d966/login?destinationPath=${encodeURIComponent(destinationPath)}`;
                                    if (origin.includes('localhost')) {
                                        // from local
                                        loginUrl = `${loginUrl}&env=local`;
                                    }
                                    window.location.href = loginUrl;
                                }, children: "Sign in" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", { htmlFor: 'offline-switch', style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginTop: 16,
                                fontSize: 14,
                                color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_6__.colors.cloud_0,
                            }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_6__.Toggle, { id: 'offline-switch', size: 'small', checked: offline, disabled: loginSkipped, onChange: checked => {
                                        (0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.setOfflineMode)(checked);
                                        setOffline(checked);
                                    } }), "Work offline (backend off, demo data)"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", { htmlFor: 'skip-login-switch', style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginTop: 8,
                                fontSize: 14,
                                color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_6__.colors.cloud_0,
                            }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_6__.Toggle, { id: 'skip-login-switch', size: 'small', checked: loginSkipped, onChange: checked => {
                                        // Skipping sign-in implies the backend is off (the effect above then redirects).
                                        ;(0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.setLoginDisabled)(checked);
                                        setLoginSkipped(checked);
                                        setOffline((0,_mediahub_mediahub_ui_shared_offlineMode__WEBPACK_IMPORTED_MODULE_7__.isOfflineMode)());
                                    } }), "Skip sign-in (always signed in as the demo user)"] })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_LoginPage_styled__WEBPACK_IMPORTED_MODULE_2__.Footer, { children: ["\u00A9 ", new Date().getFullYear(), " TRAVELAUDIENCE.COM GmbH. All rights reserved"] })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginPage);


/***/ },

/***/ "./apps/mediahub-ui/components/LoginPage/index.ts"
/*!********************************************************!*\
  !*** ./apps/mediahub-ui/components/LoginPage/index.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _LoginPage__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _LoginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginPage */ "./apps/mediahub-ui/components/LoginPage/LoginPage.tsx");



/***/ },

/***/ "./apps/mediahub-ui/assets/background-login.jpg"
/*!******************************************************!*\
  !*** ./apps/mediahub-ui/assets/background-login.jpg ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "84cd866ab1562485107d.jpg";

/***/ }

}]);
//# sourceMappingURL=login.529837f93fac9ed6de15.js.map