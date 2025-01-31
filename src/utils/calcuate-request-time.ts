import { addHours } from 'date-fns'
import { determineApprovalTimeLimit } from './tos'
import { ValidatedRequest, validateRequest } from './validate-request'
import { adjustTimeToOpeningHours } from './dates'

const example = {
  name: 'Emma',
  timezone: 'PST',
  signupDate: '1/2/2020',
  source: 'phone',
  investmentDate: '1/2/2021',
  investmentTime: '06:00',
  refundRequestDate: '1/2/2021',
  refundRequestTime: '09:00',
}

const req = validateRequest(example)
console.log(req)
// const res = calculateRequestTime(req)
// console.log({ res })

export function calculateRequestTime(request: ValidatedRequest): boolean {
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

  return actualRefundRequestTime <= latestApprovalTime
}
