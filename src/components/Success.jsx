import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { paymentVerifyAPI } from '../services/payments'
import { useSearchParams } from 'react-router-dom'

const Success = () => { 
  return (
    <div>
      <p>Success</p>
    </div>
  )
}

export default Success
