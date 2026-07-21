import { NextResponse } from "next/server";

import Product from "@/models/Product";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const { paymentIntentId, userId, items, shipping, paymentMethod } =
      await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment not completed.",
        },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User is required.",
        },
        { status: 400 },
      );
    }

    if (!items?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 },
      );
    }


    const existingOrder = await Order.findOne({
      stripePaymentIntentId: paymentIntentId,
    });

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        order: existingOrder,
      });
    }


    let orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productID);
      console.log(product);
      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.productId} not found.`,
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

      const itemSubtotal = price * item.quantity;

      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images,
        price,
        quantity: item.quantity,
        size: item.sizes || "",
        color: item.colors || "",
        discountPercentage: product.discountPercentage,
        subtotal: itemSubtotal,
      });

      // Update Product
      product.stock -= item.quantity;
      product.salesCount += item.quantity;

      await product.save();
    }

    const shippingFee = 100;
    const tax = 0;
    const discount = 0;

    const total = subtotal + shippingFee + tax - discount;


    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,

      user: userId,

      items: orderItems,

      shipping,

      currency: "BDT",

      subtotal,

      shippingFee,

      tax,

      discount,

      total,

      paymentMethod,

      paymentStatus: "paid",

      orderStatus: "pending",

      stripePaymentIntentId: paymentIntentId,

      paidAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      { status: 500 },
    );
  }
}
