import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#111111",
        alabaster: "#FAF8F5",
        champagne: "#B89552",
        "champagne-dark": "#9E7C3C",
        sand: "#E8E2D7",
        "warm-gray": "#6E685F",
      },
      fontFamily: {
        amiri: ["var(--font-amiri)", "serif"],
        arabic: ["var(--font-ibm-arabic)", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
