import React, { useEffect, useState } from "react";

import BottomSheet from "../component/BottomSheet";
import LocationForm from "../component/LocationForm";
import LocationSearch from "../component/LocationSearch";
import VehicleOptions from "../component/VehicleOptions";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";
import Map from "../component/Map";

import useLocationSearch from "../Hooks/useLocationSearch";
import useCurrentLocation from "../Hooks/useCurrentLocation";
import useRideEstimates from "../Hooks/useRideEstimates";
import useCreateRide from "../Hooks/useCreateRide";
import useActiveRide from "../Hooks/useActiveRide";
import Map2 from "../component/Map2";
import { useRiderSocket } from "../Hooks/useRiderSocket";

const Ride = () => {
    const [stage, setStage] = useState("loading");
    const [activeField, setActiveField] = useState("pickup");

    const [rideData, setRideData] = useState({
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

        vehicle: null,
        vehicleType: "",
        fare: 0,

        driver: null,
        status: "",
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

    useRiderSocket()


    useEffect(() => {
        const checkActiveRide = async () => {
            const ride = await getActiveRide();

            if (!ride) {
                setStage("location");
                return;
            }

            setRideData((prev) => ({
                ...prev,
                rideId: ride._id,
                pickup: ride.pickup,
                destination: ride.destination,
                distanceKm: ride.distanceKm,
                durationMin: ride.durationMin,
                vehicle: ride.vehicle,
                vehicleType: ride.vehicle?.type || "",
                fare: ride.fare,
                driver: ride.captain,
                status: ride.status,
            }));

            if (ride.status === "looking") {
                setStage("looking");
            } else if (
                ride.status === "accepted" ||
                ride.status === "arrived" ||
                ride.status === "started"
            ) {
                setStage("waiting");
            } else {
                setStage("location");
            }
        };

        checkActiveRide();
    }, []);
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
        console.log("Updated rideData:", rideData);
    }, [rideData]);


    const confirmRide = async () => {
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




    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">

            {/* Map  */}
            <div className="absolute inset-0 z-0 bg-[#e5e5e5]">
                <Map />
                {/* <Map2/> */}
            </div>

            {/* Small top gradient */}
            <div className="fixed top-0 left-0 right-0 z-[9999] h-[130px] bg-gradient-to-b from-white/90 via-white/50 to-transparent px-4 pt-4 pointer-events-none">
                <div className="flex items-center justify-between rounded-2xl bg-white/85 backdrop-blur-md shadow-lg px-4 py-3 pointer-events-auto">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                            {("T").charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-[15px] font-semibold text-black leading-tight">
                                Good morning, {"Tirth"} 👋
                            </h1>

                            <p className="text-[12px] text-gray-500 mt-0.5">
                                Where are you going today?
                            </p>
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[22px] text-black active:scale-95 transition">
                        ☰
                    </button>

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
                    />
                )}

                {stage === "looking" && (
                    <LookingForDriver rideData={rideData} />
                )}

                {stage === "waiting" && (
                    <WaitingForDriver rideData={rideData} />
                )}
            </BottomSheet>
        </div>
    );
};

export default Ride;