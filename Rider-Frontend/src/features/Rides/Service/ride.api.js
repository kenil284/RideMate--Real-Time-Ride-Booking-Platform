import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getRideEstimateApi = async ({ pickup, destination }) => {
    const response = await axios.get(`${API_URL}/api/location/get-ride-estimate`, {
        params: {
            pickupLat: pickup.lat,
            pickupLng: pickup.lng,
            destinationLat: destination.lat,
            destinationLng: destination.lng,
        },
        withCredentials: true
    });

    return response.data
};

export const createRideApi = async ({
    pickup,
    destination,
    distanceKm,
    durationMin,
    vehicle,
    fare,
    paymentMethod, }) => {

    const response = await axios.post(`${API_URL}/api/ride/create-ride`, {
        pickup,
        destination,
        distanceKm,
        durationMin,
        vehicle,
        fare,
        paymentMethod
    }, {
        withCredentials: true
    })

    return response.data

}

export const getActiveRideApi = async () => {
    const response = await axios.get(`${API_URL}/api/ride/get-active-ride`, {
        withCredentials: true,
    });

    return response.data;
};