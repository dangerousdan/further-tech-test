import { parseDateString } from './dates'
import { determineTosType, type TosType } from './tos'

export type RequestSource = 'phone' | 'web app'

export type CoreRequest = {
  name: string
  timezone: string
  source: RequestSource
}

export type WebRequest = CoreRequest & {
  signupDate: string
  investmentDate: string
  investmentTime: string
  refundRequestDate: string
  refundRequestTime: string
}

export type ValidatedRequest = CoreRequest & {
  signupDate: Date
  tosType: TosType
  investmentDate: Date
  refundRequestDate: Date
}

export function validateRequest(webRequest: WebRequest): ValidatedRequest {
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

  // @TODO add _actual_ validation here.

  return {
    name: webRequest.name,
    timezone: webRequest.timezone,
    source: webRequest.source,
    tosType,
    signupDate,
    investmentDate,
    refundRequestDate,
  }
}
