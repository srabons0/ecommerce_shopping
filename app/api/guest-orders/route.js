import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();
  const phone = searchParams.get("phone")?.trim();
  const orderNumber = searchParams.get("orderNumber")?.trim();

  if (!orderNumber && (!email || !phone)) {
    return NextResponse.json(
      { success: false, message: "Email and phone are required." },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const orders = await Order.find({
      ...(orderNumber
        ? { orderNumber }
        : { "shipping.email": email, "shipping.phone": phone }),
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders: orders.map((order) => ({
        ...order,
        _id: order._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Guest order lookup failed", error);
    return NextResponse.json(
      { success: false, message: "Unable to find orders right now." },
      { status: 500 },
    );
  }
}
