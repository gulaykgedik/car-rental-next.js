import { cookies, headers } from "next/headers";
import type { ICar } from "@/types/car.types";
import type { IOrder } from "@/models/Order";

export type OrderWithCar = Omit<IOrder, "product"> & { product: ICar };

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? `localhost:${process.env.PORT ?? 3000}`;
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

async function getCookieHeader(): Promise<string> {
  const store = await cookies();
  return store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function fetchOrder(id: string): Promise<OrderWithCar | null> {
  const baseUrl = await getBaseUrl();
  const cookie = await getCookieHeader();

  const res = await fetch(`${baseUrl}/api/orders/${id}`, {
    cache: "no-store",
    headers: { cookie },
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { data: OrderWithCar };
  return json.data ?? null;
}

export async function fetchOrders(): Promise<OrderWithCar[]> {
  const baseUrl = await getBaseUrl();
  const cookie = await getCookieHeader();

  const res = await fetch(`${baseUrl}/api/orders`, {
    cache: "no-store",
    headers: { cookie },
  });

  if (!res.ok) return [];
  const json = (await res.json()) as { data: OrderWithCar[] };
  return json.data ?? [];
}