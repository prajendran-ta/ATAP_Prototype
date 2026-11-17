"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["notifications"],{

/***/ "./apps/mediahub-ui/pages/Notifications/BroadFilterWarning.tsx"
/*!*********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Notifications/BroadFilterWarning.tsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BroadFilterWarning: () => (/* binding */ BroadFilterWarning)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _Notifications_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notifications.styled */ "./apps/mediahub-ui/pages/Notifications/Notifications.styled.tsx");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");



const BroadFilterWarning = () => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_1__.WarningContainer, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_1__.IconWrapper, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.IconButton, { iconName: 'infoCircle', width: 35, height: 35, color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.sky_60 }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_1__.Message, { id: 'notifications-broad_filter_warning_ttl', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: ["Please narrow your filter selection by choosing\u00A0", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: "Advertiser" }), "/s\u00A0 or reduced\u00A0", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: "Time period" }), "\u00A0 to view notifications. Displaying notifications for all advertisers exceeds the table's capacity."] }) })] }));
};


/***/ },

/***/ "./apps/mediahub-ui/pages/Notifications/Notifications.styled.tsx"
/*!***********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Notifications/Notifications.styled.tsx ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryBadge: () => (/* binding */ CategoryBadge),
/* harmony export */   IconWrapper: () => (/* binding */ IconWrapper),
/* harmony export */   Message: () => (/* binding */ Message),
/* harmony export */   MessageCell: () => (/* binding */ MessageCell),
/* harmony export */   NotificationsWrapper: () => (/* binding */ NotificationsWrapper),
/* harmony export */   SwitchField: () => (/* binding */ SwitchField),
/* harmony export */   TableLink: () => (/* binding */ TableLink),
/* harmony export */   WarningContainer: () => (/* binding */ WarningContainer)
/* harmony export */ });
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");


const NotificationsWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
`;
const TableLink = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].span `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.sky_60};
  cursor: pointer;
  width: auto;
`;
const CategoryBadge = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.Badge)) `
  border: 1px solid ${({ color }) => color};
  color: ${({ fill, color }) => (fill ? _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_0__.colors.cloud_100 : color)};
  background-color: ${({ fill, color }) => (fill ? color : 'transparent')};
`;
const SwitchField = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const WarningContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-wrap: nowrap;
`;
const IconWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  line-height: 0;
  padding-top: 2px;
  flex-shrink: 0;
  padding: 10px;
`;
const Message = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  flex: 1;
  min-width: 0;
  white-space: normal;
  font-size: 18px !important;
  line-height: 150%;
`;
const MessageCell = _emotion_styled__WEBPACK_IMPORTED_MODULE_1__["default"].div `
  white-space: normal;
  word-break: break-word;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Notifications/Notifications.tsx"
/*!****************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Notifications/Notifications.tsx ***!
  \****************************************************************/
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
/* harmony import */ var _mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/TableWithFilters/TableWithFilterBanner */ "./apps/mediahub-ui/components/TableWithFilters/TableWithFilterBanner.tsx");
/* harmony import */ var _Notifications_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Notifications.styled */ "./apps/mediahub-ui/pages/Notifications/Notifications.styled.tsx");
/* harmony import */ var _Notifications_queries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Notifications.queries */ "./apps/mediahub-ui/pages/Notifications/Notifications.queries.ts");
/* harmony import */ var _NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NotificationsConfig */ "./apps/mediahub-ui/pages/Notifications/NotificationsConfig.tsx");
/* harmony import */ var _mediahub_mediahub_ui_components_Notifications_Notifications_queries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mediahub/mediahub-ui/components/Notifications/Notifications.queries */ "./apps/mediahub-ui/components/Notifications/Notifications.queries.ts");
/* harmony import */ var _useNotificationsActions_useNotificationsActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useNotificationsActions/useNotificationsActions */ "./apps/mediahub-ui/pages/Notifications/useNotificationsActions/useNotificationsActions.tsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/chunk-BV7QT456.mjs");
/* harmony import */ var _mediahub_mediahub_ui_graphql_generated_shared_enums__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mediahub/mediahub-ui/graphql/generated/shared-enums */ "./apps/mediahub-ui/graphql/generated/shared-enums.ts");
/* harmony import */ var _mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mediahub/advertisers-ui/pages/Advertisers/Advertisers.queries */ "./apps/advertisers-ui/pages/Advertisers/Advertisers.queries.ts");
/* harmony import */ var _mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mediahub/mediahub-ui/context/AuthContext */ "./apps/mediahub-ui/context/AuthContext.tsx");
/* harmony import */ var _BroadFilterWarning__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./BroadFilterWarning */ "./apps/mediahub-ui/pages/Notifications/BroadFilterWarning.tsx");
/* harmony import */ var _amadeus_react_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @amadeus/react-utils */ "./packages/react-utils/index.ts");
/* harmony import */ var _mediahub_advertisers_ui_graphql_generated_advertiser_enums__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mediahub/advertisers-ui/graphql/generated/advertiser-enums */ "./apps/advertisers-ui/graphql/generated/advertiser-enums.ts");

















function NotificationsPage() {
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(['notifications', 'common']);
    const { user, isReadOnly, isExternal } = (0,_mediahub_mediahub_ui_context_AuthContext__WEBPACK_IMPORTED_MODULE_13__.useAuth)();
    const userId = user?.id;
    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [showWarningTable, setShowWarningTable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { refetch: refetchGrouped } = (0,_mediahub_mediahub_ui_components_Notifications_Notifications_queries__WEBPACK_IMPORTED_MODULE_8__.useNotificationGroups)();
    const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
    const { handleMarkAsRead } = (0,_useNotificationsActions_useNotificationsActions__WEBPACK_IMPORTED_MODULE_9__.useNotificationActions)();
    const levelConfig = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsLevelConfig)(t);
    const categoriesConfig = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsCategoriesConfig)(t);
    const alertLevelOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.useAlertLevelOptions)();
    const refetchAll = async () => {
        tableRef.current?.refetchWithFilters();
        await refetchGrouped();
    };
    const columns = [
        {
            title: t('notifications:columns.alertType'),
            dataIndex: 'alert_type',
            key: 'level',
            width: '80px',
            align: 'center',
            render: (_, record) => levelConfig[record.level].icon,
        },
        {
            title: t(isExternal ? 'notifications:columns.advertiserBpid' : 'notifications:columns.advertiserBpidInternal'),
            key: 'advertiserName',
            dataIndex: 'advertiser_name',
            width: '18%',
            ellipsis: true,
            render: (_, record) => record.advertiser.name,
        },
        {
            title: t('notifications:columns.module'),
            dataIndex: 'module',
            key: 'module',
            width: '8%',
        },
        {
            title: t('notifications:columns.category'),
            dataIndex: 'category',
            key: 'category',
            width: '10%',
            render: (category) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_5__.CategoryBadge, { color: categoriesConfig[category]?.color, fill: true, content: categoriesConfig[category]?.label })),
        },
        {
            title: t('notifications:columns.time'),
            dataIndex: ['createdAt', 'ago'],
            key: 'time',
            width: '10%',
        },
        {
            title: t('notifications:columns.message'),
            dataIndex: 'message',
            key: 'message',
            width: 'auto',
            render: (message) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_5__.MessageCell, { children: isExternal ? message.replace(/^(BID\/BPID|BID)\s+[^-]+-[^-]+-\s*/, '') : message })),
        },
        {
            dataIndex: 'link',
            key: 'link',
            width: '5%',
            render: (_, record, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Button, { id: `notification-view-${index}-btn`, variant: 'text', children: t('common:view'), href: (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.buildHrefFromLink)(record.link) })),
        },
        {
            dataIndex: 'status',
            key: 'status',
            width: 180,
            render: (_, record, index) => (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.renderNotificationAction)(record, handleMarkAsRead, refetchAll, index, t),
        },
        {
            key: 'actions',
            width: '20px',
            dataIndex: 'actions',
            render: (_, record, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.NotificationActionsDots, { record: record, afterFn: refetchAll, index: index })),
        },
    ];
    const filteredColumns = isReadOnly ? columns.filter(c => c.key !== 'status' && c.key !== 'actions') : columns;
    const notificationsLevelsOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.generateOptions)((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsLevelConfig)(t), true);
    const notificationsCategoriesOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.generateOptions)((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsCategoriesConfig)(t), true);
    const notificationsStatusesOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.generateOptions)((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsStatusesConfig)(t), true);
    const notificationsModulesOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.generateOptions)((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsModulesConfig)(t), true);
    const notificationsTimePeriodOptions = (0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.generateOptions)((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.notificationsTimePeriodConfig)(t), true);
    const mapAdvertiserToOption = (advertiser) => ({
        label: isExternal ? advertiser.advertiserName : `${advertiser.advertiserName} (${String(advertiser.bpid).toUpperCase()})`,
        value: advertiser.advertiserId,
    });
    const { refetch: refetchAdvertisersOptions } = (0,_mediahub_advertisers_ui_pages_Advertisers_Advertisers_queries__WEBPACK_IMPORTED_MODULE_12__.useGetAdvertiserOptionsQuery)(true);
    const advertiserOptions = (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_15__.useServerOptions)({
        queryFn: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_15__.buildServerOptionsQueryFn)({
            refetch: refetchAdvertisersOptions,
            buildVars: (search, pagination) => ({
                filter: {
                    advertiserTypes: _mediahub_advertisers_ui_graphql_generated_advertiser_enums__WEBPACK_IMPORTED_MODULE_16__.AdvertiserTypesEnum.Hotel,
                    name: (search ?? '').trim(),
                    isFollowingOnly: false,
                    paging: { limit: pagination.limit, offset: pagination.offset },
                },
            }),
            getItems: data => data?.advertisers?.advertisers ?? [],
            mapToOption: adv => mapAdvertiserToOption(adv),
        }),
        pageSize: 20,
    });
    const [selectedAdvertisers, setSelectedAdvertisers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const filterItems = [
        {
            name: 'levels',
            label: t('notifications:columns.alertType'),
            type: 'multiple',
            options: alertLevelOptions,
            optionsTagLabelKey: 'label',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('notifications:columns.alertType'), id: 'notification-alert_type-sel', placeholder: t('common:select'), mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: notificationsLevelsOptions })),
        },
        {
            name: 'advertiserIds',
            label: t(isExternal ? 'notifications:filters.advertiserBpid' : 'notifications:filters.advertiserBpidInternal'),
            type: 'multiple',
            options: selectedAdvertisers,
            optionsTagLabelKey: 'label',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t(isExternal ? 'notifications:filters.advertiserBpid' : 'notifications:filters.advertiserBpidInternal'), id: 'notification-advertiser-sel', placeholder: t('common:select'), popupMatchSelectWidth: 600, mode: 'multiple', showSearch: true, options: (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_15__.mergeWithSelected)(advertiserOptions.options, selectedAdvertisers), value: Array.isArray(value) ? value : [], onChange: (v) => {
                    setValue(v);
                    (0,_amadeus_react_utils__WEBPACK_IMPORTED_MODULE_15__.updateSelectedOptions)(v, advertiserOptions.options, setSelectedAdvertisers);
                }, loading: advertiserOptions.loading, onSearch: advertiserOptions.onSearch, onBlur: advertiserOptions.onBlur, onPopupScroll: advertiserOptions.onPopupScroll, filterMode: 'server' })),
        },
        {
            name: 'modules',
            label: t('notifications:filters.modules'),
            type: 'multiple',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('notifications:columns.module'), id: 'notification-module-sel', placeholder: t('common:select'), mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: notificationsModulesOptions })),
        },
        {
            name: 'categories',
            label: t('notifications:filters.category'),
            type: 'multiple',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('notifications:columns.category'), id: 'notification-category-sel', placeholder: t('common:select'), mode: 'multiple', showSearch: true, value: Array.isArray(value) ? value : [], onChange: v => setValue(v), options: notificationsCategoriesOptions })),
        },
        {
            name: 'timePeriod',
            label: t('notifications:filters.timePeriod'),
            options: notificationsTimePeriodOptions,
            optionsTagLabelKey: 'label',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('notifications:filters.timePeriod'), id: 'notification-time_period-sel', placeholder: t('common:select'), showSearch: true, value: value ? value : undefined, onChange: v => setValue(v), options: notificationsTimePeriodOptions })),
        },
        {
            name: 'status',
            label: t('notifications:filters.status'),
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Select, { label: t('notifications:filters.status'), id: 'notification-status-sel', placeholder: t('common:select'), showSearch: true, value: value ? value : undefined, onChange: v => setValue(v), options: notificationsStatusesOptions })),
        },
    ];
    const tableFilterItems = [
        {
            name: 'myAdvertisers',
            label: 'View',
            type: 'single',
            placement: 'header',
            renderControl: ({ value, setValue }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.ToggleTab, { value: value, onChange: v => setValue(v), options: [
                    {
                        label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'notification-my-txt', children: t('notifications:filters.myNotifications') }),
                        value: true,
                    },
                    {
                        label: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { id: 'notification-all-txt', children: t('notifications:filters.allNotifications') }),
                        value: false,
                    },
                ] })),
        },
    ];
    const initialFilters = {
        timePeriod: _mediahub_mediahub_ui_graphql_generated_shared_enums__WEBPACK_IMPORTED_MODULE_11__.TimePeriodEnum.Last_24Hours,
        myAdvertisers: true,
        status: _mediahub_mediahub_ui_graphql_generated_shared_enums__WEBPACK_IMPORTED_MODULE_11__.AlertStatusEnum.Unread,
    };
    const { refetch } = (0,_Notifications_queries__WEBPACK_IMPORTED_MODULE_6__.useGetNotificationsQuery)({});
    const refetchFormatted = async (filters) => {
        if ((0,_NotificationsConfig__WEBPACK_IMPORTED_MODULE_7__.isBroadFilter)(filters)) {
            setShowWarningTable(true);
            return { data: [], total: 0 };
        }
        else {
            setShowWarningTable(false);
        }
        const response = await refetch({
            filter: Object.fromEntries(Object.entries(!!filters && filters).filter(([_, value]) => {
                if (Array.isArray(value))
                    return value.length > 0;
                return value !== undefined && value !== null && value !== '';
            })),
        });
        return {
            data: response.data?.notifications ?? [],
            total: response.data.notifications.length,
        };
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('refetch') === 'notifications') {
            tableRef.current?.refetchWithFilters();
            params.delete('refetch');
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        }
    }, [location.search, refetchAll]);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Notifications_styled__WEBPACK_IMPORTED_MODULE_5__.NotificationsWrapper, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, { items: [{ title: t('common:home'), href: '/' }, { title: t('notifications:drawerTitle') }] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mediahub_mediahub_ui_components_TableWithFilters_TableWithFilterBanner__WEBPACK_IMPORTED_MODULE_4__["default"], { ref: tableRef, sectionTitle: t('notifications:title'), columns: filteredColumns, filterItems: [...filterItems, ...tableFilterItems], initialFilters: initialFilters, filterMode: 'server', queryFn: refetchFormatted, tableSearch: { show: true, placeholder: t('notifications:searchPlaceholder'), keys: ['message'] }, tableTitle: t('notifications:tableTitle'), clientSideFilters: ['pagination', 'search'], tableWarning: { show: showWarningTable, component: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_BroadFilterWarning__WEBPACK_IMPORTED_MODULE_14__.BroadFilterWarning, {}) }, id: 'notification-tbl', cellsIdPrefix: 'notification', rowKey: 'id' })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationsPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/Notifications/index.ts"
/*!*******************************************************!*\
  !*** ./apps/mediahub-ui/pages/Notifications/index.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Notifications__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Notifications__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notifications */ "./apps/mediahub-ui/pages/Notifications/Notifications.tsx");



/***/ }

}]);
//# sourceMappingURL=notifications.61d66b18ebc042d96ea1.js.map