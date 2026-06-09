import { useEffect, useState } from "react";
import BottomSheet from "../component/BottomSheet";
import CaptainHeader from "../component/CaptainHeader";
import LookingForRide from "../component/LookingForRide";
import { useCaptainDashboard } from "../hooks/useCaptainDashboard";
import { useCaptainSocket } from "../hooks/useCaptainSocket";
import { useCaptainAvailability } from "../hooks/useCaptainAvailability";
import { useCaptainLocation } from "../hooks/useCaptainLocation";
import RideRequest from "../component/RideRequest";
import { useContext } from "react";
import { captainContext } from "../../../Context/CaptainContext";
import { acceptRideService, cancelRideByCaptainService, completeRideService, startRideService } from "../services/captainRide.service";
import { useCaptainActiveRide } from "../hooks/useCaptainActiveRide";
import { useCaptainPickupRoute } from "../hooks/useCaptainPickupRoute";
import Map2 from "../component/Map2";
import AcceptedRide from "../component/AcceptedRide";
import CaptainOtpBox from "../component/CaptainOtpBox";
import ActiveRideHeader from "../component/ActiveRideHeader";
import { useCaptainDestinationRoute } from "../hooks/useCaptainDestinationRoute";
import NavigatingRide from "../component/NavigatingRide";
import { useNavigate } from "react-router-dom"
import { logout } from "../../auth/services/auth.api";
import { stopRideRequestSound } from "../services/notificationSound.service";


const CaptainHome = () => {

    const { setCaptainData, setCaptainLogin, captainData, openalert } = useContext(captainContext);
    const navigate = useNavigate()

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
    const [isStartingRide, setIsStartingRide] = useState(false)

    useCaptainActiveRide({ setCurrentRide, setStage })



    const { isOnline, isUpdating, toggleAvailability } = useCaptainAvailability();

    const { socketstate } = useCaptainSocket({ isOnline, setCurrentRide, setRequests, setStage });

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

    const handleLogout = async () => {
        try {
            await logout()

            setCaptainData(null)
            setCaptainLogin(false)

            openalert("Success", "Logout successfully")

            navigate("/login", { replace: true })
        } catch (error) {
            setCaptainData(null)
            setCaptainLogin(false)

            navigate("/login", { replace: true })
        }
    }

    const [acceptingRide, setAcceptingRide] = useState(false)

    const handleAcceptRide = async (ride) => {
        try {
            if (acceptingRide) return

            setAcceptingRide(true)

            const data = await acceptRideService(ride._id)

            setCurrentRide(data.ride)
            setRequests([])
            setStage("accepted")

            stopRideRequestSound()

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
        finally {
            setAcceptingRide(false)
        }
    }


    const onStartRide = async (otp) => {
        try {
            setIsStartingRide(true)

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
        } finally {
            setIsStartingRide(false)
        }
    }

    const isAvailabilityDisabled =
        stage === "accepted" ||
        stage === "otp" ||
        stage === "navigating"

    const handleCancelRide = (ride) => {
        setRequests((prev) => {
            const updatedRequests = prev.filter((item) => item._id !== ride._id)

            stopRideRequestSound()

            if (updatedRequests.length === 0) {
                setStage("looking")
            }

            return updatedRequests
        })
    }

    const [isCurrentRideCancelling, setIsCurrentRideCancelling] = useState(false)


    const handleCurrentCancelRide = async () => {
        try {
            if (isCurrentRideCancelling) return

            setIsCurrentRideCancelling(true)

            const rideId = currentRide?._id

            if (!rideId) return

            const data = await cancelRideByCaptainService({
                rideId
            })

            setCurrentRide(null)
            setStage("looking")

            openalert("Success", data?.message || "Ride cancelled successfully")

        } catch (error) {
            openalert(
                "Error",
                error.response?.data?.message || "Failed to cancel ride"
            )
        } finally {
            setIsCurrentRideCancelling(false)
        }
    }

    // useEffect(() => {
    //     console.log("Captain current location:", captainCurrentLocation)
    //     console.log("Last location:", lastLocation)
    //     console.log("Pickup location:", currentRide?.pickup)
    //     console.log("Captain route:", captainRoute)
    // }, [captainCurrentLocation, lastLocation, currentRide, captainRoute])

    const mapRoute =
        stage === "navigating"
            ? captainDestinationRoute
            : stage === "accepted" || stage === "otp"
                ? captainRoute
                : []

    const mapLocation =
        stage === "navigating"
            ? captainDestinationLocation
            : stage === "accepted" || stage === "otp"
                ? captainCurrentLocation
                : lastLocation

    const mapTarget =
        stage === "navigating"
            ? currentRide?.destination
            : stage === "accepted" || stage === "otp"
                ? currentRide?.pickup
                : null


    const [isRideCompleting, setIsRideCompleting] = useState(false)
    const handleCompleteRide = async () => {
    try {
        if (isRideCompleting) return

        setIsRideCompleting(true)

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
    } finally {
        setIsRideCompleting(false)
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
                    vehicleType={currentRide?.vehicle?.type || captainData?.vehicle?.vehicleType || "bike"}
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
                    onLogout={handleLogout}
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
                        acceptingRide={acceptingRide}
                    />
                )}

                {stage === "accepted" && (
                    <AcceptedRide
                        ride={currentRide}
                        onArrived={() => setStage("otp")}
                        onCancel={handleCurrentCancelRide}
                        isCurrentRideCancelling={isCurrentRideCancelling}
                    />
                )}

                {stage === "otp" && (
                    <CaptainOtpBox
                        ride={currentRide}
                        onBack={() => setStage("accepted")}
                        onStartRide={onStartRide}
                        isStartingRide={isStartingRide}
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
                        isRideCompleting={isRideCompleting}
                    />
                )}
            </BottomSheet>
        </div>
    );
};

export default CaptainHome;