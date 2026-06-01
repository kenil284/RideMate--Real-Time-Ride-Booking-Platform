import React from "react";

const WaitingForDriver = ({ rideData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Meet at the pickup point</h2>

      <div className="bg-[#eeeeee] rounded-lg p-4 mb-4">
        <h3 className="font-bold">{rideData.driver?.name}</h3>
        <p className="text-sm text-gray-600">{rideData.driver?.plate}</p>
        <p className="text-sm">⭐ {rideData.driver?.rating}</p>
      </div>

      <p className="mb-4">
        <span className="font-bold">Pickup:</span> {rideData.pickup}
      </p>

      <button className="w-full h-[52px] bg-[#eeeeee] rounded-lg font-semibold">
        Send a message...
      </button>
    </div>
  );
};

export default WaitingForDriver;