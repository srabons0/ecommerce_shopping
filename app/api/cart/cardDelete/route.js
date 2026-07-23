import { connectDB } from "@/lib/mongodb";
import UserOrder from "@/models/UserOrder";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const cart = await UserOrder.deleteMany({ email });
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(error);
  }
}
