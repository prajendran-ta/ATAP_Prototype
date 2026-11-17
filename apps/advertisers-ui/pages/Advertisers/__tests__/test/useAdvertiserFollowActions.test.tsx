import { mockFollowMutation, mockUnfollowMutation, mockNotification } from '../mocks/useAdvertiserFollowActions'
import { renderHook, act } from '@testing-library/react'
import { useAdvertiserFollowActions } from '../../useAdvertiserFollowActions'
import { baseAdvertisers } from '../data/useAdvertiserFollowActions'

describe('useAdvertiserFollowActions', () => {
  const setup = (selectedRows: any[] = baseAdvertisers) => {
    const setSelectedRows = jest.fn()
    const setSelectedRowKeys = jest.fn()
    const refetchWithFilters = jest.fn()

    const { result, rerender } = renderHook(
      (props: { rows: any[] }) =>
        useAdvertiserFollowActions({
          selectedRows: props.rows,
          setSelectedRows,
          setSelectedRowKeys,
          refetchWithFilters,
        }),
      { initialProps: { rows: selectedRows } },
    )

    return { result, setSelectedRows, setSelectedRowKeys, refetchWithFilters, rerender }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockFollowMutation.mockResolvedValue({ errors: undefined, data: { followAdvertiser: { message: 'ok-follow' } } })
    mockUnfollowMutation.mockResolvedValue({
      errors: undefined,
      data: { unfollowAdvertiser: { message: 'ok-unfollow' } },
    })
  })

  test('handleFollowAll does not call mutation when there are no rows to follow', async () => {
    const { result } = setup([])

    await act(async () => {
      result.current.handleFollowAll()
    })

    expect(mockFollowMutation).not.toHaveBeenCalled()
  })

  test('handleFollowAll calls followAdvertiser with expected ids and resets selection on success', async () => {
    const { result, setSelectedRows, setSelectedRowKeys, refetchWithFilters } = setup(baseAdvertisers)

    await act(async () => {
      result.current.handleFollowAll()
    })

    expect(mockFollowMutation).toHaveBeenCalledWith({
      variables: { input: { advertiserId: ['1'] } },
      errorPolicy: 'all',
    })

    expect(mockNotification.success).toHaveBeenCalledWith('ok-follow')
    expect(setSelectedRows).toHaveBeenCalledWith([])
    expect(setSelectedRowKeys).toHaveBeenCalledWith([])
    expect(refetchWithFilters).toHaveBeenCalled()
  })

  test('handleUnfollowAll does not call mutation when there are no rows to unfollow', async () => {
    const onlyNotFollowing = [baseAdvertisers[0]]
    const { result } = setup(onlyNotFollowing)

    await act(async () => {
      result.current.handleUnfollowAll()
    })

    expect(mockUnfollowMutation).not.toHaveBeenCalled()
  })

  test('handleUnfollowAll calls unfollowAdvertiser with expected ids and resets selection on success', async () => {
    const onlyFollowing = [baseAdvertisers[1]]
    const { result, setSelectedRows, setSelectedRowKeys, refetchWithFilters } = setup(onlyFollowing)

    await act(async () => {
      result.current.handleUnfollowAll()
    })

    expect(mockUnfollowMutation).toHaveBeenCalledWith({
      variables: { input: { advertiserId: ['2'] } },
      errorPolicy: 'all',
    })

    expect(mockNotification.success).toHaveBeenCalledWith('ok-unfollow')
    expect(setSelectedRows).toHaveBeenCalledWith([])
    expect(setSelectedRowKeys).toHaveBeenCalledWith([])
    expect(refetchWithFilters).toHaveBeenCalled()
  })

  test('handleToggleFollow calls followAdvertiser when row is not followed', async () => {
    const { result, refetchWithFilters } = setup([])

    await act(async () => {
      result.current.handleToggleFollow(baseAdvertisers[0])
    })

    expect(mockFollowMutation).toHaveBeenCalledWith({
      variables: { input: { advertiserId: ['1'] } },
      errorPolicy: 'all',
    })
    expect(mockNotification.success).toHaveBeenCalledWith('Successfully updated')
    expect(refetchWithFilters).toHaveBeenCalled()
  })

  test('handleToggleFollow calls unfollowAdvertiser when row is already followed', async () => {
    const { result, refetchWithFilters } = setup([])

    await act(async () => {
      result.current.handleToggleFollow(baseAdvertisers[1])
    })

    expect(mockUnfollowMutation).toHaveBeenCalledWith({
      variables: { input: { advertiserId: ['2'] } },
      errorPolicy: 'all',
    })
    expect(mockNotification.success).toHaveBeenCalledWith('Successfully updated')
    expect(refetchWithFilters).toHaveBeenCalled()
  })
})
