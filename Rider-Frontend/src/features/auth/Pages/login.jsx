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
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black text-white px-5 py-4 flex items-center justify-between min-h-16">
        <h1 className="text-2xl font-medium">Uber</h1>
        <Link
                  to="/register"
                  className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Sign up
                </Link>
      </header>

      {/* Login Content */}
      <main className="flex-1 flex justify-center px-5 pt-12">
        <div className="w-full max-w-[420px]">
          <h2 className="text-[28px] leading-[34px] font-bold mb-8">
            Log in to your account
          </h2>

          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter email"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter password"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-[52px] bg-black text-white rounded-lg font-semibold text-[16px] transition-all duration-150 hover:bg-[#222] active:scale-[0.97] flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed active:scale-100" : ""
                }`}
            >
              {isSubmitting ? (
                <span className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <p className="text-[14px] text-gray-700 mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-semibold underline">
              Register
            </Link>
          </p>

          <p className="text-[12px] leading-[18px] text-gray-600 mt-6">
            By proceeding, you agree to receive calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates.
          </p>

          <p className="text-[12px] leading-[18px] text-gray-600 mt-5">
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
      </main>
    </div>
  );
};

export default Login;