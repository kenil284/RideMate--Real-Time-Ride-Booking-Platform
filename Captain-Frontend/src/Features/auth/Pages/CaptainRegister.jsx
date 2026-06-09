import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.js";

const CaptainRegister = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("car");

    const { handleRegister, isRegistering } = useAuth();

    const history = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const data = await handleRegister({
                fullname: {
                    firstname: firstName,
                    lastname: lastName,
                },
                email,
                password,
                phone,
                vehicle: {
                    color: vehicleColor,
                    vehicleName: vehicleName,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType
                }
            });

            if (!data) {
                return
            }

            history("/login")

        } catch (error) {

        }

    };

    return (
    <div className="min-h-screen flex flex-col font-sans text-black">
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

                <Link to="/login" className="text-sm font-semibold text-white/90">
                    Log in
                </Link>
            </div>
        </header>

        {/* Register Form */}
        <main className="flex-1 px-5 pt-6 pb-8">
            <div className="w-full max-w-[420px] mx-auto">
                <div className="mb-6">
                    <h2 className="text-[24px] leading-[30px] font-bold tracking-tight">
                        Create captain account
                    </h2>

                    <p className="text-sm leading-6 text-gray-600 mt-2">
                        Register your profile and vehicle details to start accepting rides on RideMate.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Personal Details */}
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <h3 className="text-[16px] leading-6 font-bold mb-4">
                            Personal details
                        </h3>

                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="fullname[firstname]"
                                    placeholder="First name"
                                    className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                                <input
                                    type="text"
                                    name="fullname[lastname]"
                                    placeholder="Last name"
                                    className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <input
                                type="email"
                                name="email"
                                placeholder="Captain email"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Create password"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                name="phone"
                                placeholder="Phone number"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={phone}
                                maxLength={10}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                                    setPhone(value)
                                }}
                            />
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="mb-4">
                            <h3 className="text-[16px] leading-6 font-bold mb-1.5">
                                Vehicle details
                            </h3>

                            <p className="text-sm leading-6 text-gray-600">
                                Add the vehicle information used during ride assignment.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="vehicle[color]"
                                placeholder="Vehicle color"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={vehicleColor}
                                onChange={(e) => setVehicleColor(e.target.value)}
                            />

                            <input
                                type="text"
                                name="vehicle[vehicleName]"
                                placeholder="Vehicle name"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={vehicleName}
                                onChange={(e) => setVehicleName(e.target.value)}
                            />

                            <input
                                type="text"
                                name="vehicle[plate]"
                                placeholder="Vehicle plate number"
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] uppercase outline-none focus:ring-2 focus:ring-black"
                                value={vehiclePlate}
                                onChange={(e) => setVehiclePlate(e.target.value)}
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
                                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black"
                                value={vehicleCapacity}
                                onChange={(e) => setVehicleCapacity(e.target.value)}
                            />

                            <div>
                                <p className="text-[13px] font-semibold mb-2">
                                    Select vehicle type
                                </p>

                                <div className="grid grid-cols-3 gap-3">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="vehicle[vehicleType]"
                                            value="car"
                                            checked={vehicleType === "car"}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                            className="peer hidden"
                                        />
                                        <div className="h-12 rounded-xl bg-[#f3f3f3] flex items-center justify-center text-sm font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                            Car
                                        </div>
                                    </label>

                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="vehicle[vehicleType]"
                                            value="bike"
                                            checked={vehicleType === "bike"}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                            className="peer hidden"
                                        />
                                        <div className="h-12 rounded-xl bg-[#f3f3f3] flex items-center justify-center text-sm font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                            Bike
                                        </div>
                                    </label>

                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="vehicle[vehicleType]"
                                            value="auto"
                                            checked={vehicleType === "auto"}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                            className="peer hidden"
                                        />
                                        <div className="h-12 rounded-xl bg-[#f3f3f3] flex items-center justify-center text-sm font-semibold border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all active:scale-95">
                                            Auto
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`
    w-full h-12 rounded-xl font-semibold text-[15px] transition-all duration-150 flex items-center justify-center gap-2
    ${isRegistering
                                ? "bg-black/80 text-white cursor-not-allowed"
                                : "bg-black text-white hover:bg-[#222] active:scale-[0.97]"
                            }
  `}
                    >
                        {isRegistering ? (
                            <>
                                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Create captain account"
                        )}
                    </button>
                </form>

                <p className="text-[13px] text-gray-700 mt-5 text-center">
                    Already have a captain account?{" "}
                    <Link
                        to="/login"
                        className="text-black font-semibold underline"
                    >
                        Log in
                    </Link>
                </p>

                <div className="mt-6 rounded-2xl border border-black/10 p-4">
                    <p className="text-[11px] leading-[18px] text-gray-600">
                        By signing up, you agree to receive calls, WhatsApp or SMS messages,
                        including by automated means, from RideMate and its partners.
                    </p>

                    <p className="text-[11px] leading-[18px] text-gray-600 mt-3">
                        By continuing, you agree to RideMate&apos;s{" "}
                        <span className="text-black underline">Terms of Use</span> and
                        acknowledge that you have read the{" "}
                        <span className="text-black underline">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </main>
    </div>
)
};

export default CaptainRegister;