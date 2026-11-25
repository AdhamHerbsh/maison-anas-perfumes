export type Locale = "ar" | "en";

export type Category = "all" | "men" | "women" | "unisex";

export type PaymentMethod = "cod" | "vodafone_cash" | "instapay" | "card";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  notesAr: string[];
  notesEn: string[];
  category: Exclude<Category, "all">;
  volumeMl: number;
  concentration: string;
  priceEgp: number;
  originalPriceEgp?: number;
  longevity: number; // 1 to 5
  sillage: number; // 1 to 5
  inStock: boolean;
  featured: boolean;
  bottleTone: "obsidian" | "champagne" | "amber" | "ivory" | "emerald";
}

export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  shippingFeeEgp: number;
  etaAr: string;
  etaEn: string;
}

export interface OrderItem {
  productId: string;
  nameAr: string;
  nameEn: string;
  volumeMl: number;
  unitPriceEgp: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  governorateId: string;
  governorateAr: string;
  governorateEn: string;
  addressLine: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  items: OrderItem[];
  subtotalEgp: number;
  shippingFeeEgp: number;
  discountEgp: number;
  totalEgp: number;
  freeGiftEligible: boolean;
}
