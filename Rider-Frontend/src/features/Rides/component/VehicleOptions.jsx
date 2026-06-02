import React, { useEffect, useState } from "react";

const vehicleImages = {
  car: "/Home_Page/car_3d.png",
  bike: "/Home_Page/MotorcycleOrange-249-0.png",
  auto: "/Home_Page/Auto.png",
};

const vehicleDesc = {
  car: "Affordable, compact rides",
  bike: "Affordable motorcycle rides",
  auto: "Affordable auto rides",
};

const VehicleOptions = ({ vehicleOptions = [], onSelectVehicle, onEdit }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (vehicleOptions.length > 0) {
      setSelected(vehicleOptions[0]);
    }
  }, [vehicleOptions]);

  return (
  <div className="h-full flex flex-col font-sans">
    {/* Header */}
    <div className="shrink-0">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Choose a ride
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select your preferred vehicle
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-bold text-black bg-[#f3f3f3] px-4 py-2 rounded-full active:scale-95 transition"
        >
          Edit
        </button>
      </div>
    </div>

    {/* Vehicle Options */}
    <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
      {vehicleOptions.map((vehicle) => (
        <div
          key={vehicle.type}
          onClick={() => setSelected(vehicle)}
          className={`bg-white rounded-3xl p-4 cursor-pointer active:scale-[0.98] transition border shadow-[0_2px_12px_rgba(0,0,0,0.10)] ${
            selected?.type === vehicle.type
              ? "border-black border-2"
              : "border-gray-100"
          }`}
        >
          <div className="grid grid-cols-[82px_1fr_auto] gap-4 items-center">
            {/* Image */}
            <div className="w-[82px] h-[82px] rounded-2xl flex items-center justify-center shrink-0">
              <img
                src={vehicleImages[vehicle.type]}
                alt={vehicle.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-black leading-6">
                  {vehicle.name}
                </h3>

                <span className="text-xs font-bold bg-[#eeeeee] px-2 py-1 rounded-full">
                  👤 {vehicle.capacity}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2 leading-5 font-medium">
                {vehicle.displayDuration || `${vehicle.durationMin} min`} •{" "}
                {vehicle.displayDistance || `${vehicle.distanceKm} km`}
              </p>

              <p className="text-sm text-gray-600 leading-5 mt-1 capitalize">
                {vehicle.desc || vehicleDesc[vehicle.type]}
              </p>
            </div>

            {/* Fare */}
            <div className="text-right self-center shrink-0">
              <p className="font-bold text-xl text-black whitespace-nowrap">
                {vehicle.displayFare || `₹${vehicle.fare}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Button */}
    <div className="shrink-0 pt-3 bg-white">
      <button
        type="button"
        disabled={!selected}
        onClick={() => onSelectVehicle(selected)}
        className="w-full h-[54px] bg-black text-white rounded-xl font-bold text-base active:scale-[0.97] transition disabled:bg-gray-400"
      >
        Continue
      </button>
    </div>
  </div>
);
};

export default VehicleOptions;