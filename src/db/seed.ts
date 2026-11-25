import { db } from "./index";
import { products } from "./schema";
import { INITIAL_PRODUCTS } from "./seed-data";

async function seed() {
  if (!db) {
    console.log("No DATABASE_URL configured. App uses .data/maison-anas-store.json automatically.");
    process.exit(0);
  }

  for (const item of INITIAL_PRODUCTS) {
    await db
      .insert(products)
      .values({
        slug: item.slug,
        nameAr: item.nameAr,
        nameEn: item.nameEn,
        subtitleAr: item.subtitleAr,
        subtitleEn: item.subtitleEn,
        descriptionAr: item.descriptionAr,
        descriptionEn: item.descriptionEn,
        notesAr: item.notesAr,
        notesEn: item.notesEn,
        category: item.category,
        volumeMl: item.volumeMl,
        concentration: item.concentration,
        priceEgp: item.priceEgp,
        originalPriceEgp: item.originalPriceEgp ?? null,
        longevity: item.longevity,
        sillage: item.sillage,
        inStock: item.inStock,
        featured: item.featured,
        bottleTone: item.bottleTone,
      })
      .onConflictDoNothing();
  }

  console.log("Maison ANAS Parfums database seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
