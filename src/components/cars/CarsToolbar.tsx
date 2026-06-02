"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SORT_OPTIONS = [
  { value: "-createdAt", label: "En Yeni" },
  { value: "createdAt", label: "En Eski" },
  { value: "pricePerDay", label: "Fiyat (Artan)" },
  { value: "-pricePerDay", label: "Fiyat (Azalan)" },
  { value: "-averageRating", label: "Puan (Yüksek)" },
  { value: "-year", label: "Model Yılı (Yeni)" },
];

const PER_PAGE_OPTIONS = [6, 12, 24, 48];

type Props = { total: number };

export default function CarsToolbar({ total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const currentSearch = sp.get("search") ?? "";
  const sort = sp.get("sort") ?? "-createdAt";
  const limit = sp.get("limit") ?? "12";

  const [searchInput, setSearchInput] = useState(currentSearch);
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  function buildHref(updates: Record<string, string | undefined>): string {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === undefined || v === "") next.delete(k);
      else next.set(k, v);
    }
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildHref({ search: searchInput, page: undefined }));
  }

  const fieldClass =
    "h-10 rounded border border-border bg-card px-3 text-sm font-semibold text-secondary-500 outline-none focus:border-primary";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 bg-card rounded-card p-4">
      <form onSubmit={submitSearch} className="flex flex-1 items-center gap-3">
        <label className="flex items-center h-10 flex-1 rounded border border-border px-3 gap-2">
          <Search size={16} strokeWidth={2} className="text-secondary-300" />
          <input
            type="search"
            placeholder="Araç ara..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-transparent text-sm text-secondary-500 placeholder:text-secondary-300 outline-none"
          />
        </label>
        <button
          type="submit"
          className="bg-primary hover:opacity-90 text-white text-sm font-semibold px-5 h-10 rounded"
        >
          Ara
        </button>
      </form>

      <div className="flex items-center gap-3">
        <span className="text-secondary-300 text-sm font-semibold whitespace-nowrap">
          {total} sonuç
        </span>
        <select
          aria-label="Sırala"
          className={fieldClass}
          value={sort}
          onChange={(e) =>
            router.push(buildHref({ sort: e.target.value, page: undefined }))
          }
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Sayfa başına"
          className={fieldClass}
          value={limit}
          onChange={(e) =>
            router.push(buildHref({ limit: e.target.value, page: undefined }))
          }
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}/sayfa
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}