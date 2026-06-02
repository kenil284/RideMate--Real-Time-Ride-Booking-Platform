import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const CaptainLogin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await handleLogin({ email, password })

    if (!data) {
      return
    }

    navigate("/captain-home")
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-black text-white px-7 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-medium">Uber</h1>

        <Link
          to="/register"
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition"
        >
          Sign up
        </Link>
      </header>

      {/* Login Form */}
      <main className="flex-1 px-5 pt-6">
        <div className="w-full max-w-[420px] mx-auto">
          <h2 className="text-[20px] leading-[28px] font-semibold mb-4">
            What's your captain email?
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter captain email"
              className="w-full h-[52px] bg-[#f3f3f3] border border-black rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full h-[52px] bg-[#f3f3f3] border border-black rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <button
              type="submit"
              className="w-full h-[52px] bg-black text-white rounded-lg font-semibold text-[16px] transition-all duration-150 hover:bg-[#222] active:scale-[0.97]"
            >
              Continue
            </button>
          </form>

          <p className="text-[14px] text-gray-700 mt-5 text-center">
            New captain?{" "}
            <Link to="/register" className="text-black font-semibold underline">
              Register
            </Link>
          </p>

          <p className="text-[12px] leading-[20px] text-gray-600 mt-8">
            By continuing, you agree to receive calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates.
          </p>

          <p className="text-[12px] leading-[20px] text-gray-600 mt-4">
            By proceeding, you agree to Uber&apos;s{" "}
            <span className="text-black underline">Terms of Use</span> and
            acknowledge that you have read the{" "}
            <span className="text-black underline">Privacy Policy</span>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CaptainLogin;