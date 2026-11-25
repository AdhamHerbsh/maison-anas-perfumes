import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders, listProducts } from "@/db/store";
import { createOrderSchema } from "@/lib/validation";
import { getGovernorateById } from "@/lib/governorates";
import { BRAND_INFO } from "@/lib/brand";
import { Order, OrderItem } from "@/types";

export async function GET() {
  return NextResponse.json({ orders: listOrders() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your order details", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const catalog = listProducts();
    const resolvedItems: OrderItem[] = [];

    for (const reqItem of parsed.data.items) {
      const product = catalog.find((p) => p.id === reqItem.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${reqItem.productId}` },
          { status: 404 }
        );
      }
      resolvedItems.push({
        productId: product.id,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        volumeMl: product.volumeMl,
        unitPriceEgp: product.priceEgp,
        quantity: reqItem.quantity,
      });
    }

    const subtotalEgp = resolvedItems.reduce(
      (sum, item) => sum + item.unitPriceEgp * item.quantity,
      0
    );
    const gov = getGovernorateById(parsed.data.governorateId);
    const shippingFeeEgp = gov.shippingFeeEgp;
    const discountEgp = 0;
    const totalEgp = subtotalEgp + shippingFeeEgp - discountEgp;
    const freeGiftEligible = subtotalEgp >= BRAND_INFO.freeGiftThresholdEgp;

    const existingCount = listOrders().length;
    const orderNumber = `ANAS-${1043 + existingCount}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      governorateId: gov.id,
      governorateAr: gov.nameAr,
      governorateEn: gov.nameEn,
      addressLine: parsed.data.addressLine,
      notes: parsed.data.notes,
      paymentMethod: parsed.data.paymentMethod,
      status: "new",
      items: resolvedItems,
      subtotalEgp,
      shippingFeeEgp,
      discountEgp,
      totalEgp,
      freeGiftEligible,
    };

    const saved = createOrder(newOrder);
    return NextResponse.json({ order: saved }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}
