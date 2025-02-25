import axios from "axios"
import { BASE_URL } from "../utils/urls"


export const paymentIntentAPI=async()=>{
    const response=await axios.post(`${BASE_URL}/stripe/checkout`
        // ,{
        //     subscriptionPlanId:planId,

        // },
        ,{},
        {
            withCredentials:true,
        }
    )
    console.log(response);
    
    return response.data
}

// export const paymentVerifyAPI=async(paymentId)=>{
//     const response=await axios.get(`${BASE_URL}/stripe/verify/${paymentId}`
export const paymentVerifyAPI=async()=>{
    const response=await axios.post(`${BASE_URL}/stripe/verify`
        // ,{
        //     subscriptionPlanId:planId,

        // },
        ,{
            withCredentials:true,
        }
    )
    console.log('response',response);
    
    return response.data
}