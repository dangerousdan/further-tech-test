import { expect, test } from 'vitest'
import { initialRequestData } from '../request-data.js'
import { validateRequest } from './validate-request.js'

const expectedResults: boolean[] = [false, true, true]

for (const index in initialRequestData) {
  const webRequest = initialRequestData[index]

  test(`validate-request:${index}`, () => {
    const isValid = validateRequest(webRequest)

    expect(isValid).toBe(expectedResults[index])
  })
}
