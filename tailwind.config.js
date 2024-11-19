/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        900: "900ms", // Add custom durations if needed
      },
    },
  },
  plugins: [],
};
