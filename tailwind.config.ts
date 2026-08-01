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
        // Primary near-black "console" palette, navy-blue undertone (#04101D)
        navy: {
          950: "#051523",
          900: "#071a2c",
          850: "#0a2338",
          800: "#0d2c44",
          700: "#123a56",
          600: "#184a6c",
          500: "#235d84",
          400: "#3574a0",
          300: "#4f8fbd",
          200: "#82b3d6",
          100: "#b9d4ea",
          50:  "#e3f0fa",
        },
        // Accent: cool electric blue
        accent: {
          500: "#3b9eff",
          400: "#4aa0e8",
          300: "#8cc3f5",
          200: "#b9dbf9",
          100: "#ddeefc",
        },
        // Fuel-gauge amber — secondary accent (nod to energy/fuel-data work)
        gold: {
          500: "#ffb020",
          400: "#ffc351",
          300: "#ffd685",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-navy": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d2c44' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
          "0%": { boxShadow: "0 0 5px #3b9eff, 0 0 10px #3b9eff" },
          "100%": { boxShadow: "0 0 20px #3b9eff, 0 0 40px #3b9eff, 0 0 60px #3b9eff" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 30px rgba(47, 143, 234, 0.3)",
        "glow-navy": "0 0 30px rgba(19, 33, 24, 0.6)",
        "card": "0 4px 24px rgba(4, 8, 6, 0.5)",
        "card-hover": "0 8px 40px rgba(47, 143, 234, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
