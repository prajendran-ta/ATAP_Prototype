import { useQuery, useMutation } from '@apollo/client'
import {
  GET_NOTIFICATIONS,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  SNOOZE_NOTIFICATION,
  UNSNOOZE_NOTIFICATION,
  useGetNotificationsQuery,
  useMarkAsRead,
  useMarkAsUnread,
  useSnoozeNotification,
  useUnSnoozeNotification,
} from '../../Notifications.queries'

jest.mock('@apollo/client', () => ({
  __esModule: true,
  gql: (literals: TemplateStringsArray) => literals[0],
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

const mockedUseQuery = useQuery as jest.Mock
const mockedUseMutation = useMutation as jest.Mock

describe('Notifications.queries - useGetNotificationsQuery', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset()
  })

  it('calls useQuery with GET_NOTIFICATIONS and correct variables and fetchPolicy', () => {
    const filters = { some: 'filter' } as any

    useGetNotificationsQuery(filters)

    expect(mockedUseQuery).toHaveBeenCalledWith(GET_NOTIFICATIONS, {
      variables: { filter: filters },
      fetchPolicy: 'no-cache',
    })
  })
})

describe('Notifications.queries - mutation hooks', () => {
  beforeEach(() => {
    mockedUseMutation.mockReset()
  })

  it('useMarkAsRead uses MARK_AS_READ mutation', () => {
    useMarkAsRead()
    expect(mockedUseMutation).toHaveBeenCalledWith(MARK_AS_READ)
  })

  it('useMarkAsUnread uses MARK_AS_UNREAD mutation', () => {
    useMarkAsUnread()
    expect(mockedUseMutation).toHaveBeenCalledWith(MARK_AS_UNREAD)
  })

  it('useSnoozeNotification uses SNOOZE_NOTIFICATION mutation', () => {
    useSnoozeNotification()
    expect(mockedUseMutation).toHaveBeenCalledWith(SNOOZE_NOTIFICATION)
  })

  it('useUnSnoozeNotification uses UNSNOOZE_NOTIFICATION mutation', () => {
    useUnSnoozeNotification()
    expect(mockedUseMutation).toHaveBeenCalledWith(UNSNOOZE_NOTIFICATION)
  })
})
