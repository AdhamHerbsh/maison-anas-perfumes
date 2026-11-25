import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  subtitleAr: text("subtitle_ar").notNull(),
  subtitleEn: text("subtitle_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  notesAr: jsonb("notes_ar").$type<string[]>().notNull(),
  notesEn: jsonb("notes_en").$type<string[]>().notNull(),
  category: text("category").notNull(), // men | women | unisex
  volumeMl: integer("volume_ml").notNull().default(100),
  concentration: text("concentration").notNull().default("Extrait de Parfum"),
  priceEgp: integer("price_egp").notNull(),
  originalPriceEgp: integer("original_price_egp"),
  longevity: integer("longevity").notNull().default(5),
  sillage: integer("sillage").notNull().default(4),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  bottleTone: text("bottle_tone").notNull().default("obsidian"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  governorateId: text("governorate_id").notNull(),
  governorateAr: text("governorate_ar").notNull(),
  governorateEn: text("governorate_en").notNull(),
  addressLine: text("address_line").notNull(),
  notes: text("notes"),
  paymentMethod: text("payment_method").notNull().default("cod"),
  status: text("status").notNull().default("new"),
  subtotalEgp: integer("subtotal_egp").notNull(),
  shippingFeeEgp: integer("shipping_fee_egp").notNull(),
  discountEgp: integer("discount_egp").notNull().default(0),
  totalEgp: integer("total_egp").notNull(),
  freeGiftEligible: boolean("free_gift_eligible").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  volumeMl: integer("volume_ml").notNull(),
  unitPriceEgp: integer("unit_price_egp").notNull(),
  quantity: integer("quantity").notNull(),
});
