import { addHours } from 'date-fns'
import { determineApprovalTimeLimitHours } from './tos'
import type { ValidRequest } from './convert-request-type'
import { adjustTimeToOpeningHours } from './dates'

export type ValidationResponse = {
  isValid: boolean
  approvalTimeLimitHours?: number
  latestApprovalTime?: Date
  refundRequestTime?: Date
  actualRefundRequestTime?: Date
  error?: string
}

export function validateRequestTime(request: ValidRequest): ValidationResponse {
  const approvalTimeLimitHours = determineApprovalTimeLimitHours(
    request.tosType,
    request.source
  )

  const latestApprovalTime = addHours(
    request.investmentDate,
    approvalTimeLimitHours
  )

  const actualRefundRequestTime =
    request.source == 'phone'
      ? adjustTimeToOpeningHours(request.refundRequestDate)
      : request.refundRequestDate

  const isValid = actualRefundRequestTime <= latestApprovalTime

  return {
    approvalTimeLimitHours,
    latestApprovalTime,
    refundRequestTime: request.refundRequestDate,
    actualRefundRequestTime,
    isValid,
  }
}
