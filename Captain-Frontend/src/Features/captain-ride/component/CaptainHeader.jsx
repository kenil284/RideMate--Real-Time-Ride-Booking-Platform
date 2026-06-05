import { IoMenu } from "react-icons/io5";
import { enableNotificationSound } from "../services/notificationSound.service";


const CaptainHeader = ({ isOnline, onToggle,isUpdating, username = "Captain", isAvailabilityDisabled }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-5 pb-20 bg-gradient-to-b from-white via-white/90 to-transparent">
      <div className="flex items-start justify-between">
        <button className="w-11 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl text-black">
          <IoMenu />
        </button>

        <div className="flex-1 px-4">
          <h1 className="text-[17px] font-bold text-black leading-tight">
            Good morning, {username} 👋
          </h1>

          <p className="text-[12px] text-gray-500 mt-1">
            {isOnline
              ? "Ready to roll? Let’s earn more today"
              : "You are offline. Go online to get rides"}
          </p>
        </div>

        <button
          onClick={() => {
            if (isAvailabilityDisabled) return
            onToggle()
            enableNotificationSound()
          }}
          disabled={isAvailabilityDisabled || isUpdating}
          className={`
    h-11 px-3 rounded-2xl bg-white shadow-lg flex items-center gap-2 transition
    ${isAvailabilityDisabled
              ? "opacity-50 cursor-not-allowed"
              : "active:scale-95"
            }
  `}
        >
          <span
            className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
          />

          <span className="text-[12px] font-semibold text-black">
            {isOnline ? "Online" : "Offline"}
          </span>

          <span
            className={`w-10 h-6 rounded-full p-1 flex transition-all duration-300 ${isOnline ? "bg-black justify-end" : "bg-gray-300 justify-start"
              }`}
          >
            <span className="w-4 h-4 rounded-full bg-white" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CaptainHeader;