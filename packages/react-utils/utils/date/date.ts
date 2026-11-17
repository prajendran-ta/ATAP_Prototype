// Format date to DD-MMM-YYYY (e.g., "01-Jan-2025")
export const formatDate = (dateString: string) => {
  try {
    const dayjs = require('dayjs')
    return dayjs(dateString).format('DD-MMM-YYYY')
  } catch {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(date)
      .replace(/ /g, '-')
  }
}

export const formatToISODate = (date: string | Date) => {
  // ISO datetime strings contain a time component — extract the date part directly
  if (typeof date === 'string' && date.includes('T')) {
    return date.split('T')[0]
  }

  try {
    const dayjs = require('dayjs')
    return dayjs(date).format('YYYY-MM-DD')
  } catch {
    return new Date(date).toISOString().split('T')[0]
  }
}
