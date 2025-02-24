import axios from "axios"

const BASE_URL="http://localhost:5000/stripe"

export const paymentIntentAPI=async()=>{
    const response=await axios.post(`${BASE_URL}/checkout`
        // ,{
        //     subscriptionPlanId:planId,

        // },
        // {
        //     withCredentials:true,
        // }
    )
    return response.data
}