import React from "react"
import { FaLocationDot, FaXmark } from "react-icons/fa6"

const AcceptedRide = ({ ride, onArrived, onCancel, isCurrentRideCancelling }) => {
  const rider = ride?.rider

  const riderName = (rider?.fullname?.firstname || "Rider").trim()

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
        disabled={isCurrentRideCancelling}
        className={`
  h-12 w-[98px] rounded-2xl text-[13px] font-extrabold 
  flex items-center justify-center gap-2 transition
  border shadow-[0_8px_20px_rgba(0,0,0,0.05)]
  ${isCurrentRideCancelling
            ? "bg-white text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-800 border-gray-200 active:scale-95"
          }
`}
      >
        {isCurrentRideCancelling ? (
          <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-800 animate-spin" />
        ) : (
          <>
            <FaXmark className="text-xs text-gray-500" />
            Cancel
          </>
        )}
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