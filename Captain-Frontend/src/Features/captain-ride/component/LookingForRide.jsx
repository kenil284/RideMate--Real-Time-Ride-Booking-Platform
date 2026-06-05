import { useState } from "react";
import { FaCar, FaWallet } from "react-icons/fa";
import { MdNotificationsActive, MdNotificationsOff } from "react-icons/md";
import EarningCard from "./EarningCard";
import { disableNotificationSound, enableNotificationSound } from "../services/notificationSound.service";


const LookingForRide = ({ dashboard, isOnline }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleToggleSound = async () => {
    if (isSoundEnabled) {
      disableNotificationSound();
      setIsSoundEnabled(false);
      return;
    }

    const enabled = await enableNotificationSound();

    if (enabled) {
      setIsSoundEnabled(true);
    } else {
      alert("Sound could not be enabled. Please tap again.");
    }
  };

  return (
    <div className="relative">
      {isOnline && (
        <button
          onClick={handleToggleSound}
          className={`
            absolute top-0 right-0 z-20 h-10 px-3 rounded-2xl
            flex items-center gap-2 shadow-sm active:scale-95 transition
            ${
              isSoundEnabled
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }
          `}
        >
          {isSoundEnabled ? (
            <MdNotificationsActive className="text-lg" />
          ) : (
            <MdNotificationsOff className="text-lg" />
          )}
        </button>
      )}

      {isOnline && (
        <div className="flex flex-col items-center text-center pt-6 pb-7">
          <div className="relative w-36 h-32 flex items-center justify-center mb-5">
            <span className="absolute inset-4 rounded-full bg-blue-400/30 animate-ping [animation-duration:1.8s]" />

            <span className="absolute inset-8 rounded-full bg-blue-300/30 animate-ping [animation-duration:1.8s] [animation-delay:0.4s]" />

            <img
              src="/car_3d.png"
              alt="captain vehicle"
              className="relative z-10 w-32 h-32 object-contain drop-shadow-xl"
            />
          </div>

          <h2 className="text-2xl font-bold text-black">
            Looking for rides
          </h2>

          <p className="text-sm text-gray-500 mt-2 max-w-[260px]">
            You are online. New ride requests will appear here.
          </p>

        
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <EarningCard
          icon={<FaWallet />}
          title="Today’s earnings"
          value={`₹${dashboard.todayEarning}`}
          subtitle="Today"
        />

        <EarningCard
          icon={<FaCar />}
          title="Today rides"
          value={dashboard.todayRides}
          subtitle="Today"
        />
      </div>
    </div>
  );
};

export default LookingForRide;