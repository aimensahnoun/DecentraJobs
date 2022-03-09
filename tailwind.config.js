module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "decentra-green": "#399E5A",
        "decentra-turquoise": "#63E2C6",
        "decentra-bluegreen": "#5ABCB9",
        "decentra-gray": "#F6F6F6",
        "decentra-lightblue" : "#E2EDEE"
      },
      boxShadow: {
        decentra: "rgba(0, 0, 0, 0.15) 0px 5px 10px",
      },
    },
  },
  plugins: [],
}
