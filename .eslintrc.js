module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-unused-vars": "off", // 忽略所有错误
    "no-warning-comments": "off", // 忽略所有警告
    "prettier/prettier": "off",
    // "no-useless-disable": "off", // 禁用 eslint-disable
  },
};
