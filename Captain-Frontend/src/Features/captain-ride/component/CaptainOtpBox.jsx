import React, { useRef, useState } from "react"
import { FaShieldHalved, FaArrowLeft } from "react-icons/fa6"

const CaptainOtpBox = ({ ride, onBack, onStartRide,isStartingRide }) => {
  const [otp, setOtp] = useState("")
  const inputRef = useRef(null)

  const rider = ride?.rider

  const riderName = `${rider?.fullname?.firstname || ""} ${rider?.fullname?.lastname || ""
    }`.trim()

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setOtp(value)
  }

  return (
    <div className="pb-4">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold mb-3">
            <FaShieldHalved className="text-xs" />
            Reached At Pickup Location
          </div>

          <h2 className="text-[24px] font-bold text-gray-950 leading-tight">
            Enter rider OTP
          </h2>

          <p className="text-sm text-gray-500 mt-1 leading-snug">
            Ask {riderName || "the rider"} for the 4-digit OTP before starting the ride.
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-11 h-11 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center active:scale-95 transition"
        >
          <FaArrowLeft className="text-sm" />
        </button>
      </div>

      <div className="rounded-[28px] bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-5 mb-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
          Ride verification
        </p>

        <div
          onClick={() => inputRef.current?.focus()}
          className="grid grid-cols-4 gap-3"
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`
                h-14 rounded-2xl flex items-center justify-center text-xl font-bold
                border transition
                ${otp[index]
                  ? "bg-gray-950 text-white border-gray-950"
                  : "bg-gray-50 text-gray-400 border-gray-100"
                }
              `}
            >
              {otp[index] || ""}
            </div>
          ))}
        </div>

        <input
          ref={inputRef}
          value={otp}
          onChange={handleChange}
          inputMode="numeric"
          className="absolute opacity-0 pointer-events-none"
        />

        <p className="text-xs text-gray-400 mt-4 leading-snug">
          ride only start after the OTP matches with the rider.
        </p>
      </div>

      <button
        onClick={() => onStartRide(otp)}
        type="submit"
        disabled={isStartingRide}
        className={`
        w-full h-14 rounded-2xl font-semibold flex items-center justify-center gap-2 transition
        ${isStartingRide
            ? "bg-gray-900/80 text-white cursor-not-allowed"
            : "bg-gray-950 text-white active:scale-95"
          }
    `}
      >
        {isStartingRide ? (
          <>
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Starting ride...
          </>
        ) : (
          "Start Ride"
        )}
      </button>
    </div>
  )
}

export default CaptainOtpBox