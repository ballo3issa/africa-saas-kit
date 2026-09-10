import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
  globalIgnores([
    "**/._*",
    ".next/**",
    "out/**",
    "build/**",
    "generated/**",
    "next-env.d.ts",
    "skills/providers/**/examples/**",
  ]),
]);
