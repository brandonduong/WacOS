import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        messenger: "url('/messenger.png')",
      },
      dropShadow: {
        "3xl": "4px 4px 0px rgb(90, 42, 213, 0.5)",
      },
      colors: {
        cpurple: "rgb(77, 35, 207)",
        cpurplelight: "rgb(100, 59, 222)",
        ccyan: "rgb(94, 178, 222)",
      },
      fontFamily: {
        visitor: "Visitor",
        vt: "VT323",
      },
      cursor: {
        pointer: 'url("/cursor/nso_point.cur"), auto',
        disabled: 'url("/cursor/nso_unavailable.cur"), auto',
      },
    },
  },
  plugins: [],
};
export default config;
