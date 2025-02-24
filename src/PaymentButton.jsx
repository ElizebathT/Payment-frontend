import React from "react";
import axios from "axios";


const PaymentButton = ({ amount }) => {

 
  
  const handlePayment = async () => {
    console.log("Clicke");
    
    try {
      const { data: order } = await axios.post("http://localhost:5000/payment/create-order", {
        amount,
      });
      console.log(order);
      

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use test key from Razorpay
        amount: order.amount,
        currency: order.currency,
        name: "Test Merchant",
        description: "Payment for order",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post("http://localhost:5000/payment/verify-payment", response);
            alert("Payment Successful!");
            console.log("Verification Response:", verifyRes.data);
          } catch (error) {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log("op",options);
      

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay SDK not available.");
      }
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default PaymentButton;
