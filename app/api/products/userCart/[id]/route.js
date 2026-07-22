import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import UserOrder from "@/models/UserOrder";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { slugify } from "zod";

export async function DELETE(req,{params}) {
  try {
    await connectDB();
const {id} = await params;
    const order = await UserOrder.deleteOne(
     { _id: new ObjectId(id)},
    )

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/order error:", error);
  return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
