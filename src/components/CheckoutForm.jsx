// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/urls';

// // ✅ Load Stripe with your Public Key
// const stripePromise = loadStripe('pk_test_51QunfA6YpJqH35xzYVi22HppuBM8Fkgqt7IzYwaJrw7uc5hfGGFcm8e75W9RmOqj52Ah90fo1tzi27MElqz19Kmx00K5y5QMtc'); // Replace with your Stripe public key

// // ✅ Main Payment Component
// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate=useNavigate()
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       // ✅ 1. Create Payment Intent from backend
//       const { data } = await axios.post('https://payment-backend-sq6x.onrender.com/stripe/checkout', {}, { headers: { 'Content-Type': 'application/json' },withCredentials: true });

//       // ✅ 2. Confirm Card Payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//         setPaymentSuccess(null);
//       } 
//       else {
//         if (result.paymentIntent.status === 'succeeded') {             
//           setPaymentSuccess('💰 Payment Successful!');
//           setError(null);          
//           navigate('/success')
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Payment failed');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-lg space-y-6">
//   <h2 className="text-3xl font-semibold text-center text-gray-800">Secure Payment</h2>

//   <div className="space-y-2">
//     <label className="text-sm font-medium text-gray-700">Card Details</label>
//     <div className="p-3 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
//       <CardElement className="p-1 focus:outline-none" />
//     </div>
//   </div>

//   <button
//     type="submit"
//     disabled={!stripe || isProcessing}
//     className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all ${
//       isProcessing
//         ? 'bg-gray-400 cursor-not-allowed'
//         : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
//     }`}
//   >
//     {isProcessing ? (
//       <span className="flex justify-center items-center space-x-2">
//         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//         </svg>
//         <span>Processing...</span>
//       </span>
//     ) : (
//       'Pay $50.00'
//     )}
//   </button>

//   {error && <p className="text-red-600 text-center">{error}</p>}
//   {paymentSuccess && <p className="text-green-600 text-center">{paymentSuccess}</p>}

//   <p className="text-xs text-gray-500 text-center">🔒 Your payment is encrypted and secure.</p>
// </form>

//   );
// };

// // ✅ Stripe Elements Wrapper
// const StripePayment = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default StripePayment;


import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}