import axios from "axios"
import { BASE_URL } from "../utils/urls"


export const paymentIntentAPI=async()=>{
    const response=await axios.post(`${BASE_URL}/stripe/checkout`
        ,{},
        {
            withCredentials:true,
        }
    )
    console.log(response);
    
    return response.data
}

export const paymentVerifyAPI=async()=>{
    const response=await axios.post(`${BASE_URL}/stripe/verify`
        ,{
            withCredentials:true,
        }
    )
    return response.data
}