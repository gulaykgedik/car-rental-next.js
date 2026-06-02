import type { ICar } from "@/types/car.types";
import type { IOrder } from "@/models/Order";

type OrderForSummary = Omit<IOrder, "product"> & {
  product: Pick<ICar, "make" | "modelName" | "year">;
};

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

type Props = {
  order: OrderForSummary;
};

export default function OrderSummary({ order }: Props) {
  const { product, rental, totalAmount, status } = order;

  return (
    <div className="bg-card rounded-card p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3 pb-5 border-b border-border">
        <div className="flex flex-col gap-1">
          <span className="text-secondary-300 text-xs font-medium">Araç</span>
          <span className="text-secondary-500 text-lg font-bold">
            {product.make} {product.modelName} ({product.year})
          </span>
          <span
            className={`mt-1 inline-flex w-fit items-center rounded-pill px-3 py-1 text-xs font-semibold ${STATUS_CLASS[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-secondary-300 text-xs font-medium">Toplam</span>
          <span className="text-secondary-500 text-lg font-bold">₺{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <dt className="text-secondary-300 text-xs font-medium">Teslim Alma</dt>
          <dd className="text-secondary-500 text-sm font-semibold">
            {formatDate(rental.pickupDate)} • {rental.pickupTime}
          </dd>
          <dd className="text-secondary-400 text-sm">{rental.pickupLocation}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-secondary-300 text-xs font-medium">Geri Teslim</dt>
          <dd className="text-secondary-500 text-sm font-semibold">
            {formatDate(rental.returnDate)} • {rental.returnTime}
          </dd>
          <dd className="text-secondary-400 text-sm">{rental.dropoffLocation}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-secondary-300 text-xs font-medium">Süre</dt>
          <dd className="text-secondary-500 text-sm font-semibold">{rental.days} gün</dd>
        </div>
        {rental.notes ? (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <dt className="text-secondary-300 text-xs font-medium">Notlar</dt>
            <dd className="text-secondary-400 text-sm whitespace-pre-line">{rental.notes}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}