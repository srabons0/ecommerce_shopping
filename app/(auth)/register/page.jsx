"use client";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineMail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useForm, useWatch } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import registerImage from "@/assets/bgImage/registerImage.jpg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hourglass } from "react-loader-spinner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const value = useWatch({
    control,
    name: ["name", "email", "number", "password", "recheckPassword"],
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(true);

  const handleNext = async () => {
    const value = getValues();
    if (!value.name) {
      return setError("Username is required");
    }
    if (!value.email) {
      return setError("Email is required");
    }
    if (!value.number) {
      return setError("Phone Number is required");
    }

    setError("");
    setStep(false);
  };

  const onSubmit = async (registerData) => {
    if (registerData.password !== registerData.recheckPassword)
      return setError("Passwords do not match");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          number: registerData.number,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      await signIn("credentials", {
        email: registerData.email,
        password: registerData.password,
        redirect: false,
      });
      reset();
      toast.success("Welcome to LUXORA! Account created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);

      setLoading(false);
    }
  };

  return (
    <div className="lg:flex lg:flex-row-reverse h-screen overflow-x-hidden">
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
            delay: 0.3,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="lg:w-1/2 h-screen lg:block hidden bg-black"
        >
          <div className="relative">
            <div className="absolute top-12 right-14 z-40 flex flex-col gap-1">
              <h1 className="font-serif text-4xl font-light tracking-[0.18em] text-[#F5F1E8]">
                L<span className="text-[#C8A96A]">U</span>XORA
              </h1>

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A]/70">
                La Muse Moderne
              </p>
            </div>
            <div
              className="absolute z-40 right-15 top-50
 mb-10 font-serif text-[22px] font-light italic leading-[1.5] text-white/60"
            >
              {'"'}Fashion is the armor
              <br />
              to survive everyday life.{'"'}
            </div>

            <div className="absolute top-110 right-18 z-40 mt-auto">
              <div className="mb-9 flex items-start gap-5 opacity-100">
                <div>
                  <div
                    className={`${step ? "flex h-9 w-9 items-center justify-center rounded-full border border-[#B8953A]/30 bg-[#B8953A]/10 text-xs font-semibold text-[#B8953A]" : "flex h-9 w-9 items-center justify-center rounded-full border border-[#B8953A]/30 text-xs font-semibold text-white/60"}`}
                  >
                    01
                  </div>
                  <div className="ml-[17px] h-6 w-[2px] bg-[#B8953A]/15"></div>
                </div>

                <div>
                  <h4 className="mb-1 text-sm font-medium text-white/85">
                    Personal Details
                  </h4>
                  <p className="text-xs leading-6 text-white/35">
                    Name, email and basic information
                  </p>
                </div>
              </div>

              <div className="mb-9 flex items-start gap-5 opacity-40">
                <div>
                  <div
                    className={`${!step ? "flex h-9 w-9 items-center justify-center rounded-full border border-[#B8953A]/80 bg-[#B8953A]/30 text-xs font-semibold text-[#ffcb48]" : "flex h-9 w-9 items-center justify-center rounded-full border border-[#B8953A]/30 text-xs font-semibold text-white/60"}`}
                  >
                    02
                  </div>
                  <div className="ml-[17px] h-6 w-[2px] bg-[#B8953A]/15"></div>
                </div>

                <div>
                  <h4 className="mb-1 text-sm font-medium text-white/95">
                    Security
                  </h4>
                  <p className="text-xs leading-6 text-white/85">
                    Create a secure password
                  </p>
                </div>
              </div>
            </div>

            <Image
              src={registerImage}
              alt="loginImage"
              className="absolute z-30 opacity-10 object-cover h-screen w-full "
            />
            <div className="bg-[linear-gradient(135deg,_#251507_0%,_#111119_48%,_#14310c_100%)] z-20 absolute w-full h-screen"></div>
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
            delay: 0.3,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="flex lg:w-1/2  items-center h-screen justify-center overflow-y-auto bg-[#faf9f6] p-10"
        >
          <div className="w-full max-w-[460px]" id="formBox">
            <div className="mb-9" id="progressWrap">
              <div className="mb-[10px] h-[3px] rounded bg-black/10">
                <div
                  id="progressFill"
                  style={{
                    width: `${value.filter((v) => v?.trim()).length * 20}%`,
                  }}
                  className="h-full rounded bg-gradient-to-r from-[#b8953a] to-[#d4af5a] transition-all duration-500 ease-out"
                />
              </div>
              <div className="flex items-center justify-end text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a]">
                <span id="stepPct" className="font-semibold text-[#b8953a]">
                  {value.filter((v) => v?.trim()).length * 20}%
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {step === true && (
                <div id="step1" className="block">
                  <div className="mb-[10px] flex items-center gap-[10px] text-[10px] uppercase tracking-[0.35em] text-[#b8953a] before:block before:h-px before:w-6 before:bg-[#b8953a]">
                    Step 1 of 2
                  </div>
                  <h1 className="mb-[6px] font-['Cormorant_Garamond'] text-[38px] font-normal leading-[1.1] text-[#0c0c0f]">
                    Personal
                    <br />
                    Details
                  </h1>
                  <p className="mb-8 text-sm leading-7 text-[#8a8a8a]">
                    Tell us a bit about yourself to create your LUXE account.
                  </p>

                  <motion.div
                    animate={
                      error === "Username is required"
                        ? { x: [0, -7, 6, -6, 7, 0] }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className="mb-[18px]">
                      <label
                        htmlFor="firstName"
                        className="mb-[7px] block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]"
                      >
                        UserName
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          autoComplete="given-name"
                          placeholder="Sophia"
                          {...register("name", {
                            required: "UserName is required",
                          })}
                          className="peer w-full appearance-none rounded-sm border-[1.5px] border-black/10 bg-white px-[14px] py-[13px] pr-11 text-sm text-[#0c0c0f] outline-none transition-all duration-200 focus:border-[#b8953a] focus:ring-4 focus:ring-[#b8953a]/10"
                        />
                        <div className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-[#8a8a8a] peer-focus:text-[#b8953a]">
                          <IoPersonOutline />
                        </div>
                      </div>
                      <div
                        id="firstNameErr"
                        className="mt-[5px] hidden text-[11px] text-[#e74c3c]"
                      >
                        Please enter your first name.
                      </div>
                    </div>
                  </motion.div>
                  {error === "Username is required" && (
                    <p className="mb-2 text-xs text-red-500">{error}</p>
                  )}

                  <motion.div
                    animate={
                      error === "Email is required"
                        ? { x: [0, -7, 6, -6, 7, 0] }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="mb-[18px]"
                  >
                    <label
                      htmlFor="regEmail"
                      className="mb-[7px] block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="sophia@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className="peer w-full appearance-none rounded-sm border-[1.5px] border-black/10 bg-white px-[14px] py-[13px] pr-11 text-sm text-[#0c0c0f] outline-none transition-all duration-200 focus:border-[#b8953a] focus:ring-4 focus:ring-[#b8953a]/10"
                      />
                      <div className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-[#8a8a8a] peer-focus:text-[#b8953a]">
                        <MdOutlineMail />
                      </div>
                      <MdOutlineMail className="absolute right-[13px] top-1/2 hidden -translate-y-1/2 text-[#27ae60]" />
                    </div>
                    <div
                      id="regEmailErr"
                      className="mt-[5px] hidden text-[11px] text-[#e74c3c]"
                    >
                      Please enter a valid email.
                    </div>
                  </motion.div>
                  {error === "Email is required" && (
                    <p className="mb-2 text-xs text-red-500">{error}</p>
                  )}

                  <motion.div
                    animate={
                      error === "Phone Number is required"
                        ? { x: [0, -7, 6, -6, 7, 0] }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="mb-[18px]"
                  >
                    <label
                      htmlFor="phone"
                      className="mb-[7px] block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="012********"
                        {...register("number", {
                          required: "Phone Number is required",
                        })}
                        className="w-full appearance-none rounded-sm border-[1.5px] border-black/10 bg-white px-[14px] py-[13px] pr-11 text-sm text-[#0c0c0f] outline-none transition-all duration-200 focus:border-[#b8953a] focus:ring-4 focus:ring-[#b8953a]/10"
                      />
                    </div>
                  </motion.div>
                  {error === "Phone Number is required" && (
                    <p className="mb-2 text-xs text-red-500">{error}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleNext()}
                      className="group relative flex-1 overflow-hidden rounded-sm bg-[#0c0c0f] py-[14px] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#faf9f6] transition hover:-translate-y-[1px]"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-br from-[#b8953a] to-[#c4a23e] transition-transform duration-300 group-hover:translate-x-0" />
                      <span className="relative z-10">Continue →</span>
                    </button>
                  </div>
                </div>
              )}
              {step === false && (
                <div id="step2" className="">
                  <div className="mb-[10px] flex items-center gap-[10px] text-[10px] uppercase tracking-[0.35em] text-[#b8953a] before:block before:h-px before:w-6 before:bg-[#b8953a]">
                    Step 2 of 2
                  </div>
                  <h1 className="mb-[6px] font-['Cormorant_Garamond'] text-[38px] font-normal leading-[1.1] text-[#0c0c0f]">
                    Set Your
                    <br />
                    Password
                  </h1>
                  <p className="mb-8 text-sm leading-7 text-[#8a8a8a]">
                    Choose a strong password to keep your account secure.
                  </p>

                  <motion.div
                    animate={errors.password ? { x: [0, -7, 6, -6, 7, 0] } : {}}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="mb-[18px]"
                  >
                    <label
                      htmlFor="regPass"
                      className="mb-[7px] block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={togglePassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className="peer w-full appearance-none rounded-sm border-[1.5px] border-black/10 bg-white px-[14px] py-[13px] pr-11 text-sm text-[#0c0c0f] outline-none transition-all duration-200 focus:border-[#b8953a] focus:ring-4 focus:ring-[#b8953a]/10"
                      />
                      <button
                        type="button"
                        onClick={() => setTogglePassword((t) => !t)}
                        className="absolute right-[13px] top-1/2 -translate-y-1/2 cursor-pointer text-[#8a8a8a] transition hover:text-[#b8953a]"
                      >
                        {togglePassword ? <IoMdEyeOff /> : <FaEye />}
                      </button>
                    </div>
                    <div
                      id="regPassErr"
                      className="mt-[5px] hidden text-[11px] text-[#e74c3c]"
                    >
                      Password must be at least 8 characters.
                    </div>
                  </motion.div>
                  {errors.password && (
                    <p className="mb-1 text-xs text-red-500">
                      {errors.password?.message}
                    </p>
                  )}

                  <motion.div
                    animate={
                      errors.recheckPassword ? { x: [0, -7, 6, -6, 7, 0] } : {}
                    }
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="mb-[18px]"
                  >
                    <label className="mb-[7px] block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        autoComplete="new-password"
                        type="password"
                        placeholder="Repeat your password"
                        {...register("recheckPassword", {
                          required: "Re-enter your password",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Passwords do not match",
                        })}
                        className="w-full appearance-none rounded-sm border-[1.5px] border-black/10 bg-white px-[14px] py-[13px] pr-11 text-sm text-[#0c0c0f] outline-none transition-all duration-200 focus:border-[#b8953a] focus:ring-4 focus:ring-[#b8953a]/10"
                      />
                    </div>
                    {errors.recheckPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.recheckPassword?.message}
                      </p>
                    )}
                    {error && (
                      <div className="mb-1 mt-1 text-[11px] text-red-500">
                        {error}
                      </div>
                    )}
                  </motion.div>

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
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(true)}
                      className="rounded-sm border-[1.5px] border-black/10 px-5 py-2.5 md:py-3.5 text-[13px] text-[#8a8a8a] transition hover:border-[#0c0c0f] hover:text-[#0c0c0f]"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className={`group relative flex-1 overflow-hidden rounded-sm ${loading ? "bg-[#c4a23e]" : "bg-[#0c0c0f]"} py-3.5 text-[8px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#faf9f6] transition hover:-translate-y-px`}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-br from-[#b8953a] to-[#c4a23e] transition-transform duration-300 group-hover:translate-x-0" />

                      <span className="relative z-10">
                        {loading ? (
                          <div className="flex items-center justify-center gap-1">
                            Creating account
                            <Hourglass
                              visible={true}
                              height="18"
                              width="18"
                              ariaLabel="hourglass-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              colors={["#ffffff", "#ffffff"]}
                            />
                          </div>
                        ) : (
                          "Create Account on LUXORA"
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black font-semibold hover:text-gray-400 transition-colors"
              >
                {" "}
                Sign in
              </Link>
            </p>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
