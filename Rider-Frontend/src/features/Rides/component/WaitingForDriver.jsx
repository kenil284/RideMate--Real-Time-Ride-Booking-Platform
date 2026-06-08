import React from "react"
import { FaPhone, FaShieldHalved } from "react-icons/fa6"

const WaitingForDriver = ({ rideData, onCancelRide, isRideCancelling }) => {
  const captain = rideData?.captain
  const captainInfo = rideData?.captainToPickupInfo

  const captainName = `${captain?.fullname?.firstname || ""} ${captain?.fullname?.lastname || ""
    }`.trim()

  const arrivalTime =
    captainInfo?.displayDuration ||
    (captainInfo?.durationMin ? `${captainInfo.durationMin} min` : "--")

  const arrivalDistance =
    captainInfo?.displayDistance ||
    (captainInfo?.distanceKm ? `${captainInfo.distanceKm} km` : "--")

  return (
    <div className="pb-2">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Captain assigned
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[23px] font-bold text-gray-950 leading-tight">
              Captain is on the way
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Wait at pickup point
            </p>
          </div>

          <div className="text-right shrink-0">
            <h3 className="text-[22px] font-bold text-gray-950 leading-none">
              {arrivalTime}
            </h3>

            <p className="text-xs font-semibold text-gray-400 mt-1">
              {arrivalDistance} away
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-13 h-13 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-800 shrink-0">
              {captainName?.charAt(0).toUpperCase() || "C"}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-950 capitalize truncate">
                {captainName || "Captain"}
              </h3>

              <p className="text-sm text-gray-500 capitalize truncate">
                {captain?.vehicle?.vehicleName || "Vehicle"} •{" "}
                {captain?.vehicle?.color || "Color"}
              </p>

              <p className="text-xs font-semibold text-gray-400 mt-0.5">
                {captain?.vehicle?.plate || "Plate not available"}
              </p>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-gray-50 text-center shrink-0">
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
              <FaShieldHalved className="text-[10px]" />
              OTP
            </div>

            <p className="text-base font-bold text-gray-950 mt-1">
              {rideData?.otp || "----"}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <a
          href={captain?.phone ? `tel:${captain.phone}` : undefined}
          className="h-14 rounded-2xl bg-gray-950 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <FaPhone className="text-sm" />
          Call Captain
        </a>

        <button
          onClick={onCancelRide}
          disabled={isRideCancelling}
          className={`
    h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition
    ${isRideCancelling
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 active:scale-95"
            }
  `}
        >
          {isRideCancelling ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-gray-400/30 border-t-gray-700 animate-spin" />
              Cancelling...
            </>
          ) : (
            "Cancel Ride"
          )}
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver