import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import {useNavigate} from "react-router-dom"

const Login = () => {

  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useNavigate()

  const {handleLogin,openalert}= useAuth()



  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = {
    email,
    password
  }

  try {
      setIsSubmitting(true);
      const response = await handleLogin(formData);
      openalert("Success", response.message || "Login successful");
      history("/ride")
    }
    catch (error) {
      if (error?.errors?.length > 0) {
        openalert("Error", error.errors[0].msg);
      } else {
        openalert("Error", error?.message || "Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
 
  return (
  <div className="min-h-screen flex flex-col font-sans text-black">
    {/* Header */}
    <header className="sticky top-0 z-50 bg-black text-white px-5 py-3 min-h-[60px]">
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

    {/* Login Content */}
    <main className="flex-1 px-5 pt-6 pb-8">
      <div className="w-full max-w-[420px] mx-auto">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[30px] font-bold tracking-tight">
            Welcome back
          </h2>

          <p className="text-sm leading-6 text-black/60 mt-2">
            Login to book rides, track your captain, and manage your RideMate trips.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <form className="space-y-3" onSubmit={submitHandler}>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter email"
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
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 bg-black text-white rounded-xl font-semibold text-[15px] transition-all duration-150 hover:bg-[#222] active:scale-[0.97] flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed active:scale-100" : ""
                }`}
            >
              {isSubmitting ? (
                <span className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>

        <p className="text-[13px] text-gray-700 mt-5 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-black font-semibold underline">
            Register
          </Link>
        </p>

        <div className="mt-6 rounded-2xl border border-black/10 p-4">
          <p className="text-[11px] leading-[18px] text-gray-600">
            By proceeding, you agree to receive calls, WhatsApp or SMS messages,
            including by automated means, from RideMate and its partners.
          </p>

          <p className="text-[11px] leading-[18px] text-gray-600 mt-3">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline cursor-pointer text-black">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer text-black">
              Terms of Service
            </span>{" "}
            apply.
          </p>
        </div>
      </div>
    </main>
  </div>
);
};

export default Login;