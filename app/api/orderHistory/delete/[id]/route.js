import { connectDB } from "@/lib/mongodb";
import OrderHistory from "@/models/OrderHistory";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const deleteProduct = await OrderHistory.findByIdAndDelete(id);
    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.error("GET /api/order error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
