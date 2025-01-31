import { useEffect, useState } from 'react'
import { WebRequest } from '../utils/convert-request-type'
import { validateRequest } from '../utils/validate-request'
import clsx from 'clsx'
import InputField from './input-field'
import SelectField from './select-field'
import { ValidationResponse } from '../utils/validate-request-time'
import ResponseData from './response-data'

type RequestRowProps = {
  request: WebRequest
  setRequest: (request: WebRequest) => void
}

export default function RequestRow({ request, setRequest }: RequestRowProps) {
  const [response, setResponse] = useState<ValidationResponse>({
    isValid: false,
    error: '',
  })

  const [showResults, setShowResults] = useState(false)
  const toggleResults = () => setShowResults(!showResults)

  const changeField = (name: keyof WebRequest) => (value: string) => {
    const newRequest = { ...request, [name]: value }
    setRequest(newRequest)
  }

  useEffect(() => {
    setResponse(validateRequest(request))
  }, [request])

  return (
    <>
      <InputField value={request.name} onChange={changeField('name')} />
      <SelectField
        options={['PST', 'CET', 'EST', 'GMT']}
        value={request.timezone}
        onChange={changeField('timezone')}
      />
      <InputField
        value={request.signupDate}
        onChange={changeField('signupDate')}
      />
      <SelectField
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
          'bg-green-600': response.isValid,
          'bg-red-800': !response.isValid,
        })}
      >
        {response.isValid ? 'true' : 'false'}
      </div>

      <button
        onClick={toggleResults}
        className="flex items-center justify-center cursor-pointer text-xs"
      >
        {showResults ? 'Hide' : 'Show'} Info
      </button>
      {showResults && <ResponseData response={response} />}
    </>
  )
}
