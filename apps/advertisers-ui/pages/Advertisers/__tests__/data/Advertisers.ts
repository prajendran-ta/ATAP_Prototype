export const advertisersPageMockData = {
  advertisers: [
    {
      id: 1,
      advertiserId: 1,
      advertiserName: 'Hotel Alpha',
      bpid: 'BP123',
      advertiserTypes: ['Hotel'],
      isFollowing: false,
      followedBy: ['User A'],
    },
    {
      id: 2,
      advertiserId: 2,
      advertiserName: 'Hotel Beta',
      bpid: 'BP456',
      advertiserTypes: ['Hotel'],
      isFollowing: true,
      followedBy: ['User B'],
    },
  ],
  toggle: { totalAdvertisers: 2, totalFollowing: 1 },
  totalCount: 2,
}

export const usersOptionsMock = {
  users: {
    users: [
      { id: 10, name: 'User A' },
      { id: 11, name: 'User B' },
    ],
  },
}

export const advertiserOptionsMock = {
  advertisers: {
    advertisers: [
      { advertiserId: 1, advertiserName: 'Hotel Alpha', bpid: 'BP123' },
      { advertiserId: 2, advertiserName: 'Hotel Beta', bpid: 'BP456' },
    ],
  },
}
