import React from "react";

const ConfirmRide = ({ rideData, onBack, onConfirm }) => {
  return (
    <div>
      <button onClick={onBack} className="text-sm font-semibold underline mb-4">
        Change ride
      </button>

      <h2 className="text-2xl font-bold mb-5">Confirm your ride</h2>

      <div className="space-y-3 mb-5">
        <p>
          <span className="font-bold">Pickup:</span> {rideData.pickup}
        </p>

        <p>
          <span className="font-bold">Destination:</span>{" "}
          {rideData.destination}
        </p>

        <p>
          <span className="font-bold">Vehicle:</span> {rideData.vehicleType}
        </p>

        <p>
          <span className="font-bold">Fare:</span> {rideData.fare}
        </p>
      </div>

      <button
        onClick={onConfirm}
        className="w-full h-[52px] bg-black text-white rounded-lg font-semibold active:scale-[0.97] transition"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;