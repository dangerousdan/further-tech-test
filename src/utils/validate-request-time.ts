import { addHours } from 'date-fns'
import type { ValidRequest } from '~/utils/convert-request-type'
import { adjustDateToNextOpeningHours } from '~/utils/dates'
import { determineApprovalTimeLimitHours } from '~/utils/tos'

export type ValidationResponse = {
  isValid: boolean
  approvalTimeLimitHours?: number
  latestApprovalDate?: Date
  refundRequestDate?: Date
  adjustedRefundRequestDate?: Date
  error?: string
}

/**
 * Validates the request was made within the time limits
 *
 * Returns the calulations, so the UI can show its working
 */
export function validateRequestTime(request: ValidRequest): ValidationResponse {
  const approvalTimeLimitHours = determineApprovalTimeLimitHours(
    request.tosType,
    request.source
  )

  const latestApprovalDate = addHours(
    request.investmentDate,
    approvalTimeLimitHours
  )

  // only adjust the date on phone requests
  const adjustedRefundRequestDate =
    request.source == 'phone'
      ? adjustDateToNextOpeningHours(request.refundRequestDate)
      : request.refundRequestDate

  const isValid = adjustedRefundRequestDate <= latestApprovalDate

  return {
    approvalTimeLimitHours,
    latestApprovalDate,
    refundRequestDate: request.refundRequestDate,
    adjustedRefundRequestDate,
    isValid,
  }
}
