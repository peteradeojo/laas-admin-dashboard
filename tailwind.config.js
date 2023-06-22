/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#061a40",
        secondaryColor: "#b9d6f2",
        whiteColor: "#fffff",
      },
    },
  },
  plugins: [],
};
