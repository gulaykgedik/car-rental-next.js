"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CAR_TYPES, FUEL_TYPES, TRANSMISSIONS } from "@/types/car.types";

const SEAT_OPTIONS = [2, 4, 5, 6, 7, 8];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function commit(updates: Record<string, string | undefined>) {
    const next = new URLSearchParams(sp.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === "") next.delete(key);
      else next.set(key, value);
    }
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function clearAll() {
    router.push(pathname);
  }

  const carType = sp.get("carType") ?? "";
  const location = sp.get("location") ?? "";
  const minPrice = sp.get("minPrice") ?? "";
  const maxPrice = sp.get("maxPrice") ?? "";
  const transmission = sp.get("transmission") ?? "";
  const fuelType = sp.get("fuelType") ?? "";
  const seats = sp.get("seats") ?? "";

  const labelClass = "text-secondary-500 text-sm font-bold";
  const fieldClass =
    "h-10 w-full rounded border border-border bg-card px-3 text-sm text-secondary-500 outline-none focus:border-primary";

  return (
    <div className="bg-card rounded-card p-6 flex flex-col gap-5">
      <h2 className="text-secondary-500 text-base font-bold">Filtreler</h2>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Araç Tipi</label>
        <select
          className={fieldClass}
          value={carType}
          onChange={(e) => commit({ carType: e.target.value })}
        >
          <option value="">Tüm Tipler</option>
          {CAR_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Konum</label>
        <input
          key={`loc-${location}`}
          type="text"
          className={fieldClass}
          placeholder="Tüm Konumlar"
          defaultValue={location}
          onBlur={(e) => {
            if (e.target.value !== location) commit({ location: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit({ location: e.currentTarget.value });
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Fiyat Aralığı (günlük)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            key={`min-${minPrice}`}
            type="number"
            min={0}
            placeholder="Min"
            className={fieldClass}
            defaultValue={minPrice}
            onBlur={(e) => {
              if (e.target.value !== minPrice) commit({ minPrice: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit({ minPrice: e.currentTarget.value });
              }
            }}
          />
          <input
            key={`max-${maxPrice}`}
            type="number"
            min={0}
            placeholder="Max"
            className={fieldClass}
            defaultValue={maxPrice}
            onBlur={(e) => {
              if (e.target.value !== maxPrice) commit({ maxPrice: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit({ maxPrice: e.currentTarget.value });
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Vites</label>
        <select
          className={fieldClass}
          value={transmission}
          onChange={(e) => commit({ transmission: e.target.value })}
        >
          <option value="">Tüm Vitesler</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Yakıt Türü</label>
        <select
          className={fieldClass}
          value={fuelType}
          onChange={(e) => commit({ fuelType: e.target.value })}
        >
          <option value="">Tüm Yakıt Türleri</option>
          {FUEL_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Koltuk Sayısı</label>
        <select
          className={fieldClass}
          value={seats}
          onChange={(e) => commit({ seats: e.target.value })}
        >
          <option value="">Herhangi</option>
          {SEAT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="h-10 w-full rounded border border-border text-secondary-500 text-sm font-semibold hover:bg-surface"
        onClick={clearAll}
      >
        Filtreleri Temizle
      </button>
    </div>
  );
}