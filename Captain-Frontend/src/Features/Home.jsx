import React, { useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const captainSteps = [
        {
            image: "/Home/requirement.svg",
            title: "Basic requirements",
            points: [
                "Be at least 18 years old",
                "Have a valid phone number",
                "Clear RideMate verification",
            ],
        },
        {
            image: "/Home/document.svg",
            title: "Required documents",
            points: [
                "Valid driving license",
                "Address or residency proof",
                "Vehicle insurance and registration documents",
            ],
        },
        {
            image: "/Home/signup.svg",
            title: "Start onboarding",
            points: [
                "Create your RideMate captain account",
                "Upload your documents and vehicle details",
                "Go online after approval and start accepting rides",
            ],
        },
    ]

    const benefits = [
        {
            image: "/Home/calander.svg",
            title: "Work on your time",
            description: "Go online whenever you are available and manage your own daily schedule.",
        },
        {
            image: "/Home/money.svg",
            title: "Clear ride earnings",
            description: "View fare, distance, duration, and ride details before moving ahead.",
        },
        {
            image: "/Home/support.svg",
            title: "Ride workflow support",
            description: "Get a simple flow from request received to ride completed.",
        },
    ]

    const safetyItems = [
        {
            image: "/Home/protection.svg",
            title: "Verified ride flow",
            description: "Every ride moves through clear stages like accepted, started, completed, or cancelled.",
        },
        {
            image: "/Home/message.svg",
            title: "Live ride updates",
            description: "Stay updated with ride status, pickup details, route movement, and notifications.",
        },
        {
            image: "/Home/community-guidlines.svg",
            title: "Better trip experience",
            description: "Clean actions and grouped information help captains focus on the current ride.",
        },
    ]

    const [index, setIndex] = useState(0)

    const current = captainSteps[index]

    return (
        <div className="min-h-screen font-sans text-black">
            {/* Header */}
                <header className="sticky top-[-1px] z-50 bg-black text-white px-5 py-3 min-h-[60px]">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 active:scale-95 transition">
                      <span className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                        RM
                      </span>
            
                      <h1 className="text-lg font-semibold tracking-tight">
                        RideMate
                      </h1>
                    </Link>
            
                    <div className="flex items-center gap-3">
                      <Link to="/login" className="text-sm font-semibold text-white/90">
                        Log in
                      </Link>
            
                      <Link
                        to="/register"
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </header>
            

            {/* Intro */}
            <section className="px-5 pt-5 pb-3">
                <p className="text-[12px] font-semibold text-black/55 mb-1.5">
                    Captain partner app
                </p>

                <h1 className="text-[24px] leading-[30px] font-bold tracking-tight">
                    Earn with RideMate
                </h1>
            </section>

            {/* Hero */}
            <section className="px-5 pt-2 pb-8">
                <div className="bg-black text-white rounded-2xl px-5 py-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-5">
                        <span className="h-2 w-2 rounded-full bg-white"></span>

                        <p className="text-[11px] font-semibold tracking-wide">
                            Mobile ride platform
                        </p>
                    </div>

                    <h2 className="text-[24px] leading-[31px] font-bold tracking-tight mb-3">
                        Become a RideMate Captain
                    </h2>

                    <p className="text-sm leading-6 text-white/75 mb-6">
                        Accept nearby ride requests, track live routes, and manage your ride workflow from your mobile dashboard.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/register"
                            className="h-12 bg-white text-black px-5 rounded-xl font-semibold text-sm flex items-center justify-center active:scale-95 transition"
                        >
                            Get started
                        </Link>

                        <Link
                            to="/login"
                            className="text-sm font-semibold border-b border-white pb-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="px-5 py-8">
                <div className="mb-5">
                    <p className="text-[12px] font-semibold text-black/55 mb-1.5">
                        Why captains choose us
                    </p>

                    <h2 className="text-[22px] leading-[28px] font-bold tracking-tight">
                        Built for simple and reliable rides
                    </h2>
                </div>

                <div className="w-full h-[130px] rounded-2xl flex items-center justify-center mb-5 overflow-hidden">
                    <img
                        src="/Home/driver.svg"
                        alt="RideMate captain"
                        className="h-full object-contain"
                    />
                </div>

                <div className="space-y-3">
                    {benefits.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-black/10 p-4 bg-white"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-8 h-8 object-contain mb-4"
                            />

                            <h3 className="text-[16px] leading-6 font-bold mb-1.5">
                                {item.title}
                            </h3>

                            <p className="text-sm leading-6 text-black/65">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Onboarding */}
            <section className="px-5 py-8">
                <div className="mb-5">
                    <p className="text-[12px] font-semibold text-black/55 mb-1.5">
                        Onboarding
                    </p>

                    <h2 className="text-[22px] leading-[28px] font-bold tracking-tight">
                        What you need to start
                    </h2>
                </div>

                <div className="flex items-center gap-3 border-b border-black/10 mb-5">
                    <button className="pb-3 px-1 border-b-[3px] border-black text-sm font-semibold">
                        Captain
                    </button>
                </div>

                <div className="rounded-2xl border border-black/10 p-4 bg-white min-h-[245px]">
                    <img
                        src={current.image}
                        alt={current.title}
                        className="w-8 h-8 object-contain mb-5"
                    />

                    <h3 className="text-[18px] leading-6 font-bold mb-3">
                        {current.title}
                    </h3>

                    <ul className="list-disc pl-5 space-y-2 text-sm leading-6 text-black/70">
                        {current.points.map((point, i) => (
                            <li key={i}>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-between mt-5">
                    <p className="font-semibold text-sm">
                        Step {index + 1} of {captainSteps.length}
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={index === 0}
                            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 18L9 12L15 6" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setIndex((prev) => Math.min(prev + 1, captainSteps.length - 1))
                            }
                            disabled={index === captainSteps.length - 1}
                            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18L15 12L9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Safety */}
            <section className="px-5 py-8">
                <div className="mb-5">
                    <p className="text-[12px] font-semibold text-black/55 mb-1.5">
                        Safety and control
                    </p>

                    <h2 className="text-[22px] leading-[28px] font-bold tracking-tight mb-3">
                        Designed for safer everyday rides
                    </h2>

                    <p className="text-sm leading-6 text-black/65">
                        RideMate keeps captain and rider details connected with a clear mobile-first ride flow.
                    </p>
                </div>

                <div className="space-y-3">
                    {safetyItems.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-black/10 p-4 bg-white"
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-8 h-8 object-contain"
                                />
                            </div>

                            <h3 className="text-[16px] leading-6 font-bold mb-1.5">
                                {item.title}
                            </h3>

                            <p className="text-sm leading-6 text-black/65">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Note */}
            <section className="px-5 py-8">
                <div className="rounded-2xl border border-black/10 p-4 bg-white">
                    <p className="text-[12px] leading-5 text-black/60 mb-3">
                        RideMate captain onboarding depends on document verification, vehicle details, location availability, and platform rules.
                    </p>

                    <p className="text-[12px] leading-5 text-black/60">
                        Ride requests and earnings may vary based on city, demand, captain availability, and completed trips.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white px-5 pt-10 pb-28">
                <div className="flex items-center gap-2 mb-7">
                    <span className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                        RM
                    </span>

                    <h2 className="text-xl font-semibold">
                        RideMate
                    </h2>
                </div>

                <p className="text-sm text-white/70 mb-8">
                    Ride smart. Drive better.
                </p>

                <div className="space-y-8">
                    <div>
                        <h3 className="font-bold text-base mb-4">
                            Company
                        </h3>

                        <div className="space-y-3 text-sm text-white/75">
                            <p>About RideMate</p>
                            <p>Captain program</p>
                            <p>Help center</p>
                            <p>Careers</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-base mb-4">
                            Platform
                        </h3>

                        <div className="space-y-3 text-sm text-white/75">
                            <p>Ride booking</p>
                            <p>Captain dashboard</p>
                            <p>Live ride tracking</p>
                            <p>Ride safety</p>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 z-50 border-t border-black/10">
                <Link to="/register">
                    <button className="w-full h-12 bg-black text-white rounded-xl font-semibold text-sm active:scale-95 transition">
                        Sign up as captain
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home