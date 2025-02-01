import { WebRequest } from './utils/convert-request-type'

export const emptyRequest: WebRequest = {
  name: '',
  location: 'PST',
  signupDateStr: '',
  source: 'phone',
  investmentDateStr: '',
  investmentTimeStr: '',
  refundRequestDateStr: '',
  refundRequestTimeStr: '',
}

export const initialRequestData: WebRequest[] = [
  {
    name: 'Emma Smith',
    location: 'PST',
    signupDateStr: '1/2/2020',
    source: 'phone',
    investmentDateStr: '1/2/2021',
    investmentTimeStr: '06:00',
    refundRequestDateStr: '1/2/2021',
    refundRequestTimeStr: '09:00',
  },
  {
    name: 'Benjamin Johnson',
    location: 'CET',
    signupDateStr: '12/2/2020',
    source: 'webapp',
    investmentDateStr: '2/1/2021',
    investmentTimeStr: '06:30',
    refundRequestDateStr: '1/2/2021',
    refundRequestTimeStr: '23:00',
  },
  {
    name: 'Olivia Davis',
    location: 'CET',
    signupDateStr: '1/2/2020',
    source: 'webapp',
    investmentDateStr: '2/2/2021',
    investmentTimeStr: '13:00',
    refundRequestDateStr: '2/2/2021',
    refundRequestTimeStr: '20:00',
  },
  {
    name: 'Ethan Anderson',
    location: 'PST',
    signupDateStr: '1/11/2011',
    source: 'webapp',
    investmentDateStr: '2/1/2021',
    investmentTimeStr: '13:00',
    refundRequestDateStr: '2/2/2021',
    refundRequestTimeStr: '16:00',
  },
  {
    name: 'Sophia Wilson',
    location: 'PST',
    signupDateStr: '2/1/2020',
    source: 'phone',
    investmentDateStr: '2/1/2021',
    investmentTimeStr: '13:00',
    refundRequestDateStr: '2/2/2021',
    refundRequestTimeStr: '05:00',
  },
  {
    name: 'Liam Martinez',
    location: 'GMT',
    signupDateStr: '1/1/2020',
    source: 'webapp',
    investmentDateStr: '1/1/2021',
    investmentTimeStr: '11:00',
    refundRequestDateStr: '11/1/2021',
    refundRequestTimeStr: '12:00',
  },
  {
    name: 'Jonathan Giles',
    location: 'CET',
    signupDateStr: '1/1/2020',
    source: 'phone',
    investmentDateStr: '1/1/2021',
    investmentTimeStr: '11:00',
    refundRequestDateStr: '12/1/2021',
    refundRequestTimeStr: '12:00',
  },
  {
    name: 'Priya Sharp',
    location: 'CET',
    signupDateStr: '10/10/2020',
    source: 'phone',
    investmentDateStr: '5/5/2021',
    investmentTimeStr: '00:30',
    refundRequestDateStr: '5/5/2021',
    refundRequestTimeStr: '21:00',
  },
  {
    name: 'Raja Ortiz',
    location: 'EST',
    signupDateStr: '10/10/2021',
    source: 'phone',
    investmentDateStr: '01/15/2022',
    investmentTimeStr: '21:30',
    refundRequestDateStr: '01/16/2022',
    refundRequestTimeStr: '07:00',
  },
  {
    name: 'Livia Burns',
    location: 'PST',
    signupDateStr: '10/10/2021',
    source: 'phone',
    investmentDateStr: '01/15/2022',
    investmentTimeStr: '21:30',
    refundRequestDateStr: '01/16/2022',
    refundRequestTimeStr: '19:00',
  },
  {
    name: 'Lacey Gates',
    location: 'CET',
    signupDateStr: '10/10/2021',
    source: 'webapp',
    investmentDateStr: '15/01/2022',
    investmentTimeStr: '23:36',
    refundRequestDateStr: '16/01/2022',
    refundRequestTimeStr: '13:12',
  },
]
