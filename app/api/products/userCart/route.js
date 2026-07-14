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
    console.log(email);

    const order = await UserOrder.find({
       email 
    }).lean();

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
    console.log(body);
    const userCart = await UserOrder.create(body);
    return NextResponse.json(userCart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
