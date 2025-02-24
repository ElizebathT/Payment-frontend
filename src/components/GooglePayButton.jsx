import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const GooglePayButton = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: 5000, // $50.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
  
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);
  

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on('paymentmethod', async (e) => {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          e.paymentMethod.id,
          { payment_method: e.paymentMethod.id },
          { handleActions: false }
        );

        if (error) {
          e.complete('fail');
          console.error(error);
        } else {
          e.complete('success');
          alert('Payment Successful!');
        }
      });
    }
  }, [paymentRequest, stripe]);

  return (
    <>
      {paymentRequest && (
        <button
          onClick={() => paymentRequest.show()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay with Google Pay
        </button>
      )}
    </>
  );
};

export default GooglePayButton;
