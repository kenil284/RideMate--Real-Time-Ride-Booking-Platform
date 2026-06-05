import React from "react"
import {
  FaClock,
  FaPhone,
  FaRoad,
  FaWallet,
} from "react-icons/fa6"

const WaitingForDriver = ({ rideData }) => {
  const captain = rideData?.captain

  const captainName = `${captain?.fullname?.firstname || ""} ${captain?.fullname?.lastname || ""}`.trim()

  const formatAcceptedTime = (date) => {
    if (!date) return ""

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="pb-3">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Captain assigned
        </div>

        <h2 className="text-[22px] font-semibold text-gray-900 leading-tight">
          Meet at the pickup point
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Captain accepted your ride at {formatAcceptedTime(rideData.acceptedAt)}
        </p>
      </div>

      <div className="rounded-[28px] bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 shrink-0">
              {captainName?.charAt(0).toUpperCase() || "C"}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 capitalize truncate">
                {captainName || "Captain"}
              </h3>

              <p className="text-sm text-gray-500 capitalize truncate">
                {captain?.vehicle?.vehicleName || "Vehicle"} •{" "}
                {captain?.vehicle?.color || "Color"}
              </p>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-gray-50 text-center shrink-0">
            <p className="text-[10px] font-semibold text-gray-400 uppercase leading-none">
              OTP
            </p>

            <p className="text-base font-semibold text-gray-900 mt-1">
              {rideData?.otp || "----"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">
              Plate number
            </p>

            <h4 className="text-sm font-semibold text-gray-800 mt-1">
              {captain?.vehicle?.plate || "Not available"}
            </h4>
          </div>

          <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">
              Ride type
            </p>

            <h4 className="text-sm font-semibold text-gray-800 mt-1 capitalize">
              {rideData?.vehicle?.type || captain?.vehicle?.vehicleType || "Ride"}
            </h4>
          </div>
        </div>
      </div>




      <div className="w-full grid grid-cols-2 gap-3">
        <a
          href={captain?.phone ? `tel:${captain.phone}` : undefined}
          className="h-14 rounded-2xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <FaPhone className="text-sm" />
          Call Captain
        </a>

        <button
          onClick={() => console.log("Cancel ride coming soon")}
          className="h-14 rounded-2xl bg-gray-100 text-gray-800 font-semibold flex items-center justify-center active:scale-95 transition"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver