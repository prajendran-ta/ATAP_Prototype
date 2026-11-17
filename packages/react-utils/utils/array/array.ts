export function sortBy<T>(arr: T[], selector: (item: T) => any): T[] {
  return arr.sort((a, b) => {
    const A = String(selector(a) ?? '').toLowerCase()
    const B = String(selector(b) ?? '').toLowerCase()
    return A.localeCompare(B)
  })
}
