const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "import/no-anonymous-default-export": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
  },
};

module.exports = config;
