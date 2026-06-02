import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order, { type IOrder } from "@/models/Order";
import type { ICar } from "@/types/car.types";
import OrderSummary from "@/components/orders/OrderSummary";
import ResumePaymentButton from "@/components/orders/ResumePaymentButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  await connectDB();
  
  // kullanıcı ID'sini ObjectId'ye dönüştür
  const userId = new mongoose.Types.ObjectId(session.user.id);
  
  const order = await Order.findOne({ _id: id, user: userId })
    .populate("product")
    .lean<Omit<IOrder, "product"> & { product: ICar }>();

  if (!order || !order.product) notFound();

  const orderRef = String(order._id).slice(-8).toUpperCase();
  const carId = String(order.product._id);

  return (
    <div className="max-w-180 mx-auto px-6 lg:px-16 py-12 flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-secondary-500 text-2xl font-bold">Sipariş Detayı</h1>
        <p className="text-secondary-300 text-sm">Sipariş #{orderRef} için detaylar burada.</p>
      </header>

      <OrderSummary order={order} />

      <div className="flex flex-col sm:flex-row gap-3">
        {order.status === "pending" ? <ResumePaymentButton orderId={id} /> : null}
        <Link
          href={`/cars/${carId}`}
          className="bg-primary hover:opacity-90 text-white text-sm font-semibold h-12 rounded inline-flex items-center justify-center px-6 flex-1 py-2"
        >
          Araç sayfasına dön
        </Link>
        <Link
          href="/orders"
          className="border border-border bg-card text-secondary-500 hover:opacity-90 text-sm font-semibold h-12 rounded inline-flex items-center justify-center px-6 flex-1 py-2"
        >
          Tüm siparişlerim
        </Link>
      </div>
    </div>
  );
}
