import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#018DEE",
        "blue-secondary": "#01AFE2",
        "blue-dark-btn": "#0080D8",
        "bg-dark": "#040810",
        "bg-dark-2": "#07111f",
        "bg-light": "#f9f9f9",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
