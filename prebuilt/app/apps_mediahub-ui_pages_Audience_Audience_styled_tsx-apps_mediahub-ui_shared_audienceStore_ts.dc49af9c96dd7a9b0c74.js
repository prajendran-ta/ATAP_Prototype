"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts"],{

/***/ "./apps/mediahub-ui/pages/Audience/Audience.styled.tsx"
/*!*************************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/Audience.styled.tsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudienceDrawerActions: () => (/* binding */ AudienceDrawerActions),
/* harmony export */   AudienceDrawerContent: () => (/* binding */ AudienceDrawerContent),
/* harmony export */   AudienceDrawerFooter: () => (/* binding */ AudienceDrawerFooter),
/* harmony export */   AudienceFormSections: () => (/* binding */ AudienceFormSections),
/* harmony export */   AudienceInformationCard: () => (/* binding */ AudienceInformationCard),
/* harmony export */   AudienceNoWrap: () => (/* binding */ AudienceNoWrap),
/* harmony export */   AudiencePlatformChip: () => (/* binding */ AudiencePlatformChip),
/* harmony export */   AudiencePlatformChipRow: () => (/* binding */ AudiencePlatformChipRow),
/* harmony export */   AudiencePlatformChipRows: () => (/* binding */ AudiencePlatformChipRows),
/* harmony export */   AudienceSettingsCard: () => (/* binding */ AudienceSettingsCard),
/* harmony export */   AudienceSettingsGrid: () => (/* binding */ AudienceSettingsGrid),
/* harmony export */   AudienceWrapper: () => (/* binding */ AudienceWrapper),
/* harmony export */   SelectedRulesChips: () => (/* binding */ SelectedRulesChips)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


const AudienceWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-width: 900px;
  padding-bottom: 10px;
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
const AudienceNoWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  white-space: nowrap;
`;
const AudiencePlatformChipRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
`;
const AudienceDrawerContent = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0 64px;
`;
const AudienceInformationCard = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_30};
  border-radius: 5px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  margin-bottom: 20px;
`;
const AudienceSettingsCard = AudienceInformationCard;
const AudienceSettingsGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`;
const AudienceFormSections = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`;
const SelectedRulesChips = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const AudienceDrawerFooter = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`;
const AudienceDrawerActions = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts"
/*!**********************************************************!*\
  !*** ./apps/mediahub-ui/pages/Audience/mockAudiences.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DATA_TYPE_LABEL: () => (/* binding */ DATA_TYPE_LABEL),
/* harmony export */   DATA_TYPE_OPTIONS: () => (/* binding */ DATA_TYPE_OPTIONS),
/* harmony export */   MOCK_AUDIENCES: () => (/* binding */ MOCK_AUDIENCES),
/* harmony export */   MOCK_PLATFORM_ADVERTISERS: () => (/* binding */ MOCK_PLATFORM_ADVERTISERS)
/* harmony export */ });
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");


const DATA_TYPE_OPTIONS = [
    { label: 'Amadeus audience', value: 'DATAPARTNER' },
    { label: 'First party data', value: 'FILE' },
    { label: 'Amadeus tracking', value: 'ADVERTISER' },
];
const MOCK_PLATFORM_ADVERTISERS = [
    { id: 'platform-001', platform: 'CM360', advertiserName: 'Hotel Alpha CM360', advertiserId: '1111', connected: true },
    { id: 'platform-002', platform: 'SA360', advertiserName: 'Hotel Alpha SA360', advertiserId: '2222', connected: true },
    { id: 'platform-003', platform: 'Meta (Facebook)', advertiserName: 'Hotel Alpha Facebook', advertiserId: '3333', connected: false },
];
const BASE_MOCK_AUDIENCES = [
    { id: 'aud-001', advertiser: 'Hotel Alpha', audienceName: 'High-value hotel bookers', dataType: 'ADVERTISER', channels: 'Google Ads, Meta', audienceSize: 125000, lastUpload: '18 Sep 2026', nextUpload: '25 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS, audienceRuleIds: ['rule-001'] },
    { id: 'aud-002', advertiser: 'Grand Aurora', audienceName: 'Weekend leisure travelers', dataType: 'DATAPARTNER', channels: 'DV360', audienceSize: 84500, lastUpload: '17 Sep 2026', nextUpload: '24 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS.slice(1), audienceRuleIds: ['rule-002'] },
    { id: 'aud-003', advertiser: 'Harborlight Resort', audienceName: 'Luxury repeat guests', dataType: 'FILE', channels: 'CM360, Meta', audienceSize: 39200, lastUpload: '15 Sep 2026', nextUpload: '22 Sep 2026', platformAdvertisers: MOCK_PLATFORM_ADVERTISERS.slice(0, 1), audienceRuleIds: ['rule-004'] },
];
/**
 * The Londoner Hotel audiences. Only audience-enabled platforms are used (Google ADS, Amadeus DSP,
 * Google DV360); metasearch has no audience targeting. Platform records are cloned per audience and
 * `channels` is derived from them so the two never drift apart.
 */
const londonerPlatforms = (...platforms) => _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_PLATFORM_ADVERTISERS.filter(p => platforms.includes(p.platform)).map(p => ({ ...p }));
const londonerAudience = (audience, platforms) => {
    const platformAdvertisers = londonerPlatforms(...platforms);
    return {
        ...audience,
        advertiser: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        channels: platformAdvertisers.map(p => p.platform).join(', '),
        platformAdvertisers,
    };
};
const LONDONER_AUDIENCES = [
    londonerAudience({ id: 'aud-ln001', audienceName: 'Londoner website visitors 30d', dataType: 'ADVERTISER', audienceSize: 310000, lastUpload: '09 Nov 2026', nextUpload: '16 Nov 2026', audienceRuleIds: ['rule-009'] }, ['Google ADS', 'Amadeus DSP', 'Google DV360']),
    londonerAudience({ id: 'aud-ln002', audienceName: 'Londoner abandoned bookings', dataType: 'ADVERTISER', audienceSize: 4200, lastUpload: '12 Nov 2026', nextUpload: '19 Nov 2026', audienceRuleIds: ['rule-012'] }, ['Google ADS', 'Amadeus DSP']),
    londonerAudience({ id: 'aud-ln003', audienceName: 'London weekend breakers', dataType: 'DATAPARTNER', audienceSize: 86000, lastUpload: '05 Nov 2026', nextUpload: '12 Nov 2026', audienceRuleIds: ['rule-009', 'rule-013'] }, ['Google ADS', 'Google DV360']),
    londonerAudience({ id: 'aud-ln004', audienceName: 'US long-haul luxury travellers', dataType: 'DATAPARTNER', audienceSize: 52000, lastUpload: '29 Oct 2026', nextUpload: '05 Nov 2026', audienceRuleIds: ['rule-011'] }, ['Amadeus DSP', 'Google DV360']),
    londonerAudience({ id: 'aud-ln005', audienceName: 'Business travellers - Central London', dataType: 'DATAPARTNER', audienceSize: 38500, lastUpload: '22 Oct 2026', nextUpload: '29 Oct 2026', audienceRuleIds: ['rule-010'] }, ['Amadeus DSP']),
    londonerAudience({ id: 'aud-ln006', audienceName: 'Londoner loyalty members', dataType: 'FILE', fileId: 'londoner-loyalty-members', audienceSize: 12800, lastUpload: '14 Oct 2026', nextUpload: '21 Oct 2026', audienceRuleIds: [] }, ['Google ADS', 'Amadeus DSP']),
    londonerAudience({ id: 'aud-ln007', audienceName: 'Londoner past guests (CRM)', dataType: 'FILE', fileId: 'londoner-past-guests-crm', audienceSize: 24600, lastUpload: '15 Oct 2026', nextUpload: '22 Oct 2026', audienceRuleIds: [] }, ['Google ADS', 'Google DV360']),
];
const DEMO_AUDIENCE_TEMPLATES = [
    { name: adv => `${adv.campaignPrefix} website visitors 30d`, dataType: 'ADVERTISER', platforms: ['Google ADS', 'Amadeus DSP', 'Google DV360'], ruleIds: ['rule-014'], baseSize: 240000 },
    { name: adv => `${adv.market} weekend breakers`, dataType: 'DATAPARTNER', platforms: ['Google ADS', 'Google DV360'], ruleIds: ['rule-016'], baseSize: 78000 },
    { name: adv => `${adv.campaignPrefix} loyalty members`, dataType: 'FILE', platforms: ['Google ADS', 'Amadeus DSP'], ruleIds: [], baseSize: 14500, fileSuffix: 'loyalty-members' },
    { name: adv => `Long-haul visitors to ${adv.market}`, dataType: 'DATAPARTNER', platforms: ['Amadeus DSP', 'Google DV360'], ruleIds: ['rule-015'], baseSize: 46000 },
    { name: adv => `Business & conference travellers - ${adv.market}`, dataType: 'DATAPARTNER', platforms: ['Amadeus DSP'], ruleIds: ['rule-017'], baseSize: 31000 },
    { name: adv => `${adv.campaignPrefix} family holiday planners`, dataType: 'DATAPARTNER', platforms: ['Google ADS', 'Amadeus DSP'], ruleIds: ['rule-018', 'rule-019'], baseSize: 22500 },
];
const AUDIENCE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Date -> 'DD Mon YYYY' (the audience table's display format). */
const formatUploadDate = (date) => `${String(date.getUTCDate()).padStart(2, '0')} ${AUDIENCE_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
const buildDemoAdvertiserAudiences = (adv, advIndex) => {
    const count = 4 + (advIndex % 3);
    return DEMO_AUDIENCE_TEMPLATES.slice(0, count).map((template, templateIndex) => {
        const platformAdvertisers = adv.platformAdvertisers
            .filter(p => template.platforms.includes(p.platform))
            .map(p => ({ ...p }));
        // lastUpload falls in Oct-Nov 2026 (month alternates), nextUpload is a week later.
        const lastUpload = new Date(Date.UTC(2026, 9 + ((advIndex + templateIndex) % 2), 1 + ((advIndex * 5 + templateIndex * 3) % 28)));
        const nextUpload = new Date(lastUpload.getTime() + 7 * 24 * 60 * 60 * 1000);
        const sizeScale = adv.totalBudget / 300000;
        const variation = 0.85 + ((advIndex * 3 + templateIndex * 7) % 10) * 0.03;
        return {
            id: `aud-${adv.key}-${String(templateIndex + 1).padStart(2, '0')}`,
            advertiser: adv.name,
            audienceName: template.name(adv),
            dataType: template.dataType,
            ...(template.fileSuffix ? { fileId: `${adv.key}-${template.fileSuffix}` } : {}),
            channels: platformAdvertisers.map(p => p.platform).join(', '),
            audienceSize: Math.round((template.baseSize * sizeScale * variation) / 100) * 100,
            lastUpload: formatUploadDate(lastUpload),
            nextUpload: formatUploadDate(nextUpload),
            platformAdvertisers,
            audienceRuleIds: [...template.ruleIds],
        };
    });
};
const DEMO_ADVERTISER_AUDIENCES = _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_1__.DEMO_ADVERTISERS.flatMap(buildDemoAdvertiserAudiences);
const MOCK_AUDIENCES = [...BASE_MOCK_AUDIENCES, ...LONDONER_AUDIENCES, ...DEMO_ADVERTISER_AUDIENCES];
const DATA_TYPE_LABEL = Object.fromEntries(DATA_TYPE_OPTIONS.map(option => [option.value, option.label]));


/***/ },

/***/ "./apps/mediahub-ui/shared/audienceStore.ts"
/*!**************************************************!*\
  !*** ./apps/mediahub-ui/shared/audienceStore.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSharedAudiences: () => (/* binding */ getSharedAudiences),
/* harmony export */   setSharedAudiences: () => (/* binding */ setSharedAudiences)
/* harmony export */ });
/* harmony import */ var _pages_Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/Audience/mockAudiences */ "./apps/mediahub-ui/pages/Audience/mockAudiences.ts");

let audiences = [];
let seedMerged = false;
const STORAGE_KEY = 'mediahub.audiences';
/** Ids of seed (MOCK_AUDIENCES) entries already offered to this session, so deleted ones never come back. */
const SEEDED_IDS_KEY = 'mediahub.audiences.seeded-ids';
const cloneAudience = (audience) => ({
    ...audience,
    platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
    audienceRuleIds: [...audience.audienceRuleIds],
});
/**
 * Merge-safe seeding: appends seed audiences whose id has never been offered to this session and is
 * not already present. Never overwrites or duplicates user-created/edited items, and a seed the user
 * deleted is not re-added (its id stays recorded). Runs once per module load.
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
    const known = new Set([...seededIds, ...audiences.map(audience => audience.id)]);
    const missing = _pages_Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_0__.MOCK_AUDIENCES.filter(seed => !known.has(seed.id));
    if (missing.length > 0) {
        audiences = [...audiences, ...missing.map(cloneAudience)];
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(audiences));
    }
    sessionStorage.setItem(SEEDED_IDS_KEY, JSON.stringify([...new Set([...seededIds, ..._pages_Audience_mockAudiences__WEBPACK_IMPORTED_MODULE_0__.MOCK_AUDIENCES.map(seed => seed.id)])]));
}
function hydrate() {
    if (typeof sessionStorage === 'undefined')
        return;
    if (audiences.length === 0) {
        try {
            audiences = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]');
        }
        catch {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }
    mergeNewSeeds();
}
function getSharedAudiences() {
    hydrate();
    return audiences.map(audience => ({
        ...audience,
        platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
        audienceRuleIds: [...audience.audienceRuleIds],
    }));
}
function setSharedAudiences(nextAudiences) {
    // Record seed ids as offered first, so seeds missing from `nextAudiences` (deleted) are not re-added later.
    if (typeof sessionStorage !== 'undefined' && !seedMerged)
        hydrate();
    audiences = nextAudiences.map(audience => ({
        ...audience,
        platformAdvertisers: audience.platformAdvertisers.map(platform => ({ ...platform })),
        audienceRuleIds: [...audience.audienceRuleIds],
    }));
    if (typeof sessionStorage !== 'undefined')
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(audiences));
}


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_pages_Audience_Audience_styled_tsx-apps_mediahub-ui_shared_audienceStore_ts.dc49af9c96dd7a9b0c74.js.map