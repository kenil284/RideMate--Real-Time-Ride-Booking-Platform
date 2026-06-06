import React from "react"
import { FaLocationDot, FaXmark } from "react-icons/fa6"

const AcceptedRide = ({ ride, onArrived, onCancel }) => {
  const rider = ride?.rider

  const riderName = `${rider?.fullname?.firstname || ""} ${
    rider?.fullname?.lastname || ""
  }`.trim()

  return (
    <div className="h-full flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />

          <p className="text-[12px] font-bold text-gray-500">
            Pickup Rider
          </p>
        </div>

        <h3 className="text-[17px] font-extrabold text-gray-950 truncate mt-1 capitalize">
          {riderName || "Rider"}
        </h3>

        <p className="text-[11px] text-gray-400 truncate mt-0.5">
          Confirm rider and tap arrived at pickup
        </p>
      </div>

      <button
        onClick={onCancel}
        className="h-12 px-4 rounded-2xl bg-gray-100 text-gray-700 text-[13px] font-bold flex items-center justify-center gap-2 active:scale-95 transition"
      >
        <FaXmark className="text-xs" />
        Cancel
      </button>

      <button
        onClick={onArrived}
        className="h-12 px-5 rounded-2xl bg-gray-950 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.22)] active:scale-95 transition"
      >
        <FaLocationDot className="text-xs" />
        Arrived
      </button>
    </div>
  )
}

export default AcceptedRide