import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { paymentVerifyAPI } from '../services/payments'
import { useSearchParams } from 'react-router-dom'

const Success = () => {
  // const [searchParams]=useSearchParams()
  // const paymentIntentId=searchParams.get("payment_intent")
  
  const {data,isError,isLoading, isSuccess}=useQuery({
    queryKey:["verify-payment"],
    queryFn:()=>paymentVerifyAPI(paymentIntentId)
  })
  // console.log(data);
  
  return (
    <div>
      <p>Success</p>
    </div>
  )
}

export default Success
