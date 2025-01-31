import { useEffect, useState } from 'react'
import { validateRequest } from '../utils/validate-request'
import clsx from 'clsx'
import type { WebRequest } from '../utils/convert-request-type'
import { initialRequestData } from '../request-data'

const emptyRequest: WebRequest = {
  name: '',
  timezone: 'PST',
  signupDate: '',
  source: 'phone',
  investmentDate: '',
  investmentTime: '',
  refundRequestDate: '',
  refundRequestTime: '',
}

export default function InputTable() {
  const [requests, setRequests] = useState<WebRequest[]>(initialRequestData)

  const setRequest = (i: number) => (request: WebRequest) => {
    setRequests((requests) => {
      const newRequests = [...requests]
      newRequests[i] = request
      return newRequests
    })
  }

  const addRow = () => {
    console.log('add')
    const newRequests = [...requests, emptyRequest]
    setRequests(newRequests)
  }

  useEffect(() => {
    console.log(requests)
  }, [requests])

  return (
    <div className="p-4 flex flex-col gap-4 text-xs">
      <div className="grid grid-cols-9 gap-1 w-full">
        <TableHeader name="Name" />
        <TableHeader name="Location" />
        <TableHeader name="Sign up date" />
        <TableHeader name="Request source" />
        <TableHeader name="Investment date" />
        <TableHeader name="Investment time" />
        <TableHeader name="Refund Request date" />
        <TableHeader name="Refund Request time" />
        <TableHeader name="Valid" />

        {requests.map((request, i) => (
          <RequestRow key={i} request={request} setRequest={setRequest(i)} />
        ))}
      </div>
      <button onClick={addRow}>Add row</button>
    </div>
  )
}

const TableHeader = ({ name }: { name: string }) => (
  <div className="text-xs text-center">{name}</div>
)

type RequestRowProps = {
  request: WebRequest
  setRequest: (request: WebRequest) => void
}

const RequestRow = ({ request, setRequest }: RequestRowProps) => {
  const [isValid, setIsValid] = useState(false)

  const changeField = (name: keyof WebRequest) => (value: string) => {
    const newRequest = { ...request, [name]: value }
    setRequest(newRequest)
  }

  useEffect(() => {
    setIsValid(validateRequest(request))
  }, [request])

  return (
    <>
      <InputField value={request.name} onChange={changeField('name')} />
      <Select
        options={['PST', 'CET', 'EST', 'GMT']}
        value={request.timezone}
        onChange={changeField('timezone')}
      />
      <InputField
        value={request.signupDate}
        onChange={changeField('signupDate')}
      />
      <Select
        options={['phone', 'webapp']}
        value={request.source}
        onChange={changeField('source')}
      />
      <InputField
        value={request.investmentDate}
        onChange={changeField('investmentDate')}
      />
      <InputField
        value={request.investmentTime}
        onChange={changeField('investmentTime')}
      />
      <InputField
        value={request.refundRequestDate}
        onChange={changeField('refundRequestDate')}
      />
      <InputField
        value={request.refundRequestTime}
        onChange={changeField('refundRequestTime')}
      />
      <div
        className={clsx('text-white flex items-center justify-center', {
          'bg-green-600': isValid,
          'bg-red-800': !isValid,
        })}
      >
        {isValid ? 'true' : 'false'}
      </div>
    </>
  )
}

type InputFieldProps = {
  value: string
  onChange: (value: string) => void
}

const InputField = ({ value, onChange }: InputFieldProps) => {
  return (
    <input
      className="p-2 bg-slate-200 text-black"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
}

const Select = ({ value, onChange, options }: SelectProps) => {
  return (
    <select
      className="p-2 bg-slate-200 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
