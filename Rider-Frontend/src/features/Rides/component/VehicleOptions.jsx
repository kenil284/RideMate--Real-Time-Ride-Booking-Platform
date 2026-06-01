import React, { useState } from "react";

const vehicles = [
  {
    type: "car",
    name: "UberGo",
    capacity: 4,
    time: "2 mins away · 15:24",
    desc: "Affordable, compact rides",
    price: "₹193.20",
    image: "/Home_Page/car_3d.png",
  },
  {
    type: "bike",
    name: "Moto",
    capacity: 1,
    time: "3 mins away · 15:24",
    desc: "Affordable motorcycle rides",
    price: "₹65.17",
    image: "/Home_Page/MotorcycleOrange-249-0.png",
  },
  {
    type: "auto",
    name: "UberAuto",
    capacity: 3,
    time: "2 mins away · 15:24",
    desc: "Affordable auto rides",
    price: "₹118.21",
    image: "/Home_Page/Auto.png",
  },
];

const VehicleOptions = ({ onSelectVehicle, onEdit }) => {
  const [selected, setSelected] = useState(vehicles[0]);

  return (
    <div className="h-full flex flex-col">
      {/* Fixed top */}
      <div className="shrink-0">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Choose a ride</h2>

          <button
            type="button"
            onClick={onEdit}
            className="text-sm font-semibold underline"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Scrollable ride options */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.type}
            onClick={() => setSelected(vehicle)}
            className={`grid grid-cols-[70px_1fr_80px] items-center gap-3 rounded-xl p-3 cursor-pointer active:scale-[0.98] transition border-2 ${
              selected.type === vehicle.type
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <div className="w-[60px] h-[58px] bg-[#eeeeee] rounded-lg flex items-center justify-center shrink-0">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-contain"
              />
            </div>

        
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-5">
                {vehicle.name}{" "}
                <span className="text-sm font-semibold">
                  👤 {vehicle.capacity}
                </span>
              </h3>

              <p className="text-sm font-medium leading-5">{vehicle.time}</p>

              <p className="text-sm text-gray-600 leading-5">
                {vehicle.desc}
              </p>
            </div>

      
            <p className="font-bold text-lg text-right w-[80px]">
              {vehicle.price}
            </p>
          </div>
        ))}
      </div>

  
      <div className="shrink-0 pt-3 bg-white">
        <button
          type="button"
          onClick={() => onSelectVehicle(selected)}
          className="w-full h-[52px] bg-black text-white rounded-lg font-semibold active:scale-[0.97] transition"
        >
          Confirm ride
        </button>
      </div>
    </div>
  );
};

export default VehicleOptions;