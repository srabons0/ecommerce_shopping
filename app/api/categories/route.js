import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { promise } from "zod";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().select("_id name slug").lean();

    const withCount = [{ categories }, { total: categories.length }];

    return NextResponse.json(withCount);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
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
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
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
