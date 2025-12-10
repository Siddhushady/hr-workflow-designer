/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvasBg: "#0f172a",
        panelBg: "rgba(15,23,42,0.95)",
        accent: "#6366f1",
        accentSoft: "rgba(99,102,241,0.1)",
        danger: "#f97373",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
