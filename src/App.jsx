// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GooglePayButton from './components/GooglePayButton';

const stripePromise = loadStripe("pk_test_51QunfA6YpJqH35xzYVi22HppuBM8Fkgqt7IzYwaJrw7uc5hfGGFcm8e75W9RmOqj52Ah90fo1tzi27MElqz19Kmx00K5y5QMtc");

const App=()=>{
  return (
    <div>
    <Elements stripe={stripePromise}>      
      <GooglePayButton />
    </Elements>
    </div>
  );
}

export default App;


// import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import PaymentButton from './PaymentButton'

// function App() {
//   // const [count, setCount] = useState(0)

//   // return (
//   //   <>
//   //     <div>
//   //       <a href="https://vite.dev" target="_blank">
//   //         <img src={viteLogo} className="logo" alt="Vite logo" />
//   //       </a>
//   //       <a href="https://react.dev" target="_blank">
//   //         <img src={reactLogo} className="logo react" alt="React logo" />
//   //       </a>
//   //     </div>
//   //     <h1>Vite + React</h1>
//   //     <div className="card">
//   //       <button onClick={() => setCount((count) => count + 1)}>
//   //         count is {count}
//   //       </button>
//   //       <p>
//   //         Edit <code>src/App.jsx</code> and save to test HMR
//   //       </p>
//   //     </div>
//   //     <p className="read-the-docs">
//   //       Click on the Vite and React logos to learn more
//   //     </p>
//   //     <PaymentButton amount={500}/>
//   //   </>
//   // )
//   const [responseId,setResponseId]=React.useState("")
//   const [responseState,setResponseState]=React.useState([])

//   const loadScript=(src)=>{
//     return new Promise((resolve)=>{
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     })
//   }
//   const createRazorpayOrder=(amount)=>{
//     let data=JSON.stringify({
//       amount:amount*100,
//       currency:"INR"
//     })
//     let config={
//       method:"post",
//       maxBodyLength:Infinity,
//       url:"http://localhost:5000/",
//       headers:{
//         'Content-Type':"application/json"
//       },
//       data:data
//     }
//     axios:request(config)
//     .then((response)=>{
//       console.log(JSON.stringify(response.data));
      
//     })
//     .catch((error)=>{
//       console.log("error",error);
      
//     })
//   }
//   const handleRazorpayScreen=async(amount)=>{
//     const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
//     if(!res){
//       alert("error")
//       return;
//     }
//     const options={
//       key:REACT_APP_RAZORPAY_KEY_ID,
//       amount:amount,
//       name: "Test Merchant",
//       description: "Payment for order",
//       handler: function (response){
//         setResponseId(response.razorpay_payment_id)
//       },
//       prefill: {
//         name: "John Doe",
//         email: "johndoe@example.com",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     }
//     const paymentObject=new window.Razorpay(options)
//     paymentObject.open()
//   }
//   const paymentFetch=(e)=>{
//     e.preventDefault()
//     const paymentId=e.target.paymentId.value;
//     axios.get(`http://localhost:5000/payment/${paymentId}`)
//     .then((response)=>{
//       console.log(response.data);
//       setResponseState(response.data)
      
//     })
//     .catch((error)=>{
//       console.log(error);
      
//     })
//   }
//   return (
//     <div className="App">
//       <button onClick={()=>createRazorpayOrder(100)}>Pay</button>
//       {responseId && <p>{responseId}</p>}
//       <form onSubmit={paymentFetch}>
//         <input type="text" name="paymentId"/>
//         <button type="submit">Fetch</button>
//       </form>
//     </div>
//   )
// }

// export default App
