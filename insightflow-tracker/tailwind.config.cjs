/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#00A8E8',
        'brand-blue-light': '#4EC5F1',
        'bg-light': '#F8F9FA',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}
