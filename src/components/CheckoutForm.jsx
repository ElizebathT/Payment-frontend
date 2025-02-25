import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/urls';

// ✅ Load Stripe with your Public Key
const stripePromise = loadStripe('pk_test_51QunfA6YpJqH35xzYVi22HppuBM8Fkgqt7IzYwaJrw7uc5hfGGFcm8e75W9RmOqj52Ah90fo1tzi27MElqz19Kmx00K5y5QMtc'); // Replace with your Stripe public key

// ✅ Main Payment Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // ✅ 1. Create Payment Intent from backend
      const { data } = await axios.post('https://payment-backend-sq6x.onrender.com/stripe/checkout', {}, { headers: { 'Content-Type': 'application/json' },withCredentials: true });

      // ✅ 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setPaymentSuccess(null);
      } 
      else {
        if (result.paymentIntent.status === 'succeeded') {             
          setPaymentSuccess('💰 Payment Successful!');
          setError(null);          
          navigate('/success')
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 border rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 space-y-6">
  <h2 className="text-3xl font-extrabold text-center text-blue-700">💳 Stripe Payment</h2>
  
  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg shadow-inner transition-all hover:border-blue-500 focus-within:border-blue-500">
    <CardElement className="p-2 focus:outline-none" />
  </div>

  <button
    type="submit"
    disabled={!stripe || isProcessing}
    className={`mt-4 w-full py-3 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-300 ${
      isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
    }`}
  >
    {isProcessing ? (
      <span className="flex justify-center items-center space-x-2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Processing...</span>
      </span>
    ) : (
      'Pay $50.00'
    )}
  </button>

  {error && <p className="text-red-600 text-center font-medium">{error}</p>}
  {paymentSuccess && <p className="text-green-600 text-center font-medium animate-pulse">{paymentSuccess}</p>}
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


