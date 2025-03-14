/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      screens: {
        xs: { max: "639px" },
        xxs: "450px",
        laptop: "850px",
      },
    },
  },
  plugins: [],
};
