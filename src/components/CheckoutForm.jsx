import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import {useMutation} from "@tanstack/react-query"
import { paymentIntentAPI } from "../services/payments";

const CheckoutForm=()=>{
    const paymentMutation=useMutation({
        mutationKey:["checkout"],
        mutationFn:paymentIntentAPI
    })
    const stripe=useStripe()
    const elements=useElements()
    const [errorMessage,setErrorMessage]=useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            paymentMutation.mutateAsync().then(async()=>{
                const {error}=await stripe.confirmPayment({
                    clientSecret:paymentMutation.data?.clientSecret,
                    confirmParams:{
                        return_url:'http://localhost:5173/',
                    }
                })
                setErrorMessage(error?.message)
            }).catch((e)=>console.log(e)
            )
        }catch(error){
            setErrorMessage(error?.message)
        }
    }
    console.log(paymentMutation);
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <PaymentElement/>
                </div>
                {paymentMutation?.isPending && (
                    console.log("Proccessing ")
                )}
                {paymentMutation?.isError && (
                     console.log(mutation?.error?.response?.data?.message)
                     
                )}
                <button>
                    Pay
                </button>
                {errorMessage && (
                    <div>{errorMessage}</div>
                )}
            </form>
        </div>
    )
}

export default CheckoutForm