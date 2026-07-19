import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const subCategories = await SubCategory.find().lean();

    const withCount = [{subCategories}, {total: subCategories.length}];
// console.log("GET /api/subCategories response:", withCount);
    return NextResponse.json(withCount);
  } catch (error) {
    console.error("GET /api/subCategories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subCategories" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Name, slug, gender are required" },
        { status: 400 },
      );
    }
    const subCategory = await SubCategory.create(body);
    return NextResponse.json(subCategory, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
