"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  ArrowRight,
  Lock,
  CheckCircle2,
  Package,
  Plus,
} from "lucide-react";
import { Locale, Order, OrderStatus, Product } from "@/types";
import { BrandLogo } from "./BrandLogo";

const STATUS_LABELS: Record<
  OrderStatus,
  { ar: string; en: string; style: string }
> = {
  new: {
    ar: "طلب جديد",
    en: "New",
    style: "bg-amber-50 text-amber-900 border-amber-200",
  },
  confirmed: {
    ar: "مؤكد",
    en: "Confirmed",
    style: "bg-blue-50 text-blue-900 border-blue-200",
  },
  out_for_delivery: {
    ar: "مع المندوب",
    en: "Out for Delivery",
    style: "bg-purple-50 text-purple-900 border-purple-200",
  },
  delivered: {
    ar: "تم التسليم والتحصيل",
    en: "Delivered / COD Collected",
    style: "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
  cancelled: {
    ar: "ملغي",
    en: "Cancelled",
    style: "bg-stone-100 text-stone-600 border-stone-200",
  },
};

export function AdminDashboard({
  initialOrders,
  initialProducts,
  expectedPasscode,
}: {
  initialOrders: Order[];
  initialProducts: Product[];
  expectedPasscode: string;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<"orders" | "catalog">("orders");

  // Quick Add Fragrance State
  const [newNameAr, setNewNameAr] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [newPrice, setNewPrice] = useState("450");
  const [newCategory, setNewCategory] = useState<"men" | "women" | "unisex">(
    "unisex"
  );
  const [addingProduct, setAddingProduct] = useState(false);

  const isAr = locale === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [isAr, locale]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("anas_admin_unlocked") === "1"
    ) {
      setUnlocked(true);
    }
  }, []);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (passcodeInput.trim() === expectedPasscode) {
      setUnlocked(true);
      setAuthError(false);
      sessionStorage.setItem("anas_admin_unlocked", "1");
    } else {
      setAuthError(true);
    }
  }

  const metrics = useMemo(() => {
    const activeOrders = orders.filter((o) => o.status !== "cancelled");
    const totalRevenue = activeOrders.reduce((s, o) => s + o.totalEgp, 0);
    const pendingCod = activeOrders
      .filter((o) => o.status !== "delivered")
      .reduce((s, o) => s + o.totalEgp, 0);
    return {
      count: activeOrders.length,
      totalRevenue,
      pendingCod,
    };
  }, [orders]);

  async function changeOrderStatus(orderId: string, status: OrderStatus) {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? data.order : o))
      );
    }
  }

  async function handleToggleStock(productId: string) {
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? data.product : p))
      );
    }
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newNameAr.trim() || !newNameEn.trim()) return;
    setAddingProduct(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: newNameAr,
          nameEn: newNameEn,
          subtitleAr: "تركيبة عطرية فاخرة عالية الثبات",
          subtitleEn: "High-Longevity Luxury Composition",
          descriptionAr: "عطر مميز من إصدارات ميسون أنس بارفان.",
          descriptionEn: "Signature fragrance crafted by Maison ANAS Parfums.",
          category: newCategory,
          priceEgp: Number(newPrice) || 450,
          volumeMl: 100,
          longevity: 5,
          sillage: 4,
          inStock: true,
          bottleTone: "champagne",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setProducts((prev) => [data.product, ...prev]);
        setNewNameAr("");
        setNewNameEn("");
        setNewPrice("450");
      }
    } finally {
      setAddingProduct(false);
    }
  }

  if (!unlocked) {
    return (
      <div
        dir={isAr ? "rtl" : "ltr"}
        className={`min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 ${
          isAr ? "font-arabic" : "font-sans"
        }`}
      >
        <div className="w-full max-w-sm bg-white border border-[#E8E2D7] p-8 text-center space-y-6">
          <div className="flex justify-center">
            <BrandLogo compact />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center justify-center w-9 h-9 bg-[#FAF8F5] border border-[#E8E2D7] mb-1">
              <Lock className="w-4 h-4 text-[#B89552]" />
            </div>
            <h1
              className={`text-2xl font-bold text-[#111111] ${
                isAr ? "font-amiri" : "font-serif"
              }`}
            >
              {isAr ? "مساحة إدارة المتجر" : "Owner Operations Workspace"}
            </h1>
            <p className="text-xs text-[#6E685F]">
              {isAr
                ? "أدخل رمز الدخول الخاص بصاحب العمل (الافتراضي: ANAS2026)"
                : "Enter owner passcode (Default: ANAS2026)"}
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              dir="ltr"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="ANAS2026"
              className="w-full px-3.5 py-2.5 text-center font-sans bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none text-sm"
            />
            {authError && (
              <p className="text-xs text-red-700">
                {isAr ? "رمز الدخول غير صحيح" : "Incorrect passcode"}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262421] transition"
            >
              {isAr ? "دخول لوحة الإدارة" : "Unlock Workspace"}
            </button>
          </form>

          <div className="pt-2 flex items-center justify-between text-xs text-[#6E685F]">
            <Link href="/" className="underline hover:text-[#111111]">
              {isAr ? "العودة للمتجر" : "Back to Storefront"}
            </Link>
            <button
              type="button"
              onClick={() => setLocale(isAr ? "en" : "ar")}
              className="underline hover:text-[#111111]"
            >
              {isAr ? "English" : "عربي"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#FAF8F5] text-[#111111] ${
        isAr ? "font-arabic" : "font-sans"
      }`}
    >
      {/* Top Admin Header */}
      <header className="bg-white border-b border-[#E8E2D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <BrandLogo compact />
            <span className="hidden md:inline-block px-2.5 py-1 text-[11px] bg-[#FAF8F5] border border-[#E8E2D7] text-[#9E7C3C] font-semibold">
              {isAr ? "لوحة إدارة المبيعات والفواتير" : "Owner Operations"}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLocale(isAr ? "en" : "ar")}
              className="px-3 py-1.5 text-xs font-semibold border border-[#E8E2D7] bg-white hover:border-[#B89552]"
            >
              {isAr ? "English" : "عربي"}
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#111111] text-[#FAF8F5] text-xs font-semibold"
            >
              {isAr ? (
                <>
                  <span>المتجر</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Storefront</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Calm KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E8E2D7] p-5">
            <p className="text-xs text-[#6E685F]">
              {isAr ? "إجمالي الطلبات النشطة" : "Active Orders"}
            </p>
            <p className="text-2xl font-bold mt-1 font-sans">
              {metrics.count}
            </p>
          </div>

          <div className="bg-white border border-[#E8E2D7] p-5">
            <p className="text-xs text-[#6E685F]">
              {isAr ? "إجمالي المبيعات (شامل الشحن)" : "Total Sales Volume"}
            </p>
            <p className="text-2xl font-bold mt-1 text-[#111111]">
              {metrics.totalRevenue} {isAr ? "ج.م" : "EGP"}
            </p>
          </div>

          <div className="bg-white border border-[#E8E2D7] p-5">
            <p className="text-xs text-[#6E685F]">
              {isAr
                ? "تحصيلات الدفع عند الاستلام قيد التسليم"
                : "Pending COD Collection"}
            </p>
            <p className="text-2xl font-bold mt-1 text-[#9E7C3C]">
              {metrics.pendingCod} {isAr ? "ج.م" : "EGP"}
            </p>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="flex gap-2 border-b border-[#E8E2D7] pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-xs font-semibold border transition ${
              activeTab === "orders"
                ? "bg-[#111111] text-[#FAF8F5] border-[#111111]"
                : "bg-white text-[#6E685F] border-[#E8E2D7]"
            }`}
          >
            {isAr
              ? `الطلبات والفواتير (${orders.length})`
              : `Orders & Receipts (${orders.length})`}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 text-xs font-semibold border transition ${
              activeTab === "catalog"
                ? "bg-[#111111] text-[#FAF8F5] border-[#111111]"
                : "bg-white text-[#6E685F] border-[#E8E2D7]"
            }`}
          >
            {isAr
              ? `إدارة العطور والمخزون (${products.length})`
              : `Fragrance Catalog (${products.length})`}
          </button>
        </div>

        {activeTab === "orders" ? (
          <div className="bg-white border border-[#E8E2D7] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E8E2D7] text-[#6E685F]">
                    <th className="p-3.5 text-start font-semibold">
                      {isAr ? "رقم الطلب" : "Order #"}
                    </th>
                    <th className="p-3.5 text-start font-semibold">
                      {isAr ? "العميل والمحافظة" : "Customer & Governorate"}
                    </th>
                    <th className="p-3.5 text-start font-semibold">
                      {isAr ? "العطور المطلوبة" : "Fragrances"}
                    </th>
                    <th className="p-3.5 text-start font-semibold">
                      {isAr ? "الإجمالي (COD)" : "Total COD"}
                    </th>
                    <th className="p-3.5 text-start font-semibold">
                      {isAr ? "الحالة" : "Status"}
                    </th>
                    <th className="p-3.5 text-end font-semibold">
                      {isAr ? "الفاتورة" : "Receipt"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D7]">
                  {orders.map((order) => {
                    const st = STATUS_LABELS[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-[#FAF8F5]/60">
                        <td className="p-3.5 font-sans font-bold text-[#111111]">
                          {order.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-[#111111]">
                            {order.customerName}
                          </p>
                          <p dir="ltr" className="font-sans text-[#6E685F]">
                            {order.phone}
                          </p>
                          <p className="text-[#6E685F] mt-0.5">
                            {isAr ? order.governorateAr : order.governorateEn}
                          </p>
                        </td>
                        <td className="p-3.5 space-y-1">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-[#111111]">
                              {isAr ? item.nameAr : item.nameEn} ×{" "}
                              <span className="font-sans font-bold">
                                {item.quantity}
                              </span>
                            </p>
                          ))}
                          {order.freeGiftEligible && (
                            <span className="inline-block px-2 py-0.5 bg-[#FAF8F5] border border-[#E8E2D7] text-[#9E7C3C] text-[10px]">
                              + 10ml Gift
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-bold text-[#111111]">
                          {order.totalEgp} {isAr ? "ج.م" : "EGP"}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              changeOrderStatus(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                            className={`px-2.5 py-1.5 border text-[11px] font-semibold outline-none ${st.style}`}
                          >
                            {(
                              Object.keys(STATUS_LABELS) as Array<OrderStatus>
                            ).map((key) => (
                              <option key={key} value={key}>
                                {isAr
                                  ? STATUS_LABELS[key].ar
                                  : STATUS_LABELS[key].en}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3.5 text-end">
                          <Link
                            href={`/admin/receipts/${order.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-[#FAF8F5] text-[11px] font-semibold hover:bg-[#262421]"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#B89552]" />
                            <span>
                              {isAr ? "طباعة A4" : "Print A4"}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Add Perfume Form */}
            <form
              onSubmit={handleCreateProduct}
              className="bg-white border border-[#E8E2D7] p-5 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">
                  {isAr ? "اسم العطر (عربي)" : "Arabic Name"}
                </label>
                <input
                  type="text"
                  required
                  value={newNameAr}
                  onChange={(e) => setNewNameAr(e.target.value)}
                  placeholder="مثال: مسك ملكي"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D7]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  {isAr ? "اسم العطر (إنجليزي)" : "English Name"}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  required
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                  placeholder="e.g. Musk Royal"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D7] font-sans"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  {isAr ? "الفئة" : "Category"}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as "men" | "women" | "unisex")
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D7]"
                >
                  <option value="men">{isAr ? "رجالي" : "Men"}</option>
                  <option value="women">{isAr ? "حريمي" : "Women"}</option>
                  <option value="unisex">{isAr ? "يونيسكس" : "Unisex"}</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  {isAr ? "السعر (ج.م)" : "Price (EGP)"}
                </label>
                <input
                  type="number"
                  dir="ltr"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D7] font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={addingProduct}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#111111] text-[#FAF8F5] font-semibold"
              >
                <Plus className="w-3.5 h-3.5 text-[#B89552]" />
                <span>{isAr ? "إضافة عطر" : "Add Fragrance"}</span>
              </button>
            </form>

            {/* Products List */}
            <div className="bg-white border border-[#E8E2D7] divide-y divide-[#E8E2D7]">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#B89552]" />
                    <div>
                      <p className="font-bold text-[#111111]">
                        {product.nameAr}{" "}
                        <span className="text-[#6E685F] font-sans font-normal">
                          / {product.nameEn}
                        </span>
                      </p>
                      <p className="text-[#6E685F] mt-0.5">
                        {product.priceEgp} {isAr ? "ج.م" : "EGP"} •{" "}
                        {product.volumeMl}ml
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleStock(product.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border font-semibold ${
                      product.inStock
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                        : "bg-stone-100 text-stone-600 border-stone-200"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {product.inStock
                        ? isAr
                          ? "متوفر للبيع"
                          : "In Stock"
                        : isAr
                        ? "غير متوفر"
                        : "Out of Stock"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
