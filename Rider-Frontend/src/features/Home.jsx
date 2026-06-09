import React from "react";
import { Link } from "react-router-dom";

const services = [
  { title: "Ride", img: "/Home_Page/car_3d.png", big: true },
  { title: "Reserve", img: "/Home_Page/reserve_clock.png", big: true },
  { title: "Intercity", img: "/Home_Page/intercity.png" },
  { title: "Auto", img: "/Home_Page/Auto.png" },
  { title: "Bike", img: "/Home_Page/MotorcycleOrange-249-0.png" },
];

const Home = () => {
  return (
  <div className="w-full min-h-screen text-black font-sans">
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

    <main className="max-w-[430px] mx-auto">
    
      <section className="px-5 pt-6 pb-8">
        <div className="bg-black text-white rounded-2xl px-5 py-6 overflow-hidden relative">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-5">
            <span className="h-2 w-2 rounded-full bg-white"></span>

            <p className="text-[11px] font-semibold tracking-wide">
              Mobile ride platform
            </p>
          </div>

          <h2 className="text-[22px] leading-[28px] font-bold tracking-tight mb-3 max-w-[240px]">
            Move around your city with RideMate
          </h2>

          <p className="text-sm leading-6 text-white/75 mb-6 max-w-[260px]">
            Book rides, compare vehicle options, and track your captain in real time.
          </p>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="h-12 bg-white text-black px-5 rounded-xl font-semibold text-sm flex items-center justify-center active:scale-95 transition"
            >
              Book a ride
            </Link>
          </div>

          <img
            src="/Home_Page/car_3d.png"
            alt="RideMate car"
            className="absolute -right-7 -bottom-2 w-[125px] object-contain opacity-90"
          />
        </div>
      </section>

      {/* Ride Flow */}
      <section className="px-5 py-8">
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-[#f3f3f3] flex items-center justify-center shrink-0">
              <img
                src="/Home_Page/reserve_clock.png"
                alt="Quick booking"
                className="w-8 h-8 object-contain"
              />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-black/55 mb-1">
                Simple booking
              </p>

              <h2 className="text-[20px] leading-[26px] font-bold">
                Request a ride in a few taps
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>

              <div>
                <h3 className="text-[15px] font-bold mb-1">
                  Select pickup and destination
                </h3>

                <p className="text-sm leading-6 text-black/65">
                  Search your location and choose where you want to go.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>

              <div>
                <h3 className="text-[15px] font-bold mb-1">
                  Choose vehicle type
                </h3>

                <p className="text-sm leading-6 text-black/65">
                  Pick car, auto, bike, reserve, or intercity based on your need.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>

              <div>
                <h3 className="text-[15px] font-bold mb-1">
                  Track your captain
                </h3>

                <p className="text-sm leading-6 text-black/65">
                  Get live ride status and captain movement until pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Ride */}
      <section className="px-5 py-8">
        <div className="rounded-2xl bg-[#f3f3f3] p-4 overflow-hidden">
          <div className="flex items-center justify-center h-[135px] mb-5">
            <img
              src="/Home_Page/intercity.png"
              alt="RideMate group travel"
              className="h-full object-contain"
            />
          </div>

          <p className="text-[12px] font-semibold text-black/55 mb-1.5">
            Ride together
          </p>

          <h2 className="text-[22px] leading-[28px] font-bold tracking-tight mb-3">
            Plan comfortable rides for daily travel
          </h2>

          <p className="text-sm leading-6 text-black/70 mb-5">
            RideMate helps you move with friends, family, or office teammates using clean ride options and reliable trip tracking.
          </p>

          <button className="border-b border-black pb-1 font-semibold text-sm">
            Learn more
          </button>
        </div>
      </section>

      {/* Ride Options */}
      <section className="px-5 py-8">
        <div className="mb-5">
          <p className="text-[12px] font-semibold text-black/55 mb-1.5">
            Vehicle options
          </p>

          <h2 className="text-[22px] leading-[28px] font-bold tracking-tight">
            Pick the right ride for every route
          </h2>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-black/10 bg-white p-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#f3f3f3] flex items-center justify-center shrink-0">
              <img
                src="/Home_Page/car_3d.png"
                alt="Car"
                className="w-11 h-11 object-contain"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-bold mb-1">
                Car
              </h3>

              <p className="text-sm leading-6 text-black/65">
                Comfortable rides for daily city travel.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#f3f3f3] flex items-center justify-center shrink-0">
              <img
                src="/Home_Page/Auto.png"
                alt="Auto"
                className="w-11 h-11 object-contain"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-bold mb-1">
                Auto
              </h3>

              <p className="text-sm leading-6 text-black/65">
                Quick and affordable rides for short routes.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#f3f3f3] flex items-center justify-center shrink-0">
              <img
                src="/Home_Page/MotorcycleOrange-249-0.png"
                alt="Bike"
                className="w-11 h-11 object-contain"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-bold mb-1">
                Bike
              </h3>

              <p className="text-sm leading-6 text-black/65">
                Fast movement when you need to save time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="px-5 py-8">
        <div className="bg-black text-white rounded-2xl px-5 py-6">
          <p className="text-[12px] font-semibold text-white/60 mb-1.5">
            Safety and updates
          </p>

          <h2 className="text-[22px] leading-[28px] font-bold tracking-tight mb-3">
            Stay informed during your ride
          </h2>

          <p className="text-sm leading-6 text-white/75 mb-5">
            Get ride status, captain details, route movement, and cancellation updates directly inside the RideMate app.
          </p>

          <Link
            to="/login"
            className="h-12 inline-flex items-center bg-white text-black px-5 rounded-xl font-semibold text-sm active:scale-95 transition"
          >
            Start riding
          </Link>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-black text-white px-5 pt-10 pb-8">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center gap-2 mb-7">
          <span className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
            RM
          </span>

          <h2 className="text-lg font-semibold">
            RideMate
          </h2>
        </div>

        <p className="text-sm text-white/70 mb-8">
          Book smarter. Ride better.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-base mb-4">
              Company
            </h3>

            <div className="space-y-3 text-sm text-white/75">
              <p>About RideMate</p>
              <p>Help center</p>
              <p>Careers</p>
              <p>Safety</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">
              Services
            </h3>

            <div className="space-y-3 text-sm text-white/75">
              <p>Ride</p>
              <p>Reserve</p>
              <p>Intercity</p>
              <p>Auto</p>
              <p>Bike</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
)
};

export default Home;