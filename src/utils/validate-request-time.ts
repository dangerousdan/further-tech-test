import { addHours } from 'date-fns'
import { determineApprovalTimeLimit } from './tos'
import type { Request } from './convert-request-type'
import { adjustTimeToOpeningHours } from './dates'

export function validateRequestTime(request: Request): boolean {
  const approvalTimeLimit = determineApprovalTimeLimit(
    request.tosType,
    request.source
  )

  const latestApprovalTime = addHours(
    request.refundRequestDate,
    approvalTimeLimit
  )

  const actualRefundRequestTime =
    request.source == 'phone'
      ? adjustTimeToOpeningHours(request.refundRequestDate)
      : request.refundRequestDate

  console.log({
    name: request.name,
    investmentDate: request.investmentDate,
    refundRequestDate: request.refundRequestDate,
    actualRefundRequestTime,
    latestApprovalTime,
  })

  return actualRefundRequestTime <= latestApprovalTime
}
