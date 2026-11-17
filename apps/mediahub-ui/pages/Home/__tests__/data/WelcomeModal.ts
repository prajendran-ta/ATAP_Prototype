export const defaultUserData = {
  user: { id: 42 },
  isAdmin: false,
}

export interface SetupOptions {
  followingTotal?: number
  advLoading?: boolean
  advError?: Error
  wmStatus?: boolean
  wmLoading?: boolean
  wmError?: Error
}
