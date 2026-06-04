import { useState } from "react";
import BottomSheet from "../component/BottomSheet";
import CaptainHeader from "../component/CaptainHeader";
import LookingForRide from "../component/LookingForRide";
import Map from "../component/Map";
import { useCaptainDashboard } from "../hooks/useCaptainDashboard";
import { useCaptainSocket } from "../hooks/useCaptainSocket";
import { useCaptainAvailability } from "../hooks/useCaptainAvailability";
import { useCaptainLocation } from "../hooks/useCaptainLocation";
import RideRequest from "../component/RideRequest";
import { useContext } from "react";
import { captainContext } from "../../../Context/CaptainContext";
;


const CaptainHome = () => {

    const { captainData } = useContext(captainContext);

    const [requests, setRequests] = useState([]);

    const [stage, setStage] = useState("looking");

    const { socketstate } = useCaptainSocket({ setRequests, setStage });

    const { isOnline, isUpdating, toggleAvailability } = useCaptainAvailability();

    const { dashboard, isDashboardLoading } = useCaptainDashboard();

    const { lastLocation } = useCaptainLocation({ isOnline });

    const handleAcceptRide = (ride) => {
        console.log("Accepted ride:", ride);

        // later call accept ride API here
        setStage("accepted");
    };

    const handleCancelRide = (ride) => {
        setRequests((prev) =>
            prev.filter((item) => item._id !== ride._id)
        );

        if (requests.length <= 1) {
            setStage("looking");
        }
    };



    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#eef1f4]">
                <Map />
            </div>

            <CaptainHeader
                username={captainData?.fullname?.firstname || "Captain"}
                isOnline={isOnline}
                isUpdating={isUpdating}
                onToggle={toggleAvailability}
            />

            <BottomSheet
                stage={stage}
                contentKey={`${stage}-${isOnline}-${requests.length}`}
            >
                {stage === "looking" && (
                    <LookingForRide
                        dashboard={dashboard}
                        isOnline={isOnline}
                    />
                )}

                {stage === "requests" && (
                    <RideRequest
                        ride={requests[0]}
                        onAccept={handleAcceptRide}
                        onCancel={handleCancelRide}
                    />


                )}
            </BottomSheet>
        </div>
    );
};

export default CaptainHome;