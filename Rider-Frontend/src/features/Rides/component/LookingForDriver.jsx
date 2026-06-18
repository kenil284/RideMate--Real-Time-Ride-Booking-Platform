import React from "react";

const vehicleImages = {
  car: "/Home_Page/car_3d.png",
  bike: "/Home_Page/MotorcycleOrange-249-0.png",
  auto: "/Home_Page/Auto.png",
};

const LookingForDriver = ({ rideData }) => {
  const vehicle = rideData?.vehicle;

  const vehicleImage = vehicle?.image || vehicleImages[vehicle?.type] || null;

  const fare = vehicle?.displayFare || `₹${rideData?.fare || vehicle?.fare || 0}`;

  const duration =
    vehicle?.displayDuration ||
    `${rideData?.durationMin || vehicle?.durationMin || 0} min`;

  const distance =
    vehicle?.displayDistance ||
    `${rideData?.distanceKm || vehicle?.distanceKm || 0} km`;

  return (
  <div className="h-full flex flex-col font-sans">
    {/* Header */}
    <div className="shrink-0">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

      <div className="mb-4">
        <h2 className="text-[22px] leading-[28px] font-bold tracking-tight text-black">
          Looking for driver
        </h2>

        <p className="text-sm leading-6 text-gray-500 mt-0.5">
          Please wait while we connect you with a nearby captain
        </p>
      </div>
    </div>

    {/* Vehicle Card */}
    <div className="bg-white rounded-[26px] shadow-[0_6px_22px_rgba(0,0,0,0.08)] border border-gray-100 px-4 py-3.5 mb-3.5">
      <div className="flex items-center gap-3.5">
        <div className="w-[76px] h-[76px] rounded-[20px] bg-[#f7f7f7] flex items-center justify-center shrink-0">
          {vehicleImage ? (
            <img
              src={vehicleImage}
              alt={vehicle?.name || "Vehicle"}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-3xl">🚗</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[19px] font-bold text-black leading-6">
              {vehicle?.name || "Ride"}
            </h3>

            {vehicle?.capacity && (
              <span className="text-[11px] font-bold bg-[#eeeeee] px-2 py-1 rounded-full">
                👤 {vehicle.capacity}
              </span>
            )}
          </div>

          <p className="text-[13.5px] text-gray-500 mt-1.5 font-medium">
            {duration} • {distance}
          </p>

          <p className="text-[13.5px] text-gray-600 mt-1 capitalize">
            {vehicle?.type || "selected"} ride
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-[19px] font-bold text-black whitespace-nowrap">
            {fare}
          </p>
        </div>
      </div>
    </div>

    {/* Searching Status */}
    <div className="bg-[#f6f6f6] rounded-[26px] px-4 py-4 mb-3.5">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
          <div className="w-5 h-5 border-[3px] border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>

        <div>
          <h3 className="text-[16px] leading-5 font-bold text-black">
            Finding nearby drivers
          </h3>

          <p className="text-[13.5px] text-gray-500 mt-1">
            This usually takes a few seconds
          </p>
        </div>
      </div>
    </div>

    {/* Trip Route */}
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white rounded-[26px] shadow-[0_6px_22px_rgba(0,0,0,0.08)] border border-gray-100 p-4">
        <h3 className="text-[16px] font-bold mb-4 text-black">
          Trip route
        </h3>

        <div className="relative">
          <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-gray-200 rounded-full"></div>

          {/* Pickup */}
          <div className="flex gap-4 mb-5">
            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-1 z-10">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Pickup
              </p>

              <p className="text-[14.5px] font-bold text-black leading-5 mt-1">
                {rideData?.pickup?.address || "Pickup location"}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex gap-4">
            <div className="w-5 h-5 rounded-md bg-black shrink-0 mt-1 z-10"></div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Destination
              </p>

              <p className="text-[14.5px] font-bold text-black leading-5 mt-1">
                {rideData?.destination?.address || "Destination location"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Card */}
      <div className="bg-[#f6f6f6] rounded-[26px] p-4 mt-3.5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600 font-medium">Ride fare</p>
          <p className="text-[18px] font-bold text-black">{fare}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">Payment</p>
          <p className="text-sm font-bold text-black capitalize">
            {rideData?.paymentMethod || "Cash"}
          </p>
        </div>
      </div>
    </div>
  </div>
)
};

export default LookingForDriver;