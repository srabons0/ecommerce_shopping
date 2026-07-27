import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const body = await req.json();
    const statusUpdate = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );
    return NextResponse.json(statusUpdate, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
