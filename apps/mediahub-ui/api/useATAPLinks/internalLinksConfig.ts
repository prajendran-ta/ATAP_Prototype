/**
 * Internal SPA routes — identical across all environments.
 * These never contain sensitive URLs and are safe to bundle in main.js.
 */
export const internalLinks = {
  advertisers: '/advertisers',
  mediaPlanning: {
    mediaplanner: '/mediaplanner/',
  },
  campaignOptimization: {
    oba: '/oba/',
  },
  dataManagement: {
    audienceBuilder: '/audience-builder',
    audience: '/audience',
  },
  userManagement: '/user-management',
}
