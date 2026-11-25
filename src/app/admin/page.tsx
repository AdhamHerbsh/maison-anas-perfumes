import { listOrders, listProducts } from "@/db/store";
import { AdminDashboard } from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const orders = listOrders();
  const products = listProducts();
  const passcode = process.env.ADMIN_PASSCODE || "ANAS2026";

  return (
    <AdminDashboard
      initialOrders={orders}
      initialProducts={products}
      expectedPasscode={passcode}
    />
  );
}
