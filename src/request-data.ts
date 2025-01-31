import { WebRequest } from './utils/convert-request-type'

export const initialRequestData: WebRequest[] = [
  {
    name: 'Emma Smith',
    timezone: 'PST',
    signupDate: '1/2/2020',
    source: 'phone',
    investmentDate: '1/2/2021',
    investmentTime: '06:00',
    refundRequestDate: '1/2/2021',
    refundRequestTime: '09:00',
  },
  {
    name: 'Benjamin Johnson',
    timezone: 'CET',
    signupDate: '12/2/2020',
    source: 'webapp',
    investmentDate: '2/1/2021',
    investmentTime: '06:30',
    refundRequestDate: '1/2/2021',
    refundRequestTime: '23:00',
  },
  {
    name: 'Olivia Davis',
    timezone: 'CET',
    signupDate: '1/2/2020',
    source: 'webapp',
    investmentDate: '2/2/2021',
    investmentTime: '13:00',
    refundRequestDate: '2/2/2021',
    refundRequestTime: '20:00',
  },
]
