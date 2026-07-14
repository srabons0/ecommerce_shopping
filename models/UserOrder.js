import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "BDT",
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
    },
    subCategory: String,
    item: String,
    images: String,
    sizes: String,
    colors: String,
    quantity: Number,
    discountPercentage: {
      type: Number,
      default: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      default: "none",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.UserOrder ||
  mongoose.model("UserOrder", orderSchema);
