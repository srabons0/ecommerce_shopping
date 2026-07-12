import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    icon: String,

    description: String,

    tags: [String],

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["men", "women", "couple", "kids", "unisex","universal"],
    },

    popularBrands: [String],

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item ||
  mongoose.model("Item", ItemSchema);