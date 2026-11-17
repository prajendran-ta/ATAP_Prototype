import { capitalize } from './string'

describe('capitalize', () => {
  it('capitalizes the first letter and lowercases the rest', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('hELLO')).toBe('Hello')
  })

  it('returns an empty string when given an empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('lowercases an all-caps string except the first letter', () => {
    expect(capitalize('WORLD')).toBe('World')
  })
})
