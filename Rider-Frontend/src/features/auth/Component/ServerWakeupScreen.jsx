import React, { useEffect, useState } from "react"

const ServerWakeupScreen = () => {
    const [seconds, setSeconds] = useState(60)

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) return 0
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center pointer-events-auto">
            <div className="relative flex items-center justify-center w-56 h-56">
                <div className="absolute w-52 h-52 rounded-full border border-white/10 animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite]" />

                <div className="absolute w-44 h-44 rounded-full border border-white/15 animate-[ping_3.4s_cubic-bezier(0,0,0.2,1)_infinite]" />

                <div className="absolute w-36 h-36 rounded-full bg-white/[0.03] border border-white/10 animate-pulse" />

                <div className="absolute w-24 h-24 rounded-full bg-white/[0.04] border border-white/15 shadow-[0_0_70px_rgba(255,255,255,0.12)] animate-pulse" />

                <h1 className="relative text-white text-3xl font-extrabold tracking-tight drop-shadow-[0_0_22px_rgba(255,255,255,0.25)]">
                    RideMate
                </h1>
            </div>

            <div className="mt-12 text-center px-8">
                <p className="text-white text-lg font-bold">
                    Starting your ride app
                </p>

                <p className="text-white/50 text-sm mt-2 leading-relaxed">
                    Free server is waking up. Please wait...
                </p>

                <div className="mt-6 w-56 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{
                            width: `${((60 - seconds) / 60) * 100}%`,
                        }}
                    />
                </div>

                <p className="text-white/40 text-xs mt-4">
                    About {seconds}s remaining
                </p>
            </div>
        </div>
    )
}

export default ServerWakeupScreen