export interface UserManagementDetailsDetailsProps {
  user: SharedQL.User
  refetch: () => void
  index: number
}
export type RoleKey = 'mh-administrator' | 'mh-standard' | 'mh-read-only'
export type AccessLevel = 'none' | 'view' | 'full'
export type ModuleKey = (typeof MODULES)[number]['key']
export type ModuleAccessRow = {
  key: string
  module: React.ReactNode
  access: AccessLevel
}
