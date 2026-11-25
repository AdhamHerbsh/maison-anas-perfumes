import { listProducts } from "@/db/store";
import { StorefrontApp } from "@/components/StorefrontApp";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const products = listProducts();
  return <StorefrontApp initialProducts={products} />;
}
