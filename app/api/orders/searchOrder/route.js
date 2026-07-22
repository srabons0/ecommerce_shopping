import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    let query = {};
    if (search) {
      query.$or = [
        {
          "shipping.fullName": {
            $regex: search,
            $options: "i",
          },
        },
        {
          orderNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "shipping.phone": {
            $regex: search,
            $options: "i",
          },
        },
      ];
      const order = await Order.find(query)
        .select("shipping orderNumber")
        .lean();

      return NextResponse.json(order);
    }
  } catch (error) {
    console.error("GET /api/order error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}
