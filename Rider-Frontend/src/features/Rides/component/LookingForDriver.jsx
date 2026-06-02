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
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>

        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Looking for driver
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Please wait while we connect you with a nearby captain
          </p>
        </div>
      </div>

      {/* Vehicle Card */}
      <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-gray-100 p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-[82px] h-[82px] rounded-2xl bg-[#f7f7f7] flex items-center justify-center shrink-0">
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
              <h3 className="text-xl font-bold text-black leading-6">
                {vehicle?.name || "Ride"}
              </h3>

              {vehicle?.capacity && (
                <span className="text-xs font-bold bg-[#eeeeee] px-2 py-1 rounded-full">
                  👤 {vehicle.capacity}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2 font-medium">
              {duration} • {distance}
            </p>

            <p className="text-sm text-gray-600 mt-1 capitalize">
              {vehicle?.type || "selected"} ride
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-black whitespace-nowrap">
              {fare}
            </p>
          </div>
        </div>
      </div>

      {/* Searching Status */}
      <div className="bg-[#f6f6f6] rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <div className="w-5 h-5 border-[3px] border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>

          <div>
            <h3 className="text-base font-bold text-black">
              Finding nearby drivers
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              This usually takes a few seconds
            </p>
          </div>
        </div>
      </div>

      {/* Trip Route */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-gray-100 p-5">
          <h3 className="text-base font-bold mb-4 text-black">Trip route</h3>

          <div className="relative">
            <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-gray-200"></div>

            {/* Pickup */}
            <div className="flex gap-4 mb-5">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-1 z-10">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Pickup
                </p>

                <p className="text-[15px] font-bold text-black leading-5 mt-1">
                  {rideData?.pickup?.address || "Pickup location"}
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-md bg-black shrink-0 mt-1 z-10"></div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Destination
                </p>

                <p className="text-[15px] font-bold text-black leading-5 mt-1">
                  {rideData?.destination?.address || "Destination location"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-[#f6f6f6] rounded-3xl p-5 mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600 font-medium">Ride fare</p>
            <p className="text-lg font-bold text-black">{fare}</p>
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
  );
};

export default LookingForDriver;