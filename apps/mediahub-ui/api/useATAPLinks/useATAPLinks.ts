import { useState, useEffect } from 'react'
import { getResources } from '@mediahub/mediahub-ui/api/apiAuth'
import { internalLinks } from './internalLinksConfig'
import type { ATAPLinks } from './useATAPLinks.d'

const fallbackLinks: ATAPLinks = {
  advertisers: internalLinks.advertisers,
  mediaPlanning: {
    singleProperty: '',
    multiProperty: '',
    international: '',
    mediaplanner: internalLinks.mediaPlanning.mediaplanner,
  },
  campaignManagement: {
    cmt: '',
    insite: '',
    campaignMapping: '',
    adCopies: { americas: '', emea: '', apac: '' },
  },
  campaignOptimization: {
    pacingTool: '',
    oba: internalLinks.campaignOptimization.oba,
  },
  reports: { dmic: '', roas: '' },
  marketInsights: { tiPortal: '', ami: '', googleTravelAnalytics: '' },
  dataManagement: {
    segmentation: '',
    segments: '',
    audience: internalLinks.dataManagement.audience,
    audienceBuilder: internalLinks.dataManagement.audienceBuilder,
    datapartners: '',
  },
  pricingBilling: { invoicing: '' },
  userManagement: internalLinks.userManagement,
}

/**
 * Fetches external URLs from the backend (authenticated endpoint) and merges
 * them with the internal SPA routes that are safe to keep in the bundle.
 *
 * Falls back to internal-only routes if the request fails.
 */
export const useATAPLinks = (): ATAPLinks | null => {
  const [links, setLinks] = useState<ATAPLinks | null>(null)

  useEffect(() => {
    getResources()
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch external links')
        return res.json()
      })
      .then((remote: Omit<ATAPLinks, 'advertisers' | 'userManagement'>) => {
        const merged: ATAPLinks = {
          ...remote,
          advertisers: internalLinks.advertisers,
          mediaPlanning: {
            ...remote.mediaPlanning,
            mediaplanner: internalLinks.mediaPlanning.mediaplanner,
          },
          campaignOptimization: {
            ...remote.campaignOptimization,
            oba: internalLinks.campaignOptimization.oba,
          },
          dataManagement: {
            ...remote.dataManagement,
            audience: internalLinks.dataManagement.audience,
            audienceBuilder: internalLinks.dataManagement.audienceBuilder,
          },
          userManagement: internalLinks.userManagement,
        }
        setLinks(merged)
      })
      .catch(() => {
        setLinks(fallbackLinks)
      })
  }, [])

  return links
}
