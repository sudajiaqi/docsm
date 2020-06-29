module.exports = {
  "env": {
    "es2020": true,
    "node": true,
    "jest/globals": true,
  },
  "extends": [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  "plugins": ["jest"],
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
};
