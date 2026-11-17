import { useNotification } from '@amadeus/react-design-factory'
import { useUpdateUserMutation } from './UserManagementDetails.queries'
import { RoleKey, ModuleKey, AccessLevel } from './UserManagementDetails.d'

export function useUpdateUserField() {
  const notification = useNotification()
  const [updateUser, { loading, error }] = useUpdateUserMutation()
  const updateFields = async (userId: number, fields: { role?: string; isActive?: boolean }) => {
    if (typeof fields.role === 'undefined' && typeof fields.isActive === 'undefined') return
    try {
      const response = await updateUser({
        variables: { userId, ...fields },
      })
      const result = response.data?.updateUser
      if (result?.success) {
        notification.success(result.message)
      } else {
        notification.error(result?.message ?? 'Update failed')
      }
    } catch (err) {
      notification.error(`Error: ${err}`)
    }
  }
  return { updateFields, loading, error }
}

export const MODULES = [
  { key: 'advertisers', label: 'Advertisers', externalVisible: true },
  { key: 'media-planning', label: 'Media Planning & Requests', externalVisible: false },
  { key: 'campaign-management', label: 'Campaign Management & Setup', externalVisible: false },
  { key: 'campaign-optimization', navKey: 'campaignOptimizationPacing', externalNavKey: 'campaignOptimization', externalVisible: true },
  { key: 'reports', label: 'Reports', externalVisible: false },
  { key: 'market-insights', label: 'Market Insights', externalVisible: false },
  { key: 'data-management', label: 'Data Management', externalVisible: false },
  { key: 'pricing-billing', label: 'Pricing & Billing', externalVisible: false },
  { key: 'user-management', label: 'User Management', externalVisible: true },
] as const

export const ROLE_ACCESS: Record<RoleKey, Record<ModuleKey, AccessLevel>> = {
  'mh-administrator': {
    advertisers: 'full',
    'media-planning': 'full',
    'campaign-management': 'full',
    'campaign-optimization': 'full',
    reports: 'full',
    'market-insights': 'full',
    'data-management': 'full',
    'pricing-billing': 'full',
    'user-management': 'full',
  },
  'mh-standard': {
    advertisers: 'full',
    'media-planning': 'full',
    'campaign-management': 'full',
    'campaign-optimization': 'full',
    reports: 'full',
    'market-insights': 'full',
    'data-management': 'full',
    'pricing-billing': 'full',
    'user-management': 'none',
  },
  'mh-read-only': {
    advertisers: 'view',
    'media-planning': 'view',
    'campaign-management': 'view',
    'campaign-optimization': 'view',
    reports: 'view',
    'market-insights': 'view',
    'data-management': 'view',
    'pricing-billing': 'view',
    'user-management': 'none',
  },
}
