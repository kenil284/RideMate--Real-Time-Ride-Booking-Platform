import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black text-white px-5 py-4 flex items-center justify-between min-h-[70px]">
        <Link to="/" className="text-2xl font-medium">
          Uber
        </Link>

        <Link to="/login" className="text-sm font-semibold">
          Log in
        </Link>
      </header>

      {/* Register Content */}
      <main className="flex-1 flex justify-center px-5 pt-10 pb-8">
        <div className="w-full max-w-[420px]">
          <h2 className="text-[28px] leading-[34px] font-bold mb-2">
            Create your account
          </h2>

          <p className="text-[15px] text-gray-700 mb-8">
            Sign up to start riding with Uber.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              name="fullname[firstname]"
              placeholder="First name"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="text"
              name="fullname[lastname]"
              placeholder="Last name (optional)"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <button
              type="submit"
              className="w-full h-[52px] bg-black text-white rounded-lg font-semibold text-[16px] transition-all duration-150 hover:bg-[#222] active:scale-[0.97]"
            >
              Create account
            </button>
          </form>

          <p className="text-[14px] text-gray-700 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold underline">
              Log in
            </Link>
          </p>

          <p className="text-[12px] leading-[18px] text-gray-600 mt-6">
            By signing up, you agree to receive calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates.
          </p>

          <p className="text-[12px] leading-[18px] text-gray-600 mt-5">
            By continuing, you agree to Uber&apos;s{" "}
            <span className="underline cursor-pointer text-black">
              Terms of Use
            </span>{" "}
            and acknowledge that you have read the{" "}
            <span className="underline cursor-pointer text-black">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;