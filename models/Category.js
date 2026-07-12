import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      require: true,
      enum: ["men", "women", "couple", "kids", "unisex","universal"],
    },

    order: {
      type: Number,
      default: 0,
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
  },
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
