/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      main: "#222831",
      secondary: "#31363F",
      accent: "#76ABAE",
      white: "#EEEEEE",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
    }),
  },
  plugins: [],
};
