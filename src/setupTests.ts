import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { TextEncoder, TextDecoder } from 'node:util'

// RTL's default asyncUtilTimeout is 1 000 ms — too tight for findBy* / waitFor
// calls when running under coverage instrumentation on a loaded CI machine.
configure({ asyncUtilTimeout: 5000 })

// Provide TextEncoder / TextDecoder for packages (e.g. react-router) that expect
// them to be available in the jsdom environment.
Object.assign(global, { TextEncoder, TextDecoder })
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// English namespaces
import enAdvertisers from './locales/en/advertisers.json'
import enCommon from './locales/en/common.json'
import enCopilot from './locales/en/copilot.json'
import enDesignSystem from './locales/en/design-system.json'
import enErrors from './locales/en/errors.json'
import enHome from './locales/en/home.json'
import enLogin from './locales/en/login.json'
import enMediaplanner from './locales/en/mediaplanner.json'
import enNav from './locales/en/nav.json'
import enNotificationTemplates from './locales/en/notification-templates.json'
import enNotifications from './locales/en/notifications.json'
import enOba from './locales/en/oba.json'
import enUsers from './locales/en/users.json'
import enWelcome from './locales/en/welcome.json'

// French namespaces
import frAdvertisers from './locales/fr/advertisers.json'
import frCommon from './locales/fr/common.json'
import frCopilot from './locales/fr/copilot.json'
import frDesignSystem from './locales/fr/design-system.json'
import frErrors from './locales/fr/errors.json'
import frHome from './locales/fr/home.json'
import frLogin from './locales/fr/login.json'
import frMediaplanner from './locales/fr/mediaplanner.json'
import frNav from './locales/fr/nav.json'
import frNotificationTemplates from './locales/fr/notification-templates.json'
import frNotifications from './locales/fr/notifications.json'
import frOba from './locales/fr/oba.json'
import frUsers from './locales/fr/users.json'
import frWelcome from './locales/fr/welcome.json'

// Mock localStorage for tests (since i18n.ts tries to access it)
const localStorageMock = {
  getItem: jest.fn(() => 'en'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Initialize i18next for tests
// When resources are provided directly, initialization is synchronous
i18next.use(initReactI18next)

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      advertisers: enAdvertisers,
      common: enCommon,
      copilot: enCopilot,
      'design-system': enDesignSystem,
      errors: enErrors,
      home: enHome,
      login: enLogin,
      mediaplanner: enMediaplanner,
      nav: enNav,
      'notification-templates': enNotificationTemplates,
      notifications: enNotifications,
      oba: enOba,
      users: enUsers,
      welcome: enWelcome,
    },
    fr: {
      advertisers: frAdvertisers,
      common: frCommon,
      copilot: frCopilot,
      'design-system': frDesignSystem,
      errors: frErrors,
      home: frHome,
      login: frLogin,
      mediaplanner: frMediaplanner,
      nav: frNav,
      'notification-templates': frNotificationTemplates,
      notifications: frNotifications,
      oba: frOba,
      users: frUsers,
      welcome: frWelcome,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

// Ant Design uses window.matchMedia for responsive breakpoints (jsdom doesn't implement it)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// jsdom doesn't implement ResizeObserver (used e.g. by the Table component to measure column widths)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
})
