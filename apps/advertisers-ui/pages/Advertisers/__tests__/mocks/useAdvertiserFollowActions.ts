export const mockFollowMutation = jest.fn()
export const mockUnfollowMutation = jest.fn()

jest.mock('../../Advertisers.queries', () => ({
  __esModule: true,
  useFollowAdvertiserMutation: () => [mockFollowMutation, { error: undefined }],
  useUnfollowAdvertiserMutation: () => [mockUnfollowMutation, { error: undefined }],
}))

export const mockNotification = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
}

jest.mock('@amadeus/react-design-factory', () => ({
  __esModule: true,
  useNotification: () => mockNotification,
}))
