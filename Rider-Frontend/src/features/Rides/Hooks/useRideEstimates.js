import { useState } from "react";
import { getRideEstimateApi } from "../Service/ride.api";

const useRideEstimates = () => {
    const [isRideSearching, setIsRideSearching] = useState(false)
    const [vehicleOptions, setVehicleOptions] = useState([])

    const getRideEstimates = async (pickup, destination) => {
        try {
            setIsRideSearching(true);

            const data = await getRideEstimateApi({
                pickup,
                destination,
            });

            setVehicleOptions(data.vehicleOptions || [])

            const options = data.vehicleOptions || []

            setVehicleOptions(options);

            return options;

        } catch (error) {
            setVehicleOptions([])
        } finally {
            setIsRideSearching(false)
        }
    };

    return {
        getRideEstimates,
        vehicleOptions,
        isRideSearching,
    };
};

export default useRideEstimates;