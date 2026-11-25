import fs from "fs";
import path from "path";
import { INITIAL_ORDERS, INITIAL_PRODUCTS } from "./seed-data";
import { Order, OrderStatus, Product } from "@/types";

interface DataStore {
  products: Product[];
  orders: Order[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "maison-anas-store.json");

function ensureStore(): DataStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial: DataStore = {
        products: INITIAL_PRODUCTS,
        orders: INITIAL_ORDERS,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as DataStore;
  } catch {
    return {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
    };
  }
}

function saveStore(data: DataStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Read-only filesystem fallback (e.g., serverless preview)
  }
}

export function listProducts(): Product[] {
  return ensureStore().products;
}

export function addProduct(input: Omit<Product, "id" | "slug">): Product {
  const store = ensureStore();
  const slug =
    input.nameEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.floor(100 + Math.random() * 900);

  const created: Product = {
    ...input,
    id: `prod-${Date.now()}`,
    slug,
  };
  store.products.unshift(created);
  saveStore(store);
  return created;
}

export function toggleProductStock(productId: string): Product | null {
  const store = ensureStore();
  const target = store.products.find((p) => p.id === productId);
  if (!target) return null;
  target.inStock = !target.inStock;
  saveStore(store);
  return target;
}

export function listOrders(): Order[] {
  const store = ensureStore();
  return [...store.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(idOrNumber: string): Order | null {
  const store = ensureStore();
  return (
    store.orders.find(
      (o) =>
        o.id.toLowerCase() === idOrNumber.toLowerCase() ||
        o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    ) || null
  );
}

export function createOrder(order: Order): Order {
  const store = ensureStore();
  store.orders.unshift(order);
  saveStore(store);
  return order;
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus
): Order | null {
  const store = ensureStore();
  const target = store.orders.find((o) => o.id === id);
  if (!target) return null;
  target.status = status;
  saveStore(store);
  return target;
}
