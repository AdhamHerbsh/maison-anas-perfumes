import { BRAND_INFO } from "./brand";
import { Governorate, Locale, OrderItem, PaymentMethod } from "@/types";

interface WhatsAppPayload {
  locale: Locale;
  customerName?: string;
  phone?: string;
  governorate: Governorate;
  addressLine?: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotalEgp: number;
  shippingFeeEgp: number;
  totalEgp: number;
  orderNumber?: string;
}

const PAYMENT_LABELS: Record<PaymentMethod, { ar: string; en: string }> = {
  cod: { ar: "الدفع عند الاستلام (COD)", en: "Cash on Delivery (COD)" },
  vodafone_cash: { ar: "فودافون كاش", en: "Vodafone Cash" },
  instapay: { ar: "إنستا باي (InstaPay)", en: "InstaPay" },
  card: { ar: "بطاقة بنكية", en: "Bank Card" },
};

export function buildWhatsAppOrderMessage(payload: WhatsAppPayload): string {
  const {
    locale,
    customerName,
    phone,
    governorate,
    addressLine,
    paymentMethod,
    items,
    subtotalEgp,
    shippingFeeEgp,
    totalEgp,
    orderNumber,
  } = payload;

  const isFreeGift = subtotalEgp >= BRAND_INFO.freeGiftThresholdEgp;

  if (locale === "ar") {
    const lines = [
      `مرحباً *${BRAND_INFO.fullNameEn}* ✨`,
      orderNumber ? `رقم الطلب: *${orderNumber}*` : "أرغب في تأكيد طلب عطور جديد:",
      "",
      "*المنتجات المختارة:*",
      ...items.map(
        (item, idx) =>
          `${idx + 1}. ${item.nameAr} (${item.volumeMl} مل) × ${item.quantity} = ${
            item.unitPriceEgp * item.quantity
          } ج.م`
      ),
      ...(isFreeGift ? [`🎁 هدية مجانية: ${BRAND_INFO.freeGiftLabelAr}`] : []),
      "",
      `• المجموع الفرعي: ${subtotalEgp} ج.م`,
      `• مصاريف الشحن (${governorate.nameAr}): ${shippingFeeEgp} ج.م`,
      `• *الإجمالي المطلوب: ${totalEgp} ج.م*`,
      `• طريقة الدفع: ${PAYMENT_LABELS[paymentMethod].ar}`,
      ...(customerName ? [`• الاسم: ${customerName}`] : []),
      ...(phone ? [`• الهاتف: ${phone}`] : []),
      ...(addressLine ? [`• العنوان: ${addressLine}`] : []),
    ];
    return lines.join("\n");
  }

  const lines = [
    `Hello *${BRAND_INFO.fullNameEn}* ✨`,
    orderNumber ? `Order Ref: *${orderNumber}*` : "I would like to confirm a new fragrance order:",
    "",
    "*Selected Fragrances:*",
    ...items.map(
      (item, idx) =>
        `${idx + 1}. ${item.nameEn} (${item.volumeMl}ml) × ${item.quantity} = ${
          item.unitPriceEgp * item.quantity
        } EGP`
    ),
    ...(isFreeGift ? [`🎁 Complimentary Gift: ${BRAND_INFO.freeGiftLabelEn}`] : []),
    "",
    `• Subtotal: ${subtotalEgp} EGP`,
    `• Shipping (${governorate.nameEn}): ${shippingFeeEgp} EGP`,
    `• *Total Payable: ${totalEgp} EGP*`,
    `• Payment Method: ${PAYMENT_LABELS[paymentMethod].en}`,
    ...(customerName ? [`• Name: ${customerName}`] : []),
    ...(phone ? [`• Phone: ${phone}`] : []),
    ...(addressLine ? [`• Address: ${addressLine}`] : []),
  ];

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND_INFO.whatsappInternational}?text=${encodeURIComponent(
    message
  )}`;
}
