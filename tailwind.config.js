module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff6a5a",
        secondary: "#d7e1e8",
        tertiary: "",
      },
      dropShadow: {
        "2xl": "0 3px 3px rgba(51, 51, 51, 0.16)",
        "3xl": "0 3px 3px rgba(51, 51, 51, 0.23)",
      },
    },
  },
  plugins: [],
}
