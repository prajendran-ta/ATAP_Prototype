export const getUsersResponseData = {
  users: {
    users: [],
    totalCount: 0,
    hasNextPage: false,
    totalAdministrators: 0,
    totalStandard: 0,
    totalReadOnly: 0,
    toggle: { totalActive: 0, totalInactive: 0, totalUsers: 0 },
  },
}

export const getUsersOptionsResponseData = {
  users: { users: [] },
}

export const getUserPermissionsResponseData = {
  user: {
    id: 1,
    name: 'Jane Admin',
    email: 'jane.admin@mediahub.test',
    role: ['mh-administrator'],
    permissions: ['mh-user-write'],
  },
}

export const updateUserSuccessResponseData = {
  updateUser: {
    success: true,
    message: 'User updated successfully',
    user: { id: 1, role: 'mh-standard', status: 'active' },
  },
}
