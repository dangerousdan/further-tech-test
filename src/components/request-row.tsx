import { useEffect, useState } from 'react'
import { WebRequest } from '../utils/convert-request-type'
import { validateRequest } from '../utils/validate-request'
import clsx from 'clsx'
import InputField from './input-field'
import SelectField from './select-field'

type RequestRowProps = {
  request: WebRequest
  setRequest: (request: WebRequest) => void
}

export default function RequestRow({ request, setRequest }: RequestRowProps) {
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
          'bg-green-600': isValid,
          'bg-red-800': !isValid,
        })}
      >
        {isValid ? 'true' : 'false'}
      </div>
    </>
  )
}
