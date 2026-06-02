"use client";

import { useState } from "react";

type Props = {
  orderId: string;
};

export default function ResumePaymentButton({ orderId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/orders/${orderId}/checkout`, { method: "POST" });
      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      alert("Ödeme oturumu oluşturulamadı");
    } catch {
      alert("Ödeme oturumu açılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="bg-primary hover:opacity-90 text-white text-sm font-semibold px-4 h-10 rounded inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed py-2"
    >
      {isLoading ? "Yükleniyor..." : "Ödemeye Devam Et"}
    </button>
  );
}