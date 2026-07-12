import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Item from "@/models/Item";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const items = await Item.find().sort({ name: 1 }).lean();

    const withCount = [{items}, {total: items.length}];
console.log("GET /api/items response:", withCount);
    return NextResponse.json(withCount);
  } catch (error) {
    console.error("GET /api/items error:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Name, slug, gender are required" },
        { status: 400 },
      );
    }
    const item = await Item.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Item already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create item " },
      { status: 500 },
    );
  }
}
