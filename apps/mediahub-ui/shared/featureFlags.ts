import { currentEnv } from '@mediahub/mediahub-ui/api/apiConfig'

/**
 * Centralized feature flags.
 *
 * Use `currentEnv.includes('staging')` to enable a flag only in staging environments.
 * Use `true` / `false` to enable/disable a flag in all environments.
 */
export const featureFlags = {
  /** Media Planner module — accessible from sidebar, home page, and URL */
  mediaPlan: currentEnv.includes('staging') || currentEnv.includes('uat'),

  /** Multilanguage support */
  multiLanguage: currentEnv.includes('staging'),
} as const

export type FeatureFlags = typeof featureFlags
