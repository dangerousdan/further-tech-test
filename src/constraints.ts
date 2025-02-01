import { TimeZone } from '~/utils/dates'
import { RequestSource, TosType } from '~/utils/tos'

/**
 * The timezone of the UK Office
 */
export const nativeTimezone: TimeZone = 'Europe/London'

/**
 * The date at which the TOS changed.
 */
export const tosThreshold = new Date('2020-01-02T00:00:00Z')

type ApprovalTimeLimits = Record<RequestSource, Record<TosType, number>>

/**
 * Reversal request time limits in hours.
 */
export const approvalTimeLimits: ApprovalTimeLimits = {
  phone: {
    old: 4,
    new: 24,
  },
  webapp: {
    old: 8,
    new: 16,
  },
}

/**
 * Opening hours. This allows different hours for each day.
 */
export const hoursOpenByDay = [
  {
    dayOfWeek: 1,
    open: 9,
    close: 17,
  },
  {
    dayOfWeek: 2,
    open: 9,
    close: 17,
  },
  {
    dayOfWeek: 3,
    open: 9,
    close: 17,
  },
  {
    dayOfWeek: 4,
    open: 9,
    close: 17,
  },
  {
    dayOfWeek: 5,
    open: 9,
    close: 17,
  },
]
