import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { slugify } from "zod";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const item = url.searchParams.get("ids");
    const id = item.split(",").map((id) => new ObjectId(id));
    console.log(id);
    const Products = await Product.find({
      _id: { $in: id },
    })
      .select(
        "name slug  images price",
      )
      .lean();
    console.log(Product.length);
    return NextResponse.json(Products);
  } catch (error) {
    console.error("GET /api/subCategories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subCategories" },
      { status: 500 },
    );
  }
}
