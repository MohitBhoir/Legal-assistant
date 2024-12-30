const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'chelsea':'#034694',
        'dark-blue': {
          500: '#3b82f6', // Tailwind's blue-500
          600: '#2563eb', // Tailwind's blue-600
          700: '#1d4ed8', // Tailwind's blue-700
        },
        'dark-cyan': {
          700: '#0f766e', // Tailwind's cyan-700
        },
    },
    animation: {
        'line-up': 'lineUp 6s linear infinite',
        'line-down': 'lineDown 6s linear infinite',
        'line-left': 'lineLeft 6s linear infinite',
        'line-right': 'lineRight 6s linear infinite',
      },
      keyframes: {
        lineUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        lineDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        lineLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        lineRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
  }
  },
  plugins: [flowbite.plugin()],
};
