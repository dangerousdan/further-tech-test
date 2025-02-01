import { TZDate } from '@date-fns/tz'
import { add, getDay, parse, set } from 'date-fns'
import { hoursOpenByDay, nativeTimezone } from '~/constraints'

/**
 * Inputted locations from the user
 */
export type UserLocation = 'PST' | 'EST' | 'CET' | 'GMT'

/**
 * Actual timezones
 */
export type TimeZone =
  | 'America/Los_Angeles'
  | 'America/New_York'
  | 'Europe/Paris'
  | 'Europe/London'

const americanDateFormat = 'MM/dd/yyyy HH:mm'
const europeanDateFormat = 'dd/MM/yyyy HH:mm'

export const locationTimezoneMap: Record<UserLocation, TimeZone> = {
  PST: 'America/Los_Angeles',
  EST: 'America/New_York',
  CET: 'Europe/Paris',
  GMT: 'Europe/London',
}

type OpeningHours = {
  open: Date
  closed: Date
}

/**
 * Adjusts the date to the next opening hours.
 * Recursively calls itself, incrementing the day each time.
 */
export function adjustDateToNextOpeningHours(date: Date): Date {
  const openingHours = getOpeningHoursForDay(date)

  // if not open (or if we're already closed), goto the next date (and reset the time to 0)
  if (!openingHours || date > openingHours.closed) {
    const nextDay = set(add(date, { days: 1 }), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
    return adjustDateToNextOpeningHours(nextDay)
  }

  // return the next date were open
  return date < openingHours.open ? openingHours.open : date
}

/**
 * returns opening hours or undefined if not open
 * date should already be in the native timezone
 */
function getOpeningHoursForDay(date: Date): OpeningHours | undefined {
  const dayOfWeek = getDay(date)
  const hours = hoursOpenByDay.find((hours) => hours.dayOfWeek === dayOfWeek)

  if (!hours) {
    return
  }

  const open = set(date, {
    hours: hours?.open,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  const closed = set(date, {
    hours: hours?.close,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  return { open, closed }
}

type ParseDateArgs = {
  dateString: string
  timezone: TimeZone
  timeString?: string
}

/**
 * returns date as native timezone
 */
export function parseDateString({
  dateString,
  timezone,
  timeString = '00:00',
}: ParseDateArgs): Date {
  const dateTimeString = `${dateString} ${timeString}`
  const dateFormat = getDateFormatFromTimezone(timezone)

  const date = parse(dateTimeString, dateFormat, new TZDate(0, 0, 0, timezone))
  return date.withTimeZone(nativeTimezone)
}

/**
 * determines the date format based on the timezone
 */
const getDateFormatFromTimezone = (timezone: TimeZone): string => {
  if (timezone.includes('America')) {
    return americanDateFormat
  }
  return europeanDateFormat
}

export function addHours(date: Date, hours: number): Date {
  return add(date, { hours })
}
