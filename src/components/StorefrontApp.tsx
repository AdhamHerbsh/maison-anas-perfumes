"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  X,
  CheckCircle2,
  ArrowUpRight,
  Gift,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Category,
  Locale,
  Order,
  OrderItem,
  PaymentMethod,
  Product,
} from "@/types";
import { BRAND_INFO } from "@/lib/brand";
import { GOVERNORATES, getGovernorateById } from "@/lib/governorates";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { FlaconIllustration } from "./FlaconIllustration";

const PRODUCT_IMAGES: Record<string, string> = {
  "prod-royal-oud": "/assets/resources/p1.jpg",
  "prod-nuit-blanche": "/assets/resources/p7.jpg",
  "prod-amber-sultan": "/assets/resources/p4.jpg",
  "prod-rose-damascena": "/assets/resources/p3.jpg",
  "prod-noir-intense": "/assets/resources/p2.jpg",
  "prod-cedre-blanc": "/assets/resources/p6.jpg",
};

const CAMPAIGN_IMAGES = [
  {
    src: "/assets/resources/image1.jpg",
    alt: "Maison ANAS special offer: buy two perfumes and get one free",
  },
  {
    src: "/assets/resources/image2.jpg",
    alt: "Maison ANAS perfume collection campaign",
  },
  {
    src: "/assets/resources/image3.jpg",
    alt: "Maison ANAS fragrance campaign featuring perfume application",
  },
  {
    src: "/assets/resources/image4.jpg",
    alt: "Maison ANAS signature perfume campaign",
  },
  {
    src: "/assets/resources/p5.jpg",
    alt: "Maison ANAS perfume gift box and presentation",
  },
];

const COPY = {
  ar: {
    badge: "الزقازيق • توصيل لجميع محافظات مصر",
    heroTitle: "عطور ميسون أنس الفاخرة",
    heroLead:
      "عطور مميزة بأسعار تنافسك، ثبات وفوحان وجودة تليق بذوقك، مع عروض وهدايا مميزة والدفع عند الاستلام.",
    ctaBrowse: "استكشف المجموعة",
    ctaWhatsapp: "اطلب مباشرة عبر واتساب",
    trustCod: "الدفع عند الاستلام",
    trustCodSub: "معاينة كاملة قبل الدفع",
    trustLongevity: "ثبات وفوحان مضمون",
    trustLongevitySub: "تركيزات Extrait & EDP عالية",
    trustGift: "هدية مجانية 10 مل",
    trustGiftSub: `عند الطلب بقيمة ${BRAND_INFO.freeGiftThresholdEgp} ج.م أو أكثر`,
    filterAll: "جميع العطور",
    filterMen: "رجالي",
    filterWomen: "حريمي",
    filterUnisex: "يونيسكس",
    longevity: "الثبات",
    sillage: "الفوحان",
    addToBag: "أضف للطلب",
    orderNowCod: "اطلب الآن (الدفع عند الاستلام)",
    outOfStock: "نفدت الكمية مؤقتاً",
    bagTitle: "سلة الطلبات والتأكيد السريع",
    emptyBag: "لم تقم بإضافة أي عطر بعد. اختر عطرك المفضل للبدء.",
    giftUnlocked: "مبروك! حصلت على عينة عطرية 10 مل مجاناً",
    giftProgress: (rem: number) =>
      `أضف بقيمة ${rem} ج.م للحصول على عينة عطرية 10 مل مجاناً`,
    customerName: "الاسم بالكامل",
    customerNamePh: "مثال: محمد أحمد علي",
    phone: "رقم الهاتف (واتساب)",
    phonePh: "010 / 011 / 012 / 015",
    governorate: "المحافظة",
    address: "العنوان بالتفصيل",
    addressPh: "المدينة - الحي - الشارع - علامة مميزة",
    paymentMethod: "طريقة الدفع",
    codOption: "الدفع عند الاستلام (COD)",
    vodafoneOption: "فودافون كاش",
    instapayOption: "إنستا باي (InstaPay)",
    subtotal: "المجموع الفرعي",
    shipping: "مصاريف الشحن",
    total: "الإجمالي المستحق",
    confirmCodBtn: "تأكيد الطلب (الدفع عند الاستلام)",
    submitting: "جاري تسجيل طلبك...",
    whatsappCheckoutBtn: "إرسال الطلب عبر واتساب",
    orderSuccessTitle: "تم تسجيل طلبك بنجاح",
    orderSuccessSub:
      "شكراً لثقتك في Maison ANAS Parfums. سيتواصل معك فريقنا لتأكيد الشحن.",
    viewReceipt: "عرض الفاتورة القابلة للطباعة (A4)",
    adminLink: "لوحة الإدارة",
    currency: "ج.م",
  },
  en: {
    badge: "Zagazig • Nationwide Delivery Across Egypt",
    heroTitle: "Haute Parfumerie, Crafted to Endure",
    heroLead:
      "Distinctive fragrances at competitive prices — engineered for remarkable longevity and sillage, delivered across Egypt with Cash on Delivery.",
    ctaBrowse: "Explore Collection",
    ctaWhatsapp: "Order via WhatsApp",
    trustCod: "Cash on Delivery",
    trustCodSub: "Inspect your parcel before paying",
    trustLongevity: "High Longevity & Sillage",
    trustLongevitySub: "Rich Extrait & EDP concentrations",
    trustGift: "Complimentary 10ml Gift",
    trustGiftSub: `On orders of ${BRAND_INFO.freeGiftThresholdEgp} EGP or more`,
    filterAll: "All Fragrances",
    filterMen: "Men",
    filterWomen: "Women",
    filterUnisex: "Unisex",
    longevity: "Longevity",
    sillage: "Sillage",
    addToBag: "Add to Bag",
    orderNowCod: "Order COD Now",
    outOfStock: "Temporarily Sold Out",
    bagTitle: "Your Fragrance Bag & 1-Step Checkout",
    emptyBag: "Your bag is empty. Select a signature fragrance to begin.",
    giftUnlocked: "Unlocked: Complimentary 10ml Luxury Tester",
    giftProgress: (rem: number) =>
      `Add ${rem} EGP more to unlock a complimentary 10ml tester`,
    customerName: "Full Name",
    customerNamePh: "e.g. Mohamed Ahmed",
    phone: "Mobile Number (WhatsApp)",
    phonePh: "010 / 011 / 012 / 015",
    governorate: "Governorate",
    address: "Detailed Delivery Address",
    addressPh: "City, District, Street, Landmark",
    paymentMethod: "Payment Method",
    codOption: "Cash on Delivery (COD)",
    vodafoneOption: "Vodafone Cash",
    instapayOption: "InstaPay",
    subtotal: "Subtotal",
    shipping: "Delivery Fee",
    total: "Total Payable",
    confirmCodBtn: "Confirm Order (Cash on Delivery)",
    submitting: "Confirming your order...",
    whatsappCheckoutBtn: "Send Order on WhatsApp",
    orderSuccessTitle: "Your Order is Confirmed",
    orderSuccessSub:
      "Thank you for choosing Maison ANAS Parfums. Our team will confirm dispatch shortly.",
    viewReceipt: "View Printable A4 Receipt",
    adminLink: "Owner Panel",
    currency: "EGP",
  },
};

function DotMeter({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`h-1.5 w-1.5 rounded-full ${
            dot <= value ? "bg-[#B89552]" : "bg-[#E8E2D7]"
          }`}
        />
      ))}
    </div>
  );
}

export function StorefrontApp({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [category, setCategory] = useState<Category>("all");
  const [bag, setBag] = useState<Record<string, number>>({
    "prod-royal-oud": 1,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Checkout form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorateId, setGovernorateId] = useState("sharqia");
  const [addressLine, setAddressLine] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const campaignCarouselRef = useRef<HTMLDivElement>(null);
  const productCarouselRef = useRef<HTMLDivElement>(null);

  const t = COPY[locale];
  const isAr = locale === "ar";

  function scrollCarousel(
    carousel: HTMLDivElement | null,
    direction: "previous" | "next"
  ) {
    if (!carousel) return;

    const directionMultiplier = direction === "next" ? 1 : -1;
    const localeMultiplier = carousel.dir === "rtl" ? -1 : 1;
    carousel.scrollBy({
      left:
        directionMultiplier *
        localeMultiplier *
        Math.max(carousel.clientWidth * 0.8, 280),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [isAr, locale]);

  const filteredProducts = useMemo(() => {
    if (category === "all") return initialProducts;
    return initialProducts.filter((p) => p.category === category);
  }, [category, initialProducts]);

  const bagItems: OrderItem[] = useMemo(() => {
    return Object.entries(bag)
      .filter(([, qty]) => qty > 0)
      .map(([productId, quantity]) => {
        const p = initialProducts.find((item) => item.id === productId);
        if (!p) return null;
        return {
          productId: p.id,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          volumeMl: p.volumeMl,
          unitPriceEgp: p.priceEgp,
          quantity,
        };
      })
      .filter((x): x is OrderItem => Boolean(x));
  }, [bag, initialProducts]);

  const totalCount = useMemo(
    () => bagItems.reduce((acc, item) => acc + item.quantity, 0),
    [bagItems]
  );

  const subtotalEgp = useMemo(
    () =>
      bagItems.reduce(
        (acc, item) => acc + item.unitPriceEgp * item.quantity,
        0
      ),
    [bagItems]
  );

  const selectedGov = useMemo(
    () => getGovernorateById(governorateId),
    [governorateId]
  );

  const totalEgp =
    bagItems.length > 0 ? subtotalEgp + selectedGov.shippingFeeEgp : 0;

  const remainingForGift = Math.max(
    0,
    BRAND_INFO.freeGiftThresholdEgp - subtotalEgp
  );

  function addItem(productId: string, openDrawer = false) {
    setConfirmedOrder(null);
    setBag((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    if (openDrawer) setDrawerOpen(true);
  }

  function updateQty(productId: string, delta: number) {
    setBag((prev) => {
      const next = (prev[productId] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  }

  async function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    if (bagItems.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          governorateId,
          addressLine,
          paymentMethod,
          items: bagItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(
          isAr
            ? "يرجى التأكد من إدخال الاسم ورقم الهاتف والعنوان بشكل صحيح."
            : data.error || "Please verify your details."
        );
      } else {
        setConfirmedOrder(data.order);
        setBag({});
      }
    } catch {
      setErrorMsg(
        isAr ? "حدث خطأ أثناء إرسال الطلب." : "Network error submitting order."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappCheckoutHref = useMemo(() => {
    const itemsToSend =
      confirmedOrder?.items ||
      (bagItems.length > 0
        ? bagItems
        : initialProducts.slice(0, 1).map((p) => ({
            productId: p.id,
            nameAr: p.nameAr,
            nameEn: p.nameEn,
            volumeMl: p.volumeMl,
            unitPriceEgp: p.priceEgp,
            quantity: 1,
          })));

    const sub = confirmedOrder
      ? confirmedOrder.subtotalEgp
      : itemsToSend.reduce((s, i) => s + i.unitPriceEgp * i.quantity, 0);

    const msg = buildWhatsAppOrderMessage({
      locale,
      customerName: confirmedOrder?.customerName || customerName || undefined,
      phone: confirmedOrder?.phone || phone || undefined,
      governorate: selectedGov,
      addressLine: confirmedOrder?.addressLine || addressLine || undefined,
      paymentMethod: confirmedOrder?.paymentMethod || paymentMethod,
      items: itemsToSend,
      subtotalEgp: sub,
      shippingFeeEgp: selectedGov.shippingFeeEgp,
      totalEgp: sub + selectedGov.shippingFeeEgp,
      orderNumber: confirmedOrder?.orderNumber,
    });
    return buildWhatsAppUrl(msg);
  }, [
    confirmedOrder,
    bagItems,
    initialProducts,
    locale,
    customerName,
    phone,
    selectedGov,
    addressLine,
    paymentMethod,
  ]);

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#FAF8F5] text-[#111111] ${
        isAr ? "font-arabic" : "font-sans"
      }`}
    >
      {/* Top Minimal Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E8E2D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          <BrandLogo compact />

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E8E2D7] bg-white text-[#6E685F] hover:text-[#111111] hover:border-[#111111] transition"
            >
              <span>{t.adminLink}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setLocale(isAr ? "en" : "ar")}
              className="px-3 py-1.5 text-xs font-semibold border border-[#E8E2D7] bg-white hover:border-[#B89552] transition"
            >
              {isAr ? "English" : "عربي"}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262421] transition"
            >
              <ShoppingBag className="w-4 h-4 text-[#B89552]" />
              <span className="hidden xs:inline">
                {isAr ? "الطلب" : "Bag"}
              </span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#B89552] text-[#111111] text-[11px] font-bold">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Hero */}
      <section className="relative isolate overflow-hidden border-b border-[#E8E2D7] bg-white">
        <Image
          src="/assets/resources/background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-hero-drift object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-white/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <p className="animate-rise-in inline-block px-3.5 py-1 mb-6 text-xs font-medium bg-[#FAF8F5] border border-[#E8E2D7] text-[#9E7C3C]">
            {t.badge}
          </p>

          <div className="animate-rise-in animation-delay-100 flex justify-center mb-6">
            <BrandLogo />
          </div>

          <h1
            className={`animate-rise-in animation-delay-200 max-w-2xl mx-auto text-3xl sm:text-5xl font-bold text-[#111111] leading-tight ${
              isAr ? "font-amiri" : "font-serif"
            }`}
          >
            {t.heroTitle}
          </h1>

          <p className="animate-rise-in animation-delay-300 max-w-xl mx-auto mt-4 text-sm sm:text-base text-[#6E685F] leading-relaxed">
            {t.heroLead}
          </p>

          <div className="animate-rise-in animation-delay-400 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#collection"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#111111] text-[#FAF8F5] text-xs sm:text-sm font-semibold hover:bg-[#262421] hover:scale-[1.02] transition duration-300"
            >
              {t.ctaBrowse}
            </a>
            <a
              href={whatsappCheckoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#111111] text-[#111111] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F5] hover:scale-[1.02] transition duration-300"
            >
              <MessageCircle className="w-4 h-4 text-[#B89552]" />
              <span>{t.ctaWhatsapp}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Calm 3-Pillar Egyptian Trust Bar */}
      <section className="border-b border-[#E8E2D7] bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 bg-white border border-[#E8E2D7] p-4">
            <Truck className="w-5 h-5 text-[#B89552] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#111111]">{t.trustCod}</p>
              <p className="text-xs text-[#6E685F] mt-0.5">{t.trustCodSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white border border-[#E8E2D7] p-4">
            <ShieldCheck className="w-5 h-5 text-[#B89552] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#111111]">
                {t.trustLongevity}
              </p>
              <p className="text-xs text-[#6E685F] mt-0.5">
                {t.trustLongevitySub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white border border-[#E8E2D7] p-4">
            <Sparkles className="w-5 h-5 text-[#B89552] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#111111]">{t.trustGift}</p>
              <p className="text-xs text-[#6E685F] mt-0.5">{t.trustGiftSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign and product photography */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            className={`text-2xl font-bold text-[#111111] ${
              isAr ? "font-amiri" : "font-serif"
            }`}
          >
            {isAr ? "عروض Maison ANAS" : "Maison ANAS Campaigns"}
            <span className="mt-1 block text-xs font-normal text-[#6E685F]">
              {isAr
                ? "اكتشف العروض ومشاهد العطور من مجموعتنا"
                : "Explore our offers and fragrance collection"}
            </span>
          </h2>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-controls="campaign-swiper"
              onClick={() =>
                scrollCarousel(campaignCarouselRef.current, "previous")
              }
              aria-label={isAr ? "العروض السابقة" : "Previous campaigns"}
              className="inline-flex h-10 w-10 items-center justify-center border border-[#E8E2D7] bg-white text-[#111111] transition hover:border-[#B89552] hover:bg-[#FAF8F5] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B89552]"
            >
              {isAr ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              aria-controls="campaign-swiper"
              onClick={() => scrollCarousel(campaignCarouselRef.current, "next")}
              aria-label={isAr ? "العروض التالية" : "Next campaigns"}
              className="inline-flex h-10 w-10 items-center justify-center border border-[#E8E2D7] bg-white text-[#111111] transition hover:border-[#B89552] hover:bg-[#FAF8F5] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B89552]"
            >
              {isAr ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div
          id="campaign-swiper"
          ref={campaignCarouselRef}
          dir={isAr ? "rtl" : "ltr"}
          role="region"
          tabIndex={0}
          aria-label={isAr ? "معرض عروض العطور" : "Perfume campaign carousel"}
          aria-roledescription="carousel"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 scrollbar-hide sm:gap-4"
        >
          {CAMPAIGN_IMAGES.map((campaign, index) => (
            <a
              key={campaign.src}
              href="#collection"
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-rise-in group relative aspect-[4/5] w-[76%] shrink-0 snap-start overflow-hidden border border-[#E8E2D7] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
            >
              <Image
                src={campaign.src}
                alt={campaign.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Fragrance Collection */}
      <main id="collection" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
          <div>
            <h2
              className={`text-2xl sm:text-3xl font-bold text-[#111111] ${
                isAr ? "font-amiri" : "font-serif"
              }`}
            >
              {isAr ? "تشكيلة العطور المختارة" : "Signature Fragrance Collection"}
            </h2>
            <p className="text-xs text-[#6E685F] mt-1">
              {isAr
                ? "اختر عطرك واطلب في 15 ثانية بدون تعقيد"
                : "Select your scent and order in 15 seconds"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "all", label: t.filterAll },
                  { id: "men", label: t.filterMen },
                  { id: "women", label: t.filterWomen },
                  { id: "unisex", label: t.filterUnisex },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold border transition duration-300 hover:-translate-y-0.5 ${
                    category === tab.id
                      ? "bg-[#111111] text-[#FAF8F5] border-[#111111]"
                      : "bg-white text-[#6E685F] border-[#E8E2D7] hover:border-[#111111]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-controls="product-swiper"
                onClick={() =>
                  scrollCarousel(productCarouselRef.current, "previous")
                }
                aria-label={isAr ? "العطور السابقة" : "Previous fragrances"}
                className="inline-flex h-9 w-9 items-center justify-center border border-[#E8E2D7] bg-white text-[#111111] transition hover:border-[#B89552] hover:bg-[#FAF8F5] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B89552]"
              >
                {isAr ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                aria-controls="product-swiper"
                onClick={() => scrollCarousel(productCarouselRef.current, "next")}
                aria-label={isAr ? "العطور التالية" : "Next fragrances"}
                className="inline-flex h-9 w-9 items-center justify-center border border-[#E8E2D7] bg-white text-[#111111] transition hover:border-[#B89552] hover:bg-[#FAF8F5] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B89552]"
              >
                {isAr ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Product Swiper */}
        <div
          id="product-swiper"
          ref={productCarouselRef}
          dir={isAr ? "rtl" : "ltr"}
          role="region"
          tabIndex={0}
          aria-label={isAr ? "تشكيلة العطور" : "Fragrance collection carousel"}
          aria-roledescription="carousel"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 scrollbar-hide"
        >
          {filteredProducts.map((product, index) => {
            const name = isAr ? product.nameAr : product.nameEn;
            const subtitle = isAr ? product.subtitleAr : product.subtitleEn;
            const notes = isAr ? product.notesAr : product.notesEn;
            const productImage = PRODUCT_IMAGES[product.id];

            return (
              <article
                key={product.id}
                style={{ animationDelay: `${index * 70}ms` }}
                className="animate-rise-in group flex w-[85%] shrink-0 snap-start flex-col justify-between border border-[#E8E2D7] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#B89552] hover:shadow-2xl sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <div>
                  {productImage ? (
                    <div className="relative aspect-[4/5] overflow-hidden border-b border-[#E8E2D7] bg-[#FAF8F5]">
                      <Image
                        src={productImage}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <FlaconIllustration tone={product.bottleTone} title={name} />
                  )}

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#6E685F]">
                      <span dir="ltr" className="font-sans">
                        {product.concentration} • {product.volumeMl}ml
                      </span>
                      <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E8E2D7] text-[#9E7C3C] font-medium">
                        {product.category === "men"
                          ? t.filterMen
                          : product.category === "women"
                          ? t.filterWomen
                          : t.filterUnisex}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-xl font-bold text-[#111111] ${
                          isAr ? "font-amiri" : "font-serif"
                        }`}
                      >
                        {name}
                      </h3>
                      <p className="text-xs text-[#6E685F] mt-0.5">
                        {subtitle}
                      </p>
                    </div>

                    {/* Fragrance Notes */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {notes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-0.5 text-[11px] bg-[#FAF8F5] border border-[#E8E2D7] text-[#6E685F]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Longevity & Sillage */}
                    <div className="pt-2 border-t border-[#E8E2D7] flex items-center justify-between text-xs text-[#6E685F]">
                      <div className="flex items-center gap-2">
                        <span>{t.longevity}</span>
                        <DotMeter value={product.longevity} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{t.sillage}</span>
                        <DotMeter value={product.sillage} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Two Clean Actions */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#111111]">
                      {product.priceEgp} {t.currency}
                    </span>
                    {product.originalPriceEgp && (
                      <span className="text-xs text-[#6E685F] line-through">
                        {product.originalPriceEgp} {t.currency}
                      </span>
                    )}
                  </div>

                  {product.inStock ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(product.id, true)}
                        className="px-3 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262421] transition"
                      >
                        {t.orderNowCod}
                      </button>
                      <button
                        type="button"
                        onClick={() => addItem(product.id, false)}
                        className="px-3 py-2.5 bg-white border border-[#E8E2D7] text-[#111111] text-xs font-semibold hover:border-[#111111] transition"
                      >
                        + {t.addToBag}
                      </button>
                    </div>
                  ) : (
                    <div className="py-2.5 text-center text-xs bg-[#FAF8F5] border border-[#E8E2D7] text-[#6E685F]">
                      {t.outOfStock}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-[#E8E2D7] bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <BrandLogo compact />

          <div className="text-center sm:text-end text-xs text-[#6E685F] space-y-1.5">
            <p className="font-semibold text-[#111111]">
              {isAr ? BRAND_INFO.cityAr : BRAND_INFO.cityEn}
            </p>
            <p dir="ltr" className="font-sans">
              {BRAND_INFO.phoneDisplay} • {BRAND_INFO.email}
            </p>
            <div className="flex items-center justify-center sm:justify-end gap-4 pt-1">
              <a
                href={BRAND_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#111111]"
              >
                Facebook
              </a>
              <a
                href={BRAND_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#111111]"
              >
                YouTube
              </a>
              <Link href="/admin" className="underline hover:text-[#111111]">
                {t.adminLink}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-Over 1-Step COD & WhatsApp Bag Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[1px]">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto border-s border-[#E8E2D7] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
                <h3
                  className={`text-xl font-bold text-[#111111] ${
                    isAr ? "font-amiri" : "font-serif"
                  }`}
                >
                  {t.bagTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 border border-[#E8E2D7] hover:border-[#111111]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Confirmation State */}
              {confirmedOrder ? (
                <div className="py-8 space-y-5 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#B89552] mx-auto" />
                  <div>
                    <p className="text-xs font-sans font-bold text-[#9E7C3C]">
                      {confirmedOrder.orderNumber}
                    </p>
                    <h4
                      className={`text-2xl font-bold mt-1 ${
                        isAr ? "font-amiri" : "font-serif"
                      }`}
                    >
                      {t.orderSuccessTitle}
                    </h4>
                    <p className="text-xs text-[#6E685F] mt-2 leading-relaxed">
                      {t.orderSuccessSub}
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border border-[#E8E2D7] p-4 text-start text-xs space-y-1.5">
                    <p>
                      <span className="text-[#6E685F]">{t.customerName}: </span>
                      <span className="font-bold">
                        {confirmedOrder.customerName}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#6E685F]">{t.total}: </span>
                      <span className="font-bold text-[#9E7C3C]">
                        {confirmedOrder.totalEgp} {t.currency}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      href={`/admin/receipts/${confirmedOrder.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#111111] text-[#FAF8F5] text-xs font-semibold"
                    >
                      <FileText className="w-4 h-4 text-[#B89552]" />
                      <span>{t.viewReceipt}</span>
                    </Link>

                    <a
                      href={whatsappCheckoutHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#111111] text-[#111111] text-xs font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B89552]" />
                      <span>{t.whatsappCheckoutBtn}</span>
                    </a>
                  </div>
                </div>
              ) : bagItems.length === 0 ? (
                <div className="py-16 text-center text-xs text-[#6E685F]">
                  {t.emptyBag}
                </div>
              ) : (
                <div className="py-4 space-y-5">
                  {/* Free Gift Threshold Progress */}
                  <div className="bg-[#FAF8F5] border border-[#E8E2D7] p-3 flex items-center gap-2.5 text-xs">
                    <Gift className="w-4 h-4 text-[#B89552] shrink-0" />
                    <span className="text-[#111111] font-medium">
                      {remainingForGift === 0
                        ? t.giftUnlocked
                        : t.giftProgress(remainingForGift)}
                    </span>
                  </div>

                  {/* Selected Items */}
                  <div className="divide-y divide-[#E8E2D7] border border-[#E8E2D7] px-3">
                    {bagItems.map((item) => (
                      <div
                        key={item.productId}
                        className="py-3 flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-bold text-[#111111]">
                            {isAr ? item.nameAr : item.nameEn}
                          </p>
                          <p className="text-[#6E685F] mt-0.5">
                            {item.unitPriceEgp} {t.currency} • {item.volumeMl}ml
                          </p>
                        </div>

                        <div className="inline-flex items-center border border-[#E8E2D7]">
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, -1)}
                            className="p-1.5 hover:bg-[#FAF8F5]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-sans font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, 1)}
                            className="p-1.5 hover:bg-[#FAF8F5]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 1-Step Egyptian Checkout Form */}
                  <form onSubmit={handleSubmitOrder} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">
                        {t.customerName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t.customerNamePh}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePh}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        {t.governorate} *
                      </label>
                      <select
                        value={governorateId}
                        onChange={(e) => setGovernorateId(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none"
                      >
                        {GOVERNORATES.map((gov) => (
                          <option key={gov.id} value={gov.id}>
                            {isAr ? gov.nameAr : gov.nameEn} (+
                            {gov.shippingFeeEgp} {t.currency})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        {t.address} *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder={t.addressPh}
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        {t.paymentMethod}
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as PaymentMethod)
                        }
                        className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D7] focus:border-[#111111] outline-none"
                      >
                        <option value="cod">{t.codOption}</option>
                        <option value="vodafone_cash">{t.vodafoneOption}</option>
                        <option value="instapay">{t.instapayOption}</option>
                      </select>
                    </div>

                    {/* Summary */}
                    <div className="bg-[#FAF8F5] border border-[#E8E2D7] p-3.5 space-y-1.5">
                      <div className="flex justify-between text-[#6E685F]">
                        <span>{t.subtotal}</span>
                        <span>
                          {subtotalEgp} {t.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#6E685F]">
                        <span>{t.shipping}</span>
                        <span>
                          {selectedGov.shippingFeeEgp} {t.currency}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#E8E2D7] text-sm font-bold text-[#111111]">
                        <span>{t.total}</span>
                        <span className="text-[#9E7C3C]">
                          {totalEgp} {t.currency}
                        </span>
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-red-700 bg-red-50 border border-red-200 p-2 text-xs">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#111111] text-[#FAF8F5] font-semibold hover:bg-[#262421] transition disabled:opacity-60"
                    >
                      {submitting ? t.submitting : t.confirmCodBtn}
                    </button>

                    <a
                      href={whatsappCheckoutHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white border border-[#111111] text-[#111111] font-semibold hover:bg-[#FAF8F5] transition"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B89552]" />
                      <span>{t.whatsappCheckoutBtn}</span>
                    </a>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
