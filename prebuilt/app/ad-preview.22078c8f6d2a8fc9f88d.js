"use strict";
(self["webpackChunkatap_demo"] = self["webpackChunkatap_demo"] || []).push([["ad-preview"],{

/***/ "./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.styled.ts"
/*!*************************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.styled.ts ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdBox: () => (/* binding */ AdBox),
/* harmony export */   AdLabel: () => (/* binding */ AdLabel),
/* harmony export */   AdSlot: () => (/* binding */ AdSlot),
/* harmony export */   AudioRow: () => (/* binding */ AudioRow),
/* harmony export */   Card: () => (/* binding */ Card),
/* harmony export */   CardGrid: () => (/* binding */ CardGrid),
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   Footer: () => (/* binding */ Footer),
/* harmony export */   Grid: () => (/* binding */ Grid),
/* harmony export */   LeadStory: () => (/* binding */ LeadStory),
/* harmony export */   Live: () => (/* binding */ Live),
/* harmony export */   Masthead: () => (/* binding */ Masthead),
/* harmony export */   MastheadInner: () => (/* binding */ MastheadInner),
/* harmony export */   MastheadLinks: () => (/* binding */ MastheadLinks),
/* harmony export */   Meta: () => (/* binding */ Meta),
/* harmony export */   MostRead: () => (/* binding */ MostRead),
/* harmony export */   Nav: () => (/* binding */ Nav),
/* harmony export */   Page: () => (/* binding */ Page),
/* harmony export */   PreviewBar: () => (/* binding */ PreviewBar),
/* harmony export */   Rail: () => (/* binding */ Rail),
/* harmony export */   SectionTitle: () => (/* binding */ SectionTitle),
/* harmony export */   Thumb: () => (/* binding */ Thumb),
/* harmony export */   Wordmark: () => (/* binding */ Wordmark)
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js");
/* harmony import */ var _amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amadeus/react-design-factory */ "./packages/react-design-factory/index.ts");


// A news-homepage mock (modelled on the layout of a large public broadcaster's front page) used to preview
// display ads in context. It is deliberately NOT styled as any real brand: neutral palette, generic wordmark.
const INK = '#141414';
const PAPER = '#f6f6f6';
const RULE = '#dcdcdc';
const ACCENT = '#b80000';
const PreviewBar = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
  background: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.sky_90};
  color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
  font-size: 13px;
  button {
    padding: 4px 12px;
    border: 1px solid ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
    border-radius: 4px;
    background: transparent;
    color: ${_amadeus_react_design_factory__WEBPACK_IMPORTED_MODULE_1__.colors.cloud_0};
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;
const Page = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  min-height: 100vh;
  background: ${PAPER};
  color: ${INK};
  font-family: Helvetica, Arial, sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const Masthead = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].header `
  background: ${INK};
  color: #fff;
`;
const MastheadInner = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
`;
const Wordmark = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  display: inline-flex;
  gap: 3px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  span {
    padding: 1px 8px;
    background: #fff;
    color: ${INK};
  }
`;
const MastheadLinks = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  gap: 20px;
  font-size: 14px;
`;
const Nav = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].nav `
  border-bottom: 1px solid ${RULE};
  background: #fff;
  ul {
    display: flex;
    gap: 4px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    overflow-x: auto;
    list-style: none;
  }
  li a {
    display: block;
    padding: 12px 12px;
    border-bottom: 3px solid transparent;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }
  li a[aria-current='page'] {
    border-bottom-color: ${ACCENT};
  }
`;
const Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].main `
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 48px;
`;
const AdSlot = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].aside `
  display: flex;
  flex-direction: column;
  align-items: ${({ $center }) => ($center ? 'center' : 'stretch')};
  gap: 4px;
  margin: 16px 0;
`;
const AdLabel = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  color: #6b6b6b;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
const AdBox = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  width: 100%;
  max-width: ${({ $width }) => $width}px;
  background: #fff;
  border: 1px solid ${RULE};
`;
const Grid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const SectionTitle = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].h2 `
  margin: 24px 0 12px;
  padding-top: 8px;
  border-top: 3px solid ${INK};
  font-size: 20px;
`;
const LeadStory = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].article `
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${RULE};
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
  h1 {
    margin: 0 0 8px;
    font-size: 32px;
    line-height: 1.15;
  }
  p {
    margin: 0 0 8px;
    color: #3d3d3d;
    line-height: 1.45;
  }
`;
const Thumb = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  aspect-ratio: ${({ $ratio }) => $ratio ?? '16 / 9'};
  background: linear-gradient(
    135deg,
    hsl(${({ $hue }) => $hue}, 35%, 38%),
    hsl(${({ $hue }) => ($hue + 40) % 360}, 40%, 62%)
  );
`;
const Meta = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  color: #6b6b6b;
  font-size: 12px;
`;
const Live = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].span `
  margin-right: 6px;
  padding: 1px 6px;
  background: ${ACCENT};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`;
const CardGrid = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 2}, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Card = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].article `
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${RULE};
  h3 {
    margin: 4px 0 0;
    font-size: 17px;
    line-height: 1.25;
  }
  p {
    margin: 0;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 1.4;
  }
`;
const AudioRow = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  strong {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.25;
  }
`;
const Rail = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div `
  display: flex;
  flex-direction: column;
`;
const MostRead = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].ol `
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: most;
  li {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${RULE};
    counter-increment: most;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }
  li::before {
    content: counter(most);
    color: ${ACCENT};
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }
`;
const Footer = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].footer `
  margin-top: 32px;
  padding: 24px 16px;
  background: ${INK};
  color: #c9c9c9;
  font-size: 13px;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;


/***/ },

/***/ "./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.tsx"
/*!*******************************************************************!*\
  !*** ./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.tsx ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _components_CampaignFlow_campaignFlowProfiles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CampaignFlow/campaignFlowProfiles */ "./apps/mediahub-ui/components/CampaignFlow/campaignFlowProfiles.ts");
/* harmony import */ var _components_CampaignCreationCanvas_CampaignAdPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CampaignCreationCanvas/CampaignAdPreview */ "./apps/mediahub-ui/components/CampaignCreationCanvas/CampaignAdPreview.tsx");
/* harmony import */ var _PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PublisherPreviewPage.styled */ "./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.styled.ts");
/* harmony import */ var _StoryImage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StoryImage */ "./apps/mediahub-ui/pages/AdPreview/StoryImage.tsx");





// A news-homepage mock for previewing The Londoner display banners in context.
// Headlines are original placeholders; branding is deliberately generic.
const NAV = ['Home', 'News', 'Sport', 'Business', 'Innovation', 'Culture', 'Arts', 'Travel', 'Earth', 'Video', 'Live'];
const img = (n) => `/Images/news-${String(n).padStart(2, '0')}.png`;
const TOP_STORIES = [
    {
        image: img(1),
        alt: 'Two men shake hands outdoors as onlookers watch',
        title: 'Leaders shake on deal after a busy week of talks',
        summary: 'Business and political figures gathered outdoors as the agreement was sealed.',
        hue: 210,
        meta: '2 hrs ago · Politics',
    },
    {
        image: img(3),
        alt: 'A woman looks on from a courtroom bench',
        title: 'Court hears final arguments in long-running case',
        summary: 'A verdict is expected later this week.',
        hue: 190,
        meta: '3 hrs ago · World',
    },
    {
        image: img(4),
        alt: 'Illustration of human and robot hands reaching for a red button',
        title: 'Who has their hand on the button? The debate over AI control',
        summary: 'Experts split over how much power machines should be given.',
        hue: 30,
        meta: '4 hrs ago · Technology',
    },
    {
        image: img(7),
        alt: 'Two bearded men talk in a hospital room',
        title: 'Hospital visit puts spotlight on recovery ahead of Games of the Unbroken 2026',
        summary: 'Patients describe the road back to sport after serious injury.',
        hue: 340,
        meta: '5 hrs ago · Health',
    },
];
const MORE_NEWS = [
    {
        image: img(8),
        alt: 'Stone huts on a rugged, rocky mountainside',
        title: 'Remote stone huts found on rugged hillside',
        summary: 'Walkers stumbled on the shelters high above the valley.',
        hue: 150,
        meta: '1 hr ago · Travel',
    },
    {
        image: img(9),
        alt: 'Aerial view of a long sandy beach and dunes at dusk',
        title: 'Winter calm settles over the dune coast',
        summary: 'Quiet beaches are drawing visitors out of season.',
        hue: 120,
        meta: '2 hrs ago · Earth',
    },
    {
        image: img(10),
        alt: 'Chambers carved from rock in an underground city',
        title: 'Underground city carved from rock opens new chambers',
        summary: 'Visitors can now explore passages closed for decades.',
        hue: 260,
        meta: '6 hrs ago · Culture',
    },
    {
        image: img(5),
        alt: 'Slices of toasted bread rings in a terracotta bowl',
        title: 'The humble twice-baked bread making a comeback',
        summary: 'Chefs are rediscovering a simple classic.',
        hue: 15,
        meta: '7 hrs ago · Food',
    },
    {
        image: img(6),
        alt: 'Armed men stand on a vehicle in mountainous terrain',
        title: 'Armed men gather in mountain region as tensions simmer',
        summary: 'Local officials call for calm.',
        hue: 300,
        meta: '8 hrs ago · World',
    },
    {
        image: img(2),
        alt: 'A man in a dinner suit aims a suppressed pistol from the shadows',
        title: 'First look at the new spy thriller',
        summary: 'A moody teaser hints at the film’s tone.',
        hue: 90,
        meta: '9 hrs ago · Culture',
    },
];
const AUDIO = [
    { title: 'Morning briefing', image: img(9) },
    { title: 'The Business Hour', image: img(1) },
    { title: 'Food Stories', image: img(5) },
    { title: 'Culture Club', image: img(10) },
    { title: 'Travel Talk', image: img(8) },
];
const MOST_READ = [
    'Leaders shake on deal after a busy week of talks',
    'Court hears final arguments in long-running case',
    'The debate over who controls AI',
    'Underground city opens new chambers',
    'The humble bread making a comeback',
];
const banner = (size) => _components_CampaignFlow_campaignFlowProfiles__WEBPACK_IMPORTED_MODULE_1__.LONDONER_BANNERS.find(item => item.size === size);
const Ad = ({ size, center }) => {
    const item = banner(size);
    if (!item)
        return null;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.AdSlot, { "$center": center, role: 'complementary', "aria-label": 'Advertisement', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.AdLabel, { children: "Advertisement" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.AdBox, { "$width": item.width, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CampaignCreationCanvas_CampaignAdPreview__WEBPACK_IMPORTED_MODULE_2__.ScaledBanner, { banner: item, interactive: true }) })] }));
};
const StoryCard = ({ story }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Card, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StoryImage__WEBPACK_IMPORTED_MODULE_4__.StoryImage, { src: story.image, alt: story.alt, hue: story.hue }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", { children: story.title }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: story.summary }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Meta, { children: story.meta })] }));
const PublisherPreviewPage = () => {
    const [lead, ...rest] = TOP_STORIES;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Page, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Masthead, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.MastheadInner, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Wordmark, { "aria-label": 'Daily News', children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "DAILY" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "NEWS" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.MastheadLinks, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Sign in" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Notifications" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Search" })] })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Nav, { "aria-label": 'Sections', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", { children: NAV.map((item, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", { href: '#', onClick: event => event.preventDefault(), "aria-current": index === 0 ? 'page' : undefined, children: item }) }, item))) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Container, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.AdSlot, { role: 'complementary', "aria-label": 'Advertisement', children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", { src: '/Images/top-ad.png', alt: 'Advertisement', style: { display: 'block', width: '100%', height: 'auto' } }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Grid, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.LeadStory, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", { children: lead.title }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: lead.summary }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Meta, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Live, { children: "LIVE" }), lead.meta] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StoryImage__WEBPACK_IMPORTED_MODULE_4__.StoryImage, { src: lead.image, alt: lead.alt, hue: lead.hue })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.CardGrid, { "$columns": 3, children: rest.map(story => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StoryCard, { story: story }, story.title))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.SectionTitle, { children: "Only from Daily News" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.CardGrid, { "$columns": 2, children: MORE_NEWS.slice(0, 2).map(story => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StoryCard, { story: story }, story.title))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.SectionTitle, { children: "More news" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.CardGrid, { "$columns": 3, children: MORE_NEWS.map(story => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StoryCard, { story: story }, story.title))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.SectionTitle, { children: "Recommended audio" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.AudioRow, { children: AUDIO.map((item, index) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StoryImage__WEBPACK_IMPORTED_MODULE_4__.StoryImage, { src: item.image, alt: '', hue: index * 60, ratio: '1 / 1' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { children: item.title })] }, item.title))) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Rail, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Ad, { size: '300x250' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.SectionTitle, { children: "Most read" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.MostRead, { children: MOST_READ.map(title => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", { children: title }, title))) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Ad, { size: '300x600' })] })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_3__.Footer, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Terms of use" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Privacy" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Cookies" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Contact" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: "Demo page for ad preview only" })] }) })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PublisherPreviewPage);


/***/ },

/***/ "./apps/mediahub-ui/pages/AdPreview/StoryImage.tsx"
/*!*********************************************************!*\
  !*** ./apps/mediahub-ui/pages/AdPreview/StoryImage.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoryImage: () => (/* binding */ StoryImage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PublisherPreviewPage.styled */ "./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.styled.ts");


// Story photo served from public/Images, cropped to the slot with object-fit: cover.
const StoryImage = ({ src, alt, hue = 210, ratio, }) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublisherPreviewPage_styled__WEBPACK_IMPORTED_MODULE_1__.Thumb, { "$hue": hue, "$ratio": ratio, style: { overflow: 'hidden' }, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", { src: src, alt: alt, loading: 'lazy', style: { display: 'block', width: '100%', height: '100%', objectFit: 'cover' } }) }));


/***/ },

/***/ "./apps/mediahub-ui/pages/AdPreview/index.ts"
/*!***************************************************!*\
  !*** ./apps/mediahub-ui/pages/AdPreview/index.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _PublisherPreviewPage__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PublisherPreviewPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PublisherPreviewPage */ "./apps/mediahub-ui/pages/AdPreview/PublisherPreviewPage.tsx");



/***/ }

}]);
//# sourceMappingURL=ad-preview.22078c8f6d2a8fc9f88d.js.map