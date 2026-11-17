export function getAuthorizationToken() {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'authorization') {
      return decodeURIComponent(value)
    }
  }
  return null
}
