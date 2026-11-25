"use client";

import React from "react";
import Link from "next/link";
import { Printer, ArrowRight } from "lucide-react";
import { Order } from "@/types";
import { ReceiptDocument } from "./ReceiptDocument";

export function ReceiptPrintView({ order }: { order: Order }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-6 px-4">
      <div className="no-print max-w-[794px] mx-auto mb-5 flex items-center justify-between gap-3 bg-white border border-[#E8E2D7] p-4 font-arabic">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E685F] hover:text-[#111111]"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للوحة الإدارة / Back to Admin</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs font-semibold hover:bg-[#262421] transition"
        >
          <Printer className="w-4 h-4 text-[#B89552]" />
          <span>طباعة الفاتورة A4 / Print or Save PDF</span>
        </button>
      </div>

      <ReceiptDocument order={order} />
    </div>
  );
}
