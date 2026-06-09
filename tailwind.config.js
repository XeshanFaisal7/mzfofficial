/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        "surface-sm": "var(--radius-sm)",
        "surface-md": "var(--radius-md)",
        "surface-lg": "var(--radius-lg)",
        "surface-xl": "var(--radius-xl)",
        "surface-2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px -12px hsl(var(--accent) / 0.12)",
        "glow-md": "0 0 28px -14px hsl(var(--accent) / 0.16)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, hsl(var(--grid) / 0.28) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid) / 0.28) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse 80% 60% at 50% -20%, hsl(var(--glow) / 0.16), transparent 55%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
