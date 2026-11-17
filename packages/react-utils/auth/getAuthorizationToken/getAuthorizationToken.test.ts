import { getAuthorizationToken } from './getAuthorizationToken'

const mockCookie = (value: string) => {
  Object.defineProperty(document, 'cookie', {
    get: jest.fn(() => value),
    configurable: true,
  })
}

describe('getAuthorizationToken', () => {
  it('returns the decoded authorization token when present', () => {
    mockCookie('session=abc; authorization=Bearer%20token123; other=value')
    expect(getAuthorizationToken()).toBe('Bearer token123')
  })

  it('decodes URL-encoded characters in the token value', () => {
    mockCookie('authorization=Bearer%20my%2Ftoken')
    expect(getAuthorizationToken()).toBe('Bearer my/token')
  })

  it('returns null when the authorization cookie is absent', () => {
    mockCookie('session=abc; other=value')
    expect(getAuthorizationToken()).toBeNull()
  })

  it('returns null when there are no cookies at all', () => {
    mockCookie('')
    expect(getAuthorizationToken()).toBeNull()
  })
})
