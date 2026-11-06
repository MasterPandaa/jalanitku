import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFF8E7",
        surface: "#FFFFFF",
        primary: "#FFD60A",
        accent: {
          yellow: "#FFD60A",
          pink: "#FF5C8A",
          blue: "#3D5AFE",
          green: "#2EE59D",
          orange: "#FF8A3D",
          purple: "#9B5CFF",
          danger: "#FF3B3B",
          cyan: "#00F0FF",
        },
      },
      boxShadow: {
        "nb-sm": "3px 3px 0 #0A0A0A",
        "nb-md": "6px 6px 0 #0A0A0A",
        "nb-lg": "10px 10px 0 #0A0A0A",
        "nb-hover": "8px 8px 0 #0A0A0A",
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
        "5": "5px",
        "6": "6px",
        "7": "7px",
      },
      fontFamily: {
        heading: ["var(--font-archivo)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        sans: ["var(--font-dm)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
