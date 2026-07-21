import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import stripe from "@/lib/stripe";

export async function POST(req) {
  try {
    await connectDB();

    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 },
      );
    }

    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productID);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "Product not found.",
          },
          { status: 404 },
        );
      }

      if (!product.isActive) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} is unavailable.`,
          },
          { status: 400 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} is out of stock.`,
          },
          { status: 400 },
        );
      }

      let price = product.price;

      if (product.isOnSale) {
        price = price - (price * product.discountPercentage) / 100;
      }

      total += Math.round(price * item.quantity);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create payment intent.",
      },
      { status: 500 },
    );
  }
}
