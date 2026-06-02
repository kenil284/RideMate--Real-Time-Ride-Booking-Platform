import React from "react";

const LocationForm = ({
  rideData,
  updateLocationText,
  setStage,
  setActiveField,
  findTrip,
  isRideSearching
}) => {
  const isFindTripDisabled =
    rideData?.pickup?.lat == null ||
    rideData?.pickup?.lng == null ||
    rideData?.destination?.lat == null ||
    rideData?.destination?.lng == null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find a trip</h2>

      <div className="relative">
        <div className="absolute left-5 top-6 bottom-6 w-[3px] bg-black rounded-full"></div>

        <input
          type="text"
          value={rideData?.pickup?.address || ""}
          onClick={() => {
            setActiveField("pickup");
            setStage("search");
          }}
          onChange={(e) => updateLocationText("pickup", e.target.value)}
          placeholder="Add a pick-up location"
          className="w-full h-[52px] bg-[#eeeeee] rounded-lg pl-12 pr-4 outline-none"
        />

        <input
          type="text"
          value={rideData?.destination?.address || ""}
          onClick={() => {
            setActiveField("destination");
            setStage("search");
          }}
          onChange={(e) => updateLocationText("destination", e.target.value)}
          placeholder="Enter your destination"
          className="w-full h-[52px] bg-[#eeeeee] rounded-lg pl-12 pr-4 mt-3 outline-none"
        />
      </div>

      <button
        type="button"
        onClick={findTrip}
        disabled={isFindTripDisabled || isRideSearching}
        className={`w-full h-[48px] rounded-lg font-semibold mt-4 transition flex items-center justify-center gap-2 ${isFindTripDisabled || isRideSearching
            ? "bg-gray-700 text-white cursor-not-allowed"
            : "bg-black text-white active:scale-[0.97]"
          }`}
      >
        {isRideSearching && (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}

        {isRideSearching ? "Finding rides..." : "Find Trip"}
      </button>
    </div>
  );
};

export default LocationForm;