# Maison ANAS Parfums — Luxury Bilingual Next.js MVP

Full-stack Next.js App Router e-commerce & operations web application built for **Maison ANAS Parfums** (Zagazig, Egypt).

## Features Included
- **Bilingual Arabic (RTL) & English (LTR)** storefront, checkout, admin workspace, and printable A4 bilingual receipt.
- **Commanding Luxury Typography**: `Amiri` + `IBM Plex Sans Arabic` for Arabic, paired with `Cormorant Garamond` + `Plus Jakarta Sans` for English.
- **Egyptian Market Conversion Flows**:
  - **1-Step Cash on Delivery (COD)** checkout with governorate shipping rates and automatic **Free 10ml Tester Gift** threshold (`800 EGP`).
  - **Instant WhatsApp Order Handshake** (`011 29420356`) with pre-filled bilingual order summaries.
  - **Longevity & Sillage (ثبات وفوحان)** visual meters and fragrance notes on every perfume card.
- **Owner Admin Workspace (`/admin`)**:
  - Live order queue with status management (`New` → `Confirmed` → `Out for Delivery` → `Delivered / COD Collected`).
  - Catalog & stock availability management.
  - **Printable A4 Bilingual Receipt & Courier COD Waybill** (`/admin/receipts/[orderId]`) styled for clean A4 printing or browser PDF export.
- **Zero-Friction Local & Production Architecture**:
  - Includes a full **Drizzle ORM + PostgreSQL** schema (`src/db/schema.ts`) and seed script (`src/db/seed.ts`), plus an automatic persistent local JSON/in-memory store fallback (`src/db/store.ts`) so the entire app works immediately out of the box even before configuring PostgreSQL.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:
- Storefront: `http://localhost:3000`
- Owner Admin Panel: `http://localhost:3000/admin` (Default passcode: `ANAS2026`)
