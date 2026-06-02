import React, { useState } from "react";

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

const Ride = () => {
    const [stage, setStage] = useState("location");
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

    const { getRideEstimates, isRideSearching, vehicleOptions } = useRideEstimates();

    const updateRideData = (key, value) => {
        setRideData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const { getCurrentLocation, isLocationLoading } = useCurrentLocation(setRideData, setStage);

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

        if (options.length > 0) {
            setStage("vehicle")
        }
    }

    const selectVehicle = (vehicle) => {
        updateRideData("vehicle", vehicle);
        updateRideData("vehicleType", vehicle.type);
        updateRideData("fare", vehicle.price);

        setStage("confirm")
    }

    const confirmRide = () => {
        setStage("looking");

        setTimeout(() => {
            updateRideData("driver", {
                name: "Rahul",
                plate: "GJ05AB1234",
                rating: 4.9,
            });

            setStage("waiting");
        }, 20000)
    }


    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#e5e5e5]">
                <Map />
            </div>

            <div className="fixed top-0 left-0 right-0 z-[9999] px-5 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-black">Uber</h1>

                    <button className="text-3xl text-black">
                        ☰
                    </button>
                </div>
            </div>

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