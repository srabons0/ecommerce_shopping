import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const item = url.searchParams.get("cat")
    console.log("item",item)
    const Products = await Product.find({item}).limit(20).lean();
console.log(Product.length)
    return NextResponse.json(Products);
  } catch (error) {
    console.error("GET /api/subCategories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subCategories" },
      { status: 500 },
    );
  }
}