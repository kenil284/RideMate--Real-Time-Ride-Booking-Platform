import React, { useEffect, useRef } from "react";

const LocationSearch = ({
  activeField,
  value,
  updateRideData,
  suggestions,
  onSelect,
  onClose,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        onChange={(e) => updateRideData(activeField, e.target.value)}
        placeholder={
          activeField === "pickup"
            ? "Add a pick-up location"
            : "Enter your destination"
        }
        className="w-full h-[52px] shrink-0 bg-[#eeeeee] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black mb-5"
      />

      {/* only this part scrolls */}
      <div className="flex-1 overflow-y-auto pr-1">
        {suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect(item)}
              className="flex gap-4 py-4 border-b border-[#eeeeee] cursor-pointer active:scale-[0.98] transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#eeeeee] flex items-center justify-center shrink-0">
                📍
              </div>

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.address}</p>
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