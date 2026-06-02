"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

type Review = {
  id: string;
  initials: string;
  name: string;
  title: string;
  date: string;
  rating: number;
  body: string;
};

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    initials: "AS",
    name: "Alex Stanton",
    title: "Bukalapak CEO'su",
    date: "21 Temmuz 2022",
    rating: 4,
    body: "MORENT'in hizmetinden çok memnunuz. MORENT düşük fiyatlar sunuyor ve aynı zamanda iyi ve konforlu olanaklara sahip geniş bir araç çeşitliliği var. Ayrıca personelin sağladığı hizmet de çok güler yüzlü ve kibar.",
  },
  {
    id: "r2",
    initials: "SD",
    name: "Skylar Dias",
    title: "Amazon CEO'su",
    date: "20 Temmuz 2022",
    rating: 4,
    body: "MORENT uygulamasının hizmetlerinden büyük ölçüde faydalandık. MORENT düşük fiyatlar ve aynı zamanda iyi ve konforlu olanaklara sahip geniş araç çeşitliliği sunuyor. Ayrıca personelin sağladığı hizmet de çok güler yüzlü ve kibar.",
  },
  {
    id: "r3",
    initials: "MK",
    name: "Mehmet Kaya",
    title: "Yazılım Geliştirici",
    date: "15 Temmuz 2022",
    rating: 5,
    body: "Çok temiz bir araç teslim aldım. Süreç hızlıydı, fiyat uygun. Kesinlikle tekrar tercih ederim.",
  },
  {
    id: "r4",
    initials: "AY",
    name: "Ayşe Yılmaz",
    title: "Pazarlama Müdürü",
    date: "10 Temmuz 2022",
    rating: 5,
    body: "İletişim mükemmeldi ve araç tam beklediğim gibiydi. MORENT'i tüm arkadaşlarıma öneriyorum.",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} / 5 yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={0} fill={i < value ? "#facc15" : "#d1d5db"} />
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <article className="flex items-start gap-4">
      <div className="size-11 rounded-full bg-secondary-300/20 text-secondary-500 flex items-center justify-center text-sm font-bold shrink-0">
        {review.initials}
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex flex-col gap-1">
            <h3 className="text-secondary-500 text-base font-bold">{review.name}</h3>
            <p className="text-secondary-300 text-xs font-medium">{review.title}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-secondary-300 text-xs font-medium">{review.date}</span>
            <Stars value={review.rating} />
          </div>
        </div>
        <p className="text-secondary-400 text-sm leading-6 pb-6">{review.body}</p>
      </div>
    </article>
  );
}

type ReviewsProps = {
  totalReviews: number;
};

export default function Reviews({ totalReviews }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 2);
  const count = totalReviews > 0 ? totalReviews : MOCK_REVIEWS.length;

  return (
    <section className="bg-card rounded-card p-6 lg:p-8 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <h2 className="text-secondary-500 text-xl font-bold">Yorumlar</h2>
        <span className="bg-primary text-white text-xs font-semibold rounded px-2 py-1">{count}</span>
      </header>

      <div className="flex flex-col gap-6 divide-y divide-border [&>*:not(:first-child)]:pt-6">
        {visible.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
      </div>

      {MOCK_REVIEWS.length > 2 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="self-center flex items-center gap-1.5 text-secondary-300 text-sm font-semibold hover:text-secondary-500"
        >
          {showAll ? "Daha Az Göster" : "Tümünü Göster"}
          <ChevronDown size={16} strokeWidth={2.5} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
    </section>
  );
}