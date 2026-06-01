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

          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />


            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name (optional)"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full h-[52px] bg-[#f3f3f3] rounded-lg px-4 text-[16px] outline-none focus:ring-2 focus:ring-black transition"
            />

            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
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
                "Create account"
              )}
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