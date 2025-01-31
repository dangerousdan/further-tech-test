import { format } from 'date-fns'
import { ValidationResponse } from '../utils/validate-request-time'

const formatDate = 'E do MMM yyyy HH:mm'

export default function ResponseData({
  response,
}: {
  response: ValidationResponse
}) {
  if (response?.error) {
    return (
      <div className="col-span-9 py-2">
        {response?.error && <div>{response.error}</div>}
      </div>
    )
  }

  if (!response.actualRefundRequestTime) {
    return null
  }

  return (
    <div className="col-span-10 p-2 grid grid-cols-2 gap-2 border border-gray-300 rounded">
      <div className="flex gap-2">
        <div>Approval hours:</div>
        <div>{response.approvalTimeLimit}</div>
      </div>
      <div className="flex gap-2">
        <div>Adjusted refund request time:</div>
        <div>{format(response.actualRefundRequestTime!, formatDate)}</div>
      </div>
      <div className="flex gap-2">
        <div>Refund request time:</div>
        <div>{format(response.refundRequestTime!, formatDate)}</div>
      </div>
      <div className="flex gap-2">
        <div>Latest approval time:</div>
        <div>{format(response.latestApprovalTime!, formatDate)}</div>
      </div>
    </div>
  )
}
