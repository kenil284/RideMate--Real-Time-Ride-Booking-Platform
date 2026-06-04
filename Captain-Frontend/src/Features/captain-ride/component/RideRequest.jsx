import { FaCar, FaClock, FaRoad } from "react-icons/fa6";

const RideRequest = ({ ride, onAccept, onCancel }) => {
  if (!ride) return null;

  const trimAddress = (address = "", limit = 62) => {
    return address.length > limit ? address.slice(0, limit) + "..." : address;
  };

  const vehicleImages = {
    car: "/car_3d.png",
    auto: "/Auto.png",
    bike: "/MotorcycleOrange-249-0.png",
  };

  const vehicleImage = vehicleImages[ride.vehicle?.type];

  return (
    <div className="ride-request-enter">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          New request nearby
        </div>

        <h2 className="text-[24px] font-bold text-black leading-tight">
          Ride request
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review trip details and choose your action
        </p>
      </div>

      <div className="rounded-[30px] bg-white border border-gray-100 shadow-[0_12px_35px_rgba(0,0,0,0.09)] p-5">
        {/* fare + vehicle */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
              Estimated fare
            </p>

            <h1 className="text-[34px] font-bold text-black leading-none mt-2">
              ₹{ride.fare}
            </h1>
          </div>

          <div className="w-24 h-20 rounded-3xl bg-gray-50 flex items-center justify-center">
            {vehicleImage ? (
              <img
                src={vehicleImage}
                alt="vehicle"
                className="w-20 h-20 object-contain"
              />
            ) : (
              <FaCar className="text-3xl text-black" />
            )}
          </div>
        </div>

        {/* time distance */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <FaClock />
              Time
            </div>

            <p className="text-lg font-bold text-black mt-1">
              {ride.durationMin} min
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <FaRoad />
              Distance
            </div>

            <p className="text-lg font-bold text-black mt-1">
              {ride.distanceKm} km
            </p>
          </div>
        </div>

        {/* route */}
        <div className="rounded-[24px] bg-gray-50 p-4 mb-5">
          <div className="relative pl-8">
            <div className="absolute left-[7px] top-5 bottom-6 w-[2px] bg-gray-200" />

            <div className="relative mb-5">
              <span className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-black ring-4 ring-white" />

              <p className="text-[11px] font-bold text-gray-400 uppercase">
                Pickup
              </p>

              <h4 className="text-[14px] font-semibold text-black leading-snug mt-1">
                {trimAddress(ride.pickup?.address)}
              </h4>
            </div>

            <div className="relative">
              <span className="absolute -left-8 top-1 w-4 h-4 rounded-md bg-black ring-4 ring-white" />

              <p className="text-[11px] font-bold text-gray-400 uppercase">
                Destination
              </p>

              <h4 className="text-[14px] font-semibold text-black leading-snug mt-1">
                {trimAddress(ride.destination?.address)}
              </h4>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onCancel(ride)}
            className="h-14 rounded-2xl bg-gray-100 text-black font-bold active:scale-95 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onAccept(ride)}
            className="h-14 rounded-2xl bg-black text-white font-bold shadow-lg active:scale-95 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;