import { headers } from "next/headers";
import type { CarListItem, ICar } from "@/types/car.types";
import type { PaginatedResponse } from "@/types/api.types";

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? `localhost:${process.env.PORT ?? 3000}`;
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function fetchCars(query: string): Promise<PaginatedResponse<CarListItem>> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/cars?${query}`, { cache: "no-store" });
  if (!res.ok) {
    return { data: [], pagination: { page: 1, limit: 0, total: 0, totalPages: 0 } };
  }
  return res.json();
}

export type CarDetail = ICar & { _id: string };

export async function fetchCar(id: string): Promise<CarDetail | null> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/cars/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = (await res.json()) as { data: CarDetail };
  return json.data ?? null;
}