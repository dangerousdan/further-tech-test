import { convertRequestType, WebRequest } from '~/utils/convert-request-type'
import {
  validateRequestTime,
  ValidationResponse,
} from '~/utils/validate-request-time'

/**
 * Converts the WebRequest to a ValidRequest (converts dates)
 * then validates the request was made within the time limits
 *
 * Validation response contains extra info for the UI to display
 */
export function validateRequest(webRequest: WebRequest): ValidationResponse {
  try {
    const validRequest = convertRequestType(webRequest)
    return validateRequestTime(validRequest)
  } catch (error) {
    if (error instanceof Error) {
      return { isValid: false, error: error.message }
    }
    return { isValid: false, error: 'Unknown Error' }
  }
}
