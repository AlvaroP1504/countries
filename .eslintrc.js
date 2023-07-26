
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-undef": "off",
    "prettier/prettier": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars":  "off",
    "key-spacing":"off",
    // eslint-disable-next-line quote-props
    "quotes": "off",
    "comma-dangle": "off",
    "no-trailing-spaces": "off",
    "space-before-function-paren": "off",
    "padded-blocks": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-return-assign": "off",
    "no-unreachable": "off",
    "brace-style": "off",
    "object-curly-spacing": "off",
    "space-before-blocks": "off",
    semi: "off",
    "eol-last": "off",
    "lines-between-class-members": "off",
    indent: "off",
    "vue/multi-word-component-names": "off",
    "spaced-comment": "off",
  }
}
