export const advertiserDetailsAdvertiserMock: any = {
  id: 1,
  advertiserId: 1,
  advertiserName: 'hotel alpha',
  bpid: 'BP123',
  advertiserTypes: ['Hotel'],
  isFollowing: false,
  followedBy: [],
} as any

export const advertiserDetailsQueryMock = {
  advertiserDetails: {
    externalAdvertiser: [
      { platform: 'Platform A', name: 'Alpha A' },
      { platform: 'Platform B', name: 'Alpha B' },
    ],
  },
}
