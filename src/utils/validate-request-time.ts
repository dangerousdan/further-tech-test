import { addHours } from 'date-fns'
import { determineApprovalTimeLimit } from './tos'
import type { Request } from './convert-request-type'
import { adjustTimeToOpeningHours } from './dates'

export type ValidationResponse = {
  isValid: boolean
  approvalTimeLimit?: number
  latestApprovalTime?: Date
  refundRequestTime?: Date
  actualRefundRequestTime?: Date
  error?: string
}

export function validateRequestTime(request: Request): ValidationResponse {
  const approvalTimeLimit = determineApprovalTimeLimit(
    request.tosType,
    request.source
  )

  const latestApprovalTime = addHours(request.investmentDate, approvalTimeLimit)

  const actualRefundRequestTime =
    request.source == 'phone'
      ? adjustTimeToOpeningHours(request.refundRequestDate)
      : request.refundRequestDate

  const isValid = actualRefundRequestTime <= latestApprovalTime

  return {
    approvalTimeLimit,
    latestApprovalTime,
    refundRequestTime: request.refundRequestDate,
    actualRefundRequestTime,
    isValid,
  }
}
