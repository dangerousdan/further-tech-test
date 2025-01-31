import { TZDate } from '@date-fns/tz'
import { add, getDay, parse, set } from 'date-fns'

export type WebTimeZone = 'PST' | 'EST' | 'CET' | 'GMT'
export type TimeZone =
  | 'America/Los_Angeles'
  | 'America/New_York'
  | 'Europe/Paris'
  | 'Europe/London'

const nativeTimezone: TimeZone = 'Europe/London'
const formatAmericanDate = 'MM/dd/yyyy'
const formatEuropeanDate = 'dd/MM/yyyy'
const formatTime = 'HH:mm'

export const tzMap: Record<WebTimeZone, TimeZone> = {
  PST: 'America/Los_Angeles',
  EST: 'America/New_York',
  CET: 'Europe/Paris',
  GMT: 'Europe/London',
}

const openingHours = {
  day: [1, 2, 3, 4, 5],
  hour: [9, 17],
}

type OpeningHours = {
  open: Date
  closed: Date
}

/**
 * returns opening hours or null if not open
 * date should already be in Europe/London timezone
 */
function getOpeningHoursForDay(date: Date): OpeningHours | null {
  const day = getDay(date)

  if (!openingHours.day.includes(day)) {
    return null
  }

  const open = set(date, {
    hours: openingHours.hour[0],
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  const closed = set(date, {
    hours: openingHours.hour[1],
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  return { open, closed }
}

/**
 * opening hours is 9-5 mon-fri
 */
export function adjustTimeToOpeningHours(date: Date): Date {
  const openingHours = getOpeningHoursForDay(date)

  if (!openingHours || date > openingHours.closed) {
    // skip days not open
    const nextDay = set(add(date, { days: 1 }), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
    return adjustTimeToOpeningHours(nextDay)
  }

  return date < openingHours.open ? openingHours.open : date
}

type ParseDateArgs = {
  dateString: string
  timezone: TimeZone
  timeString?: string
}

/**
 * returns date as Europe/London timezone
 */
export function parseDateString({
  dateString,
  timezone,
  timeString = '',
}: ParseDateArgs): Date {
  const dateTimeString = `${dateString} ${timeString}`

  let dateFormat = getDateFormatFromTimezone(timezone)

  if (timeString) {
    dateFormat += ` ${formatTime}`
  }

  const date = parse(dateTimeString, dateFormat, new TZDate(0, 0, 0, timezone))
  return date.withTimeZone(nativeTimezone)
}

/**
 * determines the date format based on the timezone
 */
const getDateFormatFromTimezone = (timezone: TimeZone): string => {
  if (timezone.includes('America')) {
    return formatAmericanDate
  }
  return formatEuropeanDate
}

export function addHours(date: Date, hours: number): Date {
  return add(date, { hours })
}
