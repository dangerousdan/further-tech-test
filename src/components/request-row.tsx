import { useEffect, useState } from 'react'
import clsx from 'clsx'
import InputField from '~/components/input-field'
import ResponseData from '~/components/response-data'
import SelectField from '~/components/select-field'
import { validateRequest } from '~/services/validate-request'
import type { WebRequest } from '~/utils/convert-request-type'
import type { ValidationResponse } from '~/utils/validate-request-time'

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
        value={request.location}
        onChange={changeField('location')}
      />
      <InputField
        value={request.signupDateStr}
        onChange={changeField('signupDateStr')}
      />
      <SelectField
        options={['phone', 'webapp']}
        value={request.source}
        onChange={changeField('source')}
      />
      <InputField
        value={request.investmentDateStr}
        onChange={changeField('investmentDateStr')}
      />
      <InputField
        value={request.investmentTimeStr}
        onChange={changeField('investmentTimeStr')}
      />
      <InputField
        value={request.refundRequestDateStr}
        onChange={changeField('refundRequestDateStr')}
      />
      <InputField
        value={request.refundRequestTimeStr}
        onChange={changeField('refundRequestTimeStr')}
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
