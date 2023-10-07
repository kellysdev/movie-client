module.exports = [
  {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaFeaters": {
        "jsx": true
      }
    },
    "rules": {
        "quotes": ["error", "double"]
    }
  }
];