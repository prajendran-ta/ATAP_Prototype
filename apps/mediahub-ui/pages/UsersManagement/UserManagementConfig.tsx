import { colors } from '@amadeus/react-design-factory'

export const roleConfig: Record<string, { label: string; color: string; value: string }> = {
  'mh-administrator': {
    label: 'Administrator',
    color: colors.sky_30,
    value: 'mh-administrator',
  },
  'mh-standard': {
    label: 'Standard User',
    color: colors.sky_10,
    value: 'mh-standard',
  },
  'mh-read-only': {
    label: 'Read Only',
    color: colors.crimson_20,
    value: 'mh-read-only',
  },
}

export const userStatusConfig: Record<string, { label: string; color: string }> = {
  active: {
    label: 'Active',
    color: colors.forest_70,
  },
  inactive: {
    label: 'Inactive',
    color: colors.cloud_40,
  },
}

type Option = { label: string; value: string }

export function generateOptions<T extends { label: string; value?: string }>(
  config: Record<string, T>,
  includeKeyAsValue = false,
): Option[] {
  return Object.entries(config).map(([key, { label, value }]) => ({
    label,
    value: value ?? (includeKeyAsValue ? key : ''),
  }))
}
