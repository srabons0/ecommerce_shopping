import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email.toLowerCase(),
  });

  return user;
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 },
      );
    }

    const wishlist = await User.findById(user._id)
      .populate("wishlist")
      .select("wishlist");

    return NextResponse.json({
      success: true,
      wishlist: wishlist?.wishlist || [],
      wishlistIds: (wishlist?.wishlist || []).map((product) =>
        product._id.toString(),
      ),
    });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load wishlist.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId).select("_id");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 },
      );
    }

    const alreadyWished = user.wishlist.some(
      (id) => id.toString() === productId,
    );

    if (alreadyWished) {
      return NextResponse.json({
        success: true,
        wished: true,
        message: "Product is already in wishlist.",
        wishlistIds: user.wishlist.map((id) => id.toString()),
      });
    }

    user.wishlist.push(product._id);

    await user.save();

    return NextResponse.json({
      success: true,
      wished: true,
      message: "Added to wishlist.",
      wishlistIds: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product to wishlist.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 },
      );
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

    await user.save();

    return NextResponse.json({
      success: true,
      wished: false,
      message: "Removed from wishlist.",
      wishlistIds: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove product from wishlist.",
      },
      { status: 500 },
    );
  }
}
