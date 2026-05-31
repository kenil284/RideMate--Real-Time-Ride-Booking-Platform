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
    <div className="w-full min-h-screen  text-black font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black text-white px-5 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Uber</h1>

        <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-semibold">
          Log in
        </Link>

        <Link
          to="/register"
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
        >
          Sign up
        </Link>
      </div>
      </header>

      {/* Main */}
      <main className="max-w-[390px] mx-auto">

        {/* Explore Section */}
        <section className="px-5 pt-7 pb-10">
          <h2 className="text-2xl font-bold leading-tight mb-6">
            Explore what you can do <br /> with Uber
          </h2>

          <div className="grid grid-cols-6 gap-3">
            {services.map((item, index) => (
              <div
                key={index}
                className={`bg-[#f3f3f3] rounded-xl flex flex-col items-center justify-center gap-2 ${
                  item.big ? "col-span-3 h-[90px]" : "col-span-2 h-[90px]"
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
                <p className="text-xs font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uber One Section */}
        <section className="bg-black text-white px-5 py-16 min-h-[580px] relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">Uber One</h2>

          <p className="text-base leading-relaxed max-w-[320px] mb-8">
            One membership for member pricing and experiences on rides,
            deliveries, and more.
          </p>

          <button className="bg-white text-black px-6 py-4 rounded-lg font-semibold">
            Try it now
          </button>

          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9jNjQyNWRmNC0zMTkwLTRmZTEtODY2Ni02YTVhZjJjMGEwNDkucG5n"
            alt="Uber One"
            className="absolute bottom-10 right-0 w-[300px] object-contain"
          />
        </section>

        {/* Ride With Friends */}
        <section className="px-5 py-12">
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=311/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mNzdhYTM4MC1hMzc4LTQ3YmYtOGI4OC1hYWJhMTU4N2VmZGQucG5n"
            alt="Group ride"
            className="w-full h-[220px] object-contain mb-8"
          />

          <h2 className="text-3xl font-bold leading-tight mb-5">
            Ride with friends <br /> seamlessly
          </h2>

          <p className="text-base leading-relaxed mb-8">
            Riding with friends just got easier: set up a group ride in the Uber
            app, invite your friends, and arrive at your destination. Friends
            who ride together save together.
          </p>

          <button className="border-b border-black pb-1">
            Learn more
          </button>
        </section>

        {/* Travel Your Way */}
        <section className="px-5 py-10">
          <h2 className="text-2xl font-bold leading-tight mb-8">
            Use the Uber app to help <br /> you travel your way
          </h2>

          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81NGY2MDE2MS1jZjZiLTQ0MDEtYTMwOS04YmIxOTZjMDAxNGMuanBn"
            alt="Ride options"
            className="w-full h-[320px] object-cover mb-6"
          />

          <h3 className="text-lg font-bold mb-4">Ride options</h3>

          <p className="text-base leading-relaxed mb-8">
            There’s more than one way to move with Uber, no matter where you are
            or where you’re headed next.
          </p>

        </section>

      </main>
    </div>
  );
};

export default Home;
