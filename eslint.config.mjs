// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/*.log"],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "@typescript-eslint": tseslint,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Custom overrides
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "react/prop-types": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "react/no-unescaped-entities": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "arrow-spacing": ["error", { before: true, after: true }],
    },
  },

  // separate override block
  {
    files: ["components/ui/**"],
    rules: {
      semi: "off", // disable semicolon rule for Shadcn UI files
    },
  },
];
