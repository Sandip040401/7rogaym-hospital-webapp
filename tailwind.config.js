/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      custom:'0.5rem',
      custom1:'0.7rem',
      custom2:'0.6rem',
      xs: '0.4rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    screens: {
      'sm': '640px',       // Small devices (landscape phones, 640px and up)
      'md': '768px',       // Medium devices (tablets, 768px and up)
      'lg': '1024px',      // Large devices (desktops, 1024px and up)
      'xl': '1280px',      // Extra large devices (large desktops, 1280px and up)
      '2xl': '1536px',     // 2x extra large devices (larger desktops, 1536px and up)
    },
  },
  plugins: [],
}