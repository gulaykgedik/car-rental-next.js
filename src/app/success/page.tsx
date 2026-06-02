import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;
  if (!orderId) notFound();

  redirect(`/orders/${orderId}`);
}
