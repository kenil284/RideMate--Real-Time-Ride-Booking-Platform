import React from "react"
import { FaLocationDot, FaPhone, FaXmark } from "react-icons/fa6"

const AcceptedRide = ({ ride, routeInfo, onArrived, onCancel }) => {
  const rider = ride?.rider

  const riderName = `${rider?.fullname?.firstname || ""} ${
    rider?.fullname?.lastname || ""
  }`.trim()

  return (
    <div className="h-full flex flex-col justify-center gap-3">
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />

            <p className="text-[14px] font-semibold text-gray-500 truncate">
              Go to pickup
            </p>
          </div>

          <p className="text-[14px] font-bold text-gray-900 shrink-0">
            {routeInfo?.durationMin || "--"} min <span className="pl-2">• {routeInfo?.distanceKm || "--"} km</span> 
          </p>
        </div>

        <p className="text-[12px] text-gray-500 truncate mt-1">
          Rider:{" "}
          <span className="font-semibold text-gray-800">
            {riderName || "Rider"}
          </span>
        </p>

        <p className="text-[11px] text-gray-400 truncate mt-0.5">
          {ride?.pickup?.address || "Pickup location"}
        </p>
      </div>

      <div className="grid grid-cols-[0.8fr_0.8fr_1.2fr] gap-2">
        <button
          onClick={onCancel}
          className="h-11 rounded-2xl bg-gray-100 text-gray-700 text-[13px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <FaXmark className="text-xs" />
          Cancel
        </button>

        <a
          href={rider?.phone ? `tel:${rider.phone}` : undefined}
          className="h-11 rounded-2xl bg-gray-100 text-gray-800 text-[13px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <FaPhone className="text-xs" />
          Call
        </a>

        <button
          onClick={onArrived}
          className="h-11 rounded-2xl bg-gray-950 text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <FaLocationDot className="text-xs" />
          Arrived
        </button>
      </div>
    </div>
  )
}

export default AcceptedRide