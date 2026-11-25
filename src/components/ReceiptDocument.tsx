"use client";

import React from "react";
import { BRAND_INFO } from "@/lib/brand";
import { Order } from "@/types";
import { BrandLogo } from "./BrandLogo";

const PAYMENT_TEXT: Record<Order["paymentMethod"], { ar: string; en: string }> = {
  cod: { ar: "الدفع عند الاستلام (COD)", en: "Cash on Delivery (COD)" },
  vodafone_cash: { ar: "فودافون كاش", en: "Vodafone Cash" },
  instapay: { ar: "إنستا باي (InstaPay)", en: "InstaPay" },
  card: { ar: "بطاقة بنكية", en: "Bank Card" },
};

export function ReceiptDocument({ order }: { order: Order }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      dir="rtl"
      className="print-sheet mx-auto w-full max-w-[794px] bg-white border border-[#E8E2D7] shadow-sm p-6 sm:p-10 text-[#111111] font-arabic"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D7]">
        <BrandLogo compact />

        <div className="text-start sm:text-end space-y-1">
          <p className="font-amiri text-2xl font-bold text-[#111111]">
            فاتورة طلب وبوليصة شحن
          </p>
          <p
            dir="ltr"
            className="text-xs uppercase tracking-[0.22em] text-[#B89552] font-sans font-semibold"
          >
            ORDER RECEIPT & COD WAYBILL
          </p>
          <p className="text-xs text-[#6E685F]">
            {BRAND_INFO.cityAr} • {BRAND_INFO.phoneDisplay}
          </p>
        </div>
      </div>

      {/* Order & Customer Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#E8E2D7] text-sm">
        <div className="bg-[#FAF8F5] border border-[#E8E2D7] p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#6E685F]">
            <span>بيانات العميل والتوصيل</span>
            <span dir="ltr" className="font-sans uppercase tracking-wider">
              Customer & Delivery
            </span>
          </div>
          <p className="font-bold text-base text-[#111111] pt-1">
            {order.customerName}
          </p>
          <p dir="ltr" className="text-sm font-sans font-medium text-[#111111]">
            {order.phone}
          </p>
          <p className="text-xs text-[#6E685F]">{order.governorateAr}</p>
          <p className="text-xs text-[#111111] leading-relaxed">
            {order.addressLine}
          </p>
          {order.notes && (
            <p className="text-xs text-[#9E7C3C] pt-1">
              ملاحظة: {order.notes}
            </p>
          )}
        </div>

        <div className="bg-[#FAF8F5] border border-[#E8E2D7] p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E685F]">
            <span>بيانات الفاتورة</span>
            <span dir="ltr" className="font-sans uppercase tracking-wider">
              Invoice Details
            </span>
          </div>
          <div className="flex justify-between text-xs pt-1">
            <span className="text-[#6E685F]">رقم الطلب / Order #:</span>
            <span dir="ltr" className="font-sans font-bold text-[#111111]">
              {order.orderNumber}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#6E685F]">التاريخ / Date:</span>
            <span dir="ltr" className="font-sans font-medium">
              {formattedDate}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#6E685F]">طريقة الدفع / Payment:</span>
            <span className="font-semibold text-[#111111]">
              {PAYMENT_TEXT[order.paymentMethod].ar}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#6E685F]">المبلغ المطلوب تحصيله:</span>
            <span className="font-bold text-[#9E7C3C]">
              {order.totalEgp} ج.م ({order.totalEgp} EGP)
            </span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="py-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#111111] text-xs text-[#6E685F]">
                <th className="py-2.5 text-start font-semibold">#</th>
                <th className="py-2.5 text-start font-semibold">
                  العطر / Fragrance
                </th>
                <th className="py-2.5 text-center font-semibold">
                  الحجم / Vol
                </th>
                <th className="py-2.5 text-center font-semibold">
                  الكمية / Qty
                </th>
                <th className="py-2.5 text-center font-semibold">
                  السعر / Price
                </th>
                <th className="py-2.5 text-end font-semibold">
                  الإجمالي / Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D7]">
              {order.items.map((item, idx) => (
                <tr key={`${item.productId}-${idx}`}>
                  <td className="py-3 text-xs text-[#6E685F]">{idx + 1}</td>
                  <td className="py-3">
                    <p className="font-bold text-[#111111]">{item.nameAr}</p>
                    <p
                      dir="ltr"
                      className="text-xs font-sans text-[#6E685F] text-start"
                    >
                      {item.nameEn}
                    </p>
                  </td>
                  <td
                    dir="ltr"
                    className="py-3 text-center text-xs font-sans text-[#6E685F]"
                  >
                    {item.volumeMl} ml
                  </td>
                  <td
                    dir="ltr"
                    className="py-3 text-center font-sans font-semibold"
                  >
                    {item.quantity}
                  </td>
                  <td dir="ltr" className="py-3 text-center font-sans text-xs">
                    {item.unitPriceEgp} EGP
                  </td>
                  <td
                    dir="ltr"
                    className="py-3 text-end font-sans font-bold text-[#111111]"
                  >
                    {item.unitPriceEgp * item.quantity} EGP
                  </td>
                </tr>
              ))}
              {order.freeGiftEligible && (
                <tr className="bg-[#FAF8F5]">
                  <td className="py-2.5 text-xs text-[#B89552]">★</td>
                  <td className="py-2.5" colSpan={4}>
                    <p className="text-xs font-semibold text-[#9E7C3C]">
                      هدية مجانية: {BRAND_INFO.freeGiftLabelAr}
                    </p>
                    <p
                      dir="ltr"
                      className="text-[11px] font-sans text-[#6E685F] text-start"
                    >
                      Complimentary Gift: {BRAND_INFO.freeGiftLabelEn}
                    </p>
                  </td>
                  <td
                    dir="ltr"
                    className="py-2.5 text-end font-sans text-xs font-bold text-[#9E7C3C]"
                  >
                    FREE
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals Summary */}
      <div className="flex justify-end pb-6 border-b border-[#E8E2D7]">
        <div className="w-full sm:w-72 bg-[#FAF8F5] border border-[#E8E2D7] p-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#6E685F]">المجموع الفرعي / Subtotal:</span>
            <span dir="ltr" className="font-sans font-semibold">
              {order.subtotalEgp} EGP
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E685F]">مصاريف الشحن / Shipping:</span>
            <span dir="ltr" className="font-sans font-semibold">
              {order.shippingFeeEgp} EGP
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E8E2D7] text-sm font-bold text-[#111111]">
            <span>الإجمالي / Total COD:</span>
            <span dir="ltr" className="font-sans text-[#9E7C3C]">
              {order.totalEgp} EGP
            </span>
          </div>
        </div>
      </div>

      {/* Sign-off Boxes */}
      <div className="grid grid-cols-3 gap-3 pt-5 text-center text-[11px] text-[#6E685F]">
        <div className="border border-dashed border-[#D6CFC2] p-3">
          <p className="font-semibold text-[#111111]">اعتماد المتجر</p>
          <p dir="ltr" className="font-sans text-[10px]">
            Maison ANAS Sign-off
          </p>
          <div className="h-8" />
        </div>
        <div className="border border-dashed border-[#D6CFC2] p-3">
          <p className="font-semibold text-[#111111]">توقيع المندوب (COD)</p>
          <p dir="ltr" className="font-sans text-[10px]">
            Courier Collection
          </p>
          <div className="h-8" />
        </div>
        <div className="border border-dashed border-[#D6CFC2] p-3">
          <p className="font-semibold text-[#111111]">توقيع المستلم</p>
          <p dir="ltr" className="font-sans text-[10px]">
            Customer Signature
          </p>
          <div className="h-8" />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-5 pt-4 border-t border-[#E8E2D7] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6E685F]">
        <span>
          شكراً لاختياركم عطور ميسون أنس • يُسمح بمعاينة الطلب عند الاستلام
        </span>
        <span dir="ltr" className="font-sans">
          {BRAND_INFO.email} • {BRAND_INFO.phoneDisplay}
        </span>
      </div>
    </div>
  );
}
