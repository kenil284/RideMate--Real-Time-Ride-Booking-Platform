import axios from "axios"

export const getTrackingData = async (trackingToken)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ride/tracking/${trackingToken}`)

    return res.data
}