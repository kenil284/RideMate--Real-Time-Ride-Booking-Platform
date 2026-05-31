import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const ToDriversteps = [
        {
            image: "/Home/requirement.svg",
            title: "Requirements",
            points: ["Be at least 18 years old", "Clear a background screening"],
        },
        {
            image: "/Home/document.svg",
            title: "Documents",
            points: [
                "Valid driver's license",
                "Proof of residency in your city",
                "Car documents such as insurance and registration",
            ],
        },
        {
            image: "/Home/signup.svg",
            title: "Signup process",
            points: [
                "Visit the nearest Partner Seva Kendra in your city",
                "Submit documents and photo",
                "Provide information for a background check",
            ],
        },
    ];

    const [index, setIndex] = useState(0);

    const current = ToDriversteps[index];

    return (


        <div className="min-h-screen font-sans pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black text-white px-5 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-medium">Uber</h1>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-semibold">
                        Log in
                    </Link>

                    <Link
                        to="/register"
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition"
                    >
                        Sign up
                    </Link>
                </div>
            </header>

            {/* Drive Top Bar */}
            <section className="px-5 py-5">
                <h2 className="text-2xl font-bold">
                    Drive
                </h2>
            </section>

            {/* Hero */}
            <section className="bg-black text-white px-5 py-12">
                <h1 className="text-[30px] leading-[40px] font-bold mb-6">
                    Drive when you <br />
                    want, make what you <br />
                    need
                </h1>

                <p className="text-base mb-8">Earn on your own schedule.</p>

                <div className="flex items-center gap-6">
                    <button className=" text-black px-6 py-4 rounded-lg font-semibold active:scale-95 transition">
                        Get started
                    </button>

                    <Link to="/login" className="border-b border-white pb-1">
                        Log in
                    </Link>
                </div>
            </section>

            {/* Why Drive */}
            <section className=" px-5 py-10">
                <h2 className="text-2xl font-bold mb-12">Why drive with us</h2>

                <div className="w-full h-[130px] bg-[#eeeeee] rounded-lg flex items-center justify-center text-2xl font-bold mb-16">
                    <img src="/Home/driver.svg" alt="" />
                </div>

                <div className="space-y-10">
                    <div>
                        <div className="text-3xl mb-5"><img src="/Home/calander.svg" alt="" /></div>
                        <h3 className="text-lg font-bold mb-3">Set your own hours</h3>
                        <p className="text-base leading-7">
                            You decide when and how often you drive.
                        </p>
                    </div>

                    <div>
                        <div className="text-3xl mb-5"><img src="/Home/money.svg" alt="" /></div>
                        <h3 className="text-lg font-bold mb-3">Get paid fast</h3>
                        <p className="text-base leading-7">
                            Weekly payments in your bank account.
                        </p>
                    </div>

                    <div>
                        <div className="text-3xl mb-5"><img src="/Home/support.svg" alt="" /></div>
                        <h3 className="text-lg font-bold mb-3">
                            Get support at every turn
                        </h3>
                        <p className="text-base leading-7">
                            If there’s anything that you need, you can reach us anytime.
                        </p>
                    </div>
                </div>

                <button className="mt-10 border-b border-black pb-1">
                    How driving works
                </button>
            </section>

            {/* Signup Need */}
            <section className=" px-5 py-12">
                <h2 className="text-[26px] leading-[34px] font-bold mb-10">
                    Here's what you need to <br />
                    sign up
                </h2>

                <div className="border-b border-[#eeeeee] mb-8">
                    <button className="pb-4 px-4 border-b-4 border-black font-medium">
                        To drive
                    </button>
                </div>

                {/* Step Content */}
                <div key={index} className="min-h-[320px] overflow-hidden">
                    <div className="step-slide">
                        <img
                            src={current.image}
                            alt={current.title}
                            className="w-7 h-7 object-contain mb-6"
                        />

                        <h3 className="text-xl font-semibold mb-4">{current.title}</h3>

                        <ul className="list-disc pl-6 leading-7">
                            {current.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <p className="font-semibold text-sm w-10 text-center">
                        {index + 1}/{ToDriversteps.length}
                    </p>

                    <button
                        type="button"
                        onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={index === 0}
                        className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
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
                            setIndex((prev) => Math.min(prev + 1, ToDriversteps.length - 1))
                        }
                        disabled={index === ToDriversteps.length - 1}
                        className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
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
            </section >

            {/* Safety */}
            < section className=" px-5 py-12" >
                <h2 className="text-[26px] leading-[34px] font-bold mb-5">
                    Safety on the road
                </h2>

                <p className="text-base leading-7 mb-10">
                    Your safety drives us to continuously raise the bar.
                </p>

                <button className="border-b border-black pb-1 mb-10">
                    Learn more
                </button>

                <div className="space-y-12">
                    <div>
                        <div className="w-14 h-14 bg-[#eeeeee] rounded-lg flex items-center justify-center font-bold mb-5">
                           <img src="/Home/protection.svg" alt="" />
                        </div>
                        <h3 className="text-lg font-bold mb-4">Protection on every trip</h3>
                        <p className="leading-7">
                            Each trip you take with the Uber app is insured to protect you and
                            your rider.
                        </p>
                    </div>

                    <div>
                        <div className="w-14 h-14 bg-[#eeeeee] rounded-lg flex items-center justify-center font-bold mb-5">
                            <img src="/Home/message.svg" alt="" />
                        </div>
                        <h3 className="text-lg font-bold mb-4">Help if you need it</h3>
                        <p className="leading-7">
                            The Emergency Button calls 911. The app displays your trip details
                            so you can quickly share them with authorities.
                        </p>
                    </div>

                    <div>
                        <div className="w-14 h-14 bg-[#eeeeee] rounded-lg flex items-center justify-center font-bold mb-5">
                            <img src="/Home/community-guidlines.svg" alt="" />
                        </div>
                        <h3 className="text-lg font-bold mb-4">Community Guidelines</h3>
                        <p className="leading-7">
                            Our standards help to create safe connections and positive
                            interactions with everyone.
                        </p>
                    </div>
                </div>
            </section >

            {/* Terms */}
            < section className="px-5 py-12" >
                <p className="text-sm leading-7 mb-6">
                    This is a promotional offer and is not a promise or guarantee of future
                    earnings. This offer is available only to new drivers and delivery
                    people on the Uber app who meet the eligibility requirements.
                </p>

                <p className="text-sm leading-7">
                    Any payment due will be automatically added to your account after you
                    complete the required trips. Each completed trip or delivery counts as
                    one trip or delivery toward your minimum requirement.
                </p>
            </section >

            {/* Footer */}
            < footer className="bg-black text-white px-7 py-12" >
                <h2 className="text-xl mb-10">Uber</h2>

                <p className="mb-16">Visit Help Center</p>

                <h3 className="font-bold text-lg mb-5">Company</h3>
                <div className="space-y-4 text-sm mb-14">
                    <p>About us</p>
                    <p>Our offerings</p>
                    <p>Newsroom</p>
                    <p>Investors</p>
                    <p>Blog</p>
                    <p>Careers</p>
                    <p>Uber One</p>
                </div>

                <h3 className="font-bold text-lg mb-5">Products</h3>
                <div className="space-y-4 text-sm">
                    <p>Ride</p>
                    <p>Drive</p>
                    <p>Eat</p>
                </div>
            </footer >

            {/* Bottom Button */}
            < div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 z-50" >
                <button className="w-full bg-black text-white py-4 rounded-lg font-semibold active:scale-95 transition">
                    Sign up to drive
                </button>
            </div >
        </div >
    );
};

export default Home;