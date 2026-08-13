"use client";
import loginImage from "@/assets/bgImage/loginImage.png";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { MagnifyingGlass } from "react-loader-spinner";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  function fillUserTest() {
    setError("");
    setShowPw(false);
    setValue("email", "user@test.local");
    setValue("password", "password123");
  }

  function fillAdminTest() {
    setError("");
    setShowPw(false);
    setValue("email", "admin@test.local");
    setValue("password", "password123");
  }

const handleSocialLogin = async () => {
  try {
    await signIn("google", {
      callbackUrl: "/",
    });
  } catch (error) {
    console.error("Google login error:", error);
  }
};

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl,
    });
    if (result?.error) {
      setError("Invalid email or password!");
      setLoading(false);
    } else {
      reset();
      toast.success("Welcome back to EVERYDAY WEAR!");
      setLoading(false);
      setTimeout(() => {
        router.push(callbackUrl);
      }, 2000);
      router.refresh();
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: 200,
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="hidden h-screen w-1/2 bg-black lg:block"
        >
          <div className="relative">
            <div className="absolute top-12 left-14 z-40 flex flex-col gap-1">
              <h1 className="font-serif text-3xl font-light tracking-[0.18em] text-[#F5F1E8]">
                EVERY<span className="text-[#C8A96A]">DAY</span> WEAR
              </h1>

              <p className="text-[10px] tracking-[0.4em] text-[#C8A96A]/70 uppercase">
                Wear Your Everyday
              </p>
            </div>

            <div className="absolute top-120 left-15 z-40">
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(28px,3.5vw,46px)] leading-[1.2] font-light text-[#F5F1E8]">
                {'"'} Wear{" "}
                <em className="text-[#C8A96A] not-italic">confidence.</em>
                <br />
                Leave an impression.{'"'}
              </h2>
            </div>

            <Image
              src={loginImage}
              alt="loginImage"
              className="absolute z-30 h-screen w-full object-cover opacity-10"
            />
            <div className="absolute z-20 h-screen w-full bg-[linear-gradient(135deg,_#221303_0%,_#0b0b11_48%,_#0f2205_100%)]"></div>
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            x: 200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: -200,
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="relative h-screen w-full bg-white lg:w-1/2"
        >
          <div className="relative z-1 flex h-screen flex-1 items-center justify-center overflow-y-auto bg-[#faf9f6] p-10">
            <div className="w-full max-w-105 animate-[formReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
              <div className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#b8953a] uppercase before:block before:h-px before:w-6 before:bg-[#b8953a]">
                Welcome back
              </div>
              <Link
                href="/"
                className="absolute top-13 right-10 z-40 flex flex-col gap-1 rounded-full border-2 border-black p-2 hover:border"
              >
                <FaHome className="text-black md:h-6 md:w-6" />
              </Link>
              <h1 className="mb-2 font-['Cormorant_Garamond'] text-[42px] leading-none font-normal text-[#0c0c0f]">
                Sign In
              </h1>

              <p className="mb-10 text-sm leading-7 text-[#8a8a8a]">
                Access your curated wardrobe and exclusive member benefits.
              </p>

              <div className="mb-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-sm border-[1.5px] border-black/10 bg-white px-3 py-3 text-[13px] font-medium text-[#0c0c0f] transition-all duration-300"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[#0c0c0f] transition-transform duration-300 group-hover:scale-x-100"></span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="relative z-10 group-hover:text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  <span className="relative z-10 group-hover:text-white">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("Apple")}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-sm border-[1.5px] border-black/10 bg-white px-3 py-3 text-[13px] font-medium text-[#0c0c0f] transition-all duration-300"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[#0c0c0f] transition-transform duration-300 group-hover:scale-x-100"></span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 group-hover:text-white"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>

                  <span className="relative z-10 group-hover:text-white">
                    Apple
                  </span>
                </button>
              </div>

              <div className="mb-7 flex items-center gap-4 text-[11px] tracking-[0.15em] text-[#8a8a8a] uppercase before:h-px before:flex-1 before:bg-black/10 after:h-px after:flex-1 after:bg-black/10">
                or continue with email
              </div>

              <div className="mb-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={fillUserTest}
                  className="flex items-center gap-2 rounded-sm border border-black/10 bg-white px-3 py-2 text-sm font-medium text-[#0c0c0f]"
                >
                  Test User
                </button>

                <button
                  type="button"
                  onClick={fillAdminTest}
                  className="flex items-center gap-2 rounded-sm border border-black/10 bg-white px-3 py-2 text-sm font-medium text-[#0c0c0f]"
                >
                  Test Admin
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <motion.div
                  animate={errors.email ? { x: [0, -7, 6, -6, 7, 0] } : {}}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="mb-5"
                >
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold tracking-[0.15em] text-[#8a8a8a] uppercase"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`peer w-full rounded-sm border-[1.5px] border-black/10 bg-[#faf9f6] px-4 py-[14px] pr-12 text-sm transition-all outline-none focus:border-[#b8953a] focus:bg-white focus:ring-4 focus:ring-[#b8953a]/10 ${
                        error.email ? "border-red-500" : ""
                      }`}
                    />

                    <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#8a8a8a] peer-focus:text-[#b8953a]"></div>

                    <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#b8953a] transition-transform duration-300 peer-focus:scale-x-100"></div>
                  </div>

                  {errors.email && (
                    <div className="mt-1 text-[11px] text-red-500">
                      {errors.email.message}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  animate={errors.email ? { x: [0, -7, 6, -6, 7, 0] } : {}}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="mb-5"
                >
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[10px] font-semibold tracking-[0.15em] text-[#8a8a8a] uppercase"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      autoComplete="current-password"
                      placeholder="••••••••"
                      type={showPw ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`peer w-full rounded-sm border-[1.5px] border-black/10 bg-[#faf9f6] px-4 py-[14px] pr-12 text-sm transition-all outline-none focus:border-[#b8953a] focus:bg-white focus:ring-4 focus:ring-[#b8953a]/10 ${
                        error.password ? "border-red-500" : ""
                      }`}
                    />

                    <div
                      onClick={() => setShowPw(!showPw)}
                      className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#8a8a8a] transition-colors hover:text-[#b8953a]"
                    ></div>

                    <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#b8953a] transition-transform duration-300 peer-focus:scale-x-100"></div>
                  </div>
                  {errors.password && (
                    <div className="mt-1 text-[11px] text-red-500">
                      {errors.password.message}
                    </div>
                  )}
                </motion.div>

                {error && (
                  <div className="mb-2 text-[11px] text-red-500">{error}</div>
                )}
                <div className="mb-7 flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      className="h-4 w-4 accent-[#b8953a]"
                    />

                    <span className="text-[13px] text-[#8a8a8a]">
                      Remember me
                    </span>
                  </label>

                  <a
                    href="#"
                    className="text-[13px] text-[#b8953a] transition-opacity hover:opacity-70"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`group relative w-full overflow-hidden rounded-sm ${loading ? "bg-[#c4a23e]" : "bg-[#0c0c0f]"} py-3.75 text-[12px] font-semibold tracking-[0.2em] text-[#faf9f6] uppercase transition hover:-translate-y-[px] active:translate-y-0 ${
                    loading ? "loading" : ""
                  }`}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center gap-1">
                        Finding account
                        <MagnifyingGlass
                          visible={true}
                          height="27"
                          width="27"
                          ariaLabel="magnifying-glass-loading"
                          wrapperStyle={{}}
                          wrapperClass="magnifying-glass-wrapper"
                          glassColor="#c0efff"
                          color="#ffffff"
                        />
                      </div>
                    ) : (
                      "Sign In to EVERYDAY WEAR"
                    )}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-linear-to-br from-[#b8953a] to-[#c4a23e] transition-transform duration-500 group-hover:translate-x-0"></span>
                </button>
              </form>

              <div className="mt-6 text-center text-[13px] text-[#8a8a8a]">
                Don{"\'"}t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#0c0c0f] underline-offset-4 hover:text-gray-400"
                >
                  {" "}
                  Create one →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
