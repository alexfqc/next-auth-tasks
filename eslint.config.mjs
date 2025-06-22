import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import testingLibrary from "eslint-plugin-testing-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.test.tsx"],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      "testing-library/prefer-screen-queries": "warn",
      "testing-library/no-node-access": "error",
      "testing-library/no-container": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-render-in-setup": "off",
      "testing-library/prefer-user-event": "warn",
      "testing-library/no-manual-cleanup": "error",
      "testing-library/await-async-queries": "error",
      "testing-library/prefer-find-by": "warn",
      "testing-library/no-wait-for-side-effects": "error",
      "testing-library/consistent-data-testid": [
        "error",
        {
          testIdPattern: "^[a-z]+(-[a-z]+)*$", // kebab-case
        },
      ],
    },
  },
];

export default eslintConfig;
