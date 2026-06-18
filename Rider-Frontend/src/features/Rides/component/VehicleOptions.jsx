import React, { useEffect, useState } from "react"

const vehicleImages = {
  car: "/Home_Page/car_3d.png",
  bike: "/Home_Page/MotorcycleOrange-249-0.png",
  auto: "/Home_Page/Auto.png",
}

const vehicleDesc = {
  car: "Affordable, compact rides",
  bike: "Affordable motorcycle rides",
  auto: "Affordable auto rides",
}

const VehicleOptions = ({ vehicleOptions = [], onSelectVehicle, onEdit }) => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (vehicleOptions.length > 0) {
      setSelected(vehicleOptions[0])
    }
  }, [vehicleOptions])

  return (
    <div className="h-full flex flex-col font-sans">
      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[22px] leading-[28px] font-bold tracking-tight text-black">
              Choose a ride
            </h2>

            <p className="text-sm leading-6 text-black/55 mt-0.5">
              Select your preferred vehicle
            </p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="h-10 px-5 rounded-full bg-[#f3f3f3] text-sm font-bold text-black active:scale-95 transition"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Vehicle Options */}
      <div className="flex-1 space-y-3.5 pb-4">
        {vehicleOptions.slice(0, 3).map((vehicle) => {
          const isSelected = selected?.type === vehicle.type

          return (
            <button
              key={vehicle.type}
              type="button"
              onClick={() => setSelected(vehicle)}
              className={`w-full rounded-[26px] px-4 py-3.5 text-left active:scale-[0.985] transition border ${
                isSelected
                  ? "bg-white border-black border-2 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                  : "bg-white border-gray-100 shadow-[0_8px_26px_rgba(0,0,0,0.06)]"
              }`}
            >
              <div className="grid grid-cols-[78px_1fr_auto] gap-3.5 items-center">
                {/* Image */}
                <div className="w-[78px] h-[66px] flex items-center justify-center shrink-0">
                  <img
                    src={vehicleImages[vehicle.type]}
                    alt={vehicle.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-bold text-black leading-none truncate">
                      {vehicle.name}
                    </h3>

                    <span className="h-5 px-2 rounded-full bg-[#eeeeee] text-[11px] font-bold text-black flex items-center gap-1 shrink-0">
                      👤 {vehicle.capacity}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-gray-500 font-medium mt-2 leading-none">
                    {vehicle.displayDuration || `${vehicle.durationMin} min`} •{" "}
                    {vehicle.displayDistance || `${vehicle.distanceKm} km`}
                  </p>

                  <p className="text-[13px] text-gray-600 font-normal mt-1.5 leading-snug">
                    {vehicle.desc || vehicleDesc[vehicle.type]}
                  </p>
                </div>

                {/* Fare */}
                <div className="text-right shrink-0">
                  <p className="text-[18px] font-bold text-black whitespace-nowrap">
                    {vehicle.displayFare || `₹${vehicle.fare}`}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom Button */}
      <div className="shrink-0 pt-2 bg-white">
        <button
          type="button"
          disabled={!selected}
          onClick={() => onSelectVehicle(selected)}
          className="w-full h-[52px] bg-black text-white rounded-[18px] font-bold text-[15.5px] active:scale-[0.985] transition disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default VehicleOptions