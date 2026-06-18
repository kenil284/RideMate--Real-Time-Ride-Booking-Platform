import React from "react";

const vehicleImages = {
  car: "/Home_Page/car_3d.png",
  bike: "/Home_Page/MotorcycleOrange-249-0.png",
  auto: "/Home_Page/Auto.png",
};

const ConfirmRide = ({ rideData, onBack, onConfirm, isRideCreating }) => {

  const vehicle = rideData?.vehicle;

  return (
  <div className="h-full flex flex-col font-sans">
    {/* Top */}
    <div className="shrink-0">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="pr-4">
          <h2 className="text-[22px] leading-[28px] font-bold tracking-tight text-black">
            Confirm your ride
          </h2>

          <p className="text-sm leading-6 text-black/55 mt-0.5">
            Review trip details before booking
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="h-10 px-5 rounded-full bg-[#f3f3f3] text-sm font-bold text-black active:scale-95 transition shrink-0"
        >
          Change
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto pb-4 space-y-3.5">
      {/* Vehicle Card */}
      <div className="bg-white border border-gray-100 shadow-[0_8px_26px_rgba(0,0,0,0.06)] rounded-[26px] px-4 py-3.5">
        <div className="grid grid-cols-[78px_1fr_auto] gap-3.5 items-center">
          <div className="w-[78px] h-[66px] rounded-[20px] bg-gray-50 flex items-center justify-center shrink-0">
            <img
              src={vehicleImages[vehicle?.type]}
              alt={vehicle?.name || "Vehicle"}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold text-black leading-none truncate">
                {vehicle?.name}
              </h3>

              <span className="h-5 px-2 rounded-full bg-[#eeeeee] text-[11px] font-bold text-black flex items-center gap-1 shrink-0">
                👤 {vehicle?.capacity}
              </span>
            </div>

            <p className="text-[13.5px] text-gray-500 font-medium mt-2 leading-none">
              {vehicle?.displayDuration || `${vehicle?.durationMin} min`} •{" "}
              {vehicle?.displayDistance || `${vehicle?.distanceKm} km`}
            </p>

            <p className="text-[13px] text-gray-600 font-normal mt-1.5 leading-snug capitalize">
              {vehicle?.type} ride
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[18px] font-bold text-black whitespace-nowrap">
              {vehicle?.displayFare || `₹${rideData?.fare}`}
            </p>
          </div>
        </div>
      </div>

      {/* Route Card */}
      <div className="bg-white border border-gray-100 shadow-[0_8px_26px_rgba(0,0,0,0.06)] rounded-[26px] p-4">
        <h3 className="text-[16px] font-bold mb-4 text-black">
          Trip route
        </h3>

        <div className="relative">
          <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-gray-200 rounded-full"></div>

          <div className="flex gap-4 mb-5">
            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-1 z-10">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Pickup
              </p>

              <p className="text-[14.5px] font-semibold text-black leading-5 mt-1">
                {rideData?.pickup?.address}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-5 h-5 rounded-md bg-black shrink-0 mt-1 z-10"></div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Destination
              </p>

              <p className="text-[14.5px] font-semibold text-black leading-5 mt-1">
                {rideData?.destination?.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fare Summary */}
      <div className="bg-[#f6f6f6] rounded-[26px] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600 font-medium">
            Ride fare
          </p>

          <p className="text-[18px] font-bold text-black">
            {vehicle?.displayFare || `₹${rideData?.fare}`}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">
            Payment
          </p>

          <p className="text-sm font-bold text-black">
            Cash
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Button */}
    <div className="shrink-0 pt-2 bg-white">
      <button
        type="button"
        disabled={isRideCreating}
        onClick={onConfirm}
        className={`w-full h-[52px] rounded-[18px] font-bold text-[15.5px] transition flex items-center justify-center gap-2 ${
          isRideCreating
            ? "bg-black/80 text-white cursor-not-allowed"
            : "bg-black text-white active:scale-[0.985]"
        }`}
      >
        {isRideCreating ? (
          <>
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Confirming ride...
          </>
        ) : (
          "Confirm Ride"
        )}
      </button>
    </div>
  </div>
)
};

export default ConfirmRide;