import axios from "axios"
import { BASE_URL } from "../utils/urls"


export const paymentIntentAPI=async()=>{
    const response=await axios.post('https://payment-backend-sq6x.onrender.com/stripe/checkout'
        ,{},
        {
            withCredentials:true,
        }
    )
    console.log(response);
    
    return response.data
}

export const paymentVerifyAPI=async()=>{
    const response=await axios.post('https://payment-backend-sq6x.onrender.com/stripe/webhook'
        ,{},{
            withCredentials:true,
        }
    )
    return response.data
}