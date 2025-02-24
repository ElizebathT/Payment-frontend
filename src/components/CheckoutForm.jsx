// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import {useMutation} from "@tanstack/react-query"
// import { paymentIntentAPI } from "../services/payments";
// import { BASE_URL } from "../utils/urls";

// const CheckoutForm=()=>{
    
//     const paymentMutation=useMutation({
//         mutationKey:["checkout"],
//         mutationFn:paymentIntentAPI
//     })
//     const stripe=useStripe()
//     const elements=useElements()
//     const [errorMessage,setErrorMessage]=useState(null)
//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         try{
//             const { error: submitError } = await elements.submit();
//             if (submitError) {
//                 setErrorMessage(submitError.message);
//                 return;
//             }

//             const paymentData = await paymentMutation.mutateAsync();
//             // paymentMutation.mutateAsync().then(async()=>{
//                 const {error}=await stripe.confirmPayment({
//                     elements,
//                     clientSecret:paymentData?.clientSecret,
//                     confirmParams:{
//                         return_url: 'http://localhost:5173/success',
//                     }
//                 })
//             //     setErrorMessage(error?.message)
//             // }).catch((e)=>console.log(e)
//             // )
//             if (error) {
//                 setErrorMessage(error.message);
//             }
//         }catch(error){
//             console.log("Stripe Error:", error); 
//             // setErrorMessage(error?.message)
//             setErrorMessage(error?.response?.data?.message || "An error occurred");
//         }
//     }
//     console.log(paymentMutation);
    
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                 <PaymentElement/>
//                 </div>
//                 {paymentMutation?.isPending && (
//                     console.log("Proccessing ")
//                 )}
//                 {paymentMutation?.isError && (
//                      console.log(mutation?.error?.response?.data?.message)
                     
//                 )}
//                 <button>
//                     Pay
//                 </button>
//                 {errorMessage && (
//                     <div>{errorMessage}</div>
//                 )}
//             </form>
//         </div>
//     )
// }

// export default CheckoutForm

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// ✅ Load Stripe with your Public Key
const stripePromise = loadStripe('pk_test_51QunfA6YpJqH35xzYVi22HppuBM8Fkgqt7IzYwaJrw7uc5hfGGFcm8e75W9RmOqj52Ah90fo1tzi27MElqz19Kmx00K5y5QMtc'); // Replace with your Stripe public key

// ✅ Main Payment Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // ✅ 1. Create Payment Intent from backend
      const { data } = await axios.post('https://payment-backend-sq6x.onrender.com/payment', {
        amount: 5000, // Amount in cents (e.g., $50.00)
        currency: 'usd',
      });

      // ✅ 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setPaymentSuccess(null);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setPaymentSuccess('💰 Payment Successful!');
          setError(null);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Stripe Payment</h2>
      <CardElement className="p-2 border rounded-md" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        {isProcessing ? 'Processing...' : 'Pay $50.00'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {paymentSuccess && <p className="text-green-500 mt-3">{paymentSuccess}</p>}
    </form>
  );
};

// ✅ Stripe Elements Wrapper
const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment;
