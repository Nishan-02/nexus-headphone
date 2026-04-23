/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#ff3c00", hover: "#ff5a20" },
        background: "#0a0a0a",
        secondary: "#1a1a1a",
        accent: "#ff6a00",
      },
      fontFamily: {
        body: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
