module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:nuxt/recommended", "@paperfeed/eslint-config/vanilla"],
  parserOptions: {
    parser: "babel-eslint"
  },
  root: true,
  // add your custom rules here
  rules: {
    "vue/html-indent": "off"
  }
};
