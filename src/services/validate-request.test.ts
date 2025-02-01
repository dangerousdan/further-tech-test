import { expect, test } from 'vitest'
import { initialRequestData } from '~/request-data.js'
import { validateRequest } from './validate-request.js'

const expectedResults: boolean[] = [
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  true,
]

for (const index in initialRequestData) {
  const webRequest = initialRequestData[index]

  test(`validate-request:${index}`, () => {
    const response = validateRequest(webRequest)
    expect(response.isValid).toBe(expectedResults[index])
  })
}
