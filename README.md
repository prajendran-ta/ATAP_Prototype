# ATAP demo

A standalone, front-end-only copy of the ATAP / MediaHub prototype that you can edit and run on its own.
There is **no backend and no login**: the app starts offline, signed in as a demo administrator, and shows
built-in demo data (The Londoner Hotel and 10 other demo advertisers, OBA plans, audiences, campaign setup,
the "Create campaigns with Max" flow, and the ad preview page).

## Quick run (no install)

`app/` is the ready-made build and `serve.js` is a tiny static server. It needs only Node 14+.

```sh
node serve.js      # http://localhost:8080  (PORT=3000 node serve.js; macOS: double-click start.command, Windows: start.bat)
```

`app/` reflects the last build; it does not update when you edit the source.

## Work on the source

Needs Node 20+ (see `.nvmrc`). Run the tools from `node_modules/.bin` (`npx webpack`, `npx tsc`, `npx jest`).

> Note: this repo's root `package.json` is only the small server wrapper used for deployment. The source
> project's own `package.json` (dependencies and the `yarn start/build/test` scripts) is not in the repo yet,
> so a fresh clone cannot install or build until it is restored.

```sh
npx webpack serve                     # dev server with hot reload, http://localhost:8080
npx webpack build                     # production build into ./build
npx tsc --noEmit                      # type-check
npx jest                              # tests
```

## Deploy to Azure

Pushing to `main` runs `.github/workflows/deploy-to-azure.yml`, which zips `app/`, `serve.js`, `package.json`,
`package-lock.json` and `web.config` and deploys them to the App Service `amadeus-advertising-atap`
(secret: `AZURE_PUBLISH_PROFILE`). The workflow does **not** build the source, so to ship a change:

1. `npx webpack build` (writes to `build/`, not `app/`)
2. Replace `app/` with the contents of `build/`, plus `Images/` and `creatives/` from `public/`
3. Keep the `window.process` shim in `app/index.html`
   (`<script>window.process=window.process||{env:{NODE_ENV:'production'}}</script>` before the main bundle);
   without it the app shows a blank screen
4. Commit and push, then check the Actions run

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
