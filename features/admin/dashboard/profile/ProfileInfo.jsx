"use client";
import React from "react";
import Logout from "./Logout";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
function ProfileInfo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};
  const handleImageUpload = () => {};
  const { data: session } = useSession();
  const images = 0;
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:p-10 flex flex-col gap-10">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="
      bg-white
      shadow-xl
      rounded-2xl
      p-6 md:p-10
      w-full
      max-w-3xl
      mx-auto
      flex
      flex-col
      gap-8
    "
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Profile Picture
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {!images ? (
              <BsPersonCircle
                className="w-32 h-32 md:w-36 md:h-36
            object-cover
            rounded-full
            border-2 border-gray-400
            shadow-md"
              />
            ) : (
              <Image
                className="
            w-32 h-32 md:w-36 md:h-36
            object-cover
            rounded-full
            border-2 border-gray-400
            shadow-md
          "
                src={images || user?.photoURL || photoUploader}
                alt=""
              />
            )}
            <div className="relative">
              <label
                className="
              cursor-pointer
              inline-flex
              items-center
              justify-center
              px-6
              py-2
              rounded-lg
              border-2
              border-gray-400
              font-semibold
              text-gray-700
              hover:bg-gray-100
              transition
            "
              >
                Update Photo
                <input
                  type="file"
                  {...register("image")}
                  onInput={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700">
          Profile Information
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUser /> Name
            </label>
            <input
              defaultValue={session?.user.name}
              {...register("name")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              defaultValue={session?.user.email}
              {...register("email")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaPhone /> Phone
            </label>
            <input
              type="tel"
              defaultValue={session?.user.phone}
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Enter a valid 11-digit number",
                },
              })}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.phone && (
              <p className="error-text">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaMapMarkerAlt /> Address
            </label>
            <input
              defaultValue={session?.user.address}
              {...register("address")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.address && (
              <p className="error-text">{errors.address.message}</p>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="
        bg-black
        font-bold text-white
        py-3
        rounded-xl
        shadow-lg
        hover:shadow-xl
        transition
      "
        >
          Save Changes
        </motion.button>
      </motion.form>

      <Logout />
      <Toaster position="top-center" />
    </div>
  );
}

export default ProfileInfo;
