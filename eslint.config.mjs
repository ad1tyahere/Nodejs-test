import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // CommonJS modules
      globals: globals.node, // Add Node.js globals (e.g., `process`, `require`)
    },
  },
  pluginJs.configs.recommended, // Recommended rules from @eslint/js
];
