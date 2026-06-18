import { useState } from "react";
import { getCurrentLocationApi } from "../Service/location.api";

const useCurrentLocation = (setRideData, setStage, openalert) => {
    const [isLocationLoading, setIsLocationLoading] = useState(false)

    const showError = (message) => {
        if (openalert) {
            openalert("Error", message)
            return
        }
    }

    const getLocationErrorMessage = (error) => {
        if (error?.code === 1) {
            return "Location permission denied. Please allow location permission from browser settings."
        }

        if (error?.code === 2) {
            return "Location is not available. Please turn on GPS/location service."
        }

        if (error?.code === 3) {
            return "Location request timed out. Please try again."
        }

        return "Unable to get current location"
    }

    const getCurrentLocation = () => {
        if (isLocationLoading) return

        if (!navigator.geolocation) {
            showError("Your browser does not support location.")
            return
        }

        if (!window.isSecureContext) {
            showError("Location works only on HTTPS or localhost.")
            return
        }

        setIsLocationLoading(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude
                    const lng = position.coords.longitude

                    const location = await getCurrentLocationApi(lat, lng)

                    setRideData((prev) => ({
                        ...prev,
                        pickup: {
                            address:
                                location.fullAddress ||
                                location.address ||
                                location.title,
                            lat: location.lat,
                            lng: location.lng,
                        },
                    }))

                    setStage("location")
                } catch (error) {
                    showError("Unable to fetch current location")
                } finally {
                    setIsLocationLoading(false)
                }
            },
            (error) => {
                setIsLocationLoading(false)
                showError(getLocationErrorMessage(error))
            },
            {
                enableHighAccuracy: true,
                timeout: 12000,
                maximumAge: 0,
            }
        )
    }

    return {
        getCurrentLocation,
        isLocationLoading,
    }
}

export default useCurrentLocation;