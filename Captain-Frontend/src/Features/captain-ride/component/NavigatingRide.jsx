import React from "react"
import { FaFlagCheckered, FaLocationArrow } from "react-icons/fa6"

const NavigatingRide = ({ ride, onComplete, isRideCompleting }) => {
  const fareText = ride?.vehicle?.displayFare || `₹${ride?.fare || 0}`

  const paymentText =
    ride?.paymentMethod === "online" ? "Online" : "Cash"

  return (
    <div className="w-full px-1">
      <div className="mb-2 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-950 text-white flex items-center justify-center shrink-0">
          <FaLocationArrow className="text-[11px]" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-extrabold text-gray-400 uppercase leading-none">
            Trip in progress
          </p>

          <h3 className="text-[15px] font-extrabold text-gray-950 leading-tight mt-1 truncate">
            Continue to destination
          </h3>
        </div>
      </div>

      <div className="h-[58px] w-full rounded-[15px] bg-gray-100/90 p-1.5 flex items-center gap-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <div className="h-full min-w-[76px] rounded-[15px] bg-gray-950 text-white flex flex-col justify-center px-4">
          <span className="text-[9px] font-extrabold text-white/45 uppercase leading-none">
            Fare
          </span>

          <span className="text-[17px] font-extrabold leading-none mt-1">
            {fareText}
          </span>
        </div>

        <div className="h-full min-w-[82px] rounded-[15px] bg-white flex flex-col justify-center px-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]">
          <span className="text-[9px] font-extrabold text-gray-400 uppercase leading-none">
            Payment
          </span>

          <span className="text-[14px] font-extrabold text-gray-950 leading-none mt-1 capitalize">
            {paymentText}
          </span>
        </div>

        <button
          onClick={onComplete}
          disabled={isRideCompleting}
          className={`
    h-full flex-1 rounded-[15px] text-white text-[14px] font-extrabold
    flex items-center justify-center gap-2 transition
    shadow-[0_14px_28px_rgba(0,0,0,0.25)]
    ${isRideCompleting
              ? "bg-gray-950/80 cursor-not-allowed"
              : "bg-gray-950 active:scale-[0.98]"
            }
  `}
        >
          {isRideCompleting ? (
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <FaFlagCheckered className="text-xs" />
              Complete
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default NavigatingRide