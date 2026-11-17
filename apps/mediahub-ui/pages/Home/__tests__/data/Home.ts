export const adminAuthData = {
  isAdmin: true,
  isExternal: false,
  hasPermission: () => true,
  permissions: ['mh-user-write'],
  role: 'mh-administrator',
  user: undefined,
}

export const standardUserAuthData = {
  isAdmin: false,
  isExternal: false,
  hasPermission: () => false,
  permissions: [],
  role: 'mh-standard',
  user: undefined,
}
