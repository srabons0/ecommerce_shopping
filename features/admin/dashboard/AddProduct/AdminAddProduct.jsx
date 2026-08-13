"use client";

import {
  CheckCircle2,
  ImagePlus,
  Layers3,
  Sparkles,
  Tags,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { RotatingSquare } from "react-loader-spinner";

const previewTabs = [
  { key: "overview", label: "Overview" },
  { key: "details", label: "Details" },
  { key: "reviews", label: "Reviews" },
  { key: "seo", label: "SEO" },
];

const initialProduct = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  price: "",
  currency: "",
  category: "",
  subCategory: "",
  subCategorySlug: "",
  item: "",
  itemSlug: "",
  gender: "",
  brand: "",
  sku: "",
  images: "",
  stock: "",
  attributes: {
    sizes: [],
    colors: [],
    fit: "",
    material: "",
    pattern: "",
  },
  tags: [],
  isActive: true,
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: false,
  isOnSale: false,
  discountPercentage: "",
  collection: "",
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
};

function AdminAddProduct({ category, subCategory, itemCategory }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [tagInput, setTagInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialProduct,
  });

  const product = useWatch({ control });
  const updateField = (field, value) => {
    setValue(field, value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    updateField("images", file);
    toast.success("Image selected");
  };

  const addTag = () => {
    const trimmedInput = tagInput.trim();
    if (!trimmedInput) return;

    const nextTags = trimmedInput
      .split(",")
      .map((tag) => `#${tag.trim()}`)
      .filter(Boolean);

    const tags = [...(product.tags || []), ...nextTags];
    setValue("tags", tags);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      (product.tags || []).filter((tag) => tag !== tagToRemove),
    );
  };

  const addAttributeValue = (attributeKey, inputValue, setInputValue) => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const nextValues = trimmedInput
      .split(",")
      .map((value) =>
        attributeKey === "colors" ? `#${value.trim()}` : value.trim(),
      )
      .filter(Boolean);

    const currentValues = (product.attributes?.[attributeKey] || []).filter(
      Boolean,
    );
    const uniqueValues = Array.from(new Set([...currentValues, ...nextValues]));

    setValue("attributes", {
      ...(product.attributes || {}),
      [attributeKey]: uniqueValues,
    });
    setInputValue("");
  };

  const removeAttributeValue = (attributeKey, valueToRemove) => {
    setValue("attributes", {
      ...(product.attributes || {}),
      [attributeKey]: (product.attributes?.[attributeKey] || []).filter(
        (value) => value !== valueToRemove,
      ),
    });
  };
  const onSubmit = async (data) => {
    if (data.images === "") {
      return toast.error("Image is required");
    } else if (data.attributes.sizes.length === 0) {
      return toast.error("Sizes is required");
    } else if (data.attributes.colors.length === 0) {
      return toast.error("Colors is required");
    } else if (data.tags.length === 0) {
      return toast.error("Tags is required");
    }
    let imageUrl = "";
    if (data.images) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", data.images);
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const result = await res.json();
        imageUrl = result.data.url;
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
    const payload = {
      ...data,
      category: data.gender,
      images: imageUrl,
      price: Number(data.price || 0),
      stock: Number(data.stock || 0),
      discountPercentage: Number(data.discountPercentage || 0),
      collection: data.collection,
      attributes: {
        ...data.attributes,
        sizes: (data.attributes?.sizes || []).filter(Boolean),
        colors: (data.attributes?.colors || []).filter(Boolean),
      },
      tags: (data.tags || [])
        .join(",")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      seo: {
        ...data.seo,
        keywords: (data.tags || [])
          .join(",")
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
      },
    };
    
    const res = await fetch(`/api/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    
    if (result.success) {
      router.refresh();
      reset();
      toast.success(result.message);
    }
    if (!result.success) {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const colorList = (product.attributes?.colors || []).filter(Boolean);
  const tagList = (product.tags || []).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-zinc-200/80 bg-white/90 p-4 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/80 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Core details
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Product name</span>
                    <input
                      {...register("name", {
                        required: "Product name is required",
                      })}
                      placeholder="Enter product name"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600">
                        {errors.name.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Slug</span>
                    <input
                      {...register("slug", { required: "Slug is required" })}
                      placeholder="e.g. oversized-cotton-tshirt"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.slug && (
                      <p className="text-xs text-rose-600">
                        {errors.slug.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Price</span>
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                      placeholder="Enter price"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.price && (
                      <p className="text-xs text-rose-600">
                        {errors.price.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Stock</span>
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock is required",
                        min: { value: 0, message: "Stock cannot be negative" },
                      })}
                      placeholder="Enter available stock"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.stock && (
                      <p className="text-xs text-rose-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Currency</span>
                    <input
                      {...register("currency", {
                        required: "Currency is required",
                      })}
                      placeholder="Select currency"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.currency && (
                      <p className="text-xs text-rose-600">
                        {errors.currency.message}
                      </p>
                    )}
                  </label>
                </div>

                <label className="mt-4 block space-y-2 text-sm font-medium text-zinc-700">
                  <span>Short description</span>
                  <textarea
                    rows={2}
                    {...register("shortDescription", {
                      required: "Short description is required",
                    })}
                    placeholder="Brief summary of the product"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                  />
                  {errors.shortDescription && (
                    <p className="text-xs text-rose-600">
                      {errors.shortDescription.message}
                    </p>
                  )}
                </label>

                <label className="mt-4 block space-y-2 text-sm font-medium text-zinc-700">
                  <span>Description</span>
                  <textarea
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Write a detailed product description..."
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                  />
                  {errors.description && (
                    <p className="text-xs text-rose-600">
                      {errors.description.message}
                    </p>
                  )}
                </label>
              </section>

              <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/80 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <Layers3 className="h-4 w-4 text-zinc-900" />
                  Merchandising & attributes
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Category</span>

                    <select
                      {...register("gender", {
                        required: "Category is required",
                      })}
                      defaultValue=""
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>

                      {category.map((category, i) => (
                        <option key={i} value={category.gender}>
                          {category.gender}
                        </option>
                      ))}
                    </select>

                    {errors.gender && (
                      <p className="text-xs text-rose-600">
                        {errors.gender.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Sub Category</span>

                    <select
                      value={product.subCategorySlug}
                      {...register("subCategory", {
                        required: "Sub Category is required",
                      })}
                      onChange={(e) => {
                        const selected = subCategory.find(
                          (item) => item.slug === e.target.value,
                        );
                        setValue("subCategory", selected.name);
                        setValue("subCategorySlug", selected.slug);
                      }}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    >
                      <option value="" disabled>
                        Select Sub Category
                      </option>

                      {(product.gender
                        ? subCategory.filter((i) => i.gender === product.gender)
                        : subCategory
                      ).map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    {errors.subCategory && (
                      <p className="text-xs text-rose-600">
                        {errors.subCategory.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Item</span>

                    <select
                      value={product.item}
                      {...register("item", {
                        required: "Item is required",
                      })}
                      onChange={(e) => {
                        const selected = itemCategory.find(
                          (item) => item.slug === e.target.value,
                        );

                        setValue("item", selected.name);
                        setValue("itemSlug", selected.slug);
                      }}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    >
                      <option value="" disabled>
                        Select Item
                      </option>

                      {(product.subCategorySlug
                        ? itemCategory.filter(
                            (i) =>
                              i.subCategorySlug === product.subCategorySlug,
                          )
                        : product.gender
                          ? itemCategory.filter(
                              (i) => i.gender === product.gender,
                            )
                          : itemCategory
                      ).map((cate, i) => (
                        <option
                          key={i}
                          className="bg-black text-white"
                          value={cate.slug}
                        >
                          {cate.name}
                        </option>
                      ))}
                    </select>

                    {errors.item && (
                      <p className="text-xs text-rose-600">
                        {errors.item.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Brand</span>
                    <input
                      {...register("brand", {
                        required: "Brand is required",
                      })}
                      placeholder="Enter brand name"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.brand && (
                      <p className="text-xs text-rose-600">
                        {errors.brand.message}
                      </p>
                    )}
                  </label>
                  <div className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Product image</span>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-zinc-300 bg-white px-3.5 py-4 text-center transition hover:border-zinc-950 hover:bg-zinc-50">
                      <ImagePlus className="h-5 w-5 text-zinc-500" />
                      <span className="text-sm font-medium text-zinc-700">
                        Click to upload an image
                      </span>
                      <span className="text-xs text-zinc-500">
                        PNG, JPG, or WebP
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Fit</span>
                    <input
                      {...register("attributes.fit", {
                        required: "Fit is required",
                      })}
                      placeholder="e.g. Regular Fit"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.attributes?.fit && (
                      <p className="text-xs text-rose-600">
                        {errors.attributes.fit.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Material</span>
                    <input
                      {...register("attributes.material", {
                        required: "Material is required",
                      })}
                      placeholder="e.g. 100% Cotton"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.attributes?.material && (
                      <p className="text-xs text-rose-600">
                        {errors.attributes.material.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Pattern</span>
                    <input
                      {...register("attributes.pattern", {
                        required: "Pattern is required",
                      })}
                      placeholder="e.g. Solid, Printed, Striped"

                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.attributes?.pattern && (
                      <p className="text-xs text-rose-600">
                        {errors.attributes.pattern.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Season</span>
                    <input
                      {...register("collection", {
                        required: "Season is required",
                      })}
                      placeholder="e.g. summer"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.collection && (
                      <p className="text-xs text-rose-600">
                        {errors.collection.message}
                      </p>
                    )}
                  </label>
                </div>

                <div className="mt-4 space-y-2 text-sm font-medium text-zinc-700">
                  <span>Sizes</span>
                  <div className="flex flex-wrap gap-2">
                    {(product.attributes?.sizes || []).map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => removeAttributeValue("sizes", size)}
                          className="rounded-full p-0.5 transition hover:bg-white/10"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={sizeInput}
                      onChange={(event) => setSizeInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addAttributeValue("sizes", sizeInput, setSizeInput);
                        }
                      }}
                      placeholder="Select available sizes"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addAttributeValue("sizes", sizeInput, setSizeInput)
                      }
                      className="rounded-2xl bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm font-medium text-zinc-700">
                  <span>Colors</span>
                  <div className="flex flex-wrap gap-2">
                    {(product.attributes?.colors || []).map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => removeAttributeValue("colors", color)}
                          className="rounded-full p-0.5 transition hover:bg-white/10"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={colorInput}
                      onChange={(event) => setColorInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addAttributeValue(
                            "colors",
                            colorInput,
                            setColorInput,
                          );
                        }
                      }}
                      placeholder="Select available colors"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addAttributeValue("colors", colorInput, setColorInput)
                      }
                      className="rounded-2xl bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/80 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <Tags className="h-4 w-4 text-zinc-900" />
                  SEO & visibility
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Meta title</span>
                    <input
                      {...register("seo.metaTitle", {
                        required: "Meta title is required",
                      })}
                      placeholder="Enter SEO title"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />
                    {errors.seo?.metaTitle && (
                      <p className="text-xs text-rose-600">
                        {errors.seo.metaTitle.message}
                      </p>
                    )}
                  </label>
                  <label className="space-y-2 text-sm font-medium text-zinc-700">
                    <span>Tags</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {tagList.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="rounded-full p-0.5 transition hover:bg-white/10"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={tagInput}
                          onChange={(event) => setTagInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="Enter tags (comma separated)"
                          className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="rounded-2xl bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
                <label className="mt-4 block space-y-2 text-sm font-medium text-zinc-700">
                  <span>Meta description</span>
                  <textarea
                    rows={2}
                    {...register("seo.metaDescription", {
                      required: "Meta description is required",
                    })}
                    placeholder="Enter SEO meta description"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                  />
                  {errors.seo?.metaDescription && (
                    <p className="text-xs text-rose-600">
                      {errors.seo.metaDescription.message}
                    </p>
                  )}
                </label>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["isActive", "Active"],
                    ["isFeatured", "Featured"],
                    ["isNewArrival", "New arrival"],
                    ["isBestSeller", "Best seller"],
                    ["isOnSale", "On sale"],
                  ].map(([field, label]) => (
                    <label
                      key={field}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-3.5 py-3 text-sm font-medium text-zinc-700"
                    >
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        {...register(field)}
                        className="h-4 w-4 rounded accent-zinc-950"
                      />
                    </label>
                  ))}
                </div>
                {Boolean(product.isOnSale) && (
                  <label className="space-y-2 text-sm font-medium text-zinc-700 md:col-span-2">
                    <span>Discount percentage</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      {...register(
                        "discountPercentage",
                        Boolean(product.isOnSale) && {
                          required: "Discount percentage is required",
                        },
                      )}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 outline-none transition focus:border-zinc-950"
                    />{" "}
                    {errors.discountPercentage && (
                      <p className="text-xs text-rose-600">
                        {errors.discountPercentage.message}
                      </p>
                    )}
                  </label>
                )}
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {loading ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    <RotatingSquare
                      visible
                      height="20"
                      width="20"
                      color="#fff"
                      ariaLabel="loading"
                    />
                    <span>Creating Product...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Save product
                  </button>
                )}
              </div>
            </form>
          </div>
          <aside className="w-full max-w-xl space-y-4 xl:sticky xl:top-6 xl:h-fit">
            <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]">
              <div className="relative min-h-70 bg-zinc-950">
                {product.images ? (
                  <Image
                    width={300}
                    height={300}
                    src={
                      typeof product.images === "string"
                        ? product.images
                        : URL.createObjectURL(product.images)
                    }
                    alt={product.name || "Product preview"}
                    className="h-full min-h-70 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-70 items-center justify-center text-zinc-200">
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                      <ImagePlus className="h-5 w-5" />
                      <span className="text-sm">Image preview</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-300">
                    {product.subCategory || "New product"}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight">
                    {product.name || "Your product title"}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      {product.brand || "Brand"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {product.shortDescription ||
                        "Add a short description to showcase the product."}
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                    {product.currency || "BDT"} {product.price || 0}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tagList.length > 0 ? (
                    tagList.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
                      No tags yet
                    </span>
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      Stock
                    </p>
                    <p className="mt-1 text-lg font-semibold text-zinc-950">
                      {product.stock || 0} units
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      Fit
                    </p>
                    <p className="mt-1 text-lg font-semibold text-zinc-950">
                      {product.attributes.fit || "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 mb-5 flex gap-2 rounded-full bg-zinc-100 p-1">
                  {previewTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                        activeTab === tab.key
                          ? "bg-zinc-950 text-white"
                          : "text-zinc-600 hover:bg-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-600">
                  {activeTab === "overview" && (
                    <div className="space-y-3">
                      <p className="text-base font-semibold text-zinc-950">
                        {product.shortDescription ||
                          "Your product summary will appear here."}
                      </p>
                      <p>
                        {product.description ||
                          "Add a detailed description to tell the story of the product."}
                      </p>
                    </div>
                  )}

                  {activeTab === "details" && (
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          ["Category", product.gender || "—"],
                          ["Sub category", product.subCategory || "—"],
                          ["Item", product.item || "—"],
                          ["Gender", product.gender || "—"],
                          ["Currency", product.currency || "BDT"],
                          [
                            "Price",
                            `${product.currency || "BDT"} ${product.price || 0}`,
                          ],
                          ["Discount", `${product.discountPercentage || 0}%`],
                          ["Fit", product.attributes.fit || "—"],
                          ["Material", product.attributes.material || "—"],
                          ["Pattern", product.attributes.pattern || "—"],
                          ["Season", product.collection || "—"],
                          ["Sizes", product.attributes.sizes.join(", ") || "—"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-xl bg-zinc-50 p-3"
                          >
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                              {label}
                            </span>
                            <p className="mt-1 font-semibold text-zinc-900">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl bg-zinc-50 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          Colors
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {colorList.length > 0 ? (
                            colorList.map((color) => (
                              <div
                                key={color}
                                className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-zinc-200"
                              >
                                <span
                                  className="h-4 w-4 rounded-full border border-zinc-300"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-xs font-semibold text-zinc-700">
                                  {color}
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-zinc-500">
                              No colors selected yet
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-3">
                      <div className="rounded-xl bg-zinc-50 p-3">
                        <p className="font-semibold text-zinc-900">
                          Rating overview
                        </p>
                        <p className="mt-2 text-zinc-600">
                          Average rating: 0.0 from 0 customer reviews.
                        </p>
                      </div>
                      <p>
                        This section will highlight quality, comfort, and fit
                        once the store has review data.
                      </p>
                    </div>
                  )}

                  {activeTab === "seo" && (
                    <div className="space-y-4">
                      <div className="rounded-xl bg-zinc-50 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          Meta title
                        </span>
                        <p className="mt-1 font-semibold text-zinc-900">
                          {product.seo.metaTitle || "—"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-zinc-50 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          Meta description
                        </span>
                        <p className="mt-1 text-zinc-700">
                          {product.seo.metaDescription || "—"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-zinc-50 p-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          Keywords
                        </span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tagList.length > 0 ? (
                            tagList.map((tag, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-zinc-500">
                              No keywords yet
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AdminAddProduct;
