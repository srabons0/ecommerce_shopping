import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.error("GET /api/order error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
