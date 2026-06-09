import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Register = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useNavigate()

  const { handleRegister, openalert } = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      phone
    };

    try {
      setIsSubmitting(true);
      const response = await handleRegister(formData);
      openalert("Success", response.message || "Registration successful");
      history("/login");
    }
    catch (error) {
      if (error?.errors?.length > 0) {
        openalert("Error", error.errors[0].msg);
      } else {
        openalert("Error", error?.message || "Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }

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

        <Link to="/login" className="text-sm font-semibold text-white/90">
          Log in
        </Link>
      </div>
    </header>

    {/* Register Content */}
    <main className="flex-1 px-5 pt-6 pb-8">
      <div className="w-full max-w-[420px] mx-auto">
        <div className="mb-6">
          <h2 className="text-[24px] leading-[30px] font-bold tracking-tight">
            Create your RideMate account
          </h2>

          <p className="text-sm leading-6 text-black/60 mt-2">
            Sign up to book rides, track your captain, and manage your trips easily.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <form className="space-y-3" onSubmit={submitHandler}>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5">
                First name
              </label>

              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First name"
                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold mb-1.5">
                Last name
              </label>

              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last name (optional)"
                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold mb-1.5">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full h-12 bg-[#f3f3f3] border border-black/10 rounded-xl px-4 text-[15px] outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold mb-1.5">
                Phone number
              </label>

              <input
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
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
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-[13px] text-gray-700 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold underline">
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
      </div>
    </main>
  </div>
)
};

export default Register;