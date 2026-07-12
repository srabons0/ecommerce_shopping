import mongoose, { Schema } from "mongoose";

const VariantSchema = new Schema({
  variantId: String,
  color: String,
  colorHex: String,
  size: String,
  sku: String,
  stock: Number,
  priceModifier: Number,
  images: [String],
});

const ProductSchema = new Schema(
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

    description: String,
    shortDescription: String,

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "BDT",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    subCategory: String,
    subCategorySlug: String,

    item: String,
    itemSlug: String,

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["men", "women", "couple", "kids", "unisex","universal"],
    },

    brand: String,

    sku: {
      type: String,
      unique: true,
    },

    images: [String],

    variants: [VariantSchema],

    stock: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    allowBackorder: {
      type: Boolean,
      default: false,
    },

    attributes: {
      sizes: [String],
      colors: [String],
      fit: String,
      material: String,
      pattern: String,
      sleeveType: String,
      neckType: String,
      occasion: String,
      season: String,
      careInstructions: String,
    },

    specifications: {
      Weight: String,
      Fabric: String,
      Origin: String,
      FitType: String,
      Collar: String,
      Closure: String,
    },

    tags: [String],

    shipping: {
      weight: Number,
      weightUnit: String,

      dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: String,
      },

      freeShipping: Boolean,
      shippingClass: String,
    },

    ratings: {
      average: {
        type: Number,
        default: 0,
      },

      count: {
        type: Number,
        default: 0,
      },

      breakdown: {
        "5": { type: Number, default: 0 },
        "4": { type: Number, default: 0 },
        "3": { type: Number, default: 0 },
        "2": { type: Number, default: 0 },
        "1": { type: Number, default: 0 },
      },
    },

    salesCount: {
      type: Number,
      default: 0,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    wishlistCount: {
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

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isOnSale: {
      type: Boolean,
      default: false,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },


    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);