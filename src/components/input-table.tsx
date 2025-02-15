import { useState } from 'react'
import TableHeader from '~/components/table-header'
import RequestRow from '~/components/request-row'
import type { WebRequest } from '~/utils/convert-request-type'
import { emptyRequest, initialRequestData } from '~/request-data'

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
    setRequests((request) => [...request, emptyRequest])
  }

  return (
    <div className="p-4 flex flex-col gap-4 text-xs">
      <div className="grid grid-cols-10 gap-1 w-full">
        <TableHeader name="Name" />
        <TableHeader name="Location" />
        <TableHeader name="Sign up date" />
        <TableHeader name="Request source" />
        <TableHeader name="Investment date" />
        <TableHeader name="Investment time" />
        <TableHeader name="Refund Request date" />
        <TableHeader name="Refund Request time" />
        <TableHeader name="Valid" />
        <TableHeader name="Toggle Extra Info" />

        {requests.map((request, i) => (
          <RequestRow key={i} request={request} setRequest={setRequest(i)} />
        ))}
      </div>
      <button onClick={addRow}>Add row</button>
    </div>
  )
}
