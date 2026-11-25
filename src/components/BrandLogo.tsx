import React from "react";

interface BrandLogoProps {
  compact?: boolean;
  dark?: boolean;
}

export function BrandLogo({ compact = false, dark = false }: BrandLogoProps) {
  const fg = dark ? "#FAF8F5" : "#111111";
  const gold = "#B89552";

  if (compact) {
    return (
      <div className="inline-flex items-center gap-3 select-none" dir="ltr">
        <svg
          width="36"
          height="36"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 12C33.49 12 12 33.49 12 60C12 72.1 16.48 83.15 23.88 91.6C19.8 83.4 17.5 74.15 17.5 64.35C17.5 36.85 39.8 14.55 67.3 14.55C76.2 14.55 84.55 16.9 91.75 21C83.15 15.3 71.95 12 60 12Z"
            fill={fg}
          />
          <path
            d="M60 108C86.51 108 108 86.51 108 60C108 47.9 103.52 36.85 96.12 28.4C100.2 36.6 102.5 45.85 102.5 55.65C102.5 83.15 80.2 105.45 52.7 105.45C43.8 105.45 35.45 103.1 28.25 99C36.85 104.7 48.05 108 60 108Z"
            fill={fg}
          />
          <path
            d="M60 32C62.2 49.5 70.5 57.8 88 60C70.5 62.2 62.2 70.5 60 88C57.8 70.5 49.5 62.2 32 60C49.5 57.8 57.8 49.5 60 32Z"
            fill={gold}
          />
        </svg>
        <div className="flex flex-col leading-none">
          <span
            className="text-[11px] italic tracking-wide"
            style={{ color: gold, fontFamily: "Georgia, serif" }}
          >
            Maison
          </span>
          <span
            className="font-serif text-xl font-bold tracking-[0.18em]"
            style={{ color: fg }}
          >
            ANAS
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.34em] mt-0.5"
            style={{ color: dark ? "#C8C1B6" : "#6E685F" }}
          >
            Parfums
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center select-none" dir="ltr">
      <svg
        width="64"
        height="64"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
        className="mb-1.5"
      >
        <path
          d="M60 12C33.49 12 12 33.49 12 60C12 72.1 16.48 83.15 23.88 91.6C19.8 83.4 17.5 74.15 17.5 64.35C17.5 36.85 39.8 14.55 67.3 14.55C76.2 14.55 84.55 16.9 91.75 21C83.15 15.3 71.95 12 60 12Z"
          fill={fg}
        />
        <path
          d="M60 108C86.51 108 108 86.51 108 60C108 47.9 103.52 36.85 96.12 28.4C100.2 36.6 102.5 45.85 102.5 55.65C102.5 83.15 80.2 105.45 52.7 105.45C43.8 105.45 35.45 103.1 28.25 99C36.85 104.7 48.05 108 60 108Z"
          fill={fg}
        />
        <path
          d="M60 30C62.3 49.2 70.8 57.7 90 60C70.8 62.3 62.3 70.8 60 90C57.7 70.8 49.2 62.3 30 60C49.2 57.7 57.7 49.2 60 30Z"
          fill={gold}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span
          className="self-start -mb-1.5 text-sm italic"
          style={{ color: gold, fontFamily: "Georgia, serif" }}
        >
          Maison
        </span>
        <span
          className="font-serif text-4xl font-bold tracking-[0.22em] leading-none"
          style={{ color: fg }}
        >
          ANAS
        </span>
        <span
          className="text-[11px] uppercase tracking-[0.42em] mt-1.5"
          style={{ color: dark ? "#C8C1B6" : "#6E685F" }}
        >
          P a r f u m s
        </span>
      </div>
    </div>
  );
}
