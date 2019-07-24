module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    // add your custom rules here
    rules: {
        'no-console': 'warn',
        'semi': 'off',
        'indent': 'off',
        'quote-props': 'off',
        'no-trailing-spaces': 'off',
        'padded-blocks': 'off',
        'vue/no-unused-components': 'warn',
        'vue/html-indent': 'off'
    }
};
