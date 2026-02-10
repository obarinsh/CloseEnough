/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm beige palette with vibrant purple accent
        primary: {
          DEFAULT: "#b677ce",
          foreground: "#FFFFFF",
          light: "rgba(182,119,206,0.10)",
          dark: "#9D5FB5",
        },
        secondary: {
          DEFAULT: "#1D1D1F",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#E8D5B5",
          warm: "#F0DFC0",
          foreground: "#1D1D1F",
        },
        background: "#F2E8D9",
        foreground: "#2D2D2F",
        subtle: "rgba(255,255,255,0.85)",
        muted: {
          DEFAULT: "rgba(255,255,255,0.7)",
          foreground: "#6E6E73",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2D2D2F",
        },
        border: "rgba(0,0,0,0.06)",
        input: "rgba(0,0,0,0.06)",
        ring: "#b677ce",
        "text-primary": "#2D2D2F",
        "text-secondary": "#6E6E73",
        "text-tertiary": "#AEAEB2",
        destructive: {
          DEFAULT: "#E8654A",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#34C759",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FF9500",
          foreground: "#2D2D2F",
        },
      },
      fontFamily: {
        heading: ["Fredoka", "Nunito", "DM Sans", "Helvetica Neue", "sans-serif"],
        body: ["DM Sans", "Helvetica Neue", "sans-serif"],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        sm: "0 1px 4px rgba(0, 0, 0, 0.04)",
        md: "0 4px 16px rgba(0, 0, 0, 0.06)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.08)",
        card: "0 2px 20px rgba(0, 0, 0, 0.05)",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.6rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
      },
      transitionDuration: {
        fast: "120ms",
        normal: "200ms",
        slow: "350ms",
        reveal: "500ms",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        enter: "cubic-bezier(0, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        playful: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "star-pop": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0, 0, 0.2, 1) forwards",
        "scale-in": "scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0, 0, 0.2, 1) forwards",
        "star-pop": "star-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [],
}
