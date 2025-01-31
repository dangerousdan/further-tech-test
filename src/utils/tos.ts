export type TosType = 'old' | 'new'
export type RequestSource = 'phone' | 'webapp'

const tosThreshold = new Date('2020-01-02T00:00:00Z')

export function determineTosType(date: Date): TosType {
  return date < tosThreshold ? 'old' : 'new'
}

/**
 * @todo tidy to make more readable
 */
export function determineApprovalTimeLimit(
  tosType: TosType,
  requestSource: RequestSource
): number {
  if (tosType === 'old') {
    return requestSource == 'phone' ? 4 : 8
  }

  return requestSource == 'phone' ? 24 : 16
}
