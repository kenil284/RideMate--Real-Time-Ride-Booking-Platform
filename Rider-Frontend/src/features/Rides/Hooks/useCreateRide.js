import { useContext, useState } from "react";
import { createRideApi } from "../Service/ride.api";
import { userContext } from "../../../Context/UserContextProvider";

const useCreateRide = () => {
    const [isRideCreating, setIsRideCreating] = useState(false)
    const [createdRide, setCreatedRide] = useState(null)

    const {openalert} = useContext(userContext)

    const createRide = async ({
        pickup,
        destination,
        distanceKm,
        durationMin,
        vehicle,
        fare,
        paymentMethod = "cash",
    }) => {
        try {
            setIsRideCreating(true);

            const data = await createRideApi({
                pickup,
                destination,
                distanceKm,
                durationMin,
                vehicle,
                fare,
                paymentMethod,
            });

            setCreatedRide(data.ride);

            return data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create ride";

            openalert("Error", message)

        } finally {
            setIsRideCreating(false);
        }
    };

    return {
        createRide,
        isRideCreating,
        createdRide
    };
};

export default useCreateRide