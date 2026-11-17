"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["user-management"],{

/***/ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.styled.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.styled.ts ***!
  \************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawerContent: () => (/* binding */ DrawerContent)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");

const DrawerContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  min-width: 900px;
  margin-bottom: 70px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.tsx"
/*!******************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.tsx ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _PermissionsAndRolesModal_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PermissionsAndRolesModal.styled */ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.styled.ts");




const PermissionsAndRolesModal = ({ summaryBanner }) => {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const toggleDrawer = () => setOpen(prev => !prev);
    const roles = ['Administrator', 'Standard User', 'Read Only'];
    const accessMatrix = {
        Advertisers: { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Media Planning & Request': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Campaign Management & Setup': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Campaign Optimization & Pacing': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        Reports: { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Market Insights': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Data Management': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'Pricing & Billing': { Administrator: 'full', 'Standard User': 'full', 'Read Only': 'view' },
        'User Management': { Administrator: 'full', 'Standard User': 'none', 'Read Only': 'none' },
    };
    const renderIcon = (access) => {
        switch (access) {
            case 'full':
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'checkCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60, height: 18, width: 18 });
            case 'none':
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'timesCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, height: 18, width: 18 });
            case 'view':
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'checkCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, height: 18, width: 18 });
        }
    };
    const columns = [
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
        },
        ...roles.map(role => ({
            title: role,
            dataIndex: role,
            key: role,
            align: 'center',
            render: (access) => renderIcon(access),
        })),
    ];
    const dataSource = Object.entries(accessMatrix).map(([module, permissions]) => ({
        key: module,
        module,
        ...permissions,
    }));
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'user-permissions-btn', onClick: toggleDrawer, children: "Roles & Permissions" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { title: 'Roles & Permissions', placement: 'right', width: '70vw', onClose: toggleDrawer, open: open, style: { padding: 0 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PermissionsAndRolesModal_styled__WEBPACK_IMPORTED_MODULE_3__.DrawerContent, { children: [summaryBanner, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Section, { style: { marginTop: 0 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { columns: columns, dataSource: dataSource, pagination: false }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Grid.Row, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Grid.Col, { span: 12, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.StickyFooter, { left: '30vw', marginBottom: 0, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => setOpen(false), htmlType: 'button', id: 'user_management-permissions_roles_cancel-btn', variant: 'outlined', children: "Close" }) }) }) })] })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PermissionsAndRolesModal);


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/index.ts"
/*!**********************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/index.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _PermissionsAndRolesModal__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PermissionsAndRolesModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PermissionsAndRolesModal */ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/PermissionsAndRolesModal.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.styled.tsx"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagement.styled.tsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusBadge: () => (/* binding */ StatusBadge),
/* harmony export */   SwitchField: () => (/* binding */ SwitchField),
/* harmony export */   TableLink: () => (/* binding */ TableLink),
/* harmony export */   UserManagementWrapper: () => (/* binding */ UserManagementWrapper)
/* harmony export */ });
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");


const UserManagementWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
`;
const TableLink = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_60};
  cursor: pointer;
  width: auto;
`;
const StatusBadge = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.Badge)) `
  border: 1px solid ${({ color }) => color};
  color: ${({ fill, color }) => (fill ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_100 : color)};
  background-color: ${({ fill, color }) => (fill ? color : 'transparent')};
`;
const SwitchField = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 4px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.tsx"
/*!*******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagement.tsx ***!
  \*******************************************************************/
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
/* harmony import */ var _UserManagement_queries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserManagement.queries */ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.queries.ts");
/* harmony import */ var _UserManagementDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserManagementDetails */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/index.ts");
/* harmony import */ var _UsersSummaryBanner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UsersSummaryBanner */ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/index.ts");
/* harmony import */ var _UserManagement_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserManagement.styled */ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.styled.tsx");
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner */ "./apps/mediahub-ui/components/TableWithFilters/TableWithFilterBanner.tsx");
/* harmony import */ var _PermissionsAndRolesModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PermissionsAndRolesModal */ "./apps/mediahub-ui/pages/UsersManagement/PermissionsAndRolesModal/index.ts");
/* harmony import */ var _UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./UserManagementConfig */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementConfig.tsx");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _amadeus_react_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @amadeus/react-utils */ "./packages/react-utils/index.ts");













function UserManagementPage() {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['users', 'common']);
    const auth = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_11__.AuthContext);
    const { isAdmin } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_11__.useAuth)();
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [userRoleTotals, setUserRoleTotals] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        totalAdministrators: 0,
        totalReadOnly: 0,
        totalStandard: 0,
    });
    const [toggleTotals, setToggleTotals] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        totalActive: 0,
        totalInactive: 0,
        totalUsers: 0,
    });
    const [selectedUsers, setSelectedUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const columns = [
        {
            title: t('users:columns.name'),
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ellipsis: true,
        },
        {
            title: t('users:columns.email'),
            dataIndex: 'email',
            key: 'email',
            width: 'auto',
            ellipsis: true,
        },
        {
            title: t('users:columns.role'),
            dataIndex: 'role',
            key: 'role',
            width: '15%',
            render: (role) => {
                const roleKey = role?.[0] ?? 'mh-read-only';
                const config = _UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.roleConfig[roleKey];
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserManagement_styled__WEBPACK_IMPORTED_MODULE_7__.StatusBadge, { color: config?.color, content: config?.label, fill: true });
            },
        },
        {
            title: t('users:columns.status'),
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status) => {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserManagement_styled__WEBPACK_IMPORTED_MODULE_7__.StatusBadge, { color: _UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.userStatusConfig[status]?.color, content: _UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.userStatusConfig[status]?.label });
            },
        },
        {
            title: t('users:columns.lastLogin'),
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            width: '15%',
        },
        {
            key: 'actions',
            align: 'center',
            width: '10%',
            render: (_, record, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserManagementDetails__WEBPACK_IMPORTED_MODULE_5__["default"], { index: index, user: record, refetch: () => {
                    tableRef.current?.refetchWithFilters();
                } })),
        },
    ];
    const roleOptions = (0,_UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.generateOptions)(_UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.roleConfig);
    const statusOptions = (0,_UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.generateOptions)(_UserManagementConfig__WEBPACK_IMPORTED_MODULE_10__.userStatusConfig, true);
    const filterItems = [
        {
            name: 'id',
            label: t('users:columns.name'),
            type: 'multiple',
            optionsTagLabelKey: 'label',
            options: selectedUsers,
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { id: 'user-name-sel', label: t('users:columns.name'), mode: 'multiple', showSearch: true, placeholder: 'Select', options: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_12__.mergeWithSelected)(usersOptions.options, selectedUsers), value: Array.isArray(value) ? value : [], onChange: (v) => {
                    setValue(v);
                    (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_12__.updateSelectedOptions)(v, usersOptions.options, setSelectedUsers);
                }, loading: usersOptions.loading, onSearch: usersOptions.onSearch, onBlur: usersOptions.onBlur, onPopupScroll: usersOptions.onPopupScroll, filterMode: 'server' })),
        },
        {
            name: 'role',
            label: t('common:role'),
            type: 'multiple',
            options: roleOptions,
            renderControl: ({ value, setValue }) => {
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('common:role'), id: 'user-role-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: roleOptions }));
            },
        },
        {
            name: 'status',
            label: t('common:status'),
            type: 'multiple',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('common:status'), id: 'user-status-sel', placeholder: 'Select', mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: statusOptions })),
        },
    ];
    const tableFilterItems = [
        {
            name: 'status',
            label: 'View',
            type: 'single',
            placement: 'header',
            renderControl: ({ value, setValue }) => {
                const segmentedValue = Array.isArray(value)
                    ? value.length === 2
                        ? 'all'
                        : (value[0] ?? 'all')
                    : (value ?? 'all');
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { value: segmentedValue || 'all', onChange: (v) => {
                        const selected = String(v);
                        const mapped = selected === 'all' ? ['active', 'inactive'] : [selected];
                        setValue(mapped);
                    }, options: [
                        {
                            label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'user-all-txt', children: t('users:filters.allUsers', { count: toggleTotals.totalUsers }) }),
                            value: 'all',
                        },
                        {
                            label: ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'user-active-txt', children: t('users:filters.activeUsers', { count: toggleTotals.totalActive }) })),
                            value: 'active',
                        },
                        {
                            label: ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'user-inactive-txt', children: t('users:filters.inactiveUsers', { count: toggleTotals.totalInactive }) })),
                            value: 'inactive',
                        },
                    ] }));
            },
        },
    ];
    const initialFilters = {};
    const mapUserToOption = (user) => ({
        label: user.name,
        value: user.id,
    });
    const { refetch: refetchUsersOptions } = (0,_UserManagement_queries__WEBPACK_IMPORTED_MODULE_4__.useGetUsersOptionsQuery)(undefined, undefined, true);
    const usersOptions = (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_12__.useServerOptions)({
        queryFn: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_12__.buildServerOptionsQueryFn)({
            refetch: refetchUsersOptions,
            buildVars: (search, pagination) => ({
                options: {
                    search: { query: search, fields: ['name', 'email'] },
                    paginate: { limit: pagination.limit, offset: pagination.offset },
                },
            }),
            getItems: data => data?.users?.users ?? [],
            mapToOption: mapUserToOption,
        }),
        pageSize: 20,
    });
    function refetchUsersFiltersFormated(refetchUsers, setUserRoleTotals, setToggleTotals = () => { }) {
        return async (filters, pagination) => {
            const search = filters?.search;
            const restFilters = { ...(filters ?? {}) };
            const operators = Object.entries(restFilters).flatMap(([field, value]) => {
                if (value == null || value.length === 0)
                    return [];
                if (Array.isArray(value)) {
                    return [
                        {
                            field,
                            operator: 'in',
                            values: value.map(v => String(v)),
                        },
                    ];
                }
                return [
                    {
                        field,
                        operator: 'in',
                        values: [String(value)],
                    },
                ];
            });
            const searchOptions = typeof search === 'string' && search.trim().length > 0
                ? {
                    query: search.trim(),
                    fields: ['name', 'email'],
                }
                : undefined;
            const options = {
                paginate: {
                    limit: pagination?.pageSize ?? 10,
                    offset: ((pagination?.current ?? 1) - 1) * (pagination?.pageSize ?? 10),
                },
                search: searchOptions,
                operators: operators.length > 0 ? operators : undefined,
            };
            const response = await refetchUsers({ options });
            const { totalAdministrators = 0, totalReadOnly = 0, totalStandard = 0 } = response.data?.users ?? {};
            setUserRoleTotals({
                totalAdministrators,
                totalReadOnly,
                totalStandard,
            });
            setToggleTotals({
                totalActive: response.data?.users.toggle.totalActive ?? 0,
                totalInactive: response.data?.users?.toggle.totalInactive ?? 0,
                totalUsers: response.data?.users?.toggle.totalUsers ?? 0,
            });
            return {
                data: response.data?.users?.users ?? [],
                total: response.data?.users?.totalCount ?? 0,
            };
        };
    }
    const { refetch: refetchUsers } = (0,_UserManagement_queries__WEBPACK_IMPORTED_MODULE_4__.useGetUsersQuery)();
    const queryFn = refetchUsersFiltersFormated(refetchUsers, setUserRoleTotals, setToggleTotals);
    const titleButtons = ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PermissionsAndRolesModal__WEBPACK_IMPORTED_MODULE_9__["default"], { summaryBanner: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner__WEBPACK_IMPORTED_MODULE_6__["default"], { totals: userRoleTotals, margin: '16px 0px 0px 0px' }) }));
    if (!auth?.permissionsLoaded)
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Spinner, {});
    if (!isAdmin) {
        window.location.assign('/');
        return null;
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UserManagement_styled__WEBPACK_IMPORTED_MODULE_7__.UserManagementWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: t('common:home'), href: '/' }, { title: t('users:title') }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_8__["default"], { id: 'user-tbl', cellsIdPrefix: 'user', rowKey: 'id', ref: tableRef, sectionTitle: t('users:title'), titleButtons: titleButtons, summaryContent: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner__WEBPACK_IMPORTED_MODULE_6__["default"], { totals: userRoleTotals }), columns: columns, filterItems: [...filterItems, ...tableFilterItems], initialFilters: initialFilters, filterMode: 'server', queryFn: queryFn, tableSearch: { show: true }, tableTitle: t('users:tableTitle') })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserManagementPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementConfig.tsx"
/*!*************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementConfig.tsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateOptions: () => (/* binding */ generateOptions),
/* harmony export */   roleConfig: () => (/* binding */ roleConfig),
/* harmony export */   userStatusConfig: () => (/* binding */ userStatusConfig)
/* harmony export */ });
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");

const roleConfig = {
    'mh-administrator': {
        label: 'Administrator',
        color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_30,
        value: 'mh-administrator',
    },
    'mh-standard': {
        label: 'Standard User',
        color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_10,
        value: 'mh-standard',
    },
    'mh-read-only': {
        label: 'Read Only',
        color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.crimson_20,
        value: 'mh-read-only',
    },
};
const userStatusConfig = {
    active: {
        label: 'Active',
        color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.forest_70,
    },
    inactive: {
        label: 'Inactive',
        color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_40,
    },
};
function generateOptions(config, includeKeyAsValue = false) {
    return Object.entries(config).map(([key, { label, value }]) => ({
        label,
        value: value ?? (includeKeyAsValue ? key : ''),
    }));
}


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.queries.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.queries.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UPDATE_USER: () => (/* binding */ UPDATE_USER),
/* harmony export */   useUpdateUserMutation: () => (/* binding */ useUpdateUserMutation)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/react/hooks/useMutation.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "./node_modules/graphql-tag/lib/index.js");

const UPDATE_USER = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql) `
  mutation UpdateUser($userId: ID!, $role: String, $isActive: Boolean) {
    updateUser(userId: $userId, role: $role, isActive: $isActive) {
      success
      message
      user {
        id
        role
        status
      }
    }
  }
`;
function useUpdateUserMutation() {
    return (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation)(UPDATE_USER);
}


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.styled.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.styled.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawerContent: () => (/* binding */ DrawerContent),
/* harmony export */   FieldsGrid: () => (/* binding */ FieldsGrid),
/* harmony export */   StyledSelect: () => (/* binding */ StyledSelect),
/* harmony export */   SwitchContainer: () => (/* binding */ SwitchContainer),
/* harmony export */   SwitchField: () => (/* binding */ SwitchField),
/* harmony export */   SwitchLabelField: () => (/* binding */ SwitchLabelField)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const DrawerContent = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Grid.Col) `
  overflow: auto;
  margin-bottom: 70px;
`;
const FieldsGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`;
const StyledSelect = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div ``;
const SwitchField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`;
const SwitchLabelField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  margin: auto 0px 2px 0px;
`;
const SwitchContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  gap: 12px;
  height: auto;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.tsx"
/*!************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.tsx ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserManagementDetails.styled */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.styled.ts");
/* harmony import */ var _UserManagementDetailsConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserManagementDetailsConfig */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetailsConfig.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @amadeus/react-utils/utils/string */ "./packages/react-utils/utils/string/index.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");








const UserManagementDetails = ({ user, refetch, index }) => {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)(['advertisers', 'common']);
    const { updateFields } = (0,_UserManagementDetailsConfig__WEBPACK_IMPORTED_MODULE_4__.useUpdateUserField)();
    const [currentRole, setCurrentRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(user.role?.[0] ?? 'mh-read-only');
    const [isActive, setIsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(user.status.toLowerCase() === 'active');
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { hasPermission, isExternal } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_7__.useAuth)();
    const { t: tNav } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)('nav');
    const canEdit = hasPermission('mh-user-write');
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.useNotification)();
    const [form] = _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setCurrentRole(user.role?.[0] ?? 'mh-read-only');
    }, [user.role]);
    const columns = [
        {
            title: 'Access',
            dataIndex: 'access',
            key: 'access',
            width: 120,
            align: 'center',
            render: (access) => {
                if (access === 'full')
                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'checkCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60, height: 18, width: 18 });
                if (access === 'view')
                    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'checkCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, height: 18, width: 18 });
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'timesCircle', color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50, height: 18, width: 18 });
            },
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
        },
    ];
    const moduleRows = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const accessMap = _UserManagementDetailsConfig__WEBPACK_IMPORTED_MODULE_4__.ROLE_ACCESS[currentRole] ?? _UserManagementDetailsConfig__WEBPACK_IMPORTED_MODULE_4__.ROLE_ACCESS['mh-read-only'];
        return _UserManagementDetailsConfig__WEBPACK_IMPORTED_MODULE_4__.MODULES
            .filter(m => !isExternal || m.externalVisible)
            .map(m => {
            const label = 'navKey' in m
                ? tNav(isExternal && 'externalNavKey' in m ? m.externalNavKey : m.navKey)
                : 'label' in m ? m.label : '';
            return { key: m.key, module: label, access: accessMap[m.key] };
        });
    }, [currentRole, isExternal]);
    const onFinish = async () => {
        if (!canEdit)
            return;
        const prevRole = user.role?.[0] ?? 'mh-read-only';
        const prevIsActive = user.status.toLowerCase() === 'active';
        const payload = {};
        if (currentRole !== prevRole)
            payload.role = currentRole;
        if (isActive !== prevIsActive)
            payload.isActive = isActive;
        if (Object.keys(payload).length === 0) {
            notification.info('No changes to save.');
            return;
        }
        setLoading(true);
        updateFields(user.id, payload).then(() => {
            refetch();
            setLoading(false);
        });
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [!open && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: `user-details-${index}-btn`, variant: 'text', onClick: () => setOpen(true), children: "Details" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { id: 'user-drawer', title: 'User Details', placement: 'right', width: '40vw', onClose: () => {
                    setOpen(false);
                    setCurrentRole(user.role?.[0] ?? 'mh-read-only');
                    setIsActive(user.status.toLowerCase() === 'active');
                }, open: open, children: open && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Form, { form: form, onFinish: onFinish, style: { padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.DrawerContent, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Section, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'user-drawer_general_settings-ttl', children: "General Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.FieldsGrid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'user-drawer_name-inp', label: 'User Name', value: (0,_amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_6__.capitalize)(user.name), disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'user-drawer_email-inp', label: 'Email', value: (0,_amadeus_react_utils_utils_string__WEBPACK_IMPORTED_MODULE_6__.capitalize)(user.email), disabled: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.StyledSelect, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'user-drawer_role-sel', placeholder: 'Select role', label: 'Role', value: currentRole, disabled: !canEdit, options: [
                                                            { label: 'Administrator', value: 'mh-administrator' },
                                                            { label: 'Standard User', value: 'mh-standard' },
                                                            { label: 'Read Only', value: 'mh-read-only' },
                                                        ], onChange: async (newRole) => {
                                                            setCurrentRole(newRole);
                                                        } }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.SwitchContainer, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.SwitchField, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.Label, { children: "Status" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Toggle, { checked: isActive, onChange: checked => setIsActive(checked) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserManagementDetails_styled__WEBPACK_IMPORTED_MODULE_3__.SwitchLabelField, { id: 'user-drawer_status-swch', children: isActive ? 'Active' : 'Inactive' })] })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Section, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'user-drawer_module_access-ttl', children: "Module Access" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Table, { columns: columns, dataSource: moduleRows, pagination: false, id: 'user-drawer_module_access-tbl', cellsIdPrefix: 'user-drawer_module_access', rowKey: 'key' })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Grid.Row, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Grid.Col, { span: 12, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.StickyFooter, { left: '60vw', marginBottom: 0, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => setOpen(false), htmlType: 'button', id: 'user-drawer_close-btn', variant: 'outlined', children: "Close" }), canEdit && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'submit', id: 'user-drawer_save-btn', loading: loading, children: "Save" }))] }) }) })] })) })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserManagementDetails);


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetailsConfig.tsx"
/*!******************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetailsConfig.tsx ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODULES: () => (/* binding */ MODULES),
/* harmony export */   ROLE_ACCESS: () => (/* binding */ ROLE_ACCESS),
/* harmony export */   useUpdateUserField: () => (/* binding */ useUpdateUserField)
/* harmony export */ });
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _UserManagementDetails_queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserManagementDetails.queries */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.queries.ts");


function useUpdateUserField() {
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.useNotification)();
    const [updateUser, { loading, error }] = (0,_UserManagementDetails_queries__WEBPACK_IMPORTED_MODULE_1__.useUpdateUserMutation)();
    const updateFields = async (userId, fields) => {
        if (typeof fields.role === 'undefined' && typeof fields.isActive === 'undefined')
            return;
        try {
            const response = await updateUser({
                variables: { userId, ...fields },
            });
            const result = response.data?.updateUser;
            if (result?.success) {
                notification.success(result.message);
            }
            else {
                notification.error(result?.message ?? 'Update failed');
            }
        }
        catch (err) {
            notification.error(`Error: ${err}`);
        }
    };
    return { updateFields, loading, error };
}
const MODULES = [
    { key: 'advertisers', label: 'Advertisers', externalVisible: true },
    { key: 'media-planning', label: 'Media Planning & Requests', externalVisible: false },
    { key: 'campaign-management', label: 'Campaign Management & Setup', externalVisible: false },
    { key: 'campaign-optimization', navKey: 'campaignOptimizationPacing', externalNavKey: 'campaignOptimization', externalVisible: true },
    { key: 'reports', label: 'Reports', externalVisible: false },
    { key: 'market-insights', label: 'Market Insights', externalVisible: false },
    { key: 'data-management', label: 'Data Management', externalVisible: false },
    { key: 'pricing-billing', label: 'Pricing & Billing', externalVisible: false },
    { key: 'user-management', label: 'User Management', externalVisible: true },
];
const ROLE_ACCESS = {
    'mh-administrator': {
        advertisers: 'full',
        'media-planning': 'full',
        'campaign-management': 'full',
        'campaign-optimization': 'full',
        reports: 'full',
        'market-insights': 'full',
        'data-management': 'full',
        'pricing-billing': 'full',
        'user-management': 'full',
    },
    'mh-standard': {
        advertisers: 'full',
        'media-planning': 'full',
        'campaign-management': 'full',
        'campaign-optimization': 'full',
        reports: 'full',
        'market-insights': 'full',
        'data-management': 'full',
        'pricing-billing': 'full',
        'user-management': 'none',
    },
    'mh-read-only': {
        advertisers: 'view',
        'media-planning': 'view',
        'campaign-management': 'view',
        'campaign-optimization': 'view',
        reports: 'view',
        'market-insights': 'view',
        'data-management': 'view',
        'pricing-billing': 'view',
        'user-management': 'none',
    },
};


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/index.ts"
/*!*******************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/index.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _UserManagementDetails__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _UserManagementDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserManagementDetails */ "./apps/mediahub-ui/pages/UsersManagement/UserManagementDetails/UserManagementDetails.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.styled.ts"
/*!************************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.styled.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BadgeBlock: () => (/* binding */ BadgeBlock),
/* harmony export */   BadgeItem: () => (/* binding */ BadgeItem),
/* harmony export */   BadgeTitle: () => (/* binding */ BadgeTitle),
/* harmony export */   Count: () => (/* binding */ Count),
/* harmony export */   RolesContainerHeader: () => (/* binding */ RolesContainerHeader),
/* harmony export */   Wrapper: () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");



const BadgeTitle = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Text.H6) `
  margin-bottom: 0px;
  padding: 2px;
`;
const RolesContainerHeader = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.Container.Header) `
  display: flex;
  justify-content: 'start';
  width: 100%;
  margin-bottom: 16px;
`;
const Wrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 16px;
`;
const BadgeBlock = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 24px;
`;
const BadgeItem = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  background-color: ${({ color }) => _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors[color]};
  padding: 4px 6px;
  border-radius: 9999px;
  min-width: 100px;
  text-align: center;
`;
const Count = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 20px;
  text-align: center;
  margin-top: 4px;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.tsx"
/*!******************************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.tsx ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersSummaryBanner.styled */ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.styled.ts");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");



const UsersSummaryBanner = ({ totals }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Section, { id: 'user-summary-banner', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.RolesContainerHeader, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { children: "User Summary" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeBlock, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Column, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeItem, { color: 'sky_30', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeTitle, { id: 'user-summary-admins-ttl', children: "Administrator" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.Count, { children: totals.totalAdministrators })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Column, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeItem, { color: 'sky_10', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeTitle, { id: 'user-summary-standard-ttl', children: "Standard User" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.Count, { children: totals.totalStandard })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Container.Column, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeItem, { color: 'crimson_20', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.BadgeTitle, { id: 'user-summary-readonly-ttl', children: "Read Only" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UsersSummaryBanner_styled__WEBPACK_IMPORTED_MODULE_1__.Count, { children: totals.totalReadOnly })] })] })] }));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UsersSummaryBanner);


/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/index.ts"
/*!****************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/index.ts ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _UsersSummaryBanner__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _UsersSummaryBanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersSummaryBanner */ "./apps/mediahub-ui/pages/UsersManagement/UsersSummaryBanner/UsersSummaryBanner.tsx");



/***/ },

/***/ "./apps/mediahub-ui/pages/UsersManagement/index.ts"
/*!*********************************************************!*\
  !*** ./apps/mediahub-ui/pages/UsersManagement/index.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _UserManagement__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _UserManagement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserManagement */ "./apps/mediahub-ui/pages/UsersManagement/UserManagement.tsx");



/***/ }

}]);
//# sourceMappingURL=user-management.5d0d46ffa27fd7b7f324.js.map