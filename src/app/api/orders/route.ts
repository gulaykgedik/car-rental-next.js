import mongoose from "mongoose";
import { serverError, unauthorized } from "@/lib/api/errors";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) return unauthorized("Kullanıcı oturumu kapalı");

    await connectDB();

    void Car;

    // kullanıcı ID'sini ObjectId'ye dönüştür
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("product")
      .lean();

    return Response.json({ data: orders });
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return serverError("Siparişler alınamadı");
  }
}