import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        // Domain tokens
        espresso: "var(--color-espresso)",
        cocoa: "var(--color-cocoa)",
        cream: "var(--color-cream)",
        oat: "var(--color-oat)",
        "card-cream": "var(--color-card-cream)",
        gold: {
          DEFAULT: "var(--color-gold)",
          hover: "var(--color-gold-hover)",
        },
        "espresso-ink": "var(--color-espresso-ink)",
        mocha: "var(--color-mocha)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "Plus Jakarta Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        warm: "0 2px 4px rgba(26, 17, 11, 0.05)",
        "warm-md": "0 4px 12px rgba(26, 17, 11, 0.08)",
        "warm-lg": "0 12px 28px rgba(26, 17, 11, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
