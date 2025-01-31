import { parseDateString, TimeZone, tzMap, WebTimeZone } from './dates'
import { determineTosType, type RequestSource, type TosType } from './tos'

export type CoreRequest = {
  name: string
  source: RequestSource
}

export type WebRequest = CoreRequest & {
  timezone: WebTimeZone
  signupDate: string
  investmentDate: string
  investmentTime: string
  refundRequestDate: string
  refundRequestTime: string
}

export type Request = CoreRequest & {
  timezone: TimeZone
  signupDate: Date
  tosType: TosType
  investmentDate: Date
  refundRequestDate: Date
}

export function convertRequestType(webRequest: WebRequest): Request {
  const signupDate = parseDateString({
    dateString: webRequest.signupDate,
    timezone: webRequest.timezone,
  })

  const investmentDate = parseDateString({
    dateString: webRequest.investmentDate,
    timeString: webRequest.investmentTime,
    timezone: webRequest.timezone,
  })

  const refundRequestDate = parseDateString({
    dateString: webRequest.refundRequestDate,
    timeString: webRequest.refundRequestTime,
    timezone: webRequest.timezone,
  })

  const tosType = determineTosType(signupDate)
  const convertedTimezone = tzMap?.[webRequest.timezone] || 'Europe/Paris'

  // @TODO add _actual_ validation here.
  // use zod or superstruct, but this will do for now.
  // so long as we use real dates

  if (isNaN(signupDate.getTime())) {
    throw new Error(`${webRequest.name}: Invalid signup date`)
  }

  if (isNaN(investmentDate.getTime())) {
    throw new Error(`${webRequest.name}: Invalid investment date`)
  }

  if (isNaN(refundRequestDate.getTime())) {
    throw new Error(`${webRequest.name}: Invalid refund date`)
  }

  return {
    name: webRequest.name,
    timezone: convertedTimezone,
    source: webRequest.source,
    tosType,
    signupDate,
    investmentDate,
    refundRequestDate,
  }
}
