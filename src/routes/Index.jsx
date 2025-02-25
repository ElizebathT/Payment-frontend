import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Success from '../components/Success'
import StripePayment from '../components/CheckoutForm'
import CheckoutForm from '../components/CheckoutForm'

const Index = () => {  
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CheckoutForm/>}/>
                <Route path="/success" element={<Success/>}/>
            </Routes>
        </BrowserRouter> 
        
    </div>
  )
}

export default Index