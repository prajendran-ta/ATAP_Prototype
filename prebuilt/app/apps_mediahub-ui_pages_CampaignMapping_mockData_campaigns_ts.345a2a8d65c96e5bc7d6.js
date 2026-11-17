"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["apps_mediahub-ui_pages_CampaignMapping_mockData_campaigns_ts"],{

/***/ "./apps/mediahub-ui/components/CampaignFlow/londonerMaxCampaigns.ts"
/*!**************************************************************************!*\
  !*** ./apps/mediahub-ui/components/CampaignFlow/londonerMaxCampaigns.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_CAMPAIGN_NAMES: () => (/* binding */ MAX_CAMPAIGN_NAMES),
/* harmony export */   maxCampaignName: () => (/* binding */ maxCampaignName)
/* harmony export */ });
const MAX_CAMPAIGN_NAMES = {
    'google-ads|Brand': 'LON_2027_FR_GADS_BRAND',
    'google-ads|Generic': 'LON_2027_FR_GADS_GENERIC',
    'amadeus-dsp|Prospecting': 'LON_2027_FR_ADSP_PROSPECTING',
    'amadeus-dsp|Remarketing': 'LON_2027_FR_ADSP_REMARKETING',
};
const maxCampaignName = (ref) => MAX_CAMPAIGN_NAMES[`${ref.platformId}|${ref.tactic}`];


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts"
/*!**********************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/mockData/campaigns.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   advertiserOptions: () => (/* binding */ advertiserOptions),
/* harmony export */   campaignStatusOptions: () => (/* binding */ campaignStatusOptions),
/* harmony export */   languageOptions: () => (/* binding */ languageOptions),
/* harmony export */   mappedAsUnmappedRows: () => (/* binding */ mappedAsUnmappedRows),
/* harmony export */   mappedCampaigns: () => (/* binding */ mappedCampaigns),
/* harmony export */   platformOptions: () => (/* binding */ platformOptions),
/* harmony export */   reportingPlatformOptions: () => (/* binding */ reportingPlatformOptions),
/* harmony export */   statusOptions: () => (/* binding */ statusOptions),
/* harmony export */   subTypeOptions: () => (/* binding */ subTypeOptions),
/* harmony export */   tacticOptions: () => (/* binding */ tacticOptions)
/* harmony export */ });
/* harmony import */ var _unmappedCampaigns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unmappedCampaigns */ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts");
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
// Mock data for the Campaigns (mapped) page — campaigns whose campaign/reporting mapping is
// complete. Mirrors the Unmapped list structure but lists MAPPED campaigns with the internal
// (ATAP) identity: internal Campaign Name + ATAP advertiser + tactic/sub-type/language.



const ln = (n, ch, subType, lang, campaignStatus, mappingStatus, counts, o = {}) => {
    const c = _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__.LONDONER_CHANNELS[ch];
    const tactic = o.tactic ?? c.tactic;
    const [green, grey, red] = counts ?? [0, 0, 0];
    return {
        id: `cm-ln${String(n).padStart(3, '0')}`,
        platform: o.platform ?? c.mappingPlatform,
        reportingPlatform: o.reportingPlatform ?? c.reportingPlatform,
        campaignName: (0,_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__.londonerCampaignName)(tactic, subType, lang, o.label),
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__.LONDONER.bpid,
        tactic,
        subType,
        language: lang,
        // Custom 1/2/3 are part of the Naming Convention String above.
        ...(0,_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_1__.londonerCampaignCustoms)(tactic, subType, lang),
        mappingStatus,
        campaignStatus,
        offersMapping: counts ? 'mapped' : 'unmapped',
        offerCounts: { green, grey, red },
        isFollowed: true,
    };
};
const baseMappedCampaigns = [
    { id: 'cm-r001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'El Palace Barcelona_Paid Search_Brand_EN', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'red', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-r002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Mulia Resort_Social_Retargeting_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-r003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Trump Intl LV_Display_Prospecting_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-r004', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Copthorne Auckland_Paid Search_Brand_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0001', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Mulia Resort_Paid Search_Brand_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: true },
    { id: 'cm-0002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Mulia Resort_Social_Prospecting_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'El Palace Barcelona_Display_Remarketing_ES', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Display', subType: 'Remarketing', language: 'ES', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0004', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: 'Trump Intl LV_Metasearch_RevTracking_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0005', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Copthorne Auckland_Paid Search_NonBrand_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0006', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Millennium Queenstown_Social_Retargeting_EN', advertiserName: 'Millennium Hotel Queenstown', advertiserBid: 'BP-33012', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0007', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Mulia Villa_Display_Prospecting_EN', advertiserName: 'Mulia Villa - Nusa Dua, Bali', advertiserBid: 'BP-64518', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 11, grey: 4, red: 1 }, isFollowed: true },
    { id: 'cm-0008', platform: 'WIHP', reportingPlatform: '—', campaignName: 'El Palace Barcelona_Metasearch_Meta_ES', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Metasearch', subType: 'Metasearch', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0009', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Wellington_Display_Prospecting_EN', advertiserName: 'Copthorne Hotel Wellington Oriental Bay', advertiserBid: 'BP-33015', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0010', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Millennium Rotorua_Paid Search_Brand_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0011', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Trump Intl LV_Social_Prospecting_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 14, grey: 3, red: 3 }, isFollowed: true },
    { id: 'cm-0012', platform: 'DerbySoft', reportingPlatform: 'Tripadvisor', campaignName: 'Millennium Rotorua_Metasearch_RevTracking_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0013', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Mulia Resort_Display_Remarketing_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 20, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0014', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'El Palace Barcelona_Paid Search_NonBrand_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0015', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Copthorne Auckland_Social_Prospecting_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: true },
    // ---- Additional rows: broader platform + campaign-status coverage ----
    { id: 'cm-0016', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Mulia Resort_Paid Search_Brand_FR', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0017', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'El Palace Barcelona_Paid Search_NonBrand_EN', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 2 }, isFollowed: true },
    { id: 'cm-0018', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Trump Intl LV_Paid Search_Brand_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0019', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Auckland_Display_Prospecting_EN', advertiserName: 'Copthorne Hotel Auckland HarbourCity', advertiserBid: 'BP-33011', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 18, grey: 2, red: 0 }, isFollowed: true },
    { id: 'cm-0020', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'Millennium Rotorua_Social_Retargeting_EN', advertiserName: 'Millennium Hotel Rotorua', advertiserBid: 'BP-33016', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0021', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: 'Mulia Villa_Paid Search_NonBrand_EN', advertiserName: 'Mulia Villa - Nusa Dua, Bali', advertiserBid: 'BP-64518', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0022', platform: 'WIHP', reportingPlatform: '—', campaignName: 'Trump Intl LV_Metasearch_Meta_EN', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0023', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: 'El Palace Barcelona_Metasearch_RevTracking_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 7, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0024', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Millennium Queenstown_Display_Remarketing_EN', advertiserName: 'Millennium Hotel Queenstown', advertiserBid: 'BP-33012', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0025', platform: 'CM360', reportingPlatform: 'DV360', campaignName: 'Copthorne Wellington_Display_Prospecting_FR', advertiserName: 'Copthorne Hotel Wellington Oriental Bay', advertiserBid: 'BP-33015', tactic: 'Display', subType: 'Prospecting', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 14, grey: 3, red: 3 }, isFollowed: true },
    { id: 'cm-0026', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: 'Mulia Resort_Paid Search_NonBrand_EN', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: true },
    { id: 'cm-0027', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: 'El Palace Barcelona_Social_Prospecting_FR', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850', tactic: 'Social', subType: 'Prospecting', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 20, grey: 0, red: 0 }, isFollowed: false },
    // ---- Real backend advertisers (BPIDs from the live Advertisers list) so the per-advertiser
    // ---- Campaigns tab is populated for a few advertisers; others correctly show "No data".
    // 11 Howard New York a Member of Design Hotels (BP-9074305)
    { id: 'cm-h001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Paid Search_Brand_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 8, grey: 1, red: 0 }, isFollowed: false },
    { id: 'cm-h002', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Social_Prospecting_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-h003', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_Display_Remarketing_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Remarketing', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-h004', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_Metasearch_RevTracking_EN', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Revenue Tracking', language: 'EN', mappingStatus: 'red', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    // 1 Hotel Brooklyn Bridge (BP-9113259)
    { id: 'cm-b001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '1 Hotel Brooklyn Bridge_Paid Search_Brand_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 12, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-b002', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '1 Hotel Brooklyn Bridge_Display_Prospecting_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Display', subType: 'Prospecting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 6, grey: 1, red: 1 }, isFollowed: false },
    { id: 'cm-b003', platform: 'WIHP', reportingPlatform: '—', campaignName: '1 Hotel Brooklyn Bridge_Metasearch_Meta_EN', advertiserName: '1 Hotel Brooklyn Bridge', advertiserBid: 'BP-9113259', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    // 25 hours Hotel Dubai One Central (BP-9104332)
    { id: 'cm-d001', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '25h Dubai One Central_Social_Retargeting_EN', advertiserName: '25 hours Hotel Dubai One Central', advertiserBid: 'BP-9104332', tactic: 'Social', subType: 'Retargeting', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 15, grey: 2, red: 1 }, isFollowed: false },
    { id: 'cm-d002', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '25h Dubai One Central_Paid Search_NonBrand_EN', advertiserName: '25 hours Hotel Dubai One Central', advertiserBid: 'BP-9104332', tactic: 'Paid Search', subType: 'Non-Brand', language: 'EN', mappingStatus: 'red', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    // ---- Bulk demo campaigns for 11 Howard (BP-9074305): 6–10 per platform to exercise
    // ---- the per-advertiser Campaigns tab filtering + pagination. ----
    { id: 'cm-hh001', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh002', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh003', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
    { id: 'cm-hh004', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh005', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh006', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_SA360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh007', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'grey', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh008', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh009', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh010', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh011', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
    { id: 'cm-hh012', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh013', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_CM360_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'red', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh014', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'mapped', offerCounts: { green: 5, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh015', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh016', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh017', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh018', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
    { id: 'cm-hh019', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh020', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh021', platform: 'Meta', reportingPlatform: 'Facebook', campaignName: '11 Howard NY_Meta_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh022', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh023', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh024', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh025', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh026', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 9, grey: 1, red: 0 }, isFollowed: false },
    { id: 'cm-hh027', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh028', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh029', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh030', platform: 'CM360', reportingPlatform: 'DV360', campaignName: '11 Howard NY_DV360_Brand_EN_9', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 13, grey: 2, red: 0 }, isFollowed: false },
    { id: 'cm-hh031', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh032', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'red', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh033', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
    { id: 'cm-hh034', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh035', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh036', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh037', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Prospecting_ES_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'mapped', offerCounts: { green: 11, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh038', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Remarketing_DE_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh039', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Brand_EN_9', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 13, grey: 2, red: 0 }, isFollowed: false },
    { id: 'cm-hh040', platform: 'SA360', reportingPlatform: 'Google Ads', campaignName: '11 Howard NY_Google Ads_Non-Brand_FR_10', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh041', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Brand_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh042', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Non-Brand_FR_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh043', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Prospecting_ES_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Social', subType: 'Prospecting', language: 'ES', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'mapped', offerCounts: { green: 7, grey: 2, red: 0 }, isFollowed: false },
    { id: 'cm-hh044', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Remarketing_DE_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Remarketing', language: 'DE', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh045', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Brand_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Paid Search', subType: 'Brand', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh046', platform: 'SA360', reportingPlatform: 'Bing Ads', campaignName: '11 Howard NY_Bing_Non-Brand_FR_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Display', subType: 'Non-Brand', language: 'FR', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh047', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh048', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh049', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh050', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh051', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'red', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh052', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh053', platform: 'DerbySoft', reportingPlatform: 'Google Hotel Ads', campaignName: '11 Howard NY_DerbySoft_Metasearch_EN_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh054', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_1', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh055', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_2', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh056', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_3', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'grey', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh057', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_4', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh058', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_5', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'unknown', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh059', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_6', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh060', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_7', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'live', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    { id: 'cm-hh061', platform: 'WIHP', reportingPlatform: '—', campaignName: '11 Howard NY_WIHP_Metasearch_EN_8', advertiserName: '11 Howard New York a Member of Design Hotels', advertiserBid: 'BP-9074305', tactic: 'Metasearch', subType: 'Metasearch', language: 'EN', mappingStatus: 'green', campaignStatus: 'pause', offersMapping: 'unmapped', offerCounts: { green: 0, grey: 0, red: 0 }, isFollowed: false },
    // ---- The Londoner Hotel (BP-910077): Paid Search (SA360), Display (Amadeus DSP), Video (DV360), Metasearch ----
    ln(1, 'paidSearch', 'Brand', 'FR', 'live', 'green', [9, 1, 0]),
    ln(2, 'paidSearch', 'Generic', 'FR', 'live', 'green', [7, 0, 0]),
    ln(3, 'paidSearch', 'Generic', 'EN', 'live', 'green', [5, 2, 0], { label: 'Generic_PMax' }),
    ln(4, 'paidSearch', 'Remarketing', 'EN', 'pause', 'green', null),
    ln(5, 'paidSearch', 'Brand', 'EN', 'live', 'green', null),
    ln(6, 'paidSearch', 'Non-Brand', 'DE', 'scheduled', 'grey', null),
    ln(7, 'paidSearch', 'Brand', 'DE', 'live', 'green', [4, 0, 1]),
    ln(8, 'paidSearch', 'Non-Brand', 'FR', 'unknown', 'green', null),
    ln(9, 'display', 'Prospecting', 'FR', 'live', 'green', [12, 2, 0]),
    ln(10, 'display', 'Remarketing', 'FR', 'live', 'green', [8, 1, 1]),
    ln(11, 'display', 'Always-on', 'EN', 'live', 'green', null),
    ln(12, 'display', 'Remarketing', 'EN', 'scheduled', 'green', null),
    ln(13, 'video', 'Prospecting', 'EN', 'live', 'green', [6, 0, 0]),
    ln(14, 'video', 'Remarketing', 'EN', 'pause', 'red', null),
    ln(15, 'video', 'Prospecting', 'FR', 'unknown', 'green', null),
    ln(16, 'metasearch', 'Revenue Tracking', 'EN', 'live', 'green', null, { reportingPlatform: 'Google Hotel Ads', label: 'RevTracking' }),
    ln(17, 'metasearch', 'Revenue Tracking', 'EN', 'live', 'green', null, { reportingPlatform: 'Tripadvisor', label: 'RevTracking_Tripadvisor' }),
    ln(18, 'metasearch', 'Metasearch', 'EN', 'live', 'green', null, { platform: 'WIHP', reportingPlatform: '—', label: 'Meta' }),
];
const CM_SLOTS = {
    paidSearch: [
        { subType: 'Brand', lang: 'EN' }, { subType: 'Non-Brand', lang: 'EN' }, { subType: 'Generic', lang: 'EN' },
        { subType: 'Remarketing', lang: 'EN' }, { subType: 'Brand', lang: 'L2' }, { subType: 'Non-Brand', lang: 'L2' },
        { subType: 'Brand', lang: 'L3' },
    ],
    display: [
        { subType: 'Prospecting', lang: 'EN' }, { subType: 'Remarketing', lang: 'EN' }, { subType: 'Always-on', lang: 'EN' },
        { subType: 'Prospecting', lang: 'L2' }, { subType: 'Remarketing', lang: 'L2' },
    ],
    video: [{ subType: 'Prospecting', lang: 'EN' }, { subType: 'Remarketing', lang: 'EN' }, { subType: 'Prospecting', lang: 'L2' }],
    metasearch: [
        { subType: 'Revenue Tracking', lang: 'EN', reportingPlatform: 'Google Hotel Ads', label: 'RevTracking' },
        { subType: 'Revenue Tracking', lang: 'EN', reportingPlatform: 'Tripadvisor', label: 'RevTracking_Tripadvisor' },
        { subType: 'Metasearch', lang: 'EN', platform: 'WIHP', reportingPlatform: '—', label: 'Meta' },
    ],
};
// Platforms (mapping family) that already count as covering a channel in the hand-written rows.
const CM_COVERING_PLATFORMS = {
    paidSearch: ['SA360'],
    display: ['Amadeus DSP', 'CM360'],
    video: ['DV360'],
    metasearch: ['DerbySoft', 'WIHP'],
};
const EXTRA_LANGS = {
    howard: ['ES', 'FR'], brooklyn: ['ES', 'FR'], dubai: ['FR', 'DE'], mulia: ['FR', 'DE'], elpalace: ['ES', 'FR'],
    trumplv: ['ES', 'FR'], copthorneakl: ['FR', 'DE'], millqt: ['FR', 'DE'], copthornewlg: ['FR', 'DE'], millrot: ['FR', 'DE'],
};
const generateMappedFor = (adv, advIndex, existing) => {
    const big = adv.totalBudget >= 400000;
    const mid = adv.totalBudget >= 250000;
    const take = {
        paidSearch: 3 + (mid ? 1 : 0) + (big ? 1 : 0),
        display: 2 + (mid ? 1 : 0) + (big ? 1 : 0),
        video: 2 + (big ? 1 : 0),
        metasearch: 3,
    };
    const langs = EXTRA_LANGS[adv.key] ?? ['FR', 'DE'];
    const statusCycle = adv.obaStatus === 'Live'
        ? ['live', 'live', 'live', 'pause', 'live', 'live', 'scheduled', 'live']
        : ['scheduled', 'live', 'scheduled', 'unknown', 'live', 'scheduled', 'pause', 'unknown'];
    const rows = [];
    let n = 0;
    (0,_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.activeChannels)(adv).forEach(ch => {
        const covered = existing.filter(c => c.advertiserBid === adv.bpid && CM_COVERING_PLATFORMS[ch].includes(c.platform)).length;
        if (covered >= 2)
            return;
        const info = _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_CHANNEL_INFO[ch];
        CM_SLOTS[ch].slice(0, take[ch]).forEach(slot => {
            const i = n;
            n += 1;
            const lang = slot.lang === 'EN' ? 'EN' : slot.lang === 'L2' ? langs[0] : langs[1];
            const mappingStatus = (i * 3 + advIndex) % 11 === 5 ? 'grey' : (i * 5 + advIndex) % 13 === 9 ? 'red' : 'green';
            const meta = ch === 'metasearch';
            const withOffers = !meta && (i + advIndex) % 3 !== 2;
            const offerCounts = withOffers
                ? { green: 4 + ((i * 7 + advIndex * 3) % 14), grey: (i + advIndex) % 3, red: (i + advIndex) % 5 === 4 ? 1 : 0 }
                : { green: 0, grey: 0, red: 0 };
            const tactic = info.tactic;
            rows.push({
                id: `cm-${adv.key}-${String(i + 1).padStart(3, '0')}`,
                platform: slot.platform ?? info.mappingPlatform,
                reportingPlatform: slot.reportingPlatform ?? info.reportingPlatform,
                campaignName: `${adv.campaignPrefix}_${tactic}_${slot.label ?? slot.subType}_${lang}`,
                advertiserName: adv.name,
                advertiserBid: adv.bpid,
                tactic,
                subType: slot.subType,
                language: lang,
                mappingStatus,
                campaignStatus: statusCycle[(i + advIndex) % statusCycle.length],
                offersMapping: withOffers ? 'mapped' : 'unmapped',
                offerCounts,
                isFollowed: adv.followedByDefault,
            });
        });
    });
    return rows;
};
const mappedCampaigns = [
    ...baseMappedCampaigns,
    ..._shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_2__.DEMO_ADVERTISERS.flatMap((adv, i) => generateMappedFor(adv, i, baseMappedCampaigns)),
];
const platformOptions = Array.from(new Set(mappedCampaigns.map(c => c.platform))).map(p => ({ label: (0,_unmappedCampaigns__WEBPACK_IMPORTED_MODULE_0__.platformLabel)(p), value: p }));
const reportingPlatformOptions = Array.from(new Set(mappedCampaigns.map(c => c.reportingPlatform)))
    .filter(rp => rp !== '—')
    .map(rp => ({ label: rp, value: rp }));
const advertiserOptions = Array.from(new Map(mappedCampaigns.map(c => [c.advertiserBid, { label: `${c.advertiserName} (${c.advertiserBid})`, value: c.advertiserBid }])).values());
const tacticOptions = Array.from(new Set(mappedCampaigns.map(c => c.tactic))).map(t => ({ label: t, value: t }));
const languageOptions = Array.from(new Set(mappedCampaigns.map(c => c.language))).map(l => ({ label: l, value: l }));
const subTypeOptions = Array.from(new Set(mappedCampaigns.map(c => c.subType))).map(st => ({ label: st, value: st }));
const campaignStatusOptions = [
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Live', value: 'live' },
    { label: 'Pause', value: 'pause' },
    { label: 'Complete', value: 'complete' },
    { label: 'Unknown', value: 'unknown' },
];
const statusOptions = [
    { label: 'Pending', value: 'grey' },
    { label: 'Confirmed', value: 'green' },
    { label: 'Needs attention', value: 'red' },
];
// Deterministic sample VALUES for the optional Custom 1/2/3 columns (All Campaigns view).
// These are the campaign's own values entered under the advertiser's labels — NOT the labels.
// e.g. the advertiser's Custom 1 label might be "Market" and a campaign's Custom 1 value is "US".
const CUSTOM1_SAMPLES = ['US', 'UK', 'DACH', 'APAC', 'Nordics', ''];
const CUSTOM2_SAMPLES = ['Awareness', 'Conversion', '0-30 days', 'Flagship', 'Retargeting', ''];
const CUSTOM3_SAMPLES = ['FY26', 'FY25', 'Leisure', 'Corporate', 'Promo', ''];
function mappedAsUnmappedRows() {
    return mappedCampaigns.map((c, i) => ({
        id: `mapped-${c.id}`,
        platform: c.platform,
        advertiserName: c.advertiserName,
        advertiserBid: c.advertiserBid,
        externalAdvertiserName: c.advertiserName,
        externalAdvertiserId: c.advertiserBid,
        externalCampaignName: c.campaignName,
        externalCampaignId: c.id,
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: c.offersMapping,
        isFollowed: c.isFollowed,
        expandable: false,
        // Optional detail columns (varied combinations so the column customizer has data to show).
        tactic: c.tactic,
        subType: c.subType,
        language: c.language,
        reportingPlatform: c.reportingPlatform,
        custom1: c.custom1 ?? CUSTOM1_SAMPLES[i % CUSTOM1_SAMPLES.length],
        custom2: c.custom2 ?? CUSTOM2_SAMPLES[i % CUSTOM2_SAMPLES.length],
        custom3: c.custom3 ?? CUSTOM3_SAMPLES[i % CUSTOM3_SAMPLES.length],
        opportunityId: `OPP-${100000 + (i * 37) % 900000}`,
        // Ship_To is usually the mapped advertiser.
        shipTo: c.advertiserName,
        // Only live/pause/unknown exist in the real data; normalize anything else to 'unknown'.
        campaignStatus: c.campaignStatus === 'live' ? 'live' : c.campaignStatus === 'pause' ? 'pause' : 'unknown',
    }));
}


/***/ },

/***/ "./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts"
/*!******************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/CampaignMapping/mockData/unmappedCampaigns.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DERBY_PLATFORMS: () => (/* binding */ DERBY_PLATFORMS),
/* harmony export */   FOLLOWED_BPIDS: () => (/* binding */ FOLLOWED_BPIDS),
/* harmony export */   OFFERS_UNSUPPORTED_PLATFORMS: () => (/* binding */ OFFERS_UNSUPPORTED_PLATFORMS),
/* harmony export */   WIHP_PLATFORMS: () => (/* binding */ WIHP_PLATFORMS),
/* harmony export */   advertiserNameForBpid: () => (/* binding */ advertiserNameForBpid),
/* harmony export */   advertiserOptions: () => (/* binding */ advertiserOptions),
/* harmony export */   availableToMapCampaignIds: () => (/* binding */ availableToMapCampaignIds),
/* harmony export */   bpidSelectOptions: () => (/* binding */ bpidSelectOptions),
/* harmony export */   campaignStatusOf: () => (/* binding */ campaignStatusOf),
/* harmony export */   derbyCampaignOptions: () => (/* binding */ derbyCampaignOptions),
/* harmony export */   derbyTacticOptions: () => (/* binding */ derbyTacticOptions),
/* harmony export */   externalAdvertiserOptions: () => (/* binding */ externalAdvertiserOptions),
/* harmony export */   externalAdvertiserSelectOptions: () => (/* binding */ externalAdvertiserSelectOptions),
/* harmony export */   externalCampaignOptions: () => (/* binding */ externalCampaignOptions),
/* harmony export */   hasAdSetChildren: () => (/* binding */ hasAdSetChildren),
/* harmony export */   isFollowedBpid: () => (/* binding */ isFollowedBpid),
/* harmony export */   isMultipleAdvertisers: () => (/* binding */ isMultipleAdvertisers),
/* harmony export */   languageOptions: () => (/* binding */ languageOptions),
/* harmony export */   mappingStateOptions: () => (/* binding */ mappingStateOptions),
/* harmony export */   mappingUnitName: () => (/* binding */ mappingUnitName),
/* harmony export */   obaMappingOf: () => (/* binding */ obaMappingOf),
/* harmony export */   platformLabel: () => (/* binding */ platformLabel),
/* harmony export */   platformOptions: () => (/* binding */ platformOptions),
/* harmony export */   platformSupportsOffers: () => (/* binding */ platformSupportsOffers),
/* harmony export */   reportingPlatformForPlatform: () => (/* binding */ reportingPlatformForPlatform),
/* harmony export */   rollupMapping: () => (/* binding */ rollupMapping),
/* harmony export */   rowIsFollowed: () => (/* binding */ rowIsFollowed),
/* harmony export */   subTypeOptions: () => (/* binding */ subTypeOptions),
/* harmony export */   tacticOptions: () => (/* binding */ tacticOptions),
/* harmony export */   unmappedCampaigns: () => (/* binding */ unmappedCampaigns),
/* harmony export */   wihpCampaignNameOptions: () => (/* binding */ wihpCampaignNameOptions),
/* harmony export */   wihpFakeCampaignOptions: () => (/* binding */ wihpFakeCampaignOptions)
/* harmony export */ });
/* harmony import */ var _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/londonerHotel */ "./apps/mediahub-ui/shared/londonerHotel.ts");
/* harmony import */ var _shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/londonerFollowStore */ "./apps/mediahub-ui/shared/londonerFollowStore.ts");
/* harmony import */ var _components_CampaignFlow_londonerMaxCampaigns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/CampaignFlow/londonerMaxCampaigns */ "./apps/mediahub-ui/components/CampaignFlow/londonerMaxCampaigns.ts");
/* harmony import */ var _shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/demoAdvertisers */ "./apps/mediahub-ui/shared/demoAdvertisers.ts");
// Mock data for the Campaign Mapping prototype — Unmapped Campaigns list.
// Modelled to match the Figma "Unmapped Campaigns" frame: one Platform value per row,
// and four per-type mapping-status columns rendered as status icons (check / x-circle):
//   Advertiser Mapping, Campaign Mapping, Invoice Mapping, Offers Mapping.
// KPI columns (Impressions / Clicks / Cost) are intentionally omitted for this prototype.
//
// Source CSV reference (structure): Date, Source, Platform, Vendor_account_name,
// Vendor_account_id, Entity_name, Entity_id, ... — the Platform column here is the
// external channel shown in the design (DV360, Google Ads, Facebook, Bing, DerbySoft, WIHP).
//
// This is a curated, hand-authored subset (not the full ~15k-row export).




// BPIDs the current user "follows". Mapping an advertiser to one of these makes the row
// show in BOTH My Campaigns and All Campaigns; any other mapped advertiser shows in All only.
const FOLLOWED_BPIDS = new Set(['BP-64517', 'BP-64518', 'BP-2850', 'BP-51546']);
function isFollowedBpid(bpid) {
    // The Londoner follow state is user-controlled (Advertisers page) and persisted, not static.
    if (bpid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid)
        return (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_1__.isLondonerFollowed)();
    // Demo advertisers follow the persisted state (overrides the static set below).
    if (bpid && (0,_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.getDemoAdvertiserByBpid)(bpid))
        return (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_1__.isDemoFollowed)(bpid);
    return !!bpid && FOLLOWED_BPIDS.has(bpid);
}
/** Row-level "followed" for the My scopes: the Londoner follows the live follow state, any other row
 *  keeps its static flag. */
function rowIsFollowed(c) {
    if (c.advertiserBid === _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid)
        return (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_1__.isLondonerFollowed)();
    if ((0,_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.getDemoAdvertiserByBpid)(c.advertiserBid))
        return (0,_shared_londonerFollowStore__WEBPACK_IMPORTED_MODULE_1__.isDemoFollowed)(c.advertiserBid);
    return c.isFollowed;
}
/** True when the external advertiser maps to more than one ATAP advertiser (many:many). */
function isMultipleAdvertisers(c) {
    return !!c.candidateBpids && c.candidateBpids.length > 1;
}
/** Resolve a row's OBA mapping status. Uses the explicit value when set; otherwise derives a
 *  deterministic mapped/unmapped from the row id so the prototype shows varied data. */
function obaMappingOf(c) {
    if (c.obaMapping)
        return c.obaMapping;
    // Deterministic hash of the id -> ~55% mapped / 45% unmapped spread.
    let h = 0;
    for (let i = 0; i < c.id.length; i++)
        h = (h * 31 + c.id.charCodeAt(i)) >>> 0;
    return h % 100 < 55 ? 'mapped' : 'unmapped';
}
/** Resolve a row's campaign (platform run) status. Only live/pause/unknown exist; default unknown. */
function campaignStatusOf(c) {
    return c.campaignStatus ?? 'unknown';
}
/** True when a row is a Facebook campaign-level parent with Ad Set children. */
function hasAdSetChildren(c) {
    return !!c.children && c.children.length > 0;
}
/** Roll up a mapping dimension from a parent's Ad Set children: 'mapped' only if ALL children are
 *  mapped; 'unmapped' if ANY child is unmapped. Used for Advertiser/Campaign/Offers/Invoice on
 *  Facebook campaign parents. */
function rollupMapping(parent, key) {
    const kids = parent.children ?? [];
    if (kids.length === 0)
        return parent[key];
    return kids.every(k => k[key] === 'mapped') ? 'mapped' : 'unmapped';
}
const baseUnmappedCampaigns = [
    // --- Facebook (Meta) two-level hierarchy: Campaign parent + Ad Set children. ---
    // Campaign/Advertiser/Offers/Invoice roll up from the Ad Sets; OBA is at the campaign (parent).
    {
        id: 'um-fb-100',
        platform: 'Meta',
        advertiserName: 'Mulia Resort',
        advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
        externalAdvertiserId: '786300985049481',
        externalCampaignName: 'FB Social Prospecting Q2',
        externalCampaignId: 'FB-CMP-5501',
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: 'mapped',
        obaMapping: 'mapped',
        isFollowed: true,
        expandable: true,
        rowLevel: 'campaign',
        children: [
            {
                id: 'um-fb-100-a1', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
                externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
                externalCampaignName: 'AdSet · Lookalike 1%', externalCampaignId: 'FB-AS-8801',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-100-a2', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
                externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
                externalCampaignName: 'AdSet · Interest Travel', externalCampaignId: 'FB-AS-8802',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-100-a3', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
                externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
                externalCampaignName: 'AdSet · Retargeting 30d', externalCampaignId: 'FB-AS-8803',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-100-a4', platform: 'Meta', advertiserName: 'Mulia Resort', advertiserBid: 'BP-64517',
                externalAdvertiserName: 'Mulia Resort Nusa Dua Bali', externalAdvertiserId: '786300985049481',
                externalCampaignName: 'AdSet · Broad AU', externalCampaignId: 'FB-AS-8804',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
        ],
    },
    {
        id: 'um-fb-200',
        platform: 'Meta',
        advertiserName: 'El Palace Barcelona',
        advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona',
        externalAdvertiserId: '178390022',
        externalCampaignName: 'FB Awareness ES',
        externalCampaignId: 'FB-CMP-5502',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        obaMapping: 'unmapped',
        isFollowed: true,
        expandable: true,
        rowLevel: 'campaign',
        children: [
            {
                id: 'um-fb-200-a1', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
                externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
                externalCampaignName: 'AdSet · Broad ES', externalCampaignId: 'FB-AS-8901',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-200-a2', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
                externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
                externalCampaignName: 'AdSet · Retargeting ES', externalCampaignId: 'FB-AS-8902',
                advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'unmapped', offersMapping: 'unmapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-200-a3', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
                externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
                externalCampaignName: 'AdSet · Lookalike ES', externalCampaignId: 'FB-AS-8903',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'unmapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-200-a4', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
                externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
                externalCampaignName: 'AdSet · Interest Luxury', externalCampaignId: 'FB-AS-8904',
                advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'unmapped', offersMapping: 'unmapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-200-a5', platform: 'Meta', advertiserName: 'El Palace Barcelona', advertiserBid: 'BP-2850',
                externalAdvertiserName: 'El Palace Barcelona', externalAdvertiserId: '178390022',
                externalCampaignName: 'AdSet · Broad FR', externalCampaignId: 'FB-AS-8905',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
        ],
    },
    {
        id: 'um-fb-300',
        platform: 'Meta',
        advertiserName: 'Trump International Hotel Las Vegas',
        advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump International Hotel Las Vegas',
        externalAdvertiserId: '51546',
        externalCampaignName: 'FB Conversions US',
        externalCampaignId: 'FB-CMP-5503',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'mapped',
        offersMapping: 'unmapped',
        obaMapping: 'mapped',
        isFollowed: true,
        expandable: true,
        rowLevel: 'campaign',
        children: [
            {
                id: 'um-fb-300-a1', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
                externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
                externalCampaignName: 'AdSet · Purchase Lookalike', externalCampaignId: 'FB-AS-9001',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-300-a2', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
                externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
                externalCampaignName: 'AdSet · Cart Abandoners', externalCampaignId: 'FB-AS-9002',
                advertiserMapping: 'mapped', campaignMapping: 'unmapped', invoiceMapping: 'mapped', offersMapping: 'unmapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-300-a3', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
                externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
                externalCampaignName: 'AdSet · Interest Luxury Travel', externalCampaignId: 'FB-AS-9003',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
            {
                id: 'um-fb-300-a4', platform: 'Meta', advertiserName: 'Trump International Hotel Las Vegas', advertiserBid: 'BP-51546',
                externalAdvertiserName: 'Trump International Hotel Las Vegas', externalAdvertiserId: '51546',
                externalCampaignName: 'AdSet · Broad US', externalCampaignId: 'FB-AS-9004',
                advertiserMapping: 'mapped', campaignMapping: 'mapped', invoiceMapping: 'mapped', offersMapping: 'mapped',
                isFollowed: true, expandable: false, rowLevel: 'adset',
            },
        ],
    },
    {
        id: 'um-0201',
        platform: 'CM360',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'Hyatt Regency (shared account)',
        externalAdvertiserId: '550101',
        externalCampaignName: 'Display Prospecting',
        externalCampaignId: 'DV-90001',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
        candidateBpids: ['BP-64517', 'BP-2850', 'BP-99021'],
    },
    {
        id: 'um-0001',
        platform: 'CM360',
        advertiserName: 'Mulia Resort',
        advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
        externalAdvertiserId: '442241',
        externalCampaignName: 'Display Prospecting Q2',
        externalCampaignId: 'DV-88021',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-0002',
        platform: 'SA360',
        advertiserName: 'Mulia Resort',
        advertiserBid: 'BP-64517',
        externalAdvertiserName: 'Mulia Resort Nusa Dua Bali',
        externalAdvertiserId: '442241',
        externalCampaignName: 'Brand - Exact',
        externalCampaignId: 'GA-33110',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-0003',
        platform: 'Meta',
        advertiserName: 'El Palace Barcelona',
        advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona',
        externalAdvertiserId: '178390022',
        externalCampaignName: 'Retargeting - Spring',
        externalCampaignId: 'FB-55012',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: true,
    },
    {
        id: 'um-0004',
        platform: 'WIHP',
        advertiserName: 'El Palace Barcelona',
        advertiserBid: 'BP-2850',
        externalAdvertiserName: 'El Palace Barcelona',
        externalAdvertiserId: 'wihp-5521',
        externalCampaignName: '-',
        externalCampaignId: '-',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-0005',
        platform: 'DerbySoft',
        advertiserName: 'Trump International Hotel Las Vegas',
        advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump Intl Hotel Las Vegas',
        externalAdvertiserId: '51546',
        externalCampaignName: 'Tripadvisor Meta',
        externalCampaignId: 'DS-77190',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-0006',
        platform: 'Meta',
        advertiserName: 'Copthorne Hotel Auckland HarbourCity',
        advertiserBid: 'BP-33011',
        externalAdvertiserName: 'Copthorne Hotel Auckland HarbourCity',
        externalAdvertiserId: '178322115',
        externalCampaignName: 'Business Listings',
        externalCampaignId: 'FB-55088',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: true,
    },
    {
        id: 'um-0007',
        platform: 'SA360',
        advertiserName: 'Millennium Hotel Queenstown',
        advertiserBid: 'BP-33012',
        externalAdvertiserName: 'Millennium Hotel Queenstown',
        externalAdvertiserId: '178322116',
        externalCampaignName: 'Non-Brand - Generic',
        externalCampaignId: 'GA-33220',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0008',
        platform: 'SA360',
        advertiserName: 'Copthorne Hotel Wellington Oriental Bay',
        advertiserBid: 'BP-33015',
        externalAdvertiserName: 'Copthorne Hotel Wellington Oriental Bay',
        externalAdvertiserId: 'sa-900113',
        externalCampaignName: 'Non-Brand - Luxury',
        externalCampaignId: 'BN-41002',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0009',
        platform: 'WIHP',
        advertiserName: 'Oregon Garden Resort',
        advertiserBid: 'BP-78630',
        externalAdvertiserName: 'Oregon Garden Resort',
        externalAdvertiserId: 'wihp-5522',
        externalCampaignName: '-',
        externalCampaignId: '-',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0010',
        platform: 'CM360',
        advertiserName: 'Mulia Villa - Nusa Dua, Bali',
        advertiserBid: 'BP-64518',
        externalAdvertiserName: 'Mulia Villa - Nusa Dua, Bali',
        externalAdvertiserId: '442242',
        externalCampaignName: 'Display Remarketing',
        externalCampaignId: 'DV-88110',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-0011',
        platform: 'DerbySoft',
        advertiserName: 'Millennium Hotel Rotorua',
        advertiserBid: 'BP-33016',
        externalAdvertiserName: 'Millennium Hotel Rotorua',
        externalAdvertiserId: '442350',
        externalCampaignName: 'Tripadvisor Meta',
        externalCampaignId: 'DS-77220',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0012',
        platform: 'SA360',
        advertiserName: 'Trump International Hotel Las Vegas',
        advertiserBid: 'BP-51546',
        externalAdvertiserName: 'Trump Intl Hotel Las Vegas',
        externalAdvertiserId: 'sa-900301',
        externalCampaignName: 'Brand - Exact',
        externalCampaignId: 'GA-33330',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: true,
    },
    // ---- Step-1-done, campaign mapping pending, for a real backend advertiser (11 Howard,
    // ---- BP-9074305). advertiserMapping = 'mapped' so these surface on that advertiser's
    // ---- Campaigns tab as still-to-map rows (external advertiser already mapped to this BPID).
    {
        id: 'um-h001',
        platform: 'SA360',
        advertiserName: '11 Howard New York a Member of Design Hotels',
        advertiserBid: 'BP-9074305',
        externalAdvertiserName: '11 Howard NY (Design Hotels)',
        externalAdvertiserId: '774411',
        externalCampaignName: 'Brand - Exact',
        externalCampaignId: 'SA-11001',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-h002',
        platform: 'Meta',
        advertiserName: '11 Howard New York a Member of Design Hotels',
        advertiserBid: 'BP-9074305',
        externalAdvertiserName: '11 Howard NY (Design Hotels)',
        externalAdvertiserId: '774411',
        externalCampaignName: 'Prospecting - Summer',
        externalCampaignId: 'FB-11002',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: true,
        expandable: false,
    },
    // ---- Multiple-advertiser rows (external advertiser mapped to MANY ATAP advertisers) ----
    // Advertiser Mapping is GREEN (it IS mapped), but to several ATAP advertisers, so the table
    // shows 'Multiple Advertisers'. Campaign mapping requires picking one candidate first.
    {
        id: 'um-0202',
        platform: 'DerbySoft',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'Marriott Group (shared account)',
        externalAdvertiserId: '550102',
        externalCampaignName: 'Tripadvisor Meta',
        externalCampaignId: 'DS-90002',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
        candidateBpids: ['BP-51546', 'BP-99022'],
    },
    // ---- Unmapped-advertiser rows (Advertiser Mapping = unmapped) ----
    // No ATAP advertiser yet; these populate the "Unmapped Advertisers" scope. Mapping one
    // (Advertiser Mapping drawer) assigns an advertiser and moves the row into My/All.
    {
        id: 'um-0101',
        platform: 'SA360',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'Hilton Garden Inn Austin',
        externalAdvertiserId: '990221',
        externalCampaignName: 'Brand - Exact',
        externalCampaignId: 'SA-77010',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0102',
        platform: 'Meta',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'The Langham Chicago',
        externalAdvertiserId: '990222',
        externalCampaignName: 'Prospecting - Summer',
        externalCampaignId: 'FB-77011',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0103',
        platform: 'CM360',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'Fairmont Banff Springs',
        externalAdvertiserId: '990223',
        externalCampaignName: 'Display Remarketing',
        externalCampaignId: 'DV-77012',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    {
        id: 'um-0104',
        platform: 'CM360',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'Ace Hotel New York',
        externalAdvertiserId: '990224',
        externalCampaignName: 'Display Prospecting',
        externalCampaignId: 'CM-77013',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        isFollowed: false,
        expandable: false,
    },
    // ---- The Londoner Hotel (BP-910077) demo rows — ids/names from shared/londonerHotel.ts ----
    {
        id: 'um-ln001',
        platform: 'SA360',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].id,
        maxCampaign: { platformId: 'google-ads', tactic: 'Brand' },
        externalCampaignName: (0,_components_CampaignFlow_londonerMaxCampaigns__WEBPACK_IMPORTED_MODULE_2__.maxCampaignName)({ platformId: 'google-ads', tactic: 'Brand' }),
        externalCampaignId: 'GA-LN-1001',
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: 'mapped',
        obaMapping: 'mapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln002',
        platform: 'SA360',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].id,
        maxCampaign: { platformId: 'google-ads', tactic: 'Generic' },
        externalCampaignName: (0,_components_CampaignFlow_londonerMaxCampaigns__WEBPACK_IMPORTED_MODULE_2__.maxCampaignName)({ platformId: 'google-ads', tactic: 'Generic' }),
        externalCampaignId: 'GA-LN-1002',
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: 'mapped',
        obaMapping: 'mapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln003',
        platform: 'Amadeus DSP',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].id,
        maxCampaign: { platformId: 'amadeus-dsp', tactic: 'Prospecting' },
        externalCampaignName: (0,_components_CampaignFlow_londonerMaxCampaigns__WEBPACK_IMPORTED_MODULE_2__.maxCampaignName)({ platformId: 'amadeus-dsp', tactic: 'Prospecting' }),
        externalCampaignId: 'DSP-LN-2001',
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: 'mapped',
        obaMapping: 'mapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln004',
        platform: 'Amadeus DSP',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].id,
        maxCampaign: { platformId: 'amadeus-dsp', tactic: 'Remarketing' },
        externalCampaignName: (0,_components_CampaignFlow_londonerMaxCampaigns__WEBPACK_IMPORTED_MODULE_2__.maxCampaignName)({ platformId: 'amadeus-dsp', tactic: 'Remarketing' }),
        externalCampaignId: 'DSP-LN-2002',
        advertiserMapping: 'mapped',
        campaignMapping: 'mapped',
        invoiceMapping: 'mapped',
        offersMapping: 'mapped',
        obaMapping: 'mapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln005',
        platform: 'DV360',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].id,
        externalCampaignName: 'YouTube Video - Afternoon Tea',
        externalCampaignId: 'DV-LN-3001',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        obaMapping: 'mapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln006',
        platform: 'DV360',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].id,
        externalCampaignName: 'YouTube Skippable In-Stream - Brand',
        externalCampaignId: 'DV-LN-3002',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'mapped',
        offersMapping: 'unmapped',
        obaMapping: 'mapped',
        campaignStatus: 'unknown',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln007',
        platform: 'DerbySoft',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DerbySoft'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DerbySoft'].id,
        externalCampaignName: 'Tripadvisor Meta - London Stays',
        externalCampaignId: 'DS-LN-4001',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        obaMapping: 'unmapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln008',
        platform: 'WIHP',
        advertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.name,
        advertiserBid: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid,
        externalAdvertiserName: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['WIHP'].name,
        externalAdvertiserId: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['WIHP'].id,
        externalCampaignName: 'WIHP Meta - Trivago',
        externalCampaignId: 'WIHP-LN-5001',
        advertiserMapping: 'mapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        obaMapping: 'unmapped',
        campaignStatus: 'pause',
        isFollowed: true,
        expandable: false,
    },
    {
        id: 'um-ln009',
        platform: 'SA360',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS.SA360.name} - Legacy`,
        externalAdvertiserId: '8100781',
        externalCampaignName: 'Brand - Legacy Exact',
        externalCampaignId: 'GA-LN-1901',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
    },
    // Multiple advertisers: the Amadeus DSP seat is shared across several ATAP advertisers.
    {
        id: 'um-ln010',
        platform: 'Amadeus DSP',
        advertiserName: '',
        advertiserBid: '',
        externalAdvertiserName: 'London Hotels Group (shared DSP seat)',
        externalAdvertiserId: '8100792',
        externalCampaignName: 'Display Always-on - London',
        externalCampaignId: 'DSP-LN-2901',
        advertiserMapping: 'unmapped',
        campaignMapping: 'unmapped',
        invoiceMapping: 'unmapped',
        offersMapping: 'unmapped',
        campaignStatus: 'live',
        isFollowed: true,
        expandable: false,
        candidateBpids: [_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid, 'BP-99021'],
    },
];
const umSlotsFor = (adv) => {
    const channels = (0,_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.activeChannels)(adv);
    const slots = [
        { platform: 'SA360', name: 'Brand - Exact', id: 'GA' },
        { platform: 'Amadeus DSP', name: 'Display Prospecting', id: 'DSP' },
        ...(channels.includes('video') ? [{ platform: 'DV360', name: 'YouTube Video - Brand', id: 'DV' }] : []),
        { platform: 'DerbySoft', name: 'Tripadvisor Meta', id: 'DS' },
        { platform: 'SA360', name: 'PMax - Suites & Spa', id: 'GA' },
        { platform: 'Amadeus DSP', name: 'Display Remarketing', id: 'DSP' },
        { platform: 'WIHP', name: 'WIHP Meta - Trivago', id: 'WIHP' },
    ];
    return slots;
};
const generateUnmappedFor = (adv, advIndex, existing) => {
    const covered = (platform) => existing.filter(c => c.advertiserBid === adv.bpid && c.platform === platform).length >= 2;
    const want = adv.totalBudget >= 400000 ? 5 : 4;
    const slots = umSlotsFor(adv).filter(s => !covered(s.platform)).slice(0, want);
    const statuses = adv.obaStatus === 'Live' ? ['live', 'live', 'pause', 'live', 'unknown'] : ['live', 'unknown', 'pause', 'live', 'unknown'];
    const pick = (i) => ((i + advIndex) % 3 === 0 ? 'mapped' : 'unmapped');
    return slots.map((slot, i) => {
        const ext = adv.externalAdvertisers[slot.platform];
        const meta = slot.platform === 'WIHP' || slot.platform === 'DerbySoft'; // metasearch: not in OBA
        return {
            id: `um-${adv.key}-${String(i + 1).padStart(3, '0')}`,
            platform: slot.platform,
            advertiserName: adv.name,
            advertiserBid: adv.bpid,
            externalAdvertiserName: ext.name,
            externalAdvertiserId: ext.id,
            externalCampaignName: slot.name,
            externalCampaignId: `${slot.id}-${adv.key.toUpperCase()}-${1001 + i}`,
            advertiserMapping: 'mapped',
            campaignMapping: 'unmapped',
            invoiceMapping: pick(i + 1),
            offersMapping: 'unmapped',
            obaMapping: meta ? 'unmapped' : pick(i),
            campaignStatus: statuses[(i + advIndex) % statuses.length],
            isFollowed: adv.followedByDefault,
            expandable: false,
        };
    });
};
const unmappedCampaigns = [
    ...baseUnmappedCampaigns,
    ..._shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.DEMO_ADVERTISERS.flatMap((adv, i) => generateUnmappedFor(adv, i, baseUnmappedCampaigns)),
];
/** User-facing display label for a platform value. The stored/internal value stays as-is (used as
 *  a logic key, e.g. 'Meta'); only the label shown to users differs — e.g. Meta -> 'Meta (Facebook)'. */
function platformLabel(platform) {
    if (!platform)
        return '';
    if (platform === 'Meta')
        return 'Meta (Facebook)';
    return platform;
}
/** Distinct platforms present in the mock data (for the Platform filter). */
const platformOptions = Array.from(new Set(unmappedCampaigns.map(c => c.platform))).map(p => ({
    label: platformLabel(p),
    value: p,
}));
/** Distinct mapped advertiser BPIDs (for the Advertiser (BPID) filter) — blanks excluded. */
const advertiserOptions = Array.from(new Map(unmappedCampaigns
    .filter(c => c.advertiserBid && c.advertiserName)
    .map(c => [c.advertiserBid, { label: `${c.advertiserName} (${c.advertiserBid})`, value: c.advertiserBid }])).values());
/** Distinct external advertisers (for the External Advertiser Name (ID) filter). */
const externalAdvertiserOptions = Array.from(new Map(unmappedCampaigns.map(c => [
    c.externalAdvertiserId,
    { label: `${c.externalAdvertiserName} (${c.externalAdvertiserId})`, value: c.externalAdvertiserId },
])).values());
/** Distinct external campaigns (for the External Campaign Name (ID) filter). */
const externalCampaignOptions = Array.from(new Map(unmappedCampaigns
    .filter(c => c.externalCampaignId !== '-')
    .map(c => [
    c.externalCampaignId,
    { label: `${c.externalCampaignName} (${c.externalCampaignId})`, value: c.externalCampaignId },
])).values());
/** Mapping-state filter options (shared by the three/four mapping filters). */
const mappingStateOptions = [
    { label: 'Mapped', value: 'mapped' },
    { label: 'Unmapped', value: 'unmapped' },
];
// ---- Mapping-drawer option lists (prototype stubs) ----
/**
 * Advertiser (BPID) catalog shown in the mapping drawer's Advertiser (BPID) select.
 * Deliberately includes both FOLLOWED (BP-64517/64518/2850/51546) and NON-followed BPIDs so the
 * "map an unmapped advertiser" flow can demonstrate: mapping to a followed advertiser -> row shows
 * in My + All; mapping to a non-followed advertiser -> row shows in All only.
 */
const bpidSelectOptions = [
    { label: 'Mulia Resort (BP-64517)', value: 'BP-64517' },
    { label: 'Mulia Villa - Nusa Dua, Bali (BP-64518)', value: 'BP-64518' },
    { label: 'El Palace Barcelona (BP-2850)', value: 'BP-2850' },
    { label: 'Trump International Hotel Las Vegas (BP-51546)', value: 'BP-51546' },
    { label: 'Hilton Garden Inn Austin (BP-99021)', value: 'BP-99021' },
    { label: 'The Langham Chicago (BP-99022)', value: 'BP-99022' },
    { label: 'Fairmont Banff Springs (BP-99023)', value: 'BP-99023' },
    { label: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.label, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER.bpid },
];
_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.DEMO_ADVERTISERS.forEach(adv => {
    if (!bpidSelectOptions.some(o => o.value === adv.bpid))
        bpidSelectOptions.push({ label: `${adv.name} (${adv.bpid})`, value: adv.bpid });
});
/** Lookup advertiser name by BPID from the drawer catalog. */
function advertiserNameForBpid(bpid) {
    if (!bpid)
        return '';
    const opt = bpidSelectOptions.find(o => o.value === bpid);
    if (!opt)
        return '';
    // label is "Name (BPID)" — strip the trailing " (BPID)".
    return opt.label.replace(/\s*\([^)]*\)\s*$/, '');
}
const tacticOptions = [
    { label: 'Metasearch', value: 'metasearch' },
    { label: 'Paid Search', value: 'paid-search' },
    { label: 'Display', value: 'display' },
    { label: 'Video', value: 'video' },
    { label: 'Social', value: 'social' },
    { label: 'Retargeting', value: 'retargeting' },
];
/** DerbySoft Tactic options — backend-supplied (Req 6, revised): NOT hard-coded to one value. */
const derbyTacticOptions = [
    { label: 'Revenue Tracking', value: 'Revenue Tracking' },
    { label: 'Metasearch', value: 'Metasearch' },
    { label: 'CPC', value: 'CPC' },
];
const subTypeOptions = [
    { label: 'Brand', value: 'brand' },
    { label: 'Non-Brand', value: 'non-brand' },
    { label: 'Prospecting', value: 'prospecting' },
    { label: 'Remarketing', value: 'remarketing' },
    { label: 'Core', value: 'core' },
];
const languageOptions = [
    { label: 'English (EN)', value: 'EN' },
    { label: 'French (FR)', value: 'FR' },
    { label: 'German (DE)', value: 'DE' },
    { label: 'Spanish (ES)', value: 'ES' },
    { label: 'Italian (IT)', value: 'IT' },
];
/** WIHP fake-campaign options (BID + Delivery Channel + Tactic); Tactic is embedded in the name. */
const wihpFakeCampaignOptions = [
    { label: 'BP-2850 · Google · Metasearch', value: 'wihp-fc-1', tactic: 'Metasearch' },
    { label: 'BP-2850 · Trivago · Metasearch', value: 'wihp-fc-2', tactic: 'Metasearch' },
    { label: 'BP-2850 · Skyscanner · Revenue Tracking', value: 'wihp-fc-3', tactic: 'Revenue Tracking' },
];
/** DerbySoft campaign options (the mapping unit). */
const derbyCampaignOptions = [
    { label: 'DerbySoft - Google Hotel Ads', value: 'ds-ghc' },
    { label: 'DerbySoft - Tripadvisor Meta', value: 'ds-ta' },
    { label: 'DerbySoft - Trivago Sponsored', value: 'ds-trv' },
];
/** WIHP campaign-name select options (prototype stub). */
const wihpCampaignNameOptions = [
    { label: 'WIHP Meta - Google', value: 'wihp-meta-google' },
    { label: 'WIHP Meta - Trivago', value: 'wihp-meta-trivago' },
    { label: 'WIHP Meta - Skyscanner', value: 'wihp-meta-skyscanner' },
];
/**
 * DWI-derived Reporting Platform (read-only). Auto-populated from the selected platform; the real
 * system derives it from DWI. WIHP is out of scope for this field (Req 6.7) -> returns ''.
 */
function reportingPlatformForPlatform(platform) {
    switch (platform) {
        case 'SA360':
            return 'Google Ads';
        case 'Bing':
            return 'Bing Ads';
        case 'CM360':
            return 'DV360';
        case 'Meta':
            return 'Facebook';
        case 'DV360':
            return 'DV360';
        case 'Amadeus DSP':
            return 'Amadeus DSP';
        case 'Google Ads':
            return 'Google Ads';
        case 'DerbySoft':
            return 'Google Hotel Ads';
        case 'WIHP':
            return ''; // omitted for WIHP
        default:
            return '';
    }
}
/** The per-platform mapping-unit name (what a "campaign" is called on each platform). */
function mappingUnitName(platform) {
    switch (platform) {
        case 'CM360':
            return 'Placement';
        case 'Meta':
        case 'Facebook':
            return 'AdSet';
        // SA360, DerbySoft, WIHP, DV360, Amadeus DSP, Google Ads, Bing -> Campaign
        default:
            return 'Campaign';
    }
}
/** External advertisers available to map under a chosen platform/BPID (prototype stub). */
const externalAdvertiserSelectOptions = [
    { label: 'Mulia Resort Nusa Dua Bali (442241)', value: '442241' },
    { label: 'El Palace Barcelona (178390022)', value: '178390022' },
    { label: 'Trump Intl Hotel Las Vegas (51546)', value: '51546' },
    { label: 'Copthorne Hotel Auckland HarbourCity (178322115)', value: '178322115' },
    { label: 'Oregon Garden Resort (786300985049481)', value: '786300985049481' },
    { label: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].name} (${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].id})`, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['SA360'].id },
    { label: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].name} (${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].id})`, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['Amadeus DSP'].id },
    { label: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].name} (${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].id})`, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DV360'].id },
    { label: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DerbySoft'].name} (${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DerbySoft'].id})`, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['DerbySoft'].id },
    { label: `${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['WIHP'].name} (${_shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['WIHP'].id})`, value: _shared_londonerHotel__WEBPACK_IMPORTED_MODULE_0__.LONDONER_EXTERNAL_ADVERTISERS['WIHP'].id },
];
_shared_demoAdvertisers__WEBPACK_IMPORTED_MODULE_3__.DEMO_ADVERTISERS.forEach(adv => Object.values(adv.externalAdvertisers).forEach(ext => {
    if (!externalAdvertiserSelectOptions.some(o => o.value === ext.id)) {
        externalAdvertiserSelectOptions.push({ label: `${ext.name} (${ext.id})`, value: ext.id });
    }
}));
/** DWI "available-to-map" campaign IDs (prototype stub). Picking one of these -> Green on save. */
const availableToMapCampaignIds = [
    { label: 'CAMP-10021', value: 'CAMP-10021' },
    { label: 'CAMP-10022', value: 'CAMP-10022' },
    { label: 'CAMP-10023', value: 'CAMP-10023' },
    { label: 'CAMP-10024', value: 'CAMP-10024' },
];
/** Platforms WITHOUT offer mapping — the two metasearch platforms show a non-clickable grey X. */
const OFFERS_UNSUPPORTED_PLATFORMS = new Set(['WIHP', 'DerbySoft']);
/** Whether a platform supports offer mapping (everything except WIHP / DerbySoft). */
function platformSupportsOffers(platform) {
    return !OFFERS_UNSUPPORTED_PLATFORMS.has(platform);
}
/** Platforms that use the DerbySoft campaign-mapping variant (single Paid Search ID). */
const DERBY_PLATFORMS = ['DerbySoft'];
/** Platforms that use the WIHP campaign-mapping variant (campaign name + multiple Paid Search IDs). */
const WIHP_PLATFORMS = ['WIHP'];


/***/ }

}]);
//# sourceMappingURL=apps_mediahub-ui_pages_CampaignMapping_mockData_campaigns_ts.345a2a8d65c96e5bc7d6.js.map