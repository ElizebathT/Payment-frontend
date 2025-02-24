import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from './components/CheckoutForm.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './routes/Index.jsx'

const stripePromise=loadStripe('pk_test_51QunfA6YpJqH35xzYVi22HppuBM8Fkgqt7IzYwaJrw7uc5hfGGFcm8e75W9RmOqj52Ah90fo1tzi27MElqz19Kmx00K5y5QMtc')

const options={
  mode:'payment',
  currency:'usd',
  amount:500
}
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <Elements stripe={stripePromise} options={options}>
    <Index />
    {/* <CheckoutForm/> */}
    </Elements> 
  </StrictMode>
  </QueryClientProvider>
)
