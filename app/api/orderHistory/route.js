import { connectDB } from "@/lib/mongodb";
import OrderHistory from "@/models/OrderHistory";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const orderHistory = await OrderHistory.create(body);
    return NextResponse.json({
      success: true,
      message: "Order History created successfully",
      data: orderHistory,
    });
  } catch (err) {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
        err
      },
      { status: 500 },
    );
  }
}
