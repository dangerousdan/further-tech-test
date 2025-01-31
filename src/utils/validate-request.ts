import { convertRequestType, WebRequest } from './convert-request-type'
import {
  validateRequestTime,
  ValidationResponse,
} from './validate-request-time'

export function validateRequest(webRequest: WebRequest): ValidationResponse {
  try {
    const request = convertRequestType(webRequest)
    return validateRequestTime(request)
  } catch (error) {
    if (error instanceof Error) {
      return { isValid: false, error: error.message }
    }
    return { isValid: false, error: 'Unknown Error' }
  }
}
