"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_pages_CampaignMapping_MappingDrawer_tsx-apps_mediahub-ui_pages_CampaignMappi-cb39d6"],{

/***/ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.styled.tsx"
/*!*************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.styled.tsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card),
/* harmony export */   CopyButton: () => (/* binding */ CopyButton),
/* harmony export */   DrawerContent: () => (/* binding */ DrawerContent),
/* harmony export */   DrawerFooter: () => (/* binding */ DrawerFooter),
/* harmony export */   FieldGridThree: () => (/* binding */ FieldGridThree),
/* harmony export */   FieldGridTwo: () => (/* binding */ FieldGridTwo),
/* harmony export */   FullWidthField: () => (/* binding */ FullWidthField),
/* harmony export */   GeneratedNameRow: () => (/* binding */ GeneratedNameRow),
/* harmony export */   PlaceholderNote: () => (/* binding */ PlaceholderNote),
/* harmony export */   ReadOnlyField: () => (/* binding */ ReadOnlyField),
/* harmony export */   ReadOnlyLabel: () => (/* binding */ ReadOnlyLabel),
/* harmony export */   ReadOnlyValueBox: () => (/* binding */ ReadOnlyValueBox)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const DrawerContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 16px;
`;
const Card = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
// A read-only "field" that mirrors the greyed inputs in the Figma design.
const ReadOnlyField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const ReadOnlyLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
`;
const ReadOnlyValueBox = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  font-size: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 4px;
  padding: 6px 10px;
  min-height: 32px;
  display: flex;
  align-items: center;
`;
// Grids for arranging fields two-up / three-up like the design.
const FieldGridTwo = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;
const FieldGridThree = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`;
const FullWidthField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  grid-column: 1 / -1;
`;
// Generated campaign-name row: read-only value + copy icon button.
const GeneratedNameRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
const CopyButton = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-radius: 4px;
  cursor: pointer;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};

  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  }
`;
const PlaceholderNote = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].p `
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  margin: 0;
`;
const DrawerFooter = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-top: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.tsx"
/*!******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.tsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   mappingTypeLabels: () => (/* binding */ mappingTypeLabels)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/input/TextArea */ "./node_modules/antd/es/input/TextArea.js");
/* harmony import */ var _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mockData/unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/advertiserReportingStore */ "./apps/mediahub-ui/shared/advertiserReportingStore.ts");
/* harmony import */ var _MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MappingDrawer.styled */ "./apps/mediahub-ui/pages/CampaignMapping/MappingDrawer.styled.tsx");







const mappingTypeLabels = {
    advertiser: 'Advertiser Mapping',
    campaign: 'Campaign Mapping',
    invoice: 'Invoice Mapping',
    offers: 'Offers Mapping',
    oba: 'OBA Mapping',
};
function ReadOnly({ label, value }) {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.ReadOnlyField, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.ReadOnlyLabel, { children: label }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.ReadOnlyValueBox, { children: value })] }));
}
function MappingDrawer({ open, mappingType, campaign, onClose, onSave, onDelete, readOnly = false }) {
    const title = mappingType ? mappingTypeLabels[mappingType] : 'Mapping';
    const notification = (0,_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.useNotification)();
    // Local form state (prototype only — not persisted).
    const [bpid, setBpid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [tactic, setTactic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [subType, setSubType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [language, setLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [custom1, setCustom1] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [custom2, setCustom2] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [custom3, setCustom3] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [paidSearchId, setPaidSearchId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [wihpCampaignName, setWihpCampaignName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [paidSearchIds, setPaidSearchIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [bpidError, setBpidError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Prefill the BPID select from the campaign's current advertiser when editing an
    // already-mapped advertiser; clear it for an unmapped advertiser.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (open && campaign) {
            // Prototype: ensure the campaign-mock advertisers have inherited reporting labels.
            (0,_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_5__.seedAdvertiserReporting)();
            // Multi-advertiser rows have no single advertiser yet — force the user to pick one.
            setBpid((0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.isMultipleAdvertisers)(campaign) ? undefined : campaign.advertiserBid || undefined);
            setBpidError(false);
            // Prefill dimensions when editing an ALREADY-mapped campaign; clear them for an unmapped one
            // (so only unmapped campaigns open empty with Save disabled). Also resets stale state between
            // opening different campaigns.
            const pre = campaign.prefill;
            const derby = _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.DERBY_PLATFORMS.includes(campaign.platform);
            // DerbySoft Sub-Type / Language remain standards (Metasearch / EN). Tactic is now a
            // backend-supplied dropdown the user selects (Req 6, revised) — not hard-coded.
            setTactic(pre?.tactic);
            setSubType(derby ? 'Metasearch' : pre?.subType);
            setLanguage(derby ? 'EN' : pre?.language);
            setCustom1(pre?.custom1 ?? '');
            setCustom2(pre?.custom2 ?? '');
            setCustom3(pre?.custom3 ?? '');
            setPaidSearchId('');
            setWihpCampaignName(undefined);
            setPaidSearchIds('');
        }
    }, [open, campaign]);
    const isDerby = !!campaign && _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.DERBY_PLATFORMS.includes(campaign.platform);
    const isWihp = !!campaign && _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.WIHP_PLATFORMS.includes(campaign.platform);
    // Many:many — when the external advertiser maps to several ATAP advertisers, the campaign
    // mapping must pick ONE of the candidate BPIDs. Limit the BPID options to those candidates.
    const isMulti = !!campaign && (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.isMultipleAdvertisers)(campaign);
    const bpidOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        if (isMulti && campaign?.candidateBpids) {
            const set = new Set(campaign.candidateBpids);
            return _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.bpidSelectOptions.filter(o => set.has(o.value));
        }
        return _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.bpidSelectOptions;
    }, [isMulti, campaign]);
    // Generated Naming Convention String (read-only), per UX-5.4:
    // <advertiser name>_<Tactic>_<Sub-Type>_<Language>_<Custom1>_<Custom2>_<Custom3>
    // Uses the advertiser NAME (resolved from the chosen BPID), not the id.
    const generatedName = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        if (!campaign)
            return '-';
        const advName = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.advertiserNameForBpid)(bpid) || campaign.advertiserName;
        const parts = [advName, tactic, subType, language, custom1, custom2, custom3].filter(Boolean);
        return parts.length ? parts.join('_') : '-';
    }, [campaign, bpid, tactic, subType, language, custom1, custom2, custom3]);
    // Custom 1/2/3 field LABELS inherited from the advertiser's Reporting settings (Req 3).
    // The advertiser-level value IS the label (value-is-label). When an advertiser hasn't defined a
    // given custom value, fall back to the generic 'Custom N'. Keyed by the selected BPID.
    const customLabels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const r = (0,_shared_advertiserReportingStore__WEBPACK_IMPORTED_MODULE_5__.getAdvertiserReporting)(bpid);
        return {
            custom1: r.custom1.trim() || 'Custom 1',
            custom2: r.custom2.trim() || 'Custom 2',
            custom3: r.custom3.trim() || 'Custom 3',
        };
    }, [bpid]);
    const copyGeneratedName = () => {
        if (!navigator.clipboard || generatedName === '-') {
            notification.error('Nothing to copy yet — complete the mapping first.');
            return;
        }
        navigator.clipboard
            .writeText(generatedName)
            .then(() => notification.success('Campaign name copied to clipboard.'))
            .catch(() => notification.error('Could not copy the campaign name.'));
    };
    // Mandatory-dimension validation (Req 5.9/5.12): Save stays disabled until every required field
    // for the current mapping type / platform is filled.
    const canSave = (() => {
        if (!campaign || !mappingType)
            return false;
        if (mappingType === 'offers' || mappingType === 'invoice' || mappingType === 'oba')
            return true;
        if (mappingType === 'advertiser')
            return !!bpid;
        // mappingType === 'campaign'
        if (!bpid)
            return false;
        if (isWihp) {
            // WIHP: campaign name + at least one Paid Search ID required (Tactic auto / Sub-Type / Language hard-coded).
            return !!wihpCampaignName && paidSearchIds.trim().length > 0;
        }
        if (isDerby) {
            // DerbySoft (Req 6, revised): Tactic is a backend-supplied dropdown and the Paid Search ID is
            // now MANDATORY. Sub-Type / Language remain standards. Require BPID + Tactic + Paid Search ID.
            return !!tactic && paidSearchId.trim().length > 0;
        }
        // SA360 / CM360 / Meta / Others: Tactic, Sub-Type, Language all mandatory (Req 5.2–5.4).
        return !!tactic && !!subType && !!language;
    })();
    const handleSave = () => {
        if (!campaign || !mappingType) {
            onClose();
            return;
        }
        // Advertiser (BPID) is mandatory for advertiser (and campaign) mapping — block save if empty.
        if ((mappingType === 'advertiser' || mappingType === 'campaign') && !bpid) {
            setBpidError(true);
            return;
        }
        onSave({
            mappingType,
            campaignId: campaign.id,
            // Carry the chosen BPID for both advertiser mapping and campaign mapping (the latter needs
            // it to resolve a multi-advertiser row to the picked advertiser).
            bpid: mappingType === 'advertiser' || mappingType === 'campaign' ? bpid : undefined,
        });
    };
    const isCampaign = mappingType === 'campaign';
    const isAdvertiser = mappingType === 'advertiser';
    const advertiserReadOnly = isCampaign && !isMulti && campaign?.advertiserMapping === 'mapped';
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { id: 'mapping-drawer', title: title, placement: 'right', width: '640px', onClose: onClose, open: open, destroyOnClose: true, styles: { body: { padding: 0, display: 'flex', flexDirection: 'column' } }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerContent, { children: campaign && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_external-ttl', children: "External Advertiser Settings" }), (() => {
                                    const rp = (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.reportingPlatformForPlatform)(campaign.platform);
                                    return rp ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridTwo, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Platform', value: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.platformLabel)(campaign.platform) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Reporting Platform', value: rp })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Platform', value: (0,_mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.platformLabel)(campaign.platform) }));
                                })(), isAdvertiser ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridTwo, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External ID', value: campaign.externalAdvertiserId }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External Advertiser Name', value: campaign.externalAdvertiserName })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Campaign Name (ID)', value: campaign.externalCampaignId === '-'
                                                ? '-'
                                                : `${campaign.externalCampaignName} (${campaign.externalCampaignId})` })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridTwo, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External Advertiser Name', value: campaign.externalAdvertiserName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External Advertiser ID', value: campaign.externalAdvertiserId })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridTwo, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External Campaign Name', value: campaign.externalCampaignName === '-' ? '-' : campaign.externalCampaignName }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'External Campaign ID', value: campaign.externalCampaignId === '-' ? '-' : campaign.externalCampaignId })] })] }))] }), (isAdvertiser || isCampaign) && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_advertiser-ttl', children: "Advertiser Settings" }), advertiserReadOnly ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Advertiser (BPID)', value: campaign.advertiserBid
                                        ? `${campaign.advertiserName} (${campaign.advertiserBid})`
                                        : '-' })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_bpid-sel', label: 'Advertiser (BPID)', required: true, showSearch: true, placeholder: isMulti ? 'Pick one of the mapped advertisers' : 'Advertiser Name', options: bpidOptions, value: bpid, disabled: readOnly, status: bpidError ? 'error' : undefined, errorMessage: bpidError ? 'Select an advertiser (BPID)' : undefined, helperMessage: isMulti
                                        ? 'This external advertiser is mapped to multiple ATAP advertisers — pick the one this campaign belongs to.'
                                        : undefined, onChange: v => {
                                        setBpid(v);
                                        setBpidError(false);
                                    } }))] })), isCampaign && isDerby && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_campaign-settings-ttl', children: "Campaign Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'mapping-drawer_paid-search-id-inp', label: 'Paid Search ID', required: true, placeholder: 'Enter the Paid Search ID', disabled: readOnly, value: paidSearchId, onChange: e => setPaidSearchId(e.target.value) })] })), isCampaign && isWihp && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_campaign-settings-ttl', children: "Campaign Settings" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_wihp-campaign-sel', label: 'WIHP Campaign Name', required: true, showSearch: true, placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.wihpCampaignNameOptions, disabled: readOnly, value: wihpCampaignName, onChange: v => setWihpCampaignName(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.ReadOnlyField, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.ReadOnlyLabel, { children: "Paid Search IDs *" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { id: 'mapping-drawer_paid-search-ids-txt', placeholder: '-', rows: 4, disabled: readOnly, value: paidSearchIds, onChange: e => setPaidSearchIds(e.target.value) })] })] })), isCampaign && !isWihp && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_additional-ttl', children: "Additional Settings" }), isDerby ? (
                                // DerbySoft (Req 6, revised): Tactic is a backend-supplied dropdown (user selects);
                                // Sub-Type / Language remain standards, shown read-only.
                                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_derby-tactic-sel', label: 'Tactic', required: true, placeholder: 'Select a tactic', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.derbyTacticOptions, disabled: readOnly, value: tactic, onChange: v => setTactic(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Sub-Type', value: subType ?? '-' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Language', value: language ?? '-' })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_tactic-sel', label: 'Tactic', required: true, placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.tacticOptions, disabled: readOnly, value: tactic, onChange: v => setTactic(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_subtype-sel', label: 'Sub-Type', required: true, placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.subTypeOptions, disabled: readOnly, value: subType, onChange: v => setSubType(v) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: 'mapping-drawer_language-sel', label: 'Language', required: true, placeholder: '-', options: _mockData_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_4__.languageOptions, disabled: readOnly, value: language, onChange: v => setLanguage(v) })] })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FieldGridThree, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'mapping-drawer_custom1-inp', label: customLabels.custom1, placeholder: '-', disabled: readOnly, value: custom1, onChange: e => setCustom1(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'mapping-drawer_custom2-inp', label: customLabels.custom2, placeholder: '-', disabled: readOnly, value: custom2, onChange: e => setCustom2(e.target.value) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'mapping-drawer_custom3-inp', label: customLabels.custom3, placeholder: '-', disabled: readOnly, value: custom3, onChange: e => setCustom3(e.target.value) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.GeneratedNameRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.FullWidthField, { style: { flex: 1 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ReadOnly, { label: 'Campaign Name', value: generatedName }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.CopyButton, { type: 'button', "aria-label": 'Copy campaign name', onClick: copyGeneratedName, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'copy', width: 16, height: 16 }) })] })] })), (mappingType === 'invoice' || mappingType === 'offers' || mappingType === 'oba') && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'mapping-drawer_placeholder-ttl', children: [title, " Settings"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.PlaceholderNote, { children: ["The ", title.toLowerCase(), " form will be built later. This confirms the entry point opens the correct mapping type."] })] }))] })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_MappingDrawer_styled__WEBPACK_IMPORTED_MODULE_6__.DrawerFooter, { style: { justifyContent: 'space-between' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: !readOnly && onDelete && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'mapping-drawer_delete-btn', variant: 'outlined', color: 'danger', onClick: onDelete, children: "Delete mapping" })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { style: { display: 'flex', gap: 16 }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: onClose, htmlType: 'button', id: 'mapping-drawer_cancel-btn', variant: 'outlined', children: readOnly ? 'Close' : 'Cancel' }), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'mapping-drawer_save-btn', onClick: handleSave, disabled: !canSave, children: "Save" }))] })] })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MappingDrawer);


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.styled.tsx"
/*!************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.styled.tsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddIdsField: () => (/* binding */ AddIdsField),
/* harmony export */   AddIdsRow: () => (/* binding */ AddIdsRow),
/* harmony export */   DrawerBody: () => (/* binding */ DrawerBody),
/* harmony export */   DrawerFooter: () => (/* binding */ DrawerFooter),
/* harmony export */   EmptyState: () => (/* binding */ EmptyState),
/* harmony export */   GroupBody: () => (/* binding */ GroupBody),
/* harmony export */   GroupCard: () => (/* binding */ GroupCard),
/* harmony export */   GroupCardNew: () => (/* binding */ GroupCardNew),
/* harmony export */   GroupCount: () => (/* binding */ GroupCount),
/* harmony export */   GroupHeader: () => (/* binding */ GroupHeader),
/* harmony export */   GroupTitle: () => (/* binding */ GroupTitle),
/* harmony export */   IconBtn: () => (/* binding */ IconBtn),
/* harmony export */   IdDetail: () => (/* binding */ IdDetail),
/* harmony export */   IdLabel: () => (/* binding */ IdLabel),
/* harmony export */   IdListHead: () => (/* binding */ IdListHead),
/* harmony export */   IdMain: () => (/* binding */ IdMain),
/* harmony export */   IdRow: () => (/* binding */ IdRow),
/* harmony export */   IdRowNew: () => (/* binding */ IdRowNew),
/* harmony export */   NewTag: () => (/* binding */ NewTag),
/* harmony export */   NewTextField: () => (/* binding */ NewTextField),
/* harmony export */   NewTextRow: () => (/* binding */ NewTextRow),
/* harmony export */   StatusCount: () => (/* binding */ StatusCount),
/* harmony export */   StatusDot: () => (/* binding */ StatusDot),
/* harmony export */   StatusSummary: () => (/* binding */ StatusSummary),
/* harmony export */   TopRow: () => (/* binding */ TopRow),
/* harmony export */   ViewMappedRow: () => (/* binding */ ViewMappedRow)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const DrawerBody = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 0;
  min-height: 0;
`;
const TopRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
// One Offer-text group card.
const GroupCard = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;
const GroupHeader = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_10};
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
`;
const GroupTitle = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const GroupCount = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-size: 12px;
  font-weight: 400;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
`;
const StatusSummary = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
`;
const StatusCount = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
`;
const GroupBody = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
`;
const IdRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 6px 10px;
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};

  /* DF table row hover = cloud_20 (#f2f2f2), fills the full row. */
  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;
// Column header for the revealed Offer_ID list — matches the DF table header exactly:
// white background, 14px weight-500, cloud_30 bottom stroke, 6px/10px padding.
const IdListHead = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-bottom: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  font-size: 14px;
  font-weight: 500;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const IdMain = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  line-height: 18px;
  min-width: 0;
`;
const IdLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-size: 14px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_100};
`;
const IdDetail = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  font-size: 12px;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_80};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StatusDot = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
const IconBtn = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};

  &:hover:not(:disabled) {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_20};
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.crimson_60};
  }
`;
const AddIdsRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
const AddIdsField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1 1 auto;
  min-width: 0;
`;
// Row holding the "View mapped offers" secondary button (mapped offers hidden by default).
// A top divider + extra spacing separate the "add" section above from the "view existing" section.
const ViewMappedRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
`;
const NewTextRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
const NewTextField = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 1 1 auto;
`;
const DrawerFooter = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border-top: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_40};
`;
const EmptyState = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_70};
  font-size: 14px;
  padding: 16px 0;
`;
// "New" indicator for staged (unsaved) additions — a group or Offer_ID added since the drawer
// opened and not yet committed via Save.
const NewTag = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  padding: 2px 8px;
  border-radius: 9999px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  border: none;
`;
// A new (unsaved) Offer-text group card gets a left accent so it stands out in the list.
const GroupCardNew = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(GroupCard) `
  border-left: 3px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};
`;
// A newly added (unsaved) Offer_ID row — same alignment/padding as a normal row so old and new
// line up. Differentiated by a soft tint + a left accent bar (and the inline "New" tag).
const IdRowNew = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(IdRow) `
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_10};
  box-shadow: inset 3px 0 0 ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_60};

  &:hover {
    background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_20};
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.tsx"
/*!*****************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.tsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");
/* harmony import */ var antd_es_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/input */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var _mockData_offers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mockData/offers */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/offers.ts");
/* harmony import */ var _OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OffersDrawer.styled */ "./apps/mediahub-ui/pages/CampaignMapping/OffersDrawer.styled.tsx");






const OWN_ID_PREFIX = '__own__:';
function dotColor(status) {
    if (status === 'green')
        return _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60;
    if (status === 'red')
        return _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60;
    return _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50; // grey
}
function statusLabel(status) {
    if (status === 'green')
        return 'Confirmed';
    if (status === 'red')
        return 'Not confirmed after 48h';
    return 'Awaiting backend confirmation';
}
// Platform-shaped Offer_ID presentation (Req 8.9–8.12):
//  - SA360 → Ad ID + Ad URL
//  - CM360 (static banner, Feed_1_Reporting_Label = "(not set)") → Creative ID + Creatives
//    (CM360 DYNAMIC banners instead expose the Feed 1 Reporting label with no unique ID —
//     documented variant, not modelled in this prototype.)
//  - Meta → Ad ID + Ad Name
function offerIdLabels(platform) {
    switch (platform) {
        case 'SA360':
            return { idHeader: 'Ad ID', detailHeader: 'Ad URL', addLabel: 'Add Ad IDs' };
        case 'CM360':
            return { idHeader: 'Creative ID', detailHeader: 'Creatives', addLabel: 'Add Creative IDs' };
        case 'Meta':
            return { idHeader: 'Ad ID', detailHeader: 'Ad Name', addLabel: 'Add Ad IDs' };
        default:
            return { idHeader: 'Offer ID', detailHeader: 'Detail', addLabel: 'Add Offer IDs' };
    }
}
function OffersDrawer({ open, campaign, readOnly = false, onClose }) {
    const [groups, setGroups] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [available, setAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [openGroups, setOpenGroups] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    // Per-group: user explicitly revealed the already-mapped offers via the "View mapped offers"
    // button (mapped offers are hidden by default; Req 8, revised).
    const [revealedGroups, setRevealedGroups] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [addingText, setAddingText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [newText, setNewText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Baseline captured on open — used to detect deletions when the user hits Save.
    const [baseline, setBaseline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({ groupIds: new Set(), offerIds: new Set() });
    const [confirmSave, setConfirmSave] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (open && campaign) {
            const data = (0,_mockData_offers__WEBPACK_IMPORTED_MODULE_4__.getOffersForCampaign)(campaign.id, campaign.platform);
            setGroups(data.groups.map(g => ({ ...g, offerIds: [...g.offerIds] })));
            setAvailable([...data.available]);
            setOpenGroups(new Set()); // accordions closed by default
            setRevealedGroups(new Set()); // mapped offers hidden until explicitly revealed
            setAddingText(false);
            setNewText('');
            setSearch('');
            setConfirmSave(false);
            setBaseline({
                groupIds: new Set(data.groups.map(g => g.id)),
                offerIds: new Set(data.groups.flatMap(g => g.offerIds.map(o => o.id))),
            });
        }
    }, [open, campaign]);
    // When a search is active, auto-expand the groups that match — but keep them toggleable
    // afterwards (we only seed openGroups, we don't force the open state on every render).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        const term = search.trim().toLowerCase();
        // Clearing the search collapses everything back to the default (all closed).
        if (!term) {
            setOpenGroups(new Set());
            return;
        }
        const matchIds = groups
            .filter(g => g.text.toLowerCase().includes(term) ||
            g.offerIds.some(o => o.idLabel.toLowerCase().includes(term) || o.detail.toLowerCase().includes(term)))
            .map(g => g.id);
        setOpenGroups(new Set(matchIds));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    const toggleGroup = (id) => setOpenGroups(prev => {
        const next = new Set(prev);
        if (next.has(id))
            next.delete(id);
        else
            next.add(id);
        return next;
    });
    const toggleRevealed = (id) => setRevealedGroups(prev => {
        const next = new Set(prev);
        if (next.has(id))
            next.delete(id);
        else
            next.add(id);
        return next;
    });
    // IDs already used across all groups — excluded from the add-ID pickers (one offer per ID).
    const usedIds = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => new Set(groups.flatMap(g => g.offerIds.map(o => o.id))), [groups]);
    // Platform-shaped Offer_ID labels (Req 8.9–8.12).
    const labels = offerIdLabels(campaign?.platform);
    // Add Offer_IDs to a group. A value from the available list -> green; a typed/own id -> grey.
    const addIdsToGroup = (groupId, values) => {
        if (!values.length)
            return;
        setGroups(prev => prev.map(g => {
            if (g.id !== groupId)
                return g;
            const additions = values.flatMap(v => {
                if (v.startsWith(OWN_ID_PREFIX)) {
                    // A typed value may be a comma-separated list of IDs; each typed/own id -> grey.
                    const raw = v.slice(OWN_ID_PREFIX.length);
                    return raw
                        .split(',')
                        .map(x => x.trim())
                        .filter(Boolean)
                        .map((x) => ({ id: x, idLabel: x, detail: 'Manually added', status: 'grey' }));
                }
                const found = available.find(o => o.id === v);
                const one = found
                    ? { ...found, status: 'green' }
                    : { id: v, idLabel: v, detail: '', status: 'green' };
                return [one];
            });
            const existing = new Set(g.offerIds.map(o => o.id));
            const fresh = additions.filter(a => !existing.has(a.id));
            return { ...g, offerIds: [...fresh, ...g.offerIds] };
        }));
    };
    const removeId = (groupId, idToRemove) => setGroups(prev => prev.map(g => (g.id === groupId ? { ...g, offerIds: g.offerIds.filter(o => o.id !== idToRemove) } : g)));
    const addGroup = () => {
        const text = newText.trim();
        if (text.length < 1 || text.length > 255)
            return;
        const id = `og-new-${Date.now()}`;
        setGroups(prev => [{ id, text, offerIds: [] }, ...prev]);
        setOpenGroups(prev => new Set(prev).add(id));
        setAddingText(false);
        setNewText('');
    };
    // Deleting a group (or an Offer_ID) only STAGES the removal — nothing is committed until Save.
    const deleteGroup = (groupId) => setGroups(prev => prev.filter(g => g.id !== groupId));
    // Any original group removed, or any original Offer_ID no longer present → staged deletion.
    const hasDeletions = () => {
        const currentGroups = new Set(groups.map(g => g.id));
        const currentIds = new Set(groups.flatMap(g => g.offerIds.map(o => o.id)));
        for (const gid of baseline.groupIds)
            if (!currentGroups.has(gid))
                return true;
        for (const oid of baseline.offerIds)
            if (!currentIds.has(oid))
                return true;
        return false;
    };
    // Save: if the staged changes include a deletion, confirm once; otherwise commit immediately.
    const handleSave = () => {
        if (hasDeletions()) {
            setConfirmSave(true);
            return;
        }
        onClose();
    };
    const commitSave = () => {
        setConfirmSave(false);
        onClose();
    };
    const q = search.trim().toLowerCase();
    // When searching, keep groups that match on their Offer text OR contain a matching Offer_ID.
    // If the match is on the text, show all its IDs; if the match is only on IDs, show just those.
    const visibleGroups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        let out = groups;
        if (q) {
            out = [];
            for (const g of groups) {
                const textMatch = g.text.toLowerCase().includes(q);
                const idMatches = g.offerIds.filter(o => o.idLabel.toLowerCase().includes(q) || o.detail.toLowerCase().includes(q));
                if (textMatch)
                    out.push(g);
                else if (idMatches.length > 0)
                    out.push({ ...g, offerIds: idMatches });
            }
        }
        // Staged (unsaved) offer groups float to the top so they're on the first page; keep relative
        // order within the new vs saved buckets, each sorted alphabetically by Offer text.
        const isNew = (g) => !baseline.groupIds.has(g.id);
        return [...out].sort((a, b) => Number(isNew(b)) - Number(isNew(a)) || a.text.localeCompare(b.text));
    }, [groups, q, baseline]);
    const title = campaign ? `Offers — ${campaign.externalCampaignName}` : 'Offers';
    const newTextValid = newText.trim().length >= 1 && newText.trim().length <= 255;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Drawer, { id: 'offers-drawer', title: title, placement: 'right', width: '820px', onClose: onClose, open: open, destroyOnClose: true, styles: { body: { padding: 0, display: 'flex', flexDirection: 'column' }, header: { background: 'transparent' } }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.DrawerBody, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.TopRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.H5, { id: 'offers-drawer_ttl', children: ["Offers (", groups.length, ")"] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Text.Body, { id: 'offers-drawer_idtype-txt', style: { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_80, fontSize: 12 }, children: ["Offer IDs for this campaign: ", labels.idHeader, " (", labels.detailHeader, ")"] })] }), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'offers-drawer_add-text-btn', variant: 'outlined', size: 'small', onClick: () => setAddingText(true), children: "Add Offer text" }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd_es_input__WEBPACK_IMPORTED_MODULE_3__["default"].Search, { id: 'offers-drawer_search-inp', placeholder: 'Search offers by text, Offer ID, or name/URL', allowClear: true, value: search, onChange: e => setSearch(e.target.value) }), addingText && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.NewTextRow, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.NewTextField, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Input, { id: 'offers-drawer_new-text-inp', label: 'New Offer text', required: true, placeholder: 'Offer text (1\u2013255 characters)', value: newText, onChange: e => setNewText(e.target.value), errorMessage: newText.length > 0 && !newTextValid ? 'Offer text must be 1–255 characters' : undefined }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'offers-drawer_create-text-btn', htmlType: 'button', onClick: addGroup, disabled: !newTextValid, children: "Add" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: 'offers-drawer_cancel-text-btn', variant: 'outlined', htmlType: 'button', onClick: () => { setAddingText(false); setNewText(''); }, children: "Cancel" })] })), groups.length === 0 && !addingText && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.EmptyState, { children: "No offers yet. Use \u201CAdd Offer text\u201D to create one." }), groups.length > 0 && visibleGroups.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.EmptyState, { children: "No offers match your search." }), visibleGroups.map(g => {
                        const isOpen = openGroups.has(g.id);
                        const options = available.filter(o => !usedIds.has(o.id)).map(o => ({ label: `${o.idLabel} · ${o.detail}`, value: o.id }));
                        const noneAvailable = options.length === 0;
                        const isNewGroup = !baseline.groupIds.has(g.id);
                        const Card = isNewGroup ? _OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupCardNew : _OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupCard;
                        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupHeader, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupTitle, { type: 'button', onClick: () => toggleGroup(g.id), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: isOpen ? 'chevronDown' : 'chevronRight', width: 12, height: 12 }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: g.text }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupCount, { children: ["\u00B7 ", g.offerIds.length, " offer", g.offerIds.length === 1 ? '' : 's'] }), isNewGroup && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.NewTag, { id: `offers-drawer_new-group-${g.id}`, children: "New" })] }), (() => {
                                            const counts = { green: 0, grey: 0, red: 0 };
                                            g.offerIds.forEach(o => (counts[o.status] += 1));
                                            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusSummary, { children: [counts.green > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusCount, { title: 'Confirmed', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.forest_60 }), " ", counts.green] })), counts.grey > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusCount, { title: 'Awaiting backend confirmation', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.cloud_50 }), " ", counts.grey] })), counts.red > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusCount, { title: 'Needs attention', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusDot, { color: _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.colors.crimson_60 }), " ", counts.red] }))] }));
                                        })(), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IconBtn, { type: 'button', "aria-label": `Delete offer text "${g.text}"`, onClick: () => deleteGroup(g.id), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'trashCan', width: 16, height: 16 }) }))] }), isOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.GroupBody, { children: (() => {
                                        const newlyAdded = g.offerIds.filter(o => !baseline.offerIds.has(o.id));
                                        const existingCount = g.offerIds.length;
                                        // The mapped-offers table opens on toggle (button) OR when a search is active.
                                        const revealed = revealedGroups.has(g.id);
                                        const showExisting = !!q || revealed;
                                        const idsToShow = showExisting ? g.offerIds : newlyAdded;
                                        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [!readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.AddIdsRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.AddIdsField, { children: noneAvailable ? (
                                                        // Req 8.13: no Offer_IDs left to map — show empty state, no add control.
                                                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.EmptyState, { children: ["No ", labels.idHeader, "s available to map \u2014 all are already mapped."] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AddOfferIds, { id: `offers-drawer_add-ids-${g.id}`, options: options, addLabel: labels.addLabel, onAdd: values => addIdsToGroup(g.id, values) })) }) })), !showExisting && newlyAdded.length > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GroupIdList, { offerIds: newlyAdded, readOnly: readOnly, baselineIds: baseline.offerIds, onRemove: id => removeId(g.id, id), idHeader: labels.idHeader, detailHeader: labels.detailHeader })), !q && existingCount > 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.ViewMappedRow, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { id: `offers-drawer_view-mapped-${g.id}`, variant: 'outlined', size: 'small', onClick: () => toggleRevealed(g.id), children: revealed ? 'Hide mapped offers' : `View mapped offers (${existingCount})` }) })), showExisting && (idsToShow.length > 0 ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GroupIdList, { offerIds: idsToShow, readOnly: readOnly, baselineIds: baseline.offerIds, onRemove: id => removeId(g.id, id), idHeader: labels.idHeader, detailHeader: labels.detailHeader })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.EmptyState, { children: ["No ", labels.idHeader, "s to show."] }))), readOnly && existingCount === 0 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.EmptyState, { children: ["No ", labels.idHeader, "s yet."] }))] }));
                                    })() }))] }, g.id));
                    })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.DrawerFooter, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'offers-drawer_cancel-btn', variant: 'outlined', onClick: onClose, children: readOnly ? 'Close' : 'Cancel' }), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', id: 'offers-drawer_save-btn', onClick: handleSave, children: "Save" }))] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Modal, { idPrefix: 'offers-save', title: 'Save changes', open: confirmSave, okText: 'Save', cancelText: 'Cancel', onCancel: () => setConfirmSave(false), onOk: commitSave, children: "Your changes include deleting offers or Offer IDs. Saving will remove them. Continue?" })] }));
}
// Renders a group's Offer_IDs with pagination (keeps the DOM light for large groups).
function GroupIdList({ offerIds, readOnly = false, baselineIds, onRemove, idHeader, detailHeader }) {
    const PAGE = 10;
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    // New IDs are prepended, so jump back to page 1 whenever the list grows to reveal them.
    const prevLen = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(offerIds.length);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (offerIds.length > prevLen.current)
            setPage(1);
        prevLen.current = offerIds.length;
    }, [offerIds.length]);
    // Clamp when the list shrinks (e.g. removals) so we never land on an empty page.
    const pageCount = Math.max(1, Math.ceil(offerIds.length / PAGE));
    const current = Math.min(page, pageCount);
    const start = (current - 1) * PAGE;
    const slice = offerIds.slice(start, start + PAGE);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdListHead, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { "aria-hidden": true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { children: [idHeader, " \u00B7 ", detailHeader] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { "aria-hidden": true })] }), slice.map(o => {
                const isNew = !baselineIds.has(o.id);
                const Row = isNew ? _OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdRowNew : _OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdRow;
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Row, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.StatusDot, { color: dotColor(o.status), title: statusLabel(o.status) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdMain, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdLabel, { children: [o.idLabel, isNew && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.NewTag, { style: { marginLeft: 8 }, children: "New" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IdDetail, { children: o.detail })] }), !readOnly && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OffersDrawer_styled__WEBPACK_IMPORTED_MODULE_5__.IconBtn, { type: 'button', "aria-label": `Remove ${o.idLabel}`, onClick: () => onRemove(o.id), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Icon, { name: 'trashCan', width: 14, height: 14 }) }))] }, o.id));
            }), offerIds.length > PAGE && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Pagination, { current: current, pageSize: PAGE, total: offerIds.length, showTotal: (total, [s2, e2]) => `${s2}–${e2} of ${total} offer IDs`, onChange: p => setPage(p) }))] }));
}
// A multi-select of available Offer_IDs with a "type to add your own" option; adds on confirm.
function AddOfferIds({ id, options, addLabel, onAdd, }) {
    const SELECT_ALL = '__select_all__';
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [term, setTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Options matching the current search term — what 'Select all' maps in one go.
    const matches = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const t = term.trim().toLowerCase();
        return t ? options.filter(o => o.label.toLowerCase().includes(t)) : options;
    }, [term, options]);
    const opts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const t = term.trim();
        const inList = options.some(o => o.label.toLowerCase().includes(t.toLowerCase()));
        const ownOpt = t && !inList ? [{ label: `Add "${t}" (comma-separate for multiple)`, value: `${OWN_ID_PREFIX}${t}` }] : [];
        // 'Select all' is the FIRST item; its label embeds the term so label-search keeps it visible.
        const selectAllOpt = matches.length > 0
            ? [{ label: t ? `Select all ${matches.length} matching "${t}"` : 'Select all', value: SELECT_ALL }]
            : [];
        return [...selectAllOpt, ...ownOpt, ...options];
    }, [term, options, matches]);
    const handleChange = (vals) => {
        // 'Select all' TICKS all current matches (union with any existing selection), keeping the
        // search filter so they render checked and the user can still deselect a few before Add.
        // It is never stored in the selection itself.
        if (vals.includes(SELECT_ALL)) {
            setSelected(prev => Array.from(new Set([...prev, ...matches.map(o => o.value)])));
            return;
        }
        setSelected(vals.filter(v => v !== SELECT_ALL));
    };
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'flex-end' }, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { flex: 1, minWidth: 0 }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Select, { id: id, label: addLabel, mode: 'multiple', showSearch: true, placeholder: 'Select from available, or type IDs (comma-separated) to add', options: opts, value: selected, onChange: v => handleChange(v), onSearch: setTerm, searchBy: 'label', notFoundContent: 'Type to add an Offer ID' }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_2__.Button, { htmlType: 'button', size: 'small', disabled: selected.length === 0, onClick: () => {
                    onAdd(selected);
                    setSelected([]);
                    setTerm('');
                }, children: "Add" })] }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OffersDrawer);


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/mockData/offers.ts"
/*!*******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/mockData/offers.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOffersForCampaign: () => (/* binding */ getOffersForCampaign),
/* harmony export */   offerTextSuggestions: () => (/* binding */ offerTextSuggestions)
/* harmony export */ });
// Mock data for the Offers drawer (prototype) — grouped by Offer text.
// Model: an Offer = one Offer text + a set of Offer_IDs mapped under it. A campaign has several
// Offer-text groups. Offer_IDs carry a Grey/Green/Red status (DWI model). Offer_ID presentation
// is platform-specific (UX-8.5 / Req 8.9–8.12).
/** Per-campaign offer groups + the available-to-map pool, generated + cached. */
const cache = new Map();
function getOffersForCampaign(campaignId, platform) {
    if (!cache.has(campaignId)) {
        // A large pool so 20 groups x 20 ids all have distinct IDs, plus spares for the "available" list.
        // Offer-themed names so the Add picker is searchable by promo (e.g. 'summer', 'valentine').
        const promoThemes = [
            'Summer Special', "Valentine's Day Promo", 'Black Friday Deal', 'Easter Getaway',
            'Spring Escape', 'Christmas Offer', 'New Year Stay', 'Autumn Retreat',
            'Weekend Flash Sale', 'Halloween Special', 'Back to School Offer', 'Labor Day Deal',
            'Early Summer Promo', 'Winter Wonderland', 'Mother\'s Day Treat', "Father's Day Offer",
        ];
        const pool = (() => {
            const mk = (n) => {
                const num = String(50000 + n);
                const promo = `${promoThemes[n % promoThemes.length]} ${num}`;
                if (platform === 'CM360')
                    return { id: `CR-${num}`, idLabel: `CR-${num}`, detail: promo, status: 'green' };
                return { id: `AD-${num}`, idLabel: `AD-${num}`, detail: promo, status: 'green' };
            };
            return Array.from({ length: 500 }, (_, k) => mk(k + 1));
        })();
        const texts = [
            'Summer Sale \u2013 20% off', 'Free breakfast included', 'Stay 3 nights, pay 2',
            'Early bird \u2013 book 60 days ahead', 'Member exclusive rate', 'Last-minute deal',
            'Family package', 'Spa & wellness offer', 'Weekend getaway', 'Advance purchase 10% off',
            'Flexible rate', 'Non-refundable saver', 'Honeymoon special', 'Long-stay discount',
            'City break bundle', 'All-inclusive offer', 'Resort credit $50', 'Kids stay free',
            'Suite upgrade offer', 'Loyalty bonus points',
        ];
        const statuses = ['green', 'green', 'green', 'grey', 'green', 'red'];
        let cursor = 0;
        const groups = texts.map((text, gi) => {
            const offerIds = Array.from({ length: 20 }, (_, k) => {
                const base = pool[cursor++];
                return { ...base, status: statuses[(gi + k) % statuses.length] };
            });
            return { id: `og-${gi + 1}`, text, offerIds };
        });
        const used = new Set(groups.flatMap(g => g.offerIds.map(o => o.id)));
        cache.set(campaignId, { groups, available: pool.filter(o => !used.has(o.id)) });
    }
    return cache.get(campaignId);
}
/** Existing Offer-text suggestions (reuse across the advertiser). */
const offerTextSuggestions = [
    'Summer Sale – 20% off',
    'Free breakfast included',
    'Stay 3 nights, pay 2',
    'Early bird – book 60 days ahead',
    'Member exclusive rate',
];


/***/ },

/***/ "./apps/mediahub-ui/shared/advertiserReportingStore.ts"
/*!*************************************************************!*\
  !*** ./apps/mediahub-ui/shared/advertiserReportingStore.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAdvertiserReporting: () => (/* binding */ getAdvertiserReporting),
/* harmony export */   seedAdvertiserReporting: () => (/* binding */ seedAdvertiserReporting),
/* harmony export */   setAdvertiserReporting: () => (/* binding */ setAdvertiserReporting)
/* harmony export */ });
/* harmony import */ var _londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
// Per-advertiser reporting settings (Custom 1/2/3) — prototype store, persisted to localStorage.
// These are the advertiser-level reporting values that mapped campaigns inherit (Req 2/3).
// There are no per-customer labels — the three values themselves are the labels.


const EMPTY = { custom1: '', custom2: '', custom3: '' };
const STORAGE_KEY = 'mediahub.advertiser-reporting.v1';
function readAll() {
    if (typeof localStorage === 'undefined')
        return {};
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    }
    catch {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
}
function getAdvertiserReporting(advertiserId) {
    const all = readAll();
    return { ...EMPTY, ...(all[String(advertiserId ?? '')] ?? {}) };
}
// --- Prototype seed -----------------------------------------------------------------------------
// The Advertiser module gets its advertisers from a live GraphQL endpoint, while the Campaign
// Mapping module uses a hand-authored mock (keyed by BPID). The two sets don't overlap, so without
// seeding you'd never see inherited labels in the mapping drawer. This seeds default Custom Label
// 1/2/3 for the campaign-mock BPIDs so the inheritance is demonstrable. Values ARE the labels
// (value-is-label); a blank custom falls back to the generic "Custom N" at render time.
// Example (El Palace Barcelona, BP-2850): Custom 1 = "Market", 2/3 left blank -> show "Custom 2/3".
const SEED = {
    // All 10 demo advertisers from the registry first; the explicit entries below win where both exist.
    ...Object.fromEntries(_demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__.DEMO_ADVERTISERS.map(a => [a.bpid, { ...a.reporting }])),
    'BP-2850': { custom1: 'Market', custom2: '', custom3: '' }, // El Palace Barcelona
    'BP-64517': { custom1: 'Region', custom2: 'Campaign Objective', custom3: 'Fiscal Year' }, // Mulia Resort
    'BP-64518': { custom1: 'Region', custom2: 'Property Cluster', custom3: '' }, // Mulia Villa
    'BP-51546': { custom1: 'Market', custom2: 'Booking Window', custom3: '' }, // Trump Intl Hotel Las Vegas
    // Real backend advertisers (BPIDs from the live Advertisers list) — same ones seeded with
    // campaigns, so reporting labels + campaigns are consistent for the demo.
    'BP-9074305': { custom1: 'Market', custom2: 'Campaign Objective', custom3: '' }, // 11 Howard New York
    'BP-9113259': { custom1: 'Region', custom2: '', custom3: '' }, // 1 Hotel Brooklyn Bridge
    [_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid]: { ..._londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_REPORTING }, // The Londoner Hotel
    'BP-9104332': { custom1: 'Market', custom2: 'Booking Window', custom3: 'Fiscal Year' }, // 25 hours Hotel Dubai
};
let seeded = false;
/**
 * Seed default reporting labels for the campaign-mapping mock advertisers, ONCE, and only for
 * BPIDs that don't already have a stored entry (never overwrite user edits). Idempotent and safe
 * to call on every drawer open. Prototype-only.
 */
function seedAdvertiserReporting() {
    if (seeded || typeof localStorage === 'undefined')
        return;
    seeded = true;
    const all = readAll();
    let changed = false;
    for (const [bpid, value] of Object.entries(SEED)) {
        if (!(bpid in all)) {
            all[bpid] = value;
            changed = true;
        }
    }
    if (changed)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
function setAdvertiserReporting(advertiserId, value) {
    if (typeof localStorage === 'undefined')
        return;
    const all = readAll();
    all[String(advertiserId ?? '')] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_pages_CampaignMapping_MappingDrawer_tsx-apps_mediahub-ui_pages_CampaignMappi-cb39d6.f401f789ebd20e80711c.js.map