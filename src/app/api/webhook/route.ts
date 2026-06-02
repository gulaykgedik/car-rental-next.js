import mongoose from "mongoose";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    // 1) isteğin body kısmındaki ödeme ile alakalı gelen veriye eriş
    const body = await req.json();

    // 2) stripe'ın gönderdiği event'e eriş
    const session = body.data.object as Stripe.Checkout.Session;

    // 3) sipariş id'sine eriş
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in webhook metadata");
      return NextResponse.json({ error: "No orderId" }, { status: 400 });
    }

    // veritabanına bağlan
    await connectDB();

    // sipariş id'sini ObjectId'ye dönüştür
    const objectId = new mongoose.Types.ObjectId(orderId);

    switch (body.type) {
      // 4) ödeme başarılı olduysa sipariş durumunu paid yap
      case "checkout.session.completed":
        const paidResult = await Order.findByIdAndUpdate(objectId, { status: "paid" }, { new: true });
        console.log("Order updated to paid:", paidResult?._id);
        break;
      // 5) ödeme başarısız olduysa sipariş durumunu cancelled yap
      case "checkout.session.expired":
        const cancelledResult = await Order.findByIdAndUpdate(objectId, { status: "cancelled" }, { new: true });
        console.log("Order updated to cancelled:", cancelledResult?._id);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/webhook]", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
