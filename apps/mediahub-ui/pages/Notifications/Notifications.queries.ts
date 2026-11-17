import { gql, useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($filter: NotificationFilter!) {
    notifications(filter: $filter) {
      id
      advertiser {
        id
        name
        bpid
      }
      advertiserId
      category
      code
      createdAt {
        ago
        at
      }
      level
      message
      module
      readStatus
      snoozeStatus
      link {
        type
        parameters
      }
    }
  }
`

export const MARK_AS_READ = gql`
  mutation MarkAsRead($id: ID!) {
    markAsRead(id: $id)
  }
`

export const MARK_AS_UNREAD = gql`
  mutation MarkAsUnread($id: ID!) {
    markAsUnread(id: $id)
  }
`

export const SNOOZE_NOTIFICATION = gql`
  mutation Snooze($id: ID!) {
    snooze(id: $id)
  }
`

export const UNSNOOZE_NOTIFICATION = gql`
  mutation UnSnooze($id: ID!) {
    unSnooze(id: $id)
  }
`

export function useGetNotificationsQuery(filters: SharedQL.NotificationFilter) {
  return useQuery<Pick<SharedQL.Query, 'notifications'>, SharedQL.QueryNotificationsArgs>(GET_NOTIFICATIONS, {
    variables: {
      filter: filters,
    },
    fetchPolicy: 'no-cache',
  })
}

export function useMarkAsRead() {
  return useMutation<{ markAsRead: boolean }, { id: string }>(MARK_AS_READ)
}

export function useMarkAsUnread() {
  return useMutation<{ markAsUnread: boolean }, { id: string }>(MARK_AS_UNREAD)
}

export function useSnoozeNotification() {
  return useMutation<{ snooze: boolean }, { id: string }>(SNOOZE_NOTIFICATION)
}

export function useUnSnoozeNotification() {
  return useMutation<{ unSnooze: boolean }, { id: string }>(UNSNOOZE_NOTIFICATION)
}
