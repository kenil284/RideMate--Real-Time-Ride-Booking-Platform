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
  <div className="w-full">
    <div className="mb-5">
      <h2 className="text-[22px] leading-[28px] font-bold tracking-tight text-black">
        Find a trip
      </h2>

      <p className="text-sm leading-6 text-black/55 mt-1">
        Enter pickup and destination to continue.
      </p>
    </div>

    <div className="relative">
  <div className="absolute left-[21px] top-[24px] bottom-[24px] w-[2px] bg-black/20 rounded-full"></div>

  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 z-10">
      <div className="w-2 h-2 rounded-full bg-white"></div>
    </div>

    <input
      type="text"
      value={rideData?.pickup?.address || ""}
      onClick={() => {
        setActiveField("pickup");
        setStage("search");
      }}
      onChange={(e) => updateLocationText("pickup", e.target.value)}
      placeholder="Add pickup location"
      className="w-full h-12 bg-[#eeeeee] rounded-xl pl-12 pr-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div className="relative mt-3">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md bg-black shrink-0 z-10"></div>

    <input
      type="text"
      value={rideData?.destination?.address || ""}
      onClick={() => {
        setActiveField("destination");
        setStage("search");
      }}
      onChange={(e) => updateLocationText("destination", e.target.value)}
      placeholder="Enter destination"
      className="w-full h-12 bg-[#eeeeee] rounded-xl pl-12 pr-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>
</div>

    <button
      type="button"
      onClick={findTrip}
      disabled={isFindTripDisabled || isRideSearching}
      className={`w-full h-12 rounded-xl font-semibold text-[15px] mt-4 transition flex items-center justify-center gap-2 ${
        isFindTripDisabled || isRideSearching
          ? "bg-gray-900 text-white cursor-not-allowed"
          : "bg-black text-white active:scale-[0.97]"
      }`}
    >
      {isRideSearching && (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
      )}

      {isRideSearching ? "Finding rides..." : "Find trip"}
    </button>
  </div>
);
};

export default LocationForm;