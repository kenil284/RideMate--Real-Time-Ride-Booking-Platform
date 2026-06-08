import { useContext, useState } from "react";
import { getRideEstimateApi } from "../Service/ride.api";
import { userContext } from "../../../Context/UserContextProvider";

const useRideEstimates = () => {
    const [isRideSearching, setIsRideSearching] = useState(false)
    const [vehicleOptions, setVehicleOptions] = useState([])

    const { openalert } = useContext(userContext)

    const getRideEstimates = async (pickup, destination) => {
        try {
            setIsRideSearching(true);

            const data = await getRideEstimateApi({
                pickup,
                destination,
            });

            const options = data.vehicleOptions || []

            setVehicleOptions(options);

            return options;

        } catch (error) {

            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to fetch ride options";
                
            openalert("Error", message)

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