/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],

  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
