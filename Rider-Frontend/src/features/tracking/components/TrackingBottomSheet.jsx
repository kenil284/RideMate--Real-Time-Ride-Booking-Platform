import React from 'react';
import { FaPhone, FaHeadset } from "react-icons/fa6";

const TrackingBottomSheet = ({ rideData }) => {
  const distance = rideData?.distanceKm ? `${rideData.distanceKm} km` : '--';
  const duration = rideData?.durationMin ? `${rideData.durationMin} min` : '--';
  
  const captainName = rideData?.captain?.fullname?.firstname || "Captain";
  const vehicleName = rideData?.captain?.vehicle?.vehicleName || "Vehicle";
  const vehicleColor = rideData?.captain?.vehicle?.color || "Color";
  const plateNumber = rideData?.captain?.vehicle?.plate || "Fetching...";
  const vehicleType = rideData?.captain?.vehicle?.vehicleType || "car";

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] px-4 pt-3 pb-6 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
      
      {/* Drag Handle */}
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

      {/* Top Status Row (Exactly matching WaitingForDriver typography) */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Ride in progress
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[23px] font-bold text-gray-950 leading-tight">
              Rider is on the way
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tracking active
            </p>
          </div>

          <div className="text-right shrink-0">
            <h3 className="text-[22px] font-bold text-gray-950 leading-none">
              {duration}
            </h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">
              {distance} left
            </p>
          </div>
        </div>
      </div>

      {/* Captain Info Card (Exactly matching WaitingForDriver card styles) */}
      <div className="rounded-[28px] bg-white border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-[52px] h-[52px] rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-800 shrink-0 capitalize">
              {captainName.charAt(0)}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-950 capitalize truncate">
                {captainName}
              </h3>
              <p className="text-sm text-gray-500 capitalize truncate">
                {vehicleName} • {vehicleColor}
              </p>
              <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase">
                {plateNumber}
              </p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Action Buttons (Exactly matching WaitingForDriver button styles) */}
      <div className="w-full grid grid-cols-2 gap-3">
        <button className="h-14 rounded-2xl bg-gray-950 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition">
          <FaPhone className="text-sm" />
          Call Rider
        </button>

        <button className="h-14 rounded-2xl bg-gray-100 text-gray-800 font-bold flex items-center justify-center gap-2 active:scale-95 transition">
          <FaHeadset className="text-sm" />
          Support
        </button>
      </div>
    </div>
  );
};

export default TrackingBottomSheet;