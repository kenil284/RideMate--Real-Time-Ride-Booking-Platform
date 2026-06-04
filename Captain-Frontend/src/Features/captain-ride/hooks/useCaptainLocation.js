import { useEffect, useState } from "react";
import { updateCaptainLocationService } from "../services/captainLocation.service";

export const useCaptainLocation = ({ isOnline }) => {
    const [lastLocation, setLastLocation] = useState(null);

    const getCurrentLocation = (successCallback) => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            successCallback,
            () => {
                alert("Location cannot be fetched. Please allow location permission.");
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000,
            }
        )
    }

    useEffect(() => {
        if (!isOnline) return;

        let intervalId;

        const updateLocation = () => {
            getCurrentLocation(async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                await updateCaptainLocationService({ lat, lng });

                setLastLocation({ lat, lng });

                console.log("Captain location updated:", lat, lng);
            })
        }

        // first time immediately
        updateLocation();

        // then every 7 seconds
        intervalId = setInterval(updateLocation, 7000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isOnline]);

    return {
        lastLocation
    }
}