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
  <div className="h-full flex flex-col font-sans">
    {/* Header */}
    <div className="shrink-0">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">
            {activeField === "pickup" ? "Search pickup" : "Search destination"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {activeField === "pickup"
              ? "Choose your pickup location"
              : "Choose where you want to go"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-bold text-black bg-[#f3f3f3] px-4 py-2 rounded-full active:scale-95 transition"
        >
          Back
        </button>
      </div>

      {/* Search Input Card */}
      <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-gray-100 p-3 mb-4">
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
          className="w-full h-[52px] bg-[#f5f5f5] rounded-2xl px-4 text-[15px] font-semibold text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    {/* current location */}
    {activeField === "pickup" && (
      <button
        type="button"
        onClick={getCurrentLocation}
        disabled={isLocationLoading}
        className="shrink-0 w-full bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-gray-100 p-4 mb-4 flex gap-4 text-left active:scale-[0.98] transition disabled:opacity-60"
      >
        <div className="w-11 h-11 rounded-full bg-[#f3f3f3] flex items-center justify-center shrink-0 text-lg">
          🎯
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-black">
            {isLocationLoading ? "Fetching location..." : "Use current location"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Detect your pickup location
          </p>
        </div>
      </button>
    )}

    {/* Results */}
    <div className="flex-1 overflow-y-auto pr-1 pb-3">
      {isSearching ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-4 flex gap-4 animate-pulse"
            >
              <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0"></div>

              <div className="flex-1 pt-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : value.trim().length < 2 ? (
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500">
            Start typing to search location
          </p>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div
              key={item.placeId || index}
              onClick={() => onSelect(item)}
              className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-gray-100 p-4 flex gap-4 cursor-pointer active:scale-[0.98] transition"
            >
              <div className="w-11 h-11 rounded-full bg-[#f3f3f3] flex items-center justify-center shrink-0 text-lg">
                📍
              </div>

              <div className="min-w-0">
                <h3 className="text-[15px] font-bold text-black leading-5">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-5 mt-1">
                  {item.fullAddress || item.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500">
            No location found
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default LocationSearch;