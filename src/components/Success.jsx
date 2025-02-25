import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { paymentVerifyAPI } from '../services/payments'
import { useSearchParams } from 'react-router-dom'

const Success = () => {  
  const {data,isError,isLoading, isSuccess}=useQuery({
    queryKey:["verify-payment"],
    queryFn:()=>paymentVerifyAPI(paymentIntentId)
  })
  
  return (
    <div>
      <p>Success</p>
      {data.receipt_url}
    </div>
  )
}

export default Success
