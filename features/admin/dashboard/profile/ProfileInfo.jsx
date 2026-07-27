"use client";
import { useEffect, useState } from "react";
import Logout from "./Logout";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
function ProfileInfo() {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = user.image;
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      // console.log(formData);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const result = await res.json();
      imageUrl = result.data.url;
    }

    const info = {
      name: data.name,
      email: data.email,
      image: imageUrl,
      address: data.address,
      number: data.number,
    };
    const res = await fetch(`/api/user/updateProfile?email=${user?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const result = await res.json();
    // console.log(result);
    if (result) {
      toast.success("Profile Updated Successfully!");
    }
  };
  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/info?email=${session?.user.email}`);
        const data = await res.json();
        setUser(data);
        reset({
          name: data.name || "",
          email: data.email || "",
          number: data.number || "",
          address: data.address || "",
        });
      };
      fetchUserData();
    }
    return;
  }, [session, reset]);

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
            <Image
              className="
            w-32 h-32 md:w-36 md:h-36
            object-cover
            rounded-full
            border-2 border-gray-400
            shadow-md
          "
              src={
                (image && URL.createObjectURL(image)) ||
                user?.image ||
                "https://i.ibb.co.com/NYF9QTQ/images.png"
              }
              width={200}
              height={200}
              alt={"Profile Image"}
              priority
            />

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
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
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
              type="text"
              {...register("name")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.name && (
              <p className="error-text text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              disabled={true}
              {...register("email")}
              className=" w-full py-3 px-3 rounded-xl border-2 bg-gray-100 border-gray-300"
            />
            {errors.email && (
              <p className="error-text text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaPhone /> Phone
            </label>
            <input
              type="tel"
              {...register("number")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.number && (
              <p className="error-text text-red-500 text-sm">
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaMapMarkerAlt /> Address
            </label>
            <input
              {...register("address")}
              className=" w-full py-3 px-3 rounded-xl border-2 border-gray-300"
            />
            {errors.address && (
              <p className="error-text text-red-500 text-sm">
                {errors.address.message}
              </p>
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default ProfileInfo;
