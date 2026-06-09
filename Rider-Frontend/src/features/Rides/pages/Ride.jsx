import React, { useContext, useEffect, useState } from "react";

import BottomSheet from "../component/BottomSheet";
import LocationForm from "../component/LocationForm";
import LocationSearch from "../component/LocationSearch";
import VehicleOptions from "../component/VehicleOptions";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";

import useLocationSearch from "../Hooks/useLocationSearch";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import useRideEstimates from "../Hooks/useRideEstimates";
import useCreateRide from "../Hooks/useCreateRide";
import useActiveRide from "../Hooks/useActiveRide";
import Map2 from "../component/Map2";
import { useRiderSocket } from "../Hooks/useRiderSocket";
import RideStarted from "../component/RideStarted";
import { userContext } from "../../../Context/UserContextProvider";
import { cancelRideByUserService } from "../Service/ride.api";
import { logout } from "../../auth/Service/auth.api";
import { IoMenu } from "react-icons/io5";

const Ride = () => {
    const [stage, setStage] = useState("loading");
    const [activeField, setActiveField] = useState("pickup");
    const { userData,openalert, setuserData, setLogin } = useContext(userContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // const [rideData, setRideData] = useState({
    //     rideId: "",

    //     pickup: {
    //         address: "",
    //         lat: null,
    //         lng: null,
    //     },

    //     destination: {
    //         address: "",
    //         lat: null,
    //         lng: null,
    //     },

    //     distanceKm: 0,
    //     durationMin: 0,

    //     vehicle: null,
    //     vehicleType: "",
    //     fare: 0,

    //     driver: null,

    //     status: "",

    //     paymentMethod: "cash",
    //     paymentStatus: "pending",

    //     otp: "",

    //     acceptedAt: null,
    //     arrivedAt: null,
    //     startedAt: null,
    //     completedAt: null,
    //     cancelledAt: null,
    // })


    const [rideData, setRideData] = useState({
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

        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        captainToPickupRoute: [],
        captainToPickupInfo: {
            distanceKm: 0,
            durationMin: 0,
        },
    })

    const { searchValue, suggestions, isSearching } = useLocationSearch({
        stage,
        activeField,
        rideData,
    })

    const { getRideEstimates, isRideSearching, vehicleOptions } = useRideEstimates()

    const updateRideData = (key, value) => {
        setRideData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const { getCurrentLocation, isLocationLoading } = useCurrentLocation(setRideData, setStage)


    const { createRide, isRideCreating } = useCreateRide()

    const { getActiveRide, isActiveRideLoading } = useActiveRide();

    useRiderSocket({ setRideData, setStage })

    const getStageFromRideStatus = (status) => {
        if (status === "looking") {
            return "looking"
        }

        if (status === "accepted" || status === "arrived") {
            return "waiting"
        }

        if (status === "started") {
            return "riding"
        }

        if (status === "no_captain_found") {
            return "confirm"
        }

        return "location"
    }

    useEffect(() => {
        const checkActiveRide = async () => {
            const ride = await getActiveRide()

            if (!ride) {
                setStage("location")
                return
            }

            setRideData((prev) => ({
                ...prev,
                ...ride,

                vehicle: {
                    ...prev.vehicle,
                    ...ride.vehicle,
                },
            }))

            setStage(getStageFromRideStatus(ride.status))
        }

        checkActiveRide()
    }, [])

    const handleLogout = async () => {
        try {
            await logout()

            setuserData(null)
            setLogin(false)

            openalert("Success", "Logout successfully")

            navigate("/login",{ replace: true })
        } catch (error) {
            setuserData(null)
            setLogin(false)

            navigate("/login",{ replace: true })
        }
    }

    const updateLocationText = (field, value) => {
        setRideData((prev) => ({
            ...prev,
            [field]: {
                address: value,
                lat: null,
                lng: null,
            }
        }))
    }

    const selectLocation = (location) => {
        setRideData((prev) => ({
            ...prev,
            [activeField]: {
                address: location.fullAddress || location.address || location.title,
                lat: location.lat,
                lng: location.lng,
            },
        }))

        setStage("location")
    }

    const findTrip = async () => {
        const options = await getRideEstimates(
            rideData.pickup,
            rideData.destination
        );

        if (options?.length > 0) {
            setStage("vehicle")
        }
    }

    const selectVehicle = (vehicle) => {
        setRideData((prev) => ({
            ...prev,
            vehicle: vehicle,
            vehicleType: vehicle.type,
            fare: vehicle.fare,
            distanceKm: vehicle.distanceKm,
            durationMin: vehicle.durationMin,
        }));

        setStage("confirm");
    };

    useEffect(() => {

    }, [rideData]);


    const confirmRide = async () => {
         if (isRideCreating) return

        const payload = {
            pickup: rideData.pickup,
            destination: rideData.destination,

            distanceKm: rideData.distanceKm || rideData.vehicle?.distanceKm || 0,
            durationMin: rideData.durationMin || rideData.vehicle?.durationMin || 0,

            vehicle: {
                type: rideData.vehicle?.type,
                capacity: rideData.vehicle?.capacity,
            },

            fare: rideData.fare || rideData.vehicle?.fare,
            paymentMethod: "cash",
        };

        const data = await createRide(payload);

        if (!data) return;

        setRideData((prev) => ({
            ...prev,
            status: data.ride.status,
            rideId: data.ride._id,
        }));

        setStage("looking");
    };

    const resetRideData = () => {
        setRideData({
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

            acceptedAt: null,
            arrivedAt: null,
            startedAt: null,
            completedAt: null,
            cancelledAt: null,

            captainToPickupRoute: [],
            captainToPickupInfo: {
                distanceKm: 0,
                durationMin: 0,
            },
        })
    }

    const [isRideCancelling, setIsRideCancelling] = useState(false)

   const handleCancelRide = async () => {
    try {
        if (isRideCancelling) return

        setIsRideCancelling(true)

        const rideId = rideData._id || rideData.rideId

        if (!rideId) return

        await cancelRideByUserService({
            rideId,
            cancelReason: "Cancelled by rider",
        })

        resetRideData()

        setStage("location")

    } catch (error) {
        openalert(
            "Error",
            error.response?.data?.message || "Failed to cancel ride"
        )
    } finally {
        setIsRideCancelling(false)
    }
}


    const isCaptainTracking =
        ["accepted", "arrived", "started"].includes(rideData.status) &&
        rideData.captain?.location?.coordinates?.length === 2

    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">

            {/* Map  */}
            <div className="absolute inset-0 z-0 bg-[#e5e5e5]">
                {/* <Map /> */}

                <Map2
                    routeCoordinates={
                        isCaptainTracking
                            ? rideData.captainToPickupRoute
                            : rideData.vehicle?.routeCoordinates || []
                    }
                    currentLocation={
                        isCaptainTracking
                            ? rideData.captain?.location
                            : null
                    }
                    pickup={isCaptainTracking ? rideData.pickup : null}
                    vehicleType={rideData.vehicle?.type || "bike"}
                    showVehicleMarker={isCaptainTracking}
                />
            </div>
        
            {/* Small top gradient */}
            <div className="fixed top-0 left-0 right-0 z-[9999] h-[125px] bg-gradient-to-b from-white/85 via-white/35 to-transparent px-4 pt-4 pointer-events-none">
                <div className="max-w-[430px] mx-auto pointer-events-auto">
                    <div className="rounded-[30px] bg-[#111217]/95 text-white shadow-[0_20px_55px_rgba(0,0,0,0.32)] border border-white/10 backdrop-blur-xl px-3 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-[20px] bg-white text-gray-950 flex items-center justify-center font-extrabold text-base shrink-0">
                                {userData.fullname?.firstname?.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.12em]">
                                    Good morning
                                </p>

                                <h1 className="text-[17px] font-extrabold text-white leading-tight truncate mt-0.5">
                                    {userData.fullname?.firstname} 👋
                                </h1>

                                <p className="text-[12px] text-white/55 mt-0.5 truncate">
                                    Where are you going today?
                                </p>
                            </div>

                            <div className="relative shrink-0">
                                <button
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    className="w-12 h-12 rounded-[20px] bg-white/10 text-white flex items-center justify-center text-[24px] active:scale-95 transition"
                                >
                                    <IoMenu />
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 top-14 w-40 rounded-2xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden">
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false)
                                                handleLogout()
                                            }}
                                            className="w-full px-4 py-3 text-left text-sm font-semibold text-gray-900 active:bg-gray-100 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Bottom Part*/}
            <BottomSheet stage={stage}>
                {stage === "location" && (
                    <LocationForm
                        rideData={rideData}
                        updateLocationText={updateLocationText}
                        setStage={setStage}
                        setActiveField={setActiveField}
                        findTrip={findTrip}
                        isRideSearching={isRideSearching}
                    />
                )}

                {stage === "search" && (
                    <LocationSearch
                        activeField={activeField}
                        value={searchValue}
                        updateLocationText={updateLocationText}
                        suggestions={suggestions}
                        isSearching={isSearching}
                        onSelect={selectLocation}
                        onClose={() => setStage("location")}
                        getCurrentLocation={getCurrentLocation}
                        isLocationLoading={isLocationLoading}

                    />
                )}

                {stage === "vehicle" && (
                    <VehicleOptions
                        onSelectVehicle={selectVehicle}
                        onEdit={() => setStage("location")}
                        vehicleOptions={vehicleOptions}
                    />
                )}

                {stage === "confirm" && (
                    <ConfirmRide
                        rideData={rideData}
                        onBack={() => setStage("vehicle")}
                        onConfirm={confirmRide}
                        isRideCreating={isRideCreating}
                    />
                )}

                {stage === "looking" && (
                    <LookingForDriver rideData={rideData} />
                )}

                {stage === "waiting" && (
                    <WaitingForDriver
                        rideData={rideData}
                        onCancelRide={handleCancelRide}
                        isRideCancelling={isRideCancelling}
                    />
                )}

                {stage === "riding" && (
                    <RideStarted rideData={rideData} />
                )}
            </BottomSheet>
        </div>
    );
};

export default Ride;