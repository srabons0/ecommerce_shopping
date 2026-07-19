import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
const {searchParams} = new URL(req.url)
const search = searchParams.get("search")
    let query = {};
    // console.log("search", search);
if(search){
    query.name={
        $regex: search,
        $options:"i"
    }
    const Products = await Product.find(query)
      .select("name subCategorySlug itemSlug gender")
      .lean();

    // console.log("Products", Products.length);
    return NextResponse.json(Products);
}


  } catch (error) {
    console.error("GET /api/subCategories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subCategories" },
      { status: 500 },
    );
  }
}
