export type AccessLevel = 'full' | 'none' | 'view'

export interface PermissionsAndRolesProps {
  accessMatrix: Record<string, Record<string, AccessLevel>>
  roles: string[]
}

export interface PermissionsAndRolesModalProps {
  summaryBanner?: React.ReactNode
}
