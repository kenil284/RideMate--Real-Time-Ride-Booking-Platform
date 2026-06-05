import { useEffect, useState } from "react";
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
import { acceptRideService } from "../services/captainRide.service";
import { useCaptainActiveRide } from "../hooks/useCaptainActiveRide";
import { useCaptainPickupRoute } from "../hooks/useCaptainPickupRoute";
import Map2 from "../component/Map2";
import AcceptedRide from "../component/AcceptedRide";
import CaptainOtpBox from "../component/CaptainOtpBox";
;


const CaptainHome = () => {

    const { setCaptainData, captainData } = useContext(captainContext);

    const [requests, setRequests] = useState([]);
    const [acceptedRide, setAcceptedRide] = useState(null)
    const [currentRide, setCurrentRide] = useState({
        _id: "",

        rider: null,
        captain: null,

        pickup: {
            address: "",
            lat: null,
            lng: null,
        },

        destination: {
            address: "",
            lat: null,
            lng: null,
        },

        distanceKm: 0,
        durationMin: 0,

        vehicle: {
            type: "",
            name: "",
            image: "",
            capacity: 1,
        },

        fare: 0,

        paymentMethod: "cash",
        paymentStatus: "pending",

        status: "",

        otp: "",

        cancelledBy: null,
        cancelReason: "",

        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,

        createdAt: null,
        updatedAt: null,
    })




    const [stage, setStage] = useState("looking");

    useCaptainActiveRide({ setCurrentRide, setStage })

    const { socketstate } = useCaptainSocket({ setRequests, setStage });

    const { isOnline, isUpdating, toggleAvailability } = useCaptainAvailability();

    const { dashboard, isDashboardLoading } = useCaptainDashboard();

    const { lastLocation } = useCaptainLocation({ isOnline })

    const { captainCurrentLocation, captainRoute, routeInfo } = useCaptainPickupRoute({ stage, currentRide })

    const handleAcceptRide = async (ride) => {
        try {
            const data = await acceptRideService(ride._id)

            setCurrentRide(data.ride)
            setRequests([])
            setStage("accepted")

            setCaptainData((prev) => ({
                ...prev,
                isAvailable: false,
                currentRide: data.ride._id,
            }))

        } catch (error) {
            console.log(
                error.response?.data?.message || error.message
            )
        }
    }

    const isAvailabilityDisabled =
        stage === "accepted" ||
        stage === "otp" ||
        stage === "navigating"

    const handleCancelRide = (ride) => {
        setRequests((prev) => {
            const updatedRequests = prev.filter((item) => item._id !== ride._id)

            if (updatedRequests.length === 0) {
                setStage("looking")
            }

            return updatedRequests
        })
    }

    // useEffect(() => {
    //     console.log("Captain current location:", captainCurrentLocation)
    //     console.log("Last location:", lastLocation)
    //     console.log("Pickup location:", currentRide?.pickup)
    //     console.log("Captain route:", captainRoute)
    // }, [captainCurrentLocation, lastLocation, currentRide, captainRoute])



    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#eef1f4]">
                {/* <Map
                    routeCoordinates={captainRoute}
                    currentLocation={captainCurrentLocation}
                    pickup={currentRide?.pickup}
                /> */}
                <Map2
                    routeCoordinates={captainRoute || []}
                    currentLocation={captainCurrentLocation || lastLocation}
                    pickup={currentRide?.pickup}
                    vehicleType={currentRide?.vehicleType || "bike"}
                />
            </div>

            <CaptainHeader
                username={captainData?.fullname?.firstname || "Captain"}
                isOnline={isOnline}
                isUpdating={isUpdating}
                onToggle={toggleAvailability}
                isAvailabilityDisabled={isAvailabilityDisabled}
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

                {stage === "accepted" && (
                    <AcceptedRide
                        ride={currentRide}
                        routeInfo={routeInfo}
                        onArrived={() => setStage("otp")}
                    />
                )}

                {stage === "otp" && (
                    <CaptainOtpBox
                        ride={currentRide}
                        onBack={() => setStage("accepted")}
                        onStartRide={(otp) => {
                            console.log("OTP entered:", otp)
                        }}
                    />
                )}
            </BottomSheet>
        </div>
    );
};

export default CaptainHome;