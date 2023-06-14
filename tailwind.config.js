/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chestnut: {
          DEFAULT: "#BC4749",
          50: "#EDCECE",
          100: "#E8BFBF",
          200: "#DDA1A2",
          300: "#D28384",
          400: "#C76567",
          500: "#BC4749",
          600: "#9C393B",
          700: "#7B2D2E",
          800: "#592021",
          900: "#371415",
          950: "#260E0E",
        },
        killarney: {
          DEFAULT: "#386641",
          50: "#B0D4B7",
          100: "#9FCBA8",
          200: "#7FB88A",
          300: "#5EA66C",
          400: "#4A8756",
          500: "#386641",
          600: "#2F5637",
          700: "#26452C",
          800: "#1D3522",
          900: "#142417",
          950: "#0F1C12",
        },
      },
    },
  },
  plugins: [],
};
