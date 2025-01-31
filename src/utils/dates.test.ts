import { expect, test } from 'vitest'
import { adjustTimeToOpeningHours, parseDateString } from './dates.js'

test('parseDateString', () => {
  const europeDate = parseDateString({
    dateString: '1/2/2020',
    timezone: 'Europe/Paris',
  })

  // BST is actually 1 hour behind
  expect(europeDate.toUTCString()).toEqual('Fri, 31 Jan 2020 23:00:00 GMT')

  const europeDateTime = parseDateString({
    dateString: '1/2/2020',
    timeString: '10:00',
    timezone: 'Europe/Paris',
  })

  // BST is actually 1 hour behind
  expect(europeDateTime.toUTCString()).toEqual('Sat, 01 Feb 2020 09:00:00 GMT')

  const pst = parseDateString({
    dateString: '1/2/2020',
    timeString: '10:00',
    timezone: 'America/Los_Angeles',
  })
  expect(pst.toUTCString()).toEqual('Thu, 02 Jan 2020 18:00:00 GMT')

  const est = parseDateString({
    dateString: '1/2/2020',
    timeString: '10:00',
    timezone: 'America/New_York',
  })
  expect(est.toUTCString()).toEqual('Thu, 02 Jan 2020 15:00:00 GMT')
})

test('adjustTimeToOpeningHours', () => {
  const testDates = [
    {
      // friday 9am valid
      input: new Date('2021-01-01T09:00:00Z'),
      output: new Date('2021-01-01T09:00:00Z'),
    },
    {
      // friday 8am => 9am
      input: new Date('2021-01-01T08:00:00Z'),
      output: new Date('2021-01-01T09:00:00Z'),
    },
    {
      // friday 5pm valid
      input: new Date('2021-01-01T17:00:00Z'),
      output: new Date('2021-01-01T17:00:00Z'),
    },
    {
      // friday 5:01pm => mon 9am
      input: new Date('2021-01-01T17:00:01Z'),
      output: new Date('2021-01-04T09:00:00Z'),
    },
    {
      // sat 8am => mon 9am
      input: new Date('2021-01-02T08:00:00Z'),
      output: new Date('2021-01-04T09:00:00Z'),
    },
  ]

  for (const { input, output } of testDates) {
    const adjustedDate = adjustTimeToOpeningHours(input)
    expect(adjustedDate).toEqual(output)
  }
})
