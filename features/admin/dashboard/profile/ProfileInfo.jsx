"use client";
import { useEffect, useState } from "react";
import Logout from "../../../../components/shared/Logout";
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
    <div className="flex min-h-screen flex-col gap-10 bg-gray-50 py-8 md:p-10">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-white p-6 shadow-xl md:p-10"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Profile Picture
          </h3>

          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Image
              className="h-32 w-32 rounded-full border-2 border-gray-400 object-cover shadow-md md:h-36 md:w-36"
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
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-400 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-100">
                Update Photo
                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="absolute inset-0 cursor-pointer opacity-0"
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
              className="w-full rounded-xl border-2 border-gray-300 px-3 py-3"
            />
            {errors.name && (
              <p className="error-text text-sm text-red-500">
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
              className="w-full rounded-xl border-2 border-gray-300 bg-gray-100 px-3 py-3"
            />
            {errors.email && (
              <p className="error-text text-sm text-red-500">
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
              className="w-full rounded-xl border-2 border-gray-300 px-3 py-3"
            />
            {errors.number && (
              <p className="error-text text-sm text-red-500">
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
              className="w-full rounded-xl border-2 border-gray-300 px-3 py-3"
            />
            {errors.address && (
              <p className="error-text text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="rounded-xl bg-black py-3 font-bold text-white shadow-lg transition hover:shadow-xl"
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
