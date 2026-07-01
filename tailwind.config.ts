import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050B14",
          900: "#0A192F",
          800: "#0F213D",
          700: "#15304F",
        },
        neon: {
          cyan: "#22D3EE",
          blue: "#3B82F6",
          glow: "#38BDF8",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(56, 189, 248, 0.35), 0 0 40px rgba(34, 211, 238, 0.15)",
        "glow-lg": "0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(34, 211, 238, 0.25)",
        "glow-cyan": "0 0 25px rgba(34, 211, 238, 0.45)",
      },
      backgroundImage: {
        "galaxy-gradient": "radial-gradient(ellipse at top, #0F213D 0%, #050B14 60%, #020509 100%)",
        "card-gradient": "linear-gradient(160deg, rgba(15,33,61,0.8) 0%, rgba(5,11,20,0.9) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
