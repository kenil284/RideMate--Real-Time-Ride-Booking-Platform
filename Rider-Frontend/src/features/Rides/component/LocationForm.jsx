import React from "react";

const LocationForm = ({
  rideData,
  updateRideData,
  setStage,
  setActiveField,
  findTrip,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find a trip</h2>

      <div className="relative">
        <div className="absolute left-5 top-6 bottom-6 w-[3px] bg-black rounded-full"></div>

        <input
          type="text"
          value={rideData.pickup}
          onClick={() => {
            setActiveField("pickup");
            setStage("search");
          }}
          onChange={(e) => updateRideData("pickup", e.target.value)}
          placeholder="Add a pick-up location"
          className="w-full h-[52px] bg-[#eeeeee] rounded-lg pl-12 pr-4 outline-none"
        />

        <input
          type="text"
          value={rideData.destination}
          onClick={() => {
            setActiveField("destination");
            setStage("search");
          }}
          onChange={(e) => updateRideData("destination", e.target.value)}
          placeholder="Enter your destination"
          className="w-full h-[52px] bg-[#eeeeee] rounded-lg pl-12 pr-4 mt-3 outline-none"
        />
      </div>

      <button
        onClick={findTrip}
        className="w-full h-[48px] bg-black text-white rounded-lg font-semibold mt-4 active:scale-[0.97] transition"
      >
        Find Trip
      </button>
    </div>
  );
};

export default LocationForm;