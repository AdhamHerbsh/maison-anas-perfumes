import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/db/store";
import { updateOrderStatusSchema } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = updateOrderStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = updateOrderStatus(id, parsed.data.status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
