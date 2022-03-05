module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-/,
      variants: ["lg", "hover", "focus", "lg:hover" , "[]"],
    },
    {
      pattern: /text-/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
  ],
  theme: {
    extend: {
      colors: {
        "decentra-green": "#399E5A",
        "decentra-turquoise": "#63E2C6",
        "decentra-bluegreen": "#5ABCB9",
        "decentra-gray": "#F6F6F6",
      },
      boxShadow: {
        decentra: "rgba(0, 0, 0, 0.15) 0px 5px 10px;",
      },
    },
  },
  plugins: [],
};
