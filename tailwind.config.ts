import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        accent: "#4ade80",
        deep: "#15803d",
        leaf: "#86efac",
        ink: "#020617",
        canvas: "#05100b",
        panel: "#0a1f15",
        panelAlt: "#0f2a1d",
        line: "#1f3d2c",
        muted: "#94a3b8",
        soft: "#cbd5e1",
        bright: "#f0fdf4"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.18), transparent 45%), radial-gradient(circle at 100% 0%, rgba(74, 222, 128, 0.12), transparent 50%), radial-gradient(circle at 50% 100%, rgba(21, 128, 61, 0.18), transparent 55%)",
        "leaf-gradient": "linear-gradient(135deg, #16a34a 0%, #22c55e 45%, #4ade80 100%)",
        "deep-gradient": "linear-gradient(135deg, #052e16 0%, #064e3b 50%, #14532d 100%)",
        "panel-gradient":
          "linear-gradient(160deg, rgba(34, 197, 94, 0.08) 0%, rgba(5, 16, 11, 0) 60%)"
      },
      boxShadow: {
        glow: "0 12px 40px -8px rgba(34, 197, 94, 0.45)",
        glowStrong: "0 0 0 1px rgba(34, 197, 94, 0.35), 0 24px 60px -12px rgba(34, 197, 94, 0.55)",
        panel: "0 18px 50px -20px rgba(0, 0, 0, 0.55)",
        ring: "inset 0 0 0 1px rgba(74, 222, 128, 0.15)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.4)" },
          "50%": { boxShadow: "0 0 0 16px rgba(34, 197, 94, 0)" }
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "slide-down": "slide-down 0.2s ease-out both",
        glow: "glow 2.4s ease-in-out infinite",
        marquee: "marquee 50s linear infinite",
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
