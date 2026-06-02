import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { fetchOrders } from "@/services/order.service";
import { buildCarImageUrl } from "@/utils/imagin.utils";
import ResumePaymentButton from "@/components/orders/ResumePaymentButton";
import type { IOrder } from "@/models/Order";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<IOrder["status"], string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  cancelled: "İptal Edildi",
};

const STATUS_CLASS: Record<IOrder["status"], string> = {
  pending: "bg-secondary-300/10 text-secondary-400",
  paid: "bg-primary/10 text-primary",
  cancelled: "bg-discount/10 text-discount",
};

const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await fetchOrders();

  return (
    <div className="max-w-280 mx-auto px-6 lg:px-16 py-8 flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-secondary-500 text-2xl font-bold">Siparişlerim</h1>
        <p className="text-secondary-300 text-sm">Geçmiş ve devam eden tüm rezervasyonların.</p>
      </header>

      {orders.length === 0 ? (
        <div className="bg-card rounded-card p-10 flex flex-col items-center gap-3 text-center">
          <p className="text-secondary-500 text-lg font-bold">Henüz siparişin yok</p>
          <p className="text-secondary-300 text-sm">İlk rezervasyonunu hemen oluştur.</p>
          <Link
            href="/cars"
            className="bg-primary hover:opacity-90 text-white text-sm font-semibold px-6 h-11 rounded inline-flex items-center justify-center mt-2 py-2"
          >
            Araçlara Göz At
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => {
            const orderId = String(order._id);
            const orderRef = orderId.slice(-8).toUpperCase();
            return (
              <li
                key={orderId}
                className="bg-card rounded-card p-5 flex flex-col sm:flex-row sm:items-center gap-5"
              >
                <div className="relative w-32 h-20 shrink-0 flex items-center justify-center">
                  <Image
                    src={buildCarImageUrl({
                      make: order.product.make,
                      modelName: order.product.modelName,
                      year: order.product.year,
                    })}
                    alt={`${order.product.make} ${order.product.modelName}`}
                    width={160}
                    height={80}
                    className="object-contain"
                    style={{ width: "auto", height: "auto", maxHeight: "80px" }}
                    unoptimized
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-secondary-500 text-base font-bold truncate">
                      {order.product.make} {order.product.modelName} ({order.product.year})
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold ${STATUS_CLASS[order.status]}`}
                    >
                      {STATUS_LABEL[order.status]}
                    </span>
                  </div>
                  <p className="text-secondary-400 text-sm">
                    {formatDate(order.rental.pickupDate)} → {formatDate(order.rental.returnDate)} •{" "}
                    {order.rental.days} gün
                  </p>
                  <p className="text-secondary-300 text-xs">
                    Sipariş #{orderRef} • {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                  <span className="text-secondary-500 text-lg font-bold">
                    ₺{order.totalAmount.toFixed(2)}
                  </span>
                  {order.status === "pending" ? (
                    <ResumePaymentButton orderId={orderId} />
                  ) : (
                    <Link
                      href={`/cars/${String(order.product._id)}`}
                      className="border border-border bg-card text-secondary-500 hover:opacity-90 text-sm font-semibold px-4 h-10 rounded inline-flex items-center justify-center py-2"
                    >
                      Aracı Görüntüle
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}