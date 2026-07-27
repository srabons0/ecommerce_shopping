import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const deleteProduct = await Order.findByIdAndDelete(id);
    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.error("GET /api/order error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
