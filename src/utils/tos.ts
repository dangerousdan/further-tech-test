import { approvalTimeLimits, tosThreshold } from '~/constraints'

export type TosType = 'old' | 'new'
export type RequestSource = 'phone' | 'webapp'

export function determineTosType(date: Date): TosType {
  return date < tosThreshold ? 'old' : 'new'
}

export function determineApprovalTimeLimitHours(
  tosType: TosType,
  requestSource: RequestSource
): number {
  return approvalTimeLimits[requestSource][tosType]
}
