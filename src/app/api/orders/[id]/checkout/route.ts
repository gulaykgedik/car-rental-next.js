import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import Stripe from "stripe";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { badRequest, notFound, serverError, unauthorized } from "@/lib/api/errors";
import Car from "@/models/Car";
import Order, { type IOrder } from "@/models/Order";
import type { ICar } from "@/types/car.types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return badRequest("Geçersiz sipariş id");
  }

  try {
    const session = await auth();
    if (!session?.user) return unauthorized("Kullanıcı oturumu kapalı");

    await connectDB();
    void Car;

    // kullanıcı ID'sini ObjectId'ye dönüştür
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const order = await Order.findOne({ _id: id, user: userId })
      .populate("product")
      .lean<Omit<IOrder, "product"> & { product: ICar }>();

    if (!order) return notFound("Sipariş bulunamadı");

    if (order.status !== "pending") {
      return badRequest("Bu sipariş için ödeme alınamaz");
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: order.currency,
            unit_amount: order.totalAmount * 100,
            product_data: {
              name: `${order.product.make} ${order.product.modelName}`,
              description: `${order.rental.days} gün kiralama`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: String(session.user.id),
        orderId: String(order._id),
      },
      success_url: `${process.env.AUTH_URL}/orders/${String(order._id)}`,
      cancel_url: `${process.env.AUTH_URL}/orders/${String(order._id)}`,
    });

    return Response.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("[POST /api/orders/:id/checkout]", err);
    return serverError("Ödeme oturumu oluşturulamadı");
  }
}