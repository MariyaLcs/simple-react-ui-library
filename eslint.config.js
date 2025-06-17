import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  /* Ignore build artefacts */
  { ignores: ["dist"] },

  /* React + TypeScript rules */
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      /* React 17+ automatic runtime */
      "react/react-in-jsx-scope": "off",
      /* Keep your refresh rule */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
