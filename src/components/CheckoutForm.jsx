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


