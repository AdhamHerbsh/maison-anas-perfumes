import { NextRequest, NextResponse } from "next/server";
import { addProduct, listProducts, toggleProductStock } from "@/db/store";
import { createProductSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json({ products: listProducts() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid product payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const created = addProduct(parsed.data);
    return NextResponse.json({ product: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }
    const updated = toggleProductStock(String(body.productId));
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
