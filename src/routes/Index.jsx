import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'
import Success from '../components/Success'
import StripePayment from '../components/CheckoutForm'

const Index = () => {  
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StripePayment/>}/>
                <Route path="/success" element={<Success/>}/>
            </Routes>
        </BrowserRouter> 
        
    </div>
  )
}

export default Index