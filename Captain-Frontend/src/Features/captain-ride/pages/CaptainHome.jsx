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
import { acceptRideService, completeRideService, startRideService } from "../services/captainRide.service";
import { useCaptainActiveRide } from "../hooks/useCaptainActiveRide";
import { useCaptainPickupRoute } from "../hooks/useCaptainPickupRoute";
import Map2 from "../component/Map2";
import AcceptedRide from "../component/AcceptedRide";
import CaptainOtpBox from "../component/CaptainOtpBox";
import ActiveRideHeader from "../component/ActiveRideHeader";
import { useCaptainDestinationRoute } from "../hooks/useCaptainDestinationRoute";
import NavigatingRide from "../component/NavigatingRide";
;


const CaptainHome = () => {

    const { setCaptainData, captainData, openalert } = useContext(captainContext);

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

    const { nextInstruction, captainCurrentLocation, captainRoute, routeInfo, } = useCaptainPickupRoute({
        stage, currentRide,
        onSendLocation: ({ rideId, lat, lng }) => {
            if (!socketstate) return

            socketstate.emit("captain-location-update", {
                rideId,
                lat,
                lng,
            })
        },
    })

    const { captainDestinationLocation, captainDestinationRoute, destinationRouteInfo, destinationInstruction, } = useCaptainDestinationRoute({
        stage,
        currentRide,
    })

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


    const onStartRide = async (otp) => {
        try {
            const data = await startRideService({
                rideId: currentRide._id,
                otp,
            })
            openalert("Success", data.message)

            setCurrentRide(data.ride)
            setStage("navigating")
        } catch (error) {
            openalert(
                "Error",
                error.response?.data?.message || "Failed to start ride"
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

    const mapRoute = stage === "navigating"
        ? captainDestinationRoute
        : captainRoute

    const mapLocation = stage === "navigating"
        ? captainDestinationLocation
        : captainCurrentLocation

    const mapTarget = stage === "navigating"
        ? currentRide?.destination
        : currentRide?.pickup



    const handleCompleteRide = async () => {
        try {
            const data = await completeRideService(currentRide._id)

            setCurrentRide(null)
            setStage("looking")

            setCaptainData((prev) => ({
                ...prev,
                currentRide: null,
                totalRides: (prev.totalRides || 0) + 1,
            }))

            openalert("Success", data.message || "Ride completed successfully")

        } catch (error) {
            openalert(
                "Error",
                error.response?.data?.message || "Failed to complete ride"
            )
        }
    }

    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#eef1f4]">
                {/* <Map
                    routeCoordinates={captainRoute}
                    currentLocation={captainCurrentLocation}
                    pickup={currentRide?.pickup}
                /> */}
                <Map2
                    routeCoordinates={mapRoute}
                    currentLocation={mapLocation}
                    pickup={mapTarget}
                    vehicleType={currentRide?.vehicle?.type || "bike"}
                />
            </div>

            {isAvailabilityDisabled ? (
                <ActiveRideHeader
                    ride={currentRide}
                    routeInfo={routeInfo}
                    nextInstruction={nextInstruction}
                />
            ) : (
                <CaptainHeader
                    username={captainData?.fullname?.firstname || "Captain"}
                    isOnline={isOnline}
                    isUpdating={isUpdating}
                    onToggle={toggleAvailability}
                    isAvailabilityDisabled={isAvailabilityDisabled}
                />
            )}



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
                        onStartRide={onStartRide}
                    />
                )}

                {(stage === "accepted" || stage === "navigating") && (
                    <ActiveRideHeader
                        ride={currentRide}
                        routeInfo={
                            stage === "navigating"
                                ? destinationRouteInfo
                                : routeInfo
                        }
                        nextInstruction={
                            stage === "navigating"
                                ? destinationInstruction
                                : nextInstruction
                        }
                        stage={stage}
                    />
                )}

                {stage === "navigating" && (
                    <NavigatingRide
                        ride={currentRide}
                        onComplete={handleCompleteRide}
                    />
                )}
            </BottomSheet>
        </div>
    );
};

export default CaptainHome;