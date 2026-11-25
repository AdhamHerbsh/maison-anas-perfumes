import React from "react";
import { Product } from "@/types";

const TONE_MAP: Record<
  Product["bottleTone"],
  { glass: string; liquid: string; labelBg: string; labelText: string }
> = {
  obsidian: {
    glass: "#1C1B1A",
    liquid: "#2B2723",
    labelBg: "#FAF8F5",
    labelText: "#111111",
  },
  champagne: {
    glass: "#EFE7D6",
    liquid: "#DFC89A",
    labelBg: "#111111",
    labelText: "#FAF8F5",
  },
  amber: {
    glass: "#E8D5BD",
    liquid: "#C9965B",
    labelBg: "#FAF8F5",
    labelText: "#111111",
  },
  ivory: {
    glass: "#F5F2EC",
    liquid: "#EAE2D3",
    labelBg: "#FFFFFF",
    labelText: "#111111",
  },
  emerald: {
    glass: "#DCE4DD",
    liquid: "#9DB2A0",
    labelBg: "#111111",
    labelText: "#FAF8F5",
  },
};

export function FlaconIllustration({
  tone,
  title,
}: {
  tone: Product["bottleTone"];
  title: string;
}) {
  const palette = TONE_MAP[tone] || TONE_MAP.champagne;

  return (
    <div className="relative flex items-center justify-center py-6 bg-[#FAF8F5] border-b border-[#E8E2D7] overflow-hidden">
      <div
        className="absolute w-36 h-36 rounded-full opacity-45 blur-2xl pointer-events-none"
        style={{ backgroundColor: palette.liquid }}
      />
      <svg
        width="116"
        height="154"
        viewBox="0 0 116 154"
        fill="none"
        aria-label={title}
        className="relative z-10 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
      >
        {/* Cap */}
        <rect x="43" y="10" width="30" height="20" rx="2" fill="#111111" />
        <rect x="41" y="28" width="34" height="4" fill="#B89552" />
        {/* Neck */}
        <rect x="48" y="32" width="20" height="10" fill="#D5CEC2" />
        {/* Outer Crystal Flacon */}
        <rect
          x="22"
          y="42"
          width="72"
          height="100"
          rx="6"
          fill={palette.glass}
          stroke="#D6CFC2"
          strokeWidth="1.5"
        />
        {/* Inner Perfume Essence */}
        <rect
          x="27"
          y="50"
          width="62"
          height="84"
          rx="4"
          fill={palette.liquid}
        />
        {/* Minimalist Couture Label */}
        <rect
          x="33"
          y="64"
          width="50"
          height="54"
          rx="1.5"
          fill={palette.labelBg}
          stroke="#B89552"
          strokeWidth="0.8"
        />
        <text
          x="58"
          y="83"
          textAnchor="middle"
          fill="#B89552"
          fontSize="6.5"
          fontStyle="italic"
          fontFamily="Georgia, serif"
        >
          Maison
        </text>
        <text
          x="58"
          y="96"
          textAnchor="middle"
          fill={palette.labelText}
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          fontFamily="Georgia, serif"
        >
          ANAS
        </text>
        <line
          x1="44"
          y1="103"
          x2="72"
          y2="103"
          stroke="#B89552"
          strokeWidth="0.7"
        />
        <text
          x="58"
          y="111"
          textAnchor="middle"
          fill={palette.labelText}
          fontSize="5"
          letterSpacing="1.5"
          opacity="0.75"
        >
          PARFUMS
        </text>
      </svg>
    </div>
  );
}
