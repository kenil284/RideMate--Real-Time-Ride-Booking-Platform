import { IoMenu } from "react-icons/io5"
import { enableNotificationSound } from "../services/notificationSound.service"
import { useState } from "react"

const CaptainHeader = ({
  isOnline,
  onToggle,
  isUpdating,
  username = "Captain",
  isAvailabilityDisabled,
  onLogout
}) => {
  const handleToggle = () => {
    if (isAvailabilityDisabled || isUpdating) return

    onToggle()
    enableNotificationSound()
  }

  const statusText = isAvailabilityDisabled ? "Busy" : isOnline ? "Online" : "Offline"

  const message = isAvailabilityDisabled ? "Ride in progress" : isOnline ? "Ready for ride requests" : "Go online to get rides"

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-4 pb-12 bg-gradient-to-b from-white/70 via-white/25 to-transparent pointer-events-none">
      <div className="max-w-[430px] mx-auto pointer-events-auto">
        <div className="rounded-[30px] bg-[#111217]/95 text-white shadow-[0_20px_55px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-xl px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="w-12 h-12 rounded-[20px] bg-white/10 text-white flex items-center justify-center text-2xl active:scale-95 transition"
              >
                <IoMenu />
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 top-14 w-40 rounded-2xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      onLogout()
                    }}
                    disabled={isAvailabilityDisabled}
                    className={`
          w-full px-4 py-3 text-left text-sm font-semibold transition
          ${isAvailabilityDisabled
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-900 active:bg-gray-100"
                      }
        `}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.12em]">
                Good morning
              </p>

              <h1 className="text-[17px] font-extrabold text-white leading-tight truncate mt-0.5">
                {username} 👋
              </h1>

              <p className="text-[12px] text-white/55 mt-0.5 truncate">
                {message}
              </p>
            </div>

            <button
              onClick={handleToggle}
              disabled={isAvailabilityDisabled || isUpdating}
              className={`
                w-[118px] h-12 rounded-[20px] px-3 flex items-center justify-between shrink-0 transition
                ${isAvailabilityDisabled
                  ? "bg-white/10 text-white/35 cursor-not-allowed opacity-70"
                  : "bg-white/10 text-white active:scale-95"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`
                    w-2 h-2 rounded-full shrink-0
                    ${isAvailabilityDisabled
                      ? "bg-gray-500"
                      : isOnline
                        ? "bg-green-400"
                        : "bg-gray-400"
                    }
                  `}
                />

                <span className="text-[12px] font-extrabold">
                  {statusText}
                </span>
              </div>

              <span
                className={`
                  w-9 h-5 rounded-full p-0.5 flex transition-all duration-300
                  ${isOnline && !isAvailabilityDisabled
                    ? "bg-white justify-end"
                    : "bg-white/20 justify-start"
                  }
                  ${isUpdating ? "opacity-60" : ""}
                `}
              >
                <span
                  className={`
                    w-4 h-4 rounded-full shadow-sm
                    ${isOnline && !isAvailabilityDisabled
                      ? "bg-gray-950"
                      : "bg-white"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainHeader