import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "533px",
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
      },
      fontFamily: {
        wbb: ["var(--font-wbb)", ...fontFamily.sans],
        default: ["var(--font-default)", ...fontFamily.sans],
      },
      scale: {
        "200": "2",
        "300": "3",
        "250": "2.5",
        "400": "4",
      },
      maxWidth: {
        xxs: "16rem",
      },
      colors: {
        lemon: {
          green: {
            DEFAULT: "#00FF60",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config