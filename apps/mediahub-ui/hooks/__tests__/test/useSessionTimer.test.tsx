import { renderHook, act } from '@testing-library/react'
import { useSessionTimer } from '../../useSessionTimer'

describe('useSessionTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('returns default state when timeout is undefined', () => {
    const { result } = renderHook(() => useSessionTimer(undefined))

    expect(result.current.secondsRemaining).toBe(0)
    expect(result.current.showWarning).toBe(false)
  })

  it('counts down and enables warning at the warning threshold', () => {
    const { result } = renderHook(() => useSessionTimer(122))

    expect(result.current.showWarning).toBe(false)
    expect(result.current.secondsRemaining).toBe(122)

    act(() => {
      jest.advanceTimersByTime(2_000)
    })

    expect(result.current.secondsRemaining).toBe(120)
    expect(result.current.showWarning).toBe(true)
  })

  it('calls onExpired once when timer reaches zero', () => {
    const onExpired = jest.fn()
    const { result } = renderHook(() => useSessionTimer(1, onExpired))

    expect(result.current.secondsRemaining).toBe(1)

    act(() => {
      jest.advanceTimersByTime(1_000)
    })

    expect(result.current.secondsRemaining).toBe(0)
    expect(result.current.showWarning).toBe(false)
    expect(onExpired).toHaveBeenCalledTimes(1)

    act(() => {
      jest.advanceTimersByTime(5_000)
    })

    expect(onExpired).toHaveBeenCalledTimes(1)
  })

  it('resetTimer restarts the countdown from the new timeout', () => {
    const onExpired = jest.fn()
    const { result } = renderHook(() => useSessionTimer(10, onExpired))

    act(() => {
      jest.advanceTimersByTime(3_000)
    })

    expect(result.current.secondsRemaining).toBe(7)

    act(() => {
      result.current.resetTimer(5)
    })

    expect(result.current.secondsRemaining).toBe(5)
    expect(result.current.showWarning).toBe(true)

    act(() => {
      jest.advanceTimersByTime(5_000)
    })

    expect(result.current.secondsRemaining).toBe(0)
    expect(onExpired).toHaveBeenCalledTimes(1)
  })

  it('restarts timer when sessionTimeout prop changes', () => {
    const { result, rerender } = renderHook(({ timeout }) => useSessionTimer(timeout), {
      initialProps: { timeout: 30 },
    })

    act(() => {
      jest.advanceTimersByTime(10_000)
    })

    expect(result.current.secondsRemaining).toBe(20)

    rerender({ timeout: 50 })

    expect(result.current.secondsRemaining).toBe(50)
    expect(result.current.showWarning).toBe(true)
  })
})
