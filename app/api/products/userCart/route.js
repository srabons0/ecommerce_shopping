import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import UserOrder from "@/models/UserOrder";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { slugify } from "zod";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const order = await UserOrder.find({
      email,
    })
      .select(
        "name slug images price sizes colors quantity productID discountPercentage",
      )
      .lean();

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/order error:", error);
  return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const userCart = await UserOrder.create(body);
    return NextResponse.json(userCart, { status: 201 });
  } catch (error) {

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
