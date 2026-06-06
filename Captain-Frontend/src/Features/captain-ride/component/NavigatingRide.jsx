import React from "react"
import { FaFlagCheckered, FaMoneyBillWave } from "react-icons/fa6"

const NavigatingRide = ({ ride, onComplete }) => {
  const fareText = ride?.vehicle?.displayFare || `₹${ride?.fare || 0}`

  const paymentText =
    ride?.paymentMethod === "online" ? "Online" : "Cash"

  return (
    <div className="h-full flex items-center gap-3 px-4">
      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 mb-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

          <p className="text-[11px] font-bold text-gray-500">
            Trip in progress
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2.5 rounded-2xl bg-gray-950 text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
            <p className="text-[10px] font-bold text-white/50 uppercase leading-none">
              Fare
            </p>

            <h3 className="text-[18px] font-extrabold mt-1 leading-none">
              {fareText}
            </h3>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
              Payment
            </p>

            <h3 className="text-[14px] font-extrabold text-gray-900 mt-1 leading-none capitalize">
              {paymentText}
            </h3>
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="h-14 px-6 rounded-[22px] bg-gray-950 text-white text-[14px] font-extrabold flex items-center justify-center gap-2 shadow-[0_14px_35px_rgba(0,0,0,0.28)] active:scale-95 transition shrink-0"
      >
        <FaFlagCheckered className="text-xs" />
        Complete
      </button>
    </div>
  )
}

export default NavigatingRide