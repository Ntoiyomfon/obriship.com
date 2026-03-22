import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-border)",
        ring: "var(--color-accent)",
        background: "var(--color-surface)",
        foreground: "var(--color-ink)",
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        accent: {
          DEFAULT: "var(--color-accent)",
          dim: "var(--color-accent-dim)"
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted)"
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        headline: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        title: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.8rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        mono: ["0.9rem", { lineHeight: "1.4" }]
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.06)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at top, rgba(232,255,71,0.18), transparent 38%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
        "surface-grid":
          "linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px)"
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.65" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" }
        },
        "flash-in": {
          "0%": { backgroundColor: "rgba(16, 185, 129, 0.18)" },
          "100%": { backgroundColor: "transparent" }
        }
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        "flash-in": "flash-in 1s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
