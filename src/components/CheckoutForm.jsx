// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements, LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js';
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
//   const appearance = {
//       theme: 'night', // You can customize this (e.g., 'flat', 'night', etc.)
//     };
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

//  </form>

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



import React, { useState, useEffect } from "react";

const CheckoutForm = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <CheckoutForm />
  );
}