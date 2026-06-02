import React from "react";

const vehicleImages = {
  car: "/Home_Page/car_3d.png",
  bike: "/Home_Page/MotorcycleOrange-249-0.png",
  auto: "/Home_Page/Auto.png",
};

const ConfirmRide = ({ rideData, onBack, onConfirm }) => {
  
  const vehicle = rideData?.vehicle;

  return (
    <div className="h-full flex flex-col font-sans">
      {/* Top */}
      <div className="shrink-0">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black">
              Confirm your ride
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review your trip details before booking
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold px-3 py-2 rounded-full bg-gray-100 active:scale-95 transition"
          >
            Change
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-4">
        {/* Vehicle Card */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-[82px] h-[82px] rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
              <img
                src={vehicleImages[vehicle?.type]}
                alt={vehicle?.name || "Vehicle"}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-black">
                  {vehicle?.name}
                </h3>

                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded-full">
                  👤 {vehicle?.capacity}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {vehicle?.displayDuration || `${vehicle?.durationMin} min`} •{" "}
                {vehicle?.displayDistance || `${vehicle?.distanceKm} km`}
              </p>

              <p className="text-sm text-gray-600 mt-1 capitalize">
                {vehicle?.type} ride
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xl font-bold text-black">
                {vehicle?.displayFare || `₹${rideData?.fare}`}
              </p>
            </div>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-5">
          <h3 className="text-base font-bold mb-4 text-black">
            Trip route
          </h3>

          <div className="relative">
            <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-gray-200"></div>

            <div className="flex gap-4 mb-5">
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Pickup
                </p>
                <p className="text-[15px] font-semibold text-black leading-5 mt-1">
                  {rideData?.pickup?.address}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-md bg-black shrink-0 mt-1"></div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Destination
                </p>
                <p className="text-[15px] font-semibold text-black leading-5 mt-1">
                  {rideData?.destination?.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Summary */}
        <div className="bg-[#f6f6f6] rounded-3xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600 font-medium">Ride fare</p>
            <p className="text-lg font-bold">
              {vehicle?.displayFare || `₹${rideData?.fare}`}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-medium">Payment</p>
            <p className="text-sm font-bold text-black">Cash</p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="shrink-0 pt-3 bg-white">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-[54px] bg-black text-white rounded-xl font-bold text-base active:scale-[0.97] transition"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;