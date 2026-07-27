import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const body = await req.json();

    const allowedFields = ["name", "image", "address", "number"];
    const update = {};

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        update[field] = body[field];
      }
    });

    const updateQuery = {};

    if (Object.keys(update).length) {
      updateQuery.$set = update;
    }

    if (body.orderIncrement || body.spentIncrement) {
      updateQuery.$inc = {
        ...(body.orderIncrement && { orders: body.orderIncrement }),
        ...(body.spentIncrement && { totalSpent: body.spentIncrement }),
      };
    }

    const user = await User.findOneAndUpdate({ email }, updateQuery, {
      new: true,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
