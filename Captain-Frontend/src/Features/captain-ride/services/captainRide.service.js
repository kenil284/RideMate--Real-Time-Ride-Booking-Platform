import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL



export const acceptRideService = async (rideId) => {
  const res = await axios.put(
    `${BASE_URL}/api/ride/accept/${rideId}`,
    {},
    {
      withCredentials: true,
    }
  )

  return res.data
}

export const getCaptainActiveRideService = async () => {
    const res = await axios.get(`${BASE_URL}/api/ride/captain-active-ride`, {
        withCredentials: true,
    })

    return res.data.activeRide
}

export const getCaptainToPickupRouteService = async ({ rideId,currentLat,currentLng,pickupLat,pickupLng,vehicleType,}) => {
    const res = await axios.get(`${BASE_URL}/api/map/get-toPickup-route`, {
        params: {
            rideId,
            currentLat,
            currentLng,
            pickupLat,
            pickupLng,
            vehicleType,
        },
        withCredentials: true,
    })

    return res.data
}

export const startRideService = async ({ rideId, otp }) => {
    const res = await axios.post(
        `${BASE_URL}/api/ride/start/${rideId}`,
        { otp },
        {
            withCredentials: true,
        }
    )

    return res.data
}

export const getCaptainToDestinationRouteService = async ({currentLat,currentLng,destinationLat,destinationLng,vehicleType}) => {
    const res = await axios.get(`${BASE_URL}/api/map/get-toDestination-route`, {
        params: {
            currentLat,
            currentLng,
            destinationLat,
            destinationLng,
            vehicleType,
        },
        withCredentials: true,
    })

    return res.data
}

export const completeRideService = async (rideId) => {
    const res = await axios.post(`${BASE_URL}/api/ride/complete/${rideId}`,{},
        {
            withCredentials: true,
        }
    )

    return res.data
}

export const cancelRideByCaptainService = async ({ rideId }) => {
    const res = await axios.post(
        `${BASE_URL}/api/ride/cancel/captain/${rideId}`,
        {},
        {
            withCredentials: true,
        }
    )

    return res.data
}