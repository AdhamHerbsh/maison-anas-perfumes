import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Customer name is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Valid Egyptian phone number is required")
    .max(20),
  governorateId: z.string().trim().min(1, "Governorate is required"),
  addressLine: z.string().trim().min(5, "Delivery address is required"),
  notes: z.string().trim().max(300).optional(),
  paymentMethod: z.enum(["cod", "vodafone_cash", "instapay", "card"]).default("cod"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1, "At least one fragrance is required"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "new",
    "confirmed",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]),
});

export const createProductSchema = z.object({
  nameAr: z.string().trim().min(2),
  nameEn: z.string().trim().min(2),
  subtitleAr: z.string().trim().min(2),
  subtitleEn: z.string().trim().min(2),
  descriptionAr: z.string().trim().min(4),
  descriptionEn: z.string().trim().min(4),
  notesAr: z.array(z.string()).default(["عود", "فانيليا", "عنبر"]),
  notesEn: z.array(z.string()).default(["Oud", "Vanilla", "Amber"]),
  category: z.enum(["men", "women", "unisex"]),
  volumeMl: z.number().int().min(10).max(250).default(100),
  concentration: z.string().default("Extrait de Parfum"),
  priceEgp: z.number().min(50),
  originalPriceEgp: z.number().optional(),
  longevity: z.number().int().min(1).max(5).default(5),
  sillage: z.number().int().min(1).max(5).default(4),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  bottleTone: z
    .enum(["obsidian", "champagne", "amber", "ivory", "emerald"])
    .default("obsidian"),
});
