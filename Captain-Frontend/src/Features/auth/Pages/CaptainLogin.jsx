import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const CaptainLogin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, isloading } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await handleLogin({ email, password })

    if (!data) {
      return
    }

    navigate("/captain-home", { replace: true })
  }

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

          <Link
            to="/register"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 px-5 pt-6 pb-8">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-6">
            <h2 className="text-[24px] leading-[30px] font-bold tracking-tight">
              Welcome back, captain
            </h2>

            <p className="text-sm leading-6 text-black/60 mt-2">
              Login to manage ride requests, live routes, and your captain dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter captain email"
                  className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold mb-1.5">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              <button
                type="submit"
                disabled={isloading}
                className={`
    w-full h-12 rounded-xl font-semibold text-[15px] transition-all duration-150 flex items-center justify-center gap-2
    ${isloading
                    ? "bg-black/80 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-[#222] active:scale-[0.97]"
                  }
  `}
              >
                {isloading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>

          <p className="text-[13px] text-gray-700 mt-5 text-center">
            New captain?{" "}
            <Link to="/register" className="text-black font-semibold underline">
              Register
            </Link>
          </p>

          <div className="mt-6 rounded-2xl border border-black/10 p-4">
            <p className="text-[11px] leading-[18px] text-gray-600">
              By continuing, you agree to receive calls, WhatsApp or SMS messages,
              including by automated means, from RideMate and its partners.
            </p>

            <p className="text-[11px] leading-[18px] text-gray-600 mt-3">
              By proceeding, you agree to RideMate&apos;s{" "}
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

export default CaptainLogin;