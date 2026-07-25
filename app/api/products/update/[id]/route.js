import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const normalizedBody = {
      ...body,
      sizes: Array.isArray(body.sizes)
        ? body.sizes
        : typeof body.sizes === "string"
          ? body.sizes
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
      colors: Array.isArray(body.colors)
        ? body.colors
        : typeof body.colors === "string"
          ? body.colors
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
      keywords: Array.isArray(body.keywords)
        ? body.keywords
        : typeof body.keywords === "string"
          ? body.keywords
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: normalizedBody },
      { new: true, runValidators: true },
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 },
    );
  }
}
