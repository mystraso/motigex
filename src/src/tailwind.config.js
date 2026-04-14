/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Dark mode klass orqali ishlashi uchun
  theme: {
    extend: {
      colors: {
        magicos: {
          blue: '#2563eb',
          dark: '#0f172a',
          glass: 'rgba(255, 255, 255, 0.7)',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
}
