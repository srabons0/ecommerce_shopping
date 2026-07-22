import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB;
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const user = await User.findOne({email}).lean();
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/user/info error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
