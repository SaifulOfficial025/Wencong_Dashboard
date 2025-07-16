/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F04E24",
        "primary-foreground": "#fff"
      },
      fontFamily: {
        "space-grotesk": ['Space Grotesk', "sans-serif"],
      },
      backgroundImage: {
        'hero-bg': "url('../public/login_side.png')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

