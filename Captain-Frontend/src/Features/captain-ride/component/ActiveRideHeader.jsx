import React from "react"
import { FaArrowUpLong, FaLocationDot, FaPhone } from "react-icons/fa6"

const ActiveRideHeader = ({ ride, routeInfo, nextInstruction, stage }) => {
    const rider = ride?.rider

    const formatDistance = (instruction) => {
        const meters = instruction?.distanceMeters || 0

        if (!meters) return ""

        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(1)} km`
        }

        return `${Math.round(meters)} m`
    }

    const targetAddress = stage === "navigating" ? ride?.destination?.address : ride?.pickup?.address

    return (
        <div className="fixed top-4 left-2 right-2 z-[9999]">
            <div className="max-w-[430px] mx-auto rounded-[34px] bg-[#111217]/95 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] px-4 py-4 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-[22px] bg-white/10 flex items-center justify-center shrink-0">
                        <FaArrowUpLong className="text-xl text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-white/45 uppercase tracking-wide">
                            Next direction
                        </p>

                        <h3 className="text-[17px] font-bold truncate mt-0.5">
                            {nextInstruction?.text || "Continue to pickup"}
                        </h3>

                        <div className="flex items-center gap-2 mt-1 text-[13px] text-white/65">
                            {nextInstruction?.distanceMeters ? (
                                <>
                                    <span className="font-semibold text-white">
                                        In {formatDistance(nextInstruction)}
                                    </span>
                                    <span>•</span>
                                </>
                            ) : null}

                            <span>{routeInfo?.durationMin || "--"} min</span>
                            <span>•</span>
                            <span>{routeInfo?.distanceKm || "--"} km</span>
                        </div>
                    </div>

                    <a
                        href={rider?.phone ? `tel:${rider.phone}` : undefined}
                        className="w-14 h-14 rounded-[22px] bg-white text-gray-950 flex items-center justify-center shrink-0 active:scale-95 transition"
                    >
                        <FaPhone className="text-base" />
                    </a>
                </div>

                <div className="mt-3 h-[1px] bg-white/10" />

                <div className="mt-3 flex items-center gap-2 text-[12px] text-white/55">
                    <FaLocationDot className="text-[11px] shrink-0" />

                    <span className="truncate">
                        {targetAddress || "Location"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ActiveRideHeader