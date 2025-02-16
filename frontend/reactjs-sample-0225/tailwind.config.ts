import {heroui} from '@heroui/theme';
import { colgroup } from 'framer-motion/client';
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        colour1 : "#EEEEEE",
        colour2 : "#508C9B",
        colour3 : "#134B70",
        colour4 : "#201E43",
        colour5 : "#9ACBD0",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "#E5E7EB", // Light gray border color
        // background: "#F9FAFB", // Light background color
        // foreground: "#111827", // Dark text color
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");