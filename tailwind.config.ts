import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-border)",
        ring: "var(--focus)",
        background: "var(--color-surface)",
        foreground: "var(--color-ink)",
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        "card-hover": "var(--color-card-hover)",
        freight: {
          DEFAULT: "var(--freight)",
          dim: "var(--freight-dim)",
          light: "var(--freight-light)"
        },
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
        display: ["4rem", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "800" }],
        headline: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        title: ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
        mono: ["0.875rem", { lineHeight: "1.4" }]
      },
      boxShadow: {
        soft: "0 1px 4px rgba(0, 0, 0, 0.06)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(ellipse at 30% 50%, rgba(199,80,10,0.15), transparent 60%)"
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
