import { useState } from "react";
import { getCurrentLocationApi } from "../Service/location.api";

const useCurrentLocation = (setRideData,setStage) => {
    const [isLocationLoading, setIsLocationLoading] = useState(false)

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    setIsLocationLoading(true);

                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

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
                    }));

                    setStage("location");
                } catch (error) {
                    alert("Unable to fetch current location");
                } finally {
                    setIsLocationLoading(false)
                }
            },
            () => {
                alert("Please allow location permission");
            }
        );
    };

    return {
        getCurrentLocation,
        isLocationLoading,
    };
};

export default useCurrentLocation;