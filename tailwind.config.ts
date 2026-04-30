import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary dark blue palette
        navy: {
          950: "#040d1a",
          900: "#071428",
          850: "#0a1d3a",
          800: "#0d2347",
          700: "#122d5c",
          600: "#173871",
          500: "#1d4585",
          400: "#2554a0",
          300: "#3b6dbf",
          200: "#6090d6",
          100: "#9ab5e5",
          50:  "#d0dff4",
        },
        // Accent: electric cyan-teal
        accent: {
          500: "#00c8b4",
          400: "#00dfc8",
          300: "#33e8d6",
          200: "#7ff0e4",
          100: "#c0f8f3",
        },
        // Gold accent for highlights
        gold: {
          500: "#f0a500",
          400: "#f5b833",
          300: "#f9cc66",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-navy": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23122d5c' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00c8b4, 0 0 10px #00c8b4" },
          "100%": { boxShadow: "0 0 20px #00c8b4, 0 0 40px #00c8b4, 0 0 60px #00c8b4" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 30px rgba(0, 200, 180, 0.3)",
        "glow-navy": "0 0 30px rgba(18, 45, 92, 0.5)",
        "card": "0 4px 24px rgba(4, 13, 26, 0.4)",
        "card-hover": "0 8px 40px rgba(0, 200, 180, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
