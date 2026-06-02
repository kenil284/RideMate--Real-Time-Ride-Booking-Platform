import React, { useEffect, useRef } from "react";

const LocationSearch = ({
  activeField,
  value,
  updateLocationText,
  suggestions,
  onSelect,
  onClose,
  getCurrentLocation,
  isLocationLoading,
  isSearching,
}) => {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current.focus()
  }, [])


  return (
    <div className="h-full flex flex-col">
      <button
        type="button"
        onClick={onClose}
        className="text-sm font-semibold underline mb-4 w-fit"
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4 shrink-0">
        {activeField === "pickup" ? "Search pickup" : "Search destination"}
      </h2>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => updateLocationText(activeField, e.target.value)}
        placeholder={
          activeField === "pickup"
            ? "Add a pick-up location"
            : "Enter your destination"
        }
        className="w-full h-[52px] shrink-0 bg-[#eeeeee] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black mb-5"
      />

      {activeField === "pickup" && (
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLocationLoading}
          className="flex gap-4 py-4 border-b border-[#eeeeee] cursor-pointer text-left active:scale-[0.98] transition disabled:opacity-60"
        >
          <div className="w-10 h-10 rounded-full bg-[#eeeeee] flex items-center justify-center shrink-0">
            🎯
          </div>

          <div>
            <h3 className="font-semibold">
              {isLocationLoading ? "Fetching location..." : "Use current location"}
            </h3>
            <p className="text-sm text-gray-600">
              Detect your pickup location
            </p>
          </div>
        </button>
      )}



      <div className="flex-1 overflow-y-auto pr-1">
        {isSearching ? (
          <div className="space-y-3 mt-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-4 py-4 border-b border-[#eeeeee] animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>

                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : value.trim().length < 2 ? (
          <p className="text-gray-500 mt-5">Start typing to search location</p>
        ) : suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div
              key={item.placeId || index}
              onClick={() => onSelect(item)}
              className="flex gap-4 py-4 border-b border-[#eeeeee] cursor-pointer active:scale-[0.98] transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#eeeeee] flex items-center justify-center shrink-0">
                📍
              </div>

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.fullAddress || item.address}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-5">No location found</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;