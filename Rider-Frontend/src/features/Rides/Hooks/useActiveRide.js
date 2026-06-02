import { useContext, useState } from "react";
import { userContext } from "../../../Context/UserContextProvider";
import { getActiveRideApi } from "../Service/ride.api";


const useActiveRide = () => {

    const [isActiveRideLoading, setIsActiveRideLoading] = useState(false);
    const [activeRide, setActiveRide] = useState(null);

    const { openalert } = useContext(userContext);

    const getActiveRide = async () => {
        try {
            setIsActiveRideLoading(true)

            const data = await getActiveRideApi()

            setActiveRide(data.activeRide)

            return data.activeRide

        } catch (error) {

            openalert("Error", "Failed to fetch active ride")

            return null;
            
        } finally {
            setIsActiveRideLoading(false);
        }
    };

    return {
        getActiveRide,
        activeRide,
        isActiveRideLoading,
    };
};

export default useActiveRide;