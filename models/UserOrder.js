import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    productID: {
      type: String,
      required: true,
    },
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
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },

    images: String,
    sizes: String,
    colors: String,
    quantity: Number,
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.UserOrder ||
  mongoose.model("UserOrder", orderSchema);
