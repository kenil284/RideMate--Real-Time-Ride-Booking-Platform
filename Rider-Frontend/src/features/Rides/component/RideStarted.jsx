import React from "react"
import {
  FaClock,
  FaLocationDot,
  FaMoneyBillWave,
  FaRoad,
} from "react-icons/fa6"

const RideStarted = ({ rideData }) => {
  const getVehicleImage = () => {
    if (rideData?.vehicle?.type === "car") return "/Home_Page/car_3d.png"
    if (rideData?.vehicle?.type === "auto") return "/Home_Page/Auto.png"
    return "/Bike/bike-right.webp"
  }

  const fareText = rideData?.vehicle?.displayFare || `₹${rideData?.fare || 0}`

  const paymentText =
    rideData?.paymentMethod === "online" ? "Online" : "Cash"

  const distanceText =
    rideData?.vehicle?.displayDistance ||
    `${rideData?.distanceKm || 0} km`

  const durationText =
    rideData?.vehicle?.displayDuration ||
    `${rideData?.durationMin || 0} min`

  return (
    <div className="pb-5 pt-1 text-center overflow-hidden">
      <div className="relative h-36 flex items-center justify-center mb-3">
        <div className="absolute w-56 h-24 rounded-full bg-gray-100 blur-2xl" />

        <img
          src={getVehicleImage()}
          alt="ride vehicle"
          className="relative z-10 w-44 h-44 object-contain animate-[rideMove_2.4s_ease-in-out_infinite]"
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold mb-3">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Trip started
      </div>

      <h2 className="text-[28px] font-extrabold text-gray-950 leading-tight">
        Enjoy your ride
      </h2>

      <p className="text-sm text-gray-500 mt-2 max-w-[280px] mx-auto">
        Your captain is taking you to the destination.
      </p>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-2xl bg-gray-950 text-white p-4 text-left">
          <div className="flex items-center gap-2 text-white/55 text-[11px] font-bold uppercase">
            <FaMoneyBillWave />
            Fare
          </div>

          <h3 className="text-xl font-extrabold mt-2">
            {fareText}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-100 p-4 text-left">
          <p className="text-[11px] font-bold text-gray-400 uppercase">
            Payment
          </p>

          <h3 className="text-xl font-extrabold text-gray-950 mt-2 capitalize">
            {paymentText}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-100 p-4 text-left">
          <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase">
            <FaRoad />
            Distance
          </div>

          <h3 className="text-lg font-extrabold text-gray-950 mt-2">
            {distanceText}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-100 p-4 text-left">
          <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase">
            <FaClock />
            Time
          </div>

          <h3 className="text-lg font-extrabold text-gray-950 mt-2">
            {durationText}
          </h3>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-left">
        <div className="flex items-start gap-2">
          <FaLocationDot className="text-gray-400 text-xs mt-1 shrink-0" />

          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase">
              Destination
            </p>

            <p className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2">
              {rideData?.destination?.address || "Destination address"}
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes rideMove {
            0% {
              transform: translateX(-16px) translateY(0) rotate(-2deg);
            }
            50% {
              transform: translateX(16px) translateY(-5px) rotate(2deg);
            }
            100% {
              transform: translateX(-16px) translateY(0) rotate(-2deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default RideStarted