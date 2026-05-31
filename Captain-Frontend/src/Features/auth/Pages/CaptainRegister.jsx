import React from "react";
import { Link } from "react-router-dom";

const CaptainRegister = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="bg-black text-white px-7 py-5 flex items-center justify-between sticky top-0">
                <h1 className="text-2xl font-medium">Uber</h1>

                <Link to="/login" className="text-sm font-semibold underline underline-offset-2">
                    Log in
                </Link>
            </header>

            {/* Register Form */}
            <main className="flex-1 px-5 pt-6 pb-10">
                <div className="w-full max-w-[420px] mx-auto">
                    <h2 className="text-[24px] leading-[32px] font-bold mb-2">
                        Sign up to drive
                    </h2>

                    <p className="text-[14px] text-gray-600 mb-6">
                        Create your captain account and start earning with Uber.
                    </p>

                    <form className="space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="fullname[firstname]"
                                placeholder="First name"
                                className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                            />

                            <input
                                type="text"
                                name="fullname[lastname]"
                                placeholder="Last name"
                                className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Captain email"
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone number"
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                        />

                        {/* Vehicle Details */}
                        <h3 className="text-lg font-bold pt-4">Vehicle details</h3>

                        <input
                            type="text"
                            name="vehicle[color]"
                            placeholder="Vehicle color"
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="text"
                            name="vehicle[plate]"
                            placeholder="Vehicle plate number"
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 uppercase outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="number"
                            name="vehicle[capacity]"
                            placeholder="Vehicle capacity"
                            min="1"
                            max="7"
                            onInput={(e) => {
                                if (e.target.value > 7) e.target.value = 7;
                                if (e.target.value < 1 && e.target.value !== "") e.target.value = 1;
                            }}
                            className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 outline-none focus:ring-2 focus:ring-black"
                        />

                        <div>
                            <p className="font-semibold mb-3">Select vehicle type</p>

                            <div className="grid grid-cols-3 gap-3">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="vehicle[vehicleType]"
                                        value="car"
                                        className="peer hidden"
                                    />
                                    <div className="h-[52px] rounded-lg bg-[#f3f3f3] flex items-center justify-center font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                        Car
                                    </div>
                                </label>

                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="vehicle[vehicleType]"
                                        value="bike"
                                        className="peer hidden"
                                    />
                                    <div className="h-[52px] rounded-lg bg-[#f3f3f3] flex items-center justify-center font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                        Bike
                                    </div>
                                </label>

                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="vehicle[vehicleType]"
                                        value="auto"
                                        className="peer hidden"
                                    />
                                    <div className="h-[52px] rounded-lg bg-[#f3f3f3] flex items-center justify-center font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                        Auto
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-5 h-[52px] bg-black text-white rounded-lg font-semibold text-[16px] transition-all duration-150 hover:bg-[#222] active:scale-[0.97]"
                        >
                            Create captain account
                        </button>
                    </form>

                    <p className="text-[14px] text-gray-700 mt-5 text-center">
                        Already have a captain account?{" "}
                        <Link
                            to="/login"
                            className="text-black font-semibold underline"
                        >
                            Log in
                        </Link>
                    </p>

                    <p className="text-[12px] leading-[20px] text-gray-600 mt-8">
                        By signing up, you agree to receive calls, WhatsApp or SMS messages,
                        including by automated means, from Uber and its affiliates.
                    </p>

                    <p className="text-[12px] leading-[20px] text-gray-600 mt-4">
                        By continuing, you agree to Uber&apos;s{" "}
                        <span className="text-black underline">Terms of Use</span> and
                        acknowledge that you have read the{" "}
                        <span className="text-black underline">Privacy Policy</span>.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default CaptainRegister;