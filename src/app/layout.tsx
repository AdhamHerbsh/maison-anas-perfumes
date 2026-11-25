import type { Metadata } from "next";
import {
  Amiri,
  IBM_Plex_Sans_Arabic,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["700"],
  variable: "--font-amiri",
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison ANAS Parfums | عطور ميسون أنس",
  description:
    "عطور مميزة بأسعار تنافسك، ثبات وفوحان وجودة تليق بذوقك، عروض وهدايا مميزة — الدفع عند الاستلام والتوصيل لجميع محافظات مصر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${ibmArabic.variable} ${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#111111] selection:bg-[#B89552]/20">
        {children}
      </body>
    </html>
  );
}
