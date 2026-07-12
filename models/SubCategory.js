import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["men", "women", "couple", "kids", "unisex","universal"],
    },

    order: {
      type: Number,
      default: 0,
    },

    filters: {
      sizes: [String],
      colors: [String],
      fits: [String],
      materials: [String],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", SubCategorySchema);