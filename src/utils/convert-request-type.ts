import {
  locationTimezoneMap,
  parseDateString,
  type TimeZone,
  type UserLocation,
} from '~/utils/dates'
import { determineTosType, type RequestSource, type TosType } from '~/utils/tos'
import { nativeTimezone } from '~/constraints'

export type CoreRequest = {
  name: string
  source: RequestSource
  location: UserLocation
}

export type WebRequest = CoreRequest & {
  signupDateStr: string
  investmentDateStr: string
  investmentTimeStr: string
  refundRequestDateStr: string
  refundRequestTimeStr: string
}

export type ValidRequest = CoreRequest & {
  timezone: TimeZone
  signupDate: Date
  tosType: TosType
  investmentDate: Date
  refundRequestDate: Date
}

/**
 * Converts input from the client into a ValidRequest object.
 * Converts date and time strings into date objects in the correct timezone.
 * Converts timezone strings into valid timezones.
 * Determins the TOS type based on the signup date.
 * Defaults to Europe/London if the timezone is not recognised.
 */
export function convertRequestType(webRequest: WebRequest): ValidRequest {
  const timezone = locationTimezoneMap?.[webRequest.location] || nativeTimezone

  const signupDate = parseDateString({
    dateString: webRequest.signupDateStr,
    timezone,
  })

  const investmentDate = parseDateString({
    dateString: webRequest.investmentDateStr,
    timeString: webRequest.investmentTimeStr,
    timezone,
  })

  const refundRequestDate = parseDateString({
    dateString: webRequest.refundRequestDateStr,
    timeString: webRequest.refundRequestTimeStr,
    timezone,
  })

  const tosType = determineTosType(signupDate)

  // @TODO add _actual_ validation here.
  // use zod or superstruct, but this will do for now.
  // so long as we use real dates

  if (isNaN(signupDate.getTime())) {
    throw new Error(`Invalid signup date`)
  }

  if (isNaN(investmentDate.getTime())) {
    throw new Error(`Invalid investment date`)
  }

  if (isNaN(refundRequestDate.getTime())) {
    throw new Error(`Invalid refund date`)
  }

  return {
    name: webRequest.name,
    location: webRequest.location,
    timezone,
    source: webRequest.source,
    tosType,
    signupDate,
    investmentDate,
    refundRequestDate,
  }
}
