import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoCall, IoNavigate } from "react-icons/io5";
import { FaWallet, FaCar, FaClock } from "react-icons/fa";
import gsap from "gsap";

import Map from "../component/Map";
import Map2 from "../component/Map2";
import RequestCardStack from "../component/RequestCardStack";

const dummyRideRequests = [
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd7",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775dd",
        },
        captain: null,
        pickup: {
            address:
                "Matru Shree Clinic Skin Care, Dabholi Road, Surat - 395004, GJ, India",
            lat: 21.232863850132155,
            lng: 72.81898615026783,
        },
        destination: {
            address: "Dabholi Road, Surat - 395004, GJ, India",
            lat: 21.2307841,
            lng: 72.8194007,
        },
        distanceKm: 0.79,
        durationMin: 2,
        vehicle: {
            type: "car",
            name: "",
            image: "",
            capacity: 4,
        },
        fare: 80,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:02:55.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:02:55.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd8",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775de",
        },
        captain: null,
        pickup: {
            address: "Katargam Darwaja, Surat - 395004, GJ, India",
            lat: 21.2222,
            lng: 72.8311,
        },
        destination: {
            address: "Adajan Gam, Surat - 395009, GJ, India",
            lat: 21.1946,
            lng: 72.7997,
        },
        distanceKm: 5.4,
        durationMin: 16,
        vehicle: {
            type: "auto",
            name: "",
            image: "",
            capacity: 3,
        },
        fare: 122,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:06:10.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:06:10.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
    {
        _id: {
            $oid: "6a1f36efe022f1b4a8800cd9",
        },
        rider: {
            $oid: "6a1dcdd8bc13c0b24fb775df",
        },
        captain: null,
        pickup: {
            address: "Vesu, Surat - 395007, GJ, India",
            lat: 21.1417,
            lng: 72.7709,
        },
        destination: {
            address: "VR Mall, Dumas Road, Surat - 395007, GJ, India",
            lat: 21.1458,
            lng: 72.7572,
        },
        distanceKm: 2.8,
        durationMin: 9,
        vehicle: {
            type: "bike",
            name: "",
            image: "",
            capacity: 1,
        },
        fare: 65,
        paymentMethod: "cash",
        paymentStatus: "pending",
        status: "looking",
        otp: "",
        cancelledBy: null,
        cancelReason: "",
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        createdAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        updatedAt: {
            $date: "2026-06-02T20:09:22.169Z",
        },
        __v: 0,
    },
];

const CaptainHome = () => {
    const [isOnline, setIsOnline] = useState(true);

    // stages: looking | requests | accepted | navigating | otp
    const [stage, setStage] = useState("looking");



    const [requests, setRequests] = useState([]);
    const [acceptedRide, setAcceptedRide] = useState(null);
    const [isAccepting, setIsAccepting] = useState(false);

    const bottomBoxRef = useRef(null);

    useEffect(() => {
        if (!bottomBoxRef.current) return;

        gsap.fromTo(
            bottomBoxRef.current,
            {
                y: 90,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.45,
                ease: "power3.out",
            }
        );
    }, [stage]);

    // dummy data comes from backend format
    // later replace this setTimeout with socket/backend API response
    useEffect(() => {
        const timer = setTimeout(() => {
            setRequests(dummyRideRequests);
            setStage("requests");
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const getId = (value) => {
        if (!value) return "";
        if (typeof value === "string") return value;
        if (value.$oid) return value.$oid;
        return "";
    };

    const [otp, setOtp] = useState("");

    const swipeRef = useRef({
        startY: 0,
    });

    const acceptRide = async (ride) => {
        try {
            setIsAccepting(true);

            // later replace this with accept ride API
            const acceptedData = {
                ...ride,
                captain: {
                    $oid: "6a1captain12345678900001",
                },
                status: "accepted",
                acceptedAt: {
                    $date: new Date().toISOString(),
                },
                updatedAt: {
                    $date: new Date().toISOString(),
                },
            };

            setTimeout(() => {
                setAcceptedRide(acceptedData);
                setRequests([]);
                setStage("accepted");
                setIsAccepting(false);
            }, 600);
        } catch (error) {
            console.log("Accept ride error:", error.message);
            setIsAccepting(false);
        }
    };

    const rejectRide = (ride) => {
        const rideId = getId(ride._id);

        setRequests((prev) => {
            const updatedRequests = prev.filter((item) => getId(item._id) !== rideId);

            if (updatedRequests.length === 0) {
                setStage("looking");
            }

            return updatedRequests;
        });
    };

    const shortAddress = (address = "") => {
        if (address.length <= 45) return address;
        return address.slice(0, 45) + "...";
    };

    const handleNavigationPointerDown = (e) => {
        swipeRef.current.startY = e.clientY;
    };

    const handleNavigationPointerUp = (e) => {
        const swipeDistance = swipeRef.current.startY - e.clientY;

        if (swipeDistance > 45) {
            setStage("otp");
        }
    };

    const getClientY = (e) => {
        if (e.touches && e.touches.length > 0) {
            return e.touches[0].clientY;
        }

        if (e.changedTouches && e.changedTouches.length > 0) {
            return e.changedTouches[0].clientY;
        }

        return e.clientY;
    };

    const handleNavigationSwipeStart = (e) => {
        swipeRef.current.startY = getClientY(e);
    };

    const handleNavigationSwipeEnd = (e) => {
        const endY = getClientY(e);
        const swipeDistance = swipeRef.current.startY - endY;

        if (swipeDistance > 35) {
            setStage("otp");
        }
    };

    const verifyOtp = () => {
        if (!otp.trim()) return;

        console.log("Verify OTP:", otp);

        // later call backend API here
        // after success:
        // setStage("started")
    };

    const LookingStage = () => {
        return (
            <div>
                <div className="flex flex-col items-center text-center pt-6 pb-7">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                        <FaCar className="text-4xl text-black" />
                    </div>

                    <h2 className="text-2xl font-bold text-black">
                        Looking for rides
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 max-w-[260px]">
                        You are online. New ride requests will appear here.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-gray-50 p-5 border border-gray-100">
                        <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black mb-4">
                            <FaWallet />
                        </div>

                        <p className="text-sm text-gray-500">Today’s earnings</p>

                        <div className="flex items-end gap-2 mt-1">
                            <h3 className="text-2xl font-bold text-black">₹2,860</h3>
                            <span className="text-xs font-semibold text-black mb-1">
                                ▲ 18%
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 mt-1">vs yesterday</p>
                    </div>

                    <div className="rounded-3xl bg-gray-50 p-5 border border-gray-100">
                        <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black mb-4">
                            <FaCar />
                        </div>

                        <p className="text-sm text-gray-500">Total rides</p>

                        <div className="flex items-end gap-2 mt-1">
                            <h3 className="text-2xl font-bold text-black">12</h3>
                            <span className="text-xs font-semibold text-black mb-1">
                                ▲ 2
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 mt-1">vs yesterday</p>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl bg-white border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-black">
                            <FaClock />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Online time</p>
                            <h3 className="text-2xl font-bold text-black">5h 23m</h3>
                            <p className="text-xs text-gray-400">Today</p>
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                        ›
                    </button>
                </div>
            </div>
        );
    };

    const AcceptedStage = () => {
        if (!acceptedRide) return null;

        return (
            <div className="pb-5">
                <div className="rounded-3xl bg-black text-white p-5 mb-4">
                    <p className="text-xs text-white/60 font-semibold">
                        Accepted ride
                    </p>

                    <h2 className="text-2xl font-bold mt-1">Ride accepted</h2>

                    <p className="text-sm text-white/60 mt-2">
                        Go to pickup location and start the ride.
                    </p>
                </div>

                <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">
                    <div className="p-5">
                        <div className="relative pl-8">
                            <div className="absolute left-[9px] top-5 bottom-5 w-[2px] border-l-2 border-dashed border-gray-300"></div>

                            <div className="relative mb-7">
                                <span className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-black border-4 border-gray-200"></span>

                                <p className="text-xs font-semibold text-gray-500 mb-1">
                                    Pickup
                                </p>

                                <h3 className="text-[16px] font-bold text-black leading-tight">
                                    {acceptedRide.pickup?.address}
                                </h3>
                            </div>

                            <div className="relative">
                                <span className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-gray-500 border-4 border-gray-200"></span>

                                <p className="text-xs font-semibold text-gray-500 mb-1">
                                    Destination
                                </p>

                                <h3 className="text-[16px] font-bold text-black leading-tight">
                                    {acceptedRide.destination?.address}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 px-5 py-4 grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-black">
                                ₹{acceptedRide.fare}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 capitalize">
                                {acceptedRide.paymentMethod}
                            </p>
                        </div>

                        <div className="border-l border-gray-100 pl-5 space-y-3">
                            <div className="flex items-center gap-3 text-sm font-semibold text-black">
                                <span className="text-gray-400">↝</span>
                                <span>{acceptedRide.distanceKm} km</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm font-semibold text-black">
                                <span className="text-gray-400">◷</span>
                                <span>{acceptedRide.durationMin} min</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Ride ID</p>
                            <h4 className="text-sm font-bold text-black">
                                #{getId(acceptedRide._id).slice(-8)}
                            </h4>
                        </div>

                        <button className="w-11 h-11 rounded-full bg-gray-100 text-black flex items-center justify-center text-xl">
                            <IoCall />
                        </button>
                    </div>

                    <div className="px-5 pb-5">
                        <button
                            onClick={() => setStage("navigating")}
                            className="w-full h-14 rounded-2xl bg-black text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/25 active:scale-95 transition"
                        >
                            <IoNavigate className="text-xl" />
                            Start ride
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const NavigatingStage = () => {
        if (!acceptedRide) return null;

        return (
            <div
                onPointerDown={handleNavigationSwipeStart}
                onPointerUp={handleNavigationSwipeEnd}
                onTouchStart={handleNavigationSwipeStart}
                onTouchEnd={handleNavigationSwipeEnd}
                className="h-full flex items-center justify-between gap-3 touch-none cursor-grab active:cursor-grabbing"
            >
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-500 font-semibold">
                        Go to pickup • Swipe up for OTP
                    </p>

                    <h3 className="text-[14px] font-bold text-black leading-tight truncate mt-0.5">
                        {shortAddress(acceptedRide.pickup?.address)}
                    </h3>
                </div>

                <div className="text-right shrink-0">
                    <p className="text-[12px] font-bold text-black">
                        {acceptedRide.distanceKm} km
                    </p>

                    <p className="text-[11px] text-gray-500">
                        {acceptedRide.durationMin} min
                    </p>
                </div>
            </div>
        );
    };


    const OtpStage = () => {
        if (!acceptedRide) return null;

        return (
            <div className="pb-5">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-black">Enter ride OTP</h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Ask rider for OTP to start the trip.
                    </p>
                </div>

                <div className="rounded-3xl bg-gray-50 border border-gray-100 p-4 mb-4">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Pickup</p>

                    <h3 className="text-[15px] font-bold text-black leading-tight">
                        {acceptedRide.pickup?.address}
                    </h3>
                </div>

                <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="Enter OTP"
                    className="w-full h-14 rounded-2xl bg-gray-100 px-5 text-center text-xl font-bold tracking-[8px] outline-none"
                />

                <button
                    onClick={verifyOtp}
                    className="mt-4 w-full h-14 rounded-2xl bg-black text-white font-bold active:scale-95 transition"
                >
                    Verify OTP & Start Trip
                </button>

                <button
                    onClick={() => setStage("navigating")}
                    className="mt-3 w-full h-12 rounded-2xl bg-gray-100 text-black font-bold active:scale-95 transition"
                >
                    Back to navigation
                </button>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#eef1f4]">
                <Map />
                {/* <Map2 /> */}
            </div>

            <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-5 pb-20 bg-gradient-to-b from-white via-white/90 to-transparent">
                <div className="flex items-start justify-between">
                    <button className="w-11 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl text-black">
                        <IoMenu />
                    </button>

                    <div className="flex-1 px-4">
                        <h1 className="text-[17px] font-bold text-black leading-tight">
                            Good morning, Captain 👋
                        </h1>

                        <p className="text-[12px] text-gray-500 mt-1">
                            Ready to roll? Let’s earn more today
                        </p>
                    </div>

                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className="h-11 px-3 rounded-2xl bg-white shadow-lg flex items-center gap-2"
                    >
                        <span
                            className={`w-2 h-2 rounded-full ${isOnline ? "bg-black" : "bg-gray-400"
                                }`}
                        ></span>

                        <span className="text-[12px] font-semibold text-black">
                            {isOnline ? "Online" : "Offline"}
                        </span>

                        <span
                            className={`w-10 h-6 rounded-full p-1 flex transition-all ${isOnline ? "bg-black justify-end" : "bg-gray-300 justify-start"
                                }`}
                        >
                            <span className="w-4 h-4 rounded-full bg-white"></span>
                        </span>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-30">
                <div className="absolute bottom-0 left-0 right-0 z-30">
                    <div
                        ref={bottomBoxRef}
                        className={`mx-auto max-w-[430px] rounded-t-[34px] bg-white px-5 pt-4 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ${stage === "requests"
                                ? "pb-3"
                                : stage === "navigating"
                                    ? "h-[10dvh] min-h-[86px] pb-2 overflow-hidden"
                                    : "pb-7"
                            }`}
                    >
                        <div
                            className={`mx-auto h-1.5 w-12 rounded-full bg-gray-300 ${stage === "navigating" ? "mb-2" : "mb-5"
                                }`}
                        ></div>

                        {stage === "looking" && <LookingStage />}

                        {stage === "requests" && (
                            <RequestCardStack
                                requests={requests}
                                onAccept={acceptRide}
                                onReject={rejectRide}
                                isAccepting={isAccepting}
                            />
                        )}

                        {stage === "accepted" && <AcceptedStage />}

                        {stage === "navigating" && <NavigatingStage />}

                        {stage === "otp" && <OtpStage />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptainHome;