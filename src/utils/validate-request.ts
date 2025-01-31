import { convertRequestType, WebRequest } from './convert-request-type'
import { validateRequestTime } from './validate-request-time'

export function validateRequest(webRequest: WebRequest): boolean {
  try {
    const request = convertRequestType(webRequest)
    return validateRequestTime(request)
  } catch (err) {
    console.error(err)
    return false
  }
}
