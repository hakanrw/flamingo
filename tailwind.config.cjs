const defTheme = require("daisyui/src/colors/themes")["[data-theme=light]"];
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...defTheme,
          primary: defTheme.secondary,
          secondary: "purple",
          "primary-focus": "purple",
        },
      },
    ],
  },
};

module.exports = config;
