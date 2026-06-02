import mongoose from "mongoose";
import { serverError, unauthorized, notFound } from "@/lib/api/errors";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) return unauthorized("Kullanıcı oturumu kapalı");
    if (!mongoose.Types.ObjectId.isValid(id)) return notFound("Geçersiz sipariş id");

    await connectDB();

    void Car;

    // kullanıcı ID'sini ObjectId'ye dönüştür
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const order = await Order.findOne({ _id: id, user: userId })
      .populate("product")
      .lean();

    if (!order) return notFound("Sipariş bulunamadı");

    return Response.json({ data: order });
  } catch (err) {
    console.error("[GET /api/orders/:id]", err);
    return serverError("Sipariş getirilemedi");
  }
}