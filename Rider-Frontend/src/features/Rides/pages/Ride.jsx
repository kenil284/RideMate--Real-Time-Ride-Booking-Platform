import React, { useState } from "react";

import BottomSheet from "../component/BottomSheet";
import LocationForm from "../component/LocationForm";
import LocationSearch from "../component/LocationSearch";
import VehicleOptions from "../component/VehicleOptions";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";
import Map from "../component/Map";

const Ride = () => {
    const [stage, setStage] = useState("location");
    const [activeField, setActiveField] = useState("pickup");

    const [rideData, setRideData] = useState({
        pickup: "",
        destination: "",
        vehicle: null,
        vehicleType: "",
        fare: "",
        driver: null,
    });

    const updateRideData = (key, value) => {
        setRideData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const allSuggestions = [
        {
            title: "Third Wave Coffee, HSR Layout",
            address: "Surat, Gujarat, India",
        },
        {
            title: "Phoenix Marketcity",
            address: "Surat, Gujarat, India",
        },
        {
            title: "Surat Railway Station",
            address: "Station Road, Surat, Gujarat",
        },
        {
            title: "Airport Road",
            address: "Dumas Road, Surat, Gujarat",
        },
        {
            title: "KSR Bengaluru City Junction",
            address: "Bengaluru, Karnataka, India",
        },
        {
            title: "Third Wave Coffee, HSR Layout",
            address: "Surat, Gujarat, India",
        },
        {
            title: "Phoenix Marketcity",
            address: "Surat, Gujarat, India",
        },
        {
            title: "Surat Railway Station",
            address: "Station Road, Surat, Gujarat",
        },
        {
            title: "Airport Road",
            address: "Dumas Road, Surat, Gujarat",
        },
        {
            title: "KSR Bengaluru City Junction",
            address: "Bengaluru, Karnataka, India",
        },
    ];

    const searchValue = rideData[activeField];

    const filteredSuggestions = allSuggestions.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const selectLocation = (location) => {
        updateRideData(activeField, location.title);
        setStage("location");
    };


    const findTrip = () => {
        updateRideData("fare", "₹193");
        setStage("vehicle");
    };

    const selectVehicle = (vehicle) => {
        updateRideData("vehicle", vehicle);
        updateRideData("vehicleType", vehicle.type);
        updateRideData("fare", vehicle.price);

        setStage("confirm");
    };

    const confirmRide = () => {
        setStage("looking");

        // temporary testing
        setTimeout(() => {
            updateRideData("driver", {
                name: "Rahul",
                plate: "GJ05AB1234",
                rating: 4.9,
            });

            setStage("waiting");
        }, 20000);
    };

    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            {/* Map Layer */}
            <div className="absolute inset-0 z-0 bg-[#e5e5e5]">
                <Map />
            </div>

            {/* Transparent Header */}
            <div className="fixed top-0 left-0 right-0 z-[9999] px-5 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-black">Uber</h1>

                    <button className="text-3xl text-black">
                        ☰
                    </button>
                </div>
            </div>

            {/* Bottom Sheet Layer */}
            <BottomSheet stage={stage}>
                {stage === "location" && (
                    <LocationForm
                        rideData={rideData}
                        updateRideData={updateRideData}
                        setStage={setStage}
                        setActiveField={setActiveField}
                        findTrip={findTrip}
                    />
                )}

                {stage === "search" && (
                    <LocationSearch
                        activeField={activeField}
                        value={rideData[activeField]}
                        updateRideData={updateRideData}
                        suggestions={filteredSuggestions}
                        onSelect={selectLocation}
                        onClose={() => setStage("location")}
                    />
                )}

                {stage === "vehicle" && (
                    <VehicleOptions
                        onSelectVehicle={selectVehicle}
                        onEdit={() => setStage("location")}
                    />
                )}

                {stage === "confirm" && (
                    <ConfirmRide
                        rideData={rideData}
                        onBack={() => setStage("vehicle")}
                        onConfirm={confirmRide}
                    />
                )}

                {stage === "looking" && <LookingForDriver rideData={rideData} />}

                {stage === "waiting" && <WaitingForDriver rideData={rideData} />}
            </BottomSheet>
        </div>
    );
};

export default Ride;