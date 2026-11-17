import { sortBy } from './array'

describe('sortBy', () => {
  it('sorts items alphabetically by the selected field', () => {
    const input = [{ name: 'Banana' }, { name: 'Apple' }, { name: 'Cherry' }]
    expect(sortBy(input, item => item.name)).toEqual([{ name: 'Apple' }, { name: 'Banana' }, { name: 'Cherry' }])
  })

  it('is case-insensitive', () => {
    const input = [{ name: 'banana' }, { name: 'Apple' }, { name: 'CHERRY' }]
    expect(sortBy(input, item => item.name).map(item => item.name)).toEqual(['Apple', 'banana', 'CHERRY'])
  })

  it('sorts null/undefined selector values as empty string (first)', () => {
    const input = [{ name: 'Beta' }, { name: null }, { name: 'Alpha' }]
    expect(sortBy(input, item => item.name).map(item => item.name)).toEqual([null, 'Alpha', 'Beta'])
  })

  it('returns an empty array unchanged', () => {
    expect(sortBy([], item => item)).toEqual([])
  })
})
