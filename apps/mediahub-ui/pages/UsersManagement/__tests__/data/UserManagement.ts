export const usersPageMockData = {
  users: [
    {
      id: 1,
      name: 'Jane Admin',
      email: 'jane.admin@mediahub.test',
      role: ['mh-administrator'],
      location: 'Madrid',
      status: 'active',
      lastLogin: '2026-03-18 10:00',
    },
    {
      id: 2,
      name: 'John Reader',
      email: 'john.reader@mediahub.test',
      role: ['mh-read-only'],
      location: 'Berlin',
      status: 'inactive',
      lastLogin: '2026-03-17 15:30',
    },
  ],
  totalCount: 2,
  hasNextPage: false,
  totalAdministrators: 1,   
  totalStandard: 0,
  totalReadOnly: 1,
  toggle: {
    totalActive: 1,
    totalInactive: 1,
    totalUsers: 2,
  },
}

export const emptyUsersPageMockData = {
  users: [],
  totalCount: 0,
  hasNextPage: false,
  totalAdministrators: 0,
  totalStandard: 0,
  totalReadOnly: 0,
  toggle: {
    totalActive: 0,
    totalInactive: 0,
    totalUsers: 0,
  },
}

export const activeOnlyMockData = {
  users: [
    {
      id: 1,
      name: 'Jane Admin',
      email: 'jane.admin@mediahub.test',
      role: ['mh-administrator'],
      location: 'Madrid',
      status: 'active',
      lastLogin: '2026-03-18 10:00',
    },
  ],
  totalCount: 1,
  hasNextPage: false,
  totalAdministrators: 1,
  totalStandard: 0,
  totalReadOnly: 0,
  toggle: { totalActive: 1, totalInactive: 0, totalUsers: 1 },
}

export const inactiveOnlyMockData = {
  users: [
    {
      id: 2,
      name: 'John Reader',
      email: 'john.reader@mediahub.test',
      role: ['mh-read-only'],
      location: 'Berlin',
      status: 'inactive',
      lastLogin: '2026-03-17 15:30',
    },
  ],
  totalCount: 1,
  hasNextPage: false,
  totalAdministrators: 0,
  totalStandard: 0,
  totalReadOnly: 1,
  toggle: { totalActive: 0, totalInactive: 1, totalUsers: 1 },
}

export const pageTwoMockData = {
  users: [
    {
      id: 3,
      name: 'Alice Standard',
      email: 'alice.standard@mediahub.test',
      role: ['mh-standard'],
      location: 'Paris',
      status: 'active',
      lastLogin: '2026-03-16 09:00',
    },
    {
      id: 4,
      name: 'Bob ReadOnly',
      email: 'bob.readonly@mediahub.test',
      role: ['mh-read-only'],
      location: 'Rome',
      status: 'inactive',
      lastLogin: '2026-03-15 14:00',
    },
  ],
  totalCount: 20,
  hasNextPage: false,
  totalAdministrators: 1,
  totalStandard: 1,
  totalReadOnly: 2,
  toggle: { totalActive: 2, totalInactive: 2, totalUsers: 4 },
}

export const paginationPage1MockData = {
  users: usersPageMockData.users,
  totalCount: 20,
  hasNextPage: true,
  totalAdministrators: 1,
  totalStandard: 1,
  totalReadOnly: 2,
  toggle: { totalActive: 2, totalInactive: 2, totalUsers: 4 },
}

export const usersOptionsMock = {
  users: {
    users: [
      { id: 1, name: 'Jane Admin' },
      { id: 2, name: 'John Reader' },
    ],
  },
}