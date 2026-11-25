import { notFound } from "next/navigation";
import { getOrderById } from "@/db/store";
import { ReceiptPrintView } from "@/components/ReceiptPrintView";

export const dynamic = "force-dynamic";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return <ReceiptPrintView order={order} />;
}
