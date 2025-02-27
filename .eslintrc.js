module.exports = {
  extends: [
    "@rocketseat/eslint-config/react",
    "next/core-web-vitals",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
