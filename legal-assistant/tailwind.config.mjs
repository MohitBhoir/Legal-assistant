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
  }
  },
  plugins: [flowbite.plugin()],
};
