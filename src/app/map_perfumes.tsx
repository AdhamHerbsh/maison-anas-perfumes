import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  MessageCircle,
  Check,
  Printer,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Youtube,
  CheckCircle2,
  ArrowUpRight,
  X
} from 'lucide-react';

// --- Official Maison ANAS Parfums Emblem (Crisp SVG matching crescent + 4-point star + script Maison) ---
const MaisonAnasEmblem = ({ size = 44, showWordmark = true, dark = false }) => {
  const ink = dark ? '#FAF8F5' : '#111111';
  const gold = '#B89552';

  return (
    <div className="inline-flex items-center gap-3 select-none shrink-0" dir="ltr">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M64 10C34.1766 10 10 34.1766 10 64C10 81.825 18.636 97.638 31.957 107.48C22.463 97.575 16.65 84.138 16.65 69.35C16.65 39.25 41.05 14.85 71.15 14.85C84.33 14.85 96.42 19.53 105.84 27.32C96.32 16.69 81.03 10 64 10Z"
          fill={ink}
        />
        <path
          d="M107.8 43.2C109.2 49.1 110 55.3 110 61.7C110 91.5234 85.8234 115.7 56 115.7C44.5 115.7 33.85 112.1 25.1 106C34.2 110.5 44.5 113 55.4 113C83.5 113 106.3 90.2 106.3 62.1C106.3 55.4 105 49 102.6 43.2H107.8Z"
          fill={ink}
        />
        <path
          d="M21 75C18 56 36 47 60 58C84 69 101 58 97 38"
          stroke={ink}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M60 28C61.8 47.5 67.5 53.2 87 55C67.5 56.8 61.8 62.5 60 82C58.2 62.5 52.5 56.8 33 55C52.5 53.2 58.2 47.5 60 28Z"
          fill={ink}
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="italic text-[12px] tracking-wide -mb-0.5"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: gold }}
          >
            Maison
          </span>
          <span
            className="text-xl sm:text-2xl font-normal tracking-[0.16em]"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: ink }}
          >
            ANAS
          </span>
          <span
            className="text-[8px] uppercase tracking-[0.42em] mt-1"
            style={{ color: dark ? '#A8A298' : '#6E6A63' }}
          >
            Parfums
          </span>
        </div>
      )}
    </div>
  );
};

// --- Minimalist Haute Parfumerie Bottle Silhouette ---
const MinimalBottle = ({ titleEn, volume = '100 ML', tone = '#DFC9A6' }) => (
  <div className="w-full h-52 sm:h-56 bg-[#F5F1EA] rounded-2xl flex items-center justify-center p-5 relative overflow-hidden group">
    <div
      className="w-36 h-36 rounded-full opacity-35 blur-2xl absolute"
      style={{ backgroundColor: tone }}
    />
    <div className="relative flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-1">
      <div className="w-7 h-6 bg-[#111111] rounded-t-[3px]" />
      <div className="w-4 h-2 bg-[#B89552]" />
      <div className="w-24 h-32 bg-white/85 border border-[#DCD4C6] rounded-[6px] shadow-[0_18px_35px_-15px_rgba(17,17,17,0.18)] p-2 flex flex-col justify-end">
        <div
          className="w-full h-[88%] rounded-[3px] flex items-center justify-center p-2"
          style={{
            background: `linear-gradient(180deg, ${tone}33 0%, ${tone}88 100%)`
          }}
        >
          <div className="w-full bg-[#FAF8F5] border border-[#E8E2D7] py-2 px-1.5 text-center" dir="ltr">
            <div
              className="text-[7px] italic leading-none text-[#B89552]"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Maison
            </div>
            <div
              className="text-[11px] tracking-[0.18em] text-[#111111] mt-0.5"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              ANAS
            </div>
            <div className="w-5 h-[1px] bg-[#E8E2D7] mx-auto my-1" />
            <div className="text-[6.5px] uppercase tracking-wider text-[#6E6A63] truncate">
              {titleEn}
            </div>
            <div className="text-[6px] tracking-widest text-[#9C968C] mt-1">{volume}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Curated 3 Signature Perfumes ---
const SIGNATURE_SCENTS = [
  {
    id: 'royal-oud',
    nameAr: 'رويال عود إمبيريال',
    nameEn: 'Royal Oud Imperial',
    notesAr: 'عود كمبودي • زعفران ملكي • عنبر دافئ',
    notesEn: 'Cambodian Oud • Royal Saffron • Warm Amber',
    price: 620,
    volume: '100 ml',
    sillageLabelAr: 'ثبات يتجاوز ٢٤ ساعة',
    sillageLabelEn: '24h+ Longevity',
    tone: '#C8A464'
  },
  {
    id: 'vanilla-silk',
    nameAr: 'فانيلا سيلك نوار',
    nameEn: 'Vanilla Silk Noir',
    notesAr: 'فانيليا مدغشقر • زهر البرتقال • مسك أبيض',
    notesEn: 'Madagascar Vanilla • Orange Blossom • White Musk',
    price: 560,
    volume: '100 ml',
    sillageLabelAr: 'ثبات وفوحان ١٨ ساعة',
    sillageLabelEn: '18h Longevity & Sillage',
    tone: '#DFC29B'
  },
  {
    id: 'baccarat-crystal',
    nameAr: 'باكارا روج كريستال',
    nameEn: 'Baccarat Rouge Crystal',
    notesAr: 'زعفران • ياسمين مصري • خشب الأرز',
    notesEn: 'Saffron • Egyptian Jasmine • Cedarwood',
    price: 690,
    volume: '100 ml',
    sillageLabelAr: 'ثبات استثنائي +٣٦ ساعة',
    sillageLabelEn: '36h+ Signature Trail',
    tone: '#D6A88A'
  }
];

const INITIAL_ORDERS = [
  {
    id: '#MA-1042',
    nameAr: 'أحمد محمود السيد',
    nameEn: 'Ahmed Mahmoud El-Sayed',
    cityAr: 'الشرقية — الزقازيق (القومية)',
    cityEn: 'Sharqia — Zagazig (El-Kawmeya)',
    phone: '010 1482 9310',
    scentAr: 'رويال عود إمبيريال (100 ml)',
    scentEn: 'Royal Oud Imperial (100 ml)',
    subtotal: 620,
    shipping: 40,
    total: 660,
    statusAr: 'جاهز للشحن',
    statusEn: 'Ready to Ship'
  },
  {
    id: '#MA-1041',
    nameAr: 'سارة عبد الرحمن',
    nameEn: 'Sara Abdelrahman',
    cityAr: 'القاهرة — مصر الجديدة',
    cityEn: 'Cairo — Heliopolis',
    phone: '011 4920 8831',
    scentAr: 'فانيلا سيلك نوار (100 ml)',
    scentEn: 'Vanilla Silk Noir (100 ml)',
    subtotal: 560,
    shipping: 60,
    total: 620,
    statusAr: 'تم التأكيد واتساب',
    statusEn: 'Confirmed via WhatsApp'
  }
];

export default function App() {
  const [lang, setLang] = useState('ar'); // 'ar' | 'en'
  const [activeScreen, setActiveScreen] = useState('storefront'); // 'storefront' | 'checkout' | 'admin'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [selectedScentId, setSelectedScentId] = useState('royal-oud');
  const [orderNotice, setOrderNotice] = useState(null); // null | 'cod' | 'whatsapp'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [approved, setApproved] = useState(false);

  const isAr = lang === 'ar';
  const isMobilePreview = deviceMode === 'mobile';
  const selectedScent =
    SIGNATURE_SCENTS.find((s) => s.id === selectedScentId) || SIGNATURE_SCENTS[0];

  // Dynamically synchronize document root direction and language
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  const handleSimulatedOrder = (method) => {
    const newOrder = {
      id: `#MA-${1043 + orders.length}`,
      nameAr: 'عميل جديد (معاينة)',
      nameEn: 'New Preview Customer',
      cityAr: 'الشرقية — الزقازيق',
      cityEn: 'Sharqia — Zagazig',
      phone: '010 1482 9310',
      scentAr: `${selectedScent.nameAr} (${selectedScent.volume})`,
      scentEn: `${selectedScent.nameEn} (${selectedScent.volume})`,
      subtotal: selectedScent.price,
      shipping: 40,
      total: selectedScent.price + 40,
      statusAr: method === 'whatsapp' ? 'طلب واتساب جديد' : 'مؤكد دفع عند الاستلام',
      statusEn: method === 'whatsapp' ? 'New WhatsApp Order' : 'Confirmed COD'
    };
    setOrders((prev) => [newOrder, ...prev]);
    setOrderNotice(method);
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full overflow-x-hidden bg-[#FAF8F5] text-[#111111] selection:bg-[#B89552] selection:text-white ${
        isAr ? 'lang-ar' : 'lang-en'
      }`}
    >
      {/* Royal Arabic Typography (Amiri + IBM Plex Sans Arabic) & Haute Parfumerie English Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .lang-ar {
          font-family: 'IBM Plex Sans Arabic', 'Segoe UI', sans-serif;
          line-height: 1.65;
          letter-spacing: 0 !important;
        }
        .lang-ar .display-heading {
          font-family: 'Amiri', Georgia, serif;
          line-height: 1.3;
          letter-spacing: 0 !important;
        }
        .lang-ar * {
          letter-spacing: 0;
        }

        .lang-en {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
          line-height: 1.55;
        }
        .lang-en .display-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          line-height: 1.18;
        }
      `}</style>

      {/* ===================================================================== */}
      {/* 1. PRESENTATION STUDIO HEADER (FULLY FLUID & STACK-SAFE ON PHONES)    */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <MaisonAnasEmblem size={38} />
            <div className="hidden md:block h-7 w-[1px] bg-[#E8E2D7]" />
            <div className="hidden md:block min-w-0">
              <div className="text-xs text-[#B89552] font-semibold">
                {isAr
                  ? 'عرض تصميم الواجهات وتجربة المستخدم'
                  : 'UI/UX VISUAL DESIGN PRESENTATION'}
              </div>
              <div className="text-xs text-[#6E6A63] truncate">
                {isAr
                  ? 'مقدّم لاعتماد المالك قبل بدء البرمجة'
                  : 'Prepared for Owner Visual Sign-Off Prior to Development'}
              </div>
            </div>
          </div>

          {/* Right Controls: Bilingual Switcher + Jump to Sign-Off */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                setLang(isAr ? 'en' : 'ar');
                setOrderNotice(null);
              }}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-white border border-[#E8E2D7] hover:border-[#B89552] text-xs font-semibold text-[#111111] transition cursor-pointer"
            >
              {isAr ? 'English View' : 'العرض بالعربية'}
            </button>

            <a
              href="#signoff"
              className="px-3.5 sm:px-4 py-2 rounded-full bg-[#111111] hover:bg-[#262626] text-[#FAF8F5] text-xs font-semibold transition inline-flex items-center gap-1.5"
            >
              <span>{isAr ? 'اعتماد التصميم' : 'Approve Design'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B89552]" />
            </a>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. EDITORIAL INTRO, SCREEN TABS & RESPONSIVE DEVICE TOGGLE            */}
      {/* ===================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-7 border-b border-[#E8E2D7]">
          <div className="max-w-xl space-y-2.5">
            <div className="text-xs font-semibold text-[#B89552]">
              {isAr
                ? 'الهوية الرقمية الفاخرة • البساطة والوضوح'
                : 'HAUTE PARFUMERIE DIGITAL EXPERIENCE'}
            </div>
            <h1 className="display-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111]">
              {isAr
                ? 'تصميم هادئ وفاخر يليق بعطور Maison ANAS'
                : 'Effortless Luxury Crafted for Maison ANAS'}
            </h1>
            <p className="text-sm text-[#6E6A63]">
              {isAr
                ? 'تجربة تصفح صافية بدون ازدحام بصري، تبرز فخامة العطور وتسهّل على العميل المصري الطلب عبر واتساب أو الدفع عند الاستلام في ثوانٍ.'
                : 'An airy, editorial shopping journey free of visual clutter—highlighting scent craftsmanship while enabling 15-second WhatsApp & Cash-on-Delivery orders.'}
            </p>
          </div>

          {/* Responsive Controls Row: Wraps cleanly on narrow screens */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Screen Selector Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl sm:rounded-full bg-white border border-[#E8E2D7] w-full sm:w-auto">
              {[
                {
                  id: 'storefront',
                  num: '01',
                  labelAr: 'المتجر الرئيسي',
                  labelEn: 'Storefront'
                },
                {
                  id: 'checkout',
                  num: '02',
                  labelAr: 'الطلب السريع',
                  labelEn: '1-Step Order'
                },
                {
                  id: 'admin',
                  num: '03',
                  labelAr: 'لوحة المالك',
                  labelEn: 'Owner Panel'
                }
              ].map((tab) => {
                const active = activeScreen === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveScreen(tab.id);
                      setOrderNotice(null);
                    }}
                    className={`flex-1 sm:flex-initial justify-center px-3.5 py-2 rounded-xl sm:rounded-full text-xs font-semibold transition cursor-pointer inline-flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#111111] text-[#FAF8F5]'
                        : 'text-[#6E6A63] hover:text-[#111111]'
                    }`}
                  >
                    <span className="text-[#B89552] font-mono text-[11px]" dir="ltr">
                      {tab.num}
                    </span>
                    <span className="whitespace-nowrap">
                      {isAr ? tab.labelAr : tab.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Device Frame Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#E8E2D7]">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer inline-flex items-center gap-1.5 ${
                  deviceMode === 'desktop'
                    ? 'bg-[#F5F1EA] text-[#111111]'
                    : 'text-[#6E6A63] hover:text-[#111111]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'شاشة كاملة' : 'Desktop'}</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer inline-flex items-center gap-1.5 ${
                  deviceMode === 'mobile'
                    ? 'bg-[#F5F1EA] text-[#111111]'
                    : 'text-[#6E6A63] hover:text-[#111111]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'هاتف' : 'Mobile'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. SLEEK ADAPTIVE DEVICE FRAME MOCKUP CANVAS                          */}
      {/* ===================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <div
          className={`mx-auto transition-all duration-300 bg-white border border-[#E8E2D7] shadow-[0_24px_70px_-24px_rgba(17,17,17,0.14)] overflow-hidden ${
            isMobilePreview
              ? 'w-full max-w-[390px] rounded-[2.5rem] border-[6px] border-[#1A1A1A] shadow-2xl'
              : 'w-full max-w-5xl rounded-2xl sm:rounded-[24px]'
          }`}
        >
          {/* Minimalist Browser / Phone Chrome Top Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#FAF8F5] border-b border-[#E8E2D7] flex items-center justify-between text-[11px] text-[#6E6A63]">
            <div className="flex items-center gap-1.5" dir="ltr">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DCD4C6]" />
            </div>
            <div className="font-medium truncate px-2" dir="ltr">
              maisonanas.com
            </div>
            <div className="text-[#B89552] font-semibold shrink-0">
              {isAr ? 'عربي • EN' : 'EN • عربي'}
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SCREEN 01: LUXURY STOREFRONT (EDITORIAL, CALM & SPACIOUS)         */}
          {/* ----------------------------------------------------------------- */}
          {activeScreen === 'storefront' && (
            <div className="bg-[#FAF8F5]">
              {/* Subtle Top Delivery Line */}
              <div className="py-2 px-4 text-center text-[11px] sm:text-xs text-[#6E6A63] border-b border-[#E8E2D7] bg-white">
                {isAr
                  ? 'الدفع عند الاستلام • توصيل لجميع محافظات مصر • عينة مجانية للطلبات فوق ٨٠٠ ج.م'
                  : 'Cash on Delivery • Delivery Across All Egypt • Complimentary Sample Over 800 EGP'}
              </div>

              {/* Storefront Navigation */}
              <div className="px-4 sm:px-10 py-5 flex items-center justify-between gap-3 bg-white/80">
                <MaisonAnasEmblem size={isMobilePreview ? 34 : 42} />

                {!isMobilePreview && (
                  <nav className="hidden md:flex items-center gap-7 text-xs text-[#6E6A63]">
                    <span className="text-[#111111] font-semibold border-b-2 border-[#B89552] pb-1">
                      {isAr ? 'المجموعة المختارة' : 'Collection'}
                    </span>
                    <span>{isAr ? 'رجالي' : 'Men'}</span>
                    <span>{isAr ? 'حريمي' : 'Women'}</span>
                    <span>{isAr ? 'عروض الهدايا' : 'Gifts'}</span>
                  </nav>
                )}

                <button
                  onClick={() => {
                    setOrderNotice(null);
                    setActiveScreen('checkout');
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-full border border-[#111111] text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition cursor-pointer shrink-0"
                >
                  {isAr ? 'الحقيبة (١)' : 'Bag (1)'}
                </button>
              </div>

              {/* Editorial Hero Section */}
              <div
                className={`px-5 ${
                  isMobilePreview ? 'py-9' : 'sm:px-12 py-12 sm:py-16'
                } text-center max-w-2xl mx-auto space-y-4 sm:space-y-5`}
              >
                <div className="text-xs font-semibold text-[#B89552]">
                  {isAr ? 'الزقازيق • جمهورية مصر العربية' : 'ZAGAZIG • EGYPT'}
                </div>

                <h2
                  className={`display-heading font-bold text-[#111111] ${
                    isMobilePreview ? 'text-2xl' : 'text-3xl sm:text-5xl'
                  }`}
                >
                  {isAr
                    ? 'عطور مميزة بأسعار تنافسك.. ثبات وفوحان يليق بذوقك'
                    : 'Distinctive Scents.. Lasting Sillage Crafted for Your Taste'}
                </h2>

                <p className="text-xs sm:text-sm text-[#6E6A63] max-w-md mx-auto">
                  {isAr
                    ? 'توليفات عطرية مركّزة تدوم طويلاً، مع إمكانية المعاينة والدفع عند الاستلام حتى باب المنزل.'
                    : 'High-concentration Extrait formulations designed to linger, delivered to your doorstep with Cash on Delivery.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setOrderNotice(null);
                      setActiveScreen('checkout');
                    }}
                    className="px-6 py-3 rounded-full bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262626] transition cursor-pointer"
                  >
                    {isAr ? 'اطلب الآن • الدفع عند الاستلام' : 'Order Now • Cash on Delivery'}
                  </button>
                  <button
                    onClick={() => {
                      setOrderNotice(null);
                      setActiveScreen('checkout');
                    }}
                    className="px-5 py-3 rounded-full bg-white border border-[#E8E2D7] text-[#111111] text-xs font-semibold hover:border-[#B89552] transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#1F7A4C]" />
                    <span>{isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
                  </button>
                </div>
              </div>

              {/* 3 Curated Signature Perfumes Grid */}
              <div className={`px-4 ${isMobilePreview ? 'pb-10' : 'sm:px-10 pb-14'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-[#E8E2D7] pb-3">
                  <span className="text-xs font-semibold text-[#6E6A63]">
                    {isAr ? 'الإصدارات الأكثر طلباً' : 'SIGNATURE SELECTIONS'}
                  </span>
                  <span className="text-xs text-[#B89552] font-medium" dir="ltr">
                    Extrait de Parfum
                  </span>
                </div>

                <div
                  className={`grid gap-5 ${
                    isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                  }`}
                >
                  {SIGNATURE_SCENTS.map((scent) => (
                    <div
                      key={scent.id}
                      className="bg-white rounded-2xl border border-[#E8E2D7] p-4 flex flex-col justify-between space-y-4 hover:border-[#B89552] transition-colors"
                    >
                      <MinimalBottle
                        titleEn={scent.nameEn}
                        volume={scent.volume.toUpperCase()}
                        tone={scent.tone}
                      />

                      <div className="space-y-2 px-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="display-heading font-bold text-lg text-[#111111]">
                            {isAr ? scent.nameAr : scent.nameEn}
                          </h3>
                          <span className="text-sm font-bold text-[#111111] shrink-0">
                            {scent.price} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        </div>

                        <p className="text-xs text-[#6E6A63]">
                          {isAr ? scent.notesAr : scent.notesEn}
                        </p>

                        {/* Minimalist Longevity Dot Indicator */}
                        <div className="pt-2 flex items-center justify-between text-[11px] text-[#6E6A63] border-t border-[#F3EFE8]">
                          <span>{isAr ? scent.sillageLabelAr : scent.sillageLabelEn}</span>
                          <div className="flex items-center gap-1" dir="ltr">
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <span
                                key={dot}
                                className="w-1.5 h-1.5 rounded-full bg-[#B89552]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Calm Two-Action Footer */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            setSelectedScentId(scent.id);
                            setOrderNotice(null);
                            setActiveScreen('checkout');
                          }}
                          className="py-2.5 px-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#262626] transition cursor-pointer"
                        >
                          {isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedScentId(scent.id);
                            setOrderNotice(null);
                            setActiveScreen('checkout');
                          }}
                          className="py-2.5 px-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] text-[#111111] text-xs font-semibold hover:border-[#1F7A4C] transition inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#1F7A4C] shrink-0" />
                          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* SCREEN 02: EFFORTLESS 1-STEP CHECKOUT & WHATSAPP FLOW (15 SEC)    */}
          {/* ----------------------------------------------------------------- */}
          {activeScreen === 'checkout' && (
            <div className={`bg-[#FAF8F5] px-4 ${isMobilePreview ? 'py-7' : 'sm:px-10 py-10'}`}>
              <div
                className={`mx-auto ${
                  isMobilePreview ? 'max-w-full' : 'max-w-4xl'
                }`}
              >
                {/* Back Link */}
                <button
                  onClick={() => {
                    setOrderNotice(null);
                    setActiveScreen('storefront');
                  }}
                  className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-[#6E6A63] hover:text-[#111111] cursor-pointer"
                >
                  {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span>{isAr ? 'العودة للعطور' : 'Back to Fragrances'}</span>
                </button>

                <div
                  className={`grid gap-6 ${
                    isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
                  }`}
                >
                  {/* Left / Primary Column: 15-Second Order Form */}
                  <div
                    className={`${
                      isMobilePreview ? '' : 'lg:col-span-7'
                    } bg-white rounded-3xl border border-[#E8E2D7] p-5 sm:p-7 space-y-5`}
                  >
                    <div className="space-y-1 border-b border-[#E8E2D7] pb-4">
                      <div className="text-xs font-semibold text-[#B89552]">
                        {isAr ? 'خطوة واحدة فقط • ١٥ ثانية' : 'SINGLE-STEP • 15 SECONDS'}
                      </div>
                      <h3 className="display-heading text-2xl font-bold text-[#111111]">
                        {isAr ? 'إتمام الطلب السريع' : 'Effortless Order Confirmation'}
                      </h3>
                    </div>

                    {/* Perfume Selector Strip */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-[#6E6A63]">
                        {isAr ? 'العطر المختار' : 'Selected Fragrance'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SIGNATURE_SCENTS.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedScentId(s.id);
                              setOrderNotice(null);
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                              s.id === selectedScent.id
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-[#FAF8F5] text-[#6E6A63] border-[#E8E2D7] hover:border-[#B89552]'
                            }`}
                          >
                            {isAr ? s.nameAr : s.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clean 3-Field Egyptian Form */}
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-medium text-[#6E6A63] mb-1">
                          {isAr ? 'الاسم بالكامل' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={isAr ? 'أحمد محمود السيد' : 'Ahmed Mahmoud El-Sayed'}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] text-sm text-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#6E6A63] mb-1">
                          {isAr ? 'رقم الموبايل / واتساب' : 'Mobile / WhatsApp Number'}
                        </label>
                        <input
                          type="text"
                          readOnly
                          dir="ltr"
                          value="010 1482 9310"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] text-sm text-[#111111] text-start"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#6E6A63] mb-1">
                          {isAr ? 'المحافظة والعنوان بالتفصيل' : 'Governorate & Delivery Address'}
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={
                            isAr
                              ? 'الشرقية — الزقازيق — القومية (شحن ٤٠ ج.م)'
                              : 'Sharqia — Zagazig — El-Kawmeya (40 EGP Delivery)'
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] text-sm text-[#111111]"
                        />
                      </div>
                    </div>

                    {/* Confirmation Feedback Banner */}
                    {orderNotice && (
                      <div className="p-4 rounded-2xl bg-[#1F7A4C]/10 border border-[#1F7A4C]/30 text-[#1F7A4C] text-xs space-y-2">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>
                            {orderNotice === 'whatsapp'
                              ? isAr
                                ? 'تم تجهيز رسالة واتساب وإضافة الطلب للوحة المالك!'
                                : 'WhatsApp Order Prepared & Synced to Owner Panel!'
                              : isAr
                              ? 'تم تأكيد طلب الدفع عند الاستلام وإرساله للوحة المالك!'
                              : 'Cash-on-Delivery Order Confirmed & Synced to Owner Panel!'}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveScreen('admin')}
                          className="underline font-semibold cursor-pointer"
                        >
                          {isAr
                            ? 'عرض الطلب الآن في لوحة المالك ←'
                            : 'View Order in Owner Panel →'}
                        </button>
                      </div>
                    )}

                    {/* Dual Frictionless Actions */}
                    <div className="space-y-2.5 pt-1">
                      <button
                        onClick={() => handleSimulatedOrder('cod')}
                        className="w-full py-3.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#262626] transition cursor-pointer"
                      >
                        {isAr ? 'تأكيد الطلب • الدفع عند الاستلام' : 'Confirm Order • Cash on Delivery'}
                      </button>

                      <button
                        onClick={() => handleSimulatedOrder('whatsapp')}
                        className="w-full py-3 rounded-xl bg-white border border-[#1F7A4C]/40 text-[#1F7A4C] text-xs font-semibold hover:bg-[#1F7A4C]/5 transition inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        <span>
                          {isAr ? 'إرسال الطلب بضغطة واحدة عبر واتساب' : 'One-Tap Order via WhatsApp'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right / Summary Column */}
                  <div
                    className={`${
                      isMobilePreview ? '' : 'lg:col-span-5'
                    } bg-white rounded-3xl border border-[#E8E2D7] p-5 sm:p-7 flex flex-col justify-between space-y-5`}
                  >
                    <div className="space-y-4">
                      <div className="text-xs font-semibold text-[#6E6A63] border-b border-[#E8E2D7] pb-3">
                        {isAr ? 'ملخص الطلب والفاتورة' : 'ORDER SUMMARY'}
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D7] space-y-1.5">
                        <div className="display-heading text-lg font-bold text-[#111111]">
                          {isAr ? selectedScent.nameAr : selectedScent.nameEn}
                        </div>
                        <div className="text-xs text-[#6E6A63]">
                          {selectedScent.volume} •{' '}
                          {isAr ? 'شامل عينة ١٠ مل مجانية' : 'Includes Free 10ml Tester'}
                        </div>
                        <div className="text-sm font-bold text-[#B89552] pt-1">
                          {selectedScent.price} {isAr ? 'ج.م' : 'EGP'}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-[#6E6A63] pt-2">
                        <div className="flex justify-between">
                          <span>{isAr ? 'سعر العطر' : 'Fragrance Subtotal'}</span>
                          <span className="font-semibold text-[#111111]">
                            {selectedScent.price} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isAr ? 'شحن الشرقية / الزقازيق' : 'Sharqia / Zagazig Delivery'}</span>
                          <span className="font-semibold text-[#111111]">
                            40 {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isAr ? 'عينة تجربة مجانية (١٠ مل)' : 'Complimentary 10ml Sample'}</span>
                          <span className="font-semibold text-[#1F7A4C]">
                            {isAr ? 'مجاناً' : 'FREE'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E8E2D7] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#6E6A63]">
                        {isAr ? 'الإجمالي عند الاستلام' : 'Total COD Due'}
                      </span>
                      <span className="display-heading text-2xl font-bold text-[#111111]">
                        {selectedScent.price + 40} {isAr ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* SCREEN 03: CALM OWNER EXECUTIVE DASHBOARD                         */}
          {/* ----------------------------------------------------------------- */}
          {activeScreen === 'admin' && (
            <div className={`bg-[#FAF8F5] px-4 ${isMobilePreview ? 'py-7' : 'sm:px-10 py-10'} space-y-6`}>
              {/* Calm Executive Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D7] pb-5">
                <div>
                  <div className="text-xs font-semibold text-[#B89552]">
                    {isAr ? 'لوحة تحكم المالك • سهلة وواضحة' : 'CALM OWNER EXECUTIVE VIEW'}
                  </div>
                  <h3 className="display-heading text-2xl sm:text-3xl font-bold text-[#111111] mt-0.5">
                    {isAr ? 'ملخص اليوم والطلبات الواردة' : "Today's Overview & Incoming Orders"}
                  </h3>
                </div>
                <MaisonAnasEmblem size={36} showWordmark={false} />
              </div>

              {/* 3 Serene KPI Cards */}
              <div
                className={`grid gap-4 ${
                  isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'
                }`}
              >
                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D7]">
                  <div className="text-xs text-[#6E6A63]">
                    {isAr ? 'طلبات اليوم' : "Today's Orders"}
                  </div>
                  <div className="display-heading text-3xl font-bold text-[#111111] mt-1">
                    {12 + orders.length}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D7]">
                  <div className="text-xs text-[#6E6A63]">
                    {isAr ? 'تحصيل COD قيد التوصيل' : 'Pending COD Deliveries'}
                  </div>
                  <div className="display-heading text-3xl font-bold text-[#B89552] mt-1">
                    {orders.reduce((sum, o) => sum + o.total, 5140).toLocaleString()}{' '}
                    <span className="text-sm font-normal text-[#6E6A63]">
                      {isAr ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D7]">
                  <div className="text-xs text-[#6E6A63]">
                    {isAr ? 'حالة المتجر والكتالوج' : 'Storefront Availability'}
                  </div>
                  <div className="text-xs font-semibold text-[#1F7A4C] mt-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1F7A4C] shrink-0" />
                    <span>{isAr ? 'مفعّل ومتصل بفيسبوك' : 'Live & Facebook Synced'}</span>
                  </div>
                </div>
              </div>

              {/* Responsive Order Cards (Zero horizontal table cramping) */}
              <div className="bg-white rounded-2xl border border-[#E8E2D7] divide-y divide-[#F1ECE3]">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className={`p-4 sm:p-5 flex ${
                      isMobilePreview
                        ? 'flex-col items-start'
                        : 'flex-col sm:flex-row sm:items-center'
                    } justify-between gap-4`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#B89552]" dir="ltr">
                          {ord.id}
                        </span>
                        <span className="text-sm font-bold text-[#111111]">
                          {isAr ? ord.nameAr : ord.nameEn}
                        </span>
                        <span className="text-xs text-[#6E6A63]">
                          • {isAr ? ord.cityAr : ord.cityEn}
                        </span>
                      </div>
                      <div className="text-xs text-[#6E6A63]">
                        {isAr ? ord.scentAr : ord.scentEn} •{' '}
                        <strong className="text-[#111111]">
                          {ord.total} {isAr ? 'ج.م' : 'EGP'}
                        </strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D7] text-[11px] font-medium text-[#6E6A63]">
                        {isAr ? ord.statusAr : ord.statusEn}
                      </span>
                      <button
                        onClick={() => setReceiptOrder(ord)}
                        className="px-3.5 py-2 rounded-xl bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262626] transition inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#B89552] shrink-0" />
                        <span>{isAr ? 'معاينة إيصال A4' : 'Preview A4 Receipt'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simple Product Availability Toggles */}
              <div className="bg-white rounded-2xl border border-[#E8E2D7] p-4 sm:p-5 space-y-3">
                <div className="text-xs font-semibold text-[#6E6A63]">
                  {isAr
                    ? 'التحكم السريع في توفر العطور (بلمسة واحدة)'
                    : 'One-Tap Fragrance Availability'}
                </div>
                <div
                  className={`grid gap-3 ${
                    isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'
                  }`}
                >
                  {SIGNATURE_SCENTS.map((s) => (
                    <div
                      key={s.id}
                      className="px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-semibold text-[#111111] truncate">
                        {isAr ? s.nameAr : s.nameEn}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1F7A4C]/10 text-[#1F7A4C] text-[11px] font-semibold shrink-0">
                        {isAr ? 'متوفر' : 'In Stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ===================================================================== */}
      {/* 4. BRAND IDENTITY SYSTEM & CLIENT VISUAL SIGN-OFF BAR                 */}
      {/* ===================================================================== */}
      <section id="signoff" className="border-t border-[#E8E2D7] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-14 space-y-10">
          {/* Design System Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-[#E8E2D7]">
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-semibold text-[#B89552]">
                {isAr ? 'نظام الألوان والخطوط المعتمد' : 'BESPOKE DESIGN SYSTEM'}
              </div>
              <h3 className="display-heading text-2xl sm:text-3xl font-bold text-[#111111]">
                {isAr
                  ? 'هوية بصرية مستوحاة من دور العطور الفرنسية'
                  : 'French-Arabian Haute Parfumerie Palette'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6A63]">
                {isAr
                  ? 'تم اعتماد خط Amiri الملكي للعناوين مع خط IBM Plex Sans Arabic الواضح، ودرجات العاج الدافئ والأسود الملكي والذهبي لإبراز فخامة العطور.'
                  : 'Royal Amiri & IBM Plex Sans Arabic typography paired with warm alabaster, obsidian ink, and champagne gold for immediate brand prestige.'}
              </p>
            </div>

            {/* Responsive Swatches Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  hex: '#FAF8F5',
                  nameAr: 'عاجي دافئ',
                  nameEn: 'Warm Alabaster',
                  dark: false
                },
                {
                  hex: '#111111',
                  nameAr: 'أسود ملكي',
                  nameEn: 'Obsidian Ink',
                  dark: true
                },
                {
                  hex: '#B89552',
                  nameAr: 'ذهبي شامبانيا',
                  nameEn: 'Champagne Gold',
                  dark: true
                },
                {
                  hex: '#6E6A63',
                  nameAr: 'رمادي دافئ',
                  nameEn: 'Muted Taupe',
                  dark: true
                }
              ].map((sw) => (
                <div
                  key={sw.hex}
                  className="rounded-2xl p-4 flex flex-col justify-between h-24 border border-[#E8E2D7]"
                  style={{ backgroundColor: sw.hex }}
                >
                  <span
                    dir="ltr"
                    className={`text-[11px] font-mono ${
                      sw.dark ? 'text-white/80' : 'text-[#6E6A63]'
                    }`}
                  >
                    {sw.hex}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      sw.dark ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    {isAr ? sw.nameAr : sw.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Visual Approval Sign-Off Bar */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D7] p-5 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B89552]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {isAr
                    ? 'الخطوة التالية: اعتماد التصميم لبدء التنفيذ'
                    : 'NEXT STEP: VISUAL DESIGN SIGN-OFF'}
                </span>
              </div>
              <h4 className="display-heading text-2xl sm:text-3xl font-bold text-[#111111]">
                {isAr
                  ? 'هل التصميم مناسب لاعتماد بدء تطوير موقع Maison ANAS Parfums؟'
                  : 'Approve this UI/UX Direction to Begin Development?'}
              </h4>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6E6A63] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89552] shrink-0" />
                  <span>Zagazig, Egypt</span>
                </span>
                <span className="inline-flex items-center gap-1.5" dir="ltr">
                  <Phone className="w-3.5 h-3.5 text-[#B89552] shrink-0" />
                  <span>011 29420356</span>
                </span>
                <span className="inline-flex items-center gap-1.5" dir="ltr">
                  <Mail className="w-3.5 h-3.5 text-[#B89552] shrink-0" />
                  <span>hozaefarashwan2@gmail.com</span>
                </span>
                <a
                  href="https://youtube.com/@hozaefarashwan1143?si=TqHo0GIz-KuykPmf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#111111] underline"
                  dir="ltr"
                >
                  <Youtube className="w-3.5 h-3.5 text-[#B89552] shrink-0" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>

            <div className="shrink-0">
              {approved ? (
                <div className="px-5 py-4 rounded-2xl bg-[#1F7A4C]/10 border border-[#1F7A4C]/30 text-[#1F7A4C] text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>
                    {isAr
                      ? 'تم تسجيل الموافقة المبدئية على التصميم بنجاح ✓'
                      : 'UI/UX Design Approved — Ready for Build Phase ✓'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setApproved(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#111111] hover:bg-[#262626] text-[#FAF8F5] text-xs sm:text-sm font-semibold transition inline-flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4 text-[#B89552] shrink-0" />
                  <span>
                    {isAr
                      ? 'اعتماد التصميم والبدء في التطوير'
                      : 'Approve UI/UX Design & Start Build'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. RESPONSIVE A4 BILINGUAL RECEIPT PREVIEW MODAL                      */}
      {/* ===================================================================== */}
      {receiptOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setReceiptOrder(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl border border-[#E8E2D7] p-6 sm:p-8 space-y-5 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E2D7] pb-4">
              <MaisonAnasEmblem size={36} />
              <button
                onClick={() => setReceiptOrder(null)}
                className="p-2 rounded-full bg-[#FAF8F5] border border-[#E8E2D7] text-[#6E6A63] hover:text-[#111111] cursor-pointer"
                aria-label="Close receipt preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#111111]">
                  {isAr ? 'إيصال طلب وبوليصة شحن (A4)' : 'Order Receipt & COD Waybill (A4)'}
                </div>
                <div className="text-[#6E6A63]">Zagazig, Egypt • 011 29420356</div>
              </div>
              <div className="font-bold text-[#B89552]" dir="ltr">
                {receiptOrder.id}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D7] space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <span className="text-[#6E6A63]">{isAr ? 'العميل:' : 'Customer:'}</span>
                <span className="font-semibold text-[#111111]">
                  {isAr ? receiptOrder.nameAr : receiptOrder.nameEn}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#6E6A63]">{isAr ? 'الهاتف:' : 'Phone:'}</span>
                <span className="font-semibold text-[#111111]" dir="ltr">
                  {receiptOrder.phone}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#6E6A63]">{isAr ? 'العنوان:' : 'Address:'}</span>
                <span className="font-semibold text-[#111111]">
                  {isAr ? receiptOrder.cityAr : receiptOrder.cityEn}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-[#E8E2D7] py-3 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-[#111111]">
                <span>{isAr ? receiptOrder.scentAr : receiptOrder.scentEn}</span>
                <span>
                  {receiptOrder.subtotal} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="flex justify-between text-[#6E6A63]">
                <span>{isAr ? 'رسوم الشحن' : 'Delivery Fee'}</span>
                <span>
                  {receiptOrder.shipping} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#F1ECE3]">
                <span>{isAr ? 'الإجمالي المطلوب تحصيله (COD)' : 'Total COD Amount Due'}</span>
                <span>
                  {receiptOrder.total} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] text-xs font-semibold text-[#6E6A63] hover:text-[#111111] cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262626] transition inline-flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#B89552]" />
                <span>{isAr ? 'طباعة الإيصال' : 'Print Receipt'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}