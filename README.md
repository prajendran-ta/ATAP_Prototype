# ATAP demo

A standalone, front-end-only copy of the ATAP / MediaHub prototype that you can edit and run on its own.
There is **no backend and no login**: the app starts offline, signed in as a demo administrator, and shows
built-in demo data (The Londoner Hotel and 10 other demo advertisers, OBA plans, audiences, campaign setup,
the "Create campaigns with Max" flow, and the ad preview page).

## Run it

Needs Node 20+ (see `.nvmrc`) and Yarn 1 (`npm i -g yarn`). The first install needs internet.

```sh
yarn install
yarn start        # dev server with hot reload, http://localhost:8080
yarn build        # production build into ./build
yarn serve        # serve ./build on http://localhost:8080  (PORT=3000 yarn serve)
yarn type-check   # tsc
yarn test         # jest
```

## Deploy to Azure

Push to `main`. `.github/workflows/deploy-to-azure.yml` installs, runs `yarn build`, and deploys the result to the
App Service `amadeus-advertising-atap` (secret: `AZURE_PUBLISH_PROFILE`). Check the Actions tab afterwards.

The deployed package is `build/` (as `app/`), `serve.js`, `web.config` and `azure/package.json`. The App Service runs
`npm start` from that small `package.json`, which is why it is kept separate from the root one.
Do not commit build output.

Layout (same as the original monorepo):

- `src/` - entry point and routes (`src/index.tsx`, including `/all-campaigns/preview`)
- `apps/mediahub-ui` - shell, home, campaign setup, audiences, Max campaign flow, ad preview page
- `apps/advertisers-ui`, `apps/oba-ui`, `apps/mediaplanner-ui` - the other modules
- `packages/react-design-factory` - Design Factory components, `colors`, icons
- `public/` - static files: `creatives/` (Londoner HTML5 banners), `Images/` (preview-page photos)
- `webpack.config.ts` - demo config (no backend proxy)

## How the "no backend / no login" mode works

- `apps/mediahub-ui/shared/offlineMode.ts` holds the switches. The demo build (`__ATAP_DEMO__`, set in
  `webpack.config.ts`) defaults to backend off and sign-in skipped.
- Auth calls (`/me`, `/logout`, ...) are answered locally in `apps/mediahub-ui/api/apiAuth.ts`.
- `apps/mediahub-ui/shared/offlineLink.ts` makes every GraphQL request that would reach the network fail fast.
  The mock links `apps/advertisers-ui/AdvertisersGqlProvider/advertiserMockLink.ts` and
  `apps/oba-ui/ObaGqlProvider/obaMockLink.ts` then serve the demo data.
- Override at runtime: `?login=on` shows the login page again, `?login=off` skips it; `?offline=on|off` switches
  the backend off/on. Choices are kept in localStorage.

## Known limits

- Not available without a backend: Media Planner data, creating OBA plans, notifications and module cards on
  Home, the Max Copilot chat.
- The Londoner HTML5 banners load Google's Enabler and GSAP from the internet, so they animate only online.
- `public/Images` holds press photos and another advertiser's ad screenshot. Check you may share them before
  sending this folder outside your team.
