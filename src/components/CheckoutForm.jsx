import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import {useMutation} from "@tanstack/react-query"
import { paymentIntentAPI } from "../services/payments";
import { BASE_URL } from "../utils/urls";

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
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                return;
            }

            const paymentData = await paymentMutation.mutateAsync();
            // paymentMutation.mutateAsync().then(async()=>{
                const {error}=await stripe.confirmPayment({
                    elements,
                    clientSecret:paymentData?.clientSecret,
                    confirmParams:{
                        return_url: '/success',
                    }
                })
            //     setErrorMessage(error?.message)
            // }).catch((e)=>console.log(e)
            // )
            if (error) {
                setErrorMessage(error.message);
            }
        }catch(error){
            console.log("Stripe Error:", error); 
            // setErrorMessage(error?.message)
            setErrorMessage(error?.response?.data?.message || "An error occurred");
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