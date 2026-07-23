import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { email },
      { $set: body },
      { new: true },
    );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
