import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

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

// TODO: replace with role check e.g. 'mh-advertiser' === context?.role
const isExternal = localStorage.getItem('mh-external') === 'true'
const savedLanguage = isExternal ? (localStorage.getItem('mh-language') ?? 'en') : 'en'

dayjs.locale(savedLanguage)

i18next.use(initReactI18next).init({
  lng: savedLanguage,
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

export default i18next
