import { act, renderHook } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('does not update the value before the delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    act(() => jest.advanceTimersByTime(200))

    expect(result.current).toBe('first')
  })

  it('updates the value after the delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    act(() => jest.advanceTimersByTime(300))

    expect(result.current).toBe('second')
  })

  it('defaults to a 500ms delay when none is provided', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    act(() => jest.advanceTimersByTime(499))
    expect(result.current).toBe('first')

    act(() => jest.advanceTimersByTime(1))
    expect(result.current).toBe('second')
  })

  it('cancels the pending timer when the component unmounts', () => {
    const { result, rerender, unmount } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    unmount()
    act(() => jest.advanceTimersByTime(300))

    expect(result.current).toBe('first')
  })
})
