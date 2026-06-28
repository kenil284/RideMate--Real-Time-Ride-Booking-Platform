import React from 'react';

const TrackingHeader = ({ destination }) => {
  return (
    // font-sans defaults to system fonts (SF Pro/Roboto) for a native app feel
    <div className="absolute top-safe pt-4 left-4 right-4 z-50 font-sans">
      <div className="bg-[#1a1a1a] rounded-[32px] p-3 pl-3 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-3">
        
        {/* Left Icon */}
        <div className="w-[46px] h-[46px] shrink-0 bg-white rounded-full flex items-center justify-center text-[22px] shadow-sm">
          📍
        </div>
        
        {/* Text Content - min-w-0 ensures truncation works */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] leading-none mb-1.5">
            Live Tracking
          </p>
          <p className="text-[16px] font-semibold text-white leading-tight truncate">
            Heading to destination
          </p>
          <p className="text-[12px] text-gray-400 truncate mt-0.5 font-medium">
            {destination || "Fetching location..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackingHeader;