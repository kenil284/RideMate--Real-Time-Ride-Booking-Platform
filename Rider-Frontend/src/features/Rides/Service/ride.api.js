import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getRideEstimateApi = async ({ pickup, destination }) => {
    const response = await axios.get(`${API_URL}/api/ride/get-ride-estimate`, {
        params: {
            pickupLat: pickup.lat,
            pickupLng: pickup.lng,
            destinationLat: destination.lat,
            destinationLng: destination.lng,
        },
        withCredentials: true,
    });

    return response.data
};