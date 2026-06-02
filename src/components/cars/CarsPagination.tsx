"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export default function CarsPagination({ page, totalPages, total, limit }: Props) {
  const pathname = usePathname();
  const sp = useSearchParams();

  function hrefFor(target: number): string {
    const next = new URLSearchParams(sp.toString());
    if (target <= 1) next.delete("page");
    else next.set("page", String(target));
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  if (total === 0) {
    return null;
  }

  const showingFrom = (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between py-4">
        <span className="text-secondary-300 text-sm font-semibold">
          {showingFrom}-{showingTo} / {total}
        </span>
      </div>
    );
  }

  const numbers = getPageNumbers(page, totalPages);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const numBase =
    "min-w-9 h-9 px-3 rounded text-sm font-semibold flex items-center justify-center";
  const numInactive = `${numBase} bg-card border border-border text-secondary-500 hover:border-primary`;
  const numActive = `${numBase} bg-primary text-white border border-primary`;
  const navBase =
    "min-w-16 h-9 px-3 rounded text-sm font-semibold flex items-center justify-center bg-card border border-border";
  const navEnabled = `${navBase} text-secondary-500 hover:border-primary`;
  const navDisabled = `${navBase} text-secondary-300 cursor-not-allowed`;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
      <span className="text-secondary-300 text-sm font-semibold">
        Gösteriliyor {showingFrom}-{showingTo} / {total}
      </span>
      <div className="flex items-center gap-2">
        {hasPrev ? (
          <Link href={hrefFor(page - 1)} className={navEnabled}>
            Önceki
          </Link>
        ) : (
          <span className={navDisabled} aria-disabled="true">
            Önceki
          </span>
        )}
        {numbers.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="text-secondary-300 text-sm px-1"
            >
              ...
            </span>
          ) : p === page ? (
            <span key={p} className={numActive} aria-current="page">
              {p}
            </span>
          ) : (
            <Link key={p} href={hrefFor(p)} className={numInactive}>
              {p}
            </Link>
          ),
        )}
        {hasNext ? (
          <Link href={hrefFor(page + 1)} className={navEnabled}>
            Sonraki
          </Link>
        ) : (
          <span className={navDisabled} aria-disabled="true">
            Sonraki
          </span>
        )}
      </div>
    </div>
  );
}